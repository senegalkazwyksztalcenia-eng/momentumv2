import { BreakpointProvider } from "./contexts/BreakpointContext";
import { HeroMomentum } from "./components/HeroMomentum";
import { InfoSection } from "./components/InfoSection";

function App() {
  return (
    <BreakpointProvider>
      <HeroMomentum />
      <InfoSection />
    </BreakpointProvider>
  );
}

export default App;
