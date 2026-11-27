import { fetchMock } from "./mock";
import { aplanarErrores } from "../utils/errores";

// Las variables VITE_* se leen del archivo .env
const API_URL = import.meta.env.VITE_API_URL;
const USAR_MOCK = import.meta.env.VITE_USAR_MOCK !== "false";

// Error propio: además del mensaje, guarda el código HTTP (400, 404, 409...)
// y el cuerpo que devolvió la API.
export class ApiError extends Error {
  constructor(mensaje, status = 0, datos = null) {
    super(mensaje);
    this.name = "ApiError";
    this.status = status;
    this.datos = datos;
  }
}

// Función base: todas las demás pasan por aquí.
async function pedir(ruta, { metodo = "GET", cuerpo } = {}) {
if (USAR_MOCK && metodo !== "GET") {
    throw new ApiError(
    "Esta acción necesita la API real. Pon VITE_USAR_MOCK=false en el .env y reinicia npm run dev."
    );
}

let respuesta;
try {
    respuesta = await fetch(`${API_URL}/api/${ruta}`, {
    method: metodo,
    headers: cuerpo ? { "Content-Type": "application/json" } : {},
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
} catch {
    throw new ApiError("No se pudo conectar con el servidor. ¿Está corriendo el backend?");
}

  // DELETE responde 204 sin cuerpo
if (respuesta.status === 204) return null;

let datos = null;
try {
    datos = await respuesta.json();
} catch {
    // la respuesta no traía JSON
}

if (!respuesta.ok) {
    const mensaje = aplanarErrores(datos).join(" ") || `Error ${respuesta.status}`;
    throw new ApiError(mensaje, respuesta.status, datos);
}

return datos;
}

// Pide una lista ("recetas", "categorias", "ingredientes") o un detalle ("recetas/5")
export async function obtenerRecurso(recurso) {
if (USAR_MOCK) return fetchMock(recurso);
return pedir(`${recurso}/`);
}

export function crearReceta(datos) {
return pedir("recetas/", { metodo: "POST", cuerpo: datos });
}

// "datos" debe incluir la version que se recibió al cargar la receta
export function actualizarReceta(id, datos) {
return pedir(`recetas/${id}/`, { metodo: "PUT", cuerpo: datos });
}

export function eliminarReceta(id) {
return pedir(`recetas/${id}/`, { metodo: "DELETE" });
}