import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { sqlQueries } from "@/lib/mock";
import { Play } from "lucide-react";

export const Route = createFileRoute("/sql-insights")({
  head: () => ({ meta: [{ title: "SQL Insights — SystemIQ" }] }),
  component: Sql,
});

function Sql() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§09 · Query"
        title="SQL INSIGHTS."
        subtitle="Query 90 days of telemetry with the same syntax your engineers already know."
      />
      <div className="px-6 lg:px-10 py-8 space-y-6">
        {sqlQueries.map((q, i) => (
          <div key={i} className="border border-hairline grid grid-cols-1 lg:grid-cols-2">
            <div className="border-b lg:border-b-0 lg:border-r border-hairline bg-surface">
              <div className="border-b border-hairline px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground">/Q.{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider">{q.title}</h3>
                </div>
                <button className="text-[10px] font-mono uppercase tracking-wider bg-foreground text-background px-2.5 py-1 inline-flex items-center gap-1 hover:bg-signal hover:text-signal-foreground">
                  <Play className="h-3 w-3" /> Run
                </button>
              </div>
              <pre className="font-mono text-[12px] p-4 overflow-x-auto leading-relaxed text-foreground/90">
                <code>{q.sql}</code>
              </pre>
            </div>

            <div>
              <div className="border-b border-hairline px-4 py-2.5 bg-surface flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-wider">Result</span>
                <span className="font-mono text-[10px] text-muted-foreground">{q.rows.length} rows · 240ms</span>
              </div>
              <table className="w-full text-[12px]">
                <thead className="bg-surface-2 border-b border-hairline">
                  <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {q.cols.map((c) => <th key={c} className="px-4 py-2 font-medium">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {q.rows.map((r, ri) => (
                    <tr key={ri} className="border-b border-hairline last:border-0 hover:bg-surface">
                      {r.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2 font-mono">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
