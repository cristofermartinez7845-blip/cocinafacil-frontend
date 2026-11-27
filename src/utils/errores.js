export function aplanarErrores(datos, prefijo = "") {
if (datos === null || datos === undefined) return [];
if (typeof datos === "string") {
    return [prefijo ? `${prefijo}: ${datos}` : datos];
}
if (Array.isArray(datos)) {
    return datos.flatMap((elemento, i) => {
    const esObjeto = typeof elemento === "object" && elemento !== null;
    return aplanarErrores(elemento, esObjeto ? unir(prefijo, `fila ${i + 1}`) : prefijo);
    });
}
return Object.entries(datos).flatMap(([clave, valor]) => {
    if (clave === "detail") return aplanarErrores(valor, prefijo);
    const etiqueta = /^\d+$/.test(clave) ? `fila ${Number(clave) + 1}` : clave;
    return aplanarErrores(valor, unir(prefijo, etiqueta));
});
}

function unir(prefijo, etiqueta) {
return prefijo ? `${prefijo} > ${etiqueta}` : etiqueta;
}