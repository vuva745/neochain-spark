import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info } from "lucide-react";

export function AuditTab() {
  const scanData = [
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100 % Valid" },
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100 % Valid" },
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100 % Valid" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-success" />
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-success">AEI SENTINEL</span> VERIFIED
          </h2>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            <span className="text-xl font-bold text-primary">Proof & Audit Monitor</span>
          </div>
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          Upload Backside Ad
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: NFC Card Visual */}
        <Card className="border-primary/30 bg-card p-6">
          <div className="aspect-[3/4] rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-muted/20 to-card p-8">
            <div className="mb-4 flex items-center justify-end">
              <div className="rounded-full bg-muted px-3 py-1">
                <span className="text-xs font-bold text-foreground">AEI</span>
                <span className="ml-1 text-xs text-muted-foreground">VERIFIED TITLE</span>
              </div>
            </div>

            <div className="mb-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-2xl bg-card p-4">
                  <div className="h-24 w-32 rounded-lg border-2 border-destructive bg-card">
                    <div className="flex h-full items-center justify-center">
                      <span className="text-xl font-bold text-destructive">Safaricom</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 rounded-lg border border-warning/30 bg-warning/5 p-4">
                  <span className="text-2xl">📶</span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-warning">TAP TO VERIFY ON</p>
                    <p className="text-xl font-bold text-primary">NEOCHAIN™</p>
                    <p className="text-xs text-muted-foreground">NEC</p>
                  </div>
                </div>

                <div className="space-y-2 text-center text-xs text-muted-foreground">
                  <p>POWERED BY MPESA- KARDIVERSEE LTD</p>
                  <p>PATENT PROTECTED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-primary/30" />
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">12 Oct</span>
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="flex-1 text-sm text-muted-foreground">12</span>
                  <span className="text-sm text-muted-foreground">20</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Proof Data */}
        <div className="space-y-6">
          {/* Proof Snapshot */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">PROOF SNAPSHOT</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-primary">+883</span>
              <span className="text-xl font-medium text-primary">VALID USD</span>
            </div>
          </Card>

          {/* Escrow Progress */}
          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">ESCROW PROGRESS</h3>
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              AEI_HASH_ca537d...6cd8b4
            </p>
          </Card>

          {/* AEI Sentinel Hash */}
          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <h3 className="text-lg font-semibold text-primary">AEI SENTINEL HASH VERT.</h3>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-mono text-sm text-muted-foreground">
                AEI_ca537d...6cd8b4
              </span>
            </div>
          </Card>

          {/* Media Archive */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">MEDIA ARCHIVE</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
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
                    <div>20 Oct</div>
                    <div>21:45</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Verified Scan Data */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">VERIFIED SCAN DATA</h3>
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
                  <div className="absolute right-1/4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-primary" />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>12 Oct</span>
                <span>20</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              PLAY DRONESHOW PROOF
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary-glow">
              EXPORT AUDIT PACKAGE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
