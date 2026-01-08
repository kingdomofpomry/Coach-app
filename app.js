const app = document.getElementById("app");

app.innerHTML = `
  <div style="padding:20px; color:white; font-family:Arial">
    <h1>Din Coach</h1>
    <p>Om du ser detta fungerar JavaScript.</p>

    <button onclick="alert('Stress klickad')">Stress</button>
    <button onclick="alert('Ekonomi klickad')">Ekonomi</button>
  </div>
`;

document.body.style.background =
  "linear-gradient(135deg, #0b1020, #121c3a)";
