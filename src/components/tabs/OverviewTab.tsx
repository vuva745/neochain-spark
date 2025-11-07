import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, CheckCircle, CheckCircle2, TrendingUp, ChevronDown, QrCode, Save, CheckCircle2 as CheckCircleIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadJSON, downloadCSV, downloadPDF, downloadExcel } from "@/utils/download";

export function OverviewTab() {
  const { toast } = useToast();
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState<string>("pdf");
  const [savedSettings, setSavedSettings] = useState<any>(null);
  const [cardDialogScrollRef, setCardDialogScrollRef] = useState<HTMLDivElement | null>(null);

  const handleViewFullCard = () => {
    setShowCardDialog(true);
  };

  const handleSaveChange = async () => {
    setIsSaving(true);
    setShowSaveDialog(true);

    // Simulate saving process
    const settingsToSave = {
      notifications: "ON",
      darkMode: "ON",
      linkedWallet: "M-Pesa · 245",
      autoSave: "ON",
      language: "English",
      timezone: "UTC+3",
      twoFactorAuth: "Enabled",
      sessionTimeout: "30 min",
      dataExport: "Allowed",
      apiAccess: "Active",
      lastLogin: "23 Oct 2025",
      profileStatus: "Verified",
      savedAt: new Date().toISOString(),
      savedBy: "Neo User",
      campaignId: "#82 BAC512",
    };

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSavedSettings(settingsToSave);
    setIsSaving(false);

    toast({
      title: "Settings Saved Successfully",
      description: "All your settings have been saved and synchronized.",
    });
  };

  const handleExportCardData = () => {
    setShowExportDialog(true);
  };

  const handleShareCard = () => {
    setShowShareDialog(true);
  };

  const handleExport = () => {
    const cardData = {
      campaignId: "#82 BAC512",
      sponsor: "Coca-Cola",
      totalScans: 6010,
      watchViews: 2512,
      arConversions: 907,
      roi: "+983%",
      status: "Active",
      exportedAt: new Date().toISOString(),
    };

    try {
      switch (selectedExportFormat) {
        case "pdf":
          downloadPDF(cardData, `card-data-${Date.now()}`);
          break;
        case "csv":
          downloadCSV([cardData], `card-data-${Date.now()}`);
          break;
        case "excel":
          downloadExcel([cardData], `card-data-${Date.now()}.xlsx`);
          break;
        case "json":
          downloadJSON(cardData, `card-data-${Date.now()}`);
          break;
      }
      toast({
        title: "Export Complete",
        description: `Your card data has been downloaded as ${selectedExportFormat.toUpperCase()}.`,
      });
      setShowExportDialog(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareableLink = "https://neocard.app/card/82BAC512";
  const shareMessage = "Check out this NeoCard campaign: Coca-Cola Card Flight Promo - Campaign ID: #82 BAC512";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast({
        title: "Link Copied",
        description: "The shareable link has been copied to your clipboard.",
      });
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareableLink;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast({
          title: "Link Copied",
          description: "The shareable link has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Please copy the link manually.",
          variant: "destructive",
        });
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("NeoCard Campaign: Coca-Cola Card Flight Promo");
    const body = encodeURIComponent(`${shareMessage}\n\nView here: ${shareableLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    toast({
      title: "Opening Email",
      description: "Your email client should open with the share details.",
    });
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`${shareMessage} ${shareableLink}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
    toast({
      title: "Opening WhatsApp",
      description: "WhatsApp should open with the share message.",
    });
  };

  const handleShareSMS = () => {
    const message = encodeURIComponent(`${shareMessage} ${shareableLink}`);
    window.location.href = `sms:?body=${message}`;
    toast({
      title: "Opening SMS",
      description: "Your SMS app should open with the share message.",
    });
  };

  return (
    <div className="h-full overflow-auto space-y-3">
      {/* Top Stats Grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card p-4">
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

        <Card className="border-border bg-card p-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">My Campaign</span>
              <span className="text-xs font-semibold text-success">Active</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Campaign ID</p>
              <p className="text-base font-bold text-foreground">#82 BAC512</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">ROI Snapshot</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-warning golden-text-glow">+983%</span>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Active Sponsor</span>
            <div className="mt-4 flex justify-center">
              <img
                src="/images/cocacola bg.png"
                alt="Coca-Cola Logo"
                className="h-12 object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  if (target.parentElement) {
                    const fallback = document.createElement("div");
                    fallback.className = "text-xl font-bold text-destructive";
                    fallback.textContent = "Coca-Cola";
                    target.parentElement.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Metrics */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Play className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2512</p>
              <p className="text-xs text-muted-foreground">Watch Views</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6010</p>
              <p className="text-xs text-muted-foreground">Card Scans</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">907</p>
              <p className="text-xs text-muted-foreground">AR Conversions</p>
            </div>
            <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="border-border bg-card p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">Block Hour Progress (Scans vs. Goal)</span>
            <span className="text-xl font-bold text-warning golden-text-glow">68%</span>
          </div>
          <Progress value={68} className="h-2" />
          <p className="text-xs text-muted-foreground">AE Hash</p>
        </div>
      </Card>

      {/* Coca-Cola Promo Card */}
      <Card className="border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold text-warning golden-text-glow">Coca-Cola Card Flight Promo</h3>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={handleViewFullCard}
            >
              View Full Card
            </Button>
          </div>
          <div className="ml-6">
              <div className="aspect-[3/4] w-32 rounded-lg border-2 border-primary/50 bg-gradient-to-br from-muted/20 to-card p-3 border-glow">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-6 w-6 rounded bg-primary/20" />
                <span className="text-[8px] font-bold text-primary">AEI</span>
              </div>
              <div className="mb-2 text-center">
                <p className="text-[10px] font-bold text-primary">NEOCARD</p>
                <p className="text-[6px] text-muted-foreground">SPONSOR</p>
              </div>
              <div className="mb-2 flex justify-center">
                <img
                  src="/images/cocacola bg.png"
                  alt="Coca-Cola"
                  className="h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-[8px] font-bold text-foreground">JOHN DOE</p>
                <p className="text-[6px] text-muted-foreground">SP-00X23-KV</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AR Offers */}
      <Card className="border-border bg-card p-4">
        <h3 className="mb-2 text-sm font-semibold text-foreground">AR Offer & Boost</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">AR Pizza Flight Promo</span>
          <QrCode className="h-6 w-6 text-muted-foreground" />
        </div>
      </Card>

      {/* Settings Grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Auditic & Privacy</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• En-to-end encryption (AES)</li>
            <li>• Verified</li>
          </ul>
        </Card>

        <Card className="border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Settings</h3>
          <div className="space-y-2">
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
            <Button 
              className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90" 
              onClick={handleSaveChange}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
              Save Change
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Security & Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Two-Factor Auth</span>
              <span className="text-sm font-medium text-success">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Session Timeout</span>
              <span className="text-sm font-medium text-foreground">30 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Export</span>
              <span className="text-sm font-medium text-success">Allowed</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Access</span>
              <span className="text-sm font-medium text-success">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Login</span>
              <span className="text-sm font-medium text-foreground">23 Oct 2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Profile Status</span>
              <span className="text-sm font-medium text-success">Verified</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer - Removed to save space */}

      {/* View Full Card Dialog */}
      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Card Flight Promo - Full Details</DialogTitle>
            <DialogDescription>Complete campaign information and performance metrics</DialogDescription>
          </DialogHeader>
          <div className="relative flex-1 overflow-hidden">
            <div 
              ref={setCardDialogScrollRef}
              className="overflow-y-auto max-h-[60vh] pr-2 scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              <div className="grid md:grid-cols-2 gap-6 p-1">
            {/* Card Visual */}
            <div className="aspect-[3/4] rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-muted/20 to-card p-8 border-glow">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <span className="text-xl font-bold text-primary">K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-success px-2 py-1 text-xs text-success-foreground">AEI</div>
                  <img
                    src="/images/cocacola bg.png"
                    alt="Coca-Cola"
                    className="h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.parentElement) {
                        const fallback = document.createElement("span");
                        fallback.className = "text-sm font-bold text-primary";
                        fallback.textContent = "Coca-Cola";
                        e.currentTarget.parentElement.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-3xl font-bold text-primary">NEOCARD</h2>
                <p className="text-sm text-muted-foreground">SPONSOR EDITION</p>
              </div>
              <div className="mb-6 flex justify-center">
                <div className="h-32 w-32 rounded-full border-4 border-primary/30 bg-white flex items-center justify-center overflow-hidden border-glow">
                  <img
                    src="https://i.pravatar.cc/300?img=12"
                    alt="Profile Picture"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="h-full w-full rounded-full border-4 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"><svg class="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg></div>';
                      }
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-xl font-bold text-foreground">JOHN DOE</p>
                <p className="text-sm text-muted-foreground">Born: 15-02-1988</p>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <span className="text-sm text-muted-foreground">UID:</span>
                  <span className="font-mono text-sm font-semibold text-foreground">SP-00X23-KV</span>
                </div>
              </div>
            </div>

            {/* Campaign Stats */}
            <div className="space-y-4">
              <Card className="border-primary/30 bg-card p-4 frame-glow">
                <h3 className="mb-3 text-lg font-semibold text-primary">Campaign Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Scans</span>
                    <span className="text-xl font-bold text-primary">6,010</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Watch Views</span>
                    <span className="text-xl font-bold text-primary">2,512</span>
                  </div>
        <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AR Conversions</span>
                    <span className="text-xl font-bold text-accent">907</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm font-medium text-foreground">ROI</span>
                    <span className="text-2xl font-bold text-success">+983%</span>
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-card p-4 frame-glow">
                <h3 className="mb-3 text-lg font-semibold text-foreground">Campaign Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campaign ID:</span>
                    <span className="font-mono font-medium text-foreground">#82 BAC512</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium text-foreground">12 Oct 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="font-medium text-foreground">31 Dec 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target Scans:</span>
                    <span className="font-medium text-foreground">10,000</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-medium text-primary">60%</span>
                  </div>
                  <Progress value={60} className="h-2 mt-2" />
        </div>
      </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10"
                  onClick={handleExportCardData}
                >
                  Export Card Data
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10"
                  onClick={handleShareCard}
                >
                  Share Card
                </Button>
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
                  if (cardDialogScrollRef) {
                    cardDialogScrollRef.scrollBy({
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
        </DialogContent>
      </Dialog>

      {/* Export Card Data Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Card Data</DialogTitle>
            <DialogDescription>Choose export format and content options</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Export Format</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["pdf", "csv", "excel", "json"].map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedExportFormat(format)}
                    className={`rounded-lg border p-3 text-sm font-medium transition-colors border-glow ${
                      selectedExportFormat === format
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:bg-muted/20"
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Include</label>
              <div className="space-y-2">
                {["Campaign Performance", "Card Details", "Statistics", "Timeline"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleExport}>Export</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Card Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Card</DialogTitle>
            <DialogDescription>Share this card with others via link or social platforms</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Shareable Link Section */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Shareable Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareableLink}
                  className="flex-1 rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border-glow"
                  onClick={(e) => {
                    e.currentTarget.select();
                    handleCopyLink();
                  }}
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopyLink}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Copy
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Click the link above to select and copy, or use the Copy button
              </p>
            </div>

            {/* Share Via Section */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Share Via</label>
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-muted/20 hover:border-primary/50 transition-colors border-glow"
                  onClick={handleShareEmail}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Email</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-muted/20 hover:border-primary/50 transition-colors border-glow"
                  onClick={handleShareWhatsApp}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-xs">WhatsApp</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-muted/20 hover:border-primary/50 transition-colors border-glow"
                  onClick={handleShareSMS}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-xs">SMS</span>
                </Button>
              </div>
            </div>

            {/* Card Preview */}
            <div className="rounded-lg border border-border bg-muted/10 p-4 border-glow">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">K</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Coca-Cola Card Flight Promo</p>
                  <p className="text-xs text-muted-foreground">Campaign ID: #82 BAC512</p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowShareDialog(false)}
                className="border-border hover:bg-muted/20"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Settings Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isSaving ? (
                <>
                  <Clock className="h-5 w-5 animate-spin text-primary" />
                  Saving Settings...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-success" />
                  Settings Saved Successfully
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {isSaving 
                ? "Please wait while we save your settings and synchronize with the server."
                : "All your settings have been saved and synchronized across all devices."
              }
            </DialogDescription>
          </DialogHeader>
          
          {isSaving ? (
            <div className="space-y-4 py-6">
              <div className="flex items-center justify-center">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm font-medium text-foreground">Saving your preferences...</p>
                <p className="text-xs text-muted-foreground">This may take a few seconds</p>
              </div>
            </div>
          ) : savedSettings ? (
            <div className="space-y-6 py-4">
              {/* Saved Settings Summary */}
              <div className="rounded-lg border border-success/30 bg-success/5 p-4 border-glow">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircleIcon className="h-5 w-5 text-success" />
                  <h3 className="font-semibold text-foreground">Settings Summary</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saved At:</span>
                    <span className="font-medium text-foreground">
                      {new Date(savedSettings.savedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saved By:</span>
                    <span className="font-medium text-foreground">{savedSettings.savedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campaign ID:</span>
                    <span className="font-medium text-foreground">{savedSettings.campaignId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-success">Synchronized</span>
                  </div>
                </div>
              </div>

              {/* Settings Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">General Settings</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Notifications</span>
                      <span className="font-medium text-success">{savedSettings.notifications}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Dark Mode</span>
                      <span className="font-medium text-success">{savedSettings.darkMode}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Linked Wallet</span>
                      <span className="font-medium text-foreground">{savedSettings.linkedWallet}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Auto-save</span>
                      <span className="font-medium text-success">{savedSettings.autoSave}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Language</span>
                      <span className="font-medium text-foreground">{savedSettings.language}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Timezone</span>
                      <span className="font-medium text-foreground">{savedSettings.timezone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Security & Preferences</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Two-Factor Auth</span>
                      <span className="font-medium text-success">{savedSettings.twoFactorAuth}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Session Timeout</span>
                      <span className="font-medium text-foreground">{savedSettings.sessionTimeout}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Data Export</span>
                      <span className="font-medium text-success">{savedSettings.dataExport}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">API Access</span>
                      <span className="font-medium text-success">{savedSettings.apiAccess}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Profile Status</span>
                      <span className="font-medium text-success">{savedSettings.profileStatus}</span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-border bg-muted/10 p-2 border-glow">
                      <span className="text-muted-foreground">Last Login</span>
                      <span className="font-medium text-foreground">{savedSettings.lastLogin}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sync Status */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 border-glow">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Settings Synchronized</p>
                    <p className="text-xs text-muted-foreground">
                      All changes have been saved to the cloud and synchronized across your devices
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowSaveDialog(false);
                    setSavedSettings(null);
                  }}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    // Export settings as JSON
                    downloadJSON(savedSettings, `settings-backup-${Date.now()}`);
                    toast({
                      title: "Settings Exported",
                      description: "Your settings have been downloaded as a backup file.",
                    });
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary-glow"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Export Settings
                </Button>
              </div>
      </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
