import type { ProfileResponse } from "../../types/profile";
import { formatRoleStat } from "../../utils/format";
import type { MatchStats } from "../../utils/matchStats";
import type { MostPlayedChampion } from "../../utils/matchStats";
import ChampionSlot from "../ui/ChampionSlot";
import MostPlayedChampionSlot from "../ui/MostPlayedChampionSlot";
import SakuraPetalOverlay from "../layout/SakuraPetalOverlay";

interface ArsenalSectionProps {
  profile: ProfileResponse | null;
  isLoading: boolean;
  matchStats: MatchStats;
  matchesLoading: boolean;
  mostPlayedChampions: MostPlayedChampion[];
}

export default function ArsenalSection({
  profile,
  isLoading,
  matchStats,
  matchesLoading,
  mostPlayedChampions,
}: ArsenalSectionProps) {
  const primaryRole = matchStats.primaryRole;
  const secondaryRole = matchStats.secondaryRole;
  const topChampions = profile?.stats.topChampions ?? [];
  const champions = topChampions.slice(0, 5);

  return (
    <section className="arsenalSection sectionBlendTop">
      <video className="sectionBackgroundVideo" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <div className="sectionColorOverlay"></div>
      <SakuraPetalOverlay lightColor="#c9e4f7" deepColor="#6e9ed1" />
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
                {matchesLoading ? "—" : formatRoleStat(primaryRole)}
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
                {matchesLoading ? "—" : formatRoleStat(secondaryRole)}
              </span>
            </div>
          </div>

          <div>
            <h3 className="arsenalSectionLabel">MOST MASTERY CHAMPIONS</h3>
            <div className="arsenalChampionsGrid">
              {champions.length > 0 ? (
                champions.map((champion) => (
                  <ChampionSlot
                    key={champion.championId}
                    champion={champion}
                  />
                ))
              ) : (
                <p className="arsenalEmpty">
                  {isLoading
                    ? "Loading champion data..."
                    : "No mastery data available."}
                </p>
              )}
            </div>

            <div className="arsenalMostPlayed">
              <h3 className="arsenalSectionLabel">MOST PLAYED CHAMPIONS</h3>
              <div className="arsenalChampionsGrid">
                {mostPlayedChampions.length > 0 ? (
                  mostPlayedChampions.map((champion) => (
                    <MostPlayedChampionSlot
                      key={champion.championName}
                      champion={champion}
                    />
                  ))
                ) : (
                  <p className="arsenalEmpty">
                    {matchesLoading
                      ? "Loading recent champions..."
                      : "No champion played twice recently."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
