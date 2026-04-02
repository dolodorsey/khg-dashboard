"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

const PIPELINES = [
  { name: "Clinic Pipeline", stages: 20, color: "#9B59B6" },
  { name: "Consumer Pipeline", stages: 9, color: "#8E44AD" },
  { name: "PI Pipeline", stages: 8, color: "#7D3C98" },
];

export default function MindStudioDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#9B59B6", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Mind Studio</h1>
        </div>
      </div>
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["🧠", "3", "Pipelines"], ["📋", "37", "Total Stages"], ["🎯", "33", "Outreach Targets"], ["🌐", "1", "Portal App"]].map(([icon, n, l], i) => (
            <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#9B59B6", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        {PIPELINES.map(p => (
          <div key={p.name} style={{ background: "#0D0D0B", border: `1px solid ${p.color}33`, borderRadius: 6, padding: 24, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.name}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: p.color }}>{p.stages} <span style={{ fontSize: 10, color: "#666" }}>stages</span></div>
            </div>
          </div>
        ))}
        <div style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 24, marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#9B59B6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>QUICK LINKS</div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://themindstudioworldwide.com" target="_blank" rel="noopener" style={{ padding: "8px 16px", background: "#9B59B622", border: "1px solid #9B59B644", borderRadius: 4, fontSize: 11, fontWeight: 600, color: "#9B59B6", letterSpacing: 1 }}>WEBSITE →</a>
            <a href="https://mind-studio-app.vercel.app" target="_blank" rel="noopener" style={{ padding: "8px 16px", background: "transparent", border: "1px solid #333", borderRadius: 4, fontSize: 11, fontWeight: 600, color: "#888", letterSpacing: 1 }}>PORTAL APP →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
