"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "apps", name: "Apps", icon: "A", color: "#7C3AED",
    brandKeys: ["good_times","sos"],
  }} />;
}
