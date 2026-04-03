"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "casper_group", name: "Casper Group", icon: "C", color: "#E74C3C",
    brandKeys: ["casper_group","angel_wings","espresso_co","morning_after","mojo_juice","mr_oyster","sweet_tooth"],
    extraTables: { prospects: { table: "casper_venue_prospects", select: "*", order: "venue_name", limit: 100 } },
    extraNav: [{ id: "prospects", label: "Venue Prospects", icon: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" }],
  }} />;
}
