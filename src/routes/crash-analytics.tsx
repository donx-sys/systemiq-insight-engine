import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { crashes, stackTrace } from "@/lib/mock";
import { useState } from "react";
import { X } from "lucide-react";

export const Route = createFileRoute("/crash-analytics")({
  head: () => ({ meta: [{ title: "Crash Analytics — SystemIQ" }] }),
  component: Crash,
});

const sevColor: Record<string, string> = {
  CRITICAL: "bg-signal text-signal-foreground",
  HIGH: "bg-warning/20 text-warning border border-warning/40",
  MEDIUM: "bg-info/15 text-info border border-info/30",
  LOW: "bg-surface-2 text-muted-foreground border border-hairline",
};

const SEVS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

function Crash() {
  const [selected, setSelected] = useState<typeof crashes[0] | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const visible = active ? crashes.filter((c) => c.severity === active) : crashes;

  return (
    <AppLayout>
      <PageHeader
        eyebrow="§05 · Diagnostics"
        title="CRASH ANALYTICS."
        subtitle="Exceptions grouped by signature, correlated with deployments and infrastructure."
      />

      <div className="px-6 lg:px-10 py-8 space-y-6">
        {/* Severity segmented control */}
        <div className="flex flex-wrap items-center gap-px bg-hairline border border-hairline w-fit">
          <button
            onClick={() => setActive(null)}
            className={`px-4 py-2 text-[11px] font-mono uppercase tracking-wider ${active === null ? "bg-foreground text-background" : "bg-background hover:bg-surface"}`}
          >
            All · {crashes.length}
          </button>
          {SEVS.map((s) => {
            const n = crashes.filter((c) => c.severity === s).length;
            return (
              <button
                key={s}
                onClick={() => setActive(s)}
                className={`px-4 py-2 text-[11px] font-mono uppercase tracking-wider ${active === s ? "bg-foreground text-background" : "bg-background hover:bg-surface"}`}
              >
                {s} · {n}
              </button>
            );
          })}
        </div>

        {/* Crashes table */}
        <div className="border border-hairline overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface-2 border-b border-hairline">
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {["Error ID", "Type", "Severity", "Version", "Host", "Container", "Session", "Time"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((c, i) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`cursor-pointer border-b border-hairline last:border-0 hover:bg-surface ${i % 2 ? "bg-background" : "bg-surface/40"}`}
                >
                  <td className="px-4 py-3 font-mono text-[12px] text-signal">{c.id}</td>
                  <td className="px-4 py-3 font-medium">{c.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${sevColor[c.severity]}`}>
                      {c.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px]">{c.version}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{c.host}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{c.container}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{c.session}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side panel */}
      {selected && (
        <div className="fixed inset-0 z-40 flex" onClick={() => setSelected(null)}>
          <div className="flex-1 bg-background/60 backdrop-blur-sm" />
          <aside
            className="w-full max-w-[640px] bg-background border-l border-hairline overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-hairline px-6 py-4 flex items-center justify-between">
              <div className="text-eyebrow">Error Detail</div>
              <button onClick={() => setSelected(null)} className="hover:bg-surface p-1"><X className="h-4 w-4" /></button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="font-mono text-[11px] text-signal">{selected.id}</div>
                <h2 className="text-display text-[36px] mt-2">{selected.type}</h2>
                <span className={`inline-block mt-3 px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${sevColor[selected.severity]}`}>
                  {selected.severity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-px bg-hairline border border-hairline">
                {[
                  ["Frequency · 24h", "47 events"],
                  ["First seen", "Apr 27, 22:18"],
                  ["Related deploy", selected.version],
                  ["Suggested severity", selected.severity],
                ].map(([k, v]) => (
                  <div key={k} className="bg-surface p-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k}</div>
                    <div className="font-display text-[20px] mt-1">{v}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-eyebrow mb-3">Root cause summary</div>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Session object resolves to <span className="font-mono text-foreground">null</span> when the
                  upstream auth token is missing during checkout finalization. Introduced in build
                  <span className="font-mono text-foreground"> 4.8.2.318</span> via PR #2841 — hot path was
                  refactored to assume non-null sessions without a guard clause.
                </p>
              </div>

              <div>
                <div className="text-eyebrow mb-3">Stack Trace</div>
                <pre className="font-mono text-[11px] bg-background border border-hairline p-4 overflow-x-auto leading-relaxed">
                  <code>{stackTrace}</code>
                </pre>
              </div>

              <div className="flex gap-2">
                <button className="bg-signal text-signal-foreground px-4 py-2.5 text-[12px] uppercase tracking-wider hover:opacity-90">Acknowledge</button>
                <button className="border border-hairline px-4 py-2.5 text-[12px] uppercase tracking-wider hover:bg-surface">Assign</button>
                <button className="border border-hairline px-4 py-2.5 text-[12px] uppercase tracking-wider hover:bg-surface">Rollback v4.8.2</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </AppLayout>
  );
}
