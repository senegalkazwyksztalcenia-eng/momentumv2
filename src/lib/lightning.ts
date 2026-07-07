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

  const branchCount = options?.branchCount ?? 3;
  const branches: string[] = [];
  for (let b = 0; b < branchCount; b += 1) {
    const idx =
      4 + Math.floor(rand() * Math.max(1, clamped.length - 12));
    const origin = clamped[idx]!;
    const dir = rand() > 0.5 ? 1 : -1;
    const length = height * (0.12 + rand() * 0.2);
    const end = {
      x: Math.max(
        2,
        Math.min(width - 2, origin.x + dir * length * (0.5 + rand() * 0.5)),
      ),
      y: origin.y + length,
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

/**
 * Horizontal discharge from a pill edge inward — for CTA interior bolts.
 */
export function generateInwardBolt(
  width: number,
  height: number,
  seed: number,
  fromLeft: boolean,
  options?: {
    branchCount?: number;
    roughness?: number;
  },
): BoltGeometry {
  const rand = makeRand(seed);
  const roughness = options?.roughness ?? height * 0.38;
  const startX = fromLeft ? 2 : width - 2;
  const endX = fromLeft
    ? width * (0.52 + rand() * 0.22)
    : width * (0.48 - rand() * 0.22);
  const startY = height * (0.18 + rand() * 0.55);
  const endY = height * (0.22 + rand() * 0.5);

  const channel = displaceHorizontal(
    { x: startX, y: startY },
    { x: endX, y: endY },
    roughness,
    6,
    rand,
  );

  const clamped = channel.map((p) => ({
    x: Math.max(2, Math.min(width - 2, p.x)),
    y: Math.max(2, Math.min(height - 2, p.y)),
  }));

  const branchCount = options?.branchCount ?? 2;
  const branches: string[] = [];
  for (let b = 0; b < branchCount; b += 1) {
    const idx = 3 + Math.floor(rand() * Math.max(1, clamped.length - 8));
    const origin = clamped[idx]!;
    const dir = fromLeft ? 1 : -1;
    const length = width * (0.1 + rand() * 0.16);
    const end = {
      x: Math.max(2, Math.min(width - 2, origin.x + dir * length)),
      y: Math.max(
        2,
        Math.min(height - 2, origin.y + (rand() * 2 - 1) * height * 0.22),
      ),
    };
    const branchPts = displaceHorizontal(
      origin,
      end,
      roughness * 0.48,
      4,
      rand,
    );
    branches.push(toPath(branchPts));
  }

  return { main: toPath(clamped), branches };
}

function displaceHorizontal(
  from: Point,
  to: Point,
  roughness: number,
  depth: number,
  rand: () => number,
): Point[] {
  if (depth === 0) {
    return [from, to];
  }
  const midX = (from.x + to.x) / 2 + (rand() * 2 - 1) * roughness * 0.28;
  const midY = (from.y + to.y) / 2 + (rand() * 2 - 1) * roughness;
  const mid = { x: midX, y: midY };
  const left = displaceHorizontal(from, mid, roughness / 1.9, depth - 1, rand);
  const right = displaceHorizontal(mid, to, roughness / 1.9, depth - 1, rand);
  return [...left.slice(0, -1), ...right];
}
