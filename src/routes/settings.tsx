import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, Panel } from "@/components/AppLayout";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — SystemIQ" }] }),
  component: Settings,
});

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 border ${checked ? "border-signal bg-signal" : "border-hairline bg-surface-2"} transition-colors`}
    >
      <span className={`absolute top-0.5 h-4 w-4 bg-background transition-transform ${checked ? "translate-x-6" : "translate-x-0.5"}`} />
    </button>
  );
}

const team = [
  { name: "Aarav Kapoor", role: "Admin · SRE", email: "a.kapoor@systemiq.io" },
  { name: "Mei Tanaka", role: "Engineer", email: "m.tanaka@systemiq.io" },
  { name: "Sofia Oliveira", role: "Platform Lead", email: "s.oliveira@systemiq.io" },
  { name: "Jonas Weber", role: "DevOps", email: "j.weber@systemiq.io" },
];

function Settings() {
  const [dark, setDark] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [push, setPush] = useState(false);
  const [slack, setSlack] = useState(true);
  const [env, setEnv] = useState("Production");

  function applyTheme(d: boolean) {
    setDark(d);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light", !d);
    }
  }

  return (
    <AppLayout>
      <PageHeader
        eyebrow="§11 · Workspace"
        title="SETTINGS."
        subtitle="Theme, notifications, environment preferences and team members."
      />
      <div className="px-6 lg:px-10 py-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <Panel code="/SET.01" title="Appearance">
            <div className="p-5 flex items-center justify-between">
              <div>
                <div className="font-display text-[20px]">Dark theme</div>
                <div className="text-[12px] text-muted-foreground mt-1">Editorial dark mode is recommended for control rooms.</div>
              </div>
              <Toggle checked={dark} onChange={applyTheme} />
            </div>
          </Panel>

          <Panel code="/SET.02" title="Notifications">
            {[
              { l: "Email alerts", v: emailAlerts, set: setEmailAlerts, d: "Critical and high-severity events are emailed to your inbox." },
              { l: "Push notifications", v: push, set: setPush, d: "Browser push for incidents assigned to you." },
              { l: "Slack integration", v: slack, set: setSlack, d: "Forward critical alerts to #sre-ops." },
            ].map((row) => (
              <div key={row.l} className="p-5 flex items-center justify-between border-t first:border-t-0 border-hairline">
                <div>
                  <div className="font-display text-[18px]">{row.l}</div>
                  <div className="text-[12px] text-muted-foreground mt-1">{row.d}</div>
                </div>
                <Toggle checked={row.v} onChange={row.set} />
              </div>
            ))}
          </Panel>

          <Panel code="/SET.03" title="Environment Preferences">
            <div className="p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Default environment</div>
              <div className="flex gap-px bg-hairline border border-hairline w-fit">
                {["Production", "Staging", "Dev"].map((e) => (
                  <button
                    key={e}
                    onClick={() => setEnv(e)}
                    className={`px-4 py-2 text-[11px] font-mono uppercase tracking-wider ${env === e ? "bg-foreground text-background" : "bg-background hover:bg-surface"}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <Panel code="/SET.04" title="Team Members">
            <ul>
              {team.map((m) => (
                <li key={m.email} className="px-5 py-4 border-t first:border-t-0 border-hairline flex items-center gap-3">
                  <div className="h-9 w-9 bg-foreground text-background grid place-items-center font-display text-[13px] font-bold">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium truncate">{m.name}</div>
                    <div className="font-mono text-[11px] text-muted-foreground truncate">{m.email}</div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider border border-hairline px-2 py-1">{m.role}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline p-4">
              <button className="w-full bg-foreground text-background py-2.5 text-[12px] uppercase tracking-wider hover:bg-signal hover:text-signal-foreground">
                Invite member
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </AppLayout>
  );
}
