import "./pokemon-list.module.scss";

import { useGetPokemonList } from "@/hooks/queries/use-pokemon-query";
import { Pokemon } from "@/types/tcg.types";

const PokemonList = () => {
  const { data, isPending, isError } = useGetPokemonList(1, 48, "dragonite");
  const pokemonCards: Pokemon[] | undefined = data;

  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-16">
        {!isPending && !isError ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {pokemonCards?.map((card) => (
                <div key={card.id} className="group relative">
                  <img
                    alt={card.name}
                    src={card.images.large}
                    className="size-fit rounded-md bg-gray-200 object-contain group-hover:opacity-75 aspect-auto"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={card.cardmarket.url}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {card.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {card.supertype}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {card.cardmarket.prices.averageSellPrice} €
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-dvh w-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
