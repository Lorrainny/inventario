import { useState, useCallback } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const RESTAURANTS = ["HWASANJUNG", "KIMBAB Z10", "K Arboreto", "K WTC", "SantaLu"];

const INITIAL_STOCK = {
  "Agua Mineral CANADA DRY 600ml": 64,
  "Agua Mineral SAN PEREGRINO": 21,
  "Agua Mineral SANTA DELFINA 350ml": 8,
  "Agua Mineral SHANGRI-LA 354ml": 31,
  "Agua Pura DASANI 600ml": 108,
  "ALOE VERA": 179,
  "BONG BONG UVA": 128,
  "BRISA DE LA MAÑANA 180ML": 30,
  "CERVEZA CABRO-botella 350ml": 26,
  "CERVEZA CORONA- botella": 6,
  "CERVEZA GALLO - botella 350ml": 23,
  "CERVEZA MONTE CARLO -botella 355ml": 22,
  "CERVEZA STELLA - botella": 21,
  "COCA COLA . 450ml": 215,
  "COCA ZERO": 116,
  "COCO PALM MANGO": 101,
  "COCO PALM UVA 238 ML": 153,
  "coco palm durasno": 7,
  "COCO PALM YOGURT": 50,
  "MAGKEOLITA": 43,
  "MILKIS FRESA 250ML": 155,
  "MILKIS ORIGINAL 250ML": 153,
  "SOJU BLUEBERRY": 36,
  "SOJU CHAMISUL TAPA ROJA": 92,
  "SOJU CHAMISUL TAPA VERDE": 20,
  "SOJU FRESA": 53,
  "SOJU LICHA": 49,
  "SOJU ORIGINAL FRESH": 8,
  "SOJU PIÑA": 50,
  "SPRITE": 41,
  "TÈ DE CIRUELA 500ML": 199,
  "TÈ DE TORONJA": 141,
  "TÈ VERDE CON GAS 340ML": 45,
  "Café coreano": 600,
  "Bokbunjajoo": 12,
  "Hwaio 335ml": 6,
  "Marinero": 11,
  "Coquetel": 12,
  "Maiz": 9,
  "Leche vaporada": 3,
  "Leche condensada": 3,
  "Jugo pera": 4,
  "Salsa inglesa": 4,
  "Alga": 500,
  "Leche intera": 0,
  "mantequilla de mani": 4,
  "kechup": 6,
  "maionese galon": 2,
  "Salsicha paquete": 7,
  "conchon cocido": 36,
  "marisco bolsa": 2,
  "datil porcion": 10,
  "Tansuyuk (150g)": 18,
  "Yukhe (porcion)": 3,
  "Panceta (porcion kimchi)": 15,
  "Nuca (troco filete)": 4,
  "Bosam": 2,
  "Toc (bolsa)": 1.5,
  "pulpo baby (paquete)": 1,
  "Fideo (cream pasta)": 3,
  "Toc galbi (60g)": 36,
  "longaniza (400G)": 1,
  "L.A. Galbi (500g)": 20,
  "Fideo udon (porcion)": 194,
  "eomuk odeng (Paquete)": 87,
  "dwaeji galbi (bolsas)": 17,
  "bulgogi (bolsa)": 12,
  "samgyeobsal (bolsa)": 16,
  "sogalbi galbitang (bolsa)": 13,
  "sopa soja (bolsa)": 10,
  "yuke jang (Trocitos)": 14,
  "camarones (cx 4 libras)": 3,
  "panceta(bolsa)": 9,
  "tilapia (unid)": 17,
  "cana chapche(porcion)": 8,
  "chitaque (porcion)": 17,
  "pollo(bolsa)": 13,
  "carne molida (porcion 80g)": 21,
  "kani paquete": 2,
  "camaron entero (1600g)": 1,
  "alita bandeja (4l)": 3,
  "huevo": 500,
  "carne molida (5l)": 10,
  "Costilla (bolsa kg)": 4,
  "hueso (bolsa kg)": 1,
  "edeong (bolsa)": 2,
  "carne molida cerdo (bolsakg)": 4,
  "spam (trocitos)": 14,
  "carne molida cerdo (trocitos)": 12,
  "Lomo (trocos)": 9,
  "RAMEN": 2794,
  "SOJU UVA": 47,
  "SOJU PEACH": 5,
  "costilla (porcion300g)": 23,
};

// Dish → ingredients consumed from general stock
const RECIPES = {
  // ── Platos principales ──
  "YUKHUE": { "Yukhe (porcion)": 1 },
  "Sea Cream": { "camarones (cx 4 libras)": 0.1 },
  "TANGSUYUK": { "Tansuyuk (150g)": 1 },
  "Bulgogi Pasta": { "bulgogi (bolsa)": 0.5, "Fideo (cream pasta)": 1 },
  "Kimchi Cream Pasta": { "Panceta (porcion kimchi)": 1, "Fideo (cream pasta)": 1 },
  "Bulgogi ssam bap": { "bulgogi (bolsa)": 0.5 },
  "Bulgogi deobap": { "bulgogi (bolsa)": 0.5 },
  "BiBimBap": { "carne molida (porcion 80g)": 1 },
  "Japchae": { "cana chapche(porcion)": 1 },
  "Japchae deobap": { "cana chapche(porcion)": 1 },
  "Kimchi Bokkeumbap": { "samgyeobsal (bolsa)": 0.3 },
  "Jampong": { "camarones (cx 4 libras)": 0.1, "marisco bolsa": 0.2 },
  "Yukgaejang": { "yuke jang (Trocitos)": 1 },
  "Jeyuk Ssam Bap": { "panceta(bolsa)": 0.3 },
  // ── Sopas y guisos ──
  "Haemul-Pajeon": { "camarones (cx 4 libras)": 0.1, "marisco bolsa": 0.2 },
  "Nakji or Jjukkumi Somyun": { "pulpo baby (paquete)": 0.2 },
  "Haemul jeongol": { "camarones (cx 4 libras)": 0.15, "marisco bolsa": 0.3 },
  "Combo Sundubu Jjigae": { "camarones (cx 4 libras)": 0.05, "marisco bolsa": 0.1 },
  "Sundubu Jjigae": { "camarones (cx 4 libras)": 0.05, "marisco bolsa": 0.1 },
  "Galbitang": { "sogalbi galbitang (bolsa)": 1 },
  "Ugeoji Galbitang": { "sogalbi galbitang (bolsa)": 1 },
  "Galbi udon": { "sogalbi galbitang (bolsa)": 0.5, "Fideo udon (porcion)": 1 },
  "Kongbiji jjigae": { "spam (trocitos)": 0.5 },
  "Kimchi jjigae": { "panceta(bolsa)": 0.2 },
  "Budae jjigae": { "spam (trocitos)": 0.5, "Salsicha paquete": 0.3 },
  "Galbi jjim": { "Costilla (bolsa kg)": 0.3 },
  "Haemul jjim": { "marisco bolsa": 0.5, "camarones (cx 4 libras)": 0.1 },
  // ── Barbacoa ──
  "L.A. Galbi": { "L.A. Galbi (500g)": 1 },
  "Samgyeopsal": { "samgyeobsal (bolsa)": 1 },
  "Dweji Moksal": { "panceta(bolsa)": 1 },
  "Pork Ribs": { "costilla (porcion300g)": 1 },
  "BOSSAM": { "Bosam": 1 },
  "Parrilla Familiar": { "dwaeji galbi (bolsas)": 1, "samgyeobsal (bolsa)": 1, "L.A. Galbi (500g)": 1 },
};

// Beverage items (sold as-is)
const BEVERAGES = [
  "Agua Mineral CANADA DRY 600ml","Agua Mineral SAN PEREGRINO","Agua Mineral SANTA DELFINA 350ml",
  "Agua Mineral SHANGRI-LA 354ml","Agua Pura DASANI 600ml","ALOE VERA","BONG BONG UVA",
  "BRISA DE LA MAÑANA 180ML","CERVEZA CABRO-botella 350ml","CERVEZA CORONA- botella",
  "CERVEZA GALLO - botella 350ml","CERVEZA MONTE CARLO -botella 355ml","CERVEZA STELLA - botella",
  "COCA COLA . 450ml","COCA ZERO","COCO PALM MANGO","COCO PALM UVA 238 ML","coco palm durasno",
  "COCO PALM YOGURT","MAGKEOLITA","MILKIS FRESA 250ML","MILKIS ORIGINAL 250ML","SOJU BLUEBERRY",
  "SOJU CHAMISUL TAPA ROJA","SOJU CHAMISUL TAPA VERDE","SOJU FRESA","SOJU LICHA",
  "SOJU ORIGINAL FRESH","SOJU PIÑA","SPRITE","TÈ DE CIRUELA 500ML","TÈ DE TORONJA",
  "TÈ VERDE CON GAS 340ML","Café coreano","Bokbunjajoo","Hwaio 335ml","Marinero","RAMEN",
  "SOJU UVA","SOJU PEACH",
];

const ALL_ITEMS = [...Object.keys(RECIPES), ...BEVERAGES];

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("sales");
  const [stock, setStock] = useState({ ...INITIAL_STOCK });
  const [sales, setSales] = useState([]); // [{date, restaurant, items:[{item,qty}], log:[str]}]
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    restaurant: RESTAURANTS[0],
    entries: [{ item: "", qty: 1 }],
  });
  const [transferForm, setTransferForm] = useState({ item: "", qty: 1, to: RESTAURANTS[0] });
  const [stockSearch, setStockSearch] = useState("");
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type = "success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // ── Register sale ──
  const registerSale = useCallback(() => {
    const validEntries = form.entries.filter(e => e.item && e.qty > 0);
    if (!validEntries.length) { showAlert("Agrega al menos un artículo.", "error"); return; }

    const log = [];
    const newStock = { ...stock };
    let ok = true;

    for (const { item, qty } of validEntries) {
      const recipe = RECIPES[item];
      if (recipe) {
        // deduct ingredients
        for (const [ing, perUnit] of Object.entries(recipe)) {
          const deduct = perUnit * qty;
          if ((newStock[ing] ?? 0) < deduct) {
            showAlert(`Stock insuficiente de "${ing}" para ${item}.`, "error");
            ok = false; break;
          }
          newStock[ing] = +(newStock[ing] - deduct).toFixed(3);
          log.push(`-${deduct} ${ing}`);
        }
      } else if (BEVERAGES.includes(item)) {
        if ((newStock[item] ?? 0) < qty) {
          showAlert(`Stock insuficiente de "${item}".`, "error");
          ok = false; break;
        }
        newStock[item] = +(newStock[item] - qty).toFixed(3);
        log.push(`-${qty} ${item}`);
      }
      if (!ok) break;
    }
    if (!ok) return;

    setStock(newStock);
    setSales(prev => [{
      id: Date.now(),
      date: form.date,
      restaurant: form.restaurant,
      items: validEntries,
      log,
    }, ...prev]);
    setForm(f => ({ ...f, entries: [{ item: "", qty: 1 }] }));
    showAlert(`Venta registrada en ${form.restaurant} ✓`);
  }, [form, stock]);

  // ── Transfer ──
  const registerTransfer = useCallback(() => {
    const { item, qty, to } = transferForm;
    if (!item || qty <= 0) { showAlert("Completa el formulario de traslado.", "error"); return; }
    if ((stock[item] ?? 0) < qty) { showAlert("Stock insuficiente en geladeira general.", "error"); return; }
    setStock(s => ({ ...s, [item]: +(s[item] - qty).toFixed(3) }));
    setSales(prev => [{
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      restaurant: `🔄 Traslado → ${to}`,
      items: [{ item, qty }],
      log: [`-${qty} ${item} (traslado a ${to})`],
    }, ...prev]);
    showAlert(`Traslado de ${qty} "${item}" a ${to} ✓`);
  }, [transferForm, stock]);

  // ── Add/remove entry rows ──
  const addRow = () => setForm(f => ({ ...f, entries: [...f.entries, { item: "", qty: 1 }] }));
  const removeRow = i => setForm(f => ({ ...f, entries: f.entries.filter((_, idx) => idx !== i) }));
  const updateRow = (i, field, val) => setForm(f => {
    const entries = [...f.entries];
    entries[i] = { ...entries[i], [field]: field === "qty" ? Number(val) : val };
    return { ...f, entries };
  });

  // ── filtered stock ──
  const filteredStock = Object.entries(stock)
    .filter(([k]) => k.toLowerCase().includes(stockSearch.toLowerCase()))
    .sort((a, b) => a[1] - b[1]);

  const lowStock = Object.entries(stock).filter(([, v]) => v <= 5);

  return (
    <div style={styles.root}>
      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <div style={styles.logo}>한식 INVENTARIO</div>
            <div style={styles.subtitle}>Sistema de Control · 5 Restaurantes</div>
          </div>
          {lowStock.length > 0 && (
            <div style={styles.badge}>⚠ {lowStock.length} items bajos</div>
          )}
        </div>
        <nav style={styles.nav}>
          {[["sales","🛒 Registrar Venta"],["transfer","🔄 Traslado"],["stock","📦 Inventario"],["history","📋 Historial"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ ...styles.navBtn, ...(tab===k ? styles.navActive : {}) }}>{l}</button>
          ))}
        </nav>
      </header>

      {/* ── ALERT ── */}
      {alert && (
        <div style={{ ...styles.alert, background: alert.type === "error" ? "#7f1d1d" : "#14532d", borderColor: alert.type === "error" ? "#ef4444" : "#22c55e" }}>
          {alert.msg}
        </div>
      )}

      <main style={styles.main}>

        {/* ══ SALES TAB ══ */}
        {tab === "sales" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Registrar Venta</h2>
            <div style={styles.row}>
              <label style={styles.label}>Fecha</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={styles.input} />
            </div>
            <div style={styles.row}>
              <label style={styles.label}>Restaurante</label>
              <select value={form.restaurant} onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))} style={styles.input}>
                {RESTAURANTS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ ...styles.row, fontWeight: 700, color: "#a78bfa", fontSize: 13, marginBottom: 4 }}>
                <span style={{ flex: 2 }}>Plato / Producto</span>
                <span style={{ flex: 1 }}>Cantidad</span>
                <span style={{ width: 32 }}></span>
              </div>
              {form.entries.map((e, i) => (
                <div key={i} style={{ ...styles.row, gap: 8, marginBottom: 8 }}>
                  <select value={e.item} onChange={ev => updateRow(i, "item", ev.target.value)} style={{ ...styles.input, flex: 2 }}>
                    <option value="">— Seleccionar —</option>
                    <optgroup label="🍳 Platos">
                      {Object.keys(RECIPES).map(d => <option key={d}>{d}</option>)}
                    </optgroup>
                    <optgroup label="🍶 Bebidas / Productos">
                      {BEVERAGES.map(b => <option key={b}>{b}</option>)}
                    </optgroup>
                  </select>
                  <input type="number" min={1} value={e.qty} onChange={ev => updateRow(i, "qty", ev.target.value)} style={{ ...styles.input, flex: 1 }} />
                  <button onClick={() => removeRow(i)} style={styles.removeBtn}>✕</button>
                </div>
              ))}
              <button onClick={addRow} style={styles.addRowBtn}>+ Agregar ítem</button>
            </div>
            <button onClick={registerSale} style={styles.primaryBtn}>Registrar Venta</button>

            {/* preview of deductions */}
            {form.entries.some(e => e.item) && (
              <div style={styles.preview}>
                <div style={{ color: "#a78bfa", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Vista previa · Deducción de stock</div>
                {form.entries.filter(e => e.item).map((e, i) => {
                  const recipe = RECIPES[e.item];
                  if (recipe) return (
                    <div key={i} style={{ marginBottom: 6 }}>
                      <span style={{ color: "#e2e8f0", fontSize: 13 }}>{e.item} ×{e.qty} →</span>
                      {Object.entries(recipe).map(([ing, per]) => (
                        <span key={ing} style={{ color: "#f87171", fontSize: 12, marginLeft: 6 }}>-{(per*e.qty).toFixed(2)} {ing}</span>
                      ))}
                    </div>
                  );
                  return <div key={i} style={{ color: "#f87171", fontSize: 12 }}>-{e.qty} {e.item}</div>;
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ TRANSFER TAB ══ */}
        {tab === "transfer" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Traslado · Geladeira General → Restaurante</h2>
            <div style={styles.row}>
              <label style={styles.label}>Producto</label>
              <select value={transferForm.item} onChange={e => setTransferForm(f => ({ ...f, item: e.target.value }))} style={styles.input}>
                <option value="">— Seleccionar —</option>
                {Object.keys(stock).sort().map(k => (
                  <option key={k}>{k} (stock: {stock[k]})</option>
                ))}
              </select>
            </div>
            <div style={styles.row}>
              <label style={styles.label}>Cantidad</label>
              <input type="number" min={1} value={transferForm.qty} onChange={e => setTransferForm(f => ({ ...f, qty: Number(e.target.value) }))} style={styles.input} />
            </div>
            <div style={styles.row}>
              <label style={styles.label}>Destino</label>
              <select value={transferForm.to} onChange={e => setTransferForm(f => ({ ...f, to: e.target.value }))} style={styles.input}>
                {RESTAURANTS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <button onClick={registerTransfer} style={styles.primaryBtn}>Registrar Traslado</button>
            <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 12 }}>
              ℹ️ El traslado descuenta del inventario general. El restaurante destino es informativo por ahora.
            </p>
          </div>
        )}

        {/* ══ STOCK TAB ══ */}
        {tab === "stock" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Inventario · Geladeira General</h2>
            <input
              placeholder="🔍 Buscar producto..."
              value={stockSearch}
              onChange={e => setStockSearch(e.target.value)}
              style={{ ...styles.input, marginBottom: 16, width: "100%" }}
            />
            {lowStock.length > 0 && (
              <div style={styles.alertBox}>
                <div style={{ fontWeight: 700, color: "#fbbf24", marginBottom: 6 }}>⚠ Stock bajo (≤5 unidades)</div>
                {lowStock.map(([k, v]) => (
                  <div key={k} style={{ fontSize: 12, color: "#fcd34d" }}>{k}: <b>{v}</b></div>
                ))}
              </div>
            )}
            <div style={styles.stockGrid}>
              {filteredStock.map(([k, v]) => (
                <div key={k} style={{ ...styles.stockItem, borderColor: v <= 5 ? "#ef4444" : v <= 15 ? "#f59e0b" : "#334155" }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.3 }}>{k}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: v <= 5 ? "#ef4444" : v <= 15 ? "#f59e0b" : "#a78bfa", marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ HISTORY TAB ══ */}
        {tab === "history" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Historial de Movimientos</h2>
            {sales.length === 0 && <div style={{ color: "#64748b", textAlign: "center", padding: 32 }}>Sin movimientos aún.</div>}
            {sales.map(s => (
              <div key={s.id} style={styles.histItem}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 14 }}>{s.restaurant}</span>
                  <span style={{ color: "#64748b", fontSize: 12 }}>{s.date}</span>
                </div>
                <div style={{ marginBottom: 6 }}>
                  {s.items.map((it, i) => (
                    <span key={i} style={{ background: "#1e293b", borderRadius: 4, padding: "2px 8px", marginRight: 4, fontSize: 12, color: "#e2e8f0" }}>
                      {it.item} ×{it.qty}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#475569" }}>
                  {s.log.join("  ·  ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────

const styles = {
  root: {
    minHeight: "100vh",
    background: "#020817",
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    color: "#e2e8f0",
  },
  header: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
    borderBottom: "1px solid #312e81",
    padding: "20px 24px 0",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerInner: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  logo: { fontSize: 22, fontWeight: 800, letterSpacing: "0.05em", color: "#a78bfa" },
  subtitle: { fontSize: 11, color: "#64748b", letterSpacing: "0.1em", marginTop: 2 },
  badge: { background: "#7f1d1d", border: "1px solid #ef4444", borderRadius: 6, padding: "4px 12px", fontSize: 12, color: "#fca5a5" },
  nav: { display: "flex", gap: 4 },
  navBtn: {
    background: "transparent", border: "none", color: "#64748b",
    padding: "10px 16px", cursor: "pointer", fontSize: 13, borderBottom: "2px solid transparent",
    fontFamily: "inherit", letterSpacing: "0.03em",
  },
  navActive: { color: "#a78bfa", borderBottomColor: "#a78bfa" },
  alert: {
    position: "fixed", top: 72, right: 24, zIndex: 100,
    border: "1px solid", borderRadius: 8, padding: "12px 20px", fontSize: 13,
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  },
  main: { maxWidth: 900, margin: "0 auto", padding: "32px 16px" },
  card: { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 28 },
  cardTitle: { fontSize: 18, fontWeight: 700, color: "#a78bfa", marginBottom: 24, letterSpacing: "0.05em" },
  row: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
  label: { width: 110, fontSize: 12, color: "#94a3b8", letterSpacing: "0.05em", flexShrink: 0 },
  input: {
    flex: 1, background: "#1e293b", border: "1px solid #334155", borderRadius: 6,
    color: "#e2e8f0", padding: "8px 12px", fontSize: 13, fontFamily: "inherit", outline: "none",
  },
  removeBtn: {
    width: 32, height: 32, background: "#7f1d1d", border: "none", borderRadius: 6,
    color: "#fca5a5", cursor: "pointer", fontSize: 13, flexShrink: 0,
  },
  addRowBtn: {
    background: "transparent", border: "1px dashed #334155", borderRadius: 6,
    color: "#64748b", padding: "8px 16px", cursor: "pointer", fontSize: 12,
    fontFamily: "inherit", width: "100%", marginTop: 4,
  },
  primaryBtn: {
    marginTop: 24, width: "100%", background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
    border: "none", borderRadius: 8, color: "#fff", padding: "14px",
    fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em",
    fontFamily: "inherit",
  },
  preview: {
    marginTop: 20, background: "#0a0f1e", border: "1px solid #1e293b",
    borderRadius: 8, padding: 16,
  },
  alertBox: {
    background: "#1c1400", border: "1px solid #78350f", borderRadius: 8,
    padding: 16, marginBottom: 20,
  },
  stockGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10,
  },
  stockItem: {
    background: "#0a0f1e", border: "1px solid", borderRadius: 8, padding: "12px 14px",
  },
  histItem: {
    background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 8,
    padding: "14px 16px", marginBottom: 10,
  },
};