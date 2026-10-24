
const careers = {
  web: {
    name: "Web Developer",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "Git & GitHub", "DOM Manipulation", "APIs", "Debugging", "Accessibility", "React Basics"],
    groups: [
      { title: "Build your foundation", skills: ["HTML", "CSS", "Responsive Design"], duration: "Week 1–2", description: "Create a semantic webpage and make it work on mobile screens." },
      { title: "Make it interactive", skills: ["JavaScript", "DOM Manipulation", "Debugging"], duration: "Week 3–4", description: "Build interactive features and practice finding and fixing errors." },
      { title: "Build real projects", skills: ["Git & GitHub", "APIs", "Accessibility", "React Basics"], duration: "Week 5–8", description: "Publish a project, work with data, and explore a frontend framework." }
    ]
  },
  java: {
    name: "Java Developer",
    skills: ["Java Syntax", "OOP Concepts", "Arrays & Strings", "Collections", "Exception Handling", "File Handling", "SQL & Databases", "Git & GitHub", "Data Structures", "Unit Testing"],
    groups: [
      { title: "Master Java basics", skills: ["Java Syntax", "Arrays & Strings", "OOP Concepts"], duration: "Week 1–2", description: "Practice variables, loops, methods, classes, inheritance, and polymorphism." },
      { title: "Write stronger programs", skills: ["Collections", "Exception Handling", "File Handling", "Data Structures"], duration: "Week 3–5", description: "Build programs that organize data and handle errors properly." },
      { title: "Create a complete project", skills: ["SQL & Databases", "Git & GitHub", "Unit Testing"], duration: "Week 6–8", description: "Connect a database, use version control, and test your code." }
    ]
  },
  data: {
    name: "Data Analyst",
    skills: ["Excel", "SQL", "Python Basics", "Pandas", "Data Cleaning", "Statistics", "Data Visualization", "Power BI", "Critical Thinking", "Dashboard Projects"],
    groups: [
      { title: "Learn the fundamentals", skills: ["Excel", "Statistics", "Critical Thinking"], duration: "Week 1–2", description: "Understand spreadsheets, descriptive statistics, and asking useful questions." },
      { title: "Work with data", skills: ["SQL", "Python Basics", "Pandas", "Data Cleaning"], duration: "Week 3–5", description: "Query datasets, clean missing values, and analyze patterns." },
      { title: "Communicate insights", skills: ["Data Visualization", "Power BI", "Dashboard Projects"], duration: "Week 6–8", description: "Build a dashboard and publish a project that explains your findings." }
    ]
  },
  python: {
    name: "Python Developer",
    skills: ["Python Syntax", "Functions", "OOP Concepts", "Lists & Dictionaries", "File Handling", "Exception Handling", "Modules & Packages", "Git & GitHub", "APIs", "Testing"],
    groups: [
      { title: "Start with Python", skills: ["Python Syntax", "Functions", "Lists & Dictionaries"], duration: "Week 1–2", description: "Practice variables, conditions, loops, functions, and common data structures." },
      { title: "Build reliable programs", skills: ["OOP Concepts", "File Handling", "Exception Handling", "Modules & Packages"], duration: "Week 3–5", description: "Organize code into reusable components and handle files and errors." },
      { title: "Develop a project", skills: ["Git & GitHub", "APIs", "Testing"], duration: "Week 6–8", description: "Use an API, test your program, and publish a finished project." }
    ]
  },
  uiux: {
    name: "UI/UX Designer",
    skills: ["Design Principles", "Color Theory", "Typography", "User Research", "Wireframing", "Prototyping", "Figma", "Usability Testing", "Responsive Design", "Accessibility"],
    groups: [
      { title: "Understand design", skills: ["Design Principles", "Color Theory", "Typography"], duration: "Week 1–2", description: "Study visual hierarchy, readable typography, spacing, and color." },
      { title: "Design user experiences", skills: ["User Research", "Wireframing", "Figma", "Prototyping"], duration: "Week 3–5", description: "Explore user needs and create wireframes and clickable prototypes." },
      { title: "Test and improve", skills: ["Usability Testing", "Responsive Design", "Accessibility"], duration: "Week 6–8", description: "Test designs with users and improve the mobile experience." }
    ]
  },
  cyber: {
    name: "Cybersecurity Analyst",
    skills: ["Networking Basics", "Linux Basics", "Security Fundamentals", "Python Basics", "Log Analysis", "Access Control", "Threat Detection", "Incident Response", "Risk Assessment", "Security Reporting"],
    groups: [
      { title: "Learn the foundations", skills: ["Networking Basics", "Linux Basics", "Security Fundamentals"], duration: "Week 1–3", description: "Understand networks, operating systems, permissions, and defensive security." },
      { title: "Practice analysis", skills: ["Python Basics", "Log Analysis", "Access Control", "Risk Assessment"], duration: "Week 4–6", description: "Study logs, access permissions, and how to identify potential risks." },
      { title: "Practice defense", skills: ["Threat Detection", "Incident Response", "Security Reporting"], duration: "Week 7–9", description: "Use legal training labs to practice defensive analysis and incident documentation." }
    ]
  }
};

const $ = (id) => document.getElementById(id);

const careerSelect = $("careerSelect");
const skillsContainer = $("skillsContainer");
const customCareer = $("customCareer");
const customSkill = $("customSkill");
const results = $("results");

let selectedSkills = new Set();
let extraSkills = {};
let lastReport = null;
let toastTimer;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function currentCareer() {
  return careers[careerSelect.value];
}

function allSkills() {
  return [...new Set([
    ...currentCareer().skills,
    ...(extraSkills[careerSelect.value] || [])
  ])];
}

function renderSkills() {
  const skills = allSkills();

  // Remove selections that do not belong to the current career.
  selectedSkills = new Set(
    [...selectedSkills].filter(skill => skills.includes(skill))
  );

  skillsContainer.innerHTML = skills.map((skill, index) => {
    const checked = selectedSkills.has(skill);
    const safeSkill = escapeHTML(skill);

    return `
      <label class="skill-option ${checked ? "selected" : ""}">
        <input type="checkbox"
          value="${safeSkill}"
          data-skill-index="${index}"
          ${checked ? "checked" : ""}>
        <span>${safeSkill}</span>
      </label>
    `;
  }).join("");

  $("skillCount").textContent =
    `${selectedSkills.size} of ${skills.length} skills selected`;
}

function updateSkillCount() {
  $("skillCount").textContent =
    `${selectedSkills.size} of ${allSkills().length} skills selected`;
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function addCareer() {
  const name = customCareer.value.trim();

  if (!name) {
    showToast("Enter a career name first.");
    customCareer.focus();
    return;
  }

  if (name.length > 60) {
    showToast("Career name must be 60 characters or fewer.");
    return;
  }

  const existingKey = Object.keys(careers).find(
    key => careers[key].name.toLowerCase() === name.toLowerCase()
  );

  if (existingKey) {
    careerSelect.value = existingKey;
    selectedSkills = new Set();
    renderSkills();
    customCareer.value = "";
    showToast("That career is already available.");
    return;
  }

  const key = "custom_" + Date.now();

  careers[key] = {
    name,
    skills: [
      "Core fundamentals",
      "Problem Solving",
      "Communication",
      "Project Practice",
      "Tools & Technology"
    ],
    groups: [
      {
        title: "Learn the fundamentals",
        skills: ["Core fundamentals", "Problem Solving"],
        duration: "Stage 1",
        description: "Identify the foundations and practice the basics of your chosen field."
      },
      {
        title: "Build practical skills",
        skills: ["Tools & Technology", "Project Practice"],
        duration: "Stage 2",
        description: "Learn relevant tools and build a small project to apply your knowledge."
      },
      {
        title: "Prepare for opportunities",
        skills: ["Communication"],
        duration: "Stage 3",
        description: "Explain your work, gather feedback, and improve your portfolio."
      }
    ]
  };

  const option = document.createElement("option");
  option.value = key;
  option.textContent = name;
  careerSelect.appendChild(option);
  careerSelect.value = key;

  selectedSkills = new Set();
  renderSkills();
  customCareer.value = "";
  results.hidden = true;
  lastReport = null;

  showToast("Career added! You can customize its skills.");
}

function addSkill() {
  const skill = customSkill.value.trim();
  const careerKey = careerSelect.value;

  if (!skill) {
    showToast("Enter a skill name first.");
    customSkill.focus();
    return;
  }

  if (skill.length > 60) {
    showToast("Skill name must be 60 characters or fewer.");
    return;
  }

  if (allSkills().some(item => item.toLowerCase() === skill.toLowerCase())) {
    showToast("That skill is already on your list.");
    return;
  }

  if (!extraSkills[careerKey]) {
    extraSkills[careerKey] = [];
  }

  extraSkills[careerKey].push(skill);
  customSkill.value = "";
  renderSkills();
  showToast("Custom skill added!");
}

function makeRoadmap(missingSkills) {
  const career = currentCareer();
  const extra = extraSkills[careerSelect.value] || [];

  return career.groups.map((group) => {
    const needed = group.skills.filter(
      skill => missingSkills.includes(skill)
    );

    return {
      ...group,
      skills: needed
    };
  }).filter(group => group.skills.length > 0).concat(
    extra.filter(skill => missingSkills.includes(skill)).length
      ? [{
          title: "Practice your additional skills",
          skills: extra.filter(skill => missingSkills.includes(skill)),
          duration: "Continue learning",
          description: "Find beginner lessons, practice regularly, and build a small project using these skills."
        }]
      : []
  );
}

function renderTags(container, skills, type, emptyMessage) {
  if (skills.length === 0) {
    container.innerHTML = `<p class="empty-note">${escapeHTML(emptyMessage)}</p>`;
    return;
  }

  container.innerHTML = skills.map(skill =>
    `<span class="tag ${type}">${escapeHTML(skill)}</span>`
  ).join("");
}

function analyzeSkills() {
  const career = currentCareer();
  const skills = allSkills();
  const known = skills.filter(skill => selectedSkills.has(skill));
  const missing = skills.filter(skill => !selectedSkills.has(skill));
  const score = skills.length ? Math.round(known.length / skills.length * 100) : 0;

  lastReport = {
    careerName: career.name,
    skills: [...skills],
    known,
    missing,
    score,
    roadmap: makeRoadmap(missing),
    createdAt: new Date().toLocaleString()
  };

  $("reportSubtitle").textContent =
    `Your current skill snapshot for ${career.name}.`;

  $("scoreValue").textContent = `${score}%`;
  $("scoreCircle").style.background =
    `conic-gradient(var(--purple) ${score * 3.6}deg, #ece8fb ${score * 3.6}deg)`;
  $("scoreCircle").setAttribute(
    "aria-label", `Skill coverage: ${score} percent`
  );

  $("knownCount").textContent = known.length;
  $("missingCount").textContent = missing.length;
  $("totalCount").textContent = skills.length;

  if (score === 100) {
    $("scoreMessage").textContent = "Checklist complete! 🎉";
    $("scoreDescription").textContent =
      "You selected every skill in this example checklist. Keep practicing and building projects.";
  } else if (score >= 70) {
    $("scoreMessage").textContent = "You're making great progress!";
    $("scoreDescription").textContent =
      "You have checked off most of the listed skills. Focus on the remaining areas.";
  } else if (score >= 35) {
    $("scoreMessage").textContent = "You're building momentum!";
    $("scoreDescription").textContent =
      "Keep strengthening your foundation and work through the next learning stages.";
  } else {
    $("scoreMessage").textContent = "Every expert starts somewhere!";
    $("scoreDescription").textContent =
      "Start with the fundamentals and build confidence one skill at a time.";
  }

  renderTags(
    $("knownSkills"), known, "tag-known",
    "Select the skills you already know to see them here."
  );

  renderTags(
    $("missingSkills"), missing, "tag-missing",
    "No skills left on this checklist!"
  );

  renderRoadmap(lastReport.roadmap, known.length === skills.length);

  $("saveMessage").textContent = "";
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRoadmap(roadmap, allComplete) {
  const container = $("roadmap");

  if (allComplete) {
    container.innerHTML = `
      <div class="roadmap-item">
        <span class="roadmap-number">✓</span>
        <div>
          <h3>Checklist complete</h3>
          <p>Explore advanced topics, build portfolio projects, and keep learning from real-world feedback.</p>
        </div>
      </div>`;
    return;
  }

  if (!roadmap.length) {
    container.innerHTML =
      `<p class="empty-note">Your learning roadmap will appear here.</p>`;
    return;
  }

  container.innerHTML = roadmap.map((stage, index) => `
    <article class="roadmap-item">
      <span class="roadmap-number">${index + 1}</span>
      <div>
        <h3>${escapeHTML(stage.title)}</h3>
        <p>${escapeHTML(stage.description)}</p>
        <p><strong>Focus:</strong> ${stage.skills.map(escapeHTML).join(", ")}</p>
        <span class="duration">${escapeHTML(stage.duration)}</span>
      </div>
    </article>
  `).join("");
}

function exportReport() {
  if (!lastReport) {
    showToast("Analyze your skills before exporting.");
    return;
  }

  const report = lastReport;
  const roadmapText = report.roadmap.map((stage, index) =>
    `${index + 1}. ${stage.title} (${stage.duration})\n` +
    `   Focus: ${stage.skills.join(", ")}\n` +
    `   ${stage.description}`
  ).join("\n\n");

  const text = [
    "SKILL GAP DETECTIVE — CAREER REPORT",
    "===================================",
    `Career: ${report.careerName}`,
    `Generated: ${report.createdAt}`,
    `Skill coverage: ${report.score}%`,
    `Skills known: ${report.known.length}`,
    `Skills to learn: ${report.missing.length}`,
    "",
    "SKILLS YOU KNOW",
    "---------------",
    report.known.join(", ") || "None selected",
    "",
    "SKILLS TO DEVELOP",
    "-----------------",
    report.missing.join(", ") || "None remaining",
    "",
    "LEARNING ROADMAP",
    "----------------",
    roadmapText || "Checklist complete! Explore advanced learning.",
    "",
    "Note: The percentage compares your selections with an example checklist. It is not a measure of employability or a guarantee of getting a job."
  ].join("\n");

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "skill-gap-report.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("Your report has been exported!");
}

function savePlan() {
  if (!lastReport) {
    showToast("Analyze your skills before saving.");
    return;
  }

  const data = {
    report: lastReport,
    careerKey: careerSelect.value,
    selectedSkills: [...selectedSkills],
    extraSkills
  };

  try {
    localStorage.setItem("skillGapDetectivePlan", JSON.stringify(data));
    $("saveMessage").textContent = "✓ Your plan has been saved in this browser.";
    renderSavedPlan();
    showToast("Plan saved successfully!");
  } catch (error) {
    showToast("Could not save. Check your browser storage settings.");
  }
}

function renderSavedPlan() {
  let data;

  try {
    const saved = localStorage.getItem("skillGapDetectivePlan");
    data = saved ? JSON.parse(saved) : null;
  } catch (error) {
    data = null;
  }

  const container = $("savedPlan");
  const loadButton = $("loadSavedBtn");
  const deleteButton = $("deleteSavedBtn");

  if (!data || !data.report) {
    container.innerHTML =
      `<p class="empty-state">No saved plan yet. Analyze your skills and click “Save my plan”.</p>`;
    loadButton.hidden = true;
    deleteButton.hidden = true;
    return;
  }

  container.innerHTML = `
    <div class="saved-details">
      <strong>${escapeHTML(data.report.careerName)}</strong>
      <p>Skill coverage: ${Number(data.report.score)}%</p>
      <p>Skills selected: ${data.report.known.length} of ${data.report.skills.length}</p>
      <p>Last saved: ${escapeHTML(data.report.createdAt)}</p>
    </div>
  `;

  loadButton.hidden = false;
  deleteButton.hidden = false;
}

function loadSavedPlan() {
  let data;

  try {
    data = JSON.parse(localStorage.getItem("skillGapDetectivePlan"));
  } catch (error) {
    data = null;
  }

  if (!data || !data.report) {
    showToast("No saved plan was found.");
    renderSavedPlan();
    return;
  }

  // Recreate a custom career if it is not present in the current session.
  if (!careers[data.careerKey]) {
    careers[data.careerKey] = {
      name: data.report.careerName,
      skills: [...data.report.skills],
      groups: [{
        title: "Work through your missing skills",
        skills: [...data.report.skills],
        duration: "Your own pace",
        description: "Choose learning resources for each missing skill and practice with small projects."
      }]
    };

    const option = document.createElement("option");
    option.value = data.careerKey;
    option.textContent = data.report.careerName;
    careerSelect.appendChild(option);
  }

  careerSelect.value = data.careerKey;
  extraSkills = data.extraSkills || {};
  selectedSkills = new Set(data.selectedSkills || []);

  renderSkills();
  analyzeSkills();
  showToast("Your saved plan has been loaded.");
}

function deleteSavedPlan() {
  if (!localStorage.getItem("skillGapDetectivePlan")) {
    showToast("There is no saved plan to delete.");
    return;
  }

  const confirmed = window.confirm("Delete your saved plan from this browser?");
  if (!confirmed) return;

  localStorage.removeItem("skillGapDetectivePlan");
  renderSavedPlan();
  $("saveMessage").textContent = "";
  showToast("Saved plan deleted.");
}

function resetForm() {
  selectedSkills = new Set();
  renderSkills();
  results.hidden = true;
  lastReport = null;
  $("saveMessage").textContent = "";
  $("customSkill").value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

careerSelect.addEventListener("change", () => {
  selectedSkills = new Set();
  results.hidden = true;
  lastReport = null;
  renderSkills();
});

skillsContainer.addEventListener("change", (event) => {
  const input = event.target;

  if (!input.matches('input[type="checkbox"]')) return;

  const skill = input.value;

  if (input.checked) {
    selectedSkills.add(skill);
  } else {
    selectedSkills.delete(skill);
  }

  input.closest(".skill-option").classList.toggle("selected", input.checked);
  updateSkillCount();
});

$("addCareerBtn").addEventListener("click", addCareer);
customCareer.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addCareer();
});

$("addSkillBtn").addEventListener("click", addSkill);
customSkill.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addSkill();
});

$("clearSkillsBtn").addEventListener("click", () => {
  selectedSkills.clear();
  renderSkills();
});

$("analyzeBtn").addEventListener("click", analyzeSkills);
$("saveBtn").addEventListener("click", savePlan);
$("exportBtn").addEventListener("click", exportReport);
$("resetBtn").addEventListener("click", resetForm);
$("loadSavedBtn").addEventListener("click", loadSavedPlan);
$("deleteSavedBtn").addEventListener("click", deleteSavedPlan);

renderSkills();
renderSavedPlan();
