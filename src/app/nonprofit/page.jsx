"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "nonprofit", name: "Non-Profit", icon: "N", color: "#059669",
    brandKeys: [],
  }} />;
}
