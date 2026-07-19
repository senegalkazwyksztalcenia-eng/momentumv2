import { createLightbulbElement, setLightbulbPhase } from "./lightbulb-svg.js";
import { createStrikeElement } from "./strike.js";
import { startBulbSequence } from "./sequence.js";
import "./styles/widget.css";
import "./styles/lightbulb.css";
import "./styles/strike.css";

const STRIKE_REMOVE_MS = 1300;

/**
 * Standalone animated lightbulb widget (vanilla JS).
 * @example
 * MomentumLightbulb.mount('#my-bulb', { ctaText: 'ODKRYJ TERAZ', ctaHref: '#kup' });
 */
export class MomentumLightbulb {
  /**
   * @param {HTMLElement} container
   * @param {{
   *   ctaText?: string;
   *   ctaHref?: string;
   *   showCta?: boolean;
   *   autoplay?: boolean;
   * }} [options]
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      ctaText: "ODKRYJ TERAZ",
      ctaHref: "#",
      showCta: true,
      autoplay: true,
      ...options,
    };

    this.phase = "off";
    this.contentVisible = false;
    this.strikeEl = null;
    this.bulbEl = null;
    this.root = null;
    this.cleanup = null;

    this.render();
    if (this.options.autoplay) this.play();
  }

  render() {
    this.container.innerHTML = "";
    this.root = document.createElement("div");
    this.root.className = "ms-bulb-widget ms-bulb-widget--off";
    this.root.setAttribute("role", "img");
    this.root.setAttribute("aria-label", "Animowana żarówka z błyskawicą");

    const zone = document.createElement("div");
    zone.className = "ms-bulb-widget__zone";
    this.bulbEl = createLightbulbElement();
    zone.appendChild(this.bulbEl);
    this.root.appendChild(zone);

    if (this.options.showCta) {
      const link = document.createElement("a");
      link.className = "ms-bulb-widget__cta";
      link.href = this.options.ctaHref;
      link.innerHTML = `
        <span class="ms-bulb-widget__pill">
          <span class="ms-bulb-widget__text">${this.options.ctaText}</span>
          <span class="ms-bulb-widget__arrow">›</span>
        </span>`;
      this.root.appendChild(link);
    }

    this.container.appendChild(this.root);
  }

  setPhase(phase, contentVisible = this.contentVisible) {
    this.phase = phase;
    this.contentVisible = contentVisible;

    this.root.className = [
      "ms-bulb-widget",
      `ms-bulb-widget--${phase}`,
      contentVisible || phase === "lit" ? "ms-bulb-widget--lit" : "",
    ]
      .filter(Boolean)
      .join(" ");

    setLightbulbPhase(this.bulbEl, phase, contentVisible);
  }

  showStrike(strikeKey) {
    if (this.strikeEl) {
      this.strikeEl.remove();
      this.strikeEl = null;
    }

    const zone = this.root.querySelector(".ms-bulb-widget__zone");
    this.strikeEl = createStrikeElement(strikeKey);
    zone.insertBefore(this.strikeEl, this.bulbEl);

    window.setTimeout(() => {
      if (this.strikeEl) {
        this.strikeEl.remove();
        this.strikeEl = null;
      }
    }, STRIKE_REMOVE_MS);
  }

  play() {
    this.stop();
    this.setPhase("off", false);

    this.cleanup = startBulbSequence(({ phase, strikeKey, contentVisible }) => {
      if (phase === "strike") {
        this.showStrike(strikeKey);
      }
      this.setPhase(phase, contentVisible);
    });
  }

  stop() {
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = null;
    }
  }

  destroy() {
    this.stop();
    this.container.innerHTML = "";
  }

  /**
   * @param {string | HTMLElement} target
   * @param {ConstructorParameters<typeof MomentumLightbulb>[1]} [options]
   */
  static mount(target, options) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) throw new Error("MomentumLightbulb: target element not found");
    return new MomentumLightbulb(el, options);
  }
}

export default MomentumLightbulb;
