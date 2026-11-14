/** One-click "which department?" guide. Guidance only — never a diagnosis. */
export interface Concern {
  id: string;
  label: string;
  labelNe: string;
  /** Matches a department slug in src/content/site.ts */
  department: string;
  team: string;
  advice: string;
  redFlag: boolean;
}

export const concerns: Concern[] = [
  { id: "headache", label: "Headache", labelNe: "टाउको दुखाइ", department: "neurology", team: "Neurology team", advice: "Persistent or unusual headaches are assessed by our neurology team.", redFlag: false },
  { id: "back-pain", label: "Back / neck pain", labelNe: "ढाड / घाँटी दुखाइ", department: "brain-and-spine-care", team: "Brain & spine neurosurgeons", advice: "Spine-related pain, tingling down the arms or legs is seen by our brain & spine team.", redFlag: false },
  { id: "numbness", label: "Numbness / tingling", labelNe: "झमझमाउने / सुन्निने", department: "neurology", team: "Neurology team", advice: "Numbness or tingling is evaluated by our neurology team.", redFlag: false },
  { id: "memory", label: "Memory / dizziness", labelNe: "बिर्सने / रिंगटा", department: "neurology", team: "Neurology team", advice: "Memory changes and dizziness are assessed by our neurology team.", redFlag: false },
  { id: "head-injury", label: "Head injury", labelNe: "टाउकोमा चोट", department: "neurosurgery", team: "Neurosurgery & neuro-trauma team (24/7)", advice: "A head injury can be serious. Come to the hospital or call immediately.", redFlag: true },
  { id: "seizure", label: "Seizure / fits", labelNe: "छारे रोग / काम्ने", department: "critical-care", team: "Emergency & critical care team (24/7)", advice: "A seizure needs urgent medical attention. Call or come to the hospital now.", redFlag: true },
  { id: "weakness", label: "Sudden weakness / slurred speech", labelNe: "अचानक कमजोरी / बोली लरबराउने", department: "critical-care", team: "Emergency & critical care team (24/7)", advice: "Sudden weakness or slurred speech can be an emergency. Seek care immediately.", redFlag: true },
];

export function findConcern(id: string) {
  return concerns.find((c) => c.id === id);
}
