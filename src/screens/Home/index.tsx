import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import SubmitCard from "../../components/SubmitCard";
import "./home.css";
import { useState } from "react";
import axios from "axios";

export function Home() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		cpf: "",
		nome: "",
		cep: "",
		tipoCliente: "",
		renda: "",
		dataNascimento: "",
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

	async function handleGenerateAnalisis() {
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
				return;
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
							label: "cpf",
							name: "cpf",
							type: "text",
							value: inputs.cpf,
							onChange: handleInputChange,
						},
						{
							label: "nome",
							name: "nome",
							type: "text",
							value: inputs.nome,
							onChange: handleInputChange,
						},
						{
							label: "cep",
							name: "cep",
							type: "text",
							value: inputs.cep,
							onChange: handleInputChange,
						},
						{
							label: "tipoCliente",
							name: "tipoCliente",
							type: "select",
							value: inputs.tipoCliente,
							onChange: handleInputChange,
							options: ["Assalariado", "Outro"],
						},
						{
							label: "renda",
							name: "renda",
							type: "text",
							value: inputs.renda,
							onChange: handleInputChange,
						},
						{
							label: "dataNascimento",
							name: "dataNascimento",
							type: "date",
							value: inputs.dataNascimento,
							onChange: handleInputChange,
						},
					]}
					button={
						<OrangeButton
							text='Gerar análise'
							onClick={handleGenerateAnalisis}
						/>
					}
				/>
			</div>
		</>
	);
}
