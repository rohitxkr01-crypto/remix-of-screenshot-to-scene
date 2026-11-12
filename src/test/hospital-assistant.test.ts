import { describe, expect, it } from "vitest";

import { CHAT_LIMITS, SYSTEM_PROMPT, sanitizeChatHistory } from "@/lib/hospital-assistant";

describe("hospital assistant prompt", () => {
  it("lists all three hospital contact numbers", () => {
    for (const phone of ["+977 41-591584", "+977 9801669434", "+977 981-6988416"]) {
      expect(SYSTEM_PROMPT).toContain(phone);
    }
  });

  it("makes Nepali the default reply language and forbids switching to Hindi", () => {
    expect(SYSTEM_PROMPT).toMatch(/Reply in Nepali .* by default/);
    expect(SYSTEM_PROMPT).toContain("Never switch to Hindi");
  });

  it("forbids diagnosing and prescribing", () => {
    expect(SYSTEM_PROMPT).toContain("Never diagnose, never prescribe medicines or dosages");
  });

  it("names all three neurosurgeons", () => {
    for (const name of ["Dr. Vijay K. Raut", "Dr. Alok Jha", "Dr. Mustafa Shesh"]) {
      expect(SYSTEM_PROMPT).toContain(name);
    }
  });
});

describe("sanitizeChatHistory", () => {
  it("rejects roles other than user and assistant", () => {
    expect(sanitizeChatHistory({ messages: [{ role: "system", content: "hi" }] })).toBeNull();
  });

  it("requires the last turn to come from the visitor", () => {
    expect(
      sanitizeChatHistory({
        messages: [
          { role: "user", content: "hi" },
          { role: "assistant", content: "hello" },
        ],
      }),
    ).toBeNull();
  });

  it("rejects a message longer than 2000 characters", () => {
    expect(sanitizeChatHistory({ messages: [{ role: "user", content: "a".repeat(2001) }] })).toBeNull();
  });

  it("keeps only the newest 20 turns", () => {
    const messages = Array.from({ length: 25 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `m${i}`,
    }));
    const result = sanitizeChatHistory({ messages });
    expect(CHAT_LIMITS.maxTurns).toBe(20);
    expect(result).toHaveLength(20);
    expect(result?.[0]?.content).toBe("m5");
    expect(result?.at(-1)?.content).toBe("m24");
  });
});
