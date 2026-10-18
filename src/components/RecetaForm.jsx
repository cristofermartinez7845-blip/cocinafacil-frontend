import { useEffect, useState } from "react";
import { fetchMock } from "../services/mock";

const FORM_INICIAL = {
  nombre: "",
  tiempo_preparacion: "",
  porciones: "",
  categoria: "",
};

function RecetaForm({ onSubmit = (receta) => console.log("Receta nueva:", receta) }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [categorias, setCategorias] = useState([]);
  const [errorForm, setErrorForm] = useState("");

  // Trae las categorias para llenar el selector
  useEffect(() => {
    fetchMock("categorias").then(setCategorias);
  }, []);

  // Una sola funcion sirve para todos los campos (usa el "name" del input)
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nombre.trim()) {
      setErrorForm("El nombre es obligatorio");
      return;
    }

    setErrorForm("");
    onSubmit({
      id: Date.now(), // id temporal, mientras no hay base de datos
      nombre: form.nombre,
      tiempo_preparacion: Number(form.tiempo_preparacion),
      porciones: Number(form.porciones),
      categoria: Number(form.categoria),
    });
    setForm(FORM_INICIAL); // limpia el formulario
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva receta</h2>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre de la receta"
      />

      <input
        name="tiempo_preparacion"
        type="number"
        value={form.tiempo_preparacion}
        onChange={handleChange}
        placeholder="Tiempo (min)"
      />

      <input
        name="porciones"
        type="number"
        value={form.porciones}
        onChange={handleChange}
        placeholder="Porciones"
      />

      <select name="categoria" value={form.categoria} onChange={handleChange}>
        <option value="">Selecciona una categoria</option>
        {categorias.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      {errorForm && <p style={{ color: "red" }}>{errorForm}</p>}

      <button type="submit">Guardar receta</button>
    </form>
  );
}

export default RecetaForm;
