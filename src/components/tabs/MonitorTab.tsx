import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

export function MonitorTab() {
  const errorLogs = [
    { time: "16:59:48", message: "Sync valid complete" },
    { time: "14:39:47", message: "Sync status: succeded" },
    { time: "09:18", message: "Block sync delayed" },
  ];

  const detailedLogs = [
    { time: "16:3959", message: "sync valid" },
    { time: "16:29:17", message: "sync status confelete" },
    { time: "16:39:28", message: "low block propagation delay" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">NeoCard™ System Monitor</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* System Status */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-primary">SYSTEM STATUS</h3>
          <div className="space-y-3">
            {[
              { name: "API", status: "Online" },
              { name: "AEI Sentinel", status: "Online" },
              { name: "M-Pesa", status: "Online" },
              { name: "Blockchain", status: "Online" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-foreground">{item.name}</span>
                <span className="font-medium text-success">{item.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="mb-3 text-sm font-semibold text-primary">ERROR LOG</h4>
            <div className="space-y-2">
              {errorLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 text-warning" />
                  <div>
                    <span className="font-mono text-muted-foreground">{log.time}</span>
                    <span className="ml-2 text-foreground">{log.message}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 text-xs text-muted-foreground">
              {detailedLogs.map((log, i) => (
                <div key={i}>
                  <span className="font-mono">{log.time}</span> {log.message}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-primary">AEI SENTINEL</h4>
          </div>
        </Card>

        {/* Server Uptime */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-primary">SERVER UPTIME</h3>
          
          <div className="mb-6 flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  strokeDasharray="251.2"
                  strokeDashoffset="0.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-primary">99.98%</span>
                <span className="text-sm text-muted-foreground">OPERATIONAL</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm font-medium text-foreground">System stable –</p>
            <p className="text-sm text-muted-foreground">all nodes synced</p>
          </div>

          <div className="mt-6">
            <h4 className="mb-4 text-sm font-semibold text-primary">24 h SYSTEM HEALTH</h4>
            
            <div className="space-y-4">
              {[
                { label: "CPU", color: "primary" },
                { label: "API latency", color: "primary" },
                { label: "Blockchain", color: "accent" },
                { label: "Sync", color: "accent" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <div className="relative h-8">
                    <svg className="h-full w-full" viewBox="0 0 200 30">
                      <path
                        d={`M 0 20 Q 20 ${15 + Math.random() * 10} 40 ${15 + Math.random() * 10} T 80 ${
                          15 + Math.random() * 10
                        } T 120 ${15 + Math.random() * 10} T 160 ${15 + Math.random() * 10} T 200 ${
                          15 + Math.random() * 10
                        }`}
                        fill="none"
                        stroke={`hsl(var(--${item.color}))`}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>6</span>
              <span>4</span>
              <span>8h</span>
              <span>24h</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-success">ALL SYSTEMS OPERATIONAL</p>
          </div>
        </Card>

        {/* Auto-Incident Reporter */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-primary">AUTO-INCIDENT REPORTER</h3>
          
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
            <AlertTriangle className="h-8 w-8 text-warning" />
            <div>
              <p className="text-lg font-bold text-warning">2 warnings detected</p>
            </div>
          </div>

          <Button variant="outline" className="mb-6 w-full border-primary text-primary hover:bg-primary/10">
            View Root Cause Report
          </Button>

          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-warning">SPONSORS AFFECTED</h4>
            <div className="space-y-2">
              {["Coca-Cola", "Safaricom", "Equity"].map((sponsor) => (
                <div key={sponsor} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-foreground">{sponsor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-primary">DIAGNOSTIC SCAN SUM</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">API: ok</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">AEI Link: active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">M-Pesa: healthy</span>
              </div>
            </div>
          </div>

          <Button variant="outline" className="mb-4 w-full border-border text-foreground hover:bg-muted">
            REQUEST TECH SUPPORT
          </Button>

          <div className="flex justify-end">
            <Button variant="link" className="text-xs text-muted-foreground">
              EXPORT LOGS
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
