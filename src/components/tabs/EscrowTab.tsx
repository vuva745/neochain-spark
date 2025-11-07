import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadPDF } from "@/utils/download";

export function EscrowTab() {
  const { toast } = useToast();
  const [showSponsorsDropdown, setShowSponsorsDropdown] = useState(false);

  const transactions = [
    { amount: "€ 800", code: "+ 254722...30", date: "22 Oct 2025", action: "View in Reward & M-Pesa Distribution" },
    { amount: "€ 460", code: "+ 254705...15", date: "22 Oct 2025", action: "Audit verific." },
    { amount: "11.200", code: "+ 254710...90", date: "21 Oct 2025", action: "Audit verific." },
    { amount: "€ 340", code: "+ 254704...12", date: "20 Oct 2025", action: "Audit verific." },
  ];

  const handleExportReport = () => {
    const reportData = {
      reportTitle: "Escrow Payment Ledger Report",
      reportDate: new Date().toISOString(),
      escrowSummary: {
        total: "€ 150,000",
        released: "€ 13,600",
        liveRelease: "€ 1,800",
      },
      transactions: transactions.map((tx) => ({
        amount: tx.amount,
        code: tx.code,
        date: tx.date,
        action: tx.action,
      })),
      blockchainHash: "25cd923f...924e21a",
      nocVerified: true,
      autoReleaseRule: "40% direct - 60% after proof",
      sponsors: ["Coca-Cola", "Safaricom", "RPC"],
    };

    try {
      downloadPDF(reportData, `escrow-payment-report-${Date.now()}`);
      toast({
        title: "Export Complete",
        description: "Your payment report PDF has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full overflow-auto mx-auto max-w-4xl space-y-3">
      {/* Header */}
      <Card className="border-primary/30 bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">ESCROW PAYMENT LEDGER</h1>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">LIVE RELEASE</div>
            <div className="text-3xl font-bold text-primary">€ 1,800</div>
          </div>
        </div>

        {/* Escrow Summary */}
        <div className="mb-3 space-y-2">
          <h2 className="text-sm font-semibold text-primary">ESCROW SUMMARY</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">TOTAL</span>
              <div className="text-3xl font-bold text-primary">€ 150,000</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">RELEASED</span>
              <div className="text-3xl font-bold text-primary">€ 13,600</div>
            </div>
          </div>
        </div>

        {/* Release Chart */}
        <div className="mb-3">
          <div className="relative h-24">
            <svg className="h-full w-full" viewBox="0 0 800 120">
              {/* Grid lines */}
              <line x1="0" y1="100" x2="800" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
              <line x1="0" y1="50" x2="800" y2="50" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />
              <line x1="0" y1="0" x2="800" y2="0" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />
              
              {/* Chart line */}
              <path
                d="M 50 95 L 100 90 L 150 88 L 200 85 L 250 82 L 300 78 L 350 70 L 400 60 L 450 45 L 500 35 L 550 25 L 600 20 L 650 20 L 700 20 L 750 20"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Highlight point at day 22 */}
              <circle cx="700" cy="20" r="6" fill="hsl(var(--primary))" />
              
              {/* X-axis labels */}
              {["16", "17", "18", "19", "20", "21", "22", "23"].map((label, i) => (
                <text
                  key={i}
                  x={50 + i * 93.75}
                  y="115"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Auto-Release Rule */}
        <div className="mb-3">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Auto-Release Rule</h3>
          <p className="mb-2 text-xs text-muted-foreground">40% direct - 60% after proof</p>
          
          <div className="mb-4">
            <button
              onClick={() => setShowSponsorsDropdown(!showSponsorsDropdown)}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3 hover:bg-muted/30"
            >
              <span className="text-foreground">Sponsors</span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${showSponsorsDropdown ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-6">
            <img
              src="/images/cocacola bg.png"
              alt="Coca-Cola"
              className="h-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className = "text-xl font-bold text-destructive";
                  fallback.textContent = "Coca-Cola";
                  parent.appendChild(fallback);
                }
              }}
            />
            <img
              src="/images/safaricom bg.png"
              alt="Safaricom"
              className="h-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className = "text-xl font-bold text-success";
                  fallback.textContent = "Safaricom";
                  parent.appendChild(fallback);
                }
              }}
            />
            <div className="h-16 w-16 rounded-lg border border-primary/30 bg-card p-2 flex items-center justify-center">
              <div className="text-xs font-bold text-primary">RPC</div>
            </div>
          </div>
        </div>

        {/* M-PESA Transactions */}
        <div className="mb-3">
          <h3 className="mb-2 text-sm font-semibold text-primary">M-PESA TRANSACTIONS</h3>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{tx.amount}</span>
                  <span className="font-mono text-xs text-muted-foreground">{tx.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{tx.date}</span>
                  <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                    <div className="h-4 w-4 rounded-full border border-success bg-success/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-success">AEI</span>
                    </div>
                    <span className="text-xs text-foreground">{tx.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Record */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-primary">BLOCKCHAIN HASH RECORD</h3>
            <p className="font-mono text-xs text-muted-foreground">25cd923f...924e21a</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-1 text-[10px] text-muted-foreground">NOC VERIFIED</span>
            <div className="h-12 w-12 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[10px] font-bold text-foreground">NOTARY</div>
                <div className="text-[8px] text-muted-foreground">VERIFIED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button 
          className="w-full border-primary bg-transparent text-primary hover:bg-primary/10"
          onClick={handleExportReport}
        >
          EXPORT PAYMENT REPORT (PDF)
        </Button>
      </Card>
    </div>
  );
}
