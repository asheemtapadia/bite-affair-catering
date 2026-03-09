import { useState } from "react";
import { Bot, X, Send } from "lucide-react";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I'm Bite Affair assistant. Ask me about catering packages, pricing, or availability."
    }
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (message: string) => {
    const text = message.toLowerCase();

    if (text.includes("price") || text.includes("cost"))
      return "Our catering packages start from ₹499 per person.";

    if (text.includes("guest"))
      return "We currently accept catering orders for 15–50 guests.";

    if (text.includes("location") || text.includes("deliver"))
      return "We deliver across Gurugram and major areas of Delhi NCR.";

    if (text.includes("menu"))
      return "You can explore our menu section on the website or message us on WhatsApp for the full menu.";

    return "You can ask about catering packages, menu options, pricing, or delivery availability.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const botMessage = { role: "bot", text: getBotReply(input) };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg"
      >
        {open ? <X size={22} /> : <Bot size={22} />}
      </button>

      {/* Chat Window */}
      {open && (
        <>
          {/* Click outside overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div className="fixed bottom-36 right-6 w-80 bg-white rounded-xl shadow-2xl border z-50 flex flex-col">

            {/* Header */}
            <div className="bg-primary text-white p-3 rounded-t-xl font-semibold">
              Bite Affair Assistant
            </div>

            {/* Messages */}
            <div className="p-3 h-72 overflow-y-auto text-sm space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "ml-auto bg-primary text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t">
              <input
                className="flex-1 p-2 text-sm outline-none"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                className="p-2 text-primary"
              >
                <Send size={18} />
              </button>
            </div>

          </div>
        </>
      )}
    </>
  );
};

export default AIChatbot;
