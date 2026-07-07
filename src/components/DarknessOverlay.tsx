import "./DarknessOverlay.css";

interface DarknessOverlayProps {
  visible: boolean;
}

export function DarknessOverlay({ visible }: DarknessOverlayProps) {
  return (
    <div
      className={`darkness-overlay ${visible ? "darkness-overlay--visible" : ""}`}
      aria-hidden="true"
    />
  );
}
