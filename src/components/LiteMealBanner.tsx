import { useNavigate } from "react-router-dom";

const LiteMealBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a120b] via-[#2b1d14] to-black opacity-95" />

      {/* SOFT ORANGE GLOW */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />

      {/* CONTENT */}
      <div className="relative p-6">

        <h2 className="text-2xl font-semibold text-white mb-2 leading-snug">
          🔥 Bite Affair Lite Box
        </h2>

        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Build your own catering box for 15–50 guests.
          <br />
          <span className="text-orange-400 font-medium">₹250 per person</span>
        </p>

        <button
          onClick={() => navigate("/lite-meal")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition"
        >
          Build Your Box →
        </button>

      </div>
    </div>
  );
};

export default LiteMealBanner;
