import { useEffect, useState } from "react";
import { obtenerRecurso } from "../services/api";

// Pide un recurso y devuelve sus tres estados: datos, cargando y error
export function useFetch(recurso) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    obtenerRecurso(recurso)
      .then((resultado) => {
        if (!cancelado) setDatos(resultado);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    // Si el componente desaparece antes de que llegue la respuesta,
    // se ignora el resultado
    return () => {
      cancelado = true;
    };
  }, [recurso]);

  return { datos, cargando, error };
}
