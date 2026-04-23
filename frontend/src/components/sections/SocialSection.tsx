import SocialLink from "../ui/SocialLink";

export default function SocialSection() {
  return (
    <section className="socialSection sectionBlendTop">
      <img
        src="/assets/kanekiSinFondo1.png"
        alt="Kaneki"
        className="socialSectionKaneki"
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
