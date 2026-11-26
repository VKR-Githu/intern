# NeuraWrite — AI-Powered Content Generation Platform

> **B.Tech Final-Year Capstone Project**  
> Static interactive demo demonstrating Prompt Engineering and Generative AI workflows.

---

## 🚀 How to Run

**No installation, no server, no API keys required.**

1. Download or extract the project folder.
2. Open **`index.html`** in any modern web browser (Chrome, Edge, Firefox).
3. That's it — the entire platform runs locally.

> ⚠️ If fonts don't load offline, the app still works — it falls back to system fonts.

---

## 📁 Project Structure

```
neurawrite/
├── index.html          ← Single HTML file (all 7 pages)
├── css/
│   └── style.css       ← Complete stylesheet (layout, cards, charts, responsive)
├── js/
│   ├── data.js         ← All predefined sample outputs, datasets & chart data
│   └── app.js          ← All interaction logic (navigation, generation, analysis, charts)
└── README.md
```

---

## 🧩 Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Dashboard** | Animated stat counters, bar chart, doughnut chart, recent activity feed |
| 2 | **Content Generation** | Prompt input → category & tone selection → simulated output with loading animation |
| 3 | **Sentiment Analysis** | Text input → keyword-rule classification → confidence bar + breakdown chart |
| 4 | **Prompt Engineering** | 4 techniques (Zero-Shot, Few-Shot, Role-Based, Chain-of-Thought) with before/after comparison |
| 5 | **Data Visualization** | Horizontal bar, pie, line, and radar charts from predefined datasets |
| 6 | **Content History** | 6 sample records with search, view modal, and copy |
| 7 | **About Project** | Objective, tech stack, workflow, disclaimer |

---

## 🛠️ Technologies

- **HTML5** — Semantic structure, single-page app layout
- **CSS3** — Custom properties, CSS Grid, Flexbox, keyframe animations, responsive design
- **JavaScript (ES6+)** — DOM manipulation, SPA navigation, simulated logic
- **Chart.js 4.4** — Bar, Pie, Doughnut, Line, Radar charts (CDN)

---

## ⚠️ Honesty Disclaimer

All AI outputs, sentiment scores, and analytics figures are **predefined sample data** simulated with JavaScript.  
No AI model, external API, or machine learning algorithm is running.  
This is clearly labeled in the UI for academic integrity.

---

## 🎓 Capstone Context

This project was built as a capstone demonstration for a B.Tech programme, showcasing understanding of:
- Prompt engineering techniques (Zero-Shot, Few-Shot, Role-Based, Chain-of-Thought)
- Content generation workflows
- Sentiment analysis pipelines
- AI product dashboard design
- Responsive frontend development

---

## 💡 Presentation Tips

1. Open `index.html` in Chrome (best rendering).
2. Walk through **Dashboard → Generate → Sentiment → Prompt Lab → Analytics → History**.
3. On Generate: type any prompt, pick a category and tone, click Generate.
4. On Sentiment: use the sample chips or type your own text.
5. On Prompt Lab: switch between technique tabs, pick a sample from the dropdown, click Improve.
6. All Copy buttons work — you can demo them live.
