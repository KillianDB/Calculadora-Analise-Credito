import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
	value1: number;
	value2: number;
	label1: string;
	label2: string;
	width?: number;
	height?: number;
}

const PieChart: React.FC<PieChartProps> = ({
	value1,
	value2,
	label1,
	label2,
	width,
	height,
}) => {
	const data = {
		labels: [label1, label2],
		datasets: [
			{
				data: [value1, value2],
				backgroundColor: ["#F99401", "#265064"],
				hoverBackgroundColor: ["#F99401", "#265064"],
			},
		],
	};
	const options = {
		plugins: {
			width: width,
			height: height,
			legend: {
				position: "right" as const, // Posiciona a legenda à direita
				labels: {
					usePointStyle: true, // Usa um estilo de ponto para os labels
					pointStyle: "circle", // Define o estilo do ponto como círculo
				},
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};

export default PieChart;
