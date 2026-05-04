const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const menuWrap = document.getElementById("menuWrap");
const menuBtn = document.getElementById("menuBtn");

function toggleDropdown(event) {
  event.stopPropagation();
  const isOpen = menuWrap.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function closeDropdown() {
  menuWrap.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

function toggleSidebar() {
  if (window.innerWidth <= 820) {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  }
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

menuBtn.addEventListener("click", toggleDropdown);
mobileMenuBtn.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", closeSidebar);

document.addEventListener("click", (event) => {
  if (!menuWrap.contains(event.target)) {
    closeDropdown();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeSidebar();
  }
});

//checklist
const STORAGE_KEY = "degreeProgress.v1";

const DEFAULT_DATA = {
  student: {
    program: "Undergrad",
    major: "CS",
    minor: "N/A",
    gpa: 4.0,
    gradStatus: "Not applied",
  },
  major: {
    requiredUnitsTotal: 71,
    electiveUnitsTotal: 21,
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
      {
        id: "CS3750W",
        label: "CS 3750W - Computers and Society",
        units: 3,
        ge: { type: "choice", reqIds: ["4C", "5D"], defaultReqId: "4C" },
      },
      { id: "CS4080", label: "CS 4080 - Concepts of Programming Languages", units: 3 },
      { id: "CS4310", label: "CS 4310 - Operating Systems", units: 3 },
      { id: "CS4630", label: "CS 4630 - Undergraduate Seminar", units: 1 },
      { id: "CS4800", label: "CS 4800 - Software Engineering", units: 3 },
      { id: "MAT1140", label: "MAT 1140 - Calculus I", units: 4, ge: { type: "fixed", reqId: "2" } },
      { id: "MAT1150", label: "MAT 1150 - Calculus II", units: 4, ge: { type: "fixed", reqId: "2" } },
      { id: "PHY1510", label: "PHY 1510 - Intro to Newtonian Mechanics", units: 3, ge: { type: "fixed", reqId: "5A" } },
      { id: "PHY1510L", label: "PHY 1510L - Newtonian Mechanics Laboratory", units: 1, ge: { type: "fixed", reqId: "5C" } },
      { id: "STA2260", label: "STA 2260 - Probability and Statistics for CS & Engineers", units: 3 },
      { id: "AI_PART_A", label: "American Institutions Part A", units: 3, ge: { type: "fixed", reqId: "4A" } },
    ],
    electives: {
      preferredMinUnits: 12,
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
        { id: "CS4990", label: "CS 4990 - Special Topics (Upper Division)", unitsRange: [1, 3] },
      ],
      limited6MaxUnits: 6,
      limited6: [
        { id: "CS2250", label: "CS 2250 - Intro to Web Science and Technology", units: 3 },
        { id: "CS2410", label: "CS 2410 - Fundamentals of Data Science", units: 3 },
        { id: "CS2450", label: "CS 2450 - User Interface Design and Programming", units: 3 },
        { id: "CS2520", label: "CS 2520 - Python for Programmers", units: 3 },
        { id: "CS2560", label: "CS 2560 - C++ Programming", units: 3 },
        { id: "CS2990", label: "CS 2990 - Special Topics (Lower Division)", unitsRange: [1, 3] },
      ],
      limited3MaxUnits: 3,
      limited3: [
        { id: "CS2000", label: "CS 2000 - Special Study (Lower Division)", unitsRange: [1, 3] },
        { id: "CS4000", label: "CS 4000 - Special Study (Upper Division)", unitsRange: [1, 3] },
        { id: "CS4410", label: "CS 4410 - Internship in Computer Science", unitsRange: [1, 2] },
        { id: "CS4610", label: "CS 4610 - Senior Project", units: 1 },
        { id: "CS4620", label: "CS 4620 - Senior Project", units: 1 },
        { id: "CS4820", label: "CS 4820 - CS Project Practicum", units: 1 },
      ],
    },
    completedRequired: [],
    completedElectives: {},
    geChoiceByCourse: {
      CS3750W: "4C",
    },
  },
  ge: {
    totalUnits: 43,
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
      { id: "6", label: "Area 6 - Ethnic Studies", units: 3 },
    ],
    completedManual: [],
  },
};

function clampPct(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function roundPct(n) {
  return Math.round(n);
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    // Basic sanity fallback if malformed
    if (!parsed || typeof parsed !== "object") return structuredClone(DEFAULT_DATA);
    return {
      ...structuredClone(DEFAULT_DATA),
      ...parsed,
      student: { ...structuredClone(DEFAULT_DATA.student), ...(parsed.student || {}) },
      major: { ...structuredClone(DEFAULT_DATA.major), ...(parsed.major || {}) },
      ge: { ...structuredClone(DEFAULT_DATA.ge), ...(parsed.ge || {}) },
    };
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("degreeProgress:changed"));
}

function getCourseUnits(course, selectedUnits) {
  if (typeof selectedUnits === "number" && Number.isFinite(selectedUnits)) return selectedUnits;
  if (typeof course.units === "number") return course.units;
  if (Array.isArray(course.unitsRange)) return course.unitsRange[1];
  return 0;
}

function sumUnits(courses, selectedMap) {
  let total = 0;
  for (const c of courses) total += getCourseUnits(c, selectedMap?.[c.id]);
  return total;
}

function buildElectiveIndex(major) {
  const preferred = major.electives?.preferred || [];
  const limited6 = major.electives?.limited6 || [];
  const limited3 = major.electives?.limited3 || [];
  return {
    preferredSet: new Set(preferred.map((c) => c.id)),
    limited6Set: new Set(limited6.map((c) => c.id)),
    limited3Set: new Set(limited3.map((c) => c.id)),
    all: [...preferred, ...limited6, ...limited3],
  };
}

function computeMajorProgress(data) {
  const major = data.major || {};
  const requiredTotal = Number(major.requiredUnitsTotal) || 0;
  const electiveTotal = Number(major.electiveUnitsTotal) || 0;
  const overallTotal = requiredTotal + electiveTotal;

  const requiredCourses = Array.isArray(major.requiredCourses) ? major.requiredCourses : [];
  const requiredCompleted = new Set(Array.isArray(major.completedRequired) ? major.completedRequired : []);
  const requiredCompletedCourses = requiredCourses.filter((c) => requiredCompleted.has(c.id));
  const requiredUnitsCompleted = sumUnits(requiredCompletedCourses);

  const completedElectives = major.completedElectives && typeof major.completedElectives === "object" ? major.completedElectives : {};
  const electiveIndex = buildElectiveIndex(major);
  const electiveSelectedCourses = electiveIndex.all.filter((c) => Object.prototype.hasOwnProperty.call(completedElectives, c.id));
  const electiveUnitsCompleted = sumUnits(electiveSelectedCourses, completedElectives);

  const overallUnitsCompleted = requiredUnitsCompleted + electiveUnitsCompleted;
  const pct = overallTotal > 0 ? (overallUnitsCompleted / overallTotal) * 100 : 0;

  return {
    requiredTotal,
    electiveTotal,
    overallTotal,
    requiredUnitsCompleted,
    electiveUnitsCompleted,
    overallUnitsCompleted,
    pct: clampPct(pct),
    unitsLeft: Math.max(0, overallTotal - overallUnitsCompleted),
    requiredUnitsLeft: Math.max(0, requiredTotal - requiredUnitsCompleted),
    electiveUnitsLeft: Math.max(0, electiveTotal - electiveUnitsCompleted),
  };
}

function computeGeProgress(data) {
  const ge = data.ge || {};
  const totalUnits = Number(ge.totalUnits) || 0;
  const reqs = Array.isArray(ge.requirements) ? ge.requirements : [];
  const manual = new Set(Array.isArray(ge.completedManual) ? ge.completedManual : []);

  const auto = computeAutoGeSatisfaction(data);
  const satisfied = new Set([...manual, ...auto.satisfiedReqIds]);

  let unitsCompleted = 0;
  for (const r of reqs) {
    if (satisfied.has(r.id)) unitsCompleted += Number(r.units) || 0;
  }

  const pct = totalUnits > 0 ? (unitsCompleted / totalUnits) * 100 : 0;
  return {
    totalUnits,
    unitsCompleted: Math.min(totalUnits, unitsCompleted),
    pct: clampPct(pct),
    unitsLeft: Math.max(0, totalUnits - unitsCompleted),
    autoReasons: auto.reasonsByReqId,
    satisfiedReqIds: satisfied,
  };
}

function computeAutoGeSatisfaction(data) {
  const major = data.major || {};
  const requiredCourses = Array.isArray(major.requiredCourses) ? major.requiredCourses : [];
  const requiredCompleted = new Set(Array.isArray(major.completedRequired) ? major.completedRequired : []);
  const choiceByCourse = major.geChoiceByCourse && typeof major.geChoiceByCourse === "object" ? major.geChoiceByCourse : {};

  const satisfiedReqIds = [];
  const reasonsByReqId = {};

  for (const c of requiredCourses) {
    if (!requiredCompleted.has(c.id)) continue;
    if (!c.ge) continue;

    if (c.ge.type === "fixed" && c.ge.reqId) {
      satisfiedReqIds.push(c.ge.reqId);
      reasonsByReqId[c.ge.reqId] = c.label;
    }

    if (c.ge.type === "choice" && Array.isArray(c.ge.reqIds)) {
      const chosen = choiceByCourse[c.id] || c.ge.defaultReqId || c.ge.reqIds[0];
      if (chosen) {
        satisfiedReqIds.push(chosen);
        reasonsByReqId[chosen] = `${c.label} (${chosen})`;
      }
    }
  }

  return { satisfiedReqIds, reasonsByReqId };
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = String(value);
}

function setBar(barId, pctId, pct) {
  const bar = document.getElementById(barId);
  if (bar) bar.style.width = `${clampPct(pct)}%`;
  setText(pctId, `${roundPct(pct)}%`);
}

function renderDashboard() {
  const root = document.querySelector("[data-page='dashboard']");
  if (!root) return;

  const data = loadData();
  const major = computeMajorProgress(data);
  const ge = computeGeProgress(data);

  setText("programVal", data.student.program);
  setText("majorVal", data.student.major);
  setText("minorVal", data.student.minor);
  setText("gpaVal", Number(data.student.gpa).toFixed(2));
  setText("gradStatusVal", data.student.gradStatus);

  setBar("majorBarFill", "majorPct", major.pct);
  setText("majorCompleted", `${major.overallUnitsCompleted}/${major.overallTotal} units complete`);
  setText("majorUnitsLeft", `${major.unitsLeft} units left`);

  setBar("geBarFill", "gePct", ge.pct);
  setText("geCompleted", `${ge.unitsCompleted}/${ge.totalUnits} units complete`);
  setText("geUnitsLeft", `${ge.unitsLeft} units left`);

  const eligible = major.overallUnitsCompleted >= major.overallTotal && ge.unitsCompleted >= ge.totalUnits;
  const badge = document.getElementById("eligibleBadge");
  if (badge) {
    badge.textContent = eligible ? "Eligible to graduate" : "Not yet eligible";
    badge.style.borderColor = eligible ? "rgba(11,93,59,.55)" : "rgba(11,93,59,.18)";
    badge.style.background = eligible ? "rgba(11,93,59,.09)" : "rgba(11,93,59,.05)";
  }
}

function createRowCheckbox({ id, checked, disabled, onChange }) {
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = id;
  cb.checked = Boolean(checked);
  cb.disabled = Boolean(disabled);
  cb.addEventListener("change", onChange);
  return cb;
}

function createUnitsSelect({ courseId, range, value, disabled, onChange }) {
  const sel = document.createElement("select");
  sel.setAttribute("aria-label", `${courseId} units`);
  sel.disabled = Boolean(disabled);
  const [min, max] = range;
  for (let u = min; u <= max; u += 1) {
    const opt = document.createElement("option");
    opt.value = String(u);
    opt.textContent = `${u} unit${u === 1 ? "" : "s"}`;
    if (u === value) opt.selected = true;
    sel.appendChild(opt);
  }
  sel.addEventListener("change", () => onChange(Number(sel.value)));
  return sel;
}

function renderCourseList({ container, courses, completedSet, onToggle, choiceRender }) {
  container.innerHTML = "";
  for (const course of courses) {
    const id = `chk_${course.id}`;
    const row = document.createElement("div");
    row.className = "checkItem";

    const cb = createRowCheckbox({
      id,
      checked: completedSet.has(course.id),
      disabled: false,
      onChange: () => onToggle(course.id, cb.checked),
    });

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = course.label;

    const units = document.createElement("span");
    units.className = "pill";
    units.textContent = `${course.units ?? (course.unitsRange ? `${course.unitsRange[0]}-${course.unitsRange[1]}` : "?")}u`;

    row.appendChild(cb);
    row.appendChild(label);
    row.appendChild(units);

    if (typeof choiceRender === "function") {
      const extra = choiceRender(course, cb);
      if (extra) row.appendChild(extra);
    }

    container.appendChild(row);
  }
}

function renderElectives({ data, container, rulesEl }) {
  const major = data.major || {};
  const completed = major.completedElectives && typeof major.completedElectives === "object" ? major.completedElectives : {};
  const electiveIndex = buildElectiveIndex(major);

  const selectedIds = new Set(Object.keys(completed));

  const preferredUnits = sumUnits(
    electiveIndex.all.filter((c) => electiveIndex.preferredSet.has(c.id) && selectedIds.has(c.id)),
    completed,
  );
  const limited6Units = sumUnits(
    electiveIndex.all.filter((c) => electiveIndex.limited6Set.has(c.id) && selectedIds.has(c.id)),
    completed,
  );
  const limited3Units = sumUnits(
    electiveIndex.all.filter((c) => electiveIndex.limited3Set.has(c.id) && selectedIds.has(c.id)),
    completed,
  );
  const totalUnits = sumUnits(
    electiveIndex.all.filter((c) => selectedIds.has(c.id)),
    completed,
  );

  const preferredMin = Number(major.electives?.preferredMinUnits) || 12;
  const max6 = Number(major.electives?.limited6MaxUnits) || 6;
  const max3 = Number(major.electives?.limited3MaxUnits) || 3;
  const electiveTarget = Number(major.electiveUnitsTotal) || 0;

  if (rulesEl) {
    rulesEl.innerHTML = "";
    const make = (text, ok) => {
      const span = document.createElement("span");
      span.textContent = text;
      span.style.borderColor = ok ? "rgba(11,93,59,.22)" : "rgba(201,162,39,.55)";
      span.style.background = ok ? "rgba(11,93,59,.06)" : "rgba(201,162,39,.14)";
      return span;
    };
    rulesEl.appendChild(make(`Preferred: ${preferredUnits}/${preferredMin} units`, preferredUnits >= preferredMin));
    rulesEl.appendChild(make(`Limited (≤6): ${limited6Units}/${max6} units`, limited6Units <= max6));
    rulesEl.appendChild(make(`Limited (≤3): ${limited3Units}/${max3} units`, limited3Units <= max3));
    rulesEl.appendChild(make(`Electives total: ${totalUnits}/${electiveTarget} units`, totalUnits <= electiveTarget));
  }

  container.innerHTML = "";
  const groupTitle = (txt) => {
    const d = document.createElement("div");
    d.className = "divider";
    d.setAttribute("role", "separator");
    d.setAttribute("aria-hidden", "true");
    const h = document.createElement("div");
    h.style.margin = "-8px 0 10px";
    h.style.fontWeight = "900";
    h.style.color = "rgba(7,62,40,.82)";
    h.textContent = txt;
    container.appendChild(h);
  };

  const renderGroup = (title, courses) => {
    groupTitle(title);
    for (const course of courses) {
      const row = document.createElement("div");
      row.className = "checkItem";
      const id = `el_${course.id}`;

      const isChecked = Object.prototype.hasOwnProperty.call(completed, course.id);
      const cb = createRowCheckbox({
        id,
        checked: isChecked,
        disabled: false,
        onChange: () => {
          const next = loadData();
          next.major.completedElectives = next.major.completedElectives && typeof next.major.completedElectives === "object" ? next.major.completedElectives : {};
          if (cb.checked) {
            const u = getCourseUnits(course, next.major.completedElectives[course.id]);
            next.major.completedElectives[course.id] = u;
          } else {
            delete next.major.completedElectives[course.id];
          }
          saveData(next);
        },
      });

      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = course.label;

      const unitsPill = document.createElement("span");
      unitsPill.className = "pill";
      unitsPill.textContent = `${course.units ?? (course.unitsRange ? `${course.unitsRange[0]}-${course.unitsRange[1]}` : "?")}u`;

      row.appendChild(cb);
      row.appendChild(label);
      row.appendChild(unitsPill);

      if (Array.isArray(course.unitsRange)) {
        const current = Number(completed[course.id]) || course.unitsRange[1];
        const sel = createUnitsSelect({
          courseId: course.id,
          range: course.unitsRange,
          value: current,
          disabled: !cb.checked,
          onChange: (u) => {
            const next = loadData();
            next.major.completedElectives = next.major.completedElectives && typeof next.major.completedElectives === "object" ? next.major.completedElectives : {};
            next.major.completedElectives[course.id] = u;
            saveData(next);
          },
        });
        row.appendChild(sel);
      }

      container.appendChild(row);
    }
  };

  renderGroup("At least 12 units from:", major.electives?.preferred || []);
  container.appendChild(document.createElement("div")).className = "divider";
  renderGroup("No more than 6 units from:", major.electives?.limited6 || []);
  container.appendChild(document.createElement("div")).className = "divider";
  renderGroup("No more than 3 units from:", major.electives?.limited3 || []);
}

function renderGeChecklist({ data, container }) {
  const ge = data.ge || {};
  const reqs = Array.isArray(ge.requirements) ? ge.requirements : [];
  const manual = new Set(Array.isArray(ge.completedManual) ? ge.completedManual : []);
  const geProgress = computeGeProgress(data);

  container.innerHTML = "";
  for (const req of reqs) {
    const row = document.createElement("div");
    row.className = "checkItem";
    const id = `ge_${req.id}`;
    const autoReason = geProgress.autoReasons?.[req.id];
    const isAuto = Boolean(autoReason);
    const isChecked = geProgress.satisfiedReqIds?.has(req.id);

    const cb = createRowCheckbox({
      id,
      checked: isChecked,
      disabled: isAuto,
      onChange: () => {
        const next = loadData();
        next.ge.completedManual = Array.isArray(next.ge.completedManual) ? next.ge.completedManual : [];
        const set = new Set(next.ge.completedManual);
        if (cb.checked) set.add(req.id);
        else set.delete(req.id);
        next.ge.completedManual = Array.from(set);
        saveData(next);
      },
    });

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = req.label;

    const unitsPill = document.createElement("span");
    unitsPill.className = "pill";
    unitsPill.textContent = `${req.units}u`;

    row.appendChild(cb);
    row.appendChild(label);
    row.appendChild(unitsPill);

    if (isAuto) {
      const note = document.createElement("span");
      note.style.fontWeight = "850";
      note.style.color = "rgba(7,62,40,.68)";
      note.textContent = "Auto";
      note.title = `Satisfied by: ${autoReason}`;
      row.appendChild(note);
    } else if (manual.has(req.id)) {
      // no-op; checkbox conveys it
    }

    container.appendChild(row);
  }
}

function renderChecklist() {
  const root = document.querySelector("[data-page='checklist']");
  if (!root) return;

  const data = loadData();
  const requiredList = document.getElementById("majorRequiredList");
  const electivesList = document.getElementById("majorElectivesList");
  const rulesEl = document.getElementById("electiveRules");
  const geList = document.getElementById("geChecklist");

  if (!requiredList || !electivesList || !geList) return;

  const requiredCourses = Array.isArray(data.major.requiredCourses) ? data.major.requiredCourses : [];
  const completedRequired = new Set(Array.isArray(data.major.completedRequired) ? data.major.completedRequired : []);

  renderCourseList({
    container: requiredList,
    courses: requiredCourses,
    completedSet: completedRequired,
    onToggle: (courseId, checked) => {
      const next = loadData();
      next.major.completedRequired = Array.isArray(next.major.completedRequired) ? next.major.completedRequired : [];
      const set = new Set(next.major.completedRequired);
      if (checked) set.add(courseId);
      else set.delete(courseId);
      next.major.completedRequired = Array.from(set);
      saveData(next);
    },
    choiceRender: (course, cb) => {
      if (!course.ge || course.ge.type !== "choice") return null;
      const wrap = document.createElement("span");
      wrap.style.display = "flex";
      wrap.style.gap = "8px";
      wrap.style.alignItems = "center";

      const sel = document.createElement("select");
      sel.disabled = !cb.checked;
      sel.setAttribute("aria-label", `${course.id} GE area`);
      for (const r of course.ge.reqIds) {
        const opt = document.createElement("option");
        opt.value = r;
        opt.textContent = `Counts as ${r}`;
        sel.appendChild(opt);
      }
      const current = data.major.geChoiceByCourse?.[course.id] || course.ge.defaultReqId || course.ge.reqIds[0];
      sel.value = current;
      sel.addEventListener("change", () => {
        const next = loadData();
        next.major.geChoiceByCourse = next.major.geChoiceByCourse && typeof next.major.geChoiceByCourse === "object" ? next.major.geChoiceByCourse : {};
        next.major.geChoiceByCourse[course.id] = sel.value;
        saveData(next);
      });

      wrap.appendChild(sel);
      return wrap;
    },
  });

  renderElectives({ data, container: electivesList, rulesEl });
  renderGeChecklist({ data, container: geList });

  // Summary cards on the right
  const majorNow = computeMajorProgress(data);
  setBar("majorBarFill2", "majorPct2", majorNow.pct);
  setText("majorCompleted2", `${majorNow.overallUnitsCompleted}/${majorNow.overallTotal} units complete`);
  setText("majorUnitsLeft2", `${majorNow.unitsLeft} units left`);

  const geNow = computeGeProgress(data);
  setBar("geBarFill2", "gePct2", geNow.pct);
  setText("geCompleted2", `${geNow.unitsCompleted}/${geNow.totalUnits} units complete`);
  setText("geUnitsLeft2", `${geNow.unitsLeft} units left`);
}

function initNavActive() {
  const page = document.body?.dataset?.page;
  if (!page) return;
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const p = a.getAttribute("data-nav");
    if (p === page) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function init() {
  initNavActive();
  renderDashboard();
  renderChecklist();

  window.addEventListener("degreeProgress:changed", () => {
    renderDashboard();
    renderChecklist();
  });

  // Seed localStorage if empty (but don't overwrite existing progress)
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) saveData(loadData());
}

document.addEventListener("DOMContentLoaded", init);