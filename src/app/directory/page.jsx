"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI9ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

const SITES = [
  { name: "Dr. Dorsey", url: "doctordorsey.com", cat: "Personal" },
  { name: "HugLife", url: "huglife.vercel.app", cat: "Events" },
  { name: "NOIR", url: "noir-event.vercel.app", cat: "Events" },
  { name: "Taste of Art", url: "taste-of-art-event.vercel.app", cat: "Events" },
  { name: "WRST BHVR", url: "wrst-bhvr-event.vercel.app", cat: "Events" },
  { name: "REMIX", url: "remix-event.vercel.app", cat: "Events" },
  { name: "Soul Sessions", url: "soul-sessions-event.vercel.app", cat: "Events" },
  { name: "Casper Group", url: "casper-group.vercel.app", cat: "Food" },
  { name: "Forever Futbol", url: "forever-futbol.vercel.app", cat: "Museums" },
  { name: "MAGA", url: "makeatlantagreatagain.myshopify.com", cat: "Commerce" },
  { name: "Stush", url: "stushusa.myshopify.com", cat: "Commerce" },
  { name: "Bodega", url: "bodega-website.vercel.app", cat: "Commerce" },
  { name: "Infinity Water", url: "infinity-water-website.vercel.app", cat: "Products" },
  { name: "Pronto Energy", url: "pronto-energy-website.vercel.app", cat: "Products" },
  { name: "Good Times", url: "thegoodtimesworldwide.com", cat: "Apps" },
  { name: "Mind Studio", url: "themindstudioworldwide.com", cat: "Services" },
  { name: "Umbrella Group", url: "umbrella-group-website.vercel.app", cat: "Services" },
  { name: "KHG Forms", url: "khg-forms.vercel.app", cat: "Operations" },
  { name: "Command Center", url: "thedoctordorsey.com", cat: "Operations" },
];

export default function DirectoryDashboard() {
  const [filter, setFilter] = useState("all");
  const cats = [...new Set(SITES.map(s => s.cat))];
  const filtered = filter === "all" ? SITES : SITES.filter(s => s.cat === filter);
  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#00BCD4", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Directory / Links</h1>
        </div>
      </div>
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <button onClick={() => setFilter("all")} style={{ padding: "8px 16px", borderRadius: 20, border: filter === "all" ? "1px solid #00BCD4" : "1px solid #222", background: filter === "all" ? "#00BCD422" : "transparent", color: filter === "all" ? "#00BCD4" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 1 }}>ALL ({SITES.length})</button>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 16px", borderRadius: 20, border: filter === c ? "1px solid #00BCD4" : "1px solid #222", background: filter === c ? "#00BCD422" : "transparent", color: filter === c ? "#00BCD4" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>{c}</button>
          ))}
        </div>
        {filtered.map(s => (
          <a key={s.name} href={`https://${s.url}`} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, marginBottom: 6, textDecoration: "none", color: "#F0EDE6" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "#00BCD4", marginTop: 2 }}>{s.url}</div>
            </div>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: "#00BCD422", color: "#00BCD4", border: "1px solid #00BCD444" }}>{s.cat}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
