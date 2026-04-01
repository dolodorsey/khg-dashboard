"use client";
import { useState } from "react";
import Link from "next/link";

const DASHBOARDS = [
  { key: "command-center", label: "Command Center", icon: "🎛️", desc: "Master enterprise view — tasks, brands, workflows", color: "#D4A853", ready: true },
  { key: "ambassador", label: "Ambassadors", icon: "⭐", desc: "Manage ambassadors — approve, deny, tier, track", color: "#10B981", ready: true },
  { key: "schedule", label: "Schedule / Tasks", icon: "📅", desc: "Calendar, task queue, deadlines, sprint board", color: "#3B82F6", ready: true },
  { key: "social", label: "Social Media", icon: "📱", desc: "Post queue, content calendar, engagement, analytics", color: "#E040FB", ready: true },
  { key: "outreach", label: "Outreach", icon: "📨", desc: "Email sequences, SMS campaigns, follow-up tracking", color: "#FF6B35", ready: true },
  { key: "products", label: "Products", icon: "🛍️", desc: "MAGA, Stush, Bodega — sales, inventory, orders", color: "#96BF48", ready: true },
  { key: "events", label: "Events", icon: "🎪", desc: "Event calendar, ticketing, DJ/host assignments, sponsors", color: "#FF4081", ready: true },
  { key: "grants", label: "Grants", icon: "💰", desc: "Grant tracker, deadlines, applications, status — 24 active grants", color: "#FFD700", ready: true },
  { key: "mind-studio", label: "Mind Studio", icon: "🧠", desc: "Clinic pipeline, consumer, PI — 3 portal management", color: "#9B59B6", ready: true },
  { key: "casper-group", label: "Casper Group", icon: "🍽️", desc: "10 restaurant concepts — venues, prospects, menus", color: "#E74C3C", ready: true },
  { key: "umbrella", label: "Umbrella Group", icon: "☂️", desc: "Brand Studio, Auto Exchange, Clean, Realty, Injury", color: "#3498DB", ready: true },
  { key: "directory", label: "Directory / Links", icon: "🔗", desc: "All brand links, landing pages, QR codes, forms", color: "#00BCD4", ready: true },
  { key: "forever-futbol", label: "Forever Futbol", icon: "⚽", desc: "Museum ops, sponsors, volunteers, ticketing", color: "#2E8B57", ready: true },
  { key: "sole-exchange", label: "Sole Exchange", icon: "👟", desc: "Sneaker events, vendors, market operations", color: "#FF9800", ready: true },
  { key: "apps", label: "Apps", icon: "📲", desc: "Good Times, SOS, On Call — app metrics and ops", color: "#7C4DFF", ready: true },
  { key: "leads", label: "Lead Sourcing", icon: "🎯", desc: "Prospect lists, enrichment, qualification, scoring", color: "#F44336", ready: true },
  { key: "content", label: "Content", icon: "🎬", desc: "Graphics queue, video pipeline, brand assets, approvals", color: "#FF7043", ready: true },
  { key: "vendors", label: "Vendors", icon: "🏪", desc: "Vendor applications, event vendors, food vendors", color: "#8D6E63", ready: true },
  { key: "contacts", label: "Database / Contacts", icon: "👥", desc: "2,143+ contacts — directory, VIP circle, CRM", color: "#607D8B", ready: true },
  { key: "upcoming", label: "Upcoming Events", icon: "📆", desc: "Next 30 days — events, deadlines, launches", color: "#00E676", ready: true },
];

export default function HubPage() {
  const [filter, setFilter] = useState("all");
  const ready = DASHBOARDS.filter(d => d.ready).length;
  const total = DASHBOARDS.length;

  return (
    <div style={{ minHeight: "100vh", background: "#060604" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0A0A08, #111)", borderBottom: "1px solid #1a1a1a", padding: "32px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 6, color: "#D4A853", textTransform: "uppercase", marginBottom: 8 }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: 0, color: "#F0EDE6" }}>Enterprise Command Center</h1>
            <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>57+ brands · 8 cities · {total} dashboards · {ready} live</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://thedoctordorsey.com" target="_blank" rel="noopener" style={{ padding: "10px 20px", background: "#D4A85322", border: "1px solid #D4A85344", borderRadius: 6, fontSize: 11, fontWeight: 600, letterSpacing: 1, color: "#D4A853", textTransform: "uppercase" }}>thedoctordorsey.com</a>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div style={{ padding: "20px 40px", display: "flex", gap: 8 }}>
        {["all", "live", "building"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "8px 18px", borderRadius: 20, border: filter === f ? "1px solid #D4A853" : "1px solid #222",
            background: filter === f ? "#D4A85322" : "transparent", color: filter === f ? "#D4A853" : "#666",
            fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer"
          }}>{f === "all" ? `All (${total})` : f === "live" ? `Live (${ready})` : `Building (${total - ready})`}</button>
        ))}
      </div>

      {/* DASHBOARD GRID */}
      <div style={{ padding: "0 40px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {DASHBOARDS
          .filter(d => filter === "all" || (filter === "live" && d.ready) || (filter === "building" && !d.ready))
          .map(d => (
          <Link key={d.key} href={d.ready ? `/${d.key}` : "#"} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#0D0D0B", border: `1px solid ${d.ready ? d.color + "33" : "#1a1a1a"}`,
              borderRadius: 8, padding: 24, cursor: d.ready ? "pointer" : "default",
              transition: "all 0.2s", opacity: d.ready ? 1 : 0.5,
              position: "relative", overflow: "hidden"
            }}
            onMouseEnter={e => { if (d.ready) e.currentTarget.style.borderColor = d.color + "66"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = d.ready ? d.color + "33" : "#1a1a1a"; }}
            >
              {d.ready && <div style={{ position: "absolute", top: 12, right: 12, width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B98166" }} />}
              <div style={{ fontSize: 32, marginBottom: 12 }}>{d.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: "#F0EDE6" }}>{d.label}</div>
              <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{d.desc}</div>
              <div style={{ marginTop: 14, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: d.ready ? d.color : "#333" }}>
                {d.ready ? "LIVE →" : "COMING SOON"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #111", padding: "24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#333", textTransform: "uppercase" }}>
          The Kollective Hospitality Group · Enterprise Command Center · 2026
        </div>
      </div>
    </div>
  );
}
