"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

export default function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const [dailyEvents, setDailyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("upcoming");

  const load = useCallback(async () => {
    setLoading(true);
    const [ev, daily] = await Promise.all([
      sGet("eventbrite_events?order=event_date.asc&limit=200"),
      sGet("gt_daily_events?order=event_date.asc&limit=200"),
    ]);
    setEvents(ev || []); setDailyEvents(daily || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const now = new Date().toISOString().split("T")[0];
  const upcoming = events.filter(e => (e.event_date || e.start_date || "") >= now);
  const past = events.filter(e => (e.event_date || e.start_date || "") < now);
  const brands = [...new Set(events.map(e => e.brand_key || e.organizer || "unknown"))].sort();

  const s = {
    card: { background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, marginBottom: 12 },
    badge: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: `${c}22`, color: c, border: `1px solid ${c}44` }),
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "#060604", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 11, letterSpacing: 5, color: "#FF4081" }}>LOADING EVENTS...</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#FF4081", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Events Command Center</h1>
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1a1a1a" }}>
        {[["upcoming", "Upcoming"], ["all", "All Events"], ["daily", "Good Times Events"]].map(([k, l]) => (
          <button key={k} style={{ padding: "14px 24px", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", color: tab === k ? "#FF4081" : "#666", background: "transparent", border: "none", borderBottom: `2px solid ${tab === k ? "#FF4081" : "transparent"}` }} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["🎪", events.length, "Total Events"], ["📅", upcoming.length, "Upcoming"], ["✅", past.length, "Past"], ["🏷️", brands.length, "Brands"], ["🌆", dailyEvents.length, "GT Events"]].map(([icon, n, l], i) => (
            <div key={i} style={{ ...s.card, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#FF4081", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {(tab === "upcoming" || tab === "all") && (
          <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
            {(tab === "upcoming" ? upcoming : events).map(e => (
              <div key={e.id} style={{ ...s.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{e.event_name || e.name || "Untitled"}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{e.event_date || e.start_date || "No date"} · {e.venue_name || e.city || "TBD"}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={s.badge("#FF4081")}>{e.brand_key || e.organizer || "?"}</span>
                  {e.ticket_url && <a href={e.ticket_url} target="_blank" rel="noopener" style={{ fontSize: 10, color: "#D4A853", textDecoration: "underline" }}>TICKETS</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "daily" && (
          <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
            {dailyEvents.map(e => (
              <div key={e.id} style={{ ...s.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{e.event_name || e.name || "Untitled"}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{e.event_date || "—"} · {e.city || "—"} · {e.venue_name || "—"}</div>
                </div>
                <span style={s.badge("#D4A853")}>{e.tier || "—"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
