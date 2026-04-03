"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const S = "https://dzlmtvodpyhetvektfuo.supabase.co";
const K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const q = async (t, p = "") => { try { const r = await fetch(`${S}/rest/v1/${t}${p ? "?" + p : ""}`, { headers: { apikey: K, Authorization: `Bearer ${K}` } }); return r.ok ? r.json() : []; } catch { return []; } };
const qi = async (t, d) => { try { const r = await fetch(`${S}/rest/v1/${t}`, { method: "POST", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };
const qu = async (t, m, d) => { try { const r = await fetch(`${S}/rest/v1/${t}?${m}`, { method: "PATCH", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };
const qd = async (t, m) => { try { await fetch(`${S}/rest/v1/${t}?${m}`, { method: "DELETE", headers: { apikey: K, Authorization: `Bearer ${K}` } }); return true; } catch { return false; } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#FAFAF8;--sf:#fff;--sf2:#F5F3EF;--bd:#E8E4DD;--tx:#1A1A18;--tx2:#4A4540;--tx3:#7A756E;--ac:VAR_AC;--acL:VAR_AC10;--gn:#4A8F6D;--rd:#C45B4A;--yl:#D4A843;--bl:#5B7FA6;--hd:'Cormorant Garamond',Georgia,serif;--bd-f:'Outfit',system-ui,sans-serif;--mn:'JetBrains Mono',monospace;--r:8px}
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}.up{animation:up .4s cubic-bezier(.16,1,.3,1) both}
body{font-family:var(--bd-f);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased;font-size:14px}
h1,h2,h3{font-family:var(--hd);font-weight:600;letter-spacing:-.01em}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:240px;min-width:240px;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column}
.sb-hd{padding:20px;border-bottom:1px solid var(--bd)}.sb-hd h2{font-size:20px;color:var(--ac)}.sb-hd p{font-size:10px;color:var(--tx3);letter-spacing:.15em;text-transform:uppercase;font-weight:500;margin-top:3px}
.sb-nav{flex:1;overflow-y:auto;padding:8px 0}
.sb-sec{padding:16px 20px 4px;font-size:9px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--tx3)}
.sb-i{display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;color:var(--tx2);font-size:14px;transition:all .12s;border-left:3px solid transparent}
.sb-i:hover{background:var(--sf2)}.sb-i.on{background:var(--acL);color:var(--ac);border-left-color:var(--ac);font-weight:600}
.sb-i .n{margin-left:auto;font-size:10px;background:var(--sf2);padding:1px 7px;border-radius:10px;color:var(--tx3);font-family:var(--mn)}
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden}
.tb{height:52px;min-height:52px;border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 28px;background:var(--sf);gap:12px}
.tb h1{font-size:19px}.tb .dt{margin-left:auto;font-size:11px;color:var(--tx3);font-family:var(--mn)}
.ct-a{flex:1;overflow-y:auto;padding:28px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:20px;transition:box-shadow .2s}.card:hover{box-shadow:0 2px 8px rgba(0,0,0,.04)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.stat{text-align:center;padding:22px 14px;cursor:pointer}.stat-v{font-family:var(--hd);font-size:36px;font-weight:700}.stat-l{font-size:9px;color:var(--tx3);margin-top:6px;letter-spacing:.12em;text-transform:uppercase;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:var(--r);font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--bd);background:var(--sf);color:var(--tx2);font-family:var(--bd-f);transition:all .12s}
.btn:hover{border-color:var(--ac)}.btn-p{background:var(--ac);color:#fff;border-color:var(--ac)}.btn-g{background:var(--gn);color:#fff;border-color:var(--gn)}.btn-r{background:var(--rd);color:#fff;border-color:var(--rd)}.btn-s{padding:5px 12px;font-size:11px}
.bg{display:inline-flex;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.bg-ac{background:var(--acL);color:var(--ac)}.bg-gn{background:rgba(74,143,109,.1);color:var(--gn)}.bg-rd{background:rgba(196,91,74,.1);color:var(--rd)}.bg-bl{background:rgba(91,127,166,.1);color:var(--bl)}.bg-mt{background:var(--sf2);color:var(--tx3)}.bg-yl{background:rgba(212,168,67,.1);color:var(--yl)}
.tbl{width:100%;border-collapse:collapse}.tbl th{text-align:left;padding:10px 14px;color:var(--tx3);font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid var(--bd)}.tbl td{padding:11px 14px;border-bottom:1px solid var(--sf2);color:var(--tx);font-size:13px}.tbl tr:hover td{background:rgba(0,0,0,.01)}
.inp{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--r);padding:10px 14px;color:var(--tx);font-size:14px;font-family:var(--bd-f);width:100%;outline:none}.inp:focus{border-color:var(--ac)}
textarea.inp{min-height:80px;resize:vertical;line-height:1.5}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}.pill{padding:7px 16px;border-radius:20px;font-size:12px;cursor:pointer;border:1px solid var(--bd);color:var(--tx3);background:var(--sf);font-weight:500;transition:all .12s}.pill.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.row{display:flex;align-items:center;gap:8px}.sep{height:1px;background:var(--bd);margin:20px 0}.sec-t{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3);margin-bottom:12px}.trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kanban{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;align-items:start}.kanban-col{background:var(--sf2);border-radius:var(--r);padding:12px;min-height:200px}.kanban-hd{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;display:flex;justify-content:space-between}.kanban-card{background:var(--sf);border:1px solid var(--bd);border-radius:6px;padding:12px 14px;margin-bottom:8px;font-size:13px;cursor:pointer}.kanban-card:hover{box-shadow:0 2px 8px rgba(0,0,0,.06)}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:100;display:flex;align-items:center;justify-content:center}.modal{background:var(--sf);border-radius:12px;padding:28px;width:90%;max-width:540px;max-height:80vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.15)}
@media(max-width:900px){.sb{display:none}.g2,.g3,.g4,.kanban{grid-template-columns:1fr}}
`;


// DIRECTORY = Links to websites, GHL, social handles
function Directory({ d }) {
  const sites = d.sites||[];
  const ghl = d.ghl||[];
  const handles = d.handles||[];
  return (<div className="up">
    {sites.length>0 && <><div className="sec-t">Websites</div>
    <div className="card" style={{padding:0,overflow:"hidden",marginBottom:20}}><table className="tbl"><thead><tr><th>Brand</th><th>Live URL</th><th>Domain</th><th>Status</th></tr></thead>
    <tbody>{sites.map((s,i)=>(<tr key={i}><td style={{fontWeight:500}}>{s.entity_name||"-"}</td><td>{s.vercel_url?<a href={"https://"+s.vercel_url} target="_blank" rel="noopener" style={{color:"var(--ac)",fontSize:12}}>{s.vercel_url}</a>:"-"}</td><td>{s.custom_domain?<a href={"https://"+s.custom_domain} target="_blank" rel="noopener" style={{color:"var(--ac)",fontSize:12}}>{s.custom_domain}</a>:"-"}</td><td><span className={`bg ${s.status==="live"?"bg-gn":"bg-rd"}`}>{s.status||"-"}</span></td></tr>))}</tbody></table></div></>}
    {ghl.length>0 && <><div className="sec-t">GHL Locations</div>
    <div className="card" style={{padding:0,overflow:"hidden",marginBottom:20}}><table className="tbl"><thead><tr><th>Brand</th><th>Location ID</th><th>Link</th></tr></thead>
    <tbody>{ghl.map((g,i)=>(<tr key={i}><td style={{fontWeight:500}}>{g.location_name||"-"}</td><td style={{fontFamily:"var(--mn)",fontSize:11}}>{g.location_id}</td><td><a href={`https://app.gohighlevel.com/v2/location/${g.location_id}/dashboard`} target="_blank" rel="noopener" className="btn btn-s">Open GHL</a></td></tr>))}</tbody></table></div></>}
    {handles.length>0 && <><div className="sec-t">Social Handles</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Brand</th><th>Instagram</th><th>TikTok</th><th>Email</th><th>OAuth</th></tr></thead>
    <tbody>{handles.map((h,i)=>(<tr key={i}><td style={{fontWeight:500}}>{h.brand_display_name||h.brand_key||"-"}</td><td style={{color:"var(--ac)"}}>{h.ig_handle||"-"}</td><td>{h.tiktok_handle||"-"}</td><td style={{fontSize:11}}>{h.email||"-"}</td><td>{h.ghl_ig_oauth_connected?<span className="bg bg-gn">Yes</span>:<span className="bg bg-rd">No</span>}</td></tr>))}</tbody></table></div></>}
    {handles.length>0 && <><div className="sep" /><div className="sec-t">Email Accounts</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Brand</th><th>Email</th></tr></thead>
    <tbody>{handles.filter(h=>h.email).map((h,i)=>(<tr key={i}><td style={{fontWeight:500}}>{h.brand_display_name||h.brand_key||"-"}</td><td style={{fontSize:13}}>{h.email}</td></tr>))}</tbody></table></div></>}
    {sites.length===0&&ghl.length===0&&handles.length===0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No directory data for this entity</div>}
  </div>);
}

// CREDENTIALS - Add, Show/Hide, Copy, Delete
function Credentials({ d, reload }) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState({});
  const [adding, setAdding] = useState(false);
  const [nc, setNc] = useState({credential_type:"api_key",credential_key:"",credential_value:""});
  const [busy, setBusy] = useState(null);
  const creds = d.creds||[];
  const filt = search ? creds.filter(c=>(c.credential_key||"").toLowerCase().includes(search.toLowerCase())||(c.credential_type||"").toLowerCase().includes(search.toLowerCase())) : creds;
  const grouped = {};
  filt.forEach(c => { const t=c.credential_type||"other"; if(!grouped[t]) grouped[t]=[]; grouped[t].push(c); });
  const addCred = async () => {
    if(!nc.credential_key.trim()||!nc.credential_value.trim()) return; setBusy("add");
    await qi("credentials",{credential_type:nc.credential_type,credential_key:nc.credential_key,credential_value:JSON.stringify(nc.credential_value),is_active:true});
    setNc({credential_type:"api_key",credential_key:"",credential_value:""}); setAdding(false); await reload(); setBusy(null);
  };
  const deleteCred = async (id) => { if(!confirm("Delete credential?")) return; setBusy(id); await qd("credentials",`id=eq.${id}`); await reload(); setBusy(null); };
  return (<div className="up">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
      <input className="inp" placeholder="Search credentials..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:380}} />
      <button className="btn btn-p" onClick={()=>setAdding(!adding)}>+ Add</button>
    </div>
    {adding && <div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <div className="row" style={{gap:8,marginBottom:8}}>
        <select className="inp" style={{flex:1}} value={nc.credential_type} onChange={e=>setNc({...nc,credential_type:e.target.value})}>{["api_key","api_token","oauth","ghl_pit","ghl_location","shopify","n8n_workflow","webhook","github","gmail","internal","other"].map(t=><option key={t} value={t}>{t}</option>)}</select>
        <input className="inp" style={{flex:2}} placeholder="Key name..." value={nc.credential_key} onChange={e=>setNc({...nc,credential_key:e.target.value})} />
      </div>
      <textarea className="inp" placeholder="Value..." value={nc.credential_value} onChange={e=>setNc({...nc,credential_value:e.target.value})} style={{marginBottom:8,minHeight:50}} />
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={addCred} disabled={busy==="add"}>Save</button><button className="btn" onClick={()=>setAdding(false)}>Cancel</button></div>
    </div>}
    {Object.entries(grouped).sort((a,b)=>b[1].length-a[1].length).map(([type,items])=>(
      <div key={type} style={{marginBottom:20}}>
        <h3 style={{fontSize:14,marginBottom:8,textTransform:"capitalize"}}>{type.replace(/_/g," ")} <span className="bg bg-mt">{items.length}</span></h3>
        <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Key</th><th>Value</th><th>Actions</th></tr></thead>
        <tbody>{items.map((c,i)=>{const val=typeof c.credential_value==="object"?JSON.stringify(c.credential_value):String(c.credential_value||"");const vis=show[c.id];
          return (<tr key={i} style={{opacity:busy===c.id?.4:1}}><td style={{fontFamily:"var(--mn)",fontSize:11,fontWeight:500}}>{c.credential_key}</td><td style={{fontFamily:"var(--mn)",fontSize:11,maxWidth:300,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{vis?val.slice(0,100):"********"}</td><td><div className="row" style={{gap:4}}><button className="btn btn-s" onClick={()=>setShow(s=>({...s,[c.id]:!s[c.id]}))}>{vis?"Hide":"Show"}</button>{vis&&<button className="btn btn-s" onClick={()=>{navigator.clipboard.writeText(val)}}>Copy</button>}<button className="btn btn-s" style={{color:"var(--rd)"}} onClick={()=>deleteCred(c.id)}>Del</button></div></td></tr>);
        })}</tbody></table></div>
      </div>
    ))}
  </div>);
}

// TASK BOARD - Kanban + Edit Modal
function TaskBoard({ d, reload, entity }) {
  const [creating,setCreating]=useState(false);const [editing,setEditing]=useState(null);
  const [nt,setNt]=useState({title:"",priority:"medium",assigned_to:"claude",category:"other",description:"",due_date:""});
  const [busy,setBusy]=useState(null);
  const all=d.tasks||[];const open=all.filter(t=>t.status==="open");const prog=all.filter(t=>t.status==="in_progress");const blocked=all.filter(t=>t.status==="blocked");const done=all.filter(t=>t.status==="completed").slice(0,10);
  const up=async(id,data)=>{setBusy(id);await qu("khg_master_tasks",`id=eq.${id}`,{...data,updated_at:new Date().toISOString()});await reload();setBusy(null);setEditing(null)};
  const create=async()=>{if(!nt.title.trim())return;setBusy("new");const ex=await q("khg_master_tasks","select=task_key&order=task_key.desc&limit=1");const num=ex[0]?.task_key?parseInt(ex[0].task_key.split("-").pop())+1:95;await qi("khg_master_tasks",{task_key:`TASK-2026-${String(num).padStart(4,"0")}`,title:nt.title,category:nt.category,priority:nt.priority,assigned_to:nt.assigned_to,description:nt.description||null,due_date:nt.due_date||null,status:"open",brand:entity.key,created_by:"dr_dorsey"});setNt({title:"",priority:"medium",assigned_to:"claude",category:"other",description:"",due_date:""});setCreating(false);await reload();setBusy(null)};
  const TC=({t})=>(<div className="kanban-card" style={{borderLeft:`3px solid ${t.priority==="critical"?"var(--rd)":t.priority==="high"?"var(--ac)":"var(--bd)"}`,opacity:busy===t.id?.4:1}} onClick={()=>setEditing({...t})}>
    <div className="row" style={{gap:4,marginBottom:4}}><span className={`bg ${t.priority==="critical"?"bg-rd":t.priority==="high"?"bg-ac":"bg-mt"}`} style={{fontSize:8}}>{t.priority}</span><span className="bg bg-mt" style={{fontSize:8}}>{t.assigned_to||"-"}</span></div>
    <div style={{fontWeight:500,fontSize:12,lineHeight:1.4}}>{t.title}</div>
    {t.due_date&&<div style={{fontSize:10,color:"var(--tx3)",marginTop:3,fontFamily:"var(--mn)"}}>{new Date(t.due_date).toLocaleDateString()}</div>}
    {t.blocker_reason&&<div style={{fontSize:10,color:"var(--rd)",marginTop:3}}>{t.blocker_reason}</div>}
  </div>);
  return (<div className="up">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}><h3 style={{fontSize:15}}>Task Board</h3><button className="btn btn-p" onClick={()=>setCreating(!creating)}>+ New Task</button></div>
    {creating&&<div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <input className="inp" placeholder="Task title..." value={nt.title} onChange={e=>setNt({...nt,title:e.target.value})} style={{marginBottom:8}} />
      <textarea className="inp" placeholder="Description..." value={nt.description} onChange={e=>setNt({...nt,description:e.target.value})} style={{marginBottom:8,minHeight:50}} />
      <div className="row" style={{gap:8,marginBottom:8}}>
        <select className="inp" style={{flex:1}} value={nt.priority} onChange={e=>setNt({...nt,priority:e.target.value})}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
        <select className="inp" style={{flex:1}} value={nt.assigned_to} onChange={e=>setNt({...nt,assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
        <input className="inp" style={{flex:1}} type="date" value={nt.due_date} onChange={e=>setNt({...nt,due_date:e.target.value})} />
      </div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={create} disabled={busy==="new"||!nt.title.trim()}>Create</button><button className="btn" onClick={()=>setCreating(false)}>Cancel</button></div>
    </div>}
    {editing&&<div className="modal-bg" onClick={()=>setEditing(null)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3 style={{fontSize:16,marginBottom:16}}>Edit Task - {editing.task_key}</h3>
      <label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>Title</label>
      <input className="inp" value={editing.title||""} onChange={e=>setEditing({...editing,title:e.target.value})} style={{marginBottom:12}} />
      <label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>Description</label>
      <textarea className="inp" value={editing.description||""} onChange={e=>setEditing({...editing,description:e.target.value})} style={{marginBottom:12}} />
      <div className="g3" style={{marginBottom:12}}>
        <div><label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>Priority</label><select className="inp" value={editing.priority} onChange={e=>setEditing({...editing,priority:e.target.value})}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div>
        <div><label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>Assigned To</label><select className="inp" value={editing.assigned_to||""} onChange={e=>setEditing({...editing,assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select></div>
        <div><label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>Due Date</label><input className="inp" type="date" value={(editing.due_date||"").split("T")[0]} onChange={e=>setEditing({...editing,due_date:e.target.value})} /></div>
      </div>
      <div className="row" style={{gap:8,flexWrap:"wrap"}}>
        <button className="btn btn-p" onClick={()=>up(editing.id,{title:editing.title,description:editing.description,priority:editing.priority,assigned_to:editing.assigned_to,due_date:editing.due_date||null,category:editing.category,notes:editing.notes})}>Save</button>
        {editing.status==="open"&&<button className="btn btn-s" style={{background:"var(--bl)",color:"#fff",borderColor:"var(--bl)"}} onClick={()=>up(editing.id,{status:"in_progress",started_at:new Date().toISOString()})}>Start</button>}
        {editing.status!=="completed"&&<button className="btn btn-s btn-g" onClick={()=>up(editing.id,{status:"completed",completed_at:new Date().toISOString()})}>Done</button>}
        {editing.status!=="blocked"&&editing.status!=="completed"&&<button className="btn btn-s" onClick={()=>{const r=prompt("Blocker?");if(r)up(editing.id,{status:"blocked",blocker_reason:r})}}>Block</button>}
        {editing.status==="blocked"&&<button className="btn btn-s btn-p" onClick={()=>up(editing.id,{status:"in_progress",blocker_reason:null})}>Unblock</button>}
        <button className="btn btn-s btn-r" style={{marginLeft:"auto"}} onClick={()=>{if(confirm("Cancel task?"))up(editing.id,{status:"cancelled"})}}>Cancel Task</button>
      </div>
    </div></div>}
    <div className="kanban">
      <div className="kanban-col"><div className="kanban-hd"><span>Open</span><span className="bg bg-bl">{open.length}</span></div>{open.map(t=><TC key={t.id} t={t}/>)}</div>
      <div className="kanban-col" style={{background:"rgba(91,127,166,.05)"}}><div className="kanban-hd"><span>In Progress</span><span className="bg bg-bl">{prog.length}</span></div>{prog.map(t=><TC key={t.id} t={t}/>)}</div>
      <div className="kanban-col" style={{background:"rgba(196,91,74,.04)"}}><div className="kanban-hd"><span>Blocked</span><span className="bg bg-rd">{blocked.length}</span></div>{blocked.map(t=><TC key={t.id} t={t}/>)}</div>
      <div className="kanban-col" style={{background:"rgba(74,143,109,.04)"}}><div className="kanban-hd"><span>Done</span><span className="bg bg-gn">{done.length}</span></div>{done.map(t=><TC key={t.id} t={t}/>)}</div>
    </div>
  </div>);
}

// SOCIAL MEDIA - Compose + Edit ALL fields + Sub-brand
function SocialMedia({ d, reload, entity }) {
  const [tab,setTab]=useState("all");const [composing,setComposing]=useState(false);const [editing,setEditing]=useState(null);
  const [np,setNp]=useState({caption:"",platform:"instagram",content_type:"post",image_url:"",scheduled_for:"",brand_key:entity.brandKeys[0]||""});
  const [busy,setBusy]=useState(null);
  const all=d.social||[];const queued=all.filter(p=>p.status==="queued");const posted=all.filter(p=>p.status==="posted");const approved=all.filter(p=>p.status==="approved");
  const filt=tab==="queued"?queued:tab==="posted"?posted:tab==="approved"?approved:all;
  const approve=async id=>{
    setBusy(id);
    await qu("ghl_social_posting_queue",`id=eq.${id}`,{status:"approved"});
    try { await fetch("https://dorsey.app.n8n.cloud/webhook/oWAp1njam9bgKhSa",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"post_approved",post_id:id})}); } catch(e) {}
    await reload();
    setBusy(null);
  };
  const reject=async id=>{setBusy(id);await qu("ghl_social_posting_queue",`id=eq.${id}`,{status:"rejected"});await reload();setBusy(null)};
  const saveEdit=async()=>{if(!editing)return;setBusy(editing.id);await qu("ghl_social_posting_queue",`id=eq.${editing.id}`,{caption:editing.caption,image_url:editing.image_url||null,scheduled_for:editing.scheduled_for||null,platform:editing.platform,content_type:editing.content_type,brand_key:editing.brand_key});setEditing(null);await reload();setBusy(null)};
  const createPost=async()=>{if(!np.caption.trim())return;setBusy("new");await qi("ghl_social_posting_queue",{brand_key:np.brand_key,caption:np.caption,platform:np.platform,content_type:np.content_type,image_url:np.image_url||null,scheduled_for:np.scheduled_for||null,status:"queued"});setNp({caption:"",platform:"instagram",content_type:"post",image_url:"",scheduled_for:"",brand_key:entity.brandKeys[0]||""});setComposing(false);await reload();setBusy(null)};
  return (<div className="up">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
      <div className="pills" style={{margin:0}}>
        <button className={`pill ${tab==="all"?"on":""}`} onClick={()=>setTab("all")}>All ({all.length})</button>
        <button className={`pill ${tab==="queued"?"on":""}`} onClick={()=>setTab("queued")}>Queued ({queued.length})</button>
        <button className={`pill ${tab==="approved"?"on":""}`} onClick={()=>setTab("approved")}>Approved ({approved.length})</button>
        <button className={`pill ${tab==="posted"?"on":""}`} onClick={()=>setTab("posted")}>Posted ({posted.length})</button>
      </div>
      <button className="btn btn-p" onClick={()=>setComposing(!composing)}>+ Compose</button>
    </div>
    {composing&&<div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <h3 style={{fontSize:14,marginBottom:10}}>New Post</h3>
      <textarea className="inp" placeholder="Caption..." value={np.caption} onChange={e=>setNp({...np,caption:e.target.value})} style={{marginBottom:8}} />
      <input className="inp" placeholder="Image URL (optional)" value={np.image_url} onChange={e=>setNp({...np,image_url:e.target.value})} style={{marginBottom:8}} />
      <div className="row" style={{gap:8,marginBottom:8}}>
        {entity.brandKeys.length>1&&<select className="inp" style={{flex:1}} value={np.brand_key} onChange={e=>setNp({...np,brand_key:e.target.value})}>{entity.brandKeys.map(k=><option key={k} value={k}>{k.replace(/_/g," ")}</option>)}</select>}
        <select className="inp" style={{flex:1}} value={np.platform} onChange={e=>setNp({...np,platform:e.target.value})}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option></select>
        <select className="inp" style={{flex:1}} value={np.content_type} onChange={e=>setNp({...np,content_type:e.target.value})}><option value="post">Post</option><option value="reel">Reel</option><option value="story">Story</option><option value="carousel">Carousel</option></select>
      </div>
      <div className="row" style={{gap:8,marginBottom:8}}><label style={{fontSize:11,color:"var(--tx3)"}}>Schedule:</label><input className="inp" type="datetime-local" value={np.scheduled_for} onChange={e=>setNp({...np,scheduled_for:e.target.value})} style={{flex:1}} /></div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={createPost} disabled={busy==="new"}>Create</button><button className="btn" onClick={()=>setComposing(false)}>Cancel</button></div>
    </div>}
    {editing&&<div className="modal-bg" onClick={()=>setEditing(null)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3 style={{fontSize:16,marginBottom:16}}>Edit Post</h3>
      <textarea className="inp" value={editing.caption||""} onChange={e=>setEditing({...editing,caption:e.target.value})} style={{marginBottom:8}} />
      <input className="inp" placeholder="Image URL" value={editing.image_url||""} onChange={e=>setEditing({...editing,image_url:e.target.value})} style={{marginBottom:8}} />
      {editing.image_url&&<img src={editing.image_url} alt="" style={{maxWidth:200,borderRadius:8,border:"1px solid var(--bd)",marginBottom:8}} onError={e=>{e.target.style.display="none"}} />}
      <div className="g3" style={{marginBottom:8}}>
        <select className="inp" value={editing.brand_key||""} onChange={e=>setEditing({...editing,brand_key:e.target.value})}>{entity.brandKeys.map(k=><option key={k} value={k}>{k.replace(/_/g," ")}</option>)}</select>
        <select className="inp" value={editing.platform||"instagram"} onChange={e=>setEditing({...editing,platform:e.target.value})}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option></select>
        <select className="inp" value={editing.content_type||"post"} onChange={e=>setEditing({...editing,content_type:e.target.value})}><option value="post">Post</option><option value="reel">Reel</option><option value="story">Story</option></select>
      </div>
      <input className="inp" type="datetime-local" value={(editing.scheduled_for||"").slice(0,16)} onChange={e=>setEditing({...editing,scheduled_for:e.target.value})} style={{marginBottom:8}} />
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={saveEdit}>Save</button>{editing.status==="queued"&&<button className="btn btn-g" onClick={()=>{approve(editing.id);setEditing(null)}}>Approve</button>}<button className="btn" onClick={()=>setEditing(null)}>Close</button></div>
    </div></div>}
    {filt.map((p,i)=>(<div key={p.id||i} className="card" style={{marginBottom:8,opacity:busy===p.id?.4:1}}>
      <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
        <div className="row" style={{gap:6}}><span className="bg bg-bl">{p.platform||"IG"}</span><span className="bg bg-mt">{p.content_type||"post"}</span><span className="bg bg-ac">{p.brand_key||"-"}</span></div>
        <div className="row" style={{gap:6}}>{p.scheduled_for&&<span style={{fontSize:10,color:"var(--tx3)",fontFamily:"var(--mn)"}}>{new Date(p.scheduled_for).toLocaleString()}</span>}<span className={`bg ${p.status==="posted"?"bg-gn":p.status==="approved"?"bg-bl":"bg-yl"}`}>{p.status}</span></div>
      </div>
      <div style={{fontSize:13,lineHeight:1.6,color:"var(--tx2)",whiteSpace:"pre-wrap"}}>{(p.caption||"").slice(0,300)}</div>
      {p.image_url&&<img src={p.image_url} alt="" style={{maxWidth:180,borderRadius:6,border:"1px solid var(--bd)",marginTop:8}} onError={e=>{e.target.style.display="none"}} />}
      <div className="row" style={{gap:4,marginTop:10}}>{p.status==="queued"&&<button className="btn btn-s btn-g" onClick={()=>approve(p.id)}>Approve</button>}{p.status==="queued"&&<button className="btn btn-s btn-r" onClick={()=>reject(p.id)}>Reject</button>}<button className="btn btn-s" onClick={()=>setEditing({...p})}>Edit</button></div>
    </div>))}
    {filt.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No {tab} posts</div>}
  </div>);
}

// EMAIL APPROVALS - Edit subject+body+CTA before approve
function EmailApprovals({ d, reload }) {
  const [busy,setBusy]=useState(null);const [editing,setEditing]=useState(null);
  const pending=(d.emails||[]).filter(e=>!e.approved);const approved=(d.emails||[]).filter(e=>e.approved);
  const approve=async id=>{
    setBusy(id);
    await qu("email_approval_queue",`id=eq.${id}`,{approved:true,approved_at:new Date().toISOString(),approved_by:"dr_dorsey"});
    try { await fetch("https://dorsey.app.n8n.cloud/webhook/3jDssrDbi21CLhn6",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"email_approved",email_id:id})}); } catch(e) {}
    await reload();setBusy(null);
  };
  const saveEmail=async()=>{if(!editing)return;setBusy(editing.id);await qu("email_approval_queue",`id=eq.${editing.id}`,{subject:editing.subject,body_preview:editing.body_preview,cta_text:editing.cta_text,cta_url:editing.cta_url});setEditing(null);await reload();setBusy(null)};
  return (<div className="up">
    {editing&&<div className="modal-bg" onClick={()=>setEditing(null)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3 style={{fontSize:16,marginBottom:16}}>Edit Email</h3>
      <label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>Subject</label>
      <input className="inp" value={editing.subject||""} onChange={e=>setEditing({...editing,subject:e.target.value})} style={{marginBottom:12}} />
      <label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>Body</label>
      <textarea className="inp" value={editing.body_preview||""} onChange={e=>setEditing({...editing,body_preview:e.target.value})} style={{marginBottom:12,minHeight:120}} />
      <div className="g2" style={{marginBottom:12}}>
        <div><label style={{fontSize:11,color:"var(--tx3)",fontWeight:600}}>CTA Text</label><input className="inp" value={editing.cta_text||""} onChange={e=>setEditing({...editing,cta_text:e.target.value})} /></div>
        <div><label style={{fontSize:11,color:"var(--tx3)",fontWeight:600}}>CTA URL</label><input className="inp" value={editing.cta_url||""} onChange={e=>setEditing({...editing,cta_url:e.target.value})} /></div>
      </div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={saveEmail}>Save</button><button className="btn btn-g" onClick={async()=>{await saveEmail();approve(editing.id)}}>Save + Approve</button><button className="btn" onClick={()=>setEditing(null)}>Cancel</button></div>
    </div></div>}
    <div className="sec-t">{pending.length} pending - {approved.length} approved</div>
    {pending.map((e,i)=>(<div key={e.id||i} className="card" style={{marginBottom:8,borderLeft:"3px solid var(--yl)",opacity:busy===e.id?.4:1}}>
      <div className="row" style={{justifyContent:"space-between",marginBottom:6}}><div><span className="bg bg-ac">{e.brand_key||"-"}</span> <span className="bg bg-mt">{e.sequence_type||"-"}</span></div><span style={{fontSize:11,color:"var(--tx3)"}}>{e.recipient_count||0} recipients</span></div>
      <h3 style={{fontSize:14,marginBottom:4}}>{e.subject||"(no subject)"}</h3>
      <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.6,maxHeight:100,overflow:"hidden",whiteSpace:"pre-wrap"}}>{e.body_preview||""}</div>
      <div className="row" style={{gap:6,marginTop:10}}><button className="btn btn-s" onClick={()=>setEditing({...e})}>Edit</button><button className="btn btn-s btn-g" onClick={()=>approve(e.id)}>Approve</button><button className="btn btn-s btn-r" onClick={()=>{if(confirm("Reject?"))qu("email_approval_queue",`id=eq.${e.id}`,{notes:"REJECTED"}).then(reload)}}>Reject</button></div>
    </div>))}
    {pending.length===0&&approved.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No emails</div>}
  </div>);
}

// OVERVIEW
function Overview({ d, go }) {
  const tasks=(d.tasks||[]).filter(t=>!["completed","cancelled"].includes(t.status));
  const qOut=(d.outreach||[]).filter(o=>o.status==="queued");
  return (<div className="up">
    <div className="g4" style={{marginBottom:24}}>
      <div className="card stat" onClick={()=>go("tasks")}><div className="stat-v" style={{color:"var(--ac)"}}>{tasks.length}</div><div className="stat-l">Open Tasks</div></div>
      <div className="card stat" onClick={()=>go("outreach")}><div className="stat-v" style={{color:"var(--bl)"}}>{qOut.length.toLocaleString()}</div><div className="stat-l">Outreach Queue</div></div>
      <div className="card stat" onClick={()=>go("social")}><div className="stat-v" style={{color:"var(--gn)"}}>{(d.social||[]).length}</div><div className="stat-l">Social Posts</div></div>
      <div className="card stat" onClick={()=>go("events")}><div className="stat-v" style={{color:"var(--yl)"}}>{(d.events||[]).length}</div><div className="stat-l">Events</div></div>
    </div>
    <div className="card"><h3 style={{fontSize:15,marginBottom:12}}>Quick Actions</h3><div className="row" style={{gap:8,flexWrap:"wrap"}}>
      <button className="btn btn-p" onClick={()=>go("tasks")}>Tasks</button><button className="btn" onClick={()=>go("outreach")}>Outreach</button><button className="btn" onClick={()=>go("social")}>Social</button><button className="btn" onClick={()=>go("events")}>Events</button><button className="btn" onClick={()=>go("content")}>Content</button><button className="btn" onClick={()=>go("directory")}>Directory</button><button className="btn" onClick={()=>go("creds")}>Credentials</button><button className="btn" onClick={()=>go("emails")}>Emails</button>
    </div></div>
  </div>);
}

// OUTREACH
function Outreach({ d, reload }) {
  const [view,setView]=useState("queued");const [busy,setBusy]=useState(null);const all=d.outreach||[];const queued=all.filter(o=>o.status==="queued");const sent=all.filter(o=>o.status==="sent");const filt=view==="sent"?sent:queued;
  const send=async id=>{setBusy(id);await qu("contact_action_queue",`id=eq.${id}`,{status:"sent",sent_at:new Date().toISOString()});await reload();setBusy(null)};
  const skip=async id=>{setBusy(id);await qu("contact_action_queue",`id=eq.${id}`,{status:"skipped"});await reload();setBusy(null)};
  return (<div className="up"><div className="pills"><button className={`pill ${view==="queued"?"on":""}`} onClick={()=>setView("queued")}>Queued ({queued.length})</button><button className={`pill ${view==="sent"?"on":""}`} onClick={()=>setView("sent")}>Sent ({sent.length})</button></div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Contact</th><th>Type</th><th>Segment</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{filt.slice(0,30).map((o,i)=>(<tr key={o.id||i} style={{opacity:busy===o.id?.4:1}}><td style={{fontWeight:500,color:"var(--tx)"}}>{o.contact_name||o.ig_handle||o.contact_email||"-"}</td><td>{o.action_type||"-"}</td><td><span className="bg bg-mt">{o.segment_type||"-"}</span></td><td>{o.contact_city||"-"}</td><td><span className={`bg ${o.status==="sent"?"bg-gn":"bg-yl"}`}>{o.status}</span></td><td><div className="row" style={{gap:4}}>{o.status==="queued"&&<button className="btn btn-s btn-p" onClick={()=>send(o.id)}>Send</button>}{o.status==="queued"&&<button className="btn btn-s" onClick={()=>skip(o.id)}>Skip</button>}</div></td></tr>))}</tbody></table></div>
    {filt.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)",marginTop:12}}>No {view} outreach</div>}
  </div>);
}

// EVENTS
function Events({ d }) {
  const events=d.events||[];
  return (<div className="up"><div className="sec-t">{events.length} events</div>
    {events.map((ev,i)=>(<div key={i} className="card" style={{marginBottom:8}}><div className="row" style={{justifyContent:"space-between",marginBottom:4}}><div style={{fontSize:15,fontWeight:700,fontFamily:"var(--hd)"}}>{ev.event_name}</div>{ev.event_url&&<a href={ev.event_url} target="_blank" rel="noopener" className="btn btn-s btn-p">Eventbrite</a>}</div>
      <div className="row" style={{gap:8}}><span style={{fontFamily:"var(--mn)",fontSize:11,color:"var(--tx3)"}}>{ev.event_date?new Date(ev.event_date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"TBD"}</span><span style={{fontSize:11,color:"var(--tx3)"}}>{ev.city||""}</span><span className="bg bg-mt">{ev.brand_key}</span>{ev.is_active&&<span className="bg bg-gn">Active</span>}</div></div>))}
    {events.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No events</div>}
  </div>);
}

// CONTENT CALENDAR
function ContentCal({ d }) {
  const slots=d.content||[];const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return (<div className="up"><div className="sec-t">{slots.length} weekly slots</div>
    {days.map(day=>{const ds=slots.filter(s=>s.day_of_week===day);if(ds.length===0)return null;return (<div key={day} style={{marginBottom:20}}><h3 style={{fontSize:15,marginBottom:8}}>{day}</h3><div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Time</th><th>Brand</th><th>Pillar</th><th>Visual</th><th>Caption</th><th>CTA</th></tr></thead>
    <tbody>{ds.map((s,i)=>(<tr key={i}><td style={{fontFamily:"var(--mn)",fontSize:12}}>{s.post_time||"-"}</td><td><span className="bg bg-ac">{s.brand_key||"-"}</span></td><td>{s.content_pillar||"-"}</td><td>{s.visual_type||"-"}</td><td className="trunc" style={{maxWidth:200}}>{s.caption_template||"-"}</td><td>{s.cta||"-"}</td></tr>))}</tbody></table></div></div>)})}
    {slots.length===0&&<div className="card" style={{textAlign:"center",padding:40,color:"var(--tx3)"}}>No content schedule</div>}
  </div>);
}

// EXTRA TABLE (generic for entity-specific data)
function ExtraTable({ name, rows }) {
  const [search, setSearch] = useState("");
  if (!rows || rows.length === 0) {
    return <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>{"No " + name + " data"}</div>;
  }
  const cols = Object.keys(rows[0]).filter(function(k) {
    return k !== "id" && !k.endsWith("_at") && k !== "tenant_id" && k !== "credential_id" && k !== "created_by";
  }).slice(0, 8);
  const filt = search
    ? rows.filter(function(r) { return cols.some(function(c) { return String(r[c] || "").toLowerCase().includes(search.toLowerCase()); }); })
    : rows;
  const renderCell = function(val) {
    if (val == null) return "-";
    return String(val).slice(0, 80);
  };
  return (
    <div className="up">
      <input className="inp" placeholder={"Search " + name + "..."} value={search} onChange={function(e) { setSearch(e.target.value); }} style={{marginBottom:14,maxWidth:380}} />
      <div className="sec-t">{filt.length + " records"}</div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table className="tbl">
            <thead>
              <tr>
                {cols.map(function(c) { return <th key={c}>{c.replace(/_/g, " ")}</th>; })}
              </tr>
            </thead>
            <tbody>
              {filt.slice(0, 50).map(function(r, i) {
                return (
                  <tr key={i}>
                    {cols.map(function(c) {
                      return <td key={c} className="trunc" style={{maxWidth:200}}>{renderCell(r[c])}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// DAILY OPS QUOTAS - Editable per brand
function DailyQuotas({ d, reload }) {
  const [busy, setBusy] = useState(null);
  const quotas = d.quotas || [];
  const fields = [
    {key:"dms_per_day",label:"DMs / Day"},
    {key:"comments_per_day",label:"Comments / Day"},
    {key:"likes_per_day",label:"Likes / Day"},
    {key:"follows_per_day",label:"Follows / Day"},
    {key:"emails_per_day",label:"Emails / Day"},
    {key:"sms_per_day",label:"SMS / Day"},
    {key:"stories_per_day",label:"Stories / Day"},
    {key:"posts_per_day",label:"Posts / Day"},
    {key:"reels_per_week",label:"Reels / Week"},
  ];
  const save = async (id, key, val) => {
    setBusy(id+key);
    const num = parseInt(val) || 0;
    await qu("khg_daily_ops_quotas", "id=eq."+id, {[key]: num, updated_at: new Date().toISOString(), updated_by: "dr_dorsey"});
    await reload();
    setBusy(null);
  };
  return (<div className="up">
    <div className="sec-t">Daily Operations Quotas</div>
    <p style={{fontSize:13,color:"var(--tx2)",marginBottom:20,lineHeight:1.6}}>Set how many DMs, comments, likes, follows, emails, and posts each brand should execute per day. Changes save instantly to Supabase and are picked up by n8n workflows.</p>
    {quotas.length === 0 && <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No quotas configured for this entity</div>}
    {quotas.map(function(qo, qi) {
      return (
        <div key={qo.id} className="card" style={{marginBottom:14}}>
          <h3 style={{fontSize:16,marginBottom:12}}>{(qo.brand_key||"").replace(/_/g," ").toUpperCase()}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {fields.map(function(f) {
              return (
                <div key={f.key}>
                  <label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>{f.label}</label>
                  <input
                    className="inp"
                    type="number"
                    min="0"
                    defaultValue={qo[f.key]||0}
                    onBlur={function(e) { if (parseInt(e.target.value) !== qo[f.key]) save(qo.id, f.key, e.target.value); }}
                    style={{fontFamily:"var(--mn)",fontWeight:600,fontSize:16,textAlign:"center",opacity:busy===(qo.id+f.key)?.5:1}}
                  />
                </div>
              );
            })}
          </div>
          <div style={{marginTop:8,fontSize:11,color:"var(--tx3)"}}>Last updated: {qo.updated_at ? new Date(qo.updated_at).toLocaleString() : "never"}</div>
        </div>
      );
    })}
  </div>);
}

// MAIN EXPORT
export default function EntityDashboard({ entity }) {
  const [screen, setScreen] = useState("overview");
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);
  const [subBrand, setSubBrand] = useState("all");
  const bkFilter = entity.brandKeys.length > 0 ? `brand_key=in.(${entity.brandKeys.join(",")})` : "";
  const activeBk = subBrand !== "all" ? `brand_key=eq.${subBrand}` : bkFilter;

  const load = useCallback(async () => {
    if (entity.brandKeys.length === 0) { setD({}); setLoading(false); return; }
    const base = await Promise.all([
      q("khg_master_tasks","select=*&order=priority,created_at.desc&limit=100"),
      q("contact_action_queue",`select=*&${activeBk}&order=created_at.desc&limit=100`),
      q("ghl_social_posting_queue",`select=*&${activeBk}&order=created_at.desc&limit=50`),
      q("eventbrite_events",`select=*&${activeBk}&event_date=gte.${new Date().toISOString().split("T")[0]}&order=event_date.asc&limit=30`),
      q("weekly_content_schedule",`select=*&${activeBk}&is_active=eq.true&order=day_of_week,post_time`),
      q("email_approval_queue","select=*&order=created_at.desc&limit=30"),
      q("khg_website_registry","select=*&order=entity_name"),
      q("brand_asset_files","select=entity_id,file_url,is_primary&asset_type=eq.logo&file_url=not.is.null&order=entity_id"),
      q("ghl_locations","select=*&order=location_name"),
      q("brand_social_handles",`select=*&${bkFilter}&order=brand_key`),
      q("credentials","select=id,credential_type,credential_key,credential_value,is_active&is_active=eq.true&order=credential_type,credential_key"),
      q("khg_daily_ops_quotas",`select=*&${bkFilter}&order=brand_key`),
    ]);
    const [tasks,outreach,social,events,content,emails,sites,ghl,handles,creds,logos,quotas] = base;
    const entitySites = (sites||[]).filter(s=>entity.brandKeys.some(k=>(s.entity_key||"").includes(k)));
    const entityGhl = (ghl||[]).filter(g=>entity.brandKeys.some(k=>k===g.brand_key||g.brand_key===k||(g.brand_key||'').includes(k.split('_')[0])));
    const entityLogos = (logos||[]).filter(l=>entity.brandKeys.some(k=>k===l.entity_id||(l.entity_id||'').includes(k)||(l.entity_id||'').includes(k.split('_')[0])));
    const entityTasks = (tasks||[]).filter(function(t) {
      if (!t.brand || t.brand === "khg") return true;
      var b = t.brand.toLowerCase().replace(/\s+/g,"_");
      return entity.brandKeys.some(function(k) { return b === k || k === b || b.includes(k) || k.includes(b); });
    });
    const result = {tasks:entityTasks,outreach:outreach||[],social:social||[],events:events||[],content:content||[],emails:emails||[],sites:entitySites,ghl:entityGhl,handles:handles||[],creds:creds||[],logos:entityLogos,quotas:quotas||[]};
    if (entity.extraTables) {
      const extras = await Promise.all(entity.extraTables.map(ex=>q(ex.table,ex.query)));
      entity.extraTables.forEach((ex,i) => { result[ex.key] = extras[i]||[]; });
    }
    setD(result); setLoading(false);
  }, [activeBk, bkFilter, entity.brandKeys, entity.extraTables]);

  useEffect(() => { load(); }, [load]);
  const go = useCallback(s => setScreen(s), []);

  const nav = [
    {id:"overview",label:"Overview",sec:"Command"},
    {id:"tasks",label:"Task Board",sec:"Command"},
    {id:"directory",label:"Directory & Links",sec:"Data"},
    {id:"creds",label:"Credentials",sec:"Data",ct:(d.creds||[]).length},
    {id:"outreach",label:"Outreach",sec:"Execution",ct:(d.outreach||[]).filter(o=>o.status==="queued").length},
    {id:"social",label:"Social Media",sec:"Execution",ct:(d.social||[]).length},
    {id:"events",label:"Events",sec:"Execution",ct:(d.events||[]).length},
    {id:"content",label:"Content Calendar",sec:"Execution",ct:(d.content||[]).length},
    {id:"quotas",label:"Daily Ops Quotas",sec:"Execution",ct:(d.quotas||[]).length},
    {id:"emails",label:"Email Approvals",sec:"Execution",ct:(d.emails||[]).filter(e=>!e.approved).length},
    ...(entity.extraNav||[]).map(n=>({...n,sec:n.sec||"Data",ct:n.ct||(d[n.id]||[]).length})),
  ];
  const secs=[...new Set(nav.map(n=>n.sec))];
  const titles={};nav.forEach(n=>titles[n.id]=n.label);

  const render = () => {
    if(loading) return <div style={{textAlign:"center",padding:60,color:"var(--tx3)",fontFamily:"var(--hd)",fontSize:16}}>Loading {entity.name}...</div>;
    switch(screen){
      case "overview": return <Overview d={d} go={go}/>;
      case "tasks": return <TaskBoard d={d} reload={load} entity={entity}/>;
      case "directory": return <Directory d={d}/>;
      case "creds": return <Credentials d={d} reload={load}/>;
      case "outreach": return <Outreach d={d} reload={load}/>;
      case "social": return <SocialMedia d={d} reload={load} entity={entity}/>;
      case "events": return <Events d={d}/>;
      case "content": return <ContentCal d={d}/>;
      case "quotas": return <DailyQuotas d={d} reload={load} />;
      case "emails": return <EmailApprovals d={d} reload={load}/>;
      default:
        if(entity.extraTables?.find(ex=>ex.key===screen)&&d[screen]) return <ExtraTable name={titles[screen]||screen} rows={d[screen]}/>;
        return <Overview d={d} go={go}/>;
    }
  };

  const themeCSS = css.replace(/VAR_AC10/g, entity.color+"10").replace(/VAR_AC/g, entity.color);

  return (<>
    <style>{themeCSS}</style>
    <div className="app">
      <div className="sb">
        <div className="sb-hd">
          {d.logos && d.logos.filter(l=>l.is_primary).length > 0 && <img src={d.logos.filter(l=>l.is_primary)[0].file_url} alt="" style={{maxHeight:36,maxWidth:120,objectFit:"contain",marginBottom:8}} onError={e=>{e.target.style.display="none"}} />}
          <h2>{entity.name}</h2><p>{entity.subtitle||""}</p></div>
        {entity.brandKeys.length>1&&<div style={{padding:"8px 20px"}}><select className="inp" value={subBrand} onChange={e=>{setSubBrand(e.target.value);setLoading(true);setTimeout(load,10)}} style={{fontSize:12}}><option value="all">All Brands ({entity.brandKeys.length})</option>{entity.brandKeys.map(k=><option key={k} value={k}>{k.replace(/_/g," ")}</option>)}</select></div>}
        <div className="sb-nav">
          {secs.map(sec=>(<div key={sec}><div className="sb-sec">{sec}</div>
            {nav.filter(n=>n.sec===sec).map(n=>(<div key={n.id} className={`sb-i ${screen===n.id?"on":""}`} onClick={()=>go(n.id)}><span>{n.label}</span>{n.ct!==undefined&&n.ct>0&&<span className="n">{n.ct>999?Math.round(n.ct/1000)+"K":n.ct}</span>}</div>))}
          </div>))}
        </div>
        <div style={{padding:14,borderTop:"1px solid var(--bd)"}}><Link href="/" style={{color:"var(--tx3)",textDecoration:"none",fontSize:12}}>Back to Hub</Link></div>
      </div>
      <div className="mn">
        <div className="tb"><h1>{titles[screen]||entity.name}</h1><span className="dt">{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</span></div>
        <div className="ct-a">{render()}</div>
      </div>
    </div>
  </>);
}
