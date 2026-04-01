"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

const STATUS_COLORS = { open: "#F59E0B", in_progress: "#3B82F6", blocked: "#EF4444", waiting_approval: "#A855F7", delegated: "#6B7280", completed: "#10B981", cancelled: "#333" };

export default function ScheduleDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");

  const load = useCallback(async () => {
    setLoading(true);
    const t = await sGet("khg_master_tasks?order=created_at.desc&limit=200");
    setTasks(t || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const active = tasks.filter(t => !["completed","cancelled"].includes(t.status));
  const completed = tasks.filter(t => t.status === "completed");
  const overdue = tasks.filter(t => t.due_date && t.due_date < new Date().toISOString().split("T")[0] && !["completed","cancelled"].includes(t.status));
  const filtered = filter === "active" ? active : filter === "completed" ? completed : filter === "overdue" ? overdue : tasks;

  const s = {
    card: { background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, marginBottom: 12 },
    badge: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: `${c}22`, color: c, border: `1px solid ${c}44` }),
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "#060604", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 11, letterSpacing: 5, color: "#3B82F6" }}>LOADING TASKS...</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#3B82F6", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Schedule / Tasks</h1>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["📋", tasks.length, "Total Tasks"], ["🔥", active.length, "Active"], ["⚠️", overdue.length, "Overdue"], ["✅", completed.length, "Completed"]].map(([icon, n, l], i) => (
            <div key={i} style={{ ...s.card, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#3B82F6", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["active","overdue","completed","all"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 16px", borderRadius: 20, border: filter === f ? "1px solid #3B82F6" : "1px solid #222", background: filter === f ? "#3B82F622" : "transparent", color: filter === f ? "#3B82F6" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>{f}</button>
          ))}
        </div>

        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {filtered.map(t => (
            <div key={t.id} style={{ ...s.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{t.title}</div>
                <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{t.task_id} · {t.category || "—"} · {t.assigned_to || "Unassigned"} · Due: {t.due_date || "None"}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={s.badge(t.priority === "high" ? "#EF4444" : t.priority === "medium" ? "#F59E0B" : "#666")}>{t.priority || "—"}</span>
                <span style={s.badge(STATUS_COLORS[t.status] || "#666")}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
