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
			!(
				values[2].label == "VALOR MARGEM CARTÃO BENEFÍCIO: " ||
				!(values[3].label == "PARCELA-1") ||
				!(values[4].label == "PARCELA-2") ||
				!(values[5].label == "PARCELA-3") ||
				!(values[6].label == "PARCELA-4") ||
				!(values[7].label == "PARCELA-5") ||
				!(values[8].label == "PARCELA-6") ||
				!(values[9].label == "PARCELA-7") ||
				!(values[10].label == "SALDO DEVEDOR-1") ||
				!(values[11].label == "SALDO DEVEDOR-2") ||
				!(values[12].label == "SALDO DEVEDOR-3") ||
				!(values[13].label == "SALDO DEVEDOR-4") ||
				!(values[14].label == "SALDO DEVEDOR-5") ||
				!(values[15].label == "SALDO DEVEDOR-6") ||
				!(values[16].label == "SALDO DEVEDOR-7")
			)
		) {
			return "no valid labels";
		}
		console.log(
			"LABELS ",
			values[0].label,
			values[1].label,
			values[2].label,
			values[3].label,
			values[11].label
		);
		console.log(
			"VALUES ",
			values[0].value,
			values[1].value,
			values[2].value,
			values[3].value,
			values[11].value
		);
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
		let possibilidade1 = 0;
		let possibilidade2 = 0;
		let possibilidade3 = 0;
		let possibilidade4 = 0;
		let possibilidade5 = 0;
		let possibilidade6 = 0;
		let possibilidade7 = 0;
		let totalParcelas = 0;
		let totalSaldoDevedor = 0;
		let valorLiquidoAproximado = 0;

		if (values[3].value != "" && values[10].value != "") {
			console.log("parcela 1", values[3].value);
			console.log("saldo devedor 1", values[10].value);
			possibilidade1 = +values[3].value / 0.0223 - +values[10].value;
			console.log("possibilidade 1", possibilidade1);
			if (possibilidade1 > 0) {
				totalParcelas += +values[3].value;
				totalSaldoDevedor += +values[10].value;
				valorLiquidoAproximado += possibilidade1;
			}
		} else if (values[4].value != "" && values[11].value != "") {
			possibilidade2 = +values[4].value / 0.0223 - +values[11].value;
			if (possibilidade2 > 0) {
				totalParcelas += +values[4].value;
				totalSaldoDevedor += +values[11].value;
				valorLiquidoAproximado += possibilidade2;
			}
		} else if (values[5].value != "" && values[12].value != "") {
			possibilidade3 = +values[5].value / 0.0223 - +values[12].value;
			if (possibilidade3 > 0) {
				totalParcelas += +values[5].value;
				totalSaldoDevedor += +values[12].value;
				valorLiquidoAproximado += possibilidade3;
			}
		} else if (values[6].value != "" && values[13].value != "") {
			possibilidade4 = +values[6].value / 0.0223 - +values[13].value;
			if (possibilidade4 > 0) {
				totalParcelas += +values[6].value;
				totalSaldoDevedor += +values[13].value;
				valorLiquidoAproximado += possibilidade4;
			}
		} else if (values[7].value != "" && values[14].value != "") {
			possibilidade5 = +values[7].value / 0.0223 - +values[14].value;
			if (possibilidade5 > 0) {
				totalParcelas += +values[7].value;
				totalSaldoDevedor += +values[14].value;
				valorLiquidoAproximado += possibilidade5;
			}
		} else if (values[8].value != "" && values[15].value != "") {
			possibilidade6 = +values[8].value / 0.0223 - +values[15].value;
			if (possibilidade6 > 0) {
				totalParcelas += +values[8].value;
				totalSaldoDevedor += +values[15].value;
				valorLiquidoAproximado += possibilidade6;
			}
		} else if (values[9].value != "" && values[16].value != "") {
			possibilidade7 = +values[9].value / 0.0223 - +values[16].value;
			if (possibilidade7 > 0) {
				totalParcelas += +values[9].value;
				totalSaldoDevedor += +values[16].value;
				valorLiquidoAproximado += possibilidade7;
			}
		}
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
			"VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimo),
			" PARCELA: R$ " + formatNumber(parcelaEmprestimo),
			" 84x",
			"VALOR CARTÃO INSS: R$ " + formatNumber(inss),
			" PARCELA: R$ " + formatNumber(parcelainss),
			" 84x",
			"VALOR COMPRAS: R$ " + formatNumber(comprasinss),
			" PARCELA: R$ " + formatNumber(parcelacomprasinss),
			" 84x",
			"VALOR CARTÃO BENEFÍCIO: R$ " + formatNumber(beneficios),
			" PARCELA: R$ " + formatNumber(parcelabeneficios),
			" 84x",
			"VALOR COMPRAS: R$ " + formatNumber(comprasbeneficios),
			" PARCELA: R$ " + formatNumber(parcelacomprasbeneficios),
			" 84x",
			"POSSIBILIDADE R$ " + formatNumber(possibilidade1),
			"POSSILIDADE R$ " + formatNumber(possibilidade2),
			"POSSIBILIDADE R$ " + formatNumber(possibilidade3),
			"POSSIBILIDADE R$ " + formatNumber(possibilidade4),
			"POSSIBILIDADE R$ " + formatNumber(possibilidade5),
			"POSSIBILIDADE R$ " + formatNumber(possibilidade6),
			"POSSIBILIDADE R$ " + formatNumber(possibilidade7),
			"TOTAL DAS PARCELAS: R$ " + formatNumber(totalParcelas),
			"TOTAL SALDO DEVEDOR: R$ " + formatNumber(totalSaldoDevedor),
			"VALOR LIQUÍDO APROXIMADO NA PORTABILIDADE: R$ " +
				formatNumber(valorLiquidoAproximado),
			"TROCO LIQUÍDO DA PORTABILIDADE (VALOR APROXIMADO): R$ " +
				formatNumber(valorLiquidoAproximado),
			"TOTAL: R$ " + formatNumber(total),
			" PARCELA - R$ " + formatNumber(parcela),
			" 84x",
			//[29] soma total cartão
			formatNumber(inss + beneficios),
			//[30] soma parcela cartão
			formatNumber(parcelainss + parcelabeneficios),
			//[31] soma total compras
			formatNumber(comprasinss + comprasbeneficios),
			//[32] soma parcela compras
			formatNumber(parcelacomprasinss + parcelacomprasbeneficios),
		];
	}
}
