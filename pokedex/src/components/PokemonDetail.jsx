import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css"
const PokemonDetail = () => {

  const { id } = useParams(); 

  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data));
  }, [id]);

  

  return (
    <div key={pokemon.id}>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites?.other.dream_world.front_default}  alt="" />
      <div className={`display-container`} >
      <div className='display-header'>
      <article className='pokemon-display'>
      <h1 className= 'display-name' >{pokemon?.name}</h1>
      <img src={pokemon.sprites?.other['official-artwork'].front_default} alt="" />
    </article>
    <ul className='display-type'>
        {
          pokemon.types?.map((slot, index) => (
            <div key={slot.type.url}>{slot.type.name} {pokemon.types?.length >1 && index < pokemon.types.length-1 ? '/': ''}</div>
            
          ))
        }
        </ul>
      </div>
    <ul className='display-stats-container'>
          {
            pokemon.stats?.map(stat => (
              <li key={stat.stat.url} className='display-stats'>
                <h4>{stat.stat.name} / <span>{stat.base_stat}</span></h4>
              </li>
            ))        

          }            

        </ul>
    </div>
      
    </div>
    
  );
};

export default PokemonDetail;

