import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatStatus } from "ai";

import type { ChatRole } from "@/lib/hospital-assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  error?: boolean;
}

const NETWORK_ERROR =
  "माफ गर्नुहोस्, जडान हुन सकेन। कृपया इन्टरनेट जाँचेर फेरि प्रयास गर्नुहोस् वा अस्पताललाई +977 41-591584 मा फोन गर्नुहोस्।";

/** In-memory chat for the active browser session (kept while the visitor moves between pages). */
export function useHospitalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content };
    const history = [...messagesRef.current.filter((m) => !m.error), userMsg];
    setMessages((prev) => [...prev, userMsg]);
    setStatus("submitted");

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const assistantId = crypto.randomUUID();
    let started = false;

    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content: c }) => ({ role, content: c })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? NETWORK_ERROR);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        if (!started) {
          started = true;
          setStatus("streaming");
          setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: chunk }]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m)),
          );
        }
      }
      setStatus("ready");
    } catch (error) {
      if (controller.signal.aborted) {
        setStatus("ready");
        return;
      }
      const message = error instanceof Error && error.message ? error.message : NETWORK_ERROR;
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: message, error: true },
      ]);
      setStatus("ready");
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStatus("ready");
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setStatus("ready");
  }, []);

  return { messages, status, send, stop, clear };
}

export type HospitalChat = ReturnType<typeof useHospitalChat>;
