"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// KHG ENTERPRISE COMMAND CENTER v3.0 — ELITE BUILD
// Carbon Dark + Orange Pulse • Animated • Signature Design
// ═══════════════════════════════════════════════════════════

// ── DATA LAYER ──────────────────────────────────────────────

const ENTITIES = {
  huglife: {
    name: "HugLife", division: "Events", color: "#FF6B35", 
    email: "justhuglife.forever@gmail.com", ig: "@justhuglife",
    ghl: "tGbC7nJkOkH5G3RiyjKR",
    events: ["NOIR","Gangsta Gospel","Sunday's Best","Paparazzi","Pawchella","Black Ball","Beauty & The Beast","Haunted House","Monster's Ball","Snow Ball","Winter Wonderland","Taste of Art","REMIX","WRST BHVR: Napkin Wars","CINCO DE DRINKO"],
    socials: { ig: "@justhuglife", tiktok: "@justhuglife", fb: "JustHugLife" }
  },
  casper: {
    name: "Casper Group", division: "Food", color: "#E74C3C",
    email: "info@caspergroupworldwide.com", ig: "@caspergroupworldwide",
    ghl: "IPP6mHiRgKtIAHOOueHS",
    brands: ["Angel Wings","Pasta Bish","Taco Yaki","Patty Daddy","The Espresso Co.","Morning After","Toss'd","Sweet Tooth","Mojo Juice","Mr. Oyster"],
    socials: { ig: "@caspergroupworldwide", tiktok: "@caspergroup", fb: "CasperGroupWorldwide" }
  },
  umbrella: {
    name: "Umbrella Group", division: "Services", color: "#3498DB",
    email: "theumbrellagroupworldwide@gmail.com", ig: "@umbrella",
    ghl: "78C8jSFZhpH9MxiKUtFc",
    brands: ["Auto Exchange","Injury Network","Realty Group","Clean Services","The People's Dept.","Accounting","Brand Studio","Automation Office","Mind Studio","Legal & Compliance"],
    socials: { ig: "@theumbrellagroupworldwide", tiktok: "@umbrellagroup", fb: "UmbrellaGroup" }
  },
  futbol: {
    name: "Forever Futbol", division: "Museums", color: "#C9A96E",
    email: "foreverfutbolmuseum@gmail.com", ig: "@foreverfutbolmuseum",
    ghl: "tGbC7nJkOkH5G3RiyjKR",
    events: ["ATL Jun 11-Jul 19","HOU Jun 11-Jul 19","LA Jun 11-Jul 19"],
    socials: { ig: "@foreverfutbolmuseum", tiktok: "@foreverfutbol", fb: "ForeverFutbol" }
  },
  dorsey: {
    name: "Dr. Dorsey", division: "Personal", color: "#C9A96E",
    email: "dolodorsey@gmail.com", ig: "@dolodorsey",
    ghl: "FTJ4gOGLsZazXuve0YSY",
    socials: { ig: "@dolodorsey", ig2: "@thedoctordorsey", tiktok: "@dolodorsey", fb: "DrDorsey" }
  },
  noir: {
    name: "NOIR", division: "Events", color: "#C9A96E",
    email: "justhuglife.forever@gmail.com", ig: "@noirseries",
    socials: { ig: "@noirseries", tiktok: "@noirseries" }
  },
  bodegea: {
    name: "BODEGEA", division: "Products", color: "#FF9500",
    brands: ["Infinity Water","Pronto Energy","NOIR Espresso Liqueur","Stush"],
    socials: { ig: "@bodegea", tiktok: "@bodegea" }
  },
  opulence: {
    name: "Opulence Designs", division: "Art", color: "#9B59B6",
    brands: ["Torches","Angel & Astronauts","Izzy","Country Boy"],
    socials: { ig: "@opulencedesigns" }
  },
  innercircle: {
    name: "The Inner Circle", division: "Apps", color: "#2ECC71",
    brands: ["Good Times","S.O.S Roadside","On Call"],
    socials: {}
  },
  playmakers: {
    name: "Playmakers Sports", division: "Non-Profit", color: "#E67E22",
    brands: ["Sole Exchange","Let's Talk About It"],
    socials: { ig: "@playmakerssportsassociation" }
  }
};

const EVENTS_2026 = [
  { name: "NOIR DC", date: "2026-04-17", entity: "noir", city: "Washington DC", status: "upcoming" },
  { name: "Taste of Art LA", date: "2026-04-24", entity: "huglife", city: "Los Angeles", status: "upcoming" },
  { name: "Taste of Art ATL", date: "2026-05-15", entity: "huglife", city: "Atlanta", status: "upcoming" },
  { name: "Sunday's Best", date: "2026-05-24", entity: "huglife", city: "TBD", status: "planning" },
  { name: "NOIR LA", date: "2026-05-29", entity: "noir", city: "Los Angeles", status: "planning" },
  { name: "Paparazzi LA", date: "2026-05-31", entity: "huglife", city: "Los Angeles", status: "planning" },
  { name: "NOIR Charlotte", date: "2026-06-05", entity: "noir", city: "Charlotte", status: "planning" },
  { name: "World Cup ATL Opens", date: "2026-06-11", entity: "futbol", city: "Atlanta", status: "active_build" },
  { name: "Taste of Art DC", date: "2026-06-12", entity: "huglife", city: "Washington DC", status: "planning" },
  { name: "Paparazzi LA (BET)", date: "2026-06-14", entity: "huglife", city: "Los Angeles", status: "planning" },
  { name: "Gangsta Gospel ATL", date: "2026-06-19", entity: "huglife", city: "Atlanta", status: "planning" },
  { name: "Dr. Dorsey Bday HOU", date: "2026-06-27", entity: "dorsey", city: "Houston", status: "planning" },
  { name: "Dr. Dorsey Bday ATL", date: "2026-07-02", entity: "dorsey", city: "Atlanta", status: "planning" },
  { name: "Dr. Dorsey Bday Vegas", date: "2026-07-04", entity: "dorsey", city: "Las Vegas", status: "planning" },
  { name: "Sunday's Best", date: "2026-07-05", entity: "huglife", city: "TBD", status: "planning" },
  { name: "Taste of Art HOU", date: "2026-07-10", entity: "huglife", city: "Houston", status: "planning" },
  { name: "Paparazzi DC", date: "2026-07-12", entity: "huglife", city: "Washington DC", status: "planning" },
  { name: "NOIR LA", date: "2026-07-31", entity: "noir", city: "Los Angeles", status: "planning" },
  { name: "Gangsta Gospel HOU", date: "2026-08-01", entity: "huglife", city: "Houston", status: "planning" },
  { name: "NOIR ATL", date: "2026-08-07", entity: "noir", city: "Atlanta", status: "planning" },
  { name: "Paparazzi Charlotte", date: "2026-08-09", entity: "huglife", city: "Charlotte", status: "planning" },
  { name: "Taste of Art HOU", date: "2026-08-14", entity: "huglife", city: "Houston", status: "planning" },
  { name: "Pawchella ATL", date: "2026-08-22", entity: "huglife", city: "Atlanta", status: "planning" },
  { name: "NOIR DC", date: "2026-09-04", entity: "noir", city: "Washington DC", status: "planning" },
  { name: "Gangsta Gospel LA", date: "2026-09-05", entity: "huglife", city: "Los Angeles", status: "planning" },
  { name: "Sunday's Best", date: "2026-09-06", entity: "huglife", city: "TBD", status: "planning" },
  { name: "Beauty & The Beast", date: "2026-09-12", entity: "huglife", city: "Atlanta", status: "planning" },
  { name: "Paparazzi ATL", date: "2026-09-13", entity: "huglife", city: "Atlanta", status: "planning" },
  { name: "Haunted House ATL", date: "2026-10-01", entity: "huglife", city: "Atlanta", status: "planning" },
  { name: "Monster's Ball", date: "2026-10-31", entity: "huglife", city: "TBD", status: "planning" },
  { name: "Black Ball ATL", date: "2026-11-21", entity: "huglife", city: "Atlanta", status: "planning" },
  { name: "Sunday's Best", date: "2026-11-29", entity: "huglife", city: "TBD", status: "planning" },
  { name: "Taste of Art Miami", date: "2026-12-04", entity: "huglife", city: "Miami", status: "planning" },
  { name: "Snow Ball ATL", date: "2026-12-12", entity: "huglife", city: "Atlanta", status: "planning" },
  { name: "Winter Wonderland ATL", date: "2026-12-01", entity: "huglife", city: "Atlanta", status: "planning" },
];

const WORKFLOWS = [
  { id: "3jDssrDbi21CLhn6", name: "Email Send Throttle", status: "active", dept: "Outreach" },
  { id: "LOuffRVoxtPHsCuZ", name: "Newsletter Engine", status: "active", dept: "Content" },
  { id: "tyQSD2mJl8W9VDm0", name: "IG Comment Engine", status: "active", dept: "Social" },
  { id: "zn2uHhkUROJqKzEG", name: "Social Send DMs", status: "active", dept: "Social" },
  { id: "8geOg9hei00b2Dxu", name: "Social Message Gen", status: "active", dept: "Social" },
  { id: "ThKwcVTGnpXIoOEE", name: "Sponsor Engine", status: "active", dept: "Revenue" },
  { id: "0paDyU807bccvZYQ", name: "Influencer Outreach", status: "active", dept: "Outreach" },
  { id: "bGdwLiVFcqP0FcIG", name: "PR Pitch + Followup", status: "active", dept: "PR" },
  { id: "LQRDE7gsrTVm7rms", name: "PR Enrich + Score", status: "active", dept: "PR" },
  { id: "szlivCBfrDzjoaYx", name: "Outreach Command Center", status: "active", dept: "Outreach" },
  { id: "T7ZOnFaSEvcYvwbM", name: "Content Factory", status: "active", dept: "Content" },
  { id: "bZ4QrBi5QmqICSR8", name: "Linda VA Dispatch", status: "active", dept: "Ops" },
  { id: "7rf75NwxA5swZInA", name: "MCP Gateway Core", status: "active", dept: "System" },
  { id: "qgAIBhDCKN49JNXQ", name: "MCP Dashboard API", status: "active", dept: "System" },
  { id: "jKRUMxAPh85KA3NH", name: "Viral Content Calendar", status: "error", dept: "Content", error: "REPLACE_WITH_ANTHROPIC_KEY" },
];

const CREDENTIALS = [
  { service: "Supabase", key: "Project ID", value: "dzlmtvodpyhetvektfuo", type: "id" },
  { service: "Supabase", key: "URL", value: "https://dzlmtvodpyhetvektfuo.supabase.co", type: "url" },
  { service: "n8n", key: "Instance", value: "dorsey.app.n8n.cloud", type: "url" },
  { service: "GHL", key: "Agency ID", value: "2wRk01C87UqX19yrailL", type: "id" },
  { service: "GHL", key: "API Base", value: "https://services.leadconnectorhq.com", type: "url" },
  { service: "MCP Gateway", key: "Webhook", value: "7rf75NwxA5swZInA", type: "key" },
  { service: "Dept 33", key: "Edge Function", value: "dept33-executive-command", type: "id" },
  { service: "GitHub", key: "Account", value: "https://github.com/dolodorsey", type: "url" },
  { service: "GHL HugLife", key: "Location ID", value: "tGbC7nJkOkH5G3RiyjKR", type: "id" },
  { service: "GHL Casper", key: "Location ID", value: "IPP6mHiRgKtIAHOOueHS", type: "id" },
  { service: "GHL Umbrella", key: "Location ID", value: "78C8jSFZhpH9MxiKUtFc", type: "id" },
  { service: "GHL Dr. Dorsey", key: "Location ID", value: "FTJ4gOGLsZazXuve0YSY", type: "id" },
  { service: "Google Drive", key: "Graphics Gen", value: "1K8TRF9V1E3e-l4etIIVckFokSy53ezuH", type: "id" },
  { service: "Google Drive", key: "Event Logos", value: "1VU1UWCqJ4DQszchEDh9H1hF0k2EqmNk1", type: "id" },
  { service: "Google Drive", key: "NOIR Folder", value: "1DtcEwCr2t1-ihk7lTVNNJu9lbMBXzLVH", type: "id" },
  { service: "Google Drive", key: "Casper Group", value: "1omzzzhpMzkHnwli2NR5Tg9ReBGQEKuay", type: "id" },
  { service: "Sheets", key: "PR Database", value: "18FbI4m-sHrsmV-qm1pgg5BkOiBsFqJY2lYz_zZryd38", type: "id" },
  { service: "Sheets", key: "Master Contacts", value: "1fW3R0hNSwPtWukcfn4ejZ6702aDBPST_rmz5DVUbpKM", type: "id" },
  { service: "Sheets", key: "Social Outreach CC", value: "1-CFQeoT1x6KTQkwEbZpb1OxB4pguro4h", type: "id" },
  { service: "Sheets", key: "Good Times Dir", value: "1pzvjbDbl1UKYFDJ-LSWQuJE9I8XDBNOg-fjLb2amo6Q", type: "id" },
];

const TEAM = [
  { name: "Linda", role: "VA", entities: ["All"], dispatch: "bZ4QrBi5QmqICSR8" },
  { name: "Bax", role: "Core Team", entities: ["HugLife","Futbol","Products"] },
  { name: "Brittany", role: "Core Team", entities: ["Futbol","Umbrella"] },
  { name: "Alandra", role: "Core Team", entities: ["Casper","Futbol","Products"] },
  { name: "Brad", role: "Core Team", entities: ["Casper","Infinity Water","Pronto Energy"] },
  { name: "Myia B", role: "Mind Studio", entities: ["Contract","Licensing","Hiring"] },
  { name: "Nicholas", role: "Tour/Event", entities: ["Events"] },
  { name: "Vincent", role: "Tour/Event", entities: ["Events"] },
  { name: "Dom", role: "Tour/Event", entities: ["Events"] },
  { name: "Eric", role: "Tour/Event", entities: ["Events"] },
  { name: "Kenny", role: "Tour/Event", entities: ["Events"] },
  { name: "Kei", role: "Tour/Event", entities: ["Events"] },
];

const DEPARTMENTS = [
  { num: 1, name: "Lead Sourcing", div: "Revenue", status: "activating" },
  { num: 2, name: "Data Enrichment", div: "Revenue", status: "activating" },
  { num: 3, name: "Scraping Architecture", div: "Revenue", status: "planned" },
  { num: 4, name: "Deal Qualification", div: "Revenue", status: "planned" },
  { num: 5, name: "Deal Strategy", div: "Revenue", status: "planned" },
  { num: 6, name: "Outreach Writing", div: "Revenue", status: "activating" },
  { num: 7, name: "Follow-Up Enforcement", div: "Revenue", status: "planned" },
  { num: 8, name: "Closing", div: "Revenue", status: "planned" },
  { num: 9, name: "Grants Radar", div: "Revenue", status: "planned" },
  { num: 10, name: "Grants Writing", div: "Revenue", status: "planned" },
  { num: 11, name: "What's Hot Intel", div: "Growth", status: "activating" },
  { num: 12, name: "Content Strategy", div: "Growth", status: "activating" },
  { num: 13, name: "Social Media Ops", div: "Growth", status: "planned" },
  { num: 14, name: "Campaign Strategy", div: "Growth", status: "planned" },
  { num: 15, name: "Prompt Writing", div: "Growth", status: "planned" },
  { num: 16, name: "Graphics", div: "Creative", status: "activating" },
  { num: 17, name: "Video Production", div: "Creative", status: "planned" },
  { num: 18, name: "Short-Form Editing", div: "Creative", status: "planned" },
  { num: 19, name: "AI Persona Testimonials", div: "Creative", status: "planned" },
  { num: 20, name: "Commercial Build", div: "Creative", status: "planned" },
  { num: 21, name: "App Planning", div: "Product", status: "planned" },
  { num: 22, name: "App UI Architecture", div: "Product", status: "planned" },
  { num: 23, name: "App Coding", div: "Product", status: "planned" },
  { num: 24, name: "App Debugging", div: "Product", status: "planned" },
  { num: 25, name: "Website Strategy", div: "Product", status: "planned" },
  { num: 26, name: "Website UI", div: "Product", status: "planned" },
  { num: 27, name: "Website Coding", div: "Product", status: "planned" },
  { num: 28, name: "Workflow Architecture", div: "Operations", status: "planned" },
  { num: 29, name: "Task Management", div: "Operations", status: "planned" },
  { num: 30, name: "GoHighLevel", div: "Operations", status: "activating" },
  { num: 31, name: "n8n Automation", div: "Operations", status: "activating" },
  { num: 32, name: "AI Systems / MCP", div: "Operations", status: "planned" },
  { num: 33, name: "Executive Command", div: "Operations", status: "active" },
];

const BLOCKERS = [
  { item: "455 engagement seed targets are placeholders", system: "Supabase", severity: "medium" },
  { item: "16 GHL locations need manual OAuth", system: "GHL", severity: "high" },
  { item: "Viral Content Calendar missing API key", system: "n8n", severity: "high" },
  { item: "Good Times venue count below threshold", system: "App", severity: "medium" },
  { item: "18 dept SOPs not yet seeded", system: "Supabase", severity: "medium" },
  { item: "Playwright + Remotion repos not pushed", system: "GitHub", severity: "low" },
  { item: "Autonomous ops not wired to n8n crons", system: "n8n", severity: "medium" },
  { item: "Google Contacts sync broken (n8n v2.10.4 bug)", system: "n8n", severity: "high" },
];

const POSTING_SCHEDULE = {
  dorsey: {
    feed: ["08:30","11:30","15:00","18:30","21:00"],
    stories: ["07:30","09:00","10:30","12:00","13:30","15:30","17:00","19:00","21:00","22:30"],
    pillars: { "Empire Building": 25, "Thought Leadership": 20, "Culture": 20, "Behind Scenes": 15, "Product Drops": 10, "Personal": 10 }
  }
};

const EMAIL_ROUTING = [
  { dest: "HugLife / Events / ICONIC", email: "justhuglife.forever@gmail.com", cc: "dolodorsey@gmail.com + drdorseyassistant@gmail.com" },
  { dest: "Casper Group", email: "info@caspergroupworldwide.com", cc: "—" },
  { dest: "Umbrella Group", email: "theumbrellagroupworldwide@gmail.com", cc: "—" },
  { dest: "Forever Futbol / Museums", email: "foreverfutbolmuseum@gmail.com", cc: "—" },
  { dest: "Personal / Team", email: "dolodorsey@gmail.com", cc: "—" },
  { dest: "Business / New Contacts", email: "thedoctordorsey@gmail.com", cc: "—" },
  { dest: "Assistant / Ops", email: "drdorseyassistant@gmail.com", cc: "—" },
  { dest: "Company-wide", email: "thekollectivehospitality@gmail.com", cc: "—" },
];

const DM_TEMPLATES = [
  { name: "Cold Intro - Venue", body: "Hey [name] — love what y'all are building at [venue]. We're producing [event] on [date] in [city] and your space is exactly the energy. Worth a quick chat?" },
  { name: "Cold Intro - Sponsor", body: "Hey [name] — [brand] keeps showing up in our world. We're activating [event] across [cities] this year and I think there's a play. 5 min?" },
  { name: "Follow-Up - Warm", body: "Hey [name] — circling back on [topic]. Still interested in connecting. Let me know what works." },
  { name: "Collab Pitch", body: "Hey [name] — been watching your content. We're doing something special with [event] and I think you'd be perfect for it. DM me back." },
  { name: "Thank You - Post Event", body: "Hey [name] — appreciate you pulling up to [event]. That energy was everything. More coming soon." },
];

// ── ICONS (inline SVG) ─────────────────────────────────────

const Icon = ({ name, size = 16 }) => {
  const s = { width: size, height: size, display: "inline-block", verticalAlign: "middle" };
  const icons = {
    home: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    menu: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    cmd: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg>,
    settings: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    system: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    key: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    mail: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    send: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    calendar: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    task: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    social: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
    target: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    image: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    dm: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
    output: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    alert: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    copy: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
    check: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    chevron: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    expand: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
    link: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
    play: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    pause: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
    user: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    search: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    zap: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    globe: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  };
  return icons[name] || null;
};

// ── UTILITY ─────────────────────────────────────────────────

const daysUntil = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date("2026-03-12");
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
};

const copyToClipboard = (text, setCopied) => {
  if (navigator.clipboard) navigator.clipboard.writeText(text);
  setCopied(text);
  setTimeout(() => setCopied(null), 2000);
};

// ── STYLES ──────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --bg: #060606; --surface: #0d0d0d; --surface2: #141414; --surface3: #1c1c1c;
    --border: rgba(255,255,255,0.06); --border2: rgba(255,255,255,0.12); --border3: rgba(255,255,255,0.2);
    --text: #e8e8e8; --text2: #888888; --text3: #555555;
    --accent: #FF6B35; --accent2: #FF8F66; --accent-glow: rgba(255,107,53,0.12);
    --green: #34C759; --red: #FF3B30; --yellow: #FFD60A; --blue: #0A84FF;
    --radius: 10px; --radius-sm: 6px;
  }
  @keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.4 } }
  @keyframes glowPulse { 0%,100% { box-shadow:0 0 4px var(--accent) } 50% { box-shadow:0 0 16px var(--accent) } }
  .fade-in { animation: fadeIn .4s cubic-bezier(.16,1,.3,1) both }
  .fade-d1{animation-delay:.05s}.fade-d2{animation-delay:.1s}.fade-d3{animation-delay:.15s}.fade-d4{animation-delay:.2s}.fade-d5{animation-delay:.25s}.fade-d6{animation-delay:.3s}
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
  
  .dashboard { display: flex; height: 100vh; overflow: hidden; background: var(--bg); }
  
  /* SIDEBAR */
  .sidebar {
    width: 252px; min-width: 252px; background: var(--surface); border-right: 1px solid var(--border);
    display: flex; flex-direction: column; overflow: hidden; transition: all 0.25s cubic-bezier(.16,1,.3,1);
  }
  .sidebar.collapsed { width: 52px; min-width: 52px; }
  .sidebar.collapsed .nav-label, .sidebar.collapsed .sidebar-header span, .sidebar.collapsed .sidebar-section-title,
  .sidebar.collapsed .entity-tag { display: none; }
  .sidebar.collapsed .nav-item { justify-content: center; padding: 10px 0; }
  .sidebar-header {
    padding: 16px 16px 12px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border);
    cursor: pointer; user-select: none;
  }
  .sidebar-header .logo { width: 28px; height: 28px; border-radius: 7px; background: linear-gradient(135deg, var(--accent), #e55a20); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; color: #000; flex-shrink: 0; letter-spacing: .02em; }
  .sidebar-header span { font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text2); }
  .sidebar-section-title { padding: 16px 16px 6px; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text3); }
  .nav-item {
    display: flex; align-items: center; gap: 9px; padding: 7px 14px; cursor: pointer;
    color: var(--text2); font-size: 12.5px; transition: all 0.15s; border-left: 2px solid transparent;
    position: relative; font-weight: 500;
  }
  .nav-item:hover { color: var(--text); background: rgba(255,255,255,0.025); }
  .nav-item.active { color: var(--accent); background: var(--accent-glow); border-left-color: var(--accent); }
  .nav-item.active::after { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:2px; height:16px; background:var(--accent); border-radius:1px; box-shadow:0 0 8px var(--accent); }
  .nav-label { white-space: nowrap; }
  .entity-tag { font-size: 9px; padding: 1px 5px; border-radius: 3px; background: rgba(255,255,255,0.06); color: var(--text3); margin-left: auto; }
  
  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    height: 52px; min-height: 52px; border-bottom: 1px solid var(--border); display: flex; align-items: center;
    padding: 0 20px; gap: 12px; background: var(--surface);
  }
  .topbar-title { font-size: 15px; font-weight: 600; }
  .topbar-sub { font-size: 12px; color: var(--text3); font-family: 'DM Mono', monospace; }
  .topbar-right { margin-left: auto; display: flex; gap: 8px; align-items: center; }
  .content { flex: 1; overflow-y: auto; padding: 20px; }
  
  /* CARDS */
  .card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 16px; transition: all 0.2s;
  }
  .card:hover { border-color: var(--border2); }
  .card-glow:hover { border-color: rgba(255,107,53,0.25); box-shadow: 0 0 20px rgba(255,107,53,0.06); }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .card-title { font-size: 13px; font-weight: 600; letter-spacing: 0.02em; }
  .card-subtitle { font-size: 11px; color: var(--text3); font-family: 'DM Mono', monospace; }
  
  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  
  /* STAT */
  .stat-val { font-size: 32px; font-weight: 700; font-family: 'DM Mono', monospace; line-height: 1; letter-spacing: -0.02em; }
  .stat-label { font-size: 10px; color: var(--text3); margin-top: 6px; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; }
  .stat-card { position: relative; overflow: hidden; }
  .stat-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), transparent); opacity: 0.4; }
  
  /* BADGES */
  .badge { display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 4px; font-size: 9.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
  .badge-green { background: rgba(52,199,89,0.15); color: var(--green); }
  .badge-red { background: rgba(255,59,48,0.15); color: var(--red); }
  .badge-yellow { background: rgba(255,214,10,0.15); color: var(--yellow); }
  .badge-blue { background: rgba(10,132,255,0.15); color: var(--blue); }
  .badge-orange { background: rgba(255,107,53,0.15); color: var(--accent); }
  .badge-gray { background: rgba(255,255,255,0.06); color: var(--text3); }
  
  /* BUTTONS */
  .btn {
    padding: 7px 14px; border-radius: var(--radius-sm); border: none; cursor: pointer;
    font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: all 0.15s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-primary { background: var(--accent); color: #000; }
  .btn-primary:hover { filter: brightness(1.15); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,107,53,0.3); }
  .btn-ghost { background: transparent; border: 1px solid var(--border2); color: var(--text2); }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
  .btn-sm { padding: 4px 10px; font-size: 11px; }
  .btn-danger { background: rgba(255,59,48,0.15); color: var(--red); }
  
  /* TABLE */
  .tbl { width: 100%; border-collapse: collapse; font-size: 12px; }
  .tbl th { text-align: left; padding: 8px 10px; color: var(--text3); font-weight: 500; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid var(--border); }
  .tbl td { padding: 8px 10px; border-bottom: 1px solid var(--border); color: var(--text2); }
  .tbl tr:hover td { color: var(--text); background: rgba(255,255,255,0.02); }
  
  /* MISC */
  .mono { font-family: 'DM Mono', monospace; }
  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .section-title { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text3); margin-bottom: 12px; }
  .entity-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
  .pill-tab {
    padding: 6px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; transition: all 0.15s;
    border: 1px solid var(--border); color: var(--text3); background: transparent;
  }
  .pill-tab.active { background: var(--accent); color: #000; border-color: var(--accent); font-weight: 600; }
  .pill-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
  .copy-btn { cursor: pointer; opacity: 0.4; transition: opacity 0.15s; }
  .copy-btn:hover { opacity: 1; }
  .input {
    background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm);
    padding: 8px 12px; color: var(--text); font-size: 13px; font-family: 'DM Sans', sans-serif;
    width: 100%; outline: none; transition: border-color 0.15s;
  }
  .input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
  .textarea { resize: vertical; min-height: 80px; }
  .expandable { cursor: pointer; user-select: none; }
  .expandable-content { overflow: hidden; transition: max-height 0.3s; }
  .scroll-y { overflow-y: auto; }
  
  /* ENTITY CARD */
  .entity-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 14px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
  }
  .entity-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .entity-card:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .entity-card .entity-name { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .entity-card .entity-division { font-size: 11px; color: var(--text3); }
  
  /* EVENT CARD */
  .event-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 14px; display: flex; gap: 12px; transition: border-color 0.2s;
  }
  .event-card:hover { border-color: var(--border2); transform: translateX(3px); }
  .event-date-block {
    width: 48px; text-align: center; flex-shrink: 0;
  }
  .event-date-block .month { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
  .event-date-block .day { font-size: 22px; font-weight: 700; font-family: 'DM Mono', monospace; line-height: 1.2; }
  
  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
  
  @media (max-width: 768px) {
    .sidebar { position: fixed; z-index: 100; left: -260px; }
    .sidebar.open { left: 0; }
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  }
`;

// ══════════════════════════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════════════════════════

// ── HOME ────────────────────────────────────────────────────

function HomeScreen({ navigate }) {
  const [expanded, setExpanded] = useState(null);
  const nextEvents = EVENTS_2026.filter(e => daysUntil(e.date) > 0).sort((a,b) => daysUntil(a.date) - daysUntil(b.date)).slice(0,5);
  const activeWorkflows = WORKFLOWS.filter(w => w.status === "active").length;
  const errorWorkflows = WORKFLOWS.filter(w => w.status === "error").length;
  const activeDepts = DEPARTMENTS.filter(d => d.status === "active" || d.status === "activating").length;

  return (
    <div>
      <div className="grid-4" style={{ marginBottom: 16 }}>
        <div className="card stat-card fade-in fade-d1">
          <div className="stat-val" style={{ color: "var(--accent)" }}>{Object.keys(ENTITIES).length}</div>
          <div className="stat-label">Active Entities</div>
        </div>
        <div className="card stat-card fade-in fade-d2">
          <div className="stat-val" style={{ color: "var(--green)" }}>{activeWorkflows}</div>
          <div className="stat-label">Workflows Live</div>
        </div>
        <div className="card stat-card fade-in fade-d3">
          <div className="stat-val" style={{ color: "var(--yellow)" }}>{EVENTS_2026.length}</div>
          <div className="stat-label">Events 2026</div>
        </div>
        <div className="card stat-card fade-in fade-d4">
          <div className="stat-val" style={{ color: "var(--blue)" }}>{activeDepts}/33</div>
          <div className="stat-label">Depts Active</div>
        </div>
      </div>

      {errorWorkflows > 0 && (
        <div className="card" style={{ marginBottom: 16, borderColor: "rgba(255,59,48,0.3)", background: "rgba(255,59,48,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", animation: "pulse 2s infinite" }} />
            <span style={{ color: "var(--red)", fontWeight: 600, fontSize: 12 }}>{errorWorkflows} workflow error{errorWorkflows > 1 ? "s" : ""}</span>
            <span style={{ fontSize: 11, color: "var(--text3)", flex: 1 }}>Viral Content Calendar — missing API key</span>
            <button className="btn btn-sm btn-danger" onClick={() => navigate("system")}>Fix Now</button>
          </div>
        </div>
      )}

      {BLOCKERS.filter(b => b.severity === "high").length > 0 && (
        <div className="card" style={{ marginBottom: 16, borderColor: "rgba(255,214,10,0.3)", background: "rgba(255,214,10,0.03)" }}>
          <div className="card-title" style={{ marginBottom: 8, color: "var(--yellow)" }}><Icon name="alert" size={14} /> Active Blockers</div>
          {BLOCKERS.filter(b => b.severity === "high").map((b, i) => (
            <div key={i} style={{ fontSize: 12, color: "var(--text2)", padding: "4px 0", display: "flex", gap: 8 }}>
              <span className="badge badge-yellow" style={{ flexShrink: 0 }}>{b.system}</span>
              <span>{b.item}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 12 }}>Entities</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {Object.entries(ENTITIES).map(([key, ent]) => (
              <div key={key} className="entity-card" onClick={() => setExpanded(expanded === key ? null : key)}
                style={{ borderLeftColor: ent.color, borderLeftWidth: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${ent.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: ent.color, flexShrink: 0 }}>
                      {ent.name[0]}
                    </div>
                    <div>
                      <div className="entity-name">{ent.name}</div>
                      <div className="entity-division">{ent.division}{ent.brands ? ` · ${ent.brands.length} brands` : ""}{ent.events ? ` · ${ent.events.length} events` : ""}</div>
                    </div>
                  </div>
                  <Icon name={expanded === key ? "expand" : "chevron"} size={14} />
                </div>
                {expanded === key && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)", animation: "fadeIn .3s ease" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11, color: "var(--text2)" }}>
                      {ent.email && <div><span style={{ color: "var(--text3)" }}>Email</span><br/>{ent.email}</div>}
                      {ent.ig && <div><span style={{ color: "var(--text3)" }}>Instagram</span><br/><span style={{ color: ent.color }}>{ent.ig}</span></div>}
                      {ent.ghl && <div><span style={{ color: "var(--text3)" }}>GHL</span><br/><span className="mono" style={{ fontSize: 10 }}>{ent.ghl}</span></div>}
                      {ent.brands && <div style={{ gridColumn: "1 / -1" }}><span style={{ color: "var(--text3)" }}>Brands</span><br/>{ent.brands.join(" · ")}</div>}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <button className="btn btn-sm btn-ghost" onClick={(e) => { e.stopPropagation(); navigate("social", key); }}>Social</button>
                      <button className="btn btn-sm btn-ghost" onClick={(e) => { e.stopPropagation(); navigate("outreach", key); }}>Outreach</button>
                      <button className="btn btn-sm btn-ghost" onClick={(e) => { e.stopPropagation(); navigate("events", key); }}>Events</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 12 }}>Upcoming Events</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {nextEvents.map((ev, i) => {
              const d = new Date(ev.date);
              const days = daysUntil(ev.date);
              const ent = ENTITIES[ev.entity];
              return (
                <div key={i} className="event-card">
                  <div className="event-date-block">
                    <div className="month" style={{ color: ent?.color }}>{d.toLocaleDateString("en-US",{month:"short"})}</div>
                    <div className="day">{d.getDate()}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{ev.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{ev.city}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                      <span className={`badge ${days <= 30 ? "badge-red" : days <= 60 ? "badge-yellow" : "badge-blue"}`}>{days}d</span>
                      <span className="badge badge-gray">{ev.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width: "100%" }} onClick={() => navigate("events")}>View All Events</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 10 }}>Posting Schedule — Dr. Dorsey</div>
        <div className="grid-2">
          <div>
            <div className="section-title">Feed (5/day)</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {POSTING_SCHEDULE.dorsey.feed.map((t,i) => <span key={i} className="badge badge-orange">{t}</span>)}
            </div>
          </div>
          <div>
            <div className="section-title">Stories (10/day)</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {POSTING_SCHEDULE.dorsey.stories.map((t,i) => <span key={i} className="badge badge-gray">{t}</span>)}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div className="section-title">Pillars</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(POSTING_SCHEDULE.dorsey.pillars).map(([k,v]) => (
              <div key={k} style={{ fontSize: 11, color: "var(--text2)" }}><span style={{ color: "var(--accent)", fontWeight: 600 }}>{v}%</span> {k}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── COMMANDS ────────────────────────────────────────────────

function CommandsScreen() {
  const [selectedEntity, setSelectedEntity] = useState("all");
  const commands = [
    { cmd: "dept33 intake", desc: "Submit task to Dept 33 queue", entity: "all" },
    { cmd: "dept33 daily_memo", desc: "Generate executive daily briefing", entity: "all" },
    { cmd: "dept33 war_room", desc: "Activate war room for event", entity: "all" },
    { cmd: "dept33 status", desc: "Get system-wide status check", entity: "all" },
    { cmd: "dept33 prioritize", desc: "Rerank all active tasks", entity: "all" },
    { cmd: "dept33 generate_prompt", desc: "Generate visual prompt from template", entity: "all" },
    { cmd: "dept33 get_agent_sop", desc: "Pull agent SOP by dept/agent", entity: "all" },
    { cmd: "dept33 ops_status", desc: "Full operational status report", entity: "all" },
    { cmd: "dept33 run_checklist", desc: "Run daily ops checklist", entity: "all" },
    { cmd: "dept33 get_visual_direction", desc: "Get brand visual direction", entity: "all" },
    { cmd: "content factory", desc: "Trigger content generation pipeline", entity: "all" },
    { cmd: "dispatch linda", desc: "Send task to Linda via VA dispatch", entity: "all" },
    { cmd: "pr pitch [entity]", desc: "Generate PR pitch + auto-followup", entity: "all" },
    { cmd: "sponsor outreach [event]", desc: "Run sponsor outreach engine", entity: "huglife" },
    { cmd: "influencer outreach [city]", desc: "Run influencer discovery + DM", entity: "huglife" },
    { cmd: "newsletter [entity]", desc: "Generate + send newsletter", entity: "all" },
    { cmd: "ig comments [entity]", desc: "Auto-comment engine for entity", entity: "all" },
    { cmd: "social dms [entity]", desc: "Generate + queue DMs", entity: "all" },
    { cmd: "content calendar", desc: "Build viral content calendar", entity: "dorsey" },
  ];

  const filtered = selectedEntity === "all" ? commands : commands.filter(c => c.entity === "all" || c.entity === selectedEntity);

  return (
    <div>
      <div className="pill-tabs">
        <button className={`pill-tab ${selectedEntity === "all" ? "active" : ""}`} onClick={() => setSelectedEntity("all")}>All</button>
        {Object.entries(ENTITIES).slice(0, 6).map(([k, e]) => (
          <button key={k} className={`pill-tab ${selectedEntity === k ? "active" : ""}`}
            style={selectedEntity === k ? { background: e.color, borderColor: e.color } : {}}
            onClick={() => setSelectedEntity(k)}>{e.name}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map((c, i) => (
          <div key={i} className="card card-glow" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--surface3)" }} />
            <code className="mono" style={{ color: "var(--accent)", fontSize: 12, minWidth: 220, fontWeight: 500 }}>{c.cmd}</code>
            <span style={{ fontSize: 12, color: "var(--text2)", flex: 1 }}>{c.desc}</span>
            <span className="badge badge-gray">{c.entity}</span>
            <button className="btn btn-sm btn-primary"><Icon name="play" size={10} /> Run</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SETTINGS ────────────────────────────────────────────────

function SettingsScreen() {
  const [copied, setCopied] = useState(null);
  return (
    <div>
      <div className="section-title">Credentials & Keys</div>
      <div className="card" style={{ padding: 0 }}>
        <table className="tbl">
          <thead>
            <tr><th>Service</th><th>Key</th><th>Value</th><th></th></tr>
          </thead>
          <tbody>
            {CREDENTIALS.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: "var(--text)" }}>{c.service}</td>
                <td>{c.key}</td>
                <td><code className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{c.value}</code></td>
                <td>
                  <span className="copy-btn" onClick={() => copyToClipboard(c.value, setCopied)}>
                    {copied === c.value ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider" />
      <div className="section-title">Email Routing</div>
      <div className="card" style={{ padding: 0 }}>
        <table className="tbl">
          <thead><tr><th>Destination</th><th>Email</th><th>CC</th></tr></thead>
          <tbody>
            {EMAIL_ROUTING.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: "var(--text)" }}>{r.dest}</td>
                <td><code className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{r.email}</code></td>
                <td style={{ fontSize: 11 }}>{r.cc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider" />
      <div className="section-title">System Config</div>
      <div className="grid-3">
        <div className="card">
          <div className="card-subtitle">Primary AI</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Claude Sonnet 4</div>
        </div>
        <div className="card">
          <div className="card-subtitle">Image Gen</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>NanoBanana2</div>
        </div>
        <div className="card">
          <div className="card-subtitle">Video Gen</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Veo3 + Remotion</div>
        </div>
      </div>
    </div>
  );
}

// ── SYSTEM ──────────────────────────────────────────────────

function SystemScreen() {
  const [tab, setTab] = useState("workflows");
  return (
    <div>
      <div className="pill-tabs">
        {["workflows","departments","blockers","health"].map(t => (
          <button key={t} className={`pill-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "workflows" && (
        <div className="card" style={{ padding: 0 }}>
          <table className="tbl">
            <thead><tr><th>Workflow</th><th>ID</th><th>Dept</th><th>Status</th></tr></thead>
            <tbody>
              {WORKFLOWS.map((w, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{w.name}</td>
                  <td><code className="mono" style={{ fontSize: 11 }}>{w.id}</code></td>
                  <td><span className="badge badge-gray">{w.dept}</span></td>
                  <td>
                    <span className={`badge ${w.status === "active" ? "badge-green" : "badge-red"}`}>{w.status}</span>
                    {w.error && <div style={{ fontSize: 10, color: "var(--red)", marginTop: 2 }}>{w.error}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "departments" && (
        <div>
          {["Revenue","Growth","Creative","Product","Operations"].map(div => (
            <div key={div} style={{ marginBottom: 16 }}>
              <div className="section-title">{div}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {DEPARTMENTS.filter(d => d.div === div).map(d => (
                  <div key={d.num} className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 14px" }}>
                    <span className="mono" style={{ color: "var(--text3)", fontSize: 11, width: 24 }}>#{d.num}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{d.name}</span>
                    <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--surface3)", overflow: "hidden" }}>
                      <div style={{ width: d.status === "active" ? "100%" : d.status === "activating" ? "60%" : "0%", height: "100%", background: d.status === "active" ? "var(--green)" : "var(--accent)", borderRadius: 2, transition: "width 0.5s" }} />
                    </div>
                    <span className={`badge ${d.status === "active" ? "badge-green" : d.status === "activating" ? "badge-orange" : "badge-gray"}`}>{d.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "blockers" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {BLOCKERS.map((b, i) => (
            <div key={i} className="card" style={{ display: "flex", alignItems: "flex-start", gap: 12, borderLeftWidth: 3,
              borderLeftColor: b.severity === "high" ? "var(--red)" : b.severity === "medium" ? "var(--yellow)" : "var(--text3)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{b.item}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <span className="badge badge-gray">{b.system}</span>
                  <span className={`badge ${b.severity === "high" ? "badge-red" : b.severity === "medium" ? "badge-yellow" : "badge-gray"}`}>{b.severity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "health" && (
        <div className="grid-3">
          <div className="card">
            <div className="card-subtitle">Supabase</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span className="entity-dot" style={{ background: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Healthy</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>220+ tables · 112K contacts</div>
          </div>
          <div className="card">
            <div className="card-subtitle">n8n</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span className="entity-dot" style={{ background: "var(--green)" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>119/200 Active</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>dorsey.app.n8n.cloud</div>
          </div>
          <div className="card">
            <div className="card-subtitle">GHL</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span className="entity-dot" style={{ background: "var(--yellow)" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Partial</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>16 locations need OAuth</div>
          </div>
          <div className="card">
            <div className="card-subtitle">MCP Gateway</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span className="entity-dot" style={{ background: "var(--green)" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Online</span>
            </div>
          </div>
          <div className="card">
            <div className="card-subtitle">Dept 33 Edge</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span className="entity-dot" style={{ background: "var(--green)" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>10 Actions</span>
            </div>
          </div>
          <div className="card">
            <div className="card-subtitle">Google Contacts Sync</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span className="entity-dot" style={{ background: "var(--red)" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Broken</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>n8n v2.10.4 bug</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── DIRECTORY ───────────────────────────────────────────────

function DirectoryScreen() {
  const [copied, setCopied] = useState(null);
  const [filter, setFilter] = useState("");
  const allCreds = CREDENTIALS.filter(c =>
    !filter || c.service.toLowerCase().includes(filter.toLowerCase()) || c.key.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <input className="input" placeholder="Filter credentials..." value={filter} onChange={e => setFilter(e.target.value)} style={{ marginBottom: 16 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {allCreds.map((c, i) => (
          <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
            <span className="badge badge-blue" style={{ minWidth: 80, justifyContent: "center" }}>{c.service}</span>
            <span style={{ fontSize: 12, color: "var(--text2)", width: 120 }}>{c.key}</span>
            <code className="mono" style={{ fontSize: 11, color: "var(--accent)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</code>
            <span className="copy-btn" onClick={() => copyToClipboard(c.value, setCopied)}>
              {copied === c.value ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── OUTREACH ────────────────────────────────────────────────

function OutreachScreen({ entityFilter }) {
  const [entity, setEntity] = useState(entityFilter || "all");
  const outreachTypes = [
    { type: "Sponsor", workflow: "ThKwcVTGnpXIoOEE", entities: ["huglife","noir","futbol"], status: "active", runs: 89 },
    { type: "Influencer", workflow: "0paDyU807bccvZYQ", entities: ["huglife","noir","dorsey"], status: "active", runs: 156 },
    { type: "PR Pitch", workflow: "bGdwLiVFcqP0FcIG", entities: ["all"], status: "active", runs: 203 },
    { type: "PR Enrich", workflow: "LQRDE7gsrTVm7rms", entities: ["all"], status: "active", runs: 178 },
    { type: "Newsletter", workflow: "LOuffRVoxtPHsCuZ", entities: ["all"], status: "active", runs: 234 },
    { type: "Cold Email", workflow: "3jDssrDbi21CLhn6", entities: ["casper","umbrella","futbol"], status: "active", runs: 847 },
    { type: "IG Comments", workflow: "tyQSD2mJl8W9VDm0", entities: ["all"], status: "active", runs: 1205 },
    { type: "Social DMs", workflow: "zn2uHhkUROJqKzEG", entities: ["all"], status: "active", runs: 563 },
  ];

  const filtered = entity === "all" ? outreachTypes : outreachTypes.filter(o => o.entities.includes("all") || o.entities.includes(entity));

  return (
    <div>
      <div className="pill-tabs">
        <button className={`pill-tab ${entity === "all" ? "active" : ""}`} onClick={() => setEntity("all")}>All</button>
        {Object.entries(ENTITIES).slice(0, 7).map(([k, e]) => (
          <button key={k} className={`pill-tab ${entity === k ? "active" : ""}`}
            style={entity === k ? { background: e.color, borderColor: e.color } : {}}
            onClick={() => setEntity(k)}>{e.name}</button>
        ))}
      </div>
      <div className="grid-2">
        {filtered.map((o, i) => (
          <div key={i} className="card card-glow">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{o.type}</span>
              <span className={`badge ${o.status === "active" ? "badge-green" : "badge-gray"}`}>{o.status}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <code className="mono" style={{ fontSize: 10, color: "var(--text3)" }}>{o.workflow}</code>
              <span style={{ fontSize: 10, color: "var(--text3)" }}>{o.runs?.toLocaleString()} runs</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button className="btn btn-sm btn-primary"><Icon name="play" size={12} /> Run</button>
              <button className="btn btn-sm btn-ghost">Config</button>
              <button className="btn btn-sm btn-ghost">Logs</button>
            </div>
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="section-title">Data Sources</div>
      <div className="grid-3">
        <div className="card">
          <div className="card-subtitle">PR Database</div>
          <code className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>18FbI4m-...yd38</code>
        </div>
        <div className="card">
          <div className="card-subtitle">Master Contacts</div>
          <code className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>1fW3R0h...pKM</code>
        </div>
        <div className="card">
          <div className="card-subtitle">Social Outreach CC</div>
          <code className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>1-CFQeoT...4h</code>
        </div>
      </div>
    </div>
  );
}

// ── EVENTS ──────────────────────────────────────────────────

function EventsScreen({ entityFilter }) {
  const [entity, setEntity] = useState(entityFilter || "all");
  const filtered = entity === "all" ? EVENTS_2026 : EVENTS_2026.filter(e => e.entity === entity);
  const sorted = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
  const months = {};
  sorted.forEach(ev => { const m = new Date(ev.date).toLocaleDateString("en-US",{month:"long",year:"numeric"}); (months[m] = months[m] || []).push(ev) });

  return (
    <div>
      <div className="pill-tabs">
        <button className={`pill-tab ${entity === "all" ? "active" : ""}`} onClick={() => setEntity("all")}>All ({EVENTS_2026.length})</button>
        {["noir","huglife","futbol","dorsey"].map(k => {
          const ent = ENTITIES[k];
          const count = EVENTS_2026.filter(e => e.entity === k).length;
          return (
            <button key={k} className={`pill-tab ${entity === k ? "active" : ""}`}
              style={entity === k ? { background: ent.color, borderColor: ent.color } : {}}
              onClick={() => setEntity(k)}>{ent.name} ({count})</button>
          );
        })}
      </div>
      {Object.entries(months).map(([month, evs]) => (
        <div key={month} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid var(--border)" }}>{month}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {evs.map((ev, i) => {
          const d = new Date(ev.date);
          const days = daysUntil(ev.date);
          const ent = ENTITIES[ev.entity];
          return (
            <div key={i} className="event-card" style={{ borderLeftWidth: 3, borderLeftColor: ent?.color }}>
              <div className="event-date-block">
                <div className="month" style={{ color: ent?.color }}>{d.toLocaleDateString("en-US",{month:"short"})}</div>
                <div className="day">{d.getDate()}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{ev.name}</div>
                  <span className={`badge ${days <= 0 ? "badge-gray" : days <= 30 ? "badge-red" : days <= 60 ? "badge-yellow" : "badge-blue"}`}>
                    {days <= 0 ? "PAST" : `${days}d`}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{ev.city}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <span className="badge badge-gray">{ev.status}</span>
                  <span className="badge" style={{ background: `${ent?.color}20`, color: ent?.color }}>{ent?.name}</span>
                </div>
              </div>
            </div>
          );
        })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TASKS ───────────────────────────────────────────────────

function TasksScreen() {
  const [groupBy, setGroupBy] = useState("entity");
  const tasks = [
    { task: "Replace 455 placeholder seed targets", entity: "all", assignee: "Linda", priority: "high", status: "in_progress" },
    { task: "Complete 16 GHL OAuth connections", entity: "all", assignee: "Linda", priority: "high", status: "in_progress" },
    { task: "Fix Viral Content Calendar API key", entity: "dorsey", assignee: "System", priority: "high", status: "blocked" },
    { task: "Build venue scraper for Good Times", entity: "innercircle", assignee: "System", priority: "medium", status: "todo" },
    { task: "Seed remaining 18 dept SOPs", entity: "all", assignee: "System", priority: "medium", status: "todo" },
    { task: "Push Playwright repo to GitHub", entity: "all", assignee: "System", priority: "low", status: "todo" },
    { task: "Push Remotion repo to GitHub", entity: "all", assignee: "System", priority: "low", status: "todo" },
    { task: "Wire autonomous ops to n8n crons", entity: "all", assignee: "System", priority: "medium", status: "todo" },
    { task: "Fix Google Contacts sync", entity: "dorsey", assignee: "System", priority: "high", status: "blocked" },
    { task: "NOIR DC sponsor deck", entity: "noir", assignee: "Bax", priority: "high", status: "in_progress" },
    { task: "Forever Futbol partner outreach", entity: "futbol", assignee: "Brittany", priority: "high", status: "in_progress" },
    { task: "Casper Group social content batch", entity: "casper", assignee: "Alandra", priority: "medium", status: "todo" },
  ];

  const groups = groupBy === "entity"
    ? Object.entries(tasks.reduce((acc, t) => { (acc[t.entity] = acc[t.entity] || []).push(t); return acc; }, {}))
    : Object.entries(tasks.reduce((acc, t) => { (acc[t.assignee] = acc[t.assignee] || []).push(t); return acc; }, {}));

  const priorityColor = { high: "badge-red", medium: "badge-yellow", low: "badge-gray" };
  const statusColor = { in_progress: "badge-blue", todo: "badge-gray", blocked: "badge-red", done: "badge-green" };

  return (
    <div>
      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="card stat-card fade-in fade-d1">
          <div className="stat-val" style={{ color: "var(--blue)" }}>{tasks.filter(t => t.status === "in_progress").length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="card stat-card fade-in fade-d2">
          <div className="stat-val" style={{ color: "var(--red)" }}>{tasks.filter(t => t.status === "blocked").length}</div>
          <div className="stat-label">Blocked</div>
        </div>
        <div className="card stat-card fade-in fade-d3">
          <div className="stat-val" style={{ color: "var(--text3)" }}>{tasks.filter(t => t.status === "todo").length}</div>
          <div className="stat-label">To Do</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className={`btn btn-sm ${groupBy === "entity" ? "btn-primary" : "btn-ghost"}`} onClick={() => setGroupBy("entity")}>By Entity</button>
        <button className={`btn btn-sm ${groupBy === "assignee" ? "btn-primary" : "btn-ghost"}`} onClick={() => setGroupBy("assignee")}>By Team Member</button>
      </div>
      {groups.map(([group, items]) => (
        <div key={group} style={{ marginBottom: 16 }}>
          <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {groupBy === "entity" && ENTITIES[group] && <span className="entity-dot" style={{ background: ENTITIES[group].color }} />}
            {groupBy === "entity" ? (ENTITIES[group]?.name || group) : group}
            <span style={{ color: "var(--text3)", fontWeight: 400 }}>({items.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {items.map((t, i) => (
              <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
                borderLeft: `3px solid ${t.status === "blocked" ? "var(--red)" : t.status === "in_progress" ? "var(--blue)" : "var(--surface3)"}` }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${t.status === "blocked" ? "var(--red)" : "var(--border2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {t.status === "in_progress" && <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--blue)" }} />}
                </div>
                <span style={{ fontSize: 13, flex: 1 }}>{t.task}</span>
                <span className={`badge ${priorityColor[t.priority]}`}>{t.priority}</span>
                <span className={`badge ${statusColor[t.status]}`}>{t.status.replace("_"," ")}</span>
                {groupBy === "entity" && <span style={{ fontSize: 11, color: "var(--text3)", minWidth: 60 }}>{t.assignee}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── SOCIAL ──────────────────────────────────────────────────

function SocialScreen({ entityFilter }) {
  const [entity, setEntity] = useState(entityFilter || "dorsey");
  const ent = ENTITIES[entity];
  const socials = ent?.socials || {};

  return (
    <div>
      <div className="pill-tabs">
        {Object.entries(ENTITIES).map(([k, e]) => (
          Object.keys(e.socials || {}).length > 0 && (
            <button key={k} className={`pill-tab ${entity === k ? "active" : ""}`}
              style={entity === k ? { background: e.color, borderColor: e.color } : {}}
              onClick={() => setEntity(k)}>{e.name}</button>
          )
        ))}
      </div>
      <div className="grid-2" style={{ marginBottom: 16 }}>
        {Object.entries(socials).map(([platform, handle]) => (
          <div key={platform} className="card card-glow" style={{ borderTop: `2px solid ${ent.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{platform}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: ent.color }}>{handle}</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button className="btn btn-sm btn-ghost"><Icon name="dm" size={12} /> DM Queue</button>
                <button className="btn btn-sm btn-ghost"><Icon name="send" size={12} /> Post</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {entity === "dorsey" && (
        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Posting Schedule</div>
          <div className="grid-2">
            <div>
              <div className="section-title">Feed Times</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {POSTING_SCHEDULE.dorsey.feed.map((t, i) => <span key={i} className="badge badge-orange">{t}</span>)}
              </div>
            </div>
            <div>
              <div className="section-title">Story Times</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {POSTING_SCHEDULE.dorsey.stories.map((t, i) => <span key={i} className="badge badge-gray">{t}</span>)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="section-title">Content Pillars</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {Object.entries(POSTING_SCHEDULE.dorsey.pillars).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: `${v * 3}px`, height: 5, borderRadius: 3, background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>{v}% {k}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="divider" />
      <div className="section-title">Quick Actions</div>
      <div className="grid-3">
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}><Icon name="send" size={14} /> Queue Post</button>
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}><Icon name="dm" size={14} /> Send DMs</button>
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}><Icon name="zap" size={14} /> Auto Comment</button>
      </div>
    </div>
  );
}

// ── LEAD ENGINE ─────────────────────────────────────────────

function LeadEngineScreen() {
  const [city, setCity] = useState("Atlanta");
  const cities = ["Atlanta","Houston","Los Angeles","Washington DC","Charlotte","Miami","Las Vegas","New York"];
  const niches = ["Venues","Restaurants","Bars/Lounges","Hotels","Event Spaces","Catering","Retail","Fitness"];
  const [selectedNiches, setSelectedNiches] = useState(["Venues","Restaurants"]);

  return (
    <div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title" style={{ marginBottom: 12 }}>Lead Sourcing Interface</div>
        <div className="grid-2">
          <div>
            <label style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4, display: "block" }}>Target City</label>
            <div className="pill-tabs">
              {cities.map(c => (
                <button key={c} className={`pill-tab ${city === c ? "active" : ""}`} onClick={() => setCity(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4, display: "block" }}>Niches</label>
            <div className="pill-tabs">
              {niches.map(n => (
                <button key={n} className={`pill-tab ${selectedNiches.includes(n) ? "active" : ""}`}
                  onClick={() => setSelectedNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])}>{n}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn btn-primary"><Icon name="search" size={14} /> Source Leads</button>
          <button className="btn btn-ghost"><Icon name="zap" size={14} /> Enrich Existing</button>
          <button className="btn btn-ghost"><Icon name="target" size={14} /> Score & Qualify</button>
        </div>
      </div>
      <div className="grid-4">
        <div className="card stat-card fade-in fade-d1">
          <div className="stat-val" style={{ color: "var(--accent)" }}>112K</div>
          <div className="stat-label">Total Contacts</div>
        </div>
        <div className="card stat-card fade-in fade-d2">
          <div className="stat-val" style={{ color: "var(--green)" }}>2,075</div>
          <div className="stat-label">Personal Contacts</div>
        </div>
        <div className="card stat-card fade-in fade-d3">
          <div className="stat-val" style={{ color: "var(--yellow)" }}>455</div>
          <div className="stat-label">Seed Targets</div>
        </div>
        <div className="card stat-card fade-in fade-d4">
          <div className="stat-val" style={{ color: "var(--blue)" }}>86</div>
          <div className="stat-label">Brand Links</div>
        </div>
      </div>
      <div className="divider" />
      <div className="section-title">Active Pipelines</div>
      <div className="grid-2">
        {["Dept 1: Lead Sourcing","Dept 2: Data Enrichment","Dept 4: Deal Qualification","Dept 6: Outreach Writing"].map((d, i) => (
          <div key={i} className="card">
            <div style={{ fontSize: 13, fontWeight: 500 }}>{d}</div>
            <span className={`badge ${i < 2 ? "badge-orange" : "badge-gray"}`} style={{ marginTop: 6 }}>
              {i < 2 ? "activating" : "planned"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── POST REVIEW ─────────────────────────────────────────────

function PostReviewScreen() {
  const posts = [
    { entity: "dorsey", caption: "The empire isn't built in the spotlight. It's built in the dark rooms where nobody's watching.", status: "approved", pillar: "Empire Building", time: "08:30" },
    { entity: "dorsey", caption: "Your storms don't define you. Your response to the storm does.", status: "on_hold", pillar: "Thought Leadership", time: "11:30" },
    { entity: "noir", caption: "Not a party. An experience. NOIR DC — April 17.", status: "approved", pillar: "Event Promo", time: "15:00" },
    { entity: "dorsey", caption: "Faith without execution is just wishful thinking.", status: "on_hold", pillar: "Faith", time: "15:00" },
    { entity: "huglife", caption: "Taste of Art LA — where culture meets creation. April 24.", status: "approved", pillar: "Event Promo", time: "18:30" },
    { entity: "futbol", caption: "The beautiful game deserves a beautiful home. Forever Futbol Museum — coming this summer.", status: "queued", pillar: "Launch", time: "21:00" },
  ];

  const statusColors = { approved: "badge-green", on_hold: "badge-yellow", queued: "badge-blue", rejected: "badge-red" };

  return (
    <div>
      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="stat-val" style={{ color: "var(--green)" }}>30</div>
          <div className="stat-label">Posts Queued Today (GHL)</div>
        </div>
        <div className="card">
          <div className="stat-val" style={{ color: "var(--yellow)" }}>2</div>
          <div className="stat-label">On Hold (Dorsey + Infinity)</div>
        </div>
        <div className="card">
          <div className="stat-val" style={{ color: "var(--blue)" }}>4</div>
          <div className="stat-label">Approved & Scheduled</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {posts.map((p, i) => {
          const ent = ENTITIES[p.entity];
          return (
            <div key={i} className="card" style={{ display: "flex", gap: 12, borderLeftWidth: 3, borderLeftColor: ent?.color }}>
              <div style={{ width: 80, height: 80, borderRadius: 8, background: `linear-gradient(135deg, ${ent?.color}20, ${ent?.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${ent?.color}20` }}>
                <Icon name="image" size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: ent?.color }}>{ent?.name}</span>
                  <span className={`badge ${statusColors[p.status]}`}>{p.status.replace("_"," ")}</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.4, marginBottom: 6 }}>{p.caption}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span className="badge badge-gray">{p.pillar}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text3)" }}>{p.time}</span>
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  {p.status !== "approved" && <button className="btn btn-sm btn-primary">Approve</button>}
                  {p.status !== "rejected" && <button className="btn btn-sm btn-ghost">Edit</button>}
                  <button className="btn btn-sm btn-danger">Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── INSTAGRAM DMs ───────────────────────────────────────────

function InstagramDMsScreen() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  return (
    <div>
      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>DM Queue</div>
          {[
            { handle: "@venue_atl_1", entity: "huglife", template: "Cold Intro - Venue", status: "queued" },
            { handle: "@sponsor_brand_2", entity: "noir", template: "Cold Intro - Sponsor", status: "queued" },
            { handle: "@collab_creator_3", entity: "dorsey", template: "Collab Pitch", status: "sent" },
            { handle: "@follow_up_4", entity: "futbol", template: "Follow-Up - Warm", status: "queued" },
            { handle: "@post_event_5", entity: "huglife", template: "Thank You - Post Event", status: "sent" },
          ].map((dm, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
              <span className="entity-dot" style={{ background: ENTITIES[dm.entity]?.color }} />
              <span style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{dm.handle}</span>
              <span className="badge badge-gray" style={{ fontSize: 9 }}>{dm.template}</span>
              <span className={`badge ${dm.status === "sent" ? "badge-green" : "badge-blue"}`}>{dm.status}</span>
            </div>
          ))}
          <button className="btn btn-primary btn-sm" style={{ marginTop: 10, width: "100%" }}><Icon name="send" size={12} /> Send All Queued</button>
        </div>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>DM Templates</div>
          {DM_TEMPLATES.map((t, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}
              onClick={() => setSelectedTemplate(i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: selectedTemplate === i ? 600 : 400, color: selectedTemplate === i ? "var(--accent)" : "var(--text2)" }}>{t.name}</span>
                <Icon name="chevron" size={12} />
              </div>
              {selectedTemplate === i && (
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6, lineHeight: 1.5, padding: 8, background: "var(--surface2)", borderRadius: 6 }}>
                  {t.body}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="section-title">Workflows</div>
      <div className="grid-2">
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 500 }}>Social Send DMs</div>
          <code className="mono" style={{ fontSize: 10, color: "var(--text3)" }}>zn2uHhkUROJqKzEG</code>
          <span className="badge badge-green" style={{ marginTop: 4 }}>active</span>
        </div>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 500 }}>Social Message Gen</div>
          <code className="mono" style={{ fontSize: 10, color: "var(--text3)" }}>8geOg9hei00b2Dxu</code>
          <span className="badge badge-green" style={{ marginTop: 4 }}>active</span>
        </div>
      </div>
    </div>
  );
}

// ── EMAIL ───────────────────────────────────────────────────

function EmailScreen() {
  const [selectedMailbox, setSelectedMailbox] = useState(0);
  const mailboxes = EMAIL_ROUTING;

  return (
    <div>
      <div className="grid-2">
        <div className="card" style={{ maxHeight: 500, overflowY: "auto" }}>
          <div className="card-title" style={{ marginBottom: 10 }}>Mailboxes</div>
          {mailboxes.map((m, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", cursor: "pointer",
              background: selectedMailbox === i ? "rgba(255,107,53,0.05)" : "transparent", borderRadius: 4, paddingLeft: 8 }}
              onClick={() => setSelectedMailbox(i)}>
              <div style={{ fontSize: 12, fontWeight: selectedMailbox === i ? 600 : 400, color: selectedMailbox === i ? "var(--accent)" : "var(--text)" }}>{m.dest}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text3)" }}>{m.email}</div>
              {m.cc !== "—" && <div style={{ fontSize: 9, color: "var(--text3)" }}>CC: {m.cc}</div>}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>{mailboxes[selectedMailbox].dest}</div>
          <div className="mono" style={{ fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>{mailboxes[selectedMailbox].email}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}><Icon name="mail" size={14} /> Compose</button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}><Icon name="send" size={14} /> Newsletter</button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}><Icon name="zap" size={14} /> PR Pitch</button>
          </div>
          <div className="divider" />
          <div className="section-title">Email Engine Workflows</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { name: "Email Send Throttle", id: "3jDssrDbi21CLhn6" },
              { name: "Newsletter Engine", id: "LOuffRVoxtPHsCuZ" },
              { name: "PR Pitch + Followup", id: "bGdwLiVFcqP0FcIG" },
            ].map((w, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
                <span style={{ fontSize: 12 }}>{w.name}</span>
                <code className="mono" style={{ fontSize: 9, color: "var(--text3)" }}>{w.id}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── OUTPUTS ─────────────────────────────────────────────────

function OutputsScreen() {
  const outputs = [
    { name: "NOIR DC Sponsor Deck", type: "PDF", entity: "noir", status: "complete", url: "#" },
    { name: "Forever Futbol Lookbook", type: "HTML", entity: "futbol", status: "in_progress", url: "#" },
    { name: "KHG Enterprise Dashboard", type: "React App", entity: "all", status: "complete", url: "#" },
    { name: "Remotion Video Studio", type: "GitHub Repo", entity: "all", status: "pending_push", url: "https://github.com/dolodorsey/khg-remotion-studio" },
    { name: "Playwright MCP Server", type: "GitHub Repo", entity: "all", status: "pending_push", url: "https://github.com/dolodorsey/khg-playwright-server" },
    { name: "Dr. Dorsey Quote Cards", type: "Graphics", entity: "dorsey", status: "generating", url: "#" },
    { name: "GHL Social Login SOP", type: "Document", entity: "all", status: "complete", url: "#" },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {outputs.map((o, i) => {
          const ent = o.entity === "all" ? null : ENTITIES[o.entity];
          return (
            <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="output" size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{o.name}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  <span className="badge badge-gray">{o.type}</span>
                  {ent && <span className="badge" style={{ background: `${ent.color}20`, color: ent.color }}>{ent.name}</span>}
                  <span className={`badge ${o.status === "complete" ? "badge-green" : o.status === "in_progress" || o.status === "generating" ? "badge-blue" : "badge-yellow"}`}>
                    {o.status.replace("_", " ")}
                  </span>
                </div>
              </div>
              <button className="btn btn-sm btn-ghost"><Icon name="link" size={12} /> Open</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TEAM ────────────────────────────────────────────────────

function TeamScreen() {
  return (
    <div>
      <div className="grid-2">
        {TEAM.map((m, i) => (
          <div key={i} className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,107,53,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,107,53,0.2)", fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
                {m.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{m.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {m.entities.map((e, j) => <span key={j} className="badge badge-gray">{e}</span>)}
            </div>
            {m.dispatch && <div className="mono" style={{ fontSize: 10, color: "var(--text3)", marginTop: 6 }}>Dispatch: {m.dispatch}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════

export default function KHGDashboard() {
  const [screen, setScreen] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [entityFilter, setEntityFilter] = useState(null);

  const navigate = useCallback((s, entity = null) => {
    setScreen(s);
    setEntityFilter(entity);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: "home" },
    { id: "commands", label: "Commands", icon: "cmd" },
    { id: "events", label: "Events", icon: "calendar" },
    { id: "tasks", label: "Tasks", icon: "task" },
    { id: "social", label: "Social", icon: "social" },
    { id: "outreach", label: "Outreach", icon: "send" },
    { id: "leads", label: "Lead Engine", icon: "target" },
    { id: "posts", label: "Post Review", icon: "image" },
    { id: "dms", label: "Instagram DMs", icon: "dm" },
    { id: "email", label: "Email", icon: "mail" },
    { id: "outputs", label: "Outputs", icon: "output" },
    { id: "team", label: "Team", icon: "user" },
    { id: "system", label: "System", icon: "system" },
    { id: "directory", label: "Directory", icon: "key" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const entityNav = Object.entries(ENTITIES).map(([key, ent]) => ({
    id: key, label: ent.name, color: ent.color, division: ent.division
  }));

  const screenTitles = {
    home: "Command Center", commands: "Commands", events: "Events Calendar",
    tasks: "Task Queue", social: "Social Media", outreach: "Outreach Engine",
    leads: "Lead Engine", posts: "Post Review", dms: "Instagram DMs",
    email: "Email Hub", outputs: "Outputs", team: "Team Directory",
    system: "System Health", directory: "Credentials Directory", settings: "Settings"
  };

  const renderScreen = () => {
    switch(screen) {
      case "home": return <HomeScreen navigate={navigate} />;
      case "commands": return <CommandsScreen />;
      case "settings": return <SettingsScreen />;
      case "system": return <SystemScreen />;
      case "directory": return <DirectoryScreen />;
      case "outreach": return <OutreachScreen entityFilter={entityFilter} />;
      case "events": return <EventsScreen entityFilter={entityFilter} />;
      case "tasks": return <TasksScreen />;
      case "social": return <SocialScreen entityFilter={entityFilter} />;
      case "leads": return <LeadEngineScreen />;
      case "posts": return <PostReviewScreen />;
      case "dms": return <InstagramDMsScreen />;
      case "email": return <EmailScreen />;
      case "outputs": return <OutputsScreen />;
      case "team": return <TeamScreen />;
      default: return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="dashboard">
        <div className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
          <div className="sidebar-header" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <div className="logo">K</div>
            <span>KHG COMMAND</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
          <div className="sidebar-section-title">Navigation</div>
          {navItems.map(item => (
            <div key={item.id} className={`nav-item ${screen === item.id ? "active" : ""}`}
              onClick={() => navigate(item.id)}>
              <Icon name={item.icon} size={16} />
              <span className="nav-label">{item.label}</span>
            </div>
          ))}

          <div className="sidebar-section-title" style={{ marginTop: 8 }}>Entities</div>
          {entityNav.map(ent => (
            <div key={ent.id} className={`nav-item ${entityFilter === ent.id ? "active" : ""}`}
              onClick={() => navigate("social", ent.id)}
              style={entityFilter === ent.id ? { borderLeftColor: ent.color, color: ent.color } : {}}>
              <span className="entity-dot" style={{ background: ent.color }} />
              <span className="nav-label">{ent.label}</span>
              <span className="entity-tag">{ent.division}</span>
            </div>
          ))}
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div style={{ cursor: "pointer", display: "flex" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Icon name="menu" size={18} />
            </div>
            <div className="topbar-title">{screenTitles[screen]}</div>
            {entityFilter && ENTITIES[entityFilter] && (
              <span className="badge" style={{ background: `${ENTITIES[entityFilter].color}20`, color: ENTITIES[entityFilter].color }}>
                {ENTITIES[entityFilter].name}
              </span>
            )}
            <div className="topbar-right">
              <span className="topbar-sub">Mar 12, 2026</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: "var(--green)", letterSpacing: "0.06em" }}>119 LIVE</span>
              </div>
            </div>
          </div>
          <div className="content">
            {renderScreen()}
          </div>
        </div>
      </div>
    </>
  );
}
