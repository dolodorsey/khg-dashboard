"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function ForeverFutbol() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("ff_sponsor_outreach", "select=*&order=company_name"),
      q("eventbrite_events", "select=*&order=event_date"),
      q("brand_asset_files", "select=*&entity_id=eq.forever_futbol&order=created_at.desc"),
      q("khg_master_tasks", "select=*&category=eq.forever_futbol&status=not.eq.done&order=due_date"),
      q("contact_action_queue", "select=brand_key,action_type,status&brand_key=eq.forever_futbol&limit=500"),
    ]).then(([sp, ev, as, tk, eng]) => {
      setD({ sponsors: sp||[], events: (ev||[]).filter(e => (e.entity_id||'').includes('futbol') || (e.event_name||'').toLowerCase().includes('futbol')), assets: as||[], tasks: tk||[], engagement: eng||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING FOREVER FUTBOL..." />;
  const { sponsors, events, assets, tasks, engagement } = d;
  const confirmed = sponsors.filter(s => s.status === "confirmed");
  const pitched = sponsors.filter(s => s.status === "pitched");
  const daysOut = Math.max(0, Math.ceil((new Date("2026-05-29") - new Date()) / 86400000));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Forever Futbol" icon="⚽" sub="ATL ONLY · May 29 – Jul 6 · Fri/Sat/Sun Noon–9PM" color="#22C55E" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Days Until Opening" value={daysOut} sub="May 29, 2026" color="#22C55E" />
          <Card title="Sponsors" value={sponsors.length} sub={`${confirmed.length} confirmed · ${pitched.length} pitched`} color="#C9A96E" />
          <Card title="Eventbrite Events" value={events.length} color="#8B5CF6" />
          <Card title="Brand Assets" value={assets.length} color="#F59E0B" />
          <Card title="Open Tasks" value={tasks.length} color="#EF4444" />
          <Card title="Engagement Queue" value={engagement.filter(e=>e.status==='approved').length} sub={`of ${engagement.length} total`} color="#3B82F6" />
        </div>

        <Section title="Sponsor Pipeline" icon="💎" count={`${sponsors.length} TOTAL`}>
          {sponsors.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No sponsors in ff_sponsor_outreach yet</div> :
          <Table headers={["Company","Contact","Email","Status","Amount"]} rows={sponsors.slice(0,20).map(s => [
            s.company_name||s.name||"—",
            s.contact_name||"—",
            s.contact_email||"—",
            <Badge key="s" text={s.status||"prospect"} color={s.status==="confirmed"?"#22C55E":s.status==="pitched"?"#3B82F6":"#555"} />,
            s.amount ? `$${Number(s.amount).toLocaleString()}` : "—"
          ])} />}
        </Section>

        <Section title="Brand Assets" icon="🎨" count={assets.length}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {assets.slice(0,12).map((a,i) => (
              <div key={i} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:12, textAlign:"center" }}>
                {a.file_url?.match(/\.(png|jpg|jpeg|gif|webp)/i) ? <img src={a.file_url} alt="" style={{ width:"100%", height:90, objectFit:"cover", borderRadius:4, marginBottom:6 }} /> : <div style={{ height:90, background:"#111", borderRadius:4, marginBottom:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>📄</div>}
                <div style={{ fontSize:10, color:"#666", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.file_name||"Asset"}</div>
                <Badge text={a.asset_type||"file"} color="#C9A96E" />
              </div>
            ))}
          </div>
        </Section>

        <div style={{ background:"#FFFFFF", border:"1px solid #C9A96E33", borderRadius:8, padding:20 }}>
          <div style={{ fontSize:10, color:"#C9A96E", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>FOREVER FUTBOL RULES</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:8, fontSize:12, color:"#888" }}>
            <div>📍 ATL ONLY — no other cities</div><div>📅 May 29 – Jul 6, 2026</div><div>🕐 Fri/Sat/Sun Noon–9PM</div>
            <div>💎 "Sponsorship" NOT "Partnership"</div><div>🎟️ All tickets on sale TODAY</div><div>🖼️ Multi-date = separate listings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
