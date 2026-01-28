/* Auto-generated content based on Ngan Kim Huynh's resume PDF. */

const resumeData = {
  person: {
    name: "Ngan Kim Huynh",
    status: "Permanent U.S. resident",
    location: "Ohio, USA",
    email: "hkimngan2001@gmail.com",
    phone: "+1 (216) 268 4027",
    linkedin: "https://linkedin.com/in/ngan-kim-huynh/",
    headline:
      "MBA Marketing student at Cleveland State University with 3+ years of experience in social media content, SEO, and brand storytelling.",
    summary:
      "MBA Marketing student at Cleveland State University with over 3 years of experience in social media content, SEO, and brand storytelling. Increased organic website traffic by 30% in six months and drove up to 60% weekly growth in organic engagement through consistent content strategy and trend-based campaigns.",
    strengths: [
      "Social media strategy",
      "SEO & keyword research",
      "Content planning",
      "Short-form video & design",
      "Performance tracking (reach, traffic, engagement)",
      "Cross-cultural communication",
    ],
    heroMetrics: [
      { label: "Organic traffic growth", value: "+30% (6 months)" },
      { label: "Organic engagement growth", value: "Up to +60% weekly" },
      { label: "Content cadence", value: "4 posts/week + 3 blogs/week" },
    ],
  },
  featuredProjects: [
    {
      tag: "SEO + Content",
      title: "30% Organic Traffic Growth (Jasmine Tours)",
      description:
        "Built a repeatable SEO + content workflow to improve search visibility and consistently publish high-quality travel content.",
      bullets: [
        "Published ~3 SEO blog posts/week and optimized WordPress pages based on keyword research.",
        "Improved organic traffic by 30% within 6 months through on-page optimization and content planning.",
        "Aligned content with audience intent using travel trend research and customer insights.",
      ],
    },
    {
      tag: "Social Media",
      title: "Trend-based Storytelling Campaigns (+60% weekly engagement)",
      description:
        "Developed and executed Instagram/Facebook content plans with consistent cadence and performance optimization.",
      bullets: [
        "Planned and published ~4 posts/week for Instagram and Facebook.",
        "Increased organic engagement by up to 60% weekly via trend-based storytelling and iteration.",
        "Created visuals and short-form videos using Canva and CapCut for international audiences.",
      ],
    },
    {
      tag: "Activation + Brand",
      title: "Campus Activation Event (1,500+ engagements in 3 days)",
      description:
        "Supported branding and promotional campaigns, translating market research into concrete activation tactics.",
      bullets: [
        "Coordinated on-campus activation events at nearby universities.",
        "Generated 1,500+ social media engagements within 3 days.",
        "Contributed to customer satisfaction strategies supporting a 15% increase in brand loyalty.",
      ],
    },
  ],
  experience: [
    {
      title: "Digital Content Specialist in English (Freelance, Part-time | Remote)",
      org: "Jasmine Tours Ha Giang Loop",
      location: "Tuyen Quang, Vietnam",
      dates: "Dec 2021 – Dec 2024",
      bullets: [
        "Developed and executed social media content plans for Instagram and Facebook (4 posts/week), increasing organic engagement by up to 60% weekly through trend-based storytelling and performance optimization.",
        "Produced marketing visuals and short-form video assets using Canva and CapCut for international audience campaigns.",
        "Managed SEO keyword research and WordPress content optimization, publishing 3 SEO blog posts/week and driving a 30% increase in organic website traffic within six months.",
        "Conducted audience and travel trend research; traveled on-site twice per year to collaborate and gather customer insights to improve content accuracy and relevance.",
      ],
    },
    {
      title: "Sales and Marketing Executive",
      org: "Dominique Saint Paul (English-speaking environment)",
      location: "Ho Chi Minh City, Vietnam",
      dates: "Sep 2023 – Dec 2023",
      bullets: [
        "Conducted B2B cold calling and outreach in English (avg. 5 calls/messages per day), generating 1–5 qualified leads/month.",
        "Supported luxury retail sales operations and high-end customer service, contributing to merchandising and promotional planning based on customer feedback and seasonal trends.",
        "Trained 3 probation sales staff and created a Sales Training document adopted as the company’s standard onboarding document.",
        "Tracked performance using Excel and prepared weekly/monthly KPI and in-store traffic reports for leadership.",
        "Coordinated 3 product photoshoots/week and produced/edited 150+ marketing visuals using Canva, Adobe Photoshop, and PhotoRoom for e-commerce and social media.",
      ],
    },
    {
      title: "Marketing Executive",
      org: "Haloca Pharmacy – Clinic & Spa",
      location: "Ho Chi Minh City, Vietnam",
      dates: "Aug 2022 – Oct 2022",
      bullets: [
        "Coordinated branding and promotional campaigns, including on-campus activation events, generating 1,500+ engagements within 3 days and increasing local brand awareness.",
        "Conducted market research to identify customer needs and supported customer satisfaction strategies, contributing to a 15% increase in brand loyalty.",
        "Created Facebook campaign content and event coverage, managed community engagement and policy compliance, contributing to a 10% increase in positive customer reviews.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Business Administration (MBA) — GPA 3.7",
      school: "Cleveland State University (CSU) — Ohio, USA",
      dates: "Jan 2025 – Expected May 2026",
      coursework: [
        "Marketing Strategy",
        "Intro to Business Analytics",
        "Integrative Business Strategy",
        "IT for Competitive Advantage",
      ],
    },
    {
      degree: "BA (Hons) in Business Management with Marketing — GPA 3.6",
      school: "University of the West of England (UWE Bristol), UK (completed in Vietnam)",
      dates: "2022 – 2023",
      coursework: [
        "Business Project",
        "Global Marketing Management",
        "Marketing Service & Customer Service Management",
        "Business Strategy",
      ],
    },
    {
      degree: "Bachelor of Business Administration — GPA 3.2",
      school: "International University — Vietnam National University HCMC (IU-VNU), Vietnam",
      dates: "2019 – 2022",
      coursework: [
        "E-Commerce",
        "Critical Thinking",
        "Business Communication",
        "Principles of Marketing",
        "Project Management",
      ],
    },
  ],
  skills: {
    technical: ["Canva", "CapCut", "AI Tools (ChatGPT, Gemini)", "Microsoft Office (Word, Excel, PowerPoint, Outlook)"],
    marketing: [
      "SEO (keyword research)",
      "Social Media Strategy",
      "Content planning",
      "Campaign support",
      "Market research",
      "Basic performance tracking (engagement, reach, traffic)",
    ],
    soft: ["Team collaboration", "Event coordination", "Cross-cultural communication", "Client communication"],
  },
  certificates: [
    "Duolingo English Test 120 (Fluent in English; Vietnamese native speaker)",
    "Social Media and Social Content Strategy — Digital Marketing Institute",
  ],
};

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el;
}

function setText(id, text) {
  $(id).textContent = text;
}

function setLink(id, href, label) {
  const a = $(id);
  a.setAttribute("href", href);
  a.textContent = label ?? href;
}

function renderHero() {
  setText("brandName", resumeData.person.name);
  setText("footerName", resumeData.person.name);
  setText("heroTitle", resumeData.person.name);
  setText("heroSummary", resumeData.person.summary);
  setText("heroEyebrow", "MBA Marketing • Content • SEO");

  setText("metaLocation", resumeData.person.location);
  setText("metaStatus", resumeData.person.status);
  setLink("metaLinkedIn", resumeData.person.linkedin, "View profile");

  const stats = $("heroStats");
  stats.replaceChildren();
  for (const s of resumeData.person.heroMetrics) {
    const dl = document.createElement("div");
    dl.className = "stat";

    const dt = document.createElement("dt");
    dt.textContent = s.label;
    const dd = document.createElement("dd");
    dd.textContent = s.value;

    dl.append(dt, dd);
    stats.appendChild(dl);
  }
}

function renderAbout() {
  setText("aboutText", resumeData.person.headline);

  const chips = $("aboutChips");
  chips.replaceChildren();
  for (const c of resumeData.person.strengths) {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = c;
    chips.appendChild(span);
  }
}

function renderProjects() {
  const grid = $("projectsGrid");
  grid.replaceChildren();

  for (const p of resumeData.featuredProjects) {
    const card = document.createElement("article");
    card.className = "card project";

    const pill = document.createElement("div");
    pill.className = "pill";
    pill.textContent = p.tag;

    const h3 = document.createElement("h3");
    h3.textContent = p.title;

    const desc = document.createElement("p");
    desc.textContent = p.description;

    const ul = document.createElement("ul");
    for (const b of p.bullets) {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    }

    card.append(pill, h3, desc, ul);
    grid.appendChild(card);
  }
}

function renderExperience() {
  const wrap = $("experienceStack");
  wrap.replaceChildren();

  for (const r of resumeData.experience) {
    const card = document.createElement("article");
    card.className = "card";

    const head = document.createElement("div");
    head.className = "role-head";

    const title = document.createElement("h3");
    title.className = "role-title";
    title.textContent = r.title;

    const sub = document.createElement("p");
    sub.className = "role-sub";
    sub.textContent = `${r.org} • ${r.location} • ${r.dates}`;

    head.append(title, sub);

    const ul = document.createElement("ul");
    ul.className = "list";
    for (const b of r.bullets) {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    }

    card.append(head, ul);
    wrap.appendChild(card);
  }
}

function renderEducation() {
  const wrap = $("educationStack");
  wrap.replaceChildren();

  for (const e of resumeData.education) {
    const card = document.createElement("article");
    card.className = "card";

    const head = document.createElement("div");
    head.className = "role-head";

    const title = document.createElement("h3");
    title.className = "role-title";
    title.textContent = e.degree;

    const sub = document.createElement("p");
    sub.className = "role-sub";
    sub.textContent = `${e.school} • ${e.dates}`;

    head.append(title, sub);

    const ul = document.createElement("ul");
    ul.className = "list";
    for (const c of e.coursework) {
      const li = document.createElement("li");
      li.textContent = c;
      ul.appendChild(li);
    }

    card.append(head, ul);
    wrap.appendChild(card);
  }
}

function renderSkills() {
  const map = [
    ["skillsTechnical", resumeData.skills.technical],
    ["skillsMarketing", resumeData.skills.marketing],
    ["skillsSoft", resumeData.skills.soft],
  ];

  for (const [id, items] of map) {
    const ul = $(id);
    ul.replaceChildren();
    for (const it of items) {
      const li = document.createElement("li");
      li.textContent = it;
      ul.appendChild(li);
    }
  }

  const certs = $("certificatesList");
  certs.replaceChildren();
  for (const c of resumeData.certificates) {
    const li = document.createElement("li");
    li.textContent = c;
    certs.appendChild(li);
  }
}

function renderContact() {
  const email = resumeData.person.email;
  const phone = resumeData.person.phone;
  const linkedin = resumeData.person.linkedin;

  setLink("contactEmail", `mailto:${email}`, email);
  setLink("contactPhone", `tel:${phone.replace(/[^\d+]/g, "")}`, phone);
  setLink("contactLinkedIn", linkedin, "linkedin.com/in/ngan-kim-huynh");
}

function showToast(msg) {
  const el = $("toast");
  el.textContent = msg;
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    el.textContent = "";
  }, 1600);
}

async function copyEmail() {
  const email = resumeData.person.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied.");
  } catch {
    // Fallback: select-based copy
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.setAttribute("readonly", "true");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Email copied.");
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function wireInteractions() {
  $("copyEmailBtn").addEventListener("click", copyEmail);
  $("contactCopyEmailBtn").addEventListener("click", copyEmail);

  const btn = $("toggleThemeBtn");
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    showToast(`Theme: ${next}`);
  });
}

function init() {
  applyTheme(getPreferredTheme());
  renderHero();
  renderAbout();
  renderProjects();
  renderExperience();
  renderEducation();
  renderSkills();
  renderContact();
  wireInteractions();
  setText("year", String(new Date().getFullYear()));
}

document.addEventListener("DOMContentLoaded", init);

