import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, Loader2, Network, MessageSquare, Send, Activity, FileText, Download, Clock, TrendingDown, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadText } from "@/utils/download";

export function MonitorTab() {
  const { toast } = useToast();
  const [showTechSupportDialog, setShowTechSupportDialog] = useState(false);
  const [showManageIntegrationsDialog, setShowManageIntegrationsDialog] = useState(false);
  const [showRootCauseDialog, setShowRootCauseDialog] = useState(false);
  const [isSubmittingSupport, setIsSubmittingSupport] = useState(false);
  const [rootCauseScrollRef, setRootCauseScrollRef] = useState<HTMLDivElement | null>(null);
  const [techSupportScrollRef, setTechSupportScrollRef] = useState<HTMLDivElement | null>(null);
  const [supportForm, setSupportForm] = useState({
    subject: "",
    description: "",
    priority: "medium",
    contactMethod: "email",
  });

  const [errorLogs] = useState([
    { time: "16:59:48", message: "Sync valid complete" },
    { time: "14:39:47", message: "Sync status: succeded" },
    { time: "09:18", message: "Block sync delayed" },
  ]);

  const detailedLogs = [
    { time: "16:3959", message: "sync valid" },
    { time: "16:29:17", message: "sync status confelete" },
    { time: "16:39:28", message: "low block propagation delay" },
  ];

  const integrations = [
    { name: "API Gateway", status: "Online", latency: "12ms", lastSync: "2 min ago" },
    { name: "AEI Sentinel", status: "Online", latency: "8ms", lastSync: "1 min ago" },
    { name: "M-Pesa API", status: "Online", latency: "24ms", lastSync: "3 min ago" },
    { name: "Blockchain Node", status: "Online", latency: "45ms", lastSync: "5 min ago" },
  ];

  const handleRequestTechSupport = () => {
    setShowTechSupportDialog(true);
  };

  const handleSubmitTechSupport = async () => {
    if (!supportForm.subject || !supportForm.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in both subject and description fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingSupport(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmittingSupport(false);

    toast({
      title: "Support Request Submitted",
      description: `Your ${supportForm.priority} priority support request has been submitted. Ticket ID: #${Date.now().toString().slice(-6)}`,
    });

    setShowTechSupportDialog(false);
    setSupportForm({
      subject: "",
      description: "",
      priority: "medium",
      contactMethod: "email",
    });
  };

  const handleExportLogs = () => {
    const logContent = [
      "=== SYSTEM MONITOR LOGS ===",
      `Export Date: ${new Date().toISOString()}`,
      "\n=== SYSTEM STATUS ===",
      "API: Online",
      "AEI Sentinel: Online",
      "M-Pesa: Online",
      "Blockchain: Online",
      "\n=== SERVER UPTIME ===",
      "Uptime: 99.98%",
      "Status: OPERATIONAL",
      "\n=== ERROR LOGS ===",
      ...errorLogs.map((log) => `[${log.time}] ${log.message}`),
      "\n=== DETAILED LOGS ===",
      ...detailedLogs.map((log) => `[${log.time}] ${log.message}`),
      "\n=== SPONSORS AFFECTED ===",
      "Coca-Cola",
      "Safaricom",
      "Equity",
      "\n=== DIAGNOSTIC SCAN SUM ===",
      "API: ok",
      "AEI Link: active",
      "M-Pesa: healthy",
    ].join("\n");

    try {
      downloadText(logContent, `system-logs-${Date.now()}.txt`, "text/plain");
      toast({
        title: "Export Complete",
        description: "System logs have been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting logs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewRootCause = () => {
    setShowRootCauseDialog(true);
  };

  return (
    <div className="h-full overflow-auto space-y-3">
      <h1 className="text-2xl font-bold text-primary">NeoCard™ System Monitor</h1>

      <div className="grid gap-3 lg:grid-cols-3">
        {/* System Status */}
        <Card className="border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold text-primary">SYSTEM STATUS</h3>
          <div className="space-y-3">
            {[
              { name: "API", status: "Online" },
              { name: "AEI Sentinel", status: "Online" },
              { name: "M-Pesa", status: "Online" },
              { name: "Blockchain", status: "Online" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-foreground">{item.name}</span>
                <span className="font-medium text-success flex items-center gap-2">
                  {item.status}
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <h4 className="mb-2 text-xs font-semibold text-primary">ERROR LOG</h4>
            <div className="space-y-1">
              {errorLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <AlertTriangle className="h-3 w-3 flex-shrink-0 text-warning" />
                  <div>
                    <span className="font-mono text-muted-foreground">{log.time}</span>
                    <span className="ml-2 text-foreground">{log.message}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 space-y-0.5 text-[10px] text-muted-foreground">
              {detailedLogs.map((log, i) => (
                <div key={i}>
                  <span className="font-mono">{log.time}</span> {log.message}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <h4 className="text-xs font-semibold text-primary">AEI SENTINEL</h4>
          </div>
        </Card>

        {/* Server Uptime */}
        <Card className="border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold text-primary">SERVER UPTIME</h3>
          
          <div className="mb-3 flex items-center justify-center">
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
                  style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))' }}
                  strokeWidth="6"
                  strokeDasharray="251.2"
                  strokeDashoffset="0.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-warning leading-tight golden-text-glow">99.98%</span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">OPERATIONAL</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm font-medium text-foreground">System stable –</p>
            <p className="text-sm text-muted-foreground">all nodes synced</p>
          </div>

          <div className="mt-6">
            <h4 className="mb-4 text-sm font-semibold text-primary">24 h SYSTEM HEALTH</h4>
            
            <div className="space-y-4">
              {/* Simple line graph representation */}
              <div className="relative h-24">
                <svg className="h-full w-full" viewBox="0 0 200 80">
                  <path
                    d="M 0 60 Q 20 50 40 45 T 80 40 T 120 35 T 160 30 T 200 25"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0 65 Q 20 55 40 50 T 80 45 T 120 40 T 160 35 T 200 30"
                    fill="none"
                    stroke="hsl(var(--warning))"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))' }}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>CPU</div>
                <div>API latency</div>
                <div>Blockchain</div>
                <div>Sync</div>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>6</span>
              <span>4</span>
              <span>8h</span>
              <span>24h</span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <p className="text-xs font-medium text-success">ALL SYSTEMS OPERATIONAL</p>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            className="mt-3 w-full border-primary text-primary hover:bg-primary/10"
            onClick={() => setShowManageIntegrationsDialog(true)}
          >
            <Network className="mr-2 h-4 w-4" />
            Manage Integrations
          </Button>
        </Card>

        {/* Auto-Incident Reporter */}
        <Card className="border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold text-primary">AUTO-INCIDENT REPORTER</h3>
          
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 p-2 golden-border-glow golden-bg-glow">
            <AlertTriangle className="h-5 w-5 text-warning golden-icon-glow" />
            <div>
              <p className="text-sm font-bold text-warning golden-text-glow">2 warnings detected</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            className="mb-3 w-full border-primary text-primary hover:bg-primary/10"
            onClick={handleViewRootCause}
          >
            View Root Cause Report
          </Button>

          <div className="mb-3">
            <h4 className="mb-2 text-xs font-semibold text-warning golden-text-glow">SPONSORS AFFECTED</h4>
            <div className="space-y-1">
              {["Coca-Cola", "Safaricom", "Equity"].map((sponsor) => (
                <div key={sponsor} className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-warning golden-icon-glow" />
                  <span className="text-xs text-foreground">{sponsor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <h4 className="mb-2 text-xs font-semibold text-primary">DIAGNOSTIC SCAN SUM</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-success" />
                <span className="text-xs text-muted-foreground">API: ok</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-success" />
                <span className="text-xs text-muted-foreground">AEI Link: active</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-success" />
                <span className="text-xs text-muted-foreground">M-Pesa: healthy</span>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            className="mb-2 w-full border-border text-foreground hover:bg-muted"
            onClick={handleRequestTechSupport}
          >
            REQUEST TECH SUPPORT
          </Button>

          <div className="flex justify-end">
            <Button 
              variant="link" 
              size="sm"
              className="text-[10px] text-muted-foreground"
              onClick={handleExportLogs}
            >
              EXPORT LOGS
            </Button>
          </div>
        </Card>
      </div>

      {/* Request Tech Support Dialog */}
      <Dialog open={showTechSupportDialog} onOpenChange={setShowTechSupportDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Request Tech Support
            </DialogTitle>
            <DialogDescription>
              Submit a support request for technical assistance
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative flex-1 overflow-hidden">
            <div 
              ref={setTechSupportScrollRef}
              className="space-y-4 py-4 overflow-y-auto max-h-[60vh] pr-2 scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
            {/* Priority Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority <span className="text-destructive">*</span></Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={supportForm.priority === "low" ? "default" : "outline"}
                  className={supportForm.priority === "low" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setSupportForm({ ...supportForm, priority: "low" })}
                  size="sm"
                >
                  Low
                </Button>
                <Button
                  variant={supportForm.priority === "medium" ? "default" : "outline"}
                  className={supportForm.priority === "medium" ? "bg-warning text-warning-foreground" : ""}
                  onClick={() => setSupportForm({ ...supportForm, priority: "medium" })}
                  size="sm"
                >
                  Medium
                </Button>
                <Button
                  variant={supportForm.priority === "high" ? "default" : "outline"}
                  className={supportForm.priority === "high" ? "bg-destructive text-destructive-foreground" : ""}
                  onClick={() => setSupportForm({ ...supportForm, priority: "high" })}
                  size="sm"
                >
                  High
                </Button>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Brief description of the issue"
                value={supportForm.subject}
                onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <textarea
                id="description"
                rows={6}
                className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Please provide detailed information about the issue, including error messages, steps to reproduce, and any relevant system information..."
                value={supportForm.description}
                onChange={(e) => setSupportForm({ ...supportForm, description: e.target.value })}
              />
            </div>

            {/* Contact Method */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Preferred Contact Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={supportForm.contactMethod === "email" ? "default" : "outline"}
                  className={supportForm.contactMethod === "email" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setSupportForm({ ...supportForm, contactMethod: "email" })}
                  size="sm"
                >
                  Email
                </Button>
                <Button
                  variant={supportForm.contactMethod === "phone" ? "default" : "outline"}
                  className={supportForm.contactMethod === "phone" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setSupportForm({ ...supportForm, contactMethod: "phone" })}
                  size="sm"
                >
                  Phone
                </Button>
              </div>
            </div>

            {/* System Information */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">System Information</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>System Status:</span>
                  <span className="text-success">All Operational</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="text-foreground">99.98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Warnings:</span>
                  <span className="text-warning">2 detected</span>
                </div>
                <div className="flex justify-between">
                  <span>Sponsors Affected:</span>
                  <span className="text-foreground">3</span>
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
                  if (techSupportScrollRef) {
                    techSupportScrollRef.scrollBy({
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

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setShowTechSupportDialog(false);
                setSupportForm({
                  subject: "",
                  description: "",
                  priority: "medium",
                  contactMethod: "email",
                });
              }}
              disabled={isSubmittingSupport}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={handleSubmitTechSupport}
              disabled={isSubmittingSupport}
            >
              {isSubmittingSupport ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Integrations Dialog */}
      <Dialog open={showManageIntegrationsDialog} onOpenChange={setShowManageIntegrationsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Manage System Integrations
            </DialogTitle>
            <DialogDescription>
              Monitor and configure system integrations
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 p-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${integration.status === "Online" ? "bg-success" : "bg-warning"} animate-pulse`} />
                  <div>
                    <p className="font-semibold text-foreground">{integration.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">Latency: {integration.latency}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${integration.status === "Online" ? "text-success" : "text-warning"}`}>
                    {integration.status}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted"
                    onClick={() => {
                      toast({
                        title: `${integration.name} Configuration`,
                        description: `Opening configuration panel for ${integration.name}...`,
                      });
                    }}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            ))}

            {/* Integration Summary */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Integration Summary</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Integrations:</span>
                  <span className="font-medium text-foreground">{integrations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Online:</span>
                  <span className="font-medium text-success">{integrations.filter(i => i.status === "Online").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Latency:</span>
                  <span className="font-medium text-foreground">22ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Health Status:</span>
                  <span className="font-medium text-success">Healthy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowManageIntegrationsDialog(false)}
            >
              Close
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={() => {
                toast({
                  title: "Refresh Initiated",
                  description: "Refreshing all integration connections...",
                });
              }}
            >
              <Activity className="mr-2 h-4 w-4" />
              Refresh All
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Root Cause Report Dialog */}
      <Dialog open={showRootCauseDialog} onOpenChange={setShowRootCauseDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Root Cause Analysis Report
            </DialogTitle>
            <DialogDescription>
              Detailed analysis of detected incidents and their root causes
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative flex-1 overflow-hidden">
            <div 
              ref={setRootCauseScrollRef}
              className="flex-1 overflow-y-auto space-y-4 py-4 pr-2 scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
            {/* Report Summary */}
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <h3 className="text-sm font-semibold text-foreground">Incident Summary</h3>
                </div>
                <span className="rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning">
                  2 Warnings Detected
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Report Generated:</span>
                  <p className="font-medium text-foreground">{new Date().toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Analysis Status:</span>
                  <p className="font-medium text-success">Complete</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Severity:</span>
                  <p className="font-medium text-warning">Medium</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Affected Systems:</span>
                  <p className="font-medium text-foreground">3</p>
                </div>
              </div>
            </div>

            {/* Root Causes */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Root Causes Identified</h3>
              
              {/* Root Cause 1 */}
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-warning mt-1" />
                    <h4 className="text-sm font-semibold text-foreground">Network Latency Spike</h4>
                  </div>
                  <span className="text-xs font-medium text-warning">Primary</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Detected increased latency in Asia-Pacific node (Node 3) causing delayed synchronization 
                  across blockchain network. Peak latency reached 180ms during incident window.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="font-medium text-foreground">High - Affected 3 sponsors</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resolution:</span>
                    <span className="font-medium text-success">Auto-resolved via failover</span>
                  </div>
                </div>
              </div>

              {/* Root Cause 2 */}
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-warning mt-1" />
                    <h4 className="text-sm font-semibold text-foreground">SAP API Degradation</h4>
                  </div>
                  <span className="text-xs font-medium text-warning">Secondary</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  SAP integration experienced degraded performance with latency increasing to 180ms. 
                  This affected data synchronization for reward processing.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="font-medium text-foreground">Medium - Delayed reward processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resolution:</span>
                    <span className="font-medium text-success">Connection restored</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Affected Sponsors */}
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Affected Sponsors</h3>
              <div className="space-y-2">
                {["Coca-Cola", "Safaricom", "Equity"].map((sponsor) => (
                  <div key={sponsor} className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-warning golden-icon-glow" />
                      <span className="text-sm font-medium text-foreground">{sponsor}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">Impact: Low</span>
                      <span className="text-success">Resolved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Incident Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-warning mt-1" />
                    <div className="h-8 w-px bg-border mt-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">16:45:23 - Incident Detected</p>
                    <p className="text-xs text-muted-foreground">Network latency spike detected in Node 3</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-warning mt-1" />
                    <div className="h-8 w-px bg-border mt-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">16:47:15 - SAP API Degradation</p>
                    <p className="text-xs text-muted-foreground">SAP integration latency increased to 180ms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-success mt-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">17:15:42 - Auto-Resolution</p>
                    <p className="text-xs text-muted-foreground">Failover activated, all systems restored</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Recommendations</h3>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                  <span>Implement additional failover nodes in Asia-Pacific region</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                  <span>Monitor SAP API connection health more frequently</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                  <span>Set up automated alerts for latency thresholds above 150ms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                  <span>Review and optimize network routing to Japan node</span>
                </li>
              </ul>
            </div>

            {/* System Status */}
            <div className="rounded-lg border border-success/30 bg-success/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <h3 className="text-sm font-semibold text-foreground">Current System Status</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API:</span>
                  <span className="font-medium text-success">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AEI Link:</span>
                  <span className="font-medium text-success">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">M-Pesa:</span>
                  <span className="font-medium text-success">Healthy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">All Systems:</span>
                  <span className="font-medium text-success">Operational</span>
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
                  if (rootCauseScrollRef) {
                    rootCauseScrollRef.scrollBy({
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

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                const reportData = {
                  reportGenerated: new Date().toISOString(),
                  incidents: 2,
                  affectedSponsors: ["Coca-Cola", "Safaricom", "Equity"],
                  rootCauses: [
                    {
                      title: "Network Latency Spike",
                      impact: "High",
                      duration: "45 minutes",
                      resolution: "Auto-resolved via failover"
                    },
                    {
                      title: "SAP API Degradation",
                      impact: "Medium",
                      duration: "30 minutes",
                      resolution: "Connection restored"
                    }
                  ],
                  recommendations: [
                    "Implement additional failover nodes in Asia-Pacific region",
                    "Monitor SAP API connection health more frequently",
                    "Set up automated alerts for latency thresholds above 150ms",
                    "Review and optimize network routing to Japan node"
                  ]
                };
                downloadText(JSON.stringify(reportData, null, 2), `root-cause-report-${Date.now()}.json`, "application/json");
                toast({
                  title: "Report Exported",
                  description: "Root cause analysis report has been downloaded.",
                });
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRootCauseDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
