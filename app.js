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

function analyzeEmotion(text) {
  const t = text.toLowerCase();

  if (t.includes("stress") || t.includes("press")) return "stress";
  if (t.includes("trött") || t.includes("utmatt")) return "trötthet";
  if (t.includes("ledsen") || t.includes("ensam")) return "sorg";
  if (t.includes("relation")) return "relation";
  if (t.includes("rädd") || t.includes("oro")) return "oro";

  return "oklar";
}

function generatePersonalResponse(message) {
  const emotion = analyzeEmotion(message);
  conversationMemory.push({ role: "user", content: message });

  switch (emotion) {
    case "stress":
      return "Jag hör att stressen tar mycket plats hos dig just nu. Ofta handlar stress inte om att vi är svaga, utan om att vi har burit för mycket för länge. Om du stannar upp ett ögonblick – vad är det som just nu känns mest tungt att bära?";

    case "trötthet":
      return "Trötthet kan vara ett tecken på att något inom dig behöver vila, inte fler lösningar. Är det kroppen som är trött, eller är det snarare själen som längtar efter paus?";

    case "sorg":
      return "Det låter som att något berör dig på djupet. Du behöver inte ha alla svar nu. Vill du berätta vad som gjorde att den här känslan kom upp just idag?";

    case "relation":
      return "Relationer väcker ofta starka känslor eftersom de betyder något. Känns det som att du inte riktigt blir mött, eller är det något du inte vågat säga högt än?";

    case "oro":
      return "Oro vill ofta skydda oss, men kan ibland ta över. Är det något konkret du oroar dig för, eller mer en diffus känsla som ligger i bakgrunden?";

    default:
      return "Tack för att du delar. Om du lyssnar inåt just nu – vilken känsla är starkast i dig i detta ögonblick?";
  }
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const thinking = document.createElement("div");
  thinking.className = "message ai thinking";
  thinking.innerText = "AI tänker…";
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    thinking.remove();
    const reply = generatePersonalResponse(text);
    conversationMemory.push({ role: "ai", content: reply });
    addMessage(reply, "ai");
  }, 900);
}
