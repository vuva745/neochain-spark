import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export function RewardsTab() {
  const rewards = [
    { id: "RW-2401", amount: "€ 50", recipient: "+254722...30", status: "Completed", date: "23 Oct 2025", mpesaRef: "RKJ8X2M4PQ" },
    { id: "RW-2402", amount: "€ 25", recipient: "+254705...15", status: "Completed", date: "23 Oct 2025", mpesaRef: "RKJ8X2M4PR" },
    { id: "RW-2403", amount: "€ 100", recipient: "+254710...90", status: "Processing", date: "23 Oct 2025", mpesaRef: "Pending" },
    { id: "RW-2404", amount: "€ 15", recipient: "+254704...12", status: "Completed", date: "22 Oct 2025", mpesaRef: "RKJ8X2M4PS" },
    { id: "RW-2405", amount: "€ 75", recipient: "+254722...45", status: "Failed", date: "22 Oct 2025", mpesaRef: "Error" },
  ];

  const stats = [
    { label: "Total Distributed", value: "€ 12,450", change: "+€ 890 today" },
    { label: "Rewards Sent", value: "523", change: "+38 today" },
    { label: "Success Rate", value: "98.2%", change: "+0.5% this week" },
    { label: "Avg. Payout Time", value: "2.3 sec", change: "Real-time" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Reward & M-Pesa Distribution</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-glow">
          Process New Reward
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card p-6">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-success">{stat.change}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* M-Pesa Integration Status */}
      <Card className="border-primary/30 bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">M-Pesa API Status</h3>
              <p className="text-sm text-muted-foreground">Connected • Last sync: 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">LIVE</span>
          </div>
        </div>
      </Card>

      {/* Recent Rewards */}
      <Card className="border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-primary">Recent Reward Transactions</h3>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
            Export All
          </Button>
        </div>

        <div className="space-y-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-muted-foreground">{reward.id}</span>
                  <span className="text-2xl font-bold text-primary">{reward.amount}</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-mono text-sm text-foreground">{reward.recipient}</p>
                  <p className="text-xs text-muted-foreground">M-Pesa: {reward.mpesaRef}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{reward.date}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {reward.status === "Completed" && (
                      <>
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">{reward.status}</span>
                      </>
                    )}
                    {reward.status === "Processing" && (
                      <>
                        <Clock className="h-4 w-4 text-warning" />
                        <span className="text-sm font-medium text-warning">{reward.status}</span>
                      </>
                    )}
                    {reward.status === "Failed" && (
                      <>
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">{reward.status}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Auto-Processing Rules */}
      <Card className="border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Auto-Processing Configuration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4">
            <div>
              <p className="font-medium text-foreground">Winner Detection</p>
              <p className="text-sm text-muted-foreground">Automatically process rewards when winners are detected</p>
            </div>
            <span className="rounded-full bg-success/20 px-3 py-1 text-sm font-medium text-success">ENABLED</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4">
            <div>
              <p className="font-medium text-foreground">M-Pesa Direct Transfer</p>
              <p className="text-sm text-muted-foreground">Send rewards directly to user's M-Pesa account</p>
            </div>
            <span className="rounded-full bg-success/20 px-3 py-1 text-sm font-medium text-success">ENABLED</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4">
            <div>
              <p className="font-medium text-foreground">Retry Failed Transactions</p>
              <p className="text-sm text-muted-foreground">Automatically retry failed M-Pesa transactions (max 3 attempts)</p>
            </div>
            <span className="rounded-full bg-success/20 px-3 py-1 text-sm font-medium text-success">ENABLED</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
