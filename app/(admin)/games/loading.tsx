function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className ?? ""}`} />;
}

export default function GamesLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-10" />
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["w-32", "w-40", "w-28", "w-28", "w-16", "w-20", "w-16"].map((w, i) => (
                <th key={i} className="px-6 py-3">
                  <Skeleton className={`h-3 ${w}`} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4"><Skeleton className="h-4 w-36" /></td>
                <td className="px-6 py-4"><Skeleton className="h-4 w-44" /></td>
                <td className="px-6 py-4"><Skeleton className="h-3 w-24" /></td>
                <td className="px-6 py-4"><Skeleton className="h-3 w-24" /></td>
                <td className="px-6 py-4"><Skeleton className="h-6 w-10 rounded-lg" /></td>
                <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                <td className="px-6 py-4"><Skeleton className="h-7 w-12 rounded-lg" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
