"use client";

import { useState, useEffect } from "react";
import { Play, Square, Terminal, Code, HelpCircle } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio";

const PRESETS = {
  confetti: `// 🎉 Trigger Celebratory Confetti Emitter
Dennis.log("Initializing Canvas confetti emitter...");
Dennis.triggerConfetti();
Dennis.log("Visual explosion rendered! Happy coding! 🚀");`,

  theme: `// 🎨 Cycle Portfolio Accent Theme Colors
Dennis.log("Injecting theme override variables...");
const colors = ["#6366f1", "#8b5cf6", "#f59e0b", "#f43f5e", "#10b981", "#06b6d4"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

Dennis.setAccentColor(randomColor);
Dennis.log("Global accent theme updated to: " + randomColor);`,

  matrix: `// 🕸️ Toggle Digital Matrix Rain Background
Dennis.log("Accessing layout overlay layers...");
Dennis.toggleMatrixRain();
Dennis.log("Digital Matrix rain stream toggled!");`,

  particles: `// 🚀 Spawn Custom Interactive Particle Blast
Dennis.log("Initializing particle dynamics...");
Dennis.spawnParticles({
  count: 150,
  speed: 12,
  color: "var(--accent)", // Injects currently active accent color
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
});
Dennis.log("Spawning particle blast at screen center! ☄️");`,
};

export function InteractiveCodePreview() {
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>("confetti");
  const [code, setCode] = useState(PRESETS.confetti);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);

  const { triggerConfetti, toggleMatrixRain, setAccent } = usePortfolioStore();

  // Reset code when preset changes
  const handlePresetChange = (preset: keyof typeof PRESETS) => {
    setActivePreset(preset);
    setCode(PRESETS[preset]);
    setLogs([]);
  };

  const runCode = () => {
    setIsCompiling(true);
    setLogs([]);
    
    // Add compiling logs
    const addLog = (msg: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setLogs((l) => [...l, `[${new Date().toLocaleTimeString()}] ${msg}`]);
          resolve();
        }, delay);
      });
    };

    const execute = async () => {
      await addLog("Compiling script assets...", 150);
      await addLog("Validating execution context standard...", 150);
      await addLog("Connecting to Dennis portfolio runtime API...", 200);

      const dennisApi = {
        triggerConfetti: () => triggerConfetti(),
        toggleMatrixRain: (active?: boolean) => toggleMatrixRain(active),
        setAccentColor: (color: string) => {
          let rgb = "99, 102, 241"; // default
          if (color.startsWith("#")) {
            const hex = color.slice(1);
            if (hex.length === 6) {
              const r = parseInt(hex.slice(0, 2), 16);
              const g = parseInt(hex.slice(2, 4), 16);
              const b = parseInt(hex.slice(4, 6), 16);
              rgb = `${r}, ${g}, ${b}`;
            }
          }
          setAccent(color, rgb);
        },
        spawnParticles: (opts: any) => {
          // @ts-ignore
          if (window.__spawnDennisParticles) {
            // @ts-ignore
            window.__spawnDennisParticles(opts);
          }
        },
        log: (msg: string) => {
          setLogs((l) => [...l, `[LOG] ${msg}`]);
        },
      };

      try {
        // Run code dynamically in custom sandbox
        const runner = new Function("Dennis", code);
        runner(dennisApi);
        await addLog("Execution finished successfully (Exit Code 0).", 100);
      } catch (err: any) {
        setLogs((l) => [
          ...l,
          `[ERROR] ${err?.message ?? "An unexpected runtime error occurred."}`,
          `[ERROR] Execution terminated with errors.`
        ]);
      }
      setIsCompiling(false);
    };

    execute();
  };

  return (
    <div className="glass-strong rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-5 md:h-[500px]">
      
      {/* Sidebar Selector */}
      <div className="p-4 border-b md:border-b-0 md:border-r border-[var(--border)] bg-white/[0.01] flex flex-col gap-4 md:col-span-1.5 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#6366f1]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Playground</span>
        </div>
        
        <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              onClick={() => handlePresetChange(key as keyof typeof PRESETS)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg text-left whitespace-nowrap transition-all cursor-pointer ${
                activePreset === key 
                  ? "bg-[#6366f1]/20 text-white border border-[#6366f1]/40" 
                  : "text-[var(--text-muted)] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {key === "confetti" && "🎉 Confetti Burst"}
              {key === "theme" && "🎨 Theme Morph"}
              {key === "matrix" && "🕸️ Matrix Digital Rain"}
              {key === "particles" && "🚀 Particle Burst"}
            </button>
          ))}
        </div>

        <div className="mt-auto text-[10px] text-[var(--text-muted)] leading-relaxed hidden md:block p-3 border border-[var(--border)]/50 rounded-xl bg-white/[0.01]">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <HelpCircle size={10} className="text-[#6366f1]" />
            <span>How to run</span>
          </div>
          Select a preset, tweak the script in the code window, and click **Run Code** to execute dynamic visual effects on the portfolio in real time!
        </div>
      </div>

      {/* Code Editor & Console Logger */}
      <div className="flex-1 flex flex-col md:col-span-3.5 h-full min-h-[300px] md:min-h-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Code size={14} className="text-[#6366f1]" />
            <span className="text-xs font-bold text-[var(--text-muted)]">sandbox.js</span>
          </div>
          <button
            onClick={runCode}
            disabled={isCompiling}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              isCompiling 
                ? "bg-white/10 text-white/50 cursor-not-allowed" 
                : "bg-[#6366f1] text-white hover:opacity-90 hover:scale-[1.02]"
            }`}
          >
            <Play size={12} fill="white" />
            <span>Run Code</span>
          </button>
        </div>

        {/* Textarea Editor */}
        <div className="flex-1 relative flex bg-black/40 min-h-[180px] md:min-h-0">
          {/* Line Numbers */}
          <div className="w-10 select-none border-r border-[var(--border)]/40 text-right pr-2 py-4 font-mono text-[11px] sm:text-xs text-[var(--text-muted)]/40 bg-black/20 flex flex-col gap-0.5 leading-6">
            {Array.from({ length: Math.max(code.split("\n").length, 12) }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Text input */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent p-4 font-mono text-[11px] sm:text-xs text-indigo-100/90 resize-none outline-none border-none leading-6 h-full font-code focus:ring-0"
            spellCheck="false"
          />
        </div>

        {/* Terminal/Console Output */}
        <div className="h-40 border-t border-[var(--border)] bg-black/50 p-4 font-mono text-[10px] sm:text-xs flex flex-col gap-1.5 overflow-y-auto">
          <div className="flex items-center gap-2 text-[var(--text-muted)] font-bold border-b border-[var(--border)] pb-2 mb-1">
            <Terminal size={12} />
            <span>Console Output</span>
          </div>
          {logs.length === 0 ? (
            <span className="text-[var(--text-muted)]/40 italic">Terminal ready. Click Run to print output...</span>
          ) : (
            logs.map((log, index) => (
              <div 
                key={index} 
                className={
                  log.includes("[ERROR]") 
                    ? "text-rose-400" 
                    : log.includes("[LOG]") 
                    ? "text-[#06b6d4]" 
                    : "text-emerald-400/90"
                }
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
