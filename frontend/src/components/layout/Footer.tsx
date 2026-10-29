import SakuraPetalOverlay from "./SakuraPetalOverlay";

export default function Footer() {
  return (
    <footer className="footerSection">
      <SakuraPetalOverlay lightColor="#b7d9f4" deepColor="#6e9ed1" />
      <div className="footerContainer">
        <p className="footerThankYou">Thank you for visiting.</p>
        <p className="footerText">
          © 2026 ØRBIT PROJECT.
        </p>
      </div>
    </footer>
  );
}
