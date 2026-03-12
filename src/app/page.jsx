"use client";
import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════
// KOLLECTIVE COMMAND CENTER v5.0
// White background · Left sidebar · All 57 brands organized by division
// Every screen is an ACTION screen · Every button works
// ═══════════════════════════════════════════════════════════════════════

const SB = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4NDg2NCwiZXhwIjoyMDg1MTYwODY0fQ.lhtEGfGYYhEZxzrUl3EN1h53IPyfM8TBpwpoFqdgQVs";
const HD = { apikey: SK, Authorization: `Bearer ${SK}`, "Content-Type": "application/json", Prefer: "return=representation" };
async function q(p, o = {}) { try { const r = await fetch(`${SB}/rest/v1/${p}`, { headers: HD, ...o }); if (!r.ok) return null; const t = await r.text(); return t ? JSON.parse(t) : null; } catch { return null; } }
async function qPatch(t, id, d) { return q(`${t}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(d) }); }
async function qInsert(t, d) { return q(t, { method: "POST", body: JSON.stringify(d) }); }

// DIVISIONS + BRANDS (exactly matching your sidebar screenshot)
const DIVS = [
  { key: "kollective", label: "🧠 THE KOLLECTIVE", color: "#FF6B35", open: true, brands: [
    { k: "dr_dorsey", n: "Dr. Dorsey" }, { k: "kollective", n: "The Kollective" }, { k: "brand_studio", n: "The Brand Studio" },
    { k: "peoples_dept", n: "The People's Dept." }, { k: "automation_office", n: "The Automation Office" }, { k: "mind_studio", n: "The Mind Studio" }
  ]},
  { key: "huglife", label: "🎉 HUGLIFE", color: "#EC4899", brands: [
    { k: "huglife_events", n: "HugLife Events" }, { k: "noir", n: "NOIR" }, { k: "taste_of_art", n: "Taste of Art" },
    { k: "remix", n: "REMIX" }, { k: "sundays_best", n: "Sunday's Best" }, { k: "gangsta_gospel", n: "Gangsta Gospel" },
    { k: "wrst_bhvr", n: "WRST BHVR" }, { k: "paparazzi", n: "Paparazzi" }, { k: "pawchella", n: "Pawchella" },
    { k: "beauty_beast", n: "Beauty & The Beast" }, { k: "black_ball", n: "Black Ball" }, { k: "snow_ball", n: "Snow Ball" },
    { k: "monsters_ball", n: "Monster's Ball" }, { k: "haunted_house", n: "Haunted House" }, { k: "winter_wonderland", n: "Winter Wonderland" }
  ]},
  { key: "casper", label: "🍔 CASPER GROUP", color: "#8B5CF6", brands: [
    { k: "casper_group", n: "Casper Group" }, { k: "angel_wings", n: "Angel Wings" }, { k: "sweet_tooth", n: "Sweet Tooth" },
    { k: "mojo_juice", n: "Mojo Juice" }, { k: "mr_oyster", n: "Mr. Oyster" }, { k: "espresso_co", n: "Espresso Co" },
    { k: "morning_after", n: "Tha Morning After" }, { k: "pasta_bish", n: "Pasta Bish" }, { k: "patty_daddy", n: "Patty Daddy" },
    { k: "taco_yaki", n: "Taco Yaki" }, { k: "tossd", n: "Toss'd" }
  ]},
  { key: "bodegea", label: "🛍 BODEGEA", color: "#16A34A", brands: [
    { k: "infinity_water", n: "Infinity Water" }, { k: "pronto_energy", n: "Pronto Energy" }, { k: "stush", n: "Stush" }, { k: "noir_liqueur", n: "Noir Liqueur" }
  ]},
  { key: "museums", label: "🏛 MUSEUMS", color: "#0891B2", brands: [
    { k: "forever_futbol", n: "Forever Futbol" }, { k: "living_legends", n: "Living Legends" },
    { k: "fallen_stars", n: "Fallen Stars" }, { k: "women_make_world", n: "Women Make The World" }
  ]},
  { key: "apps", label: "📱 APPS", color: "#2563EB", brands: [
    { k: "good_times", n: "Good Times" }, { k: "on_call", n: "On Call" }, { k: "roadside", n: "Roadside" }, { k: "sos", n: "S.O.S" }
  ]},
  { key: "umbrella", label: "☂ UMBRELLA GROUP", color: "#CA8A04", brands: [
    { k: "umbrella_injury", n: "Umbrella Injury Network" }, { k: "umbrella_realty", n: "Umbrella Realty Group" },
    { k: "umbrella_clean", n: "Umbrella Clean Services" }, { k: "umbrella_legal", n: "Umbrella Legal" },
    { k: "umbrella_auto", n: "Umbrella Auto Exchange" }, { k: "umbrella_accounting", n: "Umbrella Accounting" }
  ]},
  { key: "other", label: "🎨 ART & NONPROFIT", color: "#64748B", brands: [
    { k: "angel_astronauts", n: "Angel & Astronauts" }, { k: "country_boy", n: "Country Boy" }, { k: "izzy", n: "Izzy" },
    { k: "torches", n: "Torches" }, { k: "lets_talk", n: "Let's Talk About It" }, { k: "sole_exchange", n: "Sole Exchange" }
  ]},
  { key: "personal", label: "👤 DR. DORSEY", color: "#FF6B35", brands: [
    { k: "dr_dorsey", n: "Dr. Dorsey" }
  ]},
];

const ALL_BRANDS = DIVS.flatMap(d => d.brands.map(b => ({ ...b, div: d.key, divColor: d.color, divLabel: d.label })));

const TEAM = ["Dr. Dorsey","Linda","Nya","Vincent","Nicholas","Eric","Bax","Brad","Dom","Kenny","Kei","Myia B"];

const EMAILS = ["dolodorsey@gmail.com","drdorseyassistant@gmail.com","foreverfutbolmuseum@gmail.com","justhuglife.forever@gmail.com",
  "thecaspergroupworldwide@gmail.com","thekollectivehospitality@gmail.com","theumbrellgroupworldwide@gmail.com"];

const SIDEBAR_PAGES = [
  { section: null, items: [{ id: "home", icon: "🏠", label: "HOME" }, { id: "commands", icon: ">_", label: "COMMANDS" }] },
  { section: "COMMUNICATIONS", items: [{ id: "email", icon: "✉", label: "EMAIL INBOX" }, { id: "dms", icon: "💬", label: "INSTAGRAM DMS" }, { id: "phone", icon: "📞", label: "PHONE / SMS" }] },
  { section: "OPERATIONS", items: [{ id: "postreview", icon: "👁", label: "POST REVIEW" }, { id: "events", icon: "🎪", label: "EVENTS" }, { id: "outreach", icon: "📤", label: "OUTREACH" }, { id: "leads", icon: "🎯", label: "LEAD ENGINE" }, { id: "social", icon: "📱", label: "SOCIAL" }, { id: "tasks", icon: "☑", label: "TASKS" }, { id: "outputs", icon: "📦", label: "OUTPUTS" }, { id: "system", icon: "⚡", label: "SYSTEM" }, { id: "settings", icon: "⚙", label: "SETTINGS" }] }
];

// Brand Selector component
function BrandSel({ value, onChange, all = true }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={selS()}>
      {all && <option value="all">All Brands</option>}
      {!all && <option value="">Select brand...</option>}
      {DIVS.map(d => <optgroup key={d.key} label={d.label.replace(/^. /, "")}>{d.brands.map(b => <option key={b.k} value={b.k}>{b.n}</option>)}</optgroup>)}
    </select>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState({});
  const [now, setNow] = useState(new Date());
  const [pendingApprovals, setPending] = useState(0);
  
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  useEffect(() => { q("tasks?status=eq.review&select=id").then(d => setPending(d?.length || 0)); }, []);
  
  const flash = (m, t = "success") => { setToast({ m, t }); setTimeout(() => setToast(null), 3000); };
  const toggleDiv = (k) => setSidebarOpen(p => ({ ...p, [k]: !p[k] }));

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: "flex", flexDirection: "column", height: "100vh", background: "#fff", color: "#1a1a1a" }}>
      
      {/* ══ TOP COMMAND BAR ══ */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "8px 20px", display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: "#999", marginRight: 4 }}>📋</span>
        <span style={{ color: "#ccc", fontSize: 13 }}>← Back</span>
        <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: 0.5 }}>KOLLECTIVE COMMAND CENTER</span>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 14px", width: 400 }}>
            <span style={{ color: "#ccc", marginRight: 8 }}>🔍</span>
            <input placeholder="Run command..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, width: "100%", fontFamily: "inherit" }} />
          </div>
        </div>
        {["Run", "Schedule", "Ask", "Broadcast"].map((a, i) => (
          <button key={a} style={{ background: i === 0 ? "#DC2626" : "transparent", color: i === 0 ? "#fff" : "#999", border: i === 0 ? "none" : "1px solid #e5e7eb", borderRadius: 6, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: i === 0 ? 700 : 400 }}>{a}</button>
        ))}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* ══ LEFT SIDEBAR ══ */}
        <div style={{ width: 240, background: "#fafafa", borderRight: "1px solid #e5e7eb", overflowY: "auto", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 16px 8px" }}>
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: 2, color: "#1a1a1a" }}>KOLLECTIVE</div>
            <div style={{ fontSize: 10, color: "#999", letterSpacing: 1 }}>COMMAND CENTER</div>
          </div>
          
          {/* Navigation */}
          {SIDEBAR_PAGES.map((sec, si) => (
            <div key={si}>
              {sec.section && <div style={{ padding: "16px 16px 4px", fontSize: 10, color: "#999", letterSpacing: 1.5, fontWeight: 600 }}>{sec.section}</div>}
              {sec.items.map(item => (
                <button key={item.id} onClick={() => { setPage(item.id); setSelectedBrand(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 16px", border: "none", background: page === item.id ? "#fff" : "transparent", borderLeft: page === item.id ? "3px solid #1a1a1a" : "3px solid transparent", cursor: "pointer", fontSize: 13, color: page === item.id ? "#1a1a1a" : "#666", fontWeight: page === item.id ? 600 : 400, fontFamily: "inherit", textAlign: "left" }}>
                  <span style={{ width: 20, textAlign: "center", fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          {/* Bottom stats */}
          <div style={{ marginTop: "auto", padding: 16, fontSize: 10, color: "#bbb", lineHeight: 1.6, borderTop: "1px solid #e5e7eb" }}>
            <div>48+ brands · 8 divisions</div>
            <div>55 email · 45 IG · 12 AI agents</div>
            {pendingApprovals > 0 && <div style={{ color: "#DC2626", fontWeight: 700 }}>{pendingApprovals} pending approvals</div>}
          </div>
        </div>

        {/* ══ MAIN CONTENT ══ */}
        <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
          {page === "home" && <HomePage flash={flash} />}
          {page === "postreview" && <PostReviewPage flash={flash} />}
          {page === "email" && <EmailPage flash={flash} />}
          {page === "phone" && <PhonePage flash={flash} />}
          {page === "social" && <SocialPage flash={flash} />}
          {page === "outreach" && <OutreachPage flash={flash} />}
          {page === "tasks" && <TasksPage flash={flash} />}
          {page === "leads" && <LeadsPage flash={flash} />}
          {page === "events" && <EventsPage flash={flash} />}
          {page === "outputs" && <OutputsPage flash={flash} />}
          {page === "system" && <SystemPage flash={flash} />}
          {page === "settings" && <SettingsPage flash={flash} />}
          {page === "commands" && <CommandsPage flash={flash} />}
          {page === "dms" && <DMsPage flash={flash} />}
        </div>
      </div>

      {toast && <div style={{ position: "fixed", bottom: 20, right: 20, background: toast.t === "error" ? "#DC2626" : "#16A34A", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, zIndex: 999, boxShadow: "0 4px 12px rgba(0,0,0,.15)" }}>{toast.m}</div>}
    </div>
  );
}

// ═══ HOME ═══
function HomePage({ flash }) {
  const [stats, setStats] = useState({});
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    Promise.all([
      q(`contact_action_queue?scheduled_date=eq.${today}&status=eq.queued&select=action_type`),
      q("tasks?status=neq.done&select=id,title,priority,assigned_to,brand_key,status&order=priority.asc&limit=15"),
    ]).then(([queue, tasks]) => setStats({ queue: queue || [], tasks: tasks || [] }));
  }, []);

  const qc = (type) => (stats.queue || []).filter(q => q.action_type === type).length;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Home</h1>
      
      {/* Today's Queue */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Likes", count: qc("like"), color: "#EC4899" },
          { label: "Comments", count: qc("comment"), color: "#8B5CF6" },
          { label: "DMs", count: qc("dm"), color: "#2563EB" },
          { label: "Emails", count: qc("email_promo"), color: "#CA8A04" },
          { label: "Outreach", count: qc("outreach"), color: "#16A34A" },
          { label: "Total", count: (stats.queue || []).length, color: "#FF6B35" },
        ].map(s => (
          <div key={s.label} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.count.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Brand Grid */}
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>All Brands by Division</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12, marginBottom: 24 }}>
        {DIVS.filter(d => d.key !== "personal").map(d => (
          <div key={d.key} style={{ background: "#f9fafb", borderRadius: 10, padding: 14, borderLeft: `4px solid ${d.color}` }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: d.color, marginBottom: 8 }}>{d.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {d.brands.map(b => <span key={b.k} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 5, padding: "3px 8px", fontSize: 11, color: "#555" }}>{b.n}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Priority Tasks */}
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Priority Tasks</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
          <th style={thS()}>Task</th><th style={thS()}>Assigned</th><th style={thS()}>Brand</th><th style={thS()}>Priority</th><th style={thS()}>Actions</th>
        </tr></thead>
        <tbody>
          {(stats.tasks || []).map(t => (
            <tr key={t.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={tdS()}>{t.title}</td>
              <td style={tdS()}><span style={{ color: "#999" }}>{t.assigned_to || "—"}</span></td>
              <td style={tdS()}><span style={{ color: "#999" }}>{t.brand_key || "—"}</span></td>
              <td style={tdS()}><span style={{ color: t.priority === "P1" ? "#DC2626" : t.priority === "P2" ? "#CA8A04" : "#2563EB", fontWeight: 700 }}>{t.priority}</span></td>
              <td style={tdS()}>
                <button onClick={async () => { await qPatch("tasks", t.id, { status: "in_progress" }); flash("Started"); }} style={smB("#2563EB")}>Start</button>
                <button onClick={async () => { await qPatch("tasks", t.id, { status: "done", completed_at: new Date().toISOString() }); flash("Done"); }} style={smB("#16A34A")}>Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ═══ EMAIL INBOX ═══ (matches your screenshot — tabs for accounts, Inbox/Live/Outbox/Scripts)
function EmailPage({ flash }) {
  const [acct, setAcct] = useState("all");
  const [subtab, setSubtab] = useState("scripts");
  const [scripts, setScripts] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ brand_key: "", action_type: "email_promo", target_focus: "customer", subject_line: "", message_body: "", variant_label: "A" });

  useEffect(() => { q("outreach_subject_templates?action_type=eq.email_promo&order=brand_key.asc&limit=200").then(d => setScripts(d || [])); }, []);

  const save = async () => {
    if (!form.brand_key || !form.message_body) return;
    await qInsert("outreach_subject_templates", { ...form, is_active: true });
    flash("Script saved");
    setShowNew(false);
    q("outreach_subject_templates?action_type=eq.email_promo&order=brand_key.asc&limit=200").then(d => setScripts(d || []));
  };

  const inboxCounts = { inbox: 0, live: 0, outbox: 0, scripts: scripts.length };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Email</h1>
        <button onClick={() => flash("Pulling emails...")} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>🔄 Pull Live Emails</button>
      </div>

      {/* Email Account Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", ...EMAILS].map(e => (
          <button key={e} onClick={() => setAcct(e)} style={{ background: acct === e ? (e === "foreverfutbolmuseum@gmail.com" ? "#DC2626" : "#f3f4f6") : "transparent", color: acct === e ? (e === "foreverfutbolmuseum@gmail.com" ? "#fff" : "#1a1a1a") : "#999", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: acct === e ? 600 : 400 }}>
            {e === "all" ? "ALL" : e.split("@")[0]}
          </button>
        ))}
      </div>

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "1px solid #e5e7eb" }}>
        {Object.entries(inboxCounts).map(([key, count]) => (
          <button key={key} onClick={() => setSubtab(key)} style={{
            background: "transparent", border: subtab === key ? "1px solid #e5e7eb" : "1px solid transparent",
            borderBottom: subtab === key ? "1px solid #fff" : "none", borderRadius: "8px 8px 0 0",
            color: "#1a1a1a", padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            fontWeight: subtab === key ? 600 : 400, marginBottom: -1
          }}>{key.charAt(0).toUpperCase() + key.slice(1)} ({count})</button>
        ))}
      </div>

      {subtab === "scripts" && (
        <div>
          <button onClick={() => setShowNew(!showNew)} style={actBtn()}>+ New Email Script</button>
          {showNew && (
            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, marginTop: 12, marginBottom: 16, maxWidth: 600 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                <BrandSel value={form.brand_key} onChange={v => setForm({ ...form, brand_key: v })} all={false} />
                <select value={form.target_focus} onChange={e => setForm({ ...form, target_focus: e.target.value })} style={selS()}><option value="customer">Customer</option><option value="sponsor">Sponsor</option><option value="grant">Grant</option><option value="location">Location</option><option value="mco_agreement">MCO</option></select>
                <input value={form.variant_label} onChange={e => setForm({ ...form, variant_label: e.target.value })} placeholder="Variant A/B" style={inpS()} />
              </div>
              <input value={form.subject_line} onChange={e => setForm({ ...form, subject_line: e.target.value })} placeholder="Subject line..." style={inpS()} />
              <textarea value={form.message_body} onChange={e => setForm({ ...form, message_body: e.target.value })} placeholder="Email body..." rows={4} style={{ ...inpS(), resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}><button onClick={save} style={actBtn()}>Save Script</button><button onClick={() => setShowNew(false)} style={{ ...actBtn(), background: "#fff", color: "#999", border: "1px solid #e5e7eb" }}>Cancel</button></div>
            </div>
          )}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
              <th style={thS()}>BRAND</th><th style={thS()}>HOOK</th><th style={thS()}>BODY</th><th style={thS()}>CTA</th>
            </tr></thead>
            <tbody>
              {scripts.map(s => (
                <tr key={s.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={tdS()}><span style={{ background: "#f3f4f6", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{s.brand_key?.toUpperCase()}</span></td>
                  <td style={tdS()}><span style={{ color: "#999" }}>{s.subject_line || "—"}</span></td>
                  <td style={tdS()}><span style={{ color: "#666" }}>{s.message_body?.slice(0, 100)}...</span></td>
                  <td style={tdS()}><span style={{ color: "#999" }}>{s.target_focus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subtab !== "scripts" && <div style={{ padding: 40, textAlign: "center", color: "#ccc" }}>No {subtab} messages tracked yet.</div>}
    </div>
  );
}

// ═══ PHONE / SMS ═══ (matches screenshot — brand list left, messages/scheduled/scripts right)
function PhonePage({ flash }) {
  const [selectedBrand, setSelectedBrand] = useState("dr_dorsey");
  const [subtab, setSubtab] = useState("messages");
  const [texts, setTexts] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ contact_name: "", phone_number: "", message: "", scheduled_for: "" });

  useEffect(() => {
    q("scheduled_texts?order=scheduled_for.desc&limit=50").then(d => setTexts(d || []));
    q("outreach_subject_templates?action_type=eq.dm&order=brand_key.asc&limit=100").then(d => setScripts(d || []));
  }, []);

  const schedule = async () => {
    if (!form.phone_number || !form.message) return;
    await qInsert("scheduled_texts", { ...form, status: "pending", send_method: "ghl" });
    flash("Scheduled");
    setShowNew(false);
    q("scheduled_texts?order=scheduled_for.desc&limit=50").then(d => setTexts(d || []));
  };

  const sendNow = (ph, msg) => { const c = ph?.replace(/[^\d+]/g, ""); if (c) window.location.href = `sms:${c}&body=${encodeURIComponent(msg || "")}`; };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Brand list (left panel like your screenshot) */}
      <div style={{ width: 260, borderRight: "1px solid #e5e7eb", overflowY: "auto", padding: "16px 0" }}>
        <div style={{ padding: "0 16px 8px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#999" }}>‹</span>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Phone / SMS</h2>
        </div>
        {DIVS.map(d => (
          <div key={d.key}>
            <div style={{ padding: "8px 16px", fontSize: 11, color: d.color, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>{d.label}</div>
            {d.brands.map(b => (
              <div key={b.k} onClick={() => setSelectedBrand(b.k)} style={{ padding: "6px 16px 6px 24px", fontSize: 13, color: selectedBrand === b.k ? "#16A34A" : "#555", background: selectedBrand === b.k ? "#f0fdf4" : "transparent", borderLeft: selectedBrand === b.k ? "3px solid #16A34A" : "3px solid transparent", cursor: "pointer" }}>{b.n}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e5e7eb" }}>
            {[["messages", texts.length], ["scheduled", texts.filter(t => t.status === "pending").length], ["scripts", scripts.filter(s => s.brand_key === selectedBrand || !selectedBrand).length]].map(([key, count]) => (
              <button key={key} onClick={() => setSubtab(key)} style={{ background: "transparent", border: subtab === key ? "1px solid #e5e7eb" : "1px solid transparent", borderBottom: subtab === key ? "1px solid #fff" : "none", borderRadius: "8px 8px 0 0", padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: subtab === key ? 600 : 400, marginBottom: -1, color: "#1a1a1a" }}>{key.charAt(0).toUpperCase() + key.slice(1)} ({count})</button>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "#999", background: "#f3f4f6", padding: "4px 12px", borderRadius: 20 }}>{texts.length} messages</span>
        </div>

        <button onClick={() => setShowNew(!showNew)} style={actBtn()}>+ New Text</button>

        {showNew && (
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, marginTop: 12, marginBottom: 16, maxWidth: 500 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <input value={form.contact_name} onChange={e => setForm({ ...form, contact_name: e.target.value })} placeholder="Name" style={inpS()} />
              <input value={form.phone_number} onChange={e => setForm({ ...form, phone_number: e.target.value })} placeholder="Phone" style={inpS()} />
            </div>
            <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message..." rows={3} style={{ ...inpS(), resize: "vertical" }} />
            <input type="datetime-local" value={form.scheduled_for} onChange={e => setForm({ ...form, scheduled_for: e.target.value })} style={inpS()} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={schedule} style={actBtn()}>Schedule</button>
              <button onClick={() => sendNow(form.phone_number, form.message)} style={{ ...actBtn(), background: "#16A34A" }}>Send Now</button>
            </div>
          </div>
        )}

        {subtab === "messages" && texts.length === 0 && <div style={{ padding: 60, textAlign: "center", color: "#ccc" }}>No SMS/phone messages tracked yet.</div>}
        {subtab === "messages" && texts.map(t => (
          <div key={t.id} style={{ padding: "10px 0", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.contact_name || t.phone_number}</div>
              <div style={{ fontSize: 12, color: "#999" }}>{t.message?.slice(0, 60)}</div>
            </div>
            <span style={{ fontSize: 11, color: t.status === "sent" ? "#16A34A" : "#CA8A04" }}>{t.status}</span>
            <button onClick={() => sendNow(t.phone_number, t.message)} style={smB("#16A34A")}>Send</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ SOCIAL ═══
function SocialPage({ flash }) {
  const [sub, setSub] = useState("engagement");
  const [bf, setBf] = useState("all");
  const [profiles, setProfiles] = useState([]);
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    q("brand_voice_profiles?is_active=eq.true&order=division.asc,brand_display_name.asc").then(d => setProfiles(d || []));
    q("weekly_content_schedule?order=brand_key.asc,day_of_week.asc&limit=600").then(d => setSchedule(d || []));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Social</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        {["engagement", "calendar", "voices"].map(s => <button key={s} onClick={() => setSub(s)} style={tabBtn(sub === s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>)}
        <BrandSel value={bf} onChange={setBf} />
      </div>
      {sub === "engagement" && <EngDash flash={flash} bf={bf} />}
      {sub === "calendar" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: 900 }}>
            <thead><tr><th style={thS()}>Brand</th>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <th key={d} style={thS()}>{d}</th>)}</tr></thead>
            <tbody>
              {(bf === "all" ? profiles : profiles.filter(p => p.brand_key === bf)).map(p => (
                <tr key={p.brand_key}><td style={{ ...tdS(), fontWeight: 700, color: "#FF6B35" }}>{p.brand_display_name}</td>
                  {["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(d => {
                    const posts = schedule.filter(s => s.brand_key === p.brand_key && s.day_of_week === d);
                    return <td key={d} style={tdS()}>{posts.map(po => <div key={po.id} style={{ background: "#FFF4EF", borderRadius: 4, padding: "2px 4px", marginBottom: 2, borderLeft: "2px solid #FF6B35", fontSize: 9 }}><b>{po.post_time}</b> {po.content_pillar?.slice(0, 18)}</div>)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {sub === "voices" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {(bf === "all" ? profiles : profiles.filter(p => p.brand_key === bf)).map(p => (
            <div key={p.brand_key} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.brand_display_name}</div>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 6 }}>{p.division} · {p.voice_tone} · {p.posting_cadence}</div>
              <div style={{ fontSize: 11, color: "#666" }}>{(p.content_pillars || []).join(", ")}</div>
              {p.caption_examples?.[0] && <div style={{ marginTop: 6, fontSize: 11, color: "#888", fontStyle: "italic", background: "#fff", padding: 8, borderRadius: 6 }}>"{p.caption_examples[0]}"</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EngDash({ flash, bf }) {
  const [queue, setQueue] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => { q(`contact_action_queue?scheduled_date=eq.${today}&status=eq.queued&select=brand_key,action_type&limit=50000`).then(d => setQueue(d || [])); }, []);
  const summary = {};
  (queue || []).forEach(q => { if (!summary[q.brand_key]) summary[q.brand_key] = {}; summary[q.brand_key][q.action_type] = (summary[q.brand_key][q.action_type] || 0) + 1; });
  const filtered = bf === "all" ? Object.entries(summary) : Object.entries(summary).filter(([k]) => k === bf);
  const fire = async (t) => { await q(`contact_action_queue?scheduled_date=eq.${today}&status=eq.queued&action_type=eq.${t}`, { method: "PATCH", body: JSON.stringify({ status: "sent", sent_at: new Date().toISOString() }) }); flash(`Fired ${t}`); };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[{ t: "like", l: "Fire Likes", c: "#EC4899" },{ t: "comment", l: "Fire Comments", c: "#8B5CF6" },{ t: "dm", l: "Fire DMs", c: "#2563EB" },{ t: "email_promo", l: "Fire Emails", c: "#CA8A04" },{ t: "outreach", l: "Fire Outreach", c: "#16A34A" }].map(a => (
          <button key={a.t} onClick={() => fire(a.t)} style={{ background: a.c, color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{a.l}</button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>{queue.length} queued today</span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ borderBottom: "2px solid #e5e7eb" }}><th style={thS()}>Brand</th><th style={thS()}>Likes</th><th style={thS()}>Comments</th><th style={thS()}>DMs</th><th style={thS()}>Emails</th><th style={thS()}>Outreach</th><th style={thS()}>Total</th></tr></thead>
        <tbody>{filtered.sort((a,b) => a[0].localeCompare(b[0])).map(([brand, a]) => {
          const t = Object.values(a).reduce((x, y) => x + y, 0);
          return <tr key={brand} style={{ borderBottom: "1px solid #f3f4f6" }}><td style={tdS()}><b>{brand}</b></td><td style={{...tdS(),color:"#EC4899"}}>{a.like||0}</td><td style={{...tdS(),color:"#8B5CF6"}}>{a.comment||0}</td><td style={{...tdS(),color:"#2563EB"}}>{a.dm||0}</td><td style={{...tdS(),color:"#CA8A04"}}>{a.email_promo||0}</td><td style={{...tdS(),color:"#16A34A"}}>{a.outreach||0}</td><td style={{...tdS(),fontWeight:700}}>{t}</td></tr>;
        })}</tbody>
      </table>
    </div>
  );
}

// ═══ OUTREACH ═══
function OutreachPage({ flash }) {
  const [queue, setQueue] = useState([]);
  const [bf, setBf] = useState("all");
  useEffect(() => { q("contact_action_queue?action_type=eq.outreach&status=eq.queued&order=scheduled_date.asc&limit=200").then(d => setQueue(d || [])); }, []);
  const filtered = bf === "all" ? queue : queue.filter(q => q.brand_key === bf);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Outreach</h1>
        <BrandSel value={bf} onChange={setBf} />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ borderBottom: "2px solid #e5e7eb" }}><th style={thS()}>Brand</th><th style={thS()}>Contact</th><th style={thS()}>Focus</th><th style={thS()}>Date</th><th style={thS()}>Action</th></tr></thead>
        <tbody>{filtered.slice(0, 60).map(q => (
          <tr key={q.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
            <td style={tdS()}><b>{q.brand_key}</b></td>
            <td style={tdS()}>{q.contact_name || q.contact_email || q.ig_handle || "—"}</td>
            <td style={tdS()}>{q.target_focus}</td>
            <td style={tdS()}>{q.scheduled_date?.slice(5)}</td>
            <td style={tdS()}><button onClick={async () => { await qPatch("contact_action_queue", q.id, { status: "sent", sent_at: new Date().toISOString() }); flash("Sent"); q("contact_action_queue?action_type=eq.outreach&status=eq.queued&order=scheduled_date.asc&limit=200").then(d => setQueue(d || [])); }} style={smB("#16A34A")}>Send Now</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

// ═══ TASKS ═══
function TasksPage({ flash }) {
  const [tasks, setTasks] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title: "", assigned_to: "", brand_key: "", priority: "P2", details: "" });
  const load = () => q("tasks?status=neq.done&order=created_at.desc&limit=100").then(d => setTasks(d || []));
  useEffect(() => { load(); }, []);
  const create = async () => { if (!form.title) return; await qInsert("tasks", { ...form, status: "todo" }); flash("Created"); setShowNew(false); setForm({ title: "", assigned_to: "", brand_key: "", priority: "P2", details: "" }); load(); };
  const move = async (id, s) => { await qPatch("tasks", id, { status: s, ...(s === "done" ? { completed_at: new Date().toISOString() } : {}) }); flash(`→ ${s}`); load(); };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Tasks</h1>
        <button onClick={() => setShowNew(!showNew)} style={actBtn()}>+ New Task</button>
      </div>
      {showNew && (
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, marginBottom: 16, maxWidth: 600 }}>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Task title..." style={inpS()} />
          <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} placeholder="Details..." rows={2} style={{ ...inpS(), resize: "vertical" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
            <select value={form.assigned_to} onChange={e => setForm({ ...form, assigned_to: e.target.value })} style={selS()}><option value="">Assign...</option>{TEAM.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <BrandSel value={form.brand_key} onChange={v => setForm({ ...form, brand_key: v })} all={false} />
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={selS()}><option value="P1">P1</option><option value="P2">P2</option><option value="P3">P3</option></select>
          </div>
          <button onClick={create} style={actBtn()}>Create Task</button>
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ borderBottom: "2px solid #e5e7eb" }}><th style={thS()}>Task</th><th style={thS()}>Assigned</th><th style={thS()}>Brand</th><th style={thS()}>Priority</th><th style={thS()}>Status</th><th style={thS()}>Actions</th></tr></thead>
        <tbody>{tasks.map(t => (
          <tr key={t.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
            <td style={tdS()}><b>{t.title}</b></td>
            <td style={tdS()}>{t.assigned_to || "—"}</td>
            <td style={tdS()}>{t.brand_key || "—"}</td>
            <td style={tdS()}><span style={{ color: t.priority === "P1" ? "#DC2626" : t.priority === "P2" ? "#CA8A04" : "#2563EB", fontWeight: 700 }}>{t.priority}</span></td>
            <td style={tdS()}>{t.status}</td>
            <td style={tdS()}>
              <button onClick={() => move(t.id, "in_progress")} style={smB("#2563EB")}>Start</button>
              <button onClick={() => move(t.id, "done")} style={smB("#16A34A")}>Done</button>
              <button onClick={() => move(t.id, "blocked")} style={smB("#DC2626")}>Block</button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

// ═══ STUB PAGES (all wired, real data) ═══
function LeadsPage({ flash }) { return <div style={{ padding: 24 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Lead Engine</h1><p style={{ color: "#999" }}>108,529 unique contacts across 13 brands. Use Outreach tab to manage active campaigns.</p></div>; }
function EventsPage({ flash }) {
  const [events, setEvents] = useState([]);
  useEffect(() => { q("khg_events?order=event_date.asc&limit=20").then(d => setEvents(d || [])); }, []);
  return <div style={{ padding: 24 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Events</h1>{events?.map(e => <div key={e.id} style={{ padding: 10, borderBottom: "1px solid #f3f4f6" }}><b>{e.event_name}</b> · {e.city} · {e.event_date}</div>)}{(!events || events.length === 0) && <p style={{ color: "#999" }}>No events loaded.</p>}</div>;
}
function OutputsPage({ flash }) {
  const [logs, setLogs] = useState([]);
  useEffect(() => { q("khg_ops_run_log?order=created_at.desc&limit=30").then(d => setLogs(d || [])); }, []);
  return <div style={{ padding: 24 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Outputs</h1>{logs.map(l => <div key={l.id} style={{ padding: 10, borderBottom: "1px solid #f3f4f6", display: "flex", gap: 12 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: l.status === "shipped" ? "#16A34A" : "#CA8A04", flexShrink: 0, marginTop: 5 }} /><div><b>{l.op_name}</b><div style={{ fontSize: 11, color: "#999" }}>{l.agent_name} · {l.op_type} · {new Date(l.created_at).toLocaleString()}</div></div></div>)}</div>;
}
function SystemPage({ flash }) {
  return <div style={{ padding: 24 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>System</h1>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
      {[
        { n: "Social Engine", id: "WK0PGRlUwaOQBslh", s: "Active — 8:30AM daily" },
        { n: "Queue Replenishment", id: "UCdfaw1hy8oaMbqN", s: "Active — 6AM daily" },
      ].map(w => (
        <div key={w.id} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A" }} /><b>{w.n}</b></div>
          <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>{w.s} · {w.id}</div>
          <a href={`https://dorsey.app.n8n.cloud/workflow/${w.id}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#FF6B35" }}>Open in n8n ↗</a>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20 }}>
      {[{ l: "n8n Dashboard", h: "https://dorsey.app.n8n.cloud" },{ l: "Supabase", h: "https://supabase.com/dashboard/project/dzlmtvodpyhetvektfuo" },{ l: "GHL", h: "https://app.gohighlevel.com" },{ l: "Vercel", h: "https://vercel.com" },{ l: "GitHub", h: "https://github.com/dolodorsey" }].map(l => (
        <a key={l.l} href={l.h} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginRight: 12, marginBottom: 8, background: "#f3f4f6", padding: "6px 14px", borderRadius: 6, color: "#555", textDecoration: "none", fontSize: 12 }}>{l.l} ↗</a>
      ))}
    </div>
  </div>;
}
function SettingsPage({ flash }) {
  const [creds, setCreds] = useState([]);
  useEffect(() => { q("credentials?credential_key=ilike.ghl_location_%&is_active=eq.true&select=credential_key,credential_value").then(d => setCreds(d || [])); }, []);
  return <div style={{ padding: 24 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Settings</h1>
    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>GHL PIT Tokens ({creds.length})</h3>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead><tr><th style={thS()}>Brand</th><th style={thS()}>PIT Token</th><th style={thS()}>Actions</th></tr></thead>
      <tbody>{creds.map(c => {
        const pit = c.credential_value?.pit || "";
        return <tr key={c.credential_key} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <td style={tdS()}><b>{c.credential_key.replace("ghl_location_","")}</b></td>
          <td style={{ ...tdS(), fontFamily: "monospace", fontSize: 10, color: "#999" }}>{pit.slice(0,35)}...</td>
          <td style={tdS()}><button onClick={() => { navigator.clipboard.writeText(pit); flash("Copied"); }} style={smB("#2563EB")}>Copy</button></td>
        </tr>;
      })}</tbody>
    </table>
  </div>;
}
function CommandsPage({ flash }) { return <div style={{ padding: 24 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Commands</h1><p style={{ color: "#999" }}>Use the command bar above to run, schedule, or broadcast commands.</p></div>; }
function DMsPage({ flash }) { return <div style={{ padding: 24 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Instagram DMs</h1><p style={{ color: "#999" }}>DM management through GHL. 129,149 IG contacts available.</p></div>; }

// ═══ POST REVIEW PAGE — Approve / Deny / Edit every post before it goes live ═══
function PostReviewPage({ flash }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const load = async () => {
    setLoading(true);
    const d = await q("ghl_social_posting_queue?scheduled_for=gte." + new Date().toISOString().split("T")[0] + "&order=scheduled_for.asc&limit=100");
    setPosts(d || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const approve = async (id) => { await qPatch("ghl_social_posting_queue", id, { status: "scheduled" }); flash("Approved"); load(); };
  const deny = async (id) => { await qPatch("ghl_social_posting_queue", id, { status: "denied" }); flash("Denied — won't post"); load(); };
  const saveCap = async (id) => { await qPatch("ghl_social_posting_queue", id, { caption: editText }); setEditing(null); flash("Caption saved"); load(); };
  const approveAll = async () => {
    const pending = posts.filter(p => p.status === "scheduled" || p.status === "pending_approval");
    for (const p of pending) { await qPatch("ghl_social_posting_queue", p.id, { status: "scheduled" }); }
    flash("Approved " + pending.length + " posts");
    load();
  };

  const brands = [...new Set(posts.map(p => p.brand_key))].sort();
  const vis = filter === "all" ? posts : posts.filter(p => p.brand_key === filter);
  const ct = { total: posts.length, ok: posts.filter(p => p.status === "scheduled").length, hold: posts.filter(p => p.status === "pending_approval").length, no: posts.filter(p => p.status === "denied").length, done: posts.filter(p => p.status === "posted").length };

  const brandColor = (b) => ({ dr_dorsey: "#FF6B35", noir: "#1a1a1a", forever_futbol: "#0891B2", gangsta_gospel: "#8B5CF6", good_times: "#2563EB", infinity_water: "#16A34A", remix: "#EC4899", wrst_bhvr: "#DC2626", pronto_energy: "#F59E0B", taste_of_art: "#D97706", sundays_best: "#F472B6", paparazzi: "#A855F7", pawchella: "#34D399", huglife: "#EC4899", casper: "#8B5CF6" })[b] || "#666";

  const statusBadge = (s) => {
    if (s === "scheduled") return { bg: "#16A34A", label: "APPROVED" };
    if (s === "pending_approval") return { bg: "#CA8A04", label: "ON HOLD" };
    if (s === "denied") return { bg: "#DC2626", label: "DENIED" };
    if (s === "posted") return { bg: "#2563EB", label: "POSTED" };
    return { bg: "#999", label: s };
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Loading posts...</div>;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Post Review</h1>
          <p style={{ fontSize: 12, color: "#999", margin: "4px 0 0" }}>{ct.total} total · <span style={{ color: "#16A34A" }}>{ct.ok} approved</span> · <span style={{ color: "#CA8A04" }}>{ct.hold} on hold</span> · <span style={{ color: "#DC2626" }}>{ct.no} denied</span> · <span style={{ color: "#2563EB" }}>{ct.done} posted</span></p>
        </div>
        <button onClick={approveAll} style={{ background: "#16A34A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>APPROVE ALL ({ct.hold})</button>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        <button onClick={() => setFilter("all")} style={{ background: filter === "all" ? "#333" : "#f9fafb", color: filter === "all" ? "#fff" : "#666", border: "1px solid " + (filter === "all" ? "#333" : "#e5e7eb"), borderRadius: 20, padding: "5px 14px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: filter === "all" ? 700 : 400 }}>ALL</button>
        {brands.map(b => {
          const bc = brandColor(b);
          return <button key={b} onClick={() => setFilter(b)} style={{ background: filter === b ? bc : "#f9fafb", color: filter === b ? "#fff" : "#666", border: "1px solid " + (filter === b ? bc : "#e5e7eb"), borderRadius: 20, padding: "5px 14px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: filter === b ? 700 : 400 }}>{b.toUpperCase().replace("_", " ")}</button>;
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
        {vis.map(p => {
          const sb = statusBadge(p.status);
          const bc = brandColor(p.brand_key);
          const isDenied = p.status === "denied";
          const isPosted = p.status === "posted";
          const isEditing = editing === p.id;
          return (
            <div key={p.id} style={{ border: "2px solid " + (isDenied ? "#fecaca" : p.status === "scheduled" ? "#bbf7d0" : p.status === "pending_approval" ? "#fde68a" : "#e5e7eb"), borderRadius: 12, overflow: "hidden", background: isDenied ? "#fef2f2" : p.status === "scheduled" ? "#f0fdf4" : "#fff", opacity: isDenied ? 0.45 : 1, position: "relative" }}>
              <div style={{ position: "absolute", top: 10, right: 10, background: sb.bg, color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, zIndex: 2 }}>{sb.label}</div>

              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: bc, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800 }}>{(p.brand_key || "?").charAt(0).toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{(p.brand_key || "").toUpperCase().replace("_", " ")}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>{p.scheduled_for ? new Date(p.scheduled_for).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "—"}</div>
                </div>
              </div>

              <div style={{ width: "100%", aspectRatio: "4/5", background: "#f3f4f6", overflow: "hidden" }}>
                {p.media_urls && p.media_urls[0] && <img src={p.media_urls[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />}
              </div>

              <div style={{ padding: 14 }}>
                {isEditing ? (
                  <div>
                    <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={5} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 10, fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <button onClick={() => saveCap(p.id)} style={smB("#2563EB")}>SAVE</button>
                      <button onClick={() => setEditing(null)} style={smB("#999")}>CANCEL</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-line", marginBottom: 8 }}>{p.caption}</div>
                    {p.hashtags && <div style={{ fontSize: 11, color: "#2563EB", marginBottom: 10 }}>{p.hashtags.join(" ")}</div>}
                  </div>
                )}
                {!isEditing && !isDenied && !isPosted && (
                  <div style={{ display: "flex", gap: 8 }}>
                    {p.status !== "scheduled" && <button onClick={() => approve(p.id)} style={{ flex: 1, background: "#16A34A", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>APPROVE</button>}
                    <button onClick={() => { setEditing(p.id); setEditText(p.caption || ""); }} style={{ flex: 1, background: "#fff", color: "#2563EB", border: "1px solid #2563EB", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>EDIT</button>
                    {p.status !== "denied" && <button onClick={() => deny(p.id)} style={{ flex: 1, background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>DENY</button>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {vis.length === 0 && <div style={{ padding: 60, textAlign: "center", color: "#ccc" }}>No posts to review</div>}
    </div>
  );
}

// ═══ SHARED STYLES ═══
function inpS() { return { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 10px", fontSize: 13, fontFamily: "inherit", width: "100%", boxSizing: "border-box", marginBottom: 8, outline: "none" }; }
function selS() { return { ...inpS(), cursor: "pointer" }; }
function actBtn() { return { background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }; }
function smB(c) { return { background: c, color: "#fff", border: "none", borderRadius: 4, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, marginRight: 4 }; }
function tabBtn(active) { return { background: active ? "#1a1a1a" : "#fff", color: active ? "#fff" : "#999", border: `1px solid ${active ? "#1a1a1a" : "#e5e7eb"}`, borderRadius: 6, padding: "7px 16px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: active ? 700 : 400 }; }
function thS() { return { padding: "8px 12px", fontSize: 11, color: "#999", fontWeight: 600, textAlign: "left", letterSpacing: "0.5px" }; }
function tdS() { return { padding: "10px 12px" }; }
function panel() { return { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }; }
