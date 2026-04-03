"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Ambassador() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    Promise.all([
      q("khg_ambassadors", "select=*&order=created_at.desc&limit=500"),
      q("khg_ambassador_programs", "select=*&order=program_name"),
      q("khg_ambassador_deliverables", "select=*&order=created_at.desc&limit=100"),
      q("khg_outreach_queue", "select=*&campaign=ilike.*ambassador*&limit=200"),
      q("khg_form_configs", "select=*&form_type=eq.ambassador"),
    ]).then(([amb, programs, deliverables, outreach, forms]) => {
      setD({ ambassadors: amb||[], programs: programs||[], deliverables: deliverables||[], outreach: outreach||[], forms: forms||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING AMBASSADORS..." />;
  const { ambassadors, programs, deliverables, outreach, forms } = d;

  const byStatus = {};
  ambassadors.forEach(a => { const s = a.status||"pending"; byStatus[s] = (byStatus[s]||0)+1; });
  const byTier = {};
  ambassadors.forEach(a => { const t = a.tier||"standard"; byTier[t] = (byTier[t]||0)+1; });
  const byBrand = {};
  ambassadors.forEach(a => { const b = a.brand_key||"general"; byBrand[b] = (byBrand[b]||0)+1; });

  const filtered = tab === "all" ? ambassadors :
    tab === "active" ? ambassadors.filter(a => a.status === "active") :
    tab === "pending" ? ambassadors.filter(a => a.status === "pending") :
    ambassadors.filter(a => a.tier === tab);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Ambassadors" icon="⭐" sub="Recruit, onboard, manage, scale — 4 programs, 8 role types" color="#C9A96E" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Total Ambassadors" value={ambassadors.length} color="#C9A96E" />
          <Card title="Active" value={byStatus.active||0} color="#22C55E" />
          <Card title="Pending" value={byStatus.pending||0} color="#F59E0B" />
          <Card title="Programs" value={programs.length} color="#8B5CF6" />
          <Card title="Deliverables" value={deliverables.length} sub="tracked" color="#3B82F6" />
          <Card title="Outreach Queue" value={outreach.length} sub="ambassador campaigns" color="#EC4899" />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {["all","active","pending","gold","silver","bronze","standard"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 10, fontWeight: 600, border: tab === t ? "1px solid #C9A96E" : "1px solid #E5E5E7", background: tab === t ? "#C9A96E18" : "transparent", color: tab === t ? "#C9A96E" : "#666", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>{t}</button>
          ))}
        </div>

        <Section title="Ambassadors" icon="👥" count={`${filtered.length} SHOWING`}>
          {filtered.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No ambassadors match filter</div> :
          <Table headers={["Name","Brand","Tier","Status","IG","Promo Code","Joined"]} rows={filtered.slice(0,30).map(a => [
            a.name||`${a.first_name||""} ${a.last_name||""}`.trim()||"—",
            a.brand_key?.replace(/_/g," ")||"—",
            <Badge key="t" text={a.tier||"standard"} color={a.tier==="gold"?"#C9A96E":a.tier==="silver"?"#999":a.tier==="bronze"?"#CD7F32":"#555"} />,
            <Badge key="s" text={a.status||"pending"} color={a.status==="active"?"#22C55E":a.status==="pending"?"#F59E0B":"#555"} />,
            a.ig_handle||"—",
            a.promo_code||"—",
            a.created_at ? new Date(a.created_at).toLocaleDateString() : "—"
          ])} />}
        </Section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 32 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E7", borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 10, color: "#C9A96E", letterSpacing: 3, fontFamily: "'DM Mono',monospace", marginBottom: 12 }}>BY STATUS</div>
            {Object.entries(byStatus).map(([status, count]) => (
              <div key={status} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #F5F5F5" }}>
                <span style={{ fontSize: 12, color: "#888" }}>{status}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: status==="active"?"#22C55E":"#F59E0B" }}>{count}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E7", borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 10, color: "#8B5CF6", letterSpacing: 3, fontFamily: "'DM Mono',monospace", marginBottom: 12 }}>BY TIER</div>
            {Object.entries(byTier).map(([tier, count]) => (
              <div key={tier} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #F5F5F5" }}>
                <span style={{ fontSize: 12, color: "#888" }}>{tier}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: tier==="gold"?"#C9A96E":"#888" }}>{count}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E7", borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 10, color: "#3B82F6", letterSpacing: 3, fontFamily: "'DM Mono',monospace", marginBottom: 12 }}>BY BRAND</div>
            {Object.entries(byBrand).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([brand, count]) => (
              <div key={brand} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #F5F5F5" }}>
                <span style={{ fontSize: 12, color: "#888" }}>{brand.replace(/_/g," ")}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#3B82F6" }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <Section title="Ambassador Programs" icon="🏆" count={programs.length}>
          {programs.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No programs in khg_ambassador_programs</div> :
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12 }}>
            {programs.map((p, i) => (
              <div key={i} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:16 }}>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:4 }}>{p.program_name||"—"}</div>
                <div style={{ fontSize:11, color:"#888", marginBottom:8 }}>{p.description||"—"}</div>
                <Badge text={p.status||"active"} color="#22C55E" />
              </div>
            ))}
          </div>}
        </Section>
      </div>
    </div>
  );
}
