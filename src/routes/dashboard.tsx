import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, Panel } from "@/components/AppLayout";
import { AreaTrend, LineTrend, Donut, ChartFrame } from "@/components/Charts";
import {
  kpis, sessionsTrend, crashTrend, latencyTrend, cpuMemTrend, severityDist, liveFeed,
} from "@/lib/mock";
import { ArrowDownRight, ArrowUpRight, Minus, Download, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SystemIQ" }] }),
  component: Dashboard,
});

function trendIcon(t: string) {
  if (t === "up") return <ArrowUpRight className="h-3.5 w-3.5" />;
  if (t === "down") return <ArrowDownRight className="h-3.5 w-3.5" />;
  return <Minus className="h-3.5 w-3.5" />;
}

const levelColor: Record<string, string> = {
  info: "text-info",
  ok: "text-success",
  warn: "text-warning",
  crit: "text-signal",
};

function Dashboard() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§01 · Operations / Live"
        title="DASHBOARD."
        subtitle="Cross-application health, telemetry and incidents — last 24 hours."
        actions={
          <>
            <button className="border border-hairline px-3 py-2 text-[12px] uppercase tracking-wider hover:bg-surface flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button className="bg-foreground text-background px-3 py-2 text-[12px] uppercase tracking-wider hover:bg-signal hover:text-signal-foreground transition-colors flex items-center gap-2">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </>
        }
      />

      <div className="px-6 lg:px-10 py-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline">
          {kpis.map((k) => (
            <div key={k.label} className="bg-surface p-5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k.label}</div>
              <div className="mt-3 font-display text-[40px] leading-none">
                {k.value}
                {k.unit && <span className="text-[18px] text-muted-foreground ml-1">{k.unit}</span>}
              </div>
              <div className={`mt-3 inline-flex items-center gap-1 text-[11px] font-mono ${k.trend === "up" ? "text-success" : k.trend === "down" ? "text-signal" : "text-muted-foreground"}`}>
                {trendIcon(k.trend)} {k.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-12 gap-px bg-hairline border border-hairline">
          <Panel code="/CHART.01" title="Sessions · 7d" className="col-span-12 lg:col-span-6 border-0">
            <ChartFrame height={240}>
              <AreaTrend data={sessionsTrend} color="var(--color-foreground)" />
            </ChartFrame>
          </Panel>
          <Panel code="/CHART.02" title="Crashes · 7d" className="col-span-12 lg:col-span-6 border-0">
            <ChartFrame height={240}>
              <AreaTrend data={crashTrend} color="var(--color-signal)" />
            </ChartFrame>
          </Panel>
          <Panel code="/CHART.03" title="API Latency · 24h" className="col-span-12 lg:col-span-8 border-0">
            <ChartFrame height={240}>
              <LineTrend data={latencyTrend} lines={[{ key: "v", color: "var(--color-foreground)" }]} />
            </ChartFrame>
          </Panel>
          <Panel code="/CHART.04" title="Severity Mix" className="col-span-12 lg:col-span-4 border-0">
            <ChartFrame height={240}>
              <Donut data={severityDist} />
            </ChartFrame>
          </Panel>
          <Panel code="/CHART.05" title="CPU / Memory · 24h" className="col-span-12 lg:col-span-8 border-0">
            <ChartFrame height={240}>
              <LineTrend
                data={cpuMemTrend}
                lines={[
                  { key: "cpu", color: "var(--color-signal)" },
                  { key: "mem", color: "var(--color-foreground)" },
                ]}
              />
            </ChartFrame>
          </Panel>
          <Panel code="/FEED.01" title="Live Activity" className="col-span-12 lg:col-span-4 border-0">
            <ul className="font-mono text-[11px] divide-y divide-hairline max-h-[240px] overflow-y-auto">
              {liveFeed.map((e, i) => (
                <li key={i} className="px-3 py-2 flex items-start gap-2 hover:bg-surface-2">
                  <span className="text-muted-foreground shrink-0">{e.t}</span>
                  <span className={`shrink-0 font-bold ${levelColor[e.level]}`}>{e.tag}</span>
                  <span className="text-foreground/90 truncate">{e.msg}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppLayout>
  );
}
