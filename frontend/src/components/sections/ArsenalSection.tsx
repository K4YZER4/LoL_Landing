import type { ProfileResponse } from "../../types/profile";
import { formatRoleStat } from "../../utils/format";
import ChampionSlot from "../ui/ChampionSlot";

interface ArsenalSectionProps {
  profile: ProfileResponse;
}

export default function ArsenalSection({ profile }: ArsenalSectionProps) {
  const { primaryRole, secondaryRole, topChampions } = profile.stats;
  const champions = topChampions.slice(0, 5);

  return (
    <section className="arsenalSection sectionBlendTop">
      <video className="sectionBackgroundVideo" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <img
        className="sectionForegroundGif"
        src="/assets/pinkFlowers.gif"
        alt="Pink Flowers"
      />
      <div className="sectionColorOverlay"></div>
      <img
        src="/assets/KanekiSinFondo2.png"
        alt="Kaneki"
        className="arsenalSectionKaneki"
      />
      <div className="sectionContainer">
        <div className="sectionBlockGap">
          <h2 className="sectionTitle">POOL OF CHAMPIONS AND ROLES</h2>
          <p className="sectionSubTitle"></p>
        </div>

        <div className="arsenalGrid">
          <div className="glassPanel arsenalRolesCard">
            <h3 className="arsenalSectionLabel">ROLES</h3>

            <div className="arsenalRoleBlock">
              <div className="arsenalRoleHeader">
                <span className="material-symbols-outlined text-primary text-xl">
                  location_on
                </span>
                <span className="arsenalRoleLabel">Primary Role</span>
              </div>
              <span className="arsenalRoleValue">
                {formatRoleStat(primaryRole)}
              </span>
            </div>

            <div>
              <div className="arsenalRoleHeader">
                <span className="material-symbols-outlined text-primary text-xl">
                  hub
                </span>
                <span className="arsenalRoleLabel">Secondary Role</span>
              </div>
              <span className="arsenalRoleValue">
                {formatRoleStat(secondaryRole)}
              </span>
            </div>
          </div>

          <div>
            <h3 className="arsenalSectionLabel">Champions</h3>
            <div className="arsenalChampionsGrid">
              {champions.length > 0 ? (
                champions.map((champion) => (
                  <ChampionSlot
                    key={champion.championId}
                    champion={champion}
                  />
                ))
              ) : (
                <p className="arsenalEmpty">No mastery data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
