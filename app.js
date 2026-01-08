const app = document.getElementById("app");

let currentCategory = null;

/* ===== DATA ===== */

const categories = {
  stress: {
    title: "Stress",
    intro: "Stress påverkar både kropp och sinne. Vad vill du fokusera på?",
    options: [
      "😮‍💨 Minska vardagsstress",
      "🛑 Sätta gränser",
      "🧘 Återhämtning",
      "🧠 Tankemönster"
    ]
  },
  relation: {
    title: "Relation",
    intro: "Relationer speglar både behov och gränser.",
    options: [
      "❤️ Kommunikation",
      "💔 Konflikter",
      "🤍 Självrespekt",
      "🧠 Relationsmönster"
    ]
  },
  energi: {
    title: "Energi",
    intro: "Energi handlar om balans mellan vila och riktning.",
    options: [
      "⚡ Mer ork",
      "🌙 Sömn & vila",
      "🔥 Motivation",
      "🧠 Inre blockeringar"
    ]
  },
  självkänsla: {
    title: "Självkänsla",
    intro: "Självkänsla påverkar hur du ser på dig själv.",
    options: [
      "🌱 Självacceptans",
      "🛡 Trygghet",
      "🗣 Inre dialog",
      "🧠 Självbild"
    ]
  },
  ekonomi: {
    title: "Ekonomi",
    intro: "Ekonomi handlar om trygghet och val.",
    options: [
      "💰 Spara pengar",
      "📉 Minska ekonomisk stress",
      "📈 Bygga trygg framtid",
      "🧠 Tankar kring pengar"
    ]
  },
  utveckling: {
    title: "Personlig utveckling",
    intro: "Utveckling börjar med medvetna val.",
    options: [
      "🎯 Mål & riktning",
      "🧠 Vanor",
      "🔥 Motivation",
      "🌱 Personlig växt"
    ]
  }
};

/* ===== VIEWS ===== */

function renderHome() {
  currentCategory = null;

  app.innerHTML = `
    <div class="container">
      <h1>Din Coach</h1>
      <p>Välj område och få vägledning.</p>

      <div class="grid">
        ${Object.keys(categories).map(key => `
          <button class="btn" onclick="openCategory('${key}')">
            ${categories[key].title}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function openCategory(key) {
  currentCategory = key;
  const cat = categories[key];

  app.innerHTML = `
    <div class="container">
      <h2>${cat.title}</h2>
      <p>${cat.intro}</p>

      <div class="grid">
        ${cat.options.map(option => `
          <button class="btn" onclick="openGuidance('${option}')">
            ${option}
          </button>
        `).join("")}
      </div>

      <button class="btn secondary" onclick="renderHome()">⬅ Tillbaka</button>
    </div>
  `;
}

function openGuidance(choice) {
  app.innerHTML = `
    <div class="container">
      <h2>${choice}</h2>

      <textarea id="userInput" placeholder="Beskriv din situation..."></textarea>

      <button class="btn" onclick="showGuidance()">Få vägledning</button>

      <button class="btn secondary" onclick="openCategory('${currentCategory}')">
        ⬅ Tillbaka
      </button>
    </div>
  `;
}

function showGuidance() {
  const text = document.getElementById("userInput").value;

  app.innerHTML += `
    <div class="response">
      Tack för att du delar. Reflektion skapar förändring.
    </div>
  `;
}

/* ===== START ===== */
renderHome();
