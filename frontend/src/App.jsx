import { useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CurrentElo from './components/CurrentElo';
import ChampionsAndRoles from './components/ChampionsAndRoles';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  useEffect(() => {
    document.body.classList.add('loading');

    // Fade-in/fade-out del video al hacer scroll + Squish effect + Navbar title
    const contentSection = document.querySelector('.content-section');
    const heroSection = document.querySelector('.hero-section');
    const navbarTitle = document.querySelector('#navbar-title');

    if (!contentSection || !heroSection || !navbarTitle) return;

    // Observer para fade-in del video
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contentSection.classList.add('fade-in');
          } else {
            contentSection.classList.remove('fade-in');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    fadeObserver.observe(contentSection);

    // Efecto de squish al hacer scroll + aparición del título en navbar
    const handleScroll = () => {
      if (!heroSection || !contentSection) return;

      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      // Calcula el porcentaje de scroll dentro del hero
      const scrollPercentage = Math.min(
        scrollPosition / (heroHeight * 0.6),
        1
      );

      // Hero se comprime: interpola entre 1 (normal) y 0.95 (más sutil)
      const heroScaleX = 1 - scrollPercentage * 0.05;

      // Content se expande (inverso): interpola entre 0.95 y 1 (más sutil)
      const contentScaleX = 0.95 + scrollPercentage * 0.05;

      // Aplica las transformaciones
      heroSection.style.transform = `scaleX(${heroScaleX}) translateZ(0)`;
      contentSection.style.transform = `scaleX(${contentScaleX}) translateZ(0)`;

      // Mostrar/ocultar título en navbar según el scroll
      if (scrollPercentage > 0) {
        navbarTitle.classList.add('visible');
      } else {
        navbarTitle.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Efecto de opacidad en ranking cards
    const rankingCards = document.querySelectorAll('.ranking-card');
    rankingCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        rankingCards.forEach((c) => {
          if (c !== card) {
            c.classList.add('dimmed');
          }
        });
      });
      card.addEventListener('mouseleave', () => {
        rankingCards.forEach((c) => {
          c.classList.remove('dimmed');
        });
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      fadeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      <CurrentElo />
      <ChampionsAndRoles />
      <SocialMedia />
      <Footer />
    </>
  );
}

export default App;
