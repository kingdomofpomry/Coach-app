const chat = document.getElementById("chat");
const input = document.getElementById("input");

let conversationMemory = [];

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function quickStart(type) {
  let intro = "";

  switch (type) {
    case "stress":
      intro = "Jag känner mig stressad och överväldigad.";
      break;
    case "relation":
      intro = "Jag har funderingar kring en relation i mitt liv.";
      break;
    case "energi":
      intro = "Jag känner mig trött och saknar energi.";
      break;
    case "självkänsla":
      intro = "Jag vill jobba med min självkänsla.";
      break;
  }

  addMessage(intro, "user");
  respond(intro);
}

function analyzeEmotion(text) {
  const t = text.toLowerCase();

  if (t.includes("stress")) return "stress";
  if (t.includes("trött") || t.includes("energi")) return "energi";
  if (t.includes("relation")) return "relation";
  if (t.includes("självkänsla")) return "självkänsla";

  return "oklar";
}

function generateResponse(message) {
  const emotion = analyzeEmotion(message);

  switch (emotion) {
    case "stress":
      return "Tack för att du delar. Stress uppstår ofta när vi tar ansvar för mer än vi egentligen har utrymme för. Om du stannar upp ett ögonblick – vad är det som pressar dig mest just nu?";

    case "relation":
      return "Relationer kan väcka både längtan och frustration. Känns det som att du inte blir förstådd, eller handlar det mer om en inre konflikt hos dig själv?";

    case "energi":
      return "När energin är låg finns det ofta ett behov som inte blivit mött. Är det vila, glädje eller kanske gränser som saknas just nu?";

    case "självkänsla":
      return "Att vilja stärka sin självkänsla är ett modigt steg. När tvivlet kommer – vad brukar du säga till dig själv då?";

    default:
      return "Jag lyssnar. Vill du berätta lite mer om vad som pågår inom dig just nu?";
  }
}

function respond(message) {
  conversationMemory.push({ role: "user", content: message });

  const thinking = document.createElement("div");
  thinking.className = "message ai thinking";
  thinking.innerText = "AI tänker…";
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    thinking.remove();
    const reply = generateResponse(message);
    conversationMemory.push({ role: "ai", content: reply });
    addMessage(reply, "ai");
  }, 800);
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  respond(text);
}
