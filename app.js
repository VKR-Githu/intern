/* =====================================================
   NeuraWrite — AI Content Platform
   app.js  |  All interaction logic (static demo)
   
   IMPORTANT: This is a static demo.
   All "AI" outputs are predefined sample data stored in data.js.
   No real AI model, API, or machine learning is running.
   ===================================================== */

'use strict';

/* ─────────────────────────────────────────────────────
   1. NAVIGATION — SPA-style page switching
   ───────────────────────────────────────────────────── */

const sidebar    = document.getElementById('sidebar');
const overlay    = document.getElementById('overlay');
const hamburger  = document.getElementById('hamburgerBtn');
const navLinks   = document.querySelectorAll('.nav-link');
const pages      = document.querySelectorAll('.page');

let analyticsChartsInit = false;

/* Switch the visible page */
function switchPage(pageName) {
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageName));
  pages.forEach(p  => p.classList.toggle('active',  p.id === `page-${pageName}`));

  /* Lazy-init analytics charts — Chart.js needs the canvas visible to size correctly */
  if (pageName === 'analytics' && !analyticsChartsInit) {
    initAnalyticsCharts();
    analyticsChartsInit = true;
  }

  window.scrollTo({ top: 0 });
  closeMobileSidebar();
}

/* Sidebar nav clicks */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    switchPage(link.dataset.page);
  });
});

/* data-goto buttons (e.g. "+ New Generation" on dashboard, "View all →" on activity) */
document.addEventListener('click', e => {
  const target = e.target.closest('[data-goto]');
  if (target) switchPage(target.dataset.goto);
});

/* Mobile sidebar */
hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('show');
});
overlay.addEventListener('click', closeMobileSidebar);

function closeMobileSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

/* ─────────────────────────────────────────────────────
   2. TOAST NOTIFICATION
   ───────────────────────────────────────────────────── */

const toast = document.getElementById('toast');
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1900);
}

/* ─────────────────────────────────────────────────────
   3. CLIPBOARD HELPER
   ───────────────────────────────────────────────────── */

async function copyText(text, msg = 'Copied to clipboard!') {
  if (!text) return showToast('Nothing to copy.');
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* Fallback for older browsers */
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  showToast(msg);
}

/* ─────────────────────────────────────────────────────
   4. SHARED UTILS
   ───────────────────────────────────────────────────── */

/* Safe HTML escaping — prevents XSS from user-entered content */
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

/* Animated counter for dashboard stat cards */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 950;
  const startTime = performance.now();
  (function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}

/* ─────────────────────────────────────────────────────
   5. DASHBOARD
   ───────────────────────────────────────────────────── */

/* Animate stat counters on first load (dashboard is active by default) */
setTimeout(() => {
  document.querySelectorAll('[data-count]').forEach(animateCounter);
}, 350);

/* Render recent-activity list */
function renderActivities() {
  const list = document.getElementById('activityList');
  if (!list) return;
  list.innerHTML = APP_DATA.RECENT_ACTIVITIES.map(a => `
    <li class="activity-item">
      <div class="activity-dot" style="background:${a.bg}">${a.icon}</div>
      <div class="activity-info">
        <div class="activity-title">${escapeHtml(a.title)}</div>
        <div class="activity-meta">${escapeHtml(a.meta)}</div>
      </div>
      <span class="activity-time">${escapeHtml(a.time)}</span>
    </li>`).join('');
}
renderActivities();

/* Dashboard charts — rendered immediately because dashboard page is visible on load */
(function initDashboardCharts() {
  const sharedFont = { family: 'Plus Jakarta Sans', size: 12 };

  /* Bar: Content generated per day this week */
  new Chart(document.getElementById('chartDashboardBar'), {
    type: 'bar',
    data: {
      labels: APP_DATA.CHART_DATA.dashboardBar.labels,
      datasets: [{
        label: 'Content Generated',
        data:   APP_DATA.CHART_DATA.dashboardBar.values,
        backgroundColor: 'rgba(99,102,241,0.85)',
        borderRadius: 7,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' },
             ticks: { font: sharedFont, color: '#64748b' } },
        x: { grid: { display: false },
             ticks: { font: sharedFont, color: '#64748b' } }
      }
    }
  });

  /* Doughnut: Sentiment overview */
  new Chart(document.getElementById('chartDashboardDoughnut'), {
    type: 'doughnut',
    data: {
      labels: APP_DATA.CHART_DATA.sentimentDistribution.labels,
      datasets: [{
        data: APP_DATA.CHART_DATA.sentimentDistribution.values,
        backgroundColor: ['#10b981','#6366f1','#f43f5e'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '62%',
      plugins: { legend: { position: 'bottom', labels: { font: sharedFont, padding: 14 } } }
    }
  });
})();

/* ─────────────────────────────────────────────────────
   6. CONTENT GENERATION
   ───────────────────────────────────────────────────── */

const promptInput   = document.getElementById('promptInput');
const categorySelect = document.getElementById('categorySelect');
const generateBtn   = document.getElementById('generateBtn');
const clearGenBtn   = document.getElementById('clearGenBtn');
const outputArea    = document.getElementById('outputArea');
const outputActions = document.getElementById('outputActions');
const loadingBox    = document.getElementById('loadingBox');
const copyGenBtn    = document.getElementById('copyGenBtn');
const regenBtn      = document.getElementById('regenBtn');

let selectedTone    = 'professional';
let currentOutput   = '';
let lastOutputIndex = -1; /* Avoids repeating the same template on Regenerate */

/* Tone button selection */
document.querySelectorAll('.tone-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedTone = btn.dataset.tone;
  });
});

/* Core generation function */
function runGeneration() {
  const prompt   = promptInput.value.trim();
  const category = categorySelect.value;

  if (!prompt) {
    showToast('⚠️ Please enter a prompt first.');
    promptInput.focus();
    return;
  }

  /* Show loader, hide previous output */
  outputArea.classList.add('hidden');
  outputActions.classList.add('hidden');
  loadingBox.classList.remove('hidden');

  /* Simulate ~1.5s AI processing delay */
  setTimeout(() => {
    const sampleSet = APP_DATA.SAMPLE_OUTPUTS[category] || APP_DATA.SAMPLE_OUTPUTS['social'];
    const texts = sampleSet.texts;

    /* Pick a different index than last time */
    let idx = Math.floor(Math.random() * texts.length);
    if (texts.length > 1 && idx === lastOutputIndex) {
      idx = (idx + 1) % texts.length;
    }
    lastOutputIndex = idx;

    /* Inject the user's topic into the template */
    const topic = extractTopic(prompt);
    let output  = texts[idx].replaceAll('{topic}', topic);

    /* Add a tone header line so the tone selection is visibly reflected */
    const toneLabels = {
      professional: '📌 Tone: Professional',
      friendly:     '😄 Tone: Friendly',
      creative:     '🎨 Tone: Creative',
      formal:       '🎩 Tone: Formal',
      casual:       '☕ Tone: Casual'
    };
    output = `[${toneLabels[selectedTone] || 'Tone: Professional'}]\n\n${output}`;

    currentOutput = output;
    loadingBox.classList.add('hidden');

    /* Render into output area */
    outputArea.innerHTML = `
      <div style="margin-bottom:14px;display:flex;gap:8px;flex-wrap:wrap">
        <span class="badge badge-info">${sampleSet.icon} ${sampleSet.label}</span>
        <span class="badge badge-demo">Simulated Output</span>
      </div>
      <div style="white-space:pre-wrap;line-height:1.8;font-size:.91rem">${escapeHtml(output)}</div>`;
    outputArea.classList.remove('hidden');
    outputActions.classList.remove('hidden');
  }, 1500);
}

/* Pull a short topic phrase from the user's prompt text */
function extractTopic(prompt) {
  return prompt
    .replace(/^(write|create|generate|make|draft|give me)\s+(me\s+)?(a|an|the)?\s*/i, '')
    .replace(/\b(caption|post|article|blog|email|description|content|text|copy)\b\s*(about|for|on|regarding)?\s*/i, '')
    .trim() || prompt;
}

generateBtn.addEventListener('click', runGeneration);
regenBtn.addEventListener('click', runGeneration);

copyGenBtn.addEventListener('click', () => copyText(currentOutput));

clearGenBtn.addEventListener('click', () => {
  promptInput.value = '';
  currentOutput = '';
  outputArea.innerHTML = `
    <div class="output-placeholder">
      <div class="placeholder-icon">📄</div>
      <p>Your generated content will appear here.</p>
    </div>`;
  outputArea.classList.remove('hidden');
  outputActions.classList.add('hidden');
  showToast('Cleared ✓');
});

/* Ctrl+Enter / Cmd+Enter triggers generation from the textarea */
promptInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) runGeneration();
});

/* ─────────────────────────────────────────────────────
   7. SENTIMENT ANALYSIS
   ───────────────────────────────────────────────────── */

const sentimentInput     = document.getElementById('sentimentInput');
const analyzeBtn         = document.getElementById('analyzeBtn');
const clearSentBtn       = document.getElementById('clearSentBtn');
const sentimentResult    = document.getElementById('sentimentResult');
const sentimentChartCard = document.getElementById('sentimentChartCard');
const samplesWrap        = document.getElementById('sentimentSamples');

let sentimentBreakdownChart = null;

/* Render sample chips */
samplesWrap.innerHTML = APP_DATA.SENTIMENT_SAMPLES.map(s =>
  `<button class="chip" data-sid="${s.id}">${s.chip}</button>`
).join('');

samplesWrap.addEventListener('click', e => {
  const chip   = e.target.closest('[data-sid]');
  if (!chip) return;
  const sample = APP_DATA.SENTIMENT_SAMPLES.find(s => s.id === chip.dataset.sid);
  sentimentInput.value = sample.text;
  showToast('Sample loaded — click Analyze Sentiment');
});

/* Core analysis function */
function runAnalysis() {
  const text = sentimentInput.value.trim();
  if (!text) {
    showToast('⚠️ Please enter some text first.');
    sentimentInput.focus();
    return;
  }

  /* Show loader */
  sentimentResult.classList.remove('empty');
  sentimentResult.innerHTML = `
    <div class="loading-box">
      <div class="ai-loader"><span></span><span></span><span></span></div>
      <p class="loading-text">Analyzing sentiment…</p>
    </div>`;

  setTimeout(() => {
    const result = classifySentiment(text);
    renderSentimentResult(result);
  }, 1300);
}

/* Match against predefined samples first, then fall back to keyword rules */
function classifySentiment(text) {
  const lower = text.toLowerCase().trim();

  /* 1. Exact match against predefined samples */
  const exact = APP_DATA.SENTIMENT_SAMPLES.find(s => s.text.toLowerCase().trim() === lower);
  if (exact) return exact.result;

  /* 2. Keyword-based rule engine (simulated) */
  const POS = ['love','amazing','excellent','great','brilliant','happy','wonderful',
               'best','recommend','fantastic','good','friendly','delightful','perfect',
               'enjoy','awesome','superb','outstanding','beautiful','impressive','glad'];
  const NEG = ['terrible','awful','bad','worst','broke','useless','waste','disappointing',
               'frustrating','angry','sad','poor','hate','horrible','annoying','slow',
               'broken','loud','fail','failed','problem','error','ugly','painful','rude'];

  let pos = 0, neg = 0;
  const posFound = [], negFound = [];
  POS.forEach(w => { if (lower.includes(w)) { pos++; posFound.push(w); } });
  NEG.forEach(w => { if (lower.includes(w)) { neg++; negFound.push(w); } });

  let sentiment, confidence, emoji, subtext;

  if (pos > neg && pos > 0) {
    sentiment  = 'positive';
    confidence = Math.min(55 + pos * 7, 95);
    emoji      = '😊';
    subtext    = `Positive keywords detected (${posFound.length} match${posFound.length > 1 ? 'es' : ''}).`;
  } else if (neg > pos && neg > 0) {
    sentiment  = 'negative';
    confidence = Math.min(55 + neg * 7, 95);
    emoji      = '😞';
    subtext    = `Negative keywords detected (${negFound.length} match${negFound.length > 1 ? 'es' : ''}).`;
  } else if (pos === neg && pos > 0) {
    sentiment  = 'neutral';
    confidence = 58;
    emoji      = '🤔';
    subtext    = 'Mixed signals — roughly equal positive and negative markers.';
  } else {
    sentiment  = 'neutral';
    confidence = 78;
    emoji      = '😐';
    subtext    = 'No strong emotional keywords detected — text appears informational.';
  }

  /* Build breakdown percentages */
  const total  = pos + neg || 1;
  const posPct = Math.round((pos / total) * 100);
  const negPct = Math.round((neg / total) * 100);
  const neuPct = Math.max(0, 100 - posPct - negPct);

  return {
    sentiment, confidence, emoji, subtext,
    positiveKeywords: posFound.slice(0, 8),
    negativeKeywords: negFound.slice(0, 8),
    breakdown: { positive: posPct, neutral: neuPct, negative: negPct }
  };
}

function renderSentimentResult(r) {
  /* Colour based on sentiment */
  const colors = { positive: '#10b981', negative: '#f43f5e', neutral: '#6366f1' };
  const color  = colors[r.sentiment] || '#6366f1';

  sentimentResult.innerHTML = `
    <div class="sentiment-display">

      <!-- Label + emoji -->
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:3.2rem;margin-bottom:6px">${r.emoji}</div>
        <div class="sent-label ${r.sentiment}" style="font-size:1.6rem;font-weight:800;color:${color};text-transform:uppercase">${r.sentiment}</div>
        <div class="sent-subtext" style="margin-top:6px;color:#64748b;font-size:.85rem">${escapeHtml(r.subtext)}</div>
      </div>

      <!-- Confidence bar -->
      <div>
        <div style="display:flex;justify-content:space-between;font-size:.82rem;font-weight:600;color:#64748b;margin-bottom:7px">
          <span>Confidence Score</span>
          <span style="color:${color}">${r.confidence}%</span>
        </div>
        <div class="conf-bar-wrap">
          <div class="conf-bar ${r.sentiment}" style="width:0%" id="confBarFill"></div>
        </div>
        <p style="font-size:.72rem;color:#94a3b8;margin-top:5px">
          ⚠ Rule-based demo score — not an ML model output.
        </p>
      </div>

      <!-- Keyword chips -->
      ${r.positiveKeywords.length ? `
      <div>
        <p style="font-size:.8rem;font-weight:700;color:#10b981;margin-bottom:5px">✅ Positive indicators</p>
        <div class="keyword-row">${r.positiveKeywords.map(k => `<span class="kw kw-pos">${k}</span>`).join('')}</div>
      </div>` : ''}

      ${r.negativeKeywords.length ? `
      <div>
        <p style="font-size:.8rem;font-weight:700;color:#f43f5e;margin-bottom:5px">❌ Negative indicators</p>
        <div class="keyword-row">${r.negativeKeywords.map(k => `<span class="kw kw-neg">${k}</span>`).join('')}</div>
      </div>` : ''}

    </div>`;

  /* Animate confidence bar fill */
  requestAnimationFrame(() => {
    setTimeout(() => {
      const bar = document.getElementById('confBarFill');
      if (bar) bar.style.width = `${r.confidence}%`;
    }, 100);
  });

  /* Show breakdown chart */
  sentimentChartCard.classList.remove('hidden');
  updateSentimentBreakdownChart(r.breakdown);
}

function updateSentimentBreakdownChart(bd) {
  const ctx = document.getElementById('chartSentimentBreakdown').getContext('2d');
  if (sentimentBreakdownChart) sentimentBreakdownChart.destroy();

  sentimentBreakdownChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{
        data: [bd.positive, bd.neutral, bd.negative],
        backgroundColor: ['#10b981','#6366f1','#f43f5e'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '58%',
      plugins: { legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 12 } } } }
    }
  });
}

analyzeBtn.addEventListener('click', runAnalysis);

clearSentBtn.addEventListener('click', () => {
  sentimentInput.value = '';
  sentimentResult.classList.add('empty');
  sentimentResult.innerHTML = `
    <div class="output-placeholder">
      <div class="placeholder-icon">🎭</div>
      <p>Sentiment results will appear here.</p>
    </div>`;
  sentimentChartCard.classList.add('hidden');
  showToast('Cleared ✓');
});

/* ─────────────────────────────────────────────────────
   8. PROMPT ENGINEERING LAB
   ───────────────────────────────────────────────────── */

const techTabs        = document.querySelectorAll('.tech-tab');
const explanationEl   = document.getElementById('techniqueExplanation');
const exampleEl       = document.getElementById('techniqueExample');
const sampleSelect    = document.getElementById('samplePromptSelect');
const improveBtn      = document.getElementById('improveBtn');
const copyImprovedBtn = document.getElementById('copyImprovedBtn');
const originalBox     = document.getElementById('originalPromptBox');
const improvedBox     = document.getElementById('improvedPromptBox');

let currentTechnique     = 'zero-shot';
let currentImprovedText  = '';

/* Populate the sample-prompt dropdown */
sampleSelect.innerHTML = APP_DATA.SAMPLE_PROMPTS.map((p, i) =>
  `<option value="${i}">${escapeHtml(p.label)}</option>`
).join('');

/* Tab click */
techTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    techTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTechnique = tab.dataset.technique;
    renderTechnique(currentTechnique);
  });
});

function renderTechnique(key) {
  const tech = APP_DATA.PROMPT_TECHNIQUES[key];
  if (!tech) return;

  explanationEl.innerHTML = `
    <div class="technique-info">
      <h4>${escapeHtml(tech.title)}</h4>
      ${tech.explanation}
      <p style="margin-top:12px"><span class="badge badge-info">${escapeHtml(tech.tagline)}</span></p>
    </div>`;

  exampleEl.innerHTML = `
    <div class="technique-info">
      <h4>Built-in Before / After</h4>
      <p class="compare-title before" style="margin-top:10px">❌ Basic Prompt</p>
      <div class="compare-box">${escapeHtml(tech.example.before)}</div>
      <p class="compare-title after" style="margin-top:14px">✅ Improved Prompt</p>
      <div class="compare-box">${escapeHtml(tech.example.after)}</div>
    </div>`;
}

/* Initial render on page load */
renderTechnique('zero-shot');

/* Improve Prompt button */
improveBtn.addEventListener('click', () => {
  const idx    = parseInt(sampleSelect.value, 10);
  const chosen = APP_DATA.SAMPLE_PROMPTS[idx];

  /* Find matching improved prompt; fall back to index-based */
  const match = APP_DATA.IMPROVED_PROMPTS.find(p =>
    p.original.toLowerCase() === chosen.value.toLowerCase()
  ) || APP_DATA.IMPROVED_PROMPTS[idx % APP_DATA.IMPROVED_PROMPTS.length];

  originalBox.textContent = chosen.value;
  improvedBox.textContent = match.improved;
  currentImprovedText     = match.improved;

  const tech = APP_DATA.PROMPT_TECHNIQUES[currentTechnique];
  showToast(`✨ Improved using ${tech.title}`);
});

copyImprovedBtn.addEventListener('click', () =>
  copyText(currentImprovedText, 'Improved prompt copied!')
);

/* ─────────────────────────────────────────────────────
   9. ANALYTICS CHARTS  (lazy — initialized on first visit)
   ───────────────────────────────────────────────────── */

function initAnalyticsCharts() {
  const D    = APP_DATA.CHART_DATA;
  const font = { family: 'Plus Jakarta Sans', size: 12 };
  const base = { responsive: true, maintainAspectRatio: false };

  /* Horizontal bar — content by category */
  new Chart(document.getElementById('chartCategoryBar'), {
    type: 'bar',
    data: {
      labels: D.categoryCounts.labels,
      datasets: [{
        label: 'Content Generated',
        data:   D.categoryCounts.values,
        backgroundColor: ['#6366f1','#8b5cf6','#06b6d4','#f59e0b','#10b981','#f43f5e'],
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      ...base,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font, color: '#64748b' } },
        y: { grid: { display: false }, ticks: { font, color: '#64748b' } }
      }
    }
  });

  /* Pie — sentiment distribution */
  new Chart(document.getElementById('chartSentimentPie'), {
    type: 'pie',
    data: {
      labels: D.sentimentDistribution.labels,
      datasets: [{
        data: D.sentimentDistribution.values,
        backgroundColor: ['#10b981','#6366f1','#f43f5e'],
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 8
      }]
    },
    options: {
      ...base,
      plugins: { legend: { position: 'bottom', labels: { font, padding: 16 } } }
    }
  });

  /* Line — weekly activity */
  new Chart(document.getElementById('chartWeeklyLine'), {
    type: 'line',
    data: {
      labels: D.weeklyActivity.labels,
      datasets: [{
        label: 'Activity',
        data:   D.weeklyActivity.values,
        borderColor:     '#8b5cf6',
        backgroundColor: 'rgba(139,92,246,.12)',
        fill: true,
        tension: .42,
        pointBackgroundColor: '#8b5cf6',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      ...base,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font, color: '#64748b' } },
        x: { grid: { display: false },                      ticks: { font, color: '#64748b' } }
      }
    }
  });

  /* Radar — prompt technique usage */
  new Chart(document.getElementById('chartTechniqueRadar'), {
    type: 'radar',
    data: {
      labels: D.techniqueUsage.labels,
      datasets: [{
        label: 'Times Used',
        data:   D.techniqueUsage.values,
        borderColor:     '#06b6d4',
        backgroundColor: 'rgba(6,182,212,.18)',
        pointBackgroundColor: '#06b6d4',
        pointHoverRadius: 6
      }]
    },
    options: {
      ...base,
      plugins: { legend: { display: false } },
      scales: { r: { ticks: { font, color: '#64748b', backdropColor: 'transparent' },
                     grid: { color: '#e2e8f0' }, pointLabels: { font } } }
    }
  });
}

/* ─────────────────────────────────────────────────────
   10. CONTENT HISTORY
   ───────────────────────────────────────────────────── */

const historyList   = document.getElementById('historyList');
const historySearch = document.getElementById('historySearch');
const modal         = document.getElementById('historyModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle    = document.getElementById('modalTitle');
const modalMeta     = document.getElementById('modalMeta');
const modalBody     = document.getElementById('modalBody');
const copyHistoryBtn = document.getElementById('copyHistoryBtn');

let activeHistoryRecord = null;

/* Category background colours */
const CAT_BG = {
  'Social Media': '#e0f2fe',
  'Blog':         '#dcfce7',
  'Marketing':    '#fef9c3',
  'Email':        '#fee2e2',
  'Product':      '#f3e8ff',
  'Educational':  '#cffafe'
};

function renderHistory(filter = '') {
  const q  = filter.toLowerCase();
  const records = APP_DATA.HISTORY_RECORDS.filter(r =>
    r.prompt.toLowerCase().includes(q)   ||
    r.category.toLowerCase().includes(q) ||
    r.tone.toLowerCase().includes(q)     ||
    r.content.toLowerCase().includes(q)
  );

  if (!records.length) {
    historyList.innerHTML = `
      <div class="card" style="text-align:center;padding:40px;color:var(--txt-muted)">
        <div style="font-size:2rem;margin-bottom:10px">🔎</div>
        No records match "<strong>${escapeHtml(filter)}</strong>".
      </div>`;
    return;
  }

  historyList.innerHTML = records.map(r => {
    const sentBadge = r.sentiment === 'positive' ? 'badge-pos'
                    : r.sentiment === 'negative' ? 'badge-neg' : 'badge-neu';
    return `
    <div class="history-card" data-record="${r.id}">
      <div class="history-icon" style="background:${CAT_BG[r.category] || '#e2e8f0'}">${r.icon}</div>
      <div class="history-info">
        <div class="history-prompt">${escapeHtml(r.prompt)}</div>
        <div class="history-excerpt">${escapeHtml(r.content.substring(0, 150))}…</div>
        <div class="history-meta">
          <span class="badge badge-info">${r.icon} ${escapeHtml(r.category)}</span>
          <span class="badge badge-neu">Tone: ${escapeHtml(r.tone)}</span>
          <span class="badge ${sentBadge}">${r.sentiment}</span>
          <span style="font-size:.75rem;color:#94a3b8">${r.date}</span>
        </div>
      </div>
      <div class="history-actions">
        <button class="btn btn-secondary btn-sm hist-view" data-id="${r.id}">👁 View</button>
        <button class="btn btn-ghost    btn-sm hist-copy" data-id="${r.id}">📋 Copy</button>
      </div>
    </div>`}).join('');

  /* Bind View buttons */
  historyList.querySelectorAll('.hist-view').forEach(btn =>
    btn.addEventListener('click', () => openHistoryModal(Number(btn.dataset.id)))
  );
  /* Bind Copy buttons */
  historyList.querySelectorAll('.hist-copy').forEach(btn =>
    btn.addEventListener('click', () => {
      const rec = APP_DATA.HISTORY_RECORDS.find(r => r.id === Number(btn.dataset.id));
      if (rec) copyText(rec.content);
    })
  );
}

function openHistoryModal(id) {
  const rec = APP_DATA.HISTORY_RECORDS.find(r => r.id === id);
  if (!rec) return;
  activeHistoryRecord = rec;

  const sentBadge = rec.sentiment === 'positive' ? 'badge-pos'
                  : rec.sentiment === 'negative' ? 'badge-neg' : 'badge-neu';

  modalTitle.textContent = rec.prompt;
  modalMeta.innerHTML = `
    <span class="badge badge-info">${rec.icon} ${escapeHtml(rec.category)}</span>
    <span class="badge badge-neu">Tone: ${escapeHtml(rec.tone)}</span>
    <span class="badge ${sentBadge}">${rec.sentiment}</span>
    <span class="badge badge-demo">${rec.date}</span>`;
  modalBody.textContent = rec.content;

  modal.classList.remove('hidden');
}

function closeModal() { modal.classList.add('hidden'); }

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

copyHistoryBtn.addEventListener('click', () => {
  if (activeHistoryRecord) copyText(activeHistoryRecord.content, 'Content copied!');
});

historySearch.addEventListener('input', e => renderHistory(e.target.value));

/* Initial render */
renderHistory();

/* ─────────────────────────────────────────────────────
   11. CONFIRM LOAD
   ───────────────────────────────────────────────────── */
console.log(
  '%c✅ NeuraWrite loaded — static demo ready.',
  'color:#10b981;font-weight:800;font-size:13px'
);
console.log(
  'All outputs are predefined sample data. No AI model, API, or ML is running.'
);
