import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CalendarCheck,
  ClipboardList,
  Compass,
  HandHeart,
  Hospital,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArticleCard, DepartmentCard, DoctorAvatar } from "@/components/site/Cards";
import { Gallery } from "@/components/site/Gallery";
import { ContactInfo } from "@/components/site/ContactInfo";
import { ContactForm } from "@/components/site/ContactForm";
import { departments, gallery, heroImage, hospital, leadDoctor, teamEventImage, theatreImage } from "@/content/site";
import { articles } from "@/content/articles";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Janakpur Neuro Hospital | Neurology, Neurosurgery & Brain and Spine Care in Janakpur",
      description:
        "Janakpur Neuro Hospital & Research Center offers patient-focused neurological care in Janakpur, Madhesh Province: neurology, neurosurgery, brain & spine care and critical care.",
      path: "/",
      image: heroImage.src,
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <SpecialtyStrip />
      <About />
      <DoctorSection />
      <GallerySection />
      <Journey />
      <WhyChoose />
      <Articles />
      <ContactSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-site grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow animate-rise flex items-center gap-2">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Your health. Our commitment.
          </p>
          <h1
            className="animate-rise mt-5 text-[2.5rem] font-extrabold leading-[1.05] text-navy sm:text-6xl lg:text-[4.1rem]"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            Expert Neurological Care, <span className="text-primary">With You</span> at Every Step.
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            Providing patient-focused neurological healthcare and trusted medical guidance for individuals and families in
            Janakpur and surrounding communities.
          </p>
          <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--delay": "240ms" } as React.CSSProperties}>
            <Button asChild size="lg">
              <Link to="/appointment">
                <CalendarCheck aria-hidden="true" />
                Request an Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">
                Talk to Our Hospital
                <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <a
            href={hospital.phones.landline.href}
            className="animate-rise mt-8 inline-flex items-center gap-3 rounded-full py-1 pr-4 text-navy hover:text-primary"
            style={{ "--delay": "320ms" } as React.CSSProperties}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-navy-foreground">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Call the hospital</span>
              <span className="font-display text-xl font-bold">{hospital.phones.landline.display}</span>
            </span>
          </a>
        </div>

        <div className="animate-rise relative" style={{ "--delay": "200ms" } as React.CSSProperties}>
          <div className="absolute -right-6 -top-6 hidden h-40 w-40 rounded-full border-[18px] border-teal/15 lg:block" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-elevated">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              fetchPriority="high"
              className="aspect-[4/3.4] w-full object-cover sm:aspect-[4/3]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/50 to-transparent" aria-hidden="true" />
          </div>
          <div className="absolute -bottom-6 -left-2 hidden w-56 overflow-hidden rounded-2xl border-4 border-background shadow-elevated sm:block lg:-left-10">
            <img src={theatreImage.src} alt={theatreImage.alt} width={theatreImage.width} height={theatreImage.height} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -right-2 bottom-8 flex items-center gap-3 rounded-2xl border bg-card/95 px-4 py-3 shadow-elevated backdrop-blur sm:-right-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">
              <Brain className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-bold text-navy">Neuro-focused care</span>
              <span className="text-muted-foreground">Janakpur, Dhanusha</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialtyStrip() {
  return (
    <section aria-labelledby="specialties-title" className="relative border-y bg-surface py-12">
      <div className="container-site">
        <h2 id="specialties-title" className="sr-only">Our specialties</h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 2xl:grid-cols-8">
          {departments.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={i * 60}>
              <DepartmentCard dept={d} compact />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
      <Reveal className="relative">
        <div className="overflow-hidden rounded-[2rem] shadow-elevated">
          <img
            src={teamEventImage.src}
            alt={teamEventImage.alt}
            loading="lazy"
            width={teamEventImage.width}
            height={teamEventImage.height}
            className="aspect-[5/4] w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-5 left-6 rounded-full bg-navy px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-navy-foreground shadow-elevated">
          About our hospital
        </div>
      </Reveal>
      <Reveal delay={100}>
        <SectionHeading
          eyebrow="About our hospital"
          title="Healthcare Built Around People, Professionalism and Trust."
        />
        <p className="mt-6 text-lg text-foreground">
          Janakpur Neuro Hospital & Research Center Pvt. Ltd. is a neurological healthcare institution in Janakpur,
          dedicated to providing patient-focused medical care and guidance for individuals and families in the region.
        </p>
        <p className="mt-4 text-muted-foreground">
          Our focus is neurological healthcare: helping patients understand their condition, communicating clearly with
          families and making specialist medical services easier to reach for communities across Dhanusha and Madhesh
          Province.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Neurology & neurosurgery", "Brain & spine care", "Critical care support", "Diagnostic & lab services"].map((t) => (
            <li key={t} className="flex items-center gap-2.5 font-medium text-navy">
              <BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-8">
          <Link to="/about">
            Discover Our Hospital
            <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}

function DoctorSection() {
  const doctor = leadDoctor;
  return (
    <section className="bg-gradient-soft py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading eyebrow="Our specialist" title="Led by an Experienced Neurosurgical Specialist" align="center" />
        <Reveal className="mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-[2rem] border bg-card shadow-elevated md:grid-cols-[0.9fr_1.1fr]">
          <div className="aspect-[4/3] md:aspect-auto">
            <DoctorAvatar doctor={doctor} size="xl" />
          </div>
          <div className="p-8 sm:p-10">
            <p className="eyebrow">Medical Director / CEO</p>
            <h3 className="mt-3 text-3xl font-bold text-navy">{doctor.name}</h3>
            <ul className="mt-5 space-y-2.5">
              {doctor.titles.map((t) => (
                <li key={t} className="flex items-center gap-3 text-foreground">
                  <Stethoscope className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/doctors/$slug" params={{ slug: doctor.slug }}>
                  View Doctor Profile <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/appointment">Request an Appointment</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="container-site py-20 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Hospital gallery" title="Inside Our Hospital & Community" description="A look at our facilities, our team and our work in the community." />
        <Button asChild variant="outline" className="self-start md:self-auto">
          <Link to="/gallery">
            View Full Gallery <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </div>
      <Reveal className="mt-10">
        <Gallery images={gallery.slice(0, 7)} />
      </Reveal>
    </section>
  );
}

const journey = [
  { icon: Compass, title: "Explore Our Services", text: "Read about our departments to understand how we can help." },
  { icon: Phone, title: "Contact the Hospital", text: "Call, WhatsApp or message us. We'll guide you to the right service." },
  { icon: CalendarCheck, title: "Request an Appointment", text: "Send a request online. Our team will call you to confirm." },
  { icon: Hospital, title: "Visit the Hospital", text: "Bring your reports and medicines list, and a family member if helpful." },
];

function Journey() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy py-20 text-navy-foreground lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-dots" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading eyebrow="Your patient journey" title="Four Simple Steps to Care" description="Clear, simple steps for patients and their families." align="center" light />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 100} className="relative">
              <div className="h-full rounded-3xl border border-navy-foreground/10 bg-navy-foreground/[0.04] p-7 transition-colors hover:border-teal-bright/40">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal text-navy-deep">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-4xl font-bold text-navy-foreground/15" aria-hidden="true">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-2 text-navy-muted">{text}</p>
              </div>
              {i < journey.length - 1 && (
                <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-teal-bright lg:block" aria-hidden="true" />
              )}
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/appointment">Start with an appointment request</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { icon: Brain, title: "Focus on neurological healthcare", text: "A hospital dedicated to conditions of the brain, spine and nervous system." },
  { icon: MessageCircle, title: "Patient-focused communication", text: "We take time to explain conditions and options in clear, simple language." },
  { icon: Stethoscope, title: "Specialist-led neurosurgical care", text: "Neurosurgical services led by a consultant neurosurgeon." },
  { icon: ClipboardList, title: "Facilities & diagnostic support", text: "Operation theatre, critical care and laboratory services on site." },
  { icon: MapPin, title: "Healthcare access in Janakpur", text: "Neurological care closer to home for families across Madhesh Province." },
  { icon: Users, title: "Guidance for families", text: "Support and information for family members at every stage of care." },
];

function WhyChoose() {
  return (
    <section className="container-site py-20 lg:py-28">
      <SectionHeading eyebrow="Why choose us" title="Care You Can Trust, Close to Home" align="center" />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={(i % 3) * 80}>
            <div className="group flex h-full gap-5 rounded-3xl border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-muted-foreground">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl bg-surface p-5 text-sm text-muted-foreground">
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <p>Service availability can change. Please contact the hospital to confirm current services before your visit.</p>
      </div>
    </section>
  );
}

function Articles() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Patient education" title="Health Articles" description="Reliable, easy-to-read information to help you understand brain and spine health." />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/articles">All articles <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" /></Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 80}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="container-site grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
      <div>
        <SectionHeading eyebrow="Get in touch" title="We're Here to Help" description="Reach our hospital team by phone, WhatsApp, email or the message form." />
        <div className="mt-10">
          <ContactInfo />
        </div>
      </div>
      <Reveal className="rounded-[2rem] border bg-card p-6 shadow-elevated sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <HandHeart className="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 className="text-2xl font-bold text-navy">Send us a message</h3>
        </div>
        <ContactForm />
      </Reveal>
    </section>
  );
}
