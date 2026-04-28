exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Only POST allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const message = body.message;
    const category = body.category || "general";
    const language = body.language || "sv";

    if (!message) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: language === "en"
            ? "Write something first 💬"
            : "Skriv något först 💬"
        })
      };
    }

    const systemPrompt =
      language === "en"
        ? "You are a high-performance coach. Give short, sharp, practical insights that improve thinking, focus and decision-making."
        : "Du är en high-performance coach. Ge korta, konkreta och kraftfulla insikter som förbättrar fokus, tänkande och beslut.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Kategori: ${category}\nSvar: ${message}`
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 visa fel direkt istället för fake svar
    if (!data.choices) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: "API ERROR: " + JSON.stringify(data)
        })
      };
    }

    const reply = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "Server error – prova igen."
      })
    };
  }
};
