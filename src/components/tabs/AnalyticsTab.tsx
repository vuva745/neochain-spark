import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, Flame, Zap, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadCSV, downloadJSON } from "@/utils/download";

export function AnalyticsTab() {
  const { toast } = useToast();
  const [showLiveAlert, setShowLiveAlert] = useState(false);
  const [showAeiHash, setShowAeiHash] = useState(false);

  const handleExportData = () => {
    const exportData = [
      {
        "Total Scans": "10,284",
        "AEI Verified": "10,002",
        "Avg Value per Scan": "€ 75,20",
        "Active FMOKs": "28",
        "ROI": "342%",
        "Export Date": new Date().toISOString(),
      },
    ];

    try {
      downloadCSV(exportData, `analytics-data-${Date.now()}`);
      toast({
        title: "Export Complete",
        description: "Your analytics data has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportProof = () => {
    const proofData = {
      analytics: {
        totalScans: 10284,
        aeiVerified: 10002,
        avgValuePerScan: "€ 75,20",
        activeFMOKs: 28,
        roi: "342%",
        engagementHeatCycle: {
          weeklyPulse: "Active",
          events: ["PIZZA NIGHT", "COFFEE BOOST", "KIDS PARADE"],
        },
        fomoLevelMeter: {
          locations: ["KENYA", "USA", "JAPAN", "US"],
        },
        exportedAt: new Date().toISOString(),
      },
    };

    try {
      downloadJSON(proofData, `analytics-proof-${Date.now()}`);
      toast({
        title: "Export Complete",
        description: "Your analytics proof has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the proof. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLiveAlert = () => {
    setShowLiveAlert(true);
  };

  const handleViewAeiHash = () => {
    setShowAeiHash(true);
  };

  return (
    <div className="h-full overflow-auto space-y-3">
      {/* Top Stats */}
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="border-border bg-card p-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">TOTAL SCANS</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">10,284</span>
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success">+18%</span>
            </div>
            {/* Small line graph */}
            <div className="mt-2 h-8">
              <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path
                  d="M 0 25 Q 10 20 20 18 T 40 15 T 60 12 T 80 10 T 100 8"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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

      {/* Live Campaign Alert */}
      <Card className="border-primary/30 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning golden-icon-glow" />
            <h3 className="text-sm font-semibold text-primary">LIVE CAMPAIGN ALERT</h3>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          {/* ROI Gauge */}
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32">
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
                  stroke="hsl(var(--warning))"
                  strokeWidth="6"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground mb-1">ROI</span>
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Engagement Heat Cycle */}
      <Card className="border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-primary">ENGAGEMENT HEAT CYCLE (WEEKLY PULSE)</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning golden-icon-glow" />
              <span className="text-sm text-muted-foreground">PIZZA NIGHT</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning golden-icon-glow" />
              <span className="text-sm text-muted-foreground">COFFEE BOOST</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning golden-icon-glow" />
              <span className="text-sm text-muted-foreground">KIDS PARADE</span>
            </div>
          </div>
        </div>
        
        {/* Bar Chart Visualization with Candles */}
        <div className="flex h-32 items-end justify-between gap-2">
          {[
            { day: "Mon", height: 35, candleLength: 40 },
            { day: "Tue", height: 55, candleLength: 35 },
            { day: "Wed", height: 45, candleLength: 38 },
            { day: "Thu", height: 75, candleLength: 48 },
            { day: "Sat", height: 50, candleLength: 36 },
            { day: "Sun", height: 70, candleLength: 45 },
            { day: "Aug", height: 40, candleLength: 32 },
            { day: "Aug", height: 30, candleLength: 30 },
          ].map((bar, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2 relative">
              <div className="relative w-full h-full flex flex-col items-center justify-end">
                {/* Bar */}
                <div
                  className="w-full rounded-t-lg bg-primary transition-all hover:bg-primary/80 relative"
                  style={{ height: `${bar.height}%` }}
                />
                
                {/* Candle on top of bar - all days have candles */}
                <div className="absolute" style={{ bottom: `calc(${bar.height}% + 8px)` }}>
                  <div className="relative flex flex-col items-center">
                    {/* Candle flame with glow */}
                    <div className="relative mb-1">
                      <div className="absolute inset-0 animate-pulse">
                        <Flame className="h-6 w-6 text-warning opacity-60 golden-icon-glow" />
                      </div>
                      <Flame
                        className="h-6 w-6 text-warning relative z-10 golden-icon-glow"
                        style={{
                          filter: "drop-shadow(0 0 6px rgba(251, 191, 36, 1)) drop-shadow(0 0 3px rgba(251, 191, 36, 0.8))",
                          textShadow: "0 0 8px rgba(251, 191, 36, 0.9)"
                        }}
                      />
                    </div>
                    {/* Candle body with variable length and neon blue glow */}
                    <div
                      className="rounded-sm relative z-10"
                      style={{
                        width: "4px",
                        height: `${bar.candleLength}px`,
                        background: "linear-gradient(to bottom, rgba(59, 130, 246, 1), rgba(37, 99, 235, 0.95), rgba(29, 78, 216, 0.9))",
                        boxShadow: "0 0 16px rgba(59, 130, 246, 1), 0 0 12px rgba(96, 165, 250, 0.9), 0 0 8px rgba(147, 197, 253, 0.8), 0 0 4px rgba(191, 219, 254, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                        filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 1)) drop-shadow(0 0 6px rgba(96, 165, 250, 0.8))",
                        border: "1px solid rgba(147, 197, 253, 0.4)",
                      }}
                    />
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{bar.day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* ROI Section and Map */}
      <div className="grid gap-3 md:grid-cols-2">
        {/* FOMO Level Meter */}
        <Card className="border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-primary">FOMO LEVEL METER—</h3>
          <div className="relative aspect-video rounded-lg overflow-hidden" style={{
            background: "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%)"
          }}>
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }} />
            
            {/* Network lines connecting locations */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
              <line x1="25%" y1="35%" x2="45%" y2="25%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
              <line x1="45%" y1="25%" x2="70%" y2="30%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
              <line x1="70%" y1="30%" x2="75%" y2="50%" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1" />
              <line x1="25%" y1="35%" x2="75%" y2="50%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="2,2" />
            </svg>

            {/* Location Markers */}
            <div className="absolute inset-0">
              {/* KENYA - Bottom left */}
              <div className="absolute" style={{ left: "25%", top: "60%" }}>
                <div className="relative">
                  <div 
                    className="h-4 w-4 rounded-full bg-accent animate-pulse relative z-10"
                    style={{
                      boxShadow: "0 0 20px rgba(59, 130, 246, 1), 0 0 12px rgba(96, 165, 250, 0.8), 0 0 6px rgba(147, 197, 253, 0.6)",
                      filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 1))"
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" style={{
                      animationDuration: "2s"
                    }} />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap text-xs font-medium text-foreground" style={{
                    textShadow: "0 0 8px rgba(59, 130, 246, 0.8)"
                  }}>KENYA</span>
                </div>
              </div>

              {/* USA - Top center */}
              <div className="absolute" style={{ left: "45%", top: "20%" }}>
                <div className="relative">
                  <div 
                    className="h-4 w-4 rounded-full bg-accent animate-pulse relative z-10"
                    style={{
                      boxShadow: "0 0 20px rgba(59, 130, 246, 1), 0 0 12px rgba(96, 165, 250, 0.8), 0 0 6px rgba(147, 197, 253, 0.6)",
                      filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 1))",
                      animationDelay: "0.5s"
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" style={{
                      animationDuration: "2s",
                      animationDelay: "0.5s"
                    }} />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap text-xs font-medium text-foreground" style={{
                    textShadow: "0 0 8px rgba(59, 130, 246, 0.8)"
                  }}>USA</span>
                </div>
              </div>

              {/* JAPAN - Top right */}
              <div className="absolute" style={{ left: "70%", top: "25%" }}>
                <div className="relative">
                  <div 
                    className="h-4 w-4 rounded-full bg-accent animate-pulse relative z-10"
                    style={{
                      boxShadow: "0 0 20px rgba(59, 130, 246, 1), 0 0 12px rgba(96, 165, 250, 0.8), 0 0 6px rgba(147, 197, 253, 0.6)",
                      filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 1))",
                      animationDelay: "1s"
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" style={{
                      animationDuration: "2s",
                      animationDelay: "1s"
                    }} />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap text-xs font-medium text-foreground" style={{
                    textShadow: "0 0 8px rgba(59, 130, 246, 0.8)"
                  }}>JAPAN</span>
                </div>
              </div>

              {/* US - Bottom right */}
              <div className="absolute" style={{ left: "75%", top: "45%" }}>
                <div className="relative">
                  <div 
                    className="h-4 w-4 rounded-full bg-accent animate-pulse relative z-10"
                    style={{
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.9), 0 0 12px rgba(74, 222, 128, 0.7), 0 0 6px rgba(134, 239, 172, 0.5)",
                      filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 1))",
                      animationDelay: "1.5s"
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" style={{
                      animationDuration: "2s",
                      animationDelay: "1.5s"
                    }} />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap text-xs font-medium text-foreground" style={{
                    textShadow: "0 0 8px rgba(34, 197, 94, 0.8)"
                  }}>US</span>
                </div>
              </div>
            </div>

            {/* Subtle glow effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute" style={{ left: "25%", top: "60%", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }} />
              <div className="absolute" style={{ left: "45%", top: "20%", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }} />
              <div className="absolute" style={{ left: "70%", top: "25%", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }} />
              <div className="absolute" style={{ left: "75%", top: "45%", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }} />
            </div>
          </div>
        </Card>

        {/* ROI & FOMO SYNC */}
        <Card className="border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-primary">ROI & FOMO SYNC</h3>
          
          <div className="space-y-3">
            <div className="text-center">
              <div className="mb-1 text-xs text-muted-foreground">Breakdown</div>
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
                    stroke="hsl(var(--warning))"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="50"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-warning golden-text-glow">342%</span>
                  <span className="text-[10px] text-muted-foreground">AEI VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">ROI Source Breakdown</p>
              <div className="flex justify-between text-base font-bold">
                <span className="text-primary">70%</span>
                <span className="text-warning golden-text-glow">20%</span>
                <span className="text-muted-foreground">10%</span>
              </div>
              <p className="text-[10px] text-muted-foreground">ROI SOURCE BY 4 + 70% -10°</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-2">
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary/10"
          onClick={handleExportData}
        >
          EXPORT DATA
        </Button>
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary/10"
          onClick={handleLiveAlert}
        >
          LIVE ALERT
        </Button>
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary/10"
          onClick={handleViewAeiHash}
        >
          VIEW AEI HASH
        </Button>
      </div>

      {/* Footer - Compact */}
      <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-card p-2">
        <p className="text-xs text-muted-foreground">
          All data AEI-secured · Blockchain-verified · Audit-ready
        </p>
        <Button 
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary-glow"
          onClick={handleExportProof}
        >
          EXPORT PROOF
        </Button>
      </div>

      {/* Live Alert Dialog */}
      <Dialog open={showLiveAlert} onOpenChange={setShowLiveAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Live Campaign Alert</DialogTitle>
            <DialogDescription>Real-time campaign notifications and alerts</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 golden-border-glow golden-bg-glow">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-warning golden-icon-glow" />
                <span className="font-semibold text-foreground">High Engagement Detected</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Thursday shows 75% engagement spike - consider increasing rewards allocation.
              </p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">ROI Surge</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Current ROI at 342% - exceeding forecast by 12%.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AEI Hash Dialog */}
      <Dialog open={showAeiHash} onOpenChange={setShowAeiHash}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AEI Hash Verification</DialogTitle>
            <DialogDescription>Blockchain verification details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Hash Value</label>
              <p className="mt-2 font-mono text-sm text-muted-foreground break-all">
                0x4f8a92c17b3d45e92c9f18a79e1b73d4...
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Blockchain Status</label>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-success">Verified on Chain</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Verification Date</label>
              <p className="mt-2 text-sm text-muted-foreground">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

