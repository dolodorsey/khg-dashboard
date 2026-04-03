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
const MOTHERS = [
  { key: "all", name: "ALL BRANDS", color: "#FF6B35" },
  { key: "huglife", name: "HUGLIFE × ICONIC", color: "#FF6B35", children: ["huglife","noir","taste_of_art","paparazzi","gangsta_gospel","sundays_best","wrst_bhvr","remix","pawchella","secret_society","beauty_beast","black_ball","snow_ball","monsters_ball","kulture","soul_sessions","underground_king","crvngs","cinco_de_mayo","block_party","parking_lot_pimpin"] },
  { key: "casper_group", name: "CASPER GROUP", color: "#E74C3C", children: ["casper_group"] },
  { key: "forever_futbol", name: "FOREVER FUTBOL", color: "#2E8B57", children: ["forever_futbol"] },
  { key: "umbrella", name: "UMBRELLA GROUP", color: "#3498DB", children: ["umbrella","mind_studio"] },
  { key: "commerce", name: "COMMERCE", color: "#C41E3A", children: ["maga","stush","bodegea","infinity_water","pronto_energy"] },
  { key: "dr_dorsey", name: "DR. DORSEY", color: "#C9A96E", children: ["dr_dorsey"] },
  { key: "apps", name: "APPS", color: "#4A9FD5", children: ["good_times"] },
];
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
      const motherMatch = MOTHERS.find(m=>m.key===bk && m.children?.length>1);
      const bf = bk==="all"?"":motherMatch?`&brand_key=in.(${motherMatch.children.join(",")})`:`&brand_key=eq.${bk}`;
      const [q, ev, tk, eq, pq] = await Promise.all([
        supa("contact_action_queue", `select=status${bf}&limit=5000`),
        supa("eventbrite_events", `select=event_name,brand_key,event_date,city&is_active=eq.true&event_date=gte.${new Date().toISOString().split("T")[0]}&order=event_date.asc&limit=8`),
        supa("khg_master_tasks", "select=task_key,title,brand,priority,status,assigned_to&status=not.in.(completed,cancelled)&order=priority,created_at.desc&limit=12"),
        supa("email_approval_queue", "select=id,approved&approved=eq.false"),
        supa("ghl_social_posting_queue", "select=id&status=eq.queued"),
      ]);
      const qs = q || [];
      setStats({ queued: qs.filter(x=>x.status==="queued").length, sent: qs.filter(x=>x.status==="sent").length, total: qs.length, pendingApprovals: (eq||[]).length + (pq||[]).length, postsQueued: (pq||[]).length });
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
      <div className="card ptr" onClick={()=>navigate("social")}><div className="sv" style={{color:"var(--ac)"}}>{loading?"—":stats.postsQueued||0}</div><div className="sl2">Posts Queued</div></div>
      <div className="card ptr" onClick={()=>navigate("approvals")}><div className="sv" style={{color:stats.pendingApprovals>0?"var(--rd)":"var(--gn)"}}>{loading?"—":stats.pendingApprovals||0}</div><div className="sl2">Pending Approvals</div></div>
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
        <div className="row" style={{gap:6,marginBottom:10}}>
          <span className="badge bg-o" style={{fontSize:10,padding:"4px 8px"}}>Claude: {tasks.filter(t=>(t.assigned_to||"").toLowerCase()==="claude").length}</span>
          <span className="badge bg-g" style={{fontSize:10,padding:"4px 8px"}}>Linda: {tasks.filter(t=>(t.assigned_to||"").toLowerCase()==="linda").length}</span>
          <span className="badge bg-r" style={{fontSize:10,padding:"4px 8px"}}>Blocked: {tasks.filter(t=>t.status==="blocked").length}</span>
        </div>
        {tasks.map((t,i) => (
          <div key={i} className="row" style={{padding:"8px 0",borderBottom:"1px solid var(--bd)",gap:8}}>
            <span className={`badge ${t.priority==="critical"?"bg-r":t.priority==="high"?"bg-o":"bg-x"}`} style={{width:50,justifyContent:"center"}}>{t.priority}</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}} className="trunc">{t.title}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{t.assigned_to} · {t.status}</div></div>
            <span className={`badge ${t.status==="blocked"?"bg-r":t.status==="in_progress"?"bg-b":t.status==="recurring_active"?"bg-g":"bg-x"}`}>{t.status.replace("_"," ")}</span>
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
      <button className="btn" onClick={()=>{navigate("tasks")}}><Ic d={P.target} s={14} /> Grants</button>
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
      const motherMatch = MOTHERS.find(m=>m.key===bk && m.children?.length>1);
      const bf = bk==="all"?"":motherMatch?`&brand_key=in.(${motherMatch.children.join(",")})`:"&brand_key=eq."+bk;
      const [cd, qd] = await Promise.all([
        supa("contact_action_queue", `select=status${bf}&limit=5000`),
        supa("contact_action_queue", `select=id,contact_name,contact_email,ig_handle,brand_key,action_type,status,segment_type,contact_city,scheduled_date${bf}&order=created_at.desc&limit=60`),
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
      <table className="tbl"><thead><tr><th>Contact</th><th>Brand</th><th>Type</th><th>Segment</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{queue.filter(q=>view==="queue"?q.status!=="sent":q.status==="sent").slice(0,25).map((q,i) => { const b=BRANDS[q.brand_key]||{}; return (
        <tr key={i}><td style={{fontWeight:500}}>{q.contact_name||q.ig_handle||q.contact_email||"—"}</td>
        <td><span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||q.brand_key}</span></td>
        <td><span className="badge bg-x">{q.action_type}</span></td><td style={{fontSize:11}}>{q.segment_type||"—"}</td><td style={{fontSize:11}}>{q.contact_city||"—"}</td>
        <td><span className={`badge ${q.status==="sent"?"bg-g":q.status==="queued"?"bg-b":q.status==="approved"?"bg-g":"bg-x"}`}>{q.status}</span></td>
        <td>{q.status==="queued"&&<div className="row" style={{gap:4}}>
          <button className="btn btn-g btn-sm" style={{padding:"2px 6px"}} onClick={async()=>{await supaUpdate("contact_action_queue",`id=eq.${q.id}`,{status:"approved"});setQueue(p=>p.map(x=>x.id===q.id?{...x,status:"approved"}:x))}}><Ic d={P.check} s={10} c="#fff" /></button>
          <button className="btn btn-d btn-sm" style={{padding:"2px 6px"}} onClick={async()=>{await supaUpdate("contact_action_queue",`id=eq.${q.id}`,{status:"rejected"});setQueue(p=>p.filter(x=>x.id!==q.id))}}><Ic d={P.x} s={10} c="#fff" /></button>
        </div>}</td></tr>);
      })}</tbody></table>
    </div>
  </div>);
}

function SocialScreen({ bk }) {
  const [posts, setPosts] = useState([]); const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("queued"); const [composing, setComposing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [np, setNp] = useState({brand:bk==="all"?"huglife":bk, caption:"", platform:"instagram", type:"IMAGE", image:"", scheduledFor:""});
  useEffect(() => { (async () => {
    const motherMatch = MOTHERS.find(m=>m.key===bk && m.children?.length>1);
    const bf = bk==="all"?"":motherMatch?`&brand_key=in.(${motherMatch.children.join(",")})`:"&brand_key=eq."+bk;
    const d = await supa("ghl_social_posting_queue", `select=*${bf}&order=scheduled_for.desc.nullslast&limit=100`);
    setPosts(d||[]); setLoading(false);
  })(); }, [bk]);
  const queued = posts.filter(p=>p.status==="queued"||p.status==="pending"); const posted = posts.filter(p=>p.status==="posted"||p.status==="sent"); const approved = posts.filter(p=>p.status==="approved");
  const approvePost = async (id) => { await supaUpdate("ghl_social_posting_queue",`id=eq.${id}`,{status:"approved"}); setPosts(p=>p.map(x=>x.id===id?{...x,status:"approved"}:x)); };
  const rejectPost = async (id) => { await supaUpdate("ghl_social_posting_queue",`id=eq.${id}`,{status:"rejected"}); setPosts(p=>p.map(x=>x.id===id?{...x,status:"rejected"}:x)); };
  const createPost = async () => {
    const b = BRANDS[np.brand]||{}; 
    await supaInsert("ghl_social_posting_queue", {brand_key:np.brand, ghl_location_id:b.ghl||"", platform:np.platform, content_type:np.type, caption:np.caption, image_url:np.image, scheduled_for:np.scheduledFor||null, status:"queued", pre_engagement_complete:false});
    setNp({brand:np.brand,caption:"",platform:"instagram",type:"IMAGE",image:"",scheduledFor:""}); setComposing(false);
    const d = await supa("ghl_social_posting_queue", `select=*&order=scheduled_for.desc.nullslast&limit=60`); setPosts(d||[]);
  };
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700}}>Social Posts</div>
        <div style={{fontSize:11,color:"var(--tx3)"}}>{posts.length} loaded · {queued.length} ready · {approved.length} approved · {posted.length} posted</div></div>
      <div className="row" style={{gap:6}}>
        <button className="btn btn-p" onClick={()=>setComposing(!composing)}><Ic d={P.plus} s={14} /> New Post</button>
        <button className="btn btn-sm" onClick={()=>triggerN8n(WF.dailyPoster,{action:"run_now"})}><Ic d={P.zap} s={12} /> Post Now</button>
        <button className="btn btn-sm" onClick={()=>triggerN8n(WF.replenish,{action:"replenish"})}><Ic d={P.refresh} s={12} /> Replenish</button>
      </div>
    </div>
    {composing && <div className="card fi" style={{marginBottom:14,borderColor:"var(--ac)"}}>
      <div className="ct">Compose Post</div>
      <div className="g3" style={{gap:10}}>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Brand</label>
          <select className="inp" value={np.brand} onChange={e=>setNp({...np,brand:e.target.value})}>{Object.entries(BRANDS).map(([k,b])=><option key={k} value={k}>{b.name}</option>)}</select></div>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Platform</label>
          <select className="inp" value={np.platform} onChange={e=>setNp({...np,platform:e.target.value})}>{["instagram","facebook","tiktok"].map(p=><option key={p}>{p}</option>)}</select></div>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Schedule</label>
          <input type="datetime-local" className="inp" value={np.scheduledFor} onChange={e=>setNp({...np,scheduledFor:e.target.value})} /></div>
      </div>
      <div style={{marginTop:10}}><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Caption</label>
        <textarea className="inp" value={np.caption} onChange={e=>setNp({...np,caption:e.target.value})} placeholder="Write your caption..." style={{minHeight:100,resize:"vertical"}} /></div>
      <div style={{marginTop:10}}><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Image URL</label>
        <input className="inp" value={np.image} onChange={e=>setNp({...np,image:e.target.value})} placeholder="https://..." /></div>
      {np.image && <div style={{marginTop:8,borderRadius:8,overflow:"hidden",maxWidth:200}}><img src={np.image} alt="" style={{width:"100%",display:"block"}} onError={e=>{e.target.style.display="none"}} /></div>}
      <div className="row" style={{gap:8,marginTop:10}}>
        <button className="btn btn-p" onClick={createPost}>Queue Post</button>
        <button className="btn" onClick={()=>setComposing(false)}>Cancel</button>
      </div>
    </div>}
    <div className="pills fi"><button className={`pill ${tab==="queued"?"act":""}`} onClick={()=>setTab("queued")}>Ready ({queued.length})</button>
      <button className={`pill ${tab==="approved"?"act":""}`} onClick={()=>setTab("approved")}>Approved ({approved.length})</button>
      <button className={`pill ${tab==="posted"?"act":""}`} onClick={()=>setTab("posted")}>Posted ({posted.length})</button>
      <button className={`pill ${tab==="all"?"act":""}`} onClick={()=>setTab("all")}>All ({posts.length})</button></div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading posts...</div> :
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {(tab==="queued"?queued:tab==="approved"?approved:tab==="posted"?posted:posts).map((p,i) => { const b=BRANDS[p.brand_key]||{}; return (
        <div key={i} className="card fi" style={{borderLeft:`3px solid ${b.color||"var(--bd)"}`}}>
          <div className="row" style={{gap:14}}>
            {p.image_url && <div style={{width:64,height:64,borderRadius:8,overflow:"hidden",flexShrink:0,background:"var(--sf2)"}}>
              <img src={p.image_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none"}} /></div>}
            <div style={{flex:1}}>
              <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
                <div className="row" style={{gap:6}}>
                  <span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||p.brand_key}</span>
                  <span className="badge bg-b">{p.platform}</span>
                  <span className="badge bg-x">{p.content_type}</span>
                  {p.pre_engagement_complete && <span className="badge bg-g">engaged</span>}
                </div>
                <span className={`badge ${p.status==="queued"?"bg-y":p.status==="posted"||p.status==="sent"?"bg-g":p.status==="approved"?"bg-b":"bg-r"}`}>{p.status}</span>
              </div>
              <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.5,whiteSpace:"pre-wrap",maxHeight:80,overflow:"hidden"}}>{p.caption}</div>
              <div className="row" style={{gap:6,marginTop:6}}>
                {p.scheduled_for && <span className="mono" style={{fontSize:10,color:"var(--tx3)"}}>{new Date(p.scheduled_for).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</span>}
                {(p.status==="queued"||p.status==="pending") && <><button className="btn btn-g btn-sm" onClick={()=>approvePost(p.id)}><Ic d={P.check} s={11} c="#fff" /> Approve</button>
                  <button className="btn btn-d btn-sm" onClick={()=>rejectPost(p.id)}><Ic d={P.x} s={11} c="#fff" /> Reject</button></>}
                <button className="btn btn-sm" onClick={()=>setPreview(preview===i?null:i)}><Ic d={P.eye} s={11} /> {preview===i?"Close":"Preview"}</button>
              </div>
            </div>
          </div>
          {preview===i && <div style={{marginTop:12,padding:12,background:"var(--sf2)",borderRadius:8}}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Full Preview</div>
            {p.image_url && <img src={p.image_url} alt="" style={{maxWidth:300,borderRadius:8,marginBottom:8}} onError={e=>{e.target.style.display="none"}} />}
            <div style={{fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{p.caption}</div>
            <div style={{marginTop:8,fontSize:10,color:"var(--tx3)"}}>Platform: {p.platform} · Type: {p.content_type} · Brand: {b.name}{p.scheduled_for ? ` · Scheduled: ${new Date(p.scheduled_for).toLocaleString()}` : ""}</div>
          </div>}
        </div>);
      })}
    </div>}
  </div>);
}

function EventsScreen({ bk }) {
  const [events, setEvents] = useState([]); const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => { (async () => { const d=await supa("eventbrite_events",`select=*&is_active=eq.true&event_date=gte.${new Date().toISOString().split("T")[0]}&order=event_date.asc&limit=50`); setEvents(d||[]); setLoading(false); })(); }, []);
  const filtered = bk==="all"?events:events.filter(e=>e.brand_key===bk||(MOTHERS.find(m=>m.children?.includes(bk))?.children||[]).includes(e.brand_key));
  const byMonth = {}; filtered.forEach(ev => { const m=new Date(ev.event_date+"T12:00:00").toLocaleDateString("en-US",{month:"long",year:"numeric"}); if(!byMonth[m])byMonth[m]=[]; byMonth[m].push(ev); });
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700}}>Event Rollouts</div><div style={{fontSize:11,color:"var(--tx3)"}}>Full campaign detail — dates, venues, flyers, tickets, outreach status</div></div>
      <span className="badge bg-o" style={{padding:"5px 12px",fontSize:11}}>{filtered.length} upcoming</span>
    </div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> :
    Object.entries(byMonth).map(([month,evs]) => (
      <div key={month} style={{marginBottom:24}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--tx3)",marginBottom:10,paddingBottom:6,borderBottom:"1px solid var(--bd)"}}>{month} ({evs.length} events)</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>{evs.map((ev,i) => { const b=BRANDS[ev.brand_key]||{}; const d=daysUntil(ev.event_date); const isExp=expanded===ev.event_date+ev.event_name; return (
          <div key={i} className="card fi" style={{borderLeft:`3px solid ${b.color||"var(--bd)"}`,overflow:"hidden"}}>
            <div className="row" style={{gap:14}}>
              {ev.image_url && <div style={{width:72,height:72,borderRadius:8,overflow:"hidden",flexShrink:0,background:"var(--sf2)"}}>
                <img src={ev.image_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.parentElement.style.display="none"}} /></div>}
              <div style={{flex:1}}>
                <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
                  <div style={{fontSize:14,fontWeight:700}}>{ev.event_name}</div>
                  <span className={`badge ${d<=7?"bg-r":d<=14?"bg-o":d<=30?"bg-y":"bg-g"}`} style={{fontSize:10}}>{d}d</span>
                </div>
                <div className="row" style={{gap:8,marginBottom:6,flexWrap:"wrap"}}>
                  <span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||ev.brand_key}</span>
                  <span className="badge bg-b">{ev.city}</span>
                  <span className="badge bg-x">{ev.event_type?.replace(/_/g," ")||"event"}</span>
                  <span className="mono" style={{fontSize:10,color:"var(--tx3)"}}>{fmtDate(ev.event_date)} · {ev.event_time||"TBD"}</span>
                </div>
                <div className="row" style={{gap:6,flexWrap:"wrap"}}>
                  {ev.venue_name && <span style={{fontSize:11,color:"var(--tx2)"}}>{ev.venue_name}</span>}
                  {ev.venue_address && <span style={{fontSize:10,color:"var(--tx3)"}}>· {ev.venue_address}</span>}
                </div>
              </div>
            </div>
            <div className="row" style={{gap:6,marginTop:10,flexWrap:"wrap"}}>
              {ev.eventbrite_url && <a href={ev.eventbrite_url} target="_blank" rel="noopener" className="btn btn-p btn-sm"><Ic d={P.link} s={11} /> Tickets</a>}
              <button className="btn btn-sm" onClick={()=>setExpanded(isExp?null:ev.event_date+ev.event_name)}><Ic d={P.eye} s={11} /> {isExp?"Close":"Details"}</button>
              <button className="btn btn-sm"><Ic d={P.campaign} s={11} /> Campaign</button>
              <button className="btn btn-sm"><Ic d={P.send} s={11} /> Outreach</button>
              {!ev.eventbrite_url && <span className="badge bg-r" style={{marginLeft:"auto"}}>NO TICKET LINK</span>}
              {!ev.venue_name && <span className="badge bg-y" style={{marginLeft:!ev.eventbrite_url?0:"auto"}}>VENUE TBD</span>}
              {!ev.image_url && <span className="badge bg-y">NO FLYER</span>}
            </div>
            {isExp && <div style={{marginTop:12,padding:14,background:"var(--sf2)",borderRadius:8}}>
              <div className="g2" style={{gap:16}}>
                <div>
                  <div className="sec-t">Event Details</div>
                  <div style={{fontSize:12,lineHeight:1.8}}>
                    <div><strong>Date:</strong> {new Date(ev.event_date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</div>
                    <div><strong>Time:</strong> {ev.event_time||"TBD"}</div>
                    <div><strong>City:</strong> {ev.city}</div>
                    <div><strong>Venue:</strong> {ev.venue_name||"TBD"}</div>
                    <div><strong>Address:</strong> {ev.venue_address||"TBD"}</div>
                    <div><strong>Type:</strong> {ev.event_type?.replace(/_/g," ")||"—"}</div>
                    <div><strong>Brand:</strong> {b.name} ({b.ig||"no IG"})</div>
                    <div><strong>Brand Email:</strong> {b.email||"—"}</div>
                    {b.site && <div><strong>Website:</strong> <a href={"https://"+b.site} target="_blank" rel="noopener" style={{color:"var(--ac)"}}>{b.site}</a></div>}
                    {ev.eventbrite_url && <div><strong>Tickets:</strong> <a href={ev.eventbrite_url} target="_blank" rel="noopener" style={{color:"var(--ac)"}}>Eventbrite</a></div>}
                  </div>
                </div>
                {ev.image_url && <div>
                  <div className="sec-t">Flyer</div>
                  <img src={ev.image_url} alt="" style={{width:"100%",maxWidth:280,borderRadius:8}} onError={e=>{e.target.style.display="none"}} />
                </div>}
              </div>
              <div style={{marginTop:12}}>
                <div className="sec-t">Rollout Checklist</div>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  {[{label:"Flyer uploaded",done:!!ev.image_url},{label:"Eventbrite live",done:!!ev.eventbrite_url},{label:"Venue confirmed",done:!!ev.venue_name},{label:"Social campaign started",done:false},{label:"Email blast sent",done:false},{label:"DM outreach sent",done:false},{label:"PR pitch sent",done:false}].map((item,idx)=>(
                    <div key={idx} className="row" style={{gap:8,fontSize:12}}>
                      <span style={{color:item.done?"var(--gn)":"var(--tx3)"}}>{item.done?"✓":"○"}</span>
                      <span style={{color:item.done?"var(--tx)":"var(--tx3)"}}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>}
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
  const [emails, setEmails] = useState([]); const [loading, setLoading] = useState(true);
  const [composing, setComposing] = useState(false); const [sending, setSending] = useState(false);
  const [preview, setPreview] = useState(null);
  const [email, setEmail] = useState({to:"",subject:"",body:"",brand:bk==="all"?"huglife":bk});
  const mbs = [{dest:"HugLife / Events",email:"justhuglife.forever@gmail.com",cc:"dolodorsey@gmail.com"},{dest:"Casper Group",email:"info@caspergroupworldwide.com"},{dest:"Umbrella Group",email:"theumbrellagroupworldwide@gmail.com"},{dest:"Forever Futbol",email:"foreverfutbolmuseum@gmail.com"},{dest:"Dr. Dorsey",email:"dolodorsey@gmail.com"},{dest:"Business",email:"thedoctordorsey@gmail.com"},{dest:"Ops",email:"drdorseyassistant@gmail.com"},{dest:"Company-wide",email:"thekollectivehospitality@gmail.com"}];
  const [sel, setSel] = useState(0);
  useEffect(() => { (async () => {
    const bf = bk==="all"?"":"&brand_key=eq."+bk;
    const d = await supa("email_approval_queue", `select=*${bf}&order=created_at.desc&limit=30`);
    setEmails(d||[]); setLoading(false);
  })(); }, [bk]);
  const approveEmail = async (id) => { await supaUpdate("email_approval_queue",`id=eq.${id}`,{approved:true,approved_at:new Date().toISOString(),approved_by:"dr_dorsey"}); setEmails(p=>p.map(e=>e.id===id?{...e,approved:true}:e)); };
  const sendTest = async (id) => { await supaUpdate("email_approval_queue",`id=eq.${id}`,{test_email_sent:true,test_email_sent_at:new Date().toISOString()}); setEmails(p=>p.map(e=>e.id===id?{...e,test_email_sent:true}:e)); await triggerN8n(WF.emailThrottle,{action:"send_test",email_id:id,to:"thedoctordorsey@gmail.com"}); };
  const sendEmail = async () => { setSending(true); await triggerN8n(WF.emailThrottle,{action:"send",from:mbs[sel].email,to:email.to,subject:email.subject,body:email.body,brand:email.brand}); setEmail({to:"",subject:"",body:"",brand:email.brand}); setComposing(false); setSending(false); };
  const pending = emails.filter(e=>!e.approved);
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700}}>Email Hub</div>
        <div style={{fontSize:11,color:"var(--tx3)"}}>{pending.length} pending approval · {emails.filter(e=>e.approved).length} approved</div></div>
      <button className="btn btn-p" onClick={()=>setComposing(!composing)}><Ic d={P.plus} s={14} /> Compose</button>
    </div>
    {composing && <div className="card fi" style={{marginBottom:14,borderColor:"var(--ac)"}}>
      <div className="ct">Compose Email</div>
      <div className="g2" style={{gap:10,marginBottom:10}}>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>From Mailbox</label>
          <select className="inp" value={sel} onChange={e=>setSel(+e.target.value)}>{mbs.map((m,i)=><option key={i} value={i}>{m.dest} ({m.email})</option>)}</select></div>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Brand</label>
          <select className="inp" value={email.brand} onChange={e=>setEmail({...email,brand:e.target.value})}>{Object.entries(BRANDS).map(([k,b])=><option key={k} value={k}>{b.name}</option>)}</select></div>
      </div>
      <input className="inp" placeholder="To: email@example.com" value={email.to} onChange={e=>setEmail({...email,to:e.target.value})} style={{marginBottom:8}} />
      <input className="inp" placeholder="Subject line" value={email.subject} onChange={e=>setEmail({...email,subject:e.target.value})} style={{marginBottom:8}} />
      <textarea className="inp" placeholder="Email body..." value={email.body} onChange={e=>setEmail({...email,body:e.target.value})} style={{minHeight:120,resize:"vertical"}} />
      <div className="row" style={{gap:8,marginTop:10}}>
        <button className="btn btn-p" onClick={sendEmail} disabled={sending}>{sending?"Sending...":"Send"}</button>
        <button className="btn" onClick={()=>setComposing(false)}>Cancel</button>
      </div>
    </div>}
    <div className="sec-t">Approval Queue ({pending.length})</div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> :
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {emails.map((e,i) => { const b = BRANDS[e.brand_key]||{}; return (
        <div key={i} className="card fi" style={{borderLeft:`3px solid ${e.approved?"var(--gn)":"var(--yl)"}`}}>
          <div className="row" style={{justifyContent:"space-between",marginBottom:6}}>
            <div className="row" style={{gap:8}}>
              <span className="badge" style={{background:`${b.color||"#888"}18`,color:b.color||"#888"}}>{b.short||e.brand_key}</span>
              <span style={{fontSize:13,fontWeight:600}}>{e.subject||"No Subject"}</span>
            </div>
            <span className={`badge ${e.approved?"bg-g":"bg-y"}`}>{e.approved?"APPROVED":"PENDING"}</span>
          </div>
          <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.5,marginBottom:8,maxHeight:60,overflow:"hidden"}}>{e.body_preview||"—"}</div>
          <div className="row" style={{justifyContent:"space-between"}}>
            <div className="row" style={{gap:6}}>
              <span className="badge bg-x">{e.sequence_type}</span><span className="badge bg-x">Step {e.step_number}</span>
              <span className="badge bg-b">{e.recipient_count||0} recipients</span>
              {e.cta_text && <span className="badge bg-o">{e.cta_text}</span>}
              {e.test_email_sent && <span className="badge bg-g">Test Sent</span>}
            </div>
            <div className="row" style={{gap:6}}>
              {!e.test_email_sent && !e.approved && <button className="btn btn-sm" onClick={()=>sendTest(e.id)}><Ic d={P.mail} s={11} /> Test</button>}
              <button className="btn btn-sm" onClick={()=>setPreview(preview===i?null:i)}><Ic d={P.eye} s={11} /> Preview</button>
              {!e.approved && <button className="btn btn-g btn-sm" onClick={()=>approveEmail(e.id)}><Ic d={P.check} s={11} c="#fff" /> Approve</button>}
            </div>
          </div>
          {preview===i && <div style={{marginTop:12,padding:16,background:"var(--sf2)",borderRadius:8,border:"1px solid var(--bd)"}}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--tx3)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Email Preview</div>
            <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>{e.subject}</div>
            <div style={{fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{e.body_preview}</div>
            {e.cta_text && <div style={{marginTop:12}}><a href={e.cta_url||"#"} target="_blank" rel="noopener" style={{display:"inline-block",padding:"10px 24px",background:"var(--ac)",color:"#000",borderRadius:6,fontWeight:600,fontSize:12,textDecoration:"none"}}>{e.cta_text}</a></div>}
            <div style={{marginTop:12,fontSize:10,color:"var(--tx3)"}}>Recipients: {e.recipient_count} · Sequence: {e.sequence_type} Step {e.step_number} · Brand: {b.name}</div>
          </div>}
        </div>);
      })}
    </div>}
    <div className="divider" /><div className="sec-t">Warmup Schedule</div>
    <div className="card"><div style={{fontSize:11,color:"var(--tx2)",lineHeight:1.8}}>Day 1-3: 25/day → Day 4-7: 50/day → Day 8-14: 100/day → Day 15-21: 250/day → Day 22+: 500/day<br/>All emails routed to thedoctordorsey@gmail.com for QA copy. Zero sends without approval.</div></div>
  </div>);
}

function TextScreen() {
  const [texts, setTexts] = useState([]); const [scheduled, setScheduled] = useState([]);
  const [loading, setLoading] = useState(true); const [composing, setComposing] = useState(false);
  const [nt, setNt] = useState({name:"",phone:"",message:"",scheduledFor:"",sendFrom:"linda"});
  useEffect(() => { (async () => {
    const [tq, st] = await Promise.all([
      supa("text_message_queue", "select=*&order=created_at.desc&limit=30"),
      supa("scheduled_texts", "select=*&order=scheduled_for.asc&limit=20"),
    ]);
    setTexts(tq||[]); setScheduled(st||[]); setLoading(false);
  })(); }, []);
  const sendText = async () => {
    if(!nt.name||!nt.phone||!nt.message) return;
    await supaInsert("text_message_queue", {recipient_name:nt.name,recipient_phone:nt.phone,message:nt.message,status:"queued",send_from:nt.sendFrom,scheduled_at:nt.scheduledFor||null});
    setNt({name:"",phone:"",message:"",scheduledFor:"",sendFrom:"linda"});
    setComposing(false);
    const d = await supa("text_message_queue","select=*&order=created_at.desc&limit=30"); setTexts(d||[]);
  };
  const queued = texts.filter(t=>t.status==="queued"); const sent = texts.filter(t=>t.status==="sent");
  return (<div>
    <div className="row fi" style={{justifyContent:"space-between",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700}}>Text Messages</div>
        <div style={{fontSize:11,color:"var(--tx3)"}}>{texts.length} total · {queued.length} queued · {sent.length} sent · {scheduled.length} scheduled</div></div>
      <button className="btn btn-p" onClick={()=>setComposing(!composing)}><Ic d={P.plus} s={14} /> New Text</button>
    </div>
    {composing && <div className="card fi" style={{marginBottom:14,borderColor:"var(--ac)"}}>
      <div className="ct">Compose Text</div>
      <div className="g3" style={{gap:10}}>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Recipient</label>
          <input className="inp" placeholder="Name" value={nt.name} onChange={e=>setNt({...nt,name:e.target.value})} /></div>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Phone</label>
          <input className="inp" placeholder="+1 (404) 555-0000" value={nt.phone} onChange={e=>setNt({...nt,phone:e.target.value})} /></div>
        <div><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Send From</label>
          <select className="inp" value={nt.sendFrom} onChange={e=>setNt({...nt,sendFrom:e.target.value})}><option value="linda">Linda's Line</option><option value="system">System</option></select></div>
      </div>
      <div style={{marginTop:10}}><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Message</label>
        <textarea className="inp" value={nt.message} onChange={e=>setNt({...nt,message:e.target.value})} placeholder="Type message..." style={{minHeight:80,resize:"vertical"}} /></div>
      <div style={{marginTop:10}}><label style={{fontSize:10,color:"var(--tx3)",display:"block",marginBottom:4}}>Schedule (optional)</label>
        <input type="datetime-local" className="inp" value={nt.scheduledFor} onChange={e=>setNt({...nt,scheduledFor:e.target.value})} style={{maxWidth:280}} /></div>
      <div className="row" style={{gap:8,marginTop:10}}>
        <button className="btn btn-p" onClick={sendText}>Queue Text</button>
        <button className="btn" onClick={()=>setComposing(false)}>Cancel</button>
      </div>
    </div>}
    <div className="sec-t">Text Queue</div>
    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> :
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {texts.map((t,i) => (
        <div key={i} className="card fi row" style={{gap:10,borderLeft:`3px solid ${t.status==="sent"?"var(--gn)":t.status==="queued"?"var(--bl)":"var(--bd)"}`}}>
          <div style={{flex:1}}>
            <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
              <div className="row" style={{gap:6}}>
                <span style={{fontSize:13,fontWeight:600}}>{t.recipient_name||"Unknown"}</span>
                <span className="mono" style={{fontSize:10,color:"var(--tx3)"}}>{t.recipient_phone}</span>
              </div>
              <span className={`badge ${t.status==="sent"?"bg-g":t.status==="queued"?"bg-b":"bg-x"}`}>{t.status}</span>
            </div>
            <div style={{fontSize:12,color:"var(--tx2)",lineHeight:1.5}}>{t.message}</div>
            <div className="row" style={{gap:6,marginTop:4}}>
              {t.send_from && <span className="badge bg-x">via {t.send_from}</span>}
              {t.scheduled_at && <span className="mono" style={{fontSize:10,color:"var(--tx3)"}}>Scheduled: {new Date(t.scheduled_at).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>}
    {scheduled.length > 0 && <><div className="divider" /><div className="sec-t">Scheduled ({scheduled.length})</div>
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {scheduled.map((s,i) => (
        <div key={i} className="card fi row" style={{gap:10}}>
          <div style={{flex:1}}>
            <div className="row" style={{gap:6}}><span style={{fontSize:13,fontWeight:600}}>{s.contact_name||"—"}</span><span className="mono" style={{fontSize:10,color:"var(--tx3)"}}>{s.phone_number}</span></div>
            <div style={{fontSize:12,color:"var(--tx2)",marginTop:2}}>{s.message}</div>
            <div className="row" style={{gap:6,marginTop:4}}>
              <span className="badge bg-b">{s.status}</span>
              {s.scheduled_for && <span className="mono" style={{fontSize:10,color:"var(--tx3)"}}>{new Date(s.scheduled_for).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</span>}
            </div>
          </div>
        </div>
      ))}
    </div></>}
  </div>);
}

function TasksScreen() {
  const [tasks, setTasks] = useState([]); const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true); const [view, setView] = useState("owner");
  const [ownerFilter, setOwnerFilter] = useState("all");
  useEffect(() => { (async () => {
    const [td, gd] = await Promise.all([
      supa("khg_master_tasks","select=*&status=not.in.(completed,cancelled)&order=priority,created_at.desc&limit=50"),
      supa("khg_grant_tracker","select=*&order=deadline.asc.nullslast&limit=15"),
    ]);
    setTasks(td||[]); setGrants(gd||[]); setLoading(false);
  })(); }, []);

  const claude = tasks.filter(t=>(t.assigned_to||"").toLowerCase()==="claude");
  const linda = tasks.filter(t=>(t.assigned_to||"").toLowerCase()==="linda");
  const dorsey = tasks.filter(t=>!t.assigned_to || t.assigned_to==="dr_dorsey");
  const recurring = tasks.filter(t=>t.is_recurring);
  const oneTime = tasks.filter(t=>!t.is_recurring);
  const blocked = tasks.filter(t=>t.status==="blocked");
  const daily = recurring.filter(t=>t.frequency==="daily");
  const weekly = recurring.filter(t=>t.frequency==="weekly");

  const byOwner = ownerFilter==="claude"?claude:ownerFilter==="linda"?linda:ownerFilter==="dorsey"?dorsey:tasks;

  const renderTask = (t, i) => (
    <div key={i} className="card fi" style={{marginBottom:6,borderLeft:`3px solid ${t.priority==="critical"?"var(--rd)":t.priority==="high"?"var(--ac)":"var(--bd)"}`}}>
      <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
        <div className="row" style={{gap:6}}>
          <span className="mono" style={{fontSize:9,color:"var(--tx3)"}}>{t.task_key}</span>
          <span className={`badge ${t.priority==="critical"?"bg-r":t.priority==="high"?"bg-o":"bg-x"}`}>{t.priority}</span>
          <span className={`badge ${t.status==="blocked"?"bg-r":t.status==="in_progress"?"bg-b":t.status==="recurring_active"?"bg-g":"bg-y"}`}>{t.status.replace(/_/g," ")}</span>
          {t.is_recurring && <span className="badge bg-b">{t.frequency}</span>}
        </div>
        <span className="badge bg-x">{(t.assigned_to||"unassigned").toUpperCase()}</span>
      </div>
      <div style={{fontSize:13,fontWeight:600}}>{t.title}</div>
      <div className="row" style={{gap:8,marginTop:4}}>
        <span style={{fontSize:10,color:"var(--tx3)"}}>{t.category}</span>
        {t.due_date && <span className="mono" style={{fontSize:10,color:daysUntil(t.due_date.split("T")[0])<=7?"var(--rd)":"var(--tx3)"}}>Due: {fmtDate(t.due_date.split("T")[0])}</span>}
        {t.blocker_reason && <span style={{fontSize:10,color:"var(--rd)"}}>Blocker: {t.blocker_reason}</span>}
      </div>
    </div>
  );

  return (<div>
    <div className="g4 fi" style={{marginBottom:14}}>
      <div className="card ptr" onClick={()=>setOwnerFilter("dorsey")} style={{borderTop:ownerFilter==="dorsey"?"2px solid var(--ac)":"none"}}><div className="sv" style={{color:"var(--ac)"}}>{dorsey.length}</div><div className="sl2">Dr. Dorsey</div></div>
      <div className="card ptr" onClick={()=>setOwnerFilter("claude")} style={{borderTop:ownerFilter==="claude"?"2px solid var(--bl)":"none"}}><div className="sv" style={{color:"var(--bl)"}}>{claude.length}</div><div className="sl2">Claude</div></div>
      <div className="card ptr" onClick={()=>setOwnerFilter("linda")} style={{borderTop:ownerFilter==="linda"?"2px solid var(--gn)":"none"}}><div className="sv" style={{color:"var(--gn)"}}>{linda.length}</div><div className="sl2">Linda</div></div>
      <div className="card ptr" onClick={()=>setOwnerFilter("all")} style={{borderTop:ownerFilter==="all"?"2px solid var(--pr)":"none"}}><div className="sv" style={{color:"var(--pr)"}}>{tasks.length}</div><div className="sl2">All Open</div></div>
    </div>

    <div className="pills fi">
      <button className={`pill ${view==="owner"?"act":""}`} onClick={()=>setView("owner")}>By Owner ({byOwner.length})</button>
      <button className={`pill ${view==="recurring"?"act":""}`} onClick={()=>setView("recurring")}>Recurring ({recurring.length})</button>
      <button className={`pill ${view==="onetime"?"act":""}`} onClick={()=>setView("onetime")}>One-Time ({oneTime.length})</button>
      <button className={`pill ${view==="blocked"?"act":""}`} onClick={()=>setView("blocked")}>Blocked ({blocked.length})</button>
      <button className={`pill ${view==="grants"?"act":""}`} onClick={()=>setView("grants")}>Grants ({grants.length})</button>
    </div>

    {loading ? <div className="card" style={{textAlign:"center",padding:32}}>Loading...</div> : view==="grants" ? (
      <div>
        <div className="sec-t">Grant Pipeline ({grants.length})</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {grants.map((g,i) => (
            <div key={i} className="card fi" style={{borderLeft:"3px solid var(--gn)"}}>
              <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
                <div style={{fontSize:13,fontWeight:700}}>{g.grant_name}</div>
                {g.amount_max && <span className="badge bg-g">${Number(g.amount_max).toLocaleString()}</span>}
              </div>
              <div style={{fontSize:11,color:"var(--tx2)",marginBottom:4}}>{g.grantor}</div>
              <div className="row" style={{gap:6}}>
                <span className="badge bg-b">{g.eligible_entity}</span>
                <span className={`badge ${g.status==="identified"?"bg-y":"bg-g"}`}>{g.status}</span>
                {g.deadline && <span className="mono" style={{fontSize:10,color:daysUntil(g.deadline)<=30?"var(--rd)":"var(--tx3)"}}>Deadline: {fmtDate(g.deadline)}{daysUntil(g.deadline)<=30?` (${daysUntil(g.deadline)}d)`:""}</span>}
                {g.grant_url && <a href={g.grant_url} target="_blank" rel="noopener" className="btn btn-sm" style={{marginLeft:"auto"}}><Ic d={P.link} s={10} /> Apply</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : view==="recurring" ? (
      <div>
        <div className="sec-t">Daily Tasks ({daily.length})</div>
        {daily.map(renderTask)}
        <div className="divider" />
        <div className="sec-t">Weekly Tasks ({weekly.length})</div>
        {weekly.map(renderTask)}
      </div>
    ) : view==="blocked" ? (
      <div>{blocked.length===0?<div className="card" style={{textAlign:"center",padding:24,color:"var(--tx3)"}}>No blocked tasks</div>:blocked.map(renderTask)}</div>
    ) : (
      <div>{(view==="onetime"?oneTime:byOwner).map(renderTask)}</div>
    )}
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
      { id:"social", label:"Social Posts", icon:P.social },
      { id:"dms", label:"DM Center", icon:P.dm },
      { id:"email", label:"Email Hub", icon:P.mail },
      { id:"texts", label:"Texts", icon:P.dm },
    ]},
    { title: "Ops", items: [
      { id:"events", label:"Event Rollouts", icon:P.calendar },
      { id:"tasks", label:"Tasks", icon:P.task },
      { id:"team", label:"Team Dispatch", icon:P.team },
      { id:"directory", label:"Brand Directory", icon:P.globe },
    ]},
  ];
  const titles = {home:"Marketing HQ",campaigns:"Campaigns",approvals:"Approvals",outreach:"Outreach Engine",social:"Social Posts",dms:"DM Center",email:"Email Hub",texts:"Text Messages",events:"Event Rollouts",tasks:"Tasks",team:"Team Dispatch",directory:"Brand Directory"};
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
      case "texts": return <TextScreen />;
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
          {MOTHERS.filter(m=>m.key!=="all").map(m=><optgroup key={m.key} label={m.name}>{(m.children||[]).map(k=>{const b=BRANDS[k]; return b?<option key={k} value={k}>{b.name}{b.dns?" ⛔":""}</option>:null})}</optgroup>)}
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
          <div style={{display:"flex",gap:4,marginLeft:8,overflowX:"auto"}}>
            {MOTHERS.map(m=><button key={m.key} className="ptr" onClick={()=>{if(m.key==="all")setActiveBrand("all");else if(m.children?.length===1)setActiveBrand(m.children[0]);else setActiveBrand(m.key==="huglife"?"huglife":m.children?.[0]||"all")}} style={{padding:"3px 10px",borderRadius:12,fontSize:9,fontWeight:700,letterSpacing:".05em",border:`1px solid ${(activeBrand==="all"&&m.key==="all")||(m.children||[]).includes(activeBrand)?"transparent":"var(--bd)"}`,background:(activeBrand==="all"&&m.key==="all")||(m.children||[]).includes(activeBrand)?m.color+"20":"transparent",color:(activeBrand==="all"&&m.key==="all")||(m.children||[]).includes(activeBrand)?m.color:"var(--tx3)",whiteSpace:"nowrap",cursor:"pointer",transition:"all .15s"}}>{m.name}</button>)}
          </div>
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
