export default function ChampionSlot() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/40 bg-white/10 mb-3">
        <img src="/assets/personaje.jpeg" alt="Champion" className="w-full h-full object-cover" />
      </div>
      <span className="font-label text-[9px] text-on-background/60 uppercase text-center">Champion</span>
    </div>
  );
}
