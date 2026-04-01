"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NjA5NjAsImV4cCI6MjA1MjAzNjk2MH0.gk2a-UPnMUPLzIxIh6fJGsRCYPKs5M-ZxDyNBgngnHc";
const H = { apikey: SK, Authorization: `Bearer ${SK}` };
const sGet = async (p) => { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: H }); return await r.json(); } catch { return []; } };

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [tab, setTab] = useState("directory");

  const load = useCallback(async () => {
    setLoading(true);
    const c = await sGet("dolo_directory?order=display_name.asc&limit=500");
    setContacts(c || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const categories = [...new Set(contacts.map(c => c.category).filter(Boolean))].sort();
  const filtered = contacts.filter(c => {
    if (catFilter !== "all" && c.category !== catFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (c.display_name || "").toLowerCase().includes(s) || (c.first_name || "").toLowerCase().includes(s) || (c.last_name || "").toLowerCase().includes(s) || (c.email || "").toLowerCase().includes(s) || (c.phone || "").includes(s) || (c.instagram || "").toLowerCase().includes(s);
    }
    return true;
  });

  const hasEmail = contacts.filter(c => c.email).length;
  const hasPhone = contacts.filter(c => c.phone).length;
  const hasIG = contacts.filter(c => c.instagram).length;

  const s = {
    card: { background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 6, padding: 20, marginBottom: 12 },
    input: { background: "#111", border: "1px solid #222", color: "#F0EDE6", padding: "10px 14px", borderRadius: 4, fontSize: 13, width: "100%", boxSizing: "border-box", outline: "none" },
    select: { background: "#111", border: "1px solid #222", color: "#F0EDE6", padding: "10px 14px", borderRadius: 4, fontSize: 13, outline: "none" },
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "#060604", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 11, letterSpacing: 5, color: "#607D8B" }}>LOADING CONTACTS...</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A08,#111)", borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", padding: "6px 12px", border: "1px solid #222", borderRadius: 4 }}>← HUB</Link>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 6, color: "#607D8B", textTransform: "uppercase" }}>THE KOLLECTIVE HOSPITALITY GROUP</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>Database / Contacts</h1>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[["👥", contacts.length, "Total Contacts"], ["📧", hasEmail, "Have Email"], ["📱", hasPhone, "Have Phone"], ["📷", hasIG, "Have IG"], ["📂", categories.length, "Categories"]].map(([icon, n, l], i) => (
            <div key={i} style={{ ...s.card, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#607D8B", lineHeight: 1, marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <input style={{ ...s.input, maxWidth: 300 }} placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} />
          <select style={s.select} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c} ({contacts.filter(x => x.category === c).length})</option>)}
          </select>
          <div style={{ fontSize: 12, color: "#666", marginLeft: "auto", alignSelf: "center" }}>{filtered.length} results</div>
        </div>

        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {filtered.slice(0, 100).map(c => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 4, marginBottom: 4, fontSize: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#607D8B", flexShrink: 0 }}>{(c.first_name || c.display_name || "?")[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{c.display_name || `${c.first_name || ""} ${c.last_name || ""}`.trim()}</div>
                <div style={{ fontSize: 10, color: "#666" }}>{c.category || "—"} · {c.city || "—"}{c.instagram ? ` · @${c.instagram.replace("@","")}` : ""}</div>
              </div>
              <div style={{ fontSize: 10, color: "#555", textAlign: "right" }}>
                {c.phone && <div>{c.phone}</div>}
                {c.email && <div style={{ color: "#607D8B" }}>{c.email}</div>}
              </div>
            </div>
          ))}
          {filtered.length > 100 && <div style={{ textAlign: "center", padding: 16, color: "#555", fontSize: 12 }}>Showing 100 of {filtered.length}</div>}
        </div>
      </div>
    </div>
  );
}
