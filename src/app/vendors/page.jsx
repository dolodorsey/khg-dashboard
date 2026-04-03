"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Vendors() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      q("form_submissions", "select=*&order=created_at.desc&limit=100"),
      q("khg_form_configs", "select=*&form_type=eq.vendor&order=entity_id"),
    ]).then(([subs, forms]) => {
      setD({ submissions: subs||[], forms: forms||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING VENDORS..." />;
  const { submissions, forms } = d;
  const vendorSubs = submissions.filter(s => (s.form_type||'').includes('vendor'));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'DM Sans',sans-serif", color: "#111111" }}>
      <Header title="Vendors" icon="🏪" sub="Vendor applications, event vendors, food vendors, partnerships" color="#22C55E" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Form Submissions" value={submissions.length} sub="all types" color="#22C55E" />
          <Card title="Vendor Apps" value={vendorSubs.length} sub="vendor-specific" color="#F59E0B" />
          <Card title="Vendor Forms" value={forms.length} sub="configured" color="#8B5CF6" />
        </div>

        <Section title="Recent Submissions" icon="📝" count={submissions.length}>
          {submissions.length === 0 ? <div style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No form submissions yet — forms are live on event sites</div> :
          <Table headers={["Name","Email","Brand","Type","Date"]} rows={submissions.slice(0,20).map(s => [
            s.name||s.data?.name||"—", s.email||s.data?.email||"—",
            s.brand_key||s.entity_id||"—", <Badge key="t" text={s.form_type||"general"} color="#22C55E" />,
            s.created_at ? new Date(s.created_at).toLocaleDateString() : "—"
          ])} />}
        </Section>

        <Section title="Vendor Form Configuration" icon="⚙️">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
            {["Soul Sessions","REMIX","Kulture","Cinco de Drinko","Underground King","Secret Society","WRST BHVR","Forever Futbol"].map(name => (
              <div key={name} style={{ background:"#FFFFFF", border:"1px solid #E5E5E7", borderRadius:8, padding:16 }}>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>{name}</div>
                <div style={{ fontSize:11, color:"#888" }}>Vendor + Ambassador + Host/DJ forms</div>
                <Badge text="LIVE" color="#22C55E" />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
