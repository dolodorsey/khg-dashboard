"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const S = "https://dzlmtvodpyhetvektfuo.supabase.co";
const K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const f = async (t, p = "") => { try { const r = await fetch(`${S}/rest/v1/${t}${p ? "?" + p : ""}`, { headers: { apikey: K, Authorization: `Bearer ${K}` } }); return r.ok ? r.json() : []; } catch { return []; } };
const fi = async (t, d) => { try { const r = await fetch(`${S}/rest/v1/${t}`, { method: "POST", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };
const fu = async (t, m, d) => { try { const r = await fetch(`${S}/rest/v1/${t}?${m}`, { method: "PATCH", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#FAFAF8;--sf:#FFFFFF;--sf2:#F5F3EF;--bd:#E8E4DD;--bd2:#D4CFC6;
  --tx:#1A1A18;--tx2:#6B6560;--tx3:#A39E96;
  --ac:#C9A96E;--ac2:#B8944D;--acBg:rgba(201,169,110,.08);
  --gn:#4A8F6D;--rd:#C45B4A;--yl:#D4A843;--bl:#5B7FA6;
  --hd:'Playfair Display',Georgia,serif;--bd-f:'Outfit',system-ui,sans-serif;
  --r:8px;--rs:5px
}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.fu{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) both}
.fi{animation:fadeIn .4s ease both}
body{font-family:var(--bd-f);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased;font-weight:400}
h1,h2,h3{font-family:var(--hd);font-weight:600;letter-spacing:-.02em}

.app{display:flex;height:100vh;overflow:hidden}

/* SIDEBAR */
.sb{width:230px;min-width:230px;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column}
.sb-brand{padding:20px 18px;border-bottom:1px solid var(--bd)}
.sb-brand h2{font-size:15px;color:var(--ac);margin-bottom:2px}
.sb-brand p{font-size:10px;color:var(--tx3);font-family:var(--bd-f);letter-spacing:.12em;text-transform:uppercase;font-weight:500}
.sb-nav{flex:1;overflow-y:auto;padding:12px 0}
.sb-section{padding:0 18px;margin-bottom:16px}
.sb-section-title{font-size:9px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--tx3);margin-bottom:8px;font-family:var(--bd-f)}
.sb-item{display:flex;align-items:center;gap:10px;padding:9px 14px;margin:0 -14px;border-radius:6px;cursor:pointer;font-size:13px;color:var(--tx2);transition:all .15s;font-weight:400}
.sb-item:hover{background:var(--sf2);color:var(--tx)}
.sb-item.active{background:var(--acBg);color:var(--ac);font-weight:600}
.sb-item .count{margin-left:auto;font-size:10px;font-family:var(--bd-f);font-weight:500;color:var(--tx3);background:var(--sf2);padding:1px 7px;border-radius:10px}
.sb-back{padding:14px 18px;border-top:1px solid var(--bd)}
.sb-back a{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--tx3);text-decoration:none;font-weight:500;transition:color .15s}
.sb-back a:hover{color:var(--ac)}

/* MAIN */
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:52px;min-height:52px;border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 24px;background:var(--sf)}
.topbar h1{font-size:16px;font-weight:600}
.topbar .meta{margin-left:auto;font-size:11px;color:var(--tx3);font-family:var(--bd-f);font-weight:400}
.content{flex:1;overflow-y:auto;padding:24px}

/* COMPONENTS */
.card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:18px;transition:box-shadow .2s}
.card:hover{box-shadow:0 2px 12px rgba(0,0,0,.04)}
.stat{text-align:center;padding:20px 16px}
.stat-val{font-family:var(--hd);font-size:30px;font-weight:700;letter-spacing:-.02em}
.stat-label{font-size:10px;color:var(--tx3);margin-top:4px;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.grid5{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--rs);font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--bd);background:var(--sf);color:var(--tx2);font-family:var(--bd-f);transition:all .15s}
.btn:hover{border-color:var(--bd2);color:var(--tx)}
.btn-p{background:var(--ac);color:#fff;border-color:var(--ac)}.btn-p:hover{background:var(--ac2)}
.btn-g{background:var(--gn);color:#fff;border-color:var(--gn)}
.btn-r{background:var(--rd);color:#fff;border-color:var(--rd)}
.btn-s{padding:5px 11px;font-size:11px}
.badge{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:9px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.b-gold{background:rgba(201,169,110,.12);color:var(--ac)}.b-green{background:rgba(74,143,109,.12);color:var(--gn)}.b-red{background:rgba(196,91,74,.12);color:var(--rd)}.b-blue{background:rgba(91,127,166,.12);color:var(--bl)}.b-mute{background:var(--sf2);color:var(--tx3)}
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl th{text-align:left;padding:10px 12px;color:var(--tx3);font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid var(--bd);font-family:var(--bd-f)}
.tbl td{padding:10px 12px;border-bottom:1px solid var(--sf2);color:var(--tx2);font-size:12px}
.tbl tr:hover td{background:var(--sf2)}
.inp{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rs);padding:9px 14px;color:var(--tx);font-size:13px;font-family:var(--bd-f);width:100%;outline:none;transition:border .15s}
.inp:focus{border-color:var(--ac);box-shadow:0 0 0 3px rgba(201,169,110,.1)}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.pill{padding:6px 14px;border-radius:20px;font-size:11px;cursor:pointer;border:1px solid var(--bd);color:var(--tx3);background:var(--sf);font-family:var(--bd-f);font-weight:500;transition:all .15s}
.pill.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.row{display:flex;align-items:center;gap:8px}
.sep{height:1px;background:var(--bd);margin:20px 0}
.section-t{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3);margin-bottom:12px;font-family:var(--bd-f)}
.trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media(max-width:768px){.sb{display:none}.grid2,.grid3,.grid4,.grid5{grid-template-columns:1fr}}
`;

// ═══ OVERVIEW ═══
function Overview({ d, go }) {
  return (<div className="fu">
    <div className="grid5" style={{marginBottom:20}}>
      <div className="card stat" style={{cursor:"pointer"}} onClick={()=>go("directory")}><div className="stat-val" style={{color:"var(--ac)"}}>{(d.directory||[]).length.toLocaleString()}</div><div className="stat-label">Directory</div></div>
      <div className="card stat" style={{cursor:"pointer"}} onClick={()=>go("outreach")}><div className="stat-val" style={{color:"var(--bl)"}}>{(d.outreach||[]).filter(o=>o.status==="queued").length.toLocaleString()}</div><div className="stat-label">Outreach Queued</div></div>
      <div className="card stat" style={{cursor:"pointer"}} onClick={()=>go("social")}><div className="stat-val" style={{color:"var(--gn)"}}>{(d.social||[]).length}</div><div className="stat-label">Social Posts</div></div>
      <div className="card stat" style={{cursor:"pointer"}} onClick={()=>go("content")}><div className="stat-val" style={{color:"var(--yl)"}}>{(d.content||[]).length}</div><div className="stat-label">Content Slots</div></div>
      <div className="card stat" style={{cursor:"pointer"}} onClick={()=>go("tasks")}><div className="stat-val" style={{color:"var(--rd)"}}>{(d.tasks||[]).length}</div><div className="stat-label">Open Tasks</div></div>
    </div>

    <div className="grid2" style={{marginBottom:20}}>
      <div className="card">
        <div className="row" style={{justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:14}}>Priority Tasks</h3><button className="btn btn-s" onClick={()=>go("tasks")}>All Tasks</button></div>
        {(d.tasks||[]).filter(t=>t.priority==="critical"||t.priority==="high").slice(0,6).map((t,i) => (
          <div key={i} style={{padding:"8px 0",borderBottom:"1px solid var(--sf2)",display:"flex",alignItems:"center",gap:8}}>
            <span className={`badge ${t.priority==="critical"?"b-red":"b-gold"}`}>{t.priority}</span>
            <span className="trunc" style={{flex:1,fontSize:13,fontWeight:500}}>{t.title}</span>
            <span className="badge b-mute">{t.assigned_to||"—"}</span>
          </div>
        ))}
        {(d.tasks||[]).filter(t=>t.priority==="critical"||t.priority==="high").length===0 && <p style={{color:"var(--tx3)",fontSize:12,padding:12,textAlign:"center"}}>No high priority tasks</p>}
      </div>
      <div className="card">
        <div className="row" style={{justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:14}}>VIP Circle</h3><button className="btn btn-s" onClick={()=>go("vip")}>View All</button></div>
        {(d.vip||[]).slice(0,6).map((v,i) => (
          <div key={i} style={{padding:"8px 0",borderBottom:"1px solid var(--sf2)",display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:"var(--acBg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"var(--ac)",fontFamily:"var(--hd)",flexShrink:0}}>{(v.full_name||"?")[0]}</div>
            <div style={{flex:1,minWidth:0}}><div className="trunc" style={{fontSize:13,fontWeight:500}}>{v.full_name}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{v.profession||v.known_for||"—"}</div></div>
            <span className="badge b-gold">{v.tier||"—"}</span>
          </div>
        ))}
        {(d.vip||[]).length===0 && <p style={{color:"var(--tx3)",fontSize:12,padding:12,textAlign:"center"}}>No VIPs added yet</p>}
      </div>
    </div>

    <div className="card">
      <h3 style={{fontSize:14,marginBottom:12}}>Content Calendar This Week</h3>
      <div className="grid3">
        {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => {
          const slots = (d.content||[]).filter(c=>c.day_of_week===day);
          return (<div key={day} style={{padding:10,background:"var(--sf2)",borderRadius:6,minHeight:60}}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--tx3)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>{day.slice(0,3)}</div>
            {slots.map((s,i) => (<div key={i} style={{fontSize:10,color:"var(--tx2)",marginBottom:3}}><span style={{fontWeight:600}}>{s.post_time}</span> · {s.content_pillar||"post"}</div>))}
            {slots.length===0 && <div style={{fontSize:10,color:"var(--tx3)"}}>—</div>}
          </div>);
        })}
      </div>
    </div>
  </div>);
}

// ═══ DIRECTORY ═══
function Directory({ d }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const all = d.directory||[];
  const cats = [...new Set(all.map(c=>c.category).filter(Boolean))].sort();
  const filtered = all.filter(c => {
    if(catFilter !== "all" && c.category !== catFilter) return false;
    if(!search) return true;
    return [c.display_name,c.email,c.phone,c.instagram,c.company,c.profession].some(v=>(v||"").toLowerCase().includes(search.toLowerCase()));
  });
  return (<div className="fu">
    <div className="row" style={{gap:12,marginBottom:16}}>
      <input className="inp" placeholder="Search 2,147 contacts..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:360}} />
      <select className="inp" style={{maxWidth:180}} value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
        <option value="all">All Categories ({all.length})</option>
        {cats.map(c=><option key={c} value={c}>{c} ({all.filter(x=>x.category===c).length})</option>)}
      </select>
    </div>
    <div className="section-t">{filtered.length} contacts</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table className="tbl"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>IG</th><th>Category</th><th>Company</th><th>City</th><th>Tier</th></tr></thead>
        <tbody>{filtered.slice(0,50).map((c,i) => (
          <tr key={i}>
            <td style={{fontWeight:500,color:"var(--tx)",whiteSpace:"nowrap"}}>{c.display_name||"—"}</td>
            <td style={{fontSize:11,fontFamily:"var(--bd-f)"}}>{c.phone||"—"}</td>
            <td style={{fontSize:11}}>{c.email||"—"}</td>
            <td style={{fontSize:11,color:"var(--ac)"}}>{c.instagram||"—"}</td>
            <td><span className="badge b-mute">{c.category||"—"}</span></td>
            <td style={{fontSize:11}}>{c.company||"—"}</td>
            <td style={{fontSize:11}}>{c.city||"—"}</td>
            <td>{c.relationship_tier ? <span className="badge b-gold">{c.relationship_tier}</span> : "—"}</td>
          </tr>
        ))}</tbody></table>
      </div>
    </div>
    {filtered.length > 50 && <p style={{fontSize:11,color:"var(--tx3)",marginTop:8,textAlign:"center"}}>Showing 50 of {filtered.length}</p>}
  </div>);
}

// ═══ VIP CIRCLE ═══
function VipCircle({ d }) {
  const vips = d.vip||[];
  return (<div className="fu">
    <div className="section-t">{vips.length} VIPs</div>
    {vips.map((v,i) => (
      <div key={i} className="card" style={{marginBottom:10,borderLeft:"3px solid var(--ac)"}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
          <h3 style={{fontSize:15}}>{v.full_name}</h3>
          <div className="row" style={{gap:4}}>
            {v.tier && <span className="badge b-gold">{v.tier}</span>}
            {v.influence_level && <span className="badge b-blue">{v.influence_level}</span>}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,fontSize:12,color:"var(--tx2)"}}>
          <div><strong style={{color:"var(--tx3)",fontSize:10,textTransform:"uppercase",letterSpacing:".08em"}}>Phone</strong><br/>{v.phone||"—"}</div>
          <div><strong style={{color:"var(--tx3)",fontSize:10,textTransform:"uppercase",letterSpacing:".08em"}}>Email</strong><br/>{v.email||"—"}</div>
          <div><strong style={{color:"var(--tx3)",fontSize:10,textTransform:"uppercase",letterSpacing:".08em"}}>IG</strong><br/>{v.instagram||"—"}</div>
          <div><strong style={{color:"var(--tx3)",fontSize:10,textTransform:"uppercase",letterSpacing:".08em"}}>Profession</strong><br/>{v.profession||"—"}</div>
          <div><strong style={{color:"var(--tx3)",fontSize:10,textTransform:"uppercase",letterSpacing:".08em"}}>Known For</strong><br/>{v.known_for||"—"}</div>
          <div><strong style={{color:"var(--tx3)",fontSize:10,textTransform:"uppercase",letterSpacing:".08em"}}>City</strong><br/>{v.city||"—"}</div>
        </div>
        {v.notes && <div style={{marginTop:8,padding:10,background:"var(--sf2)",borderRadius:6,fontSize:11,color:"var(--tx2)",lineHeight:1.5}}>{v.notes}</div>}
      </div>
    ))}
    {vips.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No VIPs in circle yet</div>}
  </div>);
}

// ═══ TASKS (full execution) ═══
function Tasks({ d, reload }) {
  const [view, setView] = useState("open");
  const [creating, setCreating] = useState(false);
  const [nt, setNt] = useState({title:"",priority:"medium",assigned_to:"claude",category:"other",description:""});
  const [busy, setBusy] = useState(null);
  const tasks = d.tasks||[];
  const open = tasks.filter(t=>!["completed","cancelled"].includes(t.status));
  const blocked = tasks.filter(t=>t.status==="blocked");
  const done = tasks.filter(t=>t.status==="completed");
  const filtered = view==="blocked"?blocked:view==="done"?done:open;

  const up = async (id, data) => { setBusy(id); await fu("khg_master_tasks",`id=eq.${id}`,{...data,updated_at:new Date().toISOString()}); await reload(); setBusy(null); };
  const create = async () => {
    if(!nt.title.trim()) return; setBusy("new");
    const ex = await f("khg_master_tasks","select=task_key&order=task_key.desc&limit=1");
    const num = ex[0]?.task_key ? parseInt(ex[0].task_key.split("-").pop())+1 : 95;
    await fi("khg_master_tasks",{task_key:`TASK-2026-${String(num).padStart(4,"0")}`,title:nt.title,category:nt.category,priority:nt.priority,assigned_to:nt.assigned_to,description:nt.description||null,status:"open",brand:"dr_dorsey",created_by:"dr_dorsey"});
    setNt({title:"",priority:"medium",assigned_to:"claude",category:"other",description:""}); setCreating(false); await reload(); setBusy(null);
  };

  return (<div className="fu">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
      <div className="pills" style={{margin:0}}>
        <button className={`pill ${view==="open"?"on":""}`} onClick={()=>setView("open")}>Open ({open.length})</button>
        <button className={`pill ${view==="blocked"?"on":""}`} onClick={()=>setView("blocked")}>Blocked ({blocked.length})</button>
        <button className={`pill ${view==="done"?"on":""}`} onClick={()=>setView("done")}>Done ({done.length})</button>
      </div>
      <button className="btn btn-p" onClick={()=>setCreating(!creating)}>+ New Task</button>
    </div>
    {creating && <div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <h3 style={{fontSize:14,marginBottom:10}}>Create Task</h3>
      <input className="inp" placeholder="Task title..." value={nt.title} onChange={e=>setNt({...nt,title:e.target.value})} style={{marginBottom:8}} />
      <input className="inp" placeholder="Description (optional)" value={nt.description} onChange={e=>setNt({...nt,description:e.target.value})} style={{marginBottom:8}} />
      <div className="row" style={{gap:8,marginBottom:10}}>
        <select className="inp" style={{flex:1}} value={nt.priority} onChange={e=>setNt({...nt,priority:e.target.value})}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
        <select className="inp" style={{flex:1}} value={nt.assigned_to} onChange={e=>setNt({...nt,assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
        <select className="inp" style={{flex:1}} value={nt.category} onChange={e=>setNt({...nt,category:e.target.value})}>{["automation","content","design","events","outreach","product","website","other"].map(c=><option key={c} value={c}>{c}</option>)}</select>
      </div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={create} disabled={busy==="new"||!nt.title.trim()}>{busy==="new"?"Creating...":"Create"}</button><button className="btn" onClick={()=>setCreating(false)}>Cancel</button></div>
    </div>}
    {filtered.map((t,i) => (
      <div key={t.id||i} className="card" style={{marginBottom:8,borderLeft:`3px solid ${t.priority==="critical"?"var(--rd)":t.priority==="high"?"var(--ac)":"var(--bd)"}`,opacity:busy===t.id?.5:1}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
          <div className="row" style={{gap:6}}>
            <span style={{fontSize:9,color:"var(--tx3)",fontFamily:"monospace"}}>{t.task_key}</span>
            <span className={`badge ${t.priority==="critical"?"b-red":t.priority==="high"?"b-gold":"b-mute"}`}>{t.priority}</span>
            <span className={`badge ${t.status==="blocked"?"b-red":t.status==="in_progress"?"b-blue":t.status==="completed"?"b-green":"b-mute"}`}>{(t.status||"").replace(/_/g," ")}</span>
          </div>
          <span className="badge b-mute">{(t.assigned_to||"—").toUpperCase()}</span>
        </div>
        <div style={{fontSize:14,fontWeight:500,fontFamily:"var(--hd)"}}>{t.title}</div>
        {t.description && <div style={{fontSize:12,color:"var(--tx2)",marginTop:3,lineHeight:1.5}}>{(t.description||"").slice(0,150)}</div>}
        <div className="row" style={{gap:4,marginTop:10,flexWrap:"wrap"}}>
          {t.status==="open" && <button className="btn btn-s btn-p" onClick={()=>up(t.id,{status:"in_progress",started_at:new Date().toISOString()})}>Start</button>}
          {t.status!=="completed" && <button className="btn btn-s btn-g" onClick={()=>up(t.id,{status:"completed",completed_at:new Date().toISOString()})}>Done</button>}
          {t.status!=="blocked"&&t.status!=="completed" && <button className="btn btn-s" onClick={()=>{const r=prompt("Blocker?");if(r)up(t.id,{status:"blocked",blocker_reason:r})}}>Block</button>}
          {t.status==="blocked" && <button className="btn btn-s btn-p" onClick={()=>up(t.id,{status:"in_progress",blocker_reason:null})}>Unblock</button>}
          <select style={{fontSize:11,padding:"4px 8px",border:"1px solid var(--bd)",borderRadius:4,background:"var(--sf)",cursor:"pointer",fontFamily:"var(--bd-f)"}} value={t.assigned_to||""} onChange={e=>up(t.id,{assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
          <button className="btn btn-s" style={{marginLeft:"auto",color:"var(--rd)"}} onClick={()=>{if(confirm("Cancel?"))up(t.id,{status:"cancelled"})}}>Cancel</button>
        </div>
      </div>
    ))}
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No {view} tasks</div>}
  </div>);
}

// ═══ OUTREACH ═══
function Outreach({ d, reload }) {
  const [view, setView] = useState("queued");
  const [busy, setBusy] = useState(null);
  const all = d.outreach||[];
  const queued = all.filter(o=>o.status==="queued");
  const sent = all.filter(o=>o.status==="sent");
  const filtered = view==="sent"?sent:queued;

  const send = async (id) => { setBusy(id); await fu("contact_action_queue",`id=eq.${id}`,{status:"sent",sent_at:new Date().toISOString()}); await reload(); setBusy(null); };
  const skip = async (id) => { setBusy(id); await fu("contact_action_queue",`id=eq.${id}`,{status:"skipped"}); await reload(); setBusy(null); };

  return (<div className="fu">
    <div className="pills">
      <button className={`pill ${view==="queued"?"on":""}`} onClick={()=>setView("queued")}>Queued ({queued.length})</button>
      <button className={`pill ${view==="sent"?"on":""}`} onClick={()=>setView("sent")}>Sent ({sent.length})</button>
    </div>
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      <table className="tbl"><thead><tr><th>Contact</th><th>Type</th><th>Segment</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{filtered.slice(0,30).map((o,i) => (
        <tr key={o.id||i} style={{opacity:busy===o.id?.5:1}}>
          <td style={{fontWeight:500,color:"var(--tx)"}}>{o.contact_name||o.ig_handle||o.contact_email||"—"}</td>
          <td>{o.action_type||"—"}</td>
          <td><span className="badge b-mute">{o.segment_type||"—"}</span></td>
          <td>{o.contact_city||"—"}</td>
          <td><span className={`badge ${o.status==="sent"?"b-green":"b-gold"}`}>{o.status}</span></td>
          <td><div className="row" style={{gap:4}}>
            {o.status==="queued" && <button className="btn btn-s btn-p" onClick={()=>send(o.id)}>Send</button>}
            {o.status==="queued" && <button className="btn btn-s" onClick={()=>skip(o.id)}>Skip</button>}
          </div></td>
        </tr>
      ))}</tbody></table>
    </div>
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)",marginTop:12}}>No {view} outreach</div>}
  </div>);
}

// ═══ SOCIAL ═══
function SocialPosts({ d, reload }) {
  const [tab, setTab] = useState("all");
  const [busy, setBusy] = useState(null);
  const all = d.social||[];
  const queued = all.filter(p=>p.status==="queued");
  const posted = all.filter(p=>p.status==="posted");
  const filtered = tab==="queued"?queued:tab==="posted"?posted:all;

  const approve = async (id) => { setBusy(id); await fu("ghl_social_posting_queue",`id=eq.${id}`,{status:"approved"}); await reload(); setBusy(null); };
  const reject = async (id) => { setBusy(id); await fu("ghl_social_posting_queue",`id=eq.${id}`,{status:"rejected"}); await reload(); setBusy(null); };

  return (<div className="fu">
    <div className="pills">
      <button className={`pill ${tab==="all"?"on":""}`} onClick={()=>setTab("all")}>All ({all.length})</button>
      <button className={`pill ${tab==="queued"?"on":""}`} onClick={()=>setTab("queued")}>Queued ({queued.length})</button>
      <button className={`pill ${tab==="posted"?"on":""}`} onClick={()=>setTab("posted")}>Posted ({posted.length})</button>
    </div>
    {filtered.map((p,i) => (
      <div key={p.id||i} className="card" style={{marginBottom:8,opacity:busy===p.id?.5:1}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
          <div className="row" style={{gap:6}}>
            <span className="badge b-blue">{p.platform||"IG"}</span>
            <span className="badge b-mute">{p.content_type||"post"}</span>
          </div>
          <span className={`badge ${p.status==="posted"?"b-green":p.status==="approved"?"b-blue":"b-gold"}`}>{p.status}</span>
        </div>
        <div style={{fontSize:13,lineHeight:1.6,color:"var(--tx2)"}}>{(p.caption||"").slice(0,250)}</div>
        {p.image_url && <div style={{marginTop:8}}><img src={p.image_url} alt="" style={{maxWidth:200,borderRadius:6,border:"1px solid var(--bd)"}} onError={e=>{e.target.style.display="none"}} /></div>}
        {p.hashtags && <div style={{fontSize:10,color:"var(--ac)",marginTop:6}}>{(Array.isArray(p.hashtags)?p.hashtags:String(p.hashtags).split(",")).slice(0,6).map(h=>`#${h.replace("#","")}`).join(" ")}</div>}
        {p.status==="queued" && <div className="row" style={{gap:6,marginTop:10}}>
          <button className="btn btn-s btn-g" onClick={()=>approve(p.id)}>Approve</button>
          <button className="btn btn-s btn-r" onClick={()=>reject(p.id)}>Reject</button>
        </div>}
      </div>
    ))}
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No {tab} posts</div>}
  </div>);
}

// ═══ CONTENT SCHEDULE ═══
function ContentSchedule({ d }) {
  const slots = d.content||[];
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return (<div className="fu">
    <div className="section-t">{slots.length} weekly content slots</div>
    {days.map(day => {
      const daySlots = slots.filter(s=>s.day_of_week===day);
      if(daySlots.length===0) return null;
      return (<div key={day} style={{marginBottom:16}}>
        <h3 style={{fontSize:14,marginBottom:8}}>{day}</h3>
        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <table className="tbl"><thead><tr><th>Time</th><th>Pillar</th><th>Visual</th><th>Caption Template</th><th>CTA</th></tr></thead>
          <tbody>{daySlots.map((s,i) => (
            <tr key={i}>
              <td style={{fontWeight:500,fontFamily:"monospace"}}>{s.post_time||"—"}</td>
              <td><span className="badge b-gold">{s.content_pillar||"—"}</span></td>
              <td>{s.visual_type||"—"}</td>
              <td className="trunc" style={{maxWidth:200}}>{s.caption_template||"—"}</td>
              <td style={{fontSize:11}}>{s.cta||"—"}</td>
            </tr>
          ))}</tbody></table>
        </div>
      </div>);
    })}
    {slots.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No content schedule defined</div>}
  </div>);
}

// ═══ EMAIL APPROVALS ═══
function EmailApprovals({ d, reload }) {
  const [busy, setBusy] = useState(null);
  const emails = d.emails||[];
  const pending = emails.filter(e=>!e.approved);
  const approved = emails.filter(e=>e.approved);

  const approve = async (id) => { setBusy(id); await fu("email_approval_queue",`id=eq.${id}`,{approved:true,approved_at:new Date().toISOString(),approved_by:"dr_dorsey"}); await reload(); setBusy(null); };

  return (<div className="fu">
    <div className="section-t">{pending.length} pending approval · {approved.length} approved</div>
    {pending.length===0 && approved.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No emails in queue</div>}
    {pending.map((e,i) => (
      <div key={e.id||i} className="card" style={{marginBottom:8,borderLeft:"3px solid var(--yl)",opacity:busy===e.id?.5:1}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
          <div><span className="badge b-gold">{e.brand_key||"—"}</span> <span className="badge b-mute">{e.sequence_type||"—"}</span></div>
          <span style={{fontSize:11,color:"var(--tx3)"}}>{e.recipient_count||0} recipients</span>
        </div>
        <h3 style={{fontSize:14,marginBottom:4}}>{e.subject||"(no subject)"}</h3>
        <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.6,maxHeight:80,overflow:"hidden"}}>{e.body_preview||""}</div>
        <div className="row" style={{gap:6,marginTop:10}}>
          <button className="btn btn-s btn-g" onClick={()=>approve(e.id)}>Approve</button>
          <button className="btn btn-s btn-r" onClick={()=>{if(confirm("Reject?"))fu("email_approval_queue",`id=eq.${e.id}`,{notes:"REJECTED"}).then(reload)}}>Reject</button>
        </div>
      </div>
    ))}
    {approved.length>0 && <><div className="sep"/><div className="section-t">Approved</div>
      {approved.slice(0,5).map((e,i) => (
        <div key={e.id||i} className="card" style={{marginBottom:6,borderLeft:"3px solid var(--gn)"}}>
          <div className="row" style={{gap:6}}><span className="badge b-green">Approved</span><span className="badge b-mute">{e.brand_key}</span><span style={{flex:1,fontSize:13,fontWeight:500}}>{e.subject}</span><span style={{fontSize:10,color:"var(--tx3)"}}>{e.recipient_count} recipients</span></div>
        </div>
      ))}
    </>}
  </div>);
}

// ═══ MAIN ═══
export default function DrDorseyDashboard() {
  const [screen, setScreen] = useState("overview");
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [directory, vip, outreach, social, tasks, content, emails] = await Promise.all([
      f("dolo_directory","select=display_name,first_name,last_name,phone,email,instagram,category,subcategory,relationship_tier,company,profession,city,is_vip&order=display_name&limit=500"),
      f("dolo_vip_circle","select=*&order=full_name&limit=50"),
      f("contact_action_queue","select=*&brand_key=eq.dr_dorsey&order=created_at.desc&limit=100"),
      f("ghl_social_posting_queue","select=*&brand_key=eq.dr_dorsey&order=created_at.desc&limit=50"),
      f("khg_master_tasks","select=*&status=not.in.(completed,cancelled)&order=priority,created_at.desc&limit=80"),
      f("weekly_content_schedule","select=*&brand_key=eq.dr_dorsey&is_active=eq.true&order=day_of_week,post_time"),
      f("email_approval_queue","select=*&order=created_at.desc&limit=30"),
    ]);
    setD({ directory:directory||[], vip:vip||[], outreach:outreach||[], social:social||[], tasks:tasks||[], content:content||[], emails:emails||[] });
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);
  const go = useCallback((s) => setScreen(s), []);

  const nav = [
    { id:"overview", label:"Overview", section:"Command" },
    { id:"directory", label:"Directory", count:(d.directory||[]).length, section:"Command" },
    { id:"vip", label:"VIP Circle", count:(d.vip||[]).length, section:"Command" },
    { id:"tasks", label:"Tasks", count:(d.tasks||[]).filter(t=>!["completed","cancelled"].includes(t.status)).length, section:"Execution" },
    { id:"outreach", label:"Outreach", count:(d.outreach||[]).filter(o=>o.status==="queued").length, section:"Execution" },
    { id:"social", label:"Social Media", count:(d.social||[]).length, section:"Execution" },
    { id:"content", label:"Content Calendar", count:(d.content||[]).length, section:"Execution" },
    { id:"emails", label:"Email Approvals", count:(d.emails||[]).filter(e=>!e.approved).length, section:"Execution" },
  ];
  const sections = [...new Set(nav.map(n=>n.section))];
  const titles = {}; nav.forEach(n => titles[n.id] = n.label);

  const renderScreen = () => {
    if(loading) return <div style={{textAlign:"center",padding:60,color:"var(--tx3)"}}>Loading Dr. Dorsey...</div>;
    switch(screen) {
      case "overview": return <Overview d={d} go={go} />;
      case "directory": return <Directory d={d} />;
      case "vip": return <VipCircle d={d} />;
      case "tasks": return <Tasks d={d} reload={load} />;
      case "outreach": return <Outreach d={d} reload={load} />;
      case "social": return <SocialPosts d={d} reload={load} />;
      case "content": return <ContentSchedule d={d} />;
      case "emails": return <EmailApprovals d={d} reload={load} />;
      default: return <Overview d={d} go={go} />;
    }
  };

  return (<>
    <style>{css}</style>
    <div className="app">
      <div className="sb">
        <div className="sb-brand"><h2>Dr. Dorsey</h2><p>Personal Dashboard</p></div>
        <div className="sb-nav">
          {sections.map(sec => (
            <div key={sec} className="sb-section">
              <div className="sb-section-title">{sec}</div>
              {nav.filter(n=>n.section===sec).map(n => (
                <div key={n.id} className={`sb-item ${screen===n.id?"active":""}`} onClick={()=>go(n.id)}>
                  <span>{n.label}</span>
                  {n.count !== undefined && n.count > 0 && <span className="count">{n.count.toLocaleString()}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="sb-back"><Link href="/">← Back to Hub</Link></div>
      </div>
      <div className="mn">
        <div className="topbar"><h1>{titles[screen]||"Dr. Dorsey"}</h1><span className="meta">{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</span></div>
        <div className="content">{renderScreen()}</div>
      </div>
    </div>
  </>);
}
