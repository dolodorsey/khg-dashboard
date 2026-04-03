"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "apps", name: "Apps", icon: "A", color: "#7C3AED",
    brandKeys: ["good_times","sos"],
    extraTables: { venues: { table: "gt_venues", select: "id,venue_name,city,subcategory,rating,google_maps_url", order: "venue_name", limit: 100 } },
    extraNav: [{ id: "venues", label: "GT Venues", icon: "M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" }],
  }} />;
}
