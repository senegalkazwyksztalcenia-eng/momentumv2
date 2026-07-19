import { MomentumLightbulb } from "./widget.js";

if (typeof window !== "undefined") {
  window.MomentumLightbulb = MomentumLightbulb;

  document.querySelectorAll("[data-momentum-lightbulb]").forEach((el) => {
    MomentumLightbulb.mount(el, {
      size: el.dataset.size || undefined,
      autoplay: el.dataset.autoplay !== "false",
    });
  });
}

export default MomentumLightbulb;
