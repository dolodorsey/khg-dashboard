"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

export default function GrantsDashboard() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const g = await sGet("khg_grant_tracker?order=deadline.asc");
    setGrants(g || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const now = new Date().toISOString().split("T")[0];
  const upcoming = grants.filter(g => (g.deadline || "") >= now);
  const totalValue = grants.reduce((sum, g) => sum + (g.max_award || 0), 0);

  const s = { card: { background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, marginBottom: 12 }, badge: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: `${c}22`, color: c, border: `1px solid ${c}44` }) };

  if (loading) return <div style={{ minHeight: "100vh", background: "#060604", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 11, letterSpacing: 5, color: "#FFD700" }}>LOADING GRANTS...</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#FFD700", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Grants Command Center</h1>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["💰", grants.length, "Total Grants"], ["📅", upcoming.length, "Upcoming Deadlines"], ["💵", `$${(totalValue/1000).toFixed(0)}K`, "Max Potential"]].map(([icon, n, l], i) => (
            <div key={i} style={{ ...s.card, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#FFD700", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {grants.map(g => (
          <div key={g.id} style={{ ...s.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{g.grant_name || g.name || "Untitled"}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{g.organization || "—"} · Deadline: {g.deadline || "Rolling"}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{g.eligible_entities || "—"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              {g.max_award && <div style={{ fontWeight: 800, color: "#FFD700", fontSize: 16 }}>${(g.max_award/1000).toFixed(0)}K</div>}
              <span style={s.badge(g.status === "applied" ? "#3B82F6" : g.status === "won" ? "#10B981" : "#F59E0B")}>{g.status || "tracking"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
