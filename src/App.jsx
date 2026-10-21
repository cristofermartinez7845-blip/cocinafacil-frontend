import { useState } from "react";
import Navbar from "./components/Navbar";
import RecetaForm from "./components/RecetaForm";
import CategoriaFiltro from "./components/CategoriaFiltro";
import RecetaList from "./components/RecetaList";
import "./App.css";

function App() {
  const [categoria, setCategoria] = useState("");
  const [recetasNuevas, setRecetasNuevas] = useState([]);

  function agregarReceta(receta) {
    setRecetasNuevas((prev) => [...prev, receta]);
  }

  return (
    <div>
      <Navbar />

      <RecetaForm onSubmit={agregarReceta} />

      <h2>Recetas</h2>
      <CategoriaFiltro value={categoria} onChange={setCategoria} />
      <RecetaList categoriaFiltro={categoria} recetasNuevas={recetasNuevas} />
    </div>
  );
}

export default App;