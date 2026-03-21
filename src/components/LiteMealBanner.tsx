import { useNavigate } from "react-router-dom";

const LiteMealBanner = () => {

  const navigate = useNavigate();

  return (
    <div className="mb-10">

      <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-r from-black via-[#1a0d05] to-black text-white shadow-xl">

        {/* Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-orange-500/20 blur-3xl opacity-40"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* TEXT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              🔥 Bite Affair Lite Meal
            </h2>

            <p className="text-white/70 text-sm md:text-base">
              Build your own catering meal for 15–50 guests. ₹250 per person.
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/lite-meal")}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
          >
            Build Your Meal →
          </button>

        </div>

      </div>

    </div>
  );
};

export default LiteMealBanner;
