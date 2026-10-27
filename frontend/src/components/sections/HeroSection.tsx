interface HeroSectionProps {
  gameName: string;
  tagLine: string;
  level: number;
}

export default function HeroSection({
  gameName,
  tagLine,
  level,
}: HeroSectionProps) {
  return (
    <section className="heroSection">
      <div className="heroSectionBackground"></div>
      <div className="heroSectionOverlay"></div>
      <div className="heroSectionContent">
        <div className="heroSectionTitleWrap">
          <h1 className="heroSectionTitle heroTitleOutline">
            {gameName}#{tagLine}
          </h1>
        </div>
        <div className="heroSectionLevelWrap" style={{ right: "-100px" }}>
          <div className="glassPanel heroSectionLevelCard">
            <span className="heroSectionLevelLabel">LEVEL</span>
            <span className="heroSectionLevelValue">{level}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
