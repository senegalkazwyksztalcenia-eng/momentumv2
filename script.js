// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Drifting blue ember / aura particle field ----------
(function auraField() {
  const canvas = document.getElementById("aura-canvas");
  if (!canvas) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  const pointer = { x: -9999, y: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    const target = Math.round((width * height) / 16000);
    const count = Math.max(40, Math.min(160, target));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(makeParticle(Math.random() * height));
    }
  }

  function makeParticle(startY) {
    return {
      x: Math.random() * width,
      y: startY,
      r: Math.random() * 2.2 + 0.6,
      speed: Math.random() * 0.5 + 0.15,
      drift: (Math.random() - 0.5) * 0.4,
      hue: 190 + Math.random() * 40, // cyan -> blue
      alpha: Math.random() * 0.5 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    };
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      // rise upward
      p.y -= p.speed;
      p.x += p.drift;
      p.twinkle += 0.03;

      // gentle repulsion from the cursor
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < 14000) {
        const f = (14000 - dist2) / 14000;
        const d = Math.sqrt(dist2) || 1;
        p.x += (dx / d) * f * 2.2;
        p.y += (dy / d) * f * 2.2;
      }

      // recycle when off-screen
      if (p.y < -10) {
        Object.assign(p, makeParticle(height + 10));
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      const a = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      glow.addColorStop(0, `hsla(${p.hue}, 100%, 78%, ${a})`);
      glow.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) requestAnimationFrame(step);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    },
    { passive: true }
  );
  window.addEventListener("pointerleave", () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });

  resize();
  if (reduceMotion) {
    step(); // draw a single static frame
  } else {
    requestAnimationFrame(step);
  }
})();
