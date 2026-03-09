let lastRequestTime = 0;

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Simple rate limit (1 request every 2 seconds)
  const now = Date.now();

  if (now - lastRequestTime < 2000) {
    return res.status(429).json({
      reply: "Please wait a moment before sending another message."
    });
  }

  lastRequestTime = now;

  const { message } = req.body;

  try {

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
            content:
              "You are the Bite Affair catering assistant. Help users with catering packages, pricing, menu options, guest limits (15–50 people), and delivery in Gurugram and Delhi NCR."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Sorry, I couldn't respond."
    });

  } catch (error) {

    res.status(500).json({
      reply: "AI assistant is not available right now."
    });

  }
}
