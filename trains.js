// Train types: which model runs a given train, looked up in SBB's Train Formation Service
// (opentransportdata.swiss), plus a photo of each model in the livery it runs in.
(() => {
  "use strict";

  // ---------- Catalogue ----------
  // role: "unit" = multiple unit, "coaches" = loco-hauled coaches, "loco" = locomotive.
  // photo: file in trains/, credit/license/source for the attribution its license requires.
  const MODELS = {
    flirtLex:   { name: "FLIRT", detail: "Stadler · Léman Express (RABe 522)", role: "unit" },
    flirt522:   { name: "FLIRT", detail: "Stadler · SBB (RABe 522)", role: "unit" },
    regiolis:   { name: "Régiolis", detail: "Alstom · Léman Express (Z 31500)", role: "unit" },
    fvdosto:    { name: "FV-Dosto", detail: "Alstom double-deck · SBB (RABe 502)", role: "unit" },
    giruno:     { name: "Giruno", detail: "Stadler high-speed · SBB (RABe 501)", role: "unit" },
    astoro:     { name: "Astoro", detail: "Alstom tilting train · SBB (RABe 503 / ETR 610)", role: "unit" },
    icn:        { name: "ICN", detail: "Tilting intercity · SBB (RABDe 500)", role: "unit" },
    ic2000:     { name: "IC2000", detail: "Double-deck intercity coaches · SBB", role: "coaches" },
    ew4:        { name: "Intercity coaches", detail: "Single-deck EW IV / EC coaches · SBB", role: "coaches" },
    re460:      { name: "Re 460", detail: "Locomotive · SBB", role: "loco" },
    kiss511:    { name: "KISS", detail: "Stadler double-deck · SBB (RABe 511)", role: "unit" },
    kiss512:    { name: "KISS", detail: "Stadler double-deck · SBB (RABe 512)", role: "unit" },
    dtz:        { name: "DTZ", detail: "Siemens double-deck S-Bahn · SBB (RABe 514)", role: "unit" },
    dpz:        { name: "DPZ", detail: "Double-deck S-Bahn with Re 450 · SBB", role: "coaches" },
    domino:     { name: "Domino", detail: "Regional train · SBB (RBDe 560)", role: "unit" },
    gtw520:     { name: "GTW", detail: "Stadler · SBB Seetal (RABe 520)", role: "unit" },
    flirt:      { name: "FLIRT", detail: "Stadler · SBB (RABe 521/523)", role: "unit" },
    tilo:       { name: "FLIRT", detail: "Stadler · TILO (RABe 524)", role: "unit" },
    thurbo:     { name: "GTW", detail: "Stadler · THURBO (RABe 526)", role: "unit" },
    traverso:   { name: "Traverso", detail: "Stadler FLIRT · SOB (RABe 526)", role: "unit" },
    sob526:     { name: "FLIRT", detail: "Stadler · SOB (RABe 526)", role: "unit" },
    mutz:       { name: "MUTZ", detail: "Stadler KISS · BLS (RABe 515)", role: "unit" },
    nina:       { name: "NINA", detail: "Regional train · BLS (RABe 525)", role: "unit" },
    mika:       { name: "MIKA", detail: "Stadler FLIRT · BLS (RABe 528)", role: "unit" },
    lotschberger:{ name: "Lötschberger", detail: "Regional train · BLS (RABe 535)", role: "unit" },
    lyria:      { name: "TGV Lyria", detail: "Alstom Euroduplex · TGV Lyria", role: "unit" },
    ice4:       { name: "ICE 4", detail: "Siemens · Deutsche Bahn (class 412)", role: "unit" },
    ice:        { name: "ICE", detail: "Deutsche Bahn", role: "unit" },
    zbAdler:    { name: "ADLER", detail: "Stadler · Zentralbahn (ABeh 150)", role: "unit" },
    zbFink:     { name: "FINK", detail: "Stadler · Zentralbahn (ABeh 160)", role: "unit" },
    zbSpatz:    { name: "SPATZ", detail: "Stadler · Zentralbahn (ABe 130)", role: "unit" },
    zbLex:      { name: "Luzern–Interlaken Express", detail: "Panorama coaches · Zentralbahn", role: "coaches" },
    ter:        { name: "TER", detail: "Coaches with locomotive · SNCF", role: "coaches" },
    rhb:        { name: "RhB train", detail: "Rhaetian Railway (narrow gauge)", role: "unit" },
    tpf:        { name: "TPF regional train", detail: "Transports publics fribourgeois", role: "unit" }
  };
  // Photos are filled in by trains/photos.js (generated from trains/CREDITS.md data).
  const PHOTOS = window.TRAIN_PHOTOS || {};

  // ---------- Vehicle → model ----------
  function classify(v, evu) {
    const id = v.vehicleIdentifier || {};
    const n = String(id.typeCodeName || "");
    const code = Number(id.typeCode) || 0;
    const num = String(id.vehicleNumber || "");          // e.g. "7522225": type digit, class, serial
    if (/\(502\)/.test(n)) return "fvdosto";
    if (/\(501\)/.test(n)) return "giruno";
    if (/\((503|610)\)/.test(n)) return "astoro";
    if (/ICN/.test(n)) return "icn";
    if (/\(2E/.test(n)) return "ic2000";
    if (/^BB\s?\d{5}|^[AB]1\d$|^Bt5$/.test(n)) return "ter";
    if (/\((GBT|LBT)|pm61|^Bt4/.test(n) || code === 3015 || code === 3016 || code === 3018 || code === 3038) return "ew4";
    if (/^Re\s?460/.test(n)) return "re460";
    if (/31500/.test(n)) return "regiolis";
    if (/522/.test(n)) return /^\d522[2]/.test(num) ? "flirtLex" : (evu === "SBBP" && /FR|\(F\)/.test(n) ? "flirtLex" : "flirt522");
    if (/511/.test(n)) return "kiss511";
    if (/512/.test(n)) return "kiss512";
    if (/514/.test(n)) return "dtz";
    if (/^Re\s?450|\+/.test(n) || [3006, 3008, 1055].includes(code)) return "dpz";
    if ([1074, 3002, 3022, 3007].includes(code) || /^RBDe|-CH|NDW/.test(n) && evu === "SBBP") return "domino";
    if (/520/.test(n)) return "gtw520";
    if (/52[13]/.test(n)) return "flirt";
    if (/524/.test(n)) return "tilo";
    if (/526/.test(n)) return evu === "THURBO" ? "thurbo" : evu === "SOB" ? (code === 6045 ? "traverso" : "sob526") : "thurbo";
    if (/^RABe\s?515/.test(n)) return "mutz";
    if (/^RABe\s?525/.test(n)) return "nina";
    if (/^RABe\s?528/.test(n)) return "mika";
    if (/^RABe\s?535/.test(n)) return "lotschberger";
    if (/2N2/.test(n)) return "lyria";
    if (/\(412\)/.test(n)) return "ice4";
    if (/\(4\d\d\)/.test(n) && /z/.test(n)) return "ice";
    if (evu === "ZB") return /150/.test(n) ? "zbAdler" : /160/.test(n) ? "zbFink" : /130/.test(n) ? "zbSpatz" : /GSW|Pano|HGe|Globi|S-\)|\(S/.test(n) ? "zbLex" : null;
    if (evu === "RhB") return "rhb";
    if (evu === "TPF") return "tpf";
    return null;
  }

  // The train's whole route (all scheduled stops, origin first), from every vehicle's stop list.
  const ts = (iso) => { const t = iso ? Date.parse(iso) : NaN; return Number.isFinite(t) ? t / 1000 : null; };
  function routeOf(vehicles) {
    const byStop = new Map();
    for (const v of vehicles) for (const s of v.formationVehicleAtScheduledStops || []) {
      const uic = s.stopPoint && s.stopPoint.uic; if (!uic) continue;
      const st = s.stopTime || {};
      const cur = byStop.get(uic) || { uic, name: "", arr: null, dep: null, platform: "" };
      cur.name = cur.name || (s.stopPoint.name || "");
      cur.arr = cur.arr ?? ts(st.arrivalTime); cur.dep = cur.dep ?? ts(st.departureTime);
      cur.platform = cur.platform || (s.track || "");
      byStop.set(uic, cur);
    }
    return [...byStop.values()].sort((a, b) => (a.dep ?? a.arr) - (b.dep ?? b.arr));
  }

  // Summarise a formation: the models in order, the main one, cars, seats, length and route.
  function summarise(data, evu) {
    const vehicles = [];
    for (const f of data.formations || []) for (const v of f.formationVehicles || []) vehicles.push(v);
    if (!vehicles.length) return null;
    const ids = [];
    for (const v of vehicles) {
      const id = classify(v, evu);
      if (id && !ids.includes(id)) ids.push(id);
    }
    const units = ids.filter((i) => MODELS[i].role !== "loco");
    const loco = ids.find((i) => MODELS[i].role === "loco");
    const main = units[0] || loco;
    // A train can list one formation per section of its route (often identical): use the largest.
    let cars = 0, seats = 0, length = 0;
    for (const f of data.formations || []) {
      const m = f.metaInformation || {};
      if ((m.numberVehicles || 0) > cars) { cars = m.numberVehicles || 0; seats = m.numberSeats || 0; length = m.length || 0; }
    }
    if (!cars) cars = vehicles.filter((v) => MODELS[classify(v, evu)]?.role !== "loco").length;
    const route = routeOf(vehicles);
    if (!main) return { unknown: true, route, raw: [...new Set(vehicles.map((v) => v.vehicleIdentifier?.typeCodeName).filter(Boolean))].slice(0, 3).join(", "), cars, seats, length };
    return { main, models: units, loco, cars, seats, length: Math.round(length), route };
  }

  // ---------- Formation service ----------
  const API = "https://api.opentransportdata.swiss/formation";
  const EVU = { SBB: "SBBP", BLS: "BLSP", SOB: "SOB", THURBO: "THURBO", TPF: "TPF", TRN: "TRN", ZB: "ZB", RHB: "RhB", MBC: "MBC", SZU: "SZU", OEBB: "OeBB", VDBB: "VDBB" };
  const evuFor = (operator) => EVU[String(operator || "").split(/[-\s]/)[0].toUpperCase()] || null;

  const keyStore = {
    get() { try { return localStorage.getItem("sbbdep.formationKey") || ""; } catch { return ""; } },
    set(v) { try { v ? localStorage.setItem("sbbdep.formationKey", v) : localStorage.removeItem("sbbdep.formationKey"); } catch {} }
  };
  const cache = new Map();      // "evu|date|nr" -> {state:"ok"|"none"|"error", info, at}
  const pending = new Map();
  const sent = [];              // request timestamps, to stay under 50 per minute
  let authFailed = false;
  const listeners = new Set();
  const notify = () => listeners.forEach((fn) => fn());

  async function throttle() {
    for (;;) {
      const t = Date.now();
      while (sent.length && t - sent[0] > 60000) sent.shift();
      if (sent.length < 40) { sent.push(t); return; }
      await new Promise((r) => setTimeout(r, 60000 - (t - sent[0]) + 50));
    }
  }

  async function fetchFormation(evu, date, nr) {
    const key = keyStore.get();
    for (const v of ["v2", "v1"]) {
      await throttle();
      const url = `${API}/${v}/formations_vehicle_based?evu=${encodeURIComponent(evu)}&operationDate=${date}&trainNumber=${nr}`;
      const res = await fetch(url, { headers: { Authorization: "Bearer " + key, Accept: "application/json" } });
      if (res.status === 401 || res.status === 403) { authFailed = true; throw new Error("auth"); }
      if (res.status === 429) throw new Error("rate");
      if (!res.ok) continue;                       // v2 often refuses trains that v1 still knows
      const data = await res.json();
      if (data && data.formations && data.formations.length) return data;
    }
    return null;
  }

  function lookup(j) {
    if (!j.trainNo || !j.evu || !j.date || !keyStore.get()) return null;
    const k = `${j.evu}|${j.date}|${j.trainNo}`;
    const hit = cache.get(k);
    if (hit && (hit.state === "ok" || Date.now() - hit.at < 10 * 60000)) return hit;
    if (!pending.has(k) && !authFailed) {
      pending.set(k, fetchFormation(j.evu, j.date, j.trainNo)
        .then((data) => {
          const info = data && summarise(data, j.evu);
          cache.set(k, info ? { state: "ok", info, at: Date.now() } : { state: "none", at: Date.now() });
        })
        .catch((e) => { if (e.message !== "auth") cache.set(k, { state: "error", at: Date.now() - (e.message === "rate" ? 0 : 8 * 60000) }); })
        .finally(() => { pending.delete(k); notify(); }));
    }
    return hit || { state: "loading" };
  }

  window.TrainTypes = {
    MODELS, PHOTOS, evuFor, lookup, summarise, classify,
    hasKey: () => !!keyStore.get(),
    getKey: keyStore.get,
    setKey(v) { keyStore.set(v.trim()); authFailed = false; cache.clear(); notify(); },
    authFailed: () => authFailed,
    onChange(fn) { listeners.add(fn); }
  };
})();
