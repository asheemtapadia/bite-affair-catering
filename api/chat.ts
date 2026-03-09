export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  // If API key not added yet
  if (!OPENAI_API_KEY) {
    return res.status(200).json({
      reply: "AI assistant is not connected yet. The Bite Affair team will enable it soon."
    });
  }

  try {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are the AI assistant for Bite Affair catering service.

Important information about Bite Affair:
- Catering service based in Gurugram
- Serves Delhi NCR
- Orders for 15 to 50 guests
- Packages start around ₹499 per person
- Veg and Non-veg catering available
- Orders placed mainly through WhatsApp

Be polite, short, and helpful.
`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, something went wrong.";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply: "Server error while contacting AI."
    });
  }

}
