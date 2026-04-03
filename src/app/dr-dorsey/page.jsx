"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const S = "https://dzlmtvodpyhetvektfuo.supabase.co";
const K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const q = async (t, p = "") => { try { const r = await fetch(`${S}/rest/v1/${t}${p ? "?" + p : ""}`, { headers: { apikey: K, Authorization: `Bearer ${K}` } }); return r.ok ? r.json() : []; } catch { return []; } };
const qi = async (t, d) => { try { const r = await fetch(`${S}/rest/v1/${t}`, { method: "POST", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };
const qu = async (t, m, d) => { try { const r = await fetch(`${S}/rest/v1/${t}?${m}`, { method: "PATCH", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#FAFAF8;--sf:#fff;--sf2:#F5F3EF;--bd:#E8E4DD;
  --tx:#1A1A18;--tx2:#6B6560;--tx3:#A39E96;
  --ac:#C9A96E;--ac2:#B8944D;--acL:rgba(201,169,110,.08);
  --gn:#4A8F6D;--rd:#C45B4A;--yl:#D4A843;--bl:#5B7FA6;
  --hd:'Cormorant Garamond',Georgia,serif;--bd-f:'Outfit',system-ui,sans-serif;--mn:'JetBrains Mono',monospace;
  --r:8px
}
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.up{animation:up .4s cubic-bezier(.16,1,.3,1) both}
body{font-family:var(--bd-f);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased;font-size:13px}
h1,h2,h3{font-family:var(--hd);font-weight:600;letter-spacing:-.01em}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:240px;min-width:240px;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column}
.sb-hd{padding:20px;border-bottom:1px solid var(--bd)}
.sb-hd h2{font-size:18px;color:var(--ac);line-height:1.2}
.sb-hd p{font-size:10px;color:var(--tx3);letter-spacing:.15em;text-transform:uppercase;font-weight:500;margin-top:3px;font-family:var(--bd-f)}
.sb-nav{flex:1;overflow-y:auto;padding:8px 0}
.sb-sec{padding:16px 20px 4px;font-size:9px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--tx3)}
.sb-i{display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;color:var(--tx2);font-size:13px;font-weight:400;transition:all .12s;border-left:3px solid transparent}
.sb-i:hover{background:var(--sf2);color:var(--tx)}.sb-i.on{background:var(--acL);color:var(--ac);border-left-color:var(--ac);font-weight:600}
.sb-i .ct{margin-left:auto;font-size:10px;background:var(--sf2);padding:1px 7px;border-radius:10px;color:var(--tx3);font-family:var(--mn)}
.sb-ft{padding:14px 20px;border-top:1px solid var(--bd)}
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden}
.tb{height:52px;min-height:52px;border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 28px;background:var(--sf);gap:12px}
.tb h1{font-size:17px;font-weight:600}.tb .dt{margin-left:auto;font-size:11px;color:var(--tx3);font-family:var(--mn);font-weight:400}
.ct-area{flex:1;overflow-y:auto;padding:28px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:20px;transition:box-shadow .2s}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.stat{text-align:center;padding:22px 14px;cursor:pointer;transition:transform .15s}.stat:hover{transform:translateY(-2px)}
.stat-v{font-family:var(--hd);font-size:32px;font-weight:700;letter-spacing:-.02em;line-height:1}
.stat-l{font-size:9px;color:var(--tx3);margin-top:6px;letter-spacing:.12em;text-transform:uppercase;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--r);font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--bd);background:var(--sf);color:var(--tx2);font-family:var(--bd-f);transition:all .12s}
.btn:hover{border-color:var(--ac);color:var(--tx)}.btn-p{background:var(--ac);color:#fff;border-color:var(--ac)}.btn-p:hover{background:var(--ac2)}.btn-g{background:var(--gn);color:#fff;border-color:var(--gn)}.btn-r{background:var(--rd);color:#fff;border-color:var(--rd)}.btn-s{padding:5px 12px;font-size:11px}
.bg{display:inline-flex;padding:3px 9px;border-radius:4px;font-size:9px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.bg-ac{background:rgba(201,169,110,.12);color:var(--ac)}.bg-gn{background:rgba(74,143,109,.1);color:var(--gn)}.bg-rd{background:rgba(196,91,74,.1);color:var(--rd)}.bg-bl{background:rgba(91,127,166,.1);color:var(--bl)}.bg-mt{background:var(--sf2);color:var(--tx3)}.bg-yl{background:rgba(212,168,67,.1);color:var(--yl)}
.tbl{width:100%;border-collapse:collapse}.tbl th{text-align:left;padding:10px 14px;color:var(--tx3);font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid var(--bd)}.tbl td{padding:10px 14px;border-bottom:1px solid var(--sf2);color:var(--tx2)}.tbl tr:hover td{background:rgba(201,169,110,.03)}
.inp{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--r);padding:10px 14px;color:var(--tx);font-size:13px;font-family:var(--bd-f);width:100%;outline:none;transition:border .15s}.inp:focus{border-color:var(--ac);box-shadow:0 0 0 3px rgba(201,169,110,.1)}
textarea.inp{min-height:80px;resize:vertical;line-height:1.5}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.pill{padding:6px 14px;border-radius:20px;font-size:11px;cursor:pointer;border:1px solid var(--bd);color:var(--tx3);background:var(--sf);font-family:var(--bd-f);font-weight:500;transition:all .12s}.pill.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.row{display:flex;align-items:center;gap:8px}.sep{height:1px;background:var(--bd);margin:20px 0}
.sec-t{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3);margin-bottom:12px}
.trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kanban{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;align-items:start}
.kanban-col{background:var(--sf2);border-radius:var(--r);padding:12px;min-height:200px}
.kanban-hd{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.kanban-card{background:var(--sf);border:1px solid var(--bd);border-radius:6px;padding:10px 12px;margin-bottom:8px;font-size:12px;cursor:default}
.kanban-card:hover{box-shadow:0 2px 8px rgba(0,0,0,.06)}
@media(max-width:900px){.sb{display:none}.g2,.g3,.g4,.g5,.kanban{grid-template-columns:1fr}}
`;

function Overview({ d, go }) {
  const openTasks = (d.tasks||[]).filter(t=>!["completed","cancelled"].includes(t.status));
  const blockedTasks = openTasks.filter(t=>t.status==="blocked");
  const queuedOut = (d.outreach||[]).filter(o=>o.status==="queued");
  const pendingEmails = (d.emails||[]).filter(e=>!e.approved);
  return (<div className="up">
    <div className="g5" style={{marginBottom:24}}>
      <div className="card stat" onClick={()=>go("directory")}><div className="stat-v" style={{color:"var(--ac)"}}>{(d.directory||[]).length.toLocaleString()}</div><div className="stat-l">Directory</div></div>
      <div className="card stat" onClick={()=>go("tasks")}><div className="stat-v" style={{color:blockedTasks.length>0?"var(--rd)":"var(--bl)"}}>{openTasks.length}</div><div className="stat-l">Open Tasks</div></div>
      <div className="card stat" onClick={()=>go("outreach")}><div className="stat-v" style={{color:"var(--bl)"}}>{queuedOut.length.toLocaleString()}</div><div className="stat-l">Outreach Queue</div></div>
      <div className="card stat" onClick={()=>go("social")}><div className="stat-v" style={{color:"var(--gn)"}}>{(d.social||[]).length}</div><div className="stat-l">Social Posts</div></div>
      <div className="card stat" onClick={()=>go("emails")}><div className="stat-v" style={{color:pendingEmails.length>0?"var(--rd)":"var(--gn)"}}>{pendingEmails.length}</div><div className="stat-l">Email Approvals</div></div>
    </div>
    <div className="g2" style={{marginBottom:24}}>
      <div className="card">
        <div className="row" style={{justifyContent:"space-between",marginBottom:14}}><h3 style={{fontSize:15}}>Priority Tasks</h3><button className="btn btn-s" onClick={()=>go("tasks")}>View All</button></div>
        {openTasks.filter(t=>t.priority==="critical"||t.priority==="high").slice(0,6).map((t,i) => (
          <div key={i} style={{padding:"8px 0",borderBottom:"1px solid var(--sf2)"}}>
            <div className="row" style={{gap:8}}><span className={`bg ${t.priority==="critical"?"bg-rd":"bg-ac"}`}>{t.priority}</span><span className="trunc" style={{flex:1,fontWeight:500}}>{t.title}</span><span className="bg bg-mt">{t.assigned_to||"—"}</span></div>
          </div>
        ))}
        {openTasks.filter(t=>t.priority==="critical"||t.priority==="high").length===0 && <p style={{color:"var(--tx3)",textAlign:"center",padding:16}}>No critical tasks</p>}
      </div>
      <div className="card">
        <div className="row" style={{justifyContent:"space-between",marginBottom:14}}><h3 style={{fontSize:15}}>Content This Week</h3><button className="btn btn-s" onClick={()=>go("content")}>Full Calendar</button></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => {
            const slots = (d.content||[]).filter(c=>(c.day_of_week||"").startsWith(day.charAt(0).toUpperCase()+day.slice(1).toLowerCase()) || (c.day_of_week||"").toLowerCase().startsWith(day.toLowerCase()));
            return (<div key={day} style={{padding:8,background:"var(--sf2)",borderRadius:6,minHeight:60,textAlign:"center"}}>
              <div style={{fontSize:9,fontWeight:700,color:"var(--tx3)",letterSpacing:".1em",marginBottom:4}}>{day}</div>
              <div style={{fontSize:18,fontWeight:700,fontFamily:"var(--hd)",color:slots.length>0?"var(--ac)":"var(--bd)"}}>{slots.length}</div>
            </div>);
          })}
        </div>
      </div>
    </div>
    <div className="card">
      <h3 style={{fontSize:15,marginBottom:14}}>Quick Actions</h3>
      <div className="row" style={{gap:10,flexWrap:"wrap"}}>
        <button className="btn btn-p" onClick={()=>go("tasks")}>Tasks</button>
        <button className="btn" onClick={()=>go("outreach")}>Outreach</button>
        <button className="btn" onClick={()=>go("social")}>Social</button>
        <button className="btn" onClick={()=>go("content")}>Content</button>
        <button className="btn" onClick={()=>go("emails")}>Emails</button>
        <button className="btn" onClick={()=>go("ops")}>Daily Ops</button>
        <button className="btn" onClick={()=>go("directory")}>Directory</button>
        <button className="btn" onClick={()=>go("creds")}>Credentials</button>
        <button className="btn" onClick={()=>go("vip")}>VIP Circle</button>
      </div>
    </div>
  </div>);
}

function TaskBoard({ d, reload }) {
  const [creating, setCreating] = useState(false);
  const [nt, setNt] = useState({title:"",priority:"medium",assigned_to:"claude",category:"other",description:""});
  const [busy, setBusy] = useState(null);
  const [expand, setExpand] = useState(null);
  const all = d.tasks||[];
  const open = all.filter(t=>t.status==="open");
  const progress = all.filter(t=>t.status==="in_progress");
  const blocked = all.filter(t=>t.status==="blocked");
  const done = all.filter(t=>t.status==="completed").slice(0,10);

  const up = async (id,data) => { setBusy(id); await qu("khg_master_tasks",`id=eq.${id}`,{...data,updated_at:new Date().toISOString()}); await reload(); setBusy(null); };
  const create = async () => {
    if(!nt.title.trim()) return; setBusy("new");
    const ex = await q("khg_master_tasks","select=task_key&order=task_key.desc&limit=1");
    const num = ex[0]?.task_key ? parseInt(ex[0].task_key.split("-").pop())+1 : 95;
    await qi("khg_master_tasks",{task_key:`TASK-2026-${String(num).padStart(4,"0")}`,title:nt.title,category:nt.category,priority:nt.priority,assigned_to:nt.assigned_to,description:nt.description||null,status:"open",brand:"dr_dorsey",created_by:"dr_dorsey"});
    setNt({title:"",priority:"medium",assigned_to:"claude",category:"other",description:""}); setCreating(false); await reload(); setBusy(null);
  };

  const TaskCard = ({t}) => (
    <div className="kanban-card" style={{borderLeft:`3px solid ${t.priority==="critical"?"var(--rd)":t.priority==="high"?"var(--ac)":"var(--bd)"}`,opacity:busy===t.id?.4:1}} onClick={()=>setExpand(expand===t.id?null:t.id)}>
      <div className="row" style={{gap:4,marginBottom:4}}>
        <span className={`bg ${t.priority==="critical"?"bg-rd":t.priority==="high"?"bg-ac":"bg-mt"}`} style={{fontSize:8}}>{t.priority}</span>
        <span className="bg bg-mt" style={{fontSize:8}}>{t.assigned_to||"—"}</span>
      </div>
      <div style={{fontWeight:500,fontSize:12,lineHeight:1.4}}>{t.title}</div>
      {t.blocker_reason && <div style={{fontSize:10,color:"var(--rd)",marginTop:3}}>Blocked: {t.blocker_reason}</div>}
      {expand===t.id && <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid var(--bd)"}}>
        {t.description && <div style={{fontSize:11,color:"var(--tx2)",marginBottom:6,lineHeight:1.5}}>{t.description}</div>}
        <div className="row" style={{gap:4,flexWrap:"wrap"}}>
          {t.status==="open" && <button className="btn btn-s btn-p" onClick={e=>{e.stopPropagation();up(t.id,{status:"in_progress",started_at:new Date().toISOString()})}}>Start</button>}
          {t.status!=="completed" && <button className="btn btn-s btn-g" onClick={e=>{e.stopPropagation();up(t.id,{status:"completed",completed_at:new Date().toISOString()})}}>Done</button>}
          {t.status!=="blocked"&&t.status!=="completed" && <button className="btn btn-s" onClick={e=>{e.stopPropagation();const r=prompt("Blocker?");if(r)up(t.id,{status:"blocked",blocker_reason:r})}}>Block</button>}
          {t.status==="blocked" && <button className="btn btn-s btn-p" onClick={e=>{e.stopPropagation();up(t.id,{status:"in_progress",blocker_reason:null})}}>Unblock</button>}
          <select style={{fontSize:10,padding:"3px 6px",border:"1px solid var(--bd)",borderRadius:4,background:"var(--sf)",cursor:"pointer",fontFamily:"var(--bd-f)"}} value={t.assigned_to||""} onChange={e=>{e.stopPropagation();up(t.id,{assigned_to:e.target.value})}} onClick={e=>e.stopPropagation()}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
          <button className="btn btn-s" style={{marginLeft:"auto",color:"var(--rd)"}} onClick={e=>{e.stopPropagation();if(confirm("Cancel?"))up(t.id,{status:"cancelled"})}}>×</button>
        </div>
      </div>}
    </div>
  );

  return (<div className="up">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
      <h3 style={{fontSize:15}}>Task Board</h3>
      <button className="btn btn-p" onClick={()=>setCreating(!creating)}>+ New Task</button>
    </div>
    {creating && <div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <input className="inp" placeholder="Task title..." value={nt.title} onChange={e=>setNt({...nt,title:e.target.value})} style={{marginBottom:8}} />
      <textarea className="inp" placeholder="Description..." value={nt.description} onChange={e=>setNt({...nt,description:e.target.value})} style={{marginBottom:8,minHeight:50}} />
      <div className="row" style={{gap:8,marginBottom:8}}>
        <select className="inp" style={{flex:1}} value={nt.priority} onChange={e=>setNt({...nt,priority:e.target.value})}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
        <select className="inp" style={{flex:1}} value={nt.assigned_to} onChange={e=>setNt({...nt,assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
        <select className="inp" style={{flex:1}} value={nt.category} onChange={e=>setNt({...nt,category:e.target.value})}>{["automation","content","design","events","outreach","product","website","other"].map(c=><option key={c} value={c}>{c}</option>)}</select>
      </div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={create} disabled={busy==="new"||!nt.title.trim()}>{busy==="new"?"...":"Create"}</button><button className="btn" onClick={()=>setCreating(false)}>Cancel</button></div>
    </div>}
    <div className="kanban">
      <div className="kanban-col"><div className="kanban-hd"><span>Open</span><span className="bg bg-bl">{open.length}</span></div>{open.map(t=><TaskCard key={t.id} t={t}/>)}</div>
      <div className="kanban-col" style={{background:"rgba(91,127,166,.06)"}}><div className="kanban-hd"><span>In Progress</span><span className="bg bg-bl">{progress.length}</span></div>{progress.map(t=><TaskCard key={t.id} t={t}/>)}</div>
      <div className="kanban-col" style={{background:"rgba(196,91,74,.04)"}}><div className="kanban-hd"><span>Blocked</span><span className="bg bg-rd">{blocked.length}</span></div>{blocked.map(t=><TaskCard key={t.id} t={t}/>)}</div>
      <div className="kanban-col" style={{background:"rgba(74,143,109,.04)"}}><div className="kanban-hd"><span>Done</span><span className="bg bg-gn">{done.length}</span></div>{done.map(t=><TaskCard key={t.id} t={t}/>)}</div>
    </div>
  </div>);
}

function SocialMedia({ d, reload }) {
  const [tab, setTab] = useState("all");
  const [composing, setComposing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [np, setNp] = useState({caption:"",platform:"instagram",content_type:"post"});
  const [busy, setBusy] = useState(null);
  const all = d.social||[];
  const queued = all.filter(p=>p.status==="queued");
  const posted = all.filter(p=>p.status==="posted");
  const filtered = tab==="queued"?queued:tab==="posted"?posted:all;

  const approve = async id => { setBusy(id); await qu("ghl_social_posting_queue",`id=eq.${id}`,{status:"approved"}); await reload(); setBusy(null); };
  const reject = async id => { setBusy(id); await qu("ghl_social_posting_queue",`id=eq.${id}`,{status:"rejected"}); await reload(); setBusy(null); };
  const saveEdit = async id => { setBusy(id); await qu("ghl_social_posting_queue",`id=eq.${id}`,{caption:editCaption}); setEditing(null); await reload(); setBusy(null); };
  const createPost = async () => {
    if(!np.caption.trim()) return; setBusy("new");
    await qi("ghl_social_posting_queue",{brand_key:"dr_dorsey",caption:np.caption,platform:np.platform,content_type:np.content_type,status:"queued"});
    setNp({caption:"",platform:"instagram",content_type:"post"}); setComposing(false); await reload(); setBusy(null);
  };

  return (<div className="up">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
      <div className="pills" style={{margin:0}}>
        <button className={`pill ${tab==="all"?"on":""}`} onClick={()=>setTab("all")}>All ({all.length})</button>
        <button className={`pill ${tab==="queued"?"on":""}`} onClick={()=>setTab("queued")}>Queued ({queued.length})</button>
        <button className={`pill ${tab==="posted"?"on":""}`} onClick={()=>setTab("posted")}>Posted ({posted.length})</button>
      </div>
      <button className="btn btn-p" onClick={()=>setComposing(!composing)}>+ Compose</button>
    </div>
    {composing && <div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <h3 style={{fontSize:14,marginBottom:10}}>New Post</h3>
      <textarea className="inp" placeholder="Write your caption..." value={np.caption} onChange={e=>setNp({...np,caption:e.target.value})} style={{marginBottom:8}} />
      <div className="row" style={{gap:8,marginBottom:8}}>
        <select className="inp" style={{flex:1}} value={np.platform} onChange={e=>setNp({...np,platform:e.target.value})}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option><option value="twitter">Twitter/X</option></select>
        <select className="inp" style={{flex:1}} value={np.content_type} onChange={e=>setNp({...np,content_type:e.target.value})}><option value="post">Post</option><option value="reel">Reel</option><option value="story">Story</option><option value="carousel">Carousel</option></select>
      </div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={createPost} disabled={busy==="new"||!np.caption.trim()}>{busy==="new"?"...":"Create Post"}</button><button className="btn" onClick={()=>setComposing(false)}>Cancel</button></div>
    </div>}
    {filtered.map((p,i) => (
      <div key={p.id||i} className="card" style={{marginBottom:8,opacity:busy===p.id?.4:1}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
          <div className="row" style={{gap:6}}><span className="bg bg-bl">{p.platform||"IG"}</span><span className="bg bg-mt">{p.content_type||"post"}</span></div>
          <span className={`bg ${p.status==="posted"?"bg-gn":p.status==="approved"?"bg-bl":"bg-yl"}`}>{p.status}</span>
        </div>
        {editing===p.id ? (
          <div><textarea className="inp" value={editCaption} onChange={e=>setEditCaption(e.target.value)} style={{marginBottom:8}} />
          <div className="row" style={{gap:6}}><button className="btn btn-s btn-p" onClick={()=>saveEdit(p.id)}>Save</button><button className="btn btn-s" onClick={()=>setEditing(null)}>Cancel</button></div></div>
        ) : (
          <div style={{fontSize:13,lineHeight:1.6,color:"var(--tx2)",whiteSpace:"pre-wrap"}}>{(p.caption||"").slice(0,300)}</div>
        )}
        {p.image_url && <div style={{marginTop:8}}><img src={p.image_url} alt="" style={{maxWidth:180,borderRadius:6,border:"1px solid var(--bd)"}} onError={e=>{e.target.style.display="none"}} /></div>}
        {p.hashtags && <div style={{fontSize:10,color:"var(--ac)",marginTop:6}}>{(Array.isArray(p.hashtags)?p.hashtags:[]).slice(0,8).map(h=>`#${String(h).replace("#","")}`).join(" ")}</div>}
        <div className="row" style={{gap:4,marginTop:10,flexWrap:"wrap"}}>
          {p.status==="queued" && <button className="btn btn-s btn-g" onClick={()=>approve(p.id)}>Approve</button>}
          {p.status==="queued" && <button className="btn btn-s btn-r" onClick={()=>reject(p.id)}>Reject</button>}
          {editing!==p.id && <button className="btn btn-s" onClick={()=>{setEditing(p.id);setEditCaption(p.caption||"")}}>Edit Caption</button>}
        </div>
      </div>
    ))}
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No {tab} posts</div>}
  </div>);
}

function ContentCalendar({ d }) {
  const slots = d.content||[];
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return (<div className="up">
    <div className="sec-t">{slots.length} weekly content slots for Dr. Dorsey</div>
    {days.map(day => {
      const ds = slots.filter(s=>s.day_of_week===day);
      if(ds.length===0) return null;
      return (<div key={day} style={{marginBottom:20}}>
        <h3 style={{fontSize:15,marginBottom:8}}>{day}</h3>
        <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Time</th><th>Pillar</th><th>Visual</th><th>Caption</th><th>CTA</th></tr></thead>
        <tbody>{ds.map((s,i)=>(<tr key={i}><td style={{fontFamily:"var(--mn)",fontWeight:500,fontSize:12}}>{s.post_time||"—"}</td><td><span className="bg bg-ac">{s.content_pillar||"—"}</span></td><td>{s.visual_type||"—"}</td><td className="trunc" style={{maxWidth:220}}>{s.caption_template||"—"}</td><td>{s.cta||"—"}</td></tr>))}</tbody></table></div>
      </div>);
    })}
    {slots.length===0 && <div className="card" style={{textAlign:"center",padding:40,color:"var(--tx3)"}}>No content calendar slots defined for dr_dorsey</div>}
  </div>);
}

function DirectoryScreen({ d }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const all = d.directory||[];
  const cats = [...new Set(all.map(c=>c.category).filter(Boolean))].sort();
  const filt = all.filter(c=>{
    if(cat!=="all"&&c.category!==cat) return false;
    if(!search) return true;
    return [c.display_name,c.email,c.phone,c.instagram,c.company,c.profession].some(v=>(v||"").toLowerCase().includes(search.toLowerCase()));
  });
  return (<div className="up">
    <div className="row" style={{gap:12,marginBottom:16}}>
      <input className="inp" placeholder="Search 2,147 contacts..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:380}} />
      <select className="inp" style={{maxWidth:200}} value={cat} onChange={e=>setCat(e.target.value)}><option value="all">All ({all.length})</option>{cats.map(c=><option key={c} value={c}>{c} ({all.filter(x=>x.category===c).length})</option>)}</select>
    </div>
    <div className="sec-t">{filt.length} contacts</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><div style={{overflowX:"auto"}}><table className="tbl"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>IG</th><th>Category</th><th>Company</th><th>City</th><th>Tier</th></tr></thead>
    <tbody>{filt.slice(0,60).map((c,i)=>(<tr key={i}><td style={{fontWeight:500,color:"var(--tx)",whiteSpace:"nowrap"}}>{c.display_name||"—"}</td><td style={{fontSize:11,fontFamily:"var(--mn)"}}>{c.phone||"—"}</td><td style={{fontSize:11}}>{c.email||"—"}</td><td style={{fontSize:11,color:"var(--ac)"}}>{c.instagram||"—"}</td><td><span className="bg bg-mt">{c.category||"—"}</span></td><td style={{fontSize:11}}>{c.company||"—"}</td><td style={{fontSize:11}}>{c.city||"—"}</td><td>{c.relationship_tier?<span className="bg bg-ac">{c.relationship_tier}</span>:"—"}</td></tr>))}</tbody></table></div></div>
    {filt.length>60 && <p style={{fontSize:11,color:"var(--tx3)",marginTop:8,textAlign:"center"}}>Showing 60 of {filt.length}</p>}
  </div>);
}

function Credentials({ d }) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState({});
  const creds = d.creds||[];
  const filt = search ? creds.filter(c=>(c.credential_key||"").toLowerCase().includes(search.toLowerCase()) || (c.credential_type||"").toLowerCase().includes(search.toLowerCase())) : creds;
  const grouped = {};
  filt.forEach(c => { const t = c.credential_type||"other"; if(!grouped[t]) grouped[t]=[]; grouped[t].push(c); });
  return (<div className="up">
    <input className="inp" placeholder="Search credentials..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:16,maxWidth:380}} />
    <div className="sec-t">{filt.length} active credentials</div>
    {Object.entries(grouped).sort((a,b)=>b[1].length-a[1].length).map(([type, items]) => (
      <div key={type} style={{marginBottom:20}}>
        <h3 style={{fontSize:14,marginBottom:8,textTransform:"capitalize"}}>{type.replace(/_/g," ")} <span className="bg bg-mt">{items.length}</span></h3>
        <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Key</th><th>Value</th><th>Show</th></tr></thead>
        <tbody>{items.map((c,i) => {
          const val = typeof c.credential_value === "object" ? JSON.stringify(c.credential_value) : String(c.credential_value||"");
          const visible = show[c.id];
          return (<tr key={i}><td style={{fontFamily:"var(--mn)",fontSize:11,fontWeight:500}}>{c.credential_key}</td><td style={{fontFamily:"var(--mn)",fontSize:11,maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{visible ? val.slice(0,80) : "••••••••"}</td><td><button className="btn btn-s" onClick={()=>setShow(s=>({...s,[c.id]:!s[c.id]}))}>{visible?"Hide":"Show"}</button></td></tr>);
        })}</tbody></table></div>
      </div>
    ))}
    {filt.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No credentials found</div>}
  </div>);
}

function OutreachScreen({ d, reload }) {
  const [view, setView] = useState("queued");
  const [busy, setBusy] = useState(null);
  const all = d.outreach||[];
  const queued = all.filter(o=>o.status==="queued");
  const sent = all.filter(o=>o.status==="sent");
  const filtered = view==="sent"?sent:queued;
  const send = async id => { setBusy(id); await qu("contact_action_queue",`id=eq.${id}`,{status:"sent",sent_at:new Date().toISOString()}); await reload(); setBusy(null); };
  const skip = async id => { setBusy(id); await qu("contact_action_queue",`id=eq.${id}`,{status:"skipped"}); await reload(); setBusy(null); };
  return (<div className="up">
    <div className="pills"><button className={`pill ${view==="queued"?"on":""}`} onClick={()=>setView("queued")}>Queued ({queued.length})</button><button className={`pill ${view==="sent"?"on":""}`} onClick={()=>setView("sent")}>Sent ({sent.length})</button></div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Contact</th><th>Type</th><th>Segment</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{filtered.slice(0,30).map((o,i)=>(<tr key={o.id||i} style={{opacity:busy===o.id?.4:1}}><td style={{fontWeight:500,color:"var(--tx)"}}>{o.contact_name||o.ig_handle||o.contact_email||"—"}</td><td>{o.action_type||"—"}</td><td><span className="bg bg-mt">{o.segment_type||"—"}</span></td><td>{o.contact_city||"—"}</td><td><span className={`bg ${o.status==="sent"?"bg-gn":"bg-yl"}`}>{o.status}</span></td><td><div className="row" style={{gap:4}}>{o.status==="queued"&&<button className="btn btn-s btn-p" onClick={()=>send(o.id)}>Send</button>}{o.status==="queued"&&<button className="btn btn-s" onClick={()=>skip(o.id)}>Skip</button>}</div></td></tr>))}</tbody></table></div>
    {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)",marginTop:12}}>No {view} outreach</div>}
  </div>);
}

function EmailApprovals({ d, reload }) {
  const [busy, setBusy] = useState(null);
  const pending = (d.emails||[]).filter(e=>!e.approved);
  const approved = (d.emails||[]).filter(e=>e.approved);
  const approve = async id => { setBusy(id); await qu("email_approval_queue",`id=eq.${id}`,{approved:true,approved_at:new Date().toISOString(),approved_by:"dr_dorsey"}); await reload(); setBusy(null); };
  return (<div className="up">
    <div className="sec-t">{pending.length} pending · {approved.length} approved</div>
    {pending.map((e,i)=>(<div key={e.id||i} className="card" style={{marginBottom:8,borderLeft:"3px solid var(--yl)",opacity:busy===e.id?.4:1}}>
      <div className="row" style={{justifyContent:"space-between",marginBottom:6}}><div><span className="bg bg-ac">{e.brand_key||"—"}</span> <span className="bg bg-mt">{e.sequence_type||"—"}</span></div><span style={{fontSize:11,color:"var(--tx3)"}}>{e.recipient_count||0} recipients</span></div>
      <h3 style={{fontSize:14,marginBottom:4}}>{e.subject||"(no subject)"}</h3>
      <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.6,maxHeight:100,overflow:"hidden",whiteSpace:"pre-wrap"}}>{e.body_preview||""}</div>
      <div className="row" style={{gap:6,marginTop:10}}><button className="btn btn-s btn-g" onClick={()=>approve(e.id)}>Approve</button><button className="btn btn-s btn-r" onClick={()=>{if(confirm("Reject?"))qu("email_approval_queue",`id=eq.${e.id}`,{notes:"REJECTED"}).then(reload)}}>Reject</button></div>
    </div>))}
    {pending.length===0 && approved.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No emails in queue</div>}
    {approved.length>0 && <><div className="sep"/><div className="sec-t">Recently Approved</div>{approved.slice(0,5).map((e,i)=>(<div key={e.id||i} className="card" style={{marginBottom:6,borderLeft:"3px solid var(--gn)"}}><div className="row" style={{gap:6}}><span className="bg bg-gn">Approved</span><span className="bg bg-mt">{e.brand_key}</span><span style={{flex:1,fontWeight:500}}>{e.subject}</span></div></div>))}</>}
  </div>);
}

function VipCircle({ d }) {
  const vips = d.vip||[];
  return (<div className="up">
    <div className="sec-t">{vips.length} VIPs</div>
    {vips.map((v,i)=>(<div key={i} className="card" style={{marginBottom:10,borderLeft:"3px solid var(--ac)"}}>
      <div className="row" style={{justifyContent:"space-between",marginBottom:6}}><h3 style={{fontSize:16}}>{v.full_name}</h3><div className="row" style={{gap:4}}>{v.tier&&<span className="bg bg-ac">{v.tier}</span>}{v.influence_level&&<span className="bg bg-bl">{v.influence_level}</span>}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,fontSize:12,color:"var(--tx2)"}}>
        <div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Phone</span><br/>{v.phone||"—"}</div>
        <div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Email</span><br/>{v.email||"—"}</div>
        <div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Instagram</span><br/>{v.instagram||"—"}</div>
        <div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Profession</span><br/>{v.profession||"—"}</div>
        <div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Known For</span><br/>{v.known_for||"—"}</div>
        <div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>City</span><br/>{v.city||"—"}</div>
      </div>
      {v.notes&&<div style={{marginTop:8,padding:10,background:"var(--sf2)",borderRadius:6,fontSize:11,lineHeight:1.5}}>{v.notes}</div>}
    </div>))}
    {vips.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No VIPs added</div>}
  </div>);
}

function DailyOps({ d }) {
  const crons = d.crons||[];
  const active = crons.filter(c=>c.status==="active");
  const inactive = crons.filter(c=>c.status!=="active");
  return (<div className="up">
    <div className="sec-t">{active.length} active crons · {inactive.length} inactive</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Name</th><th>Schedule</th><th>Department</th><th>Status</th><th>Last Run</th><th>Runs</th></tr></thead>
    <tbody>{crons.map((c,i)=>(<tr key={i}><td style={{fontWeight:500}}>{c.cron_name}</td><td style={{fontFamily:"var(--mn)",fontSize:11}}>{c.schedule_human||c.schedule||"—"}</td><td>{c.dept_name||"—"}</td><td><span className={`bg ${c.status==="active"?"bg-gn":"bg-rd"}`}>{c.status}</span></td><td style={{fontSize:11,fontFamily:"var(--mn)"}}>{c.last_run?new Date(c.last_run).toLocaleDateString():"never"}</td><td style={{fontFamily:"var(--mn)"}}>{c.run_count||0}</td></tr>))}</tbody></table></div>
    {crons.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No cron jobs</div>}
  </div>);
}

export default function DrDorseyDashboard() {
  const [screen, setScreen] = useState("overview");
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [directory,vip,outreach,social,tasks,content,emails,creds,crons] = await Promise.all([
      q("dolo_directory","select=display_name,first_name,last_name,phone,email,instagram,category,subcategory,relationship_tier,company,profession,city,is_vip&order=display_name&limit=500"),
      q("dolo_vip_circle","select=*&order=full_name&limit=50"),
      q("contact_action_queue","select=*&brand_key=eq.dr_dorsey&order=created_at.desc&limit=100"),
      q("ghl_social_posting_queue","select=*&brand_key=eq.dr_dorsey&order=created_at.desc&limit=50"),
      q("khg_master_tasks","select=*&order=priority,created_at.desc&limit=100"),
      q("weekly_content_schedule","select=*&brand_key=eq.dr_dorsey&is_active=eq.true&order=day_of_week,post_time"),
      q("email_approval_queue","select=*&order=created_at.desc&limit=30"),
      q("credentials","select=id,credential_type,credential_key,credential_value,is_active&is_active=eq.true&order=credential_type,credential_key"),
      q("khg_cron_registry","select=*&order=status.desc,cron_name"),
    ]);
    setD({directory:directory||[],vip:vip||[],outreach:outreach||[],social:social||[],tasks:tasks||[],content:content||[],emails:emails||[],creds:creds||[],crons:crons||[]});
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);
  const go = useCallback(s => setScreen(s), []);

  const nav = [
    {id:"overview",label:"Overview",sec:"Command"},
    {id:"tasks",label:"Task Board",sec:"Command"},
    {id:"directory",label:"Directory",sec:"Data",ct:(d.directory||[]).length},
    {id:"creds",label:"Credentials",sec:"Data",ct:(d.creds||[]).length},
    {id:"vip",label:"VIP Circle",sec:"Data",ct:(d.vip||[]).length},
    {id:"outreach",label:"Outreach",sec:"Execution",ct:(d.outreach||[]).filter(o=>o.status==="queued").length},
    {id:"social",label:"Social Media",sec:"Execution",ct:(d.social||[]).length},
    {id:"content",label:"Content Calendar",sec:"Execution",ct:(d.content||[]).length},
    {id:"emails",label:"Email Approvals",sec:"Execution",ct:(d.emails||[]).filter(e=>!e.approved).length},
    {id:"ops",label:"Daily Ops / Crons",sec:"System",ct:(d.crons||[]).filter(c=>c.status==="active").length},
  ];
  const secs = [...new Set(nav.map(n=>n.sec))];
  const titles = {}; nav.forEach(n=>titles[n.id]=n.label);

  const render = () => {
    if(loading) return <div style={{textAlign:"center",padding:60,color:"var(--tx3)",fontFamily:"var(--hd)",fontSize:16}}>Loading Dr. Dorsey...</div>;
    switch(screen){
      case "overview": return <Overview d={d} go={go}/>;
      case "tasks": return <TaskBoard d={d} reload={load}/>;
      case "directory": return <DirectoryScreen d={d}/>;
      case "creds": return <Credentials d={d}/>;
      case "vip": return <VipCircle d={d}/>;
      case "outreach": return <OutreachScreen d={d} reload={load}/>;
      case "social": return <SocialMedia d={d} reload={load}/>;
      case "content": return <ContentCalendar d={d}/>;
      case "emails": return <EmailApprovals d={d} reload={load}/>;
      case "ops": return <DailyOps d={d}/>;
      default: return <Overview d={d} go={go}/>;
    }
  };

  return (<>
    <style>{css}</style>
    <div className="app">
      <div className="sb">
        <div className="sb-hd"><h2>Dr. Dorsey</h2><p>Personal Command Center</p></div>
        <div className="sb-nav">
          {secs.map(sec=>(<div key={sec}><div className="sb-sec">{sec}</div>
            {nav.filter(n=>n.sec===sec).map(n=>(<div key={n.id} className={`sb-i ${screen===n.id?"on":""}`} onClick={()=>go(n.id)}>
              <span>{n.label}</span>{n.ct!==undefined&&n.ct>0&&<span className="ct">{n.ct>999?Math.round(n.ct/1000)+"K":n.ct}</span>}
            </div>))}
          </div>))}
        </div>
        <div className="sb-ft"><Link href="/" style={{color:"var(--tx3)",textDecoration:"none",fontSize:12,fontWeight:500}}>← Back to Hub</Link></div>
      </div>
      <div className="mn">
        <div className="tb"><h1>{titles[screen]||"Dr. Dorsey"}</h1><span className="dt">{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</span></div>
        <div className="ct-area">{render()}</div>
      </div>
    </div>
  </>);
}
