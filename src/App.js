import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://obacbdvknksuzjaqmxrh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYWNiZHZrbmtzdXpqYXFteHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzODMwMjYsImV4cCI6MjA4ODk1OTAyNn0.CwHBqH0uWIo4yQjW1APMEqepQ5cqIEiIev0DAKZbxH4";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const FOOD_DB = [
  { name: "Piletina", unit: "g", baseAmount: 100, kcal: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Riža bijela", unit: "g", baseAmount: 100, kcal: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: "Jaje", unit: "kom", baseAmount: 1, kcal: 78, protein: 6, carbs: 0.6, fat: 5 },
  { name: "Banana", unit: "kom", baseAmount: 1, kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { name: "Jogurt", unit: "g", baseAmount: 200, kcal: 120, protein: 8, carbs: 14, fat: 3 },
  { name: "Kruh", unit: "kriška", baseAmount: 1, kcal: 80, protein: 3, carbs: 15, fat: 1 },
  { name: "Losos", unit: "g", baseAmount: 100, kcal: 208, protein: 20, carbs: 0, fat: 13 },
  { name: "Brokula", unit: "g", baseAmount: 100, kcal: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: "Maslac", unit: "g", baseAmount: 10, kcal: 72, protein: 0.1, carbs: 0, fat: 8 },
  { name: "Mlijeko", unit: "ml", baseAmount: 200, kcal: 122, protein: 6.4, carbs: 9.6, fat: 4.8 },
  { name: "Tuna (konzerva)", unit: "g", baseAmount: 100, kcal: 116, protein: 25.5, carbs: 0, fat: 1 },
  { name: "Zobene pahuljice", unit: "g", baseAmount: 50, kcal: 189, protein: 6.5, carbs: 32, fat: 3.5 },
  { name: "Govedina", unit: "g", baseAmount: 100, kcal: 250, protein: 26, carbs: 0, fat: 15 },
  { name: "Jabuka", unit: "kom", baseAmount: 1, kcal: 72, protein: 0.4, carbs: 19, fat: 0.2 },
  { name: "Svježi sir", unit: "g", baseAmount: 100, kcal: 98, protein: 11, carbs: 3.4, fat: 4.3 },
];

const WORKOUT_TYPES = ["Trčanje","Bicikl","Plivanje","Teretana","Yoga","Hodanje","HIIT","Rastezanje"];
const DIGEST_SYMPTOMS = ["Nadutost","Mučnina","Refluks","Bol","Žgaravica","Umor","Dijareja","Opstipacija"];
const MEALS = ["Doručak","Jutarnja užina","Ručak","Popodnevna užina","Večera","Kasna večera"];
const MEAL_ICONS = {"Doručak":"☀️","Jutarnja užina":"🍎","Ručak":"🍽️","Popodnevna užina":"☕","Večera":"🌙","Kasna večera":"⭐"};

function today() { return new Date().toISOString().slice(0,10); }
function formatDate(d) { return new Date(d+"T00:00:00").toLocaleDateString("hr-HR",{day:"numeric",month:"short"}); }
function scaleFood(food, amount) {
  const f = amount / food.baseAmount;
  return { kcal: food.kcal*f, protein: food.protein*f, carbs: food.carbs*f, fat: food.fat*f };
}

const S = {
  root: { fontFamily:"'DM Sans',sans-serif", fontWeight:400, minHeight:"100vh", background:"var(--color-background-tertiary)", color:"var(--color-text-primary)" },
  header: { padding:"28px 24px 0", marginBottom:4 },
  titleSerif: { fontFamily:"'DM Serif Display',serif", fontSize:30, fontWeight:400, letterSpacing:"-0.5px", lineHeight:1.1 },
  sub: { fontSize:13, color:"var(--color-text-secondary)", marginTop:4, fontWeight:300, letterSpacing:"0.5px" },
  tabBar: { display:"flex", padding:"20px 24px 0", borderBottom:"1px solid var(--color-border-tertiary)", overflowX:"auto", gap:0, scrollbarWidth:"none" },
  body: { padding:24, maxWidth:720, margin:"0 auto" },
  card: { background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:16, padding:20, marginBottom:16 },
  sectionTitle: { fontFamily:"'DM Serif Display',serif", fontSize:17, fontWeight:400, marginBottom:16 },
  metricRow: { display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" },
  metric: { flex:1, minWidth:80, background:"var(--color-background-secondary)", borderRadius:12, padding:"12px 14px" },
  metricLabel: { fontSize:11, color:"var(--color-text-secondary)", textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:4, fontWeight:500 },
  metricValue: { fontSize:22, fontWeight:300, lineHeight:1 },
  metricUnit: { fontSize:12, color:"var(--color-text-secondary)", marginLeft:2 },
  input: { width:"100%", padding:"9px 12px", border:"0.5px solid var(--color-border-secondary)", borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:14, background:"var(--color-background-secondary)", color:"var(--color-text-primary)", outline:"none", boxSizing:"border-box" },
  pillGroup: { display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 },
  divider: { height:1, background:"var(--color-border-tertiary)", margin:"14px 0" },
  removeBtn: { background:"none", border:"none", cursor:"pointer", color:"var(--color-text-tertiary)", fontSize:18, lineHeight:1, padding:"0 4px", fontFamily:"inherit" },
  rangeLabel: { display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--color-text-secondary)", marginBottom:6 },
  miniLabel: { fontSize:11, color:"var(--color-text-tertiary)", textTransform:"uppercase", letterSpacing:"0.5px", fontWeight:500, marginBottom:4, display:"block" },
};

function pill(active, color="green") {
  const cols = { green:{bg:"#e1f5ee",color:"#0f6e56",border:"#5dcaa5"}, blue:{bg:"#e6f1fb",color:"#185fa5",border:"#85b7eb"}, coral:{bg:"#faece7",color:"#993c1d",border:"#f0997b"}, amber:{bg:"#faeeda",color:"#854f0b",border:"#ef9f27"}, teal:{bg:"#e1f5ee",color:"#085041",border:"#1d9e75"} };
  const c = cols[color] || cols.green;
  return { padding:"5px 13px", borderRadius:99, fontSize:12.5, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:active?`1.5px solid ${c.border}`:"0.5px solid var(--color-border-tertiary)", background:active?c.bg:"var(--color-background-secondary)", color:active?c.color:"var(--color-text-secondary)", fontWeight:active?500:400, transition:"all 0.12s" };
}
function badge(color) {
  const cols = { coral:{bg:"#faece7",color:"#993c1d"}, blue:{bg:"#e6f1fb",color:"#185fa5"}, teal:{bg:"#e1f5ee",color:"#0f6e56"}, amber:{bg:"#faeeda",color:"#854f0b"}, green:{bg:"#eaf3de",color:"#3b6d11"}, gray:{bg:"var(--color-background-secondary)",color:"var(--color-text-secondary)"}, red:{bg:"#fcebeb",color:"#a32d2d"} };
  const c = cols[color] || cols.gray;
  return { display:"inline-flex", alignItems:"center", padding:"3px 8px", borderRadius:6, fontSize:11.5, fontWeight:500, background:c.bg, color:c.color };
}
function btnStyle(ghost=false) {
  return { padding:"9px 20px", borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:500, cursor:"pointer", border:ghost?"0.5px solid var(--color-border-tertiary)":"none", background:ghost?"transparent":"#0f6e56", color:ghost?"var(--color-text-secondary)":"#e1f5ee", transition:"all 0.12s" };
}

function useSupabaseData(userId) {
  const [data, setData] = useState({ nutrition:[], digestion:[], workouts:[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      const [n, d, w] = await Promise.all([
        sb.from("nutrition").select("*").eq("user_id", userId).order("created_at", {ascending:false}),
        sb.from("digestion").select("*").eq("user_id", userId).order("created_at", {ascending:false}),
        sb.from("workouts").select("*").eq("user_id", userId).order("created_at", {ascending:false}),
      ]);
      setData({ nutrition: n.data||[], digestion: d.data||[], workouts: w.data||[] });
      setLoading(false);
    })();
  }, [userId]);

  async function addNutrition(item) {
    const row = { user_id:userId, date:item.date, meal:item.meal, name:item.name, base_food:item.baseFood||item.name, quantity:item.quantity||null, unit:item.unit||null, kcal:item.kcal, protein:item.protein, carbs:item.carbs, fat:item.fat };
    const { data: d } = await sb.from("nutrition").insert(row).select().single();
    if (d) setData(prev => ({...prev, nutrition:[d, ...prev.nutrition]}));
  }
  async function removeNutrition(id) {
    await sb.from("nutrition").delete().eq("id", id);
    setData(prev => ({...prev, nutrition:prev.nutrition.filter(x=>x.id!==id)}));
  }
  async function addDigestion(item) {
    const row = { user_id:userId, date:item.date, time:item.time, stool:item.stool, symptoms:item.symptoms, pain:item.pain, bloating:item.bloating, energy:item.energy, water:item.water, notes:item.notes };
    const { data: d } = await sb.from("digestion").insert(row).select().single();
    if (d) setData(prev => ({...prev, digestion:[d, ...prev.digestion]}));
  }
  async function removeDigestion(id) {
    await sb.from("digestion").delete().eq("id", id);
    setData(prev => ({...prev, digestion:prev.digestion.filter(x=>x.id!==id)}));
  }
  async function addWorkout(item) {
    const row = { user_id:userId, date:item.date, type:item.type, duration:+item.duration||0, intensity:item.intensity, distance:item.distance||null, sets:item.sets||null, reps:item.reps||null, weight:item.weight||null, calories:item.calories||null, notes:item.notes||null };
    const { data: d } = await sb.from("workouts").insert(row).select().single();
    if (d) setData(prev => ({...prev, workouts:[d, ...prev.workouts]}));
  }
  async function removeWorkout(id) {
    await sb.from("workouts").delete().eq("id", id);
    setData(prev => ({...prev, workouts:prev.workouts.filter(x=>x.id!==id)}));
  }

  return { data, loading, addNutrition, removeNutrition, addDigestion, removeDigestion, addWorkout, removeWorkout };
}

function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function submit() {
    if (!email || !password) { setMsg({type:"error",text:"Upiši email i lozinku."}); return; }
    setLoading(true); setMsg(null);
    if (mode === "login") {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setMsg({type:"error",text:"Pogrešan email ili lozinka."});
    } else {
      const { error } = await sb.auth.signUp({ email, password });
      if (error) setMsg({type:"error",text:error.message});
      else setMsg({type:"success",text:"Provjeri email za potvrdu, zatim se prijavi!"});
    }
    setLoading(false);
  }

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--color-background-tertiary)",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{width:"100%",maxWidth:400,padding:24}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:36,fontWeight:400,lineHeight:1}}>Zdravlje<br/><em>Tracker</em></div>
          <div style={{fontSize:13,color:"var(--color-text-secondary)",marginTop:8,letterSpacing:"0.5px"}}>Prehrana · Probava · Treninzi</div>
        </div>
        <div style={S.card}>
          <div style={{display:"flex",marginBottom:20,background:"var(--color-background-secondary)",borderRadius:10,padding:3}}>
            {["login","register"].map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"8px",borderRadius:8,border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:13.5,fontWeight:500,cursor:"pointer",background:mode===m?"var(--color-background-primary)":"transparent",color:mode===m?"var(--color-text-primary)":"var(--color-text-secondary)",transition:"all 0.15s"}}>
                {m==="login"?"Prijava":"Registracija"}
              </button>
            ))}
          </div>
          <div style={{marginBottom:12}}>
            <span style={S.miniLabel}>Email</span>
            <input style={S.input} type="email" placeholder="tvoj@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
          <div style={{marginBottom:20}}>
            <span style={S.miniLabel}>Lozinka</span>
            <input style={S.input} type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
          {msg&&(
            <div style={{padding:"10px 12px",borderRadius:10,marginBottom:14,fontSize:13,...badge(msg.type==="error"?"red":"teal"),display:"block",width:"100%"}}>
              {msg.text}
            </div>
          )}
          <button style={{...btnStyle(),width:"100%",opacity:loading?0.7:1}} onClick={submit} disabled={loading}>
            {loading?"Učitavanje...":mode==="login"?"Prijavi se":"Registriraj se"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NutritionTab({ data, addNutrition, removeNutrition }) {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [meal, setMeal] = useState("Doručak");
  const [custom, setCustom] = useState({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:100,amount:100});
  const [showCustom, setShowCustom] = useState(false);
  const [saving, setSaving] = useState(false);
  const [goal, setGoal] = useState(()=>{ try{return+localStorage.getItem("kcal_goal")||2000;}catch{return 2000;} });

  const todayItems = data.nutrition.filter(n=>n.date===today());
  const totals = todayItems.reduce((a,n)=>({kcal:a.kcal+n.kcal,protein:a.protein+n.protein,carbs:a.carbs+n.carbs,fat:a.fat+n.fat}),{kcal:0,protein:0,carbs:0,fat:0});
  const filtered = search.length>1 ? FOOD_DB.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())) : [];
  const pct = Math.min(100,Math.round((totals.kcal/goal)*100));
  const pctColor = pct>=100?"#d85a30":pct>=80?"#ba7517":"#1d9e75";
  const scaledPrev = selectedFood ? scaleFood(selectedFood,quantity) : null;

  function selectFood(f){setSelectedFood(f);setQuantity(f.baseAmount);setSearch(f.name);}

  async function addSelected(){
    if(!selectedFood)return;
    setSaving(true);
    const s=scaleFood(selectedFood,quantity);
    await addNutrition({name:selectedFood.name,...s,meal,date:today(),baseFood:selectedFood.name,quantity,unit:selectedFood.unit});
    setSearch("");setSelectedFood(null);setQuantity(1);setSaving(false);
  }
  async function addCustomFood(){
    if(!custom.name||!custom.kcal)return;
    setSaving(true);
    const f=custom.amount/custom.baseAmount;
    await addNutrition({name:custom.name,kcal:+custom.kcal*f,protein:+custom.protein*f||0,carbs:+custom.carbs*f||0,fat:+custom.fat*f||0,meal,date:today(),quantity:custom.amount,unit:custom.unit});
    setCustom({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:100,amount:100});setShowCustom(false);setSaving(false);
  }

  return (
    <div>
      <div style={S.metricRow}>
        {[{l:"Kalorije",v:Math.round(totals.kcal),u:"kcal",c:"#993c1d"},{l:"Proteini",v:Math.round(totals.protein),u:"g",c:"#185fa5"},{l:"Ugljikohidrati",v:Math.round(totals.carbs),u:"g",c:"#854f0b"},{l:"Masti",v:Math.round(totals.fat),u:"g",c:"#3b6d11"}].map(m=>(
          <div key={m.l} style={S.metric}><div style={S.metricLabel}>{m.l}</div><div style={{...S.metricValue,color:m.c}}>{m.v}<span style={S.metricUnit}>{m.u}</span></div></div>
        ))}
      </div>
      <div style={{...S.card,padding:16,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:13,color:"var(--color-text-secondary)"}}>{Math.round(totals.kcal)} / {goal} kcal · {pct}%</span>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>Cilj:</span>
            <input type="number" value={goal} onChange={e=>{setGoal(+e.target.value);localStorage.setItem("kcal_goal",e.target.value);}} style={{width:70,padding:"3px 8px",fontSize:13,border:"0.5px solid var(--color-border-secondary)",borderRadius:7,background:"var(--color-background-secondary)",color:"var(--color-text-primary)",fontFamily:"'DM Sans',sans-serif",outline:"none"}} />
            <span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>kcal</span>
          </div>
        </div>
        <div style={{height:6,background:"var(--color-background-secondary)",borderRadius:99,overflow:"hidden",marginBottom:10}}>
          <div style={{height:"100%",width:`${pct}%`,background:pctColor,borderRadius:99,transition:"width 0.4s"}}/>
        </div>
        <div style={{display:"flex",gap:6}}>
          {[{l:"P",v:totals.protein,max:150,c:"#378add"},{l:"U",v:totals.carbs,max:250,c:"#ba7517"},{l:"M",v:totals.fat,max:80,c:"#639922"}].map(m=>(
            <div key={m.l} style={{flex:1}}>
              <div style={{fontSize:11,color:"var(--color-text-tertiary)",marginBottom:3}}>{m.l}</div>
              <div style={{height:4,background:"var(--color-background-secondary)",borderRadius:99}}>
                <div style={{height:"100%",width:`${Math.min(100,Math.round(m.v/m.max*100))}%`,background:m.c,borderRadius:99,transition:"width 0.4s"}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={S.card}>
        <div style={S.sectionTitle}>Dodaj obrok</div>
        <span style={S.miniLabel}>Obrok</span>
        <div style={S.pillGroup}>{MEALS.map(m=><button key={m} style={pill(meal===m,"green")} onClick={()=>setMeal(m)}>{MEAL_ICONS[m]} {m}</button>)}</div>
        <div style={S.divider}/>
        <input style={S.input} placeholder="Pretraži hranu u bazi..." value={search} onChange={e=>{setSearch(e.target.value);if(!e.target.value)setSelectedFood(null);}}/>
        {filtered.length>0&&!selectedFood&&(
          <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:10,overflow:"hidden",marginTop:6}}>
            {filtered.map(f=>(
              <div key={f.name} onClick={()=>selectFood(f)} style={{padding:"10px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",transition:"background 0.1s"}}
                onMouseEnter={e=>e.currentTarget.style.background="var(--color-background-secondary)"}
                onMouseLeave={e=>e.currentTarget.style.background="var(--color-background-primary)"}>
                <div><div style={{fontSize:14}}>{f.name}</div><div style={{fontSize:11,color:"var(--color-text-tertiary)"}}>per {f.baseAmount}{f.unit}</div></div>
                <div style={{display:"flex",gap:5}}><span style={badge("coral")}>{f.kcal} kcal</span><span style={badge("blue")}>{f.protein}g P</span></div>
              </div>
            ))}
          </div>
        )}
        {selectedFood&&(
          <div style={{marginTop:10,padding:"12px 14px",background:"#e1f5ee",borderRadius:10,display:"flex",flexWrap:"wrap",alignItems:"center",gap:8}}>
            <span style={{fontSize:13,color:"#0f6e56",fontWeight:500,flex:"1 1 100px"}}>{selectedFood.name}</span>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:12,color:"#0f6e56"}}>Količina:</span>
              <input type="number" value={quantity} onChange={e=>setQuantity(Math.max(0.1,+e.target.value))} min="0.1" step={selectedFood.unit==="g"||selectedFood.unit==="ml"?10:1}
                style={{width:72,padding:"6px 10px",border:"1px solid #5dcaa5",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontSize:14,background:"white",color:"#0f6e56",fontWeight:500,outline:"none",textAlign:"center"}}/>
              <span style={{fontSize:13,color:"#085041",fontWeight:500}}>{selectedFood.unit}</span>
            </div>
            {scaledPrev&&<span style={{fontSize:12,color:"#085041",fontWeight:500}}>{Math.round(scaledPrev.kcal)} kcal · {Math.round(scaledPrev.protein)}g P · {Math.round(scaledPrev.carbs)}g U · {Math.round(scaledPrev.fat)}g M</span>}
            <div style={{display:"flex",gap:6,marginLeft:"auto"}}>
              <button style={{...btnStyle(),opacity:saving?0.6:1}} onClick={addSelected} disabled={saving}>{saving?"...":"Dodaj"}</button>
              <button style={S.removeBtn} onClick={()=>{setSelectedFood(null);setSearch("");}}>×</button>
            </div>
          </div>
        )}
        <div style={{marginTop:10}}>
          <button style={{...pill(showCustom,"amber"),fontSize:12}} onClick={()=>setShowCustom(!showCustom)}>{showCustom?"▲ Sakrij":"＋ Ručni unos"}</button>
        </div>
        {showCustom&&(
          <div style={{marginTop:12,padding:14,background:"var(--color-background-secondary)",borderRadius:10}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
              <input style={{...S.input,flex:2,minWidth:120}} placeholder="Naziv hrane" value={custom.name} onChange={e=>setCustom({...custom,name:e.target.value})}/>
              <input style={{...S.input,flex:1,minWidth:70}} placeholder="Jed.(g/kom)" value={custom.unit} onChange={e=>setCustom({...custom,unit:e.target.value})}/>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
              {[["kcal na bazu","kcal"],["Baza (jed.)","baseAmount"],["Pojeo (jed.)","amount"],["Protein g","protein"],["Ugljik. g","carbs"],["Masti g","fat"]].map(([l,k])=>(
                <div key={k} style={{flex:1,minWidth:80}}><span style={S.miniLabel}>{l}</span><input type="number" style={S.input} value={custom[k]} onChange={e=>setCustom({...custom,[k]:e.target.value})}/></div>
              ))}
            </div>
            <button style={{...btnStyle(),width:"100%",opacity:saving?0.6:1}} onClick={addCustomFood} disabled={saving}>Spremi ručni unos</button>
          </div>
        )}
      </div>
      {MEALS.map(m=>{
        const items=todayItems.filter(n=>n.meal===m);
        if(!items.length)return null;
        const mkcal=Math.round(items.reduce((a,n)=>a+n.kcal,0));
        return(
          <div key={m} style={{marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"var(--color-background-secondary)",borderRadius:"10px 10px 0 0",fontSize:13,fontWeight:500,color:"var(--color-text-secondary)"}}>
              <span>{MEAL_ICONS[m]}</span><span style={{flex:1}}>{m}</span><span style={badge("gray")}>{mkcal} kcal</span>
            </div>
            <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderTop:"none",borderRadius:"0 0 10px 10px",padding:"0 14px"}}>
              {items.map(item=>(
                <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
                  <div>
                    <div style={{fontSize:14}}>{item.base_food||item.name}</div>
                    {item.quantity&&<div style={{fontSize:11,color:"var(--color-text-tertiary)"}}>{item.quantity} {item.unit}</div>}
                  </div>
                  <div style={{display:"flex",gap:5,alignItems:"center"}}>
                    <span style={badge("coral")}>{Math.round(item.kcal)} kcal</span>
                    <span style={badge("blue")}>{Math.round(item.protein)}g P</span>
                    <button style={S.removeBtn} onClick={()=>removeNutrition(item.id)}>×</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DigestionTab({ data, addDigestion, removeDigestion }) {
  const [form, setForm] = useState({date:today(),time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8});
  const [saving, setSaving] = useState(false);
  const stoolTypes=[{v:"1",d:"Tvrde grudice"},{v:"2",d:"Zbijena"},{v:"3",d:"Normalna"},{v:"4",d:"Mekana"},{v:"5",d:"Komadići"},{v:"6",d:"Kašasta"},{v:"7",d:"Tekuća"}];
  function toggleSym(s){setForm(f=>({...f,symptoms:f.symptoms.includes(s)?f.symptoms.filter(x=>x!==s):[...f.symptoms,s]}));}
  async function submit(){
    setSaving(true);
    await addDigestion(form);
    setForm({date:today(),time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8});
    setSaving(false);
  }
  const recent=data.digestion.slice(0,10);
  return(
    <div>
      <div style={S.card}>
        <div style={S.sectionTitle}>Novi unos</div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <div style={{flex:1}}><span style={S.miniLabel}>Datum</span><input type="date" style={S.input} value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
          <div style={{flex:1}}><span style={S.miniLabel}>Vrijeme</span><input type="time" style={S.input} value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
        </div>
        <span style={S.miniLabel}>Bristol skala</span>
        <div style={{...S.pillGroup,marginBottom:14}}>
          {stoolTypes.map(t=>(
            <button key={t.v} style={{...pill(form.stool===t.v,"teal"),textAlign:"center",minWidth:54}} onClick={()=>setForm({...form,stool:t.v})}>
              <div style={{fontWeight:600,fontSize:13}}>Tip {t.v}</div><div style={{fontSize:10}}>{t.d}</div>
            </button>
          ))}
        </div>
        <span style={S.miniLabel}>Simptomi</span>
        <div style={S.pillGroup}>{DIGEST_SYMPTOMS.map(s=><button key={s} style={pill(form.symptoms.includes(s),"coral")} onClick={()=>toggleSym(s)}>{s}</button>)}</div>
        {[{k:"pain",l:"Bol",max:10},{k:"bloating",l:"Nadutost",max:10},{k:"energy",l:"Energija",max:5},{k:"water",l:"Voda (čaše)",max:15}].map(({k,l,max})=>(
          <div key={k} style={{marginBottom:14}}>
            <div style={S.rangeLabel}><span>{l}</span><span style={{fontWeight:500,color:"var(--color-text-primary)"}}>{form[k]}/{max}</span></div>
            <input type="range" min={0} max={max} step={1} value={form[k]} onChange={e=>setForm({...form,[k]:+e.target.value})} style={{width:"100%",accentColor:"#1d9e75"}}/>
          </div>
        ))}
        <textarea style={{...S.input,resize:"vertical",minHeight:70,lineHeight:1.5,marginBottom:12}} placeholder="Bilješka..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2}/>
        <button style={{...btnStyle(),width:"100%",opacity:saving?0.6:1}} onClick={submit} disabled={saving}>{saving?"Spremanje...":"Spremi unos"}</button>
      </div>
      {recent.map(e=>(
        <div key={e.id} style={{...S.card,padding:"14px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div><span style={{fontSize:14,fontWeight:500}}>{formatDate(e.date)}</span><span style={{fontSize:12,color:"var(--color-text-tertiary)",marginLeft:8}}>{e.time}</span></div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={badge("teal")}>Tip {e.stool}</span><button style={S.removeBtn} onClick={()=>removeDigestion(e.id)}>×</button></div>
          </div>
          <div style={{display:"flex",gap:10,fontSize:12,color:"var(--color-text-secondary)",flexWrap:"wrap"}}>
            {e.pain>0&&<span>Bol {e.pain}/10</span>}{e.bloating>0&&<span>Nadutost {e.bloating}/10</span>}
            <span>Energija {e.energy}/5</span><span>💧 {e.water} čaša</span>
          </div>
          {e.symptoms&&e.symptoms.length>0&&<div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>{e.symptoms.map(s=><span key={s} style={badge("coral")}>{s}</span>)}</div>}
          {e.notes&&<div style={{marginTop:6,fontSize:13,color:"var(--color-text-secondary)",fontStyle:"italic"}}>{e.notes}</div>}
        </div>
      ))}
    </div>
  );
}

function WorkoutTab({ data, addWorkout, removeWorkout }) {
  const [form, setForm] = useState({date:today(),type:"Trčanje",duration:30,intensity:3,distance:"",sets:"",reps:"",weight:"",notes:"",calories:""});
  const [saving, setSaving] = useState(false);
  async function submit(){
    setSaving(true);
    await addWorkout(form);
    setForm({date:today(),type:"Trčanje",duration:30,intensity:3,distance:"",sets:"",reps:"",weight:"",notes:"",calories:""});
    setSaving(false);
  }
  const recent=data.workouts.slice(0,15);
  const iLabels=["","Lako","Umjereno","Srednje","Intenzivno","Max"];
  const iBadge=["","green","teal","blue","amber","coral"];
  const isCardio=["Trčanje","Bicikl","Plivanje","Hodanje","HIIT"].includes(form.type);
  const isStrength=form.type==="Teretana";
  const tw=(()=>{const m=new Date();m.setDate(m.getDate()-m.getDay()+1);const ms=m.toISOString().slice(0,10);const ws=data.workouts.filter(w=>w.date>=ms);return{days:ws.length,mins:ws.reduce((a,w)=>a+(+w.duration||0),0)};})();
  return(
    <div>
      <div style={S.metricRow}>
        <div style={S.metric}><div style={S.metricLabel}>Ovaj tjedan</div><div style={{...S.metricValue,color:"#185fa5"}}>{tw.days}<span style={S.metricUnit}>sesija</span></div></div>
        <div style={S.metric}><div style={S.metricLabel}>Tjedne minute</div><div style={{...S.metricValue,color:"#0f6e56"}}>{tw.mins}<span style={S.metricUnit}>min</span></div></div>
        <div style={S.metric}><div style={S.metricLabel}>Ukupno</div><div style={{...S.metricValue,color:"#854f0b"}}>{data.workouts.length}<span style={S.metricUnit}>treninga</span></div></div>
      </div>
      <div style={S.card}>
        <div style={S.sectionTitle}>Novi trening</div>
        <span style={S.miniLabel}>Aktivnost</span>
        <div style={S.pillGroup}>{WORKOUT_TYPES.map(t=><button key={t} style={pill(form.type===t,"blue")} onClick={()=>setForm({...form,type:t})}>{t}</button>)}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
          <div style={{flex:1,minWidth:100}}><span style={S.miniLabel}>Datum</span><input type="date" style={S.input} value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
          <div style={{flex:1,minWidth:100}}><span style={S.miniLabel}>Trajanje (min)</span><input type="number" style={S.input} value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})}/></div>
          {isCardio&&<div style={{flex:1,minWidth:100}}><span style={S.miniLabel}>Distanca (km)</span><input type="number" style={S.input} value={form.distance} onChange={e=>setForm({...form,distance:e.target.value})}/></div>}
          {isStrength&&<>
            <div style={{flex:1,minWidth:70}}><span style={S.miniLabel}>Serija</span><input type="number" style={S.input} value={form.sets} onChange={e=>setForm({...form,sets:e.target.value})}/></div>
            <div style={{flex:1,minWidth:70}}><span style={S.miniLabel}>Ponav.</span><input type="number" style={S.input} value={form.reps} onChange={e=>setForm({...form,reps:e.target.value})}/></div>
            <div style={{flex:1,minWidth:70}}><span style={S.miniLabel}>Kg</span><input type="number" style={S.input} value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})}/></div>
          </>}
          <div style={{flex:1,minWidth:100}}><span style={S.miniLabel}>Kalorije (ist.)</span><input type="number" style={S.input} value={form.calories} onChange={e=>setForm({...form,calories:e.target.value})}/></div>
        </div>
        <div style={{marginBottom:14}}>
          <div style={S.rangeLabel}><span>Intenzitet</span><span style={{fontWeight:500,color:"var(--color-text-primary)"}}>{iLabels[form.intensity]}</span></div>
          <input type="range" min={1} max={5} step={1} value={form.intensity} onChange={e=>setForm({...form,intensity:+e.target.value})} style={{width:"100%",accentColor:"#185fa5"}}/>
        </div>
        <textarea style={{...S.input,resize:"vertical",minHeight:70,lineHeight:1.5,marginBottom:12}} placeholder="Bilješka o treningu..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2}/>
        <button style={{...btnStyle(),width:"100%",opacity:saving?0.6:1}} onClick={submit} disabled={saving}>{saving?"Spremanje...":"Spremi trening"}</button>
      </div>
      {recent.map(w=>(
        <div key={w.id} style={{...S.card,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontSize:15,fontWeight:500}}>{w.type}</span>
              <span style={badge(iBadge[w.intensity])}>{iLabels[w.intensity]}</span>
            </div>
            <div style={{fontSize:12,color:"var(--color-text-secondary)"}}>
              {formatDate(w.date)} · {w.duration} min{w.distance?` · ${w.distance} km`:""}{w.sets?` · ${w.sets}×${w.reps} × ${w.weight}kg`:""}{w.calories?` · ${w.calories} kcal`:""}
            </div>
            {w.notes&&<div style={{fontSize:12,color:"var(--color-text-tertiary)",marginTop:3,fontStyle:"italic"}}>{w.notes}</div>}
          </div>
          <button style={S.removeBtn} onClick={()=>removeWorkout(w.id)}>×</button>
        </div>
      ))}
    </div>
  );
}

function StatsTab({ data }) {
  const [period, setPeriod] = useState(7);
  const { Chart } = window;
  const days=Array.from({length:period},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(period-1-i));return d.toISOString().slice(0,10);});
  const labels=days.map(d=>formatDate(d));
  const byDay=days.map(d=>{
    const n=data.nutrition.filter(x=>x.date===d);
    const ws=data.workouts.filter(x=>x.date===d);
    const dg=data.digestion.filter(x=>x.date===d);
    return{kcal:Math.round(n.reduce((a,x)=>a+x.kcal,0)),protein:Math.round(n.reduce((a,x)=>a+x.protein,0)),carbs:Math.round(n.reduce((a,x)=>a+x.carbs,0)),fat:Math.round(n.reduce((a,x)=>a+x.fat,0)),mins:ws.reduce((a,x)=>a+(+x.duration||0),0),pain:dg.length?+(dg.reduce((a,x)=>a+x.pain,0)/dg.length).toFixed(1):null,energy:dg.length?+(dg.reduce((a,x)=>a+x.energy,0)/dg.length).toFixed(1):null};
  });
  useEffect(()=>{
    const charts=[];
    const cfg=(id,type,datasets,extra={})=>{
      const canvas=document.getElementById(id);
      if(!canvas)return;
      const c=new Chart(canvas,{type,data:{labels,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:"rgba(0,0,0,0.04)"},ticks:{font:{size:11}}},x:{grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11}}}},...extra}});
      charts.push(c);
    };
    cfg("c1","bar",[{data:byDay.map(d=>d.kcal),backgroundColor:"#f0997b",borderRadius:5,borderSkipped:false}]);
    cfg("c2","bar",[{label:"P",data:byDay.map(d=>d.protein),backgroundColor:"#85b7eb",borderRadius:3,stack:"m"},{label:"U",data:byDay.map(d=>d.carbs),backgroundColor:"#ef9f27",borderRadius:3,stack:"m"},{label:"M",data:byDay.map(d=>d.fat),backgroundColor:"#97c459",borderRadius:3,stack:"m"}],{scales:{x:{stacked:true,grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11}}},y:{stacked:true,beginAtZero:true,grid:{color:"rgba(0,0,0,0.04)"}}}});
    cfg("c3","bar",[{data:byDay.map(d=>d.mins),backgroundColor:"#378add",borderRadius:5,borderSkipped:false}]);
    cfg("c4","line",[{label:"Bol",data:byDay.map(d=>d.pain),borderColor:"#d85a30",backgroundColor:"transparent",tension:0.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#d85a30"},{label:"Energija",data:byDay.map(d=>d.energy),borderColor:"#1d9e75",backgroundColor:"transparent",tension:0.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#1d9e75"}]);
    return()=>charts.forEach(c=>c.destroy());
  },[period,data]);
  const avgKcal=Math.round(byDay.reduce((a,d)=>a+d.kcal,0)/period);
  const totalMins=byDay.reduce((a,d)=>a+d.mins,0);
  const wDays=byDay.filter(d=>d.mins>0).length;
  return(
    <div>
      <div style={{display:"flex",gap:6,marginBottom:18}}>
        {[7,14,30].map(p=><button key={p} style={pill(period===p,"green")} onClick={()=>setPeriod(p)}>Zadnjih {p} dana</button>)}
      </div>
      <div style={S.metricRow}>
        <div style={S.metric}><div style={S.metricLabel}>Prosj. kcal</div><div style={{...S.metricValue,color:"#993c1d"}}>{avgKcal}<span style={S.metricUnit}>/dan</span></div></div>
        <div style={S.metric}><div style={S.metricLabel}>Treninzi</div><div style={{...S.metricValue,color:"#185fa5"}}>{wDays}<span style={S.metricUnit}>dana</span></div></div>
        <div style={S.metric}><div style={S.metricLabel}>Aktivno</div><div style={{...S.metricValue,color:"#0f6e56"}}>{totalMins}<span style={S.metricUnit}>min</span></div></div>
      </div>
      {[{id:"c1",title:"Kalorije po danu",legend:[{c:"#f0997b",l:"Kalorije"}]},{id:"c2",title:"Makronutrijenti",legend:[{c:"#85b7eb",l:"Proteini"},{c:"#ef9f27",l:"Ugljikohidrati"},{c:"#97c459",l:"Masti"}]},{id:"c3",title:"Trajanje treninga (min)",legend:[{c:"#378add",l:"Minute"}]},{id:"c4",title:"Probava — bol i energija",legend:[{c:"#d85a30",l:"Bol"},{c:"#1d9e75",l:"Energija"}]}].map(({id,title,legend})=>(
        <div key={id} style={{...S.card,marginBottom:16}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,fontWeight:400,marginBottom:10}}>{title}</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
            {legend.map(l=><div key={l.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"var(--color-text-secondary)"}}><div style={{width:10,height:10,borderRadius:2,background:l.c}}/>{l.l}</div>)}
          </div>
          <div style={{position:"relative",height:190}}><canvas id={id}></canvas></div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [tab, setTab] = useState("nutrition");
  const { data, loading, addNutrition, removeNutrition, addDigestion, removeDigestion, addWorkout, removeWorkout } = useSupabaseData(session?.user?.id);

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setAuthLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,session)=>{setSession(session);setAuthLoading(false);});
    return()=>subscription.unsubscribe();
  },[]);

  const tabs=[{id:"nutrition",l:"Prehrana"},{id:"digestion",l:"Probava"},{id:"workout",l:"Treninzi"},{id:"stats",l:"Statistike"}];

  if(authLoading)return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",color:"var(--color-text-secondary)"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,marginBottom:8}}>Zdravlje Tracker</div>
        <div style={{fontSize:13}}>Učitavanje...</div>
      </div>
    </div>
  );

  if(!session)return <AuthScreen/>;

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input,textarea,button,select{font-family:'DM Sans',sans-serif;}
        input[type="date"],input[type="time"]{color-scheme:light dark;}
      `}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
      <div style={S.root}>
        <div style={S.header}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={S.titleSerif}>Zdravlje<br/><em>Tracker</em></div>
              <div style={S.sub}>Prehrana · Probava · Treninzi</div>
            </div>
            <div style={{textAlign:"right",paddingTop:4}}>
              <div style={{fontSize:11,color:"var(--color-text-tertiary)",marginBottom:4}}>{session.user.email}</div>
              <button onClick={()=>sb.auth.signOut()} style={{...pill(false),fontSize:11,padding:"3px 10px"}}>Odjava</button>
            </div>
          </div>
        </div>
        <div style={S.tabBar}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"10px 18px",background:"none",border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:13.5,cursor:"pointer",color:tab===t.id?"var(--color-text-primary)":"var(--color-text-tertiary)",borderBottom:tab===t.id?"2px solid #1d9e75":"2px solid transparent",marginBottom:-1,fontWeight:tab===t.id?500:400,whiteSpace:"nowrap",transition:"color 0.15s"}}>
              {t.l}
            </button>
          ))}
        </div>
        <div style={S.body}>
          {loading?(
            <div style={{textAlign:"center",padding:"40px 0",color:"var(--color-text-secondary)",fontSize:14}}>Učitavanje podataka...</div>
          ):(
            <>
              {tab==="nutrition"&&<NutritionTab data={data} addNutrition={addNutrition} removeNutrition={removeNutrition}/>}
              {tab==="digestion"&&<DigestionTab data={data} addDigestion={addDigestion} removeDigestion={removeDigestion}/>}
              {tab==="workout"&&<WorkoutTab data={data} addWorkout={addWorkout} removeWorkout={removeWorkout}/>}
              {tab==="stats"&&<StatsTab data={data}/>}
            </>
          )}
        </div>
      </div>
    </>
  );
}