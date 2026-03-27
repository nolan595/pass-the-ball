import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <main className="md:ml-56 min-h-screen p-4 pt-[72px] md:p-8 max-w-[1600px]">
        {children}
      </main>
    </div>
  );
}
