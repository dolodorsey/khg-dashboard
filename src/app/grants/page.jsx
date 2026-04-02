"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Grants() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("khg_grant_tracker", "select=*&order=deadline"),
      q("khg_grant_pipeline", "select=*&order=created_at.desc"),
    ]).then(([grants, pipeline]) => {
      setD({ grants: grants||[], pipeline: pipeline||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING GRANTS..." />;
  const { grants, pipeline } = d;
  const totalPotential = grants.reduce((s, g) => s + (parseFloat(g.amount||0)||0), 0);
  const submitted = grants.filter(g => g.status === "submitted" || g.status === "applied");
  const upcoming = grants.filter(g => g.deadline && new Date(g.deadline) > new Date()).sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
  const overdue = grants.filter(g => g.deadline && new Date(g.deadline) < new Date() && !["submitted","applied","awarded","rejected"].includes(g.status));

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Grants" icon="💰" sub="Grant tracker, deadlines, applications — 3-5 apps per entity per day" color="#22C55E" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Total Grants" value={grants.length} color="#22C55E" />
          <Card title="Potential Funding" value={`$${(totalPotential/1000).toFixed(0)}K`} color="#C9A96E" />
          <Card title="Submitted" value={submitted.length} sub={submitted.length === 0 ? "NONE YET" : ""} color={submitted.length > 0 ? "#22C55E" : "#EF4444"} />
          <Card title="Upcoming Deadlines" value={upcoming.length} color="#3B82F6" />
          <Card title="Overdue" value={overdue.length} color={overdue.length > 0 ? "#EF4444" : "#22C55E"} />
        </div>

        {overdue.length > 0 && <Section title="OVERDUE — Apply NOW" icon="🚨" count={overdue.length}>
          <Table headers={["Grant","Amount","Deadline","Entities","Status"]} rows={overdue.map(g => [
            g.grant_name||"—", g.amount ? `$${Number(g.amount).toLocaleString()}` : "—",
            <span key="d" style={{ color: "#EF4444", fontWeight: 700 }}>{g.deadline ? new Date(g.deadline).toLocaleDateString() : "—"}</span>,
            g.entity_ids||g.eligible_entities||"—",
            <Badge key="s" text={g.status||"not started"} color="#EF4444" />
          ])} />
        </Section>}

        <Section title="All Grants" icon="📋" count={`${grants.length} TRACKED`}>
          <Table headers={["Grant","Amount","Deadline","Entities","Source","Status"]} rows={grants.map(g => [
            g.grant_name||"—", g.amount ? `$${Number(g.amount).toLocaleString()}` : "—",
            g.deadline ? new Date(g.deadline).toLocaleDateString() : "—",
            g.entity_ids||g.eligible_entities||"—",
            g.source||"—",
            <Badge key="s" text={g.status||"not started"} color={g.status==="submitted"?"#22C55E":g.status==="awarded"?"#C9A96E":g.status==="rejected"?"#EF4444":"#555"} />
          ])} />
        </Section>

        <div style={{ background:"#0D0D0B", border:"1px solid #22C55E33", borderRadius:8, padding:20, marginTop:16 }}>
          <div style={{ fontSize:10, color:"#22C55E", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>TOP PRIORITY GRANTS</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12, fontSize:12, color:"#888" }}>
            <div>🏆 Invest Atlanta SBIG — $50,000</div>
            <div>📡 Comcast RISE — $10,000 (easiest app)</div>
            <div>📦 FedEx Small Business — $10,000</div>
            <div>🏛️ NEA Museums — $100,000 (Jul 9 deadline)</div>
            <div>📋 Register ALL entities on Grants.gov + SAM.gov</div>
            <div>🎯 Target: 3-5 applications per entity per day</div>
          </div>
        </div>
      </div>
    </div>
  );
}
