import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import BlueButton from "../../components/BlueButton";
import "./adminHome.css";
import { useEffect, useState } from "react";
import PieChart from "../../components/PizzaChart";
import BarChart from "../../components/BarChart";
import { SideMenu } from "../../components/SideMenu";

interface PieValues {
	clientesGerais: number;
	aposentadosPensionistas: number;
}

interface BarValues {
	INSS: number;
	FGTS: number;
	veiculo: number;
	CP: number;
}

export function AdminHome() {
	const navigate = useNavigate();
	const [totalClientes, setTotalClientes] = useState<number | null>(null);
	const [clientesEmContato, setClientesEmContato] = useState<number | null>(
		null
	);
	const [pieValues, setPieValues] = useState<PieValues | null>(null);
	const [barValues, setBarValues] = useState<BarValues | null>(null);
	const [clients, setClients] = useState<
		{
			id: number;
			name: string;
			type: string;
			status: string;
			date: string;
			hour: string;
		}[]
	>([
		{
			id: 1,
			name: "João",
			type: "pensionista",
			status: "Entrou em contato",
			date: "09/09/2024",
			hour: "14:00",
		},
		{
			id: 2,
			name: "Maria",
			type: "geral",
			status: "Entrou em contato",
			date: "09/09/2024",
			hour: "13:00",
		},
		{
			id: 3,
			name: "José",
			type: "aposentado",
			status: "Fez simulação geral",
			date: "09/09/2024",
			hour: "12:00",
		},
	]);

	useEffect(() => {
		async function fetchTotalClientes() {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/client/total",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("A resposta não é um JSON válido");
				}
				const data = await response.json();
				setTotalClientes(data);
			} catch (error) {
				console.error("Error fetching total clients:", error);
			}
		}
		async function fetchClientesContato() {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/client/emContato",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("A resposta não é um JSON válido");
				}
				const data = await response.json();
				setClientesEmContato(data);
			} catch (error) {
				console.error("Error fetching clients in contact:", error);
			}
		}
		async function graficoPizza() {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/client/totalPerType",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("A resposta não é um JSON válido");
				}
				const data: PieValues = await response.json();
				setPieValues(data);
			} catch (error) {
				console.error("Error fetching pie chart data:", error);
			}
		}
		async function graficoBar() {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/analysis/totalPerType",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("A resposta não é um JSON válido");
				}
				const data: BarValues = await response.json();
				setBarValues(data);
			} catch (error) {
				console.error("Error fetching bar chart data:", error);
			}
		}
		async function fetchClients() {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/client/lastActions",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("A resposta não é um JSON válido");
				}
				const data = await response.json();
				setClients(data);
			} catch (error) {
				console.error("Error fetching clients:", error);
			}
		}
		fetchTotalClientes();
		fetchClientesContato();
		graficoPizza();
		graficoBar();
		fetchClients();
	}, []);

	return (
		<>
			{/* <img
				src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
				id='admin-home-logo'
			/> */}
			<div className='admin-home-main-div'>
				<SideMenu type='admin' />
				<section className='admin-home-top-section'>
					<div className='absolute-metrics'>
						<div className='total-clientes'>
							<span className='number-absolut'>
								{totalClientes !== null ? totalClientes : 0}
							</span>
							<br></br>Total de clientes<br></br>
							<span className='destaque-text'>
								registrados
							</span>{" "}
							no APP
						</div>
						<div className='total-call'>
							<span className='number-absolut'>
								{clientesEmContato !== null
									? clientesEmContato
									: 0}
							</span>
							<br></br>Total de clientes que<br></br>
							<span className='destaque-text'>
								entraram em contato
							</span>
						</div>
					</div>
					<div className='bar-graphic'>
						<BarChart
							value1={barValues ? barValues.INSS : 1}
							value2={barValues ? barValues.FGTS : 1}
							value3={barValues ? barValues.veiculo : 1}
							value4={barValues ? barValues.CP : 1}
							label1='INSS'
							label2='FGTS'
							label3='Veiculo'
							label4='Credito'
						/>
					</div>
					<div className='pizza-graphic'>
						<PieChart
							value1={pieValues ? pieValues.clientesGerais : 50}
							value2={
								pieValues
									? pieValues.aposentadosPensionistas
									: 50
							}
							label1='Clientes Gerais'
							label2='Aposentados/pensionistas'
						/>
						{/* <p className='tituloGraficoPizza'>
							Porcentagem de{" "}
							<span className='spanTituloGraficoPizza'>
								aposentados <br></br> e pensionistas
							</span>{" "}
							em relação ao <br></br>número total de clientes
						</p> */}
					</div>
				</section>
				<section className='admin-home-bottom-section'>
					<div className='clients-list'>
						{clients.map((client) => (
							<div key={client.id} className='client-card'>
								<h6>{client.name}</h6>
								<h6 className={`tag_cliente_ ${client.type}`}>
									{client.type}
								</h6>
								<h6>{client.status}</h6>
								<h6>{client.date}</h6>
								<h6>{client.hour}</h6>
							</div>
						))}
					</div>
					<div className='admin_home_buttons'>
						<OrangeButton
							text='Area de bancos'
							onClick={() => navigate("/bancos")}
						/>
						<BlueButton
							text='Area de equipes'
							onClick={() => navigate("/equipes")}
						/>
					</div>
				</section>
			</div>
		</>
	);
}
