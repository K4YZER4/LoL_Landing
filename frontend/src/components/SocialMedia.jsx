export default function SocialMedia() {
  const socialLinks = [
    { name: 'Twitter', icon: 'twitter' },
    { name: 'Instagram', icon: 'instagram' },
    { name: 'Discord', icon: 'discord' },
    { name: 'YouTube', icon: 'youtube' },
    { name: 'LinkedIn', icon: 'linkedin' },
  ];

  return (
    <section className="relative z-20 py-48 px-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-headline text-4xl font-light uppercase tracking-[0.2em] mb-2 text-on-background">
            Connect
          </h2>
          <p className="font-label text-[10px] text-on-background/60 tracking-[0.4em] uppercase">
            STAY UPDATED WITH MY JOURNEY
          </p>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex flex-wrap gap-6 items-center mb-16">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href="#"
              className="group glass-panel px-8 py-4 flex items-center gap-3 transition-all hover:bg-white/30 hover:translate-y-[-2px]"
            >
              <span className="material-symbols-outlined text-on-background/80 text-xl group-hover:text-primary">
                share
              </span>
              <span className="font-label text-[9px] tracking-[0.3em] text-on-background uppercase">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* Kaneki Image - Bottom Left */}
        <div className="mt-16">
          <img 
            src="/assets/kanekiSinFondo1.png" 
            alt="Kaneki Character" 
            className="w-56 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
