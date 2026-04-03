"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "apps", name: "Apps", subtitle: "Good Times · SOS · Help 911", color: "#6B3FA0",
    brandKeys: ["good_times","sos","on_call","help_911"],
    extraTables: [
      {key:"gt_venues",table:"gt_venues",query:"select=id,venue_name,city,subcategory,rating,google_maps_url&order=venue_name&limit=100"},
      {key:"gt_events",table:"gt_daily_events",query:"select=*&order=event_date.asc&limit=50"},
    ],
    extraNav: [{id:"gt_venues",label:"GT Venues",sec:"Data"},{id:"gt_events",label:"GT Events",sec:"Data"}],
  }} />;
}
