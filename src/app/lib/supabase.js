const SUPA_URL = "https://dzlmtvodpyhetvektfuo.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo";

export const supa = async (table, query = "") => {
  try { const r = await fetch(`${SUPA_URL}/rest/v1/${table}${query ? "?" + query : ""}`, { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` } }); return r.ok ? await r.json() : []; } catch { return []; }
};

export const supaRpc = async (fn, params = {}) => {
  try { const r = await fetch(`${SUPA_URL}/rest/v1/rpc/${fn}`, { method: "POST", headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(params) }); return r.ok ? await r.json() : null; } catch { return null; }
};

export const supaInsert = async (table, data) => {
  try { const r = await fetch(`${SUPA_URL}/rest/v1/${table}`, { method: "POST", headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(data) }); return r.ok ? await r.json() : null; } catch { return null; }
};

export const supaUpdate = async (table, match, data) => {
  try { const r = await fetch(`${SUPA_URL}/rest/v1/${table}?${match}`, { method: "PATCH", headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(data) }); return r.ok ? await r.json() : null; } catch { return null; }
};

export { SUPA_URL, SUPA_KEY };
