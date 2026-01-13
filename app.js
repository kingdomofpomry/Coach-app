console.log("app.js laddad");

/* =========================
   DATA – ÖVNINGAR
========================= */
const exercises = {
  stress: [
    {
      title: "Reflektion",
      text: "Vad är den största källan till stress i ditt liv just nu?"
    },
    {
      title: "Handling",
      text: "Skriv ner EN sak du kan göra idag för att minska stressen, även om den är liten."
    },
    {
      title: "Tankemönster",
      text: "Vilken tanke gör stressen värre – och hur kan du formulera den mer vänligt?"
    }
  ],
  ekonomi: [
    {
      title: "Reflektion",
      text: "Vad i din ekonomi skapar mest oro just nu?"
    },
    {
      title: "Handling",
      text: "Skriv ner en konkret åtgärd du kan ta denna vecka för mer ekonomisk trygghet."
    },
    {
      title: "Tankemönster",
      text: "Vilken begränsande tanke har du kring pengar – och vad vore en mer stärkande tanke?"
    }
  ],
  energi: [
    {
      title: "Reflektion",
      text: "När på dagen känner du dig mest dränerad?"
    },
    {
      title: "Handling",
      text: "Vad är EN sak du kan göra imorgon för att ge dig mer energi?"
    },
    {
      title: "Tankemönster",
      text: "Vad säger du till dig själv när du är trött – hjälper det dig?"
    }
  ],
  relation: [
    {
      title: "Reflektion",
      text: "Vilken relation upptar mest av dina tankar just nu?"
    },
    {
      title: "Handling",
      text: "Finns det ett ärligt samtal eller en gräns som behöver sättas?"
    },
    {
      title: "Tankemönster",
      text: "Vilken roll tar du oftast i relationer – och vill du fortsätta så?"
    }
  ],
  självkänsla: [
    {
      title: "Reflektion",
      text: "När tvivlar du som mest på dig själv?"
    },
    {
      title: "Handling",
      text: "Skriv ner en handling som stärker din självkänsla idag."
    },
    {
      title: "Tankemönster",
      text: "Hur skulle du prata med en vän i samma situation?"
    }
  ],
  utveckling: [
    {
      title: "Reflektion",
      text: "Vad vill du egentligen växa inom just nu?"
    },
    {
      title: "Handling",
      text: "Vilket litet steg kan du ta denna vecka?"
    },
    {
      title: "Tankemönster",
      text: "Vad håller dig tillbaka – rädsla eller vana?"
    }
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
const input = document.getElementById("input");
const chat = document.querySelector(".chat");

/* =========================
   CATEGORY
========================= */
function selectCategory(category) {
  currentCategory = category;
  currentStep = 0;

  addBotMessage(
    exercises[category][0].title,
    exercises[category][0].text
  );

  showNextButton();
}

/* =========================
   SEND TEXT
========================= */
function send() {
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";
}

/* =========================
   NEXT EXERCISE
========================= */
function nextExercise() {
  if (!currentCategory) return;

  currentStep++;

  const steps = exercises[currentCategory];

  if (currentStep < steps.length) {
    addBotMessage(
      steps[currentStep].title,
      steps[currentStep].text
    );
  } else {
    addBotMessage(
      "Avslut",
      "Bra jobbat. Vill du fortsätta med en ny kategori eller repetera denna?"
    );
    hideNextButton();
  }
}

/* =========================
   UI HELPERS
========================= */
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "user-msg";
  div.textContent = text;
  chat.appendChild(div);
}

function addBotMessage(title, text) {
  const div = document.createElement("div");
  div.className = "bot-msg";
  div.innerHTML = `<strong>${title}</strong><br>${text}`;
  chat.appendChild(div);
}

function showNextButton() {
  let btn = document.getElementById("next-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "next-btn";
    btn.textContent = "Nästa övning";
    btn.onclick = nextExercise;
    btn.style.marginTop = "12px";
    chat.appendChild(btn);
  }
}

function hideNextButton() {
  const btn = document.getElementById("next-btn");
  if (btn) btn.remove();
}

/* =========================
   LANGUAGE (placeholder)
========================= */
document.getElementById("lang-sv")?.addEventListener("click", () => {
  alert("Svenska valt");
});
document.getElementById("lang-en")?.addEventListener("click", () => {
  alert("English coming soon");
});
function enableReminders() {
  if (!("Notification" in window)) {
    alert("Påminnelser stöds inte i denna webbläsare.");
    return;
  }

  Notification.requestPermission().then(p => {
    if (p === "granted") {
      alert("Påminnelser aktiverade ✅");
      localStorage.setItem("reminders", "on");
    }
  });
}

function scheduleDaily() {
  if (Notification.permission !== "granted") {
    alert("Aktivera påminnelser först");
    return;
  }

  localStorage.setItem("dailyReminder", "20:00");
  alert("Daglig påminnelse satt kl 20:00");
}

// KÖRS AUTOMATISKT
setInterval(() => {
  const time = localStorage.getItem("dailyReminder");
  if (!time) return;

  const now = new Date();
  const current = now.toTimeString().slice(0,5);

  if (current === time && !window._notified) {
    new Notification("Din Coach", {
      body: "Dags för dagens övning ✨"
    });
    window._notified = true;
    setTimeout(()=>window._notified=false, 60000);
  }
}, 30000);
