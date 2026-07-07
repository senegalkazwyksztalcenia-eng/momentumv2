import { BreakpointProvider } from "./contexts/BreakpointContext";
import { HeroMomentum } from "./components/HeroMomentum";

function App() {
  return (
    <BreakpointProvider>
      <HeroMomentum />
    </BreakpointProvider>
  );
}

export default App;
