(() => {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.r  = 0.6 + Math.random() * 2.2;
      this.vy = -(0.15 + Math.random() * 0.5);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.alpha     = 0;
      this.alphaMax  = 0.2 + Math.random() * 0.55;
      this.alphaStep = 0.004 + Math.random() * 0.008;
      this.fading    = false;

      /* blue/cyan/white palette */
      const hue = 195 + Math.random() * 50;
      const lit = 70  + Math.random() * 25;
      this.color = `hsl(${hue},100%,${lit}%)`;
    }

    update() {
      this.x += this.vx + Math.sin(Date.now() * 0.0005 + this.y * 0.01) * 0.15;
      this.y += this.vy;

      if (!this.fading) {
        this.alpha = Math.min(this.alpha + this.alphaStep, this.alphaMax);
        if (this.alpha >= this.alphaMax) this.fading = true;
      } else {
        this.alpha -= this.alphaStep * 0.6;
      }

      if (this.y < -10 || this.alpha <= 0) this.reset(false);
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = this.r * 4;
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    resize();
    const count = Math.min(180, Math.floor((W * H) / 6000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    /* faint radial glow behind phantom — center-ish */
    const cx = W / 2, cy = H * 0.44;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.38);
    grad.addColorStop(0,   'rgba(30, 80, 255, 0.07)');
    grad.addColorStop(0.5, 'rgba(10, 40, 160, 0.04)');
    grad.addColorStop(1,   'rgba(0,   0,   0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  init();
  loop();
})();
