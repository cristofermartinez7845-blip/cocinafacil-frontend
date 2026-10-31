//	Convierte	minutos	a	un	texto	legible:	90	->	"1	h	30	min"
export	function	formatearTiempo(minutos)	{
		const	total	=	Number(minutos);
		if	(!total	||	total	<	1)	return	"";
		const	horas	=	Math.floor(total	/	60);
		const	resto	=	total	%	60;
		if	(horas	===	0)	return	`${resto}	min`;
		if	(resto	===	0)	return	`${horas}	h`;
		return	`${horas}	h	${resto}	min`;
        }