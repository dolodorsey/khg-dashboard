"use client";
import EntityDashboard from "../lib/entity-dashboard";
export default function Page() {
  return <EntityDashboard entity={{
    key: "maga", name: "Make Atlanta Great Again", subtitle: "Culture & Commerce", color: "#B22234",
    brandKeys: ["maga"],
    extraTables: [
      {key:"shopify",table:"shopify_products",query:"select=*&limit=100"},
      {key:"influencers",table:"maga_influencer_tracker",query:"select=*&limit=100"},
    ],
    extraNav: [
      {id:"shopify",label:"Shopify Products",sec:"Data"},
      {id:"influencers",label:"Influencer Tracker",sec:"Data"},
    ],
  }} />;
}
