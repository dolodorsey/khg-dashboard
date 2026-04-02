"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

export default function SocialDashboard() {
  const [schedule, setSchedule] = useState([]);
  const [handles, setHandles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("schedule");

  const load = useCallback(async () => {
    setLoading(true);
    const [sch, hdl, prof] = await Promise.all([
      sGet("weekly_content_schedule?limit=200&order=brand_key,day_of_week,time_slot"),
      sGet("brand_social_handles?order=brand_key"),
      sGet("brand_voice_profiles?order=brand_key"),
    ]);
    setSchedule(sch || []); setHandles(hdl || []); setProfiles(prof || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const brands = [...new Set(schedule.map(s => s.brand_key))].sort();
  const s = {
    card: { background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, marginBottom: 12 },
    badge: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: `${c}22`, color: c, border: `1px solid ${c}44` }),
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "#060604", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 11, letterSpacing: 5, color: "#E040FB" }}>LOADING SOCIAL DATA...</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#E040FB", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Social Media Command Center</h1>
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1a1a1a" }}>
        {[["schedule", "Content Schedule"], ["handles", "Brand Handles"], ["voices", "Brand Voices"]].map(([k, l]) => (
          <button key={k} style={{ padding: "14px 24px", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", color: tab === k ? "#E040FB" : "#666", background: "transparent", border: "none", borderBottom: `2px solid ${tab === k ? "#E040FB" : "transparent"}` }} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["📱", schedule.length, "Weekly Slots"], ["📣", handles.length, "Brand Handles"], ["🎨", profiles.length, "Voice Profiles"], ["🏷️", brands.length, "Active Brands"]].map(([icon, n, l], i) => (
            <div key={i} style={{ ...s.card, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#E040FB", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {tab === "handles" && handles.map(h => (
          <div key={h.id} style={{ ...s.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, textTransform: "uppercase" }}>{(h.brand_key || "").replace(/_/g, " ")}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{h.instagram ? `IG: @${h.instagram}` : ""} {h.tiktok ? `· TT: @${h.tiktok}` : ""} {h.facebook ? `· FB: ${h.facebook}` : ""}</div>
            </div>
            <span style={s.badge(h.verified ? "#10B981" : "#F59E0B")}>{h.verified ? "Verified" : "Pending"}</span>
          </div>
        ))}

        {tab === "voices" && profiles.map(p => (
          <div key={p.id} style={{ ...s.card }}>
            <div style={{ fontWeight: 700, fontSize: 14, textTransform: "uppercase", marginBottom: 6 }}>{(p.brand_key || "").replace(/_/g, " ")}</div>
            <div style={{ fontSize: 11, color: "#888", lineHeight: 1.7 }}>{p.voice_description || p.tone || "No voice defined"}</div>
          </div>
        ))}

        {tab === "schedule" && (
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>{schedule.length} weekly posting slots across {brands.length} brands</div>
            {brands.slice(0, 10).map(b => {
              const slots = schedule.filter(s2 => s2.brand_key === b);
              return (
                <div key={b} style={{ ...s.card }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700, textTransform: "uppercase" }}>{b.replace(/_/g, " ")}</div>
                    <span style={s.badge("#E040FB")}>{slots.length} slots/week</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
