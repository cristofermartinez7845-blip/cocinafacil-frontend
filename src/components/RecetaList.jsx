import RecetaCard from "./RecetaCard";

// Componente de presentación: no pide datos, solo muestra lo que recibe por props.
function RecetaList({ recetas, cargando, error, categoriaFiltro }) {
  if (cargando) return <p>Cargando recetas...</p>;
  if (error) return <p className="error-form">Error: {error}</p>;

  const visibles = categoriaFiltro
    ? recetas.filter((r) => r.categoria === Number(categoriaFiltro))
    : recetas;

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