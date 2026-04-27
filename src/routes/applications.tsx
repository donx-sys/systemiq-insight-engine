import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { applications } from "@/lib/mock";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: [{ title: "Applications — SystemIQ" }] }),
  component: Applications,
});

const statusColor: Record<string, string> = {
  Healthy: "bg-success/15 text-success border-success/30",
  Degraded: "bg-warning/15 text-warning border-warning/30",
  Critical: "bg-signal/15 text-signal border-signal/40",
};

function Applications() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§02 · Catalog"
        title="APPLICATIONS."
        subtitle="Every service we monitor — owner team, current version, environment and uptime."
        actions={
          <button className="bg-signal text-signal-foreground px-3 py-2 text-[12px] uppercase tracking-wider flex items-center gap-2 hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Add Application
          </button>
        }
      />
      <div className="px-6 lg:px-10 py-8">
        <div className="border border-hairline overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface-2 border-b border-hairline">
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {["App Name", "Owner Team", "Version", "Environment", "Status", "Last Deployment", "Uptime"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((a, i) => (
                <tr key={a.name} className={`border-b border-hairline last:border-0 hover:bg-surface ${i % 2 ? "bg-background" : "bg-surface/40"}`}>
                  <td className="px-4 py-3.5">
                    <div className="font-display text-[16px]">{a.name}</div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">{a.team}</td>
                  <td className="px-4 py-3.5 font-mono text-[12px]">{a.version}</td>
                  <td className="px-4 py-3.5 font-mono text-[11px] uppercase tracking-wider">{a.env}</td>
                  <td className="px-4 py-3.5">
                    <span className={`border px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${statusColor[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-muted-foreground">{a.deployed}</td>
                  <td className="px-4 py-3.5 font-mono text-[12px]">{a.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
