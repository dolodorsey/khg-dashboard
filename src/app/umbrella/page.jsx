"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "umbrella", name: "Umbrella Group", icon: "U", color: "#3498DB",
    brandKeys: ["umbrella_injury","brand_studio","mind_studio"],
    extraTables: { ms_outreach: { table: "mind_studio_outreach", select: "*", order: "created_at.desc", limit: 50 } },
    extraNav: [{ id: "ms_outreach", label: "Mind Studio Leads", icon: "M12 2a10 10 0 100 20 10 10 0 000-20z M12 6a6 6 0 100 12 6 6 0 000-12z M12 10a2 2 0 100 4 2 2 0 000-4z" }],
  }} />;
}
