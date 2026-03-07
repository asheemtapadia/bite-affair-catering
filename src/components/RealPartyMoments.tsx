import ScrollReveal from "@/components/ScrollReveal";
import { Play } from "lucide-react";

const reels = [
  { id: "DOYdNfDk_-9", url: "https://www.instagram.com/reel/DOYdNfDk_-9/" },
  { id: "DRB54CLgSUP", url: "https://www.instagram.com/reel/DRB54CLgSUP/" },
  { id: "DQrl0IeAW3Z", url: "https://www.instagram.com/reel/DQrl0IeAW3Z/" },
  { id: "DSkXqmvDxyl", url: "https://www.instagram.com/reel/DSkXqmvDxyl/" },
  { id: "DVK_f-ikt2i", url: "https://www.instagram.com/reel/DVK_f-ikt2i/" },
];

const RealPartyMoments = () => {
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
              <a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-[200px] md:w-[240px] snap-start"
              >
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-card border border-border shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  {/* Thumbnail via Instagram embed image */}
                  <img
                    src={`https://www.instagram.com/reel/${reel.id}/media/?size=l`}
                    alt="Bite Affair party moment"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Gradient fallback / overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  {/* Bottom label */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="font-body text-xs text-primary-foreground/90 bg-foreground/40 backdrop-blur-sm px-2 py-1 rounded-md">
                      Watch on Instagram
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RealPartyMoments;
