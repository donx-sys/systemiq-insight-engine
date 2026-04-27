import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow, title, subtitle, actions,
}: { eyebrow: string; title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="border-b border-hairline px-6 lg:px-10 py-8 flex items-end justify-between gap-6 flex-wrap">
      <div>
        <div className="text-eyebrow mb-3">{eyebrow}</div>
        <h1 className="text-display text-[44px] md:text-[64px]">{title}</h1>
        {subtitle && <p className="mt-3 max-w-xl text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title, code, children, className = "", actions,
}: { title?: string; code?: string; children: ReactNode; className?: string; actions?: ReactNode }) {
  return (
    <section className={`border border-hairline bg-surface ${className}`}>
      {(title || code) && (
        <header className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
          <div className="flex items-center gap-3">
            {code && <span className="font-mono text-[10px] text-muted-foreground">{code}</span>}
            {title && <h3 className="text-[12px] font-semibold uppercase tracking-wider">{title}</h3>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
