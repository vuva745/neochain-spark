import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function EscrowTab() {
  const transactions = [
    { amount: "€ 800", code: "+ 254722...30", date: "22 Oct 2025", action: "View in Tab 4" },
    { amount: "€ 460", code: "+ 254705...15", date: "22 Oct 2025", action: "Audit verific." },
    { amount: "11.200", code: "+ 254710...90", date: "21 Oct 2025", action: "Audit verific." },
    { amount: "€ 340", code: "+ 254704...12", date: "20 Oct 2025", action: "Audit verific." },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <Card className="border-primary/30 bg-card p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">ESCROW PAYMENT LEDGER</h1>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">LIVE RELEASE</div>
            <div className="text-3xl font-bold text-primary">€ 1,800</div>
          </div>
        </div>

        {/* Escrow Summary */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-primary">ESCROW SUMMARY</h2>
          
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">TOTAL</span>
            </div>
            <div className="text-5xl font-bold text-primary">€ 150,000</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">RELEASED</span>
            </div>
            <div className="text-5xl font-bold text-primary">€ 13,600</div>
          </div>
        </div>

        {/* Release Chart */}
        <div className="mb-8">
          <div className="relative h-32">
            <svg className="h-full w-full" viewBox="0 0 800 120">
              {/* Grid lines */}
              <line x1="0" y1="100" x2="800" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Chart line */}
              <path
                d="M 50 95 L 100 90 L 150 88 L 200 85 L 250 82 L 300 78 L 350 70 L 400 60 L 450 45 L 500 35 L 550 25 L 600 20 L 650 20 L 700 20 L 750 20"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* X-axis labels */}
              {["16", "17", "18", "19", "20", "21", "22", "23", "23", "23"].map((label, i) => (
                <text
                  key={i}
                  x={50 + i * 75}
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
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Auto-Release Rule</h3>
          <p className="mb-4 text-muted-foreground">40% direct - 60% after proof</p>
          
          <div className="mb-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3">
              <span className="text-foreground">Sponsors</span>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <div className="h-16 w-24 rounded-lg bg-card p-2">
              <div className="flex h-full items-center justify-center text-xl font-bold text-destructive">
                Coca-Cola
              </div>
            </div>
            <div className="h-16 w-24 rounded-lg bg-card p-2">
              <div className="flex h-full items-center justify-center text-xl font-bold text-destructive">
                Safaricom
              </div>
            </div>
            <div className="h-16 w-16 rounded-lg border border-primary/30 bg-card p-2">
              <div className="flex h-full items-center justify-center text-xs font-bold text-primary">
                RPC
              </div>
            </div>
          </div>
        </div>

        {/* M-PESA Transactions */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-primary">M-PESA TRANSACTIONS</h3>
          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-primary">{tx.amount}</span>
                  <span className="font-mono text-sm text-muted-foreground">{tx.code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{tx.date}</span>
                  <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                    <div className="h-5 w-5 rounded-full border border-success bg-success/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-success">AEI</span>
                    </div>
                    <span className="text-sm text-foreground">{tx.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Record */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-primary">BLOCKCHAIN HASH RECORD</h3>
            <p className="font-mono text-sm text-muted-foreground">25cd923f...924e21a</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-xs text-muted-foreground">NOC VERIFIED</span>
            <div className="h-16 w-16 rounded-full border-2 border-muted bg-muted/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold text-foreground">NOTARY</div>
                <div className="text-[8px] text-muted-foreground">VERIFIED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button className="w-full border-primary bg-transparent text-primary hover:bg-primary/10">
          EXPORT PAYMENT REPORT (PDF)
        </Button>
      </Card>
    </div>
  );
}
