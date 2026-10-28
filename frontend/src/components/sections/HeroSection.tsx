interface HeroSectionProps {
  displayName: string;
  level: number | null;
}

export default function HeroSection({
  displayName,
  level,
}: HeroSectionProps) {
  return (
    <section className="heroSection">
      <div className="heroSectionBackground"></div>
      <div className="heroSectionOverlay"></div>
      <SakuraPetalOverlay
        count={HERO_PETAL_COUNT}
        lightColor="#f9c5d5"
        deepColor="#e77a9d"
      />
      <div className="heroSectionContent">
        <div className="heroSectionTitleWrap">
          <h1 className="heroSectionTitle heroTitleOutline">
            {displayName}
          </h1>
        </div>
        <div className="heroSectionLevelWrap" style={{ right: "-100px" }}>
          <div className="glassPanel heroSectionLevelCard">
            <span className="heroSectionLevelLabel">LEVEL</span>
            <span className="heroSectionLevelValue">{level ?? "—"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
import SakuraPetalOverlay, {
  HERO_PETAL_COUNT,
} from "../layout/SakuraPetalOverlay";
