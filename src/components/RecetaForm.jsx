import	{	useState	}	from	"react";
import	{	useFetch	}	from	"../hooks/useFetch";
import	{	formatearTiempo	}	from	"../utils/formato";
const	FORM_INICIAL	=	{
		nombre:	"",
		tiempo_preparacion:	"",
		porciones:	"",
		categoria:	"",
};
function	RecetaForm({	onSubmit	=	(receta)	=>	console.log("Receta	nueva:",	receta)	})	{
		const	[form,	setForm]	=	useState(FORM_INICIAL);
		const	[errorForm,	setErrorForm]	=	useState("");
		const	{	datos:	categorias	}	=	useFetch("categorias");
		function	handleChange(e)	{
				const	{	name,	value	}	=	e.target;
				setForm((prev)	=>	({	...prev,	[name]:	value	}));
		}
		function	handleSubmit(e)	{
				e.preventDefault();
				if	(!form.nombre.trim())	{
						setErrorForm("El	nombre	es	obligatorio");
						return;
				}
				setErrorForm("");
				onSubmit({
						id:	Date.now(),
						nombre:	form.nombre,
						tiempo_preparacion:	Number(form.tiempo_preparacion),
						porciones:	Number(form.porciones),
						categoria:	Number(form.categoria),
				});
				setForm(FORM_INICIAL);
		}
		return	(
				<form	onSubmit={handleSubmit}>
						<h2>Nueva	receta</h2>
						<input
								name="nombre"
								value={form.nombre}
								onChange={handleChange}
								placeholder="Nombre	de	la	receta"
						/>
						<input
								name="tiempo_preparacion"
								type="number"
								value={form.tiempo_preparacion}
								onChange={handleChange}
								placeholder="Tiempo	(min)"
						/>
						{formatearTiempo(form.tiempo_preparacion)	&&	(
								<small>=	{formatearTiempo(form.tiempo_preparacion)}</small>
						)}
						<input
								name="porciones"
								type="number"
								value={form.porciones}
								onChange={handleChange}
								placeholder="Porciones"
						/>
						<select	name="categoria"	value={form.categoria}	onChange={handleChange}>
								<option	value="">Selecciona	una	categoria</option>
								{categorias.map((c)	=>	(
										<option	key={c.id}	value={c.id}>
												{c.nombre}
										</option>
								))}
						</select>
						{errorForm	&&	<p	style={{	color:	"red"	}}>{errorForm}</p>}
						<button	type="submit">Guardar	receta</button>
				</form>
		);
}
export	default	RecetaForm;