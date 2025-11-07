import { Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Sponsor Dashboard v4" },
  { id: "analytics", label: "FOMO G Campaign Performance Analytics v4" },
  { id: "control", label: "Campaign Control Center v5.3" },
  { id: "rewards", label: "Reward & M-Pesa Distribution" },
  { id: "payments", label: "Financial & License Management" },
  { id: "ai", label: "AI Sentinel & Optimization" },
  { id: "monitor", label: "System Monitor" },
  { id: "escrow", label: "Escrow Payment Ledger" },
  { id: "audit", label: "Proof & Audit Monitor" },
];

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image - using direct path */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/backgrounds/ChatGPT Image Nov 6, 2025, 02_58_28 PM.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Very light overlay for readability */}
      <div className="fixed inset-0 -z-10 bg-black/10" />
      
      <div className="relative z-10">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <Hexagon className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">EQUITY</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">LIVE ON</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-success">NoC verified</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation and Content */}
      <div className="flex border-b border-border bg-card/40 backdrop-blur-md">
        <div className="w-64 border-r border-border bg-card/30 backdrop-blur-md p-4">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full text-left border-l-4 px-4 py-3 text-sm font-medium transition-colors rounded-r-md",
                  activeTab === tab.id
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <main className="flex-1 p-4 overflow-hidden">{children}</main>
      </div>
      </div>
    </div>
  );
}
