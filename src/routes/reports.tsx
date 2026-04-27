import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { reports } from "@/lib/mock";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — SystemIQ" }] }),
  component: Reports,
});

// Tiny SVG sparkline / bar preview, monochrome
function Spark() {
  const pts = [10, 28, 14, 36, 22, 44, 30, 52, 40, 28, 48, 60].map((y, i) => `${i * 12},${64 - y}`).join(" ");
  return (
    <svg viewBox="0 0 132 64" className="w-full h-16">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function Bars() {
  const vals = [40, 22, 56, 30, 48, 18, 62, 34, 50];
  return (
    <svg viewBox="0 0 132 64" className="w-full h-16">
      {vals.map((v, i) => <rect key={i} x={i * 14 + 2} y={64 - v} width="10" height={v} fill="currentColor" />)}
    </svg>
  );
}

function Reports() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="§10 · Records"
        title="REPORTS."
        subtitle="Scheduled and on-demand reports — health, crashes, performance and SLAs."
      />
      <div className="px-6 lg:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
        {reports.map((r, i) => (
          <article key={r.title} className="bg-surface p-6 flex flex-col">
            <header className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-eyebrow mb-2"><FileText className="h-3 w-3" /> {r.fmt}</div>
                <h3 className="font-display text-[26px] leading-tight">{r.title}</h3>
                <div className="font-mono text-[11px] text-muted-foreground mt-1">{r.period}</div>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">{r.size}</span>
            </header>
            <div className="text-foreground my-4">{i % 2 === 0 ? <Spark /> : <Bars />}</div>
            <div className="mt-auto flex gap-2">
              <button className="bg-foreground text-background px-3 py-2 text-[11px] uppercase tracking-wider inline-flex items-center gap-2 hover:bg-signal hover:text-signal-foreground">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
              <button className="border border-hairline px-3 py-2 text-[11px] uppercase tracking-wider hover:bg-surface-2">Preview</button>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
