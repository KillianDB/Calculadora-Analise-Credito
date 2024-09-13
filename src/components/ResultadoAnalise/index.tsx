import { ReactNode } from "react";
import "./ResultadoAnalise.css";

interface ResultadoAnaliseProps {
	title: string;
	subtitle: string;
	values: boolean;
	button: ReactNode;
}

export default function ResultadoAnaliseComponente({
	title,
	subtitle,
	values,
	button,
}: ResultadoAnaliseProps) {
	return (
		<div className='resultado-analise'>
			<h2>
				{title} - {subtitle}
			</h2>
			{values === true ? <p>Pré Aprovado</p> : <p>Não Aprovado</p>}
			{button}
		</div>
	);
}
