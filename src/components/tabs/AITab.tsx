import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, TrendingUp, Zap, Network, ShieldCheck, Activity, Loader2, CheckCircle, Info, ExternalLink, AlertTriangle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AITab() {
  const { toast } = useToast();
  const [showRebalanceDialog, setShowRebalanceDialog] = useState(false);
  const [showReviewDetailsDialog, setShowReviewDetailsDialog] = useState(false);
  const [showLearnMoreDialog, setShowLearnMoreDialog] = useState(false);
  const [showFullStreamDialog, setShowFullStreamDialog] = useState(false);
  const [showManageIntegrationsDialog, setShowManageIntegrationsDialog] = useState(false);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [isEnablingBatching, setIsEnablingBatching] = useState(false);
  const [batchingEnabled, setBatchingEnabled] = useState(false);
  const [isApplyingOptimization, setIsApplyingOptimization] = useState(false);
  const [optimizationApplied, setOptimizationApplied] = useState(false);
  const [showApplyOptimizationDialog, setShowApplyOptimizationDialog] = useState(false);
  const [fullStreamScrollRef, setFullStreamScrollRef] = useState<HTMLDivElement | null>(null);
  const [applyOptimizationScrollRef, setApplyOptimizationScrollRef] = useState<HTMLDivElement | null>(null);
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
    <div className="h-full overflow-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">AI Sentinel & Optimization Center</h1>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-success">AI ACTIVE</span>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* Predictive ROI */}
        <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5 p-4">
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
        <Card className="border-warning/30 bg-gradient-to-br from-card to-warning/5 p-6 golden-border-glow golden-bg-glow">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/20 golden-glow">
              <Zap className="h-6 w-6 text-warning golden-icon-glow" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Data Optimization</h3>
              <p className="text-xs text-muted-foreground">Network Performance</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-warning/30 bg-warning/10 p-4 golden-border-glow golden-bg-glow">
              <div className="mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-warning golden-icon-glow" />
                <span className="text-sm font-semibold text-warning golden-text-glow">Active Optimization</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Routing via <span className="font-bold text-foreground">Japan node</span> for 23% faster sync
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latency Reduction</span>
                <span className="font-bold text-warning golden-text-glow">-67ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bandwidth Saved</span>
                <span className="font-bold text-warning golden-text-glow">840 MB/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost Optimization</span>
                <span className="font-bold text-warning golden-text-glow">-€18/mo</span>
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
                <div className="h-full w-[17%] rounded-full bg-warning golden-glow" />
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => setShowRebalanceDialog(true)}
            >
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
          <span className="rounded-full bg-warning/20 px-4 py-1 text-sm font-bold text-warning golden-text-glow golden-glow">
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
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary-glow"
                onClick={() => setShowApplyOptimizationDialog(true)}
                disabled={isApplyingOptimization || optimizationApplied}
              >
                {isApplyingOptimization ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : optimizationApplied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Applied
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Apply Optimization
                  </>
                )}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-border text-foreground hover:bg-muted"
                onClick={() => setShowReviewDetailsDialog(true)}
              >
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
              <Button 
                size="sm" 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={async () => {
                  if (batchingEnabled) {
                    toast({
                      title: "Batching Already Enabled",
                      description: "Batched execution is already active.",
                    });
                    return;
                  }
                  setIsEnablingBatching(true);
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  setIsEnablingBatching(false);
                  setBatchingEnabled(true);
                  toast({
                    title: "Batching Enabled",
                    description: "Batched execution has been successfully enabled. Processing is now 12% faster with 18% lower costs.",
                  });
                }}
                disabled={isEnablingBatching || batchingEnabled}
              >
                {isEnablingBatching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enabling...
                  </>
                ) : batchingEnabled ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Enabled
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Enable Batching
                  </>
                )}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-border text-foreground hover:bg-muted"
                onClick={() => setShowLearnMoreDialog(true)}
              >
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
          
          <Button 
            variant="outline" 
            className="mt-4 w-full border-primary/50 text-primary hover:bg-primary/10"
            onClick={() => setShowFullStreamDialog(true)}
          >
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

          <Button 
            variant="outline" 
            className="mt-4 w-full border-border text-foreground hover:bg-muted"
            onClick={() => setShowManageIntegrationsDialog(true)}
          >
            Manage Integrations
          </Button>
        </Card>
      </div>

      {/* Rebalance Network Dialog */}
      <Dialog open={showRebalanceDialog} onOpenChange={setShowRebalanceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Rebalance Network
            </DialogTitle>
            <DialogDescription>
              Optimize network load distribution across nodes
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Current Distribution</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Node 1 (US-East)</span>
                  <span className="font-bold text-foreground">38%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Node 2 (EU-West)</span>
                  <span className="font-bold text-foreground">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Node 3 (Asia-Pacific)</span>
                  <span className="font-bold text-foreground">17%</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 golden-border-glow golden-bg-glow">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-warning golden-icon-glow" />
                <span className="text-sm font-semibold text-foreground">Optimization Potential</span>
              </div>
              <p className="text-2xl font-bold text-warning mb-1 golden-text-glow">34%</p>
              <p className="text-xs text-muted-foreground">
                Expected performance improvement after rebalancing
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latency Reduction</span>
                <span className="font-bold text-warning golden-text-glow">-45ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Throughput Increase</span>
                <span className="font-bold text-warning golden-text-glow">+28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost Savings</span>
                <span className="font-bold text-warning golden-text-glow">-€12/mo</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRebalanceDialog(false)}
              disabled={isRebalancing}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={async () => {
                setIsRebalancing(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsRebalancing(false);
                toast({
                  title: "Network Rebalanced",
                  description: "Network has been successfully rebalanced with 34% optimization improvement.",
                });
                setShowRebalanceDialog(false);
              }}
              disabled={isRebalancing}
            >
              {isRebalancing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rebalancing...
                </>
              ) : (
                <>
                  <Network className="mr-2 h-4 w-4" />
                  Rebalance Now
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Details Dialog */}
      <Dialog open={showReviewDetailsDialog} onOpenChange={setShowReviewDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Contract Merge Opportunity - Details
            </DialogTitle>
            <DialogDescription>
              Detailed cost analysis and optimization breakdown
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Cost Breakdown */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Cost Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Monthly Gas Fees</span>
                  <span className="text-sm font-bold text-foreground">€ 720</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">After Merge (34% reduction)</span>
                  <span className="text-sm font-bold text-success">€ 480</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-foreground">Monthly Savings</span>
                  <span className="text-lg font-bold text-success">€ 240</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-foreground">Annual Savings</span>
                  <span className="text-lg font-bold text-success">€ 2,880</span>
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Contracts to Merge</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
                  <span className="font-mono text-xs text-foreground">0x4f8a...92c1</span>
                  <span className="text-xs text-muted-foreground">Gas: €360/mo</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">+</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
                  <span className="font-mono text-xs text-foreground">0x7b3d...45e9</span>
                  <span className="text-xs text-muted-foreground">Gas: €360/mo</span>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-sm font-semibold text-primary">→</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-2">
                  <span className="font-mono text-xs font-semibold text-primary">Merged Contract</span>
                  <span className="text-xs font-bold text-success">Gas: €480/mo</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-lg border border-success/30 bg-success/5 p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Benefits</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 34% reduction in gas fees</li>
                <li>• Simplified contract management</li>
                <li>• Reduced transaction complexity</li>
                <li>• Lower maintenance costs</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowReviewDetailsDialog(false)}
            >
              Close
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={async () => {
                setIsApplyingOptimization(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsApplyingOptimization(false);
                setOptimizationApplied(true);
                toast({
                  title: "Optimization Applied",
                  description: "Contract merge optimization has been applied. You will save €240/month.",
                });
                setShowReviewDetailsDialog(false);
              }}
              disabled={isApplyingOptimization || optimizationApplied}
            >
              {isApplyingOptimization ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Applying...
                </>
              ) : optimizationApplied ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Applied
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Apply Optimization
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Learn More Dialog */}
      <Dialog open={showLearnMoreDialog} onOpenChange={setShowLearnMoreDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Batched Execution - Learn More
            </DialogTitle>
            <DialogDescription>
              Understanding batched execution and its benefits
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">What is Batched Execution?</h3>
              <p className="text-sm text-muted-foreground">
                Batched execution groups multiple reward transactions into a single blockchain transaction, 
                significantly reducing gas fees and improving processing speed.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Performance Improvements</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Speed</span>
                    <span className="font-bold text-success">+12% faster</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost Reduction</span>
                    <span className="font-bold text-success">-18% lower costs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Efficiency</span>
                    <span className="font-bold text-success">+35% improvement</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">How It Works</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>1. Multiple reward transactions are collected in a batch</li>
                  <li>2. Batch is processed as a single blockchain transaction</li>
                  <li>3. Gas fees are shared across all transactions in the batch</li>
                  <li>4. All rewards are distributed simultaneously</li>
                </ul>
              </div>

              <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Benefits</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Lower gas fees per transaction</li>
                  <li>• Faster reward distribution</li>
                  <li>• Reduced blockchain congestion</li>
                  <li>• Better scalability for high-volume campaigns</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setShowLearnMoreDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Full Stream Dialog */}
      <Dialog open={showFullStreamDialog} onOpenChange={setShowFullStreamDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Live Hash Stream
            </DialogTitle>
            <DialogDescription>
              Complete blockchain hash transaction stream
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative flex-1 overflow-hidden">
            <div 
              ref={setFullStreamScrollRef}
              className="space-y-3 py-4 overflow-y-auto max-h-[60vh] pr-2 scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {[
                "0x4f8a...92c1", "0x7b3d...45e9", "0x2c9f...18a7", "0x9e1b...73d4",
                "0x3a5d...82f1", "0x8c2e...91b3", "0x1f4a...67c8", "0x6b9d...34e2",
                "0x5e7a...89f4", "0x2d8c...56b1", "0x9f3a...72e5", "0x4b6c...18d9",
                "0x7a2e...45f3", "0x3c9d...81b7", "0x8e5a...29c4", "0x1b7f...63e8",
              ].map((hash, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-3 font-mono text-sm hover:bg-muted/20 transition-colors"
                >
                  <span className="text-foreground">{hash}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 60)} sec ago
                    </span>
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Down Button */}
            <div className="absolute bottom-4 right-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-10 w-10 p-0 border-primary/50 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary shadow-lg"
                onClick={() => {
                  if (fullStreamScrollRef) {
                    fullStreamScrollRef.scrollBy({
                      top: 200,
                      behavior: 'smooth'
                    });
                  }
                }}
                title="Scroll Down"
              >
                <ChevronDown className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowFullStreamDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Integrations Dialog */}
      <Dialog open={showManageIntegrationsDialog} onOpenChange={setShowManageIntegrationsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Manage API Integrations
            </DialogTitle>
            <DialogDescription>
              Configure and monitor your API integrations
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            {apiStatus.map((api) => (
              <div
                key={api.name}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${api.status === "Connected" ? "bg-success" : "bg-warning"} animate-pulse`} />
                  <div>
                    <p className="font-semibold text-foreground">{api.name}</p>
                    <p className="text-xs text-muted-foreground">Latency: {api.latency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${api.status === "Connected" ? "text-success" : "text-warning"}`}>
                    {api.status}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted"
                    onClick={() => {
                      toast({
                        title: `${api.name} Configuration`,
                        description: `Opening configuration panel for ${api.name}...`,
                      });
                    }}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            ))}

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Integration Status</span>
              </div>
              <p className="text-xs text-muted-foreground">
                All integrations are monitored in real-time. Click "Configure" to modify settings for any API.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowManageIntegrationsDialog(false)}
            >
              Close
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={() => {
                toast({
                  title: "Refresh Initiated",
                  description: "Refreshing all API connections...",
                });
              }}
            >
              <Activity className="mr-2 h-4 w-4" />
              Refresh All
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply Optimization Dialog */}
      <Dialog open={showApplyOptimizationDialog} onOpenChange={setShowApplyOptimizationDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Apply Contract Merge Optimization
            </DialogTitle>
            <DialogDescription>
              Confirm and apply the contract merge optimization
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative flex-1 overflow-hidden">
            <div 
              ref={setApplyOptimizationScrollRef}
              className="space-y-4 py-4 overflow-y-auto max-h-[60vh] pr-2 scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
            {/* Optimization Summary */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Optimization Summary</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas Fee Reduction:</span>
                  <span className="font-bold text-success">34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Savings:</span>
                  <span className="font-bold text-success">€ 240</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Savings:</span>
                  <span className="font-bold text-success">€ 2,880</span>
                </div>
              </div>
            </div>

            {/* Contracts to Merge */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Contracts to Merge</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
                  <span className="font-mono text-xs text-foreground">0x4f8a...92c1</span>
                  <span className="text-xs text-muted-foreground">Current: €360/mo</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">+</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
                  <span className="font-mono text-xs text-foreground">0x7b3d...45e9</span>
                  <span className="text-xs text-muted-foreground">Current: €360/mo</span>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-sm font-semibold text-primary">→</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-2">
                  <span className="font-mono text-xs font-semibold text-primary">Merged Contract</span>
                  <span className="text-xs font-bold text-success">New: €480/mo</span>
                </div>
              </div>
            </div>

            {/* Impact Analysis */}
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 golden-border-glow golden-bg-glow">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-warning golden-icon-glow" />
                <h3 className="text-sm font-semibold text-foreground">Impact Analysis</h3>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Contracts will be merged into a single optimized contract</li>
                <li>• All existing functionality will be preserved</li>
                <li>• No downtime expected during merge process</li>
                <li>• Automatic rollback available if issues occur</li>
              </ul>
            </div>

            {/* Warning */}
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-3 golden-border-glow golden-bg-glow">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5 golden-icon-glow" />
                <p className="text-xs text-muted-foreground">
                  This operation will merge two contracts. Please ensure all dependencies are updated. 
                  The merge process typically takes 2-3 minutes to complete.
                </p>
              </div>
            </div>
            </div>

            {/* Scroll Down Button */}
            <div className="absolute bottom-4 right-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-10 w-10 p-0 border-primary/50 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary shadow-lg"
                onClick={() => {
                  if (applyOptimizationScrollRef) {
                    applyOptimizationScrollRef.scrollBy({
                      top: 200,
                      behavior: 'smooth'
                    });
                  }
                }}
                title="Scroll Down"
              >
                <ChevronDown className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowApplyOptimizationDialog(false)}
              disabled={isApplyingOptimization}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={async () => {
                setIsApplyingOptimization(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                setIsApplyingOptimization(false);
                setOptimizationApplied(true);
                toast({
                  title: "Optimization Applied Successfully",
                  description: "Contract merge optimization has been applied. You will save €240/month starting next billing cycle.",
                });
                setShowApplyOptimizationDialog(false);
              }}
              disabled={isApplyingOptimization || optimizationApplied}
            >
              {isApplyingOptimization ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Applying Optimization...
                </>
              ) : optimizationApplied ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Already Applied
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Apply Now
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
