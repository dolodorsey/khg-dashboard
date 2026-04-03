"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Events() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("eventbrite_events", "select=*&order=event_date&limit=200"),
      q("khg_ambassadors", "select=brand_key,tier,status&limit=500"),
      q("brand_social_handles", "select=brand_key,ig_handle&limit=50"),
    ]).then(([events, ambassadors, handles]) => {
      setD({ events: events||[], ambassadors: ambassadors||[], handles: handles||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING EVENTS..." />;
  const { events, ambassadors, handles } = d;
  const upcoming = events.filter(e => !e.event_date || new Date(e.event_date) > new Date());
  const past = events.filter(e => e.event_date && new Date(e.event_date) <= new Date());
  const byEntity = {};
  events.forEach(e => { const k = e.entity_id||"other"; byEntity[k] = (byEntity[k]||0)+1; });
  const live = events.filter(e => e.status === "live" || e.status === "active");

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Events" icon="🎪" sub="Event calendar, ticketing, talent, sponsors, production" color="#F59E0B" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Total Events" value={events.length} sub="Eventbrite" color="#F59E0B" />
          <Card title="Upcoming" value={upcoming.length} color="#22C55E" />
          <Card title="Past" value={past.length} color="#555" />
          <Card title="Live Listings" value={live.length} color="#3B82F6" />
          <Card title="Ambassadors" value={ambassadors.length} color="#8B5CF6" />
        </div>

        <Section title="Events by Brand" icon="📊">
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {Object.entries(byEntity).sort((a,b)=>b[1]-a[1]).map(([entity, count]) => (
              <div key={entity} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:20, padding:"6px 16px", fontSize:11 }}>
                <span style={{ color:"#F59E0B", fontWeight:700 }}>{count}</span> <span style={{ color:"#888" }}>{entity.replace(/_/g," ")}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Upcoming Events" icon="📅" count={upcoming.length}>
          {upcoming.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No upcoming events listed</div> :
          <Table headers={["Event","Brand","Date","Venue","Status","Tickets"]} rows={upcoming.slice(0,20).map(e => [
            e.event_name||e.name||"—", e.entity_id?.replace(/_/g," ")||"—",
            e.event_date ? new Date(e.event_date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}) : "—",
            e.venue_name||"—", <Badge key="s" text={e.status||"draft"} color={e.status==="live"?"#22C55E":"#F59E0B"} />,
            e.tickets_sold||"—"
          ])} />}
        </Section>

        <div style={{ background:"#FFFFFF", border:"1px solid #F59E0B33", borderRadius:8, padding:20, marginTop:16 }}>
          <div style={{ fontSize:10, color:"#F59E0B", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>EVENTBRITE RULES</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:8, fontSize:12, color:"#888" }}>
            <div>🎟️ All tickets on sale TODAY — no exceptions</div>
            <div>🙈 Hide ticket quantity from public view</div>
            <div>📅 Multi-date events = separate listings</div>
            <div>🖼️ Different cover image for each listing</div>
            <div>📸 Dr. Dorsey provides official flyers ONLY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
