/* =====================================================
   DATA.JS — Predefined sample datasets & responses
   All AI outputs and analytics here are SAMPLE DATA.
   No real AI, no API calls, no machine learning.
   ===================================================== */

/* ---------- Content generation samples ---------- */
/* Keyed by category; each entry has a generic template
   built around the user's prompt topic. */

const SAMPLE_OUTPUTS = {
  social: {
    icon: "📱",
    label: "Social Media Caption",
    texts: [
      `☕ Big news, {topic} just got a whole lot better!\n\nWe poured our heart into this — and we think you'll taste the difference. ✨\n\nCome say hi, bring a friend, and make our day. 📍\n\n#MustTry #NewOpening #SupportLocal`,
      `🚨 Drop everything — {topic} is here!\n\n✅ Amazing vibes\n✅ Something for everyone\n✅ You'll leave happier than you arrived\n\nTag someone who needs to see this 👇`,
      `POV: You just discovered {topic} and now it's all you can talk about. 🤩\n\nTrust us, this is your sign to check it out TODAY.\n\n💬 Comment "YES" if you're in!`
    ]
  },

  blog: {
    icon: "📝",
    label: "Blog Article",
    texts: [
      `# {topic}: A Complete Guide\n\n## Introduction\n{topic} has grown from a niche interest into something everyone is talking about. In this article, we break down what it is, why it matters, and how you can get started today.\n\n## Why {topic} Matters\nThe world is changing fast, and {topic} sits right at the center of that change. Whether you're a student, a professional, or just curious, understanding {topic} gives you a genuine edge.\n\n## Key Takeaways\n- Start small and build momentum\n- Focus on fundamentals before advanced ideas\n- Consistency beats intensity every time\n\n## Conclusion\n{topic} isn't just a trend — it's a skill. And like any skill, the best time to start was yesterday. The second best time is now.`,
      `# 5 Things Nobody Tells You About {topic}\n\nEveryone talks about the basics of {topic}, but the real insights rarely make it into the headlines. Here are five things we wish someone had told us sooner.\n\n## 1. It's simpler than it looks\nMost guides overcomplicate {topic}. Strip it down to its core and it's surprisingly intuitive.\n\n## 2. Small habits compound\nFifteen minutes a day on {topic} beats a heroic weekend once a month.\n\n## 3. Community accelerates everything\nFind your people. Learning {topic} alongside others is 10x more effective.\n\n## 4. Mistakes are data\nEvery error teaches you something a tutorial never could.\n\n## 5. It opens doors\nMaster {topic} and unexpected opportunities start finding you.\n\n## Wrapping Up\n{topic} rewards the curious. Be curious.`
    ]
  },

  marketing: {
    icon: "📣",
    label: "Marketing Content",
    texts: [
      `🔥 LIMITED TIME: {topic}\n\nFor the next 72 hours, experience {topic} like never before.\n\n✅ Premium quality, unbeatable value\n✅ Loved by 10,000+ happy customers\n✅ Risk-free — 100% satisfaction guarantee\n\n⏰ Don't wait. Offers like this don't knock twice.\n\n👉 [Claim Yours Now]`,
      `Meet {topic} — the upgrade you didn't know you needed. 💡\n\nWhile everyone else settles for average, you'll be wondering why you waited so long.\n\n🏆 Award-worthy quality\n💰 Honest, transparent pricing\n🔒 Zero-risk trial\n\nJoin thousands who already made the switch. Your future self says thanks.\n\n🛒 Shop {topic} today →`
    ]
  },

  email: {
    icon: "✉️",
    label: "Email",
    texts: [
      `Subject: Exciting update about {topic} 🎉\n\nHi [First Name],\n\nWe've been working on something special, and we can't wait to share it with you: {topic} is finally here.\n\nHere's what that means for you:\n\n• A smoother, faster experience\n• New features you've been asking for\n• The same great quality you expect\n\nWe'd love to hear what you think — just hit reply.\n\nWarm regards,\nThe Team\n\nP.S. Want the full story? Click here to read more about {topic}.`,
      `Subject: Quick question about {topic}\n\nHello [Name],\n\nI hope this email finds you well. I wanted to reach out regarding {topic} and share a few highlights that may be relevant to you.\n\nKey points:\n\n1. {topic} has shown strong early results\n2. Your feedback directly shaped the latest improvements\n3. There's more coming next quarter\n\nWould you be open to a brief call this week to discuss? I'm happy to work around your schedule.\n\nBest regards,\n[Your Name]\n[Title] | [Company]`
    ]
  },

  product: {
    icon: "🛍️",
    label: "Product Description",
    texts: [
      `## {topic} — Built for Real Life\n\nMeet {topic}: thoughtfully designed, rigorously tested, and made to last. Whether you're a beginner or a seasoned pro, you'll feel the difference from day one.\n\n**Why customers love it:**\n- ⭐ Premium materials that stand up to daily use\n- ⭐ Intuitive design — zero learning curve\n- ⭐ Backed by our 12-month guarantee\n\n**Specifications:**\n- Material: High-grade, eco-friendly\n- Compatibility: Universal\n- Care: Wipe clean, low maintenance\n\nThousands of five-star reviews can't be wrong. Add {topic} to your cart today and see why it's quickly becoming a customer favorite.`,
      `### {topic}\n\n**Simple. Reliable. Yours.**\n\nWe designed {topic} to solve one problem brilliantly — and then we made it beautiful too. No clutter, no gimmicks. Just a product that does exactly what it promises, every single time.\n\n✔ Precision-engineered for consistent performance\n✔ Compact, travel-friendly footprint\n✔ Available in four finishes\n\n*Join over 10,000 satisfied customers.*\n\n**[Add to Cart]** | **[Read Reviews]**`
    ]
  },

  education: {
    icon: "🎓",
    label: "Educational Content",
    texts: [
      `# Understanding {topic}: A Beginner's Lesson\n\n## Learning Objectives\nBy the end of this lesson, you will be able to:\n1. Define {topic} in your own words\n2. Explain why {topic} is important\n3. Apply one practical example of {topic}\n\n## What is {topic}?\nAt its core, {topic} refers to [a concept/field/process] that influences how we [do something]. Think of it like a recipe: individual ingredients combine to create something bigger than the sum of its parts.\n\n## Why It Matters\n{topic} appears everywhere in daily life — from the apps on your phone to the systems that power entire industries. Understanding it helps you make smarter decisions and spot opportunities others miss.\n\n## Key Vocabulary\n- **Concept A**: The basic building block of {topic}\n- **Concept B**: How {topic} interacts with its environment\n- **Concept C**: The practical application of {topic}\n\n## Quick Check ✏️\nQ: In one sentence, how would you explain {topic} to a friend?\n\n## Summary\n{topic} is a foundational idea with far-reaching impact. Master the basics, stay curious, and keep practicing.\n\n*Next lesson: Advanced applications of {topic}.*`
    ]
  }
};

/* ---------- Sentiment sample texts & results ---------- */

const SENTIMENT_SAMPLES = [
  {
    id: "s1",
    chip: "Positive review 😊",
    text: "I absolutely love this product! The quality is amazing, the design is brilliant, and the customer service was excellent. Highly recommend to everyone.",
    result: {
      sentiment: "positive",
      confidence: 94,
      emoji: "😊",
      subtext: "This text is strongly positive — enthusiastic language dominates.",
      positiveKeywords: ["love", "amazing", "brilliant", "excellent", "recommend", "highly"],
      negativeKeywords: [],
      breakdown: { positive: 88, neutral: 10, negative: 2 }
    }
  },
  {
    id: "s2",
    chip: "Negative review 😞",
    text: "Terrible experience. The product broke after two days, support was useless, and the quality is awful. Complete waste of money, very disappointing.",
    result: {
      sentiment: "negative",
      confidence: 91,
      emoji: "😞",
      subtext: "This text is strongly negative — multiple complaints with intensifiers.",
      positiveKeywords: [],
      negativeKeywords: ["terrible", "broke", "useless", "awful", "waste", "disappointing"],
      breakdown: { positive: 3, neutral: 6, negative: 91 }
    }
  },
  {
    id: "s3",
    chip: "Neutral fact 📰",
    text: "The meeting is scheduled for Tuesday at 10 AM in the main conference room. Attendance is expected from all department heads.",
    result: {
      sentiment: "neutral",
      confidence: 88,
      emoji: "😐",
      subtext: "This text is factual and informational — no emotional language detected.",
      positiveKeywords: [],
      negativeKeywords: [],
      breakdown: { positive: 8, neutral: 86, negative: 6 }
    }
  },
  {
    id: "s4",
    chip: "Mixed feedback 🤔",
    text: "The food was great and the staff were friendly, but the wait time was frustrating and the music was too loud. Overall an okay experience.",
    result: {
      sentiment: "neutral",
      confidence: 62,
      emoji: "🤔",
      subtext: "This text contains both positive and negative signals — leaning slightly balanced.",
      positiveKeywords: ["great", "friendly"],
      negativeKeywords: ["frustrating", "too loud"],
      breakdown: { positive: 46, neutral: 24, negative: 30 }
    }
  }
];

/* ---------- Prompt Engineering techniques ---------- */

const PROMPT_TECHNIQUES = {
  "zero-shot": {
    title: "Zero-Shot Prompting",
    tagline: "Ask directly, with no examples.",
    explanation: `<h4>What is Zero-Shot Prompting?</h4>
      <p>Zero-shot prompting means asking the AI to perform a task <strong>without giving it any examples</strong>. The model relies entirely on its pre-trained knowledge to understand and respond to your instruction.</p>
      <ul>
        <li><strong>Best for:</strong> Common, well-understood tasks (summarizing, translating, simple writing)</li>
        <li><strong>Risk:</strong> Ambiguous instructions can produce unpredictable or generic results</li>
        <li><strong>Tip:</strong> Be specific — since there are no examples, the prompt itself carries all the context</li>
      </ul>`,
    example: {
      before: "Write about coffee.",
      after: `Write a 150-word social media caption for a new specialty coffee shop opening in Mumbai. Make it warm, energetic, and end with a call to action. Use 2-3 relevant emojis and the hashtag #MumbaiCoffee.`
    }
  },

  "few-shot": {
    title: "Few-Shot Prompting",
    tagline: "Teach by showing examples.",
    explanation: `<h4>What is Few-Shot Prompting?</h4>
      <p>Few-shot prompting means including <strong>2-3 examples</strong> of input-output pairs inside your prompt. The AI detects the pattern in your examples and applies it to the new input.</p>
      <ul>
        <li><strong>Best for:</strong> Tasks with a specific style, format, or structure to imitate</li>
        <li><strong>Advantage:</strong> Precise control over output format without long explanations</li>
        <li><strong>Tip:</strong> Keep examples consistent — mixed styles confuse the pattern</li>
      </ul>`,
    example: {
      before: "Write product slogans for my brand.",
      after: `Write a product slogan for "eco-friendly water bottle".

Examples of the style I want:
Input: "running shoes" → Output: "Every stride, lighter."
Input: "smart lamp" → Output: "Light that thinks ahead."
Input: "yoga mat" → Output: "Ground yourself anywhere."

Now: Input: "eco-friendly water bottle" → Output:`
    }
  },

  "role-based": {
    title: "Role-Based Prompting",
    tagline: "Assign the AI a persona.",
    explanation: `<h4>What is Role-Based Prompting?</h4>
      <p>Role-based prompting means telling the AI <strong>who to be</strong> before giving it a task — "You are an experienced travel writer…" This anchors the response in a specific voice, expertise level, and perspective.</p>
      <ul>
        <li><strong>Best for:</strong> Expert-level or highly specific stylistic output</li>
        <li><strong>Advantage:</strong> Consistent tone and domain-appropriate terminology</li>
        <li><strong>Tip:</strong> Define the role's experience, audience, and goals for richer results</li>
      </ul>`,
    example: {
      before: "Help me write an email to investors.",
      after: `You are a startup founder who has raised 3 successful funding rounds. You write concise, confident emails that respect investors' time.

Write a 120-word email to investors announcing our Q3 milestone (10,000 active users, 40% month-over-month growth). Ask for a follow-up call next week. Tone: confident but not boastful.`
    }
  },

  "chain-of-thought": {
    title: "Chain-of-Thought Prompting",
    tagline: "Let the AI think step by step.",
    explanation: `<h4>What is Chain-of-Thought Prompting?</h4>
      <p>Chain-of-thought (CoT) prompting asks the model to <strong>show its reasoning</strong> before giving a final answer. This dramatically improves accuracy on math, logic, and multi-step problems.</p>
      <ul>
        <li><strong>Best for:</strong> Math word problems, logic puzzles, multi-step decisions</li>
        <li><strong>Why it works:</strong> Breaking a problem into steps reduces errors the model makes when jumping straight to answers</li>
        <li><strong>Tip:</strong> The magic phrase is simply — "Let's think step by step."</li>
      </ul>`,
    example: {
      before: "A train travels 60 km in 45 minutes. What's its speed in km/h?",
      after: `A train travels 60 km in 45 minutes. What is its speed in km/h?

Let's think step by step:
Step 1: Convert 45 minutes to hours → 45/60 = 0.75 hours
Step 2: Apply the speed formula → speed = distance / time
Step 3: Substitute the values → 60 / 0.75
Step 4: Calculate → 80 km/h

Final Answer: 80 km/h`
    }
  }
};

/* ---------- Sample prompts for the improver ---------- */

const SAMPLE_PROMPTS = [
  { label: "Social caption for coffee shop", value: "Write a caption about coffee" },
  { label: "Investor update email", value: "Write an email to investors" },
  { label: "Math problem explanation", value: "Solve this speed problem" },
  { label: "Product description", value: "Describe a water bottle" },
  { label: "Blog article intro", value: "Write a blog about remote work" }
];

/* ---------- Improved prompt templates ---------- */

const IMPROVED_PROMPTS = [
  {
    original: "Write a caption about coffee",
    improved: `Write a 2-3 line Instagram caption for a new specialty coffee shop opening in Bangalore.

Requirements:
- Tone: warm, playful, energetic
- Include 2-3 coffee-themed emojis
- End with a call to action ("Visit us this weekend!")
- Add hashtags: #SpecialtyCoffee #BangaloreCafe`
  },
  {
    original: "Write an email to investors",
    improved: `You are a confident startup founder. Write a 120-word email to investors.

Context: We just hit 10,000 active users (40% MoM growth) in Q3.

Requirements:
- Open with the milestone, not pleasantries
- One data-backed sentence on growth
- Close by proposing a 15-minute call next week
- Tone: confident, concise, zero hype`
  },
  {
    original: "Solve this speed problem",
    improved: `A train travels 60 km in 45 minutes. What is its speed in km/h?

Let's think step by step:
1. Convert the time to hours
2. Apply the speed formula (distance ÷ time)
3. Show the calculation
4. State the final answer with units`
  },
  {
    original: "Describe a water bottle",
    improved: `Write a 100-word product description for a 1L insulated stainless-steel water bottle.

Requirements:
- Target audience: gym-goers and hikers
- Highlight 3 features (24h cold retention, leak-proof cap, lightweight build)
- Tone: energetic and benefit-focused
- End with: "Available in 5 colors"`
  },
  {
    original: "Write a blog about remote work",
    improved: `Write a 300-word blog introduction about the rise of remote work in India.

Requirements:
- Hook the reader with a 2025-relevant statistic or trend
- Audience: HR managers considering hybrid policies
- Tone: professional but readable
- Preview 3 subtopics the article will cover
- Do NOT use the phrase "in today's world"`
  }
];

/* ---------- Dashboard activity samples ---------- */

const RECENT_ACTIVITIES = [
  { icon: "📱", bg: "#e0f2fe", title: "Generated social media caption", meta: "Category: Social Media · Tone: Friendly", time: "2 hours ago" },
  { icon: "🎭", bg: "#f3e8ff", title: "Analyzed sentiment — Positive (94%)", meta: "Sample: Product review", time: "5 hours ago" },
  { icon: "🧠", bg: "#fef3c7", title: "Improved prompt using Chain-of-Thought", meta: "Technique: Chain-of-Thought", time: "Yesterday" },
  { icon: "📝", bg: "#dcfce7", title: "Generated blog article", meta: "Category: Blog · Tone: Professional", time: "Yesterday" },
  { icon: "✉️", bg: "#fee2e2", title: "Generated investor email", meta: "Category: Email · Tone: Formal", time: "2 days ago" }
];

/* ---------- Analytics chart datasets (predefined) ---------- */

const CHART_DATA = {
  categoryCounts: {
    labels: ["Social Media", "Blog", "Marketing", "Email", "Product", "Educational"],
    values: [38, 24, 27, 15, 12, 12]
  },
  sentimentDistribution: {
    labels: ["Positive", "Neutral", "Negative"],
    values: [72, 17, 11]
  },
  weeklyActivity: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [12, 19, 15, 25, 22, 8, 6]
  },
  techniqueUsage: {
    labels: ["Zero-Shot", "Few-Shot", "Role-Based", "Chain-of-Thought"],
    values: [14, 9, 11, 7]
  },
  dashboardBar: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [3, 5, 4, 8, 6, 2, 1]
  }
};

/* ---------- History sample records ---------- */

const HISTORY_RECORDS = [
  {
    id: 1,
    icon: "📱",
    category: "Social Media",
    tone: "Friendly",
    date: "2026-11-25",
    prompt: "Instagram caption for a new coffee shop in Bangalore",
    content: "☕ Big news, Bangalore — your new favorite corner is officially open!\n\nWe poured our heart into every cup (and every bean 🫘). Come say hi, bring a friend, and make our day.\n\n📍 [Location] | Open 8 AM – 10 PM\n\n#SpecialtyCoffee #BangaloreCafe #NewOpening #SupportLocal",
    sentiment: "positive"
  },
  {
    id: 2,
    icon: "✉️",
    category: "Email",
    tone: "Formal",
    date: "2026-11-24",
    prompt: "Q3 investor update email announcing user milestone",
    content: "Subject: Q3 Milestone — 10,000 Active Users\n\nDear Investors,\n\nI'm pleased to share that we closed Q3 with 10,000 active users, representing 40% month-over-month growth — our strongest quarter to date.\n\nHighlights:\n- Retention improved to 68% (up from 54%)\n- CAC reduced by 22% following our referral launch\n- Two enterprise pilots signed this month\n\nI'd welcome the chance to walk you through the full metrics. Would a 15-minute call next week suit your schedule?\n\nWith appreciation,\n[Founder Name]\nFounder & CEO",
    sentiment: "positive"
  },
  {
    id: 3,
    icon: "📝",
    category: "Blog",
    tone: "Professional",
    date: "2026-11-22",
    prompt: "Blog intro about the rise of remote work in India",
    content: "# The Remote Work Revolution in India\n\nIn 2025, over 32% of Indian knowledge workers operated remotely at least part of the week — a figure that has tripled since 2020. What began as a pandemic necessity has quietly become a structural shift in how India builds careers and companies.\n\nFor HR managers, the question is no longer \"if\" hybrid policies are coming, but how to design them well.\n\nIn this article, we cover three subtopics:\n1. The productivity data — what remote work actually changed\n2. The talent market — how remote access reshaped hiring pools\n3. The policy gap — what most companies still get wrong",
    sentiment: "neutral"
  },
  {
    id: 4,
    icon: "🛍️",
    category: "Product",
    tone: "Casual",
    date: "2026-11-20",
    prompt: "Description for a 1L insulated steel water bottle",
    content: "## The bottle that keeps up 🧊\n\n24 hours ice-cold. Zero leaks in your bag. Light enough to forget you're carrying it.\n\n- 🧊 24h cold / 12h hot double-wall insulation\n- 🔒 Leak-proof flip cap — gym-bag tested\n- ⚡ 40% lighter than standard steel bottles\n- 🌍 BPA-free, sweat-proof finish\n\nAvailable in 5 colors. Your hydration, upgraded.\n\n**[Add to Cart]**",
    sentiment: "positive"
  },
  {
    id: 5,
    icon: "🎓",
    category: "Educational",
    tone: "Professional",
    date: "2026-11-18",
    prompt: "Beginner lesson plan explaining photosynthesis",
    content: "# Photosynthesis: A Beginner's Lesson\n\n## Learning Objectives\nBy the end of this lesson, students can:\n1. Define photosynthesis in one sentence\n2. Identify the required inputs and outputs\n3. Explain why the process matters for life on Earth\n\n## What is Photosynthesis?\nPhotosynthesis is how plants convert sunlight, water, and carbon dioxide into glucose (food) and oxygen. Think of a leaf as a tiny solar-powered kitchen.\n\n## The Equation\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\n## Quick Check ✏️\nQ: What gas do plants absorb, and what gas do they release?\n\n## Summary\nPhotosynthesis powers nearly all life on Earth by capturing solar energy into chemical form.",
    sentiment: "neutral"
  },
  {
    id: 6,
    icon: "📣",
    category: "Marketing",
    tone: "Creative",
    date: "2026-11-15",
    prompt: "Flash sale promo for an online course platform",
    content: "🚨 72 HOURS. 60% OFF. ZERO REGRETS. 🚨\n\nThe courses you've been bookmarking for \"later\"? Later is NOW.\n\n✅ 200+ courses by industry experts\n✅ Lifetime access — learn at your pace\n✅ 30-day money-back guarantee\n\nOver 50,000 learners upgraded their careers this year. Your turn.\n\n⏰ The timer doesn't care about procrastination.\n\n👉 Claim your discount →",
    sentiment: "positive"
  }
];

/* ---------- Copy helper data for results export ---------- */
window.APP_DATA = {
  SAMPLE_OUTPUTS,
  SENTIMENT_SAMPLES,
  PROMPT_TECHNIQUES,
  SAMPLE_PROMPTS,
  IMPROVED_PROMPTS,
  RECENT_ACTIVITIES,
  CHART_DATA,
  HISTORY_RECORDS
};
