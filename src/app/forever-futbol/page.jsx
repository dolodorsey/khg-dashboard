"use client";
import Link from "next/link";
export default function ForeverFutbolDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#2E8B57", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Forever Futbol</h1>
        </div>
      </div>
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["⚽", "1", "Museum"], ["📅", "May 29 - Jul 6", "Season"], ["🕐", "Fri/Sat/Sun", "Days"], ["🕛", "Noon - 9PM", "Hours"], ["📍", "ATL Only", "Location"]].map(([icon, n, l], i) => (
            <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#2E8B57", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0D0D0B", border: "1px solid #2E8B5733", borderRadius: 6, padding: 24, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2E8B57", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>KEY RULES</div>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 2 }}>
            ATL ONLY · May 29 – Jul 6 · Fri/Sat/Sun Noon–9PM · "Sponsorship" not "Partnership" · Dr. Dorsey provides official flyers only
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="https://forever-futbol.vercel.app" target="_blank" rel="noopener" style={{ padding: "10px 20px", background: "#2E8B5722", border: "1px solid #2E8B5744", borderRadius: 4, fontSize: 11, fontWeight: 600, color: "#2E8B57", letterSpacing: 1, textTransform: "uppercase" }}>WEBSITE →</a>
        </div>
      </div>
    </div>
  );
}
