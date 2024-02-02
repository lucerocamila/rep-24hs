
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const PokemonCard = ({ url }) => {
  const StatPokemon = ({ infoStat }) => {
    return (
      <li className='pokestat'>
        <h4>{infoStat.stat.name} / </h4>
        <p> {infoStat.base_stat}</p>
      </li>
    );
  };

  const [pokemon, setPokemon] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortBy = queryParams.get("sortBy");
  const sortOrder = queryParams.get("sortOrder");

  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));
  }, [url]);

  return (
    <Link
      to={{
        pathname: `/pokedex/${pokemon.id}`,
        search: `?sortBy=${sortBy}&sortOrder=${sortOrder}`,
      }}
      key={pokemon.id}
    >
      <article className="card" key={pokemon.id}>
        <header className='header'>
          <h3>{pokemon.name}</h3>
          <div className="see-more">more</div>
        </header>
        <section className='pokemon-img'>
          <img src={pokemon.sprites?.other["official-artwork"]["front_default"]} alt="" />
        </section>
      </article>
      <div className="div-footer">
        <div className="type">
          <p className='display-name' style={{ display: 'flex', alignSelf: 'flex-start' }}>
            <b>{pokemon?.id}</b>
          </p>
          <p className='display-name' style={{ display: 'flex', alignSelf: 'flex-start' }}>
            <b>Weight:&nbsp;</b> {pokemon?.weight / 10}KG
          </p>
          <p className='display-name' style={{ display: 'flex', alignSelf: 'flex-start' }}>
            <b>Height:&nbsp;</b> {pokemon?.height / 10}M
          </p>
          <ul>
            {pokemon.types?.map((slot, index) => (
              <div key={slot.type.url}>{slot.type.name} {pokemon.types.length > 1 && index < pokemon.types.length - 1 ? '/' : ''}</div>
            ))}
          </ul>
          <h2>TYPE</h2>
        </div>
        <footer className="footer-card">
          <ul>
            {pokemon.stats?.map(stat => (
              <StatPokemon
                key={stat.stat.url}
                infoStat={stat}
              />
            ))}
          </ul>
        </footer>
      </div>
    </Link>
  );
};

export default PokemonCard;
