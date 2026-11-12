import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { LogoMark } from "./Logo";
import { departments, fullAddress, hospital } from "@/content/site";

const quick = [
  { to: "/about", label: "About Us" },
  { to: "/doctors", label: "Our Doctors" },
  { to: "/patient-guide", label: "Patient Guide" },
  { to: "/appointment", label: "Request an Appointment" },
  { to: "/articles", label: "Health Articles" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const linkCls = "text-navy-muted transition-colors hover:text-teal-bright";
  return (
    <footer className="relative overflow-hidden bg-gradient-navy text-navy-foreground">
      <div className="pointer-events-none absolute inset-0 grid-dots opacity-60" aria-hidden="true" />
      <div className="container-site relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="font-display text-lg font-bold leading-tight">Janakpur Neuro Hospital</p>
              <p className="text-xs uppercase tracking-[0.14em] text-navy-muted">& Research Center Pvt. Ltd.</p>
            </div>
          </div>
          <p className="mt-5 font-display text-xl italic text-teal-bright">"{hospital.motto}"</p>
          <p className="mt-3 text-sm text-navy-muted">
            Patient-focused neurological healthcare for individuals and families in Janakpur and Madhesh Province.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={hospital.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-navy-foreground/20 hover:border-teal-bright hover:text-teal-bright">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={hospital.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-navy-foreground/20 hover:border-teal-bright hover:text-teal-bright">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={hospital.maps} target="_blank" rel="noopener noreferrer" aria-label="Google Maps" className="grid h-11 w-11 place-items-center rounded-full border border-navy-foreground/20 hover:border-teal-bright hover:text-teal-bright">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold">Quick Links</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {quick.map((l) => (
              <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold">Departments</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {departments.map((d) => (
              <li key={d.slug}>
                <Link to="/services/$slug" params={{ slug: d.slug }} className={linkCls}>{d.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3.5 text-[0.95rem]">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal-bright" aria-hidden="true" />
              <a href={hospital.maps} target="_blank" rel="noopener noreferrer" className={linkCls}>{fullAddress}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-teal-bright" aria-hidden="true" />
              <span className="flex flex-col">
                <a href={hospital.phones.landline.href} className={linkCls}>{hospital.phones.landline.display}</a>
                <a href={hospital.phones.mobile.href} className={linkCls}>{hospital.phones.mobile.display}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-teal-bright" aria-hidden="true" />
              <a href={hospital.email.href} className={`${linkCls} break-all`}>{hospital.email.display}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-navy-foreground/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {hospital.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link to="/privacy-policy" className={linkCls}>Privacy Policy</Link></li>
            <li><Link to="/terms" className={linkCls}>Terms & Conditions</Link></li>
            <li><Link to="/sitemap" className={linkCls}>Sitemap</Link></li>
            <li><Link to="/staff" className={linkCls}>Staff</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
