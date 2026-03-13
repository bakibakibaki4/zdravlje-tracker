import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://obacbdvknksuzjaqmxrh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYWNiZHZrbmtzdXpqYXFteHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzODMwMjYsImV4cCI6MjA4ODk1OTAyNn0.CwHBqH0uWIo4yQjW1APMEqepQ5cqIEiIev0DAKZbxH4"
);

const BUILTIN_FOODS = [
  {name:"Piletina (prsa)",unit:"g",baseAmount:100,kcal:165,protein:31,carbs:0,fat:3.6},
  {name:"Piletina (but)",unit:"g",baseAmount:100,kcal:209,protein:26,carbs:0,fat:11},
  {name:"Riža bijela",unit:"g",baseAmount:100,kcal:130,protein:2.7,carbs:28,fat:0.3},
  {name:"Riža smeđa",unit:"g",baseAmount:100,kcal:112,protein:2.6,carbs:23,fat:0.9},
  {name:"Jaje",unit:"kom",baseAmount:1,kcal:78,protein:6,carbs:0.6,fat:5},
  {name:"Bjelanjak",unit:"kom",baseAmount:1,kcal:17,protein:3.6,carbs:0.2,fat:0.1},
  {name:"Banana",unit:"kom",baseAmount:1,kcal:89,protein:1.1,carbs:23,fat:0.3},
  {name:"Jabuka",unit:"kom",baseAmount:1,kcal:72,protein:0.4,carbs:19,fat:0.2},
  {name:"Naranča",unit:"kom",baseAmount:1,kcal:62,protein:1.2,carbs:15,fat:0.2},
  {name:"Jagode",unit:"g",baseAmount:100,kcal:32,protein:0.7,carbs:7.7,fat:0.3},
  {name:"Borovnice",unit:"g",baseAmount:100,kcal:57,protein:0.7,carbs:14,fat:0.3},
  {name:"Avokado",unit:"kom",baseAmount:1,kcal:234,protein:2.9,carbs:12,fat:21},
  {name:"Jogurt (grčki)",unit:"g",baseAmount:150,kcal:132,protein:12,carbs:5,fat:7},
  {name:"Jogurt (obični)",unit:"g",baseAmount:150,kcal:90,protein:6,carbs:11,fat:2},
  {name:"Mlijeko (3.2%)",unit:"ml",baseAmount:200,kcal:122,protein:6.4,carbs:9.6,fat:4.8},
  {name:"Svježi sir",unit:"g",baseAmount:100,kcal:98,protein:11,carbs:3.4,fat:4.3},
  {name:"Feta sir",unit:"g",baseAmount:30,kcal:75,protein:4,carbs:1.2,fat:6},
  {name:"Skuta",unit:"g",baseAmount:100,kcal:103,protein:11,carbs:4,fat:4.5},
  {name:"Kruh bijeli",unit:"kriška",baseAmount:1,kcal:80,protein:3,carbs:15,fat:1},
  {name:"Kruh integralni",unit:"kriška",baseAmount:1,kcal:69,protein:3.6,carbs:12,fat:1.1},
  {name:"Zobene pahuljice",unit:"g",baseAmount:50,kcal:189,protein:6.5,carbs:32,fat:3.5},
  {name:"Granola",unit:"g",baseAmount:50,kcal:224,protein:5,carbs:32,fat:9},
  {name:"Tjestenina (suha)",unit:"g",baseAmount:80,kcal:282,protein:10,carbs:57,fat:1.4},
  {name:"Losos",unit:"g",baseAmount:100,kcal:208,protein:20,carbs:0,fat:13},
  {name:"Tuna (konzerva)",unit:"g",baseAmount:100,kcal:116,protein:25.5,carbs:0,fat:1},
  {name:"Skuša",unit:"g",baseAmount:100,kcal:205,protein:19,carbs:0,fat:14},
  {name:"Govedina",unit:"g",baseAmount:100,kcal:250,protein:26,carbs:0,fat:15},
  {name:"Svinjetina (but)",unit:"g",baseAmount:100,kcal:242,protein:27,carbs:0,fat:14},
  {name:"Puretina (prsa)",unit:"g",baseAmount:100,kcal:135,protein:30,carbs:0,fat:1},
  {name:"Brokula",unit:"g",baseAmount:100,kcal:34,protein:2.8,carbs:7,fat:0.4},
  {name:"Špinat",unit:"g",baseAmount:100,kcal:23,protein:2.9,carbs:3.6,fat:0.4},
  {name:"Rajčica",unit:"kom",baseAmount:1,kcal:22,protein:1.1,carbs:4.8,fat:0.2},
  {name:"Krastavac",unit:"kom",baseAmount:1,kcal:16,protein:0.7,carbs:3.6,fat:0.1},
  {name:"Paprika",unit:"kom",baseAmount:1,kcal:31,protein:1,carbs:7,fat:0.3},
  {name:"Krumpir (kuhani)",unit:"g",baseAmount:100,kcal:87,protein:1.9,carbs:20,fat:0.1},
  {name:"Batat",unit:"g",baseAmount:100,kcal:86,protein:1.6,carbs:20,fat:0.1},
  {name:"Leća",unit:"g",baseAmount:100,kcal:116,protein:9,carbs:20,fat:0.4},
  {name:"Slanutak",unit:"g",baseAmount:100,kcal:164,protein:8.9,carbs:27,fat:2.6},
  {name:"Bademi",unit:"g",baseAmount:30,kcal:174,protein:6.3,carbs:6,fat:15},
  {name:"Orasi",unit:"g",baseAmount:30,kcal:196,protein:4.6,carbs:4.1,fat:19.6},
  {name:"Kikiriki maslac",unit:"g",baseAmount:30,kcal:188,protein:8,carbs:6,fat:16},
  {name:"Maslinovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Maslac",unit:"g",baseAmount:10,kcal:72,protein:0.1,carbs:0,fat:8},
  {name:"Med",unit:"g",baseAmount:20,kcal:61,protein:0.1,carbs:16.5,fat:0},
  {name:"Proteinski prah (whey)",unit:"g",baseAmount:30,kcal:120,protein:24,carbs:3,fat:1.5},
  {name:"Kava (espresso)",unit:"kom",baseAmount:1,kcal:2,protein:0.1,carbs:0,fat:0},
  {name:"Sok od naranče",unit:"ml",baseAmount:200,kcal:94,protein:1.4,carbs:21,fat:0.4},
];

const DIGEST_SYMPTOMS = ["Nadutost","Mučnina","Refluks","Bol u trbuhu","Žgaravica","Umor","Dijareja","Opstipacija","Grčevi","Vjetrovi"];
const MEALS = ["Doručak","Jutarnja užina","Ručak","Popodnevna užina","Večera","Kasna večera"];
const MEAL_ICONS = {"Doručak":"☀️","Jutarnja užina":"🍎","Ručak":"🍽️","Popodnevna užina":"☕","Večera":"🌙","Kasna večera":"⭐"};
const HR_DAYS = ["Po","Ut","Sr","Če","Pe","Su","Ne"];
const HR_MONTHS = ["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];

function toDS(d){return d.toISOString().slice(0,10);}
function today(){return toDS(new Date());}
function fmtShort(d){return new Date(d+"T00:00:00").toLocaleDateString("hr-HR",{day:"numeric",month:"short"});}
function fmtLong(d){return new Date(d+"T00:00:00").toLocaleDateString("hr-HR",{weekday:"long",day:"numeric",month:"long"});}
function scaleFood(f,amt){const r=amt/(f.baseAmount||f.base_amount||1);return{kcal:f.kcal*r,protein:f.protein*r,carbs:f.carbs*r,fat:f.fat*r};}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{-webkit-text-size-adjust:100%;}
body{background:#f5f3ef;overscroll-behavior:none;}
input,textarea,button,select{font-family:'DM Sans',sans-serif;-webkit-appearance:none;appearance:none;}
input[type="date"],input[type="time"]{color-scheme:light dark;}
input[type="number"]{-moz-appearance:textfield;}
input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{-webkit-appearance:none;}

/* layout */
.zt{font-family:'DM Sans',sans-serif;min-height:100dvh;background:#f5f3ef;color:#1a1a18;max-width:600px;margin:0 auto;}
.zt-hdr{background:#1a1a18;padding:env(safe-area-inset-top,0) 0 0;position:sticky;top:0;z-index:50;}
.zt-hdr-in{padding:16px 18px 0;display:flex;justify-content:space-between;align-items:center;}
.zt-logo{font-family:'Fraunces',serif;font-size:24px;font-weight:300;color:#f5f3ef;letter-spacing:-0.8px;line-height:1;}
.zt-logo em{color:#9fe1cb;font-style:italic;}
.zt-tabbar{display:flex;overflow-x:auto;scrollbar-width:none;border-top:1px solid #2a2a28;-webkit-overflow-scrolling:touch;}
.zt-tabbar::-webkit-scrollbar{display:none;}
.zt-tab{flex:1;min-width:fit-content;padding:12px 16px;background:none;border:none;font-size:13px;font-weight:400;cursor:pointer;color:#555;border-bottom:2px solid transparent;white-space:nowrap;transition:color .15s,border-color .15s;-webkit-tap-highlight-color:transparent;}
.zt-tab.on{color:#f5f3ef;border-bottom-color:#1d9e75;font-weight:500;}
.zt-body{padding:16px 14px 100px;}

/* cards */
.card{background:#fff;border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 2px 8px rgba(0,0,0,.04);}
.card-sm{background:#fff;border-radius:12px;padding:14px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.05);}

/* typography */
.ttl{font-family:'Fraunces',serif;font-size:18px;font-weight:300;color:#1a1a18;margin-bottom:14px;letter-spacing:-.3px;}
.lbl{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.8px;color:#888;margin-bottom:5px;display:block;}

/* metrics */
.mrow{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;}
.mrow-2{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px;}
.met{background:#f5f3ef;border-radius:12px;padding:11px 12px;}
.met-l{font-size:9.5px;font-weight:500;text-transform:uppercase;letter-spacing:.6px;color:#888;margin-bottom:3px;}
.met-v{font-size:20px;font-weight:300;font-family:'Fraunces',serif;line-height:1;color:#1a1a18;}
.met-u{font-size:10px;font-family:'DM Sans',sans-serif;color:#bbb;margin-left:1px;}

/* progress */
.prog{height:5px;background:#f0ede8;border-radius:99px;overflow:hidden;}
.prog-f{height:100%;border-radius:99px;transition:width .4s ease;}

/* pills */
.pills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.pill{padding:7px 13px;border-radius:99px;font-size:13px;cursor:pointer;border:1px solid #e8e5df;background:#f5f3ef;color:#666;font-weight:400;transition:all .12s;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
.pill.g{background:#e1f5ee;color:#0f6e56;border-color:#9fe1cb;font-weight:500;}
.pill.b{background:#e6f1fb;color:#185fa5;border-color:#b5d4f4;font-weight:500;}
.pill.c{background:#faece7;color:#993c1d;border-color:#f5c4b3;font-weight:500;}
.pill.a{background:#faeeda;color:#854f0b;border-color:#fac775;font-weight:500;}
.pill.t{background:#e1f5ee;color:#085041;border-color:#1d9e75;font-weight:500;}
.pill.dk{background:#2a2a28;color:#e0e0de;border-color:#3a3a38;font-weight:500;}
.pill.red{background:#fff0f0;color:#a32d2d;border-color:#f5b8b8;font-weight:500;}

/* badges */
.bx{display:inline-flex;align-items:center;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:500;}
.bc{background:#faece7;color:#993c1d;}
.bb{background:#e6f1fb;color:#185fa5;}
.bg{background:#e1f5ee;color:#0f6e56;}
.bt{background:#e1f5ee;color:#085041;}
.ba{background:#faeeda;color:#854f0b;}
.bz{background:#f5f3ef;color:#666;}
.bdk{background:#2a2a28;color:#ccc;}
.bred{background:#fff0f0;color:#a32d2d;}

/* inputs */
.inp{width:100%;padding:11px 14px;border:1.5px solid #e8e5df;border-radius:11px;font-size:16px;background:#fafaf8;color:#1a1a18;outline:none;transition:border-color .15s;-webkit-appearance:none;}
.inp:focus{border-color:#1d9e75;background:#fff;}
textarea.inp{resize:none;line-height:1.5;font-size:15px;}

/* buttons */
.btn{padding:13px 20px;border-radius:12px;font-size:14px;font-weight:500;cursor:pointer;border:none;background:#1a1a18;color:#f5f3ef;width:100%;transition:all .12s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.btn:active{transform:scale(.98);opacity:.9;}
.btn-g{background:#0f6e56;color:#e1f5ee;}
.btn-ghost{background:transparent;color:#666;border:1.5px solid #e8e5df;}
.rm{background:none;border:none;cursor:pointer;color:#ccc;font-size:20px;padding:4px 6px;line-height:1;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
.rm:active{color:#d85a30;}

/* divider */
.div{height:1px;background:#f0ede8;margin:12px 0;}

/* food suggestions */
.sugg{border:1.5px solid #e8e5df;border-radius:12px;overflow:hidden;margin-top:6px;}
.sugg-row{padding:12px 14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f5f3ef;background:#fff;-webkit-tap-highlight-color:transparent;}
.sugg-row:last-child{border-bottom:none;}
.sugg-row:active{background:#f5f3ef;}
.sugg-row.mine{background:#fffdf5;}

/* qty row */
.qty-row{margin-top:10px;padding:14px;background:#e1f5ee;border-radius:12px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;animation:si .2s ease;}
@keyframes si{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.qty-inp{width:80px;padding:9px 10px;border:2px solid #1d9e75;border-radius:10px;font-size:16px;background:#fff;color:#0f6e56;font-weight:500;outline:none;text-align:center;-webkit-appearance:none;}

/* meal sections */
.meal-hd{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f5f3ef;border-radius:12px 12px 0 0;font-size:13px;font-weight:500;color:#555;}
.meal-bd{background:#fff;border:1px solid #f0ede8;border-top:none;border-radius:0 0 12px 12px;padding:0 14px;margin-bottom:8px;}
.frow{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f8f6f2;}
.frow:last-child{border-bottom:none;}

/* range */
.rrow{margin-bottom:16px;}
.rlbl{display:flex;justify-content:space-between;font-size:14px;color:#666;margin-bottom:8px;}
input[type=range]{width:100%;height:28px;accent-color:#1d9e75;}

/* calendar */
.cal-wrap{position:relative;margin-bottom:14px;}
.cal-trigger{display:flex;align-items:center;gap:10px;padding:12px 16px;background:#1a1a18;border-radius:13px;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;}
.cal-date-txt{font-family:'Fraunces',serif;font-size:16px;font-weight:300;color:#f5f3ef;flex:1;}
.cal-sub{font-size:10px;color:#666;text-transform:uppercase;letter-spacing:.7px;}
.cal-popup{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.18);z-index:100;overflow:hidden;animation:si .18s ease;}
.cal-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#1a1a18;}
.cal-month{font-family:'Fraunces',serif;font-size:15px;font-weight:300;color:#f5f3ef;}
.cal-nav{background:none;border:none;cursor:pointer;color:#9fe1cb;font-size:18px;padding:6px 12px;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.cal-grid{padding:8px 10px 12px;}
.cal-dh{text-align:center;font-size:10.5px;font-weight:500;color:#bbb;padding:5px 0;text-transform:uppercase;letter-spacing:.4px;}
.cal-days{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
.cal-day{text-align:center;padding:9px 2px;border-radius:9px;font-size:14px;cursor:pointer;color:#1a1a18;background:none;border:none;font-family:'DM Sans',sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:transparent;position:relative;}
.cal-day:active{background:#f5f3ef;}
.cal-day.other{color:#ddd;}
.cal-day.istoday{font-weight:600;color:#0f6e56;}
.cal-day.sel{background:#1a1a18!important;color:#f5f3ef!important;font-weight:500;}
.cal-day.dot::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:#1d9e75;}
.cal-day.sel.dot::after{background:#9fe1cb;}
.cal-today-btn{display:block;width:calc(100% - 20px);margin:0 10px 10px;padding:10px;background:#f5f3ef;border:none;border-radius:10px;font-size:14px;color:#1a1a18;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;touch-action:manipulation;}
.cal-days-hdr{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:2px;}

/* digest history */
.dh-day{background:#fff;border-radius:13px;margin-bottom:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.dh-hdr{display:flex;align-items:center;justify-content:space-between;padding:13px 14px;cursor:pointer;-webkit-tap-highlight-color:transparent;}
.dh-hdr:active{background:#fafaf8;}
.dh-body{padding:0 14px 12px;}

/* week bars */
.wrow{display:flex;align-items:center;padding:9px 0;border-bottom:1px solid #f5f3ef;gap:8px;}
.wrow:last-child{border-bottom:none;}
.wbar-w{flex:1;height:6px;background:#f0ede8;border-radius:99px;overflow:hidden;}
.wbar{height:100%;border-radius:99px;transition:width .4s;}

/* weight chart wrapper */
.wchart{position:relative;height:200px;margin-top:8px;}

/* auth */
.auth{min-height:100dvh;display:flex;align-items:center;justify-content:center;background:#1a1a18;padding:24px;}
.auth-box{width:100%;max-width:380px;}
.auth-logo{text-align:center;margin-bottom:32px;}
.auth-logo h1{font-family:'Fraunces',serif;font-size:38px;font-weight:300;color:#f5f3ef;letter-spacing:-1.2px;line-height:1;}
.auth-logo h1 em{color:#9fe1cb;font-style:italic;}
.auth-logo p{font-size:11px;color:#555;margin-top:7px;letter-spacing:1.4px;text-transform:uppercase;}
.auth-card{background:#242422;border-radius:20px;padding:24px;border:1px solid #2e2e2c;}
.tab-sw{display:flex;background:#1a1a18;border-radius:11px;padding:3px;margin-bottom:20px;}
.tab-sw-b{flex:1;padding:10px;border-radius:9px;border:none;font-size:14px;font-weight:500;cursor:pointer;background:transparent;color:#666;touch-action:manipulation;}
.tab-sw-b.on{background:#2e2e2c;color:#f5f3ef;}
.auth-inp{width:100%;padding:13px 14px;border:1.5px solid #2e2e2c;border-radius:11px;font-size:16px;background:#1a1a18;color:#f5f3ef;outline:none;margin-bottom:12px;}
.auth-inp:focus{border-color:#1d9e75;}
.auth-inp::placeholder{color:#444;}
.auth-lbl{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.8px;color:#555;margin-bottom:5px;display:block;}
.auth-btn{width:100%;padding:14px;border-radius:12px;border:none;font-size:15px;font-weight:500;cursor:pointer;background:#0f6e56;color:#e1f5ee;margin-top:8px;touch-action:manipulation;}
.msg-e{padding:11px 14px;border-radius:10px;font-size:13px;background:#3a1a1a;color:#f5c4b3;margin-bottom:12px;}
.msg-ok{padding:11px 14px;border-radius:10px;font-size:13px;background:#0d2e25;color:#9fe1cb;margin-bottom:12px;}
.zt-load{min-height:100dvh;display:flex;align-items:center;justify-content:center;background:#1a1a18;}
.zt-load-in{font-family:'Fraunces',serif;font-size:20px;font-weight:300;color:#f5f3ef;text-align:center;}

/* no-stool big button */
.nostool-btn{width:100%;padding:14px;border-radius:12px;border:2px dashed #e8e5df;background:#fafaf8;color:#888;font-size:14px;font-weight:500;cursor:pointer;transition:all .15s;touch-action:manipulation;text-align:center;}
.nostool-btn.active{border-color:#d85a30;background:#faece7;color:#993c1d;border-style:solid;}
`;

// ─── Calendar ────────────────────────────────────────────────────────────────
function Cal({val, onChange, dots=[]}) {
  const [open,setOpen]=useState(false);
  const [view,setView]=useState(()=>{const d=new Date(val+"T00:00:00");return{y:d.getFullYear(),m:d.getMonth()};});
  const todayS=today(); const dotSet=new Set(dots);
  const dim=(y,m)=>new Date(y,m+1,0).getDate();
  const fdow=(y,m)=>{let d=new Date(y,m,1).getDay();return d===0?6:d-1;};
  const prev=()=>setView(v=>v.m===0?{y:v.y-1,m:11}:{y:v.y,m:v.m-1});
  const next=()=>setView(v=>v.m===11?{y:v.y+1,m:0}:{y:v.y,m:v.m+1});
  const days=[];
  const first=fdow(view.y,view.m); const total=dim(view.y,view.m);
  const prevT=dim(view.y,view.m===0?11:view.m-1);
  for(let i=first-1;i>=0;i--)days.push({d:prevT-i,cur:false});
  for(let i=1;i<=total;i++)days.push({d:i,cur:true});
  while(days.length%7!==0)days.push({d:days.length-total-first+1,cur:false});
  const isToday=val===todayS;
  return(
    <div className="cal-wrap">
      <div className="cal-trigger" onClick={()=>setOpen(!open)}>
        <div style={{flex:1}}>
          <div className="cal-date-txt">{isToday?"Danas":fmtLong(val)}</div>
          <div className="cal-sub">{isToday?fmtLong(val):"Klikni za promjenu"}</div>
        </div>
        <span style={{color:"#9fe1cb",fontSize:13}}>{open?"▲":"▼"}</span>
      </div>
      {open&&(
        <div className="cal-popup">
          <div className="cal-hdr">
            <button className="cal-nav" onClick={prev}>‹</button>
            <span className="cal-month">{HR_MONTHS[view.m]} {view.y}</span>
            <button className="cal-nav" onClick={next}>›</button>
          </div>
          <div className="cal-grid">
            <div className="cal-days-hdr">{HR_DAYS.map(d=><div key={d} className="cal-dh">{d}</div>)}</div>
            <div className="cal-days">
              {days.map((d,i)=>{
                if(!d.cur)return<div key={i} className="cal-day other">{d.d}</div>;
                const ds=`${view.y}-${String(view.m+1).padStart(2,"0")}-${String(d.d).padStart(2,"0")}`;
                const cls=["cal-day",ds===todayS?"istoday":"",ds===val?"sel":"",dotSet.has(ds)?"dot":""].filter(Boolean).join(" ");
                return<button key={i} className={cls} onClick={()=>{onChange(ds);setOpen(false);}}>{d.d}</button>;
              })}
            </div>
          </div>
          {val!==todayS&&<button className="cal-today-btn" onClick={()=>{onChange(todayS);setOpen(false);}}>→ Idi na danas</button>}
        </div>
      )}
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function AuthScreen() {
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState(null);
  async function submit(){
    if(!email||!pass){setMsg({e:true,t:"Upiši email i lozinku."});return;}
    setLoading(true);setMsg(null);
    if(mode==="login"){
      const{error}=await sb.auth.signInWithPassword({email,password:pass});
      if(error)setMsg({e:true,t:"Pogrešan email ili lozinka."});
    }else{
      const{error}=await sb.auth.signUp({email,password:pass});
      if(error)setMsg({e:true,t:error.message});
      else setMsg({e:false,t:"Provjeri inbox i klikni potvrdni link."});
    }
    setLoading(false);
  }
  return(
    <div className="auth">
      <div className="auth-box">
        <div className="auth-logo"><h1>Zdravlje<br/><em>Tracker</em></h1><p>Prehrana · Probava · Kilaža</p></div>
        <div className="auth-card">
          <div className="tab-sw">
            {["login","register"].map(m=><button key={m} className={`tab-sw-b${mode===m?" on":""}`} onClick={()=>setMode(m)}>{m==="login"?"Prijava":"Registracija"}</button>)}
          </div>
          <label className="auth-lbl">Email</label>
          <input className="auth-inp" type="email" placeholder="tvoj@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          <label className="auth-lbl">Lozinka</label>
          <input className="auth-inp" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          {msg&&<div className={msg.e?"msg-e":"msg-ok"}>{msg.t}</div>}
          <button className="auth-btn" onClick={submit} disabled={loading}>{loading?"Učitavanje...":mode==="login"?"Prijavi se →":"Registriraj se →"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Data hook ────────────────────────────────────────────────────────────────
function useData(uid) {
  const [nutrition,setNutrition]=useState([]);
  const [digestion,setDigestion]=useState([]);
  const [customFoods,setCustomFoods]=useState([]);
  const [weight,setWeight]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    if(!uid)return;
    (async()=>{
      setLoading(true);
      const [n,d,cf,w]=await Promise.all([
        sb.from("nutrition").select("*").eq("user_id",uid).order("created_at",{ascending:false}),
        sb.from("digestion").select("*").eq("user_id",uid).order("created_at",{ascending:false}),
        sb.from("custom_foods").select("*").eq("user_id",uid).order("created_at",{ascending:false}),
        sb.from("weight").select("*").eq("user_id",uid).order("date",{ascending:true}),
      ]);
      setNutrition(n.data||[]);
      setDigestion(d.data||[]);
      setCustomFoods((cf.data||[]).map(x=>({...x,baseAmount:x.base_amount})));
      setWeight(w.data||[]);
      setLoading(false);
    })();
  },[uid]);

  async function addNutrition(item){
    const{data:d}=await sb.from("nutrition").insert({user_id:uid,date:item.date,meal:item.meal,name:item.name,base_food:item.baseFood||item.name,quantity:item.quantity||null,unit:item.unit||null,kcal:item.kcal,protein:item.protein,carbs:item.carbs,fat:item.fat}).select().single();
    if(d)setNutrition(p=>[d,...p]);
  }
  async function removeNutrition(id){await sb.from("nutrition").delete().eq("id",id);setNutrition(p=>p.filter(x=>x.id!==id));}
  async function addDigestion(item){
    // build row — only include no_stool/loperamide if columns exist
    const row={user_id:uid,date:item.date,time:item.time,stool:item.noStool?"none":item.stool,symptoms:item.symptoms,pain:item.pain,bloating:item.bloating,energy:item.energy,water:item.water,notes:item.notes};
    try{row.no_stool=item.noStool||false;}catch(e){}
    try{row.loperamide=item.loperamide||false;}catch(e){}
    const{data:d,error}=await sb.from("digestion").insert(row).select().single();
    if(error){
      // retry without optional columns if they don't exist
      const{no_stool,loperamide,...safeRow}=row;
      const{data:d2}=await sb.from("digestion").insert(safeRow).select().single();
      if(d2)setDigestion(p=>[d2,...p]);
    } else if(d){
      setDigestion(p=>[d,...p]);
    }
  }
  async function removeDigestion(id){await sb.from("digestion").delete().eq("id",id);setDigestion(p=>p.filter(x=>x.id!==id));}
  async function addCustomFood(food){
    const{data:d}=await sb.from("custom_foods").insert({user_id:uid,name:food.name,unit:food.unit,base_amount:food.baseAmount,kcal:food.kcal,protein:food.protein||0,carbs:food.carbs||0,fat:food.fat||0}).select().single();
    if(d){const cf={...d,baseAmount:d.base_amount};setCustomFoods(p=>[cf,...p]);return cf;}
    return null;
  }
  async function addWeight(item){
    // upsert by date
    const existing=weight.find(w=>w.date===item.date);
    if(existing){
      const{data:d}=await sb.from("weight").update({kg:item.kg,notes:item.notes}).eq("id",existing.id).select().single();
      if(d)setWeight(p=>p.map(w=>w.id===existing.id?d:w).sort((a,b)=>a.date.localeCompare(b.date)));
    }else{
      const{data:d}=await sb.from("weight").insert({user_id:uid,date:item.date,kg:item.kg,notes:item.notes||null}).select().single();
      if(d)setWeight(p=>[...p,d].sort((a,b)=>a.date.localeCompare(b.date)));
    }
  }
  async function removeWeight(id){await sb.from("weight").delete().eq("id",id);setWeight(p=>p.filter(x=>x.id!==id));}

  return{nutrition,digestion,customFoods,weight,loading,addNutrition,removeNutrition,addDigestion,removeDigestion,addCustomFood,addWeight,removeWeight};
}

// ─── Nutrition tab ────────────────────────────────────────────────────────────
function NutritionTab({nutrition,customFoods,addNutrition,addCustomFood,removeNutrition}){
  const [selDate,setSelDate]=useState(today());
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [qty,setQty]=useState(1);
  const [meal,setMeal]=useState("Doručak");
  const [custom,setCustom]=useState({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
  const [showCustom,setShowCustom]=useState(false);
  const [saving,setSaving]=useState(false);
  const [goal,setGoal]=useState(()=>{try{return+localStorage.getItem("kcal_goal")||2000;}catch{return 2000;}});

  const allFoods=[...BUILTIN_FOODS,...customFoods.map(cf=>({...cf,_custom:true}))];
  const filtered=search.length>1?allFoods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).slice(0,6):[];
  const dayItems=nutrition.filter(n=>n.date===selDate);
  const tot=dayItems.reduce((a,n)=>({kcal:a.kcal+n.kcal,protein:a.protein+n.protein,carbs:a.carbs+n.carbs,fat:a.fat+n.fat}),{kcal:0,protein:0,carbs:0,fat:0});
  const pct=Math.min(100,Math.round((tot.kcal/goal)*100));
  const pctC=pct>=100?"#d85a30":pct>=80?"#ba7517":"#1d9e75";
  const sp=sel?scaleFood(sel,qty):null;
  const dots=[...new Set(nutrition.map(n=>n.date))];

  function pick(f){setSel(f);setQty(f.baseAmount||f.base_amount||1);setSearch(f.name);}
  async function addSel(){if(!sel)return;setSaving(true);const s=scaleFood(sel,qty);await addNutrition({name:sel.name,...s,meal,date:selDate,baseFood:sel.name,quantity:qty,unit:sel.unit});setSearch("");setSel(null);setQty(1);setSaving(false);}
  async function saveCustom(){if(!custom.name||!custom.kcal)return;setSaving(true);const food={name:custom.name,unit:custom.unit||"g",baseAmount:+custom.baseAmount||100,kcal:+custom.kcal,protein:+custom.protein||0,carbs:+custom.carbs||0,fat:+custom.fat||0};const saved=await addCustomFood(food);if(saved){const amt=+custom.amount||food.baseAmount;const f=amt/food.baseAmount;await addNutrition({name:food.name,kcal:food.kcal*f,protein:food.protein*f,carbs:food.carbs*f,fat:food.fat*f,meal,date:selDate,quantity:amt,unit:food.unit});}setCustom({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});setShowCustom(false);setSaving(false);}

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>
      <div className="mrow">
        {[{l:"kcal",v:Math.round(tot.kcal),c:"#993c1d"},{l:"Protein",v:Math.round(tot.protein)+"g",c:"#185fa5"},{l:"Ugljik.",v:Math.round(tot.carbs)+"g",c:"#854f0b"},{l:"Masti",v:Math.round(tot.fat)+"g",c:"#0f6e56"}].map(m=>(
          <div key={m.l} className="met"><div className="met-l">{m.l}</div><div className="met-v" style={{color:m.c,fontSize:m.l==="kcal"?20:16}}>{m.v}</div></div>
        ))}
      </div>
      <div className="card" style={{padding:14,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:13,color:"#888"}}>{Math.round(tot.kcal)} / {goal} kcal · <b style={{color:"#1a1a18"}}>{pct}%</b></span>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:11,color:"#aaa"}}>Cilj:</span>
            <input type="number" value={goal} onChange={e=>{setGoal(+e.target.value);localStorage.setItem("kcal_goal",e.target.value);}} style={{width:68,padding:"4px 8px",fontSize:14,border:"1.5px solid #e8e5df",borderRadius:8,background:"#fafaf8",color:"#1a1a18",outline:"none",textAlign:"center"}}/>
          </div>
        </div>
        <div className="prog" style={{marginBottom:8}}><div className="prog-f" style={{width:`${pct}%`,background:pctC}}/></div>
        <div style={{display:"flex",gap:8}}>
          {[{l:"P",v:tot.protein,max:150,c:"#378add"},{l:"U",v:tot.carbs,max:250,c:"#ba7517"},{l:"M",v:tot.fat,max:80,c:"#1d9e75"}].map(m=>(
            <div key={m.l} style={{flex:1}}><div style={{fontSize:9.5,color:"#bbb",marginBottom:3,textTransform:"uppercase"}}>{m.l} {Math.round(m.v)}g</div><div className="prog"><div className="prog-f" style={{width:`${Math.min(100,Math.round(m.v/m.max*100))}%`,background:m.c}}/></div></div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="ttl">Dodaj obrok</div>
        <span className="lbl">Obrok</span>
        <div className="pills">{MEALS.map(m=><button key={m} className={`pill${meal===m?" g":""}`} onClick={()=>setMeal(m)}>{MEAL_ICONS[m]} {m}</button>)}</div>
        <div className="div"/>
        <input className="inp" placeholder="Pretraži hranu..." value={search} onChange={e=>{setSearch(e.target.value);if(!e.target.value)setSel(null);}}/>
        {filtered.length>0&&!sel&&(
          <div className="sugg">
            {filtered.map((f,i)=>(
              <div key={i} className={`sugg-row${f._custom?" mine":""}`} onClick={()=>pick(f)}>
                <div><div style={{fontSize:14}}>{f.name}{f._custom&&<span style={{fontSize:10,color:"#854f0b",marginLeft:6,fontWeight:500}}>MOJ UNOS</span>}</div><div style={{fontSize:11,color:"#aaa"}}>per {f.baseAmount||f.base_amount}{f.unit}</div></div>
                <div style={{display:"flex",gap:4}}><span className="bx bc">{f.kcal} kcal</span><span className="bx bb">{f.protein}g P</span></div>
              </div>
            ))}
          </div>
        )}
        {sel&&(
          <div className="qty-row">
            <span style={{fontSize:13,color:"#0f6e56",fontWeight:500,flex:"1 1 100%"}}>{sel.name}</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,color:"#0f6e56"}}>Količina:</span>
              <input type="number" className="qty-inp" value={qty} onChange={e=>setQty(Math.max(0.1,+e.target.value))} min="0.1" step={sel.unit==="g"||sel.unit==="ml"?10:1} inputMode="decimal"/>
              <span style={{fontSize:13,color:"#085041",fontWeight:500}}>{sel.unit}</span>
            </div>
            {sp&&<span style={{fontSize:12,color:"#0d5c43",fontWeight:500,flex:"1 1 100%"}}>{Math.round(sp.kcal)} kcal · {Math.round(sp.protein)}g P · {Math.round(sp.carbs)}g U · {Math.round(sp.fat)}g M</span>}
            <div style={{display:"flex",gap:8,width:"100%"}}>
              <button className="btn btn-g" style={{flex:1,opacity:saving?0.6:1}} onClick={addSel} disabled={saving}>{saving?"...":"Dodaj"}</button>
              <button className="btn btn-ghost" style={{width:52}} onClick={()=>{setSel(null);setSearch("");}}>×</button>
            </div>
          </div>
        )}
        <div style={{marginTop:12}}>
          <button className={`pill${showCustom?" a":""}`} style={{fontSize:12}} onClick={()=>setShowCustom(!showCustom)}>{showCustom?"▲ Zatvori":"＋ Nova namirnica"}</button>
        </div>
        {showCustom&&(
          <div style={{marginTop:12,padding:14,background:"#fffdf5",borderRadius:12,border:"1px solid #fac775"}}>
            <div style={{fontSize:12,color:"#854f0b",fontWeight:500,marginBottom:10}}>Sprema se trajno — bit će dostupna za pretraživanje.</div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <div style={{flex:2}}><span className="lbl">Naziv</span><input className="inp" placeholder="npr. Proteinska ploča" value={custom.name} onChange={e=>setCustom({...custom,name:e.target.value})}/></div>
              <div style={{flex:1}}><span className="lbl">Jedinica</span><input className="inp" placeholder="g/kom" value={custom.unit} onChange={e=>setCustom({...custom,unit:e.target.value})}/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
              {[["kcal","kcal"],["Baza","baseAmount"],["Pojeo","amount"],["Protein g","protein"],["Ugljik. g","carbs"],["Masti g","fat"]].map(([l,k])=>(
                <div key={k}><span className="lbl">{l}</span><input type="number" className="inp" inputMode="decimal" value={custom[k]} onChange={e=>setCustom({...custom,[k]:e.target.value})}/></div>
              ))}
            </div>
            <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={saveCustom} disabled={saving}>Spremi i dodaj</button>
          </div>
        )}
      </div>
      {dayItems.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:"#bbb",fontSize:14}}>Nema unesene hrane za {selDate===today()?"danas":fmtShort(selDate)}.</div>}
      {MEALS.map(m=>{
        const items=dayItems.filter(n=>n.meal===m);
        if(!items.length)return null;
        const mkcal=Math.round(items.reduce((a,n)=>a+n.kcal,0));
        return(
          <div key={m}>
            <div className="meal-hd"><span>{MEAL_ICONS[m]}</span><span style={{flex:1}}>{m}</span><span className="bx bz">{mkcal} kcal</span></div>
            <div className="meal-bd">
              {items.map(item=>(
                <div key={item.id} className="frow">
                  <div><div style={{fontSize:14}}>{item.base_food||item.name}</div>{item.quantity&&<div style={{fontSize:11,color:"#aaa"}}>{item.quantity} {item.unit}</div>}</div>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}><span className="bx bc">{Math.round(item.kcal)} kcal</span><span className="bx bb">{Math.round(item.protein)}g P</span><button className="rm" onClick={()=>removeNutrition(item.id)}>×</button></div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Digestion tab ────────────────────────────────────────────────────────────
function DigestionTab({digestion,addDigestion,removeDigestion}){
  const [selDate,setSelDate]=useState(today());
  const [noStool,setNoStool]=useState(false);
  const [form,setForm]=useState({time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8,loperamide:false});
  const [saving,setSaving]=useState(false);
  const [openDay,setOpenDay]=useState(null);

  const stoolTypes=[{v:"1",d:"Tvrde grudice"},{v:"2",d:"Zbijena"},{v:"3",d:"Normalna ✓"},{v:"4",d:"Mekana"},{v:"5",d:"Komadići"},{v:"6",d:"Kašasta"},{v:"7",d:"Tekuća"}];
  function toggleSym(s){setForm(f=>({...f,symptoms:f.symptoms.includes(s)?f.symptoms.filter(x=>x!==s):[...f.symptoms,s]}));}

  async function submit(){
    setSaving(true);
    await addDigestion({...form,date:selDate,noStool});
    setForm({time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8,loperamide:false});
    setNoStool(false);
    setSaving(false);
  }

  const dots=[...new Set(digestion.map(d=>d.date))];
  const selEntries=digestion.filter(e=>e.date===selDate);
  const byDate={};
  digestion.forEach(e=>{if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);});
  const sortedDates=Object.keys(byDate).sort((a,b)=>b.localeCompare(a)).slice(0,30);

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>
      <div className="card">
        <div className="ttl">Unos za {selDate===today()?"danas":fmtShort(selDate)}</div>

        {/* No stool toggle */}
        <button className={`nostool-btn${noStool?" active":""}`} onClick={()=>setNoStool(!noStool)} style={{marginBottom:14}}>
          {noStool?"✓ Nisam imao stolicu cijeli dan":"Nisam imao stolicu cijeli dan"}
        </button>

        {!noStool&&(
          <>
            <div style={{marginBottom:14}}>
              <span className="lbl">Vrijeme</span>
              <input type="time" className="inp" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/>
            </div>
            <span className="lbl">Bristol skala</span>
            <div className="pills" style={{marginBottom:14}}>
              {stoolTypes.map(t=>(
                <button key={t.v} className={`pill${form.stool===t.v?" t":""}`} style={{textAlign:"center"}} onClick={()=>setForm({...form,stool:t.v})}>
                  <div style={{fontWeight:600,fontSize:12}}>Tip {t.v}</div>
                  <div style={{fontSize:10,opacity:.75}}>{t.d}</div>
                </button>
              ))}
            </div>
          </>
        )}

        <span className="lbl">Simptomi</span>
        <div className="pills">{DIGEST_SYMPTOMS.map(s=><button key={s} className={`pill${form.symptoms.includes(s)?" c":""}`} onClick={()=>toggleSym(s)}>{s}</button>)}</div>

        {/* Loperamide / Imodium toggle */}
        <button
          className={`pill${form.loperamide?" red":""}`}
          style={{marginBottom:14,fontSize:13}}
          onClick={()=>setForm(f=>({...f,loperamide:!f.loperamide}))}>
          💊 {form.loperamide?"✓ Uzeo sam Loperamid (Imodium)":"Uzeo sam Loperamid (Imodium)"}
        </button>

        {[{k:"pain",l:"Bol",max:10,c:"#d85a30"},{k:"bloating",l:"Nadutost",max:10,c:"#ba7517"},{k:"energy",l:"Energija",max:5,c:"#1d9e75"},{k:"water",l:"Čaše vode",max:15,c:"#378add"}].map(({k,l,max,c})=>(
          <div key={k} className="rrow">
            <div className="rlbl"><span>{l}</span><span style={{fontWeight:500,color:c}}>{form[k]}/{max}</span></div>
            <input type="range" min={0} max={max} step={1} value={form[k]} onChange={e=>setForm({...form,[k]:+e.target.value})} style={{accentColor:c}}/>
          </div>
        ))}

        <span className="lbl">Bilješka</span>
        <textarea className="inp" placeholder="Kako se osjećaš?" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} style={{marginBottom:14}}/>
        <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={submit} disabled={saving}>{saving?"Spremanje...":"Spremi unos"}</button>
      </div>

      {selEntries.length>0&&(
        <div style={{marginBottom:12}}>
          <div className="lbl" style={{marginBottom:8}}>Unosi za {fmtShort(selDate)}</div>
          {selEntries.map(e=>(
            <div key={e.id} className="card-sm">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                  {e.no_stool
                    ?<span className="bx bred">Bez stolice</span>
                    :<><span style={{fontSize:14,fontWeight:500}}>{e.time}</span><span className="bx bt">Tip {e.stool}</span></>
                  }
                  {e.loperamide&&<span className="bx bred">💊 Loperamid</span>}
                </div>
                <button className="rm" onClick={()=>removeDigestion(e.id)}>×</button>
              </div>
              <div style={{display:"flex",gap:10,fontSize:12,color:"#888",flexWrap:"wrap"}}>
                {e.pain>0&&<span style={{color:"#993c1d"}}>Bol {e.pain}/10</span>}
                {e.bloating>0&&<span style={{color:"#854f0b"}}>Nadutost {e.bloating}/10</span>}
                <span style={{color:"#0f6e56"}}>Energija {e.energy}/5</span>
                <span style={{color:"#185fa5"}}>💧 {e.water}x</span>
              </div>
              {e.symptoms&&e.symptoms.length>0&&<div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>{e.symptoms.map(s=><span key={s} className="bx bc">{s}</span>)}</div>}
              {e.notes&&<div style={{marginTop:5,fontSize:12,color:"#888",fontStyle:"italic"}}>{e.notes}</div>}
            </div>
          ))}
        </div>
      )}

      {selEntries.length===0&&<div style={{textAlign:"center",padding:"16px 0",color:"#bbb",fontSize:14,marginBottom:12}}>Nema unosa za {selDate===today()?"danas":fmtShort(selDate)}.</div>}

      <div className="lbl" style={{marginBottom:8,marginTop:4}}>Povijest po danima</div>
      {sortedDates.map(date=>{
        const entries=byDate[date];
        const avgPain=(entries.reduce((a,e)=>a+e.pain,0)/entries.length).toFixed(1);
        const avgEnergy=(entries.reduce((a,e)=>a+e.energy,0)/entries.length).toFixed(1);
        const allSyms=[...new Set(entries.flatMap(e=>e.symptoms||[]))];
        const hasLoper=entries.some(e=>e.loperamide);
        const hasNoStool=entries.some(e=>e.no_stool);
        const isOpen=openDay===date;
        return(
          <div key={date} className="dh-day">
            <div className="dh-hdr" onClick={()=>setOpenDay(isOpen?null:date)}>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:500}}>{fmtLong(date)}</div>
                <div style={{fontSize:12,color:"#aaa",marginTop:2,display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span>{entries.length} {entries.length===1?"unos":"unosa"}</span>
                  <span>Bol {avgPain}/10</span>
                  <span>Energija {avgEnergy}/5</span>
                </div>
              </div>
              <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
                {hasNoStool&&<span className="bx bred">Bez stolice</span>}
                {hasLoper&&<span className="bx bred">💊</span>}
                {allSyms.slice(0,1).map(s=><span key={s} className="bx bc">{s}</span>)}
                <span style={{color:"#bbb",fontSize:14,marginLeft:4}}>{isOpen?"▲":"▼"}</span>
              </div>
            </div>
            {isOpen&&(
              <div className="dh-body">
                {entries.map(e=>(
                  <div key={e.id} style={{padding:"10px 0",borderBottom:"1px solid #f5f3ef"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {e.no_stool?<span className="bx bred">Bez stolice</span>:<><span style={{fontSize:13,fontWeight:500}}>{e.time}</span><span className="bx bt">Tip {e.stool}</span></>}
                        {e.loperamide&&<span className="bx bred">💊 Loperamid</span>}
                      </div>
                      <button className="rm" onClick={()=>removeDigestion(e.id)}>×</button>
                    </div>
                    <div style={{display:"flex",gap:8,fontSize:12,color:"#888",flexWrap:"wrap"}}>
                      {e.pain>0&&<span style={{color:"#993c1d"}}>Bol {e.pain}/10</span>}
                      {e.bloating>0&&<span style={{color:"#854f0b"}}>Nadutost {e.bloating}/10</span>}
                      <span style={{color:"#0f6e56"}}>Energija {e.energy}/5</span>
                      <span style={{color:"#185fa5"}}>💧 {e.water}x</span>
                    </div>
                    {e.symptoms&&e.symptoms.length>0&&<div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>{e.symptoms.map(s=><span key={s} className="bx bc">{s}</span>)}</div>}
                    {e.notes&&<div style={{marginTop:4,fontSize:12,color:"#888",fontStyle:"italic"}}>{e.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Weight tab ───────────────────────────────────────────────────────────────
function WeightTab({weight,addWeight,removeWeight}){
  const [selDate,setSelDate]=useState(today());
  const [kg,setKg]=useState("");
  const [notes,setNotes]=useState("");
  const [saving,setSaving]=useState(false);
  const {Chart}=window;

  const existing=weight.find(w=>w.date===selDate);
  useEffect(()=>{
    if(existing){setKg(String(existing.kg));setNotes(existing.notes||"");}
    else{setKg("");setNotes("");}
  },[selDate,existing?.id]);

  async function submit(){
    if(!kg||isNaN(+kg))return;
    setSaving(true);
    await addWeight({date:selDate,kg:+kg,notes});
    setSaving(false);
  }

  // stats
  const sorted=weight.slice().sort((a,b)=>a.date.localeCompare(b.date));
  const latest=sorted[sorted.length-1];
  const oldest=sorted[0];
  const diff=latest&&oldest&&latest!==oldest?+(latest.kg-oldest.kg).toFixed(1):null;

  // last 30 entries for chart
  const chartData=sorted.slice(-30);

  useEffect(()=>{
    if(chartData.length<2)return;
    const el=document.getElementById("wc1");if(!el)return;
    const c=new Chart(el,{
      type:"line",
      data:{
        labels:chartData.map(w=>fmtShort(w.date)),
        datasets:[{
          data:chartData.map(w=>w.kg),
          borderColor:"#1d9e75",
          backgroundColor:"rgba(29,158,117,0.08)",
          tension:0.3,
          pointRadius:4,
          pointBackgroundColor:"#0f6e56",
          fill:true,
          borderWidth:2,
        }]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{
          y:{grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"},beginAtZero:false},
          x:{grid:{display:false},ticks:{autoSkip:true,maxTicksLimit:8,font:{size:11},color:"#aaa",maxRotation:45}}
        }
      }
    });
    return()=>c.destroy();
  },[weight]);

  const dots=weight.map(w=>w.date);

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>

      {/* summary metrics */}
      {latest&&(
        <div className="mrow-2">
          <div className="met">
            <div className="met-l">Trenutna kilaža</div>
            <div className="met-v" style={{color:"#0f6e56",fontSize:26}}>{latest.kg}<span className="met-u">kg</span></div>
            <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{fmtShort(latest.date)}</div>
          </div>
          <div className="met">
            <div className="met-l">{diff!==null?(diff>0?"Promjena (rast)":"Promjena (pad)"):"Početna kilaža"}</div>
            <div className="met-v" style={{color:diff===null?"#888":diff>0?"#d85a30":"#0f6e56",fontSize:26}}>
              {diff!==null?(diff>0?"+":"")+diff:oldest?.kg??"-"}
              <span className="met-u">kg</span>
            </div>
            <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{diff!==null?`od ${fmtShort(oldest.date)}`:"početak"}</div>
          </div>
        </div>
      )}

      {/* input */}
      <div className="card">
        <div className="ttl">{existing?"Uredi mjerenje":"Unesi kilažu"}</div>
        <div style={{display:"flex",gap:10,alignItems:"flex-end",marginBottom:12}}>
          <div style={{flex:1}}>
            <span className="lbl">Kilaža (kg)</span>
            <input type="number" className="inp" inputMode="decimal" step="0.1" placeholder="npr. 82.5" value={kg} onChange={e=>setKg(e.target.value)} style={{fontSize:20,fontWeight:300,textAlign:"center"}}/>
          </div>
        </div>
        <span className="lbl">Bilješka (opcionalno)</span>
        <input className="inp" placeholder="npr. Jutro, natašte" value={notes} onChange={e=>setNotes(e.target.value)} style={{marginBottom:14}}/>
        <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={submit} disabled={saving}>
          {saving?"Spremanje...":(existing?"Spremi promjenu":"Dodaj mjerenje")}
        </button>
      </div>

      {/* chart */}
      {chartData.length>=2&&(
        <div className="card">
          <div className="ttl">Graf kilaže</div>
          <div style={{fontSize:12,color:"#aaa",marginBottom:8}}>Zadnjih {chartData.length} mjerenja</div>
          <div className="wchart"><canvas id="wc1"></canvas></div>
        </div>
      )}

      {/* history */}
      {sorted.length>0&&(
        <div className="card">
          <div className="ttl">Povijest mjerenja</div>
          {sorted.slice().reverse().map((w,i,arr)=>{
            const prev=arr[i+1];
            const delta=prev?+(w.kg-prev.kg).toFixed(1):null;
            return(
              <div key={w.id} className="frow">
                <div>
                  <div style={{fontSize:14,fontWeight:500}}>{fmtLong(w.date)}</div>
                  {w.notes&&<div style={{fontSize:12,color:"#888",marginTop:2}}>{w.notes}</div>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:16,fontWeight:300,fontFamily:"'Fraunces',serif"}}>{w.kg} <span style={{fontSize:12,color:"#aaa"}}>kg</span></div>
                    {delta!==null&&<div style={{fontSize:11,color:delta>0?"#d85a30":delta<0?"#0f6e56":"#aaa"}}>{delta>0?"+":""}{delta} kg</div>}
                  </div>
                  <button className="rm" onClick={()=>removeWeight(w.id)}>×</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {weight.length===0&&<div style={{textAlign:"center",padding:"32px 0",color:"#bbb",fontSize:14}}>Još nema unesenih mjerenja.<br/>Dodaj prvo mjerenje gore.</div>}
    </div>
  );
}

// ─── Stats tab ────────────────────────────────────────────────────────────────
function StatsTab({nutrition,digestion}){
  const [view,setView]=useState("week");
  const {Chart}=window;

  function lastN(n){return Array.from({length:n},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(n-1-i));return toDS(d);});}
  const weeks=Array.from({length:8},(_,i)=>{
    const end=new Date();end.setDate(end.getDate()-i*7);
    const start=new Date(end);start.setDate(start.getDate()-6);
    const days=[];for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1))days.push(toDS(new Date(d)));
    const label=i===0?"Ovaj tjedan":i===1?"Prošli tjedan":`${fmtShort(toDS(start))}`;
    const ni=nutrition.filter(n=>days.includes(n.date));
    const kcal=Math.round(ni.reduce((a,n)=>a+n.kcal,0));
    const dwd=days.filter(d=>nutrition.some(n=>n.date===d)).length;
    const di=digestion.filter(d=>days.includes(d.date));
    const avgE=di.length?+(di.reduce((a,d)=>a+d.energy,0)/di.length).toFixed(1):null;
    return{label,kcal,avgKcal:dwd>0?Math.round(kcal/dwd):0,dwd,avgE};
  }).reverse();

  const months=Array.from({length:6},(_,i)=>{
    const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-i);
    const pfx=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    const label=`${HR_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    const ni=nutrition.filter(n=>n.date.startsWith(pfx));
    const kcal=Math.round(ni.reduce((a,n)=>a+n.kcal,0));
    const dwd=[...new Set(ni.map(n=>n.date))].length;
    const di=digestion.filter(d=>d.date.startsWith(pfx));
    const avgE=di.length?+(di.reduce((a,d)=>a+d.energy,0)/di.length).toFixed(1):null;
    return{label,kcal,avgKcal:dwd>0?Math.round(kcal/dwd):0,dwd,avgE};
  }).reverse();

  const maxWk=Math.max(...weeks.map(w=>w.kcal),1);
  const maxMo=Math.max(...months.map(m=>m.kcal),1);

  const days14=lastN(14);
  const lbl14=days14.map(d=>fmtShort(d));
  const bd14=days14.map(d=>{
    const n=nutrition.filter(x=>x.date===d);
    const dg=digestion.filter(x=>x.date===d);
    return{kcal:Math.round(n.reduce((a,x)=>a+x.kcal,0)),protein:Math.round(n.reduce((a,x)=>a+x.protein,0)),carbs:Math.round(n.reduce((a,x)=>a+x.carbs,0)),fat:Math.round(n.reduce((a,x)=>a+x.fat,0)),pain:dg.length?+(dg.reduce((a,x)=>a+x.pain,0)/dg.length).toFixed(1):null,energy:dg.length?+(dg.reduce((a,x)=>a+x.energy,0)/dg.length).toFixed(1):null};
  });

  useEffect(()=>{
    if(view!=="charts")return;
    const charts=[];
    const mk=(id,type,datasets,extra={})=>{
      const el=document.getElementById(id);if(!el)return;
      charts.push(new Chart(el,{type,data:{labels:lbl14,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"}},x:{grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11},color:"#aaa"}}},...extra}}));
    };
    mk("gc1","bar",[{data:bd14.map(d=>d.kcal),backgroundColor:"#f0997b",borderRadius:5,borderSkipped:false}]);
    mk("gc2","bar",[{label:"P",data:bd14.map(d=>d.protein),backgroundColor:"#85b7eb",borderRadius:3,stack:"m"},{label:"U",data:bd14.map(d=>d.carbs),backgroundColor:"#ef9f27",borderRadius:3,stack:"m"},{label:"M",data:bd14.map(d=>d.fat),backgroundColor:"#97c459",borderRadius:3,stack:"m"}],{scales:{x:{stacked:true,grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11},color:"#aaa"}},y:{stacked:true,beginAtZero:true,grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"}}}});
    mk("gc3","line",[{data:bd14.map(d=>d.pain),borderColor:"#d85a30",backgroundColor:"transparent",tension:.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#d85a30"},{data:bd14.map(d=>d.energy),borderColor:"#1d9e75",backgroundColor:"transparent",tension:.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#1d9e75"}]);
    return()=>charts.forEach(c=>c.destroy());
  },[view,nutrition,digestion]);

  return(
    <div>
      <div className="pills" style={{marginBottom:16}}>
        {[{id:"week",l:"Tjedni"},{id:"month",l:"Mjesečni"},{id:"charts",l:"Grafovi"}].map(v=>(
          <button key={v.id} className={`pill${view===v.id?" dk":""}`} onClick={()=>setView(v.id)}>{v.l}</button>
        ))}
      </div>

      {view==="week"&&(
        <>
          <div className="card">
            <div className="ttl">Kalorije po tjednima</div>
            {weeks.map((w,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13,fontWeight:i===weeks.length-1?500:400}}>{w.label}</div><div style={{fontSize:11,color:"#aaa"}}>{w.dwd} dana</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:`${Math.round(w.kcal/maxWk*100)}%`,background:i===weeks.length-1?"#1a1a18":"#d4d1cb"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right"}}><div style={{fontSize:13,fontWeight:500}}>{w.kcal.toLocaleString()}</div><div style={{fontSize:11,color:"#aaa"}}>~{w.avgKcal}/dan</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ttl">Energija po tjednima</div>
            {weeks.map((w,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13}}>{w.label}</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:w.avgE?`${Math.round(w.avgE/5*100)}%`:"0%",background:"#1d9e75"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right",fontSize:13,fontWeight:500,color:"#0f6e56"}}>{w.avgE??"-"}<span style={{fontSize:11,color:"#aaa",fontWeight:400}}>/5</span></div>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="month"&&(
        <>
          <div className="card">
            <div className="ttl">Kalorije po mjesecima</div>
            {months.map((m,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13,fontWeight:i===months.length-1?500:400}}>{m.label}</div><div style={{fontSize:11,color:"#aaa"}}>{m.dwd} dana</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:`${Math.round(m.kcal/maxMo*100)}%`,background:i===months.length-1?"#1a1a18":"#d4d1cb"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right"}}><div style={{fontSize:13,fontWeight:500}}>{m.kcal.toLocaleString()}</div><div style={{fontSize:11,color:"#aaa"}}>~{m.avgKcal}/dan</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ttl">Energija po mjesecima</div>
            {months.map((m,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13}}>{m.label}</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:m.avgE?`${Math.round(m.avgE/5*100)}%`:"0%",background:"#1d9e75"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right",fontSize:13,fontWeight:500,color:"#0f6e56"}}>{m.avgE??"-"}<span style={{fontSize:11,color:"#aaa",fontWeight:400}}>/5</span></div>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="charts"&&(
        <>
          {[{id:"gc1",title:"Kalorije (zadnjih 14 dana)",legend:[{c:"#f0997b",l:"kcal"}]},{id:"gc2",title:"Makronutrijenti",legend:[{c:"#85b7eb",l:"Proteini"},{c:"#ef9f27",l:"Ugljikohidrati"},{c:"#97c459",l:"Masti"}]},{id:"gc3",title:"Bol i energija",legend:[{c:"#d85a30",l:"Bol (0-10)"},{c:"#1d9e75",l:"Energija (0-5)"}]}].map(({id,title,legend})=>(
            <div key={id} className="card">
              <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:300,marginBottom:8}}>{title}</div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>{legend.map(l=><div key={l.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#888"}}><div style={{width:10,height:10,borderRadius:2,background:l.c}}/>{l.l}</div>)}</div>
              <div style={{position:"relative",height:170}}><canvas id={id}></canvas></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [session,setSession]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [tab,setTab]=useState("nutrition");
  const {nutrition,digestion,customFoods,weight,loading,addNutrition,removeNutrition,addDigestion,removeDigestion,addCustomFood,addWeight,removeWeight}=useData(session?.user?.id);

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setAuthLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,s)=>{setSession(s);setAuthLoading(false);});
    return()=>subscription.unsubscribe();
  },[]);

  if(authLoading)return<div className="zt-load"><div className="zt-load-in">Zdravlje <em style={{color:"#9fe1cb"}}>Tracker</em></div></div>;
  if(!session)return<AuthScreen/>;

  const tabs=[{id:"nutrition",l:"🥗 Prehrana"},{id:"digestion",l:"🫁 Probava"},{id:"weight",l:"⚖️ Kilaža"},{id:"stats",l:"📊 Statistike"}];

  return(
    <>
      <style>{CSS}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
      <div className="zt">
        <div className="zt-hdr">
          <div className="zt-hdr-in">
            <div className="zt-logo">Zdravlje <em>Tracker</em></div>
            <button className="pill dk" style={{fontSize:11,padding:"6px 12px"}} onClick={()=>sb.auth.signOut()}>Odjava</button>
          </div>
          <div className="zt-tabbar">
            {tabs.map(t=><button key={t.id} className={`zt-tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>{t.l}</button>)}
          </div>
        </div>
        <div className="zt-body">
          {loading
            ?<div style={{textAlign:"center",padding:"50px 0",color:"#bbb",fontSize:14}}>Učitavanje...</div>
            :<>
              {tab==="nutrition"&&<NutritionTab nutrition={nutrition} customFoods={customFoods} addNutrition={addNutrition} addCustomFood={addCustomFood} removeNutrition={removeNutrition}/>}
              {tab==="digestion"&&<DigestionTab digestion={digestion} addDigestion={addDigestion} removeDigestion={removeDigestion}/>}
              {tab==="weight"&&<WeightTab weight={weight} addWeight={addWeight} removeWeight={removeWeight}/>}
              {tab==="stats"&&<StatsTab nutrition={nutrition} digestion={digestion}/>}
            </>
          }
        </div>
      </div>
    </>
  );
}import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://obacbdvknksuzjaqmxrh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYWNiZHZrbmtzdXpqYXFteHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzODMwMjYsImV4cCI6MjA4ODk1OTAyNn0.CwHBqH0uWIo4yQjW1APMEqepQ5cqIEiIev0DAKZbxH4"
);

const BUILTIN_FOODS = [
  {name:"Piletina (prsa)",unit:"g",baseAmount:100,kcal:165,protein:31,carbs:0,fat:3.6},
  {name:"Piletina (but)",unit:"g",baseAmount:100,kcal:209,protein:26,carbs:0,fat:11},
  {name:"Riža bijela",unit:"g",baseAmount:100,kcal:130,protein:2.7,carbs:28,fat:0.3},
  {name:"Riža smeđa",unit:"g",baseAmount:100,kcal:112,protein:2.6,carbs:23,fat:0.9},
  {name:"Jaje",unit:"kom",baseAmount:1,kcal:78,protein:6,carbs:0.6,fat:5},
  {name:"Bjelanjak",unit:"kom",baseAmount:1,kcal:17,protein:3.6,carbs:0.2,fat:0.1},
  {name:"Banana",unit:"kom",baseAmount:1,kcal:89,protein:1.1,carbs:23,fat:0.3},
  {name:"Jabuka",unit:"kom",baseAmount:1,kcal:72,protein:0.4,carbs:19,fat:0.2},
  {name:"Naranča",unit:"kom",baseAmount:1,kcal:62,protein:1.2,carbs:15,fat:0.2},
  {name:"Jagode",unit:"g",baseAmount:100,kcal:32,protein:0.7,carbs:7.7,fat:0.3},
  {name:"Borovnice",unit:"g",baseAmount:100,kcal:57,protein:0.7,carbs:14,fat:0.3},
  {name:"Avokado",unit:"kom",baseAmount:1,kcal:234,protein:2.9,carbs:12,fat:21},
  {name:"Jogurt (grčki)",unit:"g",baseAmount:150,kcal:132,protein:12,carbs:5,fat:7},
  {name:"Jogurt (obični)",unit:"g",baseAmount:150,kcal:90,protein:6,carbs:11,fat:2},
  {name:"Mlijeko (3.2%)",unit:"ml",baseAmount:200,kcal:122,protein:6.4,carbs:9.6,fat:4.8},
  {name:"Svježi sir",unit:"g",baseAmount:100,kcal:98,protein:11,carbs:3.4,fat:4.3},
  {name:"Feta sir",unit:"g",baseAmount:30,kcal:75,protein:4,carbs:1.2,fat:6},
  {name:"Skuta",unit:"g",baseAmount:100,kcal:103,protein:11,carbs:4,fat:4.5},
  {name:"Kruh bijeli",unit:"kriška",baseAmount:1,kcal:80,protein:3,carbs:15,fat:1},
  {name:"Kruh integralni",unit:"kriška",baseAmount:1,kcal:69,protein:3.6,carbs:12,fat:1.1},
  {name:"Zobene pahuljice",unit:"g",baseAmount:50,kcal:189,protein:6.5,carbs:32,fat:3.5},
  {name:"Granola",unit:"g",baseAmount:50,kcal:224,protein:5,carbs:32,fat:9},
  {name:"Tjestenina (suha)",unit:"g",baseAmount:80,kcal:282,protein:10,carbs:57,fat:1.4},
  {name:"Losos",unit:"g",baseAmount:100,kcal:208,protein:20,carbs:0,fat:13},
  {name:"Tuna (konzerva)",unit:"g",baseAmount:100,kcal:116,protein:25.5,carbs:0,fat:1},
  {name:"Skuša",unit:"g",baseAmount:100,kcal:205,protein:19,carbs:0,fat:14},
  {name:"Govedina",unit:"g",baseAmount:100,kcal:250,protein:26,carbs:0,fat:15},
  {name:"Svinjetina (but)",unit:"g",baseAmount:100,kcal:242,protein:27,carbs:0,fat:14},
  {name:"Puretina (prsa)",unit:"g",baseAmount:100,kcal:135,protein:30,carbs:0,fat:1},
  {name:"Brokula",unit:"g",baseAmount:100,kcal:34,protein:2.8,carbs:7,fat:0.4},
  {name:"Špinat",unit:"g",baseAmount:100,kcal:23,protein:2.9,carbs:3.6,fat:0.4},
  {name:"Rajčica",unit:"kom",baseAmount:1,kcal:22,protein:1.1,carbs:4.8,fat:0.2},
  {name:"Krastavac",unit:"kom",baseAmount:1,kcal:16,protein:0.7,carbs:3.6,fat:0.1},
  {name:"Paprika",unit:"kom",baseAmount:1,kcal:31,protein:1,carbs:7,fat:0.3},
  {name:"Krumpir (kuhani)",unit:"g",baseAmount:100,kcal:87,protein:1.9,carbs:20,fat:0.1},
  {name:"Batat",unit:"g",baseAmount:100,kcal:86,protein:1.6,carbs:20,fat:0.1},
  {name:"Leća",unit:"g",baseAmount:100,kcal:116,protein:9,carbs:20,fat:0.4},
  {name:"Slanutak",unit:"g",baseAmount:100,kcal:164,protein:8.9,carbs:27,fat:2.6},
  {name:"Bademi",unit:"g",baseAmount:30,kcal:174,protein:6.3,carbs:6,fat:15},
  {name:"Orasi",unit:"g",baseAmount:30,kcal:196,protein:4.6,carbs:4.1,fat:19.6},
  {name:"Kikiriki maslac",unit:"g",baseAmount:30,kcal:188,protein:8,carbs:6,fat:16},
  {name:"Maslinovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Maslac",unit:"g",baseAmount:10,kcal:72,protein:0.1,carbs:0,fat:8},
  {name:"Med",unit:"g",baseAmount:20,kcal:61,protein:0.1,carbs:16.5,fat:0},
  {name:"Proteinski prah (whey)",unit:"g",baseAmount:30,kcal:120,protein:24,carbs:3,fat:1.5},
  {name:"Kava (espresso)",unit:"kom",baseAmount:1,kcal:2,protein:0.1,carbs:0,fat:0},
  {name:"Sok od naranče",unit:"ml",baseAmount:200,kcal:94,protein:1.4,carbs:21,fat:0.4},
];

const DIGEST_SYMPTOMS = ["Nadutost","Mučnina","Refluks","Bol u trbuhu","Žgaravica","Umor","Dijareja","Opstipacija","Grčevi","Vjetrovi"];
const MEALS = ["Doručak","Jutarnja užina","Ručak","Popodnevna užina","Večera","Kasna večera"];
const MEAL_ICONS = {"Doručak":"☀️","Jutarnja užina":"🍎","Ručak":"🍽️","Popodnevna užina":"☕","Večera":"🌙","Kasna večera":"⭐"};
const HR_DAYS = ["Po","Ut","Sr","Če","Pe","Su","Ne"];
const HR_MONTHS = ["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"];

function toDS(d){return d.toISOString().slice(0,10);}
function today(){return toDS(new Date());}
function fmtShort(d){return new Date(d+"T00:00:00").toLocaleDateString("hr-HR",{day:"numeric",month:"short"});}
function fmtLong(d){return new Date(d+"T00:00:00").toLocaleDateString("hr-HR",{weekday:"long",day:"numeric",month:"long"});}
function scaleFood(f,amt){const r=amt/(f.baseAmount||f.base_amount||1);return{kcal:f.kcal*r,protein:f.protein*r,carbs:f.carbs*r,fat:f.fat*r};}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{-webkit-text-size-adjust:100%;}
body{background:#f5f3ef;overscroll-behavior:none;}
input,textarea,button,select{font-family:'DM Sans',sans-serif;-webkit-appearance:none;appearance:none;}
input[type="date"],input[type="time"]{color-scheme:light dark;}
input[type="number"]{-moz-appearance:textfield;}
input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{-webkit-appearance:none;}

/* layout */
.zt{font-family:'DM Sans',sans-serif;min-height:100dvh;background:#f5f3ef;color:#1a1a18;max-width:600px;margin:0 auto;}
.zt-hdr{background:#1a1a18;padding:env(safe-area-inset-top,0) 0 0;position:sticky;top:0;z-index:50;}
.zt-hdr-in{padding:16px 18px 0;display:flex;justify-content:space-between;align-items:center;}
.zt-logo{font-family:'Fraunces',serif;font-size:24px;font-weight:300;color:#f5f3ef;letter-spacing:-0.8px;line-height:1;}
.zt-logo em{color:#9fe1cb;font-style:italic;}
.zt-tabbar{display:flex;overflow-x:auto;scrollbar-width:none;border-top:1px solid #2a2a28;-webkit-overflow-scrolling:touch;}
.zt-tabbar::-webkit-scrollbar{display:none;}
.zt-tab{flex:1;min-width:fit-content;padding:12px 16px;background:none;border:none;font-size:13px;font-weight:400;cursor:pointer;color:#555;border-bottom:2px solid transparent;white-space:nowrap;transition:color .15s,border-color .15s;-webkit-tap-highlight-color:transparent;}
.zt-tab.on{color:#f5f3ef;border-bottom-color:#1d9e75;font-weight:500;}
.zt-body{padding:16px 14px 100px;}

/* cards */
.card{background:#fff;border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 2px 8px rgba(0,0,0,.04);}
.card-sm{background:#fff;border-radius:12px;padding:14px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.05);}

/* typography */
.ttl{font-family:'Fraunces',serif;font-size:18px;font-weight:300;color:#1a1a18;margin-bottom:14px;letter-spacing:-.3px;}
.lbl{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.8px;color:#888;margin-bottom:5px;display:block;}

/* metrics */
.mrow{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;}
.mrow-2{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px;}
.met{background:#f5f3ef;border-radius:12px;padding:11px 12px;}
.met-l{font-size:9.5px;font-weight:500;text-transform:uppercase;letter-spacing:.6px;color:#888;margin-bottom:3px;}
.met-v{font-size:20px;font-weight:300;font-family:'Fraunces',serif;line-height:1;color:#1a1a18;}
.met-u{font-size:10px;font-family:'DM Sans',sans-serif;color:#bbb;margin-left:1px;}

/* progress */
.prog{height:5px;background:#f0ede8;border-radius:99px;overflow:hidden;}
.prog-f{height:100%;border-radius:99px;transition:width .4s ease;}

/* pills */
.pills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.pill{padding:7px 13px;border-radius:99px;font-size:13px;cursor:pointer;border:1px solid #e8e5df;background:#f5f3ef;color:#666;font-weight:400;transition:all .12s;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
.pill.g{background:#e1f5ee;color:#0f6e56;border-color:#9fe1cb;font-weight:500;}
.pill.b{background:#e6f1fb;color:#185fa5;border-color:#b5d4f4;font-weight:500;}
.pill.c{background:#faece7;color:#993c1d;border-color:#f5c4b3;font-weight:500;}
.pill.a{background:#faeeda;color:#854f0b;border-color:#fac775;font-weight:500;}
.pill.t{background:#e1f5ee;color:#085041;border-color:#1d9e75;font-weight:500;}
.pill.dk{background:#2a2a28;color:#e0e0de;border-color:#3a3a38;font-weight:500;}
.pill.red{background:#fff0f0;color:#a32d2d;border-color:#f5b8b8;font-weight:500;}

/* badges */
.bx{display:inline-flex;align-items:center;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:500;}
.bc{background:#faece7;color:#993c1d;}
.bb{background:#e6f1fb;color:#185fa5;}
.bg{background:#e1f5ee;color:#0f6e56;}
.bt{background:#e1f5ee;color:#085041;}
.ba{background:#faeeda;color:#854f0b;}
.bz{background:#f5f3ef;color:#666;}
.bdk{background:#2a2a28;color:#ccc;}
.bred{background:#fff0f0;color:#a32d2d;}

/* inputs */
.inp{width:100%;padding:11px 14px;border:1.5px solid #e8e5df;border-radius:11px;font-size:16px;background:#fafaf8;color:#1a1a18;outline:none;transition:border-color .15s;-webkit-appearance:none;}
.inp:focus{border-color:#1d9e75;background:#fff;}
textarea.inp{resize:none;line-height:1.5;font-size:15px;}

/* buttons */
.btn{padding:13px 20px;border-radius:12px;font-size:14px;font-weight:500;cursor:pointer;border:none;background:#1a1a18;color:#f5f3ef;width:100%;transition:all .12s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.btn:active{transform:scale(.98);opacity:.9;}
.btn-g{background:#0f6e56;color:#e1f5ee;}
.btn-ghost{background:transparent;color:#666;border:1.5px solid #e8e5df;}
.rm{background:none;border:none;cursor:pointer;color:#ccc;font-size:20px;padding:4px 6px;line-height:1;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
.rm:active{color:#d85a30;}

/* divider */
.div{height:1px;background:#f0ede8;margin:12px 0;}

/* food suggestions */
.sugg{border:1.5px solid #e8e5df;border-radius:12px;overflow:hidden;margin-top:6px;}
.sugg-row{padding:12px 14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f5f3ef;background:#fff;-webkit-tap-highlight-color:transparent;}
.sugg-row:last-child{border-bottom:none;}
.sugg-row:active{background:#f5f3ef;}
.sugg-row.mine{background:#fffdf5;}

/* qty row */
.qty-row{margin-top:10px;padding:14px;background:#e1f5ee;border-radius:12px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;animation:si .2s ease;}
@keyframes si{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.qty-inp{width:80px;padding:9px 10px;border:2px solid #1d9e75;border-radius:10px;font-size:16px;background:#fff;color:#0f6e56;font-weight:500;outline:none;text-align:center;-webkit-appearance:none;}

/* meal sections */
.meal-hd{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f5f3ef;border-radius:12px 12px 0 0;font-size:13px;font-weight:500;color:#555;}
.meal-bd{background:#fff;border:1px solid #f0ede8;border-top:none;border-radius:0 0 12px 12px;padding:0 14px;margin-bottom:8px;}
.frow{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f8f6f2;}
.frow:last-child{border-bottom:none;}

/* range */
.rrow{margin-bottom:16px;}
.rlbl{display:flex;justify-content:space-between;font-size:14px;color:#666;margin-bottom:8px;}
input[type=range]{width:100%;height:28px;accent-color:#1d9e75;}

/* calendar */
.cal-wrap{position:relative;margin-bottom:14px;}
.cal-trigger{display:flex;align-items:center;gap:10px;padding:12px 16px;background:#1a1a18;border-radius:13px;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;}
.cal-date-txt{font-family:'Fraunces',serif;font-size:16px;font-weight:300;color:#f5f3ef;flex:1;}
.cal-sub{font-size:10px;color:#666;text-transform:uppercase;letter-spacing:.7px;}
.cal-popup{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.18);z-index:100;overflow:hidden;animation:si .18s ease;}
.cal-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#1a1a18;}
.cal-month{font-family:'Fraunces',serif;font-size:15px;font-weight:300;color:#f5f3ef;}
.cal-nav{background:none;border:none;cursor:pointer;color:#9fe1cb;font-size:18px;padding:6px 12px;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.cal-grid{padding:8px 10px 12px;}
.cal-dh{text-align:center;font-size:10.5px;font-weight:500;color:#bbb;padding:5px 0;text-transform:uppercase;letter-spacing:.4px;}
.cal-days{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
.cal-day{text-align:center;padding:9px 2px;border-radius:9px;font-size:14px;cursor:pointer;color:#1a1a18;background:none;border:none;font-family:'DM Sans',sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:transparent;position:relative;}
.cal-day:active{background:#f5f3ef;}
.cal-day.other{color:#ddd;}
.cal-day.istoday{font-weight:600;color:#0f6e56;}
.cal-day.sel{background:#1a1a18!important;color:#f5f3ef!important;font-weight:500;}
.cal-day.dot::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:#1d9e75;}
.cal-day.sel.dot::after{background:#9fe1cb;}
.cal-today-btn{display:block;width:calc(100% - 20px);margin:0 10px 10px;padding:10px;background:#f5f3ef;border:none;border-radius:10px;font-size:14px;color:#1a1a18;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;touch-action:manipulation;}
.cal-days-hdr{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:2px;}

/* digest history */
.dh-day{background:#fff;border-radius:13px;margin-bottom:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.dh-hdr{display:flex;align-items:center;justify-content:space-between;padding:13px 14px;cursor:pointer;-webkit-tap-highlight-color:transparent;}
.dh-hdr:active{background:#fafaf8;}
.dh-body{padding:0 14px 12px;}

/* week bars */
.wrow{display:flex;align-items:center;padding:9px 0;border-bottom:1px solid #f5f3ef;gap:8px;}
.wrow:last-child{border-bottom:none;}
.wbar-w{flex:1;height:6px;background:#f0ede8;border-radius:99px;overflow:hidden;}
.wbar{height:100%;border-radius:99px;transition:width .4s;}

/* weight chart wrapper */
.wchart{position:relative;height:200px;margin-top:8px;}

/* auth */
.auth{min-height:100dvh;display:flex;align-items:center;justify-content:center;background:#1a1a18;padding:24px;}
.auth-box{width:100%;max-width:380px;}
.auth-logo{text-align:center;margin-bottom:32px;}
.auth-logo h1{font-family:'Fraunces',serif;font-size:38px;font-weight:300;color:#f5f3ef;letter-spacing:-1.2px;line-height:1;}
.auth-logo h1 em{color:#9fe1cb;font-style:italic;}
.auth-logo p{font-size:11px;color:#555;margin-top:7px;letter-spacing:1.4px;text-transform:uppercase;}
.auth-card{background:#242422;border-radius:20px;padding:24px;border:1px solid #2e2e2c;}
.tab-sw{display:flex;background:#1a1a18;border-radius:11px;padding:3px;margin-bottom:20px;}
.tab-sw-b{flex:1;padding:10px;border-radius:9px;border:none;font-size:14px;font-weight:500;cursor:pointer;background:transparent;color:#666;touch-action:manipulation;}
.tab-sw-b.on{background:#2e2e2c;color:#f5f3ef;}
.auth-inp{width:100%;padding:13px 14px;border:1.5px solid #2e2e2c;border-radius:11px;font-size:16px;background:#1a1a18;color:#f5f3ef;outline:none;margin-bottom:12px;}
.auth-inp:focus{border-color:#1d9e75;}
.auth-inp::placeholder{color:#444;}
.auth-lbl{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.8px;color:#555;margin-bottom:5px;display:block;}
.auth-btn{width:100%;padding:14px;border-radius:12px;border:none;font-size:15px;font-weight:500;cursor:pointer;background:#0f6e56;color:#e1f5ee;margin-top:8px;touch-action:manipulation;}
.msg-e{padding:11px 14px;border-radius:10px;font-size:13px;background:#3a1a1a;color:#f5c4b3;margin-bottom:12px;}
.msg-ok{padding:11px 14px;border-radius:10px;font-size:13px;background:#0d2e25;color:#9fe1cb;margin-bottom:12px;}
.zt-load{min-height:100dvh;display:flex;align-items:center;justify-content:center;background:#1a1a18;}
.zt-load-in{font-family:'Fraunces',serif;font-size:20px;font-weight:300;color:#f5f3ef;text-align:center;}

/* no-stool big button */
.nostool-btn{width:100%;padding:14px;border-radius:12px;border:2px dashed #e8e5df;background:#fafaf8;color:#888;font-size:14px;font-weight:500;cursor:pointer;transition:all .15s;touch-action:manipulation;text-align:center;}
.nostool-btn.active{border-color:#d85a30;background:#faece7;color:#993c1d;border-style:solid;}
`;

// ─── Calendar ────────────────────────────────────────────────────────────────
function Cal({val, onChange, dots=[]}) {
  const [open,setOpen]=useState(false);
  const [view,setView]=useState(()=>{const d=new Date(val+"T00:00:00");return{y:d.getFullYear(),m:d.getMonth()};});
  const todayS=today(); const dotSet=new Set(dots);
  const dim=(y,m)=>new Date(y,m+1,0).getDate();
  const fdow=(y,m)=>{let d=new Date(y,m,1).getDay();return d===0?6:d-1;};
  const prev=()=>setView(v=>v.m===0?{y:v.y-1,m:11}:{y:v.y,m:v.m-1});
  const next=()=>setView(v=>v.m===11?{y:v.y+1,m:0}:{y:v.y,m:v.m+1});
  const days=[];
  const first=fdow(view.y,view.m); const total=dim(view.y,view.m);
  const prevT=dim(view.y,view.m===0?11:view.m-1);
  for(let i=first-1;i>=0;i--)days.push({d:prevT-i,cur:false});
  for(let i=1;i<=total;i++)days.push({d:i,cur:true});
  while(days.length%7!==0)days.push({d:days.length-total-first+1,cur:false});
  const isToday=val===todayS;
  return(
    <div className="cal-wrap">
      <div className="cal-trigger" onClick={()=>setOpen(!open)}>
        <div style={{flex:1}}>
          <div className="cal-date-txt">{isToday?"Danas":fmtLong(val)}</div>
          <div className="cal-sub">{isToday?fmtLong(val):"Klikni za promjenu"}</div>
        </div>
        <span style={{color:"#9fe1cb",fontSize:13}}>{open?"▲":"▼"}</span>
      </div>
      {open&&(
        <div className="cal-popup">
          <div className="cal-hdr">
            <button className="cal-nav" onClick={prev}>‹</button>
            <span className="cal-month">{HR_MONTHS[view.m]} {view.y}</span>
            <button className="cal-nav" onClick={next}>›</button>
          </div>
          <div className="cal-grid">
            <div className="cal-days-hdr">{HR_DAYS.map(d=><div key={d} className="cal-dh">{d}</div>)}</div>
            <div className="cal-days">
              {days.map((d,i)=>{
                if(!d.cur)return<div key={i} className="cal-day other">{d.d}</div>;
                const ds=`${view.y}-${String(view.m+1).padStart(2,"0")}-${String(d.d).padStart(2,"0")}`;
                const cls=["cal-day",ds===todayS?"istoday":"",ds===val?"sel":"",dotSet.has(ds)?"dot":""].filter(Boolean).join(" ");
                return<button key={i} className={cls} onClick={()=>{onChange(ds);setOpen(false);}}>{d.d}</button>;
              })}
            </div>
          </div>
          {val!==todayS&&<button className="cal-today-btn" onClick={()=>{onChange(todayS);setOpen(false);}}>→ Idi na danas</button>}
        </div>
      )}
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function AuthScreen() {
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState(null);
  async function submit(){
    if(!email||!pass){setMsg({e:true,t:"Upiši email i lozinku."});return;}
    setLoading(true);setMsg(null);
    if(mode==="login"){
      const{error}=await sb.auth.signInWithPassword({email,password:pass});
      if(error)setMsg({e:true,t:"Pogrešan email ili lozinka."});
    }else{
      const{error}=await sb.auth.signUp({email,password:pass});
      if(error)setMsg({e:true,t:error.message});
      else setMsg({e:false,t:"Provjeri inbox i klikni potvrdni link."});
    }
    setLoading(false);
  }
  return(
    <div className="auth">
      <div className="auth-box">
        <div className="auth-logo"><h1>Zdravlje<br/><em>Tracker</em></h1><p>Prehrana · Probava · Kilaža</p></div>
        <div className="auth-card">
          <div className="tab-sw">
            {["login","register"].map(m=><button key={m} className={`tab-sw-b${mode===m?" on":""}`} onClick={()=>setMode(m)}>{m==="login"?"Prijava":"Registracija"}</button>)}
          </div>
          <label className="auth-lbl">Email</label>
          <input className="auth-inp" type="email" placeholder="tvoj@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          <label className="auth-lbl">Lozinka</label>
          <input className="auth-inp" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          {msg&&<div className={msg.e?"msg-e":"msg-ok"}>{msg.t}</div>}
          <button className="auth-btn" onClick={submit} disabled={loading}>{loading?"Učitavanje...":mode==="login"?"Prijavi se →":"Registriraj se →"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Data hook ────────────────────────────────────────────────────────────────
function useData(uid) {
  const [nutrition,setNutrition]=useState([]);
  const [digestion,setDigestion]=useState([]);
  const [customFoods,setCustomFoods]=useState([]);
  const [weight,setWeight]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    if(!uid)return;
    (async()=>{
      setLoading(true);
      const [n,d,cf,w]=await Promise.all([
        sb.from("nutrition").select("*").eq("user_id",uid).order("created_at",{ascending:false}),
        sb.from("digestion").select("*").eq("user_id",uid).order("created_at",{ascending:false}),
        sb.from("custom_foods").select("*").eq("user_id",uid).order("created_at",{ascending:false}),
        sb.from("weight").select("*").eq("user_id",uid).order("date",{ascending:true}),
      ]);
      setNutrition(n.data||[]);
      setDigestion(d.data||[]);
      setCustomFoods((cf.data||[]).map(x=>({...x,baseAmount:x.base_amount})));
      setWeight(w.data||[]);
      setLoading(false);
    })();
  },[uid]);

  async function addNutrition(item){
    const{data:d}=await sb.from("nutrition").insert({user_id:uid,date:item.date,meal:item.meal,name:item.name,base_food:item.baseFood||item.name,quantity:item.quantity||null,unit:item.unit||null,kcal:item.kcal,protein:item.protein,carbs:item.carbs,fat:item.fat}).select().single();
    if(d)setNutrition(p=>[d,...p]);
  }
  async function removeNutrition(id){await sb.from("nutrition").delete().eq("id",id);setNutrition(p=>p.filter(x=>x.id!==id));}
  async function addDigestion(item){
    const{data:d}=await sb.from("digestion").insert({user_id:uid,date:item.date,time:item.time,no_stool:item.noStool||false,stool:item.stool,symptoms:item.symptoms,pain:item.pain,bloating:item.bloating,energy:item.energy,water:item.water,loperamide:item.loperamide||false,notes:item.notes}).select().single();
    if(d)setDigestion(p=>[d,...p]);
  }
  async function removeDigestion(id){await sb.from("digestion").delete().eq("id",id);setDigestion(p=>p.filter(x=>x.id!==id));}
  async function addCustomFood(food){
    const{data:d}=await sb.from("custom_foods").insert({user_id:uid,name:food.name,unit:food.unit,base_amount:food.baseAmount,kcal:food.kcal,protein:food.protein||0,carbs:food.carbs||0,fat:food.fat||0}).select().single();
    if(d){const cf={...d,baseAmount:d.base_amount};setCustomFoods(p=>[cf,...p]);return cf;}
    return null;
  }
  async function addWeight(item){
    // upsert by date
    const existing=weight.find(w=>w.date===item.date);
    if(existing){
      const{data:d}=await sb.from("weight").update({kg:item.kg,notes:item.notes}).eq("id",existing.id).select().single();
      if(d)setWeight(p=>p.map(w=>w.id===existing.id?d:w).sort((a,b)=>a.date.localeCompare(b.date)));
    }else{
      const{data:d}=await sb.from("weight").insert({user_id:uid,date:item.date,kg:item.kg,notes:item.notes||null}).select().single();
      if(d)setWeight(p=>[...p,d].sort((a,b)=>a.date.localeCompare(b.date)));
    }
  }
  async function removeWeight(id){await sb.from("weight").delete().eq("id",id);setWeight(p=>p.filter(x=>x.id!==id));}

  return{nutrition,digestion,customFoods,weight,loading,addNutrition,removeNutrition,addDigestion,removeDigestion,addCustomFood,addWeight,removeWeight};
}

// ─── Nutrition tab ────────────────────────────────────────────────────────────
function NutritionTab({nutrition,customFoods,addNutrition,addCustomFood,removeNutrition}){
  const [selDate,setSelDate]=useState(today());
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [qty,setQty]=useState(1);
  const [meal,setMeal]=useState("Doručak");
  const [custom,setCustom]=useState({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
  const [showCustom,setShowCustom]=useState(false);
  const [saving,setSaving]=useState(false);
  const [goal,setGoal]=useState(()=>{try{return+localStorage.getItem("kcal_goal")||2000;}catch{return 2000;}});

  const allFoods=[...BUILTIN_FOODS,...customFoods.map(cf=>({...cf,_custom:true}))];
  const filtered=search.length>1?allFoods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).slice(0,6):[];
  const dayItems=nutrition.filter(n=>n.date===selDate);
  const tot=dayItems.reduce((a,n)=>({kcal:a.kcal+n.kcal,protein:a.protein+n.protein,carbs:a.carbs+n.carbs,fat:a.fat+n.fat}),{kcal:0,protein:0,carbs:0,fat:0});
  const pct=Math.min(100,Math.round((tot.kcal/goal)*100));
  const pctC=pct>=100?"#d85a30":pct>=80?"#ba7517":"#1d9e75";
  const sp=sel?scaleFood(sel,qty):null;
  const dots=[...new Set(nutrition.map(n=>n.date))];

  function pick(f){setSel(f);setQty(f.baseAmount||f.base_amount||1);setSearch(f.name);}
  async function addSel(){if(!sel)return;setSaving(true);const s=scaleFood(sel,qty);await addNutrition({name:sel.name,...s,meal,date:selDate,baseFood:sel.name,quantity:qty,unit:sel.unit});setSearch("");setSel(null);setQty(1);setSaving(false);}
  async function saveCustom(){if(!custom.name||!custom.kcal)return;setSaving(true);const food={name:custom.name,unit:custom.unit||"g",baseAmount:+custom.baseAmount||100,kcal:+custom.kcal,protein:+custom.protein||0,carbs:+custom.carbs||0,fat:+custom.fat||0};const saved=await addCustomFood(food);if(saved){const amt=+custom.amount||food.baseAmount;const f=amt/food.baseAmount;await addNutrition({name:food.name,kcal:food.kcal*f,protein:food.protein*f,carbs:food.carbs*f,fat:food.fat*f,meal,date:selDate,quantity:amt,unit:food.unit});}setCustom({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});setShowCustom(false);setSaving(false);}

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>
      <div className="mrow">
        {[{l:"kcal",v:Math.round(tot.kcal),c:"#993c1d"},{l:"Protein",v:Math.round(tot.protein)+"g",c:"#185fa5"},{l:"Ugljik.",v:Math.round(tot.carbs)+"g",c:"#854f0b"},{l:"Masti",v:Math.round(tot.fat)+"g",c:"#0f6e56"}].map(m=>(
          <div key={m.l} className="met"><div className="met-l">{m.l}</div><div className="met-v" style={{color:m.c,fontSize:m.l==="kcal"?20:16}}>{m.v}</div></div>
        ))}
      </div>
      <div className="card" style={{padding:14,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:13,color:"#888"}}>{Math.round(tot.kcal)} / {goal} kcal · <b style={{color:"#1a1a18"}}>{pct}%</b></span>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:11,color:"#aaa"}}>Cilj:</span>
            <input type="number" value={goal} onChange={e=>{setGoal(+e.target.value);localStorage.setItem("kcal_goal",e.target.value);}} style={{width:68,padding:"4px 8px",fontSize:14,border:"1.5px solid #e8e5df",borderRadius:8,background:"#fafaf8",color:"#1a1a18",outline:"none",textAlign:"center"}}/>
          </div>
        </div>
        <div className="prog" style={{marginBottom:8}}><div className="prog-f" style={{width:`${pct}%`,background:pctC}}/></div>
        <div style={{display:"flex",gap:8}}>
          {[{l:"P",v:tot.protein,max:150,c:"#378add"},{l:"U",v:tot.carbs,max:250,c:"#ba7517"},{l:"M",v:tot.fat,max:80,c:"#1d9e75"}].map(m=>(
            <div key={m.l} style={{flex:1}}><div style={{fontSize:9.5,color:"#bbb",marginBottom:3,textTransform:"uppercase"}}>{m.l} {Math.round(m.v)}g</div><div className="prog"><div className="prog-f" style={{width:`${Math.min(100,Math.round(m.v/m.max*100))}%`,background:m.c}}/></div></div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="ttl">Dodaj obrok</div>
        <span className="lbl">Obrok</span>
        <div className="pills">{MEALS.map(m=><button key={m} className={`pill${meal===m?" g":""}`} onClick={()=>setMeal(m)}>{MEAL_ICONS[m]} {m}</button>)}</div>
        <div className="div"/>
        <input className="inp" placeholder="Pretraži hranu..." value={search} onChange={e=>{setSearch(e.target.value);if(!e.target.value)setSel(null);}}/>
        {filtered.length>0&&!sel&&(
          <div className="sugg">
            {filtered.map((f,i)=>(
              <div key={i} className={`sugg-row${f._custom?" mine":""}`} onClick={()=>pick(f)}>
                <div><div style={{fontSize:14}}>{f.name}{f._custom&&<span style={{fontSize:10,color:"#854f0b",marginLeft:6,fontWeight:500}}>MOJ UNOS</span>}</div><div style={{fontSize:11,color:"#aaa"}}>per {f.baseAmount||f.base_amount}{f.unit}</div></div>
                <div style={{display:"flex",gap:4}}><span className="bx bc">{f.kcal} kcal</span><span className="bx bb">{f.protein}g P</span></div>
              </div>
            ))}
          </div>
        )}
        {sel&&(
          <div className="qty-row">
            <span style={{fontSize:13,color:"#0f6e56",fontWeight:500,flex:"1 1 100%"}}>{sel.name}</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,color:"#0f6e56"}}>Količina:</span>
              <input type="number" className="qty-inp" value={qty} onChange={e=>setQty(Math.max(0.1,+e.target.value))} min="0.1" step={sel.unit==="g"||sel.unit==="ml"?10:1} inputMode="decimal"/>
              <span style={{fontSize:13,color:"#085041",fontWeight:500}}>{sel.unit}</span>
            </div>
            {sp&&<span style={{fontSize:12,color:"#0d5c43",fontWeight:500,flex:"1 1 100%"}}>{Math.round(sp.kcal)} kcal · {Math.round(sp.protein)}g P · {Math.round(sp.carbs)}g U · {Math.round(sp.fat)}g M</span>}
            <div style={{display:"flex",gap:8,width:"100%"}}>
              <button className="btn btn-g" style={{flex:1,opacity:saving?0.6:1}} onClick={addSel} disabled={saving}>{saving?"...":"Dodaj"}</button>
              <button className="btn btn-ghost" style={{width:52}} onClick={()=>{setSel(null);setSearch("");}}>×</button>
            </div>
          </div>
        )}
        <div style={{marginTop:12}}>
          <button className={`pill${showCustom?" a":""}`} style={{fontSize:12}} onClick={()=>setShowCustom(!showCustom)}>{showCustom?"▲ Zatvori":"＋ Nova namirnica"}</button>
        </div>
        {showCustom&&(
          <div style={{marginTop:12,padding:14,background:"#fffdf5",borderRadius:12,border:"1px solid #fac775"}}>
            <div style={{fontSize:12,color:"#854f0b",fontWeight:500,marginBottom:10}}>Sprema se trajno — bit će dostupna za pretraživanje.</div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <div style={{flex:2}}><span className="lbl">Naziv</span><input className="inp" placeholder="npr. Proteinska ploča" value={custom.name} onChange={e=>setCustom({...custom,name:e.target.value})}/></div>
              <div style={{flex:1}}><span className="lbl">Jedinica</span><input className="inp" placeholder="g/kom" value={custom.unit} onChange={e=>setCustom({...custom,unit:e.target.value})}/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
              {[["kcal","kcal"],["Baza","baseAmount"],["Pojeo","amount"],["Protein g","protein"],["Ugljik. g","carbs"],["Masti g","fat"]].map(([l,k])=>(
                <div key={k}><span className="lbl">{l}</span><input type="number" className="inp" inputMode="decimal" value={custom[k]} onChange={e=>setCustom({...custom,[k]:e.target.value})}/></div>
              ))}
            </div>
            <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={saveCustom} disabled={saving}>Spremi i dodaj</button>
          </div>
        )}
      </div>
      {dayItems.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:"#bbb",fontSize:14}}>Nema unesene hrane za {selDate===today()?"danas":fmtShort(selDate)}.</div>}
      {MEALS.map(m=>{
        const items=dayItems.filter(n=>n.meal===m);
        if(!items.length)return null;
        const mkcal=Math.round(items.reduce((a,n)=>a+n.kcal,0));
        return(
          <div key={m}>
            <div className="meal-hd"><span>{MEAL_ICONS[m]}</span><span style={{flex:1}}>{m}</span><span className="bx bz">{mkcal} kcal</span></div>
            <div className="meal-bd">
              {items.map(item=>(
                <div key={item.id} className="frow">
                  <div><div style={{fontSize:14}}>{item.base_food||item.name}</div>{item.quantity&&<div style={{fontSize:11,color:"#aaa"}}>{item.quantity} {item.unit}</div>}</div>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}><span className="bx bc">{Math.round(item.kcal)} kcal</span><span className="bx bb">{Math.round(item.protein)}g P</span><button className="rm" onClick={()=>removeNutrition(item.id)}>×</button></div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Digestion tab ────────────────────────────────────────────────────────────
function DigestionTab({digestion,addDigestion,removeDigestion}){
  const [selDate,setSelDate]=useState(today());
  const [noStool,setNoStool]=useState(false);
  const [form,setForm]=useState({time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8,loperamide:false});
  const [saving,setSaving]=useState(false);
  const [openDay,setOpenDay]=useState(null);

  const stoolTypes=[{v:"1",d:"Tvrde grudice"},{v:"2",d:"Zbijena"},{v:"3",d:"Normalna ✓"},{v:"4",d:"Mekana"},{v:"5",d:"Komadići"},{v:"6",d:"Kašasta"},{v:"7",d:"Tekuća"}];
  function toggleSym(s){setForm(f=>({...f,symptoms:f.symptoms.includes(s)?f.symptoms.filter(x=>x!==s):[...f.symptoms,s]}));}

  async function submit(){
    setSaving(true);
    await addDigestion({...form,date:selDate,noStool});
    setForm({time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8,loperamide:false});
    setNoStool(false);
    setSaving(false);
  }

  const dots=[...new Set(digestion.map(d=>d.date))];
  const selEntries=digestion.filter(e=>e.date===selDate);
  const byDate={};
  digestion.forEach(e=>{if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);});
  const sortedDates=Object.keys(byDate).sort((a,b)=>b.localeCompare(a)).slice(0,30);

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>
      <div className="card">
        <div className="ttl">Unos za {selDate===today()?"danas":fmtShort(selDate)}</div>

        {/* No stool toggle */}
        <button className={`nostool-btn${noStool?" active":""}`} onClick={()=>setNoStool(!noStool)} style={{marginBottom:14}}>
          {noStool?"✓ Nisam imao stolicu cijeli dan":"Nisam imao stolicu cijeli dan"}
        </button>

        {!noStool&&(
          <>
            <div style={{marginBottom:14}}>
              <span className="lbl">Vrijeme</span>
              <input type="time" className="inp" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/>
            </div>
            <span className="lbl">Bristol skala</span>
            <div className="pills" style={{marginBottom:14}}>
              {stoolTypes.map(t=>(
                <button key={t.v} className={`pill${form.stool===t.v?" t":""}`} style={{textAlign:"center"}} onClick={()=>setForm({...form,stool:t.v})}>
                  <div style={{fontWeight:600,fontSize:12}}>Tip {t.v}</div>
                  <div style={{fontSize:10,opacity:.75}}>{t.d}</div>
                </button>
              ))}
            </div>
          </>
        )}

        <span className="lbl">Simptomi</span>
        <div className="pills">{DIGEST_SYMPTOMS.map(s=><button key={s} className={`pill${form.symptoms.includes(s)?" c":""}`} onClick={()=>toggleSym(s)}>{s}</button>)}</div>

        {/* Loperamide / Imodium toggle */}
        <button
          className={`pill${form.loperamide?" red":""}`}
          style={{marginBottom:14,fontSize:13}}
          onClick={()=>setForm(f=>({...f,loperamide:!f.loperamide}))}>
          💊 {form.loperamide?"✓ Uzeo sam Loperamid (Imodium)":"Uzeo sam Loperamid (Imodium)"}
        </button>

        {[{k:"pain",l:"Bol",max:10,c:"#d85a30"},{k:"bloating",l:"Nadutost",max:10,c:"#ba7517"},{k:"energy",l:"Energija",max:5,c:"#1d9e75"},{k:"water",l:"Čaše vode",max:15,c:"#378add"}].map(({k,l,max,c})=>(
          <div key={k} className="rrow">
            <div className="rlbl"><span>{l}</span><span style={{fontWeight:500,color:c}}>{form[k]}/{max}</span></div>
            <input type="range" min={0} max={max} step={1} value={form[k]} onChange={e=>setForm({...form,[k]:+e.target.value})} style={{accentColor:c}}/>
          </div>
        ))}

        <span className="lbl">Bilješka</span>
        <textarea className="inp" placeholder="Kako se osjećaš?" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} style={{marginBottom:14}}/>
        <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={submit} disabled={saving}>{saving?"Spremanje...":"Spremi unos"}</button>
      </div>

      {selEntries.length>0&&(
        <div style={{marginBottom:12}}>
          <div className="lbl" style={{marginBottom:8}}>Unosi za {fmtShort(selDate)}</div>
          {selEntries.map(e=>(
            <div key={e.id} className="card-sm">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                  {e.no_stool
                    ?<span className="bx bred">Bez stolice</span>
                    :<><span style={{fontSize:14,fontWeight:500}}>{e.time}</span><span className="bx bt">Tip {e.stool}</span></>
                  }
                  {e.loperamide&&<span className="bx bred">💊 Loperamid</span>}
                </div>
                <button className="rm" onClick={()=>removeDigestion(e.id)}>×</button>
              </div>
              <div style={{display:"flex",gap:10,fontSize:12,color:"#888",flexWrap:"wrap"}}>
                {e.pain>0&&<span style={{color:"#993c1d"}}>Bol {e.pain}/10</span>}
                {e.bloating>0&&<span style={{color:"#854f0b"}}>Nadutost {e.bloating}/10</span>}
                <span style={{color:"#0f6e56"}}>Energija {e.energy}/5</span>
                <span style={{color:"#185fa5"}}>💧 {e.water}x</span>
              </div>
              {e.symptoms&&e.symptoms.length>0&&<div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>{e.symptoms.map(s=><span key={s} className="bx bc">{s}</span>)}</div>}
              {e.notes&&<div style={{marginTop:5,fontSize:12,color:"#888",fontStyle:"italic"}}>{e.notes}</div>}
            </div>
          ))}
        </div>
      )}

      {selEntries.length===0&&<div style={{textAlign:"center",padding:"16px 0",color:"#bbb",fontSize:14,marginBottom:12}}>Nema unosa za {selDate===today()?"danas":fmtShort(selDate)}.</div>}

      <div className="lbl" style={{marginBottom:8,marginTop:4}}>Povijest po danima</div>
      {sortedDates.map(date=>{
        const entries=byDate[date];
        const avgPain=(entries.reduce((a,e)=>a+e.pain,0)/entries.length).toFixed(1);
        const avgEnergy=(entries.reduce((a,e)=>a+e.energy,0)/entries.length).toFixed(1);
        const allSyms=[...new Set(entries.flatMap(e=>e.symptoms||[]))];
        const hasLoper=entries.some(e=>e.loperamide);
        const hasNoStool=entries.some(e=>e.no_stool);
        const isOpen=openDay===date;
        return(
          <div key={date} className="dh-day">
            <div className="dh-hdr" onClick={()=>setOpenDay(isOpen?null:date)}>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:500}}>{fmtLong(date)}</div>
                <div style={{fontSize:12,color:"#aaa",marginTop:2,display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span>{entries.length} {entries.length===1?"unos":"unosa"}</span>
                  <span>Bol {avgPain}/10</span>
                  <span>Energija {avgEnergy}/5</span>
                </div>
              </div>
              <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
                {hasNoStool&&<span className="bx bred">Bez stolice</span>}
                {hasLoper&&<span className="bx bred">💊</span>}
                {allSyms.slice(0,1).map(s=><span key={s} className="bx bc">{s}</span>)}
                <span style={{color:"#bbb",fontSize:14,marginLeft:4}}>{isOpen?"▲":"▼"}</span>
              </div>
            </div>
            {isOpen&&(
              <div className="dh-body">
                {entries.map(e=>(
                  <div key={e.id} style={{padding:"10px 0",borderBottom:"1px solid #f5f3ef"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {e.no_stool?<span className="bx bred">Bez stolice</span>:<><span style={{fontSize:13,fontWeight:500}}>{e.time}</span><span className="bx bt">Tip {e.stool}</span></>}
                        {e.loperamide&&<span className="bx bred">💊 Loperamid</span>}
                      </div>
                      <button className="rm" onClick={()=>removeDigestion(e.id)}>×</button>
                    </div>
                    <div style={{display:"flex",gap:8,fontSize:12,color:"#888",flexWrap:"wrap"}}>
                      {e.pain>0&&<span style={{color:"#993c1d"}}>Bol {e.pain}/10</span>}
                      {e.bloating>0&&<span style={{color:"#854f0b"}}>Nadutost {e.bloating}/10</span>}
                      <span style={{color:"#0f6e56"}}>Energija {e.energy}/5</span>
                      <span style={{color:"#185fa5"}}>💧 {e.water}x</span>
                    </div>
                    {e.symptoms&&e.symptoms.length>0&&<div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>{e.symptoms.map(s=><span key={s} className="bx bc">{s}</span>)}</div>}
                    {e.notes&&<div style={{marginTop:4,fontSize:12,color:"#888",fontStyle:"italic"}}>{e.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Weight tab ───────────────────────────────────────────────────────────────
function WeightTab({weight,addWeight,removeWeight}){
  const [selDate,setSelDate]=useState(today());
  const [kg,setKg]=useState("");
  const [notes,setNotes]=useState("");
  const [saving,setSaving]=useState(false);
  const {Chart}=window;

  const existing=weight.find(w=>w.date===selDate);
  useEffect(()=>{
    if(existing){setKg(String(existing.kg));setNotes(existing.notes||"");}
    else{setKg("");setNotes("");}
  },[selDate,existing?.id]);

  async function submit(){
    if(!kg||isNaN(+kg))return;
    setSaving(true);
    await addWeight({date:selDate,kg:+kg,notes});
    setSaving(false);
  }

  // stats
  const sorted=weight.slice().sort((a,b)=>a.date.localeCompare(b.date));
  const latest=sorted[sorted.length-1];
  const oldest=sorted[0];
  const diff=latest&&oldest&&latest!==oldest?+(latest.kg-oldest.kg).toFixed(1):null;

  // last 30 entries for chart
  const chartData=sorted.slice(-30);

  useEffect(()=>{
    if(chartData.length<2)return;
    const el=document.getElementById("wc1");if(!el)return;
    const c=new Chart(el,{
      type:"line",
      data:{
        labels:chartData.map(w=>fmtShort(w.date)),
        datasets:[{
          data:chartData.map(w=>w.kg),
          borderColor:"#1d9e75",
          backgroundColor:"rgba(29,158,117,0.08)",
          tension:0.3,
          pointRadius:4,
          pointBackgroundColor:"#0f6e56",
          fill:true,
          borderWidth:2,
        }]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{
          y:{grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"},beginAtZero:false},
          x:{grid:{display:false},ticks:{autoSkip:true,maxTicksLimit:8,font:{size:11},color:"#aaa",maxRotation:45}}
        }
      }
    });
    return()=>c.destroy();
  },[weight]);

  const dots=weight.map(w=>w.date);

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>

      {/* summary metrics */}
      {latest&&(
        <div className="mrow-2">
          <div className="met">
            <div className="met-l">Trenutna kilaža</div>
            <div className="met-v" style={{color:"#0f6e56",fontSize:26}}>{latest.kg}<span className="met-u">kg</span></div>
            <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{fmtShort(latest.date)}</div>
          </div>
          <div className="met">
            <div className="met-l">{diff!==null?(diff>0?"Promjena (rast)":"Promjena (pad)"):"Početna kilaža"}</div>
            <div className="met-v" style={{color:diff===null?"#888":diff>0?"#d85a30":"#0f6e56",fontSize:26}}>
              {diff!==null?(diff>0?"+":"")+diff:oldest?.kg??"-"}
              <span className="met-u">kg</span>
            </div>
            <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{diff!==null?`od ${fmtShort(oldest.date)}`:"početak"}</div>
          </div>
        </div>
      )}

      {/* input */}
      <div className="card">
        <div className="ttl">{existing?"Uredi mjerenje":"Unesi kilažu"}</div>
        <div style={{display:"flex",gap:10,alignItems:"flex-end",marginBottom:12}}>
          <div style={{flex:1}}>
            <span className="lbl">Kilaža (kg)</span>
            <input type="number" className="inp" inputMode="decimal" step="0.1" placeholder="npr. 82.5" value={kg} onChange={e=>setKg(e.target.value)} style={{fontSize:20,fontWeight:300,textAlign:"center"}}/>
          </div>
        </div>
        <span className="lbl">Bilješka (opcionalno)</span>
        <input className="inp" placeholder="npr. Jutro, natašte" value={notes} onChange={e=>setNotes(e.target.value)} style={{marginBottom:14}}/>
        <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={submit} disabled={saving}>
          {saving?"Spremanje...":(existing?"Spremi promjenu":"Dodaj mjerenje")}
        </button>
      </div>

      {/* chart */}
      {chartData.length>=2&&(
        <div className="card">
          <div className="ttl">Graf kilaže</div>
          <div style={{fontSize:12,color:"#aaa",marginBottom:8}}>Zadnjih {chartData.length} mjerenja</div>
          <div className="wchart"><canvas id="wc1"></canvas></div>
        </div>
      )}

      {/* history */}
      {sorted.length>0&&(
        <div className="card">
          <div className="ttl">Povijest mjerenja</div>
          {sorted.slice().reverse().map((w,i,arr)=>{
            const prev=arr[i+1];
            const delta=prev?+(w.kg-prev.kg).toFixed(1):null;
            return(
              <div key={w.id} className="frow">
                <div>
                  <div style={{fontSize:14,fontWeight:500}}>{fmtLong(w.date)}</div>
                  {w.notes&&<div style={{fontSize:12,color:"#888",marginTop:2}}>{w.notes}</div>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:16,fontWeight:300,fontFamily:"'Fraunces',serif"}}>{w.kg} <span style={{fontSize:12,color:"#aaa"}}>kg</span></div>
                    {delta!==null&&<div style={{fontSize:11,color:delta>0?"#d85a30":delta<0?"#0f6e56":"#aaa"}}>{delta>0?"+":""}{delta} kg</div>}
                  </div>
                  <button className="rm" onClick={()=>removeWeight(w.id)}>×</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {weight.length===0&&<div style={{textAlign:"center",padding:"32px 0",color:"#bbb",fontSize:14}}>Još nema unesenih mjerenja.<br/>Dodaj prvo mjerenje gore.</div>}
    </div>
  );
}

// ─── Stats tab ────────────────────────────────────────────────────────────────
function StatsTab({nutrition,digestion}){
  const [view,setView]=useState("week");
  const {Chart}=window;

  function lastN(n){return Array.from({length:n},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(n-1-i));return toDS(d);});}
  const weeks=Array.from({length:8},(_,i)=>{
    const end=new Date();end.setDate(end.getDate()-i*7);
    const start=new Date(end);start.setDate(start.getDate()-6);
    const days=[];for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1))days.push(toDS(new Date(d)));
    const label=i===0?"Ovaj tjedan":i===1?"Prošli tjedan":`${fmtShort(toDS(start))}`;
    const ni=nutrition.filter(n=>days.includes(n.date));
    const kcal=Math.round(ni.reduce((a,n)=>a+n.kcal,0));
    const dwd=days.filter(d=>nutrition.some(n=>n.date===d)).length;
    const di=digestion.filter(d=>days.includes(d.date));
    const avgE=di.length?+(di.reduce((a,d)=>a+d.energy,0)/di.length).toFixed(1):null;
    return{label,kcal,avgKcal:dwd>0?Math.round(kcal/dwd):0,dwd,avgE};
  }).reverse();

  const months=Array.from({length:6},(_,i)=>{
    const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-i);
    const pfx=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    const label=`${HR_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    const ni=nutrition.filter(n=>n.date.startsWith(pfx));
    const kcal=Math.round(ni.reduce((a,n)=>a+n.kcal,0));
    const dwd=[...new Set(ni.map(n=>n.date))].length;
    const di=digestion.filter(d=>d.date.startsWith(pfx));
    const avgE=di.length?+(di.reduce((a,d)=>a+d.energy,0)/di.length).toFixed(1):null;
    return{label,kcal,avgKcal:dwd>0?Math.round(kcal/dwd):0,dwd,avgE};
  }).reverse();

  const maxWk=Math.max(...weeks.map(w=>w.kcal),1);
  const maxMo=Math.max(...months.map(m=>m.kcal),1);

  const days14=lastN(14);
  const lbl14=days14.map(d=>fmtShort(d));
  const bd14=days14.map(d=>{
    const n=nutrition.filter(x=>x.date===d);
    const dg=digestion.filter(x=>x.date===d);
    return{kcal:Math.round(n.reduce((a,x)=>a+x.kcal,0)),protein:Math.round(n.reduce((a,x)=>a+x.protein,0)),carbs:Math.round(n.reduce((a,x)=>a+x.carbs,0)),fat:Math.round(n.reduce((a,x)=>a+x.fat,0)),pain:dg.length?+(dg.reduce((a,x)=>a+x.pain,0)/dg.length).toFixed(1):null,energy:dg.length?+(dg.reduce((a,x)=>a+x.energy,0)/dg.length).toFixed(1):null};
  });

  useEffect(()=>{
    if(view!=="charts")return;
    const charts=[];
    const mk=(id,type,datasets,extra={})=>{
      const el=document.getElementById(id);if(!el)return;
      charts.push(new Chart(el,{type,data:{labels:lbl14,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"}},x:{grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11},color:"#aaa"}}},...extra}}));
    };
    mk("gc1","bar",[{data:bd14.map(d=>d.kcal),backgroundColor:"#f0997b",borderRadius:5,borderSkipped:false}]);
    mk("gc2","bar",[{label:"P",data:bd14.map(d=>d.protein),backgroundColor:"#85b7eb",borderRadius:3,stack:"m"},{label:"U",data:bd14.map(d=>d.carbs),backgroundColor:"#ef9f27",borderRadius:3,stack:"m"},{label:"M",data:bd14.map(d=>d.fat),backgroundColor:"#97c459",borderRadius:3,stack:"m"}],{scales:{x:{stacked:true,grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11},color:"#aaa"}},y:{stacked:true,beginAtZero:true,grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"}}}});
    mk("gc3","line",[{data:bd14.map(d=>d.pain),borderColor:"#d85a30",backgroundColor:"transparent",tension:.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#d85a30"},{data:bd14.map(d=>d.energy),borderColor:"#1d9e75",backgroundColor:"transparent",tension:.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#1d9e75"}]);
    return()=>charts.forEach(c=>c.destroy());
  },[view,nutrition,digestion]);

  return(
    <div>
      <div className="pills" style={{marginBottom:16}}>
        {[{id:"week",l:"Tjedni"},{id:"month",l:"Mjesečni"},{id:"charts",l:"Grafovi"}].map(v=>(
          <button key={v.id} className={`pill${view===v.id?" dk":""}`} onClick={()=>setView(v.id)}>{v.l}</button>
        ))}
      </div>

      {view==="week"&&(
        <>
          <div className="card">
            <div className="ttl">Kalorije po tjednima</div>
            {weeks.map((w,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13,fontWeight:i===weeks.length-1?500:400}}>{w.label}</div><div style={{fontSize:11,color:"#aaa"}}>{w.dwd} dana</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:`${Math.round(w.kcal/maxWk*100)}%`,background:i===weeks.length-1?"#1a1a18":"#d4d1cb"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right"}}><div style={{fontSize:13,fontWeight:500}}>{w.kcal.toLocaleString()}</div><div style={{fontSize:11,color:"#aaa"}}>~{w.avgKcal}/dan</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ttl">Energija po tjednima</div>
            {weeks.map((w,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13}}>{w.label}</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:w.avgE?`${Math.round(w.avgE/5*100)}%`:"0%",background:"#1d9e75"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right",fontSize:13,fontWeight:500,color:"#0f6e56"}}>{w.avgE??"-"}<span style={{fontSize:11,color:"#aaa",fontWeight:400}}>/5</span></div>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="month"&&(
        <>
          <div className="card">
            <div className="ttl">Kalorije po mjesecima</div>
            {months.map((m,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13,fontWeight:i===months.length-1?500:400}}>{m.label}</div><div style={{fontSize:11,color:"#aaa"}}>{m.dwd} dana</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:`${Math.round(m.kcal/maxMo*100)}%`,background:i===months.length-1?"#1a1a18":"#d4d1cb"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right"}}><div style={{fontSize:13,fontWeight:500}}>{m.kcal.toLocaleString()}</div><div style={{fontSize:11,color:"#aaa"}}>~{m.avgKcal}/dan</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ttl">Energija po mjesecima</div>
            {months.map((m,i)=>(
              <div key={i} className="wrow">
                <div style={{width:110,flexShrink:0}}><div style={{fontSize:13}}>{m.label}</div></div>
                <div className="wbar-w"><div className="wbar" style={{width:m.avgE?`${Math.round(m.avgE/5*100)}%`:"0%",background:"#1d9e75"}}/></div>
                <div style={{width:80,flexShrink:0,textAlign:"right",fontSize:13,fontWeight:500,color:"#0f6e56"}}>{m.avgE??"-"}<span style={{fontSize:11,color:"#aaa",fontWeight:400}}>/5</span></div>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="charts"&&(
        <>
          {[{id:"gc1",title:"Kalorije (zadnjih 14 dana)",legend:[{c:"#f0997b",l:"kcal"}]},{id:"gc2",title:"Makronutrijenti",legend:[{c:"#85b7eb",l:"Proteini"},{c:"#ef9f27",l:"Ugljikohidrati"},{c:"#97c459",l:"Masti"}]},{id:"gc3",title:"Bol i energija",legend:[{c:"#d85a30",l:"Bol (0-10)"},{c:"#1d9e75",l:"Energija (0-5)"}]}].map(({id,title,legend})=>(
            <div key={id} className="card">
              <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:300,marginBottom:8}}>{title}</div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>{legend.map(l=><div key={l.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#888"}}><div style={{width:10,height:10,borderRadius:2,background:l.c}}/>{l.l}</div>)}</div>
              <div style={{position:"relative",height:170}}><canvas id={id}></canvas></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [session,setSession]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [tab,setTab]=useState("nutrition");
  const {nutrition,digestion,customFoods,weight,loading,addNutrition,removeNutrition,addDigestion,removeDigestion,addCustomFood,addWeight,removeWeight}=useData(session?.user?.id);

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setAuthLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,s)=>{setSession(s);setAuthLoading(false);});
    return()=>subscription.unsubscribe();
  },[]);

  if(authLoading)return<div className="zt-load"><div className="zt-load-in">Zdravlje <em style={{color:"#9fe1cb"}}>Tracker</em></div></div>;
  if(!session)return<AuthScreen/>;

  const tabs=[{id:"nutrition",l:"🥗 Prehrana"},{id:"digestion",l:"🫁 Probava"},{id:"weight",l:"⚖️ Kilaža"},{id:"stats",l:"📊 Statistike"}];

  return(
    <>
      <style>{CSS}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
      <div className="zt">
        <div className="zt-hdr">
          <div className="zt-hdr-in">
            <div className="zt-logo">Zdravlje <em>Tracker</em></div>
            <button className="pill dk" style={{fontSize:11,padding:"6px 12px"}} onClick={()=>sb.auth.signOut()}>Odjava</button>
          </div>
          <div className="zt-tabbar">
            {tabs.map(t=><button key={t.id} className={`zt-tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>{t.l}</button>)}
          </div>
        </div>
        <div className="zt-body">
          {loading
            ?<div style={{textAlign:"center",padding:"50px 0",color:"#bbb",fontSize:14}}>Učitavanje...</div>
            :<>
              {tab==="nutrition"&&<NutritionTab nutrition={nutrition} customFoods={customFoods} addNutrition={addNutrition} addCustomFood={addCustomFood} removeNutrition={removeNutrition}/>}
              {tab==="digestion"&&<DigestionTab digestion={digestion} addDigestion={addDigestion} removeDigestion={removeDigestion}/>}
              {tab==="weight"&&<WeightTab weight={weight} addWeight={addWeight} removeWeight={removeWeight}/>}
              {tab==="stats"&&<StatsTab nutrition={nutrition} digestion={digestion}/>}
            </>
          }
        </div>
      </div>
    </>
  );
}
