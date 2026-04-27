import { Search, Bell, ChevronDown, Calendar } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  const [env, setEnv] = useState("Production");
  return (
    <header className="h-14 shrink-0 border-b border-hairline bg-background flex items-stretch">
      <div className="flex-1 flex items-center px-5 border-r border-hairline">
        <Search className="h-4 w-4 text-muted-foreground mr-3" strokeWidth={1.75} />
        <input
          placeholder="Search applications, errors, hosts, sessions…"
          className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden md:inline-flex font-mono text-[10px] text-muted-foreground border border-hairline px-1.5 py-0.5">⌘K</kbd>
      </div>

      <button className="hidden md:flex items-center gap-2 px-4 border-r border-hairline text-[12px] uppercase tracking-wider hover:bg-surface">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        <select
          value={env}
          onChange={(e) => setEnv(e.target.value)}
          className="bg-transparent outline-none uppercase tracking-wider text-[12px] font-medium"
        >
          <option>Production</option>
          <option>Staging</option>
          <option>Dev</option>
        </select>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      <button className="hidden md:flex items-center gap-2 px-4 border-r border-hairline text-[12px] uppercase tracking-wider hover:bg-surface">
        <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
        Last 24h
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      <button className="relative flex items-center justify-center w-12 border-r border-hairline hover:bg-surface">
        <Bell className="h-4 w-4" strokeWidth={1.75} />
        <span className="absolute top-3 right-3 h-1.5 w-1.5 bg-signal" />
      </button>

      <div className="flex items-center gap-3 px-4">
        <div className="text-right hidden md:block">
          <div className="text-[12px] font-medium leading-tight">A. Kapoor</div>
          <div className="text-[10px] font-mono text-muted-foreground uppercase">Admin · SRE</div>
        </div>
        <div className="h-8 w-8 bg-foreground text-background grid place-items-center font-display text-[13px] font-bold">AK</div>
      </div>
    </header>
  );
}
