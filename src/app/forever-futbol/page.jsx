"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "forever_futbol", name: "Forever Futbol", icon: "F", color: "#2E8B57",
    brandKeys: ["forever_futbol"],
  }} />;
}
