import { useState, useEffect, useCallback, useRef } from "react";

// ── DEFAULT DATA ──────────────────────────────────────────────────────────────

const DEFAULT_RESTAURANTS = ["HWASANJUNG", "KIMBAB Z10", "K Arboreto", "K WTC", "SantaLu"];

const DEFAULT_STOCK = {
  "Agua Mineral CANADA DRY 600ml":64,"Agua Mineral SAN PEREGRINO":21,"Agua Mineral SANTA DELFINA 350ml":8,
  "Agua Mineral SHANGRI-LA 354ml":31,"Agua Pura DASANI 600ml":108,"ALOE VERA":179,"BONG BONG UVA":128,
  "BRISA DE LA MAÑANA 180ML":30,"CERVEZA CABRO-botella 350ml":26,"CERVEZA CORONA- botella":6,
  "CERVEZA GALLO - botella 350ml":23,"CERVEZA MONTE CARLO -botella 355ml":22,"CERVEZA STELLA - botella":21,
  "COCA COLA . 450ml":215,"COCA ZERO":116,"COCO PALM MANGO":101,"COCO PALM UVA 238 ML":153,
  "coco palm durasno":7,"COCO PALM YOGURT":50,"MAGKEOLITA":43,"MILKIS FRESA 250ML":155,
  "MILKIS ORIGINAL 250ML":153,"SOJU BLUEBERRY":36,"SOJU CHAMISUL TAPA ROJA":92,
  "SOJU CHAMISUL TAPA VERDE":20,"SOJU FRESA":53,"SOJU LICHA":49,"SOJU ORIGINAL FRESH":8,
  "SOJU PIÑA":50,"SPRITE":41,"TÈ DE CIRUELA 500ML":199,"TÈ DE TORONJA":141,
  "TÈ VERDE CON GAS 340ML":45,"Café coreano":600,"Bokbunjajoo":12,"Hwaio 335ml":6,
  "Marinero":11,"Coquetel":12,"Maiz":9,"Leche vaporada":3,"Leche condensada":3,"Jugo pera":4,
  "Salsa inglesa":4,"Alga":500,"Leche intera":0,"mantequilla de mani":4,"kechup":6,
  "maionese galon":2,"Salsicha paquete":7,"conchon cocido":36,"marisco bolsa":2,"datil porcion":10,
  "Tansuyuk (150g)":18,"Yukhe (porcion)":3,"Panceta (porcion kimchi)":15,"Nuca (troco filete)":4,
  "Bosam":2,"Toc (bolsa)":1.5,"pulpo baby (paquete)":1,"Fideo (cream pasta)":3,"Toc galbi (60g)":36,
  "longaniza (400G)":1,"L.A. Galbi (500g)":20,"Fideo udon (porcion)":194,"eomuk odeng (Paquete)":87,
  "dwaeji galbi (bolsas)":17,"bulgogi (bolsa)":12,"samgyeobsal (bolsa)":16,
  "sogalbi galbitang (bolsa)":13,"sopa soja (bolsa)":10,"yuke jang (Trocitos)":14,
  "camarones (cx 4 libras)":3,"panceta(bolsa)":9,"tilapia (unid)":17,"cana chapche(porcion)":8,
  "chitaque (porcion)":17,"pollo(bolsa)":13,"carne molida (porcion 80g)":21,"kani paquete":2,
  "camaron entero (1600g)":1,"alita bandeja (4l)":3,"huevo":500,"carne molida (5l)":10,
  "Costilla (bolsa kg)":4,"hueso (bolsa kg)":1,"edeong (bolsa)":2,"carne molida cerdo (bolsakg)":4,
  "spam (trocitos)":14,"carne molida cerdo (trocitos)":12,"Lomo (trocos)":9,"RAMEN":2794,
  "SOJU UVA":47,"SOJU PEACH":5,"costilla (porcion300g)":23,
};

const DEFAULT_RECIPES = {
  "YUKHUE":{"Yukhe (porcion)":1},"Sea Cream":{"camarones (cx 4 libras)":0.1},
  "TANGSUYUK":{"Tansuyuk (150g)":1},"Bulgogi Pasta":{"bulgogi (bolsa)":0.5,"Fideo (cream pasta)":1},
  "Kimchi Cream Pasta":{"Panceta (porcion kimchi)":1,"Fideo (cream pasta)":1},
  "Bulgogi ssam bap":{"bulgogi (bolsa)":0.5},"Bulgogi deobap":{"bulgogi (bolsa)":0.5},
  "BiBimBap":{"carne molida (porcion 80g)":1},"Japchae":{"cana chapche(porcion)":1},
  "Japchae deobap":{"cana chapche(porcion)":1},"Kimchi Bokkeumbap":{"samgyeobsal (bolsa)":0.3},
  "Jampong":{"camarones (cx 4 libras)":0.1,"marisco bolsa":0.2},
  "Yukgaejang":{"yuke jang (Trocitos)":1},"Jeyuk Ssam Bap":{"panceta(bolsa)":0.3},
  "Haemul-Pajeon":{"camarones (cx 4 libras)":0.1,"marisco bolsa":0.2},
  "Nakji or Jjukkumi Somyun":{"pulpo baby (paquete)":0.2},
  "Haemul jeongol":{"camarones (cx 4 libras)":0.15,"marisco bolsa":0.3},
  "Combo Sundubu Jjigae":{"camarones (cx 4 libras)":0.05,"marisco bolsa":0.1},
  "Sundubu Jjigae":{"camarones (cx 4 libras)":0.05,"marisco bolsa":0.1},
  "Galbitang":{"sogalbi galbitang (bolsa)":1},"Ugeoji Galbitang":{"sogalbi galbitang (bolsa)":1},
  "Galbi udon":{"sogalbi galbitang (bolsa)":0.5,"Fideo udon (porcion)":1},
  "Kongbiji jjigae":{"spam (trocitos)":0.5},"Kimchi jjigae":{"panceta(bolsa)":0.2},
  "Budae jjigae":{"spam (trocitos)":0.5,"Salsicha paquete":0.3},
  "Galbi jjim":{"Costilla (bolsa kg)":0.3},
  "Haemul jjim":{"marisco bolsa":0.5,"camarones (cx 4 libras)":0.1},
  "L.A. Galbi":{"L.A. Galbi (500g)":1},"Samgyeopsal":{"samgyeobsal (bolsa)":1},
  "Dweji Moksal":{"panceta(bolsa)":1},"Pork Ribs":{"costilla (porcion300g)":1},
  "BOSSAM":{"Bosam":1},
  "Parrilla Familiar":{"dwaeji galbi (bolsas)":1,"samgyeobsal (bolsa)":1,"L.A. Galbi (500g)":1},
};

// ── STORAGE HELPERS ───────────────────────────────────────────────────────────

const KEYS = { stock:"inv_stock", recipes:"inv_recipes", sales:"inv_sales", restaurants:"inv_restaurants", beverages:"inv_beverages" };

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// ── HELPERS ───────────────────────────────────────────────────────────────────

const C = {
  bg:"#020817", surface:"#0f172a", raised:"#0a0f1e", border:"#1e293b",
  border2:"#334155", accent:"#a78bfa", accent2:"#7c3aed",
  text:"#e2e8f0", muted:"#94a3b8", dim:"#64748b",
  red:"#ef4444", redBg:"#7f1d1d", amber:"#f59e0b", green:"#22c55e",
};

const inp = {
  background:C.raised, border:`1px solid ${C.border2}`, borderRadius:6,
  color:C.text, padding:"8px 12px", fontSize:13,
  fontFamily:"'IBM Plex Mono','Courier New',monospace", outline:"none", width:"100%", boxSizing:"border-box",
};

const btn = (extra={}) => ({
  background:`linear-gradient(135deg,#4c1d95,${C.accent2})`,
  border:"none", borderRadius:8, color:"#fff", padding:"11px 20px",
  fontSize:13, fontWeight:700, cursor:"pointer",
  fontFamily:"'IBM Plex Mono','Courier New',monospace", letterSpacing:"0.03em", ...extra,
});

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Alert({ data }) {
  if (!data) return null;
  return (
    <div style={{
      position:"fixed", top:76, right:20, zIndex:200,
      background: data.type==="error" ? "#7f1d1d" : "#14532d",
      border:`1px solid ${data.type==="error" ? C.red : C.green}`,
      borderRadius:8, padding:"12px 20px", fontSize:13, maxWidth:340,
      boxShadow:"0 8px 32px rgba(0,0,0,.6)",
    }}>{data.msg}</div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.7)", zIndex:150, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ margin:0, color:C.accent, fontSize:16, fontWeight:700 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"transparent", border:"none", color:C.muted, fontSize:20, cursor:"pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("sales");
  const [stock, setStock]           = useState(() => load(KEYS.stock,       DEFAULT_STOCK));
  const [recipes, setRecipes]       = useState(() => load(KEYS.recipes,     DEFAULT_RECIPES));
  const [sales, setSales]           = useState(() => load(KEYS.sales,       []));
  const [restaurants, setRestaurants] = useState(() => load(KEYS.restaurants, DEFAULT_RESTAURANTS));
  const [beverages, setBeverages]   = useState(() => load(KEYS.beverages,   Object.keys(DEFAULT_STOCK)));

  // persist on every change
  useEffect(() => save(KEYS.stock,       stock),       [stock]);
  useEffect(() => save(KEYS.recipes,     recipes),     [recipes]);
  useEffect(() => save(KEYS.sales,       sales),       [sales]);
  useEffect(() => save(KEYS.restaurants, restaurants), [restaurants]);
  useEffect(() => save(KEYS.beverages,   beverages),   [beverages]);

  const [alert, setAlert]   = useState(null);
  const alertTimer = useRef(null);
  const showAlert = (msg, type="success") => {
    clearTimeout(alertTimer.current);
    setAlert({ msg, type });
    alertTimer.current = setTimeout(() => setAlert(null), 3500);
  };

  // ── Sales form ──
  const [saleForm, setSaleForm] = useState({
    date: new Date().toISOString().slice(0,10),
    restaurant: restaurants[0] || "",
    entries: [{ item:"", qty:1 }],
  });
  const addRow    = () => setSaleForm(f => ({ ...f, entries:[...f.entries,{ item:"",qty:1 }] }));
  const removeRow = i  => setSaleForm(f => ({ ...f, entries:f.entries.filter((_,j)=>j!==i) }));
  const updateRow = (i,field,val) => setSaleForm(f => {
    const entries=[...f.entries]; entries[i]={...entries[i],[field]:field==="qty"?Number(val):val}; return {...f,entries};
  });

  const registerSale = useCallback(() => {
    const valid = saleForm.entries.filter(e=>e.item&&e.qty>0);
    if (!valid.length) { showAlert("Agrega al menos un artículo.","error"); return; }
    const ns={...stock}; const log=[];
    for (const {item,qty} of valid) {
      const recipe=recipes[item];
      if (recipe) {
        for (const [ing,per] of Object.entries(recipe)) {
          const d=+(per*qty).toFixed(4);
          if ((ns[ing]??0)<d) { showAlert(`Stock insuficiente: "${ing}"`, "error"); return; }
          ns[ing]=+(ns[ing]-d).toFixed(4); log.push(`-${d} ${ing}`);
        }
      } else {
        if ((ns[item]??0)<qty) { showAlert(`Stock insuficiente: "${item}"`, "error"); return; }
        ns[item]=+(ns[item]-qty).toFixed(4); log.push(`-${qty} ${item}`);
      }
    }
    setStock(ns);
    setSales(prev=>[{ id:Date.now(), date:saleForm.date, restaurant:saleForm.restaurant, items:valid, log },  ...prev]);
    setSaleForm(f=>({...f,entries:[{item:"",qty:1}]}));
    showAlert(`✓ Venta registrada en ${saleForm.restaurant}`);
  },[saleForm,stock,recipes]);

  // ── Transfer form ──
  const [txForm, setTxForm] = useState({ item:"", qty:1, to: restaurants[0]||"" });
  const registerTransfer = useCallback(() => {
    const { item, qty, to } = txForm;
    if (!item||qty<=0) { showAlert("Completa el formulario.","error"); return; }
    const realItem = item.split(" (stock:")[0].trim();
    if ((stock[realItem]??0)<qty) { showAlert(`Stock insuficiente: "${realItem}"`, "error"); return; }
    setStock(s=>({...s,[realItem]:+(s[realItem]-qty).toFixed(4)}));
    setSales(prev=>[{ id:Date.now(), date:new Date().toISOString().slice(0,10), restaurant:`🔄 → ${to}`, items:[{item:realItem,qty}], log:[`-${qty} ${realItem} traslado a ${to}`] }, ...prev]);
    showAlert(`✓ Traslado de ${qty} "${realItem}" a ${to}`);
  },[txForm,stock]);

  // ── Modals ──
  const [modal, setModal] = useState(null); // "addStock"|"editStock"|"addRecipe"|"editRecipe"|"addRestaurant"|"manageRestaurants"
  const [editTarget, setEditTarget] = useState(null);

  // add/edit stock
  const [stockForm, setStockForm] = useState({ name:"", qty:0 });
  const openAddStock = () => { setStockForm({name:"",qty:0}); setModal("addStock"); };
  const openEditStock = (name) => { setStockForm({name,qty:stock[name]}); setEditTarget(name); setModal("editStock"); };
  const saveStock = () => {
    if (!stockForm.name.trim()) { showAlert("Nome obrigatório.","error"); return; }
    const ns={...stock};
    if (modal==="editStock" && editTarget && editTarget!==stockForm.name) delete ns[editTarget];
    ns[stockForm.name.trim()]=Number(stockForm.qty);
    setStock(ns);
    if (!beverages.includes(stockForm.name.trim())) setBeverages(b=>[...b, stockForm.name.trim()]);
    setModal(null); showAlert("✓ Produto salvo.");
  };
  const deleteStock = (name) => {
    if (!window.confirm(`Eliminar "${name}"?`)) return;
    setStock(s=>{ const ns={...s}; delete ns[name]; return ns; });
    setBeverages(b=>b.filter(x=>x!==name));
    showAlert(`"${name}" eliminado.`);
  };

  // add/edit recipe
  const [recipeForm, setRecipeForm] = useState({ name:"", ingredients:[{ing:"",qty:1}] });
  const openAddRecipe = () => { setRecipeForm({name:"",ingredients:[{ing:"",qty:1}]}); setModal("addRecipe"); };
  const openEditRecipe = (name) => {
    setRecipeForm({ name, ingredients: Object.entries(recipes[name]).map(([ing,qty])=>({ing,qty})) });
    setEditTarget(name); setModal("editRecipe");
  };
  const saveRecipe = () => {
    if (!recipeForm.name.trim()) { showAlert("Nome obrigatório.","error"); return; }
    const ings = recipeForm.ingredients.filter(r=>r.ing.trim()&&r.qty>0);
    if (!ings.length) { showAlert("Agrega al menos un ingrediente.","error"); return; }
    const nr={...recipes};
    if (modal==="editRecipe"&&editTarget&&editTarget!==recipeForm.name) delete nr[editTarget];
    nr[recipeForm.name.trim()] = Object.fromEntries(ings.map(r=>[r.ing.trim(),Number(r.qty)]));
    setRecipes(nr); setModal(null); showAlert("✓ Receta salva.");
  };
  const deleteRecipe = (name) => {
    if (!window.confirm(`Eliminar receta "${name}"?`)) return;
    setRecipes(r=>{ const nr={...r}; delete nr[name]; return nr; });
    showAlert(`Receta "${name}" eliminada.`);
  };

  // restaurants
  const [restInput, setRestInput] = useState("");
  const addRestaurant = () => {
    if (!restInput.trim()) return;
    if (restaurants.includes(restInput.trim())) { showAlert("Já existe.","error"); return; }
    setRestaurants(r=>[...r, restInput.trim()]); setRestInput(""); showAlert("✓ Restaurante adicionado.");
  };
  const deleteRestaurant = (name) => {
    if (!window.confirm(`Eliminar "${name}"?`)) return;
    setRestaurants(r=>r.filter(x=>x!==name));
  };

  // reset
  const resetAll = () => {
    if (!window.confirm("Resetar TUDO para os valores iniciais?")) return;
    setStock({...DEFAULT_STOCK}); setRecipes({...DEFAULT_RECIPES});
    setSales([]); setRestaurants([...DEFAULT_RESTAURANTS]);
    setBeverages(Object.keys(DEFAULT_STOCK));
    showAlert("✓ Sistema resetado.");
  };

  // ── derived ──
  const allItems = [...Object.keys(recipes), ...beverages.filter(b=>!recipes[b])];
  const stockEntries = Object.entries(stock);
  const lowStock = stockEntries.filter(([,v])=>v<=5);

  // ── NAV ──
  const TABS = [
    ["sales","🛒 Venta"],["transfer","🔄 Traslado"],["stock","📦 Inventario"],
    ["recipes","🍳 Receitas"],["config","⚙ Config"],["history","📋 Historial"],
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'IBM Plex Mono','Courier New',monospace", color:C.text }}>
      {/* HEADER */}
      <header style={{ background:`linear-gradient(135deg,#0f172a,#1e1b4b)`, borderBottom:`1px solid #312e81`, padding:"18px 20px 0", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div style={{ fontSize:20, fontWeight:800, color:C.accent, letterSpacing:"0.05em" }}>한식 INVENTARIO</div>
            <div style={{ fontSize:10, color:C.dim, letterSpacing:"0.12em" }}>SISTEMA DE CONTROL · {restaurants.length} RESTAURANTES</div>
          </div>
          {lowStock.length>0 && (
            <div style={{ background:C.redBg, border:`1px solid ${C.red}`, borderRadius:6, padding:"4px 12px", fontSize:11, color:"#fca5a5" }}>
              ⚠ {lowStock.length} items bajos
            </div>
          )}
        </div>
        <nav style={{ display:"flex", gap:0, overflowX:"auto" }}>
          {TABS.map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              background:"transparent", border:"none", color: tab===k ? C.accent : C.dim,
              padding:"9px 14px", cursor:"pointer", fontSize:12, borderBottom:`2px solid ${tab===k?C.accent:"transparent"}`,
              fontFamily:"inherit", whiteSpace:"nowrap", letterSpacing:"0.03em",
            }}>{l}</button>
          ))}
        </nav>
      </header>

      <Alert data={alert} />

      {/* MODALS */}
      {(modal==="addStock"||modal==="editStock") && (
        <Modal title={modal==="addStock"?"Agregar Producto":"Editar Producto"} onClose={()=>setModal(null)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Nome do produto</div>
              <input style={inp} value={stockForm.name} onChange={e=>setStockForm(f=>({...f,name:e.target.value}))} placeholder="ex: Agua Mineral XYZ" />
            </div>
            <div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Quantidade em estoque</div>
              <input style={inp} type="number" value={stockForm.qty} onChange={e=>setStockForm(f=>({...f,qty:e.target.value}))} />
            </div>
            <button onClick={saveStock} style={btn({ marginTop:8 })}>Salvar</button>
          </div>
        </Modal>
      )}

      {(modal==="addRecipe"||modal==="editRecipe") && (
        <Modal title={modal==="addRecipe"?"Nova Receita":"Editar Receita"} onClose={()=>setModal(null)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Nome do prato</div>
              <input style={inp} value={recipeForm.name} onChange={e=>setRecipeForm(f=>({...f,name:e.target.value}))} placeholder="ex: Kimchi Jjigae" />
            </div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:2 }}>Ingredientes (do estoque geral)</div>
            {recipeForm.ingredients.map((row,i)=>(
              <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
                <input style={{...inp, flex:2}} list="ing-list" value={row.ing}
                  onChange={e=>setRecipeForm(f=>{ const r=[...f.ingredients]; r[i]={...r[i],ing:e.target.value}; return {...f,ingredients:r}; })}
                  placeholder="Ingrediente" />
                <input style={{...inp, flex:1}} type="number" step="0.01" value={row.qty}
                  onChange={e=>setRecipeForm(f=>{ const r=[...f.ingredients]; r[i]={...r[i],qty:e.target.value}; return {...f,ingredients:r}; })}
                  placeholder="Qty" />
                <button onClick={()=>setRecipeForm(f=>({...f,ingredients:f.ingredients.filter((_,j)=>j!==i)}))}
                  style={{ background:C.redBg, border:"none", borderRadius:6, color:"#fca5a5", width:30, height:34, cursor:"pointer" }}>✕</button>
              </div>
            ))}
            <datalist id="ing-list">{Object.keys(stock).map(k=><option key={k} value={k}/>)}</datalist>
            <button onClick={()=>setRecipeForm(f=>({...f,ingredients:[...f.ingredients,{ing:"",qty:1}]}))}
              style={{ background:"transparent", border:`1px dashed ${C.border2}`, borderRadius:6, color:C.dim, padding:"8px", cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>
              + Ingrediente
            </button>
            <button onClick={saveRecipe} style={btn({ marginTop:4 })}>Salvar Receita</button>
          </div>
        </Modal>
      )}

      {modal==="manageRestaurants" && (
        <Modal title="Gerenciar Restaurantes" onClose={()=>setModal(null)}>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <input style={{...inp,flex:1}} value={restInput} onChange={e=>setRestInput(e.target.value)} placeholder="Novo restaurante..." />
            <button onClick={addRestaurant} style={btn({ marginTop:0, padding:"8px 16px" })}>+</button>
          </div>
          {restaurants.map(r=>(
            <div key={r} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:C.raised, borderRadius:8, marginBottom:8 }}>
              <span style={{ fontSize:13 }}>{r}</span>
              <button onClick={()=>deleteRestaurant(r)} style={{ background:C.redBg, border:"none", borderRadius:6, color:"#fca5a5", padding:"4px 10px", cursor:"pointer", fontSize:12 }}>Eliminar</button>
            </div>
          ))}
        </Modal>
      )}

      {/* MAIN */}
      <main style={{ maxWidth:960, margin:"0 auto", padding:"28px 16px" }}>

        {/* ══ SALES ══ */}
        {tab==="sales" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, marginBottom:22 }}>Registrar Venta</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
              <div>
                <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>FECHA</div>
                <input style={inp} type="date" value={saleForm.date} onChange={e=>setSaleForm(f=>({...f,date:e.target.value}))} />
              </div>
              <div>
                <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>RESTAURANTE</div>
                <select style={inp} value={saleForm.restaurant} onChange={e=>setSaleForm(f=>({...f,restaurant:e.target.value}))}>
                  {restaurants.map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>ITENS VENDIDOS</div>
            {saleForm.entries.map((e,i)=>(
              <div key={i} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
                <select style={{...inp,flex:2}} value={e.item} onChange={ev=>updateRow(i,"item",ev.target.value)}>
                  <option value="">— Seleccionar —</option>
                  <optgroup label="🍳 Platos">
                    {Object.keys(recipes).map(d=><option key={d}>{d}</option>)}
                  </optgroup>
                  <optgroup label="🍶 Bebidas / Productos">
                    {beverages.filter(b=>!recipes[b]).map(b=><option key={b}>{b}</option>)}
                  </optgroup>
                </select>
                <input style={{...inp,flex:"0 0 80px",textAlign:"center"}} type="number" min={1} value={e.qty} onChange={ev=>updateRow(i,"qty",ev.target.value)} />
                <button onClick={()=>removeRow(i)} style={{ background:C.redBg, border:"none", borderRadius:6, color:"#fca5a5", width:32, height:34, cursor:"pointer", flexShrink:0 }}>✕</button>
              </div>
            ))}
            <button onClick={addRow} style={{ background:"transparent", border:`1px dashed ${C.border2}`, borderRadius:6, color:C.dim, padding:"8px", cursor:"pointer", fontSize:12, fontFamily:"inherit", width:"100%", marginBottom:16 }}>+ Agregar ítem</button>

            {/* preview */}
            {saleForm.entries.some(e=>e.item) && (
              <div style={{ background:C.raised, border:`1px solid ${C.border}`, borderRadius:8, padding:14, marginBottom:16 }}>
                <div style={{ fontSize:11, color:C.accent, fontWeight:700, marginBottom:8 }}>DEDUCCIÓN DE STOCK</div>
                {saleForm.entries.filter(e=>e.item).map((e,i)=>{
                  const r=recipes[e.item];
                  if (r) return (
                    <div key={i} style={{ marginBottom:5, fontSize:12 }}>
                      <span style={{ color:C.text }}>{e.item} ×{e.qty} → </span>
                      {Object.entries(r).map(([ing,per])=>(
                        <span key={ing} style={{ color:"#f87171", marginLeft:4 }}>-{+(per*e.qty).toFixed(3)} {ing}</span>
                      ))}
                    </div>
                  );
                  return <div key={i} style={{ color:"#f87171", fontSize:12 }}>-{e.qty} {e.item}</div>;
                })}
              </div>
            )}
            <button onClick={registerSale} style={btn({ width:"100%", padding:"13px" })}>✓ Registrar Venta</button>
          </div>
        )}

        {/* ══ TRANSFER ══ */}
        {tab==="transfer" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, marginBottom:22 }}>Traslado · Geladeira General → Restaurante</h2>
            {[
              ["Produto", <select style={inp} value={txForm.item} onChange={e=>setTxForm(f=>({...f,item:e.target.value}))}>
                <option value="">— Seleccionar —</option>
                {Object.keys(stock).sort().map(k=><option key={k} value={k}>{k} (stock: {stock[k]})</option>)}
              </select>],
              ["Cantidad", <input style={inp} type="number" min={1} value={txForm.qty} onChange={e=>setTxForm(f=>({...f,qty:Number(e.target.value)}))} />],
              ["Destino",  <select style={inp} value={txForm.to} onChange={e=>setTxForm(f=>({...f,to:e.target.value}))}>{restaurants.map(r=><option key={r}>{r}</option>)}</select>],
            ].map(([label,control],i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"100px 1fr", gap:12, marginBottom:14, alignItems:"center" }}>
                <div style={{ fontSize:11, color:C.muted }}>{label}</div>
                {control}
              </div>
            ))}
            <button onClick={registerTransfer} style={btn({ width:"100%", padding:"13px", marginTop:8 })}>✓ Registrar Traslado</button>
          </div>
        )}

        {/* ══ STOCK ══ */}
        {tab==="stock" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, margin:0 }}>Inventario · Geladeira General</h2>
              <button onClick={openAddStock} style={btn({ padding:"8px 16px", fontSize:12 })}>+ Produto</button>
            </div>
            <input style={{...inp, marginBottom:16}} placeholder="🔍 Buscar..." onChange={e=>{ /* handled below */ window._stockQ=e.target.value; e.target.dispatchEvent(new Event("search")); }} onSearch={()=>{}} id="stockSearch"
              onInput={e=>{ const cards=document.querySelectorAll(".stock-card"); const q=e.target.value.toLowerCase(); cards.forEach(c=>{ c.style.display=c.dataset.name.toLowerCase().includes(q)?"":"none"; }); }} />
            {lowStock.length>0 && (
              <div style={{ background:"#1c1400", border:`1px solid #78350f`, borderRadius:8, padding:14, marginBottom:18 }}>
                <div style={{ fontWeight:700, color:C.amber, marginBottom:6, fontSize:12 }}>⚠ STOCK BAJO (≤5)</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {lowStock.map(([k,v])=>(
                    <span key={k} style={{ background:"#292000", border:`1px solid #78350f`, borderRadius:4, padding:"3px 8px", fontSize:11, color:"#fcd34d" }}>{k}: {v}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10 }}>
              {stockEntries.sort((a,b)=>a[1]-b[1]).map(([k,v])=>(
                <div key={k} className="stock-card" data-name={k} style={{
                  background:C.raised, border:`1px solid ${v<=5?C.red:v<=15?C.amber:C.border}`,
                  borderRadius:8, padding:"12px 14px", cursor:"pointer", position:"relative",
                }}>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.3, marginBottom:6 }}>{k}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                    <div style={{ fontSize:24, fontWeight:800, color: v<=5?C.red:v<=15?C.amber:C.accent }}>{v}</div>
                    <div style={{ display:"flex", gap:4 }}>
                      <button onClick={()=>openEditStock(k)} style={{ background:"#1e293b", border:"none", borderRadius:4, color:C.muted, padding:"3px 8px", cursor:"pointer", fontSize:11 }}>✏</button>
                      <button onClick={()=>deleteStock(k)} style={{ background:C.redBg, border:"none", borderRadius:4, color:"#fca5a5", padding:"3px 8px", cursor:"pointer", fontSize:11 }}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ RECIPES ══ */}
        {tab==="recipes" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, margin:0 }}>Receitas · Deduções de Estoque</h2>
              <button onClick={openAddRecipe} style={btn({ padding:"8px 16px", fontSize:12 })}>+ Receita</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {Object.entries(recipes).map(([name,ings])=>(
                <div key={name} style={{ background:C.raised, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:8 }}>{name}</div>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={()=>openEditRecipe(name)} style={{ background:"#1e293b", border:"none", borderRadius:4, color:C.muted, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>✏ Editar</button>
                      <button onClick={()=>deleteRecipe(name)} style={{ background:C.redBg, border:"none", borderRadius:4, color:"#fca5a5", padding:"4px 10px", cursor:"pointer", fontSize:11 }}>✕</button>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {Object.entries(ings).map(([ing,qty])=>(
                      <span key={ing} style={{ background:"#1e293b", borderRadius:4, padding:"3px 10px", fontSize:11, color:"#c4b5fd" }}>
                        {ing} <span style={{ color:C.dim }}>×{qty}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ CONFIG ══ */}
        {tab==="config" && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {/* Restaurants */}
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, margin:0 }}>Restaurantes</h2>
                <button onClick={()=>setModal("manageRestaurants")} style={btn({ padding:"8px 16px", fontSize:12 })}>Gerenciar</button>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {restaurants.map(r=>(
                  <span key={r} style={{ background:C.raised, border:`1px solid ${C.border2}`, borderRadius:6, padding:"6px 14px", fontSize:12, color:C.text }}>{r}</span>
                ))}
              </div>
            </div>

            {/* Beverages config */}
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
              <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, marginBottom:8 }}>Produtos / Bebidas</h2>
              <p style={{ color:C.dim, fontSize:12, margin:"0 0 16px" }}>
                Produtos no estoque que NÃO têm receita são vendidos diretamente. Gerencie-os na aba Inventario.
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {beverages.filter(b=>!recipes[b]).map(b=>(
                  <span key={b} style={{ background:C.raised, border:`1px solid ${C.border2}`, borderRadius:4, padding:"3px 10px", fontSize:11, color:"#7dd3fc" }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div style={{ background:C.surface, border:`1px solid #7f1d1d`, borderRadius:12, padding:28 }}>
              <h2 style={{ color:C.red, fontSize:15, fontWeight:700, marginBottom:8 }}>⚠ Zona de Risco</h2>
              <p style={{ color:C.dim, fontSize:12, marginBottom:16 }}>Reseta todo o inventário e histórico para os valores iniciais.</p>
              <button onClick={resetAll} style={{ background:C.redBg, border:`1px solid ${C.red}`, borderRadius:8, color:"#fca5a5", padding:"10px 20px", cursor:"pointer", fontSize:13, fontFamily:"inherit", fontWeight:700 }}>
                🗑 Resetar Sistema
              </button>
            </div>
          </div>
        )}

        {/* ══ HISTORY ══ */}
        {tab==="history" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, margin:0 }}>Historial de Movimientos</h2>
              <span style={{ fontSize:11, color:C.dim }}>{sales.length} registros</span>
            </div>
            {sales.length===0 && <div style={{ color:C.dim, textAlign:"center", padding:40 }}>Sin movimientos aún.</div>}
            {sales.map(s=>(
              <div key={s.id} style={{ background:C.raised, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px 16px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ color:C.accent, fontWeight:700, fontSize:13 }}>{s.restaurant}</span>
                  <span style={{ color:C.dim, fontSize:11 }}>{s.date}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:6 }}>
                  {s.items.map((it,i)=>(
                    <span key={i} style={{ background:"#1e293b", borderRadius:4, padding:"3px 8px", fontSize:11, color:C.text }}>{it.item} ×{it.qty}</span>
                  ))}
                </div>
                <div style={{ fontSize:10, color:"#475569", lineHeight:1.6 }}>{s.log.join("  ·  ")}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
