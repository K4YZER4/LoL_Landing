import ChampionSlot from "../ui/ChampionSlot";

export default function ArsenalSection() {
  return (
    <section className="relative z-20 content-section py-32 px-6">
      <video className="background-video" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <img className="foreground-gif" src="/assets/pinkFlowers.gif" alt="Pink Flowers" />
      <div className="color-shift-overlay"></div>
      <div className="max-w-6xl mx-auto">
        <div className="mb-24">
          <h2 className="font-headline text-4xl font-light uppercase tracking-[0.2em] mb-4 text-on-background">
            POOL OF CHAMPIONS AND ROLES
          </h2>
          <p className="font-label text-[10px] text-on-background/60 tracking-[0.4em] uppercase"></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="glass-panel p-10">
            <h3 className="font-label text-[9px] tracking-[0.4em] text-on-background/60 block mb-8 uppercase">
              ROLES
            </h3>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <span className="font-label text-[9px] tracking-[0.4em] text-on-background/60 uppercase">
                  Primary Role
                </span>
              </div>
              <span className="font-headline text-xl font-light text-on-surface">ADC // 68% WR</span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">hub</span>
                <span className="font-label text-[9px] tracking-[0.4em] text-on-background/60 uppercase">
                  Secondary Role
                </span>
              </div>
              <span className="font-headline text-xl font-light text-on-surface">Mid Lane // 32% WR</span>
            </div>
          </div>

          <div>
            <h3 className="font-label text-[9px] tracking-[0.4em] text-on-background/60 block mb-8 uppercase">
              Champions
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <ChampionSlot key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
