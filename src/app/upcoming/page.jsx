"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Upcoming() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date().toISOString();
    const in30 = new Date(Date.now() + 30*86400000).toISOString();
    Promise.all([
      q("eventbrite_events", `select=*&event_date=gte.${now.split('T')[0]}&order=event_date&limit=50`),
      q("khg_master_tasks", `select=*&due_date=lte.${in30.split('T')[0]}&status=not.eq.done&order=due_date&limit=50`),
      q("khg_grant_tracker", `select=*&deadline=lte.${in30.split('T')[0]}&order=deadline&limit=20`),
      q("gt_daily_events", `select=*&limit=30`),
    ]).then(([events, tasks, grants, daily]) => {
      setD({ events: events||[], tasks: tasks||[], grants: grants||[], daily: daily||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING UPCOMING..." />;
  const { events, tasks, grants, daily } = d;
  const overdue = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date());

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Upcoming Events" icon="📆" sub="Next 30 days — events, deadlines, launches, milestones" color="#3B82F6" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Upcoming Events" value={events.length} sub="next 30 days" color="#3B82F6" />
          <Card title="Tasks Due" value={tasks.length} sub={`${overdue.length} overdue`} color={overdue.length > 0 ? "#EF4444" : "#22C55E"} />
          <Card title="Grant Deadlines" value={grants.length} sub="next 30 days" color="#C9A96E" />
        </div>

        <Section title="Events Calendar" icon="🎪" count={events.length}>
          {events.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No upcoming events in Eventbrite</div> :
          <Table headers={["Event","Brand","Date","Venue","Status"]} rows={events.map(e => [
            e.event_name||e.name||"—", e.entity_id||"—",
            e.event_date ? new Date(e.event_date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}) : "—",
            e.venue_name||"—", <Badge key="s" text={e.status||"draft"} color={e.status==="live"?"#22C55E":"#F59E0B"} />
          ])} />}
        </Section>

        {overdue.length > 0 && <Section title="OVERDUE Tasks" icon="🚨" count={overdue.length}>
          <Table headers={["Task","Priority","Assigned","Due"]} rows={overdue.map(t => [
            t.title||"—", <Badge key="p" text={t.priority||"normal"} color="#EF4444" />,
            t.assigned_to||"—", t.due_date ? new Date(t.due_date).toLocaleDateString() : "—"
          ])} />
        </Section>}

        <Section title="Grant Deadlines" icon="💰" count={grants.length}>
          {grants.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No grant deadlines in next 30 days</div> :
          <Table headers={["Grant","Amount","Deadline","Entity","Status"]} rows={grants.map(g => [
            g.grant_name||"—", g.amount ? `$${Number(g.amount).toLocaleString()}` : "—",
            g.deadline ? new Date(g.deadline).toLocaleDateString() : "—", g.entity_ids||"—",
            <Badge key="s" text={g.status||"not started"} color={g.status==="submitted"?"#22C55E":"#F59E0B"} />
          ])} />}
        </Section>
      </div>
    </div>
  );
}
