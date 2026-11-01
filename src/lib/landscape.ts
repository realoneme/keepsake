/** Paper-cut landscape outlines, from seeded noise so the server and every visit draw the same hills. */
export const VIEW_WIDTH = 1600;

function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Two big, gentle mountains far away, each with a small cap of snow and a little scissor wobble on the outline. */
export function bigMountains(h: number) {
  const r = random(311);
  const peaks = [
    { x: VIEW_WIDTH * 0.5, y: h * 0.16, w: VIEW_WIDTH * 0.7 },
    { x: VIEW_WIDTH * 0.88, y: h * 0.32, w: VIEW_WIDTH * 0.56 },
  ];
  // flat-ish near the top, long gentle slopes
  const bell = (t: number) => 1 - Math.exp(-Math.pow(t / 0.6, 2) * 2.4);
  const height = (x: number) => Math.min(...peaks.map((p) => p.y + (h - p.y) * bell(Math.abs(x - p.x) / p.w)));
  const top: [number, number][] = [];
  for (let x = 0; x <= VIEW_WIDTH; x += 10) top.push([x, height(x) + (r() - 0.5) * 4]);
  const outline = `M0 ${h} ${top.map(([x, y]) => `L${x} ${y.toFixed(1)}`).join(' ')} L${VIEW_WIDTH} ${h} Z`;
  const snow = peaks
    .map((p, i) => {
      const line = top.filter(([x]) => Math.abs(x - p.x) < p.w * 0.17);
      const down = [...line]
        .reverse()
        .map(([x, y], k) => {
          const edge = 1 - Math.abs(x - p.x) / (p.w * 0.17);
          const depth = h * (0.05 + 0.025 * Math.sin(k * 1.3 + i)) * Math.max(0.15, edge);
          return `L${x} ${(y + Math.max(3, depth)).toFixed(1)}`;
        })
        .join(' ');
      return `M${line[0][0]} ${line[0][1].toFixed(1)} ${line.map(([x, y]) => `L${x} ${y.toFixed(1)}`).join(' ')} ${down} Z`;
    })
    .join(' ');
  return { outline, snow };
}

/** A hand-cut ridge: two sine swells and a little scissor wobble. */
export function ridge(seed: number, h: number, base: number, amp: number, freq: number) {
  const r = random(seed);
  const p1 = r() * 6.28;
  const p2 = r() * 6.28;
  let d = `M0 ${h}`;
  for (let x = 0; x <= VIEW_WIDTH; x += 16) {
    const u = (x / VIEW_WIDTH) * 6.2832 * freq;
    const y = h - (base + amp * (0.62 * Math.sin(u + p1) + 0.38 * Math.sin(u * 2.3 + p2))) + (r() - 0.5) * 5;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return `${d} L${VIEW_WIDTH} ${h} Z`;
}

export function fireflies(count: number) {
  const r = random(97);
  return Array.from({ length: count }, () => ({
    x: `${(5 + r() * 90).toFixed(1)}%`,
    y: `${(48 + r() * 42).toFixed(1)}%`,
    dx: `${Math.round(-40 + r() * 80)}px`,
    dy: `${Math.round(-60 + r() * 60)}px`,
    drift: `${(5 + r() * 6).toFixed(1)}s`,
    delay: `${(-r() * 6).toFixed(1)}s`,
  }));
}
