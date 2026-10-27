import SocialLink from "../ui/SocialLink";
import SakuraPetalOverlay from "../layout/SakuraPetalOverlay";

export default function SocialSection() {
  return (
    <section className="socialSection sectionBlendTop">
      <SakuraPetalOverlay lightColor="#a5cbed" deepColor="#4b78b4" />
      <img
        src="/assets/simon.png"
        alt="Simon"
        className="socialSectionSimon"
      />
      <div className="sectionContainer">
        <div className="socialSectionHeader">
          <h2 className="socialSectionTitle">
            Connect
          </h2>
          <p className="socialSectionSubTitle">
            STAY UPDATED WITH MY JOURNEY
          </p>
        </div>

        <div className="socialLinksRow">
          <SocialLink label="Twitter" />
          <SocialLink label="Instagram" />
          <SocialLink label="Discord" />
          <SocialLink label="LinkedIn" />
        </div>
      </div>
    </section>
  );
}
