import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Info, Upload, FileText, Download, ShieldCheck, Loader2, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadJSON, downloadPDF, downloadText } from "@/utils/download";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuditTab() {
  const { toast } = useToast();
  const [showPlayDialog, setShowPlayDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const scanData = [
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100 % Valid" },
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100 % Valid" },
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100 % Valid" },
  ];

  const handleUploadBacksideAd = () => {
    setShowUploadDialog(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPG, PNG, GIF, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an image file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearInterval(progressInterval);
    setUploadProgress(100);

    // Store the uploaded image URL
    setUploadedImage(previewUrl);
    
    toast({
      title: "Upload Successful",
      description: `Backside ad "${selectedFile.name}" has been uploaded successfully.`,
    });

    setIsUploading(false);
    
    // Close dialog after a short delay
    setTimeout(() => {
      setShowUploadDialog(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadProgress(0);
    }, 1000);
  };

  const handlePlayDroneshow = () => {
    setShowPlayDialog(true);
  };

  const handleExportAuditPackage = () => {
    const auditData = {
      auditPackage: {
        proofSnapshot: {
          validScans: 883,
          currency: "USD",
        },
        escrowProgress: {
          hash: "AEI_HASH_ca537d...6cd8b4",
          status: "Verified",
        },
        aeiSentinelHash: "AEI_ca537d...6cd8b4",
        verifiedScanData: scanData,
        blockchainHash: "25cd923f...924e21a",
        nocVerified: true,
        mediaArchive: [
          { type: "QR Code", date: "20 Oct 2025", time: "21:45" },
          { type: "QR Code", date: "20 Oct 2025", time: "19:31" },
          { type: "QR Code", date: "19 Oct 2025", time: "19:14" },
        ],
        exportedAt: new Date().toISOString(),
      },
    };

    try {
      downloadJSON(auditData, `audit-package-${Date.now()}`);
      toast({
        title: "Export Complete",
        description: "Your audit package has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the audit package. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full overflow-auto space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <h2 className="text-lg font-bold text-foreground">
            <span className="text-success">AEI SENTINEL</span> VERIFIED
          </h2>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-bold text-primary">Proof & Audit Monitor</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary/10"
          onClick={handleUploadBacksideAd}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Backside Ad
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* Left: NeoCard Display */}
        <Card className="border-primary/30 bg-card p-4">
          <div className="aspect-[3/4] rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-muted/20 to-card p-4 border-glow">
            <div className="mb-4 flex items-center justify-end">
              <div className="rounded-full bg-muted px-3 py-1">
                <span className="text-xs font-bold text-foreground">AEI</span>
                <span className="ml-1 text-xs text-muted-foreground">PERITITIEEL</span>
              </div>
            </div>

            <div className="mb-8 text-center">
              <div className="mb-6 flex justify-center">
                <img
                  src="/images/safaricom bg.png"
                  alt="Safaricom"
                  className="h-24 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement("span");
                      fallback.className = "text-xl font-bold text-destructive";
                      fallback.textContent = "Safaricom";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 rounded-lg border border-warning/30 bg-warning/5 p-4 golden-border-glow golden-bg-glow">
                  <span className="text-2xl">📶</span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-warning golden-text-glow">TAP TO VERIFY ON</p>
                    <p className="text-xl font-bold text-primary">NEOCHAIN™</p>
                    <p className="text-xs text-muted-foreground">NEC</p>
                  </div>
                </div>

                <div className="space-y-2 text-center text-xs text-muted-foreground">
                  <p>POWERED BY MPESA - KARDIVERSEE LTD</p>
                  <p>PATENT PROTECTED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <div className="relative">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>12 Oct</span>
                <div className="relative flex-1 mx-4">
                  <div className="h-1 rounded-full bg-muted">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                  <div className="absolute right-1/4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-warning golden-glow" />
                </div>
                <span>20</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Proof Data */}
        <div className="space-y-3">
          {/* Proof Snapshot */}
          <Card className="border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">PROOF SNAPSHOT</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">+883</span>
              <span className="text-sm font-medium text-primary">VALID USD</span>
            </div>
          </Card>

          {/* Escrow Progress */}
          <Card className="border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">ESCROW PROGRESS</h3>
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              AEI_HASH_ca537d...6cd8b4
            </p>
          </Card>

          {/* AEI Sentinel Hash */}
          <Card className="border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-sm font-semibold text-primary">AEI SENTINEL HASH VERF.</h3>
              <Info className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="font-mono text-xs text-muted-foreground">
                AEI_ca537d...6cd8b4
              </span>
            </div>
          </Card>

          {/* Verified Scan Data */}
          <Card className="border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">VERIFIED SCAN DATA</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground">
                <span>UID</span>
                <span>Date</span>
                <span>Status</span>
              </div>
              {scanData.map((scan, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-4 rounded-lg border border-success/30 bg-success/5 p-3 text-sm"
                >
                  <span className="font-mono text-foreground">{scan.uid}</span>
                  <span className="text-muted-foreground">{scan.date}</span>
                  <span className="font-medium text-success">{scan.status}</span>
                </div>
              ))}
            </div>

            {/* Timeline Indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>21OQ</span>
                <div className="relative flex-1 mx-4">
                  <div className="h-1 rounded-full bg-muted">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                  <div className="absolute right-1/4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-warning golden-glow" />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>12 Oct</span>
                <span>20</span>
              </div>
            </div>
          </Card>

          {/* Media Archive */}
          <Card className="border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">MEDIA ARCHIVE</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { date: "20.Oct", time: "21:45" },
                { date: "20.20", time: "19:31" },
                { date: "19.57", time: "19.14" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-square rounded-lg border border-border bg-muted/20 p-4">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="mb-2 text-4xl">📱</div>
                        <div className="text-xs text-muted-foreground">QR Code</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-muted-foreground">
                    <div>{item.date}</div>
                    <div>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={handlePlayDroneshow}
            >
              PLAY DRONESHOW PROOF
            </Button>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => setShowProofDialog(true)}
            >
              <FileText className="mr-2 h-4 w-4" />
              VIEW PROOF
            </Button>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary-glow col-span-2"
              onClick={handleExportAuditPackage}
            >
              <Download className="mr-2 h-4 w-4" />
              EXPORT AUDIT PACKAGE
            </Button>
          </div>
        </div>
      </div>

      {/* Play Droneshow Proof Dialog */}
      <Dialog open={showPlayDialog} onOpenChange={setShowPlayDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Droneshow Proof Video</DialogTitle>
            <DialogDescription>Playback of the droneshow proof verification</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video rounded-lg bg-muted/20 flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-lg font-semibold text-foreground">Droneshow Proof Video</p>
                <p className="text-sm text-muted-foreground mt-2">Video playback would appear here</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPlayDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Proof Dialog */}
      <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Proof & Verification Details
            </DialogTitle>
            <DialogDescription>
              Complete proof documentation and verification status
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-2 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
            {/* Proof Summary */}
            <div className="rounded-lg border border-success/30 bg-success/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <h3 className="text-sm font-semibold text-foreground">Proof Summary</h3>
                </div>
                <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
                  VERIFIED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Valid Scans:</span>
                  <p className="font-medium text-foreground">883</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Currency:</span>
                  <p className="font-medium text-foreground">USD</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Verification Status:</span>
                  <p className="font-medium text-success">100% Valid</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Blockchain Status:</span>
                  <p className="font-medium text-success">Verified</p>
                </div>
              </div>
            </div>

            {/* Escrow Proof */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Escrow Progress Proof</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hash:</span>
                  <span className="font-mono text-xs text-foreground">AEI_HASH_ca537d...6cd8b4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-success">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Verification Date:</span>
                  <span className="font-medium text-foreground">20 Oct 2025</span>
                </div>
              </div>
            </div>

            {/* AEI Sentinel Hash */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">AEI Sentinel Hash Verification</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-mono text-xs text-foreground">AEI_ca537d...6cd8b4</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This hash has been verified and recorded on the blockchain. All transactions are immutable and auditable.
                </p>
              </div>
            </div>

            {/* Verified Scan Data */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Verified Scan Data</h3>
              <div className="space-y-2">
                {scanData.map((scan, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-success/30 bg-success/5 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div>
                        <p className="font-mono text-xs font-medium text-foreground">{scan.uid}</p>
                        <p className="text-xs text-muted-foreground">{scan.date}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-success">{scan.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain Record */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Blockchain Hash Record</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hash:</span>
                  <span className="font-mono text-xs text-foreground">25cd923f...924e21a</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">NOC Verified:</span>
                  <span className="font-medium text-success">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Notary Status:</span>
                  <span className="font-medium text-success">Verified</span>
                </div>
              </div>
            </div>

            {/* Media Archive Proof */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Media Archive Proof</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { date: "20.Oct", time: "21:45" },
                  { date: "20.20", time: "19:31" },
                  { date: "19.57", time: "19.14" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-square rounded-lg border border-success/30 bg-success/5 p-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mb-1 text-3xl">📱</div>
                        <div className="text-[10px] text-muted-foreground">QR Code</div>
                      </div>
                    </div>
                    <div className="text-center text-xs text-muted-foreground">
                      <div>{item.date}</div>
                      <div>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Certificate */}
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-warning" />
                <h3 className="text-sm font-semibold text-foreground">Verification Certificate</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>This proof document certifies that all transactions have been verified through the AEI Sentinel system.</p>
                <p>All data is blockchain-verified and audit-ready.</p>
                <p className="font-medium text-foreground mt-2">Certificate ID: CERT-{Date.now().toString().slice(-8)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                const proofData = {
                  proofSummary: {
                    validScans: 883,
                    currency: "USD",
                    verificationStatus: "100% Valid",
                    blockchainStatus: "Verified"
                  },
                  escrowProof: {
                    hash: "AEI_HASH_ca537d...6cd8b4",
                    status: "Verified",
                    verificationDate: "20 Oct 2025"
                  },
                  aeiSentinelHash: "AEI_ca537d...6cd8b4",
                  verifiedScanData: scanData,
                  blockchainHash: "25cd923f...924e21a",
                  nocVerified: true,
                  certificateId: `CERT-${Date.now().toString().slice(-8)}`,
                  exportedAt: new Date().toISOString()
                };
                downloadJSON(proofData, `proof-verification-${Date.now()}`);
                toast({
                  title: "Proof Exported",
                  description: "Proof verification document has been downloaded.",
                });
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Proof
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowProofDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Backside Ad Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Backside Ad
            </DialogTitle>
            <DialogDescription>
              Upload an image file to be used as the backside advertisement for the NeoCard
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* File Input */}
            <div className="space-y-2">
              <Label htmlFor="backside-ad-upload" className="text-sm font-medium">
                Select Image File <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="backside-ad-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="flex-1"
                  disabled={isUploading}
                />
                {selectedFile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveFile}
                    disabled={isUploading}
                    className="border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, GIF, WebP (Max size: 10MB)
              </p>
            </div>

            {/* File Info */}
            {selectedFile && (
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{selectedFile.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Type: {selectedFile.type} • Last modified: {new Date(selectedFile.lastModified).toLocaleDateString()}
                </div>
              </div>
            )}

            {/* Preview */}
            {previewUrl && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Preview</Label>
                <div className="relative rounded-lg border border-border bg-muted/10 p-4">
                  <div className="aspect-[3/4] rounded-lg border-2 border-primary/30 bg-gradient-to-br from-muted/20 to-card p-4 overflow-hidden border-glow">
                    <img
                      src={previewUrl}
                      alt="Backside Ad Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="rounded-full bg-primary/20 backdrop-blur-sm px-2 py-1">
                      <span className="text-xs font-medium text-primary">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-medium text-primary">{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Upload Requirements */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Upload Requirements</h4>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Image should be in landscape or portrait orientation</li>
                <li>• Recommended dimensions: 1080x1920px (portrait) or 1920x1080px (landscape)</li>
                <li>• File size must be less than 10MB</li>
                <li>• Supported formats: JPG, PNG, GIF, WebP</li>
                <li>• Image will be automatically optimized after upload</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setShowUploadDialog(false);
                if (!isUploading) {
                  handleRemoveFile();
                }
              }}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Ad
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
