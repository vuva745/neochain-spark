import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, CreditCard, Bitcoin, Zap, CheckCircle, ArrowUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PaymentsTab() {
  const { toast } = useToast();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [showPayCardDialog, setShowPayCardDialog] = useState(false);
  const [showPayBTCDialog, setShowPayBTCDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    walletAddress: "",
  });
  const [paymentFormData, setPaymentFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    btcAddress: "",
    amount: "2500",
  });
  const invoices = [
    { id: "INV-2025-001", date: "01 Oct 2025", amount: "€ 2,500", status: "Paid", license: "Enterprise" },
    { id: "INV-2025-002", date: "01 Sep 2025", amount: "€ 2,500", status: "Paid", license: "Enterprise" },
    { id: "INV-2025-003", date: "01 Aug 2025", amount: "€ 2,500", status: "Paid", license: "Enterprise" },
    { id: "INV-2025-004", date: "01 Nov 2025", amount: "€ 2,500", status: "Pending", license: "Enterprise" },
  ];

  return (
    <div className="h-full overflow-auto space-y-3">
      <h1 className="text-2xl font-bold text-primary">Financial & License Management</h1>

      {/* License Status */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5 p-4">
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

            <Button 
              className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={() => setShowUpgradeDialog(true)}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Upgrade License
            </Button>
          </div>
        </Card>

        {/* Payment Summary */}
        <Card className="border-border bg-card p-4">
          <h3 className="mb-3 text-lg font-bold text-foreground">Payment Summary</h3>
          
          <div className="space-y-3">
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
              <Button 
                className="w-full border-primary bg-transparent text-primary hover:bg-primary/10"
                onClick={() => setShowPayCardDialog(true)}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Card
              </Button>
              <Button 
                className="w-full border-accent bg-transparent text-accent hover:bg-accent/10"
                onClick={() => setShowPayBTCDialog(true)}
              >
                <Bitcoin className="mr-2 h-4 w-4" />
                Pay with Bitcoin
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Invoice History */}
      <Card className="border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-primary">Invoice History</h3>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>

        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-3 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold text-foreground">{invoice.id}</span>
                  <span className="text-[10px] text-muted-foreground">{invoice.date}</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground">License Type</p>
                  <p className="text-xs font-semibold text-foreground">{invoice.license}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{invoice.amount}</p>
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
        <Button 
          variant="outline" 
          className="mt-4 border-border text-foreground hover:bg-muted"
          onClick={() => setShowAddPaymentDialog(true)}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </Card>

      {/* Upgrade License Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-primary" />
              Upgrade License
            </DialogTitle>
            <DialogDescription>
              Choose a license plan that best fits your needs
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* License Plans */}
            <div className="grid gap-3 md:grid-cols-3">
              {/* Enterprise Plan (Current) */}
              <div 
                className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  selectedPlan === "enterprise" 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-muted/10 hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan("enterprise")}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Enterprise</h4>
                  {selectedPlan === "enterprise" && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-2xl font-bold text-primary mb-1">€ 2,500</p>
                <p className="text-xs text-muted-foreground mb-3">per month</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Unlimited campaigns</li>
                  <li>• Full AI access</li>
                  <li>• Priority support</li>
                  <li>• Blockchain verification</li>
                </ul>
                <div className="mt-3 rounded-full bg-success/20 px-2 py-1 text-center">
                  <span className="text-xs font-medium text-success">CURRENT PLAN</span>
                </div>
              </div>

              {/* Premium Plan */}
              <div 
                className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  selectedPlan === "premium" 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-muted/10 hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan("premium")}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Premium</h4>
                  {selectedPlan === "premium" && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-2xl font-bold text-primary mb-1">€ 1,500</p>
                <p className="text-xs text-muted-foreground mb-3">per month</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• 50 campaigns/month</li>
                  <li>• AI access</li>
                  <li>• Standard support</li>
                  <li>• Basic verification</li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div 
                className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  selectedPlan === "pro" 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-muted/10 hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan("pro")}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Pro</h4>
                  {selectedPlan === "pro" && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-2xl font-bold text-primary mb-1">€ 5,000</p>
                <p className="text-xs text-muted-foreground mb-3">per month</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Unlimited campaigns</li>
                  <li>• Advanced AI</li>
                  <li>• 24/7 support</li>
                  <li>• White-label</li>
                  <li>• Custom integrations</li>
                </ul>
              </div>
            </div>

            {/* Upgrade Info */}
            {selectedPlan && selectedPlan !== "enterprise" && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Upgrade Information</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your license will be upgraded immediately. The new plan will be charged to your default payment method.
                </p>
              </div>
            )}

            {selectedPlan === "enterprise" && (
              <div className="rounded-lg border border-muted bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground text-center">
                  You are currently on the Enterprise plan
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowUpgradeDialog(false);
                setSelectedPlan("");
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={async () => {
                if (!selectedPlan || selectedPlan === "enterprise") {
                  toast({
                    title: "No Plan Selected",
                    description: "Please select a different plan to upgrade.",
                    variant: "destructive",
                  });
                  return;
                }

                setIsProcessing(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsProcessing(false);

                toast({
                  title: "License Upgraded",
                  description: `Your license has been successfully upgraded to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan.`,
                });

                setShowUpgradeDialog(false);
                setSelectedPlan("");
              }}
              disabled={isProcessing || !selectedPlan || selectedPlan === "enterprise"}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Upgrade Now
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Payment Method Dialog */}
      <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Add Payment Method
            </DialogTitle>
            <DialogDescription>
              Add a new payment method to your account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Payment Method Type Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Payment Method Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className={paymentMethod === "card" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit Card
                </Button>
                <Button
                  variant={paymentMethod === "crypto" ? "default" : "outline"}
                  className={paymentMethod === "crypto" ? "bg-accent text-accent-foreground" : ""}
                  onClick={() => setPaymentMethod("crypto")}
                >
                  <Bitcoin className="mr-2 h-4 w-4" />
                  Cryptocurrency
                </Button>
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={paymentForm.cardNumber}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\s/g, "");
                      if (value.length <= 16) {
                        value = value.match(/.{1,4}/g)?.join(" ") || value;
                        setPaymentForm({ ...paymentForm, cardNumber: value });
                      }
                    }}
                    className="font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-sm font-medium">
                      Expiry Date <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={paymentForm.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        setPaymentForm({ ...paymentForm, expiryDate: value });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-sm font-medium">
                      CVV <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={paymentForm.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setPaymentForm({ ...paymentForm, cvv: value });
                      }}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName" className="text-sm font-medium">
                    Cardholder Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cardholderName"
                    type="text"
                    placeholder="John Doe"
                    value={paymentForm.cardholderName}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardholderName: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Crypto Payment Form */}
            {paymentMethod === "crypto" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="walletAddress" className="text-sm font-medium">
                    Wallet Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="walletAddress"
                    type="text"
                    placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                    value={paymentForm.walletAddress}
                    onChange={(e) => setPaymentForm({ ...paymentForm, walletAddress: e.target.value })}
                    className="font-mono text-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your Bitcoin wallet address
                  </p>
                </div>

                <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">Supported: Bitcoin (BTC)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="rounded-lg border border-success/30 bg-success/5 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-xs font-medium text-success">Secure Payment Processing</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Your payment information is encrypted and securely stored
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddPaymentDialog(false);
                setPaymentForm({
                  cardNumber: "",
                  expiryDate: "",
                  cvv: "",
                  cardholderName: "",
                  walletAddress: "",
                });
                setPaymentMethod("card");
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={async () => {
                // Validate form
                if (paymentMethod === "card") {
                  if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardholderName) {
                    toast({
                      title: "Validation Error",
                      description: "Please fill in all card details.",
                      variant: "destructive",
                    });
                    return;
                  }
                  if (paymentForm.cardNumber.replace(/\s/g, "").length < 16) {
                    toast({
                      title: "Invalid Card Number",
                      description: "Please enter a valid 16-digit card number.",
                      variant: "destructive",
                    });
                    return;
                  }
                } else {
                  if (!paymentForm.walletAddress) {
                    toast({
                      title: "Validation Error",
                      description: "Please enter a wallet address.",
                      variant: "destructive",
                    });
                    return;
                  }
                }

                setIsProcessing(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsProcessing(false);

                toast({
                  title: "Payment Method Added",
                  description: `Your ${paymentMethod === "card" ? "credit card" : "Bitcoin wallet"} has been successfully added.`,
                });

                setShowAddPaymentDialog(false);
                setPaymentForm({
                  cardNumber: "",
                  expiryDate: "",
                  cvv: "",
                  cardholderName: "",
                  walletAddress: "",
                });
                setPaymentMethod("card");
              }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Add Payment Method
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
