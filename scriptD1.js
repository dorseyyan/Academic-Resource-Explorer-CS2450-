// =====================
// NAV / SIDEBAR
// =====================

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const menuWrap = document.getElementById("menuWrap");
const menuBtn = document.getElementById("menuBtn");

function toggleDropdown(event) {
  event.stopPropagation();
  if (!menuWrap || !menuBtn) return;

  const isOpen = menuWrap.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function closeDropdown() {
  if (!menuWrap || !menuBtn) return;

  menuWrap.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

function toggleSidebar() {
  if (window.innerWidth <= 820 && sidebar && overlay) {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  }
}

function closeSidebar() {
  if (!sidebar || !overlay) return;

  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

if (menuBtn) {
  menuBtn.addEventListener("click", toggleDropdown);
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", toggleSidebar);
}

if (overlay) {
  overlay.addEventListener("click", closeSidebar);
}

document.addEventListener("click", (event) => {
  if (menuWrap && !menuWrap.contains(event.target)) {
    closeDropdown();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeSidebar();
  }
});

// =====================
// CHECKLIST DATA
// =====================

const STORAGE_KEY = "degreeProgress.v1";

const DEFAULT_DATA = {
  major: {
    requiredUnitsTotal: 71,
    electiveUnitsTotal: 21,
    completedRequired: [],
    completedElectives: {},

    requiredCourses: [
      { id: "BIO1150", label: "BIO 1150 - Biology and Society", units: 3, ge: { type: "fixed", reqId: "5B" } },
      { id: "BIO1150L", label: "BIO 1150L - Biology and Society Laboratory", units: 1, ge: { type: "fixed", reqId: "5C" } },
      { id: "CS1300", label: "CS 1300 - Discrete Structures", units: 3 },
      { id: "CS1400", label: "CS 1400 - Intro to Programming and Problem Solving", units: 4 },
      { id: "CS2400", label: "CS 2400 - Data Structures and Advanced Programming", units: 4 },
      { id: "CS2600", label: "CS 2600 - Systems Programming", units: 3 },
      { id: "CS2610", label: "CS 2610 - Intro to Cyber Security and Network Communications", units: 3 },
      { id: "CS2640", label: "CS 2640 - Computer Organization and Assembly Programming", units: 3 },
      { id: "CS3010", label: "CS 3010 - Numerical Methods and Computing", units: 3 },
      { id: "CS3110", label: "CS 3110 - Formal Languages and Automata", units: 3 },
      { id: "CS3310", label: "CS 3310 - Design and Analysis of Algorithms", units: 3 },
      { id: "CS3560", label: "CS 3560 - Object-Oriented Design and Programming", units: 3 },
      { id: "CS3650", label: "CS 3650 - Computer Architecture", units: 4 },
      { id: "CS3750W", label: "CS 3750W - Computers and Society", units: 3, ge: { type: "choice", reqIds: ["4C", "5D"], defaultReqId: "4C" } },
      { id: "CS4080", label: "CS 4080 - Concepts of Programming Languages", units: 3 },
      { id: "CS4310", label: "CS 4310 - Operating Systems", units: 3 },
      { id: "CS4630", label: "CS 4630 - Undergraduate Seminar", units: 1 },
      { id: "CS4800", label: "CS 4800 - Software Engineering", units: 3 },
      { id: "MAT1140", label: "MAT 1140 - Calculus I", units: 4, ge: { type: "fixed", reqId: "2" } },
      { id: "MAT1150", label: "MAT 1150 - Calculus II", units: 4, ge: { type: "fixed", reqId: "2" } },
      { id: "PHY1510", label: "PHY 1510 - Intro to Newtonian Mechanics", units: 3, ge: { type: "fixed", reqId: "5A" } },
      { id: "PHY1510L", label: "PHY 1510L - Newtonian Mechanics Laboratory", units: 1, ge: { type: "fixed", reqId: "5C" } },
      { id: "STA2260", label: "STA 2260 - Probability and Statistics for CS & Engineers", units: 3 },
      { id: "AI_PART_A", label: "American Institutions Part A", units: 3, ge: { type: "fixed", reqId: "4A" } }
    ],

    geChoiceByCourse: {
      CS3750W: "4C"
    },

    electives: {
      preferredMinUnits: 12,
      limited6MaxUnits: 6,
      limited3MaxUnits: 3,

      preferred: [
        { id: "CS3520", label: "CS 3520 - Symbolic Programming", units: 3 },
        { id: "CS3700", label: "CS 3700 - Parallel Processing", units: 3 },
        { id: "CS3800", label: "CS 3800 - Computer Networks", units: 3 },
        { id: "CS4110", label: "CS 4110 - Compilers and Interpreters", units: 3 },
        { id: "CS4200", label: "CS 4200 - Artificial Intelligence", units: 3 },
        { id: "CS4210", label: "CS 4210 - Machine Learning and Its Applications", units: 3 },
        { id: "CS4220", label: "CS 4220 - GPU Computing", units: 3 },
        { id: "CS4230", label: "CS 4230 - Social Computing", units: 3 },
        { id: "CS4250", label: "CS 4250 - Web Search and Recommender Systems", units: 3 },
        { id: "CS4350", label: "CS 4350 - Database Systems", units: 3 },
        { id: "CS4440", label: "CS 4440 - Data Mining", units: 3 },
        { id: "CS4450", label: "CS 4450 - Computer Graphics", units: 3 },
        { id: "CS4500", label: "CS 4500 - Computability", units: 3 },
        { id: "CS4600", label: "CS 4600 - Cryptography & Info Security", units: 3 },
        { id: "CS4650", label: "CS 4650 - Big Data Analytics & Cloud Computing", units: 3 },
        { id: "CS4651", label: "CS 4651 - Cloud Computing Practicum", units: 3 },
        { id: "CS4680", label: "CS 4680 - Prompt Engineering", units: 3 },
        { id: "CS4700", label: "CS 4700 - Game Development", units: 3 },
        { id: "CS4750", label: "CS 4750 - Mobile Application Development", units: 3 },
        { id: "CS4810", label: "CS 4810 - Software Engineering Practice", units: 3 },
        { id: "CS4990", label: "CS 4990 - Special Topics (Upper Division)", unitsRange: [1, 3] }
      ],

      limited6: [
        { id: "CS2250", label: "CS 2250 - Intro to Web Science and Technology", units: 3 },
        { id: "CS2410", label: "CS 2410 - Fundamentals of Data Science", units: 3 },
        { id: "CS2450", label: "CS 2450 - User Interface Design and Programming", units: 3 },
        { id: "CS2520", label: "CS 2520 - Python for Programmers", units: 3 },
        { id: "CS2560", label: "CS 2560 - C++ Programming", units: 3 },
        { id: "CS2990", label: "CS 2990 - Special Topics (Lower Division)", unitsRange: [1, 3] }
      ],

      limited3: [
        { id: "CS2000", label: "CS 2000 - Special Study (Lower Division)", unitsRange: [1, 3] },
        { id: "CS4000", label: "CS 4000 - Special Study (Upper Division)", unitsRange: [1, 3] },
        { id: "CS4410", label: "CS 4410 - Internship in Computer Science", unitsRange: [1, 2] },
        { id: "CS4610", label: "CS 4610 - Senior Project", units: 1 },
        { id: "CS4620", label: "CS 4620 - Senior Project", units: 1 },
        { id: "CS4820", label: "CS 4820 - CS Project Practicum", units: 1 }
      ]
    }
  },

  ge: {
    totalUnits: 43,
    completedManual: [],
    requirements: [
      { id: "1A", label: "Area 1A - English Communication", units: 3 },
      { id: "1B", label: "Area 1B - Critical Thinking", units: 3 },
      { id: "1C", label: "Area 1C - Oral Communication", units: 3 },
      { id: "2", label: "Area 2 - Mathematical Concepts & Quantitative Reasoning", units: 3 },
      { id: "3A", label: "Area 3A - Arts", units: 3 },
      { id: "3B", label: "Area 3B - Humanities", units: 3 },
      { id: "3C", label: "Area 3C - Upper Division Arts or Humanities", units: 3 },
      { id: "4A", label: "Area 4A - Social/Behavioral Sciences", units: 3 },
      { id: "4B", label: "Area 4B - American & California Government", units: 3 },
      { id: "4C", label: "Area 4C - Upper Division Social/Behavioral Sciences", units: 3 },
      { id: "5A", label: "Area 5A - Physical Science", units: 3 },
      { id: "5B", label: "Area 5B - Biological Science", units: 3 },
      { id: "5C", label: "Area 5C - Laboratory", units: 1 },
      { id: "5D", label: "Area 5D - Upper Division Scientific Inquiry / Quant", units: 3 },
      { id: "6", label: "Area 6 - Ethnic Studies", units: 3 }
    ]
  }
};

// =====================
// STORAGE
// =====================

function loadData() {
  let saved = {};

  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    saved = {};
  }

  return {
    ...DEFAULT_DATA,
    ...saved,

    major: {
      ...DEFAULT_DATA.major,
      ...(saved.major || {}),

      requiredCourses: DEFAULT_DATA.major.requiredCourses,
      electives: DEFAULT_DATA.major.electives,

      completedRequired: Array.isArray(saved.major?.completedRequired)
        ? saved.major.completedRequired
        : [],

      completedElectives:
        saved.major?.completedElectives && typeof saved.major.completedElectives === "object"
          ? saved.major.completedElectives
          : {},

      geChoiceByCourse: {
        ...DEFAULT_DATA.major.geChoiceByCourse,
        ...(saved.major?.geChoiceByCourse || {})
      }
    },

    ge: {
      ...DEFAULT_DATA.ge,
      ...(saved.ge || {}),
      requirements: DEFAULT_DATA.ge.requirements,
      completedManual: Array.isArray(saved.ge?.completedManual)
        ? saved.ge.completedManual
        : []
    }
  };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  renderChecklist();
}

// =====================
// HELPERS
// =====================

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setBar(barId, pctId, pct) {
  const bar = document.getElementById(barId);
  if (bar) bar.style.width = `${Math.max(0, Math.min(100, pct))}%`;

  const pctEl = document.getElementById(pctId);
  if (pctEl) pctEl.textContent = `${Math.round(pct)}%`;
}

function getCourseUnits(course, selectedUnits) {
  if (typeof selectedUnits === "number") return selectedUnits;
  if (typeof course.units === "number") return course.units;
  if (Array.isArray(course.unitsRange)) return course.unitsRange[1];
  return 0;
}

function createUnitsSelect(course, completed, onChange) {
  const select = document.createElement("select");
  const [min, max] = course.unitsRange;

  for (let units = min; units <= max; units++) {
    const option = document.createElement("option");
    option.value = units;
    option.textContent = `${units} unit${units === 1 ? "" : "s"}`;

    if (Number(completed[course.id]) === units || (!completed[course.id] && units === max)) {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", () => {
    onChange(Number(select.value));
  });

  return select;
}

// =====================
// PROGRESS
// =====================

function computeMajorProgress(data) {
  const requiredTotal = data.major.requiredUnitsTotal;
  const electiveTotal = data.major.electiveUnitsTotal;
  const total = requiredTotal + electiveTotal;

  const requiredCompleted = data.major.requiredCourses
    .filter((course) => data.major.completedRequired.includes(course.id))
    .reduce((sum, course) => sum + course.units, 0);

  const allElectives = [
    ...data.major.electives.preferred,
    ...data.major.electives.limited6,
    ...data.major.electives.limited3
  ];

  const electiveCompleted = allElectives
    .filter((course) => Object.prototype.hasOwnProperty.call(data.major.completedElectives, course.id))
    .reduce((sum, course) => {
      return sum + getCourseUnits(course, Number(data.major.completedElectives[course.id]));
    }, 0);

  const completed = requiredCompleted + electiveCompleted;

  return {
    completed,
    total,
    pct: total > 0 ? (completed / total) * 100 : 0,
    left: Math.max(0, total - completed)
  };
}

function computeGeProgress(data) {
  const completedReqs = new Set(data.ge.completedManual);

  data.major.requiredCourses.forEach((course) => {
    if (!data.major.completedRequired.includes(course.id)) return;
    if (!course.ge) return;

    if (course.ge.type === "fixed") {
      completedReqs.add(course.ge.reqId);
    }

    if (course.ge.type === "choice") {
      const selected = data.major.geChoiceByCourse[course.id] || course.ge.defaultReqId;
      completedReqs.add(selected);
    }
  });

  const completed = data.ge.requirements
    .filter((req) => completedReqs.has(req.id))
    .reduce((sum, req) => sum + req.units, 0);

  return {
    completed,
    total: data.ge.totalUnits,
    pct: data.ge.totalUnits > 0 ? (completed / data.ge.totalUnits) * 100 : 0,
    left: Math.max(0, data.ge.totalUnits - completed),
    completedReqs
  };
}

// =====================
// RENDER REQUIRED COURSES
// =====================

function renderRequiredCourses(data) {
  const container = document.getElementById("majorRequiredList");
  if (!container) return;

  container.innerHTML = "";

  data.major.requiredCourses.forEach((course) => {
    const row = document.createElement("div");
    row.className = "checkItem";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.major.completedRequired.includes(course.id);

    checkbox.addEventListener("change", () => {
      const set = new Set(data.major.completedRequired);

      if (checkbox.checked) {
        set.add(course.id);
      } else {
        set.delete(course.id);
      }

      data.major.completedRequired = Array.from(set);
      saveData(data);
    });

    const label = document.createElement("label");
    label.textContent = course.label;

    const units = document.createElement("span");
    units.className = "pill";
    units.textContent = `${course.units}u`;

    row.appendChild(checkbox);
    row.appendChild(label);
    row.appendChild(units);

    if (course.ge?.type === "choice") {
      const select = document.createElement("select");

      course.ge.reqIds.forEach((reqId) => {
        const option = document.createElement("option");
        option.value = reqId;
        option.textContent = `Counts as ${reqId}`;
        select.appendChild(option);
      });

      select.value = data.major.geChoiceByCourse[course.id] || course.ge.defaultReqId;

      select.addEventListener("change", () => {
        data.major.geChoiceByCourse[course.id] = select.value;
        saveData(data);
      });

      row.appendChild(select);
    }

    container.appendChild(row);
  });
}

// =====================
// RENDER ELECTIVES
// =====================

function renderElectives(data) {
  const container = document.getElementById("majorElectivesList");
  const rulesEl = document.getElementById("electiveRules");

  if (!container || !rulesEl) return;

  container.innerHTML = "";
  rulesEl.innerHTML = "";

  const completed = data.major.completedElectives;

  const preferredUnits = data.major.electives.preferred
    .filter((course) => Object.prototype.hasOwnProperty.call(completed, course.id))
    .reduce((sum, course) => sum + getCourseUnits(course, Number(completed[course.id])), 0);

  const limited6Units = data.major.electives.limited6
    .filter((course) => Object.prototype.hasOwnProperty.call(completed, course.id))
    .reduce((sum, course) => sum + getCourseUnits(course, Number(completed[course.id])), 0);

  const limited3Units = data.major.electives.limited3
    .filter((course) => Object.prototype.hasOwnProperty.call(completed, course.id))
    .reduce((sum, course) => sum + getCourseUnits(course, Number(completed[course.id])), 0);

  const totalUnits = preferredUnits + limited6Units + limited3Units;

  const addRule = (text) => {
    const span = document.createElement("span");
    span.textContent = text;
    rulesEl.appendChild(span);
  };

  addRule(`Preferred: ${preferredUnits}/12 units`);
  addRule(`Limited (≤6): ${limited6Units}/6 units`);
  addRule(`Limited (≤3): ${limited3Units}/3 units`);
  addRule(`Electives total: ${totalUnits}/21 units`);

  function renderGroup(title, courses) {
    const heading = document.createElement("div");
    heading.style.fontWeight = "900";
    heading.style.color = "var(--cpp-green)";
    heading.style.margin = "10px 0";
    heading.textContent = title;
    container.appendChild(heading);

    courses.forEach((course) => {
      const row = document.createElement("div");
      row.className = "checkItem";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Object.prototype.hasOwnProperty.call(completed, course.id);

      const label = document.createElement("label");
      label.textContent = course.label;

      const units = document.createElement("span");
      units.className = "pill";
      units.textContent = course.unitsRange
        ? `${course.unitsRange[0]}-${course.unitsRange[1]}u`
        : `${course.units}u`;

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          completed[course.id] = getCourseUnits(course);
        } else {
          delete completed[course.id];
        }

        saveData(data);
      });

      row.appendChild(checkbox);
      row.appendChild(label);
      row.appendChild(units);

      if (course.unitsRange) {
        const select = createUnitsSelect(course, completed, (selectedUnits) => {
          if (checkbox.checked) {
            completed[course.id] = selectedUnits;
            saveData(data);
          }
        });

        row.appendChild(select);
      }

      container.appendChild(row);
    });
  }

  renderGroup("At least 12 units from:", data.major.electives.preferred);
  renderGroup("No more than 6 units from:", data.major.electives.limited6);
  renderGroup("No more than 3 units from:", data.major.electives.limited3);
}

// =====================
// RENDER GE
// =====================

function renderGeChecklist(data) {
  const container = document.getElementById("geChecklist");
  if (!container) return;

  container.innerHTML = "";

  const geProgress = computeGeProgress(data);

  data.ge.requirements.forEach((req) => {
    const row = document.createElement("div");
    row.className = "checkItem";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = geProgress.completedReqs.has(req.id);

    checkbox.addEventListener("change", () => {
      const set = new Set(data.ge.completedManual);

      if (checkbox.checked) {
        set.add(req.id);
      } else {
        set.delete(req.id);
      }

      data.ge.completedManual = Array.from(set);
      saveData(data);
    });

    const label = document.createElement("label");
    label.textContent = req.label;

    const units = document.createElement("span");
    units.className = "pill";
    units.textContent = `${req.units}u`;

    row.appendChild(checkbox);
    row.appendChild(label);
    row.appendChild(units);

    container.appendChild(row);
  });
}

// =====================
// RENDER ALL
// =====================

function renderChecklist() {
  const data = loadData();

  renderRequiredCourses(data);
  renderElectives(data);
  renderGeChecklist(data);

  const major = computeMajorProgress(data);
  setBar("majorBarFill2", "majorPct2", major.pct);
  setText("majorCompleted2", `${major.completed}/${major.total} units complete`);
  setText("majorUnitsLeft2", `${major.left} units left`);

  const ge = computeGeProgress(data);
  setBar("geBarFill2", "gePct2", ge.pct);
  setText("geCompleted2", `${ge.completed}/${ge.total} units complete`);
  setText("geUnitsLeft2", `${ge.left} units left`);
}

// =====================
// INIT
// =====================

// =====================
// ACCORDION TOGGLE
// =====================

function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.getAttribute("aria-expanded") === "true";

  btn.setAttribute("aria-expanded", isOpen ? "false" : "true");

  if (isOpen) {
    body.hidden = true;
  } else {
    body.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderChecklist();
});
