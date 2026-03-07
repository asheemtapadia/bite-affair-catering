import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import reel1 from "@/assets/reels/reel-1.jpg";
import reel2 from "@/assets/reels/reel-2.jpg";
import reel3 from "@/assets/reels/reel-3.jpg";
import reel4 from "@/assets/reels/reel-4.jpg";
import reel5 from "@/assets/reels/reel-5.jpg";

const reels = [
  { id: "DOYdNfDk_-9", thumb: reel1, label: "Party Feast Spread" },
  { id: "DRB54CLgSUP", thumb: reel2, label: "BBQ & Tikka Live" },
  { id: "DQrl0IeAW3Z", thumb: reel3, label: "Paneer Platter" },
  { id: "DSkXqmvDxyl", thumb: reel4, label: "Dessert Station" },
  { id: "DVK_f-ikt2i", thumb: reel5, label: "Catering Setup" },
];

const RealPartyMoments = () => {
  const [activeReel, setActiveReel] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 section-beige">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">
              Real Party Moments
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
              See how Bite Affair looks at real gatherings, celebrations and house parties.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {reels.map((reel) => (
              <button
                key={reel.id}
                onClick={() => setActiveReel(reel.id)}
                className="group flex-shrink-0 w-[200px] md:w-[240px] snap-start text-left"
              >
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-card border border-border shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <img
                    src={reel.thumb}
                    alt={reel.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="font-body text-xs text-primary-foreground/90 bg-foreground/40 backdrop-blur-sm px-2 py-1 rounded-md">
                      {reel.label}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <Dialog open={!!activeReel} onOpenChange={() => setActiveReel(null)}>
        <DialogContent className="max-w-[420px] p-0 overflow-hidden bg-black border-none [&>button]:hidden">
          <button
            onClick={() => setActiveReel(null)}
            className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-foreground/60 flex items-center justify-center text-primary-foreground hover:bg-foreground/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {activeReel && (
            <div className="aspect-[9/16] w-full">
              <iframe
                src={`https://www.instagram.com/reel/${activeReel}/embed/`}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RealPartyMoments;
