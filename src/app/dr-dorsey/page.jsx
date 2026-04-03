"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const S="https://dzlmtvodpyhetvektfuo.supabase.co";
const K="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const Q=async(t,p="")=>{try{const r=await fetch(`${S}/rest/v1/${t}${p?"?"+p:""}`,{headers:{apikey:K,Authorization:`Bearer ${K}`}});return r.ok?r.json():[];}catch{return[];}};
const QI=async(t,d)=>{try{const r=await fetch(`${S}/rest/v1/${t}`,{method:"POST",headers:{apikey:K,Authorization:`Bearer ${K}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(d)});return r.ok?r.json():null;}catch{return null;}};
const QU=async(t,m,d)=>{try{const r=await fetch(`${S}/rest/v1/${t}?${m}`,{method:"PATCH",headers:{apikey:K,Authorization:`Bearer ${K}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(d)});return r.ok?r.json():null;}catch{return null;}};

const css=`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#FAFAF8;--sf:#fff;--sf2:#F5F3EF;--bd:#E8E4DD;--tx:#1A1A18;--tx2:#4A4540;--tx3:#7A756E;--ac:#C9A96E;--ac2:#B8944D;--acL:rgba(201,169,110,.08);--gn:#4A8F6D;--rd:#C45B4A;--yl:#D4A843;--bl:#5B7FA6;--hd:'Cormorant Garamond',Georgia,serif;--bf:'Outfit',system-ui,sans-serif;--mn:'JetBrains Mono',monospace;--r:8px}
@keyframes u{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.u{animation:u .35s cubic-bezier(.16,1,.3,1) both}
body{font-family:var(--bf);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased;font-size:14px}
h1,h2,h3{font-family:var(--hd);font-weight:600;letter-spacing:-.01em}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:240px;min-width:240px;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column}
.sb-h{padding:20px;border-bottom:1px solid var(--bd)}.sb-h h2{font-size:18px;color:var(--ac)}.sb-h p{font-size:10px;color:var(--tx3);letter-spacing:.15em;text-transform:uppercase;font-weight:500;margin-top:2px}
.sb-n{flex:1;overflow-y:auto;padding:8px 0}
.sb-s{padding:14px 20px 4px;font-size:9px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--tx3)}
.sb-i{display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;color:var(--tx2);font-size:14px;transition:all .12s;border-left:3px solid transparent}
.sb-i:hover{background:var(--sf2);color:var(--tx)}.sb-i.on{background:var(--acL);color:var(--ac);border-left-color:var(--ac);font-weight:600}
.sb-i .c{margin-left:auto;font-size:10px;background:var(--sf2);padding:1px 7px;border-radius:10px;color:var(--tx3);font-family:var(--mn)}
.sb-f{padding:14px 20px;border-top:1px solid var(--bd)}
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden}
.tb{height:52px;min-height:52px;border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 28px;background:var(--sf);gap:12px}
.tb h1{font-size:19px}.tb .dt{margin-left:auto;font-size:11px;color:var(--tx3);font-family:var(--mn)}
.ct{flex:1;overflow-y:auto;padding:28px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:20px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.st{text-align:center;padding:22px 14px;cursor:pointer;transition:transform .15s}.st:hover{transform:translateY(-2px)}.st-v{font-family:var(--hd);font-size:30px;font-weight:700;line-height:1}.st-l{font-size:9px;color:var(--tx3);margin-top:5px;letter-spacing:.12em;text-transform:uppercase;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:var(--r);font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--bd);background:var(--sf);color:var(--tx2);font-family:var(--bf);transition:all .12s}
.btn:hover{border-color:var(--ac);color:var(--tx)}.btn-p{background:var(--ac);color:#fff;border-color:var(--ac)}.btn-p:hover{background:var(--ac2)}.btn-g{background:var(--gn);color:#fff;border-color:var(--gn)}.btn-r{background:var(--rd);color:#fff;border-color:var(--rd)}.btn-s{padding:5px 12px;font-size:11px}
.bg{display:inline-flex;padding:3px 9px;border-radius:4px;font-size:9px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.bg-ac{background:rgba(201,169,110,.12);color:var(--ac)}.bg-gn{background:rgba(74,143,109,.1);color:var(--gn)}.bg-rd{background:rgba(196,91,74,.1);color:var(--rd)}.bg-bl{background:rgba(91,127,166,.1);color:var(--bl)}.bg-mt{background:var(--sf2);color:var(--tx3)}.bg-yl{background:rgba(212,168,67,.1);color:var(--yl)}
.tbl{width:100%;border-collapse:collapse}.tbl th{text-align:left;padding:10px 14px;color:var(--tx3);font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid var(--bd)}.tbl td{padding:10px 14px;border-bottom:1px solid var(--sf2);color:var(--tx2)}.tbl tr:hover td{background:rgba(201,169,110,.03)}
.inp{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--r);padding:10px 14px;color:var(--tx);font-size:14px;font-family:var(--bf);width:100%;outline:none;transition:border .15s}.inp:focus{border-color:var(--ac)}
textarea.inp{min-height:80px;resize:vertical;line-height:1.5}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}.pill{padding:6px 14px;border-radius:20px;font-size:11px;cursor:pointer;border:1px solid var(--bd);color:var(--tx3);background:var(--sf);font-weight:500;transition:all .12s}.pill.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.row{display:flex;align-items:center;gap:8px}.sep{height:1px;background:var(--bd);margin:20px 0}.sec{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3);margin-bottom:12px}.trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kb{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;align-items:start}.kb-c{background:var(--sf2);border-radius:var(--r);padding:12px;min-height:200px}.kb-h{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;display:flex;justify-content:space-between}.kb-d{background:var(--sf);border:1px solid var(--bd);border-radius:6px;padding:10px 12px;margin-bottom:8px;font-size:12px;cursor:pointer}.kb-d:hover{box-shadow:0 2px 8px rgba(0,0,0,.06)}
.link-card{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);margin-bottom:6px;transition:all .12s;cursor:pointer;text-decoration:none;color:var(--tx)}.link-card:hover{border-color:var(--ac);box-shadow:0 2px 8px rgba(201,169,110,.1)}
.link-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
@media(max-width:900px){.sb{display:none}.g2,.g3,.g4,.g5,.kb{grid-template-columns:1fr}}
`;


function Directory({ d }) {
  const [search, setSearch] = useState("");
  const websites = d.websites||[];
  const ghl = d.ghl||[];
  const links = [
    {cat:"Infrastructure",items:[
      {name:"Supabase",url:"https://supabase.com/dashboard/project/dzlmtvodpyhetvektfuo",icon:"🗄️",color:"#3ECF8E"},
      {name:"n8n Workflows",url:"https://dorsey.app.n8n.cloud",icon:"⚡",color:"#FF6D5A"},
      {name:"Vercel Dashboard",url:"https://vercel.com/dr-dorseys-projects",icon:"▲",color:"#000"},
      {name:"GitHub",url:"https://github.com/dolodorsey",icon:"🐙",color:"#333"},
    ]},
    {cat:"Shopify Stores",items:[
      {name:"MAGA Store",url:"https://admin.shopify.com/store/makeatlantagreatagain",icon:"🛍️",color:"#96BF48"},
      {name:"Stush Store",url:"https://admin.shopify.com/store/stushusa",icon:"🛍️",color:"#A855F7"},
      {name:"Bodega Store",url:"https://admin.shopify.com/store/bodegabodegbodega",icon:"🛍️",color:"#FF9500"},
    ]},
    {cat:"Tools",items:[
      {name:"Eventbrite",url:"https://www.eventbrite.com/organizations/home",icon:"🎫",color:"#F05537"},
      {name:"GoDaddy Domains",url:"https://dcc.godaddy.com/domains",icon:"🌐",color:"#1BDBDB"},
      {name:"Hostinger",url:"https://hpanel.hostinger.com",icon:"🏠",color:"#673DE6"},
    ]},
  ];
  // Add GHL locations as links
  const ghlLinks = ghl.map(g=>({name:g.location_name,url:`https://app.gohighlevel.com/v2/location/${g.location_id}/dashboard`,icon:"📍",color:"#FF6B35"}));
  if(ghlLinks.length>0) links.push({cat:"GoHighLevel Locations",items:ghlLinks});

  // Add websites
  const webLinks = websites.map(w=>({name:w.entity_name,url:w.custom_domain?`https://${w.custom_domain}`:`https://${w.vercel_url}`,icon:"🌐",color:"var(--ac)",sub:w.custom_domain||w.vercel_url}));
  if(webLinks.length>0) links.push({cat:`Websites (${webLinks.length})`,items:webLinks});

  const allItems = links.flatMap(l=>l.items.map(i=>({...i,cat:l.cat})));
  const filtered = search ? allItems.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())||i.cat.toLowerCase().includes(search.toLowerCase())) : null;

  return (<div className="u">
    <input className="inp" placeholder="Search links, tools, websites..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:20,maxWidth:400}} />
    {filtered ? (
      <div>{filtered.map((item,i)=>(
        <a key={i} href={item.url} target="_blank" rel="noopener" className="link-card">
          <div className="link-icon" style={{background:(item.color||"var(--ac)")+"14",color:item.color||"var(--ac)"}}>{item.icon}</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:13}}>{item.name}</div>{item.sub&&<div style={{fontSize:11,color:"var(--tx3)"}}>{item.sub}</div>}</div>
          <span className="bg bg-mt">{item.cat}</span>
        </a>
      ))}{filtered.length===0&&<div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)"}}>No results</div>}</div>
    ) : (
      links.map((group,gi)=>(
        <div key={gi} style={{marginBottom:24}}>
          <div className="sec">{group.cat}</div>
          <div className="g3">{group.items.map((item,i)=>(
            <a key={i} href={item.url} target="_blank" rel="noopener" className="link-card">
              <div className="link-icon" style={{background:(item.color||"var(--ac)")+"14",color:item.color||"var(--ac)"}}>{item.icon}</div>
              <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:13}} className="trunc">{item.name}</div>{item.sub&&<div style={{fontSize:11,color:"var(--tx3)"}} className="trunc">{item.sub}</div>}</div>
            </a>
          ))}</div>
        </div>
      ))
    )}
  </div>);
}


function TaskBoard({ d, reload }) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [ef, setEf] = useState({});
  const [nt, setNt] = useState({title:"",priority:"medium",assigned_to:"claude",category:"other",description:"",due_date:""});
  const [busy, setBusy] = useState(null);
  const [expand, setExpand] = useState(null);
  const all = d.tasks||[];
  const open = all.filter(t=>t.status==="open");
  const prog = all.filter(t=>t.status==="in_progress");
  const blocked = all.filter(t=>t.status==="blocked");
  const done = all.filter(t=>t.status==="completed").slice(0,10);

  const up = async(id,data)=>{setBusy(id);await QU("khg_master_tasks",`id=eq.${id}`,{...data,updated_at:new Date().toISOString()});await reload();setBusy(null);setEditing(null);};
  const create = async()=>{
    if(!nt.title.trim())return;setBusy("new");
    const ex=await Q("khg_master_tasks","select=task_key&order=task_key.desc&limit=1");
    const num=ex[0]?.task_key?parseInt(ex[0].task_key.split("-").pop())+1:95;
    await QI("khg_master_tasks",{task_key:`TASK-2026-${String(num).padStart(4,"0")}`,title:nt.title,category:nt.category,priority:nt.priority,assigned_to:nt.assigned_to,description:nt.description||null,due_date:nt.due_date||null,status:"open",brand:"dr_dorsey",created_by:"dr_dorsey"});
    setNt({title:"",priority:"medium",assigned_to:"claude",category:"other",description:"",due_date:""});setCreating(false);await reload();setBusy(null);
  };
  const startEdit = (t)=>{setEditing(t.id);setEf({title:t.title||"",description:t.description||"",priority:t.priority||"medium",assigned_to:t.assigned_to||"claude",category:t.category||"other",due_date:t.due_date?t.due_date.split("T")[0]:"",notes:t.notes||""});};

  const Card = ({t})=>{
    const isExp = expand===t.id;
    const isEdit = editing===t.id;
    return (
    <div className="kb-d" style={{borderLeft:`3px solid ${t.priority==="critical"?"var(--rd)":t.priority==="high"?"var(--ac)":"var(--bd)"}`,opacity:busy===t.id?.4:1}} onClick={()=>!isEdit&&setExpand(isExp?null:t.id)}>
      <div className="row" style={{gap:4,marginBottom:3}}>
        <span className={`bg ${t.priority==="critical"?"bg-rd":t.priority==="high"?"bg-ac":"bg-mt"}`} style={{fontSize:8}}>{t.priority}</span>
        <span className="bg bg-mt" style={{fontSize:8}}>{t.assigned_to||"—"}</span>
        {t.due_date&&<span style={{fontSize:9,color:"var(--tx3)",fontFamily:"var(--mn)",marginLeft:"auto"}}>{new Date(t.due_date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>}
      </div>
      {isEdit ? (<div onClick={e=>e.stopPropagation()}>
        <input className="inp" value={ef.title} onChange={e=>setEf({...ef,title:e.target.value})} style={{marginBottom:6,fontSize:12,padding:6}} placeholder="Title" />
        <textarea className="inp" value={ef.description} onChange={e=>setEf({...ef,description:e.target.value})} style={{marginBottom:6,fontSize:11,padding:6,minHeight:40}} placeholder="Description" />
        <div className="row" style={{gap:4,marginBottom:6,flexWrap:"wrap"}}>
          <select className="inp" style={{flex:1,fontSize:11,padding:4}} value={ef.priority} onChange={e=>setEf({...ef,priority:e.target.value})}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
          <select className="inp" style={{flex:1,fontSize:11,padding:4}} value={ef.assigned_to} onChange={e=>setEf({...ef,assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
          <input type="date" className="inp" style={{flex:1,fontSize:11,padding:4}} value={ef.due_date} onChange={e=>setEf({...ef,due_date:e.target.value})} />
        </div>
        <input className="inp" value={ef.notes} onChange={e=>setEf({...ef,notes:e.target.value})} style={{marginBottom:6,fontSize:11,padding:6}} placeholder="Notes..." />
        <div className="row" style={{gap:4}}><button className="btn btn-s btn-p" onClick={()=>up(t.id,{title:ef.title,description:ef.description||null,priority:ef.priority,assigned_to:ef.assigned_to,due_date:ef.due_date||null,notes:ef.notes||null})}>Save</button><button className="btn btn-s" onClick={()=>setEditing(null)}>Cancel</button></div>
      </div>) : (<>
        <div style={{fontWeight:500,fontSize:12,lineHeight:1.4}}>{t.title}</div>
        {t.blocker_reason&&<div style={{fontSize:10,color:"var(--rd)",marginTop:2}}>Blocked: {t.blocker_reason}</div>}
      </>)}
      {isExp&&!isEdit&&<div style={{marginTop:8,paddingTop:8,borderTop:"1px solid var(--bd)"}}>
        {t.description&&<div style={{fontSize:11,color:"var(--tx2)",marginBottom:6,lineHeight:1.5}}>{t.description}</div>}
        {t.notes&&<div style={{fontSize:11,color:"var(--tx3)",marginBottom:6,fontStyle:"italic"}}>{t.notes}</div>}
        <div className="row" style={{gap:4,flexWrap:"wrap"}}>
          <button className="btn btn-s" onClick={e=>{e.stopPropagation();startEdit(t)}}>Edit</button>
          {t.status==="open"&&<button className="btn btn-s btn-p" onClick={e=>{e.stopPropagation();up(t.id,{status:"in_progress",started_at:new Date().toISOString()})}}>Start</button>}
          {t.status!=="completed"&&<button className="btn btn-s btn-g" onClick={e=>{e.stopPropagation();up(t.id,{status:"completed",completed_at:new Date().toISOString()})}}>Done</button>}
          {t.status!=="blocked"&&t.status!=="completed"&&<button className="btn btn-s" onClick={e=>{e.stopPropagation();const r=prompt("Blocker?");if(r)up(t.id,{status:"blocked",blocker_reason:r})}}>Block</button>}
          {t.status==="blocked"&&<button className="btn btn-s btn-p" onClick={e=>{e.stopPropagation();up(t.id,{status:"in_progress",blocker_reason:null})}}>Unblock</button>}
          <button className="btn btn-s" style={{color:"var(--rd)"}} onClick={e=>{e.stopPropagation();if(confirm("Cancel?"))up(t.id,{status:"cancelled"})}}>Delete</button>
        </div>
      </div>}
    </div>);
  };

  return (<div className="u">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
      <h3 style={{fontSize:15}}>Task Board</h3>
      <button className="btn btn-p" onClick={()=>setCreating(!creating)}>+ New Task</button>
    </div>
    {creating&&<div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <input className="inp" placeholder="Task title..." value={nt.title} onChange={e=>setNt({...nt,title:e.target.value})} style={{marginBottom:8}} />
      <textarea className="inp" placeholder="Description..." value={nt.description} onChange={e=>setNt({...nt,description:e.target.value})} style={{marginBottom:8,minHeight:50}} />
      <div className="row" style={{gap:8,marginBottom:8}}>
        <select className="inp" style={{flex:1}} value={nt.priority} onChange={e=>setNt({...nt,priority:e.target.value})}><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
        <select className="inp" style={{flex:1}} value={nt.assigned_to} onChange={e=>setNt({...nt,assigned_to:e.target.value})}><option value="claude">Claude</option><option value="linda">Linda</option><option value="Dr. Dorsey">Dr. Dorsey</option></select>
        <select className="inp" style={{flex:1}} value={nt.category} onChange={e=>setNt({...nt,category:e.target.value})}>{["automation","content","design","events","outreach","product","website","other"].map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <input type="date" className="inp" style={{flex:1}} value={nt.due_date} onChange={e=>setNt({...nt,due_date:e.target.value})} />
      </div>
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={create} disabled={busy==="new"||!nt.title.trim()}>{busy==="new"?"...":"Create"}</button><button className="btn" onClick={()=>setCreating(false)}>Cancel</button></div>
    </div>}
    <div className="kb">
      <div className="kb-c"><div className="kb-h"><span>Open</span><span className="bg bg-bl">{open.length}</span></div>{open.map(t=><Card key={t.id} t={t}/>)}</div>
      <div className="kb-c" style={{background:"rgba(91,127,166,.05)"}}><div className="kb-h"><span>In Progress</span><span className="bg bg-bl">{prog.length}</span></div>{prog.map(t=><Card key={t.id} t={t}/>)}</div>
      <div className="kb-c" style={{background:"rgba(196,91,74,.04)"}}><div className="kb-h"><span>Blocked</span><span className="bg bg-rd">{blocked.length}</span></div>{blocked.map(t=><Card key={t.id} t={t}/>)}</div>
      <div className="kb-c" style={{background:"rgba(74,143,109,.04)"}}><div className="kb-h"><span>Done</span><span className="bg bg-gn">{done.length}</span></div>{done.map(t=><Card key={t.id} t={t}/>)}</div>
    </div>
  </div>);
}


function SocialMedia({ d, reload }) {
  const [tab, setTab] = useState("all");
  const [composing, setComposing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [ef, setEf] = useState({});
  const [np, setNp] = useState({caption:"",platform:"instagram",content_type:"post",image_url:"",hashtags:"",scheduled_for:""});
  const [busy, setBusy] = useState(null);
  const all = d.social||[];
  const queued = all.filter(p=>p.status==="queued");
  const approved = all.filter(p=>p.status==="approved");
  const posted = all.filter(p=>p.status==="posted");
  const filtered = tab==="queued"?queued:tab==="approved"?approved:tab==="posted"?posted:all;

  const action = async(id,data)=>{
    setBusy(id);
    await QU("ghl_social_posting_queue",`id=eq.${id}`,data);
    if(data.status==="approved") { try { await fetch("https://dorsey.app.n8n.cloud/webhook/oWAp1njam9bgKhSa",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"post_approved",post_id:id})}); } catch(e) {} }
    setEditing(null);await reload();setBusy(null);
  };
  const startEdit = (p)=>{setEditing(p.id);setEf({caption:p.caption||"",platform:p.platform||"instagram",content_type:p.content_type||"post",image_url:p.image_url||"",hashtags:Array.isArray(p.hashtags)?(p.hashtags||[]).join(", "):"",scheduled_for:p.scheduled_for?new Date(p.scheduled_for).toISOString().slice(0,16):""});};
  const saveEdit = async(id)=>{
    const hashArr = ef.hashtags?ef.hashtags.split(",").map(h=>h.trim().replace("#","")).filter(Boolean):[];
    await action(id,{caption:ef.caption,platform:ef.platform,content_type:ef.content_type,image_url:ef.image_url||null,hashtags:hashArr,scheduled_for:ef.scheduled_for||null});
  };
  const createPost = async()=>{
    if(!np.caption.trim())return;setBusy("new");
    const hashArr = np.hashtags?np.hashtags.split(",").map(h=>h.trim().replace("#","")).filter(Boolean):[];
    await QI("ghl_social_posting_queue",{brand_key:"dr_dorsey",caption:np.caption,platform:np.platform,content_type:np.content_type,image_url:np.image_url||null,hashtags:hashArr,scheduled_for:np.scheduled_for||null,status:"queued"});
    setNp({caption:"",platform:"instagram",content_type:"post",image_url:"",hashtags:"",scheduled_for:""});setComposing(false);await reload();setBusy(null);
  };

  return (<div className="u">
    <div className="row" style={{justifyContent:"space-between",marginBottom:16}}>
      <div className="pills" style={{margin:0}}>
        <button className={`pill ${tab==="all"?"on":""}`} onClick={()=>setTab("all")}>All ({all.length})</button>
        <button className={`pill ${tab==="queued"?"on":""}`} onClick={()=>setTab("queued")}>Queued ({queued.length})</button>
        <button className={`pill ${tab==="approved"?"on":""}`} onClick={()=>setTab("approved")}>Approved ({approved.length})</button>
        <button className={`pill ${tab==="posted"?"on":""}`} onClick={()=>setTab("posted")}>Posted ({posted.length})</button>
      </div>
      <button className="btn btn-p" onClick={()=>setComposing(!composing)}>+ Compose Post</button>
    </div>
    {composing&&<div className="card" style={{marginBottom:16,borderColor:"var(--ac)"}}>
      <h3 style={{fontSize:14,marginBottom:10}}>New Post</h3>
      <textarea className="inp" placeholder="Write your caption..." value={np.caption} onChange={e=>setNp({...np,caption:e.target.value})} style={{marginBottom:8}} />
      <input className="inp" placeholder="Image URL (paste link to image)" value={np.image_url} onChange={e=>setNp({...np,image_url:e.target.value})} style={{marginBottom:8}} />
      <input className="inp" placeholder="Hashtags (comma separated)" value={np.hashtags} onChange={e=>setNp({...np,hashtags:e.target.value})} style={{marginBottom:8}} />
      <div className="row" style={{gap:8,marginBottom:8}}>
        <select className="inp" style={{flex:1}} value={np.platform} onChange={e=>setNp({...np,platform:e.target.value})}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option><option value="twitter">Twitter/X</option></select>
        <select className="inp" style={{flex:1}} value={np.content_type} onChange={e=>setNp({...np,content_type:e.target.value})}><option value="post">Post</option><option value="reel">Reel</option><option value="story">Story</option><option value="carousel">Carousel</option></select>
        <input type="datetime-local" className="inp" style={{flex:1}} value={np.scheduled_for} onChange={e=>setNp({...np,scheduled_for:e.target.value})} />
      </div>
      {np.image_url&&<div style={{marginBottom:8}}><img src={np.image_url} alt="preview" style={{maxWidth:200,borderRadius:6,border:"1px solid var(--bd)"}} onError={e=>{e.target.style.display="none"}} /></div>}
      <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={createPost} disabled={busy==="new"||!np.caption.trim()}>Create Post</button><button className="btn" onClick={()=>setComposing(false)}>Cancel</button></div>
    </div>}
    {filtered.map((p,i)=>(
      <div key={p.id||i} className="card" style={{marginBottom:10,opacity:busy===p.id?.4:1}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
          <div className="row" style={{gap:6}}><span className="bg bg-bl">{p.platform||"IG"}</span><span className="bg bg-mt">{p.content_type||"post"}</span></div>
          <div className="row" style={{gap:6}}>
            {p.scheduled_for&&<span style={{fontSize:10,color:"var(--tx3)",fontFamily:"var(--mn)"}}>{new Date(p.scheduled_for).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</span>}
            <span className={`bg ${p.status==="posted"?"bg-gn":p.status==="approved"?"bg-bl":"bg-yl"}`}>{p.status}</span>
          </div>
        </div>
        {editing===p.id ? (<div>
          <textarea className="inp" value={ef.caption} onChange={e=>setEf({...ef,caption:e.target.value})} style={{marginBottom:6}} />
          <input className="inp" placeholder="Image URL" value={ef.image_url} onChange={e=>setEf({...ef,image_url:e.target.value})} style={{marginBottom:6}} />
          <input className="inp" placeholder="Hashtags (comma separated)" value={ef.hashtags} onChange={e=>setEf({...ef,hashtags:e.target.value})} style={{marginBottom:6}} />
          <div className="row" style={{gap:6,marginBottom:6}}>
            <select className="inp" style={{flex:1}} value={ef.platform} onChange={e=>setEf({...ef,platform:e.target.value})}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option><option value="twitter">Twitter/X</option></select>
            <select className="inp" style={{flex:1}} value={ef.content_type} onChange={e=>setEf({...ef,content_type:e.target.value})}><option value="post">Post</option><option value="reel">Reel</option><option value="story">Story</option><option value="carousel">Carousel</option></select>
            <input type="datetime-local" className="inp" style={{flex:1}} value={ef.scheduled_for} onChange={e=>setEf({...ef,scheduled_for:e.target.value})} />
          </div>
          {ef.image_url&&<img src={ef.image_url} alt="" style={{maxWidth:160,borderRadius:6,marginBottom:6,border:"1px solid var(--bd)"}} onError={e=>{e.target.style.display="none"}} />}
          <div className="row" style={{gap:6}}><button className="btn btn-s btn-p" onClick={()=>saveEdit(p.id)}>Save</button><button className="btn btn-s" onClick={()=>setEditing(null)}>Cancel</button></div>
        </div>) : (<>
          <div style={{fontSize:13,lineHeight:1.6,color:"var(--tx2)",whiteSpace:"pre-wrap"}}>{(p.caption||"").slice(0,300)}</div>
          {p.image_url&&<div style={{marginTop:8}}><img src={p.image_url} alt="" style={{maxWidth:180,borderRadius:6,border:"1px solid var(--bd)"}} onError={e=>{e.target.style.display="none"}} /></div>}
          {p.hashtags&&Array.isArray(p.hashtags)&&p.hashtags.length>0&&<div style={{fontSize:10,color:"var(--ac)",marginTop:6}}>{p.hashtags.slice(0,8).map(h=>`#${String(h).replace("#","")}`).join(" ")}</div>}
        </>)}
        <div className="row" style={{gap:4,marginTop:10,flexWrap:"wrap"}}>
          {editing!==p.id&&<button className="btn btn-s" onClick={()=>startEdit(p)}>Edit</button>}
          {p.status==="queued"&&<button className="btn btn-s btn-g" onClick={()=>action(p.id,{status:"approved"})}>Approve</button>}
          {p.status==="queued"&&<button className="btn btn-s btn-r" onClick={()=>action(p.id,{status:"rejected"})}>Reject</button>}
          {p.status==="approved"&&<button className="btn btn-s btn-p" onClick={()=>action(p.id,{status:"queued"})}>Back to Queue</button>}
          {editing!==p.id&&<button className="btn btn-s" onClick={()=>{const d={...p,id:undefined,status:"queued",created_at:undefined,posted_at:undefined};QI("ghl_social_posting_queue",d).then(reload)}}>Duplicate</button>}
        </div>
      </div>
    ))}
    {filtered.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No {tab} posts</div>}
  </div>);
}


function EmailApprovals({ d, reload }) {
  const [busy, setBusy] = useState(null);
  const [editing, setEditing] = useState(null);
  const [ef, setEf] = useState({});
  const pending = (d.emails||[]).filter(e=>!e.approved);
  const approved = (d.emails||[]).filter(e=>e.approved);

  const act = async(id,data)=>{
    setBusy(id);
    await QU("email_approval_queue",`id=eq.${id}`,data);
    if(data.approved) { try { await fetch("https://dorsey.app.n8n.cloud/webhook/EGgj3tbbbNLYIfQ4",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"email_approved",email_id:id})}); } catch(e) {} }
    setEditing(null);await reload();setBusy(null);
  };
  const startEdit = (e)=>{setEditing(e.id);setEf({subject:e.subject||"",body_preview:e.body_preview||"",cta_text:e.cta_text||"",cta_url:e.cta_url||"",notes:e.notes||""});};

  return (<div className="u">
    <div className="sec">{pending.length} pending · {approved.length} approved</div>
    {pending.map((e,i)=>(<div key={e.id||i} className="card" style={{marginBottom:10,borderLeft:"3px solid var(--yl)",opacity:busy===e.id?.4:1}}>
      <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
        <div className="row" style={{gap:6}}><span className="bg bg-ac">{e.brand_key||"—"}</span><span className="bg bg-mt">{e.sequence_type||"—"}</span></div>
        <span style={{fontSize:11,color:"var(--tx3)"}}>{e.recipient_count||0} recipients</span>
      </div>
      {editing===e.id ? (<div>
        <input className="inp" value={ef.subject} onChange={ev=>setEf({...ef,subject:ev.target.value})} style={{marginBottom:6}} placeholder="Subject" />
        <textarea className="inp" value={ef.body_preview} onChange={ev=>setEf({...ef,body_preview:ev.target.value})} style={{marginBottom:6}} placeholder="Email body" />
        <div className="row" style={{gap:6,marginBottom:6}}>
          <input className="inp" value={ef.cta_text} onChange={ev=>setEf({...ef,cta_text:ev.target.value})} style={{flex:1}} placeholder="CTA text" />
          <input className="inp" value={ef.cta_url} onChange={ev=>setEf({...ef,cta_url:ev.target.value})} style={{flex:2}} placeholder="CTA URL" />
        </div>
        <input className="inp" value={ef.notes} onChange={ev=>setEf({...ef,notes:ev.target.value})} style={{marginBottom:6}} placeholder="Notes" />
        <div className="row" style={{gap:6}}><button className="btn btn-s btn-p" onClick={()=>act(e.id,{subject:ef.subject,body_preview:ef.body_preview,cta_text:ef.cta_text||null,cta_url:ef.cta_url||null,notes:ef.notes||null})}>Save</button><button className="btn btn-s" onClick={()=>setEditing(null)}>Cancel</button></div>
      </div>) : (<>
        <h3 style={{fontSize:14,marginBottom:4}}>{e.subject||"(no subject)"}</h3>
        <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.6,maxHeight:120,overflow:"hidden",whiteSpace:"pre-wrap"}}>{e.body_preview||""}</div>
        {e.cta_text&&<div style={{marginTop:6,fontSize:11}}><strong>CTA:</strong> {e.cta_text} {e.cta_url&&<a href={e.cta_url} target="_blank" rel="noopener" style={{color:"var(--ac)"}}>{e.cta_url}</a>}</div>}
      </>)}
      <div className="row" style={{gap:6,marginTop:10}}>
        {editing!==e.id&&<button className="btn btn-s" onClick={()=>startEdit(e)}>Edit</button>}
        <button className="btn btn-s btn-g" onClick={()=>act(e.id,{approved:true,approved_at:new Date().toISOString(),approved_by:"dr_dorsey"})}>Approve</button>
        <button className="btn btn-s btn-r" onClick={()=>{if(confirm("Reject?"))act(e.id,{notes:"REJECTED"})}}>Reject</button>
      </div>
    </div>))}
    {pending.length===0&&approved.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No emails</div>}
    {approved.length>0&&<><div className="sep"/><div className="sec">Recently Approved</div>{approved.slice(0,5).map((e,i)=>(<div key={e.id||i} className="card" style={{marginBottom:6,borderLeft:"3px solid var(--gn)"}}><div className="row" style={{gap:6}}><span className="bg bg-gn">Approved</span><span className="bg bg-mt">{e.brand_key}</span><span style={{flex:1,fontWeight:500}}>{e.subject}</span></div></div>))}</>}
  </div>);
}


function Overview({ d, go }) {
  const open=(d.tasks||[]).filter(t=>!["completed","cancelled"].includes(t.status));
  const blk=open.filter(t=>t.status==="blocked");
  const qOut=(d.outreach||[]).filter(o=>o.status==="queued");
  const pEm=(d.emails||[]).filter(e=>!e.approved);
  return (<div className="u">
    <div className="g5" style={{marginBottom:24}}>
      <div className="card st" onClick={()=>go("directory")}><div className="st-v" style={{color:"var(--ac)"}}>{((d.websites||[]).length+(d.ghl||[]).length+10)}</div><div className="st-l">Links</div></div>
      <div className="card st" onClick={()=>go("tasks")}><div className="st-v" style={{color:blk.length>0?"var(--rd)":"var(--bl)"}}>{open.length}</div><div className="st-l">Tasks</div></div>
      <div className="card st" onClick={()=>go("outreach")}><div className="st-v" style={{color:"var(--bl)"}}>{qOut.length.toLocaleString()}</div><div className="st-l">Outreach</div></div>
      <div className="card st" onClick={()=>go("social")}><div className="st-v" style={{color:"var(--gn)"}}>{(d.social||[]).length}</div><div className="st-l">Social</div></div>
      <div className="card st" onClick={()=>go("emails")}><div className="st-v" style={{color:pEm.length>0?"var(--rd)":"var(--gn)"}}>{pEm.length}</div><div className="st-l">Emails</div></div>
    </div>
    <div className="g2" style={{marginBottom:24}}>
      <div className="card"><div className="row" style={{justifyContent:"space-between",marginBottom:14}}><h3 style={{fontSize:15}}>Priority Tasks</h3><button className="btn btn-s" onClick={()=>go("tasks")}>Board</button></div>
        {open.filter(t=>t.priority==="critical"||t.priority==="high").slice(0,6).map((t,i)=>(<div key={i} style={{padding:"8px 0",borderBottom:"1px solid var(--sf2)"}}><div className="row" style={{gap:8}}><span className={`bg ${t.priority==="critical"?"bg-rd":"bg-ac"}`}>{t.priority}</span><span className="trunc" style={{flex:1,fontWeight:500}}>{t.title}</span><span className="bg bg-mt">{t.assigned_to||"—"}</span></div></div>))}
        {open.filter(t=>t.priority==="critical"||t.priority==="high").length===0&&<p style={{color:"var(--tx3)",textAlign:"center",padding:16}}>No critical tasks</p>}
      </div>
      <div className="card"><div className="row" style={{justifyContent:"space-between",marginBottom:14}}><h3 style={{fontSize:15}}>Content This Week</h3><button className="btn btn-s" onClick={()=>go("content")}>Calendar</button></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=>{const n=(d.content||[]).filter(c=>(c.day_of_week||"").toLowerCase().startsWith(day.toLowerCase())).length;return(<div key={day} style={{padding:8,background:"var(--sf2)",borderRadius:6,textAlign:"center"}}><div style={{fontSize:9,fontWeight:700,color:"var(--tx3)",letterSpacing:".1em"}}>{day}</div><div style={{fontSize:18,fontWeight:700,fontFamily:"var(--hd)",color:n>0?"var(--ac)":"var(--bd)"}}>{n}</div></div>)})}</div>
      </div>
    </div>
    <div className="card"><h3 style={{fontSize:15,marginBottom:14}}>Quick Actions</h3>
      <div className="row" style={{gap:10,flexWrap:"wrap"}}><button className="btn btn-p" onClick={()=>go("tasks")}>Tasks</button><button className="btn" onClick={()=>go("outreach")}>Outreach</button><button className="btn" onClick={()=>go("social")}>Social</button><button className="btn" onClick={()=>go("content")}>Content</button><button className="btn" onClick={()=>go("emails")}>Emails</button><button className="btn" onClick={()=>go("ops")}>Daily Ops</button><button className="btn" onClick={()=>go("directory")}>Links</button><button className="btn" onClick={()=>go("creds")}>Credentials</button><button className="btn" onClick={()=>go("contacts")}>Contacts</button><button className="btn" onClick={()=>go("vip")}>VIP Circle</button></div>
    </div>
  </div>);
}

function ContentCalendar({ d }) {
  const slots=d.content||[];const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return (<div className="u"><div className="sec">{slots.length} weekly content slots</div>
    {days.map(day=>{const ds=slots.filter(s=>s.day_of_week===day);if(!ds.length)return null;return(<div key={day} style={{marginBottom:20}}><h3 style={{fontSize:15,marginBottom:8}}>{day}</h3><div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Time</th><th>Pillar</th><th>Visual</th><th>Caption</th><th>CTA</th></tr></thead><tbody>{ds.map((s,i)=>(<tr key={i}><td style={{fontFamily:"var(--mn)",fontWeight:500}}>{s.post_time||"—"}</td><td><span className="bg bg-ac">{s.content_pillar||"—"}</span></td><td>{s.visual_type||"—"}</td><td className="trunc" style={{maxWidth:220}}>{s.caption_template||"—"}</td><td>{s.cta||"—"}</td></tr>))}</tbody></table></div></div>)})}
    {slots.length===0&&<div className="card" style={{textAlign:"center",padding:40,color:"var(--tx3)"}}>No content slots</div>}
  </div>);
}

function OutreachScreen({ d, reload }) {
  const [view,setView]=useState("queued");const [busy,setBusy]=useState(null);
  const all=d.outreach||[];const queued=all.filter(o=>o.status==="queued");const sent=all.filter(o=>o.status==="sent");const filtered=view==="sent"?sent:queued;
  const send=async id=>{setBusy(id);await QU("contact_action_queue",`id=eq.${id}`,{status:"sent",sent_at:new Date().toISOString()});await reload();setBusy(null);};
  const skip=async id=>{setBusy(id);await QU("contact_action_queue",`id=eq.${id}`,{status:"skipped"});await reload();setBusy(null);};
  return (<div className="u">
    <div className="pills"><button className={`pill ${view==="queued"?"on":""}`} onClick={()=>setView("queued")}>Queued ({queued.length})</button><button className={`pill ${view==="sent"?"on":""}`} onClick={()=>setView("sent")}>Sent ({sent.length})</button></div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Contact</th><th>Type</th><th>Segment</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{filtered.slice(0,30).map((o,i)=>(<tr key={o.id||i} style={{opacity:busy===o.id?.4:1}}><td style={{fontWeight:500,color:"var(--tx)"}}>{o.contact_name||o.ig_handle||o.contact_email||"—"}</td><td>{o.action_type||"—"}</td><td><span className="bg bg-mt">{o.segment_type||"—"}</span></td><td>{o.contact_city||"—"}</td><td><span className={`bg ${o.status==="sent"?"bg-gn":"bg-yl"}`}>{o.status}</span></td><td><div className="row" style={{gap:4}}>{o.status==="queued"&&<button className="btn btn-s btn-p" onClick={()=>send(o.id)}>Send</button>}{o.status==="queued"&&<button className="btn btn-s" onClick={()=>skip(o.id)}>Skip</button>}</div></td></tr>))}</tbody></table></div>
    {filtered.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)",marginTop:12}}>No {view} outreach</div>}
  </div>);
}

function ContactsScreen({ d }) {
  const [search,setSearch]=useState("");const [cat,setCat]=useState("all");const all=d.contacts||[];
  const cats=[...new Set(all.map(c=>c.category).filter(Boolean))].sort();
  const filt=all.filter(c=>{if(cat!=="all"&&c.category!==cat)return false;if(!search)return true;return[c.display_name,c.email,c.phone,c.instagram,c.company,c.profession].some(v=>(v||"").toLowerCase().includes(search.toLowerCase()));});
  return (<div className="u">
    <div className="row" style={{gap:12,marginBottom:16}}><input className="inp" placeholder="Search contacts..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:380}} /><select className="inp" style={{maxWidth:200}} value={cat} onChange={e=>setCat(e.target.value)}><option value="all">All ({all.length})</option>{cats.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
    <div className="sec">{filt.length} contacts</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><div style={{overflowX:"auto"}}><table className="tbl"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>IG</th><th>Category</th><th>Company</th><th>City</th><th>Tier</th></tr></thead>
    <tbody>{filt.slice(0,60).map((c,i)=>(<tr key={i}><td style={{fontWeight:500,color:"var(--tx)"}}>{c.display_name||"—"}</td><td style={{fontSize:11,fontFamily:"var(--mn)"}}>{c.phone||"—"}</td><td style={{fontSize:11}}>{c.email||"—"}</td><td style={{fontSize:11,color:"var(--ac)"}}>{c.instagram||"—"}</td><td><span className="bg bg-mt">{c.category||"—"}</span></td><td style={{fontSize:11}}>{c.company||"—"}</td><td style={{fontSize:11}}>{c.city||"—"}</td><td>{c.relationship_tier?<span className="bg bg-ac">{c.relationship_tier}</span>:"—"}</td></tr>))}</tbody></table></div></div>
  </div>);
}

function VipCircle({ d }) {
  const vips=d.vip||[];
  return (<div className="u"><div className="sec">{vips.length} VIPs</div>
    {vips.map((v,i)=>(<div key={i} className="card" style={{marginBottom:10,borderLeft:"3px solid var(--ac)"}}><div className="row" style={{justifyContent:"space-between",marginBottom:6}}><h3 style={{fontSize:16}}>{v.full_name}</h3><div className="row" style={{gap:4}}>{v.tier&&<span className="bg bg-ac">{v.tier}</span>}{v.influence_level&&<span className="bg bg-bl">{v.influence_level}</span>}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,fontSize:12,color:"var(--tx2)"}}><div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Phone</span><br/>{v.phone||"—"}</div><div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Email</span><br/>{v.email||"—"}</div><div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>IG</span><br/>{v.instagram||"—"}</div><div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Profession</span><br/>{v.profession||"—"}</div><div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>Known For</span><br/>{v.known_for||"—"}</div><div><span style={{fontSize:9,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>City</span><br/>{v.city||"—"}</div></div>
      {v.notes&&<div style={{marginTop:8,padding:10,background:"var(--sf2)",borderRadius:6,fontSize:11,lineHeight:1.5}}>{v.notes}</div>}
    </div>))}
    {vips.length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No VIPs</div>}
  </div>);
}

function Credentials({ d }) {
  const [search,setSearch]=useState("");const [show,setShow]=useState({});const creds=d.creds||[];
  const filt=search?creds.filter(c=>(c.credential_key||"").toLowerCase().includes(search.toLowerCase())||(c.credential_type||"").toLowerCase().includes(search.toLowerCase())):creds;
  const grouped={};filt.forEach(c=>{const t=c.credential_type||"other";if(!grouped[t])grouped[t]=[];grouped[t].push(c);});
  return (<div className="u"><input className="inp" placeholder="Search credentials..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:16,maxWidth:380}} />
    <div className="sec">{filt.length} active credentials</div>
    {Object.entries(grouped).sort((a,b)=>b[1].length-a[1].length).map(([type,items])=>(<div key={type} style={{marginBottom:20}}><h3 style={{fontSize:14,marginBottom:8,textTransform:"capitalize"}}>{type.replace(/_/g," ")} <span className="bg bg-mt">{items.length}</span></h3>
      <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Key</th><th>Value</th><th></th></tr></thead>
      <tbody>{items.map((c,i)=>{const val=typeof c.credential_value==="object"?JSON.stringify(c.credential_value):String(c.credential_value||"");return(<tr key={i}><td style={{fontFamily:"var(--mn)",fontSize:11,fontWeight:500}}>{c.credential_key}</td><td style={{fontFamily:"var(--mn)",fontSize:11,maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{show[c.id]?val.slice(0,80):"••••••••"}</td><td><button className="btn btn-s" onClick={()=>setShow(s=>({...s,[c.id]:!s[c.id]}))}>{show[c.id]?"Hide":"Show"}</button></td></tr>)})}</tbody></table></div>
    </div>))}
  </div>);
}

function DailyOps({ d }) {
  const crons=d.crons||[];const active=crons.filter(c=>c.status==="active");
  return (<div className="u"><div className="sec">{active.length} active · {crons.length-active.length} inactive</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Name</th><th>Schedule</th><th>Dept</th><th>Status</th><th>Last Run</th><th>Runs</th></tr></thead>
    <tbody>{crons.map((c,i)=>(<tr key={i}><td style={{fontWeight:500}}>{c.cron_name}</td><td style={{fontFamily:"var(--mn)",fontSize:11}}>{c.schedule_human||c.schedule||"—"}</td><td>{c.dept_name||"—"}</td><td><span className={`bg ${c.status==="active"?"bg-gn":"bg-rd"}`}>{c.status}</span></td><td style={{fontSize:11,fontFamily:"var(--mn)"}}>{c.last_run?new Date(c.last_run).toLocaleDateString():"never"}</td><td style={{fontFamily:"var(--mn)"}}>{c.run_count||0}</td></tr>))}</tbody></table></div>
  </div>);
}


export default function DrDorseyDashboard() {
  const [screen,setScreen]=useState("overview");
  const [d,setD]=useState({});
  const [loading,setLoading]=useState(true);

  const load=useCallback(async()=>{
    const [contacts,vip,outreach,social,tasks,content,emails,creds,crons,websites,ghl,handles,quotas,logos]=await Promise.all([
      Q("dolo_directory","select=display_name,first_name,last_name,phone,email,instagram,category,subcategory,relationship_tier,company,profession,city,is_vip&order=display_name&limit=500"),
      Q("dolo_vip_circle","select=*&order=full_name&limit=50"),
      Q("contact_action_queue","select=*&brand_key=eq.dr_dorsey&order=created_at.desc&limit=100"),
      Q("ghl_social_posting_queue","select=*&brand_key=eq.dr_dorsey&order=created_at.desc&limit=50"),
      Q("khg_master_tasks","select=*&order=priority,created_at.desc&limit=100"),
      Q("weekly_content_schedule","select=*&brand_key=eq.dr_dorsey&is_active=eq.true&order=day_of_week,post_time"),
      Q("email_approval_queue","select=*&order=created_at.desc&limit=30"),
      Q("credentials","select=id,credential_type,credential_key,credential_value,is_active&is_active=eq.true&order=credential_type,credential_key"),
      Q("khg_cron_registry","select=*&order=status.desc,cron_name"),
      Q("khg_website_registry","select=entity_key,entity_name,vercel_project_name,custom_domain,vercel_url,status&status=eq.live&order=entity_name"),
      Q("ghl_locations","select=location_name,location_id,brand_key&order=location_name"),
      Q("brand_social_handles","select=*&order=brand_key"),
      Q("khg_daily_ops_quotas","select=*&brand_key=eq.dr_dorsey"),
      Q("brand_asset_files","select=entity_id,file_url,is_primary&asset_type=eq.logo&file_url=not.is.null&entity_id=eq.dr_dorsey"),
    ]);
    setD({contacts:contacts||[],vip:vip||[],outreach:outreach||[],social:social||[],tasks:(tasks||[]).filter(function(t) {
      if (!t.brand || t.brand === "khg") return true;
      var b = (t.brand||"").toLowerCase().replace(/\s+/g,"_");
      return b === "dr_dorsey" || b.includes("dorsey");
    }),content:content||[],emails:emails||[],creds:creds||[],crons:crons||[],websites:websites||[],ghl:ghl||[],handles:handles||[],quotas:quotas||[],logos:logos||[]});
    setLoading(false);
  },[]);

  useEffect(()=>{load();},[load]);
  const go=useCallback(s=>setScreen(s),[]);

  const nav=[
    {id:"overview",label:"Overview",sec:"Command"},
    {id:"tasks",label:"Task Board",sec:"Command"},
    {id:"directory",label:"Links & Tools",sec:"Hub",ct:(d.websites||[]).length+(d.ghl||[]).length+10},
    {id:"creds",label:"Credentials",sec:"Hub",ct:(d.creds||[]).length},
    {id:"contacts",label:"Contacts",sec:"Hub",ct:(d.contacts||[]).length},
    {id:"email_accounts",label:"Email Accounts",sec:"Data"},
    {id:"vip",label:"VIP Circle",sec:"Hub",ct:(d.vip||[]).length},
    {id:"outreach",label:"Outreach",sec:"Execution",ct:(d.outreach||[]).filter(o=>o.status==="queued").length},
    {id:"social",label:"Social Media",sec:"Execution",ct:(d.social||[]).length},
    {id:"content",label:"Content Calendar",sec:"Execution",ct:(d.content||[]).length},
    {id:"emails",label:"Email Approvals",sec:"Execution",ct:(d.emails||[]).filter(e=>!e.approved).length},
    {id:"ops",label:"Daily Ops",sec:"System",ct:(d.crons||[]).filter(c=>c.status==="active").length},
  ];
  const secs=[...new Set(nav.map(n=>n.sec))];
  const titles={};nav.forEach(n=>titles[n.id]=n.label);

  const render=()=>{
    if(loading)return<div style={{textAlign:"center",padding:60,color:"var(--tx3)",fontFamily:"var(--hd)",fontSize:16}}>Loading...</div>;
    switch(screen){
      case "overview":return<Overview d={d} go={go}/>;
      case "tasks":return<TaskBoard d={d} reload={load}/>;
      case "directory":return<Directory d={d}/>;
      case "creds":return<Credentials d={d}/>;
      case "contacts":return<ContactsScreen d={d}/>;
      case "vip":return<VipCircle d={d}/>;
      case "outreach":return<OutreachScreen d={d} reload={load}/>;
      case "social":return<SocialMedia d={d} reload={load}/>;
      case "content":return<ContentCalendar d={d}/>;
      case "emails":return<EmailApprovals d={d} reload={load}/>;
      case "quotas": {
        const qFields=[{key:"dms_per_day",label:"DMs / Day"},{key:"comments_per_day",label:"Comments / Day"},{key:"likes_per_day",label:"Likes / Day"},{key:"follows_per_day",label:"Follows / Day"},{key:"emails_per_day",label:"Emails / Day"},{key:"stories_per_day",label:"Stories / Day"},{key:"posts_per_day",label:"Posts / Day"},{key:"reels_per_week",label:"Reels / Week"}];
        return (<div className="up"><div className="sec-t">Dr. Dorsey Daily Quotas</div><p style={{fontSize:13,color:"var(--tx2)",marginBottom:20}}>Set daily limits. Changes save to Supabase instantly.</p>
        {(d.quotas||[]).map(function(qo){return (<div key={qo.id} className="card" style={{marginBottom:14}}><h3 style={{fontSize:16,marginBottom:12}}>{(qo.brand_key||"").replace(/_/g," ").toUpperCase()}</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>{qFields.map(function(f){return (<div key={f.key}><label style={{fontSize:11,color:"var(--tx3)",fontWeight:600,display:"block",marginBottom:4}}>{f.label}</label><input className="inp" type="number" min="0" defaultValue={qo[f.key]||0} onBlur={function(e){if(parseInt(e.target.value)!==qo[f.key])qu("khg_daily_ops_quotas","id=eq."+qo.id,{[f.key]:parseInt(e.target.value)||0,updated_at:new Date().toISOString()}).then(load)}} style={{fontFamily:"var(--mn)",fontWeight:600,fontSize:16,textAlign:"center"}} /></div>)})}</div>
        <div style={{marginTop:8,fontSize:11,color:"var(--tx3)"}}>Updated: {qo.updated_at?new Date(qo.updated_at).toLocaleString():"never"}</div></div>)})}
        {(d.quotas||[]).length===0&&<div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>No quotas set for dr_dorsey</div>}
        </div>);}
      case "ops":return<DailyOps d={d}/>;
      default:return<Overview d={d} go={go}/>;
    }
  };

  return (<><style>{css}</style>
    <div className="app">
      <div className="sb"><div className="sb-h"><h2>Dr. Dorsey</h2><p>Personal Command Center</p></div>
        <div className="sb-n">{secs.map(sec=>(<div key={sec}><div className="sb-s">{sec}</div>{nav.filter(n=>n.sec===sec).map(n=>(<div key={n.id} className={`sb-i ${screen===n.id?"on":""}`} onClick={()=>go(n.id)}><span>{n.label}</span>{n.ct!==undefined&&n.ct>0&&<span className="c">{n.ct>999?Math.round(n.ct/1000)+"K":n.ct}</span>}</div>))}</div>))}</div>
        <div className="sb-f"><Link href="/" style={{color:"var(--tx3)",textDecoration:"none",fontSize:12,fontWeight:500}}>← Back to Hub</Link></div>
      </div>
      <div className="mn"><div className="tb"><h1>{titles[screen]||"Dr. Dorsey"}</h1><span className="dt">{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</span></div>
        <div className="ct">{render()}</div>
      </div>
    </div>
  </>);
}
