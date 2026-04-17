import { useEffect } from "react";

function MatchHistoryCard({ match }) {
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

function ChampionSlot() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/40 bg-white/10 mb-3">
        <img src="/assets/personaje.jpeg" alt="Champion" className="w-full h-full object-cover" />
      </div>
      <span className="font-label text-[9px] text-on-background/60 uppercase text-center">Champion</span>
    </div>
  );
}

const socialIconMap = {
  Twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-1 7-4v-1.44a4.3 4.3 0 00.78-2.07z" />
    </svg>
  ),
  Instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        ry="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  Discord: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.3671a19.8063 19.8063 0 00-4.8851-1.5152.074.074 0 00-.0782.0368c-.211.3667-.444.8461-.607 1.2226a18.27 18.27 0 00-5.487 0c-.163-.3765-.395-.8559-.607-1.2226a.077.077 0 00-.0785-.037 19.7355 19.7355 0 00-4.8851 1.515.07.07 0 00-.0319.0287C.5239 8.34 0 11.7431 0 15.0859c0 .027.0144.0536.0325.0779a19.8902 19.8902 0 006.0326 3.0294.0765.0765 0 00.0899-.0270c.711-.973 1.346-2.017 1.887-3.122a.071.071 0 00-.0394-.098 13.201 13.201 0 01-1.881-.892.072.072 0 01-.009-.119c.126-.095.252-.195.372-.287a.075.075 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 01.079.009c.12.092.245.192.371.288a.072.072 0 01-.006.118 13.566 13.566 0 01-1.888.892.071.071 0 00-.037.099c.542 1.105 1.179 2.149 1.187 3.122a.071.071 0 00.896.027 19.88 19.88 0 006.038-3.030.072.072 0 00.032-.078c-.23-2.796-1.539-5.236-3.26-7.377a.061.061 0 00-.0313-.03zM8.02 12.861c-.733 0-1.335-.671-1.335-1.495 0-.823.602-1.495 1.335-1.495.742 0 1.348.672 1.335 1.495 0 .824-.593 1.495-1.335 1.495zm7.975 0c-.733 0-1.335-.671-1.335-1.495 0-.823.602-1.495 1.335-1.495.742 0 1.348.672 1.335 1.495 0 .824-.593 1.495-1.335 1.495z" />
    </svg>
  ),
  YouTube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
};

function SocialLink({ label }) {
  return (
    <a
      href="#"
      className="group glass-panel px-8 py-4 flex items-center gap-3 transition-all hover:bg-white/30 hover:translate-y-[-2px]"
    >
      <span className="material-symbols-outlined text-on-background/80 text-xl group-hover:text-primary">{socialIconMap[label]}</span>
      <span className="font-label text-[9px] tracking-[0.3em] text-on-background uppercase">{label}</span>
    </a>
  );
}

function App() {
  const historyMatches = [
    {
      cardClassName:
        "ranking-card glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/5 border-white/40 mb-12 ranking-card-frame",
      avatarWrapperClassName:
        "relative w-14 h-14 rounded-full overflow-hidden border border-white/40 bg-white/10",
      resultClassName:
        "block font-headline text-xl font-light text-on-surface uppercase tracking-widest",
      result: "VICTORY",
      queue: "RANKED SOLO // 24:12",
      ratioClassName: "block font-headline text-2xl font-light text-on-surface tracking-tighter",
      ratio: "14 / 2 / 8",
      itemsClassName: "w-7 h-7 bg-white/30 border border-white/50",
      lpClassName: "block font-label text-[10px] text-on-background/60 mb-1",
      lp: "+22 LP",
      tagClassName: "font-label text-[9px] text-primary font-bold uppercase tracking-widest",
      tag: "PEAK"
    },
    {
      cardClassName:
        "ranking-card glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-8 opacity-70 transition-all hover:opacity-100 border-white/40 mb-12 ranking-card-frame",
      avatarWrapperClassName:
        "relative w-14 h-14 rounded-full overflow-hidden border border-white/20 bg-white/5",
      resultClassName:
        "block font-headline text-xl font-light text-on-background/70 uppercase tracking-widest",
      result: "DEFEAT",
      queue: "RANKED SOLO // 38:05",
      ratioClassName: "block font-headline text-2xl font-light text-on-surface/60 tracking-tighter",
      ratio: "8 / 9 / 12",
      itemsClassName: "w-7 h-7 bg-white/10 border border-white/20",
      lpClassName: "block font-label text-[10px] text-on-background/50 mb-1",
      lp: "-18 LP",
      tagClassName: "font-label text-[9px] text-on-background/30 uppercase tracking-widest",
      tag: "VICTORY"
    },
    {
      cardClassName:
        "ranking-card glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/5 border border-white/40 mb-12 ranking-card-frame",
      avatarWrapperClassName:
        "relative w-14 h-14 rounded-full overflow-hidden border border-white/20 bg-white/5",
      resultClassName:
        "block font-headline text-xl font-light text-on-surface uppercase tracking-widest",
      result: "DEFEAT",
      queue: "RANKED SOLO // 42:10",
      ratioClassName: "block font-headline text-2xl font-light text-on-surface tracking-tighter",
      ratio: "10 / 10 / 15",
      itemsClassName: "w-7 h-7 bg-white/20 border border-white/30",
      lpClassName: "block font-label text-[10px] text-on-background/50 mb-1",
      lp: "+0 LP",
      tagClassName: "font-label text-[9px] text-on-background/40 uppercase tracking-widest",
      tag: "NEUTRAL"
    },
    {
      cardClassName:
        "ranking-card glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/5 border border-white/40 ranking-card-frame",
      avatarWrapperClassName:
        "relative w-14 h-14 rounded-full overflow-hidden border border-white/40 bg-white/10",
      resultClassName:
        "block font-headline text-xl font-light text-on-surface uppercase tracking-widest",
      result: "VICTORY",
      queue: "RANKED SOLO // 18:45",
      ratioClassName: "block font-headline text-2xl font-light text-on-surface tracking-tighter",
      ratio: "18 / 4 / 12",
      itemsClassName: "w-7 h-7 bg-white/30 border border-white/50",
      lpClassName: "block font-label text-[10px] text-on-background/60 mb-1",
      lp: "+28 LP",
      tagClassName: "font-label text-[9px] text-primary font-bold uppercase tracking-widest",
      tag: "VIBRANT"
    }
  ];

  useEffect(() => {
    const body = document.body;
    body.classList.add("loading");
    body.classList.add(
      "text-on-background",
      "font-body",
      "selection:bg-primary-container",
      "selection:text-on-background",
      "custom-scrollbar",
      "overflow-x-hidden"
    );

    const loadingTimeout = setTimeout(() => {
      body.classList.remove("loading");
    }, 2500);

    const contentSection = document.querySelector(".content-section");
    const heroSection = document.querySelector(".hero-section");
    const navbarTitle = document.querySelector("#navbar-title");

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contentSection?.classList.add("fade-in");
          } else {
            contentSection?.classList.remove("fade-in");
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (contentSection) {
      fadeObserver.observe(contentSection);
    }

    const handleScroll = () => {
      if (!heroSection || !contentSection) return;

      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      const scrollPercentage = Math.min(scrollPosition / (heroHeight * 0.6), 1);
      const heroScaleX = 1 - scrollPercentage * 0.05;
      const contentScaleX = 0.95 + scrollPercentage * 0.05;

      heroSection.style.transform = `scaleX(${heroScaleX}) translateZ(0)`;
      contentSection.style.transform = `scaleX(${contentScaleX}) translateZ(0)`;

      if (scrollPercentage > 0) {
        navbarTitle?.classList.add("visible");
      } else {
        navbarTitle?.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const rankingCards = document.querySelectorAll(".ranking-card");
    rankingCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        rankingCards.forEach((c) => {
          if (c !== card) {
            c.classList.add("dimmed");
          }
        });
      });

      card.addEventListener("mouseleave", () => {
        rankingCards.forEach((c) => {
          c.classList.remove("dimmed");
        });
      });
    });

    return () => {
      clearTimeout(loadingTimeout);
      fadeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      body.classList.remove(
        "text-on-background",
        "font-body",
        "selection:bg-primary-container",
        "selection:text-on-background",
        "custom-scrollbar",
        "overflow-x-hidden"
      );
    };
  }, []);

  return (
    <>
      <div className="loading-screen">
        <div className="text-center">
          <h1 className="loading-title">ØRBIT#0B1T</h1>
        </div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <span
            id="navbar-title"
            className="text-xl font-light tracking-[0.3em] font-headline cursor-pointer drop-shadow-md hero-title-outline opacity-0 pointer-events-none"
            style={{ display: "inline-block" }}
          >
            ØRBIT#0B1T
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-white/20 rounded-full transition-all p-2 active:scale-95 duration-200">
            <span className="material-symbols-outlined text-white">visibility</span>
          </button>
        </div>
      </nav>

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

      <section className="relative z-20 py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-light uppercase tracking-[0.2em] mb-2 text-on-background">
              Connect
            </h2>
            <p className="font-label text-[10px] text-on-background/60 tracking-[0.4em] uppercase">
              STAY UPDATED WITH MY JOURNEY
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <SocialLink label="Twitter" />
            <SocialLink label="Instagram" />
            <SocialLink label="Discord" />
            <SocialLink label="YouTube" />
            <SocialLink label="LinkedIn" />
          </div>
        </div>
      </section>

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

export default App;
