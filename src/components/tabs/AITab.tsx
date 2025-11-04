import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Zap, Network, ShieldCheck, Activity } from "lucide-react";

export function AITab() {
  const hashStream = [
    "0x4f8a...92c1",
    "0x7b3d...45e9",
    "0x2c9f...18a7",
    "0x9e1b...73d4",
  ];

  const apiStatus = [
    { name: "Salesforce", status: "Connected", latency: "24ms" },
    { name: "HubSpot", status: "Connected", latency: "31ms" },
    { name: "Oracle", status: "Connected", latency: "45ms" },
    { name: "SAP", status: "Degraded", latency: "180ms" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">AI Sentinel & Optimization Center</h1>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-success">AI ACTIVE</span>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Predictive ROI */}
        <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Predictive ROI</h3>
              <p className="text-xs text-muted-foreground">Next 7 Days Forecast</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">+1,247%</div>
              <p className="text-sm text-muted-foreground">Expected Growth</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-bold text-success">94%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[94%] rounded-full bg-success" />
              </div>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
              <p className="text-xs text-muted-foreground">
                AI suggests: <span className="font-semibold text-primary">Increase geo-targeting in Nairobi TI zone</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Data Optimization */}
        <Card className="border-accent/30 bg-gradient-to-br from-card to-accent/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Data Optimization</h3>
              <p className="text-xs text-muted-foreground">Network Performance</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-accent/30 bg-accent/10 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Active Optimization</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Routing via <span className="font-bold text-foreground">Japan node</span> for 23% faster sync
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latency Reduction</span>
                <span className="font-bold text-success">-67ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bandwidth Saved</span>
                <span className="font-bold text-success">840 MB/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost Optimization</span>
                <span className="font-bold text-success">-€18/mo</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Chain Governance */}
        <Card className="border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Network className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Chain Governance</h3>
              <p className="text-xs text-muted-foreground">Load Balancing</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Node 1 (US-East)</span>
                <span className="text-sm font-bold text-foreground">38%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[38%] rounded-full bg-primary" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Node 2 (EU-West)</span>
                <span className="text-sm font-bold text-foreground">45%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[45%] rounded-full bg-accent" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Node 3 (Asia-Pacific)</span>
                <span className="text-sm font-bold text-foreground">17%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[17%] rounded-full bg-warning" />
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full border-primary/50 text-primary hover:bg-primary/10">
              Rebalance Network
            </Button>
          </div>
        </Card>
      </div>

      {/* Smart Contract Advisor */}
      <Card className="border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold text-primary">AI Smart Contract Advisor</h3>
              <p className="text-sm text-muted-foreground">Optimization Recommendations</p>
            </div>
          </div>
          <span className="rounded-full bg-warning/20 px-4 py-1 text-sm font-bold text-warning">
            2 Suggestions
          </span>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Contract Merge Opportunity</h4>
              </div>
              <span className="text-xs font-bold text-success">Save €240/mo</span>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              AI detected that contracts <span className="font-mono text-foreground">0x4f8a...92c1</span> and{" "}
              <span className="font-mono text-foreground">0x7b3d...45e9</span> can be merged to reduce gas fees by 34%.
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-glow">
                Apply Optimization
              </Button>
              <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                Review Details
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                <h4 className="font-semibold text-foreground">Execution Optimization</h4>
              </div>
              <span className="text-xs font-bold text-success">+12% Speed</span>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Switch to batched execution for reward distribution. Estimated improvement: 12% faster processing with 18% lower costs.
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Enable Batching
              </Button>
              <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Hash Stream */}
        <Card className="border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary">Live Hash Stream</h3>
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>
          
          <div className="space-y-2">
            {hashStream.map((hash, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-3 font-mono text-sm"
              >
                <span className="text-foreground">{hash}</span>
                <span className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 60)} sec ago
                </span>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="mt-4 w-full border-primary/50 text-primary hover:bg-primary/10">
            View Full Stream
          </Button>
        </Card>

        {/* API Integration Status */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-primary">API Integration Status</h3>
          
          <div className="space-y-3">
            {apiStatus.map((api) => (
              <div
                key={api.name}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${api.status === "Connected" ? "bg-success" : "bg-warning"}`} />
                  <span className="font-medium text-foreground">{api.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{api.latency}</span>
                  <span className={`text-sm font-medium ${api.status === "Connected" ? "text-success" : "text-warning"}`}>
                    {api.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-4 w-full border-border text-foreground hover:bg-muted">
            Manage Integrations
          </Button>
        </Card>
      </div>
    </div>
  );
}
