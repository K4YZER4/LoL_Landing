export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden hero-section">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        <div className="text-center">
          <h1 className="font-black tracking-[0.2em] leading-none opacity-100 uppercase font-headline select-none hero-title-outline">
            ØRBIT#0B1T
          </h1>
        </div>
        <div className="w-full flex justify-end max-w-7xl absolute -top-24" style={{ right: "-100px" }}>
          <div className="glass-panel px-8 py-4 flex items-center gap-6">
            <span className="font-label text-[12px] tracking-widest text-on-background/70">LEVEL</span>
            <span className="font-headline font-light text-5xl text-on-background">724 .-.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
