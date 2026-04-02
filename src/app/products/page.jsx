"use client";
import { useState, useEffect } from "react";
import { Header, Card, Badge, Table, Section, Loading, q } from "../lib/ui";

export default function Products() {
  const [d, setD] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    Promise.all([
      q("shopify_products", "select=*&order=title&limit=500"),
      q("shopify_orders", "select=*&order=created_at.desc&limit=100"),
      q("shopify_collections", "select=*&order=title"),
      q("brand_asset_files", "select=entity_id,asset_type&entity_id=in.(stush,make_atlanta_great_again,bodega,her_halloween)"),
    ]).then(([products, orders, collections, assets]) => {
      setD({ products: products||[], orders: orders||[], collections: collections||[], assets: assets||[] });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading text="LOADING PRODUCTS..." />;
  const { products, orders, collections, assets } = d;

  const stores = [
    { key: "maga", name: "MAGA", domain: "makeatlantagreatagain.myshopify.com", color: "#EF4444" },
    { key: "stush", name: "Stush", domain: "stushusa.myshopify.com", color: "#C9A96E" },
    { key: "bodega", name: "Bodega", domain: "bodegabodegbodega.myshopify.com", color: "#F59E0B" },
    { key: "halloween", name: "Her Halloween", domain: "herhalloween.myshopify.com", color: "#8B5CF6" },
  ];

  const byStore = {};
  products.forEach(p => {
    const store = (p.shop_domain||p.store||"unknown").toLowerCase();
    const key = store.includes("maga") || store.includes("atlanta") ? "maga" : store.includes("stush") ? "stush" : store.includes("bodega") ? "bodega" : store.includes("halloween") ? "halloween" : "other";
    byStore[key] = (byStore[key]||0) + 1;
  });

  const activeProducts = products.filter(p => p.status === "active");
  const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total_price||o.amount||0) || 0), 0);

  const filteredProducts = tab === "all" ? products : products.filter(p => {
    const store = (p.shop_domain||p.store||"").toLowerCase();
    return store.includes(tab);
  });

  return (
    <div style={{ minHeight: "100vh", background: "#060604", fontFamily: "'DM Sans',sans-serif", color: "#F0EDE6" }}>
      <Header title="Products" icon="🛍️" sub="MAGA · Stush · Bodega · Her Halloween — Shopify operations" color="#C9A96E" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <Card title="Total Products" value={products.length} sub={`${activeProducts.length} active`} color="#C9A96E" />
          <Card title="Orders" value={orders.length} sub={totalRevenue > 0 ? `$${totalRevenue.toLocaleString(undefined,{minimumFractionDigits:2})}` : "tracked"} color="#22C55E" />
          <Card title="Collections" value={collections.length} color="#8B5CF6" />
          <Card title="Stores" value={4} sub="connected" color="#3B82F6" />
        </div>

        {/* Store Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[{ key: "all", label: "All Stores" }, ...stores.map(s => ({ key: s.domain.split(".")[0], label: s.name }))].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: tab === t.key ? "1px solid #C9A96E" : "1px solid #222", background: tab === t.key ? "#C9A96E18" : "transparent", color: tab === t.key ? "#C9A96E" : "#666", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>{t.label} ({t.key === "all" ? products.length : byStore[t.key] || 0})</button>
          ))}
        </div>

        <Section title="Products" icon="📦" count={`${filteredProducts.length} SHOWING`}>
          <Table headers={["Product","Price","Status","Vendor","Store"]} rows={filteredProducts.slice(0,25).map(p => [
            <span key="t" style={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", fontWeight: 500 }}>{p.title||"—"}</span>,
            p.price ? `$${p.price}` : (p.variants?.[0]?.price ? `$${p.variants[0].price}` : "—"),
            <Badge key="s" text={p.status||"draft"} color={p.status==="active"?"#22C55E":"#F59E0B"} />,
            p.vendor||"—",
            (p.shop_domain||p.store||"—").replace(".myshopify.com","")
          ])} />
        </Section>

        <Section title="Collections" icon="📂" count={collections.length}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {collections.map((c, i) => (
              <div key={i} style={{ background: "#0D0D0B", border: "1px solid #1a1a1a", borderRadius: 20, padding: "6px 16px", fontSize: 11 }}>
                <span style={{ color: "#C9A96E", fontWeight: 700 }}>{c.products_count||0}</span> <span style={{ color: "#888" }}>{c.title||"—"}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Recent Orders" icon="🧾" count={orders.length}>
          {orders.length === 0 ? <div style={{ background:"#0D0D0B", border:"1px solid #1a1a1a", borderRadius:8, padding:24, textAlign:"center", color:"#555", fontSize:12 }}>No orders synced yet</div> :
          <Table headers={["Order","Customer","Total","Status","Date"]} rows={orders.slice(0,15).map(o => [
            o.order_number||o.name||"—", o.customer_name||o.email||"—",
            o.total_price ? `$${parseFloat(o.total_price).toFixed(2)}` : "—",
            <Badge key="s" text={o.financial_status||o.status||"pending"} color={o.financial_status==="paid"?"#22C55E":"#F59E0B"} />,
            o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"
          ])} />}
        </Section>
      </div>
    </div>
  );
}
