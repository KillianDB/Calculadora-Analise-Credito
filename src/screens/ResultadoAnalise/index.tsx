import OrangeButton from "../../components/OrangeButton";
import ResultadoAnaliseComponente from "../../components/ResultadoAnalise";
import "./style.css";
import { useNavigate } from "react-router-dom";
interface resultadoAnalise {
	title: string;
	subtitle: string;
	values: { label: string; value: string }[];
}
export default function ResultadoAnalise(results: resultadoAnalise[]) {
	const navigate = useNavigate();

	function handleObtainCredit() {
		//ver qual o banco e direcionar pro link do banco
	}

	return (
		<>
			<div>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/seta-voltar.svg?alt=media&token=cf46113a-32c9-4f5d-a2bb-7c0047289d63'
					className='seta-voltar'
					onClick={() => navigate(-1)}
				/>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
					id='result-logo'
				/>
			</div>
			<div className='resultAnalisis-main-div'>
				{results.map(
					(result: {
						title: string;
						subtitle: string;
						values: { label: string; value: string }[];
					}) => (
						<ResultadoAnaliseComponente
							title={result.title}
							subtitle={result.subtitle}
							values={result.values}
							button={
								<OrangeButton
									text='Obter'
									onClick={handleObtainCredit}
								/>
							}
						/>
					)
				)}
				{/* <ResultadoAnaliseComponente
					title='Crédito Pessoal'
					subtitle='Banco Pan'
					values={[
						{ label: "Valor Total: ", value: "R$ 100000,00" },
						{ label: "Taxa de Juros: ", value: "10,0%" },
						{ label: "Vencimento: ", value: "17/08/2025" },
					]}
					button={
						<OrangeButton
							text='Obter'
							onClick={handleObtainCredit}
						/>
					}
				/>
				<ResultadoAnaliseComponente
					title='Crédito Pessoal'
					subtitle='Grana Pix'
					values={[
						{ label: "Valor Total: ", value: "R$ 100000,00" },
						{ label: "Taxa de Juros: ", value: "10,0%" },
						{ label: "Vencimento: ", value: "17/08/2025" },
					]}
					button={
						<OrangeButton
							text='Obter'
							onClick={handleObtainCredit}
						/>
					}
				/>
				<ResultadoAnaliseComponente
					title='INSS'
					subtitle='ICRED'
					values={[
						{ label: "Valor Total: ", value: "R$ 100000,00" },
						{ label: "Taxa de Juros: ", value: "10,0%" },
						{ label: "Vencimento: ", value: "17/08/2025" },
					]}
					button={
						<OrangeButton
							text='Obter'
							onClick={handleObtainCredit}
						/>
					}
				/>
				<ResultadoAnaliseComponente
					title='Crédito Pessoal'
					subtitle='Banco Pan'
					values={[
						{ label: "Valor Total: ", value: "R$ 100000,00" },
						{ label: "Taxa de Juros: ", value: "10,0%" },
						{ label: "Vencimento: ", value: "17/08/2025" },
					]}
					button={
						<OrangeButton
							text='Obter'
							onClick={handleObtainCredit}
						/>
					}
				/>
				<ResultadoAnaliseComponente
					title='Crédito Pessoal'
					subtitle='Grana Pix'
					values={[
						{ label: "Valor Total: ", value: "R$ 100000,00" },
						{ label: "Taxa de Juros: ", value: "10,0%" },
						{ label: "Vencimento: ", value: "17/08/2025" },
					]}
					button={
						<OrangeButton
							text='Obter'
							onClick={handleObtainCredit}
						/>
					}
				/>
				<ResultadoAnaliseComponente
					title='INSS'
					subtitle='ICRED'
					values={[
						{ label: "Valor Total: ", value: "R$ 100000,00" },
						{ label: "Taxa de Juros: ", value: "10,0%" },
						{ label: "Vencimento: ", value: "17/08/2025" },
					]}
					button={
						<OrangeButton
							text='Obter'
							onClick={handleObtainCredit}
						/>
					}
				/> */}
			</div>
		</>
	);
}
