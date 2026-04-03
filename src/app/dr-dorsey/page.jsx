"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "dr_dorsey", name: "Dr. Dorsey", icon: "D", color: "#C9A96E",
    brandKeys: ["dr_dorsey"],
  }} />;
}
