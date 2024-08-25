import { formatNumber } from "./formatNumbers";

export function calculate(
	menu: string,
	submenu: string,
	values: { label: string; value: number }[]
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
			//soma total cartão
			formatNumber(cartaoINSST + cartaoBT),
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
			//[0]
			"TOTAL: R$ " + formatNumber(+values[0].value),
			//[1]
			" PARCELA - R$ " + formatNumber(x84),
			//[2]
			" 84x",
			//[3]
			"TOTAL: R$ " + formatNumber(+values[0].value),
			//[4]
			" PARCELA - R$ " + formatNumber(x72),
			//[5]
			" 72x",
			//[6]
			"TOTAL: R$ " + formatNumber(+values[0].value),
			//[7]
			" PARCELA - R$ " + formatNumber(x60),
			//[8]
			" 60x",
			//[9]
			"TOTAL: R$ " + formatNumber(+values[0].value),
			//[10]
			" PARCELA - R$ " + formatNumber(x48),
			//[11]
			" 48x",
			//[12]
			"TOTAL: R$ " + formatNumber(+values[0].value),
			//[13]
			" PARCELA - R$ " + formatNumber(x36),
			//[14]
			" 36x",
			//[15]
			"TOTAL: R$ " + formatNumber(+values[0].value),
			//[16]
			" PARCELA - R$ " + formatNumber(x24),
			//[17]
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

		const saldo = total * 0.94;
		const parcela = emprestimoP;
		const reducao = parcela / 0.0219 - saldo;
		const valorLiberado = reducao;
		const totalExtra = total + valorLiberado;
		const parcelaComExtra = emprestimoP;

		return [
			"VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
			"VALOR MARGEM EMPRÉSTIMO: R$ " + formatNumber(emprestimoP),
			"TOTAL: R$ " + formatNumber(total),
			" PARCELA - R$ " + formatNumber(emprestimoP),
			" 84x ",
			"SALDO DEVEDOR (APROXIMADO): R$ " + formatNumber(saldo),
			"PARCELA: R$ " + formatNumber(parcela),
			"VALOR REDUÇÃO DE JUROS (VALOR LÍQUIDO APROXIMADO): R$ " +
				formatNumber(reducao),
			"LIBERA + O VALOR (APROXIMADO) DE: R$ " +
				formatNumber(valorLiberado),
			"TOTAL: R$ " + formatNumber(totalExtra),
			" PARCELA - R$ " + formatNumber(parcelaComExtra),
			" 84x ",
		];
	} else if (menu == "INSS" && submenu == "Cálculo Salário Cliente") {
		if (!(values[0].label == "SALÁRIO: ")) {
			return "no valid labels";
		}

		const emprestimoT = (+values[0].value * 0.35) / 0.02339;
		const emprestimoP = +values[0].value * 0.35;
		const cartaoP = +values[0].value * 0.05;
		const cartaoT = cartaoP * 22.67;
		const enviadoT = cartaoT * 0.32 * 2;
		const enviadoP = cartaoP * 0.3 * 2;
		const total = emprestimoT + cartaoT * 2 + enviadoT;
		const totalP = emprestimoP + cartaoP * 0.7 * 2 + enviadoP;

		const saldo = emprestimoT * 0.94;
		const parcela = emprestimoP;
		const reducao = parcela / 0.0219 - saldo;
		const valorLiberado = reducao;
		const totalExtra = total + valorLiberado;
		const parcelaComExtra = totalP;

		return [
			//[0]
			"VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
			//[1]
			"VALOR MARGEM EMPRÉSTIMO: R$ " + formatNumber(emprestimoP),
			//[2]
			"VALOR CARTÃO INSS: R$ " + formatNumber(cartaoT),
			//[3]
			"VALOR MARGEM CARTÃO INSS: R$ " + formatNumber(cartaoP),
			//[4]
			"VALOR CARTÃO BENEFÍCIO: R$ " + formatNumber(cartaoT),
			//[5]
			"VALOR MARGEM CARTÃO BENEFÍCIO: R$ " + formatNumber(cartaoP),
			//[6]
			"VALOR CARTÃO ENVIADO: R$ " + formatNumber(enviadoT),
			//[7]
			"VALOR MARGEM CARTÃO ENVIADO: R$ " + formatNumber(enviadoP),
			//[8]
			"TOTAL: R$ " + formatNumber(total),
			//[9]
			" PARCELA - R$ " + formatNumber(totalP),
			//[10]
			" 84x ",
			//[11]
			"SALDO DEVEDOR (APROXIMADO): R$ " + formatNumber(saldo),
			//[12]
			"PARCELA: R$ " + formatNumber(parcela),
			//[13]
			"VALOR REDUÇÃO DE JUROS (VALOR LÍQUIDO APROXIMADO): R$ " +
				formatNumber(reducao),
			//[14]
			"LIBERA + O VALOR (APROXIMADO) DE: R$ " +
				formatNumber(valorLiberado),
			//[15]
			" APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.",
			//[16]
			"TOTAL: R$ " + formatNumber(totalExtra),
			//[17]
			" PARCELA - R$ " + formatNumber(parcelaComExtra),
			//[18]
			"84x",
			//[19] soma total cartão
			formatNumber(cartaoT + cartaoT),
			//[20] soma parcela cartão
			formatNumber(cartaoP + cartaoP),
			//[21] soma total cartão enviado
			formatNumber(enviadoT + enviadoT),
		];
	} else if (menu == "INSS" && submenu == "Possibilidades Gerais") {
		if (
			!(values[0].label == "VALOR MARGEM EMPRÉSTIMO: ") ||
			!(values[1].label == "VALOR MARGEM CARTÃO INSS: ") ||
			!(values[2].label == "VALOR MARGEM CARTÃO BENEFÍCIO: ") ||
			!(values[3].label == "valor liquido aproximado") ||
			!(values[4].label == "total parcelas") ||
			!(values[5].label == "total saldo devedor")
		) {
			return "no valid labels";
		}
		// console.log("inputs", values);

		const emprestimo = +values[0].value / 0.02339;
		const parcelaEmprestimo = +values[0].value;
		const inss = +values[1].value * 22.67;
		const parcelainss = +values[0].value * 0.7;
		const comprasinss = inss * 0.32;
		const parcelacomprasinss = +values[1].value * 0.3;
		const beneficios = +values[2].value * 22.67;
		const parcelabeneficios = +values[2].value * 0.7;
		const comprasbeneficios = beneficios * 0.32;
		const parcelacomprasbeneficios = +values[2].value * 0.3;
		const totalParcelas = values[4].value;
		const totalSaldoDevedor = values[5].value;
		const valorLiquidoAproximado = values[3].value;

		const total =
			emprestimo +
			inss +
			comprasinss +
			beneficios +
			comprasbeneficios +
			valorLiquidoAproximado;
		// const parcela = parcelaEmprestimo + parcelainss + parcelacomprasinss + parcelabeneficios + parcelacomprasbeneficios+totalParcelas;
		const parcela = +values[0].value + +values[1].value + +values[2].value;

		return [
			//[0]
			"VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimo),
			//[1]
			" PARCELA: R$ " + formatNumber(parcelaEmprestimo),
			//[2]
			" 84x",
			//[3]
			"VALOR CARTÃO INSS: R$ " + formatNumber(inss),
			//[4]
			" PARCELA: R$ " + formatNumber(parcelainss),
			//[5]
			" 84x",
			//[6]
			"VALOR COMPRAS: R$ " + formatNumber(comprasinss),
			//[7]
			" PARCELA: R$ " + formatNumber(parcelacomprasinss),
			//[8]
			" 84x",
			//[9]
			"VALOR CARTÃO BENEFÍCIO: R$ " + formatNumber(beneficios),
			//[10]
			" PARCELA: R$ " + formatNumber(parcelabeneficios),
			//[11]
			" 84x",
			//[12]
			"VALOR COMPRAS: R$ " + formatNumber(comprasbeneficios),
			//[13]
			" PARCELA: R$ " + formatNumber(parcelacomprasbeneficios),
			//[14]
			" 84x",
			//[15]
			"TOTAL DAS PARCELAS: R$ " + formatNumber(totalParcelas),
			//[16]
			"TOTAL SALDO DEVEDOR: R$ " + formatNumber(totalSaldoDevedor),
			//[17]
			"VALOR LIQUÍDO APROXIMADO NA PORTABILIDADE: R$ " +
				formatNumber(valorLiquidoAproximado),
			//[18]
			"TROCO LIQUÍDO DA PORTABILIDADE (VALOR APROXIMADO): R$ " +
				formatNumber(valorLiquidoAproximado),
			//[19]
			"TOTAL: R$ " + formatNumber(total),
			//[20]
			" PARCELA - R$ " + formatNumber(parcela),
			//[21]
			" 84x",
			//[22] soma total cartão
			formatNumber(inss + beneficios),
			//[23] soma parcela cartão
			formatNumber(parcelainss + parcelabeneficios),
			//[24] soma total compras
			formatNumber(comprasinss + comprasbeneficios),
			//[25] soma parcela compras
			formatNumber(parcelacomprasinss + parcelacomprasbeneficios),
		];
	}
}
