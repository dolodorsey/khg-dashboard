"use client";
import Link from "next/link";
export default function Page() {
  return (<div style={{minHeight:"100vh",background:"#FAFAF8",fontFamily:"'Outfit',system-ui,sans-serif"}}>
    <div style={{background:"#fff",borderBottom:"1px solid #E8E4DD",padding:"28px 40px",display:"flex",alignItems:"center",gap:16}}>
      <Link href="/" style={{fontSize:12,color:"#A39E96",textDecoration:"none",padding:"6px 12px",border:"1px solid #E8E4DD",borderRadius:6}}>← Hub</Link>
      <div><h1 style={{fontSize:22,fontWeight:800,margin:0,color:"#1A1A18"}}>Scented Museums</h1><p style={{fontSize:11,color:"#A39E96",marginTop:2}}>Museum Operations</p></div>
    </div>
    <div style={{padding:"60px 40px",textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>🏛️</div><h2 style={{fontSize:24,marginBottom:8}}>Coming Soon</h2><p style={{color:"#A39E96",fontSize:14}}>Brand keys will be assigned when operations begin.</p></div>
  </div>);
}
