import { useEffect, useState } from "react";
import LoadingScreen from "./components/layout/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import DataError from "./components/layout/DataError";
import HeroSection from "./components/sections/HeroSection";
import CurrentEloSection from "./components/sections/CurrentEloSection";
import ArsenalSection from "./components/sections/ArsenalSection";
import SocialSection from "./components/sections/SocialSection";
import { useAccount } from "./hooks/useAccount";
import { useProfile } from "./hooks/useProfile";
import { formatRiotId } from "./utils/format";

function App() {
  const account = useAccount();
  const { profile, isLoading, error, reload } = useProfile(5);
  const [introFinished, setIntroFinished] = useState(false);
  const displayName = account
    ? formatRiotId(account.gameName, account.tagLine)
    : profile
      ? formatRiotId(profile.perfil.gameName, profile.perfil.tagLine)
      : "—";
  const isShowingIntro = !introFinished;

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

    const contentSection = document.querySelector<HTMLElement>(
      ".currentEloSection",
    );
    const heroSection = document.querySelector<HTMLElement>(".heroSection");
    const navbarTitle = document.querySelector<HTMLElement>("#navbar-title");

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
        threshold: 0.1,
      },
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

      if (scrollPercentage >= 0.85) {
        navbarTitle?.classList.add("visible");
      } else {
        navbarTitle?.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const rankingCards = Array.from(
      document.querySelectorAll<HTMLElement>(".historyMatchCard"),
    );

    const handleMouseEnter = (card: HTMLElement) => {
      rankingCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.add("dimmed");
        }
      });
    };

    const handleMouseLeave = () => {
      rankingCards.forEach((card) => {
        card.classList.remove("dimmed");
      });
    };

    const cardListeners = rankingCards.map((card) => {
      const onMouseEnter = () => handleMouseEnter(card);

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return { card, onMouseEnter };
    });

    return () => {
      fadeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);

      cardListeners.forEach(({ card, onMouseEnter }) => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
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
      <CurrentEloSection profile={profile} isLoading={isLoading} />
      <ArsenalSection profile={profile} isLoading={isLoading} />
      <SocialSection />
      <Footer />
    </>
  );
}

export default App;
