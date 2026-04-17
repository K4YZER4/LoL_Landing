import socialIconMap from "./socialIconMap";

export default function SocialLink({ label }) {
  return (
    <a
      href="#"
      className="group glass-panel px-8 py-4 flex items-center gap-3 transition-all hover:bg-white/30 hover:translate-y-[-2px]"
    >
      <span className="material-symbols-outlined text-on-background/80 text-xl group-hover:text-primary">
        {socialIconMap[label]}
      </span>
      <span className="font-label text-[9px] tracking-[0.3em] text-on-background uppercase">{label}</span>
    </a>
  );
}
