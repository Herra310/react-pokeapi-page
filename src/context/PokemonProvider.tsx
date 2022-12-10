import { ProviderProps, useState, useEffect } from "react"
import { useForm } from "../hook/useForm"
import { PokemonContext } from "./PokemonContext"

// @ts-ignore
function PokemonProvider({ children }) {

  const [allPokemons, setallPokemons] = useState([])
  const [globalPokemons, setGlobalPokemons] = useState([])
  const [offset, setOffset] = useState(0)

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  //@ts-ignore
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: ''
  })


  const baseURL = 'https://pokeapi.co/api/v2/'

  //primeros 50 pkm
  async function getAllPokemons(limit: number = 25) {

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon: any) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();

      return data;
    })
    const results = await Promise.all(promises);

    //@ts-ignore
    setallPokemons(results);
    setLoading(false);
  }

  // todos los pkm

  async function getGlobalPokemons() {

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon: any) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();

      return data;
    })
    const results = await Promise.all(promises);

    //@ts-ignore
    setGlobalPokemons([
      ...allPokemons, ...results
    ]);
    setLoading(false);
  }

  //obtener 1 pkm por id 

  async function getPokemonById(id: number) {
    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();

    return data;
  }

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  const onClickLoadMore = () => {
    setOffset(offset + 25);
  };

  // Filter Function + State
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });

  const [filteredPokemons, setfilteredPokemons] = useState([]);

  const handleCheckbox = (e:any) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      
      const filteredResults = globalPokemons.filter(pokemon =>
        //@ts-ignore
        pokemon.types
          .map((type:any) => type.type.name)
          .includes(e.target.name)
      );
      setfilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        pokemon =>
          //@ts-ignore
          !pokemon.types
            .map((type:any) => type.type.name)
            .includes(e.target.name)
      );
      setfilteredPokemons([...filteredResults]);
    }
  };

  return (
    <PokemonContext.Provider value={{
      valueSearch,
      onInputChange,
      onResetForm,
      allPokemons,
      globalPokemons,
      getPokemonById,
      onClickLoadMore,
      loading,
      setLoading,
      active,
      setActive,
      handleCheckbox,
      filteredPokemons,
    }}>
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider;