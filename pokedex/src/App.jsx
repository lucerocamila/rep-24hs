// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import Pokedex from "./components/Pokedex";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokedex/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
