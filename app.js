console.log("app.js laddad");

/* =========================
   DATA – ÖVNINGAR
========================= */
const exercises = {
  stress: [
    { title: "Reflektion", text: "Vad är den största källan till stress i ditt liv just nu?" },
    { title: "Handling", text: "Vad är EN liten sak du kan göra idag för att minska stress?" },
    { title: "Tankemönster", text: "Vilken tanke gör stressen värre – och hur kan du formulera den snällare?" }
  ],
  relation: [
    { title: "Reflektion", text: "Vilken relation tar mest energi just nu?" },
    { title: "Handling", text: "Finns det något som behöver sägas eller sättas gräns för?" },
    { title: "Tankemönster", text: "Vilken roll tar du oftast i relationer?" }
  ],
  energi: [
    { title: "Reflektion", text: "När på dagen känner du dig mest dränerad?" },
    { title: "Handling", text: "Vad kan du göra imorgon för att få mer energi?" },
    { title: "Tankemönster", text: "Vilken vana stjäl mest av din energi?" }
  ],
  självkänsla: [
    { title: "Reflektion", text: "När tvivlar du mest på dig själv?" },
    { title: "Handling", text: "Vad kan stärka din självkänsla idag?" },
    { title: "Tankemönster", text: "Hur skulle du prata med en vän i samma situation?" }
  ],
  ekonomi: [
    { title: "Reflektion", text: "Vad i din ekonomi skapar mest oro just nu?" },
    { title: "Handling", text: "Vilket litet steg kan öka din ekonomiska trygghet?" },
    { title: "Tankemönster", text: "Vilken tanke om pengar håller dig tillbaka?" }
  ],
  utveckling: [
    { title: "Reflektion", text: "Vad vill du växa inom just nu?" },
    { title: "Handling", text: "Vilket första steg kan du ta denna vecka?" },
    { title: "Tankemönster", text: "Vad hindrar dig – rädsla eller vana?" }
  ]
};

/* =========================
   STATE
========================= */
let currentCategory = null;
let currentStep = 0;

/* =========================
   ELEMENT
========================= */
const app = document.querySelector(".app");

/* =========================
   START PROGRAM
========================= */
function selectCategory(category) {
  currentCategory = category;
  currentStep = 0;
  renderCard();
}

/* =========================
   RENDER CARD
========================= */
function renderCard() {
  const data = exercises[currentCategory][currentStep];

  let card = document.getElementById("exercise-card");
  if (!card) {
    card = document.createElement("div");
    card.id = "exercise-card";
    card.style.width = "100%";
    card.style.maxWidth = "420px";
    card.style.marginTop = "24px";
    card.style.padding = "20px";
    card.style.borderRadius = "20px";
    card.style.background = "rgba(255,255,255,0.12)";
    app.appendChild(card);
  }

  card.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.text}</p>
    <button onclick="nextExercise()">Nästa övning</button>
    <div style="margin-top:12px; display:flex; gap:12px;">
      <button onclick="enableReminders()">🔔 Påminnelse</button>
      <button onclick="scheduleDaily()">⏰ Daglig</button>
    </div>
  `;
}

/* =========================
   NEXT EXERCISE
========================= */
function nextExercise() {
  currentStep++;

  if (currentStep >= exercises[currentCategory].length) {
    showFinish();
    return;
  }

  renderCard();
}

/* =========================
   FINISH
========================= */
function showFinish() {
  const card = document.getElementById("exercise-card");
  card.innerHTML = `
    <h3>Bra jobbat</h3>
    <p>Du har slutfört dagens övningar.</p>
    <button onclick="resetProgram()">Välj nytt område</button>
  `;
}

/* =========================
   RESET
========================= */
function resetProgram() {
  currentCategory = null;
  currentStep = 0;
  const card = document.getElementById("exercise-card");
  if (card) card.remove();
}

/* =========================
   REMINDERS (LOKALT)
========================= */
function enableReminders() {
  localStorage.setItem("reminder", JSON.stringify({
    category: currentCategory,
    step: currentStep
  }));
  alert("Påminnelse kopplad till denna övning");
}

function scheduleDaily() {
  localStorage.setItem("dailyReminder", JSON.stringify({
    category: currentCategory,
    step: currentStep,
    time: "20:00"
  }));
  alert("Daglig påminnelse sparad");
}
