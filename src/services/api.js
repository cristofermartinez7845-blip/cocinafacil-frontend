import	{	fetchMock	}	from	"./mock";
//	Las	variables	VITE_*	se	leen	del	archivo	.env
const	API_URL	=	import.meta.env.VITE_API_URL;
const	USAR_MOCK	=	import.meta.env.VITE_USAR_MOCK	!==	"false";
//	Pide	una	lista	de	recursos	("recetas",	"categorias",	"ingredientes")
export	async	function	obtenerRecurso(recurso)	{
		if	(USAR_MOCK)	{
				return	fetchMock(recurso);
		}
		const	respuesta	=	await	fetch(`${API_URL}/api/${recurso}/`);
		if	(!respuesta.ok)	{
				throw	new	Error(`Error	${respuesta.status}	al	pedir	${recurso}`);
		}
		return	respuesta.json();
}