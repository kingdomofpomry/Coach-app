console.log("app.js laddad");

/* =========================
   DATA – ÖVNINGAR
========================= */
const exercises = {
  stress: [
    { title: "Reflektion", text: "Vad är den största källan till stress i ditt liv just nu?" },
    { title: "Handling", text: "Gör EN liten sak idag som minskar stressen." },
    { title: "Tankemönster", text: "Vilken tanke gör stressen värre – och hur kan du formulera den snällare?" }
  ],
  energi: [
    { title: "Reflektion", text: "När på dagen tappar du mest energi?" },
    { title: "Handling", text: "Vad kan du ändra imorgon för mer energi?" },
    { title: "Tankemönster", text: "Vad säger du till dig själv när du är trött?" }
  ],
  ekonomi: [
    { title: "Reflektion", text: "Vad i din ekonomi skapar mest oro just nu?" },
    { title: "Handling", text: "Identifiera EN konkret förbättring denna vecka." },
    { title: "Tankemönster", text: "Vilken tanke om pengar begränsar dig?" }
  ],
  relation: [
    { title: "Reflektion", text: "Vilken relation påverkar dig mest just nu?" },
    { title: "Handling", text: "Finns ett samtal du undviker?" },
    { title: "Tankemönster", text: "Vilken roll tar du ofta i relationer?" }
  ],
  självkänsla: [
    { title: "Reflektion", text: "När tvivlar du mest på dig själv?" },
    { title: "Handling", text: "Gör en handling idag som stärker dig." },
    { title: "Tankemönster", text: "Hur hade du pratat med en vän?" }
  ],
  utveckling: [
    { title: "Reflektion", text: "Vad vill du växa inom just nu?" },
    { title: "Handling", text: "Vilket litet steg kan du ta denna vecka?" },
    { title: "Tankemönster", text: "Vad håller dig tillbaka – rädsla eller vana?" }
  ]
};

/* =========================
   STATE (SPARAS)
========================= */
let currentCategory = localStorage.getItem("category");
let currentStep = Number(localStorage.getItem("step")) || 0;

/* =========================
   ELEMENT
========================= */
const card = document.getElementById("exercise-card");
const titleEl = document.getElementById("card-title");
const textEl = document.getElementById("card-text");
const nextBtn = document.getElementById("next-btn");

/* =========================
   INIT – ÅTERUPPTA
========================= */
if (currentCategory && exercises[currentCategory]) {
  showStep();
}

/* =========================
   CATEGORY
========================= */
function selectCategory(category) {
  currentCategory = category;
  currentStep = 0;
  saveProgress();
  showStep();
}

/* =========================
   SHOW STEP
========================= */
function showStep() {
  const data = exercises[currentCategory][currentStep];
  card.classList.remove("hidden");
  titleEl.textContent = data.title;
  textEl.textContent = data.text;

  nextBtn.textContent =
    currentStep < exercises[currentCategory].length - 1
      ? "Nästa övning"
      : "Avsluta";
}

/* =========================
   NEXT
========================= */
nextBtn.onclick = () => {
  currentStep++;

  if (currentStep < exercises[currentCategory].length) {
    saveProgress();
    showStep();
  } else {
    localStorage.setItem("lastCompleted", currentCategory);
    card.innerHTML = `
      <h3>Bra jobbat ✨</h3>
      <p>Du har slutfört denna övning.</p>
    `;
    localStorage.removeItem("step");
  }
};

/* =========================
   SAVE
========================= */
function saveProgress() {
  localStorage.setItem("category", currentCategory);
  localStorage.setItem("step", currentStep);
}

/* =========================
   PÅMINNELSER (placeholder)
========================= */
function enableReminders() {
  alert("🔔 Påminnelser kopplas till din personliga övning (nästa steg)");
}

function scheduleDaily() {
  alert("⏰ Daglig påminnelse sparad för din plan");
}
