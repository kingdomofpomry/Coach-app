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
let currentLanguage = localStorage.getItem("lang") || "en";

// ===== LANGUAGE SWITCH =====
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("lang", lang);

  updateCategoryButtons();

  if (currentCategory) {
    showCard();
  }
}

function updateCategoryButtons() {
  if (currentLanguage === "sv") {
    document.getElementById("cat-stress").innerText = "😔 Stress";
    document.getElementById("cat-relation").innerText = "❤️ Relation";
    document.getElementById("cat-energi").innerText = "⚡ Energi";
    document.getElementById("cat-sjalv").innerText = "🌱 Självkänsla";
    document.getElementById("cat-ekonomi").innerText = "💰 Ekonomi";
    document.getElementById("cat-utveckling").innerText = "🚀 Personlig utveckling";
  } else {
    document.getElementById("cat-stress").innerText = "😔 Stress";
    document.getElementById("cat-relation").innerText = "❤️ Relationship";
    document.getElementById("cat-energi").innerText = "⚡ Energy";
    document.getElementById("cat-sjalv").innerText = "🌱 Self-esteem";
    document.getElementById("cat-ekonomi").innerText = "💰 Finance";
    document.getElementById("cat-utveckling").innerText = "🚀 Personal growth";
  }
}

// ===== DATA =====
const exercises = {
  stress: {
    sv: [
      { title: "Reflektion", text: "Vad är den största källan till stress i ditt liv just nu?" },
      { title: "Handling", text: "Skriv ner EN sak du kan göra idag för att minska stress." },
      { title: "Tankemönster", text: "Vilken tanke gör stressen värre – och hur kan du tänka annorlunda?" }
    ],
    en: [
      { title: "Reflection", text: "What is the biggest source of stress in your life right now?" },
      { title: "Action", text: "Write down ONE thing you can do today to reduce stress." },
      { title: "Mindset", text: "Which thought makes your stress worse – and how can you reframe it?" }
    ]
  },

  relation: {
    sv: [
      { title: "Reflektion", text: "Vilken relation påverkar dig mest just nu?" },
      { title: "Handling", text: "Finns det ett samtal du behöver ta?" },
      { title: "Tankemönster", text: "Vilken roll tar du i relationer?" }
    ],
    en: [
      { title: "Reflection", text: "Which relationship affects you the most right now?" },
      { title: "Action", text: "Is there a conversation you need to have?" },
      { title: "Mindset", text: "What role do you take in relationships?" }
    ]
  },

  energi: {
    sv: [
      { title: "Reflektion", text: "När på dagen känner du mest energi?" },
      { title: "Handling", text: "Vad är en liten sak som ger dig mer energi?" },
      { title: "Tankemönster", text: "Vad säger du till dig själv när du är trött?" }
    ],
    en: [
      { title: "Reflection", text: "When during the day do you feel the most energy?" },
      { title: "Action", text: "What is one small thing that gives you more energy?" },
      { title: "Mindset", text: "What do you tell yourself when you're tired?" }
    ]
  },

  självkänsla: {
    sv: [
      { title: "Reflektion", text: "När tvivlar du mest på dig själv?" },
      { title: "Handling", text: "Skriv ner en sak du gjorde bra nyligen." },
      { title: "Tankemönster", text: "Hur skulle du prata med en vän i samma situation?" }
    ],
    en: [
      { title: "Reflection", text: "When do you doubt yourself the most?" },
      { title: "Action", text: "Write down one thing you did well recently." },
      { title: "Mindset", text: "How would you speak to a friend in your situation?" }
    ]
  },

  ekonomi: {
    sv: [
      { title: "Reflektion", text: "Vad i din ekonomi skapar mest oro?" },
      { title: "Handling", text: "Vilken liten ekonomisk handling kan du ta idag?" },
      { title: "Tankemönster", text: "Vilken tanke begränsar din ekonomiska utveckling?" }
    ],
    en: [
      { title: "Reflection", text: "What in your finances creates the most stress?" },
      { title: "Action", text: "What small financial action can you take today?" },
      { title: "Mindset", text: "What thought limits your financial growth?" }
    ]
  },

  utveckling: {
    sv: [
      { title: "Reflektion", text: "Vad vill du egentligen växa inom just nu?" },
      { title: "Handling", text: "Vilket litet steg kan du ta idag?" },
      { title: "Tankemönster", text: "Vad håller dig tillbaka mentalt?" }
    ],
    en: [
      { title: "Reflection", text: "What do you really want to grow in right now?" },
      { title: "Action", text: "What small step can you take today?" },
      { title: "Mindset", text: "What is holding you back mentally?" }
    ]
  }
};

// ===== SHOW CARD =====
function showCard() {
  if (!currentCategory) return;

  const list = exercises[currentCategory][currentLanguage];
  const current = list[currentIndex];

  titleEl.innerText = current.title;
  textEl.innerText = current.text;
  progressEl.innerText = `${currentIndex + 1} / ${list.length}`;

  inputEl.value = "";
  aiResponse.innerText = "";
  aiResponse.classList.add("hidden");
}

// ===== SELECT CATEGORY =====
function selectCategory(cat) {
  currentCategory = cat;
  currentIndex = 0;

  document.getElementById("exercise-card").classList.remove("hidden");

  showCard();
}

// ===== NEXT =====
function nextExercise() {
  if (!currentCategory) return;

  const list = exercises[currentCategory][currentLanguage];

  currentIndex++;

  if (currentIndex >= list.length) {
    currentIndex = list.length - 1;
  }

  showCard();
}

// ===== AI =====
window.send = async function () {
  const message = inputEl.value;

  if (!message) return;

  aiResponse.classList.remove("hidden");
  aiResponse.innerText = currentLanguage === "sv" ? "Tänker..." : "Thinking...";

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

    aiResponse.innerText = data.reply || (currentLanguage === "sv" ? "Inget svar." : "No response.");

    inputEl.value = "";

  } catch (err) {
    console.error(err);
    aiResponse.innerText = currentLanguage === "sv"
      ? "Något gick fel."
      : "Something went wrong.";
  }
};
updateCategoryButtons();
setLanguage(currentLanguage);
