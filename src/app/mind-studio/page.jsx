"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function MindStudio() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("mind_studio_outreach", "select=*&order=company_name"),
      q("ms_clinic_pipeline", "select=*&order=created_at.desc"),
      q("contact_action_queue", "select=*&brand_key=eq.mind_studio&limit=200"),
      q("brand_asset_files", "select=*&entity_id=eq.mind_studio"),
    ]).then(([outreach, pipeline, eng, assets]) => {
      setD({ outreach: outreach||[], pipeline: pipeline||[], engagement: eng||[], assets: assets||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING MIND STUDIO..." />;
  const { outreach, pipeline, engagement, assets } = d;
  const mcos = outreach.filter(o => o.category === "MCO");
  const prenatal = outreach.filter(o => o.category === "prenatal" || o.category === "prenatal_partner");
  const therapists = outreach.filter(o => o.category === "therapist" || o.category === "therapist_recruit");
  const piWrong = outreach.filter(o => o.category === "wrong_channel");

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Mind Studio" icon="🧠" sub="3-entity MSO · Clinic + Consumer + PI · MCO agreements ONLY" color="#8B5CF6" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="MCO Targets" value={mcos.length} sub="correct channel" color="#8B5CF6" />
          <Card title="Prenatal Partners" value={prenatal.length} color="#EC4899" />
          <Card title="Therapist Recruits" value={therapists.length} color="#22C55E" />
          <Card title="PI Firms (Moved)" value={piWrong.length} sub="→ Brand Studio" color="#555" />
          <Card title="Clinic Pipeline" value={pipeline.length} color="#3B82F6" />
          <Card title="Engagement" value={engagement.filter(e=>e.status==='approved').length} sub="approved" color="#F59E0B" />
        </div>

        <Section title="MCO Outreach Pipeline" icon="🏥" count={`${mcos.length} MCOs`}>
          {mcos.length === 0 ? <div style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No MCOs in mind_studio_outreach</div> :
          <Table headers={["Company","Contact","Email","Status"]} rows={mcos.slice(0,20).map(m => [
            m.company_name||"—", m.contact_name||"—",
            m.contact_email||<Badge key="e" text="needs email" color="#EF4444" />,
            <Badge key="s" text={m.status||"prospect"} color={m.status==="contacted"?"#3B82F6":m.status==="warm"?"#F59E0B":"#555"} />
          ])} />}
        </Section>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16, marginBottom:32 }}>
          <div style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:20 }}>
            <div style={{ fontSize:10, color:"#8B5CF6", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>CLINIC PIPELINE (20-stage)</div>
            <div style={{ fontSize:24, fontWeight:800, color:"#8B5CF6" }}>{pipeline.length}</div>
            <div style={{ fontSize:11, color:"#666", marginTop:4 }}>Active clients in pipeline</div>
          </div>
          <div style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:20 }}>
            <div style={{ fontSize:10, color:"#22C55E", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>GHL INTEGRATION</div>
            <div style={{ fontSize:12, color:"#888", lineHeight:1.8 }}>
              <div>🔑 Location: 6h8pNMs7vPOnStVIvGvJ</div>
              <div>🌐 themindstudioworldwide.com</div>
              <div>📱 3-portal app (Client + Therapist + BOH)</div>
              <div>⚠️ IG OAuth needs credentials from Myia B</div>
            </div>
          </div>
          <div style={{ background:"#0D0D0B", border:"1px solid #EF444433", borderRadius:8, padding:20 }}>
            <div style={{ fontSize:10, color:"#EF4444", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>CORRECTED ROUTING</div>
            <div style={{ fontSize:12, color:"#888", lineHeight:1.8 }}>
              <div>✅ {piWrong.length} PI firms → Brand Studio</div>
              <div>✅ {mcos.length} MCOs → Mind Studio (correct)</div>
              <div>✅ {prenatal.length} prenatal → Mind Studio</div>
              <div>✅ {therapists.length} therapists → Mind Studio</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
