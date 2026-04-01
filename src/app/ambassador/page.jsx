"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}`, "Content-Type": "application/json", Prefer: "return=representation" };

const PROGRAMS = [
  { key: "events", label: "EVENTS", color: "#D4A853" },
  { key: "stush", label: "STUSH", color: "#8B0000" },
  { key: "good_times", label: "GOOD TIMES", color: "#D4A853" },
  { key: "maga", label: "MAGA", color: "#D4A853" },
];
const ROLES = ["blogger","influencer","promoter","model","podcast","dj","host","photographer"];
const ROLE_ICONS = { blogger:"📰", influencer:"📱", promoter:"📣", model:"📸", podcast:"🎙️", dj:"🎧", host:"🎤", photographer:"📷" };
const STATUSES = ["pending","approved","active","paused","declined"];
const STATUS_COLORS = { pending:"#F59E0B", approved:"#10B981", active:"#3B82F6", paused:"#6B7280", declined:"#EF4444" };

async function sbGet(path) { const r = await fetch(`${SB}/rest/v1/${path}`, { headers: H }); return r.json(); }
async function sbPost(table, data) { const r = await fetch(`${SB}/rest/v1/${table}`, { method: "POST", headers: H, body: JSON.stringify(data) }); return r.json(); }
async function sbPatch(table, id, data) { const r = await fetch(`${SB}/rest/v1/${table}?id=eq.${id}`, { method: "PATCH", headers: H, body: JSON.stringify(data) }); return r.json(); }

export default function AmbassadorDashboard() {
  const [tab, setTab] = useState("overview");
  const [ambassadors, setAmbassadors] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAmb, setNewAmb] = useState({ full_name:"", email:"", phone:"", instagram:"", city:"", role:"blogger", assigned_brands:[], tier:1, status:"pending" });
  const [expandedId, setExpandedId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [amb, prog, pipe, emails] = await Promise.all([
        sbGet("khg_ambassadors?order=created_at.desc"),
        sbGet("khg_ambassador_programs?order=program_key,role_type"),
        sbGet("ghl_pipelines?pipeline_type=eq.ambassador&order=pipeline_name"),
        sbGet("campaign_email_templates?campaign=in.(blog_outreach,influencer_ambassador,promoter_ambassador,model_ambassador,podcast_ambassador,host_ambassador,photographer_ambassador,dj_ambassador)&order=campaign,sequence_step"),
      ]);
      setAmbassadors(amb||[]); setPrograms(prog||[]); setPipelines(pipe||[]); setEmailTemplates(emails||[]);
    } catch(e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = ambassadors.filter(a => {
    if (selectedRole !== "all" && a.role !== selectedRole) return false;
    if (selectedProgram !== "all" && !(a.assigned_brands||[]).some(b => b === selectedProgram)) return false;
    return true;
  });
  const counts = { total: ambassadors.length, pending: ambassadors.filter(a=>a.status==="pending").length, active: ambassadors.filter(a=>a.status==="active").length, approved: ambassadors.filter(a=>a.status==="approved").length };
  const roleBreakdown = ROLES.map(r => ({ role:r, count:ambassadors.filter(a=>a.role===r).length, active:ambassadors.filter(a=>a.role===r&&a.status==="active").length }));

  async function addAmbassador() {
    await sbPost("khg_ambassadors", { ...newAmb, assigned_brands: newAmb.assigned_brands.length ? newAmb.assigned_brands : ["events"] });
    setShowAddModal(false); setNewAmb({ full_name:"", email:"", phone:"", instagram:"", city:"", role:"blogger", assigned_brands:[], tier:1, status:"pending" }); loadData();
  }
  async function updateStatus(id, status) { await sbPatch("khg_ambassadors", id, { status, updated_at: new Date().toISOString() }); loadData(); }
  async function updateTier(id, tier) { await sbPatch("khg_ambassadors", id, { tier, updated_at: new Date().toISOString() }); loadData(); }

  const s = {
    card: { background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:6, padding:20, marginBottom:12 },
    btn: (c="#D4A853") => ({ background:c, color:"#0A0A0A", border:"none", padding:"8px 16px", borderRadius:4, fontSize:11, fontWeight:700, cursor:"pointer", letterSpacing:1, textTransform:"uppercase" }),
    btnO: (c="#D4A853") => ({ background:"transparent", color:c, border:`1px solid ${c}`, padding:"6px 12px", borderRadius:4, fontSize:10, fontWeight:600, cursor:"pointer", letterSpacing:1, textTransform:"uppercase" }),
    badge: (c) => ({ display:"inline-block", padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", background:`${c}22`, color:c, border:`1px solid ${c}44` }),
    input: { background:"#111", border:"1px solid #222", color:"#F0EDE6", padding:"10px 14px", borderRadius:4, fontSize:13, width:"100%", boxSizing:"border-box", outline:"none" },
    select: { background:"#111", border:"1px solid #222", color:"#F0EDE6", padding:"10px 14px", borderRadius:4, fontSize:13, width:"100%", boxSizing:"border-box", outline:"none" },
  };

  if (loading) return <div style={{ minHeight:"100vh", background:"#060604", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ fontSize:11, letterSpacing:5, color:"#D4A853" }}>LOADING AMBASSADOR DATA...</div></div>;

  return (
    <div style={{ minHeight:"100vh", background:"#060604", fontFamily:"'DM Sans',sans-serif", color:"#F0EDE6" }}>
      <div style={{ background:"linear-gradient(135deg,#0A0A08,#111)", borderBottom:"1px solid #1a1a1a", padding:"20px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <Link href="/" style={{ fontSize:11, color:"#666", letterSpacing:2, textTransform:"uppercase", padding:"6px 12px", border:"1px solid #222", borderRadius:4 }}>← HUB</Link>
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:6, color:"#D4A853", textTransform:"uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
            <h1 style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5, margin:0 }}>Ambassador Command Center</h1>
          </div>
        </div>
        <button style={s.btn()} onClick={() => setShowAddModal(true)}>+ ADD AMBASSADOR</button>
      </div>

      <div style={{ display:"flex", gap:0, borderBottom:"1px solid #1a1a1a" }}>
        {[["overview","Overview"],["roster","Roster"],["programs","Programs"],["pipelines","Pipelines"],["emails","Email Sequences"]].map(([k,l]) => (
          <button key={k} style={{ padding:"14px 24px", fontSize:12, fontWeight:600, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", borderBottom: tab===k ? "2px solid #D4A853" : "2px solid transparent", color: tab===k ? "#D4A853" : "#666", background:"transparent", border:"none", borderBottomWidth:2, borderBottomStyle:"solid", borderBottomColor: tab===k ? "#D4A853" : "transparent" }} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      <div style={{ padding:"24px 32px" }}>
        {tab === "overview" && (
          <div>
            <div style={{ display:"flex", gap:16, marginBottom:24 }}>
              {[["total",counts.total,"Total"],["pending",counts.pending,"Pending"],["approved",counts.approved,"Approved"],["active",counts.active,"Active"]].map(([k,n,l]) => (
                <div key={k} style={{ ...s.card, textAlign:"center", flex:1 }}>
                  <div style={{ fontSize:32, fontWeight:800, color:"#D4A853", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:10, letterSpacing:3, color:"#666", textTransform:"uppercase", marginTop:6 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ ...s.card }}>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:16, letterSpacing:2, textTransform:"uppercase", color:"#D4A853" }}>ROLES BREAKDOWN</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
                {roleBreakdown.map(r => (
                  <div key={r.role} style={{ background:"#111", borderRadius:6, padding:16, textAlign:"center", border:"1px solid #1a1a1a" }}>
                    <div style={{ fontSize:28, marginBottom:4 }}>{ROLE_ICONS[r.role]}</div>
                    <div style={{ fontSize:22, fontWeight:800, color:"#D4A853" }}>{r.count}</div>
                    <div style={{ fontSize:10, letterSpacing:2, color:"#888", textTransform:"uppercase" }}>{r.role}s</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "roster" && (
          <div>
            <div style={{ display:"flex", gap:12, marginBottom:20, alignItems:"center" }}>
              <select style={{ ...s.select, width:180 }} value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                <option value="all">All Roles</option>
                {ROLES.map(r => <option key={r} value={r}>{ROLE_ICONS[r]} {r.charAt(0).toUpperCase()+r.slice(1)}</option>)}
              </select>
              <select style={{ ...s.select, width:180 }} value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)}>
                <option value="all">All Programs</option>
                {PROGRAMS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
              </select>
              <div style={{ fontSize:12, color:"#666", marginLeft:"auto" }}>{filtered.length} ambassador{filtered.length!==1?"s":""}</div>
            </div>
            {filtered.length === 0 ? (
              <div style={{ ...s.card, textAlign:"center", padding:48 }}>
                <div style={{ fontSize:48, marginBottom:12 }}>👥</div>
                <div style={{ fontSize:16, fontWeight:600, marginBottom:8 }}>No Ambassadors Yet</div>
                <div style={{ fontSize:13, color:"#666", marginBottom:20 }}>Add your first ambassador or pull from the directory</div>
                <button style={s.btn()} onClick={() => setShowAddModal(true)}>+ ADD AMBASSADOR</button>
              </div>
            ) : filtered.map(a => (
              <div key={a.id}>
                <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"#0D0D0B", border:`1px solid ${expandedId===a.id?"#D4A853":"#1a1a1a"}`, borderRadius:6, marginBottom:8, cursor:"pointer" }} onClick={() => setExpandedId(expandedId===a.id?null:a.id)}>
                  <div style={{ fontSize:24 }}>{ROLE_ICONS[a.role]||"⭐"}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{a.full_name}</div>
                    <div style={{ fontSize:11, color:"#888" }}>{a.role?.toUpperCase()} · {a.city||"No city"} · {a.instagram?`@${a.instagram.replace("@","")}`:"No IG"}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <span style={s.badge(STATUS_COLORS[a.status]||"#666")}>{a.status||"pending"}</span>
                    <div style={{ fontSize:10, color:"#555", marginTop:4 }}>Tier {a.tier||1}</div>
                  </div>
                </div>
                {expandedId===a.id && (
                  <div style={{ ...s.card, marginTop:-4, borderTop:"none", borderTopLeftRadius:0, borderTopRightRadius:0 }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                      <div><span style={{ color:"#666", fontSize:11 }}>Email:</span> <span style={{ fontSize:13 }}>{a.email||"—"}</span></div>
                      <div><span style={{ color:"#666", fontSize:11 }}>Phone:</span> <span style={{ fontSize:13 }}>{a.phone||"—"}</span></div>
                      <div><span style={{ color:"#666", fontSize:11 }}>Code:</span> <span style={{ fontSize:13, color:"#D4A853" }}>{a.promo_code||"Not assigned"}</span></div>
                      <div><span style={{ color:"#666", fontSize:11 }}>Brands:</span> <span style={{ fontSize:13 }}>{(a.assigned_brands||[]).join(", ")||"None"}</span></div>
                    </div>
                    <div style={{ display:"flex", gap:8, marginTop:16, flexWrap:"wrap" }}>
                      {a.status!=="approved" && <button style={s.btn("#10B981")} onClick={() => updateStatus(a.id,"approved")}>✓ APPROVE</button>}
                      {a.status==="approved" && <button style={s.btn("#3B82F6")} onClick={() => updateStatus(a.id,"active")}>ACTIVATE</button>}
                      {a.status!=="declined" && <button style={s.btn("#EF4444")} onClick={() => updateStatus(a.id,"declined")}>✕ DECLINE</button>}
                      {a.status==="active" && <button style={s.btnO("#6B7280")} onClick={() => updateStatus(a.id,"paused")}>PAUSE</button>}
                      {(a.tier||1)<3 && <button style={s.btnO("#D4A853")} onClick={() => updateTier(a.id,(a.tier||1)+1)}>↑ TIER UP</button>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "programs" && (
          <div>
            {PROGRAMS.map(p => (
              <div key={p.key} style={{ marginBottom:32 }}>
                <div style={{ fontSize:16, fontWeight:800, color:p.color, marginBottom:12, letterSpacing:2 }}>{p.label}</div>
                <div style={{ fontSize:11, color:"#666", marginBottom:12 }}>{programs.find(pr=>pr.program_key===p.key)?.sponsor_line||""}</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                  {programs.filter(pr=>pr.program_key===p.key).map(pr => (
                    <div key={pr.id} style={{ background:"#111", border:"1px solid #1a1a1a", borderRadius:6, padding:14 }}>
                      <div style={{ fontSize:20, marginBottom:4 }}>{ROLE_ICONS[pr.role_type]}</div>
                      <div style={{ fontSize:12, fontWeight:700 }}>{pr.role_label}</div>
                      <div style={{ fontSize:10, color:"#666", marginTop:4 }}>{(pr.responsibilities||[]).length} duties · 3 tiers</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "pipelines" && (
          <div>
            {pipelines.map(p => (
              <div key={p.id} style={{ ...s.card }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <div style={{ fontWeight:700, fontSize:14 }}>{p.pipeline_name}</div>
                  <span style={s.badge(p.status==="active"?"#10B981":"#F59E0B")}>{p.status}</span>
                </div>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {(p.stages||[]).map((st,i) => (
                    <div key={i} style={{ background:"#111", border:"1px solid #1a1a1a", borderRadius:4, padding:"4px 10px", fontSize:10, color:"#888" }}>{st.order}. {st.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "emails" && (
          <div>
            {["blog_outreach","influencer_ambassador","promoter_ambassador","model_ambassador","podcast_ambassador","host_ambassador","dj_ambassador","photographer_ambassador"].map(campaign => {
              const seqs = emailTemplates.filter(e=>e.campaign===campaign);
              if (!seqs.length) return null;
              return (
                <div key={campaign} style={{ ...s.card }}>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:12, textTransform:"uppercase" }}>{campaign.replace(/_/g," ")}</div>
                  {seqs.map(e => (
                    <div key={e.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"8px 0", borderBottom:"1px solid #111" }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:"#D4A85322", color:"#D4A853", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0 }}>{e.sequence_step}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:600 }}>{e.subject}</div>
                        <div style={{ fontSize:10, color:"#555" }}>{e.template_name} · {e.send_delay_days>0?`Day ${e.send_delay_days}`:"Immediate"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }} onClick={() => setShowAddModal(false)}>
          <div style={{ background:"#0D0D0B", border:"1px solid #222", borderRadius:8, padding:32, width:"90%", maxWidth:540, maxHeight:"85vh", overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:16, fontWeight:800, marginBottom:20, color:"#D4A853" }}>ADD AMBASSADOR</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input style={s.input} placeholder="Full Name *" value={newAmb.full_name} onChange={e => setNewAmb({...newAmb, full_name:e.target.value})} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <input style={s.input} placeholder="Email" value={newAmb.email} onChange={e => setNewAmb({...newAmb, email:e.target.value})} />
                <input style={s.input} placeholder="Phone" value={newAmb.phone} onChange={e => setNewAmb({...newAmb, phone:e.target.value})} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <input style={s.input} placeholder="Instagram" value={newAmb.instagram} onChange={e => setNewAmb({...newAmb, instagram:e.target.value})} />
                <input style={s.input} placeholder="City" value={newAmb.city} onChange={e => setNewAmb({...newAmb, city:e.target.value})} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <select style={s.select} value={newAmb.role} onChange={e => setNewAmb({...newAmb, role:e.target.value})}>
                  {ROLES.map(r => <option key={r} value={r}>{ROLE_ICONS[r]} {r.charAt(0).toUpperCase()+r.slice(1)}</option>)}
                </select>
                <select style={s.select} value={newAmb.status} onChange={e => setNewAmb({...newAmb, status:e.target.value})}>
                  {STATUSES.map(st => <option key={st} value={st}>{st.charAt(0).toUpperCase()+st.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize:11, color:"#666", marginBottom:6, letterSpacing:1 }}>ASSIGN TO PROGRAMS</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {PROGRAMS.map(p => {
                    const sel = (newAmb.assigned_brands||[]).includes(p.key);
                    return <button key={p.key} style={{ ...s.btnO(sel?p.color:"#444"), background: sel?`${p.color}22`:"transparent" }}
                      onClick={() => { const cur=newAmb.assigned_brands||[]; setNewAmb({...newAmb, assigned_brands: sel?cur.filter(b=>b!==p.key):[...cur,p.key]}); }}>{p.label}</button>;
                  })}
                </div>
              </div>
              <div style={{ display:"flex", gap:12, marginTop:12 }}>
                <button style={s.btn()} onClick={addAmbassador} disabled={!newAmb.full_name}>ADD AMBASSADOR</button>
                <button style={s.btnO("#666")} onClick={() => setShowAddModal(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
