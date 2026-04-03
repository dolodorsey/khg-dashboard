"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "umbrella", name: "Umbrella Group", icon: "U", color: "#3498DB",
    brandKeys: ["umbrella_injury","brand_studio","mind_studio"],
  }} />;
}
