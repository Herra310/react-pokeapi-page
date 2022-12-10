import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import CardPokemon from './CardPokemon';
import Loader from './Loader';

function PokemonList() {

    const {allPokemons, loading, filteredPokemons }:any = useContext(PokemonContext);

        return (
            <div className='container'>
                {loading ? (
                    <Loader />
                ) : (
                    <div className=''>
                        {filteredPokemons.length ? (
                            <div className='card-list-pokemon'>
                                {filteredPokemons.map((pokemon :any) => (
                                    <CardPokemon pokemon={pokemon} key={pokemon.id} />
                                ))}
                            </div>
                        ) : (
                            <div className='card-list-pokemon'>
                                {allPokemons.map((pokemon :any) => (
                                    <CardPokemon pokemon={pokemon} key={pokemon.id} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
  
}

export default PokemonList;