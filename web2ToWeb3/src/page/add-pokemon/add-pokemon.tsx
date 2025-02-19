import classNames from 'classnames/bind';
import { useForm } from "react-hook-form";

import Button from "@/components/button/button";

import styles from './add-pokemon.module.scss';

const css = classNames.bind(styles);

interface PokemonFormInputs {
  name: string;
  type: string;
}

const AddPokemon = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PokemonFormInputs>();

  const onSubmit = (data: PokemonFormInputs) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className={css('add-pokemon-container')}>
      <form onSubmit={handleSubmit(onSubmit)} className={css('add-pokemon-form')}>
        <div className={css('form-group')}>
          <input
            {...register("name", { required: "Pokemon name is required" })}
            placeholder="Pokemon Name"
            className={css('form-input')}
          />
          {errors.name && <span className={css('error')}>{errors.name.message}</span>}
        </div>

        <div className={css('form-group')}>
          <input
            {...register("type", { required: "Pokemon type is required" })}
            placeholder="Pokemon Type"
            className={css('form-input')}
          />
          {errors.type && <span className={css('error')}>{errors.type.message}</span>}
        </div>

        <Button type="submit">Add Pokemon</Button>
      </form>
    </div>
  );
};

export default AddPokemon;