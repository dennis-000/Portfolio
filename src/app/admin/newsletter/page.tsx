"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Send, 
  Upload, 
  Users, 
  Eye, 
  History, 
  Copy, 
  Check, 
  AlertTriangle,
  X,
  ExternalLink
} from "lucide-react";

export default function AdminNewsletterPage() {
  const [data, setData] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [subject, setSubject] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [featuredSlug, setFeaturedSlug] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fallback Dialog Modal
  const [fallbackData, setFallbackData] = useState<any>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/data");
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setData(json);
        setBlogPosts(json.BLOG_POSTS || []);
      }
    } catch {
      setError("Failed to load audience database.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", fileList[0]);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json();
      if (resJson.success) {
        setHeaderImage(resJson.url);
      } else {
        alert(resJson.error || "File upload failed.");
      }
    } catch {
      alert("Network error occurred during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !title || !body) {
      alert("Please fill in Subject, Title, and Main Body.");
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          headerImage,
          title,
          body,
          featuredSlug,
        }),
      });

      const json = await res.json();
      
      if (res.ok && json.success) {
        alert(json.message || "Newsletter successfully broadcasted!");
        // Reset form
        setSubject("");
        setHeaderImage("");
        setTitle("");
        setBody("");
        setFeaturedSlug("");
        fetchData(); // Reload history
      } else if (json.fallback) {
        // Launch fallback dialog
        setFallbackData(json);
      } else {
        alert(json.error || "Failed to trigger email delivery.");
      }
    } catch {
      alert("Network error occurred during broadcast submission.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const launchMailto = () => {
    if (!fallbackData) return;
    const emailsList = fallbackData.subscribers.join(",");
    const mailtoUrl = `mailto:?bcc=${emailsList}&subject=${encodeURIComponent(fallbackData.subject)}&body=${encodeURIComponent(fallbackData.textBody)}`;
    window.open(mailtoUrl);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 text-xs text-[var(--text-muted)]">
        Loading audience telemetry...
      </div>
    );
  }

  const subscribers = data?.SUBSCRIBERS || [];
  const history = data?.NEWSLETTERS || [];
  const selectedBlog = blogPosts.find((p) => p.slug === featuredSlug);

  return (
    <div className="space-y-6 flex-1 flex flex-col relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white uppercase tracking-wide">Newsletter Broadcaster</h2>
          <p className="text-xs text-[var(--text-muted)]">Draft newsletters, links and send updates directly to your subscribers.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-indigo-400 font-bold">
            <Users size={14} />
            <span>{subscribers.length} Subscribers</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-start flex-1">
        
        {/* Drafting Form (Left) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-5">
              Draft Broadcast
            </h3>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Subject Line</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inside my workflow: Building production RAG systems"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Header Banner Image (optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. /uploads/banner.png"
                    value={headerImage}
                    onChange={(e) => setHeaderImage(e.target.value)}
                    className="flex-1 px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                  <label className={`px-4.5 py-2.5 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center gap-1.5 ${isUploading ? "opacity-40 cursor-not-allowed" : ""}`}>
                    <Upload size={12} />
                    <span>{isUploading ? "..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Email Body Heading</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hey everyone, let's talk about accuracy at scale..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Article / Newsletter Body</label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write your email body copy here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 resize-y font-mono text-[11px] leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Attach / Link Featured Blog Post (optional)</label>
                <select
                  value={featuredSlug}
                  onChange={(e) => setFeaturedSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 cursor-pointer"
                >
                  <option value="">Do not attach any blog post</option>
                  {blogPosts.map((post) => (
                    <option key={post.slug} value={post.slug}>
                      {post.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/10 ${
                  isSending ? "opacity-55 cursor-not-allowed" : ""
                }`}
              >
                <Send size={12} className={isSending ? "animate-bounce" : ""} />
                <span>{isSending ? "Processing Broadcast..." : "Send Broadcast Newsletter"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Live Mock Inbox Email Preview (Right) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col h-full min-h-[500px]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-5 flex items-center gap-1.5">
              <Eye size={12} className="text-indigo-400" />
              <span>Live Inbox Preview</span>
            </h3>

            {/* Email client shell */}
            <div className="flex-1 bg-[#09090b] rounded-xl border border-white/5 overflow-hidden flex flex-col font-sans text-xs">
              
              {/* Email client header */}
              <div className="bg-black/30 border-b border-white/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)] font-mono">From:</span>
                  <span className="text-white font-semibold">Dennis Opoku Asiedu <span className="text-[var(--text-muted)] font-normal">&lt;onboarding@resend.dev&gt;</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)] font-mono">To:</span>
                  <span className="text-indigo-400 font-bold">Your Subscribers List ({subscribers.length} contacts)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)] font-mono">Subject:</span>
                  <span className="text-white font-bold">{subject || "(No Subject entered yet)"}</span>
                </div>
              </div>

              {/* Email HTML Render Stage */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#070708]">
                <div className="max-w-xl mx-auto bg-[#0f0f11] border border-white/5 rounded-2xl p-6 shadow-md text-left text-[#e2e8f0]">
                  
                  {/* Brand signature header */}
                  <div className="border-b border-white/5 pb-3 mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">Dennis Opoku Asiedu</span>
                  </div>

                  {/* Banner Image */}
                  {headerImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={headerImage} 
                      alt="Banner Preview" 
                      className="w-full max-h-48 object-cover rounded-lg mb-5 border border-white/5" 
                    />
                  )}

                  {/* Main Title */}
                  <h1 className="text-base font-bold text-white mb-4 leading-snug">
                    {title || "(Write a main heading title)"}
                  </h1>

                  {/* Copy content body */}
                  <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap mb-6 text-xs">
                    {body || "(Write your email body copy in the textarea. Double spacing creates new paragraphs.)"}
                  </p>

                  {/* Attached Blog Card preview */}
                  {selectedBlog && (
                    <div className="mt-6 p-4 border border-white/5 bg-white/[0.01] rounded-xl text-left">
                      <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider">Featured Article</span>
                      <h4 className="text-xs font-bold text-white mt-1 mb-1.5">{selectedBlog.title}</h4>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">{selectedBlog.excerpt}</p>
                      <span className="inline-block px-3 py-1 rounded bg-rose-500 font-bold text-[10px] text-white select-none">Read Full Article</span>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t border-white/5 mt-8 pt-4 text-center text-[9px] text-gray-500">
                    <p className="m-0">Sent by Dennis Opoku Asiedu • Accra, Ghana</p>
                    <p className="mt-1">To unsubscribe, reply directly to this email or hello@dennisopoku.com</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Broadcast History & Subscribers list */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        
        {/* Active Subscribers List (Left) */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl border border-white/5 h-64 overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-4 flex items-center gap-1.5">
            <Users size={12} className="text-indigo-400" />
            <span>Audience List</span>
          </h3>
          <div className="space-y-1.5">
            {subscribers.map((email: string) => (
              <div key={email} className="px-3 py-2 bg-white/[0.01] border border-white/5 rounded-lg text-xs font-mono text-[var(--text-muted)] flex items-center justify-between">
                <span>{email}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Broadcast history archives (Right) */}
        <div className="lg:col-span-4 glass p-6 rounded-2xl border border-white/5 h-64 overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-4 flex items-center gap-1.5">
            <History size={12} className="text-indigo-400" />
            <span>Broadcast History Archives</span>
          </h3>
          {history.length === 0 ? (
            <div className="text-center py-8 text-xs text-[var(--text-muted)] italic">
              No newsletters sent yet.
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((h: any) => (
                <div key={h.id} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between text-xs gap-4">
                  <div className="min-w-0">
                    <h4 className="font-bold text-white truncate">{h.subject}</h4>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{h.title}</p>
                  </div>
                  <div className="flex flex-shrink-0 gap-3 items-center text-[10px] text-[var(--text-muted)]">
                    <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">{h.recipients} Recps</span>
                    <span className="font-mono">{h.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Fallback Dialog Modal */}
      {fallbackData && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl glass-strong border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setFallbackData(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all cursor-pointer"
            >
              <X size={14} />
            </button>

            <div className="flex gap-3.5 items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Resend API Key Configuration Missing</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">Your newsletter record was archived, but we need an API key to send the emails automatically. In the meantime, you can use this instant desktop fallback to send it for free!</p>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Option 1: Open email app */}
              <div className="p-4 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[9px] font-bold text-white">1</span>
                  <span>Direct Desktop Broadcast (Free & Fast)</span>
                </h4>
                <p className="text-[11px] text-indigo-200/80 leading-relaxed">
                  Click below to open your default mail app (Gmail, Outlook, or Mail) with all your subscribers preloaded in **BCC** to maintain privacy, and subject/body prefilled!
                </p>
                <button
                  onClick={launchMailto}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                >
                  <Send size={11} />
                  <span>Open Email Client & Send</span>
                </button>
              </div>

              {/* Option 2: Copy code */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white">2</span>
                    <span>Subscribers List</span>
                  </h4>
                  <p className="text-[10px] text-[var(--text-muted)]">Copy all recipient emails to paste in BCC field.</p>
                  <button
                    onClick={() => handleCopyClipboard(fallbackData.subscribers.join(", "), "emails")}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[11px] rounded-xl cursor-pointer"
                  >
                    {copiedText === "emails" ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedText === "emails" ? "Emails Copied!" : "Copy Emails (BCC)"}</span>
                  </button>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white">3</span>
                    <span>HTML Newsletter Layout</span>
                  </h4>
                  <p className="text-[10px] text-[var(--text-muted)]">Copy raw styled HTML to paste in Mailchimp/Substack.</p>
                  <button
                    onClick={() => handleCopyClipboard(fallbackData.htmlBody, "html")}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[11px] rounded-xl cursor-pointer"
                  >
                    {copiedText === "html" ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedText === "html" ? "HTML Layout Copied!" : "Copy HTML Newsletter"}</span>
                  </button>
                </div>

              </div>

              {/* Instructions to configure Resend */}
              <div className="border-t border-white/5 pt-4 text-[10px] text-[var(--text-muted)] leading-relaxed">
                <p className="font-bold text-white mb-1.5">How to enable 100% automated broadcasting:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Create a free account at <a href="https://resend.com" target="_blank" className="text-indigo-400 hover:underline inline-flex items-center gap-0.5">resend.com <ExternalLink size={8} /></a>.</li>
                  <li>Generate an API Key under API Keys settings.</li>
                  <li>Add <code className="px-1 py-0.5 bg-white/5 rounded font-mono text-[9px] text-rose-400">RESEND_API_KEY</code> on your Vercel Project Scope environment settings. Done!</li>
                </ol>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
