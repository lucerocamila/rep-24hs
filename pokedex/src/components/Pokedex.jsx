import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "../App.css";

const Pokedex = () => {
  const userName = useSelector((state) => state.name);
  const [pokemonList, setPokemonList] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100&order=id&sort=${sortOrder}`)
      .then((res) => setPokemonList(res.data.results));
  }, [sortOrder]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokemonTypes(res.data.results));
  }, []);


  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

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


      <p className='keep'>go go go!</p>

      <div className="sort-options">
        <label>Order:</label>
        <select onChange={(e) => handleSortOrderChange(e.target.value)} value={sortOrder}>
          <option value='asc'>Asc</option>
          <option value='desc'>Desc</option>
        </select>
      </div>

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

      <ul>
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
