"use client";
import { useState } from "react";

const SUPA = "https://dzlmtvodpyhetvektfuo.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTk4ODMsImV4cCI6MjA1NjIzNTg4M30.G2JFj8mfGjGashMHnJF3XKvOASEXJNnkYpSIVJqSz48";
const post = async (table, data) => {
  const r = await fetch(`${SUPA}/rest/v1/${table}`, { method:"POST", headers:{apikey:KEY,Authorization:`Bearer ${KEY}`,"Content-Type":"application/json",Prefer:"return=representation"}, body:JSON.stringify(data) });
  return r.ok;
};

const CITIES = ["Atlanta","Houston","Los Angeles","Miami","Washington DC","Charlotte","Dallas","Phoenix","New York","Scottsdale"];
const CATEGORIES = ["Nightclub","Lounge","Bar","Restaurant","Rooftop","Day Party Venue","Concert Venue","Event Space","Hookah Lounge","Sports Bar","Pool Party","Festival Grounds","Other"];
const VIBES = ["Upscale","Casual","High-Energy","Intimate","Outdoor","Rooftop","Live Music","DJ-Driven","Day Party","Late Night","LGBTQ+ Friendly","Date Night","Group Friendly"];
const AD_TIERS = [
  { name:"Featured Listing", price:"$199/mo", desc:"Priority placement in city feed, badge, boosted visibility" },
  { name:"Spotlight Package", price:"$499/mo", desc:"Homepage carousel, push notifications, social cross-promo" },
  { name:"City Takeover", price:"$999/mo", desc:"Exclusive city-level branding, first position, custom landing" },
  { name:"Event Boost", price:"$149/event", desc:"Featured event placement, push to local users, social share" },
];

export default function GTPartner() {
  const [mode, setMode] = useState(null); // 'venue' or 'promoter' or 'ad'
  const [form, setForm] = useState({
    business_name:"", business_type:"", contact_name:"", contact_email:"", contact_phone:"",
    website:"", instagram_handle:"", city:"", address:"", neighborhood:"", description:"",
    category:"", subcategory:"", price_range:"", vibe_tags:[],
    wants_ticketing:false, ticketing_notes:"", wants_ad_space:false, ad_budget:"",
    specials:"", happy_hour:"", recurring_events:""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVibe = (v) => {
    setForm(f => ({...f, vibe_tags: f.vibe_tags.includes(v) ? f.vibe_tags.filter(x=>x!==v) : [...f.vibe_tags, v]}));
  };

  const submit = async () => {
    setLoading(true);
    await post("gt_partner_applications", {
      business_name: form.business_name,
      business_type: mode === "promoter" ? "promoter" : "venue",
      contact_name: form.contact_name,
      contact_email: form.contact_email,
      contact_phone: form.contact_phone,
      website: form.website,
      instagram_handle: form.instagram_handle,
      city: form.city,
      address: form.address,
      neighborhood: form.neighborhood,
      description: form.description,
      category: form.category,
      vibe_tags: form.vibe_tags,
      price_range: form.price_range,
      wants_ticketing: form.wants_ticketing,
      ticketing_notes: form.ticketing_notes,
      wants_ad_space: form.wants_ad_space,
      ad_budget: form.ad_budget,
      specials: form.specials ? { text: form.specials } : null,
      happy_hour: form.happy_hour ? { text: form.happy_hour } : null,
      recurring_events: form.recurring_events ? { text: form.recurring_events } : null,
      status: "submitted",
      source: "website_form"
    });
    setSubmitted(true);
    setLoading(false);
  };

  const S = { input:{width:"100%",padding:"12px 16px",background:"#0d1117",border:"1px solid #21262d",borderRadius:8,color:"#e6edf3",fontSize:14,fontFamily:"'DM Sans'",outline:"none"} };

  if (submitted) return (
    <div style={{minHeight:"100vh",background:"#010409",color:"#e6edf3",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />
      <div style={{textAlign:"center",maxWidth:500,padding:40}}>
        <div style={{fontSize:48,marginBottom:20}}>🎉</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,marginBottom:12,color:"#FFD700"}}>Application Submitted</h1>
        <p style={{color:"#8b949e",fontSize:14,lineHeight:1.8}}>Thank you for your interest in partnering with Good Times. Our team reviews every submission. You'll hear from us within 48 hours.</p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#010409",color:"#e6edf3",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400&family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />

      <div style={{borderBottom:"1px solid #21262d",padding:"20px 30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:5,color:"#FFD700",textTransform:"uppercase"}}>Good Times Worldwide</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,marginTop:4}}>Partner With Us</div>
        </div>
        <div style={{fontSize:10,color:"#484f58",fontFamily:"'DM Mono',monospace"}}>10 CITIES · 1,079 VENUES</div>
      </div>

      <div style={{maxWidth:640,margin:"0 auto",padding:"40px 20px"}}>
        {!mode && <>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:8,color:"#FFD700"}}>How do you want to partner?</h2>
          <p style={{color:"#8b949e",fontSize:13,marginBottom:30}}>Good Times is the nightlife concierge app for your city. We help people find the best venues, events, and experiences.</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {key:"venue",icon:"🏢",title:"List Your Venue",desc:"Get discovered by thousands of local nightlife seekers. Free listing + premium options."},
              {key:"promoter",icon:"🎤",title:"Promoter / Event Host",desc:"Submit your events, sell tickets, reach our audience across 10 cities."},
              {key:"ad",icon:"📢",title:"Advertise With Us",desc:"Featured placements, push notifications, city takeovers. Reach the nightlife audience."},
            ].map(o => (
              <div key={o.key} onClick={()=>setMode(o.key)}
                style={{padding:24,background:"#0d1117",border:"1px solid #21262d",borderRadius:12,cursor:"pointer",transition:"all .2s",display:"flex",gap:16,alignItems:"center"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#FFD70060"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#21262d"}}>
                <span style={{fontSize:32}}>{o.icon}</span>
                <div>
                  <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>{o.title}</div>
                  <div style={{fontSize:12,color:"#8b949e"}}>{o.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>}

        {mode === "ad" && <>
          <button onClick={()=>setMode(null)} style={{background:"none",border:"none",color:"#8b949e",cursor:"pointer",fontSize:14,marginBottom:20}}>← Back</button>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:8,color:"#FFD700"}}>Advertising Packages</h2>
          <p style={{color:"#8b949e",fontSize:13,marginBottom:24}}>Reach the nightlife audience across 10 cities.</p>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:30}}>
            {AD_TIERS.map((t,i) => (
              <div key={i} style={{padding:20,background:"#0d1117",border:"1px solid #21262d",borderRadius:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:15,fontWeight:600}}>{t.name}</div>
                  <div style={{fontSize:12,color:"#8b949e",marginTop:4}}>{t.desc}</div>
                </div>
                <div style={{fontSize:18,fontWeight:700,color:"#FFD700",whiteSpace:"nowrap",marginLeft:16}}>{t.price}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:13,color:"#8b949e",marginBottom:16}}>Interested? Fill out the venue/promoter form above or email us directly:</p>
          <div style={{padding:16,background:"#0d1117",borderRadius:8,border:"1px solid #21262d",textAlign:"center"}}>
            <div style={{fontSize:14,color:"#FFD700",fontWeight:600}}>thekollectivehospitality@gmail.com</div>
            <div style={{fontSize:11,color:"#484f58",marginTop:4}}>Subject: Good Times Ad Inquiry</div>
          </div>
        </>}

        {(mode === "venue" || mode === "promoter") && <>
          <button onClick={()=>setMode(null)} style={{background:"none",border:"none",color:"#8b949e",cursor:"pointer",fontSize:14,marginBottom:20}}>← Back</button>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:24,color:"#FFD700"}}>
            {mode === "venue" ? "Venue Information" : "Promoter / Event Host Info"}
          </h2>

          {[
            {key:"business_name",label:mode==="venue"?"Venue Name":"Promoter / Company Name",req:true},
            {key:"contact_name",label:"Contact Name",req:true},
            {key:"contact_email",label:"Email",type:"email",req:true},
            {key:"contact_phone",label:"Phone",type:"tel"},
            {key:"instagram_handle",label:"Instagram",placeholder:"@yourhandle"},
            {key:"website",label:"Website",type:"url"},
            {key:"address",label:mode==="venue"?"Venue Address":"Primary City"},
            {key:"neighborhood",label:"Neighborhood / Area"},
          ].map(f => (
            <div key={f.key} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,color:"#8b949e",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{f.label}{f.req&&" *"}</label>
              <input type={f.type||"text"} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.placeholder||""} style={S.input} />
            </div>
          ))}

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,color:"#8b949e",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>City *</label>
            <select value={form.city} onChange={e=>setForm({...form,city:e.target.value})} style={{...S.input,appearance:"none"}}>
              <option value="">Select City</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,color:"#8b949e",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Category</label>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{...S.input,appearance:"none"}}>
              <option value="">Select Category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,color:"#8b949e",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Vibe Tags</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {VIBES.map(v => (
                <button key={v} onClick={()=>toggleVibe(v)}
                  style={{padding:"6px 14px",borderRadius:16,fontSize:11,cursor:"pointer",border:`1px solid ${form.vibe_tags.includes(v)?"#FFD700":"#21262d"}`,background:form.vibe_tags.includes(v)?"#FFD70020":"transparent",color:form.vibe_tags.includes(v)?"#FFD700":"#8b949e",transition:"all .15s"}}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,color:"#8b949e",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Description</label>
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} style={{...S.input,resize:"vertical"}} placeholder="Tell us about your venue / events..." />
          </div>

          {mode === "venue" && <>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,color:"#8b949e",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Specials / Happy Hour</label>
              <input value={form.happy_hour} onChange={e=>setForm({...form,happy_hour:e.target.value})} style={S.input} placeholder="e.g. $5 wells Mon-Fri 5-7pm" />
            </div>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,color:"#8b949e",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Recurring Events</label>
              <input value={form.recurring_events} onChange={e=>setForm({...form,recurring_events:e.target.value})} style={S.input} placeholder="e.g. DJ Night every Friday, Trivia Tuesdays" />
            </div>
          </>}

          <div style={{marginBottom:14,display:"flex",gap:20}}>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
              <input type="checkbox" checked={form.wants_ticketing} onChange={e=>setForm({...form,wants_ticketing:e.target.checked})} />
              Interested in ticketing
            </label>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
              <input type="checkbox" checked={form.wants_ad_space} onChange={e=>setForm({...form,wants_ad_space:e.target.checked})} />
              Interested in advertising
            </label>
          </div>

          <button onClick={submit} disabled={!form.business_name||!form.contact_email||!form.city||loading}
            style={{width:"100%",padding:"14px 24px",background:"#FFD700",color:"#000",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:1,textTransform:"uppercase",opacity:(!form.business_name||!form.contact_email||!form.city||loading)?0.5:1,marginTop:10}}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </>}
      </div>

      <div style={{borderTop:"1px solid #21262d",padding:"20px 30px",textAlign:"center"}}>
        <div style={{fontSize:9,letterSpacing:4,color:"#30363d",textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>Good Times Worldwide · Your City. Your Concierge.</div>
      </div>
    </div>
  );
}
