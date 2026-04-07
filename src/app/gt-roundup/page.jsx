"use client";
import { useState, useEffect, useRef } from "react";

const SUPA = "https://dzlmtvodpyhetvektfuo.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTk4ODMsImV4cCI6MjA1NjIzNTg4M30.G2JFj8mfGjGashMHnJF3XKvOASEXJNnkYpSIVJqSz48";

const CITY_IMGS = {
  atlanta: "https://images.unsplash.com/photo-1575917649111-0cee4e7e611c?w=1080&h=1350&fit=crop&q=80",
  houston: "https://images.unsplash.com/photo-1548519853-5b35a6275095?w=1080&h=1350&fit=crop&q=80",
  los_angeles: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=1080&h=1350&fit=crop&q=80",
  miami: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=1080&h=1350&fit=crop&q=80",
  washington_dc: "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?w=1080&h=1350&fit=crop&q=80",
  charlotte: "https://images.unsplash.com/photo-1560328055-de355eb0f844?w=1080&h=1350&fit=crop&q=80",
  dallas: "https://images.unsplash.com/photo-1564429238961-bf8e82d4e22c?w=1080&h=1350&fit=crop&q=80",
  new_york: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1080&h=1350&fit=crop&q=80",
  phoenix: "https://images.unsplash.com/photo-1577982787726-e8f069c9c30a?w=1080&h=1350&fit=crop&q=80",
  scottsdale: "https://images.unsplash.com/photo-1588605820760-69fd6e7e63d1?w=1080&h=1350&fit=crop&q=80",
};

const CITY_NAMES = {
  atlanta:"Atlanta", houston:"Houston", los_angeles:"Los Angeles", miami:"Miami",
  washington_dc:"Washington DC", charlotte:"Charlotte", dallas:"Dallas",
  new_york:"New York", phoenix:"Phoenix", scottsdale:"Scottsdale"
};

function CoverSlide({ city, count, subtitle }) {
  return (
    <div style={{width:1080,height:1350,position:"relative",background:"#000",overflow:"hidden",fontFamily:"'DM Sans',sans-serif"}}>
      <img src={CITY_IMGS[city]||CITY_IMGS.atlanta} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.4}} />
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)"}} />
      <div style={{position:"absolute",top:60,left:50,right:50}}>
        <div style={{fontSize:14,letterSpacing:6,color:"#FFD700",textTransform:"uppercase",fontWeight:700}}>Good Times Worldwide</div>
      </div>
      <div style={{position:"absolute",bottom:120,left:50,right:50}}>
        <div style={{fontSize:72,fontWeight:800,color:"#fff",lineHeight:1.1,marginBottom:16}}>{count}</div>
        <div style={{fontSize:42,fontWeight:300,color:"#fff",lineHeight:1.2,fontFamily:"'Cormorant Garamond',serif"}}>Things To Do<br/>This Weekend</div>
        <div style={{fontSize:28,color:"#FFD700",marginTop:20,fontWeight:600}}>{CITY_NAMES[city]||city}</div>
        <div style={{fontSize:18,color:"#999",marginTop:8}}>{subtitle}</div>
      </div>
      <div style={{position:"absolute",bottom:40,left:50,right:50,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:12,color:"#666",letterSpacing:3}}>SWIPE →</span>
        <span style={{fontSize:12,color:"#666"}}>@goodtimes.{city === 'atlanta' ? 'atl' : city.substring(0,3)}</span>
      </div>
    </div>
  );
}

function EventSlide({ rank, event, city }) {
  const typeColors = {
    recurring_night: "#FF6B35", live_music: "#9B59B6", day_party: "#FFD700",
    concert: "#E74C3C", food_event: "#2ECC71", community: "#3498DB", art: "#E91E63"
  };
  const color = typeColors[event.event_type] || "#FFD700";
  const dayName = event.date ? new Date(event.date + 'T12:00:00').toLocaleDateString('en-US',{weekday:'long'}) : '';

  return (
    <div style={{width:1080,height:1350,background:"#0a0a0a",fontFamily:"'DM Sans',sans-serif",padding:60,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:40}}>
          <div style={{fontSize:12,letterSpacing:4,color:"#FFD700",textTransform:"uppercase"}}>Good Times · {CITY_NAMES[city]}</div>
          <div style={{fontSize:14,color:"#555"}}>{rank}/{event.total || '?'}</div>
        </div>
        <div style={{fontSize:120,fontWeight:900,color:"#1a1a1a",lineHeight:1,marginBottom:-20}}>{String(rank).padStart(2,'0')}</div>
        <div style={{fontSize:44,fontWeight:700,color:"#fff",lineHeight:1.2,marginTop:20,marginBottom:16}}>{event.event_name}</div>
        <div style={{width:60,height:3,background:color,marginBottom:24}} />
        <div style={{fontSize:22,color:"#ccc",marginBottom:8}}>📍 {event.venue}</div>
        {event.venue_ig && <div style={{fontSize:16,color:"#666",marginBottom:16}}>@{event.venue_ig}</div>}
        <div style={{display:"flex",gap:16,marginTop:20}}>
          {dayName && <div style={{padding:"8px 20px",background:"#1a1a1a",borderRadius:20,fontSize:16,color:"#fff"}}>{dayName}</div>}
          {event.time_slot && <div style={{padding:"8px 20px",background:"#1a1a1a",borderRadius:20,fontSize:16,color:color,textTransform:"capitalize"}}>{event.time_slot.replace('_',' ')}</div>}
          {event.event_type && <div style={{padding:"8px 20px",background:color+"20",border:`1px solid ${color}40`,borderRadius:20,fontSize:16,color:color,textTransform:"capitalize"}}>{event.event_type.replace('_',' ')}</div>}
        </div>
        {event.description && <div style={{fontSize:18,color:"#888",lineHeight:1.6,marginTop:30,maxHeight:200,overflow:"hidden"}}>{event.description}</div>}
      </div>
      <div style={{borderTop:"1px solid #1a1a1a",paddingTop:20,display:"flex",justifyContent:"space-between"}}>
        <span style={{fontSize:13,color:"#333",letterSpacing:2}}>DOWNLOAD GOOD TIMES</span>
        <span style={{fontSize:13,color:"#333"}}>goodtimesworldwide.com</span>
      </div>
    </div>
  );
}

function CTASlide({ city, count }) {
  return (
    <div style={{width:1080,height:1350,background:"#0a0a0a",fontFamily:"'DM Sans',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:80}}>
      <div style={{fontSize:14,letterSpacing:6,color:"#FFD700",textTransform:"uppercase",marginBottom:40}}>Good Times Worldwide</div>
      <div style={{fontSize:52,fontWeight:300,color:"#fff",textAlign:"center",lineHeight:1.3,fontFamily:"'Cormorant Garamond',serif"}}>
        {count} events.<br/>One app.<br/>Your city.
      </div>
      <div style={{width:80,height:3,background:"#FFD700",margin:"40px 0"}} />
      <div style={{fontSize:24,color:"#999",textAlign:"center",marginBottom:40}}>
        Stop asking the group chat.<br/>Open Good Times.
      </div>
      <div style={{padding:"16px 48px",background:"#FFD700",borderRadius:30,fontSize:18,fontWeight:700,color:"#000",letterSpacing:2}}>
        DOWNLOAD NOW
      </div>
      <div style={{fontSize:13,color:"#333",marginTop:40,letterSpacing:3}}>AVAILABLE ON IOS & ANDROID</div>
    </div>
  );
}

export default function GTRoundupGenerator() {
  const [roundups, setRoundups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    fetch(`${SUPA}/rest/v1/gt_weekly_roundups?week_start=eq.2026-04-06&order=city_key`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }
    }).then(r => r.json()).then(setRoundups);
  }, []);

  const r = selected ? roundups.find(x => x.city_key === selected) : null;
  const items = r ? (typeof r.items === 'string' ? JSON.parse(r.items) : r.items) : [];
  const totalSlides = items.length + 2; // cover + events + CTA

  return (
    <div style={{minHeight:"100vh",background:"#080604",color:"#F5F0E8",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;800;900&family=DM+Mono:wght@400&family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />

      <div style={{borderBottom:"1px solid #1a1a1a",padding:"20px 30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:5,color:"#FFD700",textTransform:"uppercase"}}>Good Times Content Engine</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,marginTop:4}}>Weekend Roundup Generator</div>
        </div>
        <div style={{fontSize:10,color:"#555",fontFamily:"'DM Mono',monospace"}}>{roundups.length} CITIES READY</div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"30px 20px"}}>
        {!selected && <>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,marginBottom:20}}>Select City</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
            {roundups.map(r => (
              <div key={r.city_key} onClick={() => { setSelected(r.city_key); setSlideIndex(0); }}
                style={{padding:20,background:"#111",border:"1px solid #222",borderRadius:12,cursor:"pointer",transition:"border-color .2s"}}
                onMouseEnter={e => e.currentTarget.style.borderColor="#FFD70060"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#222"}>
                <div style={{fontSize:18,fontWeight:600,color:"#FFD700"}}>{CITY_NAMES[r.city_key]}</div>
                <div style={{fontSize:13,color:"#888",marginTop:4}}>{(typeof r.items === 'string' ? JSON.parse(r.items) : r.items).length} events this weekend</div>
                <div style={{fontSize:11,color:"#444",marginTop:8}}>{r.graphic_status}</div>
              </div>
            ))}
          </div>
        </>}

        {selected && r && <>
          <button onClick={() => setSelected(null)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:14,marginBottom:20}}>← All Cities</button>
          <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
            {/* Slide Preview */}
            <div style={{flex:1}}>
              <div style={{transform:"scale(0.45)",transformOrigin:"top left",width:1080,height:1350}}>
                {slideIndex === 0 && <CoverSlide city={selected} count={items.length} subtitle="April 10-12, 2026" />}
                {slideIndex > 0 && slideIndex <= items.length && (
                  <EventSlide rank={slideIndex} event={{...items[slideIndex-1], total: items.length}} city={selected} />
                )}
                {slideIndex === items.length + 1 && <CTASlide city={selected} count={items.length} />}
              </div>
            </div>

            {/* Controls */}
            <div style={{width:300}}>
              <div style={{fontSize:11,color:"#888",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Slide {slideIndex + 1} / {totalSlides}</div>
              <div style={{display:"flex",gap:8,marginBottom:20}}>
                <button onClick={() => setSlideIndex(Math.max(0, slideIndex - 1))}
                  style={{padding:"8px 16px",background:"#222",border:"none",borderRadius:6,color:"#fff",cursor:"pointer"}}>← Prev</button>
                <button onClick={() => setSlideIndex(Math.min(totalSlides - 1, slideIndex + 1))}
                  style={{padding:"8px 16px",background:"#FFD700",border:"none",borderRadius:6,color:"#000",cursor:"pointer",fontWeight:700}}>Next →</button>
              </div>
              <div style={{fontSize:13,color:"#666",marginBottom:20}}>
                {slideIndex === 0 && "Cover Slide — City hero image + event count"}
                {slideIndex > 0 && slideIndex <= items.length && `Event ${slideIndex}: ${items[slideIndex-1]?.event_name}`}
                {slideIndex === totalSlides - 1 && "CTA Slide — Download Good Times"}
              </div>
              <div style={{padding:16,background:"#111",borderRadius:8,border:"1px solid #222"}}>
                <div style={{fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Caption</div>
                <div style={{fontSize:12,color:"#ccc",lineHeight:1.6}}>{r.social_caption}</div>
              </div>
              <div style={{padding:16,background:"#111",borderRadius:8,border:"1px solid #222",marginTop:12}}>
                <div style={{fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Hashtags</div>
                <div style={{fontSize:12,color:"#FFD700"}}>#{(r.hashtags || []).join(' #')}</div>
              </div>
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}
