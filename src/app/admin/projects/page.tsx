"use client";

import { useEffect, useState } from "react";
import { 
  Briefcase, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  ExternalLink, 
  Lock, 
  Eye, 
  AlertCircle,
  Upload
} from "lucide-react";
import Link from "next/link";

const GithubIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import ArchitectureCanvasEditor, { ComponentPipelineStep } from "@/components/admin/ArchitectureCanvasEditor";

export default function AdminProjectsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  
  // Editor state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form fields
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("engineering");
  const [description, setDescription] = useState("");
  const [techString, setTechString] = useState("");
  const [impact, setImpact] = useState("");
  const [year, setYear] = useState("");
  const [featured, setFeatured] = useState(true);
  const [accent, setAccent] = useState("#6366f1");
  const [gradient, setGradient] = useState("from-indigo-500/20 to-blue-900/10");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [cover, setCover] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // "Why?" Engineering Decision Fields
  const [whyProblem, setWhyProblem] = useState("");
  const [whyChoice, setWhyChoice] = useState("");
  const [whyTradeoffs, setWhyTradeoffs] = useState("");
  const [whyLessons, setWhyLessons] = useState("");
  const [architectureComponents, setArchitectureComponents] = useState<ComponentPipelineStep[]>([]);

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
      .catch(() => setError("Failed to load projects database"))
      .finally(() => setIsLoading(false));
  };

  const handleEditClick = (project: any) => {
    setSelectedId(project.id);
    setId(project.id);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setTechString(project.tech ? project.tech.join(", ") : "");
    setImpact(project.impact || "");
    setYear(project.year || "");
    setFeatured(project.featured !== undefined ? project.featured : true);
    setAccent(project.accent || "#6366f1");
    setGradient(project.gradient || "from-indigo-500/20 to-blue-900/10");
    setDemoUrl(project.demoUrl || "");
    setGithubUrl(project.githubUrl || "");
    setIsPrivate(project.isPrivate || false);
    setCover(project.cover || "");
    setWhyProblem(project.whyDecision?.problem || "");
    setWhyChoice(project.whyDecision?.architectureChoice || "");
    setWhyTradeoffs(project.whyDecision?.tradeoffs || "");
    setWhyLessons(project.whyDecision?.lessonsLearned || "");
    setArchitectureComponents(project.architectureComponents || []);
    setIsEditing(true);
  };

  const handleNewClick = () => {
    setSelectedId(null);
    setId("");
    setTitle("");
    setCategory("engineering");
    setDescription("");
    setTechString("");
    setImpact("");
    setYear(new Date().getFullYear().toString());
    setFeatured(true);
    setAccent("#6366f1");
    setGradient("from-indigo-500/20 to-blue-900/10");
    setDemoUrl("");
    setGithubUrl("");
    setIsPrivate(false);
    setCover("");
    setWhyProblem("");
    setWhyChoice("");
    setWhyTradeoffs("");
    setWhyLessons("");
    setArchitectureComponents([]);
    setIsEditing(true);
  };

  const handleDeleteClick = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const updatedProjects = data.FEATURED_PROJECTS.filter((p: any) => p.id !== projectId);
    const updatedData = { ...data, FEATURED_PROJECTS: updatedProjects };

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
        alert(resJson.error || "Failed to delete project");
      }
    } catch {
      alert("Network error. Failed to delete project");
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
        setCover(resJson.url);
      } else {
        alert(resJson.error || "File upload failed");
      }
    } catch {
      alert("Network error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !title || !description) {
      alert("Please fill in slug ID, Title, and Description.");
      return;
    }

    setIsSaving(true);

    const projectObj = {
      id,
      title,
      category,
      description,
      tech: techString.split(",").map(t => t.trim()).filter(t => t.length > 0),
      impact,
      year,
      featured,
      accent,
      href: `/projects/${id}`,
      gradient,
      demoUrl: demoUrl || undefined,
      githubUrl: githubUrl || undefined,
      isPrivate,
      cover: cover || undefined,
      whyDecision: (whyProblem || whyChoice) ? {
        problem: whyProblem,
        architectureChoice: whyChoice,
        tradeoffs: whyTradeoffs,
        lessonsLearned: whyLessons,
      } : undefined,
      architectureComponents: architectureComponents.length > 0 ? architectureComponents : undefined,
    };

    let updatedProjects = [...data.FEATURED_PROJECTS];
    if (selectedId) {
      // Edit existing
      updatedProjects = updatedProjects.map(p => p.id === selectedId ? projectObj : p);
    } else {
      // Add new
      // Check duplicate ID
      if (updatedProjects.some(p => p.id === id)) {
        alert("A project with this slug ID already exists.");
        setIsSaving(false);
        return;
      }
      updatedProjects.push(projectObj);
    }

    const updatedData = { ...data, FEATURED_PROJECTS: updatedProjects };

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
        alert(resJson.error || "Failed to save project configuration");
      }
    } catch {
      alert("Network error. Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-muted)] mt-4 font-mono">Loading projects database...</span>
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

  const projects = data?.FEATURED_PROJECTS || [];
  
  const filteredProjects = projects.filter((p: any) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          (p.tech && p.tech.join(" ").toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white uppercase tracking-wide">Manage Portfolio Projects</h2>
          <p className="text-xs text-[var(--text-muted)]">Upload and edit software engineering, AI, and design case studies.</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleNewClick}
            className="flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-indigo-600 font-bold text-xs text-white hover:opacity-90 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer shadow-md shadow-indigo-500/25"
          >
            <Plus size={14} />
            <span>Create Project</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 flex-1 items-start">
        
        {/* Project List */}
        <div className={`space-y-4 ${isEditing ? "lg:col-span-3" : "lg:col-span-6"} transition-all duration-300`}>
          {/* Search/Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/[0.01] border border-white/5 rounded-xl text-xs text-white focus:border-indigo-500/40 focus:ring-0 outline-none"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-white/[0.01] border border-white/5 rounded-xl text-xs text-white/90 outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="engineering">Engineering</option>
              <option value="ai">AI Engineering</option>
              <option value="design">Design Systems</option>
              <option value="creative">Creative Media</option>
            </select>
          </div>

          {/* Grid items */}
          <div className={`grid grid-cols-1 ${isEditing ? "sm:grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3"} gap-4`}>
            {filteredProjects.map((p: any) => (
              <div 
                key={p.id} 
                className="glass border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all relative overflow-hidden"
              >
                {/* Visual accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: p.accent }} />

                <div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-indigo-400 uppercase mb-2">
                    <span>{p.category}</span>
                    <span className="text-[var(--text-muted)] font-mono">{p.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{p.title}</h4>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-4">{p.description}</p>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
                      title="Edit project"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div className="flex gap-2 text-[var(--text-muted)]">
                    {p.isPrivate ? (
                      <span title="Private Repo"><Lock size={12} /></span>
                    ) : p.githubUrl ? (
                      <Link href={p.githubUrl} target="_blank" className="hover:text-white"><GithubIcon size={12} /></Link>
                    ) : null}
                    {p.demoUrl && (
                      <Link href={p.demoUrl} target="_blank" className="hover:text-white"><ExternalLink size={12} /></Link>
                    )}
                    {p.featured && (
                      <span className="text-[8px] uppercase tracking-wider font-bold bg-[#6366f1]/10 px-1.5 py-0.5 rounded border border-[#6366f1]/20 text-[#6366f1]">Featured</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
              <p className="text-xs text-[var(--text-muted)]">No projects found matching the query criteria.</p>
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
              {selectedId ? "Modify Case Study" : "Publish New Case Study"}
            </h3>

            <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Slug ID</label>
                  <input
                    type="text"
                    disabled={!!selectedId}
                    placeholder="e.g. voice-ai"
                    value={id}
                    onChange={(e) => setId(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none"
                  >
                    <option value="engineering">Software Engineering</option>
                    <option value="ai">AI / ML</option>
                    <option value="design">Design System</option>
                    <option value="creative">Creative Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Multilingual Voice AI Assistant"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Short Summary</label>
                <textarea
                  placeholder="Real-time multilingual voice AI supporting 8 African languages..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-16 px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40 resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Python, OpenAI, Whisper, FastAPI"
                  value={techString}
                  onChange={(e) => setTechString(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Impact Metrics</label>
                  <input
                    type="text"
                    placeholder="e.g. 50,000+ queries/day"
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Release Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Accent Color (Hex)</label>
                  <input
                    type="color"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="w-full h-9 bg-black/40 border border-white/5 rounded-xl text-white outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Gradient Class</label>
                  <input
                    type="text"
                    placeholder="from-violet-500/20 to-purple-900/10"
                    value={gradient}
                    onChange={(e) => setGradient(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Project Cover Image Link / URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. /uploads/voice_assistant_cover.png"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
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
                <p className="text-[9px] text-[var(--text-muted)] mt-1.5">Upload a cover/thumbnail directly or paste any image URL.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">GitHub URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                  />
                </div>
              </div>

              {/* "Why?" Engineering Decision Manager Section */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                <span className="font-bold text-amber-400 text-xs block mb-1 font-mono">
                  "Why?" Engineering Decision Metadata:
                </span>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Problem Statement:</label>
                  <textarea
                    placeholder="Technical challenge or bottleneck to solve..."
                    value={whyProblem}
                    onChange={(e) => setWhyProblem(e.target.value)}
                    className="w-full h-14 px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Architecture Choice:</label>
                  <textarea
                    placeholder="Why this stack and system design was selected..."
                    value={whyChoice}
                    onChange={(e) => setWhyChoice(e.target.value)}
                    className="w-full h-14 px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Trade-offs Accepted:</label>
                  <input
                    type="text"
                    placeholder="e.g. Higher latency for 94%+ transcription accuracy"
                    value={whyTradeoffs}
                    onChange={(e) => setWhyTradeoffs(e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Key Lessons Learned:</label>
                  <input
                    type="text"
                    placeholder="e.g. Streaming audio in 200ms windows drastically reduced latency"
                    value={whyLessons}
                    onChange={(e) => setWhyLessons(e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* System Architecture Builder Section */}
              <ArchitectureCanvasEditor
                components={architectureComponents}
                onChange={(updated) => setArchitectureComponents(updated)}
              />

              <div className="flex gap-4 border-t border-white/5 pt-4">
                <label className="flex items-center gap-2 cursor-pointer font-bold uppercase tracking-wider text-[10px] text-[var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded bg-black/40 border-white/10 text-indigo-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Featured Project</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer font-bold uppercase tracking-wider text-[10px] text-[var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="rounded bg-black/40 border-white/10 text-indigo-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Private Repository</span>
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
                  <span>{isSaving ? "Saving..." : "Save Project"}</span>
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
