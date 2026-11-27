import { useFetch } from "../hooks/useFetch";

const FILA_VACIA = { ingrediente: "", cantidad: "", unidad: "" };

// Lista editable de ingredientes de una receta.
// Recibe las filas por props y avisa los cambios con onChange (componente controlado).
function IngredientesEditor({ ingredientes, onChange }) {
const { datos: catalogo, cargando, error } = useFetch("ingredientes");

function cambiarFila(indice, cambios) {
    onChange(ingredientes.map((fila, i) => (i === indice ? { ...fila, ...cambios } : fila)));
}

function elegirIngrediente(indice, id) {
    const elegido = catalogo.find((c) => String(c.id) === id);
    const fila = ingredientes[indice];
    // Si la unidad está vacía, se propone la unidad por defecto del ingrediente
    cambiarFila(indice, {
    ingrediente: id,
    unidad: fila.unidad || (elegido ? elegido.unidad_por_defecto : ""),
    });
}

function quitarFila(indice) {
    onChange(ingredientes.filter((_, i) => i !== indice));
}

if (error) return <p className="error-form">Error al cargar ingredientes: {error}</p>;

return (
    <fieldset className="ingredientes-editor">
    <legend>Ingredientes</legend>
    {ingredientes.map((fila, i) => (
        <div className="ingrediente-fila" key={i}>
        <select
            value={fila.ingrediente}
            onChange={(e) => elegirIngrediente(i, e.target.value)}
            disabled={cargando}
        >
            <option value="">{cargando ? "Cargando..." : "Ingrediente"}</option>
            {catalogo.map((c) => (
            <option key={c.id} value={c.id}>
                {c.nombre}
            </option>
            ))}
        </select>
        <input
            type="number"
            min="0.01"
            step="any"
            placeholder="Cantidad"
            value={fila.cantidad}
            onChange={(e) => cambiarFila(i, { cantidad: e.target.value })}
        />
        <input
            placeholder="Unidad"
            value={fila.unidad}
            onChange={(e) => cambiarFila(i, { unidad: e.target.value })}
        />
        <button type="button" className="boton-secundario" onClick={() => quitarFila(i)}>
            Quitar
        </button>
        </div>
    ))}
    <button
        type="button"
        className="boton-secundario"
        onClick={() => onChange([...ingredientes, { ...FILA_VACIA }])}
    >
        + Agregar ingrediente
    </button>
    </fieldset>
);
}

export default IngredientesEditor;