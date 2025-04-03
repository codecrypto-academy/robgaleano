import { useState, ReactNode } from "react";
import { Context } from "@/middleware/app-context";
import type { AppState } from "@/middleware/app-context";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppState>({
    cart: [],
    account: ""
  });

  return (
    <Context.Provider value={{ appState, setAppState }}>
      {children}
    </Context.Provider>
  );
};
