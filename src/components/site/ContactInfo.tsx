import { Facebook, Mail, MapPin, MessageCircle, Phone, Smartphone } from "lucide-react";
import { fullAddress, hospital } from "@/content/site";

export function ContactInfo() {
  const items = [
    { icon: MapPin, label: "Address", value: fullAddress, href: hospital.maps, external: true, cta: "Open in Google Maps" },
    { icon: Phone, label: "Landline", value: hospital.phones.landline.display, href: hospital.phones.landline.href },
    { icon: Smartphone, label: "Mobile", value: hospital.phones.mobile.display, href: hospital.phones.mobile.href },
    { icon: MessageCircle, label: "WhatsApp", value: hospital.phones.mobile.display, href: hospital.whatsapp, external: true, cta: "Chat on WhatsApp" },
    { icon: Mail, label: "Email", value: hospital.email.display, href: hospital.email.href },
    { icon: Facebook, label: "Facebook", value: "facebook.com/janakpurneurohospital", href: hospital.facebook, external: true },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, label, value, href, external, cta }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex h-full gap-4 rounded-2xl border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
              <span className="mt-0.5 block break-words font-semibold text-navy">{value}</span>
              {cta && <span className="mt-1 block text-sm font-medium text-primary">{cta} →</span>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
