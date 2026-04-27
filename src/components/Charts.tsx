import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { ReactNode } from "react";

const grid = "color-mix(in oklab, var(--color-hairline) 60%, transparent)";
const axis = "var(--color-muted-foreground)";

const tickStyle = { fill: axis, fontSize: 10, fontFamily: "var(--font-mono)" };

function TooltipBox({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-hairline bg-background px-2.5 py-1.5 font-mono text-[10px]">
      <div className="text-muted-foreground uppercase">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 mt-0.5">
          <span className="h-2 w-2" style={{ background: p.color }} />
          <span className="text-foreground">{p.dataKey}: {p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export function AreaTrend({ data, dataKey = "v", xKey = "d", color = "var(--color-foreground)" }: any) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`g-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={grid} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey={xKey} tick={tickStyle} axisLine={{ stroke: grid }} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={36} />
        <Tooltip content={<TooltipBox />} cursor={{ stroke: color, strokeDasharray: "2 2" }} />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#g-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LineTrend({ data, lines, xKey = "t" }: { data: any[]; xKey?: string; lines: { key: string; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={grid} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey={xKey} tick={tickStyle} axisLine={{ stroke: grid }} tickLine={false} interval={3} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={36} />
        <Tooltip content={<TooltipBox />} />
        {lines.map((l) => (
          <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} strokeWidth={2.5} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarTrend({ data, dataKey = "v", xKey = "ep", color = "var(--color-signal)" }: any) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={grid} strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey={xKey} tick={tickStyle} axisLine={{ stroke: grid }} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={36} />
        <Tooltip content={<TooltipBox />} cursor={{ fill: "color-mix(in oklab, var(--color-foreground) 6%, transparent)" }} />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Donut({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="grid grid-cols-2 h-full items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius="62%" outerRadius="92%" stroke="var(--color-background)" strokeWidth={2}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ul className="space-y-2 pr-3">
        {data.map((d) => (
          <li key={d.name} className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5" style={{ background: d.color }} />
              <span className="uppercase">{d.name}</span>
            </span>
            <span className="text-muted-foreground">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChartFrame({ children, height = 220 }: { children: ReactNode; height?: number }) {
  return <div style={{ height }} className="w-full">{children}</div>;
}
