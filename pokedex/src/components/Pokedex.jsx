import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "../App.css"

//welcome
const Pokedex = () => {
const userName = useSelector((state) => state.name);
const [pokemonList, setPokemonList] = useState([]);
const [pokemonName, setPokemonName] = useState("");
const [pokemonTypes, setPokemonTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100")
      .then((res) => setPokemonList(res.data.results));

    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokemonTypes(res.data.results));
  }, []);

  const onClickSearchPokemon = () => {
    navigate(`/pokedex/${pokemonName}`)
  };

 //funcion para el onClick en select
  const filterType = (e) => {
    const url = e.target.value 
    axios.get(url)
    .then(res => setPokemonList(res.data.pokemon))  
  }
  const [page, setPage] = useState(1);
  const pokemonsPerPage = 10;
  const lastIndex = page * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonPaginated = pokemonList.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(pokemonList?.length / pokemonsPerPage);
  const numbers = [];
  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i);
  }




  return (
    <div className='App'>
      <h1 className='title'>Hi {userName}! <br /> Choose your pokemon</h1>
      <div>
      {/* input para el buscador */}
        <input 
          type="text"
          placeholder="search pokemon"
          value={pokemonName} 
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={onClickSearchPokemon}>Search</button>
        {/* select para types */}
        <select onChange={filterType} name="" id="">
          {pokemonTypes.map((pokemonTypes) => (
            <option  
              value={pokemonTypes.url} 
              key={pokemonTypes.name}
            >
              {pokemonTypes.name}
            </option>
          ))}
        </select> 
      </div>        
      
      <p className='keep'>Keep going!</p>

      <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev pag
          </button>
          {numbers.map((number) => (
            <button key={number} onClick={() => setPage(number)}>
              {number}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next pag
          </button>
          </div>
      <ul >
        {pokemonPaginated.map((pokemon) => (
          <PokemonCard 
            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
           
          />
        ))}
      </ul>
     
          
  
    </div>
  );
};

export default Pokedex;

// Antes del filtro:
// pokemon = {
//     name: "...",
//     url: "https:"
//     ...
// }

// pokemon = "https://"

//POKEMON

// Antes del filtro
// pokemon = {
//     "name": "ivysaur",
//     "url": "https://pokeapi.co/api/v2/pokemon/2/"
// }
// pokemon.url

// Despues del filtro
// pokemon = {
//     "pokemon": {
//         "name": "pidgey",
//         "url": "https://pokeapi.co/api/v2/pokemon/16/"
//     },
//     "slot": 1
// }
// pokemon.pokemon.url
