import classNames from "classnames/bind";
import { useState } from "react";

import reactLogo from "@/assets/react.svg";
import Button from "@/components/button/button";
import Card from "@/components/card/card";
import { useGetPokemonById } from "@/hooks/queries/use-pokemon-query";

import styles from "./pokemon.module.scss";

const css = classNames.bind(styles);

const Pokemon = () => {
  const [id, setId] = useState(1);
  const { data, isPending, error } = useGetPokemonById(id);

  if (error) return <div>Error fetching Pokemon</div>;

  const pokemonImageUrl =
    data?.sprites.other["official-artwork"].front_default ??
    data?.sprites.front_default;

  return (
    <div className={css("pokemon-container")}>
      {(isPending || error) ? (
        <Card
          imageUrl={reactLogo}
          title={isPending ? "Loading" : "Error"}
          subtitle="..."
        />
      ) : (
        <Card
          imageUrl={pokemonImageUrl || ""}
          title={data?.name || "Pokemon"}
          subtitle={`Pokemon #${data?.id}`}
        />
      )}
      <div className={css("action-container")}>
        <Button
          onClick={() => setId((prev) => prev + 1)}
          variant="primary"
          size="medium"
        >
          Next Pokemon
        </Button>
      </div>
    </div>
  );
};

export default Pokemon;
