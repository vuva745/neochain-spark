import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { AnalyticsTab } from "@/components/tabs/AnalyticsTab";
import { ControlTab } from "@/components/tabs/ControlTab";
import { RewardsTab } from "@/components/tabs/RewardsTab";
import { PaymentsTab } from "@/components/tabs/PaymentsTab";
import { AITab } from "@/components/tabs/AITab";
import { MonitorTab } from "@/components/tabs/MonitorTab";
import { EscrowTab } from "@/components/tabs/EscrowTab";
import { AuditTab } from "@/components/tabs/AuditTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "control":
        return <ControlTab />;
      case "rewards":
        return <RewardsTab />;
      case "payments":
        return <PaymentsTab />;
      case "ai":
        return <AITab />;
      case "monitor":
        return <MonitorTab />;
      case "escrow":
        return <EscrowTab />;
      case "audit":
        return <AuditTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTab()}
    </DashboardLayout>
  );
};

export default Index;
