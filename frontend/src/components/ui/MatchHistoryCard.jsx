export default function MatchHistoryCard({ match }) {
  return (
    <div className={match.cardClassName}>
      <div className="flex items-center gap-10 w-full md:w-auto">
        <div className={match.avatarWrapperClassName}>
          <img
            src="/assets/personaje.jpeg"
            alt="Player"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div>
          <span className={match.resultClassName}>{match.result}</span>
          <span className="font-label text-[9px] text-on-background/50 uppercase tracking-widest">
            {match.queue}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-16">
        <div className="text-center">
          <span className={match.ratioClassName}>{match.ratio}</span>
          <span className="font-label text-[9px] text-on-background/40 tracking-[0.2em] uppercase">
            RATIO
          </span>
        </div>
        <div className="flex gap-2">
          <div className={match.itemsClassName}></div>
          <div className={match.itemsClassName}></div>
          <div className={match.itemsClassName}></div>
          <div className={match.itemsClassName}></div>
        </div>
      </div>
      <div className="text-right hidden md:block">
        <span className={match.lpClassName}>{match.lp}</span>
        <span className={match.tagClassName}>{match.tag}</span>
      </div>
    </div>
  );
}
