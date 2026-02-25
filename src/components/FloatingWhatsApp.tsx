import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919211570030"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default FloatingWhatsApp;
