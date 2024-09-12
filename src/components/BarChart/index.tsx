import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
	value1: number;
	value2: number;
	value3: number;
	value4: number;
	label1: string;
	label2: string;
	label3: string;
	label4: string;
}

const BarChart: React.FC<BarChartProps> = ({
	value1,
	value2,
	value3,
	value4,
	label1,
	label2,
	label3,
	label4,
}) => {
	const data: ChartData<"bar"> = {
		labels: [label1, label2, label3, label4],
		datasets: [
			{
				data: [value1, value2, value3, value4],
				backgroundColor: ["#F99401", "#F99401", "#F99401", "#F99401"],
				hoverBackgroundColor: [
					"#F99401",
					"#F99401",
					"#F99401",
					"#F99401",
				],
			},
		],
	};

	const options: ChartOptions<"bar"> = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return <Bar data={data} options={options} />;
};

export default BarChart;
