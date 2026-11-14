import type { AssistantTab } from "./AssistantPanel";

export interface OpenAssistantDetail {
  tab?: AssistantTab;
  /** Messages sent one after another (each waits for the previous answer). */
  prompts?: string[];
}

const EVENT = "hospital-assistant:open";

/** Open the floating assistant from anywhere, optionally sending preset questions. */
export function openAssistant(detail: OpenAssistantDetail = {}) {
  window.dispatchEvent(new CustomEvent<OpenAssistantDetail>(EVENT, { detail }));
}

export function onOpenAssistant(handler: (d: OpenAssistantDetail) => void) {
  const fn = (e: Event) => handler((e as CustomEvent<OpenAssistantDetail>).detail ?? {});
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}
