import { useFetch } from "../hooks/useFetch";
import RecetaCard from "./RecetaCard";

function RecetaList({ categoriaFiltro, recetasNuevas = [] }) {
  const { datos: recetas, cargando, error } = useFetch("recetas");

  if (cargando) return <p>Cargando recetas...</p>;
  if (error) return <p>Error: {error}</p>;

  const todas = [...recetas, ...recetasNuevas];
  const visibles = categoriaFiltro
    ? todas.filter((r) => r.categoria === Number(categoriaFiltro))
    : todas;

  if (visibles.length === 0) return <p>No hay recetas en esta categoría.</p>;

  return (
    <div>
      {visibles.map((r) => (
        <RecetaCard key={r.id} receta={r} />
      ))}
    </div>
  );
}

export default RecetaList;