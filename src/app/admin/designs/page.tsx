"use client";

import { useEffect, useState } from "react";
import { 
  Palette, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Upload, 
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";

export default function AdminDesignsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  
  // Editor state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Branding");
  const [color, setColor] = useState("#f43f5e");
  const [tagsString, setTagsString] = useState("");
  const [image, setImage] = useState("");

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
      .catch(() => setError("Failed to load designs database"))
      .finally(() => setIsLoading(false));
  };

  const handleEditClick = (index: number, work: any) => {
    setSelectedIndex(index);
    setTitle(work.title);
    setType(work.type);
    setColor(work.color || "#f43f5e");
    setTagsString(work.tags ? work.tags.join(", ") : "");
    setImage(work.image || "");
    setIsEditing(true);
  };

  const handleNewClick = () => {
    setSelectedIndex(null);
    setTitle("");
    setType("Branding");
    setColor("#f43f5e");
    setTagsString("");
    setImage("");
    setIsEditing(true);
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
        setImage(resJson.url);
      } else {
        alert(resJson.error || "File upload failed");
      }
    } catch {
      alert("Network error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteClick = async (index: number) => {
    if (!confirm("Are you sure you want to delete this design work?")) return;

    const updatedDesignWork = data.DESIGN_WORK.filter((_: any, i: number) => i !== index);
    const updatedData = { ...data, DESIGN_WORK: updatedDesignWork };

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
        alert(resJson.error || "Failed to delete design work");
      }
    } catch {
      alert("Network error. Failed to delete design work");
    }
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type) {
      alert("Please fill in Title and Type.");
      return;
    }

    setIsSaving(true);

    const designObj = {
      title,
      type,
      color,
      tags: tagsString.split(",").map(t => t.trim()).filter(t => t.length > 0),
      image,
    };

    let updatedDesignWork = [...data.DESIGN_WORK];
    if (selectedIndex !== null) {
      // Edit
      updatedDesignWork = updatedDesignWork.map((d, i) => i === selectedIndex ? designObj : d);
    } else {
      // New
      updatedDesignWork.push(designObj);
    }

    const updatedData = { ...data, DESIGN_WORK: updatedDesignWork };

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
        alert(resJson.error || "Failed to save design configuration");
      }
    } catch {
      alert("Network error. Failed to save design");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-muted)] mt-4 font-mono">Loading designs database...</span>
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

  const designs = data?.DESIGN_WORK || [];
  
  const filteredDesigns = designs.filter((d: any) => {
    return d.title.toLowerCase().includes(search.toLowerCase()) || 
           d.type.toLowerCase().includes(search.toLowerCase()) ||
           (d.tags && d.tags.join(" ").toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white uppercase tracking-wide">Manage Graphic Designs</h2>
          <p className="text-xs text-[var(--text-muted)]">Post brand identity systems, posters, flyers, and UI/UX projects.</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleNewClick}
            className="flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-indigo-600 font-bold text-xs text-white hover:opacity-90 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer shadow-md shadow-indigo-500/25"
          >
            <Plus size={14} />
            <span>Upload Work</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 flex-1 items-start">
        
        {/* Designs List */}
        <div className={`space-y-4 ${isEditing ? "lg:col-span-3" : "lg:col-span-6"} transition-all duration-300`}>
          {/* Search bar */}
          <div className="relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search design systems, types, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.01] border border-white/5 rounded-xl text-xs text-white focus:border-indigo-500/40 focus:ring-0 outline-none"
            />
          </div>

          {/* Grid items */}
          <div className={`grid grid-cols-1 ${isEditing ? "sm:grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3"} gap-4`}>
            {filteredDesigns.map((d: any, index: number) => (
              <div 
                key={index} 
                className="glass border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all relative overflow-hidden"
              >
                {/* Visual accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: d.color }} />

                <div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-indigo-400 uppercase mb-2">
                    <span style={{ color: d.color }}>{d.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-3">{d.title}</h4>
                  
                  {/* Image thumbnail placeholder/preview */}
                  <div className="w-full h-24 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center overflow-hidden mb-4 relative">
                    {d.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 opacity-20">
                        <ImageIcon size={20} />
                        <span className="text-[8px] uppercase tracking-wider font-bold">No Preview Image</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(index, d)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
                      title="Edit design work"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all cursor-pointer"
                      title="Delete design work"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-end gap-1">
                    {d.tags && d.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[var(--text-muted)]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
              <p className="text-xs text-[var(--text-muted)]">No design works found matching the query criteria.</p>
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
              {selectedIndex !== null ? "Modify Design Asset" : "Publish Design Asset"}
            </h3>

            <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Startup Conference Poster Series"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Design Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none"
                  >
                    <option value="Branding">Branding</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Brand System">Brand System</option>
                    <option value="UI Design">UI Design</option>
                    <option value="Print Design">Print Design</option>
                    <option value="Visual System">Visual System</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Theme Color (Hex)</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-9 bg-black/40 border border-white/5 rounded-xl text-white outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Figma, Color Palette, Mobile"
                  value={tagsString}
                  onChange={(e) => setTagsString(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-indigo-500/40"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">Design Image Link / URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. /uploads/my_flyer.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
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
                <p className="text-[9px] text-[var(--text-muted)] mt-1.5">You can upload a flyer/poster directly or paste any image URL.</p>
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
                  <span>{isSaving ? "Saving..." : "Save Design"}</span>
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
