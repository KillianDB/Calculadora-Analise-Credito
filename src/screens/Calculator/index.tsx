import React, { useState } from "react";
import "./Calculator.css";
import { CalculatorINSS1 } from "../../components/Calculators/CalculatorINSS1";
import { CalculatorINSS2 } from "../../components/Calculators/CalculatorINSS2";
import { CalculatorINSS3 } from "../../components/Calculators/CalculatorINSS3";
import { CalculatorINSS4 } from "../../components/Calculators/CalculatorINSS4";
import { CalculatorINSS5 } from "../../components/Calculators/CalculatorINSS5";
import Modal from "react-modal";
import { CalculatorIMGResult } from "../CalculatorIMGResult";
import axios from "axios";

function Calculator() {
	const [menu, setMenu] = useState("");
	const [submenu, setSubmenu] = useState("");
	const [allInputsFilled, setAllInputsFilled] = useState(false);
	const [finalResult, setFinalResult] = useState<string[]>([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

	function toggleCheckbox() {
		console.log("isChecked", isChecked);
		setIsChecked(!isChecked);
	}

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
		if (menu === "" || submenu === "" || submenu === "Submenu") {
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
			return (
				<CalculatorINSS1
					setAllInputsFilled={setAllInputsFilled}
					setFinalResult={setFinalResult}
				/>
			);
		} else if (menu === "INSS" && submenu === "Cálculo Valor Solicitado") {
			return (
				<CalculatorINSS2
					setAllInputsFilled={setAllInputsFilled}
					setFinalResult={setFinalResult}
				/>
			);
		} else if (
			menu === "INSS" &&
			submenu === "Cálculo Salário Cliente Sem Cartões"
		) {
			return (
				<CalculatorINSS3
					isChecked={isChecked}
					setAllInputsFilled={setAllInputsFilled}
					setFinalResult={setFinalResult}
				/>
			);
		} else if (menu === "INSS" && submenu === "Cálculo Salário Cliente") {
			return (
				<CalculatorINSS4
					isChecked={isChecked}
					setAllInputsFilled={setAllInputsFilled}
					setFinalResult={setFinalResult}
				/>
			);
		} else if (menu === "INSS" && submenu === "Possibilidades Gerais") {
			return (
				<CalculatorINSS5
					setAllInputsFilled={setAllInputsFilled}
					setFinalResult={setFinalResult}
				/>
			);
		}
	}

	function handleSubmenuChange(
		menu: string,
		newSubmenu: React.SetStateAction<string>
	) {
		setSubmenu(newSubmenu);
		renderCalculatorByMenus(menu, newSubmenu.toString());
	}

	function handleResultDownload() {
		setModalIsOpen(true);
	}

	const handleDownloadImage = () => {
		const element = document.getElementById("calculatorIMGResult");
		if (element) {
			console.log("Baixando a imagem");

			axios
				.post(
					"https://creditorealbackend-1ch9vv0q.b4a.run/calculator/image",
					{
						menu,
						submenu,
						element: element.outerHTML,
					}
				)
				.then((response) => {
					window.location.href = response.data.downloadURL;
					console.log("Imagem baixada com sucesso!", response.data);
				})
				.catch((error) => {
					console.error("Erro ao gerar a imagem:", error.message);
				});
		} else {
			console.log("Não foi possível encontrar o elemento ", element);
			alert("Não foi possível encontrar o elemento para gerar a imagem.");
		}
	};

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
						{/* <option value='LOAS REP LEGAL'>LOAS REP LEGAL</option>
						<option value='EXERCITO'>EXÉRCITO</option>
						<option value='PREFEITURA'>PREFEITURA</option> */}
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
							<input
								type='checkbox'
								checked={isChecked}
								onChange={toggleCheckbox}
								className='checkbox'
							/>
							Bônus após três meses
						</label>
					)}
					{allInputsFilled && (
						<div>
							<button
								className='buttonBaixarResultado'
								onClick={handleResultDownload}
							>
								Visualizar Resultado
							</button>
						</div>
					)}
				</div>
				<img src='/logo-square.svg' id='calculatorLogo' alt='Logo' />

				{/* Modal para exibir o resultado */}
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					className='modalCalculator'
				>
					<h2
						className='close-button'
						onClick={() => setModalIsOpen(false)}
					>
						X
					</h2>
					<CalculatorIMGResult
						menu={menu}
						submenu={submenu}
						values={finalResult}
						isChecked={isChecked}
					/>
					<button
						className='buttonModalDownload'
						onClick={handleDownloadImage}
					>
						Baixar Imagem
					</button>
					{/* <button onClick={() => setModalIsOpen(false)}>Close</button> */}
				</Modal>
			</div>
			{renderCalculatorByMenus(menu, submenu)}
		</>
	);
}

export default Calculator;
