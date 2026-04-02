"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function CasperGroup() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("casper_venue_prospects", "select=*&order=city&limit=250"),
      q("contact_action_queue", "select=brand_key,action_type,status&brand_key=eq.casper_group&limit=200"),
      q("brand_asset_files", "select=entity_id,asset_type,file_name&entity_id=in.(casper_group,angel_wings,morning_after,mr_oyster,sweet_tooth,mojo_juice,espresso_co,taco_yaki,pasta_bish,tossd,patty_daddy)"),
    ]).then(([prospects, eng, assets]) => {
      setD({ prospects: prospects||[], engagement: eng||[], assets: assets||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING CASPER GROUP..." />;
  const { prospects, engagement, assets } = d;
  const withEmail = prospects.filter(p => p.email);
  const withPhone = prospects.filter(p => p.phone);
  const byCityMap = {};
  prospects.forEach(p => { const c = p.city||"Unknown"; byCityMap[c] = (byCityMap[c]||0)+1; });
  const topCities = Object.entries(byCityMap).sort((a,b) => b[1]-a[1]);

  const subBrands = [
    { name: "Angel Wings", icon: "👼", color: "#F0EDE6" },
    { name: "Tha Morning After", icon: "☀️", color: "#F59E0B" },
    { name: "Patty Daddy", icon: "🍔", color: "#EF4444" },
    { name: "Espresso Co.", icon: "☕", color: "#8B5CF6" },
    { name: "Mojo Juice", icon: "🧃", color: "#22C55E" },
    { name: "Mr. Oyster", icon: "🦪", color: "#3B82F6" },
    { name: "Sweet Tooth", icon: "🍩", color: "#EC4899" },
    { name: "Taco Yaki", icon: "🌮", color: "#F59E0B" },
    { name: "Toss'd", icon: "🥗", color: "#22C55E" },
    { name: "Pasta Bish", icon: "🍝", color: "#EF4444" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Casper Group" icon="🍽️" sub="10 restaurant concepts · 220 venue prospects · 15 cities" color="#C9A96E" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Venue Prospects" value={prospects.length} sub={`${topCities.length} cities`} color="#C9A96E" />
          <Card title="With Email" value={withEmail.length} color="#22C55E" />
          <Card title="With Phone" value={withPhone.length} color="#3B82F6" />
          <Card title="Sub-Brands" value={10} sub="food concepts" color="#F59E0B" />
          <Card title="Brand Assets" value={assets.length} color="#8B5CF6" />
        </div>

        <Section title="10 Restaurant Concepts" icon="🍽️">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
            {subBrands.map(b => (
              <div key={b.name} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: b.color }}>{b.name}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Prospects by City" icon="🌆" count={`${topCities.length} CITIES`}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {topCities.map(([city, count]) => (
              <div key={city} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 20, padding: "6px 16px", fontSize: 11 }}>
                <span style={{ color: "#C9A96E", fontWeight: 700 }}>{count}</span> <span style={{ color: "#888" }}>{city}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Venue Prospects" icon="📋" count={`${prospects.length} TOTAL`}>
          <Table headers={["Venue","City","Contact","Email","Phone","Status"]} rows={prospects.slice(0,20).map(p => [
            p.venue_name||p.name||"—", p.city||"—", p.contact_name||"—",
            p.email||"—", p.phone||"—",
            <Badge key="s" text={p.status||"prospect"} color={p.status==="contacted"?"#3B82F6":p.status==="warm"?"#F59E0B":p.status==="signed"?"#22C55E":"#555"} />
          ])} />
        </Section>

        <div style={{ background:"#0D0D0B", border:"1px solid #C9A96E33", borderRadius:8, padding:20 }}>
          <div style={{ fontSize:10, color:"#C9A96E", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>TEAM & OPS</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:8, fontSize:12, color:"#888" }}>
            <div>👤 Brad — sales lead</div><div>👤 Bax — operations</div><div>👤 Alandra — coordination</div>
            <div>👤 Linda — admin/calls</div><div>👤 Brittany — outreach</div><div>👤 Maia — 12 calls/day weekdays</div>
          </div>
        </div>
      </div>
    </div>
  );
}
