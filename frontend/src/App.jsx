import { useEffect } from "react";
import LoadingScreen from "./components/layout/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import CurrentEloSection from "./components/sections/CurrentEloSection";
import ArsenalSection from "./components/sections/ArsenalSection";
import SocialSection from "./components/sections/SocialSection";

function App() {
  useEffect(() => {
    const body = document.body;
    body.classList.add("loading");
    body.classList.add("appBody", "appScrollbar");

    const loadingTimeout = setTimeout(() => {
      body.classList.remove("loading");
    }, 2500);

    const contentSection = document.querySelector(".currentEloSection");
    const heroSection = document.querySelector(".heroSection");
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

    const rankingCards = document.querySelectorAll(".historyMatchCard");
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
        "appBody",
        "appScrollbar"
      );
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      <CurrentEloSection />
      <ArsenalSection />
      <SocialSection />
      <Footer />
    </>
  );
}

export default App;
