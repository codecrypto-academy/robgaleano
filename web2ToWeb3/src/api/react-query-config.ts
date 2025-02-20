import { QueryObserverOptions, QueryStatus } from "@tanstack/react-query";

import { DEFAULT_QUERY_CONFIG } from "@/constants/react-query";

const { STALE_TIME, GARBAGE_COLLECT_TIME } = DEFAULT_QUERY_CONFIG;

const makePokemonApiQueryKey = (pokeId: number) => [`pokemon-${pokeId}`];
const makePokemonTcgApiQueryKey = (queryParam: string) => [`pokemon-${queryParam}`];

export const makePokemonApiQueryOptions = <T>(
  pokemonId: number | null,
  queryFn: () => Promise<T>
): QueryObserverOptions<T> => ({
  queryKey: makePokemonApiQueryKey(pokemonId ?? NaN),
  queryFn,
  staleTime: STALE_TIME,
  gcTime: GARBAGE_COLLECT_TIME,
  enabled: !!pokemonId,
  retryOnMount: false,
  refetchOnWindowFocus: false,
  retry: 0,
});

export const makePokemonTcgApiQueryOptions = <T>(
  pokemonName: string | null,
  queryFn: () => Promise<T>
): QueryObserverOptions<T> => ({
  queryKey: makePokemonTcgApiQueryKey(pokemonName ?? "unknown_query_param"),
  queryFn,
  staleTime: STALE_TIME,
  gcTime: GARBAGE_COLLECT_TIME,
  enabled: !!pokemonName,
  retryOnMount: false,
  refetchOnWindowFocus: false,
  retry: 0,
});

enum QueryStatuses {
    success = "success",
    pending = "pending",
    error = "error",
  }
  
  export const isReactQueryFinished = (
    queryStatus: QueryStatus | undefined
  ): boolean =>
    queryStatus === QueryStatuses.success || queryStatus === QueryStatuses.error;
  
  export const isReactQuerySuccessful = (
    queryStatus: QueryStatus | undefined
  ): boolean => queryStatus === QueryStatuses.success;
  
  export const isReactQueryPending = (
    queryStatus: QueryStatus | undefined
  ): boolean => queryStatus === QueryStatuses.pending;
  
  export const isReactQueryError = (
    queryStatus: QueryStatus | undefined
  ): boolean => queryStatus === QueryStatuses.error;