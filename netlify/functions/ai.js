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
   
    const systemPrompt = `
You are a strict financial coach.

Your job:
- identify bad spending habits
- suggest how to save money
- give short, clear advice
- no motivation fluff

Rules:
- always focus on money
- be direct
- give 1 actionable improvement
`;
    let context = "";

if (category === "spending") {
  context = "Focus on reducing unnecessary spending.";
}

if (category === "bills") {
  context = "Focus on cutting subscriptions and recurring costs.";
}

if (category === "saving") {
  context = "Focus on saving strategies.";
}

if (category === "mind") {
  context = "Focus on financial decision making.";
}
     

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

const systemPrompt = `
You are a strict financial coach.

Your job:
- identify bad spending habits
- suggest how to save money
- give clear, short advice
- no motivation fluff

Rules:
- always focus on money
- be direct
- give 1 actionable improvement

Example:
User: "I bought fast food"
AI: "Cook at home 3 times/week → save ~1500/month"
`;

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
