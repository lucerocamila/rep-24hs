import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import "../App.css";

const Pokedex = () => {
  const userName = useSelector((state) => state.name);
  const [pokemonList, setPokemonList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100&order=id&sort=${sortOrder}`)
      .then((res) => {
        setPokemonList(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [sortOrder]);

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortPokemonList = (list, order) => {
    return list.slice().sort((a, b) => {
      const idA = a.url.split("/").reverse()[1];
      const idB = b.url.split("/").reverse()[1];
      return order === "asc" ? idA - idB : idB - idA;
    });
  };

  const [page, setPage] = useState(1);
  const pokemonsPerPage = 10;
  const lastIndex = page * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonPaginated = sortPokemonList(pokemonList, sortOrder).slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(pokemonList?.length / pokemonsPerPage);
  const numbers = [];
  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i);
  }

  return (
    <div className="App">
      <h1 className="title">
        Hi player! <br /> Choose your Pokemon
      </h1>

      <p className="keep">go go go!</p>

     <div className="sort-options">
      <p className="sort-label">Order by ID:</p>
      <button className="sort-button" onClick={handleSortOrderChange}>
        {sortOrder === "asc" ? "Asc" : "Desc"}
      </button>
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
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
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
