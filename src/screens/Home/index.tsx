import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import SubmitCard from "../../components/SubmitCard";
import "./home.css";
import { useState } from "react";
import axios from "axios";

export function Home() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		name: "",
		cpf: "",
		birthday: "",
		cep: "",
		profissionalClass: "",
		income: 0,
		cellphone: "",
		gender: "",
	});

	function handleInputChange(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) {
		const { name: label, value } = event.target;
		setInputs((prevInputs) => ({
			...prevInputs,
			[label]: value,
		}));
		console.log(label, value);
	}

	async function handleGenerateAnalysis() {
		console.log("Gerando análise");
		console.log("inputs ", inputs);

		try {
			const response = await axios.post(
				"https://calculadora.reallcredito.com.br/banks",
				{
					...inputs,
				}
			);
			if (response.status !== 200) {
				console.error("Erro ao gerar análise");
				setTimeout(() => {
					navigate("/resultado-analise", { state: response.data });
				}, 3000);
				return response;
			}
			navigate("/resultado-analise", { state: response.data });
		} catch (error) {
			console.error("Error submitting data:", error);
		}
	}

	return (
		<>
			<img
				src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
				id='home-logo'
			/>
			<div className='home-main-div'>
				<section className='analisis-buttons-div'>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/analise-credito-pessoal.svg?alt=media&token=2402fdd2-1c6e-4a68-a4b5-bbca206edd84'
						className='analisis-buttons'
					/>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/consignacao-do-inss.svg?alt=media&token=732ec6bb-fce3-4a9e-a418-afaac4ab5299'
						className='analisis-buttons'
					/>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/saque-de-fgts.svg?alt=media&token=ba63e5ff-97e0-4c65-bbf8-03f63a66fe1d'
						className='analisis-buttons'
					/>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/financiamento-veicular.svg?alt=media&token=6311511c-df3c-49a4-b8b6-205c69f945e8'
						className='analisis-buttons'
					/>
				</section>
				<SubmitCard
					title='Insira os dados do cliente'
					inputs={[
						{
							label: "Nome",
							name: "name",
							type: "text",
							value: inputs.name,
							onChange: handleInputChange,
						},
						{
							label: "CPF",
							name: "cpf",
							type: "text",
							value: inputs.cpf,
							onChange: handleInputChange,
						},
						{
							label: "CEP",
							name: "cep",
							type: "text",
							value: inputs.cep,
							onChange: handleInputChange,
						},
						{
							label: "Categoria Profissional",
							name: "profissionalClass",
							type: "select",
							value: inputs.profissionalClass,
							onChange: handleInputChange,
							options: [
								"Assalariado",
								"Pensionista",
								"Aposentado",
							],
						},
						{
							label: "Renda",
							name: "income",
							type: "number",
							value: inputs.income.toString(),
							onChange: handleInputChange,
						},
						{
							label: "Data de Nascimento",
							name: "birthday",
							type: "date",
							value: inputs.birthday,
							onChange: handleInputChange,
						},
						{
							label: "Celular",
							name: "cellphone",
							type: "text",
							value: inputs.cellphone,
							onChange: handleInputChange,
						},
						{
							label: "Gênero",
							name: "gender",
							type: "select",
							value: inputs.gender,
							onChange: handleInputChange,
							options: ["FEMININO", "MASCULINO"],
						},
					]}
					button={
						<OrangeButton
							text='Gerar análise'
							onClick={handleGenerateAnalysis}
						/>
					}
				/>
			</div>
		</>
	);
}
