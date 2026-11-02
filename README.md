# CocinaFácil - Frontend

Aplicación web para gestionar y organizar recetas de cocina. Este repositorio contiene la interfaz de usuario, construida con React y Vite. Consume la API REST del backend (Django REST Framework).

**Backend (contraparte):** https://github.com/cristofermartinez7845-blip/cocinafacil-backend

## Equipo

- Cristopher Francisco Martínez Pérez
- Xóchilt Nicole Rivera Guadrón
- Bryan Miguel Polanco Argueta

Asignatura: Herramientas Avanzadas para el Desarrollo de Aplicaciones (102HAD1), UTLA, Ciclo II-2026.

## Problema que resuelve

Muchas personas guardan sus recetas de forma dispersa (cuadernos, notas del celular, capturas). CocinaFácil centraliza las recetas en un solo lugar, organizadas por categoría, con sus ingredientes, tiempo de preparación y porciones.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React + Vite | Interfaz de usuario |
| JavaScript (ES6+) | Lógica del cliente |
| Git y GitHub | Control de versiones, dos repositorios separados |

No se usan librerías de terceros adicionales por ahora. Si se agrega alguna, se justifica en esta sección.

## Estructura del proyecto

```
src/
├── components/   Componentes de React (Navbar, RecetaForm, RecetaCard, RecetaList, CategoriaFiltro)
├── hooks/        Custom hook useFetch (cargando, datos y error)
├── services/     mock.js (datos de prueba) y api.js (mock o API real)
├── utils/        Funciones utilitarias (formatearTiempo)
├── App.jsx       Componente principal
└── main.jsx      Punto de entrada
```

## Instalación

Requisitos: Node.js 18 o superior.

```powershell
git clone https://github.com/cristofermartinez7845-blip/cocinafacil-frontend.git
cd cocinafacil-frontend
npm install
copy .env.example .env
npm run dev
```

La aplicación queda disponible en `http://localhost:5173/`.

## Variables de entorno

Se configuran en el archivo `.env` (no se sube a GitHub; el ejemplo está en `.env.example`).

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | Dirección del backend, por defecto `http://localhost:8000` |
| `VITE_USAR_MOCK` | `true` usa los datos de prueba; `false` consume la API real |

Después de cambiar el `.env`, hay que reiniciar `npm run dev`.

## Uso con la API real

1. Levantar el backend (ver el README del repositorio del backend).
2. En el `.env` del frontend, poner `VITE_USAR_MOCK=false`.
3. Reiniciar `npm run dev`.

## Flujo de trabajo en Git

Se usa GitHub Flow:

| Rama | Propósito |
|---|---|
| `main` | Código estable y probado |
| `develop` | Integración de las funcionalidades |
| `feature/<nombre>` | Una rama por tarea, creada desde `develop` |
| `hotfix/<nombre>` | Correcciones urgentes |

Todo cambio llega a `develop` mediante un Pull Request revisado por otro integrante del equipo.

### Convención de commits

| Prefijo | Uso | Ejemplo |
|---|---|---|
| `feat:` | Nueva funcionalidad | `feat: agregar filtro por categoria` |
| `fix:` | Corrección de un error | `fix: corregir validacion del formulario` |
| `docs:` | Cambios en la documentación | `docs: actualizar README` |
| `style:` | Formato o diseño, sin cambiar la lógica | `style: ajustar responsive de tarjetas` |
| `refactor:` | Reestructuración sin cambiar el comportamiento | `refactor: simplificar consulta de favoritos` |

## Estado del proyecto

| Hito | Estado |
|---|---|
| Sesión 5: `fetchMock` | Hecho |
| Sesión 7: componentes, formulario controlado y lista con filtro | Hecho |
| Sesión 9: custom hook y utilidad | Hecho |
| Sesión 11: vista conectada a la API | En progreso |
| Sesión 13: CRUD completo en la interfaz | Pendiente |

## Cambios de alcance

Registro de decisiones sobre el alcance del proyecto.

- (Se completa con fecha y razón cuando se descarte o cambie alguna funcionalidad, como el login o los favoritos.)