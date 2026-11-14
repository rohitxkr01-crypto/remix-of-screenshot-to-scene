# One-click demo showcase

Goal: let a visitor (or a prospective client) see the best of the site in seconds, with no typing.

## What gets built

1. **"Try the demo" page (/demo)**
   - Bold intro: "See what Janakpur Neuro Hospital's website can do."
   - A grid of feature tiles; each tile opens or runs its feature with one click.
   - Linked from the header and a small banner on the homepage.

2. **Ready-made chat demos (Neuro Sathi)**
   - One-click demo questions in Nepali and English, e.g. "डाक्टरहरू को को हुनुहुन्छ?", "What are your opening hours?", "My father had a head injury — what should I do?", "Where is the hospital?".
   - Clicking a question opens the assistant and sends it automatically, so the live AI answer streams in.
   - "Auto tour" button: plays three questions back to back to show Nepali, English and emergency-safety answers.

3. **Voice assistant spotlight**
   - Tile that opens the Voice tab with a short explanation and the "Talk to Our Voice Assistant" button ready.

4. **Interactive symptom-to-department guide** (not a diagnosis)
   - Visitor taps body areas / concerns (headache, back pain, head injury, numbness, seizures).
   - Shows which department handles it, which doctor team, and a "Request appointment" button. Red-flag choices show an emergency call card with the 24/7 number.
   - Clear "This is guidance, not a diagnosis" note.

5. **Appointment flow preview**
   - Animated 3-step walkthrough (choose service, fill details, team calls you) with a "Fill sample details" button that pre-fills the real form with demo data (not submitted automatically).

6. **Live stats and trust band**
   - Animated counters (24/7 emergency, 3 neurosurgeons, 8 services) and a scrolling services ribbon.

7. **Polish**
   - Smooth entry animations, hover lift on tiles, mobile-friendly layout, same navy/teal branding.

## Rules kept
- Assistant stays Nepali-first, FAQ-only, never diagnoses or prescribes.
- No fake patient data saved; demo form fill never auto-submits.

## Technical details
- New route `src/routes/demo.tsx` with its own head() metadata.
- Assistant widget gets a small shared store/event (`openAssistant({ tab, prompt })`) so any page can open it and send a preset message; demo prompts live in `src/lib/hospital-assistant.ts`.
- Symptom guide data in `src/content/symptom-guide.ts`; mapping rules covered by a vitest test (red-flag items always show emergency card).
- Appointment page reads `?demo=1` to pre-fill fields.
- Counters/animations via existing Reveal + CSS; no new heavy libraries.
