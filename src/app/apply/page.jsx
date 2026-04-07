"use client";
import { useState, useEffect } from "react";

const SUPA = "https://dzlmtvodpyhetvektfuo.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTk4ODMsImV4cCI6MjA1NjIzNTg4M30.G2JFj8mfGjGashMHnJF3XKvOASEXJNnkYpSIVJqSz48";
const post = async (table, data) => {
  const r = await fetch(`${SUPA}/rest/v1/${table}`, { method:"POST", headers:{apikey:KEY,Authorization:`Bearer ${KEY}`,"Content-Type":"application/json",Prefer:"return=representation"}, body:JSON.stringify(data) });
  return r.ok ? await r.json() : null;
};

const PROGRAMS = [
  { key:"maga", name:"Make Atlanta Great Again", color:"#B22234", tagline:"Rep the 404. Build the culture." },
  { key:"stush", name:"Stush", color:"#C9A96E", tagline:"Luxury. Unapologetically." },
  { key:"ace_theory", name:"Ace Theory", color:"#1a1a1a", tagline:"The ace in the room." },
  { key:"myxx", name:"Myxx", color:"#6B21A8", tagline:"Where the mix meets the moment." },
  { key:"events", name:"KHG Events", color:"#FF6B35", tagline:"21 event brands. One empire." },
  { key:"good_times", name:"Good Times", color:"#FFD700", tagline:"Your city. Your concierge." },
];

const ROLES = ["influencer","promoter","dj","model","photographer","host","blogger","podcast","bartender"];

export default function AmbassadorApply() {
  const [step, setStep] = useState(1);
  const [program, setProgram] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", phone:"", city:"", ig_handle:"", tiktok:"", role:"", followers:"", why:"", portfolio_url:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await post("khg_ambassadors", {
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      instagram: form.ig_handle,
      role: form.role,
      assigned_brands: [program.key],
      status: "applied",
      tier: 1,
      compensation_type: "commission",
      responsibilities: [form.why || "Ambassador application"]
    });
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) return (
    <div style={{minHeight:"100vh",background:"#080604",color:"#F5F0E8",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />
      <div style={{textAlign:"center",maxWidth:500,padding:40}}>
        <div style={{fontSize:48,marginBottom:20}}>🎯</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,marginBottom:12}}>Application Received</h1>
        <p style={{color:"#999",fontSize:14,lineHeight:1.8}}>Welcome to the {program.name} Ambassador Program. We review every application personally. If selected, you'll hear from us within 72 hours.</p>
        <div style={{marginTop:30,padding:16,background:"#111",borderRadius:8,border:"1px solid #222"}}>
          <div style={{fontSize:11,color:"#666",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Application Summary</div>
          <div style={{fontSize:13,color:"#ccc"}}>{form.name} · {form.role} · {form.city}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#080604",color:"#F5F0E8",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{borderBottom:"1px solid #1a1a1a",padding:"20px 30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:5,color:"#D4B87A",textTransform:"uppercase"}}>The Kollective Hospitality Group</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,marginTop:4}}>Ambassador Program</div>
        </div>
        <div style={{fontSize:10,color:"#555",fontFamily:"'DM Mono',monospace"}}>APPLY NOW</div>
      </div>

      <div style={{maxWidth:640,margin:"0 auto",padding:"40px 20px"}}>
        {/* Step 1: Choose Program */}
        {step === 1 && <>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:8}}>Choose Your Brand</h2>
          <p style={{color:"#888",fontSize:13,marginBottom:30}}>Select the program you want to represent.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {PROGRAMS.map(p => (
              <div key={p.key} onClick={()=>{setProgram(p);setStep(2)}}
                style={{padding:24,background:"#111",border:"1px solid #222",borderRadius:12,cursor:"pointer",transition:"all .2s",borderLeft:`3px solid ${p.color}`}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color+"60"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#222";e.currentTarget.style.borderLeftColor=p.color}}>
                <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>{p.name}</div>
                <div style={{fontSize:11,color:"#666"}}>{p.tagline}</div>
              </div>
            ))}
          </div>
        </>}

        {/* Step 2: Role + Info */}
        {step === 2 && program && <>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <button onClick={()=>setStep(1)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:14}}>← Back</button>
            <span style={{color:program.color,fontWeight:600}}>{program.name}</span>
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:8}}>Your Role</h2>
          <p style={{color:"#888",fontSize:13,marginBottom:24}}>What type of ambassador are you?</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:30}}>
            {ROLES.map(r => (
              <button key={r} onClick={()=>{setForm({...form,role:r});setStep(3)}}
                style={{padding:"10px 20px",background:form.role===r?program.color+"30":"#111",border:`1px solid ${form.role===r?program.color:"#333"}`,borderRadius:20,color:form.role===r?program.color:"#999",cursor:"pointer",fontSize:12,fontWeight:500,textTransform:"capitalize",transition:"all .15s"}}>
                {r}
              </button>
            ))}
          </div>
        </>}

        {/* Step 3: Application Form */}
        {step === 3 && program && <>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <button onClick={()=>setStep(2)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:14}}>← Back</button>
            <span style={{color:program.color,fontWeight:600}}>{program.name}</span>
            <span style={{color:"#555"}}>·</span>
            <span style={{color:"#888",textTransform:"capitalize"}}>{form.role}</span>
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:24}}>Your Information</h2>

          {[
            {key:"name",label:"Full Name",type:"text",required:true},
            {key:"email",label:"Email",type:"email",required:true},
            {key:"phone",label:"Phone",type:"tel"},
            {key:"city",label:"City",type:"text",required:true},
            {key:"ig_handle",label:"Instagram Handle",type:"text",placeholder:"@yourhandle"},
            {key:"tiktok",label:"TikTok Handle",type:"text",placeholder:"@yourhandle"},
            {key:"followers",label:"Follower Count (largest platform)",type:"number"},
            {key:"portfolio_url",label:"Portfolio / Website URL",type:"url"},
          ].map(f => (
            <div key={f.key} style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{f.label}{f.required&&" *"}</label>
              <input type={f.type||"text"} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.placeholder||""}
                style={{width:"100%",padding:"12px 16px",background:"#111",border:"1px solid #333",borderRadius:8,color:"#F5F0E8",fontSize:14,fontFamily:"'DM Sans'",outline:"none"}} />
            </div>
          ))}
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Why do you want to be an ambassador?</label>
            <textarea value={form.why} onChange={e=>setForm({...form,why:e.target.value})} rows={4}
              style={{width:"100%",padding:"12px 16px",background:"#111",border:"1px solid #333",borderRadius:8,color:"#F5F0E8",fontSize:14,fontFamily:"'DM Sans'",outline:"none",resize:"vertical"}} />
          </div>
          <button onClick={submit} disabled={!form.name||!form.email||!form.city||loading}
            style={{width:"100%",padding:"14px 24px",background:program.color,color:"#000",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:1,textTransform:"uppercase",opacity:(!form.name||!form.email||!form.city||loading)?0.5:1,transition:"all .2s"}}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </>}
      </div>

      <div style={{borderTop:"1px solid #1a1a1a",padding:"20px 30px",textAlign:"center"}}>
        <div style={{fontSize:9,letterSpacing:4,color:"#333",textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>The Kollective Hospitality Group · Extraordinary Is The Baseline</div>
      </div>
    </div>
  );
}
