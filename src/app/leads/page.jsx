"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Leads() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("pi_firms_master", "select=firm_name,city,state,email,phone,status&order=firm_name&limit=100"),
      q("casper_venue_prospects", "select=*&order=city&limit=100"),
      q("mind_studio_outreach", "select=company_name,category,status,contact_email&order=company_name&limit=100"),
      q("engagement_seed_targets", "select=ig_handle,city,segment_type,brand_key&limit=200"),
      q("dolo_directory", "select=id&limit=1", true),
    ]).then(([pi, cp, ms, seeds, dir]) => {
      setD({ pi: pi||[], casper: cp||[], mindStudio: ms||[], seeds: seeds||[], dirCount: 2147 });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING LEAD SOURCING..." />;
  const { pi, casper, mindStudio, seeds, dirCount } = d;
  const piWithEmail = pi.filter(p => p.email);
  const mcoTargets = mindStudio.filter(m => m.category === "MCO");

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Lead Sourcing" icon="🎯" sub="Prospect lists, enrichment, qualification, scoring" color="#F59E0B" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="PI Firms" value={pi.length} sub={`${piWithEmail.length} with emails`} color="#EF4444" />
          <Card title="Casper Prospects" value={casper.length} sub="venue leads" color="#F59E0B" />
          <Card title="Mind Studio Targets" value={mindStudio.length} sub={`${mcoTargets.length} MCOs`} color="#8B5CF6" />
          <Card title="IG Seed Targets" value={seeds.length} sub="engagement seeds" color="#3B82F6" />
          <Card title="Dolo Directory" value={dirCount.toLocaleString()} sub="total contacts" color="#C9A96E" />
        </div>

        <Section title="PI Firms — Brand Studio Pipeline" icon="⚖️" count={`${pi.length} FIRMS`}>
          <Table headers={["Firm","City","State","Email","Phone","Status"]} rows={pi.slice(0,20).map(p => [
            p.firm_name||"—", p.city||"—", p.state||"—", p.email||<Badge key="e" text="needs enrichment" color="#EF4444" />,
            p.phone||"—", <Badge key="s" text={p.status||"prospect"} color={p.status==="contacted"?"#3B82F6":"#555"} />
          ])} />
        </Section>

        <Section title="Casper Venue Prospects" icon="🍽️" count={`${casper.length} VENUES`}>
          {casper.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No data in casper_venue_prospects</div> :
          <Table headers={["Venue","City","Contact","Email","Status"]} rows={casper.slice(0,15).map(c => [
            c.venue_name||c.name||"—", c.city||"—", c.contact_name||"—", c.email||"—",
            <Badge key="s" text={c.status||"prospect"} color={c.status==="contacted"?"#3B82F6":"#555"} />
          ])} />}
        </Section>

        <Section title="Mind Studio — MCO Outreach Targets" icon="🧠" count={`${mcoTargets.length} MCOs`}>
          <Table headers={["Company","Category","Contact Email","Status"]} rows={mcoTargets.slice(0,15).map(m => [
            m.company_name||"—", <Badge key="c" text={m.category||"—"} color="#8B5CF6" />, m.contact_email||"—",
            <Badge key="s" text={m.status||"prospect"} color={m.status==="contacted"?"#3B82F6":"#555"} />
          ])} />
        </Section>
      </div>
    </div>
  );
}
