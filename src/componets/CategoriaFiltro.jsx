import { useEffect, useState } from "react";
import { fetchMock } from "../services/mock";

function CategoriaFiltro({ value = "", onChange = () => {} }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchMock("categorias").then(setCategorias);
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Todas las categorias</option>
      {categorias.map((c) => (
        <option key={c.id} value={c.id}>
          {c.nombre}
        </option>
      ))}
    </select>
  );
}

export default CategoriaFiltro;
