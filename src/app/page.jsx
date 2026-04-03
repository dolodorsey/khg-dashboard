"use client";
import { useState } from "react";
import Link from "next/link";

const DASHBOARDS = [
  { key: "command-center", label: "Command Center", icon: "🎛️", desc: "Master enterprise view — tasks, brands, workflows", color: "#FF6B35", ready: true, priority: true },
  { key: "schedule", label: "Schedule / Tasks", icon: "📅", desc: "Task queue, deadlines, sprint board", color: "#3B82F6", ready: true, priority: true },
  { key: "outreach", label: "Outreach", icon: "📨", desc: "Email sequences, SMS campaigns, follow-up tracking", color: "#FF6B35", ready: true, priority: true },
  { key: "social", label: "Social Media", icon: "📱", desc: "Post queue, content calendar, engagement", color: "#EC4899", ready: true, priority: true },
  { key: "events", label: "Events", icon: "🎪", desc: "Event calendar, ticketing, sponsors", color: "#F59E0B", ready: true, priority: true },
  { key: "content", label: "Content", icon: "🎬", desc: "Graphics queue, video pipeline, approvals", color: "#F97316", ready: true },
  { key: "products", label: "Products", icon: "🛍️", desc: "MAGA, Stush, Bodega — sales, inventory", color: "#84CC16", ready: true },
  { key: "leads", label: "Lead Sourcing", icon: "🎯", desc: "Prospect lists, enrichment, scoring", color: "#EF4444", ready: true },
  { key: "contacts", label: "Database / Contacts", icon: "👥", desc: "2,143+ contacts — directory, VIP circle", color: "#6366F1", ready: true },
  { key: "grants", label: "Grants", icon: "💰", desc: "Grant tracker, deadlines, applications", color: "#EAB308", ready: true },
  { key: "ambassador", label: "Ambassadors", icon: "⭐", desc: "Approve, deny, tier, track ambassadors", color: "#10B981", ready: true },
  { key: "mind-studio", label: "Mind Studio", icon: "🧠", desc: "Clinic pipeline, consumer, PI", color: "#8B5CF6", ready: true },
  { key: "casper-group", label: "Casper Group", icon: "🍽️", desc: "10 restaurant concepts — venues, prospects", color: "#EF4444", ready: true },
  { key: "umbrella", label: "Umbrella Group", icon: "☂️", desc: "Brand Studio, Auto Exchange, Clean, Realty", color: "#3B82F6", ready: true },
  { key: "forever-futbol", label: "Forever Futbol", icon: "⚽", desc: "Museum ops, sponsors, volunteers", color: "#22C55E", ready: true },
  { key: "directory", label: "Directory / Links", icon: "🔗", desc: "All brand links, landing pages, QR codes", color: "#06B6D4", ready: true },
  { key: "sole-exchange", label: "Sole Exchange", icon: "👟", desc: "Sneaker events, vendors, market ops", color: "#F59E0B", ready: true },
  { key: "apps", label: "Apps", icon: "📲", desc: "Good Times, SOS, On Call", color: "#7C3AED", ready: true },
  { key: "upcoming", label: "Upcoming Events", icon: "📆", desc: "Next 30 days — events, deadlines, launches", color: "#10B981", ready: true },
  { key: "vendors", label: "Vendors", icon: "🏪", desc: "Vendor applications, event vendors", color: "#78716C", ready: true },
];

export default function HubPage() {
  const [filter, setFilter] = useState("all");
  const ready = DASHBOARDS.filter(d => d.ready).length;
  const total = DASHBOARDS.length;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E5E7", padding: "28px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 6, color: "#FF6B35", textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, margin: 0, color: "#111" }}>Enterprise Command Center</h1>
            <p style={{ fontSize: 12, color: "#999", marginTop: 4, fontWeight: 500 }}>57+ brands · 8 cities · {total} dashboards · {ready} live</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="https://thedoctordorsey.com" target="_blank" rel="noopener" style={{ padding: "8px 18px", background: "#FF6B3510", border: "1px solid #FF6B3530", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#FF6B35", textTransform: "uppercase", textDecoration: "none" }}>thedoctordorsey.com</a>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div style={{ padding: "18px 40px", display: "flex", gap: 8 }}>
        {["all", "priority", "live"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 16px", borderRadius: 20, border: filter === f ? "1px solid #FF6B35" : "1px solid #E5E5E7",
            background: filter === f ? "#FF6B3510" : "#fff", color: filter === f ? "#FF6B35" : "#888",
            fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif", transition: "all .15s"
          }}>{f === "all" ? `All (${total})` : f === "priority" ? "Priority" : `Live (${ready})`}</button>
        ))}
      </div>

      {/* DASHBOARD GRID */}
      <div style={{ padding: "0 40px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {DASHBOARDS
          .filter(d => filter === "all" || (filter === "live" && d.ready) || (filter === "priority" && d.priority))
          .map(d => (
          <Link key={d.key} href={d.ready ? `/${d.key}` : "#"} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff", border: "1px solid #E5E5E7",
              borderRadius: 10, padding: 22, cursor: d.ready ? "pointer" : "default",
              transition: "all 0.2s", opacity: d.ready ? 1 : 0.5,
              position: "relative", overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,.03)"
            }}
            onMouseEnter={e => { if (d.ready) { e.currentTarget.style.borderColor = d.color + "60"; e.currentTarget.style.boxShadow = `0 2px 8px ${d.color}15`; } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E5E7"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.03)"; }}
            >
              {d.ready && <div style={{ position: "absolute", top: 12, right: 12, width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px #22C55E66" }} />}
              <div style={{ fontSize: 30, marginBottom: 10 }}>{d.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: "#111" }}>{d.label}</div>
              <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{d.desc}</div>
              <div style={{ marginTop: 12, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: d.ready ? d.color : "#ccc" }}>
                {d.ready ? "OPEN →" : "COMING SOON"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #E5E5E7", padding: "20px 40px", textAlign: "center", background: "#fff" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#ccc", textTransform: "uppercase", fontFamily: "'DM Mono',monospace" }}>
          The Kollective Hospitality Group · Enterprise Command Center · 2026
        </div>
      </div>
    </div>
  );
}
