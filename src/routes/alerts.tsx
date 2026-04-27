import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, Panel } from "@/components/AppLayout";
import { alertRules, alertTimeline } from "@/lib/mock";
import { Check } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts — SystemIQ" }] }),
  component: Alerts,
});

const sevBg: Record<string, string> = {
  CRITICAL: "border-signal bg-signal/5",
  HIGH: "border-warning/50 bg-warning/5",
  MEDIUM: "border-info/40 bg-info/5",
};

const levelDot: Record<string, string> = {
  ok: "bg-success",
  warn: "bg-warning",
  crit: "bg-signal",
};

function Alerts() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§07 · Detection"
        title="ALERTS."
        subtitle="Threshold and anomaly detection — routed to PagerDuty, Slack and webhooks."
      />
      <div className="px-6 lg:px-10 py-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 space-y-3">
          <div className="text-eyebrow mb-2">Alert Rules</div>
          {alertRules.map((r) => (
            <div key={r.name} className={`border-l-4 border border-hairline ${sevBg[r.severity] ?? "bg-surface"} p-5 flex items-center justify-between gap-4`}>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-[22px]">{r.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-hairline px-2 py-0.5">{r.severity}</span>
                </div>
                <code className="font-mono text-[12px] text-muted-foreground mt-2 block">{r.condition}</code>
              </div>
              <div className="text-right">
                <div className="font-display text-[36px]">{r.count}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">triggered · 24h</div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-5">
          <Panel code="/TIMELINE" title="Triggered Today">
            <ul className="divide-y divide-hairline">
              {alertTimeline.map((t, i) => (
                <li key={i} className="px-4 py-4 flex items-start gap-3 hover:bg-surface-2">
                  <span className={`h-2 w-2 mt-2 ${levelDot[t.level]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[11px] text-muted-foreground">{t.time}</div>
                    <div className="text-[13px] mt-0.5">{t.text}</div>
                  </div>
                  <button className="text-[10px] font-mono uppercase tracking-wider border border-hairline px-2 py-1 hover:bg-foreground hover:text-background flex items-center gap-1">
                    <Check className="h-3 w-3" /> ACK
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppLayout>
  );
}
