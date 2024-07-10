import { formatNumber } from "./formatNumbers";

export function calculate(
	menu: string,
	submenu: string,
	values: { label: string; value: string }[]
) {
	if (menu == "INSS" && submenu == "Cálculo por Margem Disponível") {
		if (
			!(values[0].label == "VALOR MARGEM EMPRÉSTIMO: ") ||
			!(values[1].label == "VALOR MARGEM CARTÃO INSS: ") ||
			!(values[2].label == "VALOR MARGEM CARTÃO BENEFÍCIO: ")
		) {
			return "no valid labels";
		}

		const emprestimoT: number = +values[0].value / 0.02339;
		const emprestimoP: number = +values[0].value;

		const cartaoINSST: number = +values[1].value * 22.67;
		const cartaoINSSP: number = +values[1].value * 0.7;

		const cartaoEIT: number = cartaoINSST * 0.32;
		const cartaoEIP: number = +values[1].value * 0.3;

		const cartaoBT: number = +values[2].value * 22.67;
		const cartaoBP: number = +values[2].value * 0.7;

		const cartaoEBT: number = cartaoBT * 0.32;
		const cartaoEBP: number = +values[2].value * 0.3;

		const totalT: number =
			emprestimoT + cartaoINSST + cartaoEIT + cartaoBT + cartaoEBT;
		const totalP: number =
			emprestimoP + cartaoINSSP + cartaoEIP + cartaoBP + cartaoEBP;

		return [
			"VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
			" PARCELA - R$ " + formatNumber(emprestimoP),

			"CARTÃO INSS: R$ " + formatNumber(cartaoINSST),
			" PARCELA - R$ " + formatNumber(cartaoINSSP),

			"VALOR CARTÃO ENVIADO: R$ " + formatNumber(cartaoEIT),
			" PARCELA - R$ " + formatNumber(cartaoEIP),

			"CARTÃO BENEFÍCIO: R$ " + formatNumber(cartaoBT),
			" PARCELA - R$ " + formatNumber(cartaoBP),

			"VALOR CARTÃO ENVIADO: R$ " + formatNumber(cartaoEBT),
			" PARCELA - R$ " + formatNumber(cartaoEBP),

			"TOTAL: R$ " + formatNumber(totalT),
			" PARCELA - R$ " + formatNumber(totalP),
			" 84x",
		];
	} else if (menu == "INSS" && submenu == "Cálculo Valor Solicitado") {
		if (!(values[0].label == "VALOR DE EMPRÉSTIMO SOLICITADO: ")) {
			return "no valid labels";
		}
		const x84 = +values[0].value * 0.02339;
		const x72 = +values[0].value * 0.0257;
		const x60 = +values[0].value * 0.0277;
		const x48 = +values[0].value * 0.0317;
		const x36 = +values[0].value * 0.0386;
		const x24 = +values[0].value * 0.0527;

		return [
			"TOTAL: R$ " + formatNumber(+values[0].value),
			" PARCELA - R$ " + formatNumber(x84),
			" 84x",
			"TOTAL: R$ " + formatNumber(+values[0].value),
			" PARCELA - R$ " + formatNumber(x72),
			" 72x",
			"TOTAL: R$ " + formatNumber(+values[0].value),
			" PARCELA - R$ " + formatNumber(x60),
			" 60x",
			"TOTAL: R$ " + formatNumber(+values[0].value),
			" PARCELA - R$ " + formatNumber(x48),
			" 48x",
			"TOTAL: R$ " + formatNumber(+values[0].value),
			" PARCELA - R$ " + formatNumber(x36),
			" 36x",
			"TOTAL: R$ " + formatNumber(+values[0].value),
			" PARCELA - R$ " + formatNumber(x24),
			" 24x",
		];
	} else if (
		menu == "INSS" &&
		submenu == "Cálculo Salário Cliente Sem Cartões"
	) {
		if (!(values[0].label == "SALÁRIO: ")) {
			return "no valid labels";
		}

		const emprestimoT = (+values[0].value * 0.35) / 0.02339;
		const total = emprestimoT;
		const emprestimoP = +values[0].value * 0.35;

		const saldo = emprestimoP * 0.94;
		const parcela = emprestimoP;
		const reducao = parcela / 0.0219 - saldo;
		const valorLiberado = reducao;
		const totalExtra = total + valorLiberado;
		const parcelaComExtra = emprestimoP;

		return [
			"VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
			"TOTAL: R$ " + formatNumber(total),
			" PARCELA - R$ " + formatNumber(emprestimoP),
			" 84x ",
			"SALDO DEVEDOR (APROXIMADO): R$ " + formatNumber(saldo),
			"PARCELA: R$ " + formatNumber(parcela),
			"VALOR REDUÇÃO DE JUROS (VALOR LÍQUIDO APROXIMADO): R$ " +
				formatNumber(reducao),
			"LIBERA + O VALOR (APROXIMADO) DE: R$ " +
				formatNumber(valorLiberado),
			" APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.",
			"TOTAL: R$ " + formatNumber(totalExtra),
			" PARCELA - R$ " + formatNumber(parcelaComExtra),
			" 84x ",
		];
	} else if (menu == "INSS" && submenu == "Cálculo Sálario Cliente") {
		if (!(values[0].label == "SALÁRIO: ")) {
			return "no valid labels";
		}

		const emprestimoT = (+values[0].value * 0.35) / 0.02339;
		const total = emprestimoT;
		const emprestimoP = +values[0].value * 0.35;

		const saldo = emprestimoP * 0.94;
		const parcela = emprestimoP;
		const reducao = parcela / 0.0219 - saldo;
		const valorLiberado = reducao;
		const totalExtra = total + valorLiberado;
		const parcelaComExtra = emprestimoP;

		return [
			"VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
			"TOTAL: R$ " + formatNumber(total),
			" PARCELA - R$ " + formatNumber(emprestimoP) + " 84x ",
			"SALDO DEVEDOR (APROXIMADO): R$ " + formatNumber(saldo),
			"PARCELA: R$ " + formatNumber(parcela),
			"VALOR REDUÇÃO DE JUROS (VALOR LÍQUIDO APROXIMADO): R$ " +
				formatNumber(reducao),
			"LIBERA + O VALOR (APROXIMADO) DE: R$ " +
				formatNumber(valorLiberado),
			" APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.",
			"TOTAL: R$ " + formatNumber(totalExtra),
			" PARCELA - R$ " + formatNumber(parcelaComExtra) + " 84x ",
		];
	}
}
