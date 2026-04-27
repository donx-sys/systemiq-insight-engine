import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, Panel } from "@/components/AppLayout";
import { LineTrend, ChartFrame } from "@/components/Charts";
import { hosts, containers, cpuMemTrend } from "@/lib/mock";

export const Route = createFileRoute("/infrastructure")({
  head: () => ({ meta: [{ title: "Infrastructure — SystemIQ" }] }),
  component: Infra,
});

const statusColor: Record<string, string> = {
  OK: "bg-success/15 text-success border-success/30",
  WARN: "bg-warning/15 text-warning border-warning/30",
  CRIT: "bg-signal/15 text-signal border-signal/40",
  Running: "bg-success/15 text-success border-success/30",
  Restarting: "bg-warning/15 text-warning border-warning/30",
  Degraded: "bg-signal/15 text-signal border-signal/40",
};

function Bar({ value, danger }: { value: number; danger?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-surface-2 max-w-[120px]">
        <div className="h-full" style={{ width: `${value}%`, background: value > 85 ? "var(--color-signal)" : value > 70 ? "var(--color-warning)" : "var(--color-foreground)" }} />
      </div>
      <span className={`font-mono text-[11px] tabular-nums ${danger && value > 85 ? "text-signal" : ""}`}>{value}%</span>
    </div>
  );
}

const netData = Array.from({ length: 24 }, (_, i) => ({ t: `${String(i).padStart(2,"0")}:00`, v: 200 + Math.round(80 * Math.sin(i / 3) + (i % 5) * 12) }));

function Infra() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§06 · Fleet"
        title="INFRASTRUCTURE."
        subtitle="Hosts, containers, regions — live resource and capacity telemetry."
      />
      <div className="px-6 lg:px-10 py-8 space-y-6">
        <div className="grid grid-cols-12 gap-px bg-hairline border border-hairline">
          <Panel code="/INF.01" title="CPU · Fleet Avg" className="col-span-12 md:col-span-4 border-0">
            <ChartFrame height={180}><LineTrend data={cpuMemTrend} lines={[{ key: "cpu", color: "var(--color-signal)" }]} /></ChartFrame>
          </Panel>
          <Panel code="/INF.02" title="Memory · Fleet Avg" className="col-span-12 md:col-span-4 border-0">
            <ChartFrame height={180}><LineTrend data={cpuMemTrend} lines={[{ key: "mem", color: "var(--color-foreground)" }]} /></ChartFrame>
          </Panel>
          <Panel code="/INF.03" title="Network · Mbps" className="col-span-12 md:col-span-4 border-0">
            <ChartFrame height={180}><LineTrend data={netData} lines={[{ key: "v", color: "var(--color-info)" }]} /></ChartFrame>
          </Panel>
        </div>

        <Panel code="/INF.04" title={`Hosts · ${hosts.length}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-surface-2 border-b border-hairline">
                <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {["Hostname", "IP", "Region", "CPU", "Memory", "Disk", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hosts.map((h) => (
                  <tr key={h.name} className="border-b border-hairline last:border-0 hover:bg-surface-2">
                    <td className="px-4 py-3 font-mono">{h.name}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{h.ip}</td>
                    <td className="px-4 py-3">{h.region}</td>
                    <td className="px-4 py-3"><Bar value={h.cpu} danger /></td>
                    <td className="px-4 py-3"><Bar value={h.mem} danger /></td>
                    <td className="px-4 py-3"><Bar value={h.disk} /></td>
                    <td className="px-4 py-3">
                      <span className={`border px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${statusColor[h.status]}`}>{h.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel code="/INF.05" title={`Containers · ${containers.length}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-surface-2 border-b border-hairline">
                <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {["Container", "Image", "Host", "CPU %", "Mem MB", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {containers.map((c) => (
                  <tr key={c.name} className="border-b border-hairline last:border-0 hover:bg-surface-2">
                    <td className="px-4 py-3 font-mono">{c.name}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{c.image}</td>
                    <td className="px-4 py-3 font-mono text-[12px]">{c.host}</td>
                    <td className="px-4 py-3"><Bar value={c.cpu} danger /></td>
                    <td className="px-4 py-3 font-mono">{c.mem}</td>
                    <td className="px-4 py-3">
                      <span className={`border px-2 py-1 text-[10px] font-mono uppercase tracking-wider ${statusColor[c.status]}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
