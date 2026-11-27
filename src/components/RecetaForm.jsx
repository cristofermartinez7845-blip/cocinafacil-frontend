import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { formatearTiempo } from "../utils/formato";
import IngredientesEditor from "./IngredientesEditor";

const FORM_INICIAL = {
nombre: "",
descripcion: "",
instrucciones: "",
tiempo_preparacion: "",
porciones: "",
categoria: "",
ingredientes: [],
};

// Convierte una receta de la API en los valores (texto) que usa el formulario
function aFormulario(receta) {
return {
    nombre: receta.nombre,
    descripcion: receta.descripcion ?? "",
    instrucciones: receta.instrucciones,
    tiempo_preparacion: String(receta.tiempo_preparacion),
    porciones: String(receta.porciones),
    categoria: String(receta.categoria),
    ingredientes: (receta.ingredientes ?? []).map((i) => ({
    ingrediente: String(i.ingrediente),
    cantidad: String(i.cantidad),
    unidad: i.unidad,
    })),
};
}

// Sirve para crear (recetaInicial = null) y para editar (recetaInicial = la receta).
// onGuardar(datos) es una función async del padre: si lanza un error, se muestra aquí.
function RecetaForm({ recetaInicial = null, onGuardar, onCancelar }) {
const editando = recetaInicial !== null;
const [form, setForm] = useState(editando ? aFormulario(recetaInicial) : FORM_INICIAL);
const [enviando, setEnviando] = useState(false);
const [errorForm, setErrorForm] = useState("");
const { datos: categorias } = useFetch("categorias");

function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
}

async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre.trim()) {
    setErrorForm("El nombre es obligatorio");
    return;
    }
    if (!form.categoria) {
    setErrorForm("Selecciona una categoría");
    return;
    }
    setErrorForm("");
    setEnviando(true);

    // Los inputs entregan texto: aquí se convierte a lo que espera la API
    const datos = {
    nombre: form.nombre.trim(),
    descripcion: form.descripcion.trim(),
    instrucciones: form.instrucciones.trim(),
    tiempo_preparacion: Number(form.tiempo_preparacion),
    porciones: Number(form.porciones),
    categoria: Number(form.categoria),
    ingredientes: form.ingredientes
        .filter((fila) => fila.ingrediente !== "")
        .map((fila) => ({
        ingrediente: Number(fila.ingrediente),
        cantidad: Number(fila.cantidad),
        unidad: fila.unidad.trim(),
        })),
    };

    try {
    await onGuardar(datos);
    if (!editando) setForm(FORM_INICIAL);
    } catch (err) {
    setErrorForm(err.message);
    } finally {
    setEnviando(false);
    }
}

return (
    <form onSubmit={handleSubmit}>
    <h2>{editando ? "Editar receta" : "Nueva receta"}</h2>
    <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre de la receta"
    />
    <input
        name="tiempo_preparacion"
        type="number"
        min="1"
        value={form.tiempo_preparacion}
        onChange={handleChange}
        placeholder="Tiempo (min)"
        required
    />
    {formatearTiempo(form.tiempo_preparacion) && (
        <small>= {formatearTiempo(form.tiempo_preparacion)}</small>
    )}
    <input
        name="porciones"
        type="number"
        min="1"
        value={form.porciones}
        onChange={handleChange}
        placeholder="Porciones"
        required
    />
    <select name="categoria" value={form.categoria} onChange={handleChange}>
        <option value="">Selecciona una categoría</option>
        {categorias.map((c) => (
        <option key={c.id} value={c.id}>
            {c.nombre}
        </option>
        ))}
    </select>
    <input
        name="descripcion"
        className="campo-ancho"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción (opcional)"
    />
    <textarea
        name="instrucciones"
        className="campo-ancho"
        rows={4}
        value={form.instrucciones}
        onChange={handleChange}
        placeholder="Instrucciones paso a paso"
        required
    />
    <IngredientesEditor
        ingredientes={form.ingredientes}
        onChange={(ingredientes) => setForm((prev) => ({ ...prev, ingredientes }))}
    />
    {errorForm && <p className="error-form">{errorForm}</p>}
    <button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : editando ? "Guardar cambios" : "Guardar receta"}
    </button>
    {onCancelar && (
        <button type="button" className="boton-secundario" onClick={onCancelar}>
        Cancelar
        </button>
    )}
    </form>
);
}

export default RecetaForm;