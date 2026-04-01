"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

const VERCEL_SITES = [
  { name: "Command Center", url: "thedoctordorsey.com", brand: "kollective", cat: "Operations" },
  { name: "Dr. Dorsey", url: "doctordorsey.com", brand: "dr_dorsey", cat: "Personal" },
  { name: "On Call", url: "oncallallday.com", brand: "on_call", cat: "Apps" },
  { name: "Brad Dorsey Art", url: "thebraddorsey.com", brand: "brad_dorsey", cat: "Personal" },
  { name: "Good Times", url: "thegoodtimesworldwide.com", brand: "good_times", cat: "Apps" },
  { name: "Mind Studio", url: "themindstudioworldwide.com", brand: "mind_studio", cat: "Services" },
  { name: "HugLife", url: "huglife.vercel.app", brand: "huglife", cat: "Events" },
  { name: "NOIR", url: "noir-event.vercel.app", brand: "noir", cat: "Events" },
  { name: "Taste of Art", url: "taste-of-art-event.vercel.app", brand: "taste_of_art", cat: "Events" },
  { name: "WRST BHVR", url: "wrst-bhvr-event.vercel.app", brand: "wrst_bhvr", cat: "Events" },
  { name: "REMIX", url: "remix-event.vercel.app", brand: "remix", cat: "Events" },
  { name: "Soul Sessions", url: "soul-sessions-event.vercel.app", brand: "soul_sessions", cat: "Events" },
  { name: "Secret Society", url: "the-secret-society-event.vercel.app", brand: "secret_society", cat: "Events" },
  { name: "The Kulture", url: "the-kulture-event.vercel.app", brand: "kulture", cat: "Events" },
  { name: "Cinco De Drinko", url: "cinco-de-drinko-event.vercel.app", brand: "cinco", cat: "Events" },
  { name: "Stella", url: "stella-event.vercel.app", brand: "stella", cat: "Events" },
  { name: "Beauty & Beast", url: "beauty-beast-event.vercel.app", brand: "beauty_beast", cat: "Events" },
  { name: "Parking Lot Pimpin", url: "parking-lot-pimpin-event.vercel.app", brand: "plp", cat: "Events" },
  { name: "Casper Group", url: "casper-group.vercel.app", brand: "casper_group", cat: "Food" },
  { name: "Angel Wings", url: "angel-wings-website.vercel.app", brand: "angel_wings", cat: "Food" },
  { name: "Espresso Co.", url: "espresso-co-website.vercel.app", brand: "espresso_co", cat: "Food" },
  { name: "Forever Futbol", url: "forever-futbol.vercel.app", brand: "forever_futbol", cat: "Museums" },
  { name: "Infinity Water", url: "infinity-water-website.vercel.app", brand: "infinity_water", cat: "Products" },
  { name: "Pronto Energy", url: "pronto-energy-website.vercel.app", brand: "pronto_energy", cat: "Products" },
  { name: "Stush", url: "stush-website.vercel.app", brand: "stush", cat: "Commerce" },
  { name: "Bodega", url: "bodega-website.vercel.app", brand: "bodega", cat: "Commerce" },
  { name: "MAGA Store", url: "makeatlantagreatagain.myshopify.com", brand: "maga", cat: "Commerce" },
  { name: "Stush Store", url: "stushusa.myshopify.com", brand: "stush", cat: "Commerce" },
  { name: "Umbrella Group", url: "umbrella-group-website.vercel.app", brand: "umbrella", cat: "Services" },
  { name: "Brand Studio", url: "brand-studio-website.vercel.app", brand: "brand_studio", cat: "Services" },
  { name: "Auto Exchange", url: "umbrella-auto-exchange.vercel.app", brand: "auto_exchange", cat: "Services" },
  { name: "Mind Studio App", url: "mind-studio-app.vercel.app", brand: "mind_studio", cat: "Apps" },
  { name: "SOS App", url: "sos-app-website.vercel.app", brand: "sos", cat: "Apps" },
  { name: "KHG Forms", url: "khg-forms.vercel.app", brand: "kollective", cat: "Operations" },
  { name: "GT Partners", url: "gt-partners.vercel.app", brand: "good_times", cat: "Operations" },
  { name: "Rule Radar", url: "rule-radar-app.vercel.app", brand: "kollective", cat: "Apps" },
];

export default function DirectoryDashboard() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const cats = [...new Set(VERCEL_SITES.map(s => s.cat))];
  const filtered = VERCEL_SITES.filter(s => {
    if (filter !== "all" && s.cat !== filter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.url.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const catColors = { Operations: "#D4A853", Personal: "#C9A96E", Events: "#FF4081", Food: "#E74C3C", Museums: "#2E8B57", Products: "#0EA5E9", Commerce: "#96BF48", Services: "#3498DB", Apps: "#7C4DFF" };

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
        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 16, textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#00BCD4" }}>{VERCEL_SITES.length}</div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase" }}>Total Sites</div>
          </div>
          <div style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 16, textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#00BCD4" }}>{cats.length}</div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase" }}>Categories</div>
          </div>
          <div style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 16, textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#10B981" }}>9</div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase" }}>Custom Domains</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sites..." style={{ background: "#111", border: "1px solid #222", color: "#F0EDE6", padding: "8px 14px", borderRadius: 4, fontSize: 12, width: 200, outline: "none" }} />
          <button onClick={() => setFilter("all")} style={{ padding: "6px 14px", borderRadius: 20, border: filter === "all" ? "1px solid #00BCD4" : "1px solid #222", background: filter === "all" ? "#00BCD422" : "transparent", color: filter === "all" ? "#00BCD4" : "#666", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>ALL</button>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: "6px 14px", borderRadius: 20, border: filter === c ? `1px solid ${catColors[c]||"#00BCD4"}` : "1px solid #222", background: filter === c ? `${catColors[c]||"#00BCD4"}22` : "transparent", color: filter === c ? catColors[c]||"#00BCD4" : "#666", fontSize: 10, fontWeight: 600, cursor: "pointer", textTransform: "uppercase" }}>{c}</button>
          ))}
        </div>

        <div style={{ fontSize: 11, color: "#555", marginBottom: 12 }}>{filtered.length} sites</div>

        {filtered.map(s => (
          <a key={s.url} href={`https://${s.url}`} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, marginBottom: 6, textDecoration: "none", color: "#F0EDE6" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "#00BCD4", marginTop: 2 }}>{s.url}</div>
            </div>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: `${catColors[s.cat]||"#00BCD4"}22`, color: catColors[s.cat]||"#00BCD4", border: `1px solid ${catColors[s.cat]||"#00BCD4"}44` }}>{s.cat}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
