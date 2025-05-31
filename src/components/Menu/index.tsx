import { NavLink, useLocation } from "react-router-dom";
import "./menu.css";

export default function Menu({ type }: { type: string }) {
	const location = useLocation();
	return (
		<div>
			{type === "admin" ? (
				<div className='menuAdminDiv'>
					<NavLink
						className='menuText'
						to='/metricas'
						style={{
							color:
								location.pathname === "/metricas"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Métricas
					</NavLink>
					<NavLink
						className='menuText'
						to='/equipes'
						style={{
							color:
								location.pathname === "/equipes"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Equipes
					</NavLink>
					<NavLink
						className='menuText'
						to='/bancos'
						style={{
							color:
								location.pathname === "/bancos"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Bancos
					</NavLink>
					<NavLink
						className='menuText'
						to='/coeficientes'
						style={{
							color:
								location.pathname === "/coeficientes"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Coeficientes
					</NavLink>
					<NavLink
						className='menuText'
						to='/perfil'
						style={{
							color:
								location.pathname === "/perfil"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Perfil
					</NavLink>
					<img
						className='menuLogo'
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
					/>
				</div>
			) : (
				<div className='menuGeralDiv'>
					<NavLink
						className='menuText'
						to='/analise'
						style={{
							color:
								location.pathname === "/analise"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Análise Completa
					</NavLink>
					<NavLink
						className='menuText'
						to='/calculadora'
						style={{
							color:
								location.pathname === "/calculadora"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Calculadora
					</NavLink>
					<NavLink
						className='menuText'
						to='/vendas'
						style={{
							color:
								location.pathname === "/vendas"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Vendas
					</NavLink>
					<NavLink
						className='menuText'
						to='/perfil'
						style={{
							color:
								location.pathname === "/perfil"
									? "#f99401"
									: "#625d5d",
						}}
					>
						Perfil
					</NavLink>
					<img
						className='menuLogo'
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
					/>
				</div>
			)}
		</div>
	);
}
