import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search, Clock, Sparkles, TrendingUp } from "lucide-react";
import { blogPosts } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const CATEGORIES = ["All", "Skincare", "Massage", "Wellness", "Lifestyle", "Body Treatments"];

export function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const filtered = blogPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All" || search);
  const paginated = rest.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);

  const tags = ["Anti-Aging", "Skincare", "Relaxation", "Wellness", "Self-Care", "Hydration", "Massage", "Detox", "Aromatherapy", "Lifestyle"];

  return (
    <div className="min-h-screen bg-[#0B0B0F] pt-24">
      {/* Header */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A5CFF]/10 border border-[#7A5CFF]/30 text-[#A78BFA] text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Wellness Journal
            </div>
            <h1 style={SERIF} className="text-5xl lg:text-6xl font-semibold text-white">
              Beauty &{" "}
              <span className="bg-gradient-to-r from-[#7A5CFF] to-[#4F8CFF] bg-clip-text text-transparent">
                Wellness
              </span>{" "}
              Insights
            </h1>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#7A5CFF]/50"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`shrink-0 px-5 py-2 rounded-full text-sm transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#7A5CFF] to-[#4F8CFF] text-white"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && activeCategory === "All" && !search && (
          <Link to={`/blog/${featured.slug}`} className="group block mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/8 hover:border-[#7A5CFF]/40 transition-all duration-300">
              <div className="aspect-video lg:aspect-auto relative overflow-hidden">
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-64"
                />
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7A5CFF] to-[#4F8CFF] text-white text-xs font-medium">
                    <TrendingUp className="w-3 h-3" /> Featured
                  </span>
                </div>
              </div>
              <div className="bg-white/[0.02] p-10 flex flex-col justify-center">
                <span className="text-[#7A5CFF] text-xs uppercase tracking-wider mb-4">{featured.category}</span>
                <h2 style={SERIF} className="text-white text-3xl lg:text-4xl font-semibold mb-4 leading-snug group-hover:text-[#A78BFA] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/50 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7A5CFF] to-[#4F8CFF] flex items-center justify-center text-white text-xs font-semibold">
                      {featured.author.initials}
                    </div>
                    <span className="text-white/60 text-sm">{featured.author.name}</span>
                  </div>
                  <span className="text-white/20">·</span>
                  <span className="text-white/40 text-sm">{featured.date}</span>
                  <span className="text-white/20">·</span>
                  <div className="flex items-center gap-1 text-white/40 text-sm">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#7A5CFF] group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Posts */}
          <div className="lg:col-span-2 space-y-8">
            {paginated.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-[#7A5CFF]/40 transition-all duration-300">
                <div className="w-32 h-28 rounded-xl overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#7A5CFF]/10 text-[#A78BFA] text-xs">{post.category}</span>
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 style={SERIF} className="text-white font-semibold text-lg mb-2 group-hover:text-[#A78BFA] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7A5CFF] to-[#4F8CFF] flex items-center justify-center text-white text-[10px]">
                      {post.author.initials}
                    </div>
                    {post.author.name} · {post.date}
                  </div>
                </div>
              </Link>
            ))}

            {paginated.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/30">No articles found. Try a different search or category.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-full text-sm transition-all ${
                      page === i + 1
                        ? "bg-gradient-to-r from-[#7A5CFF] to-[#4F8CFF] text-white"
                        : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Posts */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8">
              <h3 style={SERIF} className="text-white font-semibold mb-5">Recent Posts</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="flex gap-3 group">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm leading-snug group-hover:text-[#A78BFA] transition-colors line-clamp-2">
                        {post.title}
                      </p>
                      <p className="text-white/30 text-xs mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8">
              <h3 style={SERIF} className="text-white font-semibold mb-5">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearch(tag)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs hover:text-[#A78BFA] hover:border-[#7A5CFF]/40 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#7A5CFF]/10 to-[#4F8CFF]/10 border border-[#7A5CFF]/20">
              <h3 style={SERIF} className="text-white font-semibold mb-2">Stay Inspired</h3>
              <p className="text-white/50 text-sm mb-4">Get wellness insights delivered to your inbox weekly.</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#7A5CFF]/50 mb-3"
              />
              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7A5CFF] to-[#4F8CFF] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}