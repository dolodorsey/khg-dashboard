"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "casper_group", name: "Casper Group", subtitle: "Food & Beverage Division", color: "#C45B4A",
    brandKeys: ["casper_group","angel_wings","espresso_co","morning_after","mojo_juice","mr_oyster","sweet_tooth"],
    extraTables: [
      {key:"prospects",table:"casper_venue_prospects",query:"select=*&order=venue_name&limit=100"},
      {key:"packages",table:"casper_packages",query:"select=*&is_active=eq.true&order=tier"},
    ],
    extraNav: [{id:"prospects",label:"Venue Prospects",sec:"Data"},{id:"packages",label:"Packages",sec:"Data"}],
  }} />;
}
