function RecetaCard({ receta }) {
  return (
    <div className="receta-card">
      <h3>{receta.nombre}</h3>
      <p>
        {receta.tiempo_preparacion} min - {receta.porciones} porciones
      </p>
    </div>
  );
}

export default RecetaCard;