"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "huglife", name: "HugLife + Events", subtitle: "21 Event Brands", color: "#E8652B",
    brandKeys: ["huglife","noir","taste_of_art","paparazzi","gangsta_gospel","sundays_best","wrst_bhvr","remix","pawchella","secret_society","beauty_beast","black_ball","snow_ball","monsters_ball","kulture","soul_sessions","underground_king","crvngs","cinco_de_mayo","block_party","parking_lot_pimpin","kollective","sole_exchange"],
    extraTables: [{key:"ambassadors",table:"khg_ambassadors",query:"select=*&order=created_at.desc&limit=50"}],
    extraNav: [{id:"ambassadors",label:"Ambassadors",sec:"Data"}],
  }} />;
}
