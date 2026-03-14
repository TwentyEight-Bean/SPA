import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Sparkles, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, ChevronRight, Heart } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/40 to-fuchsia-50/20 text-gray-900">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-pink-100/60 border-b border-pink-100"
            : "bg-white/85 backdrop-blur-md border-b border-pink-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center shadow-lg shadow-pink-300/40 group-hover:shadow-pink-300/60 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold tracking-wide text-gray-900">
              AURA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-all duration-200 relative group ${
                  location.pathname === link.href ? "text-pink-600 font-medium" : "text-gray-600 hover:text-pink-600"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#EC4899] to-[#A855F7] transition-all duration-300 ${
                    location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">
              Sign In
            </Link>
            <Link
              to="/booking"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/40 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-pink-600 hover:bg-pink-50 transition-all"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-pink-100 px-6 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block text-base py-2 transition-colors ${
                  location.pathname === link.href ? "text-pink-600 font-medium" : "text-gray-600 hover:text-pink-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3 border-t border-pink-100">
              <Link to="/login" className="text-gray-500 text-sm hover:text-pink-600 py-2">Sign In</Link>
              <Link
                to="/booking"
                className="text-center py-3 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gradient-to-br from-[#1E0818] via-[#2D0F24] to-[#160610] border-t border-pink-900/20 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold text-white">AURA</span>
              </Link>
              <p className="text-pink-200/60 text-sm leading-relaxed mb-6">
                Where luxury meets wellness. Experience the art of beauty and relaxation in a sanctuary crafted for the discerning.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full bg-white/5 border border-pink-300/10 flex items-center justify-center text-pink-200/40 hover:text-pink-300 hover:bg-pink-500/10 hover:border-pink-400/30 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-semibold mb-6">Explore</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-pink-200/50 text-sm hover:text-pink-300 transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#EC4899]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-semibold mb-6">Treatments</h4>
              <ul className="space-y-3">
                {["Signature Facial", "Hot Stone Massage", "Aromatherapy Ritual", "Body Wrap Therapy", "Anti-Aging Facial", "Hydrotherapy Pool"].map((s) => (
                  <li key={s}>
                    <Link to="/services" className="text-pink-200/50 text-sm hover:text-pink-300 transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#EC4899]" />
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#EC4899] mt-0.5 shrink-0" />
                  <span className="text-pink-200/60 text-sm">425 Madison Avenue, Suite 1200<br />New York, NY 10017</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#EC4899] shrink-0" />
                  <a href="tel:+12125550100" className="text-pink-200/60 text-sm hover:text-pink-300 transition-colors">+1 (212) 555-0100</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#EC4899] shrink-0" />
                  <a href="mailto:hello@auraspa.com" className="text-pink-200/60 text-sm hover:text-pink-300 transition-colors">hello@auraspa.com</a>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-white/[0.05] border border-pink-300/10">
                <p className="text-pink-300/50 text-xs mb-1">Opening Hours</p>
                <p className="text-pink-100/80 text-sm">Mon – Fri: 9am – 8pm</p>
                <p className="text-pink-100/80 text-sm">Sat – Sun: 10am – 7pm</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-[#EC4899]/15 to-[#A855F7]/15 border border-pink-400/15 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-xl font-semibold mb-1">
                  Join the AURA Community
                </h3>
                <p className="text-pink-200/60 text-sm">Exclusive offers, wellness tips, and new treatment announcements.</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/8 border border-pink-300/15 text-white text-sm placeholder-pink-200/30 focus:outline-none focus:border-pink-400/40 transition-colors"
                />
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-pink-300/10">
            <p className="text-pink-200/40 text-sm flex items-center gap-1.5">
              © 2026 AURA Luxury Spa. Made with <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a key={item} href="#" className="text-pink-200/40 text-sm hover:text-pink-300 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
