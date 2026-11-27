import { useCallback, useEffect, useState } from "react";
import { obtenerRecurso } from "../services/api";

// Pide un recurso y devuelve sus tres estados (datos, cargando, error)
// y una función recargar() para volver a pedirlo.
export function useFetch(recurso) {
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState({ clave: null, datos: [], error: null });

  // Cada pedido tiene una clave. Si la clave del último resultado no coincide
  // con la actual, todavía estamos cargando.
  const clave = `${recurso}#${intento}`;

  useEffect(() => {
    let cancelado = false;
    obtenerRecurso(recurso)
      .then((datos) => {
        if (!cancelado) setResultado({ clave, datos, error: null });
      })
      .catch((err) => {
        if (!cancelado) setResultado({ clave, datos: [], error: err.message });
      });

    // Si el componente desaparece antes de que llegue la respuesta,
    // se ignora el resultado
    return () => {
      cancelado = true;
    };
  }, [recurso, clave]);

  const recargar = useCallback(() => setIntento((n) => n + 1), []);
  const cargando = resultado.clave !== clave;

  return {
    datos: resultado.datos,
    cargando,
    error: cargando ? null : resultado.error,
    recargar,
  };
}