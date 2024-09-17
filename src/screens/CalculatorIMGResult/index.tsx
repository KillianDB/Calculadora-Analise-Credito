import "./style.css";

interface CalculatorIMGResultProps {
	menu: string;
	submenu: string;
	values: string[];
	isChecked: boolean;
	parcelas: string;
}

export const CalculatorIMGResult: React.FC<CalculatorIMGResultProps> = ({
	menu,
	submenu,
	values,
	isChecked,
	parcelas,
}) => {
	console.log("values ", values);
	const valuesWithoutFirst = values.slice(1, values.length - 2);
	console.log("valuesWithoutFirst ", valuesWithoutFirst);
	const valuesWithoutFirstAndLast = values.slice(1, values.length - 5);
	if (menu === "INSS" && submenu === "Cálculo por Margem Disponível") {
		return (
			<div className='calculatorIMGResultINSS1' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS1'>
					<h1 className='textoPropostaDeINSS1'> Proposta de </h1>
					<h1 className='textoCreditoINSS1'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS1'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS1'>
					<div className='calculatorIMGResultLeftINSS1'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS1'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS1'>
					<div className='caixaValoresPequenaINSS1'>Valores</div>
					<div className='calculatorIMGResultGridINSS1'>
						{valuesWithoutFirst.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS1'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS1'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS1'>
					<div className='calculatorIMGResultEnderecosLeftINSS1'>
						<div className='calculatorIMGResultEnderecoINSS1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS1'
								alt=''
							/>
							<p className='textoBomRetiroINSS1'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS1'
								alt=''
							/>
							<p className='textoLajeadoINSS1'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS1'
								alt=''
							/>
							<p className='textoVenancioAiresINSS1'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS1'
								alt=''
							/>
							<p className='textoHolambraINSS1'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS1'>
						<div className='calculatorIMGResultEnderecoINSS1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS1'
								alt=''
							/>
							<p className='textoSapucaiaINSS1'>
								Sapucaia do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS1'
								alt=''
							/>
							<p className='textoEstanciaINSS1'>
								Estância Velha - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS1'
								alt=''
							/>
							<p className='textoTeutoniaINSS1'>Teutônia - RS</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS1'>
					<div className='calculatorIMGResultTotalINSS1'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS1'>
							{values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS1'>
						<div className='parcelaTotalINSS1'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS1'>
							{values[values.length - 1].split(" ")[0]}{" "}
							{values[values.length - 1].split(" ")[1]}{" "}
							<span>
								{values[values.length - 1].split(" ")[2]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS1'>
					<div className='contatoINSS1'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS1'
						/>
						<p className='textoNumeroINSS1'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS1'
					/>
				</section>
			</div>
		);
	} else if (menu === "INSS" && submenu === "Cálculo Valor Solicitado") {
		return (
			<div className='calculatorIMGResultINSS2' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS2'>
					<h1 className='textoPropostaDeINSS2'> Proposta de </h1>
					<h1 className='textoCreditoINSS2'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS2'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS2'>
					<div className='calculatorIMGResultLeftINSS2'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS2'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS2'>
					<div className='caixaValoresPequenaINSS2'>Valores</div>
					<div className='calculatorIMGResultGridINSS2'>
						<div
							className='calculatorIMGResultValuesINSS2'
							key={values[1].split("R")[0]}
						>
							{values[1].split("R")[0]}
							<button>R{values[1].split("R")[1]}</button>
						</div>
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS2'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS2'>
					<div className='calculatorIMGResultEnderecosLeftINSS2'>
						<div className='calculatorIMGResultEnderecoINSS2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS2'
								alt=''
							/>
							<p className='textoBomRetiroINSS2'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS2'
								alt=''
							/>
							<p className='textoLajeadoINSS2'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS2'
								alt=''
							/>
							<p className='textoVenancioAiresINSS2'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS2'
								alt=''
							/>
							<p className='textoHolambraINSS2'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS2'>
						<div className='calculatorIMGResultEnderecoINSS2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS2'
								alt=''
							/>
							<p className='textoSapucaiaINSS2'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS2'
								alt=''
							/>
							<p className='textoEstanciaINSS2'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS2'
								alt=''
							/>
							<p className='textoTeutoniaINSS2'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS2'>
					<div className='calculatorIMGResultTotalINSS2'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS2'>
							R$
							{values[values.length - 7]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS2'>
						<div className='parcelaTotalINSS2'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS2'>
							{/* //falta trocar no calculate e no INSS2 finalResult */}
							R$
							{parcelas == "84"
								? values[values.length - 6].split(" ")[0]
								: parcelas == "72"
								? values[values.length - 5].split(" ")[0]
								: parcelas == "60"
								? values[values.length - 4].split(" ")[0]
								: parcelas == "48"
								? values[values.length - 3].split(" ")[0]
								: parcelas == "36"
								? values[values.length - 2].split(" ")[0]
								: parcelas == "24"
								? values[values.length - 1].split(" ")[0]
								: values[values.length - 6].split(" ")[0]}{" "}
							<span>{parcelas + "x"}</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS2'>
					<div className='contatoINSS2'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS2'
						/>
						<p className='textoNumeroINSS2'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS2'
					/>
				</section>
			</div>
		);
	} else if (
		menu === "INSS" &&
		submenu === "Cálculo Salário Cliente Sem Cartões"
	) {
		return isChecked ? (
			<div className='calculatorIMGResultINSS3' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS3'>
					<h1 className='textoPropostaDeINSS3'> Proposta de </h1>
					<h1 className='textoCreditoINSS3'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS3'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS3'>
					<div className='calculatorIMGResultLeftINSS3'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS3'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS3'>
					<div className='caixaValoresPequenaINSS3'>Valores</div>
					<div className='calculatorIMGResultGridINSS3'>
						{valuesWithoutFirstAndLast.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS3'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS3'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS3'>
					<div className='calculatorIMGResultEnderecosLeftINSS3'>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoBomRetiroINSS3'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoLajeadoINSS3'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoVenancioAiresINSS3'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoHolambraINSS3'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS3'>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoSapucaiaINSS3'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoEstanciaINSS3'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoTeutoniaINSS3'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultSubtotaisINSS3'>
					<div className='calculatorIMGResultSubtotalINSS3'>
						<div className='parcelaTotalINSS3'>SUBTOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R${values[values.length - 5].split(" ")[0]}{" "}
						</div>
					</div>
					{/* <div className='calculatorIMGResultSubtotalParcelaINSS3'>
						<div className='parcelaTotalINSS3'>PARCELA</div>
						<div className='dindinResulTotalINSS3'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div> */}
					<div className='calculatorIMGResultLiberadoINSS3'>
						<div className='textLiberadoINSS3'>
							Após 03 parcelas libera o valor aproximado de
							<br></br>
							<span>R${values[values.length - 3]}</span>
							<br></br> sem alterar o valor da parcela!
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS3'>
					<div className='calculatorIMGResultTotalINSS3'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R${values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultParcelaINSS3'>
						<div className='parcelaTotalINSS3'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS3'>
					<div className='contatoINSS3'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS3'
						/>
						<p className='textoNumeroINSS3'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS3'
					/>
				</section>
			</div>
		) : (
			<div className='calculatorIMGResultINSS3' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS3'>
					<h1 className='textoPropostaDeINSS3'> Proposta de </h1>
					<h1 className='textoCreditoINSS3'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS3'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS3'>
					<div className='calculatorIMGResultLeftINSS3'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS3'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS3'>
					<div className='caixaValoresPequenaINSS3'>Valores</div>
					<div className='calculatorIMGResultGridINSS3'>
						{valuesWithoutFirstAndLast.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS3'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS3'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS3'>
					<div className='calculatorIMGResultEnderecosLeftINSS3'>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoBomRetiroINSS3'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoLajeadoINSS3'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoVenancioAiresINSS3'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoHolambraINSS3'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS3'>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoSapucaiaINSS3'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoEstanciaINSS3'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoTeutoniaINSS3'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS3'>
					<div className='calculatorIMGResultTotalINSS3'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R${values[values.length - 5]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS3'>
						<div className='parcelaTotalINSS3'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS3'>
					<div className='contatoINSS3'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS3'
						/>
						<p className='textoNumeroINSS3'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS3'
					/>
				</section>
			</div>
		);
	} else if (menu === "INSS" && submenu === "Cálculo Salário Cliente") {
		return isChecked ? (
			<div className='calculatorIMGResultINSS4' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS4'>
					<h1 className='textoPropostaDeINSS4'> Proposta de </h1>
					<h1 className='textoCreditoINSS4'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS4'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS4'>
					<div className='calculatorIMGResultLeftINSS4'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS4'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS4'>
					<div className='caixaValoresPequenaINSS4'>Valores</div>
					<div className='calculatorIMGResultGridINSS4'>
						{valuesWithoutFirstAndLast.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS4'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS4'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS4'>
					<div className='calculatorIMGResultEnderecosLeftINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoBomRetiroINSS4'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoLajeadoINSS4'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoVenancioAiresINSS4'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoHolambraINSS4'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoSapucaiaINSS4'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoEstanciaINSS4'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoTeutoniaINSS4'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultSubtotaisINSS3'>
					<div className='calculatorIMGResultSubtotalINSS3'>
						<div className='parcelaTotalINSS3'>SUBTOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R${values[values.length - 5].split(" ")[0]}{" "}
						</div>
					</div>
					{/* <div className='calculatorIMGResultSubtotalParcelaINSS3'>
						<div className='parcelaTotalINSS3'>PARCELA</div>
						<div className='dindinResulTotalINSS3'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div> */}
					<div className='calculatorIMGResultLiberadoINSS3'>
						<div className='textLiberadoINSS3'>
							Após 03 parcelas libera o valor aproximado de
							<br></br>
							<span>{values[values.length - 3]}</span>
							<br></br> sem alterar o valor da parcela!
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS4'>
					<div className='calculatorIMGResultTotalINSS4'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							R${values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS4'>
						<div className='parcelaTotalINSS4'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS4'>
					<div className='contatoINSS4'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS4'
						/>
						<p className='textoNumeroINSS4'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS4'
					/>
				</section>
			</div>
		) : (
			<div className='calculatorIMGResultINSS4' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS4'>
					<h1 className='textoPropostaDeINSS4'> Proposta de </h1>
					<h1 className='textoCreditoINSS4'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS4'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS4'>
					<div className='calculatorIMGResultLeftINSS4'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS4'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS4'>
					<div className='caixaValoresPequenaINSS4'>Valores</div>
					<div className='calculatorIMGResultGridINSS4'>
						{valuesWithoutFirstAndLast.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS4'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS4'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS4'>
					<div className='calculatorIMGResultEnderecosLeftINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoBomRetiroINSS4'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoLajeadoINSS4'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoVenancioAiresINSS4'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoHolambraINSS4'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoSapucaiaINSS4'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoEstanciaINSS4'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoTeutoniaINSS4'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS4'>
					<div className='calculatorIMGResultTotalINSS4'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							{values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS4'>
						<div className='parcelaTotalINSS4'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS4'>
					<div className='contatoINSS4'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS4'
						/>
						<p className='textoNumeroINSS4'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS4'
					/>
				</section>
			</div>
		);
	} else if (menu === "INSS" && submenu === "Possibilidades Gerais") {
		return (
			<div className='calculatorIMGResultINSS5' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS5'>
					<h1 className='textoPropostaDeINSS5'> Proposta de </h1>
					<h1 className='textoCreditoINSS5'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS5'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS5'>
					<div className='calculatorIMGResultLeftINSS5'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS5'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS5'>
					<div className='caixaValoresPequenaINSS5'>Valores</div>
					<div className='calculatorIMGResultGridINSS5'>
						{valuesWithoutFirst.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS5'
									key={index}
								>
									{label}
									<button>
										{valueR && valueR.charAt(0) !== "N"
											? "R" + valueR
											: valueR}
									</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS5'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS5'>
					<div className='calculatorIMGResultEnderecosLeftINSS5'>
						<div className='calculatorIMGResultEnderecoINSS5'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS5'
								alt=''
							/>
							<p className='textoBomRetiroINSS5'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS5'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS5'
								alt=''
							/>
							<p className='textoLajeadoINSS5'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS5'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS5'
								alt=''
							/>
							<p className='textoVenancioAiresINSS5'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS5'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS5'
								alt=''
							/>
							<p className='textoHolambraINSS5'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS5'>
						<div className='calculatorIMGResultEnderecoINSS5'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS5'
								alt=''
							/>
							<p className='textoSapucaiaINSS5'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS5'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS5'
								alt=''
							/>
							<p className='textoEstanciaINSS5'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS5'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS5'
								alt=''
							/>
							<p className='textoTeutoniaINSS5'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS5'>
					<div className='calculatorIMGResultTotalINSS5'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS5'>
							R${values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS5'>
						<div className='parcelaTotalINSS5'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS5'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS5'>
					<div className='contatoINSS5'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS5'
						/>
						<p className='textoNumeroINSS5'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS5'
					/>
				</section>
			</div>
		);
	} else if (
		menu === "LOAS REP LEGAL" &&
		submenu === "Cálculo Salário LOAS/BPC"
	) {
		return isChecked ? (
			<div className='calculatorIMGResultINSS4' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS4'>
					<h1 className='textoPropostaDeINSS4'> Proposta de </h1>
					<h1 className='textoCreditoINSS4'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS4'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS4'>
					<div className='calculatorIMGResultLeftINSS4'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS4'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS4'>
					<div className='caixaValoresPequenaINSS4'>Valores</div>
					<div className='calculatorIMGResultGridINSS4'>
						{valuesWithoutFirstAndLast.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS4'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS4'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS4'>
					<div className='calculatorIMGResultEnderecosLeftINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoBomRetiroINSS4'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoLajeadoINSS4'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoVenancioAiresINSS4'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoHolambraINSS4'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoSapucaiaINSS4'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoEstanciaINSS4'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoTeutoniaINSS4'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultSubtotaisINSS3'>
					<div className='calculatorIMGResultSubtotalINSS3'>
						<div className='parcelaTotalINSS3'>SUBTOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R${values[values.length - 5].split(" ")[0]}{" "}
						</div>
					</div>
					{/* <div className='calculatorIMGResultSubtotalParcelaINSS3'>
						<div className='parcelaTotalINSS3'>PARCELA</div>
						<div className='dindinResulTotalINSS3'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div> */}
					<div className='calculatorIMGResultLiberadoINSS3'>
						<div className='textLiberadoINSS3'>
							Após 03 parcelas libera o valor aproximado de
							<br></br>
							<span>{values[values.length - 3]}</span>
							<br></br> sem alterar o valor da parcela!
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS4'>
					<div className='calculatorIMGResultTotalINSS4'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							R${values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS4'>
						<div className='parcelaTotalINSS4'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS4'>
					<div className='contatoINSS4'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS4'
						/>
						<p className='textoNumeroINSS4'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS4'
					/>
				</section>
			</div>
		) : (
			<div className='calculatorIMGResultINSS4' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS4'>
					<h1 className='textoPropostaDeINSS4'> Proposta de </h1>
					<h1 className='textoCreditoINSS4'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS4'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS4'>
					<div className='calculatorIMGResultLeftINSS4'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS4'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS4'>
					<div className='caixaValoresPequenaINSS4'>Valores</div>
					<div className='calculatorIMGResultGridINSS4'>
						{valuesWithoutFirstAndLast.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							return (
								<div
									className='calculatorIMGResultValuesINSS4'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS4'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS4'>
					<div className='calculatorIMGResultEnderecosLeftINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoBomRetiroINSS4'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoLajeadoINSS4'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoVenancioAiresINSS4'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoHolambraINSS4'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS4'>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoSapucaiaINSS4'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoEstanciaINSS4'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS4'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS4'
								alt=''
							/>
							<p className='textoTeutoniaINSS4'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS4'>
					<div className='calculatorIMGResultTotalINSS4'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							{values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS4'>
						<div className='parcelaTotalINSS4'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS4'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS4'>
					<div className='contatoINSS4'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS4'
						/>
						<p className='textoNumeroINSS4'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/ohttps://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS4'
					/>
				</section>
			</div>
		);
	} else if (
		menu == "Exército" &&
		submenu == "Cálculo por Margem Disponível"
	) {
		return (
			<div className='calculatorIMGResultINSS3' id='calculatorIMGResult'>
				<div className='calculatorIMGResultTitleINSS3'>
					<h1 className='textoPropostaDeINSS3'> Proposta de </h1>
					<h1 className='textoCreditoINSS3'> CRÉDITO </h1>
					<h1 className='textoConsignadoINSS3'> Consignado </h1>
				</div>
				<div className='calculatorIMGResultLabelDivINSS3'>
					<div className='calculatorIMGResultLeftINSS3'>
						{values[0]}
					</div>
					<div className='calculatorIMGResultRightINSS3'>
						Segue abaixo a <span>simulação prévia</span> de valores
						disponíveis no seu benefício <span>{menu}</span>
					</div>
				</div>
				<div className='calculatorIMGResultDivINSS3'>
					<div className='caixaValoresPequenaINSS3'>Valores</div>
					<div className='calculatorIMGResultGridINSS3'>
						{valuesWithoutFirst.map((value, index) => {
							const label = value.split("R")[0];
							const valueR = value.split("R")[1];
							console.log("label ", label);
							console.log("valueR ", valueR);
							return (
								<div
									className='calculatorIMGResultValuesINSS3'
									key={index}
								>
									{label}
									<button>R{valueR}</button>
								</div>
							);
						})}
					</div>
				</div>
				<h2 className='calculatorIMGResultContratacaoINSS3'>
					Faça sua contratação presencial em uma de nossas lojas
				</h2>
				<section className='calculatorIMGResultEnderecosINSS3'>
					<div className='calculatorIMGResultEnderecosLeftINSS3'>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoBomRetiroINSS3'>
								Bom Retiro do Sul - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoLajeadoINSS3'>Lajeado - RS</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoVenancioAiresINSS3'>
								Venâncio Aires - RS
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoHolambraINSS3'>Holambra - SP</p>
						</div>
					</div>
					<div className='calculatorIMGResultEnderecosRightINSS3'>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoSapucaiaINSS3'>
								Sapucaia do Sul
							</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoEstanciaINSS3'>Estância Velha</p>
						</div>
						<div className='calculatorIMGResultEnderecoINSS3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99'
								className='iconeLocationINSS3'
								alt=''
							/>
							<p className='textoTeutoniaINSS3'>Teutônia</p>
						</div>
					</div>
				</section>
				<section className='calculatorIMGResultTotaisINSS3'>
					<div className='calculatorIMGResultTotalINSS3'>
						<div>VALOR TOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R${values[values.length - 2]}
						</div>
					</div>
					<div className='calculatorIMGResultSubtotalINSS3'>
						<div className='parcelaTotalINSS3'>PARCELA TOTAL</div>
						<div className='dindinResulTotalINSS3'>
							R$
							{values[values.length - 1].split(" ")[0]}{" "}
							<span>
								{values[values.length - 1].split(" ")[1]}
							</span>
						</div>
					</div>
				</section>
				<section className='divContatoINSS3'>
					<div className='contatoINSS3'>
						<img
							src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6'
							alt=''
							className='phone-iconINSS3'
						/>
						<p className='textoNumeroINSS3'>08006080181</p>
					</div>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
						alt=''
						className='logoCreditoRealINSS3'
					/>
				</section>
			</div>
		);
	}
};
