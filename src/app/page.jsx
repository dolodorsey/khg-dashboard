"use client";
import Link from "next/link";

const ENTITIES = [
  { key: "dr-dorsey", label: "Dr. Dorsey", icon: "👨‍⚕️", desc: "Personal brand — outreach, social, content, directory", color: "#C9A96E" },
  { key: "casper-group", label: "Casper Group", icon: "🍽️", desc: "10 restaurant concepts — venues, prospects, menus, outreach", color: "#E74C3C" },
  { key: "huglife", label: "HugLife + Events", icon: "🎪", desc: "21 event brands — ticketing, social, outreach, campaigns", color: "#FF6B35" },
  { key: "umbrella", label: "Umbrella Group", icon: "☂️", desc: "Brand Studio, Auto Exchange, Mind Studio, Injury, Clean", color: "#3498DB" },
  { key: "scented-museums", label: "Scented Museums", icon: "🏛️", desc: "Museum operations, exhibits, sponsors", color: "#9B59B6" },
  { key: "forever-futbol", label: "Forever Futbol", icon: "⚽", desc: "Soccer museum — sponsors, volunteers, ticketing", color: "#2E8B57" },
  { key: "products", label: "Products / Bodega", icon: "🛍️", desc: "MAGA, Stush, Bodega, Infinity Water, Pronto Energy", color: "#84CC16" },
  { key: "apps", label: "Apps", icon: "📲", desc: "Good Times, SOS, On Call, Help 911", color: "#7C3AED" },
  { key: "nonprofit", label: "Non-Profit", icon: "💚", desc: "Taste of Art Foundation, community programs", color: "#059669" },
];

export default function HubPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E5E7", padding: "28px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#FF6B35", textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, margin: 0, color: "#111" }}>Enterprise Command Center</h1>
            <p style={{ fontSize: 12, color: "#999", marginTop: 4, fontWeight: 500 }}>57+ brands · 8 cities · 9 entities</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/command-center" style={{ padding: "8px 18px", background: "#111", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#fff", textTransform: "uppercase", textDecoration: "none" }}>Master Dashboard</Link>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 40px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {ENTITIES.map(e => (
          <Link key={e.key} href={`/${e.key}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff", border: "1px solid #E5E5E7", borderRadius: 12, padding: 24,
              cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,.03)", borderLeft: `4px solid ${e.color}`
            }}
            onMouseEnter={ev => { ev.currentTarget.style.borderColor = e.color + "60"; ev.currentTarget.style.boxShadow = `0 4px 12px ${e.color}15`; ev.currentTarget.style.borderLeftColor = e.color; }}
            onMouseLeave={ev => { ev.currentTarget.style.borderColor = "#E5E5E7"; ev.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.03)"; ev.currentTarget.style.borderLeftColor = e.color; }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{e.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#111" }}>{e.label}</div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{e.desc}</div>
              <div style={{ marginTop: 14, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: e.color }}>
                OPEN →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #E5E5E7", padding: "20px 40px", textAlign: "center", background: "#fff" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#ccc", textTransform: "uppercase", fontFamily: "'DM Mono',monospace" }}>
          The Kollective Hospitality Group · Enterprise Command Center · 2026
        </div>
      </div>
    </div>
  );
}
