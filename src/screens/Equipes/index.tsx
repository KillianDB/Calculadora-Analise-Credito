import { useEffect, useState } from "react";
import BlueButton from "../../components/BlueButton";
import Modal from "react-modal";
import "./equipes.css";
import { useNavigate } from "react-router-dom";
import { SideMenu } from "../../components/SideMenu";

export function Equipes() {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// const [userType, setUserType] = useState("");
	const [role, setRole] = useState("");
	interface Membro {
		id: string;
		nome: string;
		email: string;
		status: string;
	}

	interface Equipe {
		equipe: string;
		membros: Membro[];
	}

	const [equipes, setEquipes] = useState<Equipe[]>([
		{
			equipe: "Teutônia",
			membros: [
				{
					id: "1",
					nome: "João",
					email: "joao@email.com",
					status: "Ativo",
				},
				{
					id: "2",
					nome: "Maria",
					email: "maria@email.com",
					status: "Ativo",
				},
			],
		},
		{
			equipe: "Holambra",
			membros: [
				{
					id: "1",
					nome: "João",
					email: "joao@email.com",
					status: "Ativo",
				},
				{
					id: "2",
					nome: "Maria",
					email: "maria@email.com",
					status: "Ativo",
				},
			],
		},
		{
			equipe: "Venancio Aires",
			membros: [
				{
					id: "1",
					nome: "João",
					email: "joao@email.com",
					status: "Ativo",
				},
				{
					id: "2",
					nome: "Maria",
					email: "maria@email.com",
					status: "Ativo",
				},
			],
		},
		{
			equipe: "Estancia Velha",
			membros: [
				{
					id: "1",
					nome: "João",
					email: "joao@email.com",
					status: "Ativo",
				},
				{
					id: "2",
					nome: "Maria",
					email: "maria@email.com",
					status: "Ativo",
				},
			],
		},
		{
			equipe: "Lajeado",
			membros: [
				{
					id: "3",
					nome: "João",
					email: "joao@email.com",
					status: "Ativo",
				},
				{
					id: "4",
					nome: "Maria",
					email: "maria@email.com",
					status: "Ativo",
				},
			],
		},
		{
			equipe: "Sapucaia do Sul",
			membros: [
				{
					id: "1",
					nome: "João",
					email: "joao@email.com",
					status: "Ativo",
				},
				{
					id: "2",
					nome: "Maria",
					email: "maria@email.com",
					status: "Ativo",
				},
			],
		},
		{
			equipe: "Estrela",
			membros: [
				{
					id: "1",
					nome: "João",
					email: "joao@email.com",
					status: "Ativo",
				},
				{
					id: "2",
					nome: "Maria",
					email: "maria@email.com",
					status: "Ativo",
				},
			],
		},
	]);

	const [filteredEquipes, setFilteredEquipes] = useState<Equipe[]>([]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		const filtered = equipes
			.map((equipe) => {
				const filteredMembros = equipe.membros.filter((membro) =>
					membro.nome.toLowerCase().includes(searchTerm)
				);
				return {
					...equipe,
					membros: filteredMembros,
				};
			})
			.filter((equipe) => equipe.membros.length > 0);
		setFilteredEquipes(filtered);
		return filteredEquipes;
	};

	const editarMembro = async (membro: { id: string }) => {
		const response = await fetch(
			`https://calculadora.reallcredito.com.br/member/${membro.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					// userType,
					role,
				}),
			}
		);

		if (response.status !== 200) {
			console.error("Erro ao editar membro");
			alert(response);
			setModalOpen(false);
			return;
		}
		alert(response);
		setModalOpen(false);
		return;
	};

	const bloquearMembro = async (membro: { id: string }) => {
		const response = await fetch(
			`https://calculadora.reallcredito.com.br/member/block/${membro.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status !== 200) {
			console.error("Erro ao bloquear membro");
			alert(response);
			return;
		}
		alert(response);
		return;
	};

	useEffect(() => {
		const fetchEquipes = async () => {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/member/all/escritorio"
				);
				if (response.status !== 200) {
					console.error("Error fetching equipes:", response);
					setEquipes([]);
					return;
				}
				const data = await response.json();
				setEquipes(data);
			} catch (error) {
				console.error("Error fetching equipes:", error);
			}
		};
		fetchEquipes();
	}, []);

	return (
		<>
			<div className='header_equipes'>
				<img
					onClick={() => navigate("/admin/home")}
					src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/seta-voltar.svg?alt=media&token=cf46113a-32c9-4f5d-a2bb-7c0047289d63'
					id='seta-voltar-equipes'
				/>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
					id='equipes-logo'
				/>
			</div>
			<SideMenu type='admin' />

			<main className='main_equipes'>
				<h1>Equipe</h1>
				<section>
					<input
						type='text'
						placeholder='Buscar'
						onChange={handleSearch}
					/>
				</section>
				<section className='equipes_section'>
					{equipes.map((equipe) => (
						<div className='equipe_equipes'>
							<h3>{equipe.equipe}</h3>
							{equipe.membros.map((membro) => (
								<div className='membro_equipes'>
									<h6>{membro.nome}</h6>
									<h6>{membro.email}</h6>
									<h6>{membro.status}</h6>
									<BlueButton
										text='Editar'
										onClick={() => {
											setModalOpen(true);
										}}
									/>
									<img
										src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/slash.svg?alt=media&token=d49903be-229f-4b6a-b540-c67467ed599e'
										onClick={() =>
											bloquearMembro({ id: membro.id })
										}
									/>
								</div>
							))}
						</div>
					))}
				</section>
				{modalOpen && (
					<Modal isOpen={modalOpen}>
						<label>Editar Membro</label>
						<input
							type='text'
							placeholder='Nome'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{/* <select
							value={userType}
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value='admin'>Administrador</option>
							<option value='member'>Colaborador</option>
							<option value='manager'>Gerente</option>
							<option value='enterprise'>Empresa Parceira</option>
						</select> */}
						<select
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<option value='admin'>Administrador</option>
							<option value='manager'>Gerente</option>
							<option value='operational'>Operacional</option>
							<option value='seller'>Vendedor</option>
							<option value='enterprise'>Empresa Parceira</option>
						</select>
						<BlueButton
							text='Salvar'
							onClick={() => editarMembro}
						/>
					</Modal>
				)}
			</main>
		</>
	);
}
