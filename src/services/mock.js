// src/services/mock.js
//
// Simula llamadas a la API mientras el backend (Django REST Framework)
// aún no está conectado.

const categorias = [
  { id: 1, nombre: "Desayuno" },
  { id: 2, nombre: "Almuerzo" },
  { id: 3, nombre: "Postre" },
  { id: 4, nombre: "Vegano" },
];

const ingredientes = [
  { id: 1, nombre: "Harina", unidad_por_defecto: "g" },
  { id: 2, nombre: "Huevo", unidad_por_defecto: "unidad" },
  { id: 3, nombre: "Leche", unidad_por_defecto: "ml" },
  { id: 4, nombre: "Azúcar", unidad_por_defecto: "g" },
  { id: 5, nombre: "Tomate", unidad_por_defecto: "unidad" },
  { id: 6, nombre: "Arroz", unidad_por_defecto: "g" },
];

const recetas = [
  {
    id: 1,
    nombre: "Panqueques clásicos",
    instrucciones: "Mezclar los ingredientes secos, añadir los líquidos y cocinar en sartén caliente hasta dorar por ambos lados.",
    tiempo_preparacion: 20,
    porciones: 4,
    categoria: 1,
    fecha_creacion: "2026-08-20",
    ingredientes: [
      { ingrediente: 1, cantidad: 200, unidad: "g" },
      { ingrediente: 2, cantidad: 2, unidad: "unidad" },
      { ingrediente: 3, cantidad: 250, unidad: "ml" },
    ],
  },
  {
    id: 2,
    nombre: "Arroz con tomate",
    instrucciones: "Sofreír el tomate, agregar el arroz y caldo, cocinar a fuego lento hasta que el arroz esté tierno.",
    tiempo_preparacion: 35,
    porciones: 3,
    categoria: 2,
    fecha_creacion: "2026-08-22",
    ingredientes: [
      { ingrediente: 6, cantidad: 300, unidad: "g" },
      { ingrediente: 5, cantidad: 2, unidad: "unidad" },
    ],
  },
  {
    id: 3,
    nombre: "Flan de vainilla",
    instrucciones: "Batir los huevos con leche y azúcar, verter en molde acaramelado y cocinar a baño María.",
    tiempo_preparacion: 60,
    porciones: 6,
    categoria: 3,
    fecha_creacion: "2026-08-25",
    ingredientes: [
      { ingrediente: 2, cantidad: 4, unidad: "unidad" },
      { ingrediente: 3, cantidad: 500, unidad: "ml" },
      { ingrediente: 4, cantidad: 150, unidad: "g" },
    ],
  },
];

const DATASETS = { recetas, ingredientes, categorias };

function delayAleatorio(minMs = 300, maxMs = 800) {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchMock(recurso) {
  await delayAleatorio();
  const datos = DATASETS[recurso];
  if (!datos) {
    throw new Error(`Recurso "${recurso}" no encontrado (404 simulado)`);
  }
  return structuredClone(datos);
}

export async function fetchMockDetalle(recurso, id) {
  await delayAleatorio();
  const datos = DATASETS[recurso];
  if (!datos) {
    throw new Error(`Recurso "${recurso}" no encontrado (404 simulado)`);
  }
  const item = datos.find((d) => d.id === id);
  if (!item) {
    throw new Error(`Elemento con id ${id} no encontrado en "${recurso}"`);
  }
  return structuredClone(item);
}






















