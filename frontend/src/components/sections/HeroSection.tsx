export default function HeroSection() {
  return (
    <section className="heroSection">
      <div className="heroSectionBackground"></div>
      <div className="heroSectionOverlay"></div>
      <div className="heroSectionContent">
        <div className="heroSectionTitleWrap">
          <h1 className="heroSectionTitle heroTitleOutline">
            ØRBIT#0B1T
          </h1>
        </div>
        <div className="heroSectionLevelWrap" style={{ right: "-100px" }}>
          <div className="glassPanel heroSectionLevelCard">
            <span className="heroSectionLevelLabel">LEVEL</span>
            <span className="heroSectionLevelValue">724 .-.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
