import { ReactNode } from "react";
import "./ResultadoAnalise.css";

interface ResultadoAnaliseProps {
	title: string;
	subtitle: string;
	values: { label: string; value: string }[];
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
			<h2>{title}</h2>
			<h2>{subtitle}</h2>
			{values.map((input, index) => (
				<div key={index}>
					<label>{input.label}</label>
					<span>{input.value}</span>
				</div>
			))}
			{button}
		</div>
	);
}
