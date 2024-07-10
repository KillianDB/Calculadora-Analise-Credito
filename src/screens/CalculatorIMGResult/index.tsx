import React from "react";

interface CalculatorIMGResultProps {
	menu: string;
	submenu: string;
	values: string[];
}

export const CalculatorIMGResult: React.FC<CalculatorIMGResultProps> = ({
	menu,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	submenu,
	values,
}) => {
	const valuesWithoutFirst = values.slice(1, values.length - 1);
	return (
		<div className='calculatorIMGResult'>
			<div className='calculatorIMGResultTitle'>
				Proposta de CRÉDITO Consignado
			</div>
			<div className='calculatorIMGResultLabelDiv'>
				<div className='calculatorIMGResultLeft'>{values[0]}</div>
				<div className='calculatorIMGResultRight'>
					Segue abaixo a <span>simulação prévia</span> de valores
					disponíveis no seu benefício <span>{menu}</span>
				</div>
			</div>
			<div className='calculatorIMGResult'>
				{valuesWithoutFirst.map((value, index) => {
					const label = value.split("R")[0];
					const valueR = value.split("R")[1];
					return (
						<div className='calculatorIMGResultValues' key={index}>
							{label}
							<button>{valueR}</button>
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
						<img src='/location-icon.jpeg' alt='' />
						<p>Bom Retiro do Sul - RS</p>
					</div>
					<div className='calculatorIMGResultEndereco'>
						<img src='/location-icon.jpeg' alt='' />
						<p>Lajeado - RS</p>
					</div>
					<div className='calculatorIMGResultEndereco'>
						<img src='/location-icon.jpeg' alt='' />
						<p>Venâncio Aires - RS</p>
					</div>
					<div className='calculatorIMGResultEndereco'>
						<img src='/location-icon.jpeg' alt='' />
						<p>Holambra - SP</p>
					</div>
				</div>
				<div className='calculatorIMGResultEnderecosRight'>
					<div className='calculatorIMGResultEndereco'>
						<img src='/location-icon.jpeg' alt='' />
						<p>Sapucaia do Sul - RS</p>
					</div>
					<div className='calculatorIMGResultEndereco'>
						<img src='/location-icon.jpeg' alt='' />
						<p>Estância Velha - RS</p>
					</div>
					<div className='calculatorIMGResultEndereco'>
						<img src='/location-icon.jpeg' alt='' />
						<p>Teutônia - RS</p>
					</div>
				</div>
			</section>
			<section className='calculatorIMGResultTotais'>
				<div className='calculatorIMGResultTotal'>
					<h2>VALOR TOTAL</h2>
					<h2>R$ {values[values.length - 2]}</h2>
				</div>
				<div className='calculatorIMGResultSubtotal'>
					<h2>VALOR SUBTOTAL</h2>
					<h2>R$ {values[values.length - 1]}</h2>
				</div>
			</section>
		</div>
	);
};
