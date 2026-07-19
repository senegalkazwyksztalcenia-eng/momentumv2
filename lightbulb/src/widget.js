import { createLightbulbElement, setLightbulbPhase } from "./lightbulb-svg.js";
import { startBulbSequence } from "./sequence.js";
import "./styles/widget.css";
import "./styles/lightbulb.css";

/**
 * Standalone animated lightbulb (vanilla JS).
 * @example
 * MomentumLightbulb.mount('#my-bulb');
 */
export class MomentumLightbulb {
  /**
   * @param {HTMLElement} container
   * @param {{
   *   size?: string;
   *   autoplay?: boolean;
   * }} [options]
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      size: "clamp(140px, 32vw, 280px)",
      autoplay: true,
      ...options,
    };

    this.phase = "off";
    this.contentVisible = false;
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
    this.root.style.setProperty("--bulb-w", this.options.size);
    this.root.setAttribute("role", "img");
    this.root.setAttribute("aria-label", "Animowana żarówka");

    this.bulbEl = createLightbulbElement();
    this.root.appendChild(this.bulbEl);
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

  play() {
    this.stop();
    this.setPhase("off", false);

    this.cleanup = startBulbSequence(({ phase, contentVisible }) => {
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
