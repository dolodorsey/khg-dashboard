"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "forever_futbol", name: "Forever Futbol", subtitle: "Soccer Museum · ATL · May 29–Jul 6", color: "#2E8B57",
    brandKeys: ["forever_futbol"],
    extraTables: [{key:"grants",table:"khg_grant_tracker",query:"select=*&order=deadline.asc.nullslast&limit=30"}],
    extraNav: [{id:"grants",label:"Grants",sec:"Data"}],
  }} />;
}
