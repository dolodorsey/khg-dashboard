// KHG Dashboard UI Components — shared across all 20 dashboards
// Design: LIGHT WORK-FRIENDLY — #F5F5F7 bg, #111 text, DM Sans/DM Mono
import Link from "next/link";

export const S = "https://dzlmtvodpyhetvektfuo.supabase.co";
export const K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
export const q = async (t, p = "") => { try { const r = await fetch(`${S}/rest/v1/${t}${p ? "?" + p : ""}`, { headers: { apikey: K, Authorization: `Bearer ${K}` } }); return r.ok ? r.json() : []; } catch { return []; } };
export const qRpc = async (fn, params = {}) => { try { const r = await fetch(`${S}/rest/v1/rpc/${fn}`, { method: "POST", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json" }, body: JSON.stringify(params) }); return r.ok ? r.json() : null; } catch { return null; } };
export const qInsert = async (t, d) => { try { const r = await fetch(`${S}/rest/v1/${t}`, { method: "POST", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };
export const qPatch = async (t, m, d) => { try { const r = await fetch(`${S}/rest/v1/${t}?${m}`, { method: "PATCH", headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(d) }); return r.ok ? r.json() : null; } catch { return null; } };

export function Header({ title, icon, sub, color = "#FF6B35" }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #E5E5E7", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
      <Link href="/" style={{ fontSize: 11, color: "#999", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #E5E5E7", borderRadius: 6, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>{String.fromCharCode(8592)} HUB</Link>
      <div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color, textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0, color: "#111" }}>{icon} {title}</h1>
        {sub && <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

export function Card({ title, value, sub, color = "#FF6B35" }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E5E5E7", borderRadius: 10, padding: "20px 24px", flex: 1, minWidth: 160, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div style={{ fontSize: 10, color: "#999", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Mono',monospace", fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: -1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export function Badge({ text, color = "#22C55E" }) {
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: color + "14", color, border: `1px solid ${color}28` }}>{text}</span>;
}

export function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", background: "#fff", border: "1px solid #E5E5E7", borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead><tr>{headers.map((h, i) => <th key={i} style={{ textAlign: "left", padding: "10px 14px", borderBottom: "1px solid #EFEFEF", color: "#999", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono',monospace", fontWeight: 500 }}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i} style={{ borderBottom: "1px solid #F5F5F5" }}>{row.map((cell, j) => <td key={j} style={{ padding: "10px 14px", color: "#444" }}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function Section({ title, icon, count, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, color: "#111" }}>
        <span>{icon}</span> {title}
        {count !== undefined && <span style={{ fontSize: 10, color: "#999", fontFamily: "'DM Mono',monospace", marginLeft: "auto" }}>{count}</span>}
      </h2>
      {children}
    </div>
  );
}

export function Loading({ text = "LOADING..." }) {
  return <div style={{ minHeight: "100vh", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: 4 }}>{text}</div>;
}
