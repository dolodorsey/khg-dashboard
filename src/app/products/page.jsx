"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

const STORES = [
  { key: "maga", name: "MAKE ATL GREAT AGAIN", domain: "makeatlantagreatagain.myshopify.com", color: "#C41E3A", products: 92 },
  { key: "stush", name: "STUSH", domain: "stushusa.myshopify.com", color: "#8B0000", products: 118 },
  { key: "bodega", name: "BODEGA", domain: "bodegabodegbodega.myshopify.com", color: "#D4A853", products: 0 },
  { key: "halloween", name: "HER HALLOWEEN", domain: "herhalloween.myshopify.com", color: "#6D4AE0", products: 0 },
];

export default function ShopifyDashboard() {
  const [tab, setTab] = useState("overview");
  const accentColor = "#96BF48";

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: accentColor, textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Shopify / Products</h1>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["🛍️", STORES.length, "Stores"], ["📦", STORES.reduce((s, st) => s + st.products, 0), "Active Products"], ["💰", "4", "Shopify Connections"]].map(([icon, n, l], i) => (
            <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: accentColor, lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {STORES.map(store => (
          <div key={store.key} style={{ background: "#0D0D0B", border: `1px solid ${store.color}33`, borderRadius: 6, padding: 24, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: store.color, letterSpacing: 1 }}>{store.name}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{store.domain}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: store.color }}>{store.products}</div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase" }}>Products</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <a href={`https://${store.domain}`} target="_blank" rel="noopener" style={{ padding: "6px 14px", background: `${store.color}22`, border: `1px solid ${store.color}44`, borderRadius: 4, fontSize: 10, fontWeight: 600, letterSpacing: 1, color: store.color, textTransform: "uppercase" }}>VISIT STORE →</a>
              <a href={`https://${store.domain}/admin`} target="_blank" rel="noopener" style={{ padding: "6px 14px", background: "transparent", border: "1px solid #333", borderRadius: 4, fontSize: 10, fontWeight: 600, letterSpacing: 1, color: "#888", textTransform: "uppercase" }}>ADMIN</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
