"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "products", name: "Products / Bodega", icon: "P", color: "#84CC16",
    brandKeys: ["maga","stush","infinity_water","pronto_energy"],
  }} />;
}
