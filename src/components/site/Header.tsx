import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, ChevronDown, Facebook, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { departments, fullAddress, hospital } from "@/content/site";
import { cn } from "@/lib/utils";

const guideLinks = [
  { to: "/patient-guide", label: "Patient Guide" },
  { to: "/appointment", label: "Request an Appointment" },
  { to: "/gallery", label: "Hospital Gallery" },
  { to: "/demo", label: "Try the Live Demo" },
] as const;

function TopBar() {
  return (
    <div className="bg-navy-deep text-navy-foreground">
      <div className="container-site flex items-center justify-between gap-4 py-2 text-[0.82rem]">
        <ul className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <a href={hospital.phones.landline.href} className="flex items-center gap-1.5 hover:text-teal-bright">
              <Phone className="h-3.5 w-3.5 text-teal-bright" aria-hidden="true" />
              {hospital.phones.landline.display}
            </a>
          </li>
          <li className="hidden sm:block">
            <a href={hospital.phones.mobile.href} className="flex items-center gap-1.5 hover:text-teal-bright">
              <Phone className="h-3.5 w-3.5 text-teal-bright" aria-hidden="true" />
              {hospital.phones.mobile.display}
            </a>
          </li>
          <li className="hidden md:block">
            <a href={hospital.email.href} className="flex items-center gap-1.5 hover:text-teal-bright">
              <Mail className="h-3.5 w-3.5 text-teal-bright" aria-hidden="true" />
              {hospital.email.display}
            </a>
          </li>
          <li className="hidden xl:flex items-center gap-1.5 text-navy-muted">
            <MapPin className="h-3.5 w-3.5 text-teal-bright" aria-hidden="true" />
            <span className="truncate">{hospital.address.line1}, {hospital.address.city}</span>
          </li>
        </ul>
        <a
          href={hospital.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 hover:text-teal-bright"
          aria-label="Janakpur Neuro Hospital on Facebook"
          title={fullAddress}
        >
          <Facebook className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Facebook</span>
        </a>
      </div>
    </div>
  );
}

function Dropdown({
  label,
  active,
  children,
}: {
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "relative flex items-center gap-1 rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors hover:text-primary",
          active ? "text-primary" : "text-navy",
        )}
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 transition-all duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
        onClick={() => setOpen(false)}
      >
        <div className="rounded-2xl border bg-popover p-2 shadow-elevated">{children}</div>
      </div>
    </div>
  );
}

const navLink =
  "relative rounded-full px-3 py-2 text-[0.95rem] font-medium text-navy transition-colors hover:text-primary data-[status=active]:text-primary";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <TopBar />
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-shadow duration-300",
          scrolled ? "shadow-card" : "shadow-none",
        )}
      >
        <div className={cn("container-site flex items-center justify-between gap-4 transition-all duration-300", scrolled ? "h-16" : "h-20")}>
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            <Link to="/" className={navLink} activeOptions={{ exact: true }}>Home</Link>
            <Link to="/about" className={navLink}>About Us</Link>
            <Dropdown label="Our Services" active={pathname.startsWith("/services")}>
              <Link to="/services" className="block rounded-xl px-3 py-2 text-sm font-semibold text-navy hover:bg-soft">
                All departments
              </Link>
              {departments.map((d) => (
                <Link
                  key={d.slug}
                  to="/services/$slug"
                  params={{ slug: d.slug }}
                  className="block rounded-xl px-3 py-2 text-sm text-foreground hover:bg-soft hover:text-primary"
                >
                  {d.title}
                </Link>
              ))}
            </Dropdown>
            <Link to="/doctors" className={navLink}>Our Doctors</Link>
            <Dropdown
              label="Patient Guide"
              active={["/patient-guide", "/appointment", "/gallery"].some((p) => pathname.startsWith(p))}
            >
              {guideLinks.map((l) => (
                <Link key={l.to} to={l.to} className="block rounded-xl px-3 py-2 text-sm text-foreground hover:bg-soft hover:text-primary">
                  {l.label}
                </Link>
              ))}
            </Dropdown>
            <Link to="/articles" className={navLink}>Health Articles</Link>
            <Link to="/contact" className={navLink}>Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/appointment">
                <CalendarCheck aria-hidden="true" />
                Request an Appointment
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="sm:hidden" aria-label={`Call ${hospital.phones.landline.display}`}>
              <a href={hospital.phones.landline.href}>
                <Phone aria-hidden="true" />
              </a>
            </Button>
            <Button
              variant="navy"
              size="icon"
              className="lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const item = "block rounded-xl px-4 py-3 text-base font-medium text-navy hover:bg-soft data-[status=active]:bg-soft data-[status=active]:text-primary";
  return (
    <div
      id="mobile-menu"
      className={cn("fixed inset-0 z-50 lg:hidden", open ? "visible" : "invisible")}
      aria-hidden={!open}
    >
      <div
        className={cn("absolute inset-0 bg-navy-deep/60 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(22rem,100%)] flex-col bg-background shadow-elevated transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <span className="font-display text-lg font-bold text-navy">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X aria-hidden="true" />
          </Button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <Link to="/" className={item} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/about" className={item}>About Us</Link>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-navy hover:bg-soft"
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((o) => !o)}
          >
            Our Services
            <ChevronDown className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")} aria-hidden="true" />
          </button>
          {servicesOpen && (
            <div className="mb-2 ml-4 border-l pl-2">
              <Link to="/services" className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-semibold text-navy hover:bg-soft">All departments</Link>
              {departments.map((d) => (
                <Link key={d.slug} to="/services/$slug" params={{ slug: d.slug }} className="block rounded-lg px-3 py-2.5 text-[0.95rem] text-foreground hover:bg-soft">
                  {d.title}
                </Link>
              ))}
            </div>
          )}
          <Link to="/doctors" className={item}>Our Doctors</Link>
          <Link to="/patient-guide" className={item}>Patient Guide</Link>
          <Link to="/gallery" className={item}>Gallery</Link>
          <Link to="/articles" className={item}>Health Articles</Link>
          <Link to="/contact" className={item}>Contact</Link>
        </nav>
        <div className="space-y-3 border-t p-5">
          <Button asChild className="w-full" size="lg">
            <Link to="/appointment">
              <CalendarCheck aria-hidden="true" /> Request an Appointment
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <a href={hospital.phones.landline.href}>
              <Phone aria-hidden="true" /> Call {hospital.phones.landline.display}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
