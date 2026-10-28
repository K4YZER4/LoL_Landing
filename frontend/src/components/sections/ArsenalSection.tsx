import type { ProfileResponse } from "../../types/profile";
import type { MatchStats } from "../../utils/matchStats";
import type { MostPlayedChampion } from "../../utils/matchStats";
import ChampionSlot from "../ui/ChampionSlot";
import MostPlayedChampionSlot from "../ui/MostPlayedChampionSlot";
import SakuraPetalOverlay from "../layout/SakuraPetalOverlay";
import BackgroundVideo from "../ui/BackgroundVideo";

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

  const roleIcon = (role: string | null | undefined) => {
    const roleIcons: Record<string, string> = {
      TOP: "top.svg",
      JUNGLE: "jungle.svg",
      MIDDLE: "mid.svg",
      BOTTOM: "adc.svg",
      UTILITY: "support.svg",
    };

    return role ? roleIcons[role] : undefined;
  };

  return (
    <section className="arsenalSection sectionBlendTop">
      <BackgroundVideo
        className="sectionBackgroundVideo"
        src="/assets/bakgrounFlores.mp4"
      />
      <div className="sectionColorOverlay"></div>
      <SakuraPetalOverlay lightColor="#c9e4f7" deepColor="#6e9ed1" />
      <img
        src="/assets/KanekiSinFondo2.png"
        alt="Kaneki"
        className="arsenalSectionKaneki"
        loading="lazy"
        decoding="async"
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
                <span className="arsenalRoleLabel">Primary Role</span>
              </div>
              <div className="arsenalRoleValue">
                {matchesLoading ? (
                  "—"
                ) : primaryRole ? (
                  <>
                    <img
                      src={`/assets/${roleIcon(primaryRole.role)}`}
                      alt={primaryRole.role}
                      className="arsenalRoleIcon"
                    />
                    <span>{primaryRole.winrate}% WR</span>
                  </>
                ) : (
                  "NO DATA"
                )}
              </div>
            </div>

            <div>
              <div className="arsenalRoleHeader">
                <span className="arsenalRoleLabel">Secondary Role</span>
              </div>
              <div className="arsenalRoleValue">
                {matchesLoading ? (
                  "—"
                ) : secondaryRole ? (
                  <>
                    <img
                      src={`/assets/${roleIcon(secondaryRole.role)}`}
                      alt={secondaryRole.role}
                      className="arsenalRoleIcon"
                    />
                    <span>{secondaryRole.winrate}% WR</span>
                  </>
                ) : (
                  "NO DATA"
                )}
              </div>
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
