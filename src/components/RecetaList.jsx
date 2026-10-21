import { useEffect, useState } from "react";
import { fetchMock } from "../services/mock";
import RecetaCard from "./RecetaCard";

function RecetaList({ categoriaFiltro = "", recetasNuevas = [] }) {
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

  const todas = [...recetas, ...recetasNuevas];

  const visibles = categoriaFiltro
    ? todas.filter((r) => r.categoria === Number(categoriaFiltro))
    : todas;

  if (visibles.length === 0) return <p>No hay recetas en esta categoria.</p>;

  return (
    <div>
      {visibles.map((r) => (
        <RecetaCard key={r.id} receta={r} />
      ))}
    </div>
  );
}

export default RecetaList;