"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const SUPA_URL = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";
const N8N = "https://dorsey.app.n8n.cloud/webhook";
const supa = async (table, query = "") => {
  try { const r = await fetch(`${SUPA_URL}/rest/v1/${table}${query ? "?" + query : ""}`, { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` } }); return r.ok ? await r.json() : []; } catch { return []; }
};
const supaInsert = async (table, data) => {
  try { const r = await fetch(`${SUPA_URL}/rest/v1/${table}`, { method: "POST", headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(data) }); return r.ok ? await r.json() : null; } catch { return null; }
};
const supaUpdate = async (table, match, data) => {
  try { const r = await fetch(`${SUPA_URL}/rest/v1/${table}?${match}`, { method: "PATCH", headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(data) }); return r.ok ? await r.json() : null; } catch { return null; }
};
const triggerN8n = async (wfId, payload = {}) => {
  try { await fetch(`${N8N}/${wfId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); return true; } catch { return false; }
};

const BRANDS = {
  dr_dorsey: { name: "Dr. Dorsey", short: "DORSEY", div: "Personal", color: "#C9A96E", ghl: "FTJ4gOGLsZazXuve0YSY", email: "dolodorsey@gmail.com", ig: "@dolodorsey", site: "doctordorsey.com", promote: true },
  huglife: { name: "HugLife", short: "HUGLIFE", div: "Events", color: "#FF6B35", ghl: "tGbC7nJkOkH5G3RiyjKR", email: "justhuglife.forever@gmail.com", ig: "@just.huglife", site: "huglife.vercel.app", promote: true },
  noir: { name: "NOIR", short: "NOIR", div: "Events", color: "#C9A96E", ghl: "1yiAb0veXWoJ2cH49RKJ", email: "Info@noirworldwide.com", ig: "@thenoir.worldwide", site: "noir-event.vercel.app", dns: true },
  taste_of_art: { name: "Taste of Art", short: "TOA", div: "Events", color: "#A75C43", ghl: "CupYucSXDHojTO36Ouqf", email: "Info@thatasteofart.com", ig: "@thetasteofart", site: "taste-of-art-event.vercel.app" },
  paparazzi: { name: "Paparazzi", short: "PAP", div: "Events", color: "#B73A4B", ghl: "OMWnsG9bJsPAtBfdGFol", email: "thepaparazzipopup@gmail.com", ig: "@thepaparazzipopup", dns: true },
  gangsta_gospel: { name: "Gangsta Gospel", short: "GG", div: "Events", color: "#3C5B8A", ghl: "5ZJEQEjSG9WtteH5Koa7", email: "thegangstagospel@gmail.com", ig: "@thegangstagospel", dns: true },
  sundays_best: { name: "Sunday's Best", short: "SB", div: "Events", color: "#D8BA7C", ghl: "9k7uVVKEd2pVWZY4HPrH", email: "Info@yoursundaysbest.com", ig: "@the.sundays.best", dns: true },
  wrst_bhvr: { name: "WRST BHVR", short: "WRST", div: "Events", color: "#BB2C35", ghl: "kZ5kUYsuk97EUxxNrwnq", email: "Info@thewrstbhvr.com", ig: "@thewrstbhvr", site: "wrst-bhvr-event.vercel.app" },
  remix: { name: "REMIX", short: "REMIX", div: "Events", color: "#B6E03E", ghl: "Q0APYnBlqUKicOQBPxqH", email: "notyouraveragerremix@gmail.com", ig: "@notyouraveragerremix" },
  pawchella: { name: "Pawchella", short: "PAWCH", div: "Events", color: "#4A8A3A", ig: "@pawchella" },
  secret_society: { name: "Secret Society", short: "SS", div: "Events", color: "#2C2C54" },
  beauty_beast: { name: "Beauty & The Beast", short: "B&B", div: "Events", color: "#C9A96E" },
  black_ball: { name: "Black Ball", short: "BB", div: "Events", color: "#1A1A1A" },
  snow_ball: { name: "Snow Ball", short: "SNOW", div: "Events", color: "#B7D4E8" },
  monsters_ball: { name: "Monster's Ball", short: "MB", div: "Events", color: "#6D4AE0" },
  kulture: { name: "The Kulture", short: "KULTURE", div: "Events", color: "#D9B44A", ig: "@thekulture" },
  soul_sessions: { name: "Soul Sessions", short: "SOUL", div: "Events", color: "#D947A8", ig: "@soulsessions" },
  underground_king: { name: "Underground King", short: "UK", div: "Events", color: "#6D4AE0", ig: "@undergroundking" },
  crvngs: { name: "CRVNGS", short: "CRVNGS", div: "Events", color: "#C85A1A", ig: "@crvngs" },
  cinco_de_mayo: { name: "Cinco De Drinko", short: "CINCO", div: "Events", color: "#FF9500" },
  block_party: { name: "Block Party", short: "BLOCK", div: "Events", color: "#FF6B35" },
  parking_lot_pimpin: { name: "Parking Lot Pimpin", short: "PLP", div: "Events", color: "#E67E22" },
  forever_futbol: { name: "Forever Futbol", short: "FF", div: "Museums", color: "#2E8B57", ghl: "GbG9KQGmgIDSvPuYIUf9", email: "foreverfutbolmuseum@gmail.com", ig: "@foreverfutbol.museum", site: "forever-futbol.vercel.app" },
  casper_group: { name: "Casper Group", short: "CASPER", div: "Food", color: "#E74C3C", ghl: "IPP6mHiRgKtIAHOOueHS", email: "info@caspergroupworldwide.com", ig: "@thecaspergroupworldwide", site: "casper-group.vercel.app", subs: ["Angel Wings","Pasta Bish","Taco Yaki","Patty Daddy","Espresso Co.","Morning After","Toss'd","Sweet Tooth","Mojo Juice","Mr. Oyster"] },
  umbrella: { name: "Umbrella Group", short: "UMBRELLA", div: "Services", color: "#3498DB", ghl: "78C8jSFZhpH9MxiKUtFc", email: "theumbrellagroupworldwide@gmail.com", ig: "@theumbrella.group" },
  mind_studio: { name: "Mind Studio", short: "MIND", div: "Services", color: "#9B59B6", ghl: "6h8pNMs7vPOnStVIvGvJ", site: "themindstudioworldwide.com" },
  maga: { name: "MAGA", short: "MAGA", div: "Commerce", color: "#C41E3A", promote: true, site: "makeatlantagreatagain.com", shopify: "makeatlantagreatagain.myshopify.com" },
  infinity_water: { name: "Infinity Water", short: "INF", div: "Products", color: "#0EA5E9", site: "infinity-water.vercel.app" },
  pronto_energy: { name: "Pronto Energy", short: "PRONTO", div: "Products", color: "#EF4444", site: "pronto-energy.vercel.app" },
  stush: { name: "Stush", short: "STUSH", div: "Commerce", color: "#A855F7", shopify: "stushusa.myshopify.com" },
  bodegea: { name: "Bodega", short: "BODEGA", div: "Commerce", color: "#FF9500", shopify: "bodegabodegbodega.myshopify.com" },
  good_times: { name: "Good Times", short: "GT", div: "Apps", color: "#4A9FD5", site: "thegoodtimesworldwide.com" },
};

const DIVS = ["All","Events","Food","Products","Commerce","Services","Museums","Personal","Apps"];
const DNS = ["paparazzi","sundays_best","gangsta_gospel","noir"];
const TEAM = [
  { name: "Linda", role: "VA", focus: "All", dispatch: "bZ4QrBi5QmqICSR8" },
  { name: "Maia", role: "Core", focus: "Content" }, { name: "Nya", role: "Core", focus: "Ops" },
  { name: "Brad", role: "Core", focus: "Casper / Products" }, { name: "Bax", role: "Core", focus: "HugLife / FF" },
  { name: "Brittany", role: "Core", focus: "FF / Umbrella" }, { name: "Alandra", role: "Core", focus: "Casper / FF" },
  { name: "Myia B", role: "Contract", focus: "Mind Studio" },
  { name: "Nicholas", role: "Events", focus: "Tour" }, { name: "Vincent", role: "Events", focus: "Tour" },
  { name: "Dom", role: "Events", focus: "Tour" }, { name: "Eric", role: "Events", focus: "Tour" },
];
const WF = { emailThrottle:"3jDssrDbi21CLhn6",newsletter:"LOuffRVoxtPHsCuZ",socialDMs:"zn2uHhkUROJqKzEG",sponsor:"ThKwcVTGnpXIoOEE",influencer:"0paDyU807bccvZYQ",prPitch:"bGdwLiVFcqP0FcIG",outreachCC:"szlivCBfrDzjoaYx",contentFactory:"T7ZOnFaSEvcYvwbM",lindaDispatch:"bZ4QrBi5QmqICSR8",dailyPoster:"oWAp1njam9bgKhSa",replenish:"UCdfaw1hy8oaMbqN" };

const daysUntil = (d) => Math.ceil((new Date(d+"T12:00:00") - new Date()) / 864e5);
const fmtDate = (d) => new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"});

const Ic = ({d,s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const P = {
  home:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  campaign:"M22 12h-4l-3 9L9 3l-3 9H2",
  calendar:"M3 4h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V6c0-1.1.9-2 2-2z M16 2v4 M8 2v4 M3 10h18",
  approve:"M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  send:"M22 2L11 13 M22 2l-7 20-4-9-9-4z",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  social:"M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  target:"M12 2a10 10 0 100 20 10 10 0 000-20z M12 6a6 6 0 100 12 6 6 0 000-12z M12 10a2 2 0 100 4 2 2 0 000-4z",
  task:"M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  team:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 3a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  zap:"M13 2L3 14h9l-1 8 10-12h-9l1-8",
  dm:"M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z",
  globe:"M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  menu:"M3 12h18 M3 6h18 M3 18h18",
  check:"M20 6L9 17l-5-5", x:"M18 6L6 18 M6 6l12 12",
  link:"M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  plus:"M12 5v14 M5 12h14", edit:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  play:"M5 3l14 9-14 9V3z", refresh:"M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
  search:"M11 3a8 8 0 100 16 8 8 0 000-16z M21 21l-4.35-4.35",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#f6f6f8;--sf:#fff;--sf2:#f0f0f4;--bd:rgba(0,0,0,.06);--bd2:rgba(0,0,0,.12);--tx:#111;--tx2:#555;--tx3:#999;--ac:#FF6B35;--ac2:#ff8f5e;--acBg:rgba(255,107,53,.08);--gn:#22c55e;--rd:#ef4444;--yl:#eab308;--bl:#3b82f6;--pr:#a855f7;--r:10px;--rs:6px;--mn:'DM Mono',monospace;--sn:'DM Sans',sans-serif}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.fi{animation:fi .35s cubic-bezier(.16,1,.3,1) both}
.fd1{animation-delay:.05s}.fd2{animation-delay:.1s}.fd3{animation-delay:.15s}
body{font-family:var(--sn);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:240px;min-width:240px;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column;overflow:hidden;transition:width .25s}
.sb.col{width:52px;min-width:52px}.sb.col .sl,.sb.col .st,.sb.col .bsw,.sb.col .bpill,.sb.col .bd-tag{display:none}.sb.col .ni{justify-content:center;padding:9px 0}
.sbh{padding:14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--bd);cursor:pointer}
.sbh .logo{width:28px;height:28px;border-radius:7px;background:linear-gradient(135deg,#FF6B35,#e04a10);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;color:#000;flex-shrink:0}
.sbh span{font-weight:600;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--tx2)}
.st{padding:14px 14px 4px;font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--tx3)}
.ni{display:flex;align-items:center;gap:8px;padding:7px 14px;cursor:pointer;color:var(--tx2);font-size:12px;transition:all .15s;border-left:2px solid transparent;font-weight:500;white-space:nowrap}
.ni:hover{color:var(--tx);background:rgba(0,0,0,.02)}
.ni.act{color:var(--ac);background:var(--acBg);border-left-color:var(--ac);font-weight:600}
.sl{white-space:nowrap}
.bd-tag{font-size:8px;padding:1px 5px;border-radius:3px;background:rgba(0,0,0,.04);color:var(--tx3);margin-left:auto}
.bsw{margin:8px 12px}.bsw select{width:100%;background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rs);padding:8px 10px;font-size:11px;font-family:var(--sn);font-weight:600;color:var(--tx);cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}
.bpill{display:flex;align-items:center;gap:6px;padding:4px 10px;margin:2px 12px;border-radius:6px;font-size:10px;color:var(--tx3)}
.bpill .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden}
.tb{height:50px;min-height:50px;border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 20px;gap:12px;background:var(--sf)}
.tb-t{font-size:14px;font-weight:600}.tb-s{font-size:11px;color:var(--tx3);font-family:var(--mn)}.tb-r{margin-left:auto;display:flex;gap:8px;align-items:center}
.cnt{flex:1;overflow-y:auto;padding:20px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:16px}
.ct{font-size:13px;font-weight:600;margin-bottom:8px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.sv{font-size:28px;font-weight:700;font-family:var(--mn);line-height:1.1}
.sl2{font-size:9px;color:var(--tx3);margin-top:4px;letter-spacing:.08em;text-transform:uppercase;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:var(--rs);font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid var(--bd);background:var(--sf);color:var(--tx2);font-family:var(--sn);letter-spacing:.02em}
.btn:hover{border-color:var(--bd2);color:var(--tx)}
.btn-p{background:var(--ac);color:#000;border-color:var(--ac)}.btn-p:hover{background:var(--ac2)}
.btn-d{background:var(--rd);color:#fff;border-color:var(--rd)}
.btn-g{background:var(--gn);color:#fff;border-color:var(--gn)}
.btn-sm{padding:5px 10px;font-size:10px}
.badge{display:inline-flex;align-items:center;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
.bg-g{background:rgba(34,197,94,.12);color:#16a34a}.bg-r{background:rgba(239,68,68,.12);color:#dc2626}.bg-y{background:rgba(234,179,8,.12);color:#a16207}.bg-b{background:rgba(59,130,246,.12);color:#2563eb}.bg-o{background:rgba(255,107,53,.12);color:#c2410c}.bg-x{background:rgba(0,0,0,.04);color:var(--tx3)}
.tbl{width:100%;border-collapse:collapse;font-size:12px}.tbl th{text-align:left;padding:8px 10px;color:var(--tx3);font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid var(--bd)}.tbl td{padding:8px 10px;border-bottom:1px solid var(--bd);color:var(--tx2)}.tbl tr:hover td{background:rgba(0,0,0,.015)}
.inp{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rs);padding:8px 12px;color:var(--tx);font-size:12px;font-family:var(--sn);width:100%;outline:none;transition:border-color .15s}.inp:focus{border-color:var(--ac);box-shadow:0 0 0 3px rgba(255,107,53,.08)}
.mono{font-family:var(--mn)}.divider{height:1px;background:var(--bd);margin:16px 0}
.sec-t{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:10px}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0}
.pill{padding:5px 12px;border-radius:20px;font-size:11px;cursor:pointer;transition:all .15s;border:1px solid var(--bd);color:var(--tx3);background:transparent;font-family:var(--sn);font-weight:500}.pill.act{background:var(--ac);color:#000;border-color:var(--ac);font-weight:600}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.row{display:flex;align-items:center;gap:8px}.trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ptr{cursor:pointer}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(0,0,0,.08);border-radius:3px}
@media(max-width:768px){.sb{position:fixed;z-index:100;left:-260px;transition:left .3s}.sb.open{left:0}.g2,.g3,.g4{grid-template-columns:1fr}}
`;

// ═══ SCREENS ═══════════════════════════════════════════════

function MarketingHQ({ brand, bk, navigate }) {
  const [stats, setStats] = useState({});
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const bf = bk === "all" ? "" : `&brand_key=eq.${bk}`;
      const [q, ev, tk] = await Promise.all([
        supa("contact_action_queue", `select=status${bf}&limit=5000`),
        supa("eventbrite_events", `select=event_name,brand_key,event_date,city&is_active=eq.true&event_date=gte.${new Date().toISOString().split("T")[0]}&order=event_date.asc&limit=8`),
        supa("khg_master_tasks", "select=task_key,title,brand,priority,status,assigned_to&status=in.(active,in_progress,blocked,pending)&order=created_at.desc&limit=8"),
      ]);
      const qs = q || [];
      setStats({ queued: qs.filter(x=>x.status==="queued").length, sent: qs.filter(x=>x.status==="sent").length, total: qs.length });
      setEvents(ev || []); setTasks(tk || []); setLoading(false);
    })();
  }, [bk]);
  const ne = events[0]; const dtn = ne ? daysUntil(ne.event_date) : 999;
  return (<div>
    {ne && dtn <= 30 && <div className="card fi" style={{marginBottom:14,borderColor:"rgba(255,107,53,.3)",background:"rgba(255,107,53,.04)",borderLeft:"3px solid var(--ac)"}}>
      <div className="row" style={{justifyContent:"space-between"}}>
        <div className="row" style={{gap:12}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"var(--ac)",animation:"pulse 2s infinite"}} />
          <div><div style={{fontSize:12,fontWeight:700,color:"var(--ac)"}}>WAR ROOM — {ne.event_name}</div>
          <div style={{fontSize:11,color:"var(--tx2)"}}>{ne.city} · {fmtDate(ne.event_date)} · <strong>{dtn} days</strong></div></div>
        </div>
        <button className="btn btn-p btn-sm" onClick={()=>navigate("events")}>Open</button>
      </div>
    </div>}
    <div className="g4 fi" style={{marginBottom:14}}>
      <div className="card ptr" onClick={()=>navigate("outreach")}><div className="sv" style={{color:"var(--bl)"}}>{loading?"—":stats.queued?.toLocaleString()}</div><div className="sl2">Queued Outreach</div></div>
      <div className="card ptr" onClick={()=>navigate("outreach")}><div className="sv" style={{color:"var(--gn)"}}>{loading?"—":stats.sent?.toLocaleString()}</div><div className="sl2">Sent</div></div>
      <div className="card ptr" onClick={()=>navigate("social")}><div className="sv" style={{color:"var(--ac)"}}>{loading?"—":stats.total?.toLocaleString()}</div><div className="sl2">Total Pipeline</div></div>
      <div className="card ptr" onClick={()=>navigate("approvals")}><div className="sv" style={{color:"var(--yl)"}}>—</div><div className="sl2">Pending Approvals</div></div>
    </div>
    <div className="g2 fi fd2" style={{marginBottom:14}}>
      <div className="card" style={{maxHeight:380,overflowY:"auto"}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:10}}><div className="ct" style={{margin:0}}>Upcoming Rollouts</div><button className="btn btn-sm" onClick={()=>navigate("events")}>All Events</button></div>
        {events.map((ev,i) => { const b = BRANDS[ev.brand_key]||{}; const d = daysUntil(ev.event_date); return (
          <div key={i} className="row" style={{padding:"8px 0",borderBottom:"1px solid var(--bd)",gap:10}}>
            <div style={{width:40,textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",color:b.color||"var(--tx3)"}}>{fmtDate(ev.event_date).split(" ")[0]}</div>
              <div className="mono" style={{fontSize:18,fontWeight:700,lineHeight:1.2}}>{new Date(ev.event_date+"T12:00:00").getDate()}</div>
            </div>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{ev.event_name}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{ev.city}</div></div>
            <span className={`badge ${d<=14?"bg-r":d<=30?"bg-y":"bg-x"}`}>{d}d</span>
          </div>);
        })}
      </div>
      <div className="card" style={{maxHeight:380,overflowY:"auto"}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:10}}><div className="ct" style={{margin:0}}>Active Tasks</div><button className="btn btn-sm" onClick={()=>navigate("tasks")}>All</button></div>
        {tasks.map((t,i) => (
          <div key={i} className="row" style={{padding:"8px 0",borderBottom:"1px solid var(--bd)",gap:8}}>
            <span className={`badge ${t.priority==="critical"?"bg-r":t.priority==="high"?"bg-o":"bg-x"}`} style={{width:50,justifyContent:"center"}}>{t.priority}</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}} className="trunc">{t.title}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{t.assigned_to} · {t.status}</div></div>
            <span className={`badge ${t.status==="blocked"?"bg-r":t.status==="in_progress"?"bg-b":"bg-x"}`}>{t.status.replace("_"," ")}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="card fi fd3"><div className="ct">Quick Launch</div><div className="row" style={{gap:8,flexWrap:"wrap"}}>
      <button className="btn btn-p" onClick={()=>navigate("campaigns")}><Ic d={P.campaign} s={14} /> Campaigns</button>
      <button className="btn" onClick={()=>navigate("approvals")}><Ic d={P.approve} s={14} /> Approvals</button>
      <button className="btn" onClick={()=>navigate("outreach")}><Ic d={P.send} s={14} /> Outreach</button>
      <button className="btn" onClick={()=>navigate("social")}><Ic d={P.social} s={14} /> Social</button>
      <button className="btn" onClick={()=>navigate("dms")}><Ic d={P.dm} s={14} /> DMs</button>
      <button className="btn" onClick={()=>navigate("email")}><Ic d={P.mail} s={14} /> Email</button>
      <button className="btn" onClick={()=>navigate("team")}><Ic d={P.team} s={14} /> Team</button>
    </div></div>
  </div>);
}

function CampaignScreen({ bk }) {
  const [camps, setCamps] = useState([]); const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [nc, setNc] = useState({ name:"", brand: bk==="all"?"huglife":bk, type:"event_promo", channels:["email","social","dm"] });
  useEffect(() => {
    (async () => {
      const ev = await supa("eventbrite_events", `select=event_name,brand_key,event_date,city&is_active=eq.true&event_date=gte.${new Date().toISOString().split("T")[0]}&order=event_date.asc&limit=15`);
      setCamps((ev||[]).map(e => ({ name:`${e.event_name} — ${e.city}`, brand:e.brand_key, date:e.event_date, status:daysUntil(e.event_date)<=14?"active":"planned", channels:["email","social","dm"] })));
      setLoading(false);
    })();
  }, []);
  const filtered = bk==="all" ? camps : camps.filter(c=>c.brand===bk);
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700}}>Campaign Builder</div><div style={{fontSize:11,color:"var(--tx3)"}}>Plan and execute marketing rollouts per brand</div></div>
      <button className="btn btn-p" onClick={()=>setCreating(!creating)}><Ic d={P.plus} s={14} /> New Campaign</button>
    </div>
    {creating && <div className="card fi" style={{marginBottom:14,borderColor:"var(--ac)"}}>
      <div className="ct">Create Campaign</div>
      <div className="g3" style={{gap:10}}>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Name</label><input className="inp" value={nc.name} onChange={e=>setNc({...nc,name:e.target.value})} placeholder="e.g. NOIR DC Launch" /></div>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Brand</label><select className="inp" value={nc.brand} onChange={e=>setNc({...nc,brand:e.target.value})}>{Object.entries(BRANDS).map(([k,b])=><option key={k} value={k}>{b.name}</option>)}</select></div>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Type</label><select className="inp" value={nc.type} onChange={e=>setNc({...nc,type:e.target.value})}>{["event_promo","product_launch","brand_awareness","sponsor_outreach","venue_acquisition"].map(t=><option key={t} value={t}>{t.replace(/_/g," ")}</option>)}</select></div>
      </div>
      <div style={{marginTop:10}}><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Channels</label>
        <div className="pills">{["email","social","dm","sms","pr","influencer"].map(ch=><button key={ch} className={`pill ${nc.channels.includes(ch)?"act":""}`} onClick={()=>setNc({...nc,channels:nc.channels.includes(ch)?nc.channels.filter(c=>c!==ch):[...nc.channels,ch]})}>{ch}</button>)}</div>
      </div>
      <div className="row" style={{gap:8,marginTop:8}}>
        <button className="btn btn-p" onClick={()=>{setCamps([{...nc,status:"planned",date:new Date().toISOString().split("T")[0]},...camps]);setCreating(false)}}>Create</button>
        <button className="btn" onClick={()=>setCreating(false)}>Cancel</button>
      </div>
    </div>}
    {loading ? <div className="card" style={{textAlign:"center",padding:32,color:"var(--tx3)"}}>Loading...</div> :
    <div style={{display:"flex",flexDirection:"column",gap:8}}>{filtered.map((c,i) => { const b = BRANDS[c.brand]||{}; const d = daysUntil(c.date); const isDns = DNS.includes(c.brand); return (
      <div key={i} className="card fi" style={{borderLeft:`3px solid ${b.color||"var(--bd)"}`}}>
        <div className="row" style={{justifyContent:"space-between"}}>
          <div className="row" style={{gap:10}}>
            <div className="dot" style={{background:b.color}} />
            <div><div style={{fontSize:13,fontWeight:600}}>{c.name}</div>
              <div className="row" style={{gap:6,marginTop:3}}>
                <span className="badge bg-x">{c.type?.replace(/_/g," ")}</span>
                <span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||b.name}</span>
                {isDns && <span className="badge bg-r">DO NOT SEND</span>}
                {d<=14 && <span className="badge bg-r">{d}d out</span>}
                {d>14 && d<=30 && <span className="badge bg-y">{d}d out</span>}
              </div>
            </div>
          </div>
          <div className="row" style={{gap:6}}>
            <span className={`badge ${c.status==="active"?"bg-g":"bg-x"}`}>{c.status}</span>
            {!isDns && <button className="btn btn-p btn-sm"><Ic d={P.play} s={12} /> Launch</button>}
          </div>
        </div>
        {c.channels && <div className="row" style={{marginTop:8,gap:4}}>{c.channels.map(ch=><span key={ch} className="badge bg-b" style={{fontSize:8}}>{ch}</span>)}</div>}
      </div>);
    })}</div>}
  </div>);
}

function ApprovalsScreen({ bk }) {
  const [emails, setEmails] = useState([]); const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("email"); const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const [em, po] = await Promise.all([
        supa("email_approval_queue", "select=*&order=created_at.desc&limit=30"),
        supa("weekly_content_schedule", "select=id,brand_key,day_of_week,content_pillar,caption_template,visual_type&is_active=eq.true&limit=20"),
      ]);
      setEmails(em||[]); setPosts((po||[]).map(p=>({...p,_st:"pending"}))); setLoading(false);
    })();
  }, []);
  const approveEmail = async (id) => { await supaUpdate("email_approval_queue",`id=eq.${id}`,{approved:true,approved_at:new Date().toISOString(),approved_by:"dr_dorsey"}); setEmails(p=>p.map(e=>e.id===id?{...e,approved:true}:e)); };
  const rejectEmail = async (id) => { setEmails(p=>p.filter(e=>e.id!==id)); };
  const pe = emails.filter(e=>!e.approved); const pp = posts.filter(p=>p._st==="pending");
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700}}>Approval Queue</div><div style={{fontSize:11,color:"var(--tx3)"}}>Nothing sends without your sign-off</div></div>
      <span className="badge bg-r" style={{fontSize:11,padding:"4px 10px"}}>{pe.length+pp.length} pending</span>
    </div>
    <div className="pills fi">
      <button className={`pill ${tab==="email"?"act":""}`} onClick={()=>setTab("email")}>Emails ({pe.length})</button>
      <button className={`pill ${tab==="posts"?"act":""}`} onClick={()=>setTab("posts")}>Posts ({pp.length})</button>
    </div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> : tab==="email" ?
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {emails.length===0 ? <div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)"}}>No emails in queue</div> : emails.map((e,i) => { const b = BRANDS[e.brand_key]||{}; return (
        <div key={i} className="card fi" style={{borderLeft:`3px solid ${e.approved?"var(--gn)":"var(--yl)"}`}}>
          <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
            <div className="row" style={{gap:8}}><span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||e.brand_key}</span><span style={{fontSize:13,fontWeight:600}}>{e.subject||"No Subject"}</span></div>
            <span className={`badge ${e.approved?"bg-g":"bg-y"}`}>{e.approved?"APPROVED":"PENDING"}</span>
          </div>
          <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.5,marginBottom:8}}>{e.body_preview||"—"}</div>
          <div className="row" style={{justifyContent:"space-between"}}>
            <div className="row" style={{gap:6}}>
              <span className="badge bg-x">{e.sequence_type}</span><span className="badge bg-x">Step {e.step_number}</span>
              <span className="badge bg-b">{e.recipient_count||0} recipients</span>
              {e.test_email_sent && <span className="badge bg-g">Test Sent</span>}
            </div>
            {!e.approved && <div className="row" style={{gap:6}}>
              <button className="btn btn-g btn-sm" onClick={()=>approveEmail(e.id)}><Ic d={P.check} s={12} c="#fff" /> Approve</button>
              <button className="btn btn-d btn-sm" onClick={()=>rejectEmail(e.id)}><Ic d={P.x} s={12} c="#fff" /> Reject</button>
            </div>}
          </div>
        </div>);
      })}
    </div> :
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {posts.map((p,i) => { const b = BRANDS[p.brand_key]||{}; return (
        <div key={i} className="card fi" style={{borderLeft:`3px solid ${p._st==="approved"?"var(--gn)":"var(--yl)"}`}}>
          <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
            <div className="row" style={{gap:8}}><span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||p.brand_key}</span><span className="badge bg-x">{p.content_pillar}</span><span className="badge bg-x">{p.day_of_week}</span></div>
            <span className={`badge ${p._st==="approved"?"bg-g":"bg-y"}`}>{p._st}</span>
          </div>
          <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.5,marginBottom:8}}>{p.caption_template||"—"}</div>
          {p._st==="pending" && <div className="row" style={{gap:6}}>
            <button className="btn btn-g btn-sm" onClick={()=>setPosts(x=>x.map(z=>z.id===p.id?{...z,_st:"approved"}:z))}><Ic d={P.check} s={12} c="#fff" /> Approve</button>
            <button className="btn btn-d btn-sm" onClick={()=>setPosts(x=>x.map(z=>z.id===p.id?{...z,_st:"rejected"}:z))}><Ic d={P.x} s={12} c="#fff" /> Reject</button>
            <button className="btn btn-sm"><Ic d={P.edit} s={12} /> Edit</button>
          </div>}
        </div>);
      })}
    </div>}
  </div>);
}

function OutreachScreen({ bk }) {
  const [stats, setStats] = useState({}); const [queue, setQueue] = useState([]); const [loading, setLoading] = useState(true); const [sending, setSending] = useState(false); const [view, setView] = useState("queue");
  useEffect(() => {
    (async () => {
      const bf = bk==="all"?"":"&brand_key=eq."+bk;
      const [cd, qd] = await Promise.all([
        supa("contact_action_queue", `select=status${bf}&limit=5000`),
        supa("contact_action_queue", `select=id,contact_name,contact_email,ig_handle,brand_key,action_type,status,segment_type,contact_city${bf}&order=created_at.desc&limit=40`),
      ]);
      const cs = cd||[];
      setStats({queued:cs.filter(c=>c.status==="queued").length, sent:cs.filter(c=>c.status==="sent").length, pending:cs.filter(c=>c.status==="pending").length, total:cs.length});
      setQueue(qd||[]); setLoading(false);
    })();
  }, [bk]);
  const launch = async (type) => { setSending(true); const m={email:WF.emailThrottle,dm:WF.socialDMs,pr:WF.prPitch,sponsor:WF.sponsor,influencer:WF.influencer}; await triggerN8n(m[type]||WF.outreachCC,{action:"execute",type,brand:bk,source:"dashboard"}); setSending(false); };
  const isDns = bk!=="all" && DNS.includes(bk);
  return (<div>
    <div className="g4 fi" style={{marginBottom:14}}>
      <div className="card"><div className="sv" style={{color:"var(--bl)"}}>{loading?"—":stats.queued?.toLocaleString()}</div><div className="sl2">Queued</div></div>
      <div className="card"><div className="sv" style={{color:"var(--gn)"}}>{loading?"—":stats.sent?.toLocaleString()}</div><div className="sl2">Sent</div></div>
      <div className="card"><div className="sv" style={{color:"var(--yl)"}}>{loading?"—":stats.pending?.toLocaleString()}</div><div className="sl2">Pending</div></div>
      <div className="card"><div className="sv" style={{color:"var(--ac)"}}>{loading?"—":stats.total?.toLocaleString()}</div><div className="sl2">Total</div></div>
    </div>
    <div className="card fi fd1" style={{marginBottom:14}}>
      <div className="ct">Launch Outreach</div>
      <div className="row" style={{gap:8,flexWrap:"wrap"}}>
        {[{l:"Email Blast",t:"email",i:P.mail},{l:"DM Campaign",t:"dm",i:P.dm},{l:"PR Pitch",t:"pr",i:P.send},{l:"Sponsors",t:"sponsor",i:P.target},{l:"Influencer",t:"influencer",i:P.team}].map(a=>
          <button key={a.t} className={`btn ${isDns?"":"btn-p"}`} disabled={sending||isDns} onClick={()=>!isDns&&launch(a.t)}><Ic d={a.i} s={14} /> {a.l}{isDns?" (BLOCKED)":""}</button>
        )}
      </div>
      {isDns && <div style={{marginTop:8,fontSize:11,color:"var(--rd)",fontWeight:500}}>This brand is in DO NOT SEND — outreach blocked</div>}
    </div>
    <div className="card fi fd2">
      <div className="row" style={{justifyContent:"space-between",marginBottom:10}}>
        <div className="ct" style={{margin:0}}>Queue</div>
        <div className="pills" style={{margin:0}}><button className={`pill ${view==="queue"?"act":""}`} onClick={()=>setView("queue")}>Queued</button><button className={`pill ${view==="sent"?"act":""}`} onClick={()=>setView("sent")}>Sent</button></div>
      </div>
      <table className="tbl"><thead><tr><th>Contact</th><th>Brand</th><th>Type</th><th>Segment</th><th>City</th><th>Status</th></tr></thead>
      <tbody>{queue.filter(q=>view==="queue"?q.status!=="sent":q.status==="sent").slice(0,20).map((q,i) => { const b=BRANDS[q.brand_key]||{}; return (
        <tr key={i}><td style={{fontWeight:500}}>{q.contact_name||q.ig_handle||q.contact_email||"—"}</td>
        <td><span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||q.brand_key}</span></td>
        <td><span className="badge bg-x">{q.action_type}</span></td><td style={{fontSize:11}}>{q.segment_type||"—"}</td><td style={{fontSize:11}}>{q.contact_city||"—"}</td>
        <td><span className={`badge ${q.status==="sent"?"bg-g":q.status==="queued"?"bg-b":"bg-x"}`}>{q.status}</span></td></tr>);
      })}</tbody></table>
    </div>
  </div>);
}

function SocialScreen({ bk }) {
  const [sched, setSched] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { const bf=bk==="all"?"":"&brand_key=eq."+bk; const d=await supa("weekly_content_schedule",`select=*&is_active=eq.true${bf}&order=brand_key,day_of_week&limit=50`); setSched(d||[]); setLoading(false); })(); }, [bk]);
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const byDay = days.map(d=>({day:d,posts:sched.filter(s=>s.day_of_week===d)}));
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700}}>Social Manager</div><div style={{fontSize:11,color:"var(--tx3)"}}>{sched.length} active slots</div></div>
      <div className="row" style={{gap:6}}>
        <button className="btn btn-p btn-sm" onClick={()=>triggerN8n(WF.dailyPoster,{action:"run_now"})}><Ic d={P.zap} s={12} /> Run Poster</button>
        <button className="btn btn-sm" onClick={()=>triggerN8n(WF.replenish,{action:"replenish"})}><Ic d={P.refresh} s={12} /> Replenish</button>
      </div>
    </div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> :
    <div style={{display:"flex",flexDirection:"column",gap:10}}>{byDay.filter(d=>d.posts.length>0).map((d,di) => (
      <div key={di} className="card fi">
        <div className="row" style={{justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:13,fontWeight:600}}>{d.day}</div><span className="badge bg-x">{d.posts.length} posts</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>{d.posts.map((p,pi) => { const b=BRANDS[p.brand_key]||{}; return (
          <div key={pi} className="row" style={{padding:"6px 0",borderBottom:"1px solid var(--bd)",gap:8}}>
            <span className="mono" style={{fontSize:10,color:"var(--tx3)",width:40}}>{p.post_time}</span>
            <span className="dot" style={{background:b.color||"#888"}} /><span style={{fontSize:11,fontWeight:500,width:70}} className="trunc">{b.short||p.brand_key}</span>
            <span className="badge bg-x" style={{fontSize:8}}>{p.content_pillar}</span><span className="badge bg-b" style={{fontSize:8}}>{p.visual_type}</span>
            <span style={{flex:1,fontSize:11,color:"var(--tx2)"}} className="trunc">{p.caption_template}</span>
          </div>);
        })}</div>
      </div>
    ))}</div>}
  </div>);
}

function EventsScreen({ bk }) {
  const [events, setEvents] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { const d=await supa("eventbrite_events",`select=*&is_active=eq.true&event_date=gte.${new Date().toISOString().split("T")[0]}&order=event_date.asc&limit=40`); setEvents(d||[]); setLoading(false); })(); }, []);
  const filtered = bk==="all"?events:events.filter(e=>e.brand_key===bk);
  const byMonth = {}; filtered.forEach(ev => { const m=new Date(ev.event_date+"T12:00:00").toLocaleDateString("en-US",{month:"long",year:"numeric"}); if(!byMonth[m])byMonth[m]=[]; byMonth[m].push(ev); });
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div style={{fontSize:16,fontWeight:700}}>Event Rollouts</div>
      <span className="badge bg-o" style={{padding:"5px 12px",fontSize:11}}>{filtered.length} upcoming</span>
    </div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> :
    Object.entries(byMonth).map(([month,evs]) => (
      <div key={month} style={{marginBottom:20}}>
        <div className="sec-t">{month} ({evs.length})</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>{evs.map((ev,i) => { const b=BRANDS[ev.brand_key]||{}; const d=daysUntil(ev.event_date); return (
          <div key={i} className="card fi row" style={{gap:14,borderLeft:`3px solid ${b.color||"var(--bd)"}`}}>
            <div style={{width:48,textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",color:b.color||"var(--tx3)"}}>{fmtDate(ev.event_date).split(" ")[0]}</div>
              <div className="mono" style={{fontSize:22,fontWeight:700,lineHeight:1.2}}>{new Date(ev.event_date+"T12:00:00").getDate()}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600}}>{ev.event_name}</div>
              <div className="row" style={{gap:6,marginTop:4}}>
                <span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||ev.brand_key}</span>
                <span className="badge bg-x">{ev.city}</span>
                {ev.event_type && <span className="badge bg-b">{ev.event_type.replace(/_/g," ")}</span>}
                <span className={`badge ${d<=14?"bg-r":d<=30?"bg-y":"bg-g"}`}>{d}d</span>
              </div>
            </div>
            <div className="row" style={{gap:6}}>
              {ev.eventbrite_url && <a href={ev.eventbrite_url} target="_blank" rel="noopener" className="btn btn-sm"><Ic d={P.link} s={12} /> Tickets</a>}
              <button className="btn btn-p btn-sm"><Ic d={P.campaign} s={12} /> Campaign</button>
            </div>
          </div>);
        })}</div>
      </div>
    ))}
  </div>);
}

function DMScreen({ bk }) {
  const [queue, setQueue] = useState([]); const [loading, setLoading] = useState(true); const [sending, setSending] = useState(false);
  const [dm, setDm] = useState({handle:"",message:"",brand:bk==="all"?"huglife":bk});
  const templates = [
    {name:"Cold Intro — Venue",body:"Hey [name] — love what y'all are building at [venue]. We're producing [event] on [date] in [city] and your space is exactly the energy. Worth a quick chat?"},
    {name:"Cold Intro — Sponsor",body:"Hey [name] — [brand] keeps showing up in our world. We're activating [event] across [cities] this year and I think there's a play. 5 min?"},
    {name:"Collab Pitch",body:"Hey [name] — been watching your content. We're doing something special with [event] and I think you'd be perfect for it. DM me back."},
    {name:"Follow-Up",body:"Hey [name] — circling back on [topic]. Still interested in connecting. Let me know what works."},
    {name:"Post-Event",body:"Hey [name] — appreciate you pulling up to [event]. That energy was everything. More coming soon."},
  ];
  useEffect(() => { (async () => { const d=await supa("contact_action_queue","action_type=eq.dm&select=id,contact_name,ig_handle,brand_key,status,segment_type&order=created_at.desc&limit=30"); setQueue(d||[]); setLoading(false); })(); }, []);
  const sendDM = async () => { if(!dm.handle||!dm.message) return; setSending(true); await triggerN8n(WF.socialDMs,{action:"send_single",handle:dm.handle,message:dm.message,entity:dm.brand}); setQueue(p=>[{ig_handle:dm.handle,brand_key:dm.brand,status:"sent",contact_name:dm.handle},...p]); setDm({handle:"",message:"",brand:dm.brand}); setSending(false); };
  return (<div>
    <div className="g2 fi">
      <div className="card"><div className="ct">Compose DM</div>
        <div className="row" style={{gap:8,marginBottom:8}}>
          <input className="inp" placeholder="@handle" value={dm.handle} onChange={e=>setDm({...dm,handle:e.target.value})} style={{flex:1}} />
          <select className="inp" value={dm.brand} onChange={e=>setDm({...dm,brand:e.target.value})} style={{width:130}}>{Object.entries(BRANDS).filter(([,b])=>b.ig).map(([k,b])=><option key={k} value={k}>{b.name}</option>)}</select>
        </div>
        <textarea className="inp" placeholder="Message..." value={dm.message} onChange={e=>setDm({...dm,message:e.target.value})} style={{minHeight:80,resize:"vertical"}} />
        <button className="btn btn-p" style={{marginTop:8,width:"100%"}} onClick={sendDM} disabled={sending}>{sending?"Sending...":"Send DM"}</button>
      </div>
      <div className="card" style={{maxHeight:300,overflowY:"auto"}}><div className="ct">Templates</div>
        {templates.map((t,i)=><div key={i} style={{padding:"8px 0",borderBottom:"1px solid var(--bd)",cursor:"pointer"}} onClick={()=>setDm({...dm,message:t.body})}>
          <div style={{fontSize:12,fontWeight:500,color:"var(--ac)"}}>{t.name}</div><div style={{fontSize:10,color:"var(--tx3)",marginTop:2}}>{t.body.slice(0,80)}...</div>
        </div>)}
      </div>
    </div>
    <div className="card fi fd1" style={{marginTop:14}}>
      <div className="row" style={{justifyContent:"space-between",marginBottom:10}}>
        <div className="ct" style={{margin:0}}>DM Queue</div>
        <button className="btn btn-p btn-sm" disabled={sending} onClick={async()=>{setSending(true);await triggerN8n(WF.socialDMs,{action:"send_all_queued"});setSending(false)}}>Send All ({queue.filter(q=>q.status==="queued").length})</button>
      </div>
      <table className="tbl"><thead><tr><th>Handle</th><th>Brand</th><th>Segment</th><th>Status</th></tr></thead>
      <tbody>{queue.map((q,i)=>{const b=BRANDS[q.brand_key]||{};return(<tr key={i}><td style={{fontWeight:500}}>{q.ig_handle||q.contact_name}</td><td><span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||q.brand_key}</span></td><td style={{fontSize:11}}>{q.segment_type||"—"}</td><td><span className={`badge ${q.status==="sent"?"bg-g":"bg-b"}`}>{q.status}</span></td></tr>)})}</tbody></table>
    </div>
  </div>);
}

function EmailScreen({ bk }) {
  const [composing, setComposing] = useState(false); const [sending, setSending] = useState(false);
  const [email, setEmail] = useState({to:"",subject:"",body:""});
  const mbs = [{dest:"HugLife / Events",email:"justhuglife.forever@gmail.com",cc:"dolodorsey@gmail.com"},{dest:"Casper Group",email:"info@caspergroupworldwide.com"},{dest:"Umbrella Group",email:"theumbrellagroupworldwide@gmail.com"},{dest:"Forever Futbol",email:"foreverfutbolmuseum@gmail.com"},{dest:"Dr. Dorsey",email:"dolodorsey@gmail.com"},{dest:"Business",email:"thedoctordorsey@gmail.com"},{dest:"Ops",email:"drdorseyassistant@gmail.com"},{dest:"Company-wide",email:"thekollectivehospitality@gmail.com"}];
  const [sel, setSel] = useState(0);
  const sendEmail = async () => { setSending(true); await triggerN8n(WF.emailThrottle,{action:"send",from:mbs[sel].email,to:email.to,subject:email.subject,body:email.body,brand:bk}); setEmail({to:"",subject:"",body:""}); setComposing(false); setSending(false); };
  return (<div><div className="g2 fi">
    <div className="card" style={{maxHeight:500,overflowY:"auto"}}><div className="ct">Mailboxes</div>
      {mbs.map((m,i)=><div key={i} className="ptr" style={{padding:"10px 8px",borderBottom:"1px solid var(--bd)",background:sel===i?"var(--acBg)":"transparent",borderRadius:4}} onClick={()=>setSel(i)}>
        <div style={{fontSize:12,fontWeight:sel===i?600:400,color:sel===i?"var(--ac)":"var(--tx)"}}>{m.dest}</div>
        <div className="mono" style={{fontSize:10,color:"var(--tx3)"}}>{m.email}</div>
      </div>)}
    </div>
    <div className="card"><div className="ct">{mbs[sel].dest}</div><div className="mono" style={{fontSize:11,color:"var(--ac)",marginBottom:12}}>{mbs[sel].email}</div>
      {composing ? <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <input className="inp" placeholder="To: email@example.com" value={email.to} onChange={e=>setEmail({...email,to:e.target.value})} />
        <input className="inp" placeholder="Subject" value={email.subject} onChange={e=>setEmail({...email,subject:e.target.value})} />
        <textarea className="inp" placeholder="Body..." value={email.body} onChange={e=>setEmail({...email,body:e.target.value})} style={{minHeight:120,resize:"vertical"}} />
        <div className="row" style={{gap:8}}><button className="btn btn-p" onClick={sendEmail} disabled={sending}>{sending?"Sending...":"Send"}</button><button className="btn" onClick={()=>setComposing(false)}>Cancel</button></div>
      </div> : <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <button className="btn btn-p" style={{width:"100%"}} onClick={()=>setComposing(true)}><Ic d={P.mail} s={14} /> Compose</button>
        <button className="btn" style={{width:"100%"}} onClick={()=>triggerN8n(WF.newsletter,{action:"send"})}><Ic d={P.send} s={14} /> Newsletter</button>
        <button className="btn" style={{width:"100%"}} onClick={()=>triggerN8n(WF.prPitch,{action:"send"})}><Ic d={P.zap} s={14} /> PR Pitch</button>
      </div>}
      <div className="divider" /><div className="sec-t">Warmup Rules</div>
      <div style={{fontSize:11,color:"var(--tx3)",lineHeight:1.6}}>Day 1-3: 25/day → Day 4-7: 50 → Day 8-14: 100 → Day 15-21: 250 → Day 22+: 500/day</div>
    </div>
  </div></div>);
}

function TasksScreen() {
  const [tasks, setTasks] = useState([]); const [loading, setLoading] = useState(true); const [filter, setFilter] = useState("all");
  useEffect(() => { (async () => { const d=await supa("khg_master_tasks","select=*&status=in.(active,in_progress,blocked,pending)&order=priority,created_at.desc&limit=40"); setTasks(d||[]); setLoading(false); })(); }, []);
  const filtered = filter==="all"?tasks:tasks.filter(t=>t.status===filter);
  const sc = {all:tasks.length, active:tasks.filter(t=>t.status==="active").length, in_progress:tasks.filter(t=>t.status==="in_progress").length, blocked:tasks.filter(t=>t.status==="blocked").length};
  return (<div>
    <div className="pills fi">{["all","active","in_progress","blocked"].map(f=><button key={f} className={`pill ${filter===f?"act":""}`} onClick={()=>setFilter(f)}>{f.replace("_"," ")} ({sc[f]||0})</button>)}</div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> :
    <div style={{display:"flex",flexDirection:"column",gap:6}}>{filtered.map((t,i)=>(
      <div key={i} className="card fi row" style={{gap:10,borderLeft:`3px solid ${t.priority==="critical"?"var(--rd)":t.priority==="high"?"var(--ac)":"var(--bd)"}`}}>
        <div style={{flex:1}}>
          <div className="row" style={{gap:6,marginBottom:4}}>
            <span className="mono" style={{fontSize:9,color:"var(--tx3)"}}>{t.task_key}</span>
            <span className={`badge ${t.priority==="critical"?"bg-r":t.priority==="high"?"bg-o":"bg-x"}`}>{t.priority}</span>
            <span className={`badge ${t.status==="blocked"?"bg-r":t.status==="in_progress"?"bg-b":"bg-x"}`}>{t.status.replace("_"," ")}</span>
          </div>
          <div style={{fontSize:13,fontWeight:600}}>{t.title}</div>
          <div style={{fontSize:11,color:"var(--tx3)",marginTop:2}}>{t.assigned_to} · {t.category}</div>
        </div>
      </div>
    ))}</div>}
  </div>);
}

function TeamScreen() {
  const [taskText, setTaskText] = useState(""); const [dispatching, setDispatching] = useState(null); const [sent, setSent] = useState(null);
  const dispatch = async (m) => { if(!taskText) return; setDispatching(m.name); if(m.dispatch) await triggerN8n(m.dispatch,{task:taskText,assignee:m.name}); await supaInsert("khg_master_tasks",{title:taskText,assigned_to:m.name.toLowerCase(),status:"active",priority:"medium",category:"dispatched",created_by:"dr_dorsey"}); setSent(m.name); setTaskText(""); setDispatching(null); setTimeout(()=>setSent(null),3000); };
  return (<div>
    <div className="card fi" style={{marginBottom:14}}><div className="ct">Quick Dispatch</div><input className="inp" placeholder="Task description..." value={taskText} onChange={e=>setTaskText(e.target.value)} />
      {sent && <div style={{marginTop:6,fontSize:11,color:"var(--gn)",fontWeight:500}}>Dispatched to {sent}</div>}
    </div>
    <div className="g3 fi fd1">{TEAM.map((m,i)=>(
      <div key={i} className="card">
        <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
          <div><div style={{fontSize:14,fontWeight:600}}>{m.name}</div><div style={{fontSize:11,color:"var(--tx3)"}}>{m.role} · {m.focus}</div></div>
          {m.dispatch && <span className="badge bg-g">Auto</span>}
        </div>
        <button className="btn btn-p btn-sm" style={{width:"100%",justifyContent:"center",marginTop:6}} onClick={()=>dispatch(m)} disabled={!taskText||dispatching===m.name}>{dispatching===m.name?"...":"Dispatch"}</button>
      </div>
    ))}</div>
  </div>);
}

function BrandDirectory() {
  const [search, setSearch] = useState(""); const [divF, setDivF] = useState("All");
  const filtered = Object.entries(BRANDS).filter(([k,b])=>{ if(divF!=="All"&&b.div!==divF) return false; if(search&&!b.name.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  return (<div>
    <div className="row fi" style={{gap:10,marginBottom:14}}>
      <input className="inp" placeholder="Search brands..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:280}} />
      <div className="pills" style={{margin:0}}>{DIVS.map(d=><button key={d} className={`pill ${divF===d?"act":""}`} onClick={()=>setDivF(d)}>{d}</button>)}</div>
    </div>
    <div className="g3 fi fd1">{filtered.map(([k,b])=>(
      <div key={k} className="card" style={{borderTop:`3px solid ${b.color}`}}>
        <div className="row" style={{justifyContent:"space-between",marginBottom:8}}>
          <div><div style={{fontSize:14,fontWeight:700}}>{b.name}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{b.div}{b.dns?" · DO NOT SEND":""}{b.promote?" · PROMOTES ALL":""}</div></div>
          <div className="dot" style={{background:b.color,width:12,height:12}} />
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3,fontSize:11}}>
          {b.ig && <div className="row" style={{gap:4}}><Ic d={P.social} s={11} c="var(--tx3)" /><span style={{color:"var(--tx2)"}}>{b.ig}</span></div>}
          {b.email && <div className="row" style={{gap:4}}><Ic d={P.mail} s={11} c="var(--tx3)" /><span className="trunc" style={{color:"var(--tx2)"}}>{b.email}</span></div>}
          {b.site && <div className="row" style={{gap:4}}><Ic d={P.globe} s={11} c="var(--tx3)" /><a href={`https://${b.site}`} target="_blank" rel="noopener" style={{color:"var(--ac)",textDecoration:"none"}}>{b.site}</a></div>}
          {b.ghl && <div className="row" style={{gap:4}}><Ic d={P.target} s={11} c="var(--tx3)" /><span className="mono" style={{color:"var(--tx3)",fontSize:9}}>GHL: {b.ghl.slice(0,10)}...</span></div>}
          {b.shopify && <div className="row" style={{gap:4}}><Ic d={P.link} s={11} c="var(--tx3)" /><span style={{color:"var(--tx3)",fontSize:10}}>{b.shopify}</span></div>}
        </div>
        {b.subs && <div style={{marginTop:8,paddingTop:6,borderTop:"1px solid var(--bd)"}}>
          <div style={{fontSize:9,color:"var(--tx3)",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em"}}>Sub-brands</div>
          <div className="row" style={{flexWrap:"wrap",gap:4}}>{b.subs.map(s=><span key={s} className="badge bg-x">{s}</span>)}</div>
        </div>}
      </div>
    ))}</div>
  </div>);
}

// ═══ MAIN APP ══════════════════════════════════════════════

export default function KHGDashboard() {
  const [screen, setScreen] = useState("home");
  const [sbOpen, setSbOpen] = useState(true);
  const [activeBrand, setActiveBrand] = useState("all");
  const brand = activeBrand === "all" ? null : BRANDS[activeBrand];
  const bk = activeBrand;
  const navigate = useCallback((s) => setScreen(s), []);

  const navSections = [
    { title: "Execution", items: [
      { id:"home", label:"Marketing HQ", icon:P.home },
      { id:"campaigns", label:"Campaigns", icon:P.campaign },
      { id:"approvals", label:"Approvals", icon:P.approve },
    ]},
    { title: "Channels", items: [
      { id:"outreach", label:"Outreach Engine", icon:P.send },
      { id:"social", label:"Social Manager", icon:P.social },
      { id:"dms", label:"DM Center", icon:P.dm },
      { id:"email", label:"Email Hub", icon:P.mail },
    ]},
    { title: "Ops", items: [
      { id:"events", label:"Event Rollouts", icon:P.calendar },
      { id:"tasks", label:"Tasks", icon:P.task },
      { id:"team", label:"Team Dispatch", icon:P.team },
      { id:"directory", label:"Brand Directory", icon:P.globe },
    ]},
  ];
  const titles = {home:"Marketing HQ",campaigns:"Campaigns",approvals:"Approvals",outreach:"Outreach Engine",social:"Social Manager",dms:"DM Center",email:"Email Hub",events:"Event Rollouts",tasks:"Tasks",team:"Team Dispatch",directory:"Brand Directory"};
  const renderScreen = () => {
    switch(screen) {
      case "home": return <MarketingHQ brand={brand} bk={bk} navigate={navigate} />;
      case "campaigns": return <CampaignScreen bk={bk} />;
      case "approvals": return <ApprovalsScreen bk={bk} />;
      case "outreach": return <OutreachScreen bk={bk} />;
      case "social": return <SocialScreen bk={bk} />;
      case "events": return <EventsScreen bk={bk} />;
      case "dms": return <DMScreen bk={bk} />;
      case "email": return <EmailScreen bk={bk} />;
      case "tasks": return <TasksScreen />;
      case "team": return <TeamScreen />;
      case "directory": return <BrandDirectory />;
      default: return <MarketingHQ brand={brand} bk={bk} navigate={navigate} />;
    }
  };
  return (<>
    <style>{css}</style>
    <div className="app">
      <div className={`sb ${sbOpen?"":"col"}`}>
        <div className="sbh" onClick={()=>setSbOpen(!sbOpen)}><div className="logo">K</div><span>111 ATL</span></div>
        <div className="bsw"><select value={activeBrand} onChange={e=>setActiveBrand(e.target.value)}>
          <option value="all">ALL BRANDS</option>
          {DIVS.filter(d=>d!=="All").map(div=><optgroup key={div} label={div}>{Object.entries(BRANDS).filter(([,b])=>b.div===div).map(([k,b])=><option key={k} value={k}>{b.name}{b.dns?" ⛔":""}</option>)}</optgroup>)}
        </select></div>
        {brand && <div className="bpill"><div className="dot" style={{background:brand.color}} /><span style={{fontWeight:500,color:"var(--tx2)"}}>{brand.name}</span>
          {brand.dns && <span className="badge bg-r" style={{marginLeft:"auto"}}>DNS</span>}
          {brand.promote && <span className="badge bg-g" style={{marginLeft:"auto"}}>PROMO</span>}
        </div>}
        <div style={{flex:1,overflowY:"auto",paddingBottom:20}}>
          {navSections.map(sec=>(<div key={sec.title}><div className="st">{sec.title}</div>
            {sec.items.map(item=>(<div key={item.id} className={`ni ${screen===item.id?"act":""}`} onClick={()=>navigate(item.id)}><Ic d={item.icon} s={15} /><span className="sl">{item.label}</span></div>))}
          </div>))}
        </div>
      </div>
      <div className="mn">
        <div className="tb">
          <div className="ptr" onClick={()=>setSbOpen(!sbOpen)}><Ic d={P.menu} s={18} /></div>
          <div className="tb-t">{titles[screen]}</div>
          {brand && <span className="badge" style={{background:`${brand.color}18`,color:brand.color,padding:"3px 10px",fontSize:11}}>{brand.name}</span>}
          <div className="tb-r">
            <span className="tb-s">{new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
            <div className="row" style={{gap:4}}><div style={{width:6,height:6,borderRadius:"50%",background:"var(--gn)",boxShadow:"0 0 8px var(--gn)"}} /><span style={{fontSize:9,fontWeight:600,color:"var(--gn)",letterSpacing:".06em"}}>LIVE</span></div>
          </div>
        </div>
        <div className="cnt">{renderScreen()}</div>
      </div>
    </div>
  </>);
}
