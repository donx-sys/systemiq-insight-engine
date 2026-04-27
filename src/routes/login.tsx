import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SystemIQ" },
      { name: "description", content: "Secure sign in to your SystemIQ observability workspace." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      {/* LEFT — editorial panel */}
      <div className="relative hidden lg:flex flex-col justify-between border-r border-hairline p-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Link to="/" className="relative"><Logo /></Link>
        <div className="relative">
          <div className="text-eyebrow mb-6">§00 · Access Console</div>
          <h2 className="text-display text-[64px] leading-[0.92]">
            OBSERVE.<br />
            DIAGNOSE.<br />
            <span className="text-signal">RESOLVE.</span>
          </h2>
          <p className="mt-8 max-w-md text-[13px] text-muted-foreground">
            Sign in to your SystemIQ workspace to access live telemetry, crash traces, deployments,
            and infrastructure health across every environment.
          </p>
        </div>
        <div className="relative font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex justify-between">
          <span>SOC2 · ISO 27001 · GDPR</span>
          <span>v4.8.2</span>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex flex-col">
        <div className="lg:hidden p-6 border-b border-hairline"><Link to="/"><Logo /></Link></div>
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <form onSubmit={submit} className="w-full max-w-md">
            <div className="text-eyebrow mb-3">Identity verification</div>
            <h1 className="text-display text-[44px] mb-10">SIGN IN.</h1>

            <label className="block">
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Email address</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@company.io"
                className="w-full bg-transparent border-b-2 border-foreground py-3 text-[15px] outline-none focus:border-signal transition-colors"
              />
            </label>

            <label className="block mt-8">
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 flex justify-between">
                <span>Password</span>
                <a href="#" className="hover:text-signal">Forgot?</a>
              </div>
              <input
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-transparent border-b-2 border-foreground py-3 text-[15px] outline-none focus:border-signal transition-colors tracking-widest"
              />
            </label>

            <button type="submit" className="mt-10 w-full bg-foreground text-background py-4 text-[13px] uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-3 hover:bg-signal hover:text-signal-foreground transition-colors">
              Sign In <ArrowRight className="h-4 w-4" />
            </button>

            <button type="button" onClick={() => nav({ to: "/dashboard" })} className="mt-3 w-full border border-foreground py-4 text-[13px] uppercase tracking-wider font-semibold hover:bg-surface transition-colors">
              Demo Login
            </button>

            <div className="mt-10 pt-6 border-t border-hairline text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex justify-between">
              <span>SSO · SAML · OAuth</span>
              <span>SECURE · TLS 1.3</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
