export default function CurrentElo() {
  return (
    <section className="relative z-20 content-section py-32 px-6">
      <video className="background-video" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <img
        className="foreground-gif"
        src="/assets/pinkFlowers.gif"
        alt="Pink Flowers"
      />
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
          {/* Efficiency Card */}
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

          {/* Solo Duo Card */}
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
              <span className="material-symbols-outlined text-primary text-3xl">
                flare
              </span>
            </div>
          </div>

          {/* Flex Card */}
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
              <span className="material-symbols-outlined text-on-background/30 text-3xl">
                all_inclusive
              </span>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-label text-[9px] tracking-[0.5em] text-on-background/40 uppercase">
              History
            </span>
            <div className="flex-1 h-[1px] bg-on-background/10"></div>
          </div>

          {/* Ranking Cards */}
          <div className="ranking-card glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/5 border-white/40 mb-12 ranking-card-frame">
            <div className="flex items-center gap-10 w-full md:w-auto">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/40 bg-white/10">
                <img
                  src="/assets/personaje.jpeg"
                  alt="Player"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div>
                <span className="block font-headline text-xl font-light text-on-surface uppercase tracking-widest">
                  VICTORY
                </span>
                <span className="font-label text-[9px] text-on-background/50 uppercase tracking-widest">
                  RANKED SOLO // 24:12
                </span>
              </div>
            </div>
            <div className="flex items-center gap-16">
              <div className="text-center">
                <span className="block font-headline text-2xl font-light text-on-surface tracking-tighter">
                  14 / 2 / 8
                </span>
                <span className="font-label text-[9px] text-on-background/40 tracking-[0.2em] uppercase">
                  RATIO
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-7 h-7 bg-white/30 border border-white/50"></div>
                <div className="w-7 h-7 bg-white/30 border border-white/50"></div>
                <div className="w-7 h-7 bg-white/30 border border-white/50"></div>
                <div className="w-7 h-7 bg-white/30 border border-white/50"></div>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <span className="block font-label text-[10px] text-on-background/60 mb-1">
                +22 LP
              </span>
              <span className="font-label text-[9px] text-primary font-bold uppercase tracking-widest">
                PEAK
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
