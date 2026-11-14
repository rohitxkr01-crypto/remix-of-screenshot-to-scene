import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, CalendarCheck, ClipboardCheck, Mic, MousePointerClick, Phone, PhoneCall, Play, Sparkles, Stethoscope, TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { openAssistant } from "@/components/site/assistant/assistant-bus";
import { DEMO_PROMPTS, DEMO_TOUR } from "@/lib/hospital-assistant";
import { concerns, findConcern } from "@/content/symptom-guide";
import { departments, doctors, hospital } from "@/content/site";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo")({
  head: () =>
    seo({
      title: "Live Demo — Try the Hospital Website in One Click | Janakpur Neuro Hospital",
      description:
        "Explore the Janakpur Neuro Hospital website in one click: ask the Nepali AI assistant, try the voice assistant, find the right department and preview appointment booking.",
      path: "/demo",
    }),
  component: DemoPage,
});

function DemoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-navy text-navy-foreground">
        <div className="pointer-events-none absolute inset-0 grid-dots" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />
        <div className="container-site relative py-16 sm:py-24">
          <p className="eyebrow animate-rise flex items-center gap-2 text-teal-bright">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Live demo · one click each
          </p>
          <h1 className="animate-rise mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl" style={{ "--delay": "80ms" } as React.CSSProperties}>
            See what Janakpur Neuro Hospital's website can do.
          </h1>
          <p className="animate-rise mt-5 max-w-2xl text-lg text-navy-muted" style={{ "--delay": "160ms" } as React.CSSProperties}>
            No typing needed. Tap any card below to watch the AI assistant answer in Nepali and English, start a voice call,
            find the right department or preview the appointment flow.
          </p>
          <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--delay": "240ms" } as React.CSSProperties}>
            <Button size="lg" onClick={() => openAssistant({ prompts: DEMO_TOUR })}>
              <Play aria-hidden="true" /> Start the auto tour
            </Button>
            <Button size="lg" variant="outline" className="border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" onClick={() => openAssistant({ tab: "voice" })}>
              <Mic aria-hidden="true" /> Talk to the voice assistant
            </Button>
          </div>
          <Stats />
        </div>
      </section>
      <ChatDemos />
      <SymptomGuide />
      <AppointmentPreview />
      <Ribbon />
    </>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { run(); io.disconnect(); } });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Stats() {
  const items = [
    { value: 24, suffix: "/7", label: "Emergency & neuro-trauma" },
    { value: doctors.length, suffix: "", label: "Neurosurgeons" },
    { value: departments.length, suffix: "", label: "Services & departments" },
    { value: 2, suffix: "", label: "Languages: Nepali & English" },
  ];
  return (
    <dl className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-3xl border border-navy-foreground/10 bg-navy-foreground/[0.05] p-5">
          <dt className="text-sm text-navy-muted">{s.label}</dt>
          <dd className="mt-1 font-display text-4xl font-bold text-teal-bright"><Counter to={s.value} suffix={s.suffix} /></dd>
        </div>
      ))}
    </dl>
  );
}

function ChatDemos() {
  return (
    <section className="container-site py-20">
      <SectionHeading eyebrow="AI assistant · Neuro Sathi" title="Tap a question, watch the answer appear" description="Each card opens the assistant and asks the question for you. Answers come live from the AI, in the language you asked." align="center" />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_PROMPTS.map((p, i) => (
          <Reveal as="li" key={p.text} delay={i * 60}>
            <button
              type="button"
              onClick={() => openAssistant({ prompts: [p.text] })}
              className="group flex h-full w-full flex-col items-start gap-3 rounded-3xl border bg-card p-6 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">{p.label}</span>
              <span lang={p.lang} className="text-lg font-semibold text-navy">“{p.text}”</span>
              <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary">
                <MousePointerClick className="h-4 w-4" aria-hidden="true" /> Ask this
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function SymptomGuide() {
  const [selected, setSelected] = useState("headache");
  const c = findConcern(selected);
  const dept = departments.find((d) => d.slug === c?.department);
  return (
    <section className="bg-surface py-20">
      <div className="container-site">
        <SectionHeading eyebrow="Interactive guide" title="Which department should I visit?" description="Tap a concern to see who can help. This is guidance only — not a diagnosis." align="center" />
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {concerns.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={selected === x.id}
              onClick={() => setSelected(x.id)}
              className={cn(
                "rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                selected === x.id ? (x.redFlag ? "border-emergency bg-emergency text-primary-foreground" : "border-primary bg-primary text-primary-foreground") : "bg-card text-navy hover:border-primary/50",
              )}
            >
              {x.label} <span lang="ne" className="opacity-75">· {x.labelNe}</span>
            </button>
          ))}
        </div>
        {c && (
          <div key={c.id} className="mx-auto mt-8 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            {c.redFlag ? (
              <div className="rounded-3xl border-2 border-emergency bg-card p-8 shadow-elevated">
                <p className="flex items-center gap-2 font-bold text-emergency"><TriangleAlert className="h-5 w-5" aria-hidden="true" /> Possible emergency</p>
                <p className="mt-3 text-lg text-foreground">{c.advice}</p>
                <p className="mt-1 text-muted-foreground">{c.team}</p>
                <Button asChild size="lg" className="mt-6 bg-emergency hover:bg-emergency/90">
                  <a href={hospital.phones.landline.href}><PhoneCall aria-hidden="true" /> Call now · {hospital.phones.landline.display}</a>
                </Button>
              </div>
            ) : (
              <div className="rounded-3xl border bg-card p-8 shadow-elevated">
                <p className="flex items-center gap-2 font-bold text-primary"><Stethoscope className="h-5 w-5" aria-hidden="true" /> {dept?.title}</p>
                <p className="mt-3 text-lg text-foreground">{c.advice}</p>
                <p className="mt-1 text-muted-foreground">{c.team}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild><Link to="/appointment">Request an appointment</Link></Button>
                  {dept && <Button asChild variant="outline"><Link to="/services/$slug" params={{ slug: dept.slug }}>About {dept.title}</Link></Button>}
                </div>
              </div>
            )}
            <p className="mt-4 text-center text-xs text-muted-foreground">This guide does not diagnose. Please speak with a doctor about your symptoms.</p>
          </div>
        )}
      </div>
    </section>
  );
}

const steps = [
  { icon: Stethoscope, title: "Choose a service", text: "Pick the department or “not sure”." },
  { icon: ClipboardCheck, title: "Share your details", text: "Name, phone and a preferred day." },
  { icon: Phone, title: "We call you", text: "Our team confirms the time by phone." },
];

function AppointmentPreview() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="container-site py-20">
      <SectionHeading eyebrow="Online booking" title="Appointment requests in three steps" align="center" />
      <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className={cn("rounded-3xl border bg-card p-7 transition-all duration-500", active === i ? "-translate-y-1 border-primary shadow-elevated" : "opacity-70 shadow-card")}>
            <span className={cn("grid h-12 w-12 place-items-center rounded-2xl transition-colors", active === i ? "bg-primary text-primary-foreground" : "bg-accent text-primary")}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy"><span className="sr-only">Step {i + 1}: </span>{title}</h3>
            <p className="mt-1 text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 text-center">
        <Button asChild size="lg">
          <Link to="/appointment" search={{ demo: true }}><CalendarCheck aria-hidden="true" /> Open the form with sample details</Link>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">Nothing is sent unless you press submit.</p>
      </div>
    </section>
  );
}

function Ribbon() {
  const items = [...departments, ...departments];
  return (
    <section aria-label="Our services" className="overflow-hidden border-y bg-navy-deep py-5 text-navy-foreground">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((d, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold">
            <span className="h-2 w-2 rounded-full bg-teal-bright" aria-hidden="true" /> {d.title}
          </span>
        ))}
      </div>
    </section>
  );
}
