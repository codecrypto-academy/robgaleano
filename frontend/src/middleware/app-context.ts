import { ProductCart } from "@/types/product";
import { createContext } from "react";

export type AppState = {
  [key: string]: string | Array<string> | Array<ProductCart>;
};

interface ContextType {
  appState: AppState;
  setAppState: (state: AppState) => void;
}

export const Context = createContext<ContextType>({
  appState: {},
  setAppState: () => {},
});
