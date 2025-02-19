import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route,Routes } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";
import AddPokemon from "@/page/add-pokemon/add-pokemon";
import PageContent from "@/page/content/page-content";
import PageNotFound from "@/page/not-found/page-not-found";
import PageRoot from "@/page/page-root";
import Wallet from "@/page/wallet/wallet";

import PokemonList from "./page/pokemon-list/pokemon-list";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PageRoot />}>
            <Route index element={<PageContent />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="pokemon-list" element={<PokemonList />} />
            <Route path="add-pokemon" element={<AddPokemon />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainLayout>
    </QueryClientProvider>
  );
};

export default App;
