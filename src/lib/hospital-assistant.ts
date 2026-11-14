/**
 * Shared knowledge, rules and request limits for the hospital's text chatbot.
 * The same facts are used for the voice assistant prompt (see VAPI_SYSTEM_PROMPT_NOTE).
 * Pure module: safe to import from browser and server code.
 */

export const ASSISTANT_NAME = "Neuro Sathi";

export const hospitalFacts = {
  name: "Janakpur Neuro Hospital & Research Center Pvt. Ltd.",
  location:
    "Bisahara Chowk / Murlichowk, Ward No. 4, Janakpurdham, Madhesh Province, Nepal",
  phones: ["+977 41-591584", "+977 9801669434", "+977 981-6988416"],
  hours: "Open 24 hours, every day",
  emergency: "24/7 neuro-trauma and emergency services",
  services: [
    "Brain Surgery",
    "Spine Surgery",
    "Neurosurgery",
    "Neuro-Trauma Care",
    "Critical Neurological Care",
    "Diagnostic Services",
  ],
  doctors: [
    "Dr. Vijay K. Raut – Consultant Neurosurgeon (Brain & Spine Surgeon), Medical Director/CEO",
    "Dr. Alok Jha – Neurosurgeon",
    "Dr. Mustafa Shesh – Neurosurgeon",
  ],
  facebook: "https://www.facebook.com/janakpurneurohospital/",
} as const;

export const SYSTEM_PROMPT = `You are ${ASSISTANT_NAME}, the website information and FAQ assistant for ${hospitalFacts.name}

LANGUAGE
- Reply in Nepali (Devanagari script) by default, using polite and respectful Nepali (e.g. "तपाईं", "हजुर", "धन्यवाद").
- Understand visitors writing in Nepali, including romanised Nepali.
- Never switch to Hindi on your own. If the visitor writes in English, you may reply in English.

HOSPITAL INFORMATION (the only facts you may state)
- Name: ${hospitalFacts.name}
- Location: ${hospitalFacts.location}
- Contact numbers: ${hospitalFacts.phones.join(", ")}
- Opening hours: ${hospitalFacts.hours}
- Emergency: ${hospitalFacts.emergency}
- Main services: ${hospitalFacts.services.join(", ")}
- Doctors:
${hospitalFacts.doctors.map((d) => `  - ${d}`).join("\n")}
- Official Facebook page: ${hospitalFacts.facebook}

HOW TO ANSWER
- Keep answers short (2–5 sentences), clear, friendly and accurate. Simple words suit elderly visitors.
- If a question is not covered by the information above (fees, appointment slots, specific test prices, insurance, etc.), do not guess. Politely suggest calling the hospital on the numbers above.
- To book an appointment, suggest calling the hospital or using the "Request an Appointment" page on this website.

MEDICAL SAFETY RULES
- You are an information assistant, not a doctor.
- Never diagnose, never prescribe medicines or dosages, and never promise treatment outcomes.
- For serious symptoms — head injury or accident, unconsciousness, seizures/fits, sudden weakness or numbness, sudden severe headache, difficulty speaking — tell the visitor to seek emergency care immediately: come to the hospital's 24/7 emergency or call ${hospitalFacts.phones[0]} / ${hospitalFacts.phones[1]}. Say this first, before anything else, and do not keep them chatting.`;

export const WELCOME_MESSAGE = `नमस्ते! म ${ASSISTANT_NAME}, जनकपुर न्युरो अस्पतालको सहायक हुँ। अस्पतालको सेवा, चिकित्सक, ठेगाना वा सम्पर्कबारे सोध्न सक्नुहुन्छ।

*Hello! You can also ask in English.*

आपतकालीन अवस्थामा तुरुन्तै **${hospitalFacts.phones[0]}** मा फोन गर्नुहोस् — अस्पताल २४ घण्टा खुला छ।`;

export const SUGGESTED_QUESTIONS = [
  "अस्पताल कहाँ छ?",
  "के अस्पताल २४ घण्टा खुला हुन्छ?",
  "न्युरोसर्जनहरू को-को हुनुहुन्छ?",
  "सम्पर्क नम्बर के हो?",
] as const;

export type ChatRole = "user" | "assistant";
export interface ChatTurn {
  role: ChatRole;
  content: string;
}

export const CHAT_LIMITS = {
  /** Most recent turns sent to the model. */
  maxTurns: 20,
  /** Longest single message accepted, in characters. */
  maxChars: 2000,
} as const;

/**
 * Validates and trims an incoming chat history. Returns null when the payload is unusable.
 * Keeps only the newest `maxTurns` turns, and requires the last turn to be from the visitor.
 */
export function sanitizeChatHistory(input: unknown): ChatTurn[] | null {
  if (!input || typeof input !== "object") return null;
  const raw = (input as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const turns: ChatTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const text = content.trim();
    if (!text) continue;
    if (text.length > CHAT_LIMITS.maxChars) return null;
    turns.push({ role, content: text });
  }

  const recent = turns.slice(-CHAT_LIMITS.maxTurns);
  if (recent.length === 0 || recent[recent.length - 1]?.role !== "user") return null;
  return recent;
}

/** One-click demo questions shown on the /demo page. */
export const DEMO_PROMPTS = [
  { label: "डाक्टरहरू", text: "अस्पतालमा कुन कुन डाक्टर हुनुहुन्छ?", lang: "ne" },
  { label: "Opening hours", text: "What are your opening hours?", lang: "en" },
  { label: "Head injury", text: "My father had a head injury — what should I do?", lang: "en" },
  { label: "ठेगाना", text: "अस्पताल कहाँ छ? फोन नम्बर के हो?", lang: "ne" },
  { label: "Services", text: "Which neurosurgery services do you offer?", lang: "en" },
  { label: "अपोइन्टमेन्ट", text: "अपोइन्टमेन्ट कसरी लिने?", lang: "ne" },
] as const;

/** Auto tour: Nepali, English, then an emergency-safety answer. */
export const DEMO_TOUR = [
  "नमस्ते! अस्पतालमा कुन कुन सेवा छन्?",
  "Is the hospital open at night?",
  "Can you tell me which medicine to take for a seizure?",
];
