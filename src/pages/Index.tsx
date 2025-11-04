import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { AnalyticsTab } from "@/components/tabs/AnalyticsTab";
import { ControlTab } from "@/components/tabs/ControlTab";
import { AuditTab } from "@/components/tabs/AuditTab";
import { EscrowTab } from "@/components/tabs/EscrowTab";
import { MonitorTab } from "@/components/tabs/MonitorTab";

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
      case "audit":
        return <AuditTab />;
      case "escrow":
        return <EscrowTab />;
      case "monitor":
        return <MonitorTab />;
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
