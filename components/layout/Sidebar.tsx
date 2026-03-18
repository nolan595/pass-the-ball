"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, BarChart3, Calendar, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/games", label: "Games", icon: Trophy },
  { href: "/markets", label: "Markets", icon: BarChart3 },
  { href: "/events", label: "Events", icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">PassTheBall</span>
        </div>
        <nav className="ml-auto flex gap-0.5">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap",
                pathname.startsWith(href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 flex-col bg-white border-r border-slate-200 z-30">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
              <LayoutGrid className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm leading-none">PassTheBall</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Admin Simulation</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <p className="px-2 pt-1 pb-2 text-[11px] uppercase tracking-widest font-bold text-slate-400">
            Navigation
          </p>
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                pathname.startsWith(href)
                  ? "bg-indigo-50 text-indigo-700 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.15)]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-4 h-4", pathname.startsWith(href) ? "text-indigo-600" : "text-slate-400")} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="text-[11px] text-slate-400">Belgium · en-BE</div>
        </div>
      </aside>
    </>
  );
}
