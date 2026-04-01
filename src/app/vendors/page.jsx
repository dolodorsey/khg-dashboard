"use client";
import Link from "next/link";
export default function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#8D6E63", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Vendors</h1>
        </div>
      </div>
      <div style={{ padding: "24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16, marginTop: 60 }}>🏪</div>
        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Vendors</div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 32 }}>Vendor applications, assignments, tracking</div>
        <div style={{ display: "inline-block", padding: "3px 14px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", background: "#8D6E6322", color: "#8D6E63", border: "1px solid #8D6E6344" }}>BUILDING — DATA SOURCES CONNECTED</div>
        <div style={{ fontSize: 11, color: "#444", marginTop: 20 }}>Dashboard framework deployed. Live data integration in next sprint.</div>
      </div>
    </div>
  );
}
