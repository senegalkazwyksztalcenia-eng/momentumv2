import { BreakpointProvider } from "./contexts/BreakpointContext";
import { HeroMomentum } from "./components/HeroMomentum";
import { EbookSection } from "./components/EbookSection";
import { InfoSection } from "./components/InfoSection";

function App() {
  return (
    <BreakpointProvider>
      <HeroMomentum />
      <EbookSection />
      <InfoSection />
    </BreakpointProvider>
  );
}

export default App;
