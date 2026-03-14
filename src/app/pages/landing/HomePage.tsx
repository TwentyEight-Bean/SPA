import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight, Star, CheckCircle, Play, ChevronLeft, ChevronRight,
  Sparkles, Wind, Droplets, Zap, Heart, Clock, Award, Users
} from "lucide-react";
import { services, specialists, testimonials, blogPosts, pricingPackages, IMAGES } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
      <Sparkles className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50/60 to-fuchsia-50/40">
      {/* Background image with soft overlay */}
      <div className="absolute inset-0 opacity-15">
        <ImageWithFallback
          src={IMAGES.hero}
          alt="AURA Luxury Spa"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated blossom orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-rose-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <SectionBadge label="Premium Luxury Spa Experience" />

          <h1 style={SERIF} className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-gray-900 leading-[1.1] mb-6">
            Elevate Your{" "}
            <GradientText>Natural</GradientText>
            <br />
            Beauty & Wellbeing
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
            Experience world-class treatments crafted by elite specialists in a sanctuary designed for the discerning. Where luxury meets transformation.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              to="/booking"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-2xl hover:shadow-pink-300/40 transition-all duration-300 group"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-pink-200 text-gray-700 font-medium hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 shadow-sm"
            >
              <Play className="w-4 h-4 text-pink-500" />
              View Services
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: "15K+", label: "Happy Clients" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "12+", label: "Awards Won" },
              { value: "8", label: "Elite Specialists" },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={SERIF} className="text-3xl font-semibold">
                  <GradientText>{stat.value}</GradientText>
                </p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-pink-400" />
        <p className="text-pink-500 text-xs tracking-widest uppercase">Scroll</p>
      </div>
    </section>
  );
}

// ── Featured Treatments ───────────────────────────────────────────────────────
function FeaturedTreatments() {
  const featured = services.filter((s) => s.featured).slice(0, 4);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Our Signature Treatments" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Curated for <GradientText>Exceptional</GradientText> Results
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Each treatment is a masterpiece, blending ancient wisdom with cutting-edge techniques for a truly transformative experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service, i) => (
            <div
              key={service.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-pink-100 hover:border-pink-300/60 hover:shadow-xl hover:shadow-pink-200/30 transition-all duration-500"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-pink-300 text-xs uppercase tracking-wider">{service.category}</span>
                <h3 style={SERIF} className="text-white text-xl font-semibold mt-1 mb-2">{service.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{service.duration}</span>
                  <span className="text-white font-semibold">${service.price}</span>
                </div>
                <Link
                  to="/booking"
                  className="mt-4 flex items-center gap-2 text-pink-300 text-sm group-hover:gap-3 transition-all"
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-pink-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 group"
          >
            View All Treatments
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Service Categories ────────────────────────────────────────────────────────
function ServiceCategories() {
  const categories = [
    { icon: Sparkles, title: "Facial Treatments", desc: "Advanced skincare for radiant results", count: "12 treatments", color: "from-pink-100 to-rose-50" },
    { icon: Wind, title: "Massage Therapy", desc: "Deep relaxation for body and mind", count: "8 treatments", color: "from-purple-100 to-fuchsia-50" },
    { icon: Droplets, title: "Holistic Wellness", desc: "Mind-body harmony through ancient rituals", count: "6 treatments", color: "from-rose-100 to-pink-50" },
    { icon: Zap, title: "Body Treatments", desc: "Full-body transformation rituals", count: "5 treatments", color: "from-fuchsia-100 to-purple-50" },
    { icon: Heart, title: "Water Therapy", desc: "Healing hydrotherapy experiences", count: "4 treatments", color: "from-pink-100 to-fuchsia-50" },
    { icon: Award, title: "Hand & Nail", desc: "Precision artistry for hands and nails", count: "6 treatments", color: "from-rose-100 to-purple-50" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-fuchsia-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Treatment Categories" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Every <GradientText>Need</GradientText>, Perfectly Met
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                to="/services"
                key={i}
                className="group p-8 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/60 hover:shadow-lg hover:shadow-pink-100/60 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} border border-pink-200/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-[#EC4899]" />
                </div>
                <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{cat.desc}</p>
                <span className="text-pink-500 text-xs uppercase tracking-wider">{cat.count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Before/After Gallery ──────────────────────────────────────────────────────
function BeforeAfterSection() {
  const pairs = [
    { before: IMAGES.skincare, after: IMAGES.glowingSkin, label: "Anti-Aging Facial Treatment" },
    { before: IMAGES.facial, after: IMAGES.elegantSpa, label: "Signature Rejuvenation Facial" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Visible Transformations" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Real Results, <GradientText>Real Beauty</GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            The AURA difference is visible from your very first session. See the transformation our clients experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pairs.map((pair, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-pink-100 bg-white shadow-lg shadow-pink-50/60">
              <div className="grid grid-cols-2 gap-px bg-pink-100">
                <div className="relative aspect-[4/5]">
                  <ImageWithFallback src={pair.before} alt="Before" className="w-full h-full object-cover opacity-75" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-gray-600 text-xs backdrop-blur-sm border border-pink-100">Before</span>
                  </div>
                </div>
                <div className="relative aspect-[4/5]">
                  <ImageWithFallback src={pair.after} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-xs">After</span>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-pink-50/40">
                <p style={SERIF} className="text-gray-800 font-medium">{pair.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-rose-50/50 via-pink-50/40 to-fuchsia-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Client Stories" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Trusted by <GradientText>Thousands</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/60 hover:shadow-lg hover:shadow-pink-100/40 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-medium">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.service} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(3, 6).map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/60 hover:shadow-lg hover:shadow-pink-100/40 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#A855F7] text-[#A855F7]" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] flex items-center justify-center text-white text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-medium">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.service} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Specialists ───────────────────────────────────────────────────────────────
function SpecialistsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Our Expert Team" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Masters of Their <GradientText>Craft</GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our specialists are among the most highly trained and passionate professionals in luxury wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((spec) => (
            <div key={spec.id} className="group text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden border-2 border-pink-100 group-hover:border-pink-400/60 group-hover:shadow-xl group-hover:shadow-pink-200/40 transition-all duration-500">
                <ImageWithFallback
                  src={spec.image}
                  alt={spec.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-1">{spec.name}</h3>
              <p className="text-pink-500 text-sm mb-3">{spec.role}</p>
              <p className="text-gray-400 text-xs mb-4">{spec.experience} experience</p>
              <div className="flex flex-wrap justify-center gap-2">
                {spec.specialties.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-600 text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-fuchsia-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Membership Plans" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Invest in Your <GradientText>Wellbeing</GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Choose a membership that fits your lifestyle. All plans include exclusive member benefits and priority access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                pkg.featured
                  ? "bg-gradient-to-b from-pink-50 to-fuchsia-50/60 border-2 border-pink-300/60 scale-105 shadow-xl shadow-pink-200/40"
                  : "bg-white border border-pink-100 hover:border-pink-300/50 hover:shadow-lg hover:shadow-pink-100/40"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-xs font-medium shadow-sm shadow-pink-300/40">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">{pkg.tagline}</p>
              </div>

              <div className="mb-8">
                <span style={SERIF} className="text-5xl font-semibold text-gray-900">${pkg.price}</span>
                <span className="text-gray-400 text-sm">/{pkg.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#EC4899] mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/booking"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-medium transition-all duration-300 group ${
                  pkg.featured
                    ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30"
                    : "border border-pink-200 text-gray-700 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700"
                }`}
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Blog Preview ──────────────────────────────────────────────────────────────
function BlogPreview() {
  const recent = blogPosts.slice(0, 3);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionBadge label="Wellness Journal" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900">
              Insights & <GradientText>Inspiration</GradientText>
            </h2>
          </div>
          <Link to="/blog" className="flex items-center gap-2 text-pink-500 hover:text-pink-700 transition-colors group">
            View All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recent.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <div className="aspect-video rounded-2xl overflow-hidden mb-5 border border-pink-100">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-pink-600 text-xs">
                  {post.category}
                </span>
                <span className="text-gray-400 text-xs">{post.readTime}</span>
              </div>
              <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-xs font-semibold">
                  {post.author.initials}
                </div>
                <span className="text-gray-500 text-xs">{post.author.name}</span>
                <span className="text-gray-300 text-xs">·</span>
                <span className="text-gray-400 text-xs">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-50/70 via-pink-50/60 to-fuchsia-50/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden p-16 text-center bg-gradient-to-br from-white via-pink-50/60 to-fuchsia-50/40 border border-pink-200/50 shadow-lg shadow-pink-100/40">
          {/* Decorative top line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#EC4899]/50 to-transparent" />
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-100/60 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-fuchsia-100/60 to-transparent rounded-tl-full" />

          <div className="relative z-10">
            <SectionBadge label="Your Journey Begins" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Ready for Your <GradientText>Transformation</GradientText>?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
              Book your appointment today and discover why AURA is the preferred destination for those who demand the finest in beauty and wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-2xl hover:shadow-pink-300/40 transition-all duration-300 group"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-10 py-4 rounded-full border border-pink-200 text-gray-700 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTreatments />
      <ServiceCategories />
      <BeforeAfterSection />
      <TestimonialsSection />
      <SpecialistsSection />
      <PricingSection />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
