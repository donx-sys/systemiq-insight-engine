import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowUpRight, ArrowRight, Activity, AlertOctagon, Database, Server, Rocket, Gauge } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SystemIQ — Real-Time Application Monitoring & Crash Intelligence" },
      { name: "description", content: "Unified observability for modern applications. Sessions, telemetry, crash tracing, infrastructure and live alerts — engineered for SRE, DevOps and platform teams." },
      { property: "og:title", content: "SystemIQ — Application Performance & Crash Intelligence" },
      { property: "og:description", content: "Monitor performance. Detect crashes. Ship faster." },
    ],
  }),
  component: Landing,
});

function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 h-14 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-wider text-muted-foreground">
          <a href="#platform" className="hover:text-foreground">Platform</a>
          <a href="#capabilities" className="hover:text-foreground">Capabilities</a>
          <a href="#telemetry" className="hover:text-foreground">Telemetry</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#docs" className="hover:text-foreground">Docs</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-[12px] uppercase tracking-wider px-3 py-2 hover:bg-surface">Sign in</Link>
          <Link to="/dashboard" className="text-[12px] uppercase tracking-wider px-3 py-2 bg-foreground text-background hover:bg-signal hover:text-signal-foreground transition-colors">
            Open dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}

function Marquee() {
  const items = ["INCIDENT · CHECKOUT-SVC · 09:42", "P95 LATENCY 188ms", "CRASH SURGE +12 / 60s", "DEPLOY v4.8.2 → PROD", "HOST-PROD-03 CPU 91%", "SESSIONS 52,310 ↑", "ERROR RATE 0.34%"];
  return (
    <div className="border-y border-hairline bg-surface overflow-hidden">
      <div className="flex marquee whitespace-nowrap py-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="px-6 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal" />{it}
          </span>
        ))}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      {/* HERO */}
      <section className="relative border-b border-hairline overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-eyebrow mb-8">
              <span className="h-2 w-2 bg-signal blink" />
              v4.8.2 · STATUS: OPERATIONAL · APR 28, 2026
            </div>
            <h1 className="text-display text-[56px] sm:text-[88px] lg:text-[128px]">
              MONITOR<br />
              PERFORMANCE.<br />
              <span className="text-signal">DETECT</span> CRASHES.<br />
              SHIP <span className="underline decoration-[6px] underline-offset-[10px]">FASTER</span>.
            </h1>
            <p className="mt-10 max-w-xl text-[15px] text-muted-foreground leading-relaxed">
              Unified observability platform for modern applications with analytics, telemetry,
              crash tracing, and live alerts — engineered for SRE, DevOps, and platform teams.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/dashboard" className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 text-[13px] uppercase tracking-wider font-semibold hover:bg-signal hover:text-signal-foreground transition-colors">
                Open Dashboard <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-3 border border-foreground px-6 py-4 text-[13px] uppercase tracking-wider font-semibold hover:bg-surface">
                View Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="border border-hairline bg-surface p-5">
              <div className="text-eyebrow mb-2">Live · prod-eu-west</div>
              <div className="font-display text-[64px] leading-none">73<span className="text-[28px] text-muted-foreground">%</span></div>
              <div className="mt-1 text-[11px] font-mono text-muted-foreground">CPU LOAD · 24 HOSTS</div>
            </div>
            <div className="border border-hairline bg-surface p-5">
              <div className="text-eyebrow mb-2">Sessions · today</div>
              <div className="font-display text-[64px] leading-none">52,310</div>
              <div className="mt-1 text-[11px] font-mono text-success">+12.1% vs yday</div>
            </div>
            <div className="border border-hairline bg-signal text-signal-foreground p-5">
              <div className="font-mono text-[10px] uppercase tracking-wider opacity-80 mb-2">Active incident</div>
              <div className="font-display text-[22px] leading-tight">CHECKOUT-SVC<br />NULLPOINTER · CRITICAL</div>
              <div className="mt-3 text-[11px] font-mono opacity-80">12 events / 60s · v4.8.2</div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* TRUSTED */}
      <section id="platform" className="border-b border-hairline">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-12">
          <div className="text-eyebrow mb-6">Trusted by engineering teams</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-hairline border border-hairline">
            {["NORTHWIND", "ORBITAL", "MERIDIAN", "HELIX", "PALADIN", "VECTOR/9"].map((n) => (
              <div key={n} className="bg-background py-8 grid place-items-center font-display text-[22px] tracking-tight text-muted-foreground">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="border-b border-hairline">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <div className="text-eyebrow mb-4">§02 · Capabilities</div>
              <h2 className="text-display text-[44px] lg:text-[72px]">ONE PLATFORM.<br />EVERY SIGNAL.</h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 text-[15px] text-muted-foreground self-end leading-relaxed">
              SystemIQ correlates sessions, traces, errors, infrastructure metrics and deployments
              into a single operational picture — so teams spend less time hunting and more time shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
            {[
              { i: Activity, n: "01", t: "Real-Time Dashboards", d: "Sub-second telemetry across 12 applications, 6 regions, 24 hosts." },
              { i: AlertOctagon, n: "02", t: "Crash Diagnostics", d: "Group, deduplicate, and trace exceptions to the deploy that introduced them." },
              { i: Database, n: "03", t: "SQL-Powered Insights", d: "Query 90 days of telemetry with the same syntax your engineers already know." },
              { i: Server, n: "04", t: "Infrastructure Visibility", d: "Hosts, containers, regions — CPU, memory, disk and network in one view." },
              { i: Rocket, n: "05", t: "Deployment Tracking", d: "Every release annotated on every chart — no more guessing what changed." },
              { i: Gauge, n: "06", t: "Live Alerts & SLAs", d: "Threshold and anomaly detection with PagerDuty, Slack and webhook routing." },
            ].map((c) => (
              <div key={c.n} className="bg-background p-8 group hover:bg-surface transition-colors">
                <div className="flex items-start justify-between mb-8">
                  <c.i className="h-6 w-6" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] text-muted-foreground">/{c.n}</span>
                </div>
                <h3 className="font-display text-[26px] mb-3 group-hover:text-signal transition-colors">{c.t}</h3>
                <p className="text-[13px] text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG STAT */}
      <section id="telemetry" className="border-b border-hairline">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="text-eyebrow mb-4">§03 · Scale</div>
            <h2 className="text-display text-[80px] lg:text-[140px] leading-[0.86]">
              <span className="text-signal">12.4B</span><br />
              EVENTS<br />
              INGESTED<br />
              MONTHLY.
            </h2>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-hairline border border-hairline">
            {[
              ["99.99%", "PLATFORM UPTIME"],
              ["< 800ms", "ALERT-TO-NOTIFY"],
              ["6", "REGIONS"],
              ["240ms", "MEDIAN QUERY"],
            ].map(([v, l]) => (
              <div key={l} className="bg-background p-8">
                <div className="font-display text-[36px]">{v}</div>
                <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20 grid lg:grid-cols-12 gap-10 items-center">
          <h2 className="lg:col-span-8 text-display text-[44px] lg:text-[80px]">
            STOP DEBUGGING<br />IN PRODUCTION.
          </h2>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link to="/dashboard" className="bg-signal text-signal-foreground px-6 py-5 text-[13px] uppercase tracking-wider font-semibold inline-flex items-center justify-between hover:opacity-90">
              Launch Dashboard <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="border border-foreground px-6 py-5 text-[13px] uppercase tracking-wider font-semibold inline-flex items-center justify-between hover:bg-background">
              Sign in <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="docs" className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-6 text-[12px] text-muted-foreground max-w-xs">
              Application performance and crash intelligence for engineering teams who treat reliability as a product.
            </p>
            <div className="mt-6 font-mono text-[11px] text-muted-foreground">© 2026 SYSTEMIQ LABS · BLR / SFO / BER</div>
          </div>
          {[
            { h: "Product", l: ["Dashboard", "Crash Analytics", "Infrastructure", "SQL Insights"] },
            { h: "Resources", l: ["Documentation", "Status", "Changelog", "Security"] },
            { h: "Company", l: ["About", "Customers", "Careers", "Contact"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-eyebrow mb-4">{c.h}</div>
              <ul className="space-y-2 text-[13px]">
                {c.l.map((i) => <li key={i}><a href="#" className="hover:text-signal">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-4 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>SYSTEMIQ / OBSERVABILITY-PLATFORM / v4.8.2</span>
            <span>SOC2 · ISO 27001 · GDPR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
