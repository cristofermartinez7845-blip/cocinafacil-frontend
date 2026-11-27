import { useState } from "react";
import Navbar from "./components/Navbar";
import RecetaForm from "./components/RecetaForm";
import CategoriaFiltro from "./components/CategoriaFiltro";
import RecetaList from "./components/RecetaList";
import { useFetch } from "./hooks/useFetch";
import { crearReceta } from "./services/api";
import "./App.css";

function App() {
  const [categoria, setCategoria] = useState("");
  // La lista de recetas se pide aquí, en un solo lugar, para poder recargarla
  const { datos: recetas, cargando, error, recargar } = useFetch("recetas");

  async function guardarReceta(datos) {
    await crearReceta(datos); // POST /api/recetas/
    recargar(); // vuelve a pedir la lista para ver la receta nueva
  }

  return (
    <div>
      <Navbar />
      <RecetaForm onGuardar={guardarReceta} />
      <h2>Recetas</h2>
      <CategoriaFiltro value={categoria} onChange={setCategoria} />
      <RecetaList
        recetas={recetas}
        cargando={cargando}
        error={error}
        categoriaFiltro={categoria}
      />
    </div>
  );
}

export default App;