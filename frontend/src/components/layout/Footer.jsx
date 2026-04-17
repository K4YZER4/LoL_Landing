export default function Footer() {
  return (
    <>
      <footer className="w-full py-12 bg-[#d6cfe1]/30 border-t border-white/20">
        <div className="px-12 max-w-7xl mx-auto flex flex-col items-center">
          <p className="font-['Space_Grotesk'] text-[9px] uppercase tracking-[0.5em] text-on-background/40">
            © 2026 ØRBIT PROJECT.
          </p>
        </div>
      </footer>

      <button className="fixed bottom-12 right-12 z-50 group">
        <div className="relative glass-panel p-5 transition-all duration-500 group-hover:translate-y-[-5px] active:scale-95 flex items-center justify-center rounded-full bg-white/20">
          <span className="material-symbols-outlined text-on-background/80 text-xl">bubble_chart</span>
          <span className="absolute right-full mr-6 glass-panel px-4 py-1.5 font-label text-[9px] tracking-[0.4em] text-on-background/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">
            Dissolve
          </span>
        </div>
        <div className="absolute -z-10 inset-0 bg-primary/20 blur-2xl scale-0 group-hover:scale-150 transition-transform rounded-full"></div>
      </button>
    </>
  );
}
