import { HashRouter, Route, Routes } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import Pokedex from "./components/Pokedex";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Pokedex />} />
         <Route path="/pokedex/:id" element={<PokemonDetail />} /> {/* para el id dinamico */}
      </Routes>
    </HashRouter>
  );
}

export default App;
