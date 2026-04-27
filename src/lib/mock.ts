// Deterministic mock data for SystemIQ.

export const ENV_OPTIONS = ["Production", "Staging", "Dev"] as const;

export const kpis = [
  { label: "TOTAL APPLICATIONS", value: "12", delta: "+2", trend: "up" },
  { label: "ACTIVE USERS", value: "18,420", delta: "+4.8%", trend: "up" },
  { label: "SESSIONS TODAY", value: "52,310", delta: "+12.1%", trend: "up" },
  { label: "CRASH EVENTS", value: "17", delta: "-3", trend: "down" },
  { label: "AVG API LATENCY", value: "184", unit: "ms", delta: "-6 ms", trend: "down" },
  { label: "ALERTS TRIGGERED", value: "5", delta: "+1", trend: "up" },
  { label: "CPU LOAD", value: "73", unit: "%", delta: "+4%", trend: "up" },
  { label: "PROD VERSION", value: "v4.8.2", delta: "stable", trend: "flat" },
];

export const sessionsTrend = [
  { d: "Apr 22", v: 41200 }, { d: "Apr 23", v: 43880 }, { d: "Apr 24", v: 39410 },
  { d: "Apr 25", v: 47210 }, { d: "Apr 26", v: 51020 }, { d: "Apr 27", v: 49810 },
  { d: "Apr 28", v: 52310 },
];

export const crashTrend = [
  { d: "Apr 22", v: 14 }, { d: "Apr 23", v: 22 }, { d: "Apr 24", v: 9 },
  { d: "Apr 25", v: 31 }, { d: "Apr 26", v: 18 }, { d: "Apr 27", v: 25 },
  { d: "Apr 28", v: 17 },
];

export const latencyTrend = Array.from({ length: 24 }, (_, i) => ({
  t: `${String(i).padStart(2, "0")}:00`,
  v: 120 + Math.round(60 * Math.sin(i / 3) + (i % 5) * 8 + 40),
}));

export const cpuMemTrend = Array.from({ length: 24 }, (_, i) => ({
  t: `${String(i).padStart(2, "0")}:00`,
  cpu: 45 + Math.round(20 * Math.sin(i / 4) + (i % 3) * 5),
  mem: 55 + Math.round(15 * Math.cos(i / 5) + (i % 4) * 4),
}));

export const severityDist = [
  { name: "CRITICAL", value: 7, color: "var(--color-signal)" },
  { name: "HIGH", value: 22, color: "oklch(0.75 0.18 50)" },
  { name: "MEDIUM", value: 41, color: "oklch(0.82 0.17 80)" },
  { name: "LOW", value: 64, color: "oklch(0.55 0.04 270)" },
];

export const liveFeed = [
  { t: "09:44:12", tag: "SESSION", msg: "User session started — Mumbai, IN — iOS 17.4 / Safari", level: "info" },
  { t: "09:43:58", tag: "ALERT", msg: "CPU > 85% on host-prod-03 (us-east-1)", level: "warn" },
  { t: "09:43:31", tag: "DEPLOY", msg: "Deployment v4.8.2 → production completed in 2m 14s", level: "ok" },
  { t: "09:42:50", tag: "CRASH", msg: "NullPointerException · checkout-svc · build 4.8.2.318", level: "crit" },
  { t: "09:42:11", tag: "API", msg: "POST /checkout p95 latency spike 412ms (Δ +180%)", level: "warn" },
  { t: "09:41:02", tag: "SESSION", msg: "User session started — Frankfurt, DE — Android 14 / Chrome", level: "info" },
  { t: "09:40:14", tag: "INFRA", msg: "container-payment-03 restarted (OOMKilled)", level: "crit" },
  { t: "09:39:48", tag: "ALERT", msg: "Crash surge detected — checkout-svc — 12 events / 60s", level: "crit" },
  { t: "09:39:01", tag: "SESSION", msg: "User session started — Singapore, SG — macOS 14 / Chrome", level: "info" },
];

export const applications = [
  { name: "E-Commerce Platform", team: "Storefront", version: "v4.8.2", env: "Production", status: "Healthy", deployed: "Apr 28, 09:43", uptime: "99.98%" },
  { name: "Mobile Banking App", team: "Fintech Core", version: "v2.14.0", env: "Production", status: "Degraded", deployed: "Apr 27, 18:12", uptime: "99.71%" },
  { name: "Delivery Engine", team: "Logistics", version: "v1.6.3", env: "Production", status: "Healthy", deployed: "Apr 26, 11:02", uptime: "99.95%" },
  { name: "Admin Portal", team: "Internal Tools", version: "v3.2.0", env: "Staging", status: "Healthy", deployed: "Apr 28, 07:30", uptime: "99.99%" },
  { name: "Search Service", team: "Discovery", version: "v0.9.4", env: "Production", status: "Healthy", deployed: "Apr 25, 14:51", uptime: "99.92%" },
  { name: "Payments Gateway", team: "Payments", version: "v5.1.7", env: "Production", status: "Critical", deployed: "Apr 28, 02:11", uptime: "98.40%" },
];

export const sessions = [
  { id: "ses_8K2pQv", device: "iPhone 15 Pro", os: "iOS 17.4", browser: "Safari", country: "India",   dur: "12m 41s", net: "5G",   start: "09:42:11" },
  { id: "ses_2Lm9aR", device: "Pixel 8",       os: "Android 14", browser: "Chrome", country: "Germany", dur: "04m 18s", net: "WiFi", start: "09:41:02" },
  { id: "ses_7XnCs1", device: "MacBook Pro",   os: "macOS 14",   browser: "Chrome", country: "Singapore", dur: "27m 03s", net: "WiFi", start: "09:39:01" },
  { id: "ses_4Rf0Yh", device: "Galaxy S24",    os: "Android 14", browser: "Samsung Internet", country: "USA", dur: "01m 52s", net: "4G", start: "09:37:44" },
  { id: "ses_9Wq3Tb", device: "Surface Pro",   os: "Windows 11", browser: "Edge", country: "UK", dur: "08m 09s", net: "WiFi", start: "09:36:21" },
  { id: "ses_5Vc1Px", device: "iPad Air",      os: "iPadOS 17",  browser: "Safari", country: "Japan", dur: "15m 55s", net: "WiFi", start: "09:35:10" },
  { id: "ses_3Nd7Uq", device: "ThinkPad X1",   os: "Ubuntu 22",  browser: "Firefox", country: "Brazil", dur: "33m 12s", net: "WiFi", start: "09:34:02" },
  { id: "ses_6Hb8Lz", device: "iPhone 14",     os: "iOS 17.3",   browser: "Safari", country: "France", dur: "02m 38s", net: "5G", start: "09:32:48" },
];

export const apiEndpoints = [
  { ep: "/login",     method: "POST", calls: 184_220, success: 99.7, avg: 92,  p95: 188, err: 0.3 },
  { ep: "/checkout",  method: "POST", calls:  52_104, success: 96.1, avg: 312, p95: 814, err: 3.9 },
  { ep: "/products",  method: "GET",  calls: 921_055, success: 99.9, avg: 64,  p95: 142, err: 0.1 },
  { ep: "/search",    method: "GET",  calls: 410_833, success: 99.4, avg: 138, p95: 322, err: 0.6 },
  { ep: "/payment",   method: "POST", calls:  31_402, success: 94.2, avg: 488, p95: 1240, err: 5.8 },
  { ep: "/users/me",  method: "GET",  calls: 612_119, success: 99.8, avg: 41,  p95: 96,  err: 0.2 },
];

export const crashes = [
  { id: "ERR-9F31AC", type: "NullPointerException",     severity: "CRITICAL", version: "v4.8.2", host: "host-prod-03", container: "container-checkout-01", session: "ses_8K2pQv", time: "09:42:50" },
  { id: "ERR-7B22D1", type: "DatabaseConnectionError",  severity: "HIGH",     version: "v4.8.2", host: "host-prod-01", container: "container-api-02",      session: "ses_2Lm9aR", time: "09:38:11" },
  { id: "ERR-4A19E0", type: "MemoryLeakDetected",       severity: "HIGH",     version: "v4.8.1", host: "host-prod-04", container: "container-payment-03",  session: "ses_4Rf0Yh", time: "09:30:02" },
  { id: "ERR-2C70F8", type: "TimeoutException",         severity: "MEDIUM",   version: "v4.8.2", host: "host-prod-02", container: "container-search-01",   session: "ses_5Vc1Px", time: "09:21:58" },
  { id: "ERR-1E03B4", type: "PaymentGatewayFailure",    severity: "CRITICAL", version: "v5.1.7", host: "host-prod-05", container: "container-payment-03",  session: "ses_3Nd7Uq", time: "09:18:33" },
  { id: "ERR-8D44C9", type: "NullPointerException",     severity: "MEDIUM",   version: "v4.8.2", host: "host-prod-03", container: "container-checkout-01", session: "ses_6Hb8Lz", time: "09:11:09" },
  { id: "ERR-3F12A7", type: "TimeoutException",         severity: "LOW",      version: "v4.8.0", host: "host-stage-01", container: "container-auth-01",     session: "ses_9Wq3Tb", time: "09:02:41" },
];

export const stackTrace = `java.lang.NullPointerException: Cannot read field "userId" because "session" is null
  at com.systemiq.checkout.CheckoutService.process(CheckoutService.java:182)
  at com.systemiq.checkout.CheckoutController.submit(CheckoutController.java:64)
  at jdk.internal.reflect.GeneratedMethodAccessor42.invoke(Unknown Source)
  at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
  at java.lang.reflect.Method.invoke(Method.java:568)
  at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:207)
  at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:152)
  at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:914)`;

export const hosts = [
  { name: "host-prod-01", ip: "10.0.12.41", region: "Mumbai",     cpu: 62, mem: 71, disk: 48, status: "OK" },
  { name: "host-prod-02", ip: "10.0.12.42", region: "Singapore",  cpu: 78, mem: 64, disk: 55, status: "OK" },
  { name: "host-prod-03", ip: "10.0.12.43", region: "Frankfurt",  cpu: 91, mem: 83, disk: 61, status: "WARN" },
  { name: "host-prod-04", ip: "10.0.12.44", region: "Virginia",   cpu: 44, mem: 52, disk: 39, status: "OK" },
  { name: "host-prod-05", ip: "10.0.12.45", region: "Virginia",   cpu: 88, mem: 79, disk: 72, status: "CRIT" },
  { name: "host-stage-01",ip: "10.0.20.11", region: "Mumbai",     cpu: 22, mem: 31, disk: 18, status: "OK" },
];

export const containers = [
  { name: "container-auth-01",     image: "auth-svc:4.2.1",    host: "host-prod-01", cpu: 18, mem: 412, status: "Running" },
  { name: "container-api-02",      image: "api-gateway:4.8.2", host: "host-prod-02", cpu: 44, mem: 921, status: "Running" },
  { name: "container-payment-03",  image: "payments:5.1.7",    host: "host-prod-05", cpu: 71, mem: 1488, status: "Restarting" },
  { name: "container-checkout-01", image: "checkout:4.8.2",    host: "host-prod-03", cpu: 88, mem: 1320, status: "Degraded" },
  { name: "container-search-01",   image: "search:0.9.4",      host: "host-prod-04", cpu: 31, mem: 642, status: "Running" },
];

export const alertRules = [
  { name: "High CPU Usage",   condition: "cpu_percent > 85",         severity: "HIGH",     count: 3 },
  { name: "Low Memory Alert", condition: "memory_available < 1000MB", severity: "MEDIUM",   count: 1 },
  { name: "High Crash Rate",  condition: "critical_crashes/hour > 10", severity: "CRITICAL", count: 1 },
  { name: "API Latency P95",  condition: "p95_latency_ms > 800",     severity: "HIGH",     count: 2 },
];

export const alertTimeline = [
  { time: "09:44", text: "CPU alert on host-prod-03 — 91% sustained 5m", level: "warn" },
  { time: "09:18", text: "Payment latency p95 spike — 1240ms on /payment", level: "crit" },
  { time: "08:51", text: "Crash surge detected — checkout-svc — 12 events / 60s", level: "crit" },
  { time: "08:12", text: "Memory low — container-payment-03 — 412MB free", level: "warn" },
  { time: "07:30", text: "Deployment v4.8.2 finished — production", level: "ok" },
];

export const deployments = [
  { v: "v4.8.2", env: "Production", by: "a.kapoor",    time: "Apr 28, 09:43", status: "SUCCESS" },
  { v: "v4.8.2", env: "Staging",    by: "ci-runner",   time: "Apr 28, 06:18", status: "SUCCESS" },
  { v: "v4.8.1", env: "Production", by: "m.tanaka",    time: "Apr 27, 18:12", status: "SUCCESS" },
  { v: "v4.8.0", env: "Staging",    by: "ci-runner",   time: "Apr 26, 22:04", status: "FAILED" },
  { v: "v4.7.9", env: "Production", by: "s.oliveira",  time: "Apr 25, 11:48", status: "SUCCESS" },
  { v: "v4.7.8", env: "Production", by: "rollback-bot",time: "Apr 24, 14:22", status: "ROLLBACK" },
];

export const sqlQueries = [
  {
    title: "Average latency per endpoint",
    sql: `SELECT endpoint, AVG(latency_ms) AS avg_latency
FROM api_call
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY endpoint
ORDER BY avg_latency DESC;`,
    rows: [
      ["/payment", "488 ms"], ["/checkout", "312 ms"],
      ["/search", "138 ms"], ["/login", "92 ms"], ["/products", "64 ms"],
    ],
    cols: ["endpoint", "avg_latency"],
  },
  {
    title: "Error count by severity",
    sql: `SELECT severity, COUNT(*) AS events
FROM error_event
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY severity;`,
    rows: [["CRITICAL", "7"], ["HIGH", "22"], ["MEDIUM", "41"], ["LOW", "64"]],
    cols: ["severity", "events"],
  },
  {
    title: "Top crashing hosts",
    sql: `SELECT host_id, COUNT(*) AS events
FROM error_event
GROUP BY host_id
ORDER BY events DESC
LIMIT 5;`,
    rows: [
      ["host-prod-05", "31"], ["host-prod-03", "24"],
      ["host-prod-01", "11"], ["host-prod-02", "8"], ["host-prod-04", "4"],
    ],
    cols: ["host_id", "events"],
  },
  {
    title: "Active deployments",
    sql: `SELECT version, environment, deployed_by, deployed_at
FROM deployment
WHERE status = 'ACTIVE';`,
    rows: [
      ["v4.8.2", "Production", "a.kapoor", "Apr 28 09:43"],
      ["v3.2.0", "Staging",    "ci-runner", "Apr 28 07:30"],
    ],
    cols: ["version", "environment", "deployed_by", "deployed_at"],
  },
];

export const reports = [
  { title: "Daily Health Report",        period: "Apr 28, 2026",      size: "2.1 MB", fmt: "PDF" },
  { title: "Weekly Crash Summary",       period: "Apr 22 — Apr 28",   size: "4.8 MB", fmt: "PDF" },
  { title: "Monthly Performance Review", period: "Apr 2026",          size: "12.3 MB", fmt: "PDF" },
  { title: "SLA Report",                 period: "Q2 2026 (in progress)", size: "1.4 MB", fmt: "CSV" },
];
