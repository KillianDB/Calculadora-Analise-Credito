import { useEffect, useState } from "react";
import Menu from "../../components/Menu";

export function Bancos() {
	// const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [telefone, setTelefone] = useState("");
	// const [imagem, setImagem] = useState<File | null>(null);
	// const [role, setRole] = useState("");
	interface Banco {
		id: string;
		nome: string;
		link: string;
		tipo: string;
		status: string;
	}

	const [bancos, setBancos] = useState<Banco[]>([
		{
			id: "1",
			nome: "Grana Pix",
			link: "google.com",
			tipo: "Crédito Pessoal",
			status: "Ativo",
		},
		{
			id: "2",
			nome: "Crédito Real",
			link: "google.com",
			tipo: "FGTS",
			status: "Ativo",
		},
		{
			id: "1",
			nome: "Banco do Brasil",
			link: "google.com",
			tipo: "Crédito Pessoal",
			status: "Ativo",
		},
	]);

	// const [filteredBancos, setFilteredBancos] = useState<Bancos[]>([]);

	// const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const searchTerm = e.target.value.toLowerCase();
	// 	const filtered = bancos
	// 		.map((banco) => {
	// 			const filteredBancos = banco.nome.filter((banco) =>
	// 				banco.nome.toLowerCase().includes(searchTerm)
	// 			);
	// 			return {
	// 				 filteredBancos,
	// 			};
	// 		});
	// 	setFilteredBancos(filtered);
	// 	return filteredBancos;
	// };

	// const adicionarBanco = async () => {
	// 	const response = await axios.post(
	// 		"https://calculadora.reallcredito.com.br/banks",
	// 		{
	// 			name,
	//             key,
	// 			link,
	// 		}
	// 	);

	// 	if (response.status !== 200) {
	// 		console.error("Erro ao adicionar banco");
	// 		alert(response);
	// 		setAddBancoModalOpen(false);
	// 		return;
	// 	}
	// 	alert(response);
	// 	setAddBancoModalOpen(false);
	// 	return;
	// };

	const bloquearBanco = async (banco: { id: string }) => {
		const response = await fetch(
			`https://calculadora.reallcredito.com.br/banks/block/${banco.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status !== 200) {
			console.error("Erro ao bloquear banco");
			alert(response);
			return;
		}
		alert(response);
		return;
	};

	useEffect(() => {
		const fetchBancos = async () => {
			try {
				const response = await fetch(
					"https://calculadora.reallcredito.com.br/banks/all"
				);
				if (response.status !== 200) {
					console.error("Error fetching equipes:", response);
					setBancos([]);
					return;
				}
				const data = await response.json();
				setBancos(data);
			} catch (error) {
				console.error("Error fetching equipes:", error);
			}
		};
		fetchBancos();
	}, []);

	return (
		<>
			<main className='main_equipes'>
				<Menu type='admin' />
				<div className='linha'></div>

				{/* <section className='section_buscar'>
					<input
						type='text'
						placeholder='Buscar'
						onChange={handleSearch}
					/>
				</section> */}
				<div className='filtros_equipes'>
					<select>
						<option value='todos'>Todos</option>
						{bancos.map((banco) => (
							<option defaultValue='Geral' value={banco.nome}>
								{banco.nome}
							</option>
						))}
					</select>
					{/* <OrangeButton
						text='Adicionar banco'
						onClick={() => setAddBancoModalOpen(true)}
					/> */}
				</div>
				<section className='equipes_section'>
					{bancos.map((banco) => (
						<div className='equipe_equipes'>
							<h3>{banco.nome}</h3>
							<div className='membro_equipes'>
								<h6>{banco.tipo}</h6>
								<h6>{banco.link}</h6>
								<h6
									style={{
										color:
											banco.status === "Ativo"
												? "green"
												: "red",
									}}
								>
									{banco.status}
								</h6>
								<img
									src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/slash.svg?alt=media&token=d49903be-229f-4b6a-b540-c67467ed599e'
									onClick={() =>
										bloquearBanco({ id: banco.id })
									}
								/>
							</div>
						</div>
					))}
				</section>
				{/* {addBancoModalOpen && (
					<Modal
						isOpen={addBancoModalOpen}
						className='modalCalculator'
					>
						<h2
							className='close-button'
							onClick={() => {
								setAddBancoModalOpen(false);
							}}
						>
							X
						</h2>
						<label>Adicionar Banco</label>
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
						{role === "enterprise" && (
							<>
								<input
									type='file'
									accept='image/*'
									onChange={(e) =>
										setImagem(
											e.target.files
												? e.target.files[0]
												: null
										)
									}
								/>
								<input
									type='phone'
									placeholder='telefone'
									value={telefone}
									onChange={(e) =>
										setTelefone(e.target.value)
									}
								></input>
							</>
						)}
						<OrangeButton
							text='Salvar'
							onClick={() => adicionarMembro}
						/>
					</Modal>
				)} */}
			</main>
		</>
	);
}
