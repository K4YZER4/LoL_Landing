export default function ChampionsAndRoles() {
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
        <div className="mb-24">
          <h2 className="font-headline text-4xl font-light uppercase tracking-[0.2em] mb-4 text-on-background">
            POOL OF CHAMPIONS AND ROLES
          </h2>
          <p className="font-label text-[10px] text-on-background/60 tracking-[0.4em] uppercase"></p>
        </div>

        {/* NEURAL PATHWAYS / LANES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="glass-panel p-10">
            <h3 className="font-label text-[9px] tracking-[0.4em] text-on-background/60 block mb-8 uppercase">
              ROLES
            </h3>

            {/* PRIMARY MODE */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">
                  location_on
                </span>
                <span className="font-label text-[9px] tracking-[0.4em] text-on-background/60 uppercase">
                  Primary Role
                </span>
              </div>
              <span className="font-headline text-xl font-light text-on-surface">
                ADC // 68% WR
              </span>
            </div>

            {/* SECONDARY MODE */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">
                  hub
                </span>
                <span className="font-label text-[9px] tracking-[0.4em] text-on-background/60 uppercase">
                  Secondary Role
                </span>
              </div>
              <span className="font-headline text-xl font-light text-on-surface">
                Mid Lane // 32% WR
              </span>
            </div>
          </div>

          {/* HIGH RESONANCE CHAMPIONS */}
          <div>
            <h3 className="font-label text-[9px] tracking-[0.4em] text-on-background/60 block mb-8 uppercase">
              Champions
            </h3>

            {/* CHAMPION SLOTS */}
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/40 bg-white/10 mb-3">
                    <img
                      src="/assets/personaje.jpeg"
                      alt="Champion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-label text-[9px] text-on-background/60 uppercase text-center">
                    Champion
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
