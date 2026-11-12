import { AlertCircle, Mic, MicOff, PhoneOff, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VoiceCall, VoiceState } from "./use-voice-call";

const STATE_LABEL: Record<VoiceState, { ne: string; en: string }> = {
  idle: { ne: "कुरा गर्न तयार", en: "Ready to talk" },
  connecting: { ne: "जोडिँदै छ…", en: "Connecting…" },
  listening: { ne: "सुन्दै छु…", en: "Listening…" },
  thinking: { ne: "सोच्दै छु…", en: "Thinking…" },
  speaking: { ne: "बोल्दै छु…", en: "Speaking…" },
  ended: { ne: "कल समाप्त भयो", en: "Call Ended" },
  error: { ne: "समस्या आयो", en: "Something went wrong" },
};

export function VoiceView({ voice }: { voice: VoiceCall }) {
  const { state, error, muted, volume, captions, active, start, end, toggleMute } = voice;
  const label = STATE_LABEL[state];
  const scale = state === "speaking" ? 1 + Math.min(volume, 1) * 0.45 : 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative flex h-44 w-44 items-center justify-center" aria-hidden="true">
          {(state === "listening" || state === "speaking" || state === "connecting") && (
            <>
              <span className={cn("voice-ring absolute inset-0 rounded-full bg-primary/15", state === "connecting" && "[animation-duration:1.2s]")} />
              <span className="voice-ring absolute inset-4 rounded-full bg-primary/20 [animation-delay:0.5s]" />
            </>
          )}
          <span
            className="absolute inset-8 rounded-full bg-primary/25 transition-transform duration-150"
            style={{ transform: `scale(${scale})` }}
          />
          <span
            className={cn(
              "relative flex h-24 w-24 items-center justify-center rounded-full shadow-glow transition-colors",
              state === "error" ? "bg-destructive text-destructive-foreground" : active ? "bg-gradient-teal text-primary-foreground" : "bg-navy text-navy-foreground",
              state === "thinking" && "animate-pulse",
            )}
          >
            {state === "error" ? <AlertCircle className="h-10 w-10" /> : muted ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
          </span>
        </div>

        <p className="mt-6 font-display text-2xl font-bold text-navy" aria-live="polite">
          <span lang="ne">{label.ne}</span>
        </p>
        <p className="text-sm font-medium text-muted-foreground">{label.en}{muted && active ? " · Muted" : ""}</p>

        {error && (
          <p role="alert" lang="ne" className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-sm text-destructive">
            {error}
          </p>
        )}

        {!active && !error && state === "idle" && (
          <p lang="ne" className="mt-4 max-w-xs text-[0.95rem] text-muted-foreground">
            तलको बटन थिच्नुहोस् र नेपालीमा सहज रूपमा बोल्नुहोस्। माइक्रोफोन अनुमति माग्दा "Allow" थिच्नुहोस्।
          </p>
        )}

        {captions.length > 0 && (
          <ul className="mt-5 w-full space-y-2 text-left" aria-label="Conversation captions">
            {captions.slice(-3).map((c, i) => (
              <li
                key={`${i}-${c.text.slice(0, 12)}`}
                className={cn(
                  "rounded-2xl px-3.5 py-2 text-sm",
                  c.role === "user" ? "ml-8 bg-primary text-primary-foreground" : "mr-8 bg-soft text-foreground",
                )}
              >
                {c.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {active ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={toggleMute}
              disabled={state === "connecting"}
              aria-pressed={muted}
            >
              {muted ? <MicOff aria-hidden="true" /> : <Mic aria-hidden="true" />}
              {muted ? "Unmute" : "Mute"}
            </Button>
            <Button type="button" variant="destructive" size="lg" onClick={end}>
              <PhoneOff aria-hidden="true" />
              End Call
            </Button>
          </>
        ) : (
          <Button type="button" size="lg" className="w-full" onClick={() => void start()}>
            {state === "idle" ? <Mic aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
            {state === "idle" ? "Talk to Our Voice Assistant" : "Start a new call"}
          </Button>
        )}
      </div>
    </div>
  );
}
