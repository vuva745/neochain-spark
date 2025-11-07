import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Zap, Users, Monitor, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadCSV } from "@/utils/download";

export function ControlTab() {
  const { toast } = useToast();
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const handleUploadLogo = () => {
    setShowUploadDialog(true);
  };

  const handleExportProof = () => {
    const proofData = [
      {
        "Proof Hash": "AEI-YMash 4DM$7VMEIK | WG",
        "Proof Capture Link": "a1fbaeth4AEQC2W1Eva",
        "Campaign ID": "#82 BAC512",
        "Card UID": "SP-00X23-KV",
        "Sponsor": "Coca-Cola",
        "Status": "Verified",
        "Scans": 8721,
        "Rewards Sent": 383,
        "AR Activations": 482,
        "M-Pesa Transactions": 257,
        "Export Date": new Date().toISOString(),
      },
    ];

    try {
      downloadCSV(proofData, `proof-csv-${Date.now()}`);
      toast({
        title: "Export Complete",
        description: "Your proof CSV has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the proof. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full overflow-auto space-y-3">
      {/* Alert Banner */}
      <Card className="border-warning bg-warning/10 p-3 golden-border-glow golden-bg-glow">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-warning golden-icon-glow" />
          <span className="text-lg font-semibold text-warning golden-text-glow">
            New Winner Detected – Reward Auto-Processing...
          </span>
        </div>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="border-border bg-card p-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Scans</span>
            <div className="text-4xl font-bold text-foreground">8,721</div>
            <div className="h-1 w-full rounded-full bg-primary/30">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Rewards Sent</span>
            <div className="text-4xl font-bold text-primary">383</div>
            <div className="h-1 w-full rounded-full bg-primary/30">
              <div className="h-full w-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">AR Activations</span>
            <div className="text-4xl font-bold text-accent">482</div>
            <div className="h-1 w-full rounded-full bg-accent/30">
              <div className="h-full w-2/3 rounded-full bg-accent" />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">M-Pesa</span>
            <div className="text-4xl font-bold text-warning golden-text-glow">257</div>
            <div className="h-1 w-full rounded-full bg-warning/30">
              <div className="h-full w-1/3 rounded-full bg-warning golden-glow" />
            </div>
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* Left: NeoCard Display */}
        <Card className="border-primary/30 bg-card p-4">
          <div className="space-y-2">
            <div className="aspect-[3/4] rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-muted/20 to-card p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <span className="text-xl font-bold text-primary">K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-success px-2 py-1 text-xs text-success-foreground">
                    AEI
                  </div>
                  <img
                    src="/images/cocacola bg.png"
                    alt="Coca-Cola"
                    className="h-5 object-contain"
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
                <div className="h-32 w-32 rounded-full border-4 border-primary/30 bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/300?img=12"
                    alt="Profile Picture" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Fallback if image fails to load - use avatar icon instead
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

              <Button 
                className="mt-6 w-full border-primary bg-transparent text-primary hover:bg-primary/10"
                onClick={handleUploadLogo}
              >
                UPLOAD LOGO
              </Button>
            </div>
          </div>
        </Card>

        {/* Right: Geo & Device Monitor */}
        <div className="space-y-3">
          {/* Geo-Zone Map */}
          <Card className="border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Geo-Zone Map & Heat Tracker</h3>
            <div className="aspect-video rounded-lg bg-muted/20 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <span className="font-medium text-foreground">NAROBI TI</span>
                  <span className="text-sm text-muted-foreground">BUS ZONE 2</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <span className="font-medium text-foreground">KIDS PARADE ARENA</span>
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </Card>

          {/* Crew & Device Monitor */}
          <Card className="border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Crew & Device Monitor</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-success">100 OK</p>
                    <p className="text-sm text-muted-foreground">Crew Status</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-success">OK</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">110 ACTIVE</p>
                    <p className="text-sm text-muted-foreground">Devices</p>
                  </div>
                </div>
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              </div>
            </div>
          </Card>

          {/* Export Section */}
          <Card className="border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Export Proof CSV</h3>
            <div className="space-y-3">
              <p className="font-mono text-sm text-muted-foreground">
                AEI-YMash 4DM$7VMEIK | WG
              </p>
              <p className="text-sm text-muted-foreground">
                Proof Capture Link: a1fbaeth4AEQC2W1Eva
              </p>
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary-glow"
                onClick={handleExportProof}
              >
                EXPORT PROOF CSV
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer Status - Removed to save space */}

      {/* Upload Logo Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Logo</DialogTitle>
            <DialogDescription>Upload a new logo for the NeoCard</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground mb-2">Drop your logo here or click to browse</p>
              <p className="text-xs text-muted-foreground mb-4">PNG, JPG or SVG (max 5MB)</p>
              <Button variant="outline" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = () => {
                  toast({
                    title: "Logo Uploaded",
                    description: "Your logo has been uploaded successfully. It will be applied to the card.",
                  });
                  setShowUploadDialog(false);
                };
                input.click();
              }}>
                Select File
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                <li>Square format recommended (1:1 ratio)</li>
                <li>Minimum 512x512 pixels</li>
                <li>Transparent background preferred</li>
                <li>File size: max 5MB</li>
              </ul>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
