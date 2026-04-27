import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { deployments } from "@/lib/mock";
import { Undo2 } from "lucide-react";

export const Route = createFileRoute("/deployments")({
  head: () => ({ meta: [{ title: "Deployments — SystemIQ" }] }),
  component: Deploys,
});

const statusColor: Record<string, string> = {
  SUCCESS: "bg-success/15 text-success border-success/30",
  FAILED: "bg-signal/15 text-signal border-signal/40",
  ROLLBACK: "bg-warning/15 text-warning border-warning/30",
};

function Deploys() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§08 · Release"
        title="DEPLOYMENTS."
        subtitle="Every release annotated with environment, owner, and outcome."
      />
      <div className="px-6 lg:px-10 py-8">
        <div className="border border-hairline overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface-2 border-b border-hairline">
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {["Version", "Environment", "Deployed By", "Time", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deployments.map((d, i) => (
                <tr key={i} className={`border-b border-hairline last:border-0 hover:bg-surface ${i % 2 ? "bg-background" : "bg-surface/40"}`}>
                  <td className="px-4 py-3.5 font-display text-[18px]">{d.v}</td>
                  <td className="px-4 py-3.5 font-mono text-[11px] uppercase tracking-wider">{d.env}</td>
                  <td className="px-4 py-3.5 font-mono text-[12px]">{d.by}</td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-muted-foreground">{d.time}</td>
                  <td className="px-4 py-3.5">
                    <span className={`border px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${statusColor[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="text-[10px] font-mono uppercase tracking-wider border border-hairline px-2.5 py-1 hover:bg-foreground hover:text-background inline-flex items-center gap-1">
                      <Undo2 className="h-3 w-3" /> Rollback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
