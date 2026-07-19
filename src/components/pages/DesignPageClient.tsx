"use client";

import { useState, useEffect } from "react";
import { X, Link2, Check, Share2, ZoomIn } from "lucide-react";
import { DESIGN_WORK } from "@/lib/data";

// Helper to slugify design title for URL mapping
const slugify = (text: string) => 
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function DesignPageClient() {
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCategory, setCopiedCategory] = useState(false);

  const handleCopyCategoryLink = () => {
    if (typeof window !== "undefined") {
      let shareUrl = `${window.location.origin}${window.location.pathname}`;
      if (activeCategory !== "All") {
        shareUrl += `?category=${activeCategory.toLowerCase()}`;
      }
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedCategory(true);
        setTimeout(() => setCopiedCategory(false), 2000);
      });
    }
  };

  // Extract categories dynamically from dataset
  const categories = ["All", ...Array.from(new Set(DESIGN_WORK.map((work) => work.type)))];

  // Sync state with URL params on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      const workParam = params.get("work");

      if (catParam) {
        const matchedCat = categories.find(c => c.toLowerCase() === catParam.toLowerCase());
        if (matchedCat) setActiveCategory(matchedCat);
      }

      if (workParam) {
        const matchedWork = DESIGN_WORK.find(w => slugify(w.title) === workParam.toLowerCase());
        if (matchedWork) setSelectedWork(matchedWork);
      }
    }
  }, []);

  // Update URL parameters dynamically without reloading the page
  const updateUrl = (cat: string, workSlug: string | null) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      
      if (cat && cat !== "All") {
        url.searchParams.set("category", cat.toLowerCase());
      } else {
        url.searchParams.delete("category");
      }

      if (workSlug) {
        url.searchParams.set("work", workSlug);
      } else {
        url.searchParams.delete("work");
      }

      window.history.pushState({}, "", url.pathname + url.search);
    }
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    updateUrl(category, selectedWork ? slugify(selectedWork.title) : null);
  };

  const handleOpenWork = (work: any) => {
    setSelectedWork(work);
    updateUrl(activeCategory, slugify(work.title));
  };

  const handleCloseWork = () => {
    setSelectedWork(null);
    updateUrl(activeCategory, null);
  };

  const handleCopyLink = (work: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?work=${slugify(work.title)}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(work.title);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  // Filter logic
  const filteredWorks = activeCategory === "All"
    ? DESIGN_WORK
    : DESIGN_WORK.filter((work) => work.type === activeCategory);

  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        
        {/* Header Section */}
        <div className="mb-12 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-rose-500">
            Creative Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6 text-center">
            Design that
            <br />
            <span className="text-rose-500">earns trust.</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mx-auto text-center">
            Brand identities, UI systems, and visual languages — built from first principles and refined through real-world feedback.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 max-w-4xl mx-auto border-b border-white/5 pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-md shadow-rose-500/5"
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}

          {/* Share Category Button */}
          <button
            onClick={handleCopyCategoryLink}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-rose-400 hover:bg-white/10 hover:border-rose-500/20 transition-all cursor-pointer relative ml-2 sm:ml-4"
            title={`Copy link to share ${activeCategory === "All" ? "all designs" : `${activeCategory} designs`}`}
          >
            <Share2 size={12} />
            <span>Share {activeCategory === "All" ? "All" : activeCategory}</span>
            {copiedCategory && (
              <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-1.5 px-2 py-1 bg-rose-500 text-[8px] font-bold text-white uppercase rounded shadow-md pointer-events-none whitespace-nowrap z-50">
                Category Link Copied!
              </span>
            )}
          </button>
        </div>

        {/* Design Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredWorks.map((work, i) => (
            <div
              key={work.title}
              onClick={() => handleOpenWork(work)}
              className="break-inside-avoid group rounded-2xl border border-[var(--border)] glass hover:border-[var(--accent)]/40 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col"
              style={{ "--accent": work.color } as React.CSSProperties}
            >
              {/* Color/Image preview area */}
              <div
                className="w-full relative overflow-hidden bg-black/20"
                style={{ height: i % 3 === 0 ? "180px" : i % 3 === 1 ? "240px" : "160px" }}
              >
                {work.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 40%, ${work.color}, transparent 70%)` }}
                  />
                )}
                <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

                {/* Category Badge overlay */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded backdrop-blur-sm shadow-sm"
                    style={{ 
                      backgroundColor: `${work.color}33`, 
                      color: work.color,
                      border: `1px solid ${work.color}44`
                    }}
                  >
                    {work.type}
                  </span>
                </div>

                {/* Hover overlay with detail CTA */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              {/* Title & tags */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[var(--text)] text-sm mb-3 group-hover:text-[var(--accent)] transition-colors">
                    {work.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: `${work.color}15`, color: work.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share bar at bottom */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">Click to inspect</span>
                  <button
                    onClick={(e) => handleCopyLink(work, e)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all relative"
                    title="Copy direct share link"
                  >
                    {copiedId === work.title ? (
                      <Check size={12} className="text-emerald-400" />
                    ) : (
                      <Share2 size={12} />
                    )}
                    {copiedId === work.title && (
                      <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-1.5 px-2 py-1 bg-emerald-500/90 text-[8px] font-bold text-white uppercase rounded shadow-md pointer-events-none whitespace-nowrap">
                        Copied Link!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal Rationale View */}
      {selectedWork && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fade-in">
          
          {/* Close button overlay */}
          <button
            onClick={handleCloseWork}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-50 cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Modal Container */}
          <div 
            className="w-full max-w-6xl glass-strong border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10 max-h-[85vh] md:max-h-[80vh]"
            style={{ "--accent": selectedWork.color } as React.CSSProperties}
          >
            {/* Image Stage */}
            <div className="flex-1 bg-black/40 flex items-center justify-center overflow-y-auto max-h-[50vh] md:max-h-[80vh] p-4 relative">
              {selectedWork.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              ) : (
                <div 
                  className="w-full h-80 rounded-xl relative overflow-hidden"
                  style={{ background: `radial-gradient(circle at 30% 40%, ${selectedWork.color}, transparent 70%)` }}
                >
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">Vector / Code Preview Only</span>
                  </div>
                </div>
              )}
            </div>

            {/* Metadata Detail Panel */}
            <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 bg-black/30 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span 
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-4"
                  style={{ backgroundColor: `${selectedWork.color}22`, color: selectedWork.color }}
                >
                  {selectedWork.type}
                </span>
                
                <h2 className="text-lg font-bold text-white mb-4 font-display leading-snug">
                  {selectedWork.title}
                </h2>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Project Tags</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedWork.tags && selectedWork.tags.map((tag: string) => (
                        <span 
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[var(--text)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Designer Rationale</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      This design is built around strategic visual communication, balancing layout geometry, typography, and functional hierarchy to solve objective constraints and deliver a memorable aesthetic.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="border-t border-white/5 pt-6 mt-6 space-y-2">
                <button
                  onClick={(e) => handleCopyLink(selectedWork, e)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all relative cursor-pointer"
                >
                  {copiedId === selectedWork.title ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Copied Share Link!</span>
                    </>
                  ) : (
                    <>
                      <Link2 size={14} />
                      <span>Copy Client Share Link</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleCloseWork}
                  className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-bold text-xs transition-all cursor-pointer text-center"
                >
                  Close Preview
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
