"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Section, Loading, q } from "../lib/ui";

export default function SoleExchange() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("form_submissions", "select=*&brand_key=eq.sole_exchange&order=created_at.desc"),
      q("brand_asset_files", "select=*&entity_id=eq.sole_exchange"),
      q("contact_action_queue", "select=brand_key,action_type,status&brand_key=eq.sole_exchange&limit=200"),
    ]).then(([subs, assets, eng]) => {
      setD({ submissions: subs||[], assets: assets||[], engagement: eng||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING SOLE EXCHANGE..." />;
  const { submissions, assets, engagement } = d;

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Sole Exchange" icon="👟" sub="Sneaker events, vendors, market operations" color="#EF4444" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Vendor Apps" value={submissions.length} color="#EF4444" />
          <Card title="Brand Assets" value={assets.length} color="#F59E0B" />
          <Card title="Engagement Queue" value={engagement.length} color="#3B82F6" />
        </div>

        <Section title="Sole Exchange Operations" icon="🏪">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
            <div style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:20 }}>
              <div style={{ fontSize:10, color:"#EF4444", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>VENDOR MANAGEMENT</div>
              <div style={{ fontSize:12, color:"#888", lineHeight:1.8 }}>
                <div>📝 Vendor booth applications</div>
                <div>💰 Payment tracking</div>
                <div>📍 Floor plan assignments</div>
                <div>⭐ Performance reviews</div>
              </div>
            </div>
            <div style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:20 }}>
              <div style={{ fontSize:10, color:"#F59E0B", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>EVENT PRODUCTION</div>
              <div style={{ fontSize:12, color:"#888", lineHeight:1.8 }}>
                <div>🎪 Market layout planning</div>
                <div>🎤 DJ/entertainment booking</div>
                <div>📸 Photography/videography</div>
                <div>🚗 Parking & logistics</div>
              </div>
            </div>
            <div style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:20 }}>
              <div style={{ fontSize:10, color:"#3B82F6", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>GHL INTEGRATION</div>
              <div style={{ fontSize:12, color:"#888", lineHeight:1.8 }}>
                <div>🔑 Location: F2avGQSgrWRyp0YiaWtO</div>
                <div>⚠️ OAuth needs re-authentication</div>
                <div>📊 Pipeline tracking</div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
