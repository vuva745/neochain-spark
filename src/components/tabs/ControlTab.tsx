import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Users, Monitor } from "lucide-react";

export function ControlTab() {
  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Card className="border-warning bg-warning/10 p-4">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-warning" />
          <span className="text-lg font-semibold text-warning">
            New Winner Detected – Reward Auto-Processing...
          </span>
        </div>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Scans</span>
            <div className="text-4xl font-bold text-foreground">8,721</div>
            <div className="h-1 w-full rounded-full bg-primary/30">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Rewards Sent</span>
            <div className="text-4xl font-bold text-primary">383</div>
            <div className="h-1 w-full rounded-full bg-primary/30">
              <div className="h-full w-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">AR Activations</span>
            <div className="text-4xl font-bold text-accent">482</div>
            <div className="h-1 w-full rounded-full bg-accent/30">
              <div className="h-full w-2/3 rounded-full bg-accent" />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">M-Pesa</span>
            <div className="text-4xl font-bold text-warning">257</div>
            <div className="h-1 w-full rounded-full bg-warning/30">
              <div className="h-full w-1/3 rounded-full bg-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: NeoCard Display */}
        <Card className="border-primary/30 bg-card p-6">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-muted/20 to-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <span className="text-xl font-bold text-primary">K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-success px-2 py-1 text-xs text-success-foreground">
                    AEI
                  </div>
                  <span className="text-sm font-bold text-primary">Coca-Cola</span>
                </div>
              </div>

              <div className="mb-6 text-center">
                <h2 className="mb-2 text-3xl font-bold text-primary">NEOCARD</h2>
                <p className="text-sm text-muted-foreground">SPONSOR EDITION</p>
              </div>

              <div className="mb-6 flex justify-center">
                <div className="h-32 w-32 rounded-full border-4 border-primary/30 bg-muted/20" />
              </div>

              <div className="space-y-2 text-center">
                <p className="text-xl font-bold text-foreground">JOHN DOE</p>
                <p className="text-sm text-muted-foreground">Born: 15-02-1988</p>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <span className="text-sm text-muted-foreground">UID:</span>
                  <span className="font-mono text-sm font-semibold text-foreground">SP-00X23-KV</span>
                </div>
              </div>

              <Button className="mt-6 w-full border-primary bg-transparent text-primary hover:bg-primary/10">
                UPLOAD LOGO
              </Button>
            </div>
          </div>
        </Card>

        {/* Right: Geo & Device Monitor */}
        <div className="space-y-6">
          {/* Geo-Zone Map */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Geo-Zone Map & Heat Tracker</h3>
            <div className="aspect-video rounded-lg bg-muted/20 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <span className="font-medium text-foreground">NAROBI TI</span>
                  <span className="text-sm text-muted-foreground">BUS ZONE 2</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <span className="font-medium text-foreground">KIDS PARADE ARENA</span>
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </Card>

          {/* Crew & Device Monitor */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Crew & Device Monitor</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-success">100 OK</p>
                    <p className="text-sm text-muted-foreground">Crew Status</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-success">OK</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">110 ACTIVE</p>
                    <p className="text-sm text-muted-foreground">Devices</p>
                  </div>
                </div>
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              </div>
            </div>
          </Card>

          {/* Export Section */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Export Proof CSV</h3>
            <div className="space-y-3">
              <p className="font-mono text-sm text-muted-foreground">
                AEI-YMash 4DM$7VMEIK | WG
              </p>
              <p className="text-sm text-muted-foreground">
                Proof Capture Link: a1fbaeth4AEQC2W1Eva
              </p>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-glow">
                EXPORT PROOF CSV
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Last Sync: 20 Oct 2025 • NOC Verified</span>
      </div>
    </div>
  );
}
