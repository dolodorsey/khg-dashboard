"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Contacts() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      q("dolo_directory", "select=id,first_name,last_name,email,phone,ig_handle,city,category,rolodex_tab&order=last_name&limit=200"),
      q("dolo_vip_circle", "select=*&order=name&limit=50"),
      q("engagement_seed_targets", "select=ig_handle,city,segment_type,brand_key&limit=100"),
    ]).then(([dir, vip, seeds]) => {
      setD({ directory: dir||[], vip: vip||[], seeds: seeds||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING CONTACTS..." />;
  const { directory, vip, seeds } = d;

  const byTab = {};
  directory.forEach(c => { const t = c.rolodex_tab||"uncategorized"; byTab[t] = (byTab[t]||0)+1; });
  const tabs = Object.entries(byTab).sort((a,b) => b[1]-a[1]);

  const byCity = {};
  directory.forEach(c => { const ct = c.city||"Unknown"; byCity[ct] = (byCity[ct]||0)+1; });
  const topCities = Object.entries(byCity).sort((a,b) => b[1]-a[1]).slice(0,10);

  const filtered = search ? directory.filter(c =>
    [c.first_name, c.last_name, c.email, c.ig_handle, c.city].some(f => f && f.toLowerCase().includes(search.toLowerCase()))
  ) : directory;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Database / Contacts" icon="👥" sub="2,143+ contacts — directory, VIP circle, CRM management" color="#3B82F6" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <Card title="Dolo Directory" value={"2,147"} sub="total contacts" color="#3B82F6" />
          <Card title="VIP Circle" value={vip.length} sub="inner circle" color="#C9A96E" />
          <Card title="IG Seed Targets" value={seeds.length} sub="engagement seeds" color="#8B5CF6" />
          <Card title="Rolodex Tabs" value={tabs.length} sub="categories" color="#22C55E" />
        </div>

        <div style={{ marginBottom: 24 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." style={{ width: "100%", maxWidth: 400, padding: "10px 16px", background: "#FFFFFF", border: "1px solid #E5E5E7", borderRadius: 8, color: "#111111", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none" }} />
        </div>

        <Section title="Rolodex Tabs" icon="📑">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tabs.map(([tab, count]) => (
              <div key={tab} style={{ background: "#FFFFFF", border: "1px solid #E5E5E7", borderRadius: 20, padding: "6px 16px", fontSize: 11 }}>
                <span style={{ color: "#3B82F6", fontWeight: 700 }}>{count}</span> <span style={{ color: "#888" }}>{tab}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title={search ? `Search Results: "${search}"` : "Recent Contacts"} icon="📋" count={`${filtered.length} SHOWING`}>
          <Table headers={["Name","Email","Phone","IG","City","Tab"]} rows={filtered.slice(0,30).map(c => [
            `${c.first_name||""} ${c.last_name||""}`.trim() || "—",
            c.email||"—", c.phone||"—", c.ig_handle||"—", c.city||"—",
            <Badge key="t" text={c.rolodex_tab||"—"} color="#3B82F6" />
          ])} />
        </Section>

        <Section title="Top Cities" icon="🌆">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {topCities.map(([city, count]) => (
              <div key={city} style={{ background: "#FFFFFF", border: "1px solid #E5E5E7", borderRadius: 20, padding: "6px 16px", fontSize: 11 }}>
                <span style={{ color: "#22C55E", fontWeight: 700 }}>{count}</span> <span style={{ color: "#888" }}>{city}</span>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ background: "#FFFFFF", border: "1px solid #EF444433", borderRadius: 8, padding: 20, marginTop: 16 }}>
          <div style={{ fontSize: 10, color: "#EF4444", letterSpacing: 3, fontFamily: "'DM Mono',monospace", marginBottom: 12 }}>CONTACT RULES</div>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
            <div>🚫 NEVER auto-merge multiple phones/emails — list all matches, ask Dr. Dorsey which is correct</div>
            <div>🗑️ Delete incorrect entries only after Dr. Dorsey confirms</div>
            <div>📱 Never share watcher_7005 (Dr. Dorsey's personal line)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
