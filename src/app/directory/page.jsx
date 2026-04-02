"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Section, Loading, q } from "../lib/ui";

export default function Directory() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("brand_social_handles", "select=brand_key,ig_handle,ig_url,ghl_location_id,ghl_ig_oauth_connected&order=brand_key"),
      q("khg_form_configs", "select=entity_id,form_type,webhook_url&order=entity_id"),
      q("brand_entities", "select=entity_id,entity_name,division,website_url,active&active=eq.true&order=entity_name"),
    ]).then(([handles, forms, entities]) => {
      setD({ handles: handles||[], forms: forms||[], entities: entities||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING DIRECTORY..." />;
  const { handles, forms, entities } = d;

  const sites = [
    { name: "Dr. Dorsey", url: "doctordorsey.com", status: "live" },
    { name: "HugLife", url: "huglife.vercel.app", status: "live" },
    { name: "Forever Futbol", url: "foreverfutbolmuseum.com", status: "live" },
    { name: "Good Times", url: "thegoodtimesworldwide.com", status: "live" },
    { name: "Infinity Water", url: "infinitywaterworldwide.com", status: "live" },
    { name: "Pronto Energy", url: "prontoenergydrink.com", status: "live" },
    { name: "Stush", url: "stushusa.com", status: "live" },
    { name: "Casper Group", url: "caspergroupworldwide.com", status: "rebuilding" },
    { name: "Mind Studio", url: "themindstudioworldwide.com", status: "live" },
    { name: "WRST BHVR", url: "wrst-bhvr-event.vercel.app", status: "live" },
    { name: "Soul Sessions", url: "thasoulsessions.com", status: "live" },
    { name: "REMIX", url: "remixatl.com", status: "live" },
    { name: "NOIR", url: "noir-event.vercel.app", status: "rebuilding" },
    { name: "Kulture", url: "thakulturemarket.com", status: "live" },
    { name: "Cinco de Drinko", url: "cincodedrinkoatl.com", status: "live" },
    { name: "Dashboard", url: "thedoctordorsey.com", status: "live" },
    { name: "Help 911", url: "help-911-app.vercel.app", status: "live" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Directory / Links" icon="🔗" sub="All brand links, landing pages, QR codes, forms, assets" color="#EC4899" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Websites" value={sites.length} sub={`${sites.filter(s=>s.status==='live').length} live`} color="#EC4899" />
          <Card title="IG Handles" value={handles.length} sub="tracked" color="#8B5CF6" />
          <Card title="Form Configs" value={forms.length} color="#22C55E" />
          <Card title="Active Entities" value={entities.length} color="#3B82F6" />
        </div>

        <Section title="Websites" icon="🌐" count={sites.length}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {sites.map(s => (
              <div key={s.name} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.name}</div>
                  <a href={`https://${s.url}`} target="_blank" rel="noopener" style={{ fontSize: 11, color: "#EC4899" }}>{s.url}</a>
                </div>
                <Badge text={s.status} color={s.status === "live" ? "#22C55E" : "#F59E0B"} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Social Handles" icon="📱" count={handles.length}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
            {handles.map((h, i) => (
              <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{h.brand_key?.replace(/_/g, " ")}</div>
                  <div style={{ fontSize: 11, color: "#8B5CF6" }}>{h.ig_handle || "—"}</div>
                </div>
                <Badge text={h.ghl_ig_oauth_connected ? "OAuth ✓" : "OAuth ✗"} color={h.ghl_ig_oauth_connected ? "#22C55E" : "#EF4444"} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="GHL Locations" icon="🔑">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
            {handles.filter(h => h.ghl_location_id).map((h, i) => (
              <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{h.brand_key?.replace(/_/g, " ")}</div>
                <div style={{ fontSize: 10, color: "#555", fontFamily: "'DM Mono',monospace" }}>{h.ghl_location_id}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
