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

/**
 * Midpoint-displacement lightning channel. Lateral offsets dominate over
 * vertical jitter so the bolt steps downward like a real discharge.
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
  const midX = (from.x + to.x) / 2 + (rand() * 2 - 1) * roughness;
  const midY = (from.y + to.y) / 2 + (rand() * 2 - 1) * roughness * 0.1;
  const mid = { x: midX, y: midY };
  const left = displaceChannel(from, mid, roughness / 2.05, depth - 1, rand);
  const right = displaceChannel(mid, to, roughness / 2.05, depth - 1, rand);
  return [...left.slice(0, -1), ...right];
}

function toPath(points: Point[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

export interface BoltGeometry {
  main: string;
  branches: string[];
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
  const startX = options?.startX ?? width / 2 + (rand() * 2 - 1) * width * 0.08;
  const endX = options?.endX ?? width / 2;
  const roughness = options?.roughness ?? width * 0.34;

  const channel = displaceChannel(
    { x: startX, y: 0 },
    { x: endX, y: height },
    roughness,
    7,
    rand,
  );

  const clamped = channel.map((p) => ({
    x: Math.max(2, Math.min(width - 2, p.x)),
    y: p.y,
  }));

  clamped[0] = { x: startX, y: 0 };
  clamped[clamped.length - 1] = { x: endX, y: height };

  const taperFrom = height * 0.68;
  for (let i = 0; i < clamped.length; i += 1) {
    const p = clamped[i]!;
    if (p.y > taperFrom) {
      const blend = Math.min(1, (p.y - taperFrom) / (height - taperFrom));
      const ease = blend * blend;
      p.x = p.x * (1 - ease) + endX * ease;
    }
  }
  clamped[clamped.length - 1] = { x: endX, y: height };

  const branchCount = options?.branchCount ?? 0;
  const branchMaxY = options?.branchMaxY ?? height * 0.58;
  const branchOriginMaxY = height * 0.5;
  const branches: string[] = [];

  for (let b = 0; b < branchCount; b += 1) {
    const eligible = clamped
      .map((p, idx) => ({ p, idx }))
      .filter(
        ({ p, idx }) =>
          idx > 4 && idx < clamped.length - 4 && p.y > height * 0.06 && p.y < branchOriginMaxY,
      );
    if (eligible.length === 0) break;

    const pick = eligible[Math.floor(rand() * eligible.length)]!;
    const origin = pick.p;
    const dir = rand() > 0.5 ? 1 : -1;
    const length = height * (0.035 + rand() * 0.07);
    const end = {
      x: Math.max(
        2,
        Math.min(width - 2, origin.x + dir * length * (0.65 + rand() * 0.55)),
      ),
      y: Math.min(branchMaxY, origin.y + length * (0.55 + rand() * 0.35)),
    };
    const branchPts = displaceChannel(origin, end, roughness * 0.38, 3, rand);
    branches.push(toPath(branchPts));
  }

  return { main: toPath(clamped), branches };
}
