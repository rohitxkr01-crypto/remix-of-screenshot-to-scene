import { lazy, Suspense, useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AssistantTab } from "./AssistantPanel";
import { useHospitalChat } from "./use-hospital-chat";
import { useVoiceCall } from "./use-voice-call";

const AssistantPanel = lazy(() => import("./AssistantPanel"));

/** Floating chat + voice assistant shown on every page. Chat history lives for the browser session. */
export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [tab, setTab] = useState<AssistantTab>("chat");
  const chat = useHospitalChat();
  const voice = useVoiceCall();

  useEffect(() => {
    if (!open) return;
    setEverOpened(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <section
        aria-label="Hospital assistant"
        aria-hidden={!open}
        className={cn(
          "fixed z-50 flex flex-col overflow-hidden border bg-background shadow-elevated transition-all duration-300",
          "inset-x-0 bottom-0 h-[min(88dvh,44rem)] rounded-t-3xl",
          "sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(42rem,calc(100dvh-8rem))] sm:w-[25rem] sm:rounded-3xl",
          open ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none translate-y-6 opacity-0",
        )}
      >
        {everOpened && (
          <Suspense fallback={<div className="flex-1 animate-pulse bg-soft" />}>
            <AssistantPanel tab={tab} onTab={setTab} onClose={() => setOpen(false)} chat={chat} voice={voice} />
          </Suspense>
        )}
      </section>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close hospital assistant" : "Open hospital assistant — chat or talk"}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-primary pl-4 pr-5 text-primary-foreground shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/92 sm:bottom-6 sm:right-6",
          open && "max-sm:hidden w-14 justify-center px-0 sm:pl-0 sm:pr-0",
        )}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <>
            <span className="relative">
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
              {voice.active && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-primary bg-emergency" aria-hidden="true" />
              )}
            </span>
            <span className="text-[0.95rem] font-semibold">
              <span lang="ne">सहायता</span>
              <span className="hidden sm:inline"> · Ask us</span>
            </span>
          </>
        )}
      </button>
    </>
  );
}
