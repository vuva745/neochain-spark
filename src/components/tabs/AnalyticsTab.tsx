import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Flame, Zap } from "lucide-react";

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">TOTAL SCANS</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">10,284</span>
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success">+18%</span>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">AEI VERIFIED</span>
            <div>
              <span className="text-4xl font-bold text-primary">10,002</span>
              <p className="text-sm text-muted-foreground">Proof on chain</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Avg Value per Scan</span>
            <div>
              <span className="text-4xl font-bold text-primary">€ 75,20</span>
              <p className="text-sm text-muted-foreground">AEI-audited</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Active FMOKs</span>
            <div>
              <span className="text-4xl font-bold text-primary">28</span>
              <p className="text-sm text-muted-foreground">Drone AR synced</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Engagement Heat Cycle */}
      <Card className="border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">ENGAGEMENT HEAT CYCLE (WEEKLY PULSE)</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">PIZZA NIGHT</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">COFFEE BOOST</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">KIDS PARADE</span>
            </div>
          </div>
        </div>
        
        {/* Bar Chart Visualization */}
        <div className="flex h-48 items-end justify-between gap-4">
          {[
            { day: "Mon", height: 35 },
            { day: "Tue", height: 55 },
            { day: "Wed", height: 45 },
            { day: "Thu", height: 75 },
            { day: "Sat", height: 50 },
            { day: "Sun", height: 70 },
            { day: "Aug", height: 40 },
            { day: "Aug", height: 30 },
          ].map((bar, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-accent transition-all hover:bg-accent-glow"
                style={{ height: `${bar.height}%` }}
              />
              {i === 3 && <Flame className="h-4 w-4 text-warning" />}
              <span className="text-xs text-muted-foreground">{bar.day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* ROI Section and Map */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* FOMO Level Meter */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-6 text-lg font-semibold text-primary">FOMO LEVEL METER—</h3>
          <div className="relative aspect-video rounded-lg bg-muted/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="flex justify-around">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="mt-2 text-xs text-muted-foreground">KENYA</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="mt-2 text-xs text-muted-foreground">USA</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="mt-2 text-xs text-muted-foreground">JAPAN</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="mt-2 text-xs text-muted-foreground">US</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ROI & FOMO SYNC */}
        <Card className="border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">LIVE CAMPAIGN ALERT</h3>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-2 text-sm text-muted-foreground">ROI</div>
              <div className="relative mx-auto h-32 w-32">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">ROI</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Breakdown</span>
                <span className="text-2xl font-bold text-primary">342%</span>
              </div>
              <p className="text-xs text-muted-foreground">AEI VERIFIED</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">ROI Source Breakdown</p>
              <div className="flex justify-between text-xl font-bold">
                <span className="text-primary">70%</span>
                <span className="text-warning">20%</span>
                <span className="text-muted-foreground">10%</span>
              </div>
              <p className="text-xs text-muted-foreground">ROI SOURCE BY 4 + 70% - 10ʔ</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          EXPORT DATA
        </Button>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          LIVE ALERT
        </Button>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          VIEW AEI HASH
        </Button>
      </div>

      {/* Footer */}
      <div className="rounded-lg border border-primary/30 bg-card p-4 text-center">
        <p className="text-sm text-muted-foreground">
          All data AEI-secured · Blockchain-verified · Audit-ready · Kardiverse NeoCard Sysm 4
        </p>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground hover:bg-primary-glow">
          EXPORT PROOF
        </Button>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        NEOCARD GLOBAL FOMO NETWORK · LIVE REACHTALES / · TIMAR
      </div>
    </div>
  );
}
