import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"


//(characterCard)
const PokemonCard = ({ url }) => {


  const StatPokemon = ({ infoStat }) => {
    return (
      <li className='pokestat'>
        <h4>{infoStat.stat.name} / </h4>
        <p> {infoStat.base_stat}</p>
      </li>)
  }

  
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    axios.get(url)
      .then((res) => setPokemon(res.data))
  }, [])
  


  return (
    <Link to={`/pokedex/${pokemon.id}`} key={pokemon.id}>
     <article className="card" key={pokemon.id}>
     <header className='header'>
      <h3>{pokemon.name}</h3>
      <div className="see-more">
         more
        </div>
       </header> 
           <section className='pokemon-img'>
        <img src={pokemon.sprites?.other["official-artwork"]["front_default"]} alt="" />
       
      </section>
     
      
      </article>
      <div className="div-footer">
        <div className="type">

          <ul>
            {
              pokemon.types?.map((slot, index) => (
                <div key={slot.type.url}>{slot.type.name} {pokemon.types.length > 1 && index < pokemon.types.length - 1 ? '/' : ''}</div>

              ))

            }
          </ul>
          <h2>TYPE</h2>

        </div>
        <footer className="footer-card">
          <ul>
            {
              pokemon.stats?.map(stat => (
                <StatPokemon
                  key={stat.stat.url}
                  infoStat={stat}
                />
              ))
            }
          </ul>
        </footer>
      </div>
    </Link>
  );
};

export default PokemonCard;
