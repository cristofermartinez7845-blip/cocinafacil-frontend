import	{	formatearTiempo	}	from	"../utils/formato";
function	RecetaCard({	receta	})	{
		return	(
				<div	className="receta-card">
						<h3>{receta.nombre}</h3>
						<p>
								{formatearTiempo(receta.tiempo_preparacion)}	-	{receta.porciones}	porciones
						</p>
				</div>
		);
}
export	default	RecetaCard;