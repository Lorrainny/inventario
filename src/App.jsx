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

// ── PERSISTENT STORAGE ────────────────────────────────────────────────────────
async function storageGet(key, fallback) {
  try {
    const result = await window.storage.get(key);
    return result ? JSON.parse(result.value) : fallback;
  } catch { return fallback; }
}
async function storageSet(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ── THEME ─────────────────────────────────────────────────────────────────────
const C = {
  bg:"#020817", surface:"#0f172a", raised:"#0a0f1e", border:"#1e293b",
  border2:"#334155", accent:"#a78bfa", accent2:"#7c3aed",
  text:"#e2e8f0", muted:"#94a3b8", dim:"#64748b",
  red:"#ef4444", redBg:"#7f1d1d", amber:"#f59e0b", green:"#22c55e",
};
const FF = "'IBM Plex Mono','Courier New',monospace";
const inp = {
  background:C.raised, border:`1px solid ${C.border2}`, borderRadius:6,
  color:C.text, padding:"8px 12px", fontSize:13, fontFamily:FF,
  outline:"none", width:"100%", boxSizing:"border-box",
};
const btn = (x={}) => ({
  background:`linear-gradient(135deg,#4c1d95,${C.accent2})`,
  border:"none", borderRadius:8, color:"#fff", padding:"11px 20px",
  fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FF,
  letterSpacing:"0.03em", ...x,
});

// ── SMALL COMPONENTS ──────────────────────────────────────────────────────────
function Toast({ data }) {
  if (!data) return null;
  return (
    <div style={{
      position:"fixed", top:80, right:20, zIndex:300,
      background: data.type==="error" ? "#7f1d1d" : "#14532d",
      border:`1px solid ${data.type==="error" ? C.red : C.green}`,
      borderRadius:8, padding:"12px 20px", fontSize:13, maxWidth:360,
      boxShadow:"0 8px 32px rgba(0,0,0,.7)", pointerEvents:"none",
    }}>{data.msg}</div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", zIndex:200,
      display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12,
        width:"100%", maxWidth:560, maxHeight:"92vh", overflowY:"auto", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ margin:0, color:C.accent, fontSize:16, fontWeight:700 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"transparent", border:"none", color:C.muted, fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"80vh", gap:16 }}>
      <div style={{ width:44, height:44, border:`3px solid ${C.border2}`, borderTop:`3px solid ${C.accent}`,
        borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ color:C.muted, fontSize:13 }}>Carregando dados…</div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [ready, setReady]       = useState(false);
  const [tab, setTab]           = useState("sales");
  const [stock, setStockRaw]    = useState(DEFAULT_STOCK);
  const [recipes, setRecipesRaw]= useState(DEFAULT_RECIPES);
  const [restaurants, setRestRaw]= useState(DEFAULT_RESTAURANTS);
  const [beverages, setBevRaw]  = useState(Object.keys(DEFAULT_STOCK));
  const [sales, setSalesRaw]    = useState([]);

  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);
  const showToast = (msg, type="success") => {
    clearTimeout(toastRef.current);
    setToast({ msg, type });
    toastRef.current = setTimeout(() => setToast(null), 3500);
  };

  // ── Wrapped setters that also persist ─────────────────────────────────────
  const setStock = useCallback(async (v) => {
    setStockRaw(v); await storageSet("stock", v);
  }, []);
  const setRecipes = useCallback(async (v) => {
    setRecipesRaw(v); await storageSet("recipes", v);
  }, []);
  const setRestaurants = useCallback(async (v) => {
    setRestRaw(v); await storageSet("restaurants", v);
  }, []);
  const setBeverages = useCallback(async (v) => {
    setBevRaw(v); await storageSet("beverages", v);
  }, []);
  const setSales = useCallback(async (v) => {
    setSalesRaw(v); await storageSet("sales", v);
  }, []);

  // ── Bootstrap: load all from storage ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      const [st, rc, rs, bv, sl] = await Promise.all([
        storageGet("stock",       DEFAULT_STOCK),
        storageGet("recipes",     DEFAULT_RECIPES),
        storageGet("restaurants", DEFAULT_RESTAURANTS),
        storageGet("beverages",   Object.keys(DEFAULT_STOCK)),
        storageGet("sales",       []),
      ]);
      setStockRaw(st); setRecipesRaw(rc); setRestRaw(rs); setBevRaw(bv); setSalesRaw(sl);
      setReady(true);
    })();
  }, []);

  // ── Sale form ─────────────────────────────────────────────────────────────
  const [saleForm, setSaleForm] = useState({
    date: new Date().toISOString().slice(0,10),
    restaurant: DEFAULT_RESTAURANTS[0],
    entries: [{ item:"", qty:1 }],
  });

  const addRow    = () => setSaleForm(f => ({ ...f, entries:[...f.entries,{item:"",qty:1}] }));
  const removeRow = i  => setSaleForm(f => ({ ...f, entries:f.entries.filter((_,j)=>j!==i) }));
  const updateRow = (i, field, val) => setSaleForm(f => {
    const e=[...f.entries]; e[i]={...e[i],[field]:field==="qty"?Number(val):val}; return {...f,entries:e};
  });

  const registerSale = useCallback(async () => {
    const valid = saleForm.entries.filter(e=>e.item&&e.qty>0);
    if (!valid.length) { showToast("Agrega al menos un artículo.","error"); return; }
    const ns={...stock}; const log=[];
    for (const {item,qty} of valid) {
      const recipe = recipes[item];
      if (recipe) {
        for (const [ing,per] of Object.entries(recipe)) {
          const d = +(per*qty).toFixed(4);
          if ((ns[ing]??0) < d) { showToast(`Stock insuficiente: "${ing}"`, "error"); return; }
          ns[ing] = +(ns[ing]-d).toFixed(4); log.push(`-${d} ${ing}`);
        }
      } else {
        if ((ns[item]??0) < qty) { showToast(`Stock insuficiente: "${item}"`, "error"); return; }
        ns[item] = +(ns[item]-qty).toFixed(4); log.push(`-${qty} ${item}`);
      }
    }
    const newSale = { id: Date.now(), date: saleForm.date, restaurant: saleForm.restaurant, items: valid, log };
    const newSales = [newSale, ...sales];
    await setStock(ns);
    await setSales(newSales);
    setSaleForm(f => ({...f, entries:[{item:"",qty:1}]}));
    showToast(`✓ Venda registrada em ${saleForm.restaurant}`);
  }, [saleForm, stock, recipes, sales, setStock, setSales]);

  // ── Transfer form ─────────────────────────────────────────────────────────
  const [txForm, setTxForm] = useState({ item:"", qty:1, to: DEFAULT_RESTAURANTS[0] });

  const registerTransfer = useCallback(async () => {
    const { item, qty, to } = txForm;
    if (!item||qty<=0) { showToast("Completa o formulário.","error"); return; }
    if ((stock[item]??0) < qty) { showToast(`Stock insuficiente: "${item}"`, "error"); return; }
    const ns = {...stock, [item]: +(stock[item]-qty).toFixed(4)};
    const newSale = { id: Date.now(), date: new Date().toISOString().slice(0,10),
      restaurant:`🔄 → ${to}`, items:[{item,qty}], log:[`-${qty} ${item} traslado a ${to}`] };
    await setStock(ns);
    await setSales([newSale, ...sales]);
    showToast(`✓ Traslado de ${qty} "${item}" a ${to}`);
  }, [txForm, stock, sales, setStock, setSales]);

  // ── Modals ────────────────────────────────────────────────────────────────
  const [modal, setModal]       = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  // Stock modal
  const [stockForm, setStockForm] = useState({ name:"", qty:0 });
  const openAddStock  = () => { setStockForm({name:"",qty:0}); setModal("addStock"); };
  const openEditStock = (n) => { setStockForm({name:n, qty:stock[n]}); setEditTarget(n); setModal("editStock"); };
  const saveStock = async () => {
    if (!stockForm.name.trim()) { showToast("Nome obrigatório.","error"); return; }
    const ns = {...stock};
    if (modal==="editStock" && editTarget && editTarget!==stockForm.name) delete ns[editTarget];
    ns[stockForm.name.trim()] = Number(stockForm.qty);
    await setStock(ns);
    if (!beverages.includes(stockForm.name.trim()))
      await setBeverages([...beverages, stockForm.name.trim()]);
    setModal(null); showToast("✓ Produto salvo.");
  };
  const deleteStock = async (n) => {
    if (!window.confirm(`Eliminar "${n}"?`)) return;
    const ns = {...stock}; delete ns[n];
    await setStock(ns);
    await setBeverages(beverages.filter(x=>x!==n));
    showToast(`"${n}" eliminado.`);
  };

  // Recipe modal
  const [recipeForm, setRecipeForm] = useState({ name:"", ingredients:[{ing:"",qty:1}] });
  const openAddRecipe  = () => { setRecipeForm({name:"",ingredients:[{ing:"",qty:1}]}); setModal("addRecipe"); };
  const openEditRecipe = (n) => {
    setRecipeForm({ name:n, ingredients:Object.entries(recipes[n]).map(([ing,qty])=>({ing,qty})) });
    setEditTarget(n); setModal("editRecipe");
  };
  const saveRecipe = async () => {
    if (!recipeForm.name.trim()) { showToast("Nome obrigatório.","error"); return; }
    const ings = recipeForm.ingredients.filter(r=>r.ing.trim()&&r.qty>0);
    if (!ings.length) { showToast("Agrega al menos un ingrediente.","error"); return; }
    const nr = {...recipes};
    if (modal==="editRecipe" && editTarget && editTarget!==recipeForm.name) delete nr[editTarget];
    nr[recipeForm.name.trim()] = Object.fromEntries(ings.map(r=>[r.ing.trim(), Number(r.qty)]));
    await setRecipes(nr); setModal(null); showToast("✓ Receita salva.");
  };
  const deleteRecipe = async (n) => {
    if (!window.confirm(`Eliminar receita "${n}"?`)) return;
    const nr = {...recipes}; delete nr[n];
    await setRecipes(nr); showToast(`Receita "${n}" eliminada.`);
  };

  // Restaurants modal
  const [restInput, setRestInput] = useState("");
  const addRestaurant = async () => {
    if (!restInput.trim()) return;
    if (restaurants.includes(restInput.trim())) { showToast("Já existe.","error"); return; }
    await setRestaurants([...restaurants, restInput.trim()]);
    setRestInput(""); showToast("✓ Restaurante adicionado.");
  };
  const deleteRestaurant = async (n) => {
    if (!window.confirm(`Eliminar "${n}"?`)) return;
    await setRestaurants(restaurants.filter(x=>x!==n));
  };

  // Reset
  const resetAll = async () => {
    if (!window.confirm("Resetar TUDO para os valores iniciais?")) return;
    await setStock(DEFAULT_STOCK); await setRecipes(DEFAULT_RECIPES);
    await setRestaurants(DEFAULT_RESTAURANTS); await setBeverages(Object.keys(DEFAULT_STOCK));
    await setSales([]);
    showToast("✓ Sistema resetado.");
  };

  // ── Summary ───────────────────────────────────────────────────────────────
  const today = new Date().toISOString().slice(0,10);
  const [sumFrom, setSumFrom] = useState(today);
  const [sumTo,   setSumTo]   = useState(today);
  const [sumRest, setSumRest] = useState("TODOS");
  const [stockSearch, setStockSearch] = useState("");

  const filteredSales = sales.filter(s => {
    if (!s.date || s.restaurant?.startsWith("🔄")) return false;
    if (sumRest!=="TODOS" && s.restaurant!==sumRest) return false;
    return s.date>=sumFrom && s.date<=sumTo;
  });
  const summaryByRest = restaurants.map(r => {
    const rS = filteredSales.filter(s=>s.restaurant===r);
    const totals={};
    rS.forEach(s=>s.items?.forEach(({item,qty})=>{ totals[item]=(totals[item]||0)+qty; }));
    return { name:r, totals, units:Object.values(totals).reduce((a,b)=>a+b,0), tx:rS.length };
  }).filter(r => sumRest==="TODOS" || r.name===sumRest);
  const globalTotals={};
  filteredSales.forEach(s=>s.items?.forEach(({item,qty})=>{ globalTotals[item]=(globalTotals[item]||0)+qty; }));
  const topItems = Object.entries(globalTotals).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const totalAll = Object.values(globalTotals).reduce((a,b)=>a+b,0);

  const stockEntries = Object.entries(stock);
  const lowStock = stockEntries.filter(([,v])=>v<=5);
  const filteredStockEntries = stockEntries
    .filter(([k])=>k.toLowerCase().includes(stockSearch.toLowerCase()))
    .sort((a,b)=>a[1]-b[1]);

  const TABS=[
    ["sales","🛒 Venta"],["transfer","🔄 Traslado"],["stock","📦 Inventario"],
    ["recipes","🍳 Receitas"],["summary","📊 Resumo"],["config","⚙ Config"],["history","📋 Historial"],
  ];

  if (!ready) return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:FF, color:C.text }}>
      <Spinner />
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:FF, color:C.text }}>

      {/* ── HEADER ── */}
      <header style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b)", borderBottom:"1px solid #312e81",
        padding:"18px 20px 0", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div>
            <div style={{ fontSize:20, fontWeight:800, color:C.accent, letterSpacing:"0.05em" }}>한식 INVENTARIO</div>
            <div style={{ fontSize:10, color:C.dim, letterSpacing:"0.1em", marginTop:2 }}>
              {restaurants.length} RESTAURANTES · {Object.keys(stock).length} PRODUTOS · {sales.length} MOVIMENTOS
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div title="Dados salvos" style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:"#4ade80" }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade80" }} />
              SALVO
            </div>
            {lowStock.length>0 && (
              <div style={{ background:C.redBg, border:`1px solid ${C.red}`, borderRadius:6,
                padding:"4px 12px", fontSize:11, color:"#fca5a5" }}>
                ⚠ {lowStock.length} baixos
              </div>
            )}
          </div>
        </div>
        <nav style={{ display:"flex", overflowX:"auto", gap:0 }}>
          {TABS.map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              background:"transparent", border:"none",
              color: tab===k ? C.accent : C.dim,
              padding:"9px 13px", cursor:"pointer", fontSize:12,
              borderBottom:`2px solid ${tab===k ? C.accent : "transparent"}`,
              fontFamily:FF, whiteSpace:"nowrap",
            }}>{l}</button>
          ))}
        </nav>
      </header>

      <Toast data={toast} />

      {/* ── MODALS ── */}
      {(modal==="addStock"||modal==="editStock") && (
        <Modal title={modal==="addStock"?"Adicionar Produto":"Editar Produto"} onClose={()=>setModal(null)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Nome do produto</div>
              <input style={inp} value={stockForm.name} onChange={e=>setStockForm(f=>({...f,name:e.target.value}))} placeholder="ex: Agua Mineral XYZ" />
            </div>
            <div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Quantidade em estoque</div>
              <input style={inp} type="number" step="0.5" value={stockForm.qty}
                onChange={e=>setStockForm(f=>({...f,qty:e.target.value}))} />
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
              <input style={inp} value={recipeForm.name}
                onChange={e=>setRecipeForm(f=>({...f,name:e.target.value}))} placeholder="ex: Kimchi Jjigae" />
            </div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:2 }}>Ingredientes</div>
            {recipeForm.ingredients.map((row,i)=>(
              <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
                <input style={{...inp,flex:2}} list="ing-dl" value={row.ing}
                  onChange={e=>setRecipeForm(f=>{ const r=[...f.ingredients]; r[i]={...r[i],ing:e.target.value}; return {...f,ingredients:r}; })}
                  placeholder="Ingrediente" />
                <input style={{...inp,flex:"0 0 80px"}} type="number" step="0.01" value={row.qty}
                  onChange={e=>setRecipeForm(f=>{ const r=[...f.ingredients]; r[i]={...r[i],qty:e.target.value}; return {...f,ingredients:r}; })} />
                <button onClick={()=>setRecipeForm(f=>({...f,ingredients:f.ingredients.filter((_,j)=>j!==i)}))}
                  style={{ background:C.redBg, border:"none", borderRadius:6, color:"#fca5a5", width:32, height:36, cursor:"pointer", flexShrink:0 }}>✕</button>
              </div>
            ))}
            <datalist id="ing-dl">{Object.keys(stock).map(k=><option key={k} value={k}/>)}</datalist>
            <button onClick={()=>setRecipeForm(f=>({...f,ingredients:[...f.ingredients,{ing:"",qty:1}]}))}
              style={{ background:"transparent", border:`1px dashed ${C.border2}`, borderRadius:6, color:C.dim,
                padding:8, cursor:"pointer", fontSize:12, fontFamily:FF }}>+ Ingrediente</button>
            <button onClick={saveRecipe} style={btn()}>Salvar Receita</button>
          </div>
        </Modal>
      )}

      {modal==="manageRest" && (
        <Modal title="Gerenciar Restaurantes" onClose={()=>setModal(null)}>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <input style={{...inp,flex:1}} value={restInput} onChange={e=>setRestInput(e.target.value)}
              placeholder="Novo restaurante..." onKeyDown={e=>e.key==="Enter"&&addRestaurant()} />
            <button onClick={addRestaurant} style={btn({ padding:"8px 18px" })}>+</button>
          </div>
          {restaurants.map(r=>(
            <div key={r} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"10px 14px", background:C.raised, borderRadius:8, marginBottom:8 }}>
              <span style={{ fontSize:13 }}>{r}</span>
              <button onClick={()=>deleteRestaurant(r)} style={{ background:C.redBg, border:"none",
                borderRadius:6, color:"#fca5a5", padding:"4px 12px", cursor:"pointer", fontSize:12 }}>Eliminar</button>
            </div>
          ))}
        </Modal>
      )}

      {/* ── MAIN ── */}
      <main style={{ maxWidth:980, margin:"0 auto", padding:"28px 16px" }}>

        {/* ══ SALES ══ */}
        {tab==="sales" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, marginBottom:22 }}>Registrar Venda</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
              <div>
                <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>FECHA</div>
                <input style={inp} type="date" value={saleForm.date}
                  onChange={e=>setSaleForm(f=>({...f,date:e.target.value}))} />
              </div>
              <div>
                <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>RESTAURANTE</div>
                <select style={inp} value={saleForm.restaurant}
                  onChange={e=>setSaleForm(f=>({...f,restaurant:e.target.value}))}>
                  {restaurants.map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>ITENS VENDIDOS</div>
            {saleForm.entries.map((e,i)=>(
              <div key={i} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
                <select style={{...inp,flex:2}} value={e.item} onChange={ev=>updateRow(i,"item",ev.target.value)}>
                  <option value="">— Seleccionar —</option>
                  <optgroup label="🍳 Pratos">{Object.keys(recipes).map(d=><option key={d}>{d}</option>)}</optgroup>
                  <optgroup label="🍶 Bebidas / Produtos">{beverages.filter(b=>!recipes[b]).map(b=><option key={b}>{b}</option>)}</optgroup>
                </select>
                <input style={{...inp,flex:"0 0 80px",textAlign:"center"}} type="number" min={1}
                  value={e.qty} onChange={ev=>updateRow(i,"qty",ev.target.value)} />
                <button onClick={()=>removeRow(i)} style={{ background:C.redBg, border:"none", borderRadius:6,
                  color:"#fca5a5", width:32, height:36, cursor:"pointer", flexShrink:0 }}>✕</button>
              </div>
            ))}
            <button onClick={addRow} style={{ background:"transparent", border:`1px dashed ${C.border2}`,
              borderRadius:6, color:C.dim, padding:8, cursor:"pointer", fontSize:12, fontFamily:FF,
              width:"100%", marginBottom:16 }}>+ Agregar ítem</button>

            {saleForm.entries.some(e=>e.item) && (
              <div style={{ background:C.raised, border:`1px solid ${C.border}`, borderRadius:8, padding:14, marginBottom:16 }}>
                <div style={{ fontSize:11, color:C.accent, fontWeight:700, marginBottom:8 }}>DEDUCCIÓN DE STOCK</div>
                {saleForm.entries.filter(e=>e.item).map((e,i)=>{
                  const r=recipes[e.item];
                  if (r) return <div key={i} style={{ marginBottom:5, fontSize:12 }}>
                    <span style={{ color:C.text }}>{e.item} ×{e.qty} → </span>
                    {Object.entries(r).map(([ing,per])=>(
                      <span key={ing} style={{ color:"#f87171", marginLeft:4 }}>-{+(per*e.qty).toFixed(3)} {ing}</span>
                    ))}
                  </div>;
                  return <div key={i} style={{ color:"#f87171", fontSize:12, marginBottom:4 }}>-{e.qty} {e.item}</div>;
                })}
              </div>
            )}
            <button onClick={registerSale} style={btn({ width:"100%", padding:14 })}>✓ Registrar Venda</button>
          </div>
        )}

        {/* ══ TRANSFER ══ */}
        {tab==="transfer" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, marginBottom:22 }}>
              Traslado · Geladeira Geral → Restaurante
            </h2>
            {[
              ["Produto",
                <select style={inp} value={txForm.item} onChange={e=>setTxForm(f=>({...f,item:e.target.value}))}>
                  <option value="">— Seleccionar —</option>
                  {Object.keys(stock).sort().map(k=><option key={k} value={k}>{k}  (stock: {stock[k]})</option>)}
                </select>
              ],
              ["Cantidad",
                <input style={inp} type="number" min={1} value={txForm.qty}
                  onChange={e=>setTxForm(f=>({...f,qty:Number(e.target.value)}))} />
              ],
              ["Destino",
                <select style={inp} value={txForm.to} onChange={e=>setTxForm(f=>({...f,to:e.target.value}))}>
                  {restaurants.map(r=><option key={r}>{r}</option>)}
                </select>
              ],
            ].map(([label,ctrl],i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"110px 1fr", gap:12, marginBottom:14, alignItems:"center" }}>
                <div style={{ fontSize:11, color:C.muted }}>{label}</div>{ctrl}
              </div>
            ))}
            <button onClick={registerTransfer} style={btn({ width:"100%", padding:14, marginTop:8 })}>
              ✓ Registrar Traslado
            </button>
          </div>
        )}

        {/* ══ STOCK ══ */}
        {tab==="stock" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, margin:0 }}>Inventario · Geladeira Geral</h2>
              <button onClick={openAddStock} style={btn({ padding:"8px 16px", fontSize:12 })}>+ Produto</button>
            </div>
            <input style={{...inp, marginBottom:16}} placeholder="🔍 Buscar produto..."
              value={stockSearch} onChange={e=>setStockSearch(e.target.value)} />
            {lowStock.length>0 && (
              <div style={{ background:"#1c1400", border:"1px solid #78350f", borderRadius:8, padding:14, marginBottom:18 }}>
                <div style={{ fontWeight:700, color:C.amber, marginBottom:6, fontSize:12 }}>⚠ STOCK BAJO (≤5)</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {lowStock.map(([k,v])=>(
                    <span key={k} style={{ background:"#292000", border:"1px solid #78350f",
                      borderRadius:4, padding:"3px 8px", fontSize:11, color:"#fcd34d" }}>{k}: {v}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))", gap:10 }}>
              {filteredStockEntries.map(([k,v])=>(
                <div key={k} style={{ background:C.raised,
                  border:`1px solid ${v<=5?C.red:v<=15?C.amber:C.border}`, borderRadius:8, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.3, marginBottom:6 }}>{k}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                    <div style={{ fontSize:24, fontWeight:800, color:v<=5?C.red:v<=15?C.amber:C.accent }}>{v}</div>
                    <div style={{ display:"flex", gap:4 }}>
                      <button onClick={()=>openEditStock(k)} style={{ background:"#1e293b", border:"none",
                        borderRadius:4, color:C.muted, padding:"3px 8px", cursor:"pointer", fontSize:11 }}>✏</button>
                      <button onClick={()=>deleteStock(k)} style={{ background:C.redBg, border:"none",
                        borderRadius:4, color:"#fca5a5", padding:"3px 8px", cursor:"pointer", fontSize:11 }}>✕</button>
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
            {Object.entries(recipes).map(([name,ings])=>(
              <div key={name} style={{ background:C.raised, border:`1px solid ${C.border}`,
                borderRadius:8, padding:"14px 16px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:8 }}>{name}</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={()=>openEditRecipe(name)} style={{ background:"#1e293b", border:"none",
                      borderRadius:4, color:C.muted, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>✏ Editar</button>
                    <button onClick={()=>deleteRecipe(name)} style={{ background:C.redBg, border:"none",
                      borderRadius:4, color:"#fca5a5", padding:"4px 10px", cursor:"pointer", fontSize:11 }}>✕</button>
                  </div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {Object.entries(ings).map(([ing,qty])=>(
                    <span key={ing} style={{ background:"#1e293b", borderRadius:4, padding:"3px 10px",
                      fontSize:11, color:"#c4b5fd" }}>{ing} <span style={{ color:C.dim }}>×{qty}</span></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ SUMMARY ══ */}
        {tab==="summary" && (
          <div>
            <style>{`
              @media print {
                @page { size: A4; margin: 14mm 12mm; }
                body { background: #fff !important; color: #000 !important; font-family: Arial, sans-serif !important; font-size: 8pt !important; }
                .np { display: none !important; }
                .print-doc { background: #fff !important; color: #000 !important; padding: 0 !important; max-width: 100% !important; }
                .doc-header { border-bottom: 2.5px solid #000 !important; margin-bottom: 8px !important; padding-bottom: 6px !important; }
                .doc-section { margin-bottom: 10px !important; }
                .doc-section-title { background: #222 !important; color: #fff !important; padding: 3px 6px !important; font-size: 7.5pt !important; font-weight: bold !important; margin-bottom: 3px !important; }
                table { width: 100% !important; border-collapse: collapse !important; font-size: 7.5pt !important; }
                th { background: #e8e8e8 !important; color: #000 !important; border: 1px solid #bbb !important; padding: 2px 5px !important; font-weight: bold !important; }
                td { border: 1px solid #ccc !important; padding: 2px 5px !important; color: #000 !important; }
                .tr-alt { background: #f7f7f7 !important; }
                .td-low { color: #c00 !important; font-weight: bold !important; }
                .td-mid { color: #a05000 !important; }
                .td-ok  { color: #006600 !important; }
                .kpi-row { display: flex !important; gap: 6px !important; margin-bottom: 8px !important; }
                .kpi-box { border: 1.5px solid #000 !important; padding: 4px 8px !important; flex: 1 !important; }
                .kpi-label { font-size: 6.5pt !important; color: #555 !important; }
                .kpi-val { font-size: 14pt !important; font-weight: bold !important; color: #000 !important; }
                .two-col { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
              }
            `}</style>

            {/* ── Controls (screen only) ── */}
            <div className="np" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:20, marginBottom:16 }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"flex-end" }}>
                <div><div style={{ fontSize:10, color:C.muted, marginBottom:4 }}>DE</div>
                  <input type="date" style={{...inp,width:"auto"}} value={sumFrom} onChange={e=>setSumFrom(e.target.value)} /></div>
                <div><div style={{ fontSize:10, color:C.muted, marginBottom:4 }}>ATÉ</div>
                  <input type="date" style={{...inp,width:"auto"}} value={sumTo} onChange={e=>setSumTo(e.target.value)} /></div>
                <div><div style={{ fontSize:10, color:C.muted, marginBottom:4 }}>RESTAURANTE</div>
                  <select style={{...inp,width:"auto"}} value={sumRest} onChange={e=>setSumRest(e.target.value)}>
                    <option value="TODOS">TODOS</option>
                    {restaurants.map(r=><option key={r}>{r}</option>)}
                  </select></div>
                <button onClick={()=>window.print()} style={btn({ padding:"9px 22px", marginLeft:"auto" })}>
                  🖨 Imprimir / PDF
                </button>
              </div>
            </div>

            {/* ── DOCUMENT (visible on screen as preview + printed) ── */}
            <div className="print-doc" style={{ background:"#fff", color:"#111", borderRadius:8, padding:"28px 32px",
              fontFamily:"Arial, Helvetica, sans-serif", fontSize:12, maxWidth:860, margin:"0 auto",
              boxShadow:"0 4px 24px rgba(0,0,0,0.5)" }}>

              {/* Document header */}
              <div className="doc-header" style={{ borderBottom:"2.5px solid #111", paddingBottom:10, marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                  <div>
                    <div style={{ fontSize:18, fontWeight:900, letterSpacing:"0.04em", color:"#111" }}>RELATÓRIO DE INVENTÁRIO</div>
                    <div style={{ fontSize:10, color:"#555", marginTop:2 }}>한식 Korean Restaurant Group</div>
                  </div>
                  <div style={{ textAlign:"right", fontSize:9, color:"#555", lineHeight:1.6 }}>
                    <div><b>Período:</b> {sumFrom} → {sumTo}</div>
                    <div><b>Filtro:</b> {sumRest==="TODOS"?"Todos os restaurantes":sumRest}</div>
                    <div><b>Emitido em:</b> {new Date().toLocaleString("pt-BR")}</div>
                  </div>
                </div>
              </div>

              {filteredSales.length===0 ? (
                <div style={{ textAlign:"center", padding:"40px 0", color:"#888", fontSize:13 }}>
                  Nenhuma venda registrada no período selecionado.
                </div>
              ):(<>

                {/* KPIs */}
                <div className="kpi-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
                  {[
                    ["TRANSAÇÕES", filteredSales.length],
                    ["UNIDADES VENDIDAS", totalAll],
                    ["ITENS DISTINTOS", Object.keys(globalTotals).length],
                    ["RESTAURANTES ATIVOS", summaryByRest.filter(r=>r.tx>0).length],
                  ].map(([l,v])=>(
                    <div key={l} className="kpi-box" style={{ border:"1.5px solid #222", padding:"6px 10px" }}>
                      <div className="kpi-label" style={{ fontSize:8, color:"#777", fontWeight:600, letterSpacing:"0.05em" }}>{l}</div>
                      <div className="kpi-val" style={{ fontSize:22, fontWeight:800, color:"#111", lineHeight:1.2 }}>{v}</div>
                    </div>
                  ))}
                </div>

                {/* Two-column: Vendas por restaurante + Top vendidos */}
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>

                  {/* Vendas por restaurante */}
                  <div className="doc-section">
                    <div className="doc-section-title" style={{ background:"#222", color:"#fff", padding:"3px 8px", fontSize:9, fontWeight:700, marginBottom:4 }}>
                      VENDAS POR RESTAURANTE
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign:"left", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8 }}>Restaurante</th>
                          <th style={{ textAlign:"right", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8 }}>Transações</th>
                          <th style={{ textAlign:"right", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8 }}>Unidades</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryByRest.map(({ name, units, tx }, ri)=>(
                          <tr key={name} className={ri%2===1?"tr-alt":""} style={{ background:ri%2===1?"#f5f5f5":"#fff" }}>
                            <td style={{ border:"1px solid #ccc", padding:"3px 6px", fontSize:9, fontWeight:600 }}>{name}</td>
                            <td style={{ border:"1px solid #ccc", padding:"3px 6px", textAlign:"right", fontSize:9 }}>{tx}</td>
                            <td style={{ border:"1px solid #ccc", padding:"3px 6px", textAlign:"right", fontSize:9, fontWeight:700 }}>{units}</td>
                          </tr>
                        ))}
                        <tr style={{ background:"#e8e8e8" }}>
                          <td style={{ border:"1px solid #bbb", padding:"3px 6px", fontSize:9, fontWeight:700 }}>TOTAL</td>
                          <td style={{ border:"1px solid #bbb", padding:"3px 6px", textAlign:"right", fontSize:9, fontWeight:700 }}>{filteredSales.length}</td>
                          <td style={{ border:"1px solid #bbb", padding:"3px 6px", textAlign:"right", fontSize:9, fontWeight:700 }}>{totalAll}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Top vendidos */}
                  <div className="doc-section">
                    <div className="doc-section-title" style={{ background:"#222", color:"#fff", padding:"3px 8px", fontSize:9, fontWeight:700, marginBottom:4 }}>
                      TOP 10 ITENS MAIS VENDIDOS
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign:"left", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8 }}>Item</th>
                          <th style={{ textAlign:"right", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8 }}>Qtd</th>
                          <th style={{ textAlign:"right", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8 }}>%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topItems.map(([item,qty],ri)=>{
                          const pct=totalAll>0?Math.round((qty/totalAll)*100):0;
                          return <tr key={item} className={ri%2===1?"tr-alt":""} style={{ background:ri%2===1?"#f5f5f5":"#fff" }}>
                            <td style={{ border:"1px solid #ccc", padding:"3px 6px", fontSize:9 }}>{item}</td>
                            <td style={{ border:"1px solid #ccc", padding:"3px 6px", textAlign:"right", fontSize:9, fontWeight:700 }}>{qty}</td>
                            <td style={{ border:"1px solid #ccc", padding:"3px 6px", textAlign:"right", fontSize:9, color:"#555" }}>{pct}%</td>
                          </tr>;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detalhe por restaurante — itens vendidos */}
                <div className="doc-section" style={{ marginBottom:14 }}>
                  <div className="doc-section-title" style={{ background:"#222", color:"#fff", padding:"3px 8px", fontSize:9, fontWeight:700, marginBottom:4 }}>
                    DETALHE DE ITENS VENDIDOS POR RESTAURANTE
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ textAlign:"left", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8, width:"30%" }}>Restaurante</th>
                        <th style={{ textAlign:"left", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8 }}>Item</th>
                        <th style={{ textAlign:"right", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 6px", fontSize:8, width:"60px" }}>Qtd</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summaryByRest.map(({ name, totals })=>
                        Object.keys(totals).length===0 ? null :
                        Object.entries(totals).sort((a,b)=>b[1]-a[1]).map(([item,qty],ii)=>(
                          <tr key={name+item} style={{ background:ii%2===1?"#f5f5f5":"#fff" }}>
                            <td style={{ border:"1px solid #ccc", padding:"2px 6px", fontSize:8.5, fontWeight: ii===0?700:400, color: ii===0?"#111":"#444" }}>
                              {ii===0 ? name : ""}
                            </td>
                            <td style={{ border:"1px solid #ccc", padding:"2px 6px", fontSize:8.5 }}>{item}</td>
                            <td style={{ border:"1px solid #ccc", padding:"2px 6px", textAlign:"right", fontSize:8.5, fontWeight:700 }}>{qty}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Existencias */}
                <div className="doc-section">
                  <div className="doc-section-title" style={{ background:"#222", color:"#fff", padding:"3px 8px", fontSize:9, fontWeight:700, marginBottom:4 }}>
                    EXISTENCIAS ATUAIS — GELADEIRA GERAL
                  </div>
                  <table>
                    <thead>
                      <tr>
                        {["Produto","Stock","Status","Produto","Stock","Status"].map((h,i)=>(
                          <th key={i} style={{ textAlign: i%3===0?"left":"center", background:"#e8e8e8", border:"1px solid #bbb", padding:"3px 5px", fontSize:8 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const entries = Object.entries(stock).sort((a,b)=>a[0].localeCompare(b[0]));
                        const rows = [];
                        for (let i=0; i<entries.length; i+=2) {
                          const [k1,v1]=entries[i];
                          const pair=entries[i+1];
                          const status=(v)=>v<=5?"⚠ BAIXO":v<=15?"MÉDIO":"OK";
                          const sc=(v)=>v<=5?"#c00":v<=15?"#a05000":"#006600";
                          rows.push(
                            <tr key={k1} style={{ background: Math.floor(i/2)%2===1?"#f5f5f5":"#fff" }}>
                              <td style={{ border:"1px solid #ccc", padding:"2px 5px", fontSize:8 }}>{k1}</td>
                              <td style={{ border:"1px solid #ccc", padding:"2px 5px", textAlign:"center", fontSize:8, fontWeight:700, color:sc(v1) }}>{v1}</td>
                              <td style={{ border:"1px solid #ccc", padding:"2px 5px", textAlign:"center", fontSize:7.5, color:sc(v1), fontWeight:600 }}>{status(v1)}</td>
                              {pair ? <>
                                <td style={{ border:"1px solid #ccc", padding:"2px 5px", fontSize:8 }}>{pair[0]}</td>
                                <td style={{ border:"1px solid #ccc", padding:"2px 5px", textAlign:"center", fontSize:8, fontWeight:700, color:sc(pair[1]) }}>{pair[1]}</td>
                                <td style={{ border:"1px solid #ccc", padding:"2px 5px", textAlign:"center", fontSize:7.5, color:sc(pair[1]), fontWeight:600 }}>{status(pair[1])}</td>
                              </> : <><td colSpan={3} style={{ border:"1px solid #ccc" }} /></>}
                            </tr>
                          );
                        }
                        return rows;
                      })()}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div style={{ borderTop:"1px solid #ccc", marginTop:14, paddingTop:6, fontSize:8, color:"#999", display:"flex", justifyContent:"space-between" }}>
                  <span>한식 Korean Restaurant Group · Sistema de Inventário</span>
                  <span>Documento gerado automaticamente em {new Date().toLocaleString("pt-BR")}</span>
                </div>
              </>)}
            </div>
          </div>
        )}

        {/* ══ CONFIG ══ */}
        {tab==="config" && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, margin:0 }}>Restaurantes</h2>
                <button onClick={()=>setModal("manageRest")} style={btn({ padding:"8px 16px", fontSize:12 })}>Gerenciar</button>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {restaurants.map(r=>(
                  <span key={r} style={{ background:C.raised, border:`1px solid ${C.border2}`,
                    borderRadius:6, padding:"6px 14px", fontSize:12 }}>{r}</span>
                ))}
              </div>
            </div>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
              <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, marginBottom:8 }}>Sobre o armazenamento</h2>
              <p style={{ color:C.dim, fontSize:12, margin:0, lineHeight:1.7 }}>
                Os dados são salvos automaticamente no armazenamento persistente do artifact.
                Estoque, receitas, restaurantes e histórico ficam salvos entre sessões.
              </p>
            </div>
            <div style={{ background:C.surface, border:"1px solid #7f1d1d", borderRadius:12, padding:28 }}>
              <h2 style={{ color:C.red, fontSize:15, fontWeight:700, marginBottom:8 }}>⚠ Zona de Risco</h2>
              <p style={{ color:C.dim, fontSize:12, marginBottom:16 }}>Reseta todo o inventário e histórico para os valores iniciais.</p>
              <button onClick={resetAll} style={{ background:C.redBg, border:`1px solid ${C.red}`,
                borderRadius:8, color:"#fca5a5", padding:"10px 20px", cursor:"pointer",
                fontSize:13, fontFamily:FF, fontWeight:700 }}>🗑 Resetar Sistema</button>
            </div>
          </div>
        )}

        {/* ══ HISTORY ══ */}
        {tab==="history" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ color:C.accent, fontSize:17, fontWeight:700, margin:0 }}>Historial de Movimentos</h2>
              <span style={{ fontSize:11, color:C.dim }}>{sales.length} registros</span>
            </div>
            {sales.length===0 && (
              <div style={{ color:C.dim, textAlign:"center", padding:40 }}>Sem movimentos ainda.</div>
            )}
            {sales.map(s=>(
              <div key={s.id} style={{ background:C.raised, border:`1px solid ${C.border}`,
                borderRadius:8, padding:"14px 16px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ color:C.accent, fontWeight:700, fontSize:13 }}>{s.restaurant}</span>
                  <span style={{ color:C.dim, fontSize:11 }}>{s.date}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:6 }}>
                  {s.items?.map((it,i)=>(
                    <span key={i} style={{ background:"#1e293b", borderRadius:4,
                      padding:"3px 8px", fontSize:11, color:C.text }}>{it.item} ×{it.qty}</span>
                  ))}
                </div>
                <div style={{ fontSize:10, color:"#475569", lineHeight:1.6 }}>{s.log?.join("  ·  ")}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

