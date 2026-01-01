async function send() {
  const input = document.getElementById("input");
  const responseDiv = document.getElementById("response");

  if (!input.value.trim()) {
    responseDiv.innerText = "Skriv något först 🌱";
    return;
  }

  responseDiv.innerText = "Tänker…";

  try {
    const res = await fetch("/.netlify/functions/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input.value })
    });

    const data = await res.json();
    responseDiv.innerText =
      data.reply || "Jag är här 🌱 Vill du formulera det lite annorlunda?";
  } catch {
    responseDiv.innerText =
      "Jag tappade kontakten en stund 🌧️ Försök igen snart.";
  }
}
