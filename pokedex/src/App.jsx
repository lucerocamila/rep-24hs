import { HashRouter, Route, Routes } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import Pokedex from "./components/Pokedex";
import InputName from "./components/InputName";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<InputName />} />
       //inicio rutas protegidas
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
         <Route path="/pokedex/:id" element={<PokemonDetail />} /> {/* para el id dinamico */}
        </Route> //cierre rutas protegidas

      </Routes>
    </HashRouter>
  );
}

export default App;
