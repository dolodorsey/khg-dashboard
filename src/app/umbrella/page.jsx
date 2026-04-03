"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "umbrella", name: "Umbrella Group", subtitle: "Brand Studio · Mind Studio · Services", color: "#3A7BBF",
    brandKeys: ["umbrella_injury","brand_studio","mind_studio","umbrella_group"],
    extraTables: [{key:"ms_leads",table:"mind_studio_outreach",query:"select=*&order=created_at.desc&limit=50"}],
    extraNav: [{id:"ms_leads",label:"Mind Studio Leads",sec:"Data"}],
  }} />;
}
