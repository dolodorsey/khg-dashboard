"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };

const BRANDS = ["Angel Wings","Pasta Bish","Taco Yaki","Patty Daddy","Espresso Co.","Morning After","Toss'd","Sweet Tooth","Mojo Juice","Mr. Oyster"];

export default function CasperDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#E74C3C", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Casper Group</h1>
        </div>
      </div>
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["🍽️", "10", "Concepts"], ["🏢", "220", "Venue Prospects"], ["📧", "98", "Have Email"], ["📱", "217", "Have Phone"], ["👥", "6", "Team Members"]].map(([icon, n, l], i) => (
            <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#E74C3C", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#E74C3C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>10 RESTAURANT CONCEPTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {BRANDS.map(b => (
              <div key={b} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 6, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#E74C3C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>TEAM — 12 CALLS/DAY WEEKDAYS</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Brad","Bax","Alandra","Linda","Brittany","Maia"].map(n => (
              <div key={n} style={{ padding: "8px 16px", background: "#111", border: "1px solid #222", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{n}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
