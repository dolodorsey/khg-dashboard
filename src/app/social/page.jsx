"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Social() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("ghl_social_posting_queue", "select=brand_key,status,platform,caption,image_url&order=brand_key&limit=500"),
      q("brand_social_handles", "select=*&order=brand_key"),
      q("contact_action_queue", "select=brand_key,action_type,status&action_type=in.(dm,comment,like)&limit=2000"),
      q("khg_engagement_limits", "select=*&order=brand_key"),
    ]).then(([posts, handles, eng, limits]) => {
      setD({ posts: posts||[], handles: handles||[], engagement: eng||[], limits: limits||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING SOCIAL..." />;
  const { posts, handles, engagement, limits } = d;
  const held = posts.filter(p => p.status === "held");
  const approved = posts.filter(p => p.status === "approved");
  const posted = posts.filter(p => p.status === "posted");
  const oauthConnected = handles.filter(h => h.ghl_ig_oauth_connected);
  const engApproved = engagement.filter(e => e.status === "approved");
  const engHeld = engagement.filter(e => e.status === "held");

  const postsByBrand = {};
  held.forEach(p => { postsByBrand[p.brand_key] = (postsByBrand[p.brand_key]||0)+1; });

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Social Media" icon="📱" sub="Post queue, engagement, analytics across all brands" color="#EC4899" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Posts Held" value={held.length} sub="awaiting review" color="#F59E0B" />
          <Card title="Posts Approved" value={approved.length} color="#22C55E" />
          <Card title="Posts Published" value={posted.length} color="#3B82F6" />
          <Card title="IG OAuth Connected" value={oauthConnected.length} sub={`of ${handles.length}`} color="#EC4899" />
          <Card title="Engagement Approved" value={engApproved.length} sub="likes+comments+DMs" color="#8B5CF6" />
          <Card title="Engagement Held" value={engHeld.length} color="#555" />
        </div>

        <Section title="Posts Awaiting Review (by Brand)" icon="📝" count={`${held.length} HELD`}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(postsByBrand).sort((a,b)=>b[1]-a[1]).map(([brand, count]) => (
              <div key={brand} style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:20, padding:"6px 16px", fontSize:11 }}>
                <span style={{ color:"#F59E0B", fontWeight:700 }}>{count}</span> <span style={{ color:"#888" }}>{brand.replace(/_/g," ")}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Engagement Limits" icon="⚡" count={`${limits.length} BRANDS`}>
          <Table headers={["Brand","DM Limit","Comment Limit","Like Limit","DMs Today","Comments Today","Likes Today","Active"]} rows={limits.map(l => [
            l.brand_key?.replace(/_/g," ")||"—",
            l.daily_dm_limit, l.daily_comment_limit, l.daily_like_limit,
            l.today_dms_sent||0, l.today_comments_sent||0, l.today_likes_sent||0,
            <Badge key="a" text={l.is_active?"ON":"OFF"} color={l.is_active?"#22C55E":"#555"} />
          ])} />
        </Section>

        <Section title="IG OAuth Status" icon="🔗" count={`${oauthConnected.length} CONNECTED`}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:8 }}>
            {handles.map((h, i) => (
              <div key={i} style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontSize:12 }}>{h.brand_key?.replace(/_/g," ")||"—"}</div>
                <Badge text={h.ghl_ig_oauth_connected?"CONNECTED":"MISSING"} color={h.ghl_ig_oauth_connected?"#22C55E":"#EF4444"} />
              </div>
            ))}
          </div>
        </Section>

        <div style={{ background:"#0D0D0B", border:"1px solid #EF444433", borderRadius:8, padding:20, marginTop:16 }}>
          <div style={{ fontSize:10, color:"#EF4444", letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12 }}>SOCIAL POSTER STATUS</div>
          <div style={{ fontSize:12, color:"#888", lineHeight:1.8 }}>
            <div>🛑 Social poster workflow <strong style={{ color: "#EF4444" }}>DEACTIVATED</strong> — no auto-posting</div>
            <div>✅ Staggered scheduling: 45 min between posts, max 12/day</div>
            <div>✅ Brand spacing: 1 hour minimum between same-brand posts</div>
            <div>🚫 Blacklist enforced: Paparazzi, Sundays Best, Gangsta Gospel, NOIR (DO NOT SEND)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
