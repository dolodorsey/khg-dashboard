"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Schedule() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    Promise.all([
      q("khg_master_tasks", "select=*&order=due_date&limit=200"),
      q("khg_session_handoffs", "select=*&order=created_at.desc&limit=10"),
      q("khg_cron_registry", "select=*&order=cron_name"),
    ]).then(([tasks, handoffs, crons]) => {
      setD({ tasks: tasks||[], handoffs: handoffs||[], crons: crons||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING SCHEDULE..." />;
  const { tasks, handoffs, crons } = d;
  const active = tasks.filter(t => !["done","cancelled"].includes(t.status));
  const overdue = active.filter(t => t.due_date && new Date(t.due_date) < new Date());
  const blocked = active.filter(t => t.status === "blocked");
  const delegated = active.filter(t => t.status === "delegated");
  const byAssignee = {};
  active.forEach(t => { const a = t.assigned_to||"Unassigned"; byAssignee[a] = (byAssignee[a]||0)+1; });
  const filtered = filter === "all" ? active : filter === "overdue" ? overdue : filter === "blocked" ? blocked : filter === "delegated" ? delegated : active.filter(t => t.status === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Schedule / Tasks" icon="📅" sub="Task queue, deadlines, sprint board, recurring tasks" color="#3B82F6" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Active Tasks" value={active.length} color="#3B82F6" />
          <Card title="Overdue" value={overdue.length} color={overdue.length > 0 ? "#EF4444" : "#22C55E"} />
          <Card title="Blocked" value={blocked.length} color={blocked.length > 0 ? "#F59E0B" : "#22C55E"} />
          <Card title="Delegated" value={delegated.length} sub="to team" color="#8B5CF6" />
          <Card title="Done" value={tasks.filter(t => t.status === "done").length} color="#22C55E" />
          <Card title="Cron Jobs" value={crons.filter(c => c.status === "active").length} sub={`of ${crons.length}`} color="#C9A96E" />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {["all","overdue","open","in_progress","blocked","delegated"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 10, fontWeight: 600, border: filter === f ? "1px solid #3B82F6" : "1px solid #E5E5E7", background: filter === f ? "#3B82F618" : "transparent", color: filter === f ? "#3B82F6" : "#666", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>{f.replace("_"," ")}</button>
          ))}
        </div>

        <Section title="Tasks" icon="📋" count={`${filtered.length} SHOWING`}>
          <Table headers={["Task","Priority","Status","Assigned","Due","Category"]} rows={filtered.slice(0,30).map(t => [
            <span key="t" style={{ maxWidth:280, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", display:"inline-block" }}>{t.title||"—"}</span>,
            <Badge key="p" text={t.priority||"normal"} color={t.priority==="critical"?"#EF4444":t.priority==="high"?"#F59E0B":"#555"} />,
            <Badge key="s" text={t.status||"open"} color={t.status==="in_progress"?"#3B82F6":t.status==="blocked"?"#EF4444":t.status==="delegated"?"#8B5CF6":"#555"} />,
            t.assigned_to||"—",
            t.due_date ? <span key="d" style={{ color: new Date(t.due_date) < new Date() ? "#EF4444" : "#888" }}>{new Date(t.due_date).toLocaleDateString()}</span> : "—",
            t.category||"—"
          ])} />
        </Section>

        <Section title="Assignee Load" icon="👥">
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {Object.entries(byAssignee).sort((a,b)=>b[1]-a[1]).map(([name, count]) => (
              <div key={name} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:20, padding:"6px 16px", fontSize:11 }}>
                <span style={{ color:"#3B82F6", fontWeight:700 }}>{count}</span> <span style={{ color:"#888" }}>{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Recent Handoffs" icon="🔄" count={handoffs.length}>
          {handoffs.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No session handoffs yet</div> :
          <Table headers={["Handoff","Summary","Date"]} rows={handoffs.slice(0,5).map(h => [
            h.handoff_id||"—",
            <span key="s" style={{ maxWidth:400, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", display:"inline-block" }}>{h.summary||h.context||"—"}</span>,
            h.created_at ? new Date(h.created_at).toLocaleDateString() : "—"
          ])} />}
        </Section>
      </div>
    </div>
  );
}
