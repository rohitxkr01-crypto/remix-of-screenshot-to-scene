import { describe, expect, it } from "vitest";
import { concerns, findConcern } from "@/content/symptom-guide";
import { departments } from "@/content/site";

describe("symptom guide", () => {
  it("treats head injury, seizure and sudden weakness as emergencies", () => {
    for (const id of ["head-injury", "seizure", "weakness"]) expect(findConcern(id)?.redFlag).toBe(true);
  });
  it("maps every concern to a real department", () => {
    for (const c of concerns) expect(departments.some((d) => d.slug === c.department)).toBe(true);
  });
});
