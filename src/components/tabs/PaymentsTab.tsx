import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, Bitcoin } from "lucide-react";

export function PaymentsTab() {
  const invoices = [
    { id: "INV-2025-001", date: "01 Oct 2025", amount: "€ 2,500", status: "Paid", license: "Enterprise" },
    { id: "INV-2025-002", date: "01 Sep 2025", amount: "€ 2,500", status: "Paid", license: "Enterprise" },
    { id: "INV-2025-003", date: "01 Aug 2025", amount: "€ 2,500", status: "Paid", license: "Enterprise" },
    { id: "INV-2025-004", date: "01 Nov 2025", amount: "€ 2,500", status: "Pending", license: "Enterprise" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Financial & License Management</h1>

      {/* License Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5 p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary">Current License</h3>
              <span className="rounded-full bg-success/20 px-4 py-1 text-sm font-bold text-success">ACTIVE</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan Type</span>
                <span className="font-bold text-foreground">Enterprise</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">License ID</span>
                <span className="font-mono text-sm font-bold text-foreground">LIC-ENT-2025-8251</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valid Until</span>
                <span className="font-bold text-foreground">31 Dec 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auto-Renewal</span>
                <span className="font-bold text-success">ON</span>
              </div>
            </div>

            <div className="mt-6 space-y-2 rounded-lg border border-primary/30 bg-primary/10 p-4">
              <p className="text-sm font-medium text-primary">License Includes:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Unlimited NFC card campaigns</li>
                <li>• Full AI Sentinel access</li>
                <li>• Priority support & SLA</li>
                <li>• Blockchain verification</li>
                <li>• White-label options</li>
              </ul>
            </div>

            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary-glow">
              Upgrade License
            </Button>
          </div>
        </Card>

        {/* Payment Summary */}
        <Card className="border-border bg-card p-8">
          <h3 className="mb-6 text-2xl font-bold text-foreground">Payment Summary</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total Paid (2025)</span>
                <span className="text-3xl font-bold text-foreground">€ 7,500</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between rounded-lg bg-muted/20 p-3">
                <span className="text-sm text-muted-foreground">Next Payment</span>
                <span className="font-bold text-foreground">€ 2,500</span>
              </div>
              <div className="flex justify-between rounded-lg bg-muted/20 p-3">
                <span className="text-sm text-muted-foreground">Due Date</span>
                <span className="font-bold text-warning">01 Nov 2025</span>
              </div>
              <div className="flex justify-between rounded-lg bg-muted/20 p-3">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <span className="font-bold text-foreground">Auto-Charge</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button className="w-full border-primary bg-transparent text-primary hover:bg-primary/10">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Card
              </Button>
              <Button className="w-full border-accent bg-transparent text-accent hover:bg-accent/10">
                <Bitcoin className="mr-2 h-4 w-4" />
                Pay with Bitcoin
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Invoice History */}
      <Card className="border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-primary">Invoice History</h3>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>

        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-bold text-foreground">{invoice.id}</span>
                  <span className="text-xs text-muted-foreground">{invoice.date}</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-sm text-muted-foreground">License Type</p>
                  <p className="font-semibold text-foreground">{invoice.license}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{invoice.amount}</p>
                </div>
                <div className="w-24">
                  {invoice.status === "Paid" ? (
                    <span className="inline-block rounded-full bg-success/20 px-3 py-1 text-sm font-medium text-success">
                      {invoice.status}
                    </span>
                  ) : (
                    <span className="inline-block rounded-full bg-warning/20 px-3 py-1 text-sm font-medium text-warning">
                      {invoice.status}
                    </span>
                  )}
                </div>
                <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Methods */}
      <Card className="border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Payment Methods</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Visa •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/26 • Primary</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted/10 p-4">
            <div className="flex items-center gap-3">
              <Bitcoin className="h-8 w-8 text-accent" />
              <div>
                <p className="font-semibold text-foreground">Bitcoin Wallet</p>
                <p className="text-sm text-muted-foreground">bc1q...7x9k • Backup</p>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" className="mt-4 border-border text-foreground hover:bg-muted">
          Add Payment Method
        </Button>
      </Card>
    </div>
  );
}
