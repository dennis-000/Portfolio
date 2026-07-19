"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Palette, 
  Briefcase, 
  Settings, 
  FileText,
  Mail,
  LucideIcon 
} from "lucide-react";

interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  projects: Briefcase,
  designs: Palette,
  blog: FileText,
  settings: Settings,
  mail: Mail,
};

export default function AdminSidebarLink({ item }: { item: SidebarItem }) {
  const pathname = usePathname();
  const Icon = iconMap[item.icon] || LayoutDashboard;
  
  // Strict check for dashboard, prefix check for others
  const isActive = item.href === "/admin" 
    ? pathname === "/admin"
    : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-sm font-bold ${
        isActive
          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-md shadow-indigo-500/5"
          : "text-[var(--text-muted)] hover:text-white hover:bg-white/5 border border-transparent"
      }`}
    >
      <Icon size={16} className={`transition-colors ${isActive ? "text-indigo-400" : "text-[var(--text-muted)] group-hover:text-white"}`} />
      <span>{item.label}</span>
    </Link>
  );
}
