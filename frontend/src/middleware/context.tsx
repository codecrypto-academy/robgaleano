import { useState, ReactNode } from "react";
import { Context } from "./app-context";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState({});

  return (
    <Context.Provider value={{ appState, setAppState }}>
      {children}
    </Context.Provider>
  );
};