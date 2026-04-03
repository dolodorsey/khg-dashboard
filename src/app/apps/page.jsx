"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Apps() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("gt_venues", "select=city,subcategory&limit=2000"),
      q("gt_daily_events", "select=*&limit=200"),
      q("gt_venue_happenings", "select=*&limit=200"),
      q("gt_shows", "select=*&order=show_date&limit=50"),
      q("gt_sports_games", "select=*&limit=50"),
      q("gt_media_partners", "select=*"),
    ]).then(([ven, ev, hap, sh, sp, mp]) => {
      setD({ venues: ven||[], events: ev||[], happenings: hap||[], shows: sh||[], sports: sp||[], media: mp||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING APPS..." />;
  const { venues, events, happenings, shows, sports, media } = d;
  const cities = [...new Set(venues.map(v => v.city).filter(Boolean))];
  const byCat = {};
  venues.forEach(v => { const c = v.subcategory || "other"; byCat[c] = (byCat[c]||0)+1; });
  const topCats = Object.entries(byCat).sort((a,b) => b[1]-a[1]).slice(0,10);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Apps" icon="📲" sub="Good Times · SOS · On Call — metrics & operations" color="#8B5CF6" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="GT Venues" value={venues.length} sub={`${cities.length} cities`} color="#8B5CF6" />
          <Card title="Daily Events" value={events.length} sub="curated listings" color="#22C55E" />
          <Card title="Weekly Happenings" value={happenings.length} sub="recurring events" color="#F59E0B" />
          <Card title="Shows" value={shows.length} sub="confirmed concerts" color="#EF4444" />
          <Card title="Sports Games" value={sports.length} color="#3B82F6" />
          <Card title="Media Partners" value={media.length} color="#C9A96E" />
        </div>

        <Section title="Good Times — Venue Coverage by City" icon="🌆" count={`${cities.length} CITIES`}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
            {cities.sort().map(city => {
              const count = venues.filter(v => v.city === city).length;
              return (
                <div key={city} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:"14px 16px", textAlign:"center" }}>
                  <div style={{ fontSize:24, fontWeight:800, color:"#8B5CF6" }}>{count}</div>
                  <div style={{ fontSize:11, color:"#888", marginTop:4 }}>{city}</div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Venue Categories" icon="📊" count={`${Object.keys(byCat).length} TYPES`}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {topCats.map(([cat, count]) => (
              <div key={cat} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:20, padding:"6px 16px", fontSize:11 }}>
                <span style={{ color:"#8B5CF6", fontWeight:700 }}>{count}</span> <span style={{ color:"#888" }}>{cat}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Upcoming Shows" icon="🎤" count={shows.length}>
          {shows.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No shows in gt_shows</div> :
          <Table headers={["Show","Venue","City","Date"]} rows={shows.slice(0,15).map(s => [
            s.show_name||s.artist||"—", s.venue_name||"—", s.city||"—",
            s.show_date ? new Date(s.show_date).toLocaleDateString() : "—"
          ])} />}
        </Section>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
          <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:20 }}>
            <div style={{ fontSize:10, color:"#8B5CF6", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>GOOD TIMES APP</div>
            <div style={{ fontSize:12, color:"#888", lineHeight:1.6 }}>
              <div>🌐 thegoodtimesworldwide.com</div>
              <div>📱 Build 15 at App Store Connect (ID 6752312555)</div>
              <div>⚠️ Needs Xcode 26 by Apr 28</div>
              <div>🏪 {venues.length} venues · {events.length} events · {cities.length} cities</div>
            </div>
          </div>
          <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:20 }}>
            <div style={{ fontSize:10, color:"#EF4444", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>SOS APP</div>
            <div style={{ fontSize:12, color:"#888", lineHeight:1.6 }}>
              <div>🆘 Emergency response platform</div>
              <div>📱 iOS submission pending</div>
              <div>🔑 GHL: jz8geHs33Iqyruo2q2oO</div>
            </div>
          </div>
          <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:20 }}>
            <div style={{ fontSize:10, color:"#F59E0B", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>HELP 911 APP</div>
            <div style={{ fontSize:12, color:"#888", lineHeight:1.6 }}>
              <div>🚨 help-911-app.vercel.app</div>
              <div>✅ LIVE — Customer + Rep portals</div>
              <div>🔑 GHL: My8EzLOwxDNkXVKLbFBh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
