export default function Footer() {
  return (
    <>
      <footer className="footerSection">
        <div className="footerContainer">
          <p className="footerText">
            © 2026 ØRBIT PROJECT.
          </p>
        </div>
      </footer>

      <button className="footerFloatingButton group">
        <div className="glassPanel footerFloatingButtonInner">
          <span className="material-symbols-outlined footerFloatingButtonIcon">bubble_chart</span>
          <span className="glassPanel footerFloatingButtonLabel">
            Dissolve
          </span>
        </div>
        <div className="footerFloatingButtonGlow"></div>
      </button>
    </>
  );
}
