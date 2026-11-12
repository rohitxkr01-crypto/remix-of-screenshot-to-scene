import { MessageCircle, Mic, Phone, RotateCcw, X } from "lucide-react";

import avatar from "@/assets/assistant-avatar.png";
import { Button } from "@/components/ui/button";
import { ASSISTANT_NAME, hospitalFacts } from "@/lib/hospital-assistant";
import { cn } from "@/lib/utils";
import { ChatView } from "./ChatView";
import type { HospitalChat } from "./use-hospital-chat";
import type { VoiceCall } from "./use-voice-call";
import { VoiceView } from "./VoiceView";

export type AssistantTab = "chat" | "voice";

export default function AssistantPanel({
  tab,
  onTab,
  onClose,
  chat,
  voice,
}: {
  tab: AssistantTab;
  onTab: (t: AssistantTab) => void;
  onClose: () => void;
  chat: HospitalChat;
  voice: VoiceCall;
}) {
  const tabBtn = (t: AssistantTab) =>
    cn(
      "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors",
      tab === t ? "bg-background text-navy shadow-card" : "text-navy-foreground/80 hover:text-navy-foreground",
    );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="bg-gradient-navy px-4 pb-3 pt-4 text-navy-foreground">
        <div className="flex items-center gap-3">
          <img src={avatar} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-bold leading-tight">{ASSISTANT_NAME}</p>
            <p className="truncate text-xs text-navy-muted">Janakpur Neuro Hospital · सहायक</p>
          </div>
          {tab === "chat" && chat.messages.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={chat.clear}
              aria-label="Clear chat"
              title="Clear chat"
              className="text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
            >
              <RotateCcw aria-hidden="true" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close assistant"
            className="text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
          >
            <X aria-hidden="true" />
          </Button>
        </div>
        <div role="tablist" aria-label="Assistant mode" className="mt-3 flex gap-1 rounded-full bg-navy-foreground/10 p-1">
          <button type="button" role="tab" aria-selected={tab === "chat"} className={tabBtn("chat")} onClick={() => onTab("chat")}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat
          </button>
          <button type="button" role="tab" aria-selected={tab === "voice"} className={tabBtn("voice")} onClick={() => onTab("voice")}>
            <Mic className="h-4 w-4" aria-hidden="true" /> Voice
            {voice.active && <span className="h-2 w-2 rounded-full bg-emergency" aria-label="Call in progress" />}
          </button>
        </div>
      </div>

      <a
        href="tel:+97741591584"
        className="flex items-center justify-center gap-2 bg-emergency/10 px-4 py-2 text-[0.8rem] font-semibold text-emergency hover:bg-emergency/15"
      >
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        <span lang="ne">आपतकाल? तुरुन्तै फोन गर्नुहोस्</span> {hospitalFacts.phones[0]} · 24/7
      </a>

      {tab === "chat" ? <ChatView chat={chat} onOpenVoice={() => onTab("voice")} /> : <VoiceView voice={voice} />}
    </div>
  );
}
