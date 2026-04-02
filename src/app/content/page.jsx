"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Content() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("brand_asset_files", "select=entity_id,asset_type,file_name,file_url,created_at&order=created_at.desc&limit=200"),
      q("graphics_folders", "select=entity_id,folder_name&limit=500"),
      q("brand_voice_profiles", "select=brand_key,brand_name,tone,is_active&order=brand_name"),
      q("weekly_content_schedule", "select=brand_key,day_of_week,platform,post_type,status&limit=500"),
    ]).then(([assets, folders, voices, schedule]) => {
      setD({ assets: assets||[], folders: folders||[], voices: voices||[], schedule: schedule||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING CONTENT..." />;
  const { assets, folders, voices, schedule } = d;
  const byEntity = {};
  assets.forEach(a => { byEntity[a.entity_id] = (byEntity[a.entity_id]||0)+1; });
  const topEntities = Object.entries(byEntity).sort((a,b) => b[1]-a[1]).slice(0,15);
  const byType = {};
  assets.forEach(a => { const t = a.asset_type||"other"; byType[t] = (byType[t]||0)+1; });

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Content" icon="🎬" sub="Graphics queue, video pipeline, brand assets, approval workflow" color="#F59E0B" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Total Assets" value={assets.length} sub="registered files" color="#F59E0B" />
          <Card title="Graphics Folders" value={folders.length} sub="organized" color="#8B5CF6" />
          <Card title="Brand Voices" value={voices.filter(v=>v.is_active).length} sub="active profiles" color="#22C55E" />
          <Card title="Content Schedule" value={schedule.length} sub="weekly slots" color="#3B82F6" />
        </div>

        <Section title="Assets by Brand" icon="📂" count={`${Object.keys(byEntity).length} BRANDS`}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {topEntities.map(([entity, count]) => (
              <div key={entity} style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:20, padding:"6px 16px", fontSize:11 }}>
                <span style={{ color:"#F59E0B", fontWeight:700 }}>{count}</span> <span style={{ color:"#888" }}>{entity.replace(/_/g,' ')}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Assets by Type" icon="🏷️">
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {Object.entries(byType).sort((a,b)=>b[1]-a[1]).map(([type, count]) => (
              <div key={type} style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:20, padding:"6px 16px", fontSize:11 }}>
                <span style={{ color:"#8B5CF6", fontWeight:700 }}>{count}</span> <span style={{ color:"#888" }}>{type}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Brand Voice Profiles" icon="🗣️" count={`${voices.length} PROFILES`}>
          <Table headers={["Brand","Tone","Active"]} rows={voices.map(v => [
            v.brand_name||v.brand_key||"—", v.tone||"—",
            <Badge key="a" text={v.is_active?"ACTIVE":"OFF"} color={v.is_active?"#22C55E":"#555"} />
          ])} />
        </Section>

        <Section title="Recent Assets" icon="🆕">
          <Table headers={["File","Entity","Type","Date"]} rows={assets.slice(0,20).map(a => [
            <span key="f" style={{ maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", display:"inline-block" }}>{a.file_name||"—"}</span>,
            a.entity_id||"—", <Badge key="t" text={a.asset_type||"file"} color="#F59E0B" />,
            a.created_at ? new Date(a.created_at).toLocaleDateString() : "—"
          ])} />
        </Section>
      </div>
    </div>
  );
}
