import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  LayoutGrid, Boxes, Users, Activity, AlertOctagon, Server,
  Bell, Rocket, Database, FileBarChart2, Settings,
} from "lucide-react";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid, code: "01" },
  { to: "/applications", label: "Applications", icon: Boxes, code: "02" },
  { to: "/sessions", label: "Sessions", icon: Users, code: "03" },
  { to: "/api-monitoring", label: "API Monitoring", icon: Activity, code: "04" },
  { to: "/crash-analytics", label: "Crash Analytics", icon: AlertOctagon, code: "05" },
  { to: "/infrastructure", label: "Infrastructure", icon: Server, code: "06" },
  { to: "/alerts", label: "Alerts", icon: Bell, code: "07" },
  { to: "/deployments", label: "Deployments", icon: Rocket, code: "08" },
  { to: "/sql-insights", label: "SQL Insights", icon: Database, code: "09" },
  { to: "/reports", label: "Reports", icon: FileBarChart2, code: "10" },
  { to: "/settings", label: "Settings", icon: Settings, code: "11" },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden lg:flex w-[248px] shrink-0 flex-col border-r border-hairline bg-sidebar">
      <div className="h-14 flex items-center px-5 border-b border-hairline">
        <Link to="/"><Logo /></Link>
      </div>
      <div className="px-5 pt-5 pb-2 text-eyebrow flex items-center justify-between">
        <span>Navigation</span>
        <span className="font-mono">11</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-6">
        {NAV.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium uppercase tracking-wide transition-colors
                ${active
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground"}`}
            >
              {active && <span className="absolute left-0 top-0 h-full w-[3px] bg-signal" />}
              <span className="font-mono text-[10px] text-muted-foreground w-6">{item.code}</span>
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-hairline px-5 py-4 text-[11px] font-mono text-muted-foreground space-y-1">
        <div className="flex justify-between"><span>BUILD</span><span className="text-foreground">4.8.2.318</span></div>
        <div className="flex justify-between"><span>REGION</span><span className="text-foreground">us-east-1</span></div>
        <div className="flex justify-between items-center">
          <span>STATUS</span>
          <span className="flex items-center gap-1.5 text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success blink" /> ONLINE
          </span>
        </div>
      </div>
    </aside>
  );
}
