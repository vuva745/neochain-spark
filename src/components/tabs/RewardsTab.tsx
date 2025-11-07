import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, AlertCircle, Zap, Loader2, Download, FileText, ExternalLink, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadCSV, downloadJSON, downloadPDF, downloadExcel } from "@/utils/download";

type RewardStatus = "Completed" | "Processing" | "Failed";

interface Reward {
  id: string;
  amount: string;
  recipient: string;
  status: RewardStatus;
  date: string;
  mpesaRef: string;
}

export function RewardsTab() {
  const { toast } = useToast();
  const [showProcessDialog, setShowProcessDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detailsScrollRef, setDetailsScrollRef] = useState<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    campaign: "",
    description: "",
  });

  const [rewards, setRewards] = useState<Reward[]>([
    { id: "RW-2401", amount: "€ 50", recipient: "+254722...30", status: "Completed", date: "23 Oct 2025", mpesaRef: "RKJ8X2M4PQ" },
    { id: "RW-2402", amount: "€ 25", recipient: "+254705...15", status: "Completed", date: "23 Oct 2025", mpesaRef: "RKJ8X2M4PR" },
    { id: "RW-2403", amount: "€ 100", recipient: "+254710...90", status: "Processing", date: "23 Oct 2025", mpesaRef: "Pending" },
    { id: "RW-2404", amount: "€ 15", recipient: "+254704...12", status: "Completed", date: "22 Oct 2025", mpesaRef: "RKJ8X2M4PS" },
    { id: "RW-2405", amount: "€ 75", recipient: "+254722...45", status: "Failed", date: "22 Oct 2025", mpesaRef: "Error" },
  ]);

  const stats = [
    { label: "Total Distributed", value: "€ 12,450", change: "+€ 890 today" },
    { label: "Rewards Sent", value: "523", change: "+38 today" },
    { label: "Success Rate", value: "98.2%", change: "+0.5% this week" },
    { label: "Avg. Payout Time", value: "2.3 sec", change: "Real-time" },
  ];

  const handleProcessNewReward = () => {
    setShowProcessDialog(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitReward = async () => {
    // Validate form
    if (!formData.recipient || !formData.amount || !formData.campaign) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Recipient, Amount, Campaign).",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+?254\d{9}$/;
    if (!phoneRegex.test(formData.recipient.replace(/\s/g, ""))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number (e.g., +254712345678).",
        variant: "destructive",
      });
      return;
    }

    // Validate amount
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate new reward ID
    const newId = `RW-${Date.now().toString().slice(-4)}`;
    const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    
    // Generate M-Pesa reference
    const mpesaRef = `RKJ${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // Create new reward
    const newReward = {
      id: newId,
      amount: `€ ${amount.toFixed(2)}`,
      recipient: formData.recipient.length > 12 ? `${formData.recipient.slice(0, 9)}...${formData.recipient.slice(-2)}` : formData.recipient,
      status: "Processing" as const,
      date: today,
      mpesaRef: "Processing...",
    };

    // Add to rewards list
    setRewards((prev) => [newReward, ...prev]);

    setIsProcessing(false);
    setShowProcessDialog(false);

    toast({
      title: "Reward Processing",
      description: `Reward of € ${amount.toFixed(2)} is being processed for ${formData.recipient}.`,
    });

    // Simulate completion after 3 seconds
    setTimeout(() => {
      setRewards((prev) =>
        prev.map((r) =>
          r.id === newId
            ? { ...r, status: "Completed" as const, mpesaRef }
            : r
        )
      );
      toast({
        title: "Reward Completed",
        description: `Reward successfully sent! M-Pesa Reference: ${mpesaRef}`,
      });
    }, 3000);

    // Reset form
    setFormData({
      recipient: "",
      amount: "",
      campaign: "",
      description: "",
    });
  };

  const handleViewDetails = (reward: Reward) => {
    setSelectedReward(reward);
    setShowDetailsDialog(true);
  };

  const handleExportAll = () => {
    setShowExportDialog(true);
  };

  const handleExportRewards = (format: string) => {
    const exportData = rewards.map((reward) => ({
      "Reward ID": reward.id,
      "Amount": reward.amount,
      "Recipient": reward.recipient,
      "Status": reward.status,
      "Date": reward.date,
      "M-Pesa Reference": reward.mpesaRef,
    }));

    const timestamp = Date.now();

    switch (format) {
      case "csv":
        downloadCSV(exportData, `rewards-export-${timestamp}`);
        toast({
          title: "Export Successful",
          description: "All rewards have been exported as CSV.",
        });
        break;
      case "json":
        downloadJSON(exportData, `rewards-export-${timestamp}`);
        toast({
          title: "Export Successful",
          description: "All rewards have been exported as JSON.",
        });
        break;
      case "excel":
        downloadExcel(exportData, `rewards-export-${timestamp}.xlsx`);
        toast({
          title: "Export Successful",
          description: "All rewards have been exported as Excel.",
        });
        break;
      case "pdf":
        downloadPDF(exportData, `rewards-export-${timestamp}`);
        toast({
          title: "Export Successful",
          description: "All rewards have been exported as PDF.",
        });
        break;
    }

    setShowExportDialog(false);
  };

  return (
    <div className="h-full overflow-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Reward & M-Pesa Distribution</h1>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary-glow"
          onClick={handleProcessNewReward}
        >
          <Zap className="mr-2 h-4 w-4" />
          Process New Reward
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card p-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-success">{stat.change}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* M-Pesa Integration Status */}
      <Card className="border-primary/30 bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">M-Pesa API Status</h3>
              <p className="text-xs text-muted-foreground">Connected • Last sync: 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">LIVE</span>
          </div>
        </div>
      </Card>

      {/* Recent Rewards */}
      <Card className="border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-primary">Recent Reward Transactions</h3>
          <Button 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10"
            onClick={handleExportAll}
          >
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>

        <div className="space-y-2">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-3 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-muted-foreground">{reward.id}</span>
                  <span className="text-lg font-bold text-primary">{reward.amount}</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <div>
                  <p className="font-mono text-xs text-foreground">{reward.recipient}</p>
                  <p className="text-[10px] text-muted-foreground">M-Pesa: {reward.mpesaRef}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{reward.date}</p>
                  <div className="mt-1 flex items-center gap-1">
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-primary/50 text-primary hover:bg-primary/10"
                  onClick={() => handleViewDetails(reward)}
                >
                  <FileText className="mr-1 h-3 w-3" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Auto-Processing Rules */}
      <Card className="border-border bg-card p-4">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Auto-Processing Configuration</h3>
        <div className="space-y-2">
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

      {/* Process New Reward Dialog */}
      <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Process New Reward
            </DialogTitle>
            <DialogDescription>
              Enter the reward details to process a new M-Pesa payment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Recipient Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-sm font-medium">
                Recipient Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="recipient"
                type="tel"
                placeholder="+254712345678"
                value={formData.recipient}
                onChange={(e) => handleInputChange("recipient", e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Enter Kenyan phone number (e.g., +254712345678)
              </p>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount (€) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="50.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>

            {/* Campaign */}
            <div className="space-y-2">
              <Label htmlFor="campaign" className="text-sm font-medium">
                Campaign <span className="text-destructive">*</span>
              </Label>
              <Input
                id="campaign"
                type="text"
                placeholder="Coca-Cola Card Flight Promo"
                value={formData.campaign}
                onChange={(e) => handleInputChange("campaign", e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description (Optional)
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="Reward for campaign participation"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            {/* M-Pesa Status */}
            <div className="rounded-lg border border-success/30 bg-success/5 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">M-Pesa API Connected</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Payment will be processed immediately via M-Pesa
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowProcessDialog(false);
                setFormData({
                  recipient: "",
                  amount: "",
                  campaign: "",
                  description: "",
                });
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReward}
              disabled={isProcessing}
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Process Reward
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reward Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Reward Transaction Details
            </DialogTitle>
            <DialogDescription>
              Complete information about this reward transaction
            </DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="relative flex-1 overflow-hidden">
              <div 
                ref={setDetailsScrollRef}
                className="space-y-4 py-4 overflow-y-auto max-h-[60vh] pr-2 scroll-smooth"
                style={{ scrollbarWidth: 'thin' }}
              >
              {/* Transaction Summary */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Transaction Summary</h3>
                  {selectedReward.status === "Completed" && (
                    <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
                      {selectedReward.status}
                    </span>
                  )}
                  {selectedReward.status === "Processing" && (
                    <span className="rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning">
                      {selectedReward.status}
                    </span>
                  )}
                  {selectedReward.status === "Failed" && (
                    <span className="rounded-full bg-destructive/20 px-3 py-1 text-xs font-medium text-destructive">
                      {selectedReward.status}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Reward ID:</span>
                    <p className="font-mono font-semibold text-foreground">{selectedReward.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="text-lg font-bold text-primary">{selectedReward.amount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="font-medium text-foreground">{selectedReward.date}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">M-Pesa Reference:</span>
                    <p className="font-mono text-xs text-foreground">{selectedReward.mpesaRef}</p>
                  </div>
                </div>
              </div>

              {/* Recipient Information */}
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Recipient Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone Number:</span>
                    <span className="font-mono font-medium text-foreground">{selectedReward.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-medium text-foreground">M-Pesa</span>
                  </div>
                </div>
              </div>

              {/* Transaction Status */}
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Transaction Status</h3>
                <div className="space-y-2">
                  {selectedReward.status === "Completed" && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-sm font-medium text-success">Transaction Completed Successfully</p>
                        <p className="text-xs text-muted-foreground">
                          Payment was successfully processed and sent to recipient
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedReward.status === "Processing" && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-warning animate-pulse" />
                      <div>
                        <p className="text-sm font-medium text-warning">Transaction Processing</p>
                        <p className="text-xs text-muted-foreground">
                          Payment is currently being processed by M-Pesa
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedReward.status === "Failed" && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="text-sm font-medium text-destructive">Transaction Failed</p>
                        <p className="text-xs text-muted-foreground">
                          Payment could not be processed. Please retry or contact support.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Additional Information</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Campaign:</span>
                    <span className="text-foreground">Coca-Cola Card Flight Promo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="text-foreground">2.3 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Response:</span>
                    <span className="text-foreground">Success</span>
                  </div>
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
                    if (detailsScrollRef) {
                      detailsScrollRef.scrollBy({
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
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Close
            </Button>
            {selectedReward?.status === "Failed" && (
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary-glow"
                onClick={() => {
                  toast({
                    title: "Retry Initiated",
                    description: "Retrying failed transaction...",
                  });
                  setShowDetailsDialog(false);
                }}
              >
                <Zap className="mr-2 h-4 w-4" />
                Retry Transaction
              </Button>
            )}
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => {
                if (!selectedReward) return;
                const rewardData = {
                  "Reward ID": selectedReward.id,
                  "Amount": selectedReward.amount,
                  "Recipient": selectedReward.recipient,
                  "Status": selectedReward.status,
                  "Date": selectedReward.date,
                  "M-Pesa Reference": selectedReward.mpesaRef,
                };
                downloadJSON(rewardData, `reward-${selectedReward.id}-${Date.now()}`);
                toast({
                  title: "Export Successful",
                  description: "Reward details have been exported.",
                });
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export All Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Export All Rewards
            </DialogTitle>
            <DialogDescription>
              Choose a format to export all reward transactions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <div className="rounded-lg border border-border bg-muted/10 p-3">
              <p className="text-sm font-medium text-foreground mb-1">Total Records</p>
              <p className="text-2xl font-bold text-primary">{rewards.length} transactions</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-muted/20 hover:border-primary/50 transition-colors"
                onClick={() => handleExportRewards("csv")}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xs">CSV</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-muted/20 hover:border-primary/50 transition-colors"
                onClick={() => handleExportRewards("json")}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xs">JSON</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-muted/20 hover:border-primary/50 transition-colors"
                onClick={() => handleExportRewards("excel")}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xs">Excel</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-muted/20 hover:border-primary/50 transition-colors"
                onClick={() => handleExportRewards("pdf")}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xs">PDF</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setShowExportDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
