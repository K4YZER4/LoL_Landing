import MatchHistoryCard from "../ui/MatchHistoryCard";
import historyMatches from "../data/historyMatches";

export default function CurrentEloSection() {
  return (
    <section className="relative z-20 content-section py-32 px-6">
      <video className="background-video" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <img className="foreground-gif" src="/assets/pinkFlowers.gif" alt="Pink Flowers" />
      <div className="color-shift-overlay"></div>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-6">
          <div>
            <h2 className="font-headline text-4xl font-light uppercase tracking-[0.2em] mb-4 text-on-background">
              Current Elo
            </h2>
            <p className="font-label text-[10px] text-on-background/60 tracking-[0.4em] uppercase"></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="glass-panel p-10 relative group transition-all hover:bg-white/40">
            <span className="font-label text-[9px] tracking-[0.4em] text-on-background/60 block mb-8 uppercase">
              Efficiency
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-6xl font-light text-on-surface">64</span>
              <span className="font-headline text-xl font-light text-on-surface/50">%</span>
            </div>
            <div className="mt-8 h-[1px] w-full bg-on-background/10 overflow-hidden">
              <div className="h-full bg-primary/80 w-[64%]"></div>
            </div>
          </div>

          <div className="glass-panel p-10 relative group transition-all hover:bg-white/40 border-t-2 border-primary/40">
            <span className="font-label text-[9px] tracking-[0.4em] text-on-background/60 block mb-8 uppercase">
              SOLO DUO
            </span>
            <div className="flex flex-col">
              <span className="font-headline text-3xl font-light text-on-surface uppercase tracking-wider">
                DIAMANTE 1
              </span>
              <span className="font-label text-[10px] text-on-background/50 tracking-[0.2em] mt-2 uppercase">
                90 LP
              </span>
            </div>
            <div className="absolute top-10 right-10">
              <span className="material-symbols-outlined text-primary text-3xl">flare</span>
            </div>
          </div>

          <div className="glass-panel p-10 relative group transition-all hover:bg-white/40">
            <span className="font-label text-[9px] tracking-[0.4em] text-on-background/60 block mb-8 uppercase">
              FLEX
            </span>
            <div className="flex flex-col">
              <span className="font-headline text-3xl font-light text-on-surface uppercase tracking-wider">
                MASTER
              </span>
              <span className="font-label text-[10px] text-on-background/50 tracking-[0.2em] mt-2 uppercase">
                150 LP
              </span>
            </div>
            <div className="absolute top-10 right-10">
              <span className="material-symbols-outlined text-on-background/30 text-3xl">all_inclusive</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-label text-[9px] tracking-[0.5em] text-on-background/40 uppercase">History</span>
            <div className="flex-1 h-[1px] bg-on-background/10"></div>
          </div>

          {historyMatches.map((match) => (
            <MatchHistoryCard key={`${match.queue}-${match.ratio}`} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}
