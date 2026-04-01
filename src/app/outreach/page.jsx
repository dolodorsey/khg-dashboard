"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

export default function OutreachDashboard() {
  const [queue, setQueue] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("queue");
  const [filterCampaign, setFilterCampaign] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const [q, t] = await Promise.all([
      sGet("khg_outreach_queue?order=campaign,created_at.desc"),
      sGet("campaign_email_templates?order=campaign,sequence_step"),
    ]);
    setQueue(q || []); setTemplates(t || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const campaigns = [...new Set(queue.map(q => q.campaign))].sort();
  const campaignStats = campaigns.map(c => ({
    campaign: c,
    total: queue.filter(q => q.campaign === c).length,
    queued: queue.filter(q => q.campaign === c && q.status === "queued").length,
    approved: queue.filter(q => q.campaign === c && q.status === "approved").length,
    sent: queue.filter(q => q.campaign === c && q.status === "sent").length,
    responded: queue.filter(q => q.campaign === c && q.status === "responded").length,
  }));
  const filtered = filterCampaign === "all" ? queue : queue.filter(q => q.campaign === filterCampaign);
  const totalQueued = queue.filter(q => q.status === "queued").length;
  const totalApproved = queue.filter(q => q.status === "approved").length;
  const totalSent = queue.filter(q => q.status === "sent").length;

  const s = {
    card: { background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, marginBottom: 12 },
    btn: (c = "#D4A853") => ({ background: c, color: "#0A0A0A", border: "none", padding: "8px 16px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }),
    badge: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: `${c}22`, color: c, border: `1px solid ${c}44` }),
    select: { background: "#111", border: "1px solid #222", color: "#F0EDE6", padding: "10px 14px", borderRadius: 4, fontSize: 13, outline: "none" },
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "#060604", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 11, letterSpacing: 5, color: "#FF6B35" }}>LOADING OUTREACH DATA...</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#FF6B35", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Outreach Command Center</h1>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1a1a1a" }}>
        {[["queue", "Outreach Queue"], ["campaigns", "Campaigns"], ["templates", "Email Templates"]].map(([k, l]) => (
          <button key={k} style={{ padding: "14px 24px", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", color: tab === k ? "#FF6B35" : "#666", background: "transparent", border: "none", borderBottom: `2px solid ${tab === k ? "#FF6B35" : "transparent"}` }} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      <div style={{ padding: "24px 32px" }}>
        {/* STATS */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["📨", queue.length, "Total Contacts"], ["⏳", totalQueued, "Queued"], ["✅", totalApproved, "Approved"], ["📤", totalSent, "Sent"], ["📊", campaigns.length, "Campaigns"], ["📧", templates.length, "Templates"]].map(([icon, n, l], i) => (
            <div key={i} style={{ ...s.card, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#FF6B35", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {tab === "campaigns" && (
          <div>
            {campaignStats.map(c => (
              <div key={c.campaign} style={{ ...s.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, textTransform: "uppercase" }}>{c.campaign.replace(/_/g, " ")}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{c.total} contacts</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {c.queued > 0 && <span style={s.badge("#F59E0B")}>{c.queued} queued</span>}
                  {c.approved > 0 && <span style={s.badge("#10B981")}>{c.approved} approved</span>}
                  {c.sent > 0 && <span style={s.badge("#3B82F6")}>{c.sent} sent</span>}
                  {c.responded > 0 && <span style={s.badge("#A855F7")}>{c.responded} responded</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "queue" && (
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <select style={s.select} value={filterCampaign} onChange={e => setFilterCampaign(e.target.value)}>
                <option value="all">All Campaigns ({queue.length})</option>
                {campaigns.map(c => <option key={c} value={c}>{c.replace(/_/g, " ")} ({queue.filter(q => q.campaign === c).length})</option>)}
              </select>
            </div>
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {filtered.slice(0, 100).map(q => (
                <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 4, marginBottom: 4, fontSize: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: q.status === "queued" ? "#F59E0B" : q.status === "approved" ? "#10B981" : q.status === "sent" ? "#3B82F6" : "#666", flexShrink: 0 }} />
                  <div style={{ flex: 1, fontWeight: 600 }}>{q.contact_name || "Unknown"}</div>
                  <div style={{ color: "#666", fontSize: 11 }}>{q.channel || "—"}</div>
                  <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>{q.campaign?.replace(/_/g, " ")}</div>
                  <span style={s.badge(q.status === "queued" ? "#F59E0B" : q.status === "approved" ? "#10B981" : "#3B82F6")}>{q.status}</span>
                </div>
              ))}
              {filtered.length > 100 && <div style={{ textAlign: "center", padding: 16, color: "#555", fontSize: 12 }}>Showing 100 of {filtered.length}</div>}
            </div>
          </div>
        )}

        {tab === "templates" && (
          <div>
            {[...new Set(templates.map(t => t.campaign))].map(campaign => (
              <div key={campaign} style={{ ...s.card }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, textTransform: "uppercase", color: "#FF6B35" }}>{campaign.replace(/_/g, " ")}</div>
                {templates.filter(t => t.campaign === campaign).map(t => (
                  <div key={t.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #111" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FF6B3522", color: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{t.sequence_step}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{t.subject}</div>
                      <div style={{ fontSize: 10, color: "#555" }}>{t.template_name} · {t.send_delay_days > 0 ? `Day ${t.send_delay_days}` : "Immediate"}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
