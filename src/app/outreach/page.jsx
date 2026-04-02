"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Outreach() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("contact_action_queue", "select=brand_key,action_type,status&limit=5000"),
      q("campaign_email_templates", "select=brand_key,template_name,pipeline_name,status&order=brand_key&limit=200"),
      q("khg_email_warmup", "select=*&order=email_account"),
      q("email_approval_queue", "select=*&order=created_at.desc&limit=20"),
      q("text_message_queue", "select=*&limit=100"),
      q("khg_escalation_rules", "select=*&order=priority.desc"),
    ]).then(([queue, templates, warmup, approvals, texts, rules]) => {
      setD({ queue: queue||[], templates: templates||[], warmup: warmup||[], approvals: approvals||[], texts: texts||[], rules: rules||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING OUTREACH..." />;
  const { queue, templates, warmup, approvals, texts, rules } = d;

  const byStatus = {};
  queue.forEach(q => { const s = q.status||"unknown"; byStatus[s] = (byStatus[s]||0)+1; });
  const emailsSent = queue.filter(q => q.status === "sent" && q.action_type?.includes("email")).length;
  const emailsHeld = queue.filter(q => q.status === "held" && q.action_type?.includes("email")).length;
  const textsSent = texts.filter(t => t.status === "sent").length;
  const textsFailed = texts.filter(t => t.status === "failed").length;

  const byAction = {};
  queue.forEach(q => { const a = q.action_type||"unknown"; byAction[a] = (byAction[a]||0)+1; });

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Outreach" icon="📨" sub="Email sequences, SMS, follow-up tracking, approval gate" color="#F59E0B" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Total Queue" value={queue.length.toLocaleString()} sub="all actions" color="#F59E0B" />
          <Card title="Emails Sent" value={emailsSent} color="#22C55E" />
          <Card title="Emails Held" value={emailsHeld.toLocaleString()} sub="frozen" color="#EF4444" />
          <Card title="Texts Sent" value={textsSent} sub={`${textsFailed} failed`} color="#3B82F6" />
          <Card title="Templates" value={templates.length} sub="email templates" color="#8B5CF6" />
          <Card title="Warmup Accounts" value={warmup.length} color="#C9A96E" />
        </div>

        <Section title="Queue by Status" icon="📊">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(byStatus).sort((a,b) => b[1]-a[1]).map(([status, count]) => (
              <div key={status} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 20, padding: "6px 16px", fontSize: 11 }}>
                <span style={{ color: status==="sent"?"#22C55E":status==="held"?"#EF4444":status==="approved"?"#3B82F6":"#888", fontWeight: 700 }}>{count.toLocaleString()}</span>
                <span style={{ color: "#888" }}> {status}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Queue by Action Type" icon="🔀">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(byAction).sort((a,b) => b[1]-a[1]).map(([action, count]) => (
              <div key={action} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 20, padding: "6px 16px", fontSize: 11 }}>
                <span style={{ color: "#F59E0B", fontWeight: 700 }}>{count.toLocaleString()}</span>
                <span style={{ color: "#888" }}> {action.replace(/_/g," ")}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Email Warmup Status" icon="📈" count={`${warmup.length} ACCOUNTS`}>
          <Table headers={["Account","Day","Daily Limit","Total Sent","Bounce Rate","Reputation","Active"]} rows={warmup.map(w => [
            w.email_account?.replace("@gmail.com","")?.replace("@caspergroupworldwide.com","@casper") || "—",
            w.current_day || "1",
            w.daily_limit || "25",
            w.total_sent || "0",
            w.bounce_rate ? `${w.bounce_rate}%` : "0%",
            <Badge key="r" text={w.reputation_score||"building"} color={w.reputation_score==="healthy"?"#22C55E":w.reputation_score==="at_risk"?"#F59E0B":"#3B82F6"} />,
            <Badge key="a" text={w.is_active?"ON":"OFF"} color={w.is_active?"#22C55E":"#555"} />
          ])} />
        </Section>

        <Section title="Escalation Rules" icon="🚨" count={rules.length}>
          <Table headers={["Trigger Keyword","Escalation Level","Action","Priority"]} rows={rules.map(r => [
            r.trigger_keyword||"—",
            <Badge key="l" text={r.escalation_level||"—"} color={r.escalation_level==="urgent"?"#EF4444":r.escalation_level==="hot"?"#F59E0B":"#3B82F6"} />,
            r.action||"—",
            r.priority||"—"
          ])} />
        </Section>

        <div style={{ background: "#0D0D0B", border: "1px solid #EF444433", borderRadius: 8, padding: 20, marginTop: 16 }}>
          <div style={{ fontSize: 10, color: "#EF4444", letterSpacing: 3, fontFamily: "'DM Mono',monospace", marginBottom: 12 }}>EMAIL RULES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 8, fontSize: 12, color: "#888" }}>
            <div>🛑 ZERO emails send without Dr. Dorsey approval</div>
            <div>📧 All emails to thedoctordorsey@gmail.com for QA (NOT CC'd, separate send)</div>
            <div>🎨 Brand logos + flyers + gold/luxury dark aesthetic — no bland text-only</div>
            <div>📈 Warmup: Day 1-3=25/day → Day 22+=500/day</div>
          </div>
        </div>
      </div>
    </div>
  );
}
