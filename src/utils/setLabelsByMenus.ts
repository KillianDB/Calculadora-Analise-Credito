export function setLabelsByMenus(menu: string, submenu: string) {
	let labels: string[] = [""];
	if (
		(menu == "INSS" && submenu == "Cálculo por Margem Disponível") ||
		(menu == "INSS" && submenu == "Possibilidades Gerais")
	) {
		labels = [
			"VALOR MARGEM EMPRÉSTIMO: ",
			"VALOR MARGEM CARTÃO INSS: ",
			"VALOR MARGEM CARTÃO BENEFÍCIO: ",
		];
		return labels;
	} else if (menu == "INSS" && submenu == "Cálculo Valor Solicitado") {
		labels = ["VALOR DE EMPRÉSTIMO SOLICITADO: "];
		return labels;
	} else if (
		(menu == "INSS" && submenu == "Cálculo Salário Cliente") ||
		(menu == "INSS" && submenu == "Cálculo Salário Cliente Sem Cartão") ||
		(menu == "LOAS REP LEGAL" && submenu == "Cálculo Salário LOAS/BPC")
	) {
		labels = ["SALÁRIO: "];
		return labels;
	} else if (menu == "PREFEITURA") {
		labels = ["CÁLCULO DE VALOR POR PARCELA: "];
		return labels;
	} else if (menu == "EXERCITO") {
		labels = ["VALOR MARGEM EMPRÉSTIMO: "];
		return labels;
	}
	return labels;
}
