import ChampionSlot from "../ui/ChampionSlot";

export default function ArsenalSection() {
  return (
    <section className="arsenalSection sectionBlendTop">
      <video className="sectionBackgroundVideo" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <img className="sectionForegroundGif" src="/assets/pinkFlowers.gif" alt="Pink Flowers" />
      <div className="sectionColorOverlay"></div>
      <img
        src="/assets/KanekiSinFondo2.png"
        alt="Kaneki"
        className="arsenalSectionKaneki"
      />
      <div className="sectionContainer">
        <div className="sectionBlockGap">
          <h2 className="sectionTitle">
            POOL OF CHAMPIONS AND ROLES
          </h2>
          <p className="sectionSubTitle"></p>
        </div>

        <div className="arsenalGrid">
          <div className="glassPanel arsenalRolesCard">
            <h3 className="arsenalSectionLabel">
              ROLES
            </h3>

            <div className="arsenalRoleBlock">
              <div className="arsenalRoleHeader">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <span className="arsenalRoleLabel">
                  Primary Role
                </span>
              </div>
              <span className="arsenalRoleValue">ADC // 68% WR</span>
            </div>

            <div>
              <div className="arsenalRoleHeader">
                <span className="material-symbols-outlined text-primary text-xl">hub</span>
                <span className="arsenalRoleLabel">
                  Secondary Role
                </span>
              </div>
              <span className="arsenalRoleValue">Mid Lane // 32% WR</span>
            </div>
          </div>

          <div>
            <h3 className="arsenalSectionLabel">
              Champions
            </h3>
            <div className="arsenalChampionsGrid">
              {Array.from({ length: 5 }).map((_, idx) => (
                <ChampionSlot key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
