// ===== START =====
console.log("app.js laddad");

// ===== ELEMENT =====
const card = document.getElementById("exercise-card");
const titleEl = document.getElementById("card-title");
const textEl = document.getElementById("card-text");
const progressEl = document.getElementById("progress");
const inputEl = document.getElementById("input");
const aiResponse = document.getElementById("ai-response");

let currentCategory = null;
let currentIndex = 0;

// ===== DATA =====
const exercises = {
  stress: [
    { title: "Reflektion", text: "Vad är den största källan till stress i ditt liv just nu?" },
    { title: "Handling", text: "Skriv ner EN sak du kan göra idag för att minska stressen." },
    { title: "Tankemönster", text: "Vilken tanke gör stressen värre – och hur kan du tänka annorlunda?" }
  ],

  relation: [
    { title: "Reflektion", text: "Vilken relation upptar mest av dina tankar?" },
    { title: "Handling", text: "Finns det ett samtal du behöver ta?" },
    { title: "Tankemönster", text: "Vilken roll tar du ofta i relationer?" }
  ],

  energi: [
    { title: "Reflektion", text: "När på dagen känner du dig mest trött?" },
    { title: "Handling", text: "Vad är en liten sak som skulle ge dig mer energi imorgon?" },
    { title: "Tankemönster", text: "Hur pratar du med dig själv när du är trött?" }
  ],

  självkänsla: [
    { title: "Reflektion", text: "När tvivlar du mest på dig själv?" },
    { title: "Handling", text: "Skriv ner en sak du gjorde bra idag." },
    { title: "Tankemönster", text: "Hur skulle du prata med en vän i samma situation?" }
  ],

  ekonomi: [
    { title: "Reflektion", text: "Vad i din ekonomi skapar mest oro just nu?" },
    { title: "Handling", text: "Vilken liten ekonomisk förbättring kan du göra denna vecka?" },
    { title: "Tankemönster", text: "Vilken tanke kring pengar begränsar dig?" }
  ],

  utveckling: [
    { title: "Reflektion", text: "Vad vill du egentligen växa inom just nu?" },
    { title: "Handling", text: "Vilket litet steg kan du ta denna vecka?" },
    { title: "Tankemönster", text: "Vad håller dig tillbaka – rädsla eller vana?" }
  ]
};

// ===== FUNKTIONER =====
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
        language: currentLanguage || "sv"
      })
    });

    const data = await res.json();

    aiResponse.innerText = data.reply;

    // 🔥 rensa input efter svar
    inputEl.value = "";

  } catch (err) {
    aiResponse.innerText = "Något gick fel.";
  }
};
function nextExercise() {
  currentIndex++;

  // stoppa vid max (3 frågor)
  if (currentIndex > 2) currentIndex = 2;

  const current = exercises[currentCategory][currentIndex];

  titleEl.innerText = current.title;
  textEl.innerText = current.text;
  progressEl.innerText = `${currentIndex + 1} / 3`;

  // 🔥 Rensa allt
  inputEl.value = "";
  aiResponse.innerText = "";
  aiResponse.classList.add("hidden");
}
