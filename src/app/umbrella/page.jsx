"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Umbrella() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("pi_firms_master", "select=firm_name,city,state,email,phone,status&order=firm_name&limit=100"),
      q("contact_action_queue", "select=brand_key,action_type,status&brand_key=eq.umbrella_injury&limit=200"),
      q("brand_asset_files", "select=*&entity_id=eq.umbrella_injury"),
      q("khg_master_tasks", "select=*&category=eq.umbrella&status=not.eq.done&order=due_date"),
    ]).then(([pi, eng, assets, tasks]) => {
      setD({ pi: pi||[], engagement: eng||[], assets: assets||[], tasks: tasks||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING UMBRELLA GROUP..." />;
  const { pi, engagement, assets, tasks } = d;

  const brands = [
    { name: "Brand Studio", icon: "🎨", desc: "Creative agency — $500K/month branding budget play for PI firms", color: "#C9A96E", metric: `${pi.length} PI firm targets` },
    { name: "Auto Exchange", icon: "🚗", desc: "Automotive services & fleet management", color: "#3B82F6", metric: "Operations" },
    { name: "Clean", icon: "🧹", desc: "Commercial & residential cleaning services", color: "#22C55E", metric: "Service delivery" },
    { name: "Realty", icon: "🏠", desc: "Real estate investment & property management", color: "#F59E0B", metric: "Portfolio tracking" },
    { name: "Injury Network", icon: "⚖️", desc: "Personal injury referral network", color: "#EF4444", metric: `${pi.filter(p=>p.email).length} firms with emails` },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Umbrella Group" icon="☂️" sub="Brand Studio · Auto Exchange · Clean · Realty · Injury Network" color="#C9A96E" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="PI Firms" value={pi.length} sub={`${pi.filter(p=>p.email).length} with email`} color="#EF4444" />
          <Card title="Sub-Brands" value={5} color="#C9A96E" />
          <Card title="Engagement Queue" value={engagement.length} color="#3B82F6" />
          <Card title="Brand Assets" value={assets.length} color="#F59E0B" />
          <Card title="Open Tasks" value={tasks.length} color="#8B5CF6" />
        </div>

        <Section title="Umbrella Sub-Brands" icon="☂️">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
            {brands.map(b => (
              <div key={b.name} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <span style={{ fontSize:20 }}>{b.icon}</span>
                  <span style={{ fontSize:14, fontWeight:700 }}>{b.name}</span>
                </div>
                <div style={{ fontSize:12, color:"#888", marginBottom:8 }}>{b.desc}</div>
                <Badge text={b.metric} color={b.color} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="PI Firms — Brand Studio Pipeline" icon="⚖️" count={`${pi.length} FIRMS`}>
          <Table headers={["Firm","City","State","Email","Status"]} rows={pi.slice(0,20).map(p => [
            p.firm_name||"—", p.city||"—", p.state||"—",
            p.email||<Badge key="e" text="needs enrichment" color="#EF4444" />,
            <Badge key="s" text={p.status||"prospect"} color="#555" />
          ])} />
        </Section>
      </div>
    </div>
  );
}
