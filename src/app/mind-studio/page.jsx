"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "mind_studio", name: "Mind Studio", subtitle: "Mental Health & Wellness", color: "#5B8C6A",
    brandKeys: ["mind_studio"],
    extraTables: [
      {key:"outreach",table:"mind_studio_outreach",query:"select=*&order=created_at.desc&limit=100"},
      {key:"pipeline",table:"ms_clinic_pipeline",query:"select=*&limit=100"},
    ],
    extraNav: [
      {id:"outreach",label:"MCO Outreach (749)",sec:"Data"},
      {id:"pipeline",label:"Clinic Pipeline",sec:"Data"},
    ],
  }} />;
}
