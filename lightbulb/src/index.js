import { MomentumLightbulb } from "./widget.js";

if (typeof window !== "undefined") {
  window.MomentumLightbulb = MomentumLightbulb;

  document.querySelectorAll("[data-momentum-lightbulb]").forEach((el) => {
    MomentumLightbulb.mount(el, {
      ctaText: el.dataset.ctaText || "ODKRYJ TERAZ",
      ctaHref: el.dataset.ctaHref || "#",
      showCta: el.dataset.showCta !== "false",
      autoplay: el.dataset.autoplay !== "false",
    });
  });
}

export default MomentumLightbulb;
