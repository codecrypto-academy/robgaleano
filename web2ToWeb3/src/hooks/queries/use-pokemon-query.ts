import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  makePokemonApiQueryOptions,
  makePokemonTcgApiQueryOptions,
} from "@/api/react-query-config";
import { Pokemon } from "@/types/pokemon";
import { Pokemon as PokemonCard } from "@/types/tcg.types";

export const useGetPokemonById = (
  pokemonId: number
): UseQueryResult<Pokemon> => {
  const pokemonByIdQuery = useQuery<Pokemon>(
    makePokemonApiQueryOptions(pokemonId, () => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
        (res) => res.json()
      );
    })
  );
  return pokemonByIdQuery;
};

export const useGetPokemonList = (
  pageNumber: number,
  pageSize: number,
  pokemonName: string
): UseQueryResult<PokemonCard[]> => {
  const pokemonCardListQuery = useQuery<PokemonCard[]>(
    makePokemonTcgApiQueryOptions(pokemonName, () => {
      const headers = {
        "Content-Type": "application/json",
        "X-Api-Key": import.meta.env.VITE_POKEMON_TCG_API_KEY,
      };

      return fetch(
        `https://api.pokemontcg.io/v2/cards?page=${pageNumber}&pageSize=${pageSize}&q=name:${pokemonName}`,
        { headers }
      )
        .then((response) => response.json())
        .then((data) => data.data);
    })
  );
  return pokemonCardListQuery;
};
