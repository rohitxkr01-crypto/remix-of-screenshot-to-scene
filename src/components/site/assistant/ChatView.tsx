import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { SUGGESTED_QUESTIONS, WELCOME_MESSAGE } from "@/lib/hospital-assistant";
import { cn } from "@/lib/utils";
import type { HospitalChat } from "./use-hospital-chat";

const userBubble =
  "text-[0.95rem] leading-relaxed group-[.is-user]:rounded-2xl group-[.is-user]:rounded-br-md group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground";

export function ChatView({ chat, onOpenVoice }: { chat: HospitalChat; onOpenVoice: () => void }) {
  const { messages, status, send, stop } = chat;
  const wrapRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  const focusInput = () => wrapRef.current?.querySelector("textarea")?.focus();
  useEffect(() => {
    if (status === "ready") focusInput();
  }, [status]);

  return (
    <div ref={wrapRef} className="flex min-h-0 flex-1 flex-col">
      <Conversation className="min-h-0">
        <ConversationContent className="gap-5 px-4 py-5">
          <Message from="assistant">
            <MessageContent className={userBubble}>
              <MessageResponse>{WELCOME_MESSAGE}</MessageResponse>
            </MessageContent>
          </Message>

          {messages.length === 0 && (
            <div className="space-y-3">
              <Button type="button" variant="navy" size="lg" className="w-full justify-center" onClick={onOpenVoice}>
                <Mic aria-hidden="true" />
                Talk to Our Voice Assistant
              </Button>
              <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    lang="ne"
                    onClick={() => void send(q)}
                    className="rounded-full border border-input bg-background px-3.5 py-2 text-sm text-navy transition-colors hover:border-primary hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent className={cn(userBubble, m.error && "text-destructive")}>
                {m.role === "assistant" ? (
                  <MessageResponse isAnimating={status === "streaming" && m.id === messages.at(-1)?.id}>
                    {m.content}
                  </MessageResponse>
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && (
            <Message from="assistant" aria-live="polite">
              <Shimmer className="text-sm" duration={1.6}>सोच्दै छु… Thinking…</Shimmer>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t bg-background p-3">
        <PromptInput
          onSubmit={(msg) => {
            if (busy) return;
            void send(msg.text);
          }}
          className="[&_[data-slot=input-group]]:rounded-2xl [&_[data-slot=input-group]]:border-input"
        >
          <PromptInputTextarea
            autoFocus
            aria-label="Type your question"
            placeholder="आफ्नो प्रश्न लेख्नुहोस्… / Type your question…"
            className="min-h-12 text-base"
            maxLength={2000}
          />
          <PromptInputFooter className="justify-between pt-0">
            <span className="text-xs text-muted-foreground">Information only — not medical advice</span>
            <PromptInputSubmit status={status} onStop={stop} className="rounded-full" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
