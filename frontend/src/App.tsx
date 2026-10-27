import { useEffect, useState } from "react";
import LoadingScreen from "./components/layout/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import DataError from "./components/layout/DataError";
import HeroSection from "./components/sections/HeroSection";
import CurrentEloSection from "./components/sections/CurrentEloSection";
import ArsenalSection from "./components/sections/ArsenalSection";
import SocialSection from "./components/sections/SocialSection";
import AboutMeSection from "./components/sections/AboutMeSection";
import { useAccount } from "./hooks/useAccount";
import { useMatches } from "./hooks/useMatches";
import { useProfile } from "./hooks/useProfile";
import { formatRiotId } from "./utils/format";
import { getMatchStats, getMostPlayedChampions } from "./utils/matchStats";

function App() {
  const account = useAccount();
  const { profile, isLoading, error, reload } = useProfile(0);
  const matches = useMatches(20);
  const matchStats = getMatchStats(matches.matches);
  const mostPlayedChampions = getMostPlayedChampions(matches.matches);
  const [introFinished, setIntroFinished] = useState(false);
  const displayName = account
    ? formatRiotId(account.gameName, account.tagLine)
    : profile
      ? formatRiotId(profile.perfil.gameName, profile.perfil.tagLine)
      : "";
  const isShowingIntro = !introFinished;

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    const introTimeout = window.setTimeout(() => {
      setIntroFinished(true);
    }, 2500);

    return () => window.clearTimeout(introTimeout);
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.add("appBody", "appScrollbar");
    body.classList.toggle("loading", isShowingIntro);

    return () => {
      body.classList.remove("appBody", "appScrollbar", "loading");
    };
  }, [isShowingIntro]);

  useEffect(() => {
    if (!profile) {
      return;
    }

    const heroSection = document.querySelector<HTMLElement>(".heroSection");
    const currentEloSection = document.querySelector<HTMLElement>(
      ".currentEloSection",
    );
    const arsenalSection = document.querySelector<HTMLElement>(".arsenalSection");
    const aboutMeSection = document.querySelector<HTMLElement>(".aboutMeSection");
    const socialSection = document.querySelector<HTMLElement>(".socialSection");
    const navbarTitle = document.querySelector<HTMLElement>("#navbar-title");

    const sections = [
      { el: currentEloSection, cls: "fade-in" },
      { el: arsenalSection, cls: "fade-in" },
      { el: aboutMeSection, cls: "fade-in" },
      { el: socialSection, cls: "fade-in" },
    ];

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = sections.find((section) => section.el === entry.target);
          if (!match) return;
          if (entry.isIntersecting) {
            match.el?.classList.add(match.cls);
          } else {
            match.el?.classList.remove(match.cls);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      if (section.el) {
        fadeObserver.observe(section.el);
      }
    });

    const handleScroll = () => {
      if (!heroSection) return;

      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      const scrollPercentage = Math.min(scrollPosition / (heroHeight * 0.6), 1);
      const heroScaleX = 1 - scrollPercentage * 0.05;

      heroSection.style.transform = `scaleX(${heroScaleX}) translateZ(0)`;

      if (currentEloSection) {
        const currentEloScaleX = 0.95 + scrollPercentage * 0.05;
        currentEloSection.style.transform = `scaleX(${currentEloScaleX}) translateZ(0)`;
      }

      if (scrollPercentage >= 0.85) {
        navbarTitle?.classList.add("visible");
      } else {
        navbarTitle?.classList.remove("visible");
      }

      const sectionPairs = [
        [currentEloSection, arsenalSection],
      ];

      sectionPairs.forEach(([prev, next]) => {
        if (!prev || !next) return;
        const nextTop = next.getBoundingClientRect().top;
        const transitionDistance = window.innerHeight * 0.55;
        const start = window.innerHeight;
        const end = window.innerHeight - transitionDistance;
        const progress = Math.min(
          Math.max((start - nextTop) / (start - end), 0),
          1,
        );
        const prevScaleX = 1 - progress * 0.06;
        prev.style.transform = `scaleX(${prevScaleX}) translateZ(0)`;
      });

      if (arsenalSection) {
        arsenalSection.style.transform = "scaleX(1) translateZ(0)";
      }
      if (aboutMeSection) {
        aboutMeSection.style.transform = "scaleX(1) translateZ(0)";
      }
      if (socialSection) {
        socialSection.style.transform = "scaleX(1) translateZ(0)";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      fadeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [profile]);

  if (error && !profile) {
    return <DataError message={error} onRetry={reload} />;
  }

  return (
    <>
      <LoadingScreen visible={isShowingIntro} title={displayName} />
      <Navbar displayName={displayName} />
      <HeroSection displayName={displayName} level={profile?.perfil.level ?? null} />
      <CurrentEloSection
        profile={profile}
        isLoading={isLoading}
        matches={matches.matches}
        matchesLoading={matches.isLoading}
        matchesError={matches.error}
        reloadMatches={matches.reload}
        matchStats={matchStats}
      />
      <ArsenalSection
        profile={profile}
        isLoading={isLoading}
        matchStats={matchStats}
        matchesLoading={matches.isLoading}
        mostPlayedChampions={mostPlayedChampions}
      />
      <AboutMeSection />
      <SocialSection />
      <Footer />
    </>
  );
}

export default App;
