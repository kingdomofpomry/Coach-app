console.log("app.js laddad");

/* DATA */
const exercises = {
  stress: [
    { title: "Reflektion", text: "Vad är den största källan till stress i ditt liv just nu?" },
    { title: "Handling", text: "Gör EN liten sak idag som lugnar ditt nervsystem." },
    { title: "Tankemönster", text: "Vilken tanke gör stressen värre – och hur kan du formulera den snällare?" }
  ],
  energi: [
    { title: "Reflektion", text: "När på dagen tappar du mest energi?" },
    { title: "Handling", text: "Vad kan du ändra imorgon för att få mer energi?" },
    { title: "Tankemönster", text: "Vad säger du till dig själv när du är trött?" }
  ],
  ekonomi: [
    { title: "Reflektion", text: "Vad i din ekonomi skapar mest oro just nu?" },
    { title: "Handling", text: "Identifiera EN konkret förbättring du kan göra denna vecka." },
    { title: "Tankemönster", text: "Vilken tanke om pengar begränsar dig mest?" }
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

let currentCategory = null;
let step = 0;

const card = document.getElementById("exercise-card");
const titleEl = document.getElementById("card-title");
const textEl = document.getElementById("card-text");
const nextBtn = document.getElementById("next-btn");

function selectCategory(cat) {
  currentCategory = cat;
  step = 0;
  showStep();
}

function showStep() {
  const data = exercises[currentCategory][step];
  card.classList.remove("hidden");
  titleEl.textContent = data.title;
  textEl.textContent = data.text;

  nextBtn.textContent =
    step < exercises[currentCategory].length - 1
      ? "Nästa övning"
      : "Avsluta";
}

nextBtn.onclick = () => {
  step++;
  if (step < exercises[currentCategory].length) {
    showStep();
  } else {
    titleEl.textContent = "Bra jobbat ✨";
    textEl.textContent = "Vill du fortsätta eller välja en ny kategori?";
    nextBtn.style.display = "none";
  }
};

/* PÅMINNELSER – placeholder */
function enableReminders() {
  alert("🔔 Påminnelser aktiverade (logik kommer i nästa steg)");
}

function scheduleDaily() {
  alert("⏰ Daglig påminnelse sparad (tid & schema nästa steg)");
}
