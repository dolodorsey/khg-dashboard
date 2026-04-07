"use client";
import { useState } from "react";

const SUPA = "https://dzlmtvodpyhetvektfuo.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTk4ODMsImV4cCI6MjA1NjIzNTg4M30.G2JFj8mfGjGashMHnJF3XKvOASEXJNnkYpSIVJqSz48";
const post = async (table, data) => {
  const r = await fetch(`${SUPA}/rest/v1/${table}`, { method:"POST", headers:{apikey:KEY,Authorization:`Bearer ${KEY}`,"Content-Type":"application/json",Prefer:"return=representation"}, body:JSON.stringify(data) });
  return r.ok;
};

const SERVICES = [
  { cat:"Emergency Roadside", items:["Jump Start","Flat Tire Help","Lockout","Towing","Fuel Delivery","Battery Replace","Winch Out / Recovery","Accident Assist","EV Charging Boost"] },
  { cat:"Mobile Maintenance", items:["Oil Change","Brake Pads","A/C Recharge","Fluids / Top-ups","Belt/Hose Swap","Bulb Replacement","OBD Scan + Report","Pre-trip Inspection"] },
  { cat:"Car Wash & Detailing", items:["Express Wash","Full Detail","Interior Detail","Ceramic Coating","Odor / Sanitization"] },
  { cat:"Glass & Body", items:["Windshield Repair","Windshield Replace","Paintless Dent Repair","Scratch Buff / Touch-up"] },
  { cat:"Premium Concierge", items:["Valet Fuel + Wash","Pickup/Return Service","VIP Roadside Priority"] },
  { cat:"Fleet Services", items:["Fleet Wash","Fleet Inspections","Fleet Jump/Lockout","Fleet Fuel"] },
];

const APPS = [
  { key:"sos", name:"SOS", tagline:"On-demand vehicle rescue", color:"#FF3B30", desc:"Emergency roadside + mobile maintenance" },
  { key:"on_call", name:"On Call", tagline:"Services that come to you", color:"#007AFF", desc:"Home + personal services on demand" },
  { key:"luxe", name:"Luxe On Demand", tagline:"Premium lifestyle services", color:"#C9A96E", desc:"Concierge-level everything" },
];

export default function ProviderSignup() {
  const [app, setApp] = useState(null);
  const [form, setForm] = useState({ name:"", business_name:"", email:"", phone:"", city:"", zip:"", services:[], experience:"", has_vehicle:true, has_tools:true, insurance:false, license_type:"", availability:"", notes:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleService = (s) => setForm(f => ({...f, services: f.services.includes(s) ? f.services.filter(x=>x!==s) : [...f.services, s]}));

  const submit = async () => {
    setLoading(true);
    await post("sos_waitlist", {
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      role: "provider",
      source: "website_form_" + (app?.key || "sos")
    });
    setSubmitted(true);
    setLoading(false);
  };

  const S = { input:{width:"100%",padding:"12px 16px",background:"#111",border:"1px solid #222",borderRadius:8,color:"#F5F0E8",fontSize:14,fontFamily:"'DM Sans'",outline:"none"} };

  if (submitted) return (
    <div style={{minHeight:"100vh",background:"#080604",color:"#F5F0E8",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />
      <div style={{textAlign:"center",maxWidth:500,padding:40}}>
        <div style={{fontSize:48,marginBottom:20}}>🦸</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,marginBottom:12,color:app?.color||"#FF3B30"}}>Application Received</h1>
        <p style={{color:"#888",fontSize:14,lineHeight:1.8}}>Welcome to {app?.name || "SOS"}. We review every provider application within 48 hours. Top providers get priority dispatch and higher earnings.</p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#080604",color:"#F5F0E8",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400&family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />

      <div style={{borderBottom:"1px solid #1a1a1a",padding:"20px 30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:5,color:"#FF3B30",textTransform:"uppercase"}}>The Kollective Hospitality Group</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,marginTop:4}}>Become a Service Provider</div>
        </div>
        <div style={{fontSize:10,color:"#555",fontFamily:"'DM Mono',monospace"}}>EARN ON YOUR SCHEDULE</div>
      </div>

      <div style={{maxWidth:640,margin:"0 auto",padding:"40px 20px"}}>
        {!app && <>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:8}}>Choose Your Platform</h2>
          <p style={{color:"#888",fontSize:13,marginBottom:30}}>Join the on-demand service network. Set your own hours. Get paid weekly.</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {APPS.map(a => (
              <div key={a.key} onClick={()=>setApp(a)}
                style={{padding:24,background:"#111",border:"1px solid #222",borderRadius:12,cursor:"pointer",transition:"all .2s",borderLeft:`3px solid ${a.color}`}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=a.color+"60"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#222";e.currentTarget.style.borderLeftColor=a.color}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:18,fontWeight:700,color:a.color}}>{a.name}</div>
                    <div style={{fontSize:12,color:"#888",marginTop:2}}>{a.tagline}</div>
                  </div>
                  <div style={{fontSize:11,color:"#555"}}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>}

        {app && <>
          <button onClick={()=>setApp(null)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:14,marginBottom:20}}>← Back</button>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:4,color:app.color}}>{app.name} Provider Application</h2>
          <p style={{color:"#888",fontSize:13,marginBottom:24}}>{app.desc}</p>

          {[
            {key:"name",label:"Full Name",req:true},
            {key:"business_name",label:"Business Name (if applicable)"},
            {key:"email",label:"Email",type:"email",req:true},
            {key:"phone",label:"Phone",type:"tel",req:true},
            {key:"city",label:"City",req:true},
            {key:"zip",label:"ZIP Code"},
            {key:"experience",label:"Years of Experience",type:"number"},
            {key:"license_type",label:"License / Certification Type"},
          ].map(f => (
            <div key={f.key} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{f.label}{f.req&&" *"}</label>
              <input type={f.type||"text"} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={S.input} />
            </div>
          ))}

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Services You Can Provide</label>
            {SERVICES.map(cat => (
              <div key={cat.cat} style={{marginBottom:12}}>
                <div style={{fontSize:11,color:"#555",fontWeight:600,marginBottom:6}}>{cat.cat}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {cat.items.map(s => (
                    <button key={s} onClick={()=>toggleService(s)}
                      style={{padding:"5px 12px",borderRadius:14,fontSize:10,cursor:"pointer",border:`1px solid ${form.services.includes(s)?app.color:"#333"}`,background:form.services.includes(s)?app.color+"20":"transparent",color:form.services.includes(s)?app.color:"#666",transition:"all .15s"}}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{marginBottom:14,display:"flex",gap:20,flexWrap:"wrap"}}>
            {[{key:"has_vehicle",label:"I have a vehicle"},{key:"has_tools",label:"I have my own tools"},{key:"insurance",label:"I carry liability insurance"}].map(c => (
              <label key={c.key} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
                <input type="checkbox" checked={form[c.key]} onChange={e=>setForm({...form,[c.key]:e.target.checked})} />
                {c.label}
              </label>
            ))}
          </div>

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Availability</label>
            <select value={form.availability} onChange={e=>setForm({...form,availability:e.target.value})} style={{...S.input,appearance:"none"}}>
              <option value="">Select Availability</option>
              <option value="full_time">Full Time (40+ hrs/week)</option>
              <option value="part_time">Part Time (15-30 hrs/week)</option>
              <option value="weekends">Weekends Only</option>
              <option value="evenings">Evenings Only</option>
              <option value="on_call">On-Call / Flexible</option>
            </select>
          </div>

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Anything else we should know?</label>
            <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={3} style={{...S.input,resize:"vertical"}} />
          </div>

          <button onClick={submit} disabled={!form.name||!form.email||!form.phone||!form.city||loading}
            style={{width:"100%",padding:"14px 24px",background:app.color,color:"#fff",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:1,textTransform:"uppercase",opacity:(!form.name||!form.email||!form.phone||!form.city||loading)?0.5:1,marginTop:10}}>
            {loading ? "Submitting..." : "Apply to Be a Provider"}
          </button>
        </>}
      </div>

      <div style={{borderTop:"1px solid #1a1a1a",padding:"20px 30px",textAlign:"center"}}>
        <div style={{fontSize:9,letterSpacing:4,color:"#333",textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>SOS · On Call · Luxe On Demand · The Kollective Hospitality Group</div>
      </div>
    </div>
  );
}
