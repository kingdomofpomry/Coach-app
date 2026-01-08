const chat = document.getElementById("chat");
const input = document.getElementById("input");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function fakeAIResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("stress")) {
    return "Det låter som att du bär mycket just nu. Stress är ofta ett tecken på att något inom oss behöver uppmärksamhet, inte pressas bort. Vad i ditt liv känns mest överväldigande i detta ögonblick?";
  }

  if (msg.includes("trött")) {
    return "Trötthet kan vara både fysisk och emotionell. Har du gett dig själv tillräckligt med återhämtning, eller har du burit mer ansvar än vad som är rimligt för dig?";
  }

  if (msg.includes("relation")) {
    return "Relationer speglar ofta våra innersta behov. Känns det som att du ger mer än du får, eller är det något osagt som ligger kvar mellan er?";
  }

  return "Tack för att du delar. Ta ett andetag och känn efter – vad är det viktigaste du behöver just nu för att må lite lättare i dig själv?";
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
    const reply = fakeAIResponse(text);
    addMessage(reply, "ai");
  }, 900);
}
