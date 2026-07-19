"use client";

import { useEffect, useState } from "react";
import { 
  Settings, 
  Check, 
  Upload, 
  FileText, 
  ExternalLink,
  ShieldAlert,
  Info,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function AdminSettingsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  // Profile Form States
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [subTagline, setSubTagline] = useState("");
  const [location, setLocation] = useState("");
  const [available, setAvailable] = useState(true);
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");

  // Stats States
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
          const p = json.PERSONAL || {};
          setName(p.name || "");
          setTagline(p.tagline || "");
          setSubTagline(p.subTagline || "");
          setLocation(p.location || "");
          setAvailable(p.available !== undefined ? p.available : true);
          setEmail(p.email || "");
          setGithub(p.github || "");
          setLinkedin(p.linkedin || "");
          setTwitter(p.twitter || "");
          setWebsite(p.website || "");

          setStats(json.STATS || []);
        }
      })
      .catch(() => setError("Failed to load settings database"))
      .finally(() => setIsLoading(false));
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const updatedStats = stats.map((s, i) => i === index ? { ...s, [field]: value } : s);
    setStats(updatedStats);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>, typeLabel: string) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    setUploadMessage(`Uploading ${typeLabel}...`);
    const formData = new FormData();
    formData.append("file", fileList[0]);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json();
      if (resJson.success) {
        setUploadMessage(`${typeLabel} uploaded successfully: ${resJson.url}`);
        // Store resume url in personal settings if desired, or copy it
        alert(`Resume uploaded successfully! Path: ${resJson.url}\nYou can use this link in your resume page.`);
      } else {
        alert(resJson.error || "File upload failed");
      }
    } catch {
      alert("Network error occurred during upload.");
    } finally {
      setIsUploading(false);
      setUploadMessage(null);
    }
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedPersonal = {
      name,
      shortName: name.split(" ")[0] || "Dennis",
      tagline,
      subTagline,
      location,
      available,
      email,
      github,
      linkedin,
      twitter,
      website,
    };

    const updatedData = {
      ...data,
      PERSONAL: updatedPersonal,
      STATS: stats,
    };

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const resJson = await res.json();

      if (resJson.success) {
        setData(updatedData);
        alert("Configuration saved successfully!");
      } else {
        alert(resJson.error || "Failed to save settings");
      }
    } catch {
      alert("Network error. Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-muted)] mt-4 font-mono">Loading settings database...</span>
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

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="border-b border-white/5 pb-4 mb-2">
        <h2 className="text-xl font-bold font-display text-white uppercase tracking-wide">Global Portfolio Settings</h2>
        <p className="text-xs text-[var(--text-muted)]">Configure personal details, social networks, dynamic resumes, and career stats.</p>
      </div>

      <form onSubmit={handleSaveSubmit} className="space-y-6 max-w-4xl text-xs">
        
        {/* Profile Card */}
        <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 flex items-center gap-2">
            <Info size={14} className="text-indigo-400" />
            <span>Personal Bio / Details</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Short Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Bio Summary / Subtagline</label>
            <textarea
              value={subTagline}
              onChange={(e) => setSubTagline(e.target.value)}
              className="w-full h-16 px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 resize-none"
            />
          </div>

          <div className="border-t border-white/5 pt-4">
            <label className="flex items-center gap-2 cursor-pointer font-bold uppercase tracking-wider text-[10px] text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="rounded bg-black/40 border-white/10 text-indigo-500 focus:ring-0 focus:ring-offset-0"
              />
              <span>Available for Freelance / Contract Work</span>
            </label>
          </div>
        </div>

        {/* Career Stats Card */}
        <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-indigo-400" />
            <span>Career Highlight Stats</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2 p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Metric {index + 1}</span>
                <input
                  type="text"
                  placeholder="Metric Label (e.g. Years Building)"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, "label", e.target.value)}
                  className="w-full px-2 py-1.5 bg-black/40 border border-white/5 rounded-lg text-white text-[11px] outline-none"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 5+)"
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, "value", e.target.value)}
                  className="w-full px-2 py-1.5 bg-black/40 border border-white/5 rounded-lg text-white font-mono text-[11px] outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Resumes Library Uploads */}
        <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 flex items-center gap-2">
            <FileText size={14} className="text-indigo-400" />
            <span>Resume Asset Manager</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { type: "Software Engineer", label: "software_engineer_resume" },
              { type: "AI Engineer", label: "ai_engineer_resume" },
              { type: "Creative Director", label: "creative_director_resume" },
              { type: "Entrepreneur / Founder", label: "entrepreneur_resume" }
            ].map((resItem, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
                <div>
                  <h4 className="font-bold text-white leading-tight">{resItem.type}</h4>
                  <p className="text-[9px] text-[var(--text-muted)] mt-0.5">Upload custom resume file</p>
                </div>
                <label className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center gap-1.5">
                  <Upload size={12} />
                  <span>Upload PDF</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleResumeUpload(e, resItem.type)}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>

          {isUploading && (
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] animate-pulse">
              <Upload size={12} className="animate-bounce" />
              <span>{uploadMessage || "Uploading asset..."}</span>
            </div>
          )}
        </div>

        {/* Social Link Contacts */}
        <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 flex items-center gap-2">
            <ExternalLink size={14} className="text-indigo-400" />
            <span>Social Network & Web Channels</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Contact Email", value: email, setter: setEmail, placeholder: "hello@dennisopoku.com" },
              { label: "GitHub Handle", value: github, setter: setGithub, placeholder: "https://github.com/..." },
              { label: "LinkedIn Handle", value: linkedin, setter: setLinkedin, placeholder: "https://linkedin.com/in/..." },
              { label: "Twitter / X Handle", value: twitter, setter: setTwitter, placeholder: "https://twitter.com/..." },
              { label: "Personal Website", value: website, setter: setWebsite, placeholder: "https://dennisopoku.com" }
            ].map((soc, i) => (
              <div key={i}>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">{soc.label}</label>
                <input
                  type="text"
                  placeholder={soc.placeholder}
                  value={soc.value}
                  onChange={(e) => soc.setter(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Controls */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all cursor-pointer ${
              isSaving 
                ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed" 
                : "bg-indigo-600 border border-indigo-500/40 hover:opacity-95 shadow-md shadow-indigo-500/25"
            }`}
          >
            <Check size={14} />
            <span>{isSaving ? "Saving Configuration..." : "Save Configuration"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
