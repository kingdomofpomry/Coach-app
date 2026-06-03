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

  updateUIText();

  if (currentCategory) {
    showCard();
  }

}
function updateUIText() {
  const input = document.getElementById("input");
  const sendBtn = document.querySelector('button[onclick="send()"]');
  const nextBtn = document.querySelector('button[onclick="nextExercise()"]');

  if (currentLanguage === "sv") {
    input.placeholder = "Skriv din reflektion...";
    sendBtn.innerText = "Få AI-reflektion";
    nextBtn.innerText = "Nästa övning";
  } else {
    input.placeholder = "Write your reflection...";
    sendBtn.innerText = "Get AI insight";
    nextBtn.innerText = "Next exercise";
  }
}

function updateCategoryButtons() {
  
const performance = document.getElementById("cat-performance");
  
  if (currentLanguage === "sv") {

    document.getElementById("cat-finance").innerText = "💰 Ekonomi";
    document.getElementById("cat-bills").innerText = "📄 Räkningar";
    document.getElementById("cat-spending").innerText = "💳 Utgifter";
    document.getElementById("cat-save").innerText = "📈 Sparande";
    document.getElementById("cat-decisions").innerText = "🎯 Beslut";
    performance.innerText = "🧠 Prestation";

  } else {

    document.getElementById("cat-finance").innerText = "💰 Finance";
    document.getElementById("cat-bills").innerText = "📄 Bills";
    document.getElementById("cat-spending").innerText = "💳 Spending";
    document.getElementById("cat-save").innerText = "📈 Save";
    document.getElementById("cat-decisions").innerText = "🎯 Decisions";
    performance.innerText = "🧠 Performance";

  }

}

// ===== DATA =====
const exercises = {
  bills: {
  sv: [
    { title: "Räkningar", text: "Har du abonnemang du inte använder?" }
  ],
  en: [
    { title: "Bills", text: "Do you have subscriptions you don’t use?" }
  ]
},

spending: {
  sv: [
    { title: "Utgifter", text: "Vad spenderade du pengar på idag?" }
  ],
  en: [
    { title: "Spending", text: "What did you spend money on today?" }
  ]
},

saving: {
  sv: [
    { title: "Spara", text: "Vad kunde du ha sparat idag?" }
  ],
  en: [
    { title: "Saving", text: "What could you have saved today?" }
  ]
},
  
performance: {

  sv: [
    {
      title: "Fokus",
      text: "Vad tog mest energi från dig idag?"
    },
    {
      title: "Mental klarhet",
      text: "När tänkte du som klarast idag?"
    }
  ],

  en: [
    {
      title: "Focus",
      text: "What drained the most energy from you today?"
    },
    {
      title: "Mental clarity",
      text: "When did you think most clearly today?"
    }
  ]

},
  
mind: {
  sv: [
    { title: "Beslut", text: "Tog du ett smart ekonomiskt beslut idag?" }
  ],
  en: [
    { title: "Decisions", text: "Did you make a smart financial decision today?" }
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
saveAnswer(message);
  updateLastAnswerUI();
  updateStreakUI();
  const streak = getStreak();

if (streak > 1) {
  aiResponse.innerText = currentLanguage === "sv"
    ? `🔥 Du är på ${streak} dagar i rad! Fortsätt så!`
    : `🔥 You're on a ${streak} day streak! Keep going!`;

  aiResponse.classList.remove("hidden");
}
  
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
};function enableReminders() {
  alert(
    currentLanguage === "sv"
      ? "Påminnelser är aktiva så länge appen är öppen"
      : "Reminders are active while the app is open"
  );
}

function scheduleDaily() {
  const time = prompt(
    currentLanguage === "sv"
      ? "Vilken tid vill du ha påminnelse? (HH:MM)"
      : "What time do you want a reminder? (HH:MM)"
  );

  if (!time) return;

  localStorage.setItem("reminderTime", time);

  alert(
    currentLanguage === "sv"
      ? "Påminnelse sparad!"
      : "Reminder saved!"
  );
}
setLanguage(currentLanguage);
let lastTriggered = null;

setInterval(() => {
  const saved = localStorage.getItem("reminderTime");
  if (!saved) return;

  const now = new Date();
  const current = now.toTimeString().slice(0, 5);

  if (current === saved && lastTriggered !== current) {
    lastTriggered = current;

    alert(
      currentLanguage === "sv"
        ? "Dags för din dagliga check-in 💡"
        : "Time for your daily check-in 💡"
    );
  }
}, 60000);
// ===== SAVE USER ANSWER =====
function saveAnswer(text) {
  const today = new Date().toISOString().split("T")[0];

  const data = JSON.parse(localStorage.getItem("answers") || "{}");

  data[today] = text;

  localStorage.setItem("answers", JSON.stringify(data));
}


// ===== GET LAST ANSWER =====
function getLastAnswer() {
  const data = JSON.parse(localStorage.getItem("answers") || "{}");

  const dates = Object.keys(data).sort().reverse();

  return dates.length ? data[dates[0]] : null;
}


// ===== STREAK SYSTEM =====
function getStreak() {
  const data = JSON.parse(localStorage.getItem("answers") || "{}");

  let streak = 0;
  let date = new Date();

  while (true) {
    const key = date.toISOString().split("T")[0];

    if (data[key]) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
console.log("Last answer:", getLastAnswer());
console.log("Streak:", getStreak());
function updateStreakUI() {
  const el = document.getElementById("streak");
  if (!el) return;

  const streak = getStreak();

  if (streak === 0) {
    el.innerText = currentLanguage === "sv"
      ? "Starta din streak idag 💡"
      : "Start your streak today 💡";
    return;
  }

  el.innerText = currentLanguage === "sv"
    ? `🔥 ${streak} dagar i rad`
    : `🔥 ${streak} day streak`;
}
function updateLastAnswerUI() {
  const el = document.getElementById("last-answer");
  if (!el) return;

  const last = getLastAnswer();

  if (!last) {
    el.classList.add("hidden");
    return;
  }

  el.classList.remove("hidden");

  el.innerText = currentLanguage === "sv"
    ? `🧠 Senaste reflektion:\n${last}`
    : `🧠 Last reflection:\n${last}`;
}

