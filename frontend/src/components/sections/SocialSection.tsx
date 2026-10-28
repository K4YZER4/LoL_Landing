import SocialLink from "../ui/SocialLink";
import SakuraPetalOverlay from "../layout/SakuraPetalOverlay";
import BackgroundVideo from "../ui/BackgroundVideo";

export default function SocialSection() {
  return (
    <section className="socialSection sectionBlendTop">
      <SakuraPetalOverlay lightColor="#a5cbed" deepColor="#4b78b4" />
      <BackgroundVideo
        className="socialSectionVideoBackground"
        src="/assets/bluew_flowers_connect_pingpong.mp4"
      />
      <img
        src="/assets/simon.png"
        alt="Simon"
        className="socialSectionSimon"
        loading="lazy"
        decoding="async"
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
          <SocialLink label="Instagram" href="https://www.instagram.com/k4yz3r4_/" />
          <SocialLink label="Discord" href="https://discord.com/users/517047496845819921" />
          <SocialLink label="GitHub" href="https://github.com/K4YZER4" />
          <SocialLink label="X" href="https://twitter.com/K4YZER4" />
        </div>
      </div>
    </section>
  );
}
