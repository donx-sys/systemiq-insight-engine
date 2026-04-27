import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, Panel } from "@/components/AppLayout";
import { BarTrend, ChartFrame } from "@/components/Charts";
import { apiEndpoints } from "@/lib/mock";

export const Route = createFileRoute("/api-monitoring")({
  head: () => ({ meta: [{ title: "API Monitoring — SystemIQ" }] }),
  component: ApiMon,
});

const methodColor: Record<string, string> = {
  GET: "text-info",
  POST: "text-warning",
  PUT: "text-foreground",
  DELETE: "text-signal",
};

function ApiMon() {
  const chartData = apiEndpoints.map((e) => ({ ep: e.ep, v: e.avg }));
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§04 · Network"
        title="API MONITORING."
        subtitle="Endpoint throughput, success rate, and tail latency across the gateway."
      />
      <div className="px-6 lg:px-10 py-8 space-y-6">
        <Panel code="/CHART.01" title="Average Latency by Endpoint">
          <ChartFrame height={240}><BarTrend data={chartData} /></ChartFrame>
        </Panel>

        <div className="border border-hairline overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface-2 border-b border-hairline">
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {["Endpoint", "Method", "Calls", "Success", "Avg", "P95", "Error %"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((e, i) => {
                const slow = e.p95 > 500;
                return (
                  <tr key={e.ep} className={`border-b border-hairline last:border-0 ${slow ? "bg-signal/5" : i % 2 ? "bg-background" : "bg-surface/40"} hover:bg-surface`}>
                    <td className="px-4 py-3.5 font-mono text-[13px]">{e.ep}</td>
                    <td className={`px-4 py-3.5 font-mono text-[11px] uppercase ${methodColor[e.method]}`}>{e.method}</td>
                    <td className="px-4 py-3.5 font-mono">{e.calls.toLocaleString()}</td>
                    <td className="px-4 py-3.5 font-mono">{e.success}%</td>
                    <td className="px-4 py-3.5 font-mono">{e.avg} ms</td>
                    <td className={`px-4 py-3.5 font-mono ${slow ? "text-signal font-bold" : ""}`}>{e.p95} ms</td>
                    <td className={`px-4 py-3.5 font-mono ${e.err > 1 ? "text-signal" : "text-muted-foreground"}`}>{e.err}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
