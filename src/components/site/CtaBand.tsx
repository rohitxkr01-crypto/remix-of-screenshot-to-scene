import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospital } from "@/content/site";
import { Reveal } from "./Reveal";

export function CtaBand({
  title = "Need guidance about neurological care?",
  text = "Request an appointment online or speak with our hospital team. We'll help you find the right service.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-site py-16">
      <Reveal className="relative overflow-hidden rounded-4xl bg-gradient-navy px-6 py-12 text-navy-foreground sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute inset-0 grid-dots" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-navy-muted">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/appointment">
                Request an Appointment
                <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href={hospital.phones.landline.href}>
                <Phone aria-hidden="true" /> {hospital.phones.landline.display}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href={hospital.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
