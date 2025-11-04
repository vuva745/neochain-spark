import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, CheckCircle2, TrendingUp } from "lucide-react";

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Top Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Profile</span>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">Neo User</p>
              <p className="text-sm text-muted-foreground">Email: user@neo.app</p>
              <p className="text-sm text-muted-foreground">Visitor: Cürtınum · Since 225</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">My Campaign</span>
              <span className="text-xs font-semibold text-success">Active</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Campaign ID</p>
              <p className="text-lg font-bold text-foreground">#82 BAC512</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-3">
            <span className="text-sm font-medium text-muted-foreground">ROI Snapshot</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">+983%</span>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Active Sponsor</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-primary/30 bg-card p-4">
                <p className="text-xl font-bold text-primary">Coca-Cola</p>
                <p className="text-sm text-muted-foreground">Card Flight Promo</p>
                <Button variant="outline" size="sm" className="mt-2 border-primary/50 text-primary hover:bg-primary/10">
                  View Full Card
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Play className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">2512</p>
              <p className="text-sm text-muted-foreground">Watch Views</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">6010</p>
              <p className="text-sm text-muted-foreground">Card Scans</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">907</p>
              <p className="text-sm text-muted-foreground">AR Conversions</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">Block Hour Progress (Scans vs. Goal)</span>
            <span className="text-2xl font-bold text-primary">68%</span>
          </div>
          <Progress value={68} className="h-3" />
          <p className="text-xs text-muted-foreground">AE Hash</p>
        </div>
      </Card>

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Auditic & Privacy</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• En-to-end encryption (AES)</li>
            <li>• Verified</li>
          </ul>
        </Card>

        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Notifications</span>
              <span className="text-sm font-medium text-success">ON</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Dark Mode</span>
              <span className="text-sm font-medium text-success">ON</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Linked Wallet</span>
              <span className="text-sm font-medium text-foreground">M-Pesa · 245</span>
            </div>
            <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Save Change
            </Button>
          </div>
        </Card>
      </div>

      {/* AR Offers */}
      <Card className="border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">AR Offer & Boost</h3>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">AR Pizza Flight Promo</span>
          <div className="h-12 w-12 rounded border border-border bg-muted" />
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground">
        NEOCARD · GLOBAL FOMO NETWORK · LIVE REACHTALES / T/MR
      </div>
    </div>
  );
}
