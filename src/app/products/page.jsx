"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "products", name: "Products / Bodega", subtitle: "MAGA · Stush · Infinity · Pronto", color: "#6B8E23",
    brandKeys: ["maga","stush","infinity_water","pronto_energy"],
    extraTables: [],
    extraNav: [],
  }} />;
}
