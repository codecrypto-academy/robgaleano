export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
        other: {
            'official-artwork': {
                front_default: string;
                front_shiny: string;
            }
        }
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: {
            name: string;
            url: string;
        }
    }[];
};
