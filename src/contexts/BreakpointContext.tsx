import { createContext, useContext, type ReactNode } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";

const BreakpointContext = createContext(false);

export function BreakpointProvider({ children }: { children: ReactNode }) {
  const isDesktop = useIsDesktop();
  return (
    <BreakpointContext.Provider value={isDesktop}>
      {children}
    </BreakpointContext.Provider>
  );
}

export function useBreakpoint(): boolean {
  return useContext(BreakpointContext);
}
