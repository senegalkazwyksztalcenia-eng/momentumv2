export function makeRand(seed: number) {
  let state = seed >>> 0 || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

interface Point {
  x: number;
  y: number;
}

export interface BoltPath {
  d: string;
  kind: "main" | "branch" | "twig";
  intensity: number;
  delay: number;
}

export interface BoltGeometry {
  main: BoltPath;
  forks: BoltPath[];
}

function clampX(x: number, width: number): number {
  return Math.max(2, Math.min(width - 2, x));
}

function toPath(points: Point[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

/**
 * Irregular midpoint displacement — random decay, lateral bias, and
 * uneven vertical jitter produce less uniform zigzags than fixed-params MD.
 */
function displaceChannel(
  from: Point,
  to: Point,
  roughness: number,
  depth: number,
  rand: () => number,
): Point[] {
  if (depth === 0) {
    return [from, to];
  }

  const decay = 1.85 + rand() * 0.55;
  const bias = (rand() * 2 - 1) * roughness * (0.15 + rand() * 0.35);
  const midX = (from.x + to.x) / 2 + (rand() * 2 - 1) * roughness + bias;
  const midY =
    (from.y + to.y) / 2 + (rand() * 2 - 1) * roughness * (0.04 + rand() * 0.14);
  const mid = { x: midX, y: midY };
  const left = displaceChannel(from, mid, roughness / decay, depth - 1, rand);
  const right = displaceChannel(mid, to, roughness / decay, depth - 1, rand);
  return [...left.slice(0, -1), ...right];
}

/** Adds small unpredictable kinks along an already displaced channel. */
function roughenPoints(points: Point[], width: number, rand: () => number, amount: number): Point[] {
  return points.map((p, i) => {
    if (i === 0 || i === points.length - 1 || rand() > 0.58) {
      return { ...p };
    }
    return {
      x: clampX(p.x + (rand() * 2 - 1) * amount, width),
      y: p.y + (rand() * 2 - 1) * amount * 0.18,
    };
  });
}

function taperToPoint(
  points: Point[],
  endX: number,
  height: number,
  taperFromRatio: number,
): Point[] {
  const taperFrom = height * taperFromRatio;
  return points.map((p) => {
    if (p.y <= taperFrom) return p;
    const blend = Math.min(1, (p.y - taperFrom) / (height - taperFrom));
    const ease = blend * blend * (3 - 2 * blend);
    return { x: p.x * (1 - ease) + endX * ease, y: p.y };
  });
}

function makePath(
  points: Point[],
  kind: BoltPath["kind"],
  intensity: number,
  delay: number,
): BoltPath {
  return { d: toPath(points), kind, intensity, delay };
}

export function generateBolt(
  width: number,
  height: number,
  seed: number,
  options?: {
    branchCount?: number;
    roughness?: number;
    endX?: number;
    startX?: number;
    branchMaxY?: number;
  },
): BoltGeometry {
  const rand = makeRand(seed);
  const endX = options?.endX ?? width / 2;
  const startX =
    options?.startX ??
    endX + (rand() * 2 - 1) * width * (0.12 + rand() * 0.14);
  const baseRoughness = options?.roughness ?? width * (0.34 + rand() * 0.14);

  const mainDepth = 6 + Math.floor(rand() * 3);
  let mainPts = displaceChannel(
    { x: startX, y: 0 },
    { x: endX + (rand() * 2 - 1) * 4, y: height },
    baseRoughness * (0.9 + rand() * 0.25),
    mainDepth,
    rand,
  ).map((p) => ({ x: clampX(p.x, width), y: p.y }));

  mainPts = roughenPoints(mainPts, width, rand, baseRoughness * 0.09);
  mainPts = taperToPoint(mainPts, endX, height, 0.58 + rand() * 0.08);
  mainPts[0] = { x: startX, y: 0 };
  mainPts[mainPts.length - 1] = { x: endX, y: height };

  const forks: BoltPath[] = [];
  const branchMaxY = options?.branchMaxY ?? height * (0.58 + rand() * 0.05);
  const branchOriginMaxY = height * (0.56 + rand() * 0.08);
  const branchCount =
    options?.branchCount ?? 6 + Math.floor(rand() * 9);
  const usedOrigins = new Set<number>();

  for (let b = 0; b < branchCount; b += 1) {
    const eligible = mainPts
      .map((p, idx) => ({ p, idx }))
      .filter(({ p, idx }) => {
        if (idx < 2 || idx > mainPts.length - 6) return false;
        if (p.y < height * 0.04 || p.y > branchOriginMaxY) return false;
        for (const used of usedOrigins) {
          if (Math.abs(used - idx) < 3) return false;
        }
        return true;
      });

    if (eligible.length === 0) break;

    const pick = eligible[Math.floor(rand() * eligible.length)]!;
    usedOrigins.add(pick.idx);
    const origin = pick.p;

    const side = rand() > 0.48 ? 1 : -1;
    const length = height * (0.035 + rand() * 0.13);
    const horizontal = length * (0.45 + rand() * 0.95);
    const vertical = length * (0.25 + rand() * 0.55);
    const lift = rand() < 0.1 ? -vertical * (0.08 + rand() * 0.2) : 0;

    const end = {
      x: clampX(origin.x + side * horizontal * (0.55 + rand() * 0.7), width),
      y: Math.min(branchMaxY, origin.y + vertical + lift),
    };

    const branchRough = baseRoughness * (0.28 + rand() * 0.28);
    const branchDepth = 2 + Math.floor(rand() * 4);
    let branchPts = displaceChannel(origin, end, branchRough, branchDepth, rand).map((p) => ({
      x: clampX(p.x, width),
      y: p.y,
    }));
    branchPts = roughenPoints(branchPts, width, rand, branchRough * 0.14);

    forks.push(
      makePath(
        branchPts,
        "branch",
        0.45 + rand() * 0.55,
        rand() * 0.12,
      ),
    );

    const twigCount = rand() < 0.35 ? 0 : rand() < 0.7 ? 1 : 2;
    for (let t = 0; t < twigCount; t += 1) {
      if (branchPts.length < 3) break;
      const twigIdx = 1 + Math.floor(rand() * (branchPts.length - 2));
      const twigOrigin = branchPts[twigIdx]!;
      if (twigOrigin.y > branchMaxY * 0.92) continue;

      const twigSide = rand() > 0.5 ? 1 : -1;
      const twigLen = height * (0.018 + rand() * 0.05);
      const twigEnd = {
        x: clampX(twigOrigin.x + twigSide * twigLen * (0.5 + rand() * 0.8), width),
        y: Math.min(branchMaxY, twigOrigin.y + twigLen * (0.2 + rand() * 0.45)),
      };
      const twigPts = roughenPoints(
        displaceChannel(twigOrigin, twigEnd, branchRough * 0.35, 2, rand),
        width,
        rand,
        branchRough * 0.08,
      );
      forks.push(
        makePath(twigPts, "twig", 0.25 + rand() * 0.45, rand() * 0.16),
      );
    }
  }

  // Occasional short spur directly off the main channel
  if (rand() > 0.25) {
    const spurEligible = mainPts.filter(
      (p) => p.y > height * 0.08 && p.y < branchOriginMaxY * 0.85,
    );
    if (spurEligible.length > 0) {
      const spurOrigin = spurEligible[Math.floor(rand() * spurEligible.length)]!;
      const spurSide = rand() > 0.5 ? 1 : -1;
      const spurLen = height * (0.02 + rand() * 0.04);
      const spurEnd = {
        x: clampX(spurOrigin.x + spurSide * spurLen * (0.8 + rand()), width),
        y: spurOrigin.y + spurLen * (0.15 + rand() * 0.35),
      };
      const spurPts = displaceChannel(spurOrigin, spurEnd, baseRoughness * 0.2, 2, rand);
      forks.push(makePath(spurPts, "twig", 0.3 + rand() * 0.35, rand() * 0.08));
    }
  }

  return {
    main: makePath(mainPts, "main", 1, 0),
    forks,
  };
}

/** @deprecated Use BoltGeometry.forks — kept for background lightning layer. */
export function boltPathsLegacy(geometry: BoltGeometry): { main: string; branches: string[]; twigs: string[] } {
  return {
    main: geometry.main.d,
    branches: geometry.forks.filter((f) => f.kind === "branch").map((f) => f.d),
    twigs: geometry.forks.filter((f) => f.kind === "twig").map((f) => f.d),
  };
}
