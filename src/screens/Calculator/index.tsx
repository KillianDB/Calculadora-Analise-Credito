import React, { useState } from "react";
import "./Calculator.css";
import { CalculatorINSS1 } from "../../components/Calculators/CalculatorINSS1";
import { CalculatorINSS2 } from "../../components/Calculators/CalculatorINSS2";
import { CalculatorINSS3 } from "../../components/Calculators/CalculatorINSS3";
import { CalculatorINSS4 } from "../../components/Calculators/CalculatorINSS4";
import { CalculatorINSS5 } from "../../components/Calculators/CalculatorINSS5";
// import generatePNGResult from "../../../backend/generatePNGResult";
// import templateINSS1 from "../../assets/TESTE.svg";

function Calculator() {
	const [menu, setMenu] = useState("");
	const [submenu, setSubmenu] = useState("");
	const [allInputsFilled, setAllInputsFilled] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [resultValues, setResultValues] = useState([]);

	function handleMenuChange(newMenu: React.SetStateAction<string>) {
		setMenu(newMenu);
		setSubmenu("");
		filterSubmenuOptions(newMenu.toString());
	}

	function filterSubmenuOptions(menu: string) {
		if (menu === "INSS") {
			return [
				"Possibilidades Gerais",
				"Cálculo Salário Cliente",
				"Cálculo Salário Cliente Sem Cartões",
				"Cálculo Valor Solicitado",
				"Cálculo por Margem Disponível",
			];
		} else if (menu === "LOAS REP LEGAL") {
			return ["Cálculo Salário LOAS/BPC"];
		} else if (menu === "EXERCITO") {
			return ["Possibilidades Gerais", "Cálculo por Margem Disponível"];
		} else if (menu === "PREFEITURA") {
			return ["DAYCOVAL", "ASPECIR", "SANTANDER", "VALOR"];
		} else {
			return ["Submenu"];
		}
	}

	function renderCalculatorByMenus(menu: string, submenu: string) {
		if (menu === "" || submenu === "") {
			return (
				<>
					<div className='calculatorComponentDiv'>
						<h2>
							Selecione valores de menu e submenu para calcular
						</h2>
					</div>
				</>
			);
		} else if (
			menu === "INSS" &&
			submenu === "Cálculo por Margem Disponível"
		) {
			return <CalculatorINSS1 setAllInputsFilled={setAllInputsFilled} />;
		} else if (menu === "INSS" && submenu === "Cálculo Valor Solicitado") {
			return <CalculatorINSS2 setAllInputsFilled={setAllInputsFilled} />;
		} else if (
			menu === "INSS" &&
			submenu === "Cálculo Salário Cliente Sem Cartões"
		) {
			return <CalculatorINSS3 />;
		} else if (menu === "INSS" && submenu === "Cálculo Salário Cliente") {
			return <CalculatorINSS4 />;
		} else if (menu === "INSS" && submenu === "Possibilidades Gerais") {
			return <CalculatorINSS5 />;
		}
	}

	function handleSubmenuChange(
		menu: string,
		newSubmenu: React.SetStateAction<string>
	) {
		setSubmenu(newSubmenu);
		renderCalculatorByMenus(menu, newSubmenu.toString());
	}

	function handleResultDownload(
		menu: string,
		submenu: string,
		values: string[]
	) {
		return () => {
			alert("Baixando resultado...");
			// generatePNGResult(
			// 	"menu1",
			// 	"submenu1",
			// 	["Bem-vindo, TESTE", "Resultado 1", "Resultado 2"],
			// 	templateINSS1
			// );
			console.log(menu, submenu, values);
		};
	}
	return (
		<>
			<div className='headerCalculator'>
				<div className='divMenus'>
					<select
						onChange={(e) => handleMenuChange(e.target.value)}
						defaultValue='Menu'
					>
						<option value=''>Menu</option>
						<option value='INSS'>INSS</option>
						<option value='LOAS REP LEGAL'>LOAS REP LEGAL</option>
						<option value='EXERCITO'>EXÉRCITO</option>
						<option value='PREFEITURA'>PREFEITURA</option>
					</select>
					<select
						onChange={(e) =>
							handleSubmenuChange(menu, e.target.value)
						}
						defaultValue='Submenu'
					>
						{filterSubmenuOptions(menu).map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
					{submenu.slice(0, 15) === "Cálculo Salário" && (
						<label className='checkboxDiv'>
							<input type='checkbox' className='checkbox' />
							Bônus após três meses
						</label>
					)}
					{allInputsFilled && (
						<button
							className='buttonBaixarResultado'
							onClick={handleResultDownload(
								menu,
								submenu,
								resultValues
							)}
						>
							Baixar Resultado
						</button>
					)}
				</div>
				<img src='/logo-square.svg' id='calculatorLogo' alt='Logo' />
			</div>
			{renderCalculatorByMenus(menu, submenu)}
		</>
	);
}

export default Calculator;
