import { useCallback, useEffect, useRef, useState } from "react";
import type VapiClient from "@vapi-ai/web";

import { vapiConfig } from "@/content/voice";

export type VoiceState = "idle" | "connecting" | "listening" | "thinking" | "speaking" | "ended" | "error";

export interface Caption {
  role: "user" | "assistant";
  text: string;
}

const MESSAGES = {
  unsupported:
    "तपाईंको ब्राउजरले आवाज कल समर्थन गर्दैन। कृपया Chrome, Edge वा Safari को नयाँ संस्करण प्रयोग गर्नुहोस्।",
  denied:
    "माइक्रोफोन अनुमति दिइएन। ब्राउजरको ठेगाना पट्टीमा रहेको ताल्चा (🔒) थिचेर माइक्रोफोन 'Allow' गर्नुहोस्, अनि फेरि प्रयास गर्नुहोस्।",
  noMic: "माइक्रोफोन फेला परेन। कृपया माइक्रोफोन जोडेर फेरि प्रयास गर्नुहोस्।",
  connection:
    "आवाज सहायकसँग जडान हुन सकेन। कृपया केही समयपछि फेरि प्रयास गर्नुहोस् वा +977 41-591584 मा फोन गर्नुहोस्।",
} as const;

type VapiCtor = typeof VapiClient;

function isEjection(e: unknown): boolean {
  const text = JSON.stringify(e ?? "").toLowerCase();
  return text.includes("ejected") || text.includes("meeting has ended");
}

async function loadVapi(): Promise<VapiCtor> {
  const mod = (await import("@vapi-ai/web")) as unknown as { default: VapiCtor & { default?: VapiCtor } };
  return mod.default.default ?? mod.default;
}

/** Real-time voice call with the hospital's Vapi assistant. Browser-only; the SDK loads on first use. */
export function useVoiceCall() {
  const [state, setState] = useState<VoiceState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const vapiRef = useRef<InstanceType<VapiCtor> | null>(null);
  const startedRef = useRef(false);

  useEffect(
    () => () => {
      void vapiRef.current?.stop();
      vapiRef.current?.removeAllListeners();
      vapiRef.current = null;
    },
    [],
  );

  const fail = useCallback((message: string) => {
    setError(message);
    setState("error");
    setVolume(0);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    startedRef.current = false;
    setCaptions([]);
    setMuted(false);
    setState("connecting");

    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      fail(MESSAGES.unsupported);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch (e) {
      const name = e instanceof DOMException ? e.name : "";
      fail(name === "NotFoundError" || name === "OverconstrainedError" ? MESSAGES.noMic : MESSAGES.denied);
      return;
    }

    try {
      if (!vapiRef.current) {
        const Vapi = await loadVapi();
        const vapi = new Vapi(vapiConfig.publicKey);
        vapi.on("call-start", () => {
          startedRef.current = true;
          setState("listening");
        });
        vapi.on("speech-start", () => setState("speaking"));
        vapi.on("speech-end", () => setState((s) => (s === "speaking" ? "listening" : s)));
        vapi.on("volume-level", (v) => setVolume(v));
        vapi.on("call-end", () => {
          setVolume(0);
          setState((s) => (s === "error" ? s : "ended"));
        });
        vapi.on("message", (message: { type?: string; role?: string; transcriptType?: string; transcript?: string }) => {
          if (message.type !== "transcript" || message.transcriptType !== "final" || !message.transcript) return;
          const role = message.role === "user" ? "user" : "assistant";
          setCaptions((prev) => [...prev.slice(-5), { role, text: message.transcript ?? "" }]);
          if (role === "user") setState((s) => (s === "listening" ? "thinking" : s));
        });
        vapi.on("error", (e: unknown) => {
          // Vapi reports a normal hang-up by the assistant as an "ejected" error.
          if (startedRef.current && isEjection(e)) {
            setVolume(0);
            setState("ended");
            return;
          }
          console.error("Voice assistant error", e);
          fail(MESSAGES.connection);
        });
        vapiRef.current = vapi;
      }
      const call = await vapiRef.current.start(vapiConfig.assistantId);
      if (!call) fail(MESSAGES.connection);
    } catch (e) {
      console.error("Voice assistant failed to start", e);
      fail(MESSAGES.connection);
    }
  }, [fail]);

  const end = useCallback(() => {
    startedRef.current = true; // treat the follow-up "meeting ended" event as a normal end
    void vapiRef.current?.stop();
    setVolume(0);
    setState("ended");
  }, []);

  const toggleMute = useCallback(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;
    const next = !vapi.isMuted();
    vapi.setMuted(next);
    setMuted(next);
  }, []);

  const active = state === "connecting" || state === "listening" || state === "thinking" || state === "speaking";

  return { state, error, muted, volume, captions, active, start, end, toggleMute };
}

export type VoiceCall = ReturnType<typeof useVoiceCall>;
