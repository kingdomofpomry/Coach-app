console.log("app.js laddad");

/* ====== STATE ====== */
let currentCategory = null;

/* ====== ELEMENT ====== */
const chatBox = document.createElement("div");
chatBox.id = "chatBox";
chatBox.style.width = "100%";
chatBox.style.maxWidth = "420px";
chatBox.style.marginTop = "20px";
chatBox.style.display = "flex";
chatBox.style.flexDirection = "column";
chatBox.style.gap = "12px";

document.querySelector(".app").appendChild(chatBox);

/* ====== HELPERS ====== */
function addBubble(text, from = "ai") {
  const bubble = document.createElement("div");
  bubble.style.padding = "14px";
  bubble.style.borderRadius = "16px";
  bubble.style.maxWidth = "90%";
  bubble.style.lineHeight = "1.4";
  bubble.style.fontSize = "15px";

  if (from === "user") {
    bubble.style.alignSelf = "flex-end";
    bubble.style.background = "#3b82f6";
    bubble.style.color = "white";
  } else {
    bubble.style.alignSelf = "flex-start";
    bubble.style.background = "rgba(255,255,255,0.15)";
    bubble.style.color = "white";
  }

  bubble.textContent = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ====== CATEGORY ====== */
function selectCategory(category) {
  currentCategory = category;

  chatBox.innerHTML = ""; // reset chat

  addBubble(`Jag vill ha hjälp med ${category}.`, "user");

  const responses = {
    stress: "Stress uppstår ofta när vi bär för mycket själva. Vad känns tyngst just nu?",
    relation: "Relationer speglar ofta våra behov. Vad saknar du mest i relationen?",
    energi: "Låg energi är en signal. Sover du, vilar du – eller kör du på för hårt?",
    självkänsla: "Självkänsla byggs av hur vi pratar med oss själva. Vad säger din inre röst?",
    ekonomi: "Ekonomi handlar om trygghet och val. Vad vill du förändra just nu?",
    utveckling: "Personlig utveckling börjar med riktning. Vem vill du bli?"
  };

  setTimeout(() => {
    addBubble(responses[category] || "Berätta mer.");
  }, 300);
}

/* ====== SEND TEXT ====== */
function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  addBubble(text, "user");
  input.value = "";

  setTimeout(() => {
    addBubble(
      "Tack för att du delar. Vill du ha en konkret övning eller en reflektion?",
      "ai"
    );
  }, 400);
}

/* ====== LANGUAGE BUTTONS (placeholder) ====== */
document.getElementById("lang-sv")?.addEventListener("click", () => {
  addBubble("Språk: Svenska", "ai");
});

document.getElementById("lang-en")?.addEventListener("click", () => {
  addBubble("Language switching comes later 🌍", "ai");
});
