import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import OrangeButton from "../../components/OrangeButton";
import { CalculatorTitle } from "../../components/CalculatorTitle";
import Input from "../../components/Input";
import "./coeficientes.css";

export function Coeficientes() {
	interface Coeficiente {
		id: string;
		tipo: string;
		calculadora: string;
		valor: string;
	}

	const [selectedCoeficiente, setSelectedCoeficiente] =
		useState<Coeficiente | null>(null);

	const [newValue, setNewValue] = useState<string>("");

	const [coeficientes, setCoeficientes] = useState<Coeficiente[]>([
		{
			id: "1",
			tipo: "INSS",
			calculadora: "Possibilidades Gerais",
			valor: "1.5",
		},
		{
			id: "2",
			tipo: "Exército",
			calculadora: "Possibilidades Gerais",
			valor: "1.5",
		},
		{
			id: "1",
			tipo: "Prefeitura",
			calculadora: "Santander",
			valor: "1.5",
		},
	]);

	const editarCoeficiente = async (coeficiente: {
		id: string;
		valor: string;
	}) => {
		const response = await fetch(
			`https://calculadora.reallcredito.com.br/coeficiente/${coeficiente.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(coeficiente.valor),
			}
		);

		if (response.status !== 200) {
			console.error("Erro ao editar coeficiente");
			return response;
		}
		return response;
	};

	useEffect(() => {
		const fetchCoeficientes = async () => {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/coeficientes/all"
				);
				if (response.status !== 200) {
					console.error("Error fetching equipes:", response);
					setCoeficientes([]);
					return;
				}
				const data = await response.json();
				setCoeficientes(data);
				setSelectedCoeficiente(data[0] || null); // Define o primeiro coeficiente como padrão
			} catch (error) {
				console.error("Error fetching coeficientes:", error);
			}
		};
		fetchCoeficientes();
	}, []);

	useEffect(() => {
		// Define o primeiro coeficiente como padrão ao montar o componente
		if (coeficientes.length > 0) {
			setSelectedCoeficiente(coeficientes[0]);
		}
	}, [coeficientes]);

	return (
		<>
			<main className='main_equipes'>
				<Menu type='admin' />
				<div className='linha'></div>

				<section className='coeficientes_section'>
					<div className='equipe_equipes'>
						<CalculatorTitle menu='Alterar Coeficiente' />
						<select>
							{coeficientes.map((coeficiente) => (
								<option
									key={coeficiente.id}
									value={coeficiente.tipo}
								>
									{coeficiente.tipo}
								</option>
							))}
						</select>

						<h6>{"Valor atual: " + selectedCoeficiente?.valor}</h6>
						<Input
							type='text'
							label='Novo valor: '
							value={newValue}
							onChange={(e) => setNewValue(e.target.value)}
						/>
						<OrangeButton
							text='Salvar'
							onClick={() =>
								selectedCoeficiente &&
								editarCoeficiente({
									id: selectedCoeficiente.id,
									valor: newValue,
								})
							}
						/>
					</div>
				</section>
			</main>
		</>
	);
}
