import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import BlueButton from "../../components/OrangeButton";
import "./adminHome.css";

import { useEffect, useState } from "react";

export function AdminHome() {
	const navigate = useNavigate();
	const [totalClientes, setTotalClientes] = useState<number | null>(null);
	const [clientesEmContato, setClientesEmContato] = useState<number | null>(
		null
	);

	useEffect(() => {
		async function fetchTotalClientes() {
			const response = await fetch(
				"https://calculadora.reallcredito.com.br/client/total"
			);
			const data = await response.json();
			setTotalClientes(data);
		}
		async function fetchClientesContato() {
			const response = await fetch(
				"https://calculadora.reallcredito.com.br/client/emContato"
			);
			const data = await response.json();
			setClientesEmContato(data);
		}
		fetchTotalClientes();
		fetchClientesContato();
	}, []);

	return (
		<>
			<img
				src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
				id='admin-home-logo'
			/>
			<div className='admin-home-main-div'>
				<section className='admin-home-top-section'>
					<div className='absolute-metrics'>
						<div className='total-clientes'>
							<span className='number-absolut'>
								{totalClientes !== null
									? totalClientes
									: "Carregando..."}
							</span>
							<br></br>Total de clientes
							<span className='destaque-text'>registrados</span>
							no APP
						</div>
						<div className='total-call'>
							<span className='number-absolut'>
								{clientesEmContato !== null
									? clientesEmContato
									: "Carregando..."}
							</span>
							<br></br>Total de clientes que
							<span className='destaque-text'>
								entraram em contato
							</span>
						</div>
					</div>
					<div className='bar-graphic'></div>
					<div className='pizza-graphic'></div>
				</section>
				<section className='admin-home-bottom-section'>
					<div className='clients-list'></div>
					<OrangeButton
						text='Area de bancos'
						onClick={() => navigate("/bancos")}
					/>
					<BlueButton
						text='Area de equipes'
						onClick={() => navigate("/equipes")}
					/>
				</section>
			</div>
		</>
	);
}
