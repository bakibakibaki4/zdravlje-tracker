import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://obacbdvknksuzjaqmxrh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYWNiZHZrbmtzdXpqYXFteHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzODMwMjYsImV4cCI6MjA4ODk1OTAyNn0.CwHBqH0uWIo4yQjW1APMEqepQ5cqIEiIev0DAKZbxH4"
);

const BUILTIN_FOODS = [
  {name:"Piletina prsa (kuhana)",unit:"g",baseAmount:100,kcal:165,protein:31,carbs:0,fat:3.6},
  {name:"Piletina but (kuhani)",unit:"g",baseAmount:100,kcal:209,protein:26,carbs:0,fat:11},
  {name:"Piletina cijela (pečena)",unit:"g",baseAmount:100,kcal:239,protein:27,carbs:0,fat:14},
  {name:"Piletina krilca",unit:"g",baseAmount:100,kcal:290,protein:27,carbs:0,fat:19},
  {name:"Puretina prsa",unit:"g",baseAmount:100,kcal:135,protein:30,carbs:0,fat:1},
  {name:"Puretina but",unit:"g",baseAmount:100,kcal:187,protein:28,carbs:0,fat:8},
  {name:"Govedina mršava",unit:"g",baseAmount:100,kcal:215,protein:26,carbs:0,fat:12},
  {name:"Govedina mljevena (10% masti)",unit:"g",baseAmount:100,kcal:176,protein:20,carbs:0,fat:10},
  {name:"Govedina mljevena (20% masti)",unit:"g",baseAmount:100,kcal:254,protein:17,carbs:0,fat:20},
  {name:"Biftek (goveđi)",unit:"g",baseAmount:100,kcal:271,protein:26,carbs:0,fat:18},
  {name:"Goveđi odrezak",unit:"g",baseAmount:100,kcal:207,protein:28,carbs:0,fat:10},
  {name:"Teleće meso",unit:"g",baseAmount:100,kcal:172,protein:26,carbs:0,fat:7},
  {name:"Janjetina but",unit:"g",baseAmount:100,kcal:258,protein:25,carbs:0,fat:17},
  {name:"Janjetina kotlet",unit:"g",baseAmount:100,kcal:294,protein:25,carbs:0,fat:21},
  {name:"Svinjetina but",unit:"g",baseAmount:100,kcal:242,protein:27,carbs:0,fat:14},
  {name:"Svinjetina kotlet",unit:"g",baseAmount:100,kcal:231,protein:25,carbs:0,fat:14},
  {name:"Svinjetina mljevena",unit:"g",baseAmount:100,kcal:263,protein:18,carbs:0,fat:21},
  {name:"Svinjski file",unit:"g",baseAmount:100,kcal:143,protein:22,carbs:0,fat:6},
  {name:"Slanina",unit:"g",baseAmount:30,kcal:134,protein:4,carbs:0.1,fat:13},
  {name:"Šunka kuhana",unit:"g",baseAmount:50,kcal:52,protein:8,carbs:1,fat:2},
  {name:"Salama",unit:"g",baseAmount:30,kcal:105,protein:5,carbs:1,fat:9},
  {name:"Hrenovka",unit:"kom",baseAmount:1,kcal:140,protein:5,carbs:2,fat:12},
  {name:"Kobasica",unit:"kom",baseAmount:1,kcal:250,protein:10,carbs:2,fat:22},
  {name:"Chorizo",unit:"g",baseAmount:30,kcal:124,protein:6,carbs:1,fat:11},
  {name:"Panceta",unit:"g",baseAmount:30,kcal:129,protein:5,carbs:0,fat:12},
  {name:"Pečenica",unit:"g",baseAmount:50,kcal:117,protein:14,carbs:0,fat:7},
  {name:"Mortadela",unit:"g",baseAmount:30,kcal:87,protein:4,carbs:1,fat:8},
  {name:"Pašteta (pileća)",unit:"g",baseAmount:50,kcal:148,protein:6,carbs:2,fat:13},
  {name:"Losos (svježi)",unit:"g",baseAmount:100,kcal:208,protein:20,carbs:0,fat:13},
  {name:"Losos (dimljeni)",unit:"g",baseAmount:100,kcal:172,protein:22,carbs:0,fat:9},
  {name:"Tunjevina (konzerva u vodi)",unit:"g",baseAmount:100,kcal:116,protein:26,carbs:0,fat:1},
  {name:"Tunjevina (konzerva u ulju)",unit:"g",baseAmount:100,kcal:200,protein:24,carbs:0,fat:11},
  {name:"Skuša",unit:"g",baseAmount:100,kcal:205,protein:19,carbs:0,fat:14},
  {name:"Sardine (konzerva)",unit:"g",baseAmount:100,kcal:208,protein:25,carbs:0,fat:11},
  {name:"Bakalar (svježi)",unit:"g",baseAmount:100,kcal:82,protein:18,carbs:0,fat:0.7},
  {name:"Bakalar (sušeni)",unit:"g",baseAmount:100,kcal:290,protein:65,carbs:0,fat:2},
  {name:"Brancin",unit:"g",baseAmount:100,kcal:97,protein:19,carbs:0,fat:2},
  {name:"Orada",unit:"g",baseAmount:100,kcal:96,protein:19,carbs:0,fat:2},
  {name:"Oslić",unit:"g",baseAmount:100,kcal:74,protein:17,carbs:0,fat:0.5},
  {name:"Smuđ",unit:"g",baseAmount:100,kcal:91,protein:19,carbs:0,fat:1},
  {name:"Rak (kuhani)",unit:"g",baseAmount:100,kcal:97,protein:20,carbs:0,fat:1.5},
  {name:"Škampi (kuhani)",unit:"g",baseAmount:100,kcal:99,protein:24,carbs:0,fat:0.3},
  {name:"Lignje",unit:"g",baseAmount:100,kcal:92,protein:16,carbs:3,fat:1.4},
  {name:"Hobotnica (kuhana)",unit:"g",baseAmount:100,kcal:164,protein:30,carbs:4,fat:2},
  {name:"Školjke (dagnje)",unit:"g",baseAmount:100,kcal:86,protein:12,carbs:4,fat:2.2},
  {name:"Ostrige",unit:"g",baseAmount:100,kcal:69,protein:7,carbs:4,fat:2.5},
  {name:"Inćuni (konzerva)",unit:"g",baseAmount:20,kcal:42,protein:6,carbs:0,fat:2},
  {name:"Pastrmka",unit:"g",baseAmount:100,kcal:141,protein:20,carbs:0,fat:6.6},
  {name:"Smuđevina",unit:"g",baseAmount:100,kcal:84,protein:19,carbs:0,fat:0.5},
  {name:"Jaje (cijelo)",unit:"kom",baseAmount:1,kcal:78,protein:6,carbs:0.6,fat:5},
  {name:"Bjelanjak",unit:"kom",baseAmount:1,kcal:17,protein:3.6,carbs:0.2,fat:0.1},
  {name:"Žumanjak",unit:"kom",baseAmount:1,kcal:61,protein:2.7,carbs:0.3,fat:5.4},
  {name:"Mlijeko (3.2%)",unit:"ml",baseAmount:200,kcal:122,protein:6.4,carbs:9.6,fat:4.8},
  {name:"Mlijeko (1.5%)",unit:"ml",baseAmount:200,kcal:92,protein:6.6,carbs:9.8,fat:2.8},
  {name:"Mlijeko (0%)",unit:"ml",baseAmount:200,kcal:70,protein:6.8,carbs:10,fat:0.3},
  {name:"Mlijeko bademovo",unit:"ml",baseAmount:200,kcal:28,protein:1,carbs:2,fat:2.4},
  {name:"Mlijeko zobeno",unit:"ml",baseAmount:200,kcal:86,protein:3,carbs:15,fat:3},
  {name:"Mlijeko sojino",unit:"ml",baseAmount:200,kcal:80,protein:7,carbs:6,fat:4},
  {name:"Jogurt (3.2%)",unit:"g",baseAmount:150,kcal:90,protein:5,carbs:7,fat:3.5},
  {name:"Jogurt grčki (10%)",unit:"g",baseAmount:150,kcal:171,protein:9,carbs:5,fat:12},
  {name:"Jogurt grčki (0%)",unit:"g",baseAmount:150,kcal:83,protein:15,carbs:6,fat:0.5},
  {name:"Jogurt skyr",unit:"g",baseAmount:150,kcal:90,protein:15,carbs:6,fat:0.3},
  {name:"Kefir",unit:"ml",baseAmount:200,kcal:122,protein:6.4,carbs:9.6,fat:3.6},
  {name:"Svježi sir (tučeni)",unit:"g",baseAmount:100,kcal:98,protein:11,carbs:3.4,fat:4.3},
  {name:"Skuta",unit:"g",baseAmount:100,kcal:103,protein:11,carbs:4,fat:4.5},
  {name:"Ricotta",unit:"g",baseAmount:100,kcal:174,protein:11,carbs:3,fat:13},
  {name:"Feta sir",unit:"g",baseAmount:30,kcal:75,protein:4,carbs:1.2,fat:6},
  {name:"Mozzarella",unit:"g",baseAmount:30,kcal:72,protein:5,carbs:0.6,fat:5.5},
  {name:"Mozzarella (light)",unit:"g",baseAmount:30,kcal:54,protein:6,carbs:0.6,fat:3},
  {name:"Gouda",unit:"g",baseAmount:30,kcal:101,protein:7,carbs:0.6,fat:8},
  {name:"Edamer",unit:"g",baseAmount:30,kcal:92,protein:7,carbs:0.5,fat:7},
  {name:"Parmezan",unit:"g",baseAmount:15,kcal:59,protein:5,carbs:0,fat:4},
  {name:"Cheddar",unit:"g",baseAmount:30,kcal:123,protein:7,carbs:0.4,fat:10},
  {name:"Gauda dimljena",unit:"g",baseAmount:30,kcal:103,protein:7,carbs:0.5,fat:8},
  {name:"Brie",unit:"g",baseAmount:30,kcal:101,protein:6,carbs:0.1,fat:8.5},
  {name:"Camembert",unit:"g",baseAmount:30,kcal:87,protein:5.5,carbs:0.1,fat:7},
  {name:"Kravlje mlijeko (punomasno)",unit:"ml",baseAmount:200,kcal:130,protein:6.8,carbs:9.4,fat:7},
  {name:"Maslac",unit:"g",baseAmount:10,kcal:72,protein:0.1,carbs:0,fat:8},
  {name:"Ghee",unit:"g",baseAmount:10,kcal:90,protein:0,carbs:0,fat:10},
  {name:"Pavlaka (20%)",unit:"g",baseAmount:30,kcal:60,protein:0.7,carbs:1.2,fat:6},
  {name:"Kiselo vrhnje",unit:"g",baseAmount:30,kcal:57,protein:0.7,carbs:1.4,fat:5.4},
  {name:"Krem sir",unit:"g",baseAmount:30,kcal:88,protein:2,carbs:1.4,fat:8.5},
  {name:"Mascarpone",unit:"g",baseAmount:30,kcal:138,protein:1.5,carbs:1,fat:14},
  {name:"Proteinski jogurt",unit:"g",baseAmount:150,kcal:105,protein:15,carbs:8,fat:1},
  {name:"Kruh bijeli",unit:"kriška",baseAmount:1,kcal:80,protein:3,carbs:15,fat:1},
  {name:"Kruh integralni",unit:"kriška",baseAmount:1,kcal:69,protein:3.6,carbs:12,fat:1.1},
  {name:"Kruh raženi",unit:"kriška",baseAmount:1,kcal:65,protein:2.7,carbs:12,fat:0.7},
  {name:"Kruh s kvascem (domaći)",unit:"kriška",baseAmount:1,kcal:75,protein:3,carbs:14,fat:1},
  {name:"Bagel",unit:"kom",baseAmount:1,kcal:245,protein:10,carbs:48,fat:1.5},
  {name:"Ciabatta",unit:"g",baseAmount:60,kcal:156,protein:5.4,carbs:30,fat:1.5},
  {name:"Baguette",unit:"g",baseAmount:50,kcal:138,protein:5,carbs:26,fat:1},
  {name:"Lepinju (hamburger)",unit:"kom",baseAmount:1,kcal:120,protein:4,carbs:22,fat:2},
  {name:"Tortilja pšenična",unit:"kom",baseAmount:1,kcal:146,protein:4,carbs:24,fat:3.5},
  {name:"Tortilja kukuruzna",unit:"kom",baseAmount:1,kcal:104,protein:2.5,carbs:20,fat:2},
  {name:"Pitta kruh",unit:"kom",baseAmount:1,kcal:165,protein:6,carbs:33,fat:1},
  {name:"Dvopek",unit:"g",baseAmount:10,kcal:40,protein:1.4,carbs:7,fat:0.5},
  {name:"Rižini keksi",unit:"kom",baseAmount:1,kcal:35,protein:0.7,carbs:7,fat:0.3},
  {name:"Krekeri",unit:"g",baseAmount:30,kcal:130,protein:3,carbs:20,fat:4.5},
  {name:"Riža bijela (kuhana)",unit:"g",baseAmount:100,kcal:130,protein:2.7,carbs:28,fat:0.3},
  {name:"Riža smeđa (kuhana)",unit:"g",baseAmount:100,kcal:112,protein:2.6,carbs:23,fat:0.9},
  {name:"Riža basmati (kuhana)",unit:"g",baseAmount:100,kcal:121,protein:2.5,carbs:26,fat:0.4},
  {name:"Riža jasmine (kuhana)",unit:"g",baseAmount:100,kcal:129,protein:2.7,carbs:28,fat:0.3},
  {name:"Tjestenina bijela (kuhana)",unit:"g",baseAmount:100,kcal:131,protein:5,carbs:25,fat:1.1},
  {name:"Tjestenina integralna (kuhana)",unit:"g",baseAmount:100,kcal:124,protein:5,carbs:23,fat:1.1},
  {name:"Špageti (kuhani)",unit:"g",baseAmount:100,kcal:131,protein:5,carbs:25,fat:1.1},
  {name:"Penne (kuhane)",unit:"g",baseAmount:100,kcal:131,protein:5,carbs:25,fat:1.1},
  {name:"Fusilli (kuhani)",unit:"g",baseAmount:100,kcal:131,protein:5,carbs:25,fat:1.1},
  {name:"Lasagne (kuhane)",unit:"g",baseAmount:100,kcal:131,protein:5,carbs:25,fat:1.1},
  {name:"Gnocchi",unit:"g",baseAmount:100,kcal:130,protein:3,carbs:27,fat:0.8},
  {name:"Kus-kus (kuhani)",unit:"g",baseAmount:100,kcal:112,protein:3.8,carbs:23,fat:0.2},
  {name:"Bulgur (kuhan)",unit:"g",baseAmount:100,kcal:83,protein:3,carbs:19,fat:0.2},
  {name:"Quinoa (kuhana)",unit:"g",baseAmount:100,kcal:120,protein:4.4,carbs:21,fat:1.9},
  {name:"Proso (kuhano)",unit:"g",baseAmount:100,kcal:119,protein:3.5,carbs:23,fat:1},
  {name:"Heljda (kuhana)",unit:"g",baseAmount:100,kcal:92,protein:3.4,carbs:20,fat:0.6},
  {name:"Ječam (kuhan)",unit:"g",baseAmount:100,kcal:123,protein:2.3,carbs:28,fat:0.4},
  {name:"Zob (kuhana)",unit:"g",baseAmount:100,kcal:71,protein:2.5,carbs:12,fat:1.5},
  {name:"Zobene pahuljice",unit:"g",baseAmount:50,kcal:189,protein:6.5,carbs:32,fat:3.5},
  {name:"Müsli",unit:"g",baseAmount:50,kcal:184,protein:5,carbs:32,fat:3.5},
  {name:"Granola",unit:"g",baseAmount:50,kcal:224,protein:5,carbs:32,fat:9},
  {name:"Cornflakes",unit:"g",baseAmount:30,kcal:114,protein:2,carbs:25,fat:0.3},
  {name:"Rižine pahuljice",unit:"g",baseAmount:30,kcal:113,protein:2,carbs:26,fat:0.1},
  {name:"Polenta (kuhana)",unit:"g",baseAmount:100,kcal:70,protein:1.6,carbs:15,fat:0.3},
  {name:"Palačinka (s mlijekom)",unit:"kom",baseAmount:1,kcal:93,protein:3,carbs:11,fat:3.7},
  {name:"Vafli",unit:"kom",baseAmount:1,kcal:218,protein:6,carbs:25,fat:10},
  {name:"Jabuka",unit:"kom",baseAmount:1,kcal:72,protein:0.4,carbs:19,fat:0.2},
  {name:"Kruška",unit:"kom",baseAmount:1,kcal:96,protein:0.6,carbs:26,fat:0.2},
  {name:"Banana",unit:"kom",baseAmount:1,kcal:89,protein:1.1,carbs:23,fat:0.3},
  {name:"Naranča",unit:"kom",baseAmount:1,kcal:62,protein:1.2,carbs:15,fat:0.2},
  {name:"Mandarina",unit:"kom",baseAmount:1,kcal:45,protein:0.7,carbs:11,fat:0.3},
  {name:"Grejpfrut",unit:"kom",baseAmount:1,kcal:82,protein:1.6,carbs:21,fat:0.3},
  {name:"Limun",unit:"kom",baseAmount:1,kcal:17,protein:0.6,carbs:5,fat:0.2},
  {name:"Limeta",unit:"kom",baseAmount:1,kcal:20,protein:0.5,carbs:7,fat:0.1},
  {name:"Jagode",unit:"g",baseAmount:100,kcal:32,protein:0.7,carbs:7.7,fat:0.3},
  {name:"Maline",unit:"g",baseAmount:100,kcal:53,protein:1.2,carbs:12,fat:0.7},
  {name:"Kupine",unit:"g",baseAmount:100,kcal:43,protein:1.4,carbs:10,fat:0.5},
  {name:"Borovnice",unit:"g",baseAmount:100,kcal:57,protein:0.7,carbs:14,fat:0.3},
  {name:"Trešnje",unit:"g",baseAmount:100,kcal:63,protein:1.1,carbs:16,fat:0.2},
  {name:"Višnje",unit:"g",baseAmount:100,kcal:50,protein:1,carbs:12.2,fat:0.3},
  {name:"Grožđe",unit:"g",baseAmount:100,kcal:69,protein:0.7,carbs:18,fat:0.2},
  {name:"Lubenica",unit:"g",baseAmount:100,kcal:30,protein:0.6,carbs:7.6,fat:0.2},
  {name:"Dinja",unit:"g",baseAmount:100,kcal:34,protein:0.8,carbs:8.2,fat:0.2},
  {name:"Breskva",unit:"kom",baseAmount:1,kcal:58,protein:1.4,carbs:14,fat:0.4},
  {name:"Nektarina",unit:"kom",baseAmount:1,kcal:62,protein:1.5,carbs:15,fat:0.5},
  {name:"Marelica",unit:"kom",baseAmount:1,kcal:17,protein:0.5,carbs:4,fat:0.1},
  {name:"Šljiva",unit:"kom",baseAmount:1,kcal:30,protein:0.5,carbs:8,fat:0.2},
  {name:"Kivi",unit:"kom",baseAmount:1,kcal:42,protein:0.8,carbs:10,fat:0.4},
  {name:"Mango",unit:"g",baseAmount:100,kcal:60,protein:0.8,carbs:15,fat:0.4},
  {name:"Papaja",unit:"g",baseAmount:100,kcal:43,protein:0.5,carbs:11,fat:0.3},
  {name:"Ananas",unit:"g",baseAmount:100,kcal:50,protein:0.5,carbs:13,fat:0.1},
  {name:"Avokado",unit:"g",baseAmount:100,kcal:160,protein:2,carbs:8.5,fat:14.7},
  {name:"Kokos (svježi)",unit:"g",baseAmount:30,kcal:106,protein:1,carbs:4.5,fat:10},
  {name:"Smokve (svježe)",unit:"kom",baseAmount:1,kcal:37,protein:0.4,carbs:10,fat:0.1},
  {name:"Smokve (sušene)",unit:"kom",baseAmount:1,kcal:21,protein:0.3,carbs:5.5,fat:0.1},
  {name:"Datulje",unit:"kom",baseAmount:1,kcal:23,protein:0.2,carbs:6.2,fat:0},
  {name:"Grožđice",unit:"g",baseAmount:30,kcal:90,protein:0.9,carbs:23,fat:0.1},
  {name:"Suhe šljive",unit:"kom",baseAmount:1,kcal:23,protein:0.2,carbs:6,fat:0.1},
  {name:"Suhe marelice",unit:"kom",baseAmount:1,kcal:17,protein:0.4,carbs:4,fat:0},
  {name:"Nara",unit:"g",baseAmount:100,kcal:83,protein:1.7,carbs:19,fat:1.2},
  {name:"Lichi",unit:"g",baseAmount:100,kcal:66,protein:0.8,carbs:17,fat:0.4},
  {name:"Durian",unit:"g",baseAmount:100,kcal:147,protein:1.5,carbs:27,fat:5.3},
  {name:"Zvjezdano voće",unit:"g",baseAmount:100,kcal:31,protein:1,carbs:7,fat:0.3},
  {name:"Guava",unit:"g",baseAmount:100,kcal:68,protein:2.6,carbs:14,fat:1},
  {name:"Brokula (kuhana)",unit:"g",baseAmount:100,kcal:35,protein:2.4,carbs:7.2,fat:0.4},
  {name:"Cvjetača (kuhana)",unit:"g",baseAmount:100,kcal:23,protein:1.8,carbs:4.5,fat:0.3},
  {name:"Kelj",unit:"g",baseAmount:100,kcal:35,protein:2.2,carbs:8.8,fat:0.5},
  {name:"Prokulice",unit:"g",baseAmount:100,kcal:43,protein:3.4,carbs:8.9,fat:0.3},
  {name:"Špinat (svježi)",unit:"g",baseAmount:100,kcal:23,protein:2.9,carbs:3.6,fat:0.4},
  {name:"Špinat (kuhani)",unit:"g",baseAmount:100,kcal:23,protein:2.5,carbs:3.8,fat:0.3},
  {name:"Rukola",unit:"g",baseAmount:30,kcal:8,protein:0.6,carbs:1.2,fat:0.2},
  {name:"Zelena salata",unit:"g",baseAmount:50,kcal:7,protein:0.7,carbs:1.2,fat:0.1},
  {name:"Iceberg salata",unit:"g",baseAmount:100,kcal:14,protein:0.9,carbs:3,fat:0.1},
  {name:"Radiccio",unit:"g",baseAmount:50,kcal:11,protein:0.7,carbs:2.1,fat:0.1},
  {name:"Endivija",unit:"g",baseAmount:50,kcal:8,protein:0.6,carbs:1.7,fat:0.1},
  {name:"Rajčica",unit:"kom",baseAmount:1,kcal:22,protein:1.1,carbs:4.8,fat:0.2},
  {name:"Rajčica cherry",unit:"g",baseAmount:100,kcal:18,protein:0.9,carbs:3.9,fat:0.2},
  {name:"Krastavac",unit:"kom",baseAmount:1,kcal:16,protein:0.7,carbs:3.6,fat:0.1},
  {name:"Paprika crvena",unit:"kom",baseAmount:1,kcal:31,protein:1,carbs:7,fat:0.3},
  {name:"Paprika zelena",unit:"kom",baseAmount:1,kcal:24,protein:1,carbs:5.5,fat:0.3},
  {name:"Paprika žuta",unit:"kom",baseAmount:1,kcal:27,protein:1,carbs:6.3,fat:0.2},
  {name:"Tikvica",unit:"kom",baseAmount:1,kcal:33,protein:2.4,carbs:6,fat:0.6},
  {name:"Patlidžan",unit:"kom",baseAmount:1,kcal:97,protein:3.6,carbs:23,fat:0.6},
  {name:"Bundeva",unit:"g",baseAmount:100,kcal:26,protein:1,carbs:7,fat:0.1},
  {name:"Mrkva",unit:"kom",baseAmount:1,kcal:25,protein:0.6,carbs:6,fat:0.1},
  {name:"Celer (korijen)",unit:"g",baseAmount:100,kcal:42,protein:1.5,carbs:9.2,fat:0.3},
  {name:"Celer (stapke)",unit:"g",baseAmount:50,kcal:7,protein:0.4,carbs:1.7,fat:0.1},
  {name:"Korijen peršina",unit:"g",baseAmount:100,kcal:55,protein:2.2,carbs:11,fat:0.5},
  {name:"Repa",unit:"g",baseAmount:100,kcal:43,protein:1.6,carbs:10,fat:0.1},
  {name:"Rotkvica",unit:"g",baseAmount:100,kcal:16,protein:0.7,carbs:3.4,fat:0.1},
  {name:"Luk (crni)",unit:"kom",baseAmount:1,kcal:44,protein:1.2,carbs:10,fat:0.1},
  {name:"Luk (bijeli)",unit:"g",baseAmount:10,kcal:15,protein:0.6,carbs:3.5,fat:0},
  {name:"Češnjak",unit:"g",baseAmount:10,kcal:15,protein:0.6,carbs:3.1,fat:0.1},
  {name:"Ljutika",unit:"g",baseAmount:30,kcal:22,protein:0.8,carbs:5.1,fat:0.1},
  {name:"Poriluk",unit:"g",baseAmount:100,kcal:61,protein:1.5,carbs:14,fat:0.3},
  {name:"Kukuruz (kuhan)",unit:"g",baseAmount:100,kcal:96,protein:3.4,carbs:21,fat:1.5},
  {name:"Kukuruz (konzerva)",unit:"g",baseAmount:100,kcal:86,protein:3.2,carbs:19,fat:1.2},
  {name:"Grašak (svježi)",unit:"g",baseAmount:100,kcal:81,protein:5.4,carbs:14,fat:0.4},
  {name:"Grašak (smrznuti)",unit:"g",baseAmount:100,kcal:77,protein:5.4,carbs:14,fat:0.3},
  {name:"Mahune",unit:"g",baseAmount:100,kcal:31,protein:1.8,carbs:7,fat:0.1},
  {name:"Edamame",unit:"g",baseAmount:100,kcal:122,protein:11,carbs:10,fat:5.2},
  {name:"Brokula rabe",unit:"g",baseAmount:100,kcal:22,protein:3.2,carbs:2.9,fat:0.5},
  {name:"Artičoka",unit:"g",baseAmount:100,kcal:47,protein:3.3,carbs:11,fat:0.2},
  {name:"Šparoge",unit:"g",baseAmount:100,kcal:20,protein:2.2,carbs:3.9,fat:0.1},
  {name:"Bambus (izdanci)",unit:"g",baseAmount:100,kcal:27,protein:2.6,carbs:5.2,fat:0.3},
  {name:"Krumpir bijeli (kuhan)",unit:"g",baseAmount:100,kcal:87,protein:1.9,carbs:20,fat:0.1},
  {name:"Krumpir crveni (kuhan)",unit:"g",baseAmount:100,kcal:70,protein:1.9,carbs:15,fat:0.1},
  {name:"Batat (kuhan)",unit:"g",baseAmount:100,kcal:76,protein:1.4,carbs:18,fat:0.1},
  {name:"Jam (kuhan)",unit:"g",baseAmount:100,kcal:116,protein:1.5,carbs:28,fat:0.2},
  {name:"Blitva (kuhana)",unit:"g",baseAmount:100,kcal:20,protein:1.9,carbs:4,fat:0.1},
  {name:"Kelj pupčar",unit:"g",baseAmount:100,kcal:43,protein:3.4,carbs:9,fat:0.3},
  {name:"Kineski kupus",unit:"g",baseAmount:100,kcal:16,protein:1.2,carbs:3.2,fat:0.2},
  {name:"Cikla (kuhana)",unit:"g",baseAmount:100,kcal:44,protein:1.7,carbs:10,fat:0.2},
  {name:"Kohlrabi",unit:"g",baseAmount:100,kcal:27,protein:1.7,carbs:6.2,fat:0.1},
  {name:"Okra",unit:"g",baseAmount:100,kcal:33,protein:1.9,carbs:7.5,fat:0.2},
  {name:"Šitake gljive",unit:"g",baseAmount:100,kcal:34,protein:2.2,carbs:6.8,fat:0.5},
  {name:"Portobello gljive",unit:"g",baseAmount:100,kcal:22,protein:2.1,carbs:3.9,fat:0.3},
  {name:"Šampinjoni",unit:"g",baseAmount:100,kcal:22,protein:3.1,carbs:3.3,fat:0.3},
  {name:"Vrganj",unit:"g",baseAmount:100,kcal:25,protein:3,carbs:4,fat:0.5},
  {name:"Lisičarke",unit:"g",baseAmount:100,kcal:38,protein:1.5,carbs:8.8,fat:0.5},
  {name:"Leća (kuhana)",unit:"g",baseAmount:100,kcal:116,protein:9,carbs:20,fat:0.4},
  {name:"Leća crvena (kuhana)",unit:"g",baseAmount:100,kcal:106,protein:9,carbs:18,fat:0.4},
  {name:"Slanutak (kuhan)",unit:"g",baseAmount:100,kcal:164,protein:8.9,carbs:27,fat:2.6},
  {name:"Grah bijeli (kuhan)",unit:"g",baseAmount:100,kcal:139,protein:9,carbs:25,fat:0.4},
  {name:"Grah crni (kuhan)",unit:"g",baseAmount:100,kcal:132,protein:8.9,carbs:24,fat:0.5},
  {name:"Grah kidney (kuhan)",unit:"g",baseAmount:100,kcal:127,protein:8.7,carbs:23,fat:0.5},
  {name:"Grah pinto (kuhan)",unit:"g",baseAmount:100,kcal:143,protein:9,carbs:26,fat:0.7},
  {name:"Soja (kuhana)",unit:"g",baseAmount:100,kcal:173,protein:17,carbs:10,fat:9},
  {name:"Tofu (čvrsti)",unit:"g",baseAmount:100,kcal:76,protein:8,carbs:1.9,fat:4.2},
  {name:"Tempeh",unit:"g",baseAmount:100,kcal:193,protein:19,carbs:9,fat:11},
  {name:"Edamame (kuhani)",unit:"g",baseAmount:100,kcal:122,protein:11,carbs:10,fat:5.2},
  {name:"Bob (kuhan)",unit:"g",baseAmount:100,kcal:110,protein:7.6,carbs:20,fat:0.4},
  {name:"Hummus",unit:"g",baseAmount:50,kcal:117,protein:3.5,carbs:10,fat:7},
  {name:"Bademi",unit:"g",baseAmount:30,kcal:174,protein:6.3,carbs:6,fat:15},
  {name:"Orasi",unit:"g",baseAmount:30,kcal:196,protein:4.6,carbs:4.1,fat:19.6},
  {name:"Lješnjaci",unit:"g",baseAmount:30,kcal:188,protein:4.5,carbs:5,fat:18.4},
  {name:"Indijski oraščić",unit:"g",baseAmount:30,kcal:157,protein:5.1,carbs:9,fat:12.4},
  {name:"Makadamija",unit:"g",baseAmount:30,kcal:204,protein:2.2,carbs:3.9,fat:21.5},
  {name:"Pekan",unit:"g",baseAmount:30,kcal:207,protein:2.7,carbs:4,fat:21.6},
  {name:"Pistaći",unit:"g",baseAmount:30,kcal:172,protein:6.3,carbs:8.7,fat:14},
  {name:"Kikiriki",unit:"g",baseAmount:30,kcal:161,protein:7.3,carbs:4.7,fat:14},
  {name:"Pinjoli",unit:"g",baseAmount:15,kcal:96,protein:1.9,carbs:1.9,fat:9.7},
  {name:"Sjemenke bundeve",unit:"g",baseAmount:20,kcal:113,protein:5.9,carbs:3.8,fat:9.6},
  {name:"Sjemenke suncokreta",unit:"g",baseAmount:20,kcal:116,protein:4.2,carbs:3.8,fat:10.1},
  {name:"Sjemenke lana",unit:"g",baseAmount:10,kcal:53,protein:1.8,carbs:2.9,fat:4.3},
  {name:"Sjemenke chia",unit:"g",baseAmount:15,kcal:72,protein:2.5,carbs:6.2,fat:4.5},
  {name:"Konopljine sjemenke",unit:"g",baseAmount:15,kcal:83,protein:4.9,carbs:1.3,fat:6.5},
  {name:"Sjemenke sezama",unit:"g",baseAmount:15,kcal:89,protein:2.7,carbs:3.6,fat:7.7},
  {name:"Mak",unit:"g",baseAmount:10,kcal:52,protein:1.8,carbs:3.5,fat:4.1},
  {name:"Kikiriki maslac",unit:"g",baseAmount:32,kcal:188,protein:8,carbs:6,fat:16},
  {name:"Bademov maslac",unit:"g",baseAmount:32,kcal:196,protein:7,carbs:7,fat:17},
  {name:"Tahini",unit:"g",baseAmount:15,kcal:89,protein:2.5,carbs:3.2,fat:8.1},
  {name:"Maslinovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Kokosovo ulje",unit:"ml",baseAmount:10,kcal:90,protein:0,carbs:0,fat:10},
  {name:"Suncokretovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Repičino ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Avokadovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Ghee",unit:"ml",baseAmount:10,kcal:90,protein:0,carbs:0,fat:10},
  {name:"Maslac (nesoljeni)",unit:"g",baseAmount:10,kcal:72,protein:0.1,carbs:0,fat:8.1},
  {name:"Margarin",unit:"g",baseAmount:10,kcal:71,protein:0,carbs:0,fat:8},
  {name:"Majonezu",unit:"g",baseAmount:15,kcal:99,protein:0.2,carbs:0.1,fat:10.9},
  {name:"Senf",unit:"g",baseAmount:10,kcal:9,protein:0.6,carbs:0.7,fat:0.5},
  {name:"Ketchup",unit:"g",baseAmount:15,kcal:16,protein:0.3,carbs:3.8,fat:0.1},
  {name:"Soja umak",unit:"ml",baseAmount:15,kcal:9,protein:1.5,carbs:0.9,fat:0},
  {name:"Sol",unit:"g",baseAmount:5,kcal:0,protein:0,carbs:0,fat:0},
  {name:"Šećer bijeli",unit:"g",baseAmount:10,kcal:40,protein:0,carbs:10,fat:0},
  {name:"Šećer smeđi",unit:"g",baseAmount:10,kcal:38,protein:0,carbs:9.8,fat:0},
  {name:"Med",unit:"g",baseAmount:20,kcal:61,protein:0.1,carbs:16.5,fat:0},
  {name:"Javorov sirup",unit:"ml",baseAmount:15,kcal:52,protein:0,carbs:13,fat:0},
  {name:"Agavin sirup",unit:"ml",baseAmount:15,kcal:47,protein:0,carbs:12,fat:0},
  {name:"Stevija",unit:"g",baseAmount:1,kcal:0,protein:0,carbs:0,fat:0},
  {name:"Ocat jabučni",unit:"ml",baseAmount:15,kcal:3,protein:0,carbs:0.1,fat:0},
  {name:"Balzamični ocat",unit:"ml",baseAmount:15,kcal:25,protein:0.2,carbs:5,fat:0},
  {name:"Worcestershire umak",unit:"ml",baseAmount:10,kcal:12,protein:0.4,carbs:2.7,fat:0},
  {name:"Tabasco",unit:"ml",baseAmount:5,kcal:1,protein:0,carbs:0.1,fat:0},
  {name:"Sriracha",unit:"g",baseAmount:15,kcal:19,protein:0.5,carbs:3.8,fat:0.2},
  {name:"Curry prah",unit:"g",baseAmount:5,kcal:16,protein:0.6,carbs:2.9,fat:0.7},
  {name:"Kurkuma",unit:"g",baseAmount:5,kcal:16,protein:0.5,carbs:3,fat:0.4},
  {name:"Cimet",unit:"g",baseAmount:5,kcal:13,protein:0.2,carbs:3.9,fat:0.1},
  {name:"Paprika (mljevena)",unit:"g",baseAmount:5,kcal:15,protein:0.7,carbs:3,fat:0.7},
  {name:"Chili prah",unit:"g",baseAmount:5,kcal:15,protein:0.7,carbs:2.8,fat:0.8},
  {name:"Voda",unit:"ml",baseAmount:250,kcal:0,protein:0,carbs:0,fat:0},
  {name:"Kava (espresso)",unit:"kom",baseAmount:1,kcal:2,protein:0.1,carbs:0,fat:0},
  {name:"Kava (filter)",unit:"ml",baseAmount:200,kcal:2,protein:0.3,carbs:0,fat:0},
  {name:"Kava s mlijekom",unit:"ml",baseAmount:200,kcal:51,protein:3.5,carbs:4.9,fat:2},
  {name:"Cappuccino",unit:"ml",baseAmount:150,kcal:74,protein:4,carbs:7,fat:3},
  {name:"Latte",unit:"ml",baseAmount:250,kcal:130,protein:7,carbs:13,fat:5},
  {name:"Chai latte",unit:"ml",baseAmount:250,kcal:200,protein:6,carbs:30,fat:6},
  {name:"Matcha latte",unit:"ml",baseAmount:250,kcal:150,protein:7,carbs:18,fat:5},
  {name:"Crni čaj",unit:"ml",baseAmount:200,kcal:2,protein:0,carbs:0.5,fat:0},
  {name:"Zeleni čaj",unit:"ml",baseAmount:200,kcal:2,protein:0,carbs:0.4,fat:0},
  {name:"Bijeli čaj",unit:"ml",baseAmount:200,kcal:2,protein:0,carbs:0.4,fat:0},
  {name:"Biljni čaj",unit:"ml",baseAmount:200,kcal:2,protein:0,carbs:0.5,fat:0},
  {name:"Sok od naranče (svježi)",unit:"ml",baseAmount:200,kcal:94,protein:1.4,carbs:22,fat:0.4},
  {name:"Sok od jabuke",unit:"ml",baseAmount:200,kcal:96,protein:0.3,carbs:24,fat:0.3},
  {name:"Sok od mrkve",unit:"ml",baseAmount:200,kcal:94,protein:2.2,carbs:22,fat:0.4},
  {name:"Sok od rajčice",unit:"ml",baseAmount:200,kcal:41,protein:1.6,carbs:8.5,fat:0.4},
  {name:"Limunade",unit:"ml",baseAmount:200,kcal:85,protein:0,carbs:22,fat:0},
  {name:"Kokosova voda",unit:"ml",baseAmount:200,kcal:46,protein:1.8,carbs:9,fat:0.5},
  {name:"Energetski napitak",unit:"ml",baseAmount:250,kcal:113,protein:0.5,carbs:28,fat:0},
  {name:"Proteinski shake (voda)",unit:"ml",baseAmount:300,kcal:144,protein:26,carbs:6,fat:2},
  {name:"Smoothie (voćni)",unit:"ml",baseAmount:300,kcal:165,protein:2,carbs:40,fat:0.5},
  {name:"Whey protein prah",unit:"g",baseAmount:30,kcal:120,protein:24,carbs:3,fat:1.5},
  {name:"Casein protein prah",unit:"g",baseAmount:30,kcal:115,protein:24,carbs:2,fat:1},
  {name:"Plant protein prah",unit:"g",baseAmount:30,kcal:115,protein:22,carbs:4,fat:2.5},
  {name:"Kreatin monohidrat",unit:"g",baseAmount:5,kcal:0,protein:0,carbs:0,fat:0},
  {name:"BCAA prah",unit:"g",baseAmount:10,kcal:40,protein:10,carbs:0,fat:0},
  {name:"Proteinska pločica",unit:"kom",baseAmount:1,kcal:200,protein:20,carbs:20,fat:8},
  {name:"Proteinski jogurt",unit:"g",baseAmount:150,kcal:105,protein:15,carbs:8,fat:1},
  {name:"Čokolada tamna (70%)",unit:"g",baseAmount:20,kcal:116,protein:1.7,carbs:7.5,fat:8.3},
  {name:"Čokolada mliječna",unit:"g",baseAmount:20,kcal:108,protein:1.7,carbs:11.8,fat:6.5},
  {name:"Čokolada bijela",unit:"g",baseAmount:20,kcal:112,protein:1.4,carbs:12.5,fat:6.8},
  {name:"Nutella",unit:"g",baseAmount:20,kcal:108,protein:1.3,carbs:12,fat:6.4},
  {name:"Keks (čajni)",unit:"kom",baseAmount:1,kcal:30,protein:0.4,carbs:4.4,fat:1.3},
  {name:"Oreo",unit:"kom",baseAmount:1,kcal:47,protein:0.5,carbs:7,fat:2},
  {name:"Digestiv keks",unit:"kom",baseAmount:1,kcal:67,protein:1,carbs:10,fat:2.5},
  {name:"Čokoladni kolač",unit:"g",baseAmount:80,kcal:340,protein:5,carbs:42,fat:18},
  {name:"Cheesecake",unit:"g",baseAmount:100,kcal:321,protein:5.5,carbs:26,fat:21},
  {name:"Tiramisu",unit:"g",baseAmount:100,kcal:240,protein:5,carbs:24,fat:14},
  {name:"Sladoled vanilija",unit:"g",baseAmount:100,kcal:207,protein:3.5,carbs:23,fat:11},
  {name:"Sladoled čokolada",unit:"g",baseAmount:100,kcal:216,protein:3.7,carbs:26,fat:11.5},
  {name:"Sladoled sorbet",unit:"g",baseAmount:100,kcal:143,protein:0.5,carbs:36,fat:0.3},
  {name:"Gelato",unit:"g",baseAmount:100,kcal:190,protein:3.5,carbs:28,fat:7},
  {name:"Puding",unit:"g",baseAmount:100,kcal:130,protein:3.8,carbs:19,fat:4.5},
  {name:"Palačinke sa džemom",unit:"kom",baseAmount:1,kcal:130,protein:3,carbs:24,fat:2.5},
  {name:"Kroasan",unit:"kom",baseAmount:1,kcal:231,protein:5,carbs:27,fat:12},
  {name:"Pain au chocolat",unit:"kom",baseAmount:1,kcal:252,protein:5.5,carbs:28,fat:14},
  {name:"Muffin čokoladni",unit:"kom",baseAmount:1,kcal:340,protein:5,carbs:48,fat:15},
  {name:"Donut glaziran",unit:"kom",baseAmount:1,kcal:452,protein:5,carbs:52,fat:25},
  {name:"Krafna",unit:"kom",baseAmount:1,kcal:295,protein:5,carbs:32,fat:16},
  {name:"Burger (domaći)",unit:"kom",baseAmount:1,kcal:540,protein:34,carbs:40,fat:26},
  {name:"Hamburger (McDonald's Big Mac tip)",unit:"kom",baseAmount:1,kcal:563,protein:26,carbs:43,fat:33},
  {name:"Pizza Margherita",unit:"g",baseAmount:100,kcal:235,protein:10,carbs:30,fat:8},
  {name:"Pizza 4 formaggi",unit:"g",baseAmount:100,kcal:280,protein:13,carbs:29,fat:13},
  {name:"Hot dog",unit:"kom",baseAmount:1,kcal:310,protein:11,carbs:28,fat:18},
  {name:"Kebab u somunu",unit:"kom",baseAmount:1,kcal:520,protein:28,carbs:55,fat:20},
  {name:"Gyros u piti",unit:"kom",baseAmount:1,kcal:480,protein:26,carbs:52,fat:18},
  {name:"Wrap s piletinom",unit:"kom",baseAmount:1,kcal:420,protein:30,carbs:42,fat:14},
  {name:"Čips (krumpirovi)",unit:"g",baseAmount:30,kcal:152,protein:1.8,carbs:15.9,fat:9.8},
  {name:"Čips kukuruzni (Doritos)",unit:"g",baseAmount:30,kcal:145,protein:2,carbs:18,fat:7},
  {name:"Popcorn (maslo)",unit:"g",baseAmount:30,kcal:149,protein:2,carbs:17,fat:8},
  {name:"Pereci",unit:"g",baseAmount:30,kcal:112,protein:3,carbs:23,fat:0.8},
  {name:"Štapići",unit:"g",baseAmount:30,kcal:130,protein:3.5,carbs:22,fat:4},
  {name:"Rižini keksi slani",unit:"g",baseAmount:30,kcal:117,protein:2,carbs:25,fat:0.5},
  {name:"Nachos",unit:"g",baseAmount:30,kcal:145,protein:2,carbs:19,fat:7},
  {name:"Pita kruh sa humusom",unit:"kom",baseAmount:1,kcal:340,protein:12,carbs:50,fat:9},
  {name:"Quesadilla sir",unit:"kom",baseAmount:1,kcal:380,protein:16,carbs:35,fat:20},
  {name:"Tacos piletina",unit:"kom",baseAmount:1,kcal:185,protein:14,carbs:19,fat:6},
  {name:"Pileća juha",unit:"ml",baseAmount:300,kcal:50,protein:5,carbs:5,fat:1.5},
  {name:"Goveđa juha",unit:"ml",baseAmount:300,kcal:45,protein:5,carbs:4,fat:1.5},
  {name:"Minestrone juha",unit:"ml",baseAmount:300,kcal:76,protein:3,carbs:14,fat:1},
  {name:"Lećina juha",unit:"ml",baseAmount:300,kcal:140,protein:9,carbs:22,fat:2},
  {name:"Rižoto s povrćem",unit:"g",baseAmount:200,kcal:260,protein:6,carbs:48,fat:5},
  {name:"Rižoto s piletinom",unit:"g",baseAmount:200,kcal:310,protein:22,carbs:46,fat:6},
  {name:"Bolonjez s tjesteninom",unit:"g",baseAmount:300,kcal:450,protein:28,carbs:50,fat:16},
  {name:"Carbonara",unit:"g",baseAmount:300,kcal:580,protein:25,carbs:55,fat:28},
  {name:"Lasagne",unit:"g",baseAmount:250,kcal:430,protein:24,carbs:38,fat:20},
  {name:"Musaka",unit:"g",baseAmount:250,kcal:380,protein:22,carbs:28,fat:22},
  {name:"Paella",unit:"g",baseAmount:250,kcal:360,protein:20,carbs:48,fat:8},
  {name:"Punjene paprike",unit:"kom",baseAmount:1,kcal:280,protein:18,carbs:24,fat:12},
  {name:"Sarma",unit:"kom",baseAmount:1,kcal:150,protein:10,carbs:12,fat:7},
  {name:"Pljeskavica (goveđa)",unit:"kom",baseAmount:1,kcal:290,protein:24,carbs:10,fat:17},
  {name:"Ćevapi",unit:"kom",baseAmount:1,kcal:58,protein:5,carbs:1.5,fat:3.8},
  {name:"Wiener Schnitzel",unit:"g",baseAmount:150,kcal:375,protein:27,carbs:18,fat:22},
  {name:"Pohana piletina",unit:"g",baseAmount:150,kcal:340,protein:25,carbs:20,fat:17},
  {name:"Riba pržena",unit:"g",baseAmount:150,kcal:280,protein:22,carbs:14,fat:16},
  {name:"Pohano povrće",unit:"g",baseAmount:150,kcal:230,protein:5,carbs:30,fat:10},
  {name:"Gyros (samo meso)",unit:"g",baseAmount:150,kcal:340,protein:26,carbs:5,fat:24},
  {name:"Pileći nuggets",unit:"kom",baseAmount:1,kcal:47,protein:3,carbs:3,fat:2.5},
  {name:"Prženi krumpir",unit:"g",baseAmount:100,kcal:312,protein:3.4,carbs:41,fat:15},
  {name:"Pohani krumpirići",unit:"g",baseAmount:100,kcal:274,protein:3.6,carbs:34,fat:13},
  {name:"Riža s povrćem (wok)",unit:"g",baseAmount:200,kcal:220,protein:5,carbs:40,fat:4},
  {name:"Vegetarijanski curry",unit:"g",baseAmount:200,kcal:180,protein:6,carbs:25,fat:7},
  {name:"Dal (lećin curry)",unit:"g",baseAmount:200,kcal:210,protein:12,carbs:30,fat:5},
  {name:"Pad Thai (piletina)",unit:"g",baseAmount:250,kcal:380,protein:20,carbs:45,fat:12},
  {name:"Sushi (nigiri)",unit:"kom",baseAmount:2,kcal:70,protein:3.5,carbs:13,fat:0.5},
  {name:"Sushi (maki)",unit:"kom",baseAmount:6,kcal:210,protein:8,carbs:42,fat:1},
  {name:"Džem (jagoda)",unit:"g",baseAmount:20,kcal:47,protein:0.1,carbs:12,fat:0},
  {name:"Džem (marelica)",unit:"g",baseAmount:20,kcal:46,protein:0.1,carbs:12,fat:0},
  {name:"Džem (malina)",unit:"g",baseAmount:20,kcal:45,protein:0.1,carbs:12,fat:0},
  {name:"Marmelada (naranča)",unit:"g",baseAmount:20,kcal:48,protein:0.1,carbs:12,fat:0},
  {name:"Lješnjakov namaz",unit:"g",baseAmount:20,kcal:108,protein:1.3,carbs:12,fat:6.4},
  {name:"Maslac od kikirikija (kremast)",unit:"g",baseAmount:32,kcal:190,protein:8,carbs:7,fat:16},
  {name:"Maslac od badema",unit:"g",baseAmount:32,kcal:196,protein:7,carbs:7,fat:17},
  {name:"Med (cvjetni)",unit:"g",baseAmount:20,kcal:61,protein:0.1,carbs:16.5,fat:0},
  {name:"Sirup od agave",unit:"ml",baseAmount:15,kcal:47,protein:0,carbs:12,fat:0},
  {name:"Javorov sirup",unit:"ml",baseAmount:15,kcal:52,protein:0,carbs:13,fat:0},
  {name:"Čokoladni namaz (tamni)",unit:"g",baseAmount:20,kcal:116,protein:1.2,carbs:12.5,fat:7},
  {name:"Haringa (svježa)",unit:"g",baseAmount:100,kcal:158,protein:18,carbs:0,fat:9},
  {name:"Haringa (marinirana)",unit:"g",baseAmount:50,kcal:99,protein:9,carbs:2,fat:6},
  {name:"Rak (konzerva)",unit:"g",baseAmount:100,kcal:84,protein:18,carbs:0,fat:1},
  {name:"Kavijara (crni)",unit:"g",baseAmount:15,kcal:40,protein:3.9,carbs:0.6,fat:2.6},
  {name:"Pollock",unit:"g",baseAmount:100,kcal:92,protein:19,carbs:0,fat:1},
  {name:"Tilapia",unit:"g",baseAmount:100,kcal:96,protein:20,carbs:0,fat:2},
  {name:"Brancin (pečeni)",unit:"g",baseAmount:100,kcal:124,protein:24,carbs:0,fat:3},
  {name:"Tuna odrezak (svježi)",unit:"g",baseAmount:100,kcal:144,protein:23,carbs:0,fat:5},
  {name:"Langustini (kuhani)",unit:"g",baseAmount:100,kcal:90,protein:20,carbs:0,fat:1},
  {name:"Kapica",unit:"g",baseAmount:100,kcal:69,protein:12,carbs:3,fat:0.7},
  {name:"Kinoa brokula",unit:"g",baseAmount:100,kcal:34,protein:3,carbs:6,fat:0.4},
  {name:"Radicchio salata",unit:"g",baseAmount:50,kcal:11,protein:0.7,carbs:2.1,fat:0.1},
  {name:"Vodena špinat",unit:"g",baseAmount:100,kcal:19,protein:3,carbs:2.5,fat:0.2},
  {name:"Bamija",unit:"g",baseAmount:100,kcal:33,protein:1.9,carbs:7.5,fat:0.2},
  {name:"Fenkl",unit:"g",baseAmount:100,kcal:31,protein:1.2,carbs:7.3,fat:0.2},
  {name:"Artičoka srce",unit:"g",baseAmount:50,kcal:25,protein:1.8,carbs:6,fat:0.2},
  {name:"Šparoge bijele",unit:"g",baseAmount:100,kcal:18,protein:2.2,carbs:3.9,fat:0.1},
  {name:"Grahorice",unit:"g",baseAmount:100,kcal:86,protein:5.6,carbs:15,fat:0.5},
  {name:"Brokcolini",unit:"g",baseAmount:100,kcal:35,protein:3,carbs:5,fat:0.4},
  {name:"Korabica",unit:"g",baseAmount:100,kcal:27,protein:1.7,carbs:6.2,fat:0.1},
  {name:"Rambutan",unit:"g",baseAmount:100,kcal:82,protein:0.9,carbs:21,fat:0.2},
  {name:"Mangosteen",unit:"g",baseAmount:100,kcal:73,protein:0.4,carbs:18,fat:0.6},
  {name:"Dragon fruit",unit:"g",baseAmount:100,kcal:60,protein:1.2,carbs:13,fat:0.4},
  {name:"Jackfruit",unit:"g",baseAmount:100,kcal:95,protein:1.7,carbs:23,fat:0.6},
  {name:"Cherimoya",unit:"g",baseAmount:100,kcal:75,protein:1.6,carbs:18,fat:0.7},
  {name:"Tamarind",unit:"g",baseAmount:30,kcal:72,protein:0.9,carbs:19,fat:0.2},
  {name:"Kumkvat",unit:"g",baseAmount:30,kcal:39,protein:0.6,carbs:10,fat:0.3},
  {name:"Fyzalis",unit:"g",baseAmount:100,kcal:53,protein:1.9,carbs:11,fat:0.7},
  {name:"Loquat",unit:"g",baseAmount:100,kcal:47,protein:0.4,carbs:12,fat:0.2},
  {name:"Kiseli kupus",unit:"g",baseAmount:100,kcal:19,protein:0.9,carbs:4.3,fat:0.1},
  {name:"Kimchi",unit:"g",baseAmount:100,kcal:15,protein:1.1,carbs:2.4,fat:0.5},
  {name:"Kefir (puni)",unit:"ml",baseAmount:200,kcal:122,protein:7,carbs:9.6,fat:5},
  {name:"Kombucha",unit:"ml",baseAmount:250,kcal:30,protein:0,carbs:7,fat:0},
  {name:"Miso pasta",unit:"g",baseAmount:15,kcal:28,protein:1.9,carbs:3.5,fat:0.8},
  {name:"Tempeh (prženi)",unit:"g",baseAmount:100,kcal:222,protein:20,carbs:12,fat:13},
  {name:"Natto",unit:"g",baseAmount:100,kcal:212,protein:18,carbs:14,fat:11},
  {name:"Kiseli krastavci",unit:"g",baseAmount:100,kcal:11,protein:0.5,carbs:2.3,fat:0.1},
  {name:"Teff (kuhan)",unit:"g",baseAmount:100,kcal:101,protein:3.9,carbs:20,fat:0.7},
  {name:"Sorgo (kuhano)",unit:"g",baseAmount:100,kcal:329,protein:11,carbs:72,fat:3.5},
  {name:"Kamut (kuhan)",unit:"g",baseAmount:100,kcal:251,protein:11,carbs:51,fat:2},
  {name:"Spelt (kuhan)",unit:"g",baseAmount:100,kcal:127,protein:5,carbs:26,fat:0.9},
  {name:"Divlja riža (kuhana)",unit:"g",baseAmount:100,kcal:101,protein:4,carbs:21,fat:0.3},
  {name:"Amarant (kuhan)",unit:"g",baseAmount:100,kcal:102,protein:3.8,carbs:19,fat:1.6},
  {name:"Freekeh (kuhan)",unit:"g",baseAmount:100,kcal:160,protein:6,carbs:30,fat:1},
  {name:"Whey izolat prah",unit:"g",baseAmount:30,kcal:110,protein:27,carbs:1,fat:0.5},
  {name:"Gainer prah",unit:"g",baseAmount:100,kcal:360,protein:22,carbs:62,fat:5},
  {name:"L-glutamin",unit:"g",baseAmount:10,kcal:40,protein:10,carbs:0,fat:0},
  {name:"Omega-3 kapsule",unit:"kom",baseAmount:1,kcal:10,protein:0,carbs:0,fat:1},
  {name:"Magnezij (prašak)",unit:"g",baseAmount:5,kcal:5,protein:0,carbs:1.5,fat:0},
  {name:"Rižoto s gljivama",unit:"g",baseAmount:200,kcal:280,protein:7,carbs:46,fat:7},
  {name:"Palenta s gorgonzolom",unit:"g",baseAmount:200,kcal:320,protein:10,carbs:38,fat:15},
  {name:"Focaccia",unit:"g",baseAmount:80,kcal:218,protein:6.4,carbs:36,fat:6.4},
  {name:"Ciabatta s maslinovim uljem",unit:"g",baseAmount:80,kcal:260,protein:7.5,carbs:38,fat:9},
  {name:"Bruschettu",unit:"g",baseAmount:80,kcal:195,protein:6,carbs:32,fat:5.5},
  {name:"Tahini haljumi",unit:"g",baseAmount:30,kcal:90,protein:5.8,carbs:0.5,fat:7.2},
  {name:"Labneh",unit:"g",baseAmount:50,kcal:60,protein:5,carbs:2,fat:3.7},
  {name:"Baba ghanoush",unit:"g",baseAmount:50,kcal:52,protein:1.5,carbs:5,fat:3},
  {name:"Tzatziki",unit:"g",baseAmount:50,kcal:43,protein:2.5,carbs:2.6,fat:2.8},
  {name:"Guacamole",unit:"g",baseAmount:50,kcal:80,protein:1,carbs:4.6,fat:7},
  {name:"Temeljac goveđi",unit:"ml",baseAmount:300,kcal:45,protein:6,carbs:0.5,fat:1.5},
  {name:"Temeljac pileći",unit:"ml",baseAmount:300,kcal:38,protein:5.5,carbs:0.4,fat:1},
  {name:"Temeljac riblje",unit:"ml",baseAmount:300,kcal:30,protein:5,carbs:0.3,fat:0.5},
  {name:"Temeljac povrtni",unit:"ml",baseAmount:300,kcal:22,protein:1,carbs:5,fat:0.1},
  {name:"Tom yum juha",unit:"ml",baseAmount:300,kcal:80,protein:5,carbs:8,fat:3},
  {name:"Pho juha s govedinom",unit:"g",baseAmount:400,kcal:355,protein:25,carbs:42,fat:8},
  {name:"Ramen (piletina)",unit:"g",baseAmount:400,kcal:485,protein:25,carbs:59,fat:15},
  {name:"Bouillabaisse",unit:"g",baseAmount:300,kcal:175,protein:18,carbs:8,fat:8},
  {name:"Čorba od cikle",unit:"ml",baseAmount:300,kcal:88,protein:2.5,carbs:18,fat:0.5},
  {name:"Pivo (0.33l)",unit:"ml",baseAmount:330,kcal:142,protein:1.1,carbs:13,fat:0},
  {name:"Vino bijelo (čaša)",unit:"ml",baseAmount:150,kcal:121,protein:0.1,carbs:4,fat:0},
  {name:"Vino crveno (čaša)",unit:"ml",baseAmount:150,kcal:127,protein:0.1,carbs:4.2,fat:0},
  {name:"Prosecco (čaša)",unit:"ml",baseAmount:150,kcal:108,protein:0.3,carbs:5,fat:0},
  {name:"Rakija (1 čašica)",unit:"ml",baseAmount:30,kcal:66,protein:0,carbs:0,fat:0},
  {name:"Viski (1 čašica)",unit:"ml",baseAmount:40,kcal:95,protein:0,carbs:0,fat:0},
  {name:"Gin (1 čašica)",unit:"ml",baseAmount:40,kcal:97,protein:0,carbs:0,fat:0},
  {name:"Vodka (1 čašica)",unit:"ml",baseAmount:40,kcal:97,protein:0,carbs:0,fat:0},
  {name:"Rum (1 čašica)",unit:"ml",baseAmount:40,kcal:97,protein:0,carbs:0,fat:0},
  {name:"Soba rezanci (kuhani)",unit:"g",baseAmount:100,kcal:99,protein:5,carbs:21,fat:0.1},
  {name:"Udon rezanci (kuhani)",unit:"g",baseAmount:100,kcal:132,protein:3.4,carbs:27,fat:0.6},
  {name:"Rice paper (suhi)",unit:"g",baseAmount:10,kcal:36,protein:0.3,carbs:8.4,fat:0.1},
  {name:"Dashi juha",unit:"ml",baseAmount:200,kcal:14,protein:2.4,carbs:0.4,fat:0.3},
  {name:"Teriyaki umak",unit:"ml",baseAmount:15,kcal:30,protein:0.7,carbs:6.7,fat:0.1},
  {name:"Oyster umak",unit:"ml",baseAmount:15,kcal:18,protein:0.4,carbs:4.5,fat:0},
  {name:"Hoisin umak",unit:"ml",baseAmount:15,kcal:35,protein:0.5,carbs:7,fat:0.6},
  {name:"Coconut milk (konzerva)",unit:"ml",baseAmount:50,kcal:90,protein:0.9,carbs:2,fat:9.5},
  {name:"Coconut cream",unit:"ml",baseAmount:50,kcal:110,protein:1,carbs:2.8,fat:12},
  {name:"Curry paste crveni",unit:"g",baseAmount:15,kcal:25,protein:0.7,carbs:3.5,fat:1.1},
  {name:"Kimchi fried rice",unit:"g",baseAmount:200,kcal:290,protein:7,carbs:52,fat:6},
  {name:"Bibimbap",unit:"g",baseAmount:350,kcal:490,protein:20,carbs:78,fat:10},
  {name:"Risotto bianco",unit:"g",baseAmount:200,kcal:290,protein:6,carbs:52,fat:6},
  {name:"Osso buco",unit:"g",baseAmount:250,kcal:380,protein:30,carbs:12,fat:24},
  {name:"Saltimbocca",unit:"g",baseAmount:150,kcal:310,protein:30,carbs:2,fat:20},
  {name:"Vitello tonnato",unit:"g",baseAmount:150,kcal:350,protein:26,carbs:6,fat:24},
  {name:"Gnocchi s pestom",unit:"g",baseAmount:200,kcal:380,protein:10,carbs:52,fat:16},
  {name:"Focaccia pomodoro",unit:"g",baseAmount:100,kcal:257,protein:7,carbs:38,fat:9},
  {name:"Bruschetta al pomodoro",unit:"g",baseAmount:100,kcal:193,protein:6,carbs:32,fat:5},
  {name:"Insalata caprese",unit:"g",baseAmount:150,kcal:230,protein:13,carbs:5,fat:18},
  {name:"Panzanella",unit:"g",baseAmount:150,kcal:200,protein:5,carbs:26,fat:9},
  {name:"Moussaka",unit:"g",baseAmount:250,kcal:380,protein:22,carbs:28,fat:22},
  {name:"Greek salad",unit:"g",baseAmount:200,kcal:155,protein:4.5,carbs:10,fat:11},
  {name:"Spanakopita",unit:"g",baseAmount:100,kcal:260,protein:8.5,carbs:25,fat:14},
  {name:"Falafel",unit:"kom",baseAmount:1,kcal:57,protein:2.3,carbs:5.4,fat:3.2},
  {name:"Shawarma piletina",unit:"g",baseAmount:150,kcal:285,protein:24,carbs:14,fat:15},
  {name:"Kofta",unit:"kom",baseAmount:1,kcal:78,protein:6,carbs:2,fat:5},
  {name:"Dolmades (nadjeveno lišće)",unit:"kom",baseAmount:1,kcal:58,protein:1.5,carbs:7,fat:2.8},
  {name:"Fattoush salata",unit:"g",baseAmount:150,kcal:115,protein:2.5,carbs:15,fat:5.5},
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
function nowTime(){const d=new Date();return`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;}

function TimePicker({value,onChange}){
  const parts=(value||"00:00").split(":");
  const h=parts[0]||"00"; const m=parts[1]||"00";
  const hours=Array.from({length:24},(_,i)=>String(i).padStart(2,"0"));
  const mins=["00","05","10","15","20","25","30","35","40","45","50","55"];
  const s={flex:1,padding:"11px 10px",border:"1.5px solid #e8e5df",borderRadius:11,fontSize:16,background:"#fafaf8",color:"#1a1a18",outline:"none",WebkitAppearance:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23aaa' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",paddingRight:28};
  return(
    <div style={{display:"flex",gap:8}}>
      <select style={s} value={h} onChange={e=>onChange(`${e.target.value}:${m}`)}>
        {hours.map(hh=><option key={hh} value={hh}>{hh}:00</option>)}
      </select>
      <select style={s} value={m} onChange={e=>onChange(`${h}:${e.target.value}`)}>
        {mins.map(mm=><option key={mm} value={mm}>{mm} min</option>)}
      </select>
    </div>
  );
}

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
.zt-root{min-height:100dvh;background:#f5f3ef;display:flex;flex-direction:column;}
.zt{font-family:'DM Sans',sans-serif;color:#1a1a18;flex:1;display:flex;flex-direction:column;}

/* desktop sidebar layout */
@media(min-width:900px){
  .zt-root{background:#1a1a18;}

  .zt-sidebar{width:260px;flex-shrink:0;background:#1a1a18;padding:32px 0;position:sticky;top:0;height:100dvh;display:flex;flex-direction:column;}
  .zt-sidebar-logo{padding:0 28px 32px;border-bottom:1px solid #2a2a28;margin-bottom:20px;}
  .zt-sidebar-logo .zt-logo{font-size:28px;}
  .zt-sidebar-nav{display:flex;flex-direction:column;gap:2px;padding:0 12px;flex:1;}
  .zt-sidebar-tab{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:11px;background:none;border:none;font-size:14px;font-weight:400;cursor:pointer;color:#666;width:100%;text-align:left;transition:all .15s;}
  .zt-sidebar-tab:hover{background:#242422;color:#ccc;}
  .zt-sidebar-tab.on{background:#1d9e75;color:#fff;font-weight:500;}
  .zt-sidebar-tab .tab-icon{font-size:18px;width:24px;text-align:center;}
  .zt-sidebar-footer{padding:20px 28px 0;border-top:1px solid #2a2a28;margin-top:auto;}
  .zt-main{flex:1;background:#f5f3ef;border-radius:20px 0 0 20px;overflow:hidden;display:flex;flex-direction:column;}
  .zt-main-hdr{background:#fff;padding:24px 32px;border-bottom:1px solid #f0ede8;display:flex;align-items:center;justify-content:space-between;}
  .zt-main-title{font-family:'Fraunces',serif;font-size:22px;font-weight:300;color:#1a1a18;letter-spacing:-.5px;}
  .zt-body{padding:24px 32px 48px;flex:1;}
  .zt-hdr{display:none;}
}

/* mobile/desktop switch */
.zt-mobile-wrap{display:flex;flex-direction:column;min-height:100dvh;background:#f5f3ef;}
.zt-desktop{display:none!important;}
@media(min-width:900px){
  .zt-mobile-wrap{display:none!important;}
  .zt-desktop{display:flex!important;min-height:100dvh;}
  .zt-body{padding:24px 32px 48px;max-width:680px;}
}

/* mobile header - hidden on desktop */
.zt-hdr{background:#1a1a18;padding:env(safe-area-inset-top,0) 0 0;position:sticky;top:0;z-index:50;}
.zt-hdr-in{padding:16px 18px 0;display:flex;justify-content:space-between;align-items:center;}
.zt-logo{font-family:'Fraunces',serif;font-size:24px;font-weight:300;color:#f5f3ef;letter-spacing:-0.8px;line-height:1;}
.zt-logo em{color:#9fe1cb;font-style:italic;}
.zt-tabbar{display:flex;overflow-x:auto;scrollbar-width:none;border-top:1px solid #2a2a28;-webkit-overflow-scrolling:touch;}
.zt-tabbar::-webkit-scrollbar{display:none;}
.zt-tab{flex:1;min-width:fit-content;padding:12px 16px;background:none;border:none;font-size:13px;font-weight:400;cursor:pointer;color:#555;border-bottom:2px solid transparent;white-space:nowrap;transition:color .15s,border-color .15s;-webkit-tap-highlight-color:transparent;}
.zt-tab.on{color:#f5f3ef;border-bottom-color:#1d9e75;font-weight:500;}
.zt-body{padding:16px 14px 100px;}

/* desktop grid for cards */
@media(min-width:900px){
  .zt-body{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start;}
  .zt-body > .card:first-child,.zt-body > div:first-child{grid-column:1/-1;}
  .cal-wrap{grid-column:1/-1;}
}

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
@keyframes spin{to{transform:translateY(-50%) rotate(360deg)}}
.qty-inp{width:80px;padding:9px 10px;border:2px solid #1d9e75;border-radius:10px;font-size:16px;background:#fff;color:#0f6e56;font-weight:500;outline:none;text-align:center;-webkit-appearance:none;}

/* meal sections */
.meal-hd{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f5f3ef;border-radius:12px 12px 0 0;font-size:13px;font-weight:500;color:#555;}
.meal-bd{background:#fff;border:1px solid #f0ede8;border-top:none;border-radius:0 0 12px 12px;padding:0 14px;margin-bottom:8px;}
.frow{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f8f6f2;}
.frow:last-child{border-bottom:none;}

/* range */
.rrow{margin-bottom:16px;}
.rlbl{display:flex;justify-content:space-between;font-size:14px;color:#666;margin-bottom:8px;}
input[type=range]{width:100%;height:6px;-webkit-appearance:none;appearance:none;border-radius:99px;outline:none;cursor:pointer;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:24px;height:24px;border-radius:50%;background:#fff;border:3px solid currentColor;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.2);}
input[type=range]::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:#fff;border:3px solid currentColor;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.2);}
input[type=range].r-red{background:linear-gradient(to right,#d85a30 0%,#d85a30 var(--pct),#f0ede8 var(--pct),#f0ede8 100%);color:#d85a30;}
input[type=range].r-amber{background:linear-gradient(to right,#ba7517 0%,#ba7517 var(--pct),#f0ede8 var(--pct),#f0ede8 100%);color:#ba7517;}
input[type=range].r-green{background:linear-gradient(to right,#1d9e75 0%,#1d9e75 var(--pct),#f0ede8 var(--pct),#f0ede8 100%);color:#1d9e75;}
input[type=range].r-blue{background:linear-gradient(to right,#378add 0%,#378add var(--pct),#f0ede8 var(--pct),#f0ede8 100%);color:#378add;}

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
  async function updateNutrition(id,item){
    const s=scaleFood({kcal:item.kcalPer,protein:item.proteinPer,carbs:item.carbsPer,fat:item.fatPer,baseAmount:1},item.quantity);
    const{data:d}=await sb.from("nutrition").update({meal:item.meal,quantity:item.quantity,kcal:s.kcal,protein:s.protein,carbs:s.carbs,fat:s.fat}).eq("id",id).select().single();
    if(d)setNutrition(p=>p.map(x=>x.id===id?d:x));
  }
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
    const{data:d,error}=await sb.from("custom_foods").insert({user_id:uid,name:food.name,unit:food.unit,base_amount:food.baseAmount,kcal:food.kcal,protein:food.protein||0,carbs:food.carbs||0,fat:food.fat||0}).select().single();
    if(error){console.error("addCustomFood error:",error);return{error:error.message};}
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

  return{nutrition,digestion,customFoods,weight,loading,addNutrition,removeNutrition,updateNutrition,addDigestion,removeDigestion,addCustomFood,addWeight,removeWeight};
}

// ─── Nutrition tab ────────────────────────────────────────────────────────────
function NutritionTab({nutrition,customFoods,addNutrition,addCustomFood,removeNutrition,updateNutrition}){
  const [selDate,setSelDate]=useState(today());
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [qty,setQty]=useState(1);
  const [meal,setMeal]=useState("Doručak");
  const [custom,setCustom]=useState({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
  const [showCustom,setShowCustom]=useState(false);
  const [saving,setSaving]=useState(false);
  const [customErr,setCustomErr]=useState(null);
  const [editItem,setEditItem]=useState(null); // {id, name, meal, quantity, unit, kcalPer, proteinPer, carbsPer, fatPer}
  const [goal,setGoal]=useState(()=>{try{return+localStorage.getItem("kcal_goal")||2000;}catch{return 2000;}});

  const [apiResults,setApiResults]=useState([]);
  const [apiLoading,setApiLoading]=useState(false);
  const [sheetFoods,setSheetFoods]=useState([]);
  const searchTimer=React.useRef(null);

  // Load sheet foods on mount
  useEffect(()=>{
    loadSheetFoods().then(foods=>{
      if(foods.length>0)setSheetFoods(foods);
    });
  },[]);

  // Merge: sheet foods first, then custom, then builtin (as fallback for anything missing)
  const allFoods=[
    ...sheetFoods,
    ...customFoods.map(cf=>({...cf,_custom:true})),
    ...BUILTIN_FOODS.filter(b=>!sheetFoods.some(s=>s.name.toLowerCase()===b.name.toLowerCase())),
  ];
  const localFiltered=search.length>1?allFoods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).slice(0,6):[];

  React.useEffect(()=>{
    if(search.length<2){setApiResults([]);setApiLoading(false);return;}
    setApiLoading(true);
    clearTimeout(searchTimer.current);
    // short debounce — show local results immediately, API after 250ms
    searchTimer.current=setTimeout(async()=>{
      const ctrl=new AbortController();
      const sig=ctrl.signal;
      try{
        const parseProducts=(products)=>{
          const seen=new Set();
          const out=[];
          for(const p of(products||[])){
            const kcal=p.nutriments?.["energy-kcal_100g"]||p.nutriments?.["energy-kcal"]||0;
            const name=p.product_name_hr||p.product_name_en||p.product_name||"";
            if(!kcal||!name)continue;
            const key=name.toLowerCase();
            if(seen.has(key))continue;
            seen.add(key);
            out.push({
              name,unit:"g",baseAmount:100,
              kcal:Math.round(kcal),
              protein:Math.round((p.nutriments.proteins_100g||0)*10)/10,
              carbs:Math.round((p.nutriments.carbohydrates_100g||0)*10)/10,
              fat:Math.round((p.nutriments.fat_100g||0)*10)/10,
              _api:true,_brand:p.brands||"",
            });
          }
          return out;
        };

        // USDA FoodData Central - besplatno, bez kljuca, generična hrana
        const url=`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(search)}&dataType=SR%20Legacy,Foundation&pageSize=8&api_key=DEMO_KEY`;
        const r=await fetch(url,{signal:sig});
        const d=await r.json();
        const items=(d.foods||[]).filter(f=>f.foodNutrients).map(f=>{
          const get=(id)=>{const n=f.foodNutrients.find(n=>n.nutrientId===id||n.nutrientNumber===String(id));return n?Math.round((n.value||0)*10)/10:0;};
          return{
            name:f.description.charAt(0).toUpperCase()+f.description.slice(1).toLowerCase(),
            unit:"g",baseAmount:100,
            kcal:Math.round(get(1008)||get(208)||0),
            protein:get(1003)||get(203)||0,
            carbs:get(1005)||get(205)||0,
            fat:get(1004)||get(204)||0,
            _api:true,_brand:f.brandOwner||f.foodCategory||"",
          };
        }).filter(f=>f.kcal>0);
        setApiResults(items.slice(0,8));
        setApiLoading(false);
      }catch(e){
        if(!sig.aborted){setApiResults([]);setApiLoading(false);}
      }
    },250);
    return()=>{clearTimeout(searchTimer.current);};
  },[search]);

  // merge: local first, then API (excluding duplicates)
  const localNames=new Set(localFiltered.map(f=>f.name.toLowerCase()));
  const filtered=[...localFiltered,...apiResults.filter(f=>!localNames.has(f.name.toLowerCase()))];
  const dayItems=nutrition.filter(n=>n.date===selDate);
  const tot=dayItems.reduce((a,n)=>({kcal:a.kcal+n.kcal,protein:a.protein+n.protein,carbs:a.carbs+n.carbs,fat:a.fat+n.fat}),{kcal:0,protein:0,carbs:0,fat:0});
  const pct=Math.min(100,Math.round((tot.kcal/goal)*100));
  const pctC=pct>=100?"#d85a30":pct>=80?"#ba7517":"#1d9e75";
  const sp=sel?scaleFood(sel,qty):null;
  const dots=[...new Set(nutrition.map(n=>n.date))];

  function pick(f){setSel(f);setQty(f.baseAmount||f.base_amount||1);setSearch(f.name);}
  async function addSel(){if(!sel)return;setSaving(true);const s=scaleFood(sel,qty);await addNutrition({name:sel.name,...s,meal,date:selDate,baseFood:sel.name,quantity:+(+qty).toFixed(sel.unit==="g"||sel.unit==="ml"?1:0),unit:sel.unit});setSearch("");setSel(null);setQty(1);setSaving(false);}
  async function saveCustom(){
    if(!custom.name||!custom.kcal){setCustomErr("Naziv i kcal su obavezni.");return;}
    setCustomErr(null);setSaving(true);
    const food={name:custom.name,unit:custom.unit||"g",baseAmount:+custom.baseAmount||100,kcal:+custom.kcal,protein:+custom.protein||0,carbs:+custom.carbs||0,fat:+custom.fat||0};
    const saved=await addCustomFood(food);
    if(saved&&saved.error){setCustomErr("Greška: "+saved.error);setSaving(false);return;}
    if(saved){
      const amt=+custom.amount||food.baseAmount;
      const f=amt/food.baseAmount;
      await addNutrition({name:food.name,kcal:food.kcal*f,protein:food.protein*f,carbs:food.carbs*f,fat:food.fat*f,meal,date:selDate,quantity:amt,unit:food.unit});
      setCustom({name:"",kcal:"",protein:"",carbs:"",fat:"",unit:"g",baseAmount:"100",amount:"100"});
      setShowCustom(false);
    }
    setSaving(false);
  }

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
        <div style={{position:"relative"}}>
          <input className="inp" placeholder="Pretraži hranu (HR/EN)..." value={search} onChange={e=>{const v=e.target.value;setSearch(v);setApiResults([]);if(!v){setSel(null);setApiLoading(false);}}} style={{paddingRight:apiLoading?40:14}}/>
          {apiLoading&&<div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",width:16,height:16,border:"2px solid #e8e5df",borderTopColor:"#1d9e75",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>}
        </div>
        {filtered.length>0&&!sel&&(
          <div className="sugg">
            {filtered.map((f,i)=>(
              <div key={i} className={`sugg-row${f._custom?" mine":""}`} onClick={()=>pick(f)}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                    <span style={{wordBreak:"break-word"}}>{f.name}</span>
                    {f._custom&&<span style={{fontSize:10,color:"#854f0b",fontWeight:500,flexShrink:0}}>MOJ UNOS</span>}
                    {f._api&&<span style={{fontSize:10,color:"#185fa5",fontWeight:500,flexShrink:0}}>USDA</span>}
                    {f._sheet&&<span style={{fontSize:10,color:"#0f6e56",fontWeight:500,flexShrink:0}}>SHEET</span>}
                  </div>
                  <div style={{fontSize:11,color:"#aaa"}}>{f._brand?f._brand+" · ":""}per {f.baseAmount||f.base_amount}{f.unit}</div>
                </div>
                <div style={{display:"flex",gap:4,flexShrink:0}}><span className="bx bc">{f.kcal} kcal</span><span className="bx bb">{f.protein}g P</span></div>
              </div>
            ))}
          </div>
        )}
        {search.length>1&&!apiLoading&&filtered.length===0&&!sel&&(
          <div style={{padding:"12px 14px",fontSize:13,color:"#aaa",textAlign:"center",background:"#fafaf8",borderRadius:12,border:"1px solid #e8e5df",marginTop:6}}>
            Nema rezultata za "{search}"
          </div>
        )}
        {sel&&(
          <div className="qty-row">
            <span style={{fontSize:13,color:"#0f6e56",fontWeight:500,flex:"1 1 100%"}}>{sel.name}</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,color:"#0f6e56"}}>Količina:</span>
              {(()=>{const isWeight=sel.unit==="g"||sel.unit==="ml";return<input type="number" className="qty-inp" value={qty===0?"":qty} onChange={e=>setQty(e.target.value===""?0:+e.target.value)} onFocus={e=>e.target.select()} step={isWeight?10:1} inputMode={isWeight?"decimal":"numeric"}/>;})()}
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
            {customErr&&<div style={{padding:"10px 12px",borderRadius:10,background:"#3a1a1a",color:"#f5c4b3",fontSize:13,marginBottom:10}}>{customErr}</div>}
            <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={saveCustom} disabled={saving}>{saving?"Spremanje...":"Spremi i dodaj"}</button>
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
              {items.map(item=>{
                const isEditing=editItem&&editItem.id===item.id;
                const qtyRaw=item.quantity||item.baseAmount||100;
                return(
                  <div key={item.id}>
                    <div className="frow">
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:14}}>{item.base_food||item.name}</div>
                        {item.quantity&&<div style={{fontSize:11,color:"#aaa"}}>{Number.isInteger(item.quantity)?item.quantity:+(+item.quantity).toFixed(1)} {item.unit}</div>}
                      </div>
                      <div style={{display:"flex",gap:4,alignItems:"center"}}>
                        <span className="bx bc">{Math.round(item.kcal)} kcal</span>
                        <span className="bx bb">{Math.round(item.protein)}g P</span>
                        <button className="rm" style={{fontSize:16,color:"#378add"}} onClick={()=>{
                          if(isEditing){setEditItem(null);return;}
                          const perBase=qtyRaw>0?1/qtyRaw:0;
                          setEditItem({id:item.id,name:item.base_food||item.name,meal:item.meal,quantity:qtyRaw,unit:item.unit||"g",
                            kcalPer:item.kcal*perBase,proteinPer:item.protein*perBase,carbsPer:item.carbs*perBase,fatPer:item.fat*perBase});
                        }}>✎</button>
                        <button className="rm" onClick={()=>{if(isEditing)setEditItem(null);removeNutrition(item.id);}}>×</button>
                      </div>
                    </div>
                    {isEditing&&(
                      <div style={{padding:"12px 0 14px",borderTop:"1px solid #f0ede8",animation:"si .15s ease"}}>
                        <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                          <div style={{flex:"1 1 120px"}}>
                            <span className="lbl">Količina ({editItem.unit})</span>
                            <input type="number" className="inp" inputMode="decimal"
                              value={editItem.quantity}
                              step={editItem.unit==="g"||editItem.unit==="ml"?10:1}
                              min="0.1"
                              onChange={e=>setEditItem(ei=>({...ei,quantity:+e.target.value}))}/>
                          </div>
                          <div style={{flex:"1 1 120px"}}>
                            <span className="lbl">Obrok</span>
                            <select className="inp" value={editItem.meal} onChange={e=>setEditItem(ei=>({...ei,meal:e.target.value}))}
                              style={{WebkitAppearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23aaa' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",paddingRight:30}}>
                              {MEALS.map(m=><option key={m} value={m}>{m}</option>)}
                            </select>
                          </div>
                        </div>
                        <div style={{fontSize:12,color:"#0f6e56",marginBottom:10}}>
                          {editItem.quantity>0&&`→ ${Math.round(editItem.kcalPer*editItem.quantity)} kcal · ${Math.round(editItem.proteinPer*editItem.quantity)}g P · ${Math.round(editItem.carbsPer*editItem.quantity)}g U · ${Math.round(editItem.fatPer*editItem.quantity)}g M`}
                        </div>
                        <div style={{display:"flex",gap:8}}>
                          <button className="btn btn-g" style={{flex:1}} onClick={async()=>{
                            await updateNutrition(editItem.id,editItem);
                            setEditItem(null);
                          }}>Spremi</button>
                          <button className="btn btn-ghost" style={{width:52}} onClick={()=>setEditItem(null)}>✕</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
  const [form,setForm]=useState({time:nowTime(),stool:"",symptoms:[],pain:0,bloating:0,notes:"",energy:0,water:0,loperamide:false});
  const [saving,setSaving]=useState(false);
  const [openDay,setOpenDay]=useState(null);

  const stoolTypes=[{v:"1",d:"Tvrde grudice"},{v:"2",d:"Zbijena"},{v:"3",d:"Normalna ✓"},{v:"4",d:"Mekana"},{v:"5",d:"Komadići"},{v:"6",d:"Kašasta"},{v:"7",d:"Tekuća"}];
  function toggleSym(s){setForm(f=>({...f,symptoms:f.symptoms.includes(s)?f.symptoms.filter(x=>x!==s):[...f.symptoms,s]}));}

  async function submit(){
    setSaving(true);
    await addDigestion({...form,date:selDate,noStool});
    setForm({time:nowTime(),stool:"",symptoms:[],pain:0,bloating:0,notes:"",energy:0,water:0,loperamide:false});
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

        <button
          className={`pill${form.loperamide?" red":""}`}
          style={{marginBottom:14,fontSize:13}}
          onClick={()=>setForm(f=>({...f,loperamide:!f.loperamide}))}>
          💊 {form.loperamide?"✓ Uzeo sam Loperamid (Imodium)":"Uzeo sam Loperamid (Imodium)"}
        </button>

        {!noStool&&(
          <>
            <div style={{marginBottom:14}}>
              <span className="lbl">Vrijeme</span>
              <TimePicker value={form.time} onChange={t=>setForm({...form,time:t})}/>
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



        {[{k:"pain",l:"Bol",max:10,c:"#d85a30",cls:"r-red"},{k:"bloating",l:"Nadutost",max:10,c:"#ba7517",cls:"r-amber"},{k:"energy",l:"Energija",max:5,c:"#1d9e75",cls:"r-green"},{k:"water",l:"Čaše vode",max:15,c:"#378add",cls:"r-blue"}].map(({k,l,max,c,cls})=>(
          <div key={k} className="rrow">
            <div className="rlbl"><span>{l}</span><span style={{fontWeight:500,color:c}}>{form[k]}/{max}</span></div>
            <input type="range" className={cls} min={0} max={max} step={1} value={form[k]}
              style={{"--pct":`${Math.round(form[k]/max*100)}%`}}
              onChange={e=>setForm({...form,[k]:+e.target.value})}/>
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


function SvgBarChart({data,color="#f0997b"}){
  if(!data||!data.length)return null;
  const W=600,H=140,PL=28,PR=8,PT=8,PB=28;
  const iW=W-PL-PR,iH=H-PT-PB;
  const vals=data.map(d=>d.y);
  const maxV=Math.max(...vals,1);
  const barW=Math.max(2,iW/data.length*0.7);
  const gap=iW/data.length;
  const step=Math.ceil(data.length/7);
  return(
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto"}}>
      <line x1={PL} y1={PT} x2={PL} y2={PT+iH} stroke="#f0ede8" strokeWidth="1"/>
      <line x1={PL} y1={PT+iH} x2={W-PR} y2={PT+iH} stroke="#f0ede8" strokeWidth="1"/>
      {[0,0.5,1].map((t,i)=>{
        const v=(maxV*t).toFixed(0);
        const y=PT+iH-t*iH;
        return<g key={i}>
          <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="#f5f3ef" strokeWidth="1"/>
          <text x={PL-3} y={y+4} textAnchor="end" fontSize="8" fill="#bbb">{v}</text>
        </g>;
      })}
      {data.map((d,i)=>{
        const x=PL+i*gap+gap/2-barW/2;
        const h=Math.max(2,d.y/maxV*iH);
        const y=PT+iH-h;
        return<g key={i}>
          <rect x={x} y={y} width={barW} height={h} rx="2" fill={d.color||color}/>
          {i%step===0&&<text x={x+barW/2} y={H-2} textAnchor="middle" fontSize="8" fill="#bbb">{d.label}</text>}
        </g>;
      })}
    </svg>
  );
}

function SvgStackedBar({data}){
  if(!data||!data.length)return null;
  const W=600,H=140,PL=28,PR=8,PT=8,PB=28;
  const iW=W-PL-PR,iH=H-PT-PB;
  const maxV=Math.max(...data.map(d=>d.protein+d.carbs+d.fat),1);
  const barW=Math.max(2,iW/data.length*0.7);
  const gap=iW/data.length;
  const step=Math.ceil(data.length/7);
  return(
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto"}}>
      <line x1={PL} y1={PT+iH} x2={W-PR} y2={PT+iH} stroke="#f0ede8" strokeWidth="1"/>
      {data.map((d,i)=>{
        const x=PL+i*gap+gap/2-barW/2;
        const total=d.protein+d.carbs+d.fat||0;
        const hp=total>0?d.protein/maxV*iH:0;
        const hc=total>0?d.carbs/maxV*iH:0;
        const hf=total>0?d.fat/maxV*iH:0;
        const yf=PT+iH-hf;
        const yc=yf-hc;
        const yp=yc-hp;
        return<g key={i}>
          {hf>0&&<rect x={x} y={yf} width={barW} height={hf} rx="1" fill="#97c459"/>}
          {hc>0&&<rect x={x} y={yc} width={barW} height={hc} rx="1" fill="#ef9f27"/>}
          {hp>0&&<rect x={x} y={yp} width={barW} height={hp} rx="1" fill="#85b7eb"/>}
          {i%step===0&&<text x={x+barW/2} y={H-2} textAnchor="middle" fontSize="8" fill="#bbb">{d.label}</text>}
        </g>;
      })}
    </svg>
  );
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────
function SvgLineChart({data,color="#1d9e75"}){
  if(!data||data.length<2)return null;
  const W=600,H=160,PL=8,PR=8,PT=16,PB=28;
  const iW=W-PL-PR, iH=H-PT-PB;
  const vals=data.map(d=>d.y);
  const minV=Math.min(...vals), maxV=Math.max(...vals);
  const rng=maxV-minV||1;
  const px=(i)=>PL+i/(data.length-1)*iW;
  const py=(v)=>PT+iH-(v-minV)/rng*iH;
  const pts=data.map((d,i)=>({x:px(i),y:py(d.y),label:d.label,v:d.y}));
  const path="M"+pts.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L");
  const area=path+` L${pts[pts.length-1].x.toFixed(1)},${(PT+iH).toFixed(1)} L${pts[0].x.toFixed(1)},${(PT+iH).toFixed(1)} Z`;
  // y axis ticks
  const ticks=3;
  const yTicks=Array.from({length:ticks},(_,i)=>minV+(maxV-minV)*i/(ticks-1));
  // x labels — show max 6
  const step=Math.ceil(data.length/6);
  const xLabels=data.filter((_,i)=>i%step===0||i===data.length-1);
  return(
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",overflow:"visible"}}>
      {yTicks.map((t,i)=>{
        const y=py(t);
        return<g key={i}>
          <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="#f0ede8" strokeWidth="1"/>
          <text x={PL-2} y={y+4} textAnchor="end" fontSize="9" fill="#bbb">{t.toFixed(1)}</text>
        </g>;
      })}
      <path d={area} fill={color} fillOpacity="0.08"/>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke={color} strokeWidth="2"/>)}
      {xLabels.map((d,i)=>{
        const idx=data.indexOf(d);
        return<text key={i} x={px(idx)} y={H-2} textAnchor="middle" fontSize="9" fill="#bbb">{d.label}</text>;
      })}
    </svg>
  );
}

// ─── Weight tab ───────────────────────────────────────────────────────────────
function WeightTab({weight,addWeight,removeWeight}){
  const [selDate,setSelDate]=useState(today());
  const [kg,setKg]=useState("");
  const [notes,setNotes]=useState("");
  const [saving,setSaving]=useState(false);

  const existing=weight.find(w=>w.date===selDate);
  useEffect(()=>{
    if(existing){setKg(String(existing.kg));setNotes(existing.notes||"");}
    else{setKg("");setNotes("");}
  },[selDate, weight]);

  async function submit(){
    if(!kg||isNaN(+kg))return;
    setSaving(true);
    await addWeight({date:selDate,kg:+kg,notes});
    setSaving(false);
  }

  const sorted=weight.slice().sort((a,b)=>a.date.localeCompare(b.date));
  const latest=sorted[sorted.length-1];
  const oldest=sorted[0];
  const diff=latest&&oldest&&latest!==oldest?+(latest.kg-oldest.kg).toFixed(1):null;
  const chartData=sorted.slice(-30).map(w=>({y:w.kg,label:fmtShort(w.date)}));
  const dots=weight.map(w=>w.date);

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>

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

      {chartData.length>=2&&(
        <div className="card">
          <div className="ttl">Graf kilaže</div>
          <div style={{fontSize:12,color:"#aaa",marginBottom:8}}>Zadnjih {chartData.length} mjerenja</div>
          <SvgLineChart data={chartData} color="#1d9e75"/>
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

  // No Chart.js — using SVG charts

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
          <div className="card">
            <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:300,marginBottom:4}}>Kalorije (zadnjih 14 dana)</div>
            <SvgBarChart data={bd14.map((d,i)=>({y:d.kcal,label:lbl14[i],color:"#f0997b"}))}/>
          </div>
          <div className="card">
            <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:300,marginBottom:4}}>Makronutrijenti</div>
            <div style={{display:"flex",gap:12,marginBottom:8,flexWrap:"wrap"}}>
              {[{c:"#85b7eb",l:"Proteini"},{c:"#ef9f27",l:"Ugljikohidrati"},{c:"#97c459",l:"Masti"}].map(x=>(
                <div key={x.l} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#888"}}><div style={{width:8,height:8,borderRadius:2,background:x.c}}/>{x.l}</div>
              ))}
            </div>
            <SvgStackedBar data={bd14.map((d,i)=>({label:lbl14[i],protein:d.protein,carbs:d.carbs,fat:d.fat}))}/>
          </div>
          <div className="card">
            <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:300,marginBottom:4}}>Bol i energija</div>
            <div style={{display:"flex",gap:12,marginBottom:8}}>
              {[{c:"#d85a30",l:"Bol (0-10)"},{c:"#1d9e75",l:"Energija (0-5)"}].map(x=>(
                <div key={x.l} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#888"}}><div style={{width:8,height:8,borderRadius:2,background:x.c}}/>{x.l}</div>
              ))}
            </div>
            <SvgLineChart data={bd14.map((d,i)=>({y:d.pain??0,label:lbl14[i]}))} color="#d85a30"/>
            <SvgLineChart data={bd14.map((d,i)=>({y:d.energy??0,label:lbl14[i]}))} color="#1d9e75"/>
          </div>
        </>
      )}
    </div>
  );
}


// ─── Strava tab ───────────────────────────────────────────────────────────────
const STRAVA_CLIENT_ID = "212460";
const STRAVA_CLIENT_SECRET = "e53812eb6c267609d816ae1cfa83de9efe338c77";
const STRAVA_REFRESH_TOKEN = "8614dadefd366c8b747c8b70e4627168a7c46bce";

const SPORT_ICONS = {
  "Run":"🏃","VirtualRun":"🏃","TrailRun":"🏃",
  "Ride":"🚴","VirtualRide":"🚴","MountainBikeRide":"🚵","EBikeRide":"🚴",
  "Swim":"🏊","Walk":"🚶","Hike":"🥾",
  "WeightTraining":"🏋️","Workout":"💪","Crossfit":"💪","Yoga":"🧘",
  "Soccer":"⚽","Tennis":"🎾","Basketball":"🏀","Golf":"⛳",
  "Skiing":"⛷️","Snowboard":"🏂","IceSkate":"⛸️",
  "Kayaking":"🛶","Surfing":"🏄","Rowing":"🚣",
};
const SPORT_HR = {
  "Run":"Trčanje","VirtualRun":"Virtualno trčanje","TrailRun":"Trail trčanje",
  "Ride":"Vožnja biciklom","VirtualRide":"Virtualna vožnja","MountainBikeRide":"MTB","EBikeRide":"E-bike",
  "Swim":"Plivanje","Walk":"Hodanje","Hike":"Planinarenje",
  "WeightTraining":"Teretana","Workout":"Trening","Crossfit":"CrossFit","Yoga":"Yoga",
  "Soccer":"Nogomet","Tennis":"Tenis","Basketball":"Košarka","Golf":"Golf",
  "Skiing":"Skijanje","Snowboard":"Snowboard","IceSkate":"Klizanje",
  "Kayaking":"Kajak","Surfing":"Surfanje","Rowing":"Veslanje",
};

function fmtDuration(s){
  const h=Math.floor(s/3600);
  const m=Math.floor((s%3600)/60);
  const sec=s%60;
  if(h>0)return`${h}h ${m}min`;
  return`${m}min ${sec}s`;
}
function fmtPace(mps){
  if(!mps||mps===0)return"-";
  const spm=1000/mps;
  const m=Math.floor(spm/60);
  const s=Math.round(spm%60);
  return`${m}:${String(s).padStart(2,"0")} /km`;
}
function fmtSpeed(mps){
  if(!mps||mps===0)return"-";
  return`${(mps*3.6).toFixed(1)} km/h`;
}
function fmtDist(m){
  if(m>=1000)return`${(m/1000).toFixed(2)} km`;
  return`${Math.round(m)} m`;
}
function fmtDate(s){
  return new Date(s).toLocaleDateString("hr-HR",{day:"numeric",month:"long",year:"numeric"});
}

async function getStravaToken(){
  try{
    const r=await fetch("https://www.strava.com/oauth/token",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({client_id:STRAVA_CLIENT_ID,client_secret:STRAVA_CLIENT_SECRET,refresh_token:STRAVA_REFRESH_TOKEN,grant_type:"refresh_token"})
    });
    const d=await r.json();
    return d.access_token;
  }catch(e){return null;}
}

function StravaTab(){
  const [activities,setActivities]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [page,setPage]=useState(1);
  const [hasMore,setHasMore]=useState(true);
  const [loadingMore,setLoadingMore]=useState(false);
  const [selAct,setSelAct]=useState(null);
  const [athlete,setAthlete]=useState(null);
  const PER_PAGE=20;

  useEffect(()=>{
    (async()=>{
      setLoading(true);setError(null);
      const token=await getStravaToken();
      if(!token){setError("Ne mogu dohvatiti Strava token.");setLoading(false);return;}
      try{
        const [actR,athR]=await Promise.all([
          fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${PER_PAGE}&page=1`,{headers:{Authorization:`Bearer ${token}`}}),
          fetch("https://www.strava.com/api/v3/athlete",{headers:{Authorization:`Bearer ${token}`}})
        ]);
        const acts=await actR.json();
        const ath=await athR.json();
        if(!Array.isArray(acts)){setError("Greška pri dohvatu aktivnosti.");setLoading(false);return;}
        setActivities(acts);
        setAthlete(ath);
        setHasMore(acts.length===PER_PAGE);
      }catch(e){setError("Greška: "+e.message);}
      setLoading(false);
    })();
  },[]);

  async function loadMore(){
    setLoadingMore(true);
    const token=await getStravaToken();
    if(!token){setLoadingMore(false);return;}
    const nextPage=page+1;
    const r=await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${PER_PAGE}&page=${nextPage}`,{headers:{Authorization:`Bearer ${token}`}});
    const more=await r.json();
    if(Array.isArray(more)&&more.length>0){
      setActivities(p=>[...p,...more]);
      setPage(nextPage);
      setHasMore(more.length===PER_PAGE);
    }else{setHasMore(false);}
    setLoadingMore(false);
  }

  // summary stats
  const totalDist=activities.reduce((a,x)=>a+x.distance,0);
  const totalTime=activities.reduce((a,x)=>a+x.moving_time,0);
  const totalKcal=activities.reduce((a,x)=>a+(x.calories||0),0);
  const runs=activities.filter(a=>a.type==="Run"||a.sport_type==="Run");
  const rides=activities.filter(a=>a.type==="Ride"||a.sport_type==="Ride");

  if(loading)return(
    <div style={{textAlign:"center",padding:"60px 0"}}>
      <div style={{width:36,height:36,border:"3px solid #e8e5df",borderTopColor:"#fc4c02",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto 12px"}}/>
      <div style={{color:"#aaa",fontSize:14}}>Dohvaćam Strava aktivnosti...</div>
    </div>
  );

  if(error)return<div style={{padding:20,background:"#fff0ec",borderRadius:14,color:"#993c1d",fontSize:14}}>{error}</div>;

  return(
    <div>
      {/* Athlete header */}
      {athlete&&(
        <div className="card" style={{background:"linear-gradient(135deg,#fc4c02,#e8390a)",border:"none",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {athlete.profile_medium&&<img src={athlete.profile_medium} alt="" style={{width:52,height:52,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)"}}/>}
            <div>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:300,color:"#fff"}}>{athlete.firstname} {athlete.lastname}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.7)",marginTop:2}}>Strava profil · {activities.length} aktivnosti učitano</div>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg" alt="Strava" style={{height:22,marginLeft:"auto",opacity:.8,filter:"brightness(0) invert(1)"}}/>
          </div>
        </div>
      )}

      {/* Summary stats */}
      <div className="mrow" style={{gridTemplateColumns:"repeat(2,1fr)"}}>
        {[
          {l:"Ukupno km",v:(totalDist/1000).toFixed(0)+"km",c:"#fc4c02"},
          {l:"Ukupno vrijeme",v:fmtDuration(totalTime),c:"#1a1a18"},
          {l:"Kalorije",v:totalKcal>0?Math.round(totalKcal).toLocaleString()+" kcal":"-",c:"#993c1d"},
          {l:"Trčanja / Vožnji",v:`${runs.length} / ${rides.length}`,c:"#0f6e56"},
        ].map(m=>(
          <div key={m.l} className="met">
            <div className="met-l">{m.l}</div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:300,color:m.c,lineHeight:1.2,marginTop:2}}>{m.v}</div>
          </div>
        ))}
      </div>

      {/* Activity list */}
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        {activities.map((act,i)=>{
          const icon=SPORT_ICONS[act.sport_type||act.type]||"🏅";
          const name=SPORT_HR[act.sport_type||act.type]||(act.sport_type||act.type);
          const isRun=act.sport_type==="Run"||act.type==="Run";
          const isRide=act.sport_type==="Ride"||act.type==="Ride";
          const isOpen=selAct===act.id;
          return(
            <div key={act.id} style={{borderBottom:"1px solid #f5f3ef"}}>
              <div style={{padding:"14px 16px",cursor:"pointer",WebkitTapHighlightColor:"transparent"}} onClick={()=>setSelAct(isOpen?null:act.id)}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{width:38,height:38,borderRadius:10,background:"#fff4f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:500,color:"#1a1a18",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{act.name}</div>
                    <div style={{fontSize:12,color:"#aaa",marginTop:2}}>{name} · {fmtDate(act.start_date_local)}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:15,fontWeight:300,fontFamily:"'Fraunces',serif",color:"#fc4c02"}}>{fmtDist(act.distance)}</div>
                    <div style={{fontSize:11,color:"#aaa"}}>{fmtDuration(act.moving_time)}</div>
                  </div>
                </div>
              </div>
              {isOpen&&(
                <div style={{padding:"0 16px 14px",borderTop:"1px solid #f8f6f2",animation:"si .15s ease"}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:8}}>
                    {[
                      {l:"Distanca",v:fmtDist(act.distance)},
                      {l:"Vrijeme",v:fmtDuration(act.moving_time)},
                      {l:isRun?"Tempo":"Brzina",v:isRun?fmtPace(act.average_speed):fmtSpeed(act.average_speed)},
                      {l:"Visinska razlika",v:`${Math.round(act.total_elevation_gain)}m`},
                      {l:"Kalorije",v:act.calories?`${Math.round(act.calories)} kcal`:"-"},
                      {l:"Puls",v:act.average_heartrate?`${Math.round(act.average_heartrate)} bpm`:"-"},
                    ].map(s=>(
                      <div key={s.l} style={{background:"#fafaf8",borderRadius:10,padding:"10px 12px"}}>
                        <div style={{fontSize:9.5,color:"#bbb",textTransform:"uppercase",letterSpacing:".6px",marginBottom:3}}>{s.l}</div>
                        <div style={{fontSize:14,fontWeight:500,color:"#1a1a18"}}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  {act.description&&<div style={{fontSize:13,color:"#888",fontStyle:"italic",marginTop:4}}>{act.description}</div>}
                  <a href={`https://www.strava.com/activities/${act.id}`} target="_blank" rel="noreferrer"
                    style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,padding:"8px 14px",background:"#fc4c02",color:"#fff",borderRadius:10,fontSize:13,fontWeight:500,textDecoration:"none"}}>
                    Otvori na Stravi →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasMore&&(
        <button className="btn" style={{background:"#fc4c02",marginTop:8,opacity:loadingMore?0.6:1}} onClick={loadMore} disabled={loadingMore}>
          {loadingMore?"Učitavanje...":"Učitaj još aktivnosti"}
        </button>
      )}
    </div>
  );
}



// ─── Jelovnik tab ─────────────────────────────────────────────────────────────
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vREKqksAild_k_mZsXTW_ynOJyHmlHSly4HVudBmUHJfnnPjYoNcwWbc9nPcQTbYKxcfIb2p9hkInm7/pub?gid=1876983105&single=true&output=csv";
const NAMIRNICE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vREKqksAild_k_mZsXTW_ynOJyHmlHSly4HVudBmUHJfnnPjYoNcwWbc9nPcQTbYKxcfIb2p9hkInm7/pub?gid=0&single=true&output=csv";

// Cache for sheet foods
let _sheetFoodsCache = null;
let _sheetFoodsLoading = false;
let _sheetFoodsCallbacks = [];

async function loadSheetFoods() {
  if (_sheetFoodsCache) return _sheetFoodsCache;
  if (_sheetFoodsLoading) {
    return new Promise(res => _sheetFoodsCallbacks.push(res));
  }
  _sheetFoodsLoading = true;
  try {
    const r = await fetch(NAMIRNICE_URL + "&t=" + Date.now());
    const text = await r.text();
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, "").toLowerCase());
    const foods = lines.slice(1).map(line => {
      const vals = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
      const obj = {};
      headers.forEach((h, i) => obj[h] = vals[i] || "");
      return {
        name: obj.name || "",
        unit: obj.unit || "g",
        baseAmount: +obj.baseamount || 100,
        kcal: +obj.kcal || 0,
        protein: +obj.protein || 0,
        carbs: +obj.carbs || 0,
        fat: +obj.fat || 0,
        _sheet: true,
      };
    }).filter(f => f.name && f.kcal > 0);
    _sheetFoodsCache = foods;
    _sheetFoodsCallbacks.forEach(cb => cb(foods));
    _sheetFoodsCallbacks = [];
    return foods;
  } catch(e) {
    _sheetFoodsLoading = false;
    return [];
  }
}

// Namirnice iz Word dokumenta (lookup baza)
const FOOD_DB = [
  {name:"Pileća prsa",unit:"g",baseAmount:100,kcal:103,protein:24,carbs:0,fat:1.6},
  {name:"Pureća prsa",unit:"g",baseAmount:100,kcal:103,protein:24,carbs:0,fat:1.6},
  {name:"Pileći batak bez kosti",unit:"g",baseAmount:100,kcal:89,protein:17,carbs:0,fat:2.2},
  {name:"Pureći batak bez kosti",unit:"g",baseAmount:100,kcal:89,protein:17,carbs:0,fat:2.2},
  {name:"Pačja prsa bez kože",unit:"g",baseAmount:100,kcal:89,protein:17,carbs:0,fat:2.2},
  {name:"Svinjski but bez kože",unit:"g",baseAmount:100,kcal:99,protein:21,carbs:0,fat:1.4},
  {name:"Teleći okrugli dio",unit:"g",baseAmount:100,kcal:99,protein:21,carbs:0,fat:1.4},
  {name:"Govedina okrugli dio",unit:"g",baseAmount:100,kcal:99,protein:21,carbs:0,fat:1.4},
  {name:"Svinjski file",unit:"g",baseAmount:100,kcal:99,protein:21,carbs:0,fat:1.4},
  {name:"Svinjski kotlet bez masnoće",unit:"g",baseAmount:100,kcal:128,protein:20,carbs:0,fat:5.3},
  {name:"Goveđa koljenica",unit:"g",baseAmount:100,kcal:128,protein:20,carbs:0,fat:5.3},
  {name:"Svinjska lopatica",unit:"g",baseAmount:100,kcal:128,protein:20,carbs:0,fat:5.3},
  {name:"Goveđi file",unit:"g",baseAmount:100,kcal:128,protein:20,carbs:0,fat:5.3},
  {name:"Goveđa plećka",unit:"g",baseAmount:100,kcal:128,protein:20,carbs:0,fat:5.3},
  {name:"Svinjski lungić",unit:"g",baseAmount:100,kcal:128,protein:20,carbs:0,fat:5.3},
  {name:"T-bone odrezak",unit:"g",baseAmount:100,kcal:249,protein:24,carbs:0,fat:17.5},
  {name:"Rib eye biftek",unit:"g",baseAmount:100,kcal:249,protein:24,carbs:0,fat:17.5},
  {name:"Pečenica (odrezak)",unit:"g",baseAmount:100,kcal:249,protein:24,carbs:0,fat:17.5},
  {name:"Ćevapi od mljevenog mesa",unit:"g",baseAmount:100,kcal:270,protein:19,carbs:0,fat:20},
  {name:"Pljeskavica od mljevenog mesa",unit:"g",baseAmount:100,kcal:270,protein:19,carbs:0,fat:20},
  {name:"Svinjska potrbušina",unit:"g",baseAmount:100,kcal:270,protein:19,carbs:0,fat:20},
  {name:"Svinjski vrat",unit:"g",baseAmount:100,kcal:270,protein:19,carbs:0,fat:20},
  {name:"Svinjska rebra",unit:"g",baseAmount:100,kcal:270,protein:19,carbs:0,fat:20},
  {name:"Oslić",unit:"g",baseAmount:100,kcal:90,protein:18,carbs:0,fat:2.4},
  {name:"Tuna konzervirana u salamuri",unit:"g",baseAmount:100,kcal:90,protein:18,carbs:0,fat:2.4},
  {name:"Bakalar",unit:"g",baseAmount:100,kcal:90,protein:18,carbs:0,fat:2.4},
  {name:"Škrpina",unit:"g",baseAmount:100,kcal:90,protein:18,carbs:0,fat:2.4},
  {name:"Svježe sardine",unit:"g",baseAmount:100,kcal:124,protein:21,carbs:0,fat:4.3},
  {name:"Sardine konzerva u vodi",unit:"g",baseAmount:100,kcal:124,protein:21,carbs:0,fat:4.3},
  {name:"Odrezak svježe tune",unit:"g",baseAmount:100,kcal:124,protein:21,carbs:0,fat:4.3},
  {name:"Dimljeni losos",unit:"g",baseAmount:100,kcal:169,protein:19,carbs:0,fat:10},
  {name:"Brancin",unit:"g",baseAmount:100,kcal:169,protein:19,carbs:0,fat:10},
  {name:"Orada",unit:"g",baseAmount:100,kcal:169,protein:19,carbs:0,fat:10},
  {name:"Pastrva",unit:"g",baseAmount:100,kcal:169,protein:19,carbs:0,fat:10},
  {name:"Losos file",unit:"g",baseAmount:100,kcal:169,protein:19,carbs:0,fat:10},
  {name:"Skuša",unit:"g",baseAmount:100,kcal:225,protein:19,carbs:0,fat:16.3},
  {name:"Skuša konzervirana",unit:"g",baseAmount:100,kcal:225,protein:19,carbs:0,fat:16.3},
  {name:"Haringa konzervirana",unit:"g",baseAmount:100,kcal:225,protein:19,carbs:0,fat:16.3},
  {name:"Odrezak lososa",unit:"g",baseAmount:100,kcal:225,protein:19,carbs:0,fat:16.3},
  {name:"Dagnje",unit:"g",baseAmount:100,kcal:70,protein:13,carbs:0,fat:1.7},
  {name:"Škampi",unit:"g",baseAmount:100,kcal:70,protein:13,carbs:0,fat:1.7},
  {name:"Lignje",unit:"g",baseAmount:100,kcal:70,protein:13,carbs:0,fat:1.7},
  {name:"Hobotnica",unit:"g",baseAmount:100,kcal:70,protein:13,carbs:0,fat:1.7},
  {name:"Kozice",unit:"g",baseAmount:100,kcal:70,protein:13,carbs:0,fat:1.7},
  {name:"Kuhana šunka",unit:"g",baseAmount:100,kcal:104,protein:20,carbs:0,fat:2.7},
  {name:"Dimljena pileća prsa",unit:"g",baseAmount:100,kcal:104,protein:20,carbs:0,fat:2.7},
  {name:"Pršut bez vidljive masnoće",unit:"g",baseAmount:100,kcal:200,protein:37,carbs:0,fat:5},
  {name:"Bresaola",unit:"g",baseAmount:100,kcal:200,protein:37,carbs:0,fat:5},
  {name:"Pršut s masnoćom",unit:"g",baseAmount:100,kcal:344,protein:25,carbs:0,fat:27.8},
  {name:"Kulen",unit:"g",baseAmount:100,kcal:361,protein:28,carbs:0,fat:27.8},
  {name:"Kobasica salama",unit:"g",baseAmount:100,kcal:317,protein:17,carbs:0,fat:27.8},
  {name:"Hrenovka",unit:"g",baseAmount:100,kcal:317,protein:17,carbs:0,fat:27.8},
  {name:"Mortadela",unit:"g",baseAmount:100,kcal:317,protein:17,carbs:0,fat:27.8},
  {name:"Pašteta",unit:"g",baseAmount:100,kcal:317,protein:17,carbs:0,fat:27.8},
  {name:"Slanina",unit:"g",baseAmount:100,kcal:425,protein:17,carbs:0,fat:41.7},
  {name:"Panceta",unit:"g",baseAmount:100,kcal:425,protein:17,carbs:0,fat:41.7},
  {name:"Jaje (cijelo)",unit:"kom",baseAmount:1,kcal:72,protein:6,carbs:0,fat:5.2},
  {name:"Bjelanjak",unit:"kom",baseAmount:1,kcal:17,protein:3.6,carbs:0,fat:0.1},
  {name:"Žumanjak",unit:"kom",baseAmount:1,kcal:55,protein:2.7,carbs:0,fat:5.1},
  {name:"Tekuća pasterizirana jaja",unit:"g",baseAmount:100,kcal:60,protein:5,carbs:0,fat:4.3},
  {name:"Grčki jogurt 0%",unit:"g",baseAmount:150,kcal:83,protein:15,carbs:6,fat:0.5},
  {name:"Skyr",unit:"g",baseAmount:150,kcal:83,protein:15,carbs:6,fat:0.5},
  {name:"Quark",unit:"g",baseAmount:150,kcal:83,protein:15,carbs:6,fat:0.5},
  {name:"Niskomasni svježi sir",unit:"g",baseAmount:150,kcal:83,protein:15,carbs:6,fat:0.5},
  {name:"Visokoproteinski puding",unit:"g",baseAmount:150,kcal:163,protein:20,carbs:18,fat:0},
  {name:"Visokoproteinski mousse",unit:"g",baseAmount:150,kcal:163,protein:20,carbs:18,fat:0},
  {name:"Light mozzarella",unit:"g",baseAmount:100,kcal:100,protein:11,carbs:1,fat:5.7},
  {name:"Niskomasna ricotta",unit:"g",baseAmount:100,kcal:100,protein:11,carbs:1,fat:5.7},
  {name:"Svježi sir s tržnice",unit:"g",baseAmount:100,kcal:100,protein:11,carbs:1,fat:5.7},
  {name:"Parmezan",unit:"g",baseAmount:30,kcal:107,protein:7.5,carbs:0,fat:8.5},
  {name:"Gouda",unit:"g",baseAmount:30,kcal:107,protein:7.5,carbs:0,fat:8.5},
  {name:"Ementaler",unit:"g",baseAmount:30,kcal:107,protein:7.5,carbs:0,fat:8.5},
  {name:"Ribani sir",unit:"g",baseAmount:15,kcal:53,protein:3.75,carbs:0,fat:4.25},
  {name:"Ricotta/skuta",unit:"g",baseAmount:100,kcal:167,protein:19,carbs:1.25,fat:9.4},
  {name:"Feta sir",unit:"g",baseAmount:30,kcal:67,protein:5,carbs:0.5,fat:5},
  {name:"Mozzarella",unit:"g",baseAmount:30,kcal:67,protein:5,carbs:0.5,fat:5},
  {name:"Tofu svježi",unit:"g",baseAmount:100,kcal:94,protein:9.4,carbs:3.1,fat:6.25},
  {name:"Dimljeni tofu",unit:"g",baseAmount:100,kcal:94,protein:9.4,carbs:3.1,fat:6.25},
  {name:"Whey protein prah",unit:"g",baseAmount:30,kcal:113,protein:22,carbs:1.5,fat:3},
  {name:"Protein soje",unit:"g",baseAmount:30,kcal:113,protein:22,carbs:1.5,fat:3},
  {name:"Biljni protein prah",unit:"g",baseAmount:30,kcal:113,protein:22,carbs:1.5,fat:3},
  {name:"Bademi",unit:"g",baseAmount:30,kcal:174,protein:6,carbs:6,fat:15},
  {name:"Orasi",unit:"g",baseAmount:30,kcal:196,protein:4.6,carbs:4.1,fat:19.6},
  {name:"Lješnjaci",unit:"g",baseAmount:30,kcal:188,protein:4.5,carbs:5,fat:18.4},
  {name:"Indijski oraščići",unit:"g",baseAmount:30,kcal:171,protein:4.5,carbs:9.2,fat:14},
  {name:"Pistacije",unit:"g",baseAmount:30,kcal:172,protein:6.3,carbs:8.7,fat:14},
  {name:"Kikiriki",unit:"g",baseAmount:30,kcal:176,protein:7.1,carbs:6,fat:15},
  {name:"Chia sjemenke",unit:"g",baseAmount:15,kcal:73,protein:2.5,carbs:6.2,fat:4.6},
  {name:"Sjemenke lana",unit:"g",baseAmount:15,kcal:81,protein:2.8,carbs:4.3,fat:6.4},
  {name:"Sjemenke suncokreta",unit:"g",baseAmount:15,kcal:87,protein:3,carbs:3.7,fat:7.6},
  {name:"Sjemenke bundeve",unit:"g",baseAmount:15,kcal:85,protein:4.5,carbs:2.2,fat:7.2},
  {name:"Sjemenke sezama",unit:"g",baseAmount:15,kcal:91,protein:2.9,carbs:3.6,fat:8.3},
  {name:"Maslac od kikirikija",unit:"g",baseAmount:32,kcal:188,protein:8,carbs:6,fat:16},
  {name:"Tahini",unit:"g",baseAmount:15,kcal:90,protein:2.7,carbs:3.3,fat:8.1},
  {name:"Maslac od badema",unit:"g",baseAmount:32,kcal:192,protein:7,carbs:6.4,fat:17},
  {name:"Maslinovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Repičino ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Ulje avokada",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Suncokretovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Kokosovo ulje",unit:"ml",baseAmount:10,kcal:88,protein:0,carbs:0,fat:10},
  {name:"Maslac",unit:"g",baseAmount:10,kcal:72,protein:0.1,carbs:0,fat:8.1},
  {name:"Ghee",unit:"g",baseAmount:10,kcal:90,protein:0,carbs:0,fat:10},
  {name:"Tamna čokolada 70%",unit:"g",baseAmount:20,kcal:116,protein:1.7,carbs:7.5,fat:8.3},
  {name:"Tamna čokolada 80%",unit:"g",baseAmount:20,kcal:116,protein:1.7,carbs:7.5,fat:8.3},
  {name:"Tamna čokolada 90%",unit:"g",baseAmount:20,kcal:116,protein:1.7,carbs:7.5,fat:8.3},
  {name:"Nutella",unit:"g",baseAmount:20,kcal:108,protein:1.3,carbs:12,fat:6.4},
  {name:"Humus",unit:"g",baseAmount:50,kcal:92,protein:4,carbs:8.5,fat:4.4},
  {name:"Guacamole",unit:"g",baseAmount:50,kcal:80,protein:1,carbs:4.5,fat:7},
  {name:"Pesto",unit:"g",baseAmount:15,kcal:75,protein:1.5,carbs:1.5,fat:7.5},
  {name:"Light majoneza",unit:"g",baseAmount:15,kcal:49,protein:0.2,carbs:1.5,fat:4.8},
  {name:"Zobene pahuljice",unit:"g",baseAmount:50,kcal:189,protein:6.5,carbs:32,fat:3.5},
  {name:"Ražene pahuljice",unit:"g",baseAmount:50,kcal:189,protein:6.5,carbs:32,fat:3.5},
  {name:"Granola",unit:"g",baseAmount:50,kcal:224,protein:5,carbs:32,fat:9},
  {name:"Muesli",unit:"g",baseAmount:50,kcal:184,protein:5,carbs:32,fat:3.5},
  {name:"Cornflakes",unit:"g",baseAmount:30,kcal:114,protein:2,carbs:25,fat:0.3},
  {name:"Integralni tost",unit:"kriška",baseAmount:1,kcal:69,protein:3,carbs:12,fat:1},
  {name:"Raženi kruh",unit:"kriška",baseAmount:1,kcal:65,protein:2.7,carbs:12,fat:0.7},
  {name:"Graham pecivo",unit:"kom",baseAmount:1,kcal:100,protein:3,carbs:20,fat:1},
  {name:"Bijeli kruh",unit:"kriška",baseAmount:1,kcal:80,protein:3,carbs:15,fat:1},
  {name:"Bijeli tost",unit:"kriška",baseAmount:1,kcal:80,protein:3,carbs:15,fat:1},
  {name:"Pšenična tortilja",unit:"kom",baseAmount:1,kcal:146,protein:4,carbs:24,fat:3.5},
  {name:"Kukuruzna tortilja",unit:"kom",baseAmount:1,kcal:104,protein:2.5,carbs:20,fat:2},
  {name:"Bijela riža (kuhana)",unit:"g",baseAmount:100,kcal:130,protein:2.7,carbs:28,fat:0.3},
  {name:"Smeđa riža (kuhana)",unit:"g",baseAmount:100,kcal:112,protein:2.6,carbs:23,fat:0.9},
  {name:"Tjestenina (kuhana)",unit:"g",baseAmount:100,kcal:131,protein:5,carbs:25,fat:1.1},
  {name:"Integralna tjestenina (kuhana)",unit:"g",baseAmount:100,kcal:124,protein:5,carbs:23,fat:1.1},
  {name:"Kvinoja (kuhana)",unit:"g",baseAmount:100,kcal:120,protein:4.4,carbs:21,fat:1.9},
  {name:"Bulgur (kuhan)",unit:"g",baseAmount:100,kcal:83,protein:3,carbs:19,fat:0.2},
  {name:"Heljda (kuhana)",unit:"g",baseAmount:100,kcal:92,protein:3.4,carbs:20,fat:0.6},
  {name:"Kus-kus (kuhan)",unit:"g",baseAmount:100,kcal:112,protein:3.8,carbs:23,fat:0.2},
  {name:"Pšenični griz (kuhan)",unit:"g",baseAmount:100,kcal:90,protein:2,carbs:20,fat:0.5},
  {name:"Njoki (kuhani)",unit:"g",baseAmount:100,kcal:100,protein:3,carbs:20,fat:1},
  {name:"Krumpir (kuhan)",unit:"g",baseAmount:100,kcal:87,protein:1.9,carbs:20,fat:0.1},
  {name:"Batat (kuhan)",unit:"g",baseAmount:100,kcal:76,protein:1.4,carbs:18,fat:0.1},
  {name:"Mladi krumpir (kuhan)",unit:"g",baseAmount:100,kcal:72,protein:2,carbs:16,fat:0.1},
  {name:"Slanutak (kuhan)",unit:"g",baseAmount:100,kcal:164,protein:8.9,carbs:27,fat:2.6},
  {name:"Leća (kuhana)",unit:"g",baseAmount:100,kcal:116,protein:9,carbs:20,fat:0.4},
  {name:"Grah (kuhan)",unit:"g",baseAmount:100,kcal:127,protein:8.7,carbs:23,fat:0.5},
  {name:"Slanutak (konzerva)",unit:"g",baseAmount:100,kcal:139,protein:7.8,carbs:23,fat:2.3},
  {name:"Grah (konzerva)",unit:"g",baseAmount:100,kcal:127,protein:8.7,carbs:23,fat:0.5},
  {name:"Kukuruz (konzerva)",unit:"g",baseAmount:100,kcal:86,protein:3.2,carbs:19,fat:1.2},
  {name:"Grašak (svježi)",unit:"g",baseAmount:100,kcal:81,protein:5.4,carbs:14,fat:0.4},
  {name:"Grašak (konzerva)",unit:"g",baseAmount:100,kcal:77,protein:5.4,carbs:14,fat:0.3},
  {name:"Brokula (svježa)",unit:"g",baseAmount:100,kcal:34,protein:2.8,carbs:7,fat:0.4},
  {name:"Cvjetača",unit:"g",baseAmount:100,kcal:25,protein:1.9,carbs:5,fat:0.3},
  {name:"Špinat (svježi)",unit:"g",baseAmount:100,kcal:23,protein:2.9,carbs:3.6,fat:0.4},
  {name:"Blitva (kuhana)",unit:"g",baseAmount:100,kcal:20,protein:1.9,carbs:4,fat:0.1},
  {name:"Zelena salata",unit:"g",baseAmount:100,kcal:15,protein:1.4,carbs:2.9,fat:0.2},
  {name:"Rikola",unit:"g",baseAmount:100,kcal:25,protein:2.6,carbs:3.7,fat:0.7},
  {name:"Iceberg salata",unit:"g",baseAmount:100,kcal:14,protein:0.9,carbs:3,fat:0.1},
  {name:"Rajčica",unit:"g",baseAmount:100,kcal:18,protein:0.9,carbs:3.9,fat:0.2},
  {name:"Cherry rajčica",unit:"g",baseAmount:100,kcal:18,protein:0.9,carbs:3.9,fat:0.2},
  {name:"Krastavac",unit:"g",baseAmount:100,kcal:16,protein:0.7,carbs:3.6,fat:0.1},
  {name:"Tikvice",unit:"g",baseAmount:100,kcal:17,protein:1.2,carbs:3.1,fat:0.3},
  {name:"Patlidžan",unit:"g",baseAmount:100,kcal:25,protein:1,carbs:6,fat:0.2},
  {name:"Crvena paprika",unit:"g",baseAmount:100,kcal:31,protein:1,carbs:7,fat:0.3},
  {name:"Zelena paprika",unit:"g",baseAmount:100,kcal:20,protein:0.9,carbs:4.6,fat:0.2},
  {name:"Žuta paprika",unit:"g",baseAmount:100,kcal:27,protein:1,carbs:6.3,fat:0.2},
  {name:"Mrkva",unit:"g",baseAmount:100,kcal:41,protein:0.9,carbs:9.6,fat:0.2},
  {name:"Bundeva",unit:"g",baseAmount:100,kcal:26,protein:1,carbs:7,fat:0.1},
  {name:"Luk",unit:"g",baseAmount:100,kcal:40,protein:1.1,carbs:9.3,fat:0.1},
  {name:"Mladi luk",unit:"g",baseAmount:50,kcal:16,protein:0.9,carbs:3.7,fat:0.1},
  {name:"Češnjak",unit:"g",baseAmount:10,kcal:15,protein:0.6,carbs:3.1,fat:0.1},
  {name:"Gljive (bijele)",unit:"g",baseAmount:100,kcal:22,protein:3.1,carbs:3.3,fat:0.3},
  {name:"Šampinjoni",unit:"g",baseAmount:100,kcal:22,protein:3.1,carbs:3.3,fat:0.3},
  {name:"Mahune (svježe)",unit:"g",baseAmount:100,kcal:31,protein:1.8,carbs:7,fat:0.1},
  {name:"Šparoge",unit:"g",baseAmount:100,kcal:20,protein:2.2,carbs:3.9,fat:0.1},
  {name:"Kiseli kupus",unit:"g",baseAmount:100,kcal:19,protein:0.9,carbs:4.3,fat:0.1},
  {name:"Jabuka",unit:"kom",baseAmount:1,kcal:72,protein:0.4,carbs:19,fat:0.2},
  {name:"Kruška",unit:"kom",baseAmount:1,kcal:96,protein:0.6,carbs:26,fat:0.2},
  {name:"Banana",unit:"kom",baseAmount:1,kcal:89,protein:1.1,carbs:23,fat:0.3},
  {name:"Naranča",unit:"kom",baseAmount:1,kcal:62,protein:1.2,carbs:15,fat:0.2},
  {name:"Mandarina",unit:"kom",baseAmount:1,kcal:45,protein:0.7,carbs:11,fat:0.3},
  {name:"Jagode",unit:"g",baseAmount:100,kcal:32,protein:0.7,carbs:7.7,fat:0.3},
  {name:"Maline",unit:"g",baseAmount:100,kcal:53,protein:1.2,carbs:12,fat:0.7},
  {name:"Borovnice",unit:"g",baseAmount:100,kcal:57,protein:0.7,carbs:14,fat:0.3},
  {name:"Trešnje",unit:"g",baseAmount:100,kcal:63,protein:1.1,carbs:16,fat:0.2},
  {name:"Breskva",unit:"kom",baseAmount:1,kcal:58,protein:1.4,carbs:14,fat:0.4},
  {name:"Kivi",unit:"kom",baseAmount:1,kcal:42,protein:0.8,carbs:10,fat:0.4},
  {name:"Mango",unit:"g",baseAmount:100,kcal:60,protein:0.8,carbs:15,fat:0.4},
  {name:"Ananas",unit:"g",baseAmount:100,kcal:50,protein:0.5,carbs:13,fat:0.1},
  {name:"Lubenica",unit:"g",baseAmount:100,kcal:30,protein:0.6,carbs:7.6,fat:0.2},
  {name:"Grožđe",unit:"g",baseAmount:100,kcal:69,protein:0.7,carbs:18,fat:0.2},
  {name:"Avokado",unit:"g",baseAmount:100,kcal:160,protein:2,carbs:8.5,fat:14.7},
  {name:"Med",unit:"g",baseAmount:20,kcal:61,protein:0.1,carbs:16.5,fat:0},
  {name:"Džem",unit:"g",baseAmount:20,kcal:47,protein:0.1,carbs:12,fat:0},
  {name:"Javorov sirup",unit:"ml",baseAmount:15,kcal:52,protein:0,carbs:13,fat:0},
  {name:"Kravlje mlijeko (3.2%)",unit:"ml",baseAmount:200,kcal:130,protein:6.8,carbs:9.4,fat:5},
  {name:"Kravlje mlijeko (1.5%)",unit:"ml",baseAmount:200,kcal:94,protein:6.6,carbs:9.8,fat:3},
  {name:"Sojino mlijeko",unit:"ml",baseAmount:200,kcal:80,protein:7,carbs:6,fat:4},
  {name:"Zobeni napitak",unit:"ml",baseAmount:200,kcal:86,protein:3,carbs:15,fat:3},
  {name:"Bademov napitak",unit:"ml",baseAmount:200,kcal:28,protein:1,carbs:2,fat:2.4},
  {name:"Kefir",unit:"ml",baseAmount:200,kcal:122,protein:6.4,carbs:9.6,fat:3.6},
  {name:"Obični jogurt",unit:"g",baseAmount:150,kcal:85,protein:5,carbs:11,fat:2.5},
  {name:"Voćni jogurt",unit:"g",baseAmount:150,kcal:130,protein:4,carbs:24,fat:2},
  {name:"Šećer",unit:"g",baseAmount:10,kcal:40,protein:0,carbs:10,fat:0},
  {name:"Espresso",unit:"kom",baseAmount:1,kcal:2,protein:0.1,carbs:0,fat:0},
  {name:"Voda",unit:"ml",baseAmount:250,kcal:0,protein:0,carbs:0,fat:0},
  {name:"Zeleni čaj",unit:"ml",baseAmount:200,kcal:2,protein:0,carbs:0.4,fat:0},
  {name:"Sol",unit:"g",baseAmount:5,kcal:0,protein:0,carbs:0,fat:0},
  {name:"Soja umak",unit:"ml",baseAmount:15,kcal:9,protein:1.5,carbs:0.9,fat:0},
];

function lookupFood(name, sheetFoods=[]){
  if(!name)return null;
  const n=name.trim().toLowerCase();
  const all=[...sheetFoods,...FOOD_DB];
  // exact match first
  let f=all.find(x=>x.name.toLowerCase()===n);
  if(f)return f;
  // partial match
  f=all.find(x=>x.name.toLowerCase().includes(n)||n.includes(x.name.toLowerCase()));
  return f||null;
}

function parseCSV(text){
  const lines=text.trim().split("\n");
  if(lines.length<2)return[];
  const headers=lines[0].split(",").map(h=>h.trim().replace(/^"|"$/g,"").toLowerCase());
  return lines.slice(1).map(line=>{
    const vals=line.split(",").map(v=>v.trim().replace(/^"|"$/g,""));
    const obj={};
    headers.forEach((h,i)=>obj[h]=vals[i]||"");
    return obj;
  }).filter(r=>r.date&&r.name);
}

function JelovnikTab({nutrition,addNutrition}){
  const [rows,setRows]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [confirmed,setConfirmed]=useState(()=>{
    try{return JSON.parse(localStorage.getItem("jelovnik_confirmed")||"{}");}catch{return{};}
  });
  const [selDate,setSelDate]=useState(today());
  const [lastFetch,setLastFetch]=useState(null);
  const [sheetFoods,setSheetFoods]=useState([]);

  useEffect(()=>{
    loadSheetFoods().then(foods=>{if(foods.length>0)setSheetFoods(foods);});
  },[]);

  function saveConfirmed(c){
    setConfirmed(c);
    try{localStorage.setItem("jelovnik_confirmed",JSON.stringify(c));}catch{}
  }

  useEffect(()=>{
    fetchSheet();
  },[]);

  async function fetchSheet(){
    setLoading(true);setError(null);
    try{
      const r=await fetch(SHEET_URL+"&t="+Date.now());
      const text=await r.text();
      const parsed=parseCSV(text);
      setRows(parsed);
      setLastFetch(new Date());
    }catch(e){
      setError("Ne mogu dohvatiti jelovnik. Provjeri da je Sheet objavljen.");
    }
    setLoading(false);
  }

  const dayRows=rows.filter(r=>r.date===selDate);
  const dates=[...new Set(rows.map(r=>r.date))].sort();
  const dots=dates;

  // Group by meal
  const meals={};
  dayRows.forEach(r=>{
    if(!meals[r.meal])meals[r.meal]=[];
    meals[r.meal].push(r);
  });

  // Calc totals for day
  const dayTotals=dayRows.reduce((acc,r)=>{
    const food=lookupFood(r.name,sheetFoods);
    if(!food)return acc;
    const amt=parseFloat(r.amount)||food.baseAmount;
    const ratio=amt/food.baseAmount;
    return{
      kcal:acc.kcal+food.kcal*ratio,
      protein:acc.protein+food.protein*ratio,
      carbs:acc.carbs+food.carbs*ratio,
      fat:acc.fat+food.fat*ratio,
    };
  },{kcal:0,protein:0,carbs:0,fat:0});

  async function confirm(row){
    const food=lookupFood(row.name,sheetFoods);
    if(!food){alert(`Namirnica "${row.name}" nije pronađena u bazi.`);return;}
    const amt=parseFloat(row.amount)||food.baseAmount;
    const ratio=amt/food.baseAmount;
    const key=`${row.date}_${row.meal}_${row.name}`;
    await addNutrition({
      date:row.date,
      meal:row.meal,
      name:food.name,
      baseFood:food.name,
      quantity:amt,
      unit:food.unit,
      kcal:Math.round(food.kcal*ratio*10)/10,
      protein:Math.round(food.protein*ratio*10)/10,
      carbs:Math.round(food.carbs*ratio*10)/10,
      fat:Math.round(food.fat*ratio*10)/10,
    });
    saveConfirmed({...confirmed,[key]:true});
  }

  async function confirmAll(){
    const unconfirmed=dayRows.filter(r=>{
      const key=`${r.date}_${r.meal}_${r.name}`;
      return !confirmed[key]&&lookupFood(r.name);
    });
    for(const r of unconfirmed) await confirm(r);
  }

  function unconfirm(row){
    const key=`${row.date}_${row.meal}_${row.name}`;
    const c={...confirmed};delete c[key];
    saveConfirmed(c);
  }

  const allConfirmed=dayRows.length>0&&dayRows.every(r=>confirmed[`${r.date}_${r.meal}_${r.name}`]);
  const confirmedCount=dayRows.filter(r=>confirmed[`${r.date}_${r.meal}_${r.name}`]).length;

  const MEAL_ORDER=["Smoothie","Doručak","Jutarnja užina","Ručak","Obrok nakon treninga","Užina","Desert","Večera","Kasna večera"];

  return(
    <div>
      <Cal val={selDate} onChange={setSelDate} dots={dots}/>

      {/* Day totals */}
      {dayRows.length>0&&(
        <div className="mrow" style={{marginBottom:12}}>
          {[
            {l:"kcal",v:Math.round(dayTotals.kcal),c:"#993c1d"},
            {l:"Protein",v:Math.round(dayTotals.protein)+"g",c:"#185fa5"},
            {l:"Ugljik.",v:Math.round(dayTotals.carbs)+"g",c:"#854f0b"},
            {l:"Masti",v:Math.round(dayTotals.fat)+"g",c:"#0f6e56"},
          ].map(m=>(
            <div key={m.l} className="met">
              <div className="met-l">{m.l}</div>
              <div className="met-v" style={{color:m.c,fontSize:m.l==="kcal"?20:16}}>{m.v}</div>
            </div>
          ))}
        </div>
      )}

      {/* Header with refresh and confirm all */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:13,fontWeight:500,color:"#1a1a18"}}>
            {dayRows.length>0?`${confirmedCount}/${dayRows.length} potvrđeno`:"Nema jelovnika za ovaj dan"}
          </div>
          {lastFetch&&<div style={{fontSize:11,color:"#bbb"}}>Zadnje osvježeno: {lastFetch.toLocaleTimeString("hr-HR",{hour:"2-digit",minute:"2-digit"})}</div>}
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-ghost" style={{padding:"8px 14px",fontSize:13,width:"auto"}} onClick={fetchSheet} disabled={loading}>
            {loading?"⟳":"⟳ Osvježi"}
          </button>
          {dayRows.length>0&&!allConfirmed&&(
            <button className="btn btn-g" style={{padding:"8px 14px",fontSize:13,width:"auto"}} onClick={confirmAll}>
              ✓ Potvrdi sve
            </button>
          )}
        </div>
      </div>

      {loading&&<div style={{textAlign:"center",padding:"40px 0",color:"#bbb"}}>Učitavanje jelovnika...</div>}
      {error&&<div style={{padding:"14px",background:"#fff0ec",borderRadius:12,color:"#993c1d",fontSize:14,marginBottom:12}}>{error}</div>}

      {!loading&&dayRows.length===0&&!error&&(
        <div style={{textAlign:"center",padding:"40px 0",color:"#bbb",fontSize:14}}>
          Nema planiranih obroka za {selDate===today()?"danas":fmtShort(selDate)}.<br/>
          <span style={{fontSize:12,color:"#ccc"}}>Dodaj u Google Sheet i klikni Osvježi.</span>
        </div>
      )}

      {/* Meal groups */}
      {MEAL_ORDER.filter(m=>meals[m]).map(mealName=>(
        <div key={mealName} style={{marginBottom:10}}>
          <div className="meal-hd">
            <span>{MEAL_ICONS[mealName]||"🍽️"}</span>
            <span style={{flex:1}}>{mealName}</span>
            <span className="bx bz">
              {Math.round(meals[mealName].reduce((a,r)=>{
                const f=lookupFood(r.name);
                if(!f)return a;
                return a+f.kcal*(parseFloat(r.amount)||f.baseAmount)/f.baseAmount;
              },0))} kcal
            </span>
          </div>
          <div className="meal-bd">
            {meals[mealName].map((row,i)=>{
              const food=lookupFood(row.name,sheetFoods);
              const amt=parseFloat(row.amount)||food?.baseAmount||0;
              const ratio=food?amt/food.baseAmount:0;
              const key=`${row.date}_${row.meal}_${row.name}`;
              const isConfirmed=!!confirmed[key];
              const notFound=!food;
              return(
                <div key={i} className="frow" style={{opacity:notFound?0.5:1}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      {isConfirmed&&<span style={{color:"#1d9e75",fontSize:12}}>✓</span>}
                      <span style={{textDecoration:isConfirmed?"line-through":"none",color:isConfirmed?"#aaa":"#1a1a18"}}>{row.name}</span>
                      {notFound&&<span style={{fontSize:10,color:"#d85a30",fontWeight:500}}>NIJE U BAZI</span>}
                    </div>
                    <div style={{fontSize:11,color:"#aaa"}}>
                      {amt} {food?.unit||""}
                      {food&&<span style={{marginLeft:6}}>{Math.round(food.kcal*ratio)} kcal · {Math.round(food.protein*ratio)}g P</span>}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                    {!notFound&&(
                      isConfirmed
                        ?<button className="btn btn-ghost" style={{padding:"6px 10px",fontSize:12,width:"auto",color:"#aaa"}} onClick={()=>unconfirm(row)}>Poništi</button>
                        :<button className="btn btn-g" style={{padding:"6px 12px",fontSize:12,width:"auto"}} onClick={()=>confirm(row)}>+ Dodaj</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}


// ─── Shopping tab ─────────────────────────────────────────────────────────────
const SHOPPING_UID = "189bcf56-7374-4def-9790-9f20617601b2";

function ShoppingTab(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [input,setInput]=useState("");
  const [cat,setCat]=useState("Ostalo");
  const inputRef=React.useRef(null);

  const CATS=["Meso i riba","Mliječni","Voće","Povrće","Žitarice i kruh","Smrznuto","Konzerve","Pića","Suplementi","Ostalo"];
  const CAT_ICONS={"Meso i riba":"🥩","Mliječni":"🥛","Voće":"🍎","Povrće":"🥦","Žitarice i kruh":"🍞","Smrznuto":"❄️","Konzerve":"🥫","Pića":"💧","Suplementi":"💊","Ostalo":"🛒"};

  useEffect(()=>{
    (async()=>{
      const{data}=await sb.from("shopping").select("*").eq("user_id",SHOPPING_UID).order("created_at",{ascending:true});
      setItems(data||[]);
      setLoading(false);
    })();
  },[]);

  async function add(){
    const name=input.trim();
    if(!name)return;
    const{data:d}=await sb.from("shopping").insert({user_id:SHOPPING_UID,name,cat,bought:false}).select().single();
    if(d)setItems(p=>[...p,d]);
    setInput("");
    inputRef.current?.focus();
  }

  async function toggle(id){
    const item=items.find(i=>i.id===id);
    const{data:d}=await sb.from("shopping").update({bought:!item.bought}).eq("id",id).select().single();
    if(d)setItems(p=>p.map(i=>i.id===id?d:i));
  }

  async function remove(id){
    await sb.from("shopping").delete().eq("id",id);
    setItems(p=>p.filter(i=>i.id!==id));
  }

  async function removeBought(){
    const bought=items.filter(i=>i.bought);
    await Promise.all(bought.map(i=>sb.from("shopping").delete().eq("id",i.id)));
    setItems(p=>p.filter(i=>!i.bought));
  }

  async function clearAll(){
    if(!window.confirm("Obriši cijeli popis?"))return;
    await sb.from("shopping").delete().eq("user_id",SHOPPING_UID);
    setItems([]);
  }

  // Group by category, bought items at bottom
  const notBought=items.filter(i=>!i.bought);
  const bought=items.filter(i=>i.bought);
  const grouped={};
  notBought.forEach(i=>{if(!grouped[i.cat])grouped[i.cat]=[];grouped[i.cat].push(i);});

  return(
    <div>
      {/* Input */}
      <div className="card" style={{marginBottom:12}}>
        <div className="ttl">Dodaj stavku</div>
        <div style={{marginBottom:10}}>
          <span className="lbl">Kategorija</span>
          <div className="pills">
            {CATS.map(c=>(
              <button key={c} className={`pill${cat===c?" dk":""}`} style={{fontSize:12}} onClick={()=>setCat(c)}>
                {CAT_ICONS[c]} {c}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <input
            ref={inputRef}
            className="inp"
            placeholder="npr. Pileća prsa, Zobene pahuljice..."
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&add()}
            style={{flex:1}}
          />
          <button className="btn btn-g" style={{width:56,padding:0,fontSize:20}} onClick={add}>+</button>
        </div>
      </div>

      {/* Stats */}
      {items.length>0&&(
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,padding:"0 2px"}}>
          <div style={{fontSize:13,color:"#888"}}>
            <span style={{fontWeight:500,color:"#1a1a18"}}>{notBought.length}</span> preostalo
            {bought.length>0&&<span style={{marginLeft:8,color:"#1d9e75"}}>· <span style={{fontWeight:500}}>{bought.length}</span> kupljeno</span>}
          </div>
          <div style={{display:"flex",gap:8}}>
            {bought.length>0&&(
              <button className="btn btn-ghost" style={{padding:"6px 12px",fontSize:12,width:"auto"}} onClick={removeBought}>
                Obriši kupljeno
              </button>
            )}
            <button className="btn btn-ghost" style={{padding:"6px 12px",fontSize:12,width:"auto",color:"#d85a30",borderColor:"#fca5a5"}} onClick={clearAll}>
              Obriši sve
            </button>
          </div>
        </div>
      )}

      {loading&&<div style={{textAlign:"center",padding:"40px 0",color:"#bbb",fontSize:14}}>Učitavanje popisa...</div>}
      {!loading&&items.length===0&&(
        <div style={{textAlign:"center",padding:"60px 0",color:"#bbb",fontSize:14}}>
          <div style={{fontSize:40,marginBottom:12}}>🛒</div>
          Popis je prazan.<br/>Dodaj prvu stavku gore.
        </div>
      )}

      {/* Not bought — grouped by category */}
      {Object.keys(grouped).map(catName=>(
        <div key={catName} style={{marginBottom:10}}>
          <div style={{fontSize:11,fontWeight:600,color:"#aaa",textTransform:"uppercase",letterSpacing:".8px",padding:"0 2px",marginBottom:6}}>
            {CAT_ICONS[catName]} {catName}
          </div>
          <div className="card" style={{padding:0,overflow:"hidden"}}>
            {grouped[catName].map((item,i)=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderBottom:i<grouped[catName].length-1?"1px solid #f5f3ef":"none"}}>
                <button
                  onClick={()=>toggle(item.id)}
                  style={{width:24,height:24,borderRadius:"50%",border:"2px solid #e8e5df",background:"none",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s",WebkitTapHighlightColor:"transparent"}}
                >
                </button>
                <span style={{flex:1,fontSize:15,color:"#1a1a18"}}>{item.name}</span>
                <button className="rm" onClick={()=>remove(item.id)}>×</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bought items */}
      {bought.length>0&&(
        <div style={{marginTop:16}}>
          <div style={{fontSize:11,fontWeight:600,color:"#bbb",textTransform:"uppercase",letterSpacing:".8px",padding:"0 2px",marginBottom:6}}>
            ✓ Kupljeno ({bought.length})
          </div>
          <div className="card" style={{padding:0,overflow:"hidden"}}>
            {bought.map((item,i)=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:i<bought.length-1?"1px solid #f5f3ef":"none",opacity:0.5}}>
                <button
                  onClick={()=>toggle(item.id)}
                  style={{width:24,height:24,borderRadius:"50%",border:"2px solid #1d9e75",background:"#1d9e75",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,WebkitTapHighlightColor:"transparent"}}
                >✓</button>
                <span style={{flex:1,fontSize:15,color:"#aaa",textDecoration:"line-through"}}>{item.name}</span>
                <button className="rm" onClick={()=>remove(item.id)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Izvještaj tab ────────────────────────────────────────────────────────────
const IZVJESTAJ_UID = "189bcf56-7374-4def-9790-9f20617601b2";

function IzvjestajTab(){
  const TJEDNI=Array.from({length:14},(_,i)=>`${["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV"][i]}.`);
  const DANI=["Pon","Uto","Sri","Čet","Pet","Sub","Ned"];
  const DANI_KEYS=["k_pon","k_uto","k_sri","k_cet","k_pet","k_sub","k_ned"];
  const OCJENE=[
    {k:"prehrana",l:"Dosljednost programu (prehrana)"},
    {k:"trening",l:"Dosljednost programu (trening)"},
    {k:"glad",l:"Glad"},
    {k:"san",l:"San"},
    {k:"energija",l:"Razina energije"},
    {k:"probava",l:"Probava"},
  ];

  const emptyRow=(t)=>({
    tjedan:t,
    struk:"",kukovi:"",l_ruka:"",d_ruka:"",l_kvad:"",d_kvad:"",
    k_pon:"",k_uto:"",k_sri:"",k_cet:"",k_pet:"",k_sub:"",k_ned:"",
    o_prehrana:0,o_trening:0,o_glad:0,o_san:0,o_energija:0,o_probava:0,
    izazov:"",bolje:"",
  });

  const [rows,setRows]=useState(()=>Object.fromEntries(TJEDNI.map(t=>[t,emptyRow(t)])));
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [view,setView]=useState("opseg");
  const [selTj,setSelTj]=useState(TJEDNI[0]);

  useEffect(()=>{
    (async()=>{
      const{data}=await sb.from("izvjestaj").select("*").eq("user_id",IZVJESTAJ_UID);
      if(data&&data.length>0){
        const map={...Object.fromEntries(TJEDNI.map(t=>[t,emptyRow(t)]))};
        data.forEach(r=>{map[r.tjedan]={...emptyRow(r.tjedan),...r};});
        setRows(map);
      }
      setLoading(false);
    })();
  },[]);

  const saveTimer=React.useRef(null);

  function upd(tj,field,val){
    setRows(prev=>{
      const next={...prev,[tj]:{...prev[tj],[field]:val}};
      // debounced save
      clearTimeout(saveTimer.current);
      saveTimer.current=setTimeout(()=>saveRow(tj,next[tj]),800);
      return next;
    });
  }

  async function saveRow(tj,row){
    setSaving(true);
    await sb.from("izvjestaj").upsert({
      user_id:IZVJESTAJ_UID,
      tjedan:tj,
      struk:row.struk||null,kukovi:row.kukovi||null,
      l_ruka:row.l_ruka||null,d_ruka:row.d_ruka||null,
      l_kvad:row.l_kvad||null,d_kvad:row.d_kvad||null,
      k_pon:row.k_pon||null,k_uto:row.k_uto||null,k_sri:row.k_sri||null,
      k_cet:row.k_cet||null,k_pet:row.k_pet||null,k_sub:row.k_sub||null,k_ned:row.k_ned||null,
      o_prehrana:+row.o_prehrana||null,o_trening:+row.o_trening||null,
      o_glad:+row.o_glad||null,o_san:+row.o_san||null,
      o_energija:+row.o_energija||null,o_probava:+row.o_probava||null,
      izazov:row.izazov||null,bolje:row.bolje||null,
      updated_at:new Date().toISOString(),
    },{onConflict:"user_id,tjedan"});
    setSaving(false);
  }

  const r=rows[selTj]||emptyRow(selTj);

  function avg(tj){
    const row=rows[tj]||emptyRow(tj);
    const vals=DANI_KEYS.map(k=>parseFloat(row[k]?.replace(",","."))).filter(v=>!isNaN(v)&&v>0);
    if(!vals.length)return"-";
    return(vals.reduce((a,v)=>a+v,0)/vals.length).toFixed(1);
  }

  function exportCSV(){
    const lines=[];
    lines.push("MJERENJE OPSEGA");
    lines.push("Tjedan,Struk (pupak),Kukovi (najširi),L ruka,D ruka,L kvadriceps,D kvadriceps");
    TJEDNI.forEach(t=>{
      const o=rows[t]||emptyRow(t);
      lines.push(`${t},${o.struk},${o.kukovi},${o.l_ruka},${o.d_ruka},${o.l_kvad},${o.d_kvad}`);
    });
    lines.push("");
    lines.push("KRETANJE KILAŽE");
    lines.push("Tjedan,Pon,Uto,Sri,Čet,Pet,Sub,Ned,Prosjek");
    TJEDNI.forEach(t=>{
      const o=rows[t]||emptyRow(t);
      lines.push(`${t},${DANI_KEYS.map(k=>o[k]).join(",")},${avg(t)}`);
    });
    lines.push("");
    lines.push("OCJENE I BILJEŠKE");
    lines.push("Tjedan,"+OCJENE.map(o=>o.l).join(",")+",Najveći izazov,Što bolje?");
    TJEDNI.forEach(t=>{
      const o=rows[t]||emptyRow(t);
      lines.push(`${t},${OCJENE.map(x=>o["o_"+x.k]).join(",")},"${o.izazov}","${o.bolje}"`);
    });
    const blob=new Blob([lines.join("\n")],{type:"text/csv;charset=utf-8;"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="tjedni_izvjestaj.csv";
    a.click();
  }

  async function reset(){if(!window.confirm("Obriši sve podatke u izvještaju?"))return;await sb.from("izvjestaj").delete().eq("user_id",IZVJESTAJ_UID);setRows(Object.fromEntries(TJEDNI.map(t=>[t,emptyRow(t)])));}

  const inp={padding:"8px 6px",border:"1.5px solid #e8e5df",borderRadius:8,fontSize:14,width:"100%",outline:"none",textAlign:"center",background:"#fafaf8",WebkitAppearance:"none"};
  const inpFocus=(e)=>{e.target.style.borderColor="#1d9e75";e.target.style.background="#fff";};
  const inpBlur=(e)=>{e.target.style.borderColor="#e8e5df";e.target.style.background="#fafaf8";};

  return(
    <div>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:300,color:"#1a1a18",letterSpacing:"-.5px"}}>Tjedni izvještaj</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {saving&&<span style={{fontSize:11,color:"#aaa"}}>Spremanje...</span>}
          {loading&&<span style={{fontSize:11,color:"#aaa"}}>Učitavanje...</span>}
          <button className="btn btn-g" style={{padding:"8px 14px",fontSize:13,width:"auto"}} onClick={exportCSV}>↓ CSV</button>
          <button className="btn btn-ghost" style={{padding:"8px 14px",fontSize:13,width:"auto",color:"#d85a30",borderColor:"#fca5a5"}} onClick={reset}>Resetiraj</button>
        </div>
      </div>

      {/* View switcher */}
      <div className="pills" style={{marginBottom:14}}>
        {[{id:"opseg",l:"📏 Opsezi"},{id:"kilaza",l:"⚖️ Kilaža"},{id:"ocjene",l:"📝 Ocjene"}].map(v=>(
          <button key={v.id} className={`pill${view===v.id?" dk":""}`} onClick={()=>setView(v.id)}>{v.l}</button>
        ))}
      </div>

      {/* Week selector */}
      <div style={{marginBottom:14}}>
        <span className="lbl">Tjedan</span>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {TJEDNI.map(t=>(
            <button key={t} className={`pill${selTj===t?" dk":""}`} style={{fontSize:12,padding:"6px 11px"}} onClick={()=>setSelTj(t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* ── OPSEG ── */}
      {view==="opseg"&&(
        <div className="card">
          <div className="ttl">Mjerenje opsega — {selTj} tjedan</div>
          <div style={{fontSize:11,color:"#aaa",marginBottom:14}}>Mjeri ujutro prije prvog obroka, na stisnute mišiće (cm)</div>
          {[
            {k:"struk",l:"Struk (kod pupka)"},
            {k:"kukovi",l:"Kukovi (najširi dio)"},
            {k:"lRuka",l:"L ruka (najveći dio)"},
            {k:"dRuka",l:"D ruka (najveći dio)"},
            {k:"lKvad",l:"L kvadriceps (sredina)"},
            {k:"dKvad",l:"D kvadriceps (sredina)"},
          ].map(f=>(
            <div key={f.k} style={{marginBottom:12}}>
              <span className="lbl">{f.l}</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.0"
                  value={r[{struk:'struk',kukovi:'kukovi',lRuka:'l_ruka',dRuka:'d_ruka',lKvad:'l_kvad',dKvad:'d_kvad'}[f.k]]||''}
                  onChange={e=>upd(selTj,{struk:'struk',kukovi:'kukovi',lRuka:'l_ruka',dRuka:'d_ruka',lKvad:'l_kvad',dKvad:'d_kvad'}[f.k],e.target.value)}
                  onFocus={inpFocus} onBlur={inpBlur}
                  style={inp}
                />
                <span style={{fontSize:13,color:"#aaa",flexShrink:0}}>cm</span>
              </div>
            </div>
          ))}

          {/* Mini overview table */}
          <div className="div"/>
          <div className="lbl" style={{marginBottom:8}}>Pregled svih tjedana</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{background:"#f5f3ef"}}>
                  {["Tj.","Struk","Kukovi","L ruka","D ruka","L kvad","D kvad"].map(h=>(
                    <th key={h} style={{padding:"6px 8px",textAlign:"center",fontWeight:600,color:"#666",whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TJEDNI.map((t,i)=>{
                  const o=(rows[t]||emptyRow(t));
                  const hasData=['struk','kukovi','l_ruka','d_ruka','l_kvad','d_kvad'].some(k=>o[k]&&o[k]!=='');
                  if(!hasData&&t!==selTj)return null;
                  return(
                    <tr key={t} style={{background:t===selTj?"#e1f5ee":"#fff",cursor:"pointer"}} onClick={()=>setSelTj(t)}>
                      <td style={{padding:"7px 8px",textAlign:"center",fontWeight:600,color:t===selTj?"#0f6e56":"#1a1a18"}}>{t}</td>
                      {[o.struk,o.kukovi,o.l_ruka,o.d_ruka,o.l_kvad,o.d_kvad].map((v,j)=>(
                        <td key={j} style={{padding:"7px 8px",textAlign:"center",color:v?"#1a1a18":"#ddd"}}>{v||"—"}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── KILAŽA ── */}
      {view==="kilaza"&&(
        <div className="card">
          <div className="ttl">Kretanje kilaže — {selTj} tjedan</div>
          <div style={{fontSize:11,color:"#aaa",marginBottom:14}}>Upisuj uz decimalni zarez (npr. 85,4)</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
            {DANI.map(dn=>(
              <div key={dn}>
                <span className="lbl">{dn}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="—"
                  value={r[DANI_KEYS[DANI.indexOf(dn)]]}
                  onChange={e=>upd(selTj,DANI_KEYS[DANI.indexOf(dn)],e.target.value)}
                  onFocus={inpFocus} onBlur={inpBlur}
                  style={{...inp,fontSize:15}}
                />
              </div>
            ))}
            <div>
              <span className="lbl" style={{color:"#0f6e56"}}>Prosjek</span>
              <div style={{padding:"8px 6px",background:"#e1f5ee",borderRadius:8,fontSize:15,fontWeight:600,color:"#0f6e56",textAlign:"center"}}>{avg(selTj)}</div>
            </div>
          </div>

          {/* Overview table */}
          <div className="div"/>
          <div className="lbl" style={{marginBottom:8}}>Pregled svih tjedana</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{background:"#f5f3ef"}}>
                  {["Tj.",...DANI,"Prosjek"].map(h=>(
                    <th key={h} style={{padding:"6px 8px",textAlign:"center",fontWeight:600,color:"#666"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TJEDNI.map(t=>{
                  const k=(rows[t]||emptyRow(t));
                  const hasData=DANI_KEYS.some(dk=>k[dk]&&k[dk]!=='');
                  if(!hasData&&t!==selTj)return null;
                  return(
                    <tr key={t} style={{background:t===selTj?"#e1f5ee":"#fff",cursor:"pointer"}} onClick={()=>setSelTj(t)}>
                      <td style={{padding:"7px 8px",textAlign:"center",fontWeight:600,color:t===selTj?"#0f6e56":"#1a1a18"}}>{t}</td>
                      {DANI.map(dn=>(
                        <td key={dn} style={{padding:"7px 8px",textAlign:"center",color:k[dn]?"#1a1a18":"#ddd"}}>{k[dn]||"—"}</td>
                      ))}
                      <td style={{padding:"7px 8px",textAlign:"center",fontWeight:600,color:"#0f6e56"}}>{avg(t)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── OCJENE ── */}
      {view==="ocjene"&&(
        <div className="card">
          <div className="ttl">Ocjene i bilješke — {selTj} tjedan</div>
          <div style={{fontSize:11,color:"#aaa",marginBottom:16}}>Ocijeni od 1 do 10</div>
          {OCJENE.map(o=>(
            <div key={o.k} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:13,color:"#555"}}>{o.l}</span>
                <span style={{fontSize:18,fontWeight:300,fontFamily:"'Fraunces',serif",color:"#1d9e75",minWidth:28,textAlign:"right"}}>{+r['o_'+o.k]||"—"}</span>
              </div>
              <input
                type="range" min={1} max={10} step={1}
                className="r-green"
                value={+r['o_'+o.k]||0}
                style={{"--pct":`${((+r['o_'+o.k]||0)===0?0:((+r['o_'+o.k])-1)/9*100)}%`}}
                onChange={e=>upd(selTj,'o_'+o.k,+e.target.value)}
              />
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#ccc",marginTop:2}}>
                <span>1</span><span>5</span><span>10</span>
              </div>
            </div>
          ))}
          <div className="div"/>
          <div style={{marginBottom:12}}>
            <span className="lbl">Što je bio tvoj najveći izazov ovaj tjedan?</span>
            <textarea className="inp" rows={3} placeholder="Upiši..." value={r.izazov} onChange={e=>upd(selTj,'izazov',e.target.value)}/>
          </div>
          <div>
            <span className="lbl">Što bi se idući tjedan moglo napraviti bolje ili drugačije?</span>
            <textarea className="inp" rows={3} placeholder="Upiši..." value={r.bolje} onChange={e=>upd(selTj,'bolje',e.target.value)}/>
          </div>

          {/* Mini overview */}
          <div className="div"/>
          <div className="lbl" style={{marginBottom:8}}>Pregled ocjena</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead>
                <tr style={{background:"#f5f3ef"}}>
                  <th style={{padding:"6px 8px",textAlign:"left",color:"#666"}}>Tj.</th>
                  {OCJENE.map(o=><th key={o.k} style={{padding:"6px 4px",textAlign:"center",color:"#666",fontSize:10}}>{o.l.split(" ")[0]}</th>)}
                </tr>
              </thead>
              <tbody>
                {TJEDNI.map(t=>{
                  const o=(rows[t]||emptyRow(t));
                  const hasData=OCJENE.some(x=>o['o_'+x.k]&&+o['o_'+x.k]>0);
                  if(!hasData&&t!==selTj)return null;
                  return(
                    <tr key={t} style={{background:t===selTj?"#e1f5ee":"#fff",cursor:"pointer"}} onClick={()=>setSelTj(t)}>
                      <td style={{padding:"7px 8px",fontWeight:600,color:t===selTj?"#0f6e56":"#1a1a18"}}>{t}</td>
                      {OCJENE.map(x=>{
                        const v=+o['o_'+x.k]||0;
                        const c=v>=8?"#0f6e56":v>=5?"#ba7517":v>0?"#d85a30":"#ddd";
                        return<td key={x.k} style={{padding:"7px 4px",textAlign:"center",fontWeight:v?600:400,color:c}}>{v||"—"}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Privatno tab ─────────────────────────────────────────────────────────────
const PRIVATE_PIN = "6891";
const PRIVATE_UID_SUFFIX = "_private";

function PrivatnoTab(){
  const [unlocked,setUnlocked]=useState(()=>sessionStorage.getItem("privatno_unlocked")==="1");
  const [pin,setPin]=useState("");
  const [error,setError]=useState(false);
  const [privateWeight,setPrivateWeight]=useState([]);
  const [loading,setLoading]=useState(false);
  const [selDate,setSelDate]=useState(today());
  const [kg,setKg]=useState("");
  const [notes,setNotes]=useState("");
  const [saving,setSaving]=useState(false);

  const PRIVATE_USER = "189bcf56-7374-4def-9790-9f20617601b2";

  useEffect(()=>{
    if(!unlocked)return;
    setLoading(true);
    sb.from("weight_private").select("*").eq("user_id",PRIVATE_USER).order("date",{ascending:true})
      .then(({data})=>{setPrivateWeight(data||[]);setLoading(false);});
  },[unlocked]);

  function tryPin(){
    if(pin===PRIVATE_PIN){
      sessionStorage.setItem("privatno_unlocked","1");
      setUnlocked(true);setError(false);
    } else {
      setError(true);setPin("");
    }
  }

  function lock(){
    sessionStorage.removeItem("privatno_unlocked");
    setUnlocked(false);setPin("");
  }

  const existing=privateWeight.find(w=>w.date===selDate);
  useEffect(()=>{
    if(existing){setKg(String(existing.kg));setNotes(existing.notes||"");}
    else{setKg("");setNotes("");}
  },[selDate,privateWeight]);

  async function submit(){
    if(!kg||isNaN(+kg))return;
    setSaving(true);
    const ex=privateWeight.find(w=>w.date===selDate);
    if(ex){
      const{data:d}=await sb.from("weight_private").update({kg:+kg,notes}).eq("id",ex.id).select().single();
      if(d)setPrivateWeight(p=>p.map(w=>w.id===ex.id?d:w).sort((a,b)=>a.date.localeCompare(b.date)));
    }else{
      const{data:d}=await sb.from("weight_private").insert({user_id:PRIVATE_USER,date:selDate,kg:+kg,notes:notes||null}).select().single();
      if(d)setPrivateWeight(p=>[...p,d].sort((a,b)=>a.date.localeCompare(b.date)));
    }
    setSaving(false);
  }

  async function removeW(id){
    await sb.from("weight_private").delete().eq("id",id);
    setPrivateWeight(p=>p.filter(x=>x.id!==id));
  }

  // PIN screen
  if(!unlocked){
    return(
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",gap:20}}>
        <div style={{fontSize:40}}>🔒</div>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:300,color:"#1a1a18"}}>Privatno</div>
        <div style={{fontSize:13,color:"#aaa"}}>Upiši 4-znamenkasti PIN</div>
        <div style={{display:"flex",gap:10}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{width:14,height:14,borderRadius:"50%",background:pin.length>i?"#1a1a18":"#e8e5df",transition:"background .15s"}}/>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,width:220}}>
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=>(
            <button key={i} onClick={()=>{
              if(n==="⌫"){setPin(p=>p.slice(0,-1));setError(false);}
              else if(n!==""){
                const np=pin+n;
                setPin(np);
                setError(false);
                if(np.length===4){
                  if(np===PRIVATE_PIN){sessionStorage.setItem("privatno_unlocked","1");setUnlocked(true);}
                  else{setError(true);setTimeout(()=>{setPin("");setError(false);},600);}
                }
              }
            }}
            style={{
              height:60,borderRadius:14,border:"1.5px solid #e8e5df",
              background:n===""?"transparent":"#fff",
              fontSize:n==="⌫"?20:22,fontWeight:300,
              cursor:n===""?"default":"pointer",
              color:error?"#d85a30":"#1a1a18",
              fontFamily:"'Fraunces',serif",
              transition:"all .1s",
              boxShadow:n!==""?"0 1px 3px rgba(0,0,0,.06)":"none",
            }}>
              {n}
            </button>
          ))}
        </div>
        {error&&<div style={{fontSize:13,color:"#d85a30",fontWeight:500}}>Pogrešan PIN</div>}
      </div>
    );
  }

  // Weight content (same as WeightTab but private data)
  const sorted=privateWeight.slice().sort((a,b)=>a.date.localeCompare(b.date));
  const latest=sorted[sorted.length-1];
  const oldest=sorted[0];
  const diff=latest&&oldest&&latest!==oldest?+(latest.kg-oldest.kg).toFixed(1):null;
  const chartData=sorted.slice(-30).map(w=>({y:w.kg,label:fmtShort(w.date)}));
  const dots=privateWeight.map(w=>w.date);

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:300,color:"#1a1a18"}}>🔒 Privatno</div>
        <button className="btn btn-ghost" style={{padding:"7px 14px",fontSize:12,width:"auto"}} onClick={lock}>Zaključaj</button>
      </div>

      <Cal val={selDate} onChange={setSelDate} dots={dots}/>

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
              {diff!==null?(diff>0?"+":"")+diff:oldest?.kg??"-"}<span className="met-u">kg</span>
            </div>
            <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{diff!==null?`od ${fmtShort(oldest.date)}`:"početak"}</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="ttl">{existing?"Uredi mjerenje":"Unesi kilažu"}</div>
        <span className="lbl">Kilaža (kg)</span>
        <input type="number" className="inp" inputMode="decimal" step="0.1" placeholder="npr. 65.0"
          value={kg} onChange={e=>setKg(e.target.value)}
          style={{fontSize:20,fontWeight:300,textAlign:"center",marginBottom:12}}/>
        <span className="lbl">Bilješka (opcionalno)</span>
        <input className="inp" placeholder="npr. Jutro, natašte" value={notes}
          onChange={e=>setNotes(e.target.value)} style={{marginBottom:14}}/>
        <button className="btn btn-g" style={{opacity:saving?0.6:1}} onClick={submit} disabled={saving}>
          {saving?"Spremanje...":(existing?"Spremi promjenu":"Dodaj mjerenje")}
        </button>
      </div>

      {chartData.length>=2&&(
        <div className="card">
          <div className="ttl">Graf kilaže</div>
          <SvgLineChart data={chartData} color="#1d9e75"/>
        </div>
      )}

      {loading&&<div style={{textAlign:"center",padding:"20px",color:"#bbb",fontSize:14}}>Učitavanje...</div>}

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
                  <button className="rm" onClick={()=>removeW(w.id)}>×</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!loading&&privateWeight.length===0&&(
        <div style={{textAlign:"center",padding:"32px 0",color:"#bbb",fontSize:14}}>Još nema unesenih mjerenja.</div>
      )}
    </div>
  );
}

// ─── Dashboard tab ────────────────────────────────────────────────────────────
function DashboardTab({nutrition,digestion,weight,setTab}){
  const tod=today();
  const yday=toDS(new Date(new Date().setDate(new Date().getDate()-1)));

  // Today nutrition
  const todayFood=nutrition.filter(n=>n.date===tod);
  const todayKcal=Math.round(todayFood.reduce((a,n)=>a+n.kcal,0));
  const todayProtein=Math.round(todayFood.reduce((a,n)=>a+n.protein,0));
  const todayCarbs=Math.round(todayFood.reduce((a,n)=>a+n.carbs,0));
  const todayFat=Math.round(todayFood.reduce((a,n)=>a+n.fat,0));
  const goal=()=>{try{return+localStorage.getItem("kcal_goal")||2000;}catch{return 2000;}};
  const kcalGoal=goal();
  const kcalPct=Math.min(100,Math.round(todayKcal/kcalGoal*100));

  // Last digestion entry
  const lastDig=[...digestion].sort((a,b)=>b.date.localeCompare(a.date)||b.time?.localeCompare(a.time||"")||0)[0];
  const todayDig=digestion.filter(d=>d.date===tod);
  const avgWater=todayDig.length?Math.round(todayDig.reduce((a,d)=>a+d.water,0)/todayDig.length):0;
  const avgEnergy=todayDig.length?+(todayDig.reduce((a,d)=>a+d.energy,0)/todayDig.length).toFixed(1):null;
  const todayLoper=todayDig.some(d=>d.loperamide);
  const todayNoStool=todayDig.some(d=>d.no_stool);

  // Weight
  const sortedW=[...weight].sort((a,b)=>a.date.localeCompare(b.date));
  const latestW=sortedW[sortedW.length-1];
  const prevW=sortedW[sortedW.length-2];
  const wDiff=latestW&&prevW?+(latestW.kg-prevW.kg).toFixed(1):null;
  const firstW=sortedW[0];
  const totalDiff=latestW&&firstW&&latestW!==firstW?+(latestW.kg-firstW.kg).toFixed(1):null;

  // Last 7 days kcal
  const last7=Array.from({length:7},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(6-i));
    const ds=toDS(d);
    const kcal=Math.round(nutrition.filter(n=>n.date===ds).reduce((a,n)=>a+n.kcal,0));
    return{ds,kcal,day:d.toLocaleDateString("hr-HR",{weekday:"short"})};
  });
  const maxKcal=Math.max(...last7.map(d=>d.kcal),1);

  // Streak — consecutive days with any food logged
  let streak=0;
  for(let i=0;;i++){
    const d=new Date(); d.setDate(d.getDate()-i);
    const ds=toDS(d);
    if(nutrition.some(n=>n.date===ds))streak++;
    else break;
  }

  // Recent digestion days for mini heatmap
  const last14=Array.from({length:14},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(13-i));
    const ds=toDS(d);
    const digs=digestion.filter(e=>e.date===ds);
    const hasNoStool=digs.some(e=>e.no_stool);
    const hasLoper=digs.some(e=>e.loperamide);
    const avgPain=digs.length?digs.reduce((a,e)=>a+e.pain,0)/digs.length:null;
    return{ds,digs,hasNoStool,hasLoper,avgPain,day:d.toLocaleDateString("hr-HR",{weekday:"short"})};
  });

  return(
    <div>
      {/* Greeting */}
      <div style={{marginBottom:16}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:300,color:"#1a1a18",letterSpacing:"-.5px"}}>
          {new Date().getHours()<12?"Dobro jutro ☀️":new Date().getHours()<18?"Dobar dan 👋":"Dobra večer 🌙"}
        </div>
        <div style={{fontSize:13,color:"#aaa",marginTop:2}}>{new Date().toLocaleDateString("hr-HR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
      </div>

      {/* Kcal today */}
      <div className="card" style={{marginBottom:12,cursor:"pointer"}} onClick={()=>setTab("nutrition")}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <div className="lbl">Kalorije danas</div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:32,fontWeight:300,color:kcalPct>=100?"#d85a30":"#1a1a18",lineHeight:1}}>
              {todayKcal}<span style={{fontSize:16,color:"#aaa",fontFamily:"'DM Sans',sans-serif",fontWeight:400}}> / {kcalGoal}</span>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            {streak>0&&<div style={{fontSize:12,color:"#0f6e56",fontWeight:500}}>🔥 {streak} dan{streak===1?"":"a"} zaredom</div>}
            <div style={{fontSize:11,color:"#aaa",marginTop:4}}>{todayFood.length} obroka</div>
          </div>
        </div>
        <div style={{height:6,background:"#f0ede8",borderRadius:99,overflow:"hidden",marginBottom:10}}>
          <div style={{height:"100%",width:`${kcalPct}%`,background:kcalPct>=100?"#d85a30":kcalPct>=80?"#ba7517":"#1d9e75",borderRadius:99,transition:"width .4s"}}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          {[{l:"P",v:todayProtein,c:"#378add"},{l:"U",v:todayCarbs,c:"#ba7517"},{l:"M",v:todayFat,c:"#1d9e75"}].map(m=>(
            <div key={m.l} style={{flex:1,background:"#f5f3ef",borderRadius:10,padding:"8px 10px"}}>
              <div style={{fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:".6px"}}>{m.l}</div>
              <div style={{fontSize:16,fontWeight:500,color:m.c,fontFamily:"'Fraunces',serif"}}>{m.v}g</div>
            </div>
          ))}
        </div>
      </div>

      {/* Kalorije 7 dana mini bar chart */}
      <div className="card" style={{marginBottom:12,cursor:"pointer"}} onClick={()=>setTab("stats")}>
        <div className="lbl">Kalorije — zadnjih 7 dana</div>
        <div style={{display:"flex",align:"flex-end",gap:4,height:60,alignItems:"flex-end",marginTop:8}}>
          {last7.map((d,i)=>(
            <div key={d.ds} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{fontSize:9,color:d.ds===tod?"#1d9e75":"#ccc",fontWeight:d.ds===tod?600:400}}>{d.kcal>0?d.kcal:""}</div>
              <div style={{width:"100%",background:d.ds===tod?"#1d9e75":d.kcal>0?"#d4d1cb":"#f0ede8",borderRadius:"4px 4px 0 0",height:`${d.kcal>0?Math.max(8,Math.round(d.kcal/maxKcal*44)):4}px`,transition:"height .4s"}}/>
              <div style={{fontSize:9,color:d.ds===tod?"#1a1a18":"#bbb",fontWeight:d.ds===tod?600:400}}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        {/* Kilaža */}
        <div className="card" style={{cursor:"pointer",margin:0}} onClick={()=>setTab("weight")}>
          <div className="lbl">Kilaža</div>
          {latestW
            ?<>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:300,color:"#0f6e56",lineHeight:1}}>{latestW.kg}<span style={{fontSize:13,color:"#aaa",fontFamily:"'DM Sans',sans-serif"}}> kg</span></div>
              <div style={{fontSize:12,marginTop:4}}>
                {wDiff!==null&&<span style={{color:wDiff>0?"#d85a30":wDiff<0?"#0f6e56":"#aaa",fontWeight:500}}>{wDiff>0?"+":""}{wDiff} kg</span>}
                {totalDiff!==null&&<span style={{color:"#bbb",marginLeft:6}}>({totalDiff>0?"+":""}{totalDiff} ukupno)</span>}
              </div>
              <div style={{fontSize:11,color:"#bbb",marginTop:2}}>{fmtShort(latestW.date)}</div>
            </>
            :<div style={{fontSize:13,color:"#bbb",marginTop:8}}>Nema mjerenja</div>
          }
        </div>

        {/* Probava danas */}
        <div className="card" style={{cursor:"pointer",margin:0}} onClick={()=>setTab("digestion")}>
          <div className="lbl">Probava danas</div>
          {todayDig.length>0
            ?<>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4,marginBottom:6}}>
                {todayNoStool&&<span className="bx bred">Bez stolice</span>}
                {todayLoper&&<span className="bx bred">💊</span>}
                {!todayNoStool&&!todayLoper&&<span className="bx bt">{todayDig.length} {todayDig.length===1?"unos":"unosa"}</span>}
              </div>
              <div style={{fontSize:12,color:"#888"}}>
                {avgEnergy!==null&&<div>Energija: <b style={{color:"#0f6e56"}}>{avgEnergy}/5</b></div>}
                <div>Vode: <b style={{color:"#378add"}}>{avgWater} čaša</b></div>
              </div>
            </>
            :<div style={{fontSize:13,color:"#bbb",marginTop:8}}>Nema unosa danas</div>
          }
        </div>
      </div>

      {/* Probava 14 dana heatmap */}
      <div className="card" style={{marginBottom:12,cursor:"pointer"}} onClick={()=>setTab("digestion")}>
        <div className="lbl">Probava — zadnjih 14 dana</div>
        <div style={{display:"flex",gap:3,marginTop:8,flexWrap:"wrap"}}>
          {last14.map(d=>{
            let bg="#f0ede8"; let title="Nema unosa";
            if(d.hasNoStool){bg="#f5c4b3";title="Bez stolice";}
            else if(d.hasLoper){bg="#fca5a5";title="Loperamid";}
            else if(d.digs.length>0&&d.avgPain!==null){
              const p=d.avgPain;
              bg=p<=2?"#9fe1cb":p<=5?"#fde68a":"#fca5a5";
              title=`Bol ${p.toFixed(1)}/10`;
            }
            return(
              <div key={d.ds} title={title} style={{flex:"1 1 calc(14% - 3px)",minWidth:18}}>
                <div style={{height:28,borderRadius:6,background:bg}}/>
                <div style={{fontSize:8,color:"#bbb",textAlign:"center",marginTop:2}}>{d.day}</div>
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
          {[{c:"#9fe1cb",l:"Dobro"},{c:"#fde68a",l:"Umjereno"},{c:"#fca5a5",l:"Loše/Loper"},{c:"#f5c4b3",l:"Bez stolice"},{c:"#f0ede8",l:"Nema unosa"}].map(x=>(
            <div key={x.l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#aaa"}}>
              <div style={{width:10,height:10,borderRadius:3,background:x.c,flexShrink:0}}/>
              {x.l}
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <div className="lbl">Brzi unos</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
          {[
            {icon:"🥗",l:"Dodaj obrok",tab:"nutrition"},
            {icon:"🫁",l:"Unesi probavu",tab:"digestion"},
            {icon:"⚖️",l:"Unesi kilažu",tab:"weight"},
            {icon:"🏃",l:"Trčanje",tab:"strava"},
          ].map(a=>(
            <button key={a.tab} onClick={()=>setTab(a.tab)}
              style={{padding:"14px 12px",borderRadius:12,border:"1.5px solid #e8e5df",background:"#fafaf8",cursor:"pointer",fontSize:13,fontWeight:500,color:"#1a1a18",display:"flex",alignItems:"center",gap:10,WebkitTapHighlightColor:"transparent",transition:"all .12s"}}>
              <span style={{fontSize:22}}>{a.icon}</span>{a.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("dashboard");
  const UID="189bcf56-7374-4def-9790-9f20617601b2";
  const {nutrition,digestion,customFoods,weight,loading,addNutrition,removeNutrition,updateNutrition,addDigestion,removeDigestion,addCustomFood,addWeight,removeWeight}=useData(UID);

  const tabs=[{id:"dashboard",l:"Danas",icon:"🏠"},{id:"jelovnik",l:"Jelovnik",icon:"📋"},{id:"nutrition",l:"Prehrana",icon:"🥗"},{id:"digestion",l:"Probava",icon:"🫁"},{id:"strava",l:"Trčanje",icon:"🏃"},{id:"weight",l:"Kilaža",icon:"⚖️"},{id:"shopping",l:"Dućan",icon:"🛒"},{id:"izvjestaj",l:"Izvještaj",icon:"📋"},{id:"privatno",l:"Privatno",icon:"🔒"},{id:"stats",l:"Statistike",icon:"📊"}];
  const activeTab=tabs.find(t=>t.id===tab);

  const tabContent=loading
    ?<div style={{textAlign:"center",padding:"50px 0",color:"#bbb",fontSize:14}}>Učitavanje...</div>
    :<>
      {tab==="dashboard"&&<DashboardTab nutrition={nutrition} digestion={digestion} weight={weight} setTab={setTab}/>
      }
      {tab==="jelovnik"&&<JelovnikTab nutrition={nutrition} addNutrition={addNutrition}/>}
      {tab==="nutrition"&&<NutritionTab nutrition={nutrition} customFoods={customFoods} addNutrition={addNutrition} addCustomFood={addCustomFood} removeNutrition={removeNutrition} updateNutrition={updateNutrition}/>}
      {tab==="digestion"&&<DigestionTab digestion={digestion} addDigestion={addDigestion} removeDigestion={removeDigestion}/>}
      {tab==="weight"&&<WeightTab weight={weight} addWeight={addWeight} removeWeight={removeWeight}/>}
      {tab==="stats"&&<StatsTab nutrition={nutrition} digestion={digestion}/>}
      {tab==="strava"&&<StravaTab/>}
      {tab==="shopping"&&<ShoppingTab/>}
      {tab==="privatno"&&<PrivatnoTab/>}
      {tab==="izvjestaj"&&<IzvjestajTab/>}
    </>;

  return(
    <>
      <style>{CSS}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>

      {/* MOBILE layout */}
      <div className="zt-mobile-wrap">
        <div className="zt-hdr">
          <div className="zt-hdr-in">
            <div className="zt-logo">Zdravlje <em>Tracker</em></div>
            
          </div>
          <div className="zt-tabbar">
            {tabs.map(t=><button key={t.id} className={`zt-tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>{t.icon} {t.l}</button>)}
          </div>
        </div>
        <div className="zt-body">{tabContent}</div>
      </div>

      {/* DESKTOP layout */}
      <div className="zt-desktop">
        <div className="zt-sidebar">
          <div className="zt-sidebar-logo">
            <div className="zt-logo">Zdravlje <em>Tracker</em></div>
          </div>
          <nav className="zt-sidebar-nav">
            {tabs.map(t=>(
              <button key={t.id} className={`zt-sidebar-tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
                <span className="tab-icon">{t.icon}</span>
                <span>{t.l}</span>
              </button>
            ))}
          </nav>
          <div className="zt-sidebar-footer">
            
          </div>
        </div>
        <div className="zt-main">
          <div className="zt-main-hdr">
            <div className="zt-main-title">{activeTab?.icon} {activeTab?.l}</div>
            
          </div>
          <div className="zt-body">{tabContent}</div>
        </div>
      </div>
    </>
  );
}
