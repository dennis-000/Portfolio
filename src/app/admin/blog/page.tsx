"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  AlertCircle
} from "lucide-react";

export default function AdminBlogPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  
  // Editor state
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("AI Engineering");
  const [tagsString, setTagsString] = useState("");
  const [readTime, setReadTime] = useState("");
  const [date, setDate] = useState("");
  const [featured, setFeatured] = useState(false);
  const [contentString, setContentString] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else setData(json);
      })
      .catch(() => setError("Failed to load blog database"))
      .finally(() => setIsLoading(false));
  };

  const handleEditClick = (post: any) => {
    setSelectedSlug(post.slug);
    setSlug(post.slug);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setCategory(post.category);
    setTagsString(post.tags ? post.tags.join(", ") : "");
    setReadTime(post.readTime || "");
    setDate(post.date || new Date().toISOString().split("T")[0]);
    setFeatured(post.featured || false);
    setContentString(post.content ? post.content.join("\n\n") : "");
    setIsEditing(true);
  };

  const handleNewClick = () => {
    setSelectedSlug(null);
    setSlug("");
    setTitle("");
    setExcerpt("");
    setCategory("AI Engineering");
    setTagsString("");
    setReadTime("5 min");
    setDate(new Date().toISOString().split("T")[0]);
    setFeatured(false);
    setContentString("");
    setIsEditing(true);
  };

  const handleDeleteClick = async (postSlug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    const updatedBlogPosts = data.BLOG_POSTS.filter((p: any) => p.slug !== postSlug);
    const updatedData = { ...data, BLOG_POSTS: updatedBlogPosts };

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const resJson = await res.json();
      if (resJson.success) {
        setData(updatedData);
        setIsEditing(false);
      } else {
        alert(resJson.error || "Failed to delete blog post");
      }
    } catch {
      alert("Network error. Failed to delete blog post");
    }
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || !title || !excerpt) {
      alert("Please fill in slug ID, Title, and Excerpt summary.");
      return;
    }

    setIsSaving(true);

    const postObj = {
      slug,
      title,
      excerpt,
      category,
      tags: tagsString.split(",").map(t => t.trim()).filter(t => t.length > 0),
      readTime,
      date,
      featured,
      content: contentString.split("\n\n").map(p => p.trim()).filter(p => p.length > 0),
    };

    let updatedBlogPosts = [...data.BLOG_POSTS];
    if (selectedSlug) {
      // Edit
      updatedBlogPosts = updatedBlogPosts.map(p => p.slug === selectedSlug ? postObj : p);
    } else {
      // New
      // Check duplicate slug
      if (updatedBlogPosts.some(p => p.slug === slug)) {
        alert("A blog post with this slug ID already exists.");
        setIsSaving(false);
        return;
      }
      updatedBlogPosts.push(postObj);
    }

    const updatedData = { ...data, BLOG_POSTS: updatedBlogPosts };

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const resJson = await res.json();

      if (resJson.success) {
        setData(updatedData);
        setIsEditing(false);
      } else {
        alert(resJson.error || "Failed to save blog configuration");
      }
    } catch {
      alert("Network error. Failed to save blog post");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-muted)] mt-4 font-mono">Loading blog database...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle size={32} className="text-rose-500 mb-4" />
        <h3 className="text-lg font-bold text-white">Database Load Error</h3>
        <p className="text-sm text-[var(--text-muted)] mt-1">{error}</p>
      </div>
    );
  }

  const posts = data?.BLOG_POSTS || [];
  
  const filteredPosts = posts.filter((p: any) => {
    return p.title.toLowerCase().includes(search.toLowerCase()) || 
           p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
           (p.tags && p.tags.join(" ").toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white uppercase tracking-wide">Manage Blog Articles</h2>
          <p className="text-xs text-[var(--text-muted)]">Draft and publish insights on engineering, AI systems, and tech startups.</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleNewClick}
            className="flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-indigo-600 font-bold text-xs text-white hover:opacity-90 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer shadow-md shadow-indigo-500/25"
          >
            <Plus size={14} />
            <span>Write Post</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 flex-1 items-start">
        
        {/* Blog Posts List */}
        <div className={`space-y-4 ${isEditing ? "lg:col-span-3" : "lg:col-span-6"} transition-all duration-300`}>
          {/* Search bar */}
          <div className="relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search article titles, excerpts, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.01] border border-white/5 rounded-xl text-xs text-white focus:border-indigo-500/40 focus:ring-0 outline-none"
            />
          </div>

          {/* Grid items */}
          <div className={`grid grid-cols-1 ${isEditing ? "sm:grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3"} gap-4`}>
            {filteredPosts.map((p: any) => (
              <div 
                key={p.slug} 
                className="glass border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-indigo-400 uppercase mb-2">
                    <span>{p.category}</span>
                    <span className="text-[var(--text-muted)] font-mono">{p.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">{p.title}</h4>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-4">{p.excerpt}</p>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
                      title="Edit blog post"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.slug)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all cursor-pointer"
                      title="Delete blog post"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div className="flex gap-2 text-[var(--text-muted)] items-center">
                    <span className="text-[9px] font-mono">{p.readTime}</span>
                    {p.featured && (
                      <span className="text-[8px] uppercase tracking-wider font-bold bg-[#6366f1]/10 px-1.5 py-0.5 rounded border border-[#6366f1]/20 text-[#6366f1]">Featured</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
              <p className="text-xs text-[var(--text-muted)]">No articles found matching the query criteria.</p>
            </div>
          )}
        </div>

        {/* Editor Form Panel */}
        {isEditing && (
          <div className="lg:col-span-3 glass-strong border border-white/5 p-6 rounded-2xl shadow-2xl relative w-full overflow-hidden">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--text-muted)] hover:text-white transition-all cursor-pointer"
            >
              <X size={14} />
            </button>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-5">
              {selectedSlug ? "Modify Blog Article" : "Write Blog Article"}
            </h3>

            <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Slug ID (URL Path)</label>
                  <input
                    type="text"
                    disabled={!!selectedSlug}
                    placeholder="e.g. scaling-apis"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. AI Engineering"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Article Title</label>
                <input
                  type="text"
                  placeholder="e.g. Building RAG Systems at Scale"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Excerpt Summary</label>
                <textarea
                  placeholder="A short summary description of the article..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full h-16 px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Article Markdown Body (double enter for new paragraphs)</label>
                <textarea
                  placeholder="Write your article contents here. Supports ## headings, - bullet lists, **bold**, and `code` blocks."
                  value={contentString}
                  onChange={(e) => setContentString(e.target.value)}
                  className="w-full h-40 px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 resize-y font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. AI, RAG, Python, Production"
                  value={tagsString}
                  onChange={(e) => setTagsString(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Reading Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 8 min"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Publication Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <label className="flex items-center gap-2 cursor-pointer font-bold uppercase tracking-wider text-[10px] text-[var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded bg-black/40 border-white/10 text-indigo-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Feature on Blog Homepage</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-white transition-all cursor-pointer ${
                    isSaving 
                      ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed" 
                      : "bg-[#6366f1] border border-[#6366f1]/40 hover:opacity-95"
                  }`}
                >
                  <Check size={14} />
                  <span>{isSaving ? "Saving..." : "Save Post"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
