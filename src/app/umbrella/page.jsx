"use client";
import Link from "next/link";
const SUBS = [
  { name: "Brand Studio", icon: "🎨", desc: "Creative agency — design, branding, marketing", site: "brand-studio-website.vercel.app" },
  { name: "Auto Exchange", icon: "🚗", desc: "Vehicle sourcing, financing, and sales", site: "umbrella-auto-exchange.vercel.app" },
  { name: "Clean Services", icon: "🧹", desc: "Commercial and residential cleaning", site: "umbrella-clean-services.vercel.app" },
  { name: "Realty Group", icon: "🏠", desc: "Real estate brokerage and property management", site: "umbrella-realty-group.vercel.app" },
  { name: "Injury Network", icon: "⚖️", desc: "Personal injury referral network (HURT 911)", site: "umbrella-injury-network.vercel.app" },
];
export default function UmbrellaDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#3498DB", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Umbrella Group</h1>
        </div>
      </div>
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["☂️", "5", "Sub-Brands"], ["🌐", "5", "Websites"], ["📊", "1", "GHL Location"]].map(([icon, n, l], i) => (
            <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#3498DB", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        {SUBS.map(s => (
          <div key={s.name} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 24, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
            <a href={`https://${s.site}`} target="_blank" rel="noopener" style={{ padding: "8px 16px", background: "#3498DB22", border: "1px solid #3498DB44", borderRadius: 4, fontSize: 10, fontWeight: 600, color: "#3498DB", letterSpacing: 1, textTransform: "uppercase" }}>VISIT →</a>
          </div>
        ))}
      </div>
    </div>
  );
}
