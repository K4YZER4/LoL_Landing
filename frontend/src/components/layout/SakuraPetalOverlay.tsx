import { useMemo } from "react";
import type { CSSProperties } from "react";

const PETAL_COUNT = 109;
const HERO_PETAL_COUNT = 70;
const PETAL_SIZE = 15;

interface SakuraPetalOverlayProps {
  count?: number;
  lightColor: string;
  deepColor: string;
}

interface PetalStyle extends CSSProperties {
  "--petal-size": string;
  "--petal-left": string;
  "--petal-top": string;
  "--petal-scale": number;
  "--petal-opacity": number;
  "--fall-duration": string;
  "--fall-delay": string;
  "--sway-duration": string;
  "--rotation-duration": string;
}

interface OverlayStyle extends CSSProperties {
  "--petal-light": string;
  "--petal-deep": string;
}

interface PetalConfig {
  style: PetalStyle;
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createPetals(count: number): PetalConfig[] {
  return Array.from({ length: count }, () => {
    const fallDuration = randomBetween(12, 26);

    return {
      style: {
        "--petal-size": `${PETAL_SIZE}px`,
        "--petal-left": `${randomBetween(0, 100)}%`,
        "--petal-top": `${randomBetween(0, 100)}%`,
        "--petal-scale": randomBetween(0.6, 1.3),
        "--petal-opacity": randomBetween(0.45, 0.95),
        "--fall-duration": `${fallDuration}s`,
        "--fall-delay": `${-randomBetween(0, fallDuration)}s`,
        "--sway-duration": `${randomBetween(2, 5)}s`,
        "--rotation-duration": `${randomBetween(4, 10)}s`,
      },
    };
  });
}

export default function SakuraPetalOverlay({
  count = PETAL_COUNT,
  lightColor,
  deepColor,
}: SakuraPetalOverlayProps) {
  const petals = useMemo(() => createPetals(count), [count]);

  return (
    <div
      className="sakuraPetalOverlay"
      aria-hidden="true"
      style={
        {
        "--petal-light": lightColor,
        "--petal-deep": deepColor,
        } as OverlayStyle
      }
    >
      {petals.map((petal, index) => (
        <span className="sakuraPetalFall" style={petal.style} key={index}>
          <span className="sakuraPetalSway">
            <span className="sakuraPetal" />
          </span>
        </span>
      ))}
    </div>
  );
}

export { HERO_PETAL_COUNT, PETAL_COUNT, PETAL_SIZE };
