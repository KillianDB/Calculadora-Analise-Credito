import "./style.css";

interface CalculatorIMGResultProps {
	menu: string;
	submenu: string;
	values: string[];
}

export const CalculatorIMGResult: React.FC<CalculatorIMGResultProps> = ({
	menu,
	submenu,
	values,
}) => {
	const valuesWithoutFirst = values.slice(1, values.length - 2);
	if (menu === "INSS" && submenu === "Cálculo por Margem Disponível") {
		return (
			<div className='calculatorIMGResult' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitle'>
					<h1 className='textoPropostaDe'> Proposta de </h1>
					<h1 className='textoCredito'> CRÉDITO </h1>
					<h1 className='textoConsignado'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDiv'>
					<div className='calculatorIMGResultLeft'>{values[0]}</div>
					<div className='calculatorIMGResultRight'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='caixaValoresPequena'>VALORES</div>
				<div className='calculatorIMGResultDiv'>
					{valuesWithoutFirst.map((value, index) => {
						const label = value.split("R")[0];
						const valueR = value.split("R")[1];
						return (
							<div
								className='calculatorIMGResultValues'
								key={index}
							>
								{label}
								<button>R{valueR}</button>
							</div>
						);
					})}
				</div>
				<h2 className='calculatorIMGResultContratacao'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecos'>
					<div className='calculatorIMGResultEnderecosLeft'>
						<div className='calculatorIMGResultEndereco'>
							<img
								src='/location-icon.jpeg'
								className='iconeLocation'
								alt=''
							/>
							<p className='textoBomRetiro'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEndereco'>
							<img
								src='/location-icon.jpeg'
								className='iconeLocation'
								alt=''
							/>
							<p className='textoLajeado'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEndereco'>
							<img
								src='/location-icon.jpeg'
								className='iconeLocation'
								alt=''
							/>
							<p className='textoVenancioAires'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEndereco'>
							<img
								src='/location-icon.jpeg'
								className='iconeLocation'
								alt=''
							/>
							<p className='textoHolambra'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRight'>
						<div className='calculatorIMGResultEndereco'>
							<img
								src='/location-icon.jpeg'
								className='iconeLocation'
								alt=''
							/>
							<p className='textoSapucaia'>
								Sapucaia do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEndereco'>
							<img
								src='/location-icon.jpeg'
								className='iconeLocation'
								alt=''
							/>
							<p className='textoEstancia'>Estância Velha - RS</p>
						</div>
						<div className='calculatorIMGResultEndereco'>
							<img
								src='/location-icon.jpeg'
								className='iconeLocation'
								alt=''
							/>
							<p className='textoTeutonia'>Teutônia - RS</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotais'>
					<div className='calculatorIMGResultTotal'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotal'>
							{values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotal'>
						<div className='parcelaTotal'>PARCELA TOTAL</div>
						<div className='dindinResulTotal'>
							R$
							{values[values.length - 1].split(" ")[1]}{" "}
							<span>
								{values[values.length - 1].split(" ")[2]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContato'>
					<div className='contato'>
						<img src='/phone.png' alt='' className='phone-icon' />
						<p className='textoNumero'>08006080181</p>
					</div>
					<img
						src='/logo-square.svg'
						alt=''
						className='logoCreditoReal'
					/>
				</section>
			</div>
		);
	}
};
