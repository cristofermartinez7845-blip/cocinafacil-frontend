import	{	useFetch	}	from	"../hooks/useFetch";
function	CategoriaFiltro({	value	=	"",	onChange	=	()	=>	{}	})	{
		const	{	datos:	categorias,	cargando,	error	}	=	useFetch("categorias");
		if	(error)	return	<p>Error	al	cargar	categorias:	{error}</p>;
		return	(
				<select
						value={value}
						onChange={(e)	=>	onChange(e.target.value)}
						disabled={cargando}
				>
						<option	value="">
								{cargando	?	"Cargando..."	:	"Todas	las	categorias"}
						</option>
						{categorias.map((c)	=>	(
								<option	key={c.id}	value={c.id}>
										{c.nombre}
								</option>
						))}
				</select>
		);
}
export	default	CategoriaFiltro;