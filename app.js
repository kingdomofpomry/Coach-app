function send() {
  const input = document.getElementById("input").value;
  const responseDiv = document.getElementById("response");

  if (!input.trim()) {
    responseDiv.innerHTML = "<p>Skriv något först 🌱</p>";
    return;
  }

  // Grundläggande AI-liknande svar (safe mode)
  const reply = `
    <p><strong>Reflektion:</strong></p>
    <p>Stanna upp. Andas.</p>
    <p>Fundera på:</p>
    <ul>
      <li>Vad är viktigast just nu?</li>
      <li>Vad är ett lugnt och snällt nästa steg?</li>
      <li>Använd sunt förnuft.</li>
    </ul>
  `;

  responseDiv.innerHTML = reply;

  // Spara lokalt (PWA-vänligt)
  localStorage.setItem("lastInput", input);
}
