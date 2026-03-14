import { Link, useParams } from "react-router";
import { ArrowLeft, Clock, Share2, Twitter, Facebook, Link2, Sparkles, BookOpen } from "lucide-react";
import { blogPosts } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const ARTICLE_CONTENT = `
## Introduction

The journey to radiant, healthy skin begins with understanding the fundamental principles of skincare. At AURA, we believe that every person deserves to feel confident in their skin — and our treatments are designed with exactly that goal in mind.

## The Science Behind It

Modern skincare science has made remarkable advances in recent years. What was once considered impossible — reversing signs of aging, restoring deep hydration, correcting hyperpigmentation — is now achievable with the right combination of active ingredients and professional techniques.

Our team of expert aestheticians stay at the forefront of these developments, continuously updating their knowledge and techniques to deliver the most effective treatments available.

## Key Principles

**1. Consistency is Everything**

The most beautiful skin doesn't come from a single treatment — it comes from a consistent, thoughtful routine. Whether you visit us monthly or weekly, maintaining regularity in your skincare regimen is what creates lasting transformation.

**2. Personalization Matters**

No two skins are alike. What works for one person may be completely wrong for another. This is why every AURA treatment begins with a thorough consultation to understand your unique skin type, concerns, and goals.

**3. Quality Ingredients Are Non-Negotiable**

We exclusively use professional-grade products formulated with the highest quality active ingredients. From Swiss botanical extracts to advanced peptide complexes, every ingredient in our treatments has been carefully selected for maximum efficacy.

## Our Recommended Approach

Based on years of treating thousands of clients, here is what we recommend for most skin types...

The journey begins with proper cleansing — removing the day's accumulation of pollutants, makeup, and environmental damage. This isn't just about cleaning the surface; it's about preparing the skin to receive the nourishing treatments that follow.

## Results You Can Expect

With consistent professional treatment and a good home care routine, most clients see visible improvements within 4-6 weeks. These include:

- Improved skin texture and tone
- Reduced appearance of fine lines
- More even complexion
- Enhanced natural radiance
- Stronger skin barrier function

## Conclusion

Your skin is your largest organ and deserves the finest care. At AURA, we are honored to be your partners on the journey to your most radiant self. Every treatment we perform, every product we recommend, every piece of advice we share — all of it is in service of your skin's health and beauty.
`;

export function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const otherRelated = blogPosts.filter((p) => p.id !== post.id).slice(0, 3 - related.length);
  const allRelated = [...related, ...otherRelated].slice(0, 3);

  const tocItems = [
    "Introduction",
    "The Science Behind It",
    "Key Principles",
    "Our Recommended Approach",
    "Results You Can Expect",
    "Conclusion",
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] pt-24">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-0">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>
      </div>

      <article className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post header */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7A5CFF]/10 border border-[#7A5CFF]/30 text-[#A78BFA] text-sm mb-5">
                <Sparkles className="w-3.5 h-3.5" /> {post.category}
              </span>
              <h1 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A5CFF] to-[#4F8CFF] flex items-center justify-center text-white font-semibold">
                    {post.author.initials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{post.author.name}</p>
                    <p className="text-white/40 text-xs">{post.author.role}</p>
                  </div>
                </div>
                <span className="text-white/20">·</span>
                <span className="text-white/40 text-sm">{post.date}</span>
                <span className="text-white/20">·</span>
                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Clock className="w-4 h-4" /> {post.readTime}
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-sm">Share:</span>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 text-sm transition-all"
                >
                  <Link2 className="w-4 h-4" /> Copy link
                </button>
                <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-400 hover:border-blue-400/30 transition-all">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-600 hover:border-blue-600/30 transition-all">
                  <Facebook className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cover image */}
            <div className="rounded-2xl overflow-hidden mb-10 border border-white/5">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Article content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 text-lg leading-relaxed mb-6" style={{ fontStyle: "italic" }}>
                {post.excerpt}
              </p>

              {ARTICLE_CONTENT.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} style={SERIF} className="text-white text-2xl font-semibold mt-10 mb-4">
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("**") && block.endsWith("**")) {
                  const inner = block.replace(/\*\*/g, "");
                  return <p key={i} className="text-white font-medium mb-3">{inner}</p>;
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="space-y-2 mb-6 ml-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-white/60 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7A5CFF] mt-2 shrink-0" />
                          {item.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.trim()) {
                  // Handle bold inline text
                  const parts = block.split(/(\*\*[^*]+\*\*)/);
                  return (
                    <p key={i} className="text-white/60 leading-relaxed mb-6 text-sm">
                      {parts.map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={j} className="text-white font-medium">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-white/8">
              <p className="text-white/40 text-sm mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} to="/blog" className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs hover:text-[#A78BFA] hover:border-[#7A5CFF]/40 transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author box */}
            <div className="mt-10 p-8 rounded-2xl bg-white/[0.03] border border-white/8">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7A5CFF] to-[#4F8CFF] flex items-center justify-center text-white text-xl font-semibold shrink-0">
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Written by</p>
                  <h3 style={SERIF} className="text-white text-xl font-semibold mb-1">{post.author.name}</h3>
                  <p className="text-[#7A5CFF] text-sm mb-3">{post.author.role}</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    An expert at AURA Luxury Spa with years of experience in luxury skincare and wellness. Passionate about helping clients achieve their most radiant, confident selves through personalized, results-driven treatments.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-14">
              <h2 style={SERIF} className="text-white text-2xl font-semibold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {allRelated.map((p) => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                    <div className="aspect-video rounded-xl overflow-hidden mb-3">
                      <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="text-[#7A5CFF] text-xs">{p.category}</span>
                    <h4 style={SERIF} className="text-white text-sm font-medium mt-1 group-hover:text-[#A78BFA] transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Table of contents */}
            <div className="sticky top-28 space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-4 h-4 text-[#7A5CFF]" />
                  <h3 style={SERIF} className="text-white font-semibold">Table of Contents</h3>
                </div>
                <ul className="space-y-2">
                  {tocItems.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-white/50 text-sm hover:text-[#A78BFA] transition-colors flex items-center gap-2 group">
                        <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/30 group-hover:bg-[#7A5CFF]/20 group-hover:text-[#A78BFA] transition-all">
                          {i + 1}
                        </span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#7A5CFF]/15 to-[#4F8CFF]/10 border border-[#7A5CFF]/20">
                <h3 style={SERIF} className="text-white font-semibold mb-2">Ready to Experience It?</h3>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">
                  Book a consultation with our expert team and start your transformation journey today.
                </p>
                <Link
                  to="/booking"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#7A5CFF] to-[#4F8CFF] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Book Now
                </Link>
              </div>

              {/* Recent Posts Sidebar */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8">
                <h3 style={SERIF} className="text-white font-semibold mb-5">Latest Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((p) => (
                    <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-3 group">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs leading-snug group-hover:text-[#A78BFA] transition-colors line-clamp-2">{p.title}</p>
                        <p className="text-white/30 text-xs mt-0.5">{p.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}