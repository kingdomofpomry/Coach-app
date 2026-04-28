// ===== START =====
console.log("app.js laddad");

// ===== ELEMENT =====
const titleEl = document.getElementById("card-title");
const textEl = document.getElementById("card-text");
const progressEl = document.getElementById("progress");
const inputEl = document.getElementById("input");
const aiResponse = document.getElementById("ai-response");

// ===== STATE =====
let currentCategory = null;
let currentIndex = 0;
let currentLanguage = "sv";

// ===== DATA =====
const exercises = {
  stress: [
    { title: "Reflektion", text: "Vad är den största källan till stress i ditt liv just nu?" },
    { title: "Handling", text: "Skriv ner EN sak du kan göra idag för att minska stress." },
    { title: "Tankemönster", text: "Vilken tanke gör stressen värre – och hur kan du tänka annorlunda?" }
  ],

  relation: [
    { title: "Reflektion", text: "Vilken relation påverkar dig mest just nu?" },
    { title: "Handling", text: "Finns det ett samtal du behöver ta?" },
    { title: "Tankemönster", text: "Vilken roll tar du i relationer?" }
  ],

  energi: [
    { title: "Reflektion", text: "När på dagen känner du mest energi?" },
    { title: "Handling", text: "Vad är en liten sak som ger dig mer energi?" },
    { title: "Tankemönster", text: "Vad säger du till dig själv när du är trött?" }
  ],

  självkänsla: [
    { title: "Reflektion", text: "När tvivlar du mest på dig själv?" },
    { title: "Handling", text: "Skriv ner en sak du gjorde bra nyligen." },
    { title: "Tankemönster", text: "Hur skulle du prata med en vän i samma situation?" }
  ],

  ekonomi: [
    { title: "Reflektion", text: "Vad i din ekonomi skapar mest oro?" },
    { title: "Handling", text: "Vilken liten ekonomisk handling kan du ta idag?" },
    { title: "Tankemönster", text: "Vilken tanke begränsar din ekonomiska utveckling?" }
  ],

  utveckling: [
    { title: "Reflektion", text: "Vad vill du egentligen växa inom just nu?" },
    { title: "Handling", text: "Vilket litet steg kan du ta idag?" },
    { title: "Tankemönster", text: "Vad håller dig tillbaka mentalt?" }
  ]
};

// ===== VISA KORT =====
function showCard() {
  if (!currentCategory) return;

  const list = exercises[currentCategory];
  const current = list[currentIndex];

  titleEl.innerText = current.title;
  textEl.innerText = current.text;
  progressEl.innerText = `${currentIndex + 1} / ${list.length}`;

  // 🔥 reset varje gång
  inputEl.value = "";
  aiResponse.innerText = "";
  aiResponse.classList.add("hidden");
}

// ===== VÄLJ KATEGORI =====
function selectCategory(cat) {
  currentCategory = cat;
  currentIndex = 0;
  showCard();
}

// ===== NÄSTA ÖVNING =====
function nextExercise() {
  if (!currentCategory) return;

  const list = exercises[currentCategory];

  currentIndex++;

  if (currentIndex >= list.length) {
    currentIndex = list.length - 1;
  }

  showCard();
}

// ===== AI CALL =====
window.send = async function () {
  const message = inputEl.value;

  if (!message) return;

  aiResponse.classList.remove("hidden");
  aiResponse.innerText = "Tänker...";

  try {
    const res = await fetch("/.netlify/functions/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        category: currentCategory,
        language: currentLanguage
      })
    });

    const data = await res.json();

    aiResponse.innerText = data.reply || "Inget svar.";

    // 🔥 rensa input efter svar
    inputEl.value = "";

  } catch (err) {
    console.error(err);
    aiResponse.innerText = "Något gick fel.";
  }
};
