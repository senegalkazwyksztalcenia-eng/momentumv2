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
 * Midpoint-displacement lightning channel: recursively subdivides the
 * segment and offsets midpoints laterally with decreasing amplitude,
 * which produces the natural jagged look of a real discharge.
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
  const midY = (from.y + to.y) / 2 + (rand() * 2 - 1) * roughness * 0.25;
  const mid = { x: midX, y: midY };
  const left = displaceChannel(from, mid, roughness / 1.9, depth - 1, rand);
  const right = displaceChannel(mid, to, roughness / 1.9, depth - 1, rand);
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
  },
): BoltGeometry {
  const rand = makeRand(seed);
  const startX = options?.startX ?? width / 2 + (rand() * 2 - 1) * width * 0.15;
  const endX = options?.endX ?? width / 2 + (rand() * 2 - 1) * width * 0.3;
  const roughness = options?.roughness ?? width * 0.42;

  const channel = displaceChannel(
    { x: startX, y: 0 },
    { x: endX, y: height },
    roughness,
    6,
    rand,
  );

  const clamped = channel.map((p) => ({
    x: Math.max(2, Math.min(width - 2, p.x)),
    y: p.y,
  }));

  clamped[0] = { x: startX, y: 0 };
  clamped[clamped.length - 1] = { x: endX, y: height };

  const taperFrom = height * 0.72;
  for (let i = 0; i < clamped.length; i += 1) {
    const p = clamped[i]!;
    if (p.y > taperFrom) {
      const blend = Math.min(1, (p.y - taperFrom) / (height - taperFrom));
      p.x = p.x * (1 - blend) + endX * blend;
    }
  }
  clamped[clamped.length - 1] = { x: endX, y: height };

  const branchCount = options?.branchCount ?? 0;
  const maxBranchOriginY = height * 0.82;
  const branches: string[] = [];
  for (let b = 0; b < branchCount; b += 1) {
    const eligible = clamped
      .map((p, idx) => ({ p, idx }))
      .filter(({ p, idx }) => idx > 3 && idx < clamped.length - 2 && p.y < maxBranchOriginY);
    const pick = eligible[Math.floor(rand() * eligible.length)] ?? {
      p: clamped[Math.floor(clamped.length * 0.55)]!,
      idx: Math.floor(clamped.length * 0.55),
    };
    const origin = pick.p;
    const dir = rand() > 0.5 ? 1 : -1;
    const length = height * (0.08 + rand() * 0.14);
    const end = {
      x: Math.max(
        2,
        Math.min(width - 2, origin.x + dir * length * (0.5 + rand() * 0.5)),
      ),
      y: Math.min(height, origin.y + length),
    };
    const branchPts = displaceChannel(
      origin,
      end,
      roughness * 0.5,
      4,
      rand,
    );
    branches.push(toPath(branchPts));
  }

  return { main: toPath(clamped), branches };
}
