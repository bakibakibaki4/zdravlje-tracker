import React, { useState, useEffect } from "react";
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

function toDateStr(d) { return d.toISOString().slice(0,10); }
function today() { return toDateStr(new Date()); }
function formatDate(d) { return new Date(d+"T00:00:00").toLocaleDateString("hr-HR",{day:"numeric",month:"short"}); }
function formatDateLong(d) { const dt=new Date(d+"T00:00:00"); return dt.toLocaleDateString("hr-HR",{weekday:"long",day:"numeric",month:"long"}); }
function scaleFood(food, amount) {
  const f = amount/(food.baseAmount||food.base_amount||1);
  return {kcal:food.kcal*f,protein:food.protein*f,carbs:food.carbs*f,fat:food.fat*f};
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#f5f3ef;}
input,textarea,button,select{font-family:'DM Sans',sans-serif;}
input[type="date"],input[type="time"]{color-scheme:light dark;}

.zt{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f5f3ef;color:#1a1a18;}
.zt-hdr{background:#1a1a18;padding:24px 28px 0;}
.zt-hdr-in{max-width:720px;margin:0 auto;display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:0;}
.zt-logo{font-family:'Fraunces',serif;font-size:30px;font-weight:300;color:#f5f3ef;letter-spacing:-1px;line-height:1;}
.zt-logo em{color:#9fe1cb;font-style:italic;}
.zt-tagline{font-size:11px;color:#555;margin-top:4px;letter-spacing:1.2px;text-transform:uppercase;}
.zt-tabbar{max-width:720px;margin:0 auto;display:flex;border-top:1px solid #2a2a28;overflow-x:auto;scrollbar-width:none;}
.zt-tab{padding:11px 20px;background:none;border:none;font-size:13px;font-weight:400;cursor:pointer;color:#555;border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .15s,border-color .15s;white-space:nowrap;}
.zt-tab.on{color:#f5f3ef;border-bottom-color:#1d9e75;font-weight:500;}
.zt-body{max-width:720px;margin:0 auto;padding:24px 20px 80px;}

/* cards */
.card{background:#fff;border-radius:18px;padding:20px;margin-bottom:14px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04);}
.card-sm{background:#fff;border-radius:14px;padding:16px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,.05);}

/* typography */
.ttl{font-family:'Fraunces',serif;font-size:19px;font-weight:300;color:#1a1a18;margin-bottom:16px;letter-spacing:-.3px;}
.lbl{font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:.8px;color:#888;margin-bottom:6px;display:block;}

/* metrics */
.mrow{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;}
.met{flex:1;min-width:75px;background:#f5f3ef;border-radius:14px;padding:13px 14px;}
.met-l{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.7px;color:#888;margin-bottom:4px;}
.met-v{font-size:22px;font-weight:300;font-family:'Fraunces',serif;line-height:1;color:#1a1a18;}
.met-u{font-size:11px;font-family:'DM Sans',sans-serif;color:#bbb;margin-left:2px;font-weight:400;}

/* progress */
.prog{height:5px;background:#f0ede8;border-radius:99px;overflow:hidden;}
.prog-f{height:100%;border-radius:99px;transition:width .5s cubic-bezier(.4,0,.2,1);}

/* pills */
.pills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.pill{padding:6px 13px;border-radius:99px;font-size:12.5px;cursor:pointer;border:1px solid #e8e5df;background:#f5f3ef;color:#666;font-weight:400;transition:all .12s;}
.pill:hover{border-color:#ccc;}
.pill.g{background:#e1f5ee;color:#0f6e56;border-color:#9fe1cb;font-weight:500;}
.pill.b{background:#e6f1fb;color:#185fa5;border-color:#b5d4f4;font-weight:500;}
.pill.c{background:#faece7;color:#993c1d;border-color:#f5c4b3;font-weight:500;}
.pill.a{background:#faeeda;color:#854f0b;border-color:#fac775;font-weight:500;}
.pill.t{background:#e1f5ee;color:#085041;border-color:#1d9e75;font-weight:500;}
.pill.dk{background:#2a2a28;color:#e0e0de;border-color:#3a3a38;font-weight:500;}

/* badges */
.bx{display:inline-flex;align-items:center;padding:3px 8px;border-radius:7px;font-size:11.5px;font-weight:500;}
.bc{background:#faece7;color:#993c1d;}
.bb{background:#e6f1fb;color:#185fa5;}
.bg{background:#e1f5ee;color:#0f6e56;}
.bt{background:#e1f5ee;color:#085041;}
.ba{background:#faeeda;color:#854f0b;}
.bz{background:#f5f3ef;color:#666;}
.bdk{background:#2a2a28;color:#ccc;}

/* inputs */
.inp{width:100%;padding:10px 14px;border:1px solid #e8e5df;border-radius:11px;font-size:14px;background:#fafaf8;color:#1a1a18;outline:none;transition:border-color .15s,box-shadow .15s;}
.inp:focus{border-color:#1d9e75;box-shadow:0 0 0 3px rgba(29,158,117,.1);background:#fff;}
textarea.inp{resize:vertical;min-height:68px;line-height:1.6;}

/* buttons */
.btn{padding:10px 20px;border-radius:11px;font-size:13.5px;font-weight:500;cursor:pointer;border:none;background:#1a1a18;color:#f5f3ef;transition:all .12s;}
.btn:hover{background:#2a2a28;}
.btn:active{transform:scale(.98);}
.btn-g{background:#0f6e56;color:#e1f5ee;}
.btn-g:hover{background:#085041;}
.btn-ghost{background:transparent;color:#666;border:1px solid #e8e5df;}
.btn-ghost:hover{background:#f5f3ef;}
.rm{background:none;border:none;cursor:pointer;color:#ccc;font-size:18px;padding:0 4px;transition:color .12s;line-height:1;}
.rm:hover{color:#d85a30;}

/* divider */
.div{height:1px;background:#f0ede8;margin:14px 0;}

/* food suggestions */
.sugg{border:1px solid #e8e5df;border-radius:12px;overflow:hidden;margin-top:6px;box-shadow:0 4px 20px rgba(0,0,0,.08);}
.sugg-row{padding:11px 14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f5f3ef;background:#fff;transition:background .1s;}
.sugg-row:last-child{border-bottom:none;}
.sugg-row:hover{background:#fafaf8;}
.sugg-row.mine{background:#fffdf5;}
.sugg-row.mine:hover{background:#fff9e8;}

/* qty row */
.qty-row{margin-top:10px;padding:14px 16px;background:#e1f5ee;border-radius:12px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;animation:si .2s ease;}
@keyframes si{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.qty-inp{width:76px;padding:7px 10px;border:1.5px solid #1d9e75;border-radius:9px;font-size:14px;background:#fff;color:#0f6e56;font-weight:500;outline:none;text-align:center;}

/* meal sections */
.meal-hd{display:flex;align-items:center;gap:8px;padding:10px 16px;background:#f5f3ef;border-radius:12px 12px 0 0;font-size:13px;font-weight:500;color:#555;}
.meal-bd{background:#fff;border:1px solid #f0ede8;border-top:none;border-radius:0 0 12px 12px;padding:0 16px;margin-bottom:8px;}
.frow{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f8f6f2;}
.frow:last-child{border-bottom:none;}

/* range */
.rrow{margin-bottom:15px;}
.rlbl{display:flex;justify-content:space-between;font-size:13px;color:#666;margin-bottom:7px;}
input[type=range]{width:100%;accent-color:#1d9e75;}

/* ── CALENDAR ── */
.cal-wrap{position:relative;}
.cal-trigger{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#1a1a18;border-radius:12px;cursor:pointer;user-select:none;margin-bottom:16px;}
.cal-trigger-date{font-family:'Fraunces',serif;font-size:17px;font-weight:300;color:#f5f3ef;flex:1;}
.cal-trigger-sub{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.8px;}
.cal-nav{background:none;border:none;cursor:pointer;color:#9fe1cb;font-size:18px;padding:4px 8px;transition:color .12s;}
.cal-nav:hover{color:#fff;}
.cal-popup{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.15);z-index:100;overflow:hidden;animation:si .18s ease;}
.cal-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#1a1a18;}
.cal-month{font-family:'Fraunces',serif;font-size:15px;font-weight:300;color:#f5f3ef;}
.cal-btn{background:none;border:none;cursor:pointer;color:#9fe1cb;font-size:16px;padding:4px 10px;transition:color .12s;}
.cal-btn:hover{color:#fff;}
.cal-grid{padding:10px 12px 14px;}
.cal-days-hdr{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:4px;}
.cal-dh{text-align:center;font-size:11px;font-weight:500;color:#bbb;padding:4px 0;text-transform:uppercase;letter-spacing:.5px;}
.cal-days{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
.cal-day{text-align:center;padding:7px 4px;border-radius:8px;font-size:13px;cursor:pointer;transition:all .12s;color:#1a1a18;background:none;border:none;font-family:'DM Sans',sans-serif;}
.cal-day:hover{background:#f5f3ef;}
.cal-day.other{color:#ccc;}
.cal-day.today{font-weight:600;color:#0f6e56;}
.cal-day.sel{background:#1a1a18!important;color:#f5f3ef!important;font-weight:500;}
.cal-day.has-data{position:relative;}
.cal-day.has-data::after{content:'';position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:#1d9e75;}
.cal-day.sel.has-data::after{background:#9fe1cb;}
.cal-today-btn{display:block;width:calc(100% - 24px);margin:0 12px 12px;padding:8px;background:#f5f3ef;border:none;border-radius:9px;font-size:13px;color:#1a1a18;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;transition:background .12s;}
.cal-today-btn:hover{background:#e8e5df;}

/* digest history */
.dh-day{background:#fff;border-radius:14px;margin-bottom:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.dh-day-hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;cursor:pointer;background:#fff;transition:background .1s;}
.dh-day-hdr:hover{background:#fafaf8;}
.dh-day-body{padding:0 16px 12px;}

/* stats summary rows */
.week-row{display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f5f3ef;gap:10px;}
.week-row:last-child{border-bottom:none;}
.week-bar-wrap{flex:1;height:6px;background:#f0ede8;border-radius:99px;overflow:hidden;}
.week-bar{height:100%;border-radius:99px;transition:width .4s;}

/* auth */
.auth{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#1a1a18;}
.auth-box{width:100%;max-width:400px;padding:24px;}
.auth-logo{text-align:center;margin-bottom:36px;}
.auth-logo h1{font-family:'Fraunces',serif;font-size:40px;font-weight:300;color:#f5f3ef;letter-spacing:-1.5px;line-height:1;}
.auth-logo h1 em{color:#9fe1cb;font-style:italic;}
.auth-logo p{font-size:11px;color:#555;margin-top:8px;letter-spacing:1.5px;text-transform:uppercase;}
.auth-card{background:#242422;border-radius:20px;padding:28px;border:1px solid #2e2e2c;}
.tab-sw{display:flex;background:#1a1a18;border-radius:11px;padding:3px;margin-bottom:22px;}
.tab-sw-b{flex:1;padding:9px;border-radius:9px;border:none;font-size:13.5px;font-weight:500;cursor:pointer;transition:all .15s;background:transparent;color:#666;}
.tab-sw-b.on{background:#2e2e2c;color:#f5f3ef;}
.auth-inp{width:100%;padding:11px 14px;border:1px solid #2e2e2c;border-radius:11px;font-size:14px;background:#1a1a18;color:#f5f3ef;outline:none;transition:border-color .15s;margin-bottom:14px;}
.auth-inp:focus{border-color:#1d9e75;}
.auth-inp::placeholder{color:#444;}
.auth-lbl{font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:.8px;color:#555;margin-bottom:6px;display:block;}
.auth-btn{width:100%;padding:12px;border-radius:11px;border:none;font-size:14px;font-weight:500;cursor:pointer;background:#0f6e56;color:#e1f5ee;transition:all .15s;margin-top:6px;}
.auth-btn:hover{background:#085041;}
.msg-err{padding:10px 14px;border-radius:10px;font-size:13px;background:#3a1a1a;color:#f5c4b3;margin-bottom:14px;}
.msg-ok{padding:10px 14px;border-radius:10px;font-size:13px;background:#0d2e25;color:#9fe1cb;margin-bottom:14px;}
.zt-loading{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#1a1a18;}
.zt-loading-in{text-align:center;font-family:'Fraunces',serif;font-size:22px;font-weight:300;color:#f5f3ef;}
`;

// ─── Calendar component ───────────────────────────────────────────────────────
function CalendarPicker({ selectedDate, onChange, dateDots = [] }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const d = new Date(selectedDate + "T00:00:00");
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const todayStr = today();
  const dotSet = new Set(dateDots);

  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
  function firstDayOfWeek(y, m) { let d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

  function prevMonth() {
    setView(v => v.month === 0 ? {year:v.year-1,month:11} : {year:v.year,month:v.month-1});
  }
  function nextMonth() {
    setView(v => v.month === 11 ? {year:v.year+1,month:0} : {year:v.year,month:v.month+1});
  }

  const days = [];
  const first = firstDayOfWeek(view.year, view.month);
  const total = daysInMonth(view.year, view.month);
  const prevTotal = daysInMonth(view.year, view.month === 0 ? 11 : view.month - 1);

  for (let i = first - 1; i >= 0; i--) days.push({ day: prevTotal - i, cur: false });
  for (let i = 1; i <= total; i++) days.push({ day: i, cur: true });
  while (days.length % 7 !== 0) days.push({ day: days.length - total - first + 1, cur: false });

  const selDateObj = new Date(selectedDate + "T00:00:00");
  const isToday = selectedDate === todayStr;

  return (
    <div className="cal-wrap">
      <div className="cal-trigger" onClick={() => setOpen(!open)}>
        <div>
          <div className="cal-trigger-date">{isToday ? "Danas" : formatDateLong(selectedDate)}</div>
          <div className="cal-trigger-sub">{isToday ? formatDateLong(selectedDate) : "Klikni za promjenu datuma"}</div>
        </div>
        <span style={{color:"#9fe1cb",fontSize:14}}>{open?"▲":"▼"}</span>
      </div>

      {open && (
        <div className="cal-popup">
          <div className="cal-header">
            <button className="cal-btn" onClick={prevMonth}>‹</button>
            <span className="cal-month">{HR_MONTHS[view.month]} {view.year}</span>
            <button className="cal-btn" onClick={nextMonth}>›</button>
          </div>
          <div className="cal-grid">
            <div className="cal-days-hdr">
              {HR_DAYS.map(d => <div key={d} className="cal-dh">{d}</div>)}
            </div>
            <div className="cal-days">
              {days.map((d, i) => {
                if (!d.cur) return <div key={i} className="cal-day other">{d.day}</div>;
                const ds = `${view.year}-${String(view.month+1).padStart(2,"0")}-${String(d.day).padStart(2,"0")}`;
                const isSel = ds === selectedDate;
                const isT = ds === todayStr;
                const hasDot = dotSet.has(ds);
                return (
                  <button key={i}
                    className={`cal-day${isT?" today":""}${isSel?" sel":""}${hasDot?" has-data":""}`}
                    onClick={() => { onChange(ds); setOpen(false); }}>
                    {d.day}
                  </button>
                );
              })}
            </div>
          </div>
          {selectedDate !== todayStr && (
            <button className="cal-today-btn" onClick={() => { onChange(todayStr); setOpen(false); }}>
              Idi na danas
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function submit() {
    if (!email||!pass) { setMsg({e:true,t:"Upiši email i lozinku."}); return; }
    setLoading(true); setMsg(null);
    if (mode==="login") {
      const{error}=await sb.auth.signInWithPassword({email,password:pass});
      if(error) setMsg({e:true,t:"Pogrešan email ili lozinka."});
    } else {
      const{error}=await sb.auth.signUp({email,password:pass});
      if(error) setMsg({e:true,t:error.message});
      else setMsg({e:false,t:"Provjeri inbox i klikni potvrdni link, zatim se prijavi."});
    }
    setLoading(false);
  }

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-logo">
          <h1>Zdravlje<br/><em>Tracker</em></h1>
          <p>Prehrana · Probava · Statistike</p>
        </div>
        <div className="auth-card">
          <div className="tab-sw">
            {["login","register"].map(m=><button key={m} className={`tab-sw-b${mode===m?" on":""}`} onClick={()=>setMode(m)}>{m==="login"?"Prijava":"Registracija"}</button>)}
          </div>
          <label className="auth-lbl">Email</label>
          <input className="auth-inp" type="email" placeholder="tvoj@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          <label className="auth-lbl">Lozinka</label>
          <input className="auth-inp" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          {msg&&<div className={msg.e?"msg-err":"msg-ok"}>{msg.t}</div>}
          <button className="auth-btn" onClick={submit} disabled={loading}>{loading?"Učitavanje...":mode==="login"?"Prijavi se →":"Registriraj se →"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Data hook ────────────────────────────────────────────────────────────────
function useData(userId) {
  const [nutrition, setNutrition] = useState([]);
  const [digestion, setDigestion] = useState([]);
  const [customFoods, setCustomFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(!userId) return;
    (async()=>{
      setLoading(true);
      const [n,d,cf] = await Promise.all([
        sb.from("nutrition").select("*").eq("user_id",userId).order("created_at",{ascending:false}),
        sb.from("digestion").select("*").eq("user_id",userId).order("created_at",{ascending:false}),
        sb.from("custom_foods").select("*").eq("user_id",userId).order("created_at",{ascending:false}),
      ]);
      setNutrition(n.data||[]);
      setDigestion(d.data||[]);
      setCustomFoods((cf.data||[]).map(x=>({...x,baseAmount:x.base_amount})));
      setLoading(false);
    })();
  },[userId]);

  async function addNutrition(item) {
    const row={user_id:userId,date:item.date,meal:item.meal,name:item.name,base_food:item.baseFood||item.name,quantity:item.quantity||null,unit:item.unit||null,kcal:item.kcal,protein:item.protein,carbs:item.carbs,fat:item.fat};
    const{data:d}=await sb.from("nutrition").insert(row).select().single();
    if(d) setNutrition(prev=>[d,...prev]);
  }
  async function removeNutrition(id) {
    await sb.from("nutrition").delete().eq("id",id);
    setNutrition(prev=>prev.filter(x=>x.id!==id));
  }
  async function addDigestion(item) {
    const row={user_id:userId,date:item.date,time:item.time,stool:item.stool,symptoms:item.symptoms,pain:item.pain,bloating:item.bloating,energy:item.energy,water:item.water,notes:item.notes};
    const{data:d}=await sb.from("digestion").insert(row).select().single();
    if(d) setDigestion(prev=>[d,...prev]);
  }
  async function removeDigestion(id) {
    await sb.from("digestion").delete().eq("id",id);
    setDigestion(prev=>prev.filter(x=>x.id!==id));
  }
  async function addCustomFood(food) {
    const row={user_id:userId,name:food.name,unit:food.unit,base_amount:food.baseAmount,kcal:food.kcal,protein:food.protein||0,carbs:food.carbs||0,fat:food.fat||0};
    const{data:d}=await sb.from("custom_foods").insert(row).select().single();
    if(d){const cf={...d,baseAmount:d.base_amount};setCustomFoods(prev=>[cf,...prev]);return cf;}
    return null;
  }

  return {nutrition,digestion,customFoods,loading,addNutrition,removeNutrition,addDigestion,removeDigestion,addCustomFood};
}

// ─── Nutrition tab ────────────────────────────────────────────────────────────
function NutritionTab({nutrition,customFoods,addNutrition,addCustomFood}) {
  const [selDate, setSelDate] = useState(today());
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [qty, setQty] = useState(1);
  const [meal, setMeal] = useState("Doručak");
  const [custom, setCustom] = useState({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
  const [showCustom, setShowCustom] = useState(false);
  const [saving, setSaving] = useState(false);
  const [goal, setGoal] = useState(()=>{try{return+localStorage.getItem("kcal_goal")||2000;}catch{return 2000;}});

  const allFoods = [...BUILTIN_FOODS, ...customFoods.map(cf=>({...cf,_custom:true}))];
  const filtered = search.length>1 ? allFoods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).slice(0,8) : [];

  const dayItems = nutrition.filter(n=>n.date===selDate);
  const tot = dayItems.reduce((a,n)=>({kcal:a.kcal+n.kcal,protein:a.protein+n.protein,carbs:a.carbs+n.carbs,fat:a.fat+n.fat}),{kcal:0,protein:0,carbs:0,fat:0});
  const pct = Math.min(100,Math.round((tot.kcal/goal)*100));
  const pctC = pct>=100?"#d85a30":pct>=80?"#ba7517":"#1d9e75";
  const scaledPrev = sel ? scaleFood(sel,qty) : null;

  // dots for calendar — days that have nutrition data
  const nutritionDots = [...new Set(nutrition.map(n=>n.date))];

  function pickFood(f){setSel(f);setQty(f.baseAmount||f.base_amount||1);setSearch(f.name);}

  async function addSel(){
    if(!sel)return;
    setSaving(true);
    const s=scaleFood(sel,qty);
    await addNutrition({name:sel.name,...s,meal,date:selDate,baseFood:sel.name,quantity:qty,unit:sel.unit});
    setSearch("");setSel(null);setQty(1);setSaving(false);
  }

  async function saveCustom(){
    if(!custom.name||!custom.kcal)return;
    setSaving(true);
    const food={name:custom.name,unit:custom.unit||"g",baseAmount:+custom.baseAmount||100,kcal:+custom.kcal,protein:+custom.protein||0,carbs:+custom.carbs||0,fat:+custom.fat||0};
    const saved=await addCustomFood(food);
    if(saved){
      const amt=+custom.amount||food.baseAmount;
      const f=amt/food.baseAmount;
      await addNutrition({name:food.name,kcal:food.kcal*f,protein:food.protein*f,carbs:food.carbs*f,fat:food.fat*f,meal,date:selDate,quantity:amt,unit:food.unit});
    }
    setCustom({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
    setShowCustom(false);setSaving(false);
  }

  return (
    <div>
      <CalendarPicker selectedDate={selDate} onChange={setSelDate} dateDots={nutritionDots} />

      <div className="mrow">
        {[{l:"Kalorije",v:Math.round(tot.kcal),u:"kcal",c:"#993c1d"},{l:"Proteini",v:Math.round(tot.protein),u:"g",c:"#185fa5"},{l:"Ugljikohidrati",v:Math.round(tot.carbs),u:"g",c:"#854f0b"},{l:"Masti",v:Math.round(tot.fat),u:"g",c:"#0f6e56"}].map(m=>(
          <div key={m.l} className="met"><div className="met-l">{m.l}</div><div className="met-v" style={{color:m.c}}>{m.v}<span className="met-u">{m.u}</span></div></div>
        ))}
      </div>

      <div className="card" style={{padding:16,marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:13,color:"#888"}}>{Math.round(tot.kcal)} / {goal} kcal · <b style={{color:"#1a1a18"}}>{pct}%</b></span>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:11,color:"#aaa"}}>Cilj:</span>
            <input type="number" value={goal} onChange={e=>{setGoal(+e.target.value);localStorage.setItem("kcal_goal",e.target.value);}} style={{width:70,padding:"3px 9px",fontSize:13,border:"1px solid #e8e5df",borderRadius:8,background:"#fafaf8",color:"#1a1a18",outline:"none"}}/>
            <span style={{fontSize:11,color:"#aaa"}}>kcal</span>
          </div>
        </div>
        <div className="prog" style={{marginBottom:10}}><div className="prog-f" style={{width:`${pct}%`,background:pctC}}/></div>
        <div style={{display:"flex",gap:8}}>
          {[{l:"P",v:tot.protein,max:150,c:"#378add"},{l:"U",v:tot.carbs,max:250,c:"#ba7517"},{l:"M",v:tot.fat,max:80,c:"#1d9e75"}].map(m=>(
            <div key={m.l} style={{flex:1}}>
              <div style={{fontSize:10,color:"#bbb",marginBottom:3,textTransform:"uppercase"}}>{m.l} {Math.round(m.v)}g</div>
              <div className="prog"><div className="prog-f" style={{width:`${Math.min(100,Math.round(m.v/m.max*100))}%`,background:m.c}}/></div>
            </div>
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
              <div key={i} className={`sugg-row${f._custom?" mine":""}`} onClick={()=>pickFood(f)}>
                <div>
                  <div style={{fontSize:14}}>{f.name}{f._custom&&<span style={{fontSize:10,color:"#854f0b",marginLeft:6,fontWeight:500}}>MOJ UNOS</span>}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>per {f.baseAmount||f.base_amount}{f.unit}</div>
                </div>
                <div style={{display:"flex",gap:5}}><span className="bx bc">{f.kcal} kcal</span><span className="bx bb">{f.protein}g P</span></div>
              </div>
            ))}
          </div>
        )}

        {sel&&(
          <div className="qty-row">
            <span style={{fontSize:13,color:"#0f6e56",fontWeight:500,flex:"1 1 120px"}}>{sel.name}</span>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <span style={{fontSize:12,color:"#0f6e56"}}>Količina:</span>
              <input type="number" className="qty-inp" value={qty} onChange={e=>setQty(Math.max(0.1,+e.target.value))} min="0.1" step={sel.unit==="g"||sel.unit==="ml"?10:1}/>
              <span style={{fontSize:13,color:"#085041",fontWeight:500}}>{sel.unit}</span>
            </div>
            {scaledPrev&&<span style={{fontSize:12,color:"#0d5c43",fontWeight:500,flex:"1 1 100%"}}>{Math.round(scaledPrev.kcal)} kcal · {Math.round(scaledPrev.protein)}g P · {Math.round(scaledPrev.carbs)}g U · {Math.round(scaledPrev.fat)}g M</span>}
            <div style={{display:"flex",gap:7,marginLeft:"auto"}}>
              <button className="btn btn-g" style={{padding:"8px 16px",fontSize:13,opacity:saving?0.6:1}} onClick={addSel} disabled={saving}>{saving?"...":"Dodaj"}</button>
              <button className="rm" onClick={()=>{setSel(null);setSearch("");}}>×</button>
            </div>
          </div>
        )}

        <div style={{marginTop:12}}>
          <button className={`pill${showCustom?" a":""}`} style={{fontSize:12}} onClick={()=>setShowCustom(!showCustom)}>{showCustom?"▲ Zatvori":"＋ Nova namirnica (spremi zauvijek)"}</button>
        </div>

        {showCustom&&(
          <div style={{marginTop:12,padding:16,background:"#fffdf5",borderRadius:12,border:"1px solid #fac775"}}>
            <div style={{fontSize:12,color:"#854f0b",fontWeight:500,marginBottom:12}}>Sprema se trajno u tvoju bazu i bit će dostupna za pretraživanje.</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
              <div style={{flex:2,minWidth:130}}><span className="lbl">Naziv</span><input className="inp" placeholder="npr. Proteinska ploča" value={custom.name} onChange={e=>setCustom({...custom,name:e.target.value})}/></div>
              <div style={{flex:1,minWidth:70}}><span className="lbl">Jedinica</span><input className="inp" placeholder="g/kom/ml" value={custom.unit} onChange={e=>setCustom({...custom,unit:e.target.value})}/></div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
              {[["kcal (na bazu)","kcal"],["Baza (jed.)","baseAmount"],["Pojeo (jed.)","amount"],["Proteini g","protein"],["Ugljikohidrati g","carbs"],["Masti g","fat"]].map(([l,k])=>(
                <div key={k} style={{flex:1,minWidth:80}}><span className="lbl">{l}</span><input type="number" className="inp" value={custom[k]} onChange={e=>setCustom({...custom,[k]:e.target.value})}/></div>
              ))}
            </div>
            <button className="btn btn-g" style={{width:"100%",opacity:saving?0.6:1}} onClick={saveCustom} disabled={saving}>Spremi i dodaj obrok</button>
          </div>
        )}
      </div>

      {dayItems.length === 0 && (
        <div style={{textAlign:"center",padding:"32px 0",color:"#bbb",fontSize:14}}>
          Nema unesene hrane za {selDate===today()?"danas":formatDate(selDate)}.
        </div>
      )}

      {MEALS.map(m=>{
        const items=dayItems.filter(n=>n.meal===m);
        if(!items.length) return null;
        const mkcal=Math.round(items.reduce((a,n)=>a+n.kcal,0));
        return(
          <div key={m}>
            <div className="meal-hd"><span>{MEAL_ICONS[m]}</span><span style={{flex:1}}>{m}</span><span className="bx bz">{mkcal} kcal</span></div>
            <div className="meal-bd">
              {items.map(item=>(
                <div key={item.id} className="frow">
                  <div>
                    <div style={{fontSize:14}}>{item.base_food||item.name}</div>
                    {item.quantity&&<div style={{fontSize:11,color:"#aaa"}}>{item.quantity} {item.unit}</div>}
                  </div>
                  <div style={{display:"flex",gap:5,alignItems:"center"}}>
                    <span className="bx bc">{Math.round(item.kcal)} kcal</span>
                    <span className="bx bb">{Math.round(item.protein)}g P</span>
                    <button className="rm" onClick={()=>{}/* removeNutrition passed below */}>×</button>
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

// fixed nutrition with removeNutrition prop
function NutritionTabFull({nutrition,customFoods,addNutrition,addCustomFood,removeNutrition}) {
  const [selDate, setSelDate] = useState(today());
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [qty, setQty] = useState(1);
  const [meal, setMeal] = useState("Doručak");
  const [custom, setCustom] = useState({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
  const [showCustom, setShowCustom] = useState(false);
  const [saving, setSaving] = useState(false);
  const [goal, setGoal] = useState(()=>{try{return+localStorage.getItem("kcal_goal")||2000;}catch{return 2000;}});

  const allFoods = [...BUILTIN_FOODS, ...customFoods.map(cf=>({...cf,_custom:true}))];
  const filtered = search.length>1 ? allFoods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).slice(0,8) : [];
  const dayItems = nutrition.filter(n=>n.date===selDate);
  const tot = dayItems.reduce((a,n)=>({kcal:a.kcal+n.kcal,protein:a.protein+n.protein,carbs:a.carbs+n.carbs,fat:a.fat+n.fat}),{kcal:0,protein:0,carbs:0,fat:0});
  const pct = Math.min(100,Math.round((tot.kcal/goal)*100));
  const pctC = pct>=100?"#d85a30":pct>=80?"#ba7517":"#1d9e75";
  const scaledPrev = sel ? scaleFood(sel,qty) : null;
  const nutritionDots = [...new Set(nutrition.map(n=>n.date))];

  function pickFood(f){setSel(f);setQty(f.baseAmount||f.base_amount||1);setSearch(f.name);}

  async function addSel(){
    if(!sel)return; setSaving(true);
    const s=scaleFood(sel,qty);
    await addNutrition({name:sel.name,...s,meal,date:selDate,baseFood:sel.name,quantity:qty,unit:sel.unit});
    setSearch("");setSel(null);setQty(1);setSaving(false);
  }

  async function saveCustom(){
    if(!custom.name||!custom.kcal)return; setSaving(true);
    const food={name:custom.name,unit:custom.unit||"g",baseAmount:+custom.baseAmount||100,kcal:+custom.kcal,protein:+custom.protein||0,carbs:+custom.carbs||0,fat:+custom.fat||0};
    const saved=await addCustomFood(food);
    if(saved){
      const amt=+custom.amount||food.baseAmount; const f=amt/food.baseAmount;
      await addNutrition({name:food.name,kcal:food.kcal*f,protein:food.protein*f,carbs:food.carbs*f,fat:food.fat*f,meal,date:selDate,quantity:amt,unit:food.unit});
    }
    setCustom({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
    setShowCustom(false);setSaving(false);
  }

  return (
    <div>
      <CalendarPicker selectedDate={selDate} onChange={setSelDate} dateDots={nutritionDots}/>

      <div className="mrow">
        {[{l:"Kalorije",v:Math.round(tot.kcal),u:"kcal",c:"#993c1d"},{l:"Proteini",v:Math.round(tot.protein),u:"g",c:"#185fa5"},{l:"Ugljikohidrati",v:Math.round(tot.carbs),u:"g",c:"#854f0b"},{l:"Masti",v:Math.round(tot.fat),u:"g",c:"#0f6e56"}].map(m=>(
          <div key={m.l} className="met"><div className="met-l">{m.l}</div><div className="met-v" style={{color:m.c}}>{m.v}<span className="met-u">{m.u}</span></div></div>
        ))}
      </div>

      <div className="card" style={{padding:16,marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:13,color:"#888"}}>{Math.round(tot.kcal)} / {goal} kcal · <b style={{color:"#1a1a18"}}>{pct}%</b></span>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:11,color:"#aaa"}}>Cilj:</span>
            <input type="number" value={goal} onChange={e=>{setGoal(+e.target.value);localStorage.setItem("kcal_goal",e.target.value);}} style={{width:70,padding:"3px 9px",fontSize:13,border:"1px solid #e8e5df",borderRadius:8,background:"#fafaf8",color:"#1a1a18",outline:"none"}}/>
            <span style={{fontSize:11,color:"#aaa"}}>kcal</span>
          </div>
        </div>
        <div className="prog" style={{marginBottom:10}}><div className="prog-f" style={{width:`${pct}%`,background:pctC}}/></div>
        <div style={{display:"flex",gap:8}}>
          {[{l:"P",v:tot.protein,max:150,c:"#378add"},{l:"U",v:tot.carbs,max:250,c:"#ba7517"},{l:"M",v:tot.fat,max:80,c:"#1d9e75"}].map(m=>(
            <div key={m.l} style={{flex:1}}>
              <div style={{fontSize:10,color:"#bbb",marginBottom:3,textTransform:"uppercase"}}>{m.l} {Math.round(m.v)}g</div>
              <div className="prog"><div className="prog-f" style={{width:`${Math.min(100,Math.round(m.v/m.max*100))}%`,background:m.c}}/></div>
            </div>
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
              <div key={i} className={`sugg-row${f._custom?" mine":""}`} onClick={()=>pickFood(f)}>
                <div>
                  <div style={{fontSize:14}}>{f.name}{f._custom&&<span style={{fontSize:10,color:"#854f0b",marginLeft:6,fontWeight:500}}>MOJ UNOS</span>}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>per {f.baseAmount||f.base_amount}{f.unit}</div>
                </div>
                <div style={{display:"flex",gap:5}}><span className="bx bc">{f.kcal} kcal</span><span className="bx bb">{f.protein}g P</span></div>
              </div>
            ))}
          </div>
        )}
        {sel&&(
          <div className="qty-row">
            <span style={{fontSize:13,color:"#0f6e56",fontWeight:500,flex:"1 1 120px"}}>{sel.name}</span>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <span style={{fontSize:12,color:"#0f6e56"}}>Količina:</span>
              <input type="number" className="qty-inp" value={qty} onChange={e=>setQty(Math.max(0.1,+e.target.value))} min="0.1" step={sel.unit==="g"||sel.unit==="ml"?10:1}/>
              <span style={{fontSize:13,color:"#085041",fontWeight:500}}>{sel.unit}</span>
            </div>
            {scaledPrev&&<span style={{fontSize:12,color:"#0d5c43",fontWeight:500,flex:"1 1 100%"}}>{Math.round(scaledPrev.kcal)} kcal · {Math.round(scaledPrev.protein)}g P · {Math.round(scaledPrev.carbs)}g U · {Math.round(scaledPrev.fat)}g M</span>}
            <div style={{display:"flex",gap:7,marginLeft:"auto"}}>
              <button className="btn btn-g" style={{padding:"8px 16px",fontSize:13,opacity:saving?0.6:1}} onClick={addSel} disabled={saving}>{saving?"...":"Dodaj"}</button>
              <button className="rm" onClick={()=>{setSel(null);setSearch("");}}>×</button>
            </div>
          </div>
        )}
        <div style={{marginTop:12}}>
          <button className={`pill${showCustom?" a":""}`} style={{fontSize:12}} onClick={()=>setShowCustom(!showCustom)}>{showCustom?"▲ Zatvori":"＋ Nova namirnica (spremi zauvijek)"}</button>
        </div>
        {showCustom&&(
          <div style={{marginTop:12,padding:16,background:"#fffdf5",borderRadius:12,border:"1px solid #fac775"}}>
            <div style={{fontSize:12,color:"#854f0b",fontWeight:500,marginBottom:12}}>Sprema se trajno u tvoju bazu i bit će dostupna za pretraživanje.</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
              <div style={{flex:2,minWidth:130}}><span className="lbl">Naziv</span><input className="inp" placeholder="npr. Proteinska ploča" value={custom.name} onChange={e=>setCustom({...custom,name:e.target.value})}/></div>
              <div style={{flex:1,minWidth:70}}><span className="lbl">Jedinica</span><input className="inp" placeholder="g/kom/ml" value={custom.unit} onChange={e=>setCustom({...custom,unit:e.target.value})}/></div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
              {[["kcal (na bazu)","kcal"],["Baza (jed.)","baseAmount"],["Pojeo (jed.)","amount"],["Proteini g","protein"],["Ugljikohidrati g","carbs"],["Masti g","fat"]].map(([l,k])=>(
                <div key={k} style={{flex:1,minWidth:80}}><span className="lbl">{l}</span><input type="number" className="inp" value={custom[k]} onChange={e=>setCustom({...custom,[k]:e.target.value})}/></div>
              ))}
            </div>
            <button className="btn btn-g" style={{width:"100%",opacity:saving?0.6:1}} onClick={saveCustom} disabled={saving}>Spremi i dodaj obrok</button>
          </div>
        )}
      </div>

      {dayItems.length===0&&(
        <div style={{textAlign:"center",padding:"32px 0",color:"#bbb",fontSize:14}}>
          Nema unesene hrane za {selDate===today()?"danas":formatDate(selDate)}.
        </div>
      )}

      {MEALS.map(m=>{
        const items=dayItems.filter(n=>n.meal===m);
        if(!items.length) return null;
        const mkcal=Math.round(items.reduce((a,n)=>a+n.kcal,0));
        return(
          <div key={m}>
            <div className="meal-hd"><span>{MEAL_ICONS[m]}</span><span style={{flex:1}}>{m}</span><span className="bx bz">{mkcal} kcal</span></div>
            <div className="meal-bd">
              {items.map(item=>(
                <div key={item.id} className="frow">
                  <div>
                    <div style={{fontSize:14}}>{item.base_food||item.name}</div>
                    {item.quantity&&<div style={{fontSize:11,color:"#aaa"}}>{item.quantity} {item.unit}</div>}
                  </div>
                  <div style={{display:"flex",gap:5,alignItems:"center"}}>
                    <span className="bx bc">{Math.round(item.kcal)} kcal</span>
                    <span className="bx bb">{Math.round(item.protein)}g P</span>
                    <button className="rm" onClick={()=>removeNutrition(item.id)}>×</button>
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

// ─── Digestion tab ────────────────────────────────────────────────────────────
function DigestionTab({digestion,addDigestion,removeDigestion}) {
  const [selDate, setSelDate] = useState(today());
  const [form, setForm] = useState({date:today(),time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8});
  const [saving, setSaving] = useState(false);
  const [openDay, setOpenDay] = useState(null);

  const stoolTypes=[{v:"1",d:"Tvrde grudice"},{v:"2",d:"Zbijena"},{v:"3",d:"Normalna ✓"},{v:"4",d:"Mekana"},{v:"5",d:"Komadići"},{v:"6",d:"Kašasta"},{v:"7",d:"Tekuća"}];
  function toggleSym(s){setForm(f=>({...f,symptoms:f.symptoms.includes(s)?f.symptoms.filter(x=>x!==s):[...f.symptoms,s]}));}

  async function submit(){
    setSaving(true);
    await addDigestion({...form,date:selDate});
    setForm({date:selDate,time:new Date().toTimeString().slice(0,5),stool:"3",symptoms:[],pain:0,bloating:0,notes:"",energy:3,water:8});
    setSaving(false);
  }

  const digestDots = [...new Set(digestion.map(d=>d.date))];

  // group by date for history
  const byDate = {};
  digestion.forEach(e=>{
    if(!byDate[e.date]) byDate[e.date]=[];
    byDate[e.date].push(e);
  });
  const sortedDates = Object.keys(byDate).sort((a,b)=>b.localeCompare(a)).slice(0,30);

  const selDateEntries = digestion.filter(e=>e.date===selDate);

  return(
    <div>
      <CalendarPicker selectedDate={selDate} onChange={d=>{setSelDate(d);setForm(f=>({...f,date:d}));}} dateDots={digestDots}/>

      <div className="card">
        <div className="ttl">Unos za {selDate===today()?"danas":formatDate(selDate)}</div>
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          <div style={{flex:1}}><span className="lbl">Vrijeme</span><input type="time" className="inp" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
        </div>
        <span className="lbl">Bristol skala</span>
        <div className="pills" style={{marginBottom:16}}>
          {stoolTypes.map(t=>(
            <button key={t.v} className={`pill${form.stool===t.v?" t":""}`} style={{textAlign:"center"}} onClick={()=>setForm({...form,stool:t.v})}>
              <div style={{fontWeight:600,fontSize:12}}>Tip {t.v}</div>
              <div style={{fontSize:10,opacity:.75}}>{t.d}</div>
            </button>
          ))}
        </div>
        <span className="lbl">Simptomi</span>
        <div className="pills">{DIGEST_SYMPTOMS.map(s=><button key={s} className={`pill${form.symptoms.includes(s)?" c":""}`} onClick={()=>toggleSym(s)}>{s}</button>)}</div>
        {[{k:"pain",l:"Bol",max:10,c:"#d85a30"},{k:"bloating",l:"Nadutost",max:10,c:"#ba7517"},{k:"energy",l:"Energija",max:5,c:"#1d9e75"},{k:"water",l:"Čaše vode",max:15,c:"#378add"}].map(({k,l,max,c})=>(
          <div key={k} className="rrow">
            <div className="rlbl"><span>{l}</span><span style={{fontWeight:500,color:c}}>{form[k]}/{max}</span></div>
            <input type="range" min={0} max={max} step={1} value={form[k]} onChange={e=>setForm({...form,[k]:+e.target.value})} style={{accentColor:c}}/>
          </div>
        ))}
        <span className="lbl" style={{marginTop:4}}>Bilješka</span>
        <textarea className="inp" placeholder="Kako se osjećaš?" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} style={{marginBottom:16}}/>
        <button className="btn btn-g" style={{width:"100%",opacity:saving?0.6:1}} onClick={submit} disabled={saving}>{saving?"Spremanje...":"Spremi unos"}</button>
      </div>

      {selDateEntries.length>0&&(
        <div>
          <div style={{fontSize:12,color:"#aaa",fontWeight:500,textTransform:"uppercase",letterSpacing:".8px",marginBottom:8}}>Unosi za {formatDate(selDate)}</div>
          {selDateEntries.map(e=>(
            <div key={e.id} className="card-sm">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:14,fontWeight:500}}>{e.time}</span>
                  <span className="bx bt">Tip {e.stool}</span>
                </div>
                <button className="rm" onClick={()=>removeDigestion(e.id)}>×</button>
              </div>
              <div style={{display:"flex",gap:10,fontSize:12,color:"#888",flexWrap:"wrap"}}>
                {e.pain>0&&<span style={{color:"#993c1d"}}>Bol {e.pain}/10</span>}
                {e.bloating>0&&<span style={{color:"#854f0b"}}>Nadutost {e.bloating}/10</span>}
                <span style={{color:"#0f6e56"}}>Energija {e.energy}/5</span>
                <span style={{color:"#185fa5"}}>💧 {e.water} čaša</span>
              </div>
              {e.symptoms&&e.symptoms.length>0&&<div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>{e.symptoms.map(s=><span key={s} className="bx bc">{s}</span>)}</div>}
              {e.notes&&<div style={{marginTop:6,fontSize:13,color:"#888",fontStyle:"italic"}}>{e.notes}</div>}
            </div>
          ))}
        </div>
      )}

      {selDateEntries.length===0&&(
        <div style={{textAlign:"center",padding:"24px 0",color:"#bbb",fontSize:14}}>Nema unosa za {selDate===today()?"danas":formatDate(selDate)}.</div>
      )}

      <div style={{marginTop:24}}>
        <div style={{fontSize:12,color:"#aaa",fontWeight:500,textTransform:"uppercase",letterSpacing:".8px",marginBottom:10}}>Povijest po danima</div>
        {sortedDates.map(date=>{
          const entries=byDate[date];
          const avgPain=(entries.reduce((a,e)=>a+e.pain,0)/entries.length).toFixed(1);
          const avgEnergy=(entries.reduce((a,e)=>a+e.energy,0)/entries.length).toFixed(1);
          const allSymptoms=[...new Set(entries.flatMap(e=>e.symptoms||[]))];
          const isOpen=openDay===date;
          return(
            <div key={date} className="dh-day">
              <div className="dh-day-hdr" onClick={()=>setOpenDay(isOpen?null:date)}>
                <div>
                  <div style={{fontSize:14,fontWeight:500,color:"#1a1a18"}}>{formatDateLong(date)}</div>
                  <div style={{fontSize:12,color:"#aaa",marginTop:2}}>{entries.length} {entries.length===1?"unos":"unosa"} · Bol {avgPain}/10 · Energija {avgEnergy}/5</div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {allSymptoms.slice(0,2).map(s=><span key={s} className="bx bc">{s}</span>)}
                  <span style={{color:"#bbb",fontSize:14}}>{isOpen?"▲":"▼"}</span>
                </div>
              </div>
              {isOpen&&(
                <div className="dh-day-body">
                  {entries.map(e=>(
                    <div key={e.id} style={{padding:"10px 0",borderBottom:"1px solid #f5f3ef"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{display:"flex",gap:8}}><span style={{fontSize:13,fontWeight:500}}>{e.time}</span><span className="bx bt">Tip {e.stool}</span></div>
                        <button className="rm" onClick={()=>removeDigestion(e.id)}>×</button>
                      </div>
                      <div style={{display:"flex",gap:10,fontSize:12,color:"#888",flexWrap:"wrap"}}>
                        {e.pain>0&&<span style={{color:"#993c1d"}}>Bol {e.pain}/10</span>}
                        {e.bloating>0&&<span style={{color:"#854f0b"}}>Nadutost {e.bloating}/10</span>}
                        <span style={{color:"#0f6e56"}}>Energija {e.energy}/5</span>
                        <span style={{color:"#185fa5"}}>💧 {e.water}x</span>
                      </div>
                      {e.symptoms&&e.symptoms.length>0&&<div style={{display:"flex",gap:4,marginTop:5,flexWrap:"wrap"}}>{e.symptoms.map(s=><span key={s} className="bx bc">{s}</span>)}</div>}
                      {e.notes&&<div style={{marginTop:5,fontSize:12,color:"#888",fontStyle:"italic"}}>{e.notes}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stats tab ────────────────────────────────────────────────────────────────
function StatsTab({nutrition,digestion}) {
  const [view, setView] = useState("week"); // week | month | charts
  const {Chart} = window;

  // helper: get N days back
  function lastNDays(n){return Array.from({length:n},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(n-1-i));return toDateStr(d);});}

  // weekly summary (last 8 weeks)
  const weeks = Array.from({length:8},(_,i)=>{
    const end=new Date(); end.setDate(end.getDate()-i*7);
    const start=new Date(end); start.setDate(start.getDate()-6);
    const days=[];for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1))days.push(toDateStr(new Date(d)));
    const label=i===0?"Ovaj tjedan":i===1?"Prošli tjedan":`${formatDate(toDateStr(start))} – ${formatDate(toDateStr(end))}`;
    const nItems=nutrition.filter(n=>days.includes(n.date));
    const kcal=Math.round(nItems.reduce((a,n)=>a+n.kcal,0));
    const daysWithData=days.filter(d=>nutrition.some(n=>n.date===d)).length;
    const avgKcal=daysWithData>0?Math.round(kcal/daysWithData):0;
    const dItems=digestion.filter(d=>days.includes(d.date));
    const avgEnergy=dItems.length?+(dItems.reduce((a,d)=>a+d.energy,0)/dItems.length).toFixed(1):null;
    return{label,kcal,avgKcal,daysWithData,avgEnergy,days};
  }).reverse();

  // monthly summary (last 6 months)
  const months = Array.from({length:6},(_,i)=>{
    const d=new Date(); d.setDate(1); d.setMonth(d.getMonth()-i);
    const y=d.getFullYear(),m=d.getMonth();
    const prefix=`${y}-${String(m+1).padStart(2,"0")}`;
    const label=`${HR_MONTHS[m]} ${y}`;
    const nItems=nutrition.filter(n=>n.date.startsWith(prefix));
    const kcal=Math.round(nItems.reduce((a,n)=>a+n.kcal,0));
    const daysWithData=[...new Set(nItems.map(n=>n.date))].length;
    const avgKcal=daysWithData>0?Math.round(kcal/daysWithData):0;
    const dItems=digestion.filter(d=>d.date.startsWith(prefix));
    const avgEnergy=dItems.length?+(dItems.reduce((a,d)=>a+d.energy,0)/dItems.length).toFixed(1):null;
    return{label,kcal,avgKcal,daysWithData,avgEnergy};
  }).reverse();

  const maxWeekKcal=Math.max(...weeks.map(w=>w.kcal),1);
  const maxMonthKcal=Math.max(...months.map(m=>m.kcal),1);

  // charts (last 14 days)
  const days14=lastNDays(14);
  const labels14=days14.map(d=>formatDate(d));
  const byDay14=days14.map(d=>{
    const n=nutrition.filter(x=>x.date===d);
    const dg=digestion.filter(x=>x.date===d);
    return{kcal:Math.round(n.reduce((a,x)=>a+x.kcal,0)),protein:Math.round(n.reduce((a,x)=>a+x.protein,0)),carbs:Math.round(n.reduce((a,x)=>a+x.carbs,0)),fat:Math.round(n.reduce((a,x)=>a+x.fat,0)),pain:dg.length?+(dg.reduce((a,x)=>a+x.pain,0)/dg.length).toFixed(1):null,energy:dg.length?+(dg.reduce((a,x)=>a+x.energy,0)/dg.length).toFixed(1):null};
  });

  useEffect(()=>{
    if(view!=="charts") return;
    const charts=[];
    const make=(id,type,datasets,extra={})=>{
      const el=document.getElementById(id);if(!el)return;
      charts.push(new Chart(el,{type,data:{labels:labels14,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"}},x:{grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11},color:"#aaa"}}},...extra}}));
    };
    make("gc1","bar",[{data:byDay14.map(d=>d.kcal),backgroundColor:"#f0997b",borderRadius:5,borderSkipped:false}]);
    make("gc2","bar",[{label:"P",data:byDay14.map(d=>d.protein),backgroundColor:"#85b7eb",borderRadius:3,stack:"m"},{label:"U",data:byDay14.map(d=>d.carbs),backgroundColor:"#ef9f27",borderRadius:3,stack:"m"},{label:"M",data:byDay14.map(d=>d.fat),backgroundColor:"#97c459",borderRadius:3,stack:"m"}],{scales:{x:{stacked:true,grid:{display:false},ticks:{autoSkip:false,maxRotation:45,font:{size:11},color:"#aaa"}},y:{stacked:true,beginAtZero:true,grid:{color:"rgba(0,0,0,.04)"},ticks:{font:{size:11},color:"#aaa"}}}});
    make("gc3","line",[{data:byDay14.map(d=>d.pain),borderColor:"#d85a30",backgroundColor:"transparent",tension:.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#d85a30"},{data:byDay14.map(d=>d.energy),borderColor:"#1d9e75",backgroundColor:"transparent",tension:.4,spanGaps:true,pointRadius:4,pointBackgroundColor:"#1d9e75"}]);
    return()=>charts.forEach(c=>c.destroy());
  },[view,nutrition,digestion]);

  return(
    <div>
      <div className="pills" style={{marginBottom:20}}>
        {[{id:"week",l:"Po tjednima"},{id:"month",l:"Po mjesecima"},{id:"charts",l:"Grafovi"}].map(v=>(
          <button key={v.id} className={`pill${view===v.id?" dk":""}`} onClick={()=>setView(v.id)}>{v.l}</button>
        ))}
      </div>

      {view==="week"&&(
        <div>
          <div className="card">
            <div className="ttl">Tjedni pregled kalorija</div>
            {weeks.map((w,i)=>(
              <div key={i} className="week-row">
                <div style={{width:140,flexShrink:0}}>
                  <div style={{fontSize:13,fontWeight:i===weeks.length-1?500:400,color:"#1a1a18"}}>{w.label}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>{w.daysWithData} dana unosa</div>
                </div>
                <div className="week-bar-wrap">
                  <div className="week-bar" style={{width:`${Math.round(w.kcal/maxWeekKcal*100)}%`,background:i===weeks.length-1?"#1a1a18":"#d4d1cb"}}/>
                </div>
                <div style={{width:90,flexShrink:0,textAlign:"right"}}>
                  <div style={{fontSize:13,fontWeight:500,color:"#1a1a18"}}>{w.kcal.toLocaleString()}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>~{w.avgKcal}/dan</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ttl">Tjedna energija (probava)</div>
            {weeks.map((w,i)=>(
              <div key={i} className="week-row">
                <div style={{width:140,flexShrink:0}}><div style={{fontSize:13,color:"#1a1a18"}}>{w.label}</div></div>
                <div className="week-bar-wrap">
                  <div className="week-bar" style={{width:w.avgEnergy?`${Math.round(w.avgEnergy/5*100)}%`:"0%",background:"#1d9e75"}}/>
                </div>
                <div style={{width:90,flexShrink:0,textAlign:"right",fontSize:13,fontWeight:500,color:"#0f6e56"}}>{w.avgEnergy??"-"}<span style={{fontSize:11,color:"#aaa",fontWeight:400}}>/5</span></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view==="month"&&(
        <div>
          <div className="card">
            <div className="ttl">Mjesečni pregled kalorija</div>
            {months.map((m,i)=>(
              <div key={i} className="week-row">
                <div style={{width:130,flexShrink:0}}>
                  <div style={{fontSize:13,fontWeight:i===months.length-1?500:400,color:"#1a1a18"}}>{m.label}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>{m.daysWithData} dana unosa</div>
                </div>
                <div className="week-bar-wrap">
                  <div className="week-bar" style={{width:`${Math.round(m.kcal/maxMonthKcal*100)}%`,background:i===months.length-1?"#1a1a18":"#d4d1cb"}}/>
                </div>
                <div style={{width:90,flexShrink:0,textAlign:"right"}}>
                  <div style={{fontSize:13,fontWeight:500,color:"#1a1a18"}}>{m.kcal.toLocaleString()}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>~{m.avgKcal}/dan</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ttl">Prosječna energija po mjesecu</div>
            {months.map((m,i)=>(
              <div key={i} className="week-row">
                <div style={{width:130,flexShrink:0}}><div style={{fontSize:13,color:"#1a1a18"}}>{m.label}</div></div>
                <div className="week-bar-wrap"><div className="week-bar" style={{width:m.avgEnergy?`${Math.round(m.avgEnergy/5*100)}%`:"0%",background:"#1d9e75"}}/></div>
                <div style={{width:90,flexShrink:0,textAlign:"right",fontSize:13,fontWeight:500,color:"#0f6e56"}}>{m.avgEnergy??"-"}<span style={{fontSize:11,color:"#aaa",fontWeight:400}}>/5</span></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view==="charts"&&(
        <div>
          {[{id:"gc1",title:"Kalorije (zadnjih 14 dana)",legend:[{c:"#f0997b",l:"kcal"}]},{id:"gc2",title:"Makronutrijenti",legend:[{c:"#85b7eb",l:"Proteini"},{c:"#ef9f27",l:"Ugljikohidrati"},{c:"#97c459",l:"Masti"}]},{id:"gc3",title:"Bol i energija",legend:[{c:"#d85a30",l:"Bol (0-10)"},{c:"#1d9e75",l:"Energija (0-5)"}]}].map(({id,title,legend})=>(
            <div key={id} className="card">
              <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:300,marginBottom:10}}>{title}</div>
              <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:12}}>
                {legend.map(l=><div key={l.l} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#888"}}><div style={{width:10,height:10,borderRadius:2,background:l.c}}/>{l.l}</div>)}
              </div>
              <div style={{position:"relative",height:180}}><canvas id={id}></canvas></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [tab, setTab] = useState("nutrition");
  const {nutrition,digestion,customFoods,loading,addNutrition,removeNutrition,addDigestion,removeDigestion,addCustomFood} = useData(session?.user?.id);

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setAuthLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,s)=>{setSession(s);setAuthLoading(false);});
    return()=>subscription.unsubscribe();
  },[]);

  if(authLoading) return <div className="zt-loading"><div className="zt-loading-in">Zdravlje <em style={{color:"#9fe1cb"}}>Tracker</em></div></div>;
  if(!session) return <AuthScreen/>;

  const tabs=[{id:"nutrition",l:"Prehrana"},{id:"digestion",l:"Probava"},{id:"stats",l:"Statistike"}];

  return(
    <>
      <style>{CSS}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
      <div className="zt">
        <div style={{background:"#1a1a18"}}>
          <div className="zt-hdr">
            <div className="zt-hdr-in">
              <div>
                <div className="zt-logo">Zdravlje <em>Tracker</em></div>
                <div className="zt-tagline">Prehrana · Probava · Statistike</div>
              </div>
              <div style={{textAlign:"right",paddingTop:4}}>
                <div style={{fontSize:11,color:"#555",marginBottom:6}}>{session.user.email}</div>
                <button className="pill dk" style={{fontSize:11,padding:"4px 12px"}} onClick={()=>sb.auth.signOut()}>Odjava</button>
              </div>
            </div>
          </div>
          <div className="zt-tabbar">
            {tabs.map(t=><button key={t.id} className={`zt-tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>{t.l}</button>)}
          </div>
        </div>
        <div className="zt-body">
          {loading?(
            <div style={{textAlign:"center",padding:"50px 0",color:"#bbb",fontSize:14}}>Učitavanje podataka...</div>
          ):(
            <>
              {tab==="nutrition"&&<NutritionTabFull nutrition={nutrition} customFoods={customFoods} addNutrition={addNutrition} addCustomFood={addCustomFood} removeNutrition={removeNutrition}/>}
              {tab==="digestion"&&<DigestionTab digestion={digestion} addDigestion={addDigestion} removeDigestion={removeDigestion}/>}
              {tab==="stats"&&<StatsTab nutrition={nutrition} digestion={digestion}/>}
            </>
          )}
        </div>
      </div>
    </>
  );
}
