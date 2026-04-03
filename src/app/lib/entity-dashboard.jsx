"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const S = "https://dzlmtvodpyhetvektfuo.supabase.co";
const K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const q = async (t, p = "") => { try { const r = await fetch(`${S}/rest/v1/${t}${p ? "?" + p : ""}`, { headers: { apikey: K, Authorization: `Bearer ${K}` } }); return r.ok ? r.json() : []; } catch { return []; } };
const qi = async (t, d) => { try { const r = await fetch(`${S}/rest/v1/${t}`, { method: "POST", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };
const qu = async (t, m, d) => { try { const r = await fetch(`${S}/rest/v1/${t}?${m}`, { method: "PATCH", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };
const N8N = "https://dorsey.app.n8n.cloud/webhook";
const n8n = async (id, p = {}) => { try { await fetch(`${N8N}/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) }); return true; } catch { return false; } };

const Ic = ({d,s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const P = {
  home:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  task:"M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  send:"M22 2L11 13 M22 2l-7 20-4-9-9-4z",
  social:"M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  calendar:"M3 4h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V6c0-1.1.9-2 2-2z M16 2v4 M8 2v4 M3 10h18",
  team:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 3a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  check:"M20 6L9 17l-5-5", x:"M18 6L6 18 M6 6l12 12",
  plus:"M12 5v14 M5 12h14", play:"M5 3l14 9-14 9V3z",
  menu:"M3 12h18 M3 6h18 M3 18h18",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  link:"M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  refresh:"M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#f5f5f7;--sf:#fff;--sf2:#f0f0f4;--bd:#e5e5e7;--bd2:rgba(0,0,0,.12);--tx:#111;--tx2:#555;--tx3:#999;--ac:VAR_COLOR;--acBg:VAR_COLOR10;--gn:#22c55e;--rd:#ef4444;--yl:#eab308;--bl:#3b82f6;--r:10px;--rs:6px;--mn:'DM Mono',monospace;--sn:'DM Sans',sans-serif}
body{font-family:var(--sn);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:220px;min-width:220px;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column;overflow:hidden}
.sbh{padding:14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--bd)}
.sbh .logo{width:28px;height:28px;border-radius:7px;background:var(--ac);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#fff;flex-shrink:0}
.sbh span{font-weight:600;font-size:12px;letter-spacing:.04em;color:var(--tx)}
.st{padding:14px 14px 4px;font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--tx3)}
.ni{display:flex;align-items:center;gap:8px;padding:8px 14px;cursor:pointer;color:var(--tx2);font-size:12px;transition:all .15s;border-left:2px solid transparent;font-weight:500}
.ni:hover{color:var(--tx);background:rgba(0,0,0,.02)}.ni.act{color:var(--ac);background:var(--acBg);border-left-color:var(--ac);font-weight:600}
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden}
.tb{height:48px;min-height:48px;border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 20px;gap:12px;background:var(--sf)}
.tb-t{font-size:14px;font-weight:600}.tb-r{margin-left:auto;display:flex;gap:8px;align-items:center}
.cnt{flex:1;overflow-y:auto;padding:20px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.03)}
.ct{font-size:13px;font-weight:600;margin-bottom:8px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.sv{font-size:28px;font-weight:700;font-family:var(--mn);line-height:1.1}
.sl2{font-size:9px;color:var(--tx3);margin-top:4px;letter-spacing:.08em;text-transform:uppercase;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:var(--rs);font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid var(--bd);background:var(--sf);color:var(--tx2);font-family:var(--sn)}
.btn:hover{border-color:var(--bd2);color:var(--tx)}.btn-p{background:var(--ac);color:#fff;border-color:var(--ac)}.btn-g{background:var(--gn);color:#fff;border-color:var(--gn)}.btn-d{background:var(--rd);color:#fff;border-color:var(--rd)}.btn-sm{padding:5px 10px;font-size:10px}
.badge{display:inline-flex;align-items:center;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
.bg-g{background:rgba(34,197,94,.1);color:#16a34a}.bg-r{background:rgba(239,68,68,.1);color:#dc2626}.bg-y{background:rgba(234,179,8,.1);color:#a16207}.bg-b{background:rgba(59,130,246,.1);color:#2563eb}.bg-o{background:rgba(255,107,53,.1);color:#c2410c}.bg-x{background:rgba(0,0,0,.04);color:var(--tx3)}
.tbl{width:100%;border-collapse:collapse;font-size:12px}.tbl th{text-align:left;padding:8px 10px;color:var(--tx3);font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid var(--bd)}.tbl td{padding:8px 10px;border-bottom:1px solid #f5f5f5;color:var(--tx2)}.tbl tr:hover td{background:rgba(0,0,0,.01)}
.inp{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rs);padding:8px 12px;color:var(--tx);font-size:12px;font-family:var(--sn);width:100%;outline:none}.inp:focus{border-color:var(--ac)}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.pill{padding:5px 12px;border-radius:20px;font-size:11px;cursor:pointer;transition:all .15s;border:1px solid var(--bd);color:var(--tx3);background:transparent;font-family:var(--sn);font-weight:500}.pill.act{background:var(--ac);color:#fff;border-color:var(--ac);font-weight:600}
.row{display:flex;align-items:center;gap:8px}.divider{height:1px;background:var(--bd);margin:16px 0}.mono{font-family:var(--mn)}.ptr{cursor:pointer}.trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sec-t{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:10px}
@media(max-width:768px){.sb{position:fixed;z-index:100;left:-240px;transition:left .3s}.sb.open{left:0}.g2,.g3,.g4{grid-template-columns:1fr}}
`;

// ═══════════════════════════════════════════════
// OVERVIEW SCREEN
// ═══════════════════════════════════════════════
function Overview({ entity, navigate, data }) {
  const { tasks, outreach, posts, events } = data;
  const openTasks = (tasks||[]).filter(t => !["completed","cancelled"].includes(t.status));
  const queuedOutreach = (outreach||[]).filter(o => o.status === "queued");
  const queuedPosts = (posts||[]).filter(p => p.status === "queued");
  return (<div>
    <div className="g4" style={{marginBottom:14}}>
      <div className="card ptr" onClick={()=>navigate("tasks")}><div className="sv" style={{color:"var(--ac)"}}>{openTasks.length}</div><div className="sl2">Open Tasks</div></div>
      <div className="card ptr" onClick={()=>navigate("outreach")}><div className="sv" style={{color:"var(--bl)"}}>{queuedOutreach.length}</div><div className="sl2">Queued Outreach</div></div>
      <div className="card ptr" onClick={()=>navigate("social")}><div className="sv" style={{color:"var(--gn)"}}>{queuedPosts.length}</div><div className="sl2">Posts Queued</div></div>
      <div className="card ptr" onClick={()=>navigate("events")}><div className="sv" style={{color:"var(--yl)"}}>{(events||[]).length}</div><div className="sl2">Upcoming Events</div></div>
    </div>
    <div className="g2" style={{marginBottom:14}}>
      <div className="card" style={{maxHeight:340,overflowY:"auto"}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:8}}><div className="ct" style={{margin:0}}>Priority Tasks</div><button className="btn btn-sm" onClick={()=>navigate("tasks")}>All</button></div>
        {openTasks.filter(t=>t.priority==="critical"||t.priority==="high").slice(0,8).map((t,i) => (
          <div key={i} style={{padding:"6px 0",borderBottom:"1px solid var(--bd)",fontSize:12}}>
            <div className="row" style={{gap:6}}>
              <span className={`badge ${t.priority==="critical"?"bg-r":"bg-o"}`}>{t.priority}</span>
              <span className="trunc" style={{flex:1,fontWeight:500}}>{t.title}</span>
              <span className="badge bg-x" style={{fontSize:8}}>{t.assigned_to||"—"}</span>
            </div>
          </div>
        ))}
        {openTasks.filter(t=>t.priority==="critical"||t.priority==="high").length===0 && <div style={{color:"var(--tx3)",fontSize:11,padding:12,textAlign:"center"}}>No critical/high tasks</div>}
      </div>
      <div className="card" style={{maxHeight:340,overflowY:"auto"}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:8}}><div className="ct" style={{margin:0}}>Upcoming Events</div><button className="btn btn-sm" onClick={()=>navigate("events")}>All</button></div>
        {(events||[]).slice(0,8).map((ev,i) => (
          <div key={i} style={{padding:"6px 0",borderBottom:"1px solid var(--bd)",fontSize:12}}>
            <div className="row" style={{gap:6}}>
              <span className="mono" style={{fontSize:10,color:"var(--tx3)",minWidth:50}}>{ev.event_date?new Date(ev.event_date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}</span>
              <span className="trunc" style={{flex:1,fontWeight:500}}>{ev.event_name}</span>
              <span style={{fontSize:10,color:"var(--tx3)"}}>{ev.city}</span>
            </div>
          </div>
        ))}
        {(events||[]).length===0 && <div style={{color:"var(--tx3)",fontSize:11,padding:12,textAlign:"center"}}>No upcoming events</div>}
      </div>
    </div>
    <div className="card">
      <div className="ct">Quick Actions</div>
      <div className="row" style={{gap:8,flexWrap:"wrap"}}>
        <button className="btn btn-p" onClick={()=>navigate("tasks")}><Ic d={P.task} s={14} /> Tasks</button>
        <button className="btn" onClick={()=>navigate("outreach")}><Ic d={P.send} s={14} /> Outreach</button>
        <button className="btn" onClick={()=>navigate("social")}><Ic d={P.social} s={14} /> Social</button>
        <button className="btn" onClick={()=>navigate("events")}><Ic d={P.calendar} s={14} /> Events</button>
        <button className="btn" onClick={()=>navigate("contacts")}><Ic d={P.team} s={14} /> Contacts</button>
      </div>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════
// TASKS SCREEN (full execution)
// ═══════════════════════════════════════════════
function Tasks({ entity, data, reload }) {
  const [view, setView] = useState("all");
  const [creating, setCreating] = useState(false);
  const [nt, setNt] = useState({title:"",priority:"medium",assigned_to:"claude",category:"other",description:""});
  const [busy, setBusy] = useState(null);
  const tasks = (data.tasks||[]).filter(t=>!["completed","cancelled"].includes(t.status));
  const done = (data.tasks||[]).filter(t=>t.status==="completed");
  const blocked = tasks.filter(t=>t.status==="blocked");

  const update = async (id, d) => { setBusy(id); await qu("khg_master_tasks",`id=eq.${id}`,{...d,updated_at:new Date().toISOString()}); await reload(); setBusy(null); };
  const create = async () => {
    if(!nt.title.trim()) return; setBusy("new");
    await qi("khg_master_tasks",{task_key:`TASK-2026-${String(Date.now()).slice(-4)}`,title:nt.title,category:nt.category,priority:nt.priority,assigned_to:nt.assigned_to,description:nt.description||null,status:"open",brand:entity.key,created_by:"dr_dorsey"});
    setNt({title:"",priority:"medium",assigned_to:"claude",category:"other",description:""}); setCreating(false); await reload(); setBusy(null);
  };

  const filtered = view==="blocked"?blocked:view==="done"?done:tasks;
  return (<div>
    <div className="row" style={{justifyContent:"space-between",marginBottom:14}}>
      <div className="pills" style={{margin:0}}>
        <button className={`pill ${view==="all"?"act":""}`} onClick={()=>setView("all")}>Open ({tasks.length})</button>
        <button className={`pill ${view==="blocked"?"act":""}`} onClick={()=>setView("blocked")}>Blocked ({blocked.length})</button>
        <button className={`pill ${view==="done"?"act":""}`} onClick={()=>setView("done")}>Done ({done.length})</button>
      </div>
      <button className="btn btn-p" onClick={()=>setCreating(!creating)}><Ic d={P.plus} s={14} /> New Task</button>
    </div>
    {creating && <div className="card" style={{marginBottom:14,border:"1px solid var(--ac)"}}>
      <div className="ct">Create Task</div>
      <input className="inp" placeholder="Task title..." value={nt.title} onChange={e=>setNt({...nt,title:e.target.value})} style={{marginBottom:8}} />
      <input className="inp" placeholder="Description (optional)" value={nt.description} onChange={e=>setNt({...nt,description:e.target.value})} style={{marginBottom:8}} />
      <div className="row" style={{gap:8,marginBottom:8}}>
        <select className="inp" style={{flex:1}} value={nt.priority} onChange={e=>setNt({...nt,priority:e.target.value})}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
        <select className="inp" style={{flex:1}} value={nt.assigned_to} onChange={e=>setNt({...nt,assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
        <select className="inp" style={{flex:1}} value={nt.category} onChange={e=>setNt({...nt,category:e.target.value})}>{["automation","content","design","events","outreach","product","website","other"].map(c=><option key={c} value={c}>{c}</option>)}</select>
      </div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={create} disabled={busy==="new"||!nt.title.trim()}>{busy==="new"?"Creating...":"Create"}</button><button className="btn" onClick={()=>setCreating(false)}>Cancel</button></div>
    </div>}
    {filtered.map((t,i) => (
      <div key={t.id||i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${t.priority==="critical"?"var(--rd)":t.priority==="high"?"var(--ac)":"var(--bd)"}`,opacity:busy===t.id?.5:1}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
          <div className="row" style={{gap:6}}>
            <span className="mono" style={{fontSize:9,color:"var(--tx3)"}}>{t.task_key}</span>
            <span className={`badge ${t.priority==="critical"?"bg-r":t.priority==="high"?"bg-o":"bg-x"}`}>{t.priority}</span>
            <span className={`badge ${t.status==="blocked"?"bg-r":t.status==="in_progress"?"bg-b":t.status==="completed"?"bg-g":"bg-y"}`}>{(t.status||"").replace(/_/g," ")}</span>
          </div>
          <span className="badge bg-x">{(t.assigned_to||"—").toUpperCase()}</span>
        </div>
        <div style={{fontSize:13,fontWeight:600}}>{t.title}</div>
        {t.description && <div style={{fontSize:11,color:"var(--tx2)",marginTop:2}}>{t.description.slice(0,120)}</div>}
        <div className="row" style={{gap:4,marginTop:8,flexWrap:"wrap"}}>
          {t.status==="open" && <button className="btn btn-sm btn-p" onClick={()=>update(t.id,{status:"in_progress",started_at:new Date().toISOString()})}><Ic d={P.play} s={10}/> Start</button>}
          {t.status!=="completed" && <button className="btn btn-sm btn-g" onClick={()=>update(t.id,{status:"completed",completed_at:new Date().toISOString()})}><Ic d={P.check} s={10}/> Done</button>}
          {t.status!=="blocked" && t.status!=="completed" && <button className="btn btn-sm" onClick={()=>{const r=prompt("Blocker?");if(r)update(t.id,{status:"blocked",blocker_reason:r})}}>Block</button>}
          {t.status==="blocked" && <button className="btn btn-sm btn-p" onClick={()=>update(t.id,{status:"in_progress",blocker_reason:null})}>Unblock</button>}
          <select style={{fontSize:10,padding:"3px 6px",border:"1px solid var(--bd)",borderRadius:4,background:"var(--sf)",cursor:"pointer"}} value={t.assigned_to||""} onChange={e=>update(t.id,{assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
          <button className="btn btn-sm" style={{marginLeft:"auto",color:"var(--rd)"}} onClick={()=>{if(confirm("Cancel task?"))update(t.id,{status:"cancelled"})}}><Ic d={P.x} s={10}/></button>
        </div>
      </div>
    ))}
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)"}}>No tasks</div>}
  </div>);
}

// ═══════════════════════════════════════════════
// OUTREACH SCREEN (full execution)
// ═══════════════════════════════════════════════
function Outreach({ entity, data, reload }) {
  const [view, setView] = useState("queued");
  const [busy, setBusy] = useState(null);
  const all = data.outreach||[];
  const queued = all.filter(o=>o.status==="queued");
  const sent = all.filter(o=>o.status==="sent");
  const filtered = view==="sent"?sent:queued;

  const sendOne = async (id) => { setBusy(id); await qu("contact_action_queue",`id=eq.${id}`,{status:"sent",sent_at:new Date().toISOString()}); await reload(); setBusy(null); };
  const skip = async (id) => { setBusy(id); await qu("contact_action_queue",`id=eq.${id}`,{status:"skipped"}); await reload(); setBusy(null); };

  return (<div>
    <div className="row" style={{justifyContent:"space-between",marginBottom:14}}>
      <div className="pills" style={{margin:0}}>
        <button className={`pill ${view==="queued"?"act":""}`} onClick={()=>setView("queued")}>Queued ({queued.length})</button>
        <button className={`pill ${view==="sent"?"act":""}`} onClick={()=>setView("sent")}>Sent ({sent.length})</button>
      </div>
    </div>
    <table className="tbl"><thead><tr><th>Contact</th><th>Type</th><th>Segment</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{filtered.slice(0,30).map((o,i) => (
      <tr key={o.id||i} style={{opacity:busy===o.id?.5:1}}>
        <td style={{fontWeight:500}}>{o.contact_name||o.ig_handle||o.email||"—"}</td>
        <td>{o.action_type||"—"}</td>
        <td>{o.segment_type||"—"}</td>
        <td>{o.city||"—"}</td>
        <td><span className={`badge ${o.status==="sent"?"bg-g":"bg-y"}`}>{o.status}</span></td>
        <td><div className="row" style={{gap:4}}>
          {o.status==="queued" && <button className="btn btn-sm btn-p" onClick={()=>sendOne(o.id)}>Send</button>}
          {o.status==="queued" && <button className="btn btn-sm" onClick={()=>skip(o.id)}>Skip</button>}
        </div></td>
      </tr>
    ))}</tbody></table>
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)",marginTop:12}}>No {view} outreach</div>}
  </div>);
}

// ═══════════════════════════════════════════════
// SOCIAL SCREEN (full execution)
// ═══════════════════════════════════════════════
function Social({ entity, data, reload }) {
  const [tab, setTab] = useState("queued");
  const [busy, setBusy] = useState(null);
  const all = data.posts||[];
  const queued = all.filter(p=>p.status==="queued");
  const approved = all.filter(p=>p.status==="approved");
  const posted = all.filter(p=>p.status==="posted");
  const filtered = tab==="approved"?approved:tab==="posted"?posted:queued;

  const approve = async (id) => { setBusy(id); await qu("ghl_social_posting_queue",`id=eq.${id}`,{status:"approved"}); await reload(); setBusy(null); };
  const reject = async (id) => { setBusy(id); await qu("ghl_social_posting_queue",`id=eq.${id}`,{status:"rejected"}); await reload(); setBusy(null); };

  return (<div>
    <div className="pills">
      <button className={`pill ${tab==="queued"?"act":""}`} onClick={()=>setTab("queued")}>Queued ({queued.length})</button>
      <button className={`pill ${tab==="approved"?"act":""}`} onClick={()=>setTab("approved")}>Approved ({approved.length})</button>
      <button className={`pill ${tab==="posted"?"act":""}`} onClick={()=>setTab("posted")}>Posted ({posted.length})</button>
    </div>
    {filtered.slice(0,20).map((p,i) => (
      <div key={p.id||i} className="card" style={{marginBottom:6,opacity:busy===p.id?.5:1}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
          <span className="badge bg-b">{p.platform||"social"}</span>
          <span className={`badge ${p.status==="posted"?"bg-g":p.status==="approved"?"bg-b":"bg-y"}`}>{p.status}</span>
        </div>
        <div style={{fontSize:12,lineHeight:1.5,color:"var(--tx2)"}}>{(p.caption||p.content||"").slice(0,200)}</div>
        {p.status==="queued" && <div className="row" style={{gap:4,marginTop:8}}>
          <button className="btn btn-sm btn-g" onClick={()=>approve(p.id)}><Ic d={P.check} s={10}/> Approve</button>
          <button className="btn btn-sm btn-d" onClick={()=>reject(p.id)}><Ic d={P.x} s={10}/> Reject</button>
        </div>}
      </div>
    ))}
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)"}}>No {tab} posts</div>}
  </div>);
}

// ═══════════════════════════════════════════════
// EVENTS SCREEN (read + links)
// ═══════════════════════════════════════════════
function Events({ entity, data }) {
  const events = data.events||[];
  return (<div>
    <div className="sec-t">Upcoming Events ({events.length})</div>
    {events.map((ev,i) => (
      <div key={i} className="card" style={{marginBottom:6}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
          <div style={{fontSize:14,fontWeight:700}}>{ev.event_name}</div>
          {ev.event_url && <a href={ev.event_url} target="_blank" rel="noopener" className="btn btn-sm btn-p"><Ic d={P.link} s={10}/> Eventbrite</a>}
        </div>
        <div className="row" style={{gap:8}}>
          <span className="mono" style={{fontSize:11,color:"var(--tx3)"}}>{ev.event_date?new Date(ev.event_date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"TBD"}</span>
          <span style={{fontSize:11,color:"var(--tx3)"}}>{ev.city||""}</span>
          <span className="badge bg-x">{ev.brand_key}</span>
          {ev.is_active && <span className="badge bg-g">Active</span>}
        </div>
      </div>
    ))}
    {events.length===0 && <div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)"}}>No upcoming events</div>}
  </div>);
}

// ═══════════════════════════════════════════════
// CONTACTS SCREEN (read + search)
// ═══════════════════════════════════════════════
function Contacts({ entity, data }) {
  const [search, setSearch] = useState("");
  const contacts = data.contacts||[];
  const filtered = search ? contacts.filter(c=>(c.contact_name||c.email||c.ig_handle||"").toLowerCase().includes(search.toLowerCase())) : contacts;
  return (<div>
    <input className="inp" placeholder="Search contacts..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:14}} />
    <div className="sec-t">{filtered.length} contacts</div>
    <table className="tbl"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>IG</th><th>Segment</th><th>City</th></tr></thead>
    <tbody>{filtered.slice(0,40).map((c,i) => (
      <tr key={i}>
        <td style={{fontWeight:500}}>{c.contact_name||"—"}</td>
        <td style={{fontSize:11}}>{c.email||"—"}</td>
        <td style={{fontSize:11}}>{c.phone||"—"}</td>
        <td style={{fontSize:11}}>{c.ig_handle||"—"}</td>
        <td><span className="badge bg-x">{c.segment_type||"—"}</span></td>
        <td style={{fontSize:11}}>{c.city||"—"}</td>
      </tr>
    ))}</tbody></table>
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)",marginTop:12}}>No contacts found</div>}
  </div>);
}

// ═══════════════════════════════════════════════
// MAIN ENTITY DASHBOARD
// ═══════════════════════════════════════════════
export default function EntityDashboard({ entity }) {
  const [screen, setScreen] = useState("overview");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const bkFilter = entity.brandKeys.length > 0 ? `brand_key=in.(${entity.brandKeys.join(",")})` : "";
  const brandFilter = entity.brandKeys.length > 0 ? `brand=in.(${entity.brandKeys.join(",")})` : "";

  const loadData = useCallback(async () => {
    const [tasks, outreach, posts, events, contacts] = await Promise.all([
      q("khg_master_tasks", `select=*&${brandFilter?brandFilter+"&":""}status=not.in.(completed,cancelled)&order=priority,created_at.desc&limit=60`),
      q("contact_action_queue", `select=*&${bkFilter?bkFilter+"&":""}order=created_at.desc&limit=100`),
      q("ghl_social_posting_queue", `select=*&${bkFilter?bkFilter+"&":""}order=created_at.desc&limit=50`),
      q("eventbrite_events", `select=*&${bkFilter?bkFilter+"&":""}event_date=gte.${new Date().toISOString().split("T")[0]}&order=event_date.asc&limit=20`),
      q("contact_action_queue", `select=contact_name,email,phone,ig_handle,segment_type,city&${bkFilter?bkFilter+"&":""}order=contact_name&limit=200`),
    ]);
    setData({ tasks: tasks||[], outreach: outreach||[], posts: posts||[], events: events||[], contacts: contacts||[] });
    setLoading(false);
  }, [bkFilter, brandFilter]);

  useEffect(() => { loadData(); }, [loadData]);
  const navigate = useCallback((s) => setScreen(s), []);

  const navItems = [
    { id: "overview", label: "Overview", icon: P.home },
    { id: "tasks", label: "Tasks", icon: P.task },
    { id: "outreach", label: "Outreach", icon: P.send },
    { id: "social", label: "Social", icon: P.social },
    { id: "events", label: "Events", icon: P.calendar },
    { id: "contacts", label: "Contacts", icon: P.team },
  ];
  // Add entity-specific nav items
  if (entity.extraNav) entity.extraNav.forEach(n => navItems.push(n));

  const titles = {}; navItems.forEach(n => titles[n.id] = n.label);

  const renderScreen = () => {
    if (loading) return <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>Loading {entity.name}...</div>;
    switch(screen) {
      case "overview": return <Overview entity={entity} navigate={navigate} data={data} />;
      case "tasks": return <Tasks entity={entity} data={data} reload={loadData} />;
      case "outreach": return <Outreach entity={entity} data={data} reload={loadData} />;
      case "social": return <Social entity={entity} data={data} reload={loadData} />;
      case "events": return <Events entity={entity} data={data} />;
      case "contacts": return <Contacts entity={entity} data={data} />;
      default:
        if (entity.renderExtra) return entity.renderExtra(screen, data, loadData, navigate);
        return <Overview entity={entity} navigate={navigate} data={data} />;
    }
  };

  const themeCSS = css.replace(/VAR_COLOR10/g, entity.color+"10").replace(/VAR_COLOR/g, entity.color);

  return (<>
    <style>{themeCSS}</style>
    <div className="app">
      <div className="sb">
        <div className="sbh">
          <Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:10}}>
            <div className="logo">{entity.icon}</div>
            <span>{entity.name}</span>
          </Link>
        </div>
        <div style={{flex:1,overflowY:"auto",paddingTop:8}}>
          <div className="st">DASHBOARDS</div>
          {navItems.map(item => (
            <div key={item.id} className={`ni ${screen===item.id?"act":""}`} onClick={()=>navigate(item.id)}>
              <Ic d={item.icon} s={15} /><span>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{padding:12,borderTop:"1px solid var(--bd)"}}>
          <Link href="/" className="btn btn-sm" style={{width:"100%",justifyContent:"center",textDecoration:"none"}}>
            <Ic d={P.home} s={12} /> Back to Hub
          </Link>
        </div>
      </div>
      <div className="mn">
        <div className="tb">
          <div className="tb-t">{titles[screen]||entity.name}</div>
          <div className="tb-r">
            <span style={{fontSize:11,color:"var(--tx3)",fontFamily:"var(--mn)"}}>{new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
            <button className="btn btn-sm" onClick={()=>{setLoading(true);loadData()}}><Ic d={P.refresh} s={12}/></button>
          </div>
        </div>
        <div className="cnt">{renderScreen()}</div>
      </div>
    </div>
  </>);
}
