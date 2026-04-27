import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { sessions } from "@/lib/mock";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/sessions")({
  head: () => ({ meta: [{ title: "Sessions — SystemIQ" }] }),
  component: Sessions,
});

function FilterChip({ label, value }: { label: string; value: string }) {
  return (
    <button className="border border-hairline px-3 py-1.5 text-[11px] uppercase tracking-wider hover:bg-surface flex items-center gap-2">
      <span className="text-muted-foreground">{label}:</span>
      <span>{value}</span>
    </button>
  );
}

function Sessions() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§03 · Telemetry"
        title="SESSIONS."
        subtitle="User sessions, devices, and network telemetry across all environments."
      />
      <div className="px-6 lg:px-10 py-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <FilterChip label="Country" value="All" />
          <FilterChip label="Device" value="All" />
          <FilterChip label="Browser" value="All" />
          <FilterChip label="Date" value="Last 24h" />
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">
            {sessions.length} of 52,310 sessions
          </span>
        </div>

        <div className="border border-hairline overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface-2 border-b border-hairline">
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {["Session ID", "Device", "OS", "Browser", "Country", "Duration", "Network", "Start"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={s.id} className={`border-b border-hairline last:border-0 hover:bg-surface ${i % 2 ? "bg-background" : "bg-surface/40"}`}>
                  <td className="px-4 py-3 font-mono text-[12px] text-signal">{s.id}</td>
                  <td className="px-4 py-3">{s.device}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{s.os}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.browser}</td>
                  <td className="px-4 py-3">{s.country}</td>
                  <td className="px-4 py-3 font-mono text-[12px]">{s.dur}</td>
                  <td className="px-4 py-3 font-mono text-[11px]">{s.net}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{s.start}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
