import { useEffect, useState } from "react";
import { fetchMock } from "./services/mock";
import "./App.css";
import Navbar from "./componets/Navbar";

function App() {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMock("recetas")
      .then(setRecetas)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando recetas...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      <Navbar />
      <h1>CocinaFácil</h1>
      <ul>
        {recetas.map((r) => (
          <li key={r.id}>{r.nombre} — {r.tiempo_preparacion} min</li>))}
      </ul>
    </div>
  );
}

export default App;