import { createContext } from 'react';

type AppState = {
  [key: string]: string;
}

interface ContextType {
  appState: AppState;
  setAppState: (state: AppState) => void;
}

export const Context = createContext<ContextType>({
  appState: {},
  setAppState: () => {},
});
