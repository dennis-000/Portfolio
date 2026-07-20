import { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  Palette, 
  Briefcase, 
  Settings, 
  FileText, 
  LogOut, 
  ShieldAlert, 
  Sparkles,
  Home
} from "lucide-react";
import AdminSidebarLink from "./AdminSidebarLink";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/projects", label: "Projects", icon: "projects" },
  { href: "/admin/designs", label: "Designs", icon: "designs" },
  { href: "/admin/blog", label: "Blog Posts", icon: "blog" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "mail" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Validate token on server side before rendering dashboard contents
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authorized_session") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#070708] text-[#e2e8f0] flex flex-col md:flex-row relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#6366f1]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-black/40 backdrop-blur-md p-6 flex flex-col justify-between relative z-20">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-white p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Dennis Opoku Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <span className="font-display font-bold text-sm tracking-wide text-white uppercase">
                Console OS
              </span>
            </Link>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400">
              <Sparkles size={8} />
              <span>CMS v2.0</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <AdminSidebarLink key={item.href} item={item} />
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-8 pt-4 border-t border-white/5 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-all"
          >
            <Home size={14} />
            <span>View Live Site</span>
          </Link>
          
          <form action="/api/admin/logout" method="POST" className="w-full">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/10 transition-all text-left cursor-pointer"
            >
              <LogOut size={14} />
              <span>Terminate Session</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 md:p-10 relative z-10 flex flex-col min-h-screen">
        {/* Header toolbar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-8">
          <div>
            <h1 className="text-lg font-bold text-white font-display uppercase tracking-wide">Dennis Opoku Portfolio</h1>
            <p className="text-[10px] text-[var(--text-muted)]">Global digital console active & authenticated.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live Sync</span>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
