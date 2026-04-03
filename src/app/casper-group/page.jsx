"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "casper_group", name: "Casper Group", icon: "C", color: "#E74C3C",
    brandKeys: ["casper_group","angel_wings","espresso_co","morning_after","mojo_juice","mr_oyster","sweet_tooth"],
  }} />;
}
