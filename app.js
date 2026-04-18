// Brainrot Calculator — rebuilt UI
// Logic preserved from the original calculator (rank/level/mutation math + brainrotDB).
// UI rebuilt from scratch.

'use strict';

/* ===== Brainrot DB (same entries) ===== */
const brainrotDB = {
"tung tung sahur": 100,
    "cappucino assasino": 150,
    "extinct tung tung sahur": 32000,
    "pipi potato": 300,
    "cappuchina ballerina": 450,
    "extinct capucina": 65000,
    "salamino penguino": 750,
    "fluriflura": 937,
    "tim cheese": 1125,
    "extinct fluriflura": 130000,
    "orangutini ananasini": 1875,
    "brr brr patapim": 3000,
    "nooo my hotspot": 3500,
    "udin din din din dun": 4500,
    "pipi kiwi": 5250,
    "extinct ananasini": 260000,
    "chef crabracadabra": 9000,
    "boneca ambalabu": 12000,
    "cacto hipopotamo": 13500,
    "capi taco": 15000,
    "sigma boy": 18000,
    "tukanno bananno": 32000,
    "extinct boneca": 500000,
    "gorillo watermelodrillo": 37500,
    "tric trac barabum": 52500,
    "avocadini guffo": 63750,
    "quivioli ameleonni": 100000,
    "tacorita tacorito": 100000,
    "friggo camelo": 150000,
    "glorbo fruttodrillo": 187500,
    "pakrahmatmamat": 225000,
    "karkerkar kurkur": 350000,
    "extinct gorillo": 1000000,
    "la vacca saturnita": 1000000,
    "tic tac sahur": 1750000,
    "pot hotspot": 2250000,
    "cocofanto elefanto": 2375000,
    "job job sahur": 2500000,
    "la cucaracha": 2750000,
    "la grande combination": 3000000,
    "cuadramat & pak": 3750000,
    "dul dul dul": 4500000,
    "cavallo virtuoso": 5000000,
    "extinct la grande": 3600000,
    "nuclearo dinossauro": 5000000,
    "67": 5500000,
    "cupcake koala": 6000000,
    "esok sekolah": 6500000,
    "giraffa celestre": 8000000,
    "chillin chili": 10000000,
    "swag soda": 12500000,
    "matteo": 15000000,
    "strawberelli flamingelli": 15500000,
    "ketupat kepat": 16000000,
    "skull skull skull": 18000000,
    "torrtuginni dragonfrutini": 18500000,
    "cocosini mama": 20000000,
    "mangolini parrocini": 20000000,
    "pipi corni": 25000000,
    "extinct matteo": 18000000,
    "ganganzelli trulala": 22500000,
    "strawberry elephant": 50000000,
    "crystalini ananassini": 55000000,
    "meowl": 65000000,
    "spiuniru golubiru": 70000000,
    "tigroligre frutonni": 80000000,
    "extinct ganganzelli": 27000000,
    "dragon cannelloni": 75000000,
    "alessio": 80000000,
    "bombini gusini": 85000000,
    "mariachi skeletoni": 87500000,
    "chicleteira bicicleteira": 90000000,
    "piccione maccina": 92500000,
    "crabbo limonetta": 95000000,
    "bandito axolito": 110000000,
    "stoppo luminino": 120000000,
    "extinct piccione": 111000000,
    "money money man": 125000000,
    "signore carapace": 175000000,
    "karloo": 225000000,
    "mastodontico telepiedone": 325000000,
    "piruitolita bicicleteira": 420000000,
    "extinct karloo": 270000000,
    "skeletoni cannelloni": 650000000,
    "spaghetti tualetti": 750000000,
    "arcade octo": 800000000,
    "bananini manini": 850000000,
    "namini meowini": 900000000,
    "cerberus": 1200000000,
    "hydra cannelloni": 1500000000,
    "mr chip": 2000000000,
    "los tralalerito": 2500000000,
    "money pug": 3000000000,
    "trippi troppi troppa trippa": 4000000000,
    "cashy": 5000000000,
    "tralalelodon": 55000000,
    "orcadon": 58500000,
    "blingo tentacolo": 62500000,
    "eviledon": 65000000,
    "moby bobby": 75000000,
    "presento camelo": 15000,
    "festive 67": 25000
};

/* ===== Mutations (same values) ===== */
const MUTATIONS = [
  {
    "name": "Snowy",
    "pct": 50
  },
  {
    "name": "Golden",
    "pct": 50
  },
  {
    "name": "Sakura",
    "pct": 60
  },
  {
    "name": "Tornado",
    "pct": 70
  },
  {
    "name": "Stinky",
    "pct": 80
  },
  {
    "name": "Lightning",
    "pct": 90
  },
  {
    "name": "Diamond",
    "pct": 100
  },
  {
    "name": "Taco",
    "pct": 100
  },
  {
    "name": "Meteor",
    "pct": 100
  },
  {
    "name": "Blackhole",
    "pct": 100
  },
  {
    "name": "Radioactive",
    "pct": 110
  },
  {
    "name": "Galaxy",
    "pct": 120
  },
  {
    "name": "Magmatic",
    "pct": 140
  },
  {
    "name": "Rainbow",
    "pct": 150
  },
  {
    "name": "Fishing Master",
    "pct": 200
  },
  {
    "name": "Disco",
    "pct": 200
  },
  {
    "name": "Giant",
    "pct": 200
  }
];

const el = (id) => document.getElementById(id);

const brainrotInput = el('brainrot');
const suggestionsBox = el('suggestions');
const baseStatEl = el('baseStat');
const mutationTotalEl = el('mutationTotal');
const errorEl = el('error');

const rankRadios = Array.from(document.querySelectorAll('input[name="rank-radio"]'));
const levelInput = el('level');

const rankMulEl = el('rankMul');
const levelMulEl = el('levelMul');
const mutationMulEl = el('mutationMul');
const finalStatEl = el('finalStat');
const finalStatSubEl = el('finalStatSub');
const formulaEl = el('formula');

const statusBadge = el('statusBadge');
const notiStack = el('notiStack');

const btnCalc = el('btnCalc');
const btnCalcInline = el('btnCalcInline');
const btnReset = el('btnReset');
const btnCopy = el('btnCopy');
const btnClearBrainrot = el('btnClearBrainrot');

const levelDown = el('levelDown');
const levelUp = el('levelUp');

let activeSuggestionIndex = -1;
let lastComputed = null;

function normalize(s) {
  return String(s ?? '').toLowerCase().trim();
}

function getRank() {
  const checked = rankRadios.find(r => r.checked);
  return checked ? parseInt(checked.value, 10) : 0;
}

function setRank(rank) {
  const r = clamp(parseInt(rank, 10) || 0, 0, 4);
  rankRadios.forEach(inp => { inp.checked = parseInt(inp.value, 10) === r; });
}


function formatNumber(num) {
  // Keep the same formatting behavior as the original:
  // id-ID locale, 0–2 decimals.
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function formatCompact(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2).replace(/\.00$/, '') + 'T';
  if (num >= 1e9)  return (num / 1e9).toFixed(2).replace(/\.00$/, '') + 'B';
  if (num >= 1e6)  return (num / 1e6).toFixed(2).replace(/\.00$/, '') + 'M';
  if (num >= 1e3)  return (num / 1e3).toFixed(2).replace(/\.00$/, '') + 'K';
    
  return num.toLocaleString();
}
function formatCurrencyCompact(num) {
  // UI-only formatting for base stat display
  return '$' + formatNumber(num);
}

function pushNotice(variant, title, sub, timeoutMs = 2200) {
  if (!notiStack) return;

  const tpl = document.createElement('div');
  tpl.className = 'noti-card';
  tpl.setAttribute('data-variant', variant);

  // Icon SVGs (simple + readable)
  const iconPaths = {
    success: 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z',
    error: 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 96c-13.3 0-24 10.7-24 24v120c0 13.3 10.7 24 24 24s24-10.7 24-24V168c0-13.3-10.7-24-24-24zm0 224a28 28 0 1 0 0 56 28 28 0 1 0 0-56z',
    info: 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 96a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm-24 96h24c13.3 0 24 10.7 24 24v96h24c13.3 0 24 10.7 24 24s-10.7 24-24 24H208c-13.3 0-24-10.7-24-24s10.7-24 24-24h24v-72h-0c-13.3 0-24-10.7-24-24s10.7-24 24-24z'
  };

  tpl.innerHTML = `
    <svg class="noti-wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z" fill-opacity="1"></path>
    </svg>

    <div class="noti-icon-container" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="noti-icon">
        <path d="${iconPaths[variant] || iconPaths.info}"></path>
      </svg>
    </div>

    <div class="noti-text">
      <p class="noti-title">${title}</p>
      <p class="noti-sub">${sub || ''}</p>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" class="noti-close" aria-label="Close notification" role="button" tabindex="0">
      <path fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"></path>
    </svg>
  `;

  const close = () => {
    tpl.classList.add('is-hide');
    window.setTimeout(() => tpl.remove(), 180);
  };

  tpl.querySelector('.noti-close')?.addEventListener('click', close);
  tpl.querySelector('.noti-close')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') close();
  });

  notiStack.appendChild(tpl);

  window.setTimeout(close, timeoutMs);
}

function setBadge(state, text) {
  statusBadge.classList.remove('badge--ok', 'badge--bad');
  if (state === 'ok') statusBadge.classList.add('badge--ok');
  if (state === 'bad') statusBadge.classList.add('badge--bad');
  statusBadge.textContent = text;
}

function openSuggestions(open) {
  suggestionsBox.style.display = open ? 'block' : 'none';
  brainrotInput.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function renderMutations() {
  const wrap = el('mutationsList');
  wrap.innerHTML = '';

  for (const m of MUTATIONS) {
    const label = document.createElement('label');
    label.className = 'chip';
    label.setAttribute('data-pct', String(m.pct));

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'mutation';
    input.value = String(m.pct);

    const name = document.createElement('span');
    name.className = 'chip__name';
    name.textContent = m.name;

    const pct = document.createElement('span');
    pct.className = 'chip__pct';
    pct.textContent = `+${m.pct}%`;

    label.appendChild(input);
    label.appendChild(name);
    label.appendChild(pct);

    input.addEventListener('change', () => {
      label.classList.toggle('is-on', input.checked);
      updateMutationTotal();
      softRecalc();
    });

    // Clicking the label toggles the checkbox automatically. We just sync class.
    label.addEventListener('click', (e) => {
      // Avoid double-toggling when clicking the hidden checkbox.
      if (e.target === input) return;
      window.requestAnimationFrame(() => {
        label.classList.toggle('is-on', input.checked);
        updateMutationTotal();
        softRecalc();
      });
    });

    wrap.appendChild(label);
  }
}

function updateMutationTotal() {
  let mutationPercent = 0;
  document.querySelectorAll('.mutation:checked').forEach(m => {
    mutationPercent += parseFloat(m.value);
  });
  mutationTotalEl.textContent = `${mutationPercent}%`;
}

function setBaseStatUI(valueOrNull) {
  if (valueOrNull == null) {
    baseStatEl.textContent = '—';
    return;
  }
  baseStatEl.textContent = formatCurrencyCompact(valueOrNull);
}

function listMatches(query) {
  const q = normalize(query);
  if (q.length < 1) return [];
  return Object.keys(brainrotDB).filter(name => name.startsWith(q));
}

function renderSuggestions(matches) {
  suggestionsBox.innerHTML = '';
  activeSuggestionIndex = -1;

  if (matches.length === 0) {
    openSuggestions(false);
    return;
  }

  // Keep it scrollable and snappy
  const maxItems = 12;
  const items = matches.slice(0, maxItems);

  for (let i = 0; i < items.length; i++) {
    const name = items[i];
    const opt = document.createElement('div');
    opt.className = 'option';
    opt.setAttribute('role', 'option');
    opt.setAttribute('data-index', String(i));

    const left = document.createElement('div');
    left.className = 'option__name';
    left.textContent = name;

    const right = document.createElement('div');
    right.className = 'option__meta';
    right.textContent = '$' + brainrotDB[name];

    opt.appendChild(left);
    opt.appendChild(right);

    opt.addEventListener('mousedown', (e) => {
      // mousedown to prevent blur hiding the list before click
      e.preventDefault();
      pickSuggestion(name);
    });

    suggestionsBox.appendChild(opt);
  }

  openSuggestions(true);
}

function setActiveSuggestion(nextIndex) {
  const options = Array.from(suggestionsBox.querySelectorAll('.option'));
  if (options.length === 0) return;

  // wrap
  if (nextIndex < 0) nextIndex = options.length - 1;
  if (nextIndex >= options.length) nextIndex = 0;

  options.forEach(o => o.classList.remove('is-active'));
  const opt = options[nextIndex];
  opt.classList.add('is-active');
  activeSuggestionIndex = nextIndex;

  // Ensure visible
  opt.scrollIntoView({ block: 'nearest' });
}

function pickSuggestion(name) {
  brainrotInput.value = name;
  errorEl.textContent = '';
  setBaseStatUI(brainrotDB[name]);
  openSuggestions(false);
  softRecalc(true);
}

function showSuggestions() {
  const query = normalize(brainrotInput.value);

  // If exact match, show base stat even without clicking
  if (brainrotDB[query] != null) {
    errorEl.textContent = '';
    setBaseStatUI(brainrotDB[query]);
  } else if (query.length === 0) {
    errorEl.textContent = '';
    setBaseStatUI(null);
  }

  const matches = listMatches(query);

  if (query.length < 1) {
    openSuggestions(false);
    return;
  }

  if (matches.length === 0) {
    errorEl.textContent = 'Brainrot Not Found';
    setBaseStatUI(null);
    openSuggestions(false);
    return;
  }

  errorEl.textContent = '';
  renderSuggestions(matches);
}

function readInputs() {
  const name = normalize(brainrotInput.value);
  const level = parseInt(levelInput.value, 10);
  const rank = getRank();

  // same validation as original
  if (!brainrotDB[name] || level < 1 || rank < 0 || rank > 4) {
    return null;
  }

  // base stat
  const baseStat = brainrotDB[name];

  // same multipliers
  const rankMultiplier = 1 + (rank * 0.15);
  const levelMultiplier = 1 + ((level - 1) * 0.5);

  let mutationPercent = 0;
  document.querySelectorAll('.mutation:checked').forEach(m => {
    mutationPercent += parseFloat(m.value);
  });
  const mutationMultiplier = 1 + (mutationPercent / 100);

  const finalStat = ((baseStat * rankMultiplier) * levelMultiplier) * mutationMultiplier;

  return {
    name,
    level,
    rank,
    baseStat,
    rankMultiplier,
    levelMultiplier,
    mutationMultiplier,
    mutationPercent,
    finalStat
  };
}


function fitTextToContainer(el, {min=18, max=40, step=1} = {}) {
  if (!el) return;
  const parent = el.parentElement;
  if (!parent) return;

  // Reset to max first
  let size = max;
  el.style.fontSize = size + 'px';

  // If it still overflows, shrink until it fits or hits min
  const available = parent.clientWidth;
  // Make sure we measure the element itself (it may be block)
  while (size > min && el.scrollWidth > available) {
    size -= step;
    el.style.fontSize = size + 'px';
  }
}

function updateResultUI(calc) {
  if (!calc) {
    finalStatEl.textContent = '—';
    finalStatEl.style.fontSize = '';
    finalStatSubEl.textContent = '$/Fish';
    rankMulEl.textContent = '—';
    levelMulEl.textContent = '—';
    mutationMulEl.textContent = '—';
    formulaEl.textContent = '—';
    btnCopy.disabled = true;
    setBadge('bad', 'Invalid');
    return;
  }

  // Display
  finalStatEl.textContent = '$' + formatCompact(calc.finalStat);
  // Ensure the value fits inside its card (large numbers on narrow screens)
  fitTextToContainer(finalStatEl, { min: 18, max: 40, step: 1 });
  finalStatSubEl.textContent = '/ Fish';

  rankMulEl.textContent = `${calc.rankMultiplier}x`;
  levelMulEl.textContent = `${calc.levelMultiplier}x`;
  mutationMulEl.textContent = `${calc.mutationMultiplier}x`;

  formulaEl.textContent = `(${calc.baseStat} × ${calc.rankMultiplier} × ${calc.levelMultiplier} × ${calc.mutationMultiplier})`;

  btnCopy.disabled = false;
  setBadge('ok', 'Ready');
}

function calcAndRender() {
  const calc = readInputs();
  lastComputed = calc;
  updateResultUI(calc);

  if (!calc) return;

  // Nice UI: update base stat + mutation total
  setBaseStatUI(calc.baseStat);
  mutationTotalEl.textContent = `${calc.mutationPercent}%`;

  // This is the same output as the old site: Final Stat + breakdown multipliers
  pushNotice('success', 'Calculated', 'Result updated');
}

let softTimer = null;
function softRecalc(silent = false) {
  window.clearTimeout(softTimer);
  softTimer = window.setTimeout(() => {
    const calc = readInputs();
    lastComputed = calc;
    updateResultUI(calc);
    if (calc) {
      setBadge('ok', 'Live');
      btnCopy.disabled = false;
      mutationTotalEl.textContent = `${calc.mutationPercent}%`;
    } else {
      setBadge('bad', 'Waiting');
      btnCopy.disabled = true;
      updateMutationTotal();
    }
    if (!silent && calc) {
      // don't spam toast on every keystroke
    }
  }, 120);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function resetAll() {
  brainrotInput.value = '';
  setBaseStatUI(null);
  errorEl.textContent = '';
  openSuggestions(false);

  setRank(0);

  levelInput.value = '1';

  document.querySelectorAll('.mutation').forEach(cb => {
    cb.checked = false;
    cb.closest('.chip')?.classList.remove('is-on');
  });
  updateMutationTotal();

  lastComputed = null;
  setBadge('bad', 'Waiting');
  updateResultUI(null);
  pushNotice('info', 'Reset', 'All fields cleared');
}

async function copyResult() {
  if (!lastComputed) { pushNotice('info', 'Nothing to copy', 'Calculate a result first'); return; }

  const text = `Final Stat: $${formatNumber(lastComputed.finalStat)} / Fish\n` +
               `Rank: ${lastComputed.rankMultiplier}x | Level: ${lastComputed.levelMultiplier}x | Mutation: ${lastComputed.mutationMultiplier}x`;

  try {
    await navigator.clipboard.writeText(text);
    pushNotice('success', 'Copied', 'Result copied to clipboard');
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    pushNotice('success', 'Copied', 'Result copied');
  }
}

function wireEvents() {
  // Brainrot search
  brainrotInput.addEventListener('input', () => {
    showSuggestions();
    softRecalc(true);
  });

  brainrotInput.addEventListener('focus', () => {
    if (normalize(brainrotInput.value).length > 0) showSuggestions();
  });

  brainrotInput.addEventListener('keydown', (e) => {
    const isOpen = suggestionsBox.style.display === 'block';

    if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      setActiveSuggestion(activeSuggestionIndex + 1);
      return;
    }
    if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      setActiveSuggestion(activeSuggestionIndex - 1);
      return;
    }
    if (e.key === 'Enter') {
      if (isOpen) {
        e.preventDefault();
        const options = Array.from(suggestionsBox.querySelectorAll('.option'));
        if (options.length > 0) {
          const idx = activeSuggestionIndex >= 0 ? activeSuggestionIndex : 0;
          const name = options[idx].querySelector('.option__name')?.textContent;
          if (name) pickSuggestion(name);
        }
        return;
      }
      // Enter runs calculation when list isn't open
      e.preventDefault();
      calcAndRender();
      return;
    }
    if (e.key === 'Escape') {
      openSuggestions(false);
    }
  });

  document.addEventListener('click', (e) => {
    const combo = el('combo');
    if (!combo.contains(e.target)) {
      openSuggestions(false);
    }
  });

  btnClearBrainrot.addEventListener('click', () => {
    brainrotInput.value = '';
    setBaseStatUI(null);
    errorEl.textContent = '';
    openSuggestions(false);
    softRecalc(true);
    brainrotInput.focus();
  });

  // Rank selector (radio)
  rankRadios.forEach(r => {
    r.addEventListener('change', () => softRecalc(true));
  });

  // Level stepper + input
  levelDown.addEventListener('click', () => {
    const v = clamp(parseInt(levelInput.value || '1', 10) - 1, 1, 999999);
    levelInput.value = String(v);
    softRecalc(true);
  });
  levelUp.addEventListener('click', () => {
    const v = clamp(parseInt(levelInput.value || '1', 10) + 1, 1, 999999);
    levelInput.value = String(v);
    softRecalc(true);
  });
  levelInput.addEventListener('input', () => {
    const v = clamp(parseInt(levelInput.value || '1', 10), 1, 999999);
    levelInput.value = String(v);
    softRecalc(true);
  });

  // Buttons
  btnCalc.addEventListener('click', calcAndRender);
  btnCalcInline.addEventListener('click', calcAndRender);
  btnReset.addEventListener('click', resetAll);
  btnCopy.addEventListener('click', copyResult);

  // Initial
  setRank(0);
  setBadge('bad', 'Waiting');
  updateMutationTotal();
  updateResultUI(null);
}


function init() {
  renderMutations();
  wireEvents();
}

document.addEventListener('DOMContentLoaded', init);
