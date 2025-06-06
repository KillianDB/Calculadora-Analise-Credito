import { formatNumber } from "./formatNumbers";

export function calculate(
  menu: string,
  submenu: string,
  values: { label: string; value: number }[]
) {
  const paramsString = localStorage.getItem("calculatorParams");
  if (!paramsString) return "no parameters found";

  const params = JSON.parse(paramsString);
  console.log("params at calculate => ", params);
  // params at calculate =>  {"Prefeitura":{"VALOR":{"coeficiente_valor_liberado":0.0749,"coeficiente_24x":0.0946,"coeficiente_18x":0.11345,"coeficiente_12x":0.13996,"coeficiente_10x":0.1593},"ASPECIR":{"coeficiente_valor_liberado":0.032057,"coeficiente_84x":0.032979,"coeficiente_72x":0.034372,"coeficiente_60x":0.036547,"coeficiente_48x":0.040126},"SANTANDER":{"coeficiente_48x":0.03844,"coeficiente_60x":0.03456,"coeficiente_72x":0.03214,"coeficiente_84x":0.03055,"coeficiente_valor_liberado":0.0295},"DAYCOVAL":{"coeficiente_valor_liberado":0.0295,"coeficiente_84x":0.03055,"coeficiente_72x":0.03214,"coeficiente_60x":0.03456,"coeficiente_48x":0.03844}},"LOAS REP LEGAL":{"Cálculo salário LOAS/BPC (sem emprestimo) ":{"coeficiente_emprestimo":0.02339,"coeficiente_cartao_inss":22.67,"porcentagem_margem_emprestimo":0.3,"porcentagem_margem_cartao_inss":0.05,"porcentagem_cartao_enviado":0.32}},"INSS":{"Cálculo Salário Cliente":{"porcentagem_margem_emprestimo":0.35,"porcentagem_margem_cartao_inss":0.05,"porcentagem_margem_cartao_beneficio":0.05,"coeficiente_emprestimo":0.02339,"coeficiente_cartao_inss":22.67,"coeficiente_cartao_beneficio":22.67,"porcentagem_cartao_enviado":0.32,"porcentagem_saldo_devedor":0.94,"coeficiente_reducao_de_juros":0.0219},"Cálculo Por Margem Disponível":{"coeficiente_emprestimo":0.02339,"coeficiente_cartao_inss":22.67,"porcentagem_cartao_enviado":0.32,"coeficiente_cartao_beneficio":22.67},"Cálculo Valor Solicitado ":{"coeficiente_84x":0.02339,"coeficiente_72x":0.0257,"coeficiente_60x":0.0277,"coeficiente_48x":0.0317,"coeficiente_36x":0.0386,"coeficiente_24x":0.0527},"Possibilidades Gerais":{"coeficiente_emprestimo":0.02339,"coeficiente_cartao_inss":22.67,"porcentagem_compras":0.32,"coeficiente_cartao_beneficio":22.67},"Cálculo Salário Cliente Sem Cartão":{"porcentagem_margem_emprestimo":0.35,"coeficiente_emprestimo":0.02339,"porcentagem_saldo_devedor":0.94,"coeficiente_reducao_de_juros":0.0219}},"EXERCITO":{"Cálculo por Margem Disponível":{"porcentagem_margem_emprestimo":0.4,"coeficiente_emprestimo":0.0402},"Possibilidades Gerais":{"coeficiente_emprestimo":0.02385,"coeficiente_cartao_inss":21.8,"porcentagem_cartao_enviado":0.35,"coeficiente_cartao_beneficio":21.8}}}

  if (menu == "INSS" && submenu == "Cálculo por Margem Disponível") {
    if (
      !(values[0].label == "VALOR MARGEM EMPRÉSTIMO: ") ||
      !(values[1].label == "VALOR MARGEM CARTÃO INSS: ") ||
      !(values[2].label == "VALOR MARGEM CARTÃO BENEFÍCIO: ")
    ) {
      return "no valid labels";
    }

    const INSSValues =
      params?.INSS?.["Cálculo Por Margem Disponível"]?.values || [];

    let coeficienteEmprestimo = +INSSValues.find(
      (v: any) => v.key === "coeficiente_emprestimo"
    )?.value;

    let coeficienteCartaoINSS = +INSSValues.find(
      (v: any) => v.key === "coeficiente_cartao_inss"
    )?.value;

    let coeficienteCartaoBeneficio = +INSSValues.find(
      (v: any) => v.key === "coeficiente_cartao_beneficio"
    )?.value;

    let porcentagemCartaoEnviado = +INSSValues.find(
      (v: any) => v.key === "porcentagem_cartao_enviado"
    )?.value;

    let porcentagemMargemINSSCartaoEnviado = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_inss"
    )?.value;

    let porcentagemMargemBeneficioCartaoEnviado = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_beneficio"
    )?.value;

    let porcentagemMargemCartaoINSS = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_inss"
    )?.value;

    let porcentagemMargemCartaoBeneficio = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_beneficio"
    )?.value;

    const emprestimoT: number = +values[0].value / coeficienteEmprestimo;
    const emprestimoP: number = +values[0].value;

    const cartaoINSST: number = +values[1].value * coeficienteCartaoINSS;
    const cartaoINSSP: number =
      +values[1].value * porcentagemMargemINSSCartaoEnviado;

    const cartaoEIT: number = cartaoINSST * porcentagemCartaoEnviado;
    const cartaoEIP: number = +values[1].value * porcentagemMargemCartaoINSS;

    const cartaoBT: number = +values[2].value * coeficienteCartaoBeneficio;
    const cartaoBP: number =
      +values[2].value * porcentagemMargemBeneficioCartaoEnviado;

    const cartaoEBT: number = cartaoBT * porcentagemCartaoEnviado;
    const cartaoEBP: number =
      +values[2].value * porcentagemMargemCartaoBeneficio;

    const totalT: number =
      emprestimoT + cartaoINSST + cartaoEIT + cartaoBT + cartaoEBT;
    const totalP: number =
      emprestimoP + cartaoINSSP + cartaoEIP + cartaoBP + cartaoEBP;

    return [
      "VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
      " PARCELA R$ " + formatNumber(emprestimoP),

      "CARTÃO INSS: R$ " + formatNumber(cartaoINSST),
      " PARCELA R$ " + formatNumber(cartaoINSSP),

      "VALOR CARTÃO ENVIADO: R$ " + formatNumber(cartaoEIT),
      " PARCELA R$ " + formatNumber(cartaoEIP),

      "CARTÃO BENEFÍCIO: R$ " + formatNumber(cartaoBT),
      " PARCELA R$ " + formatNumber(cartaoBP),

      "VALOR CARTÃO ENVIADO: R$ " + formatNumber(cartaoEBT),
      " PARCELA R$ " + formatNumber(cartaoEBP),

      "TOTAL: R$ " + formatNumber(totalT),
      " PARCELA R$ " + formatNumber(totalP),
      " 84x",
      //soma total cartão
      formatNumber(cartaoINSST + cartaoBT),
    ];
  } else if (menu == "INSS" && submenu == "Cálculo Valor Solicitado") {
    if (!(values[0].label == "VALOR DE EMPRÉSTIMO SOLICITADO: ")) {
      return "no valid labels";
    }

    const INSSValues = params?.INSS?.["Cálculo Valor Solicitado"]?.values || [];

    let coeficiente84x = +INSSValues.find(
      (v: any) => v.key === "coeficiente_84x"
    )?.value;
    let coeficiente72x = +INSSValues.find(
      (v: any) => v.key === "coeficiente_72x"
    )?.value;
    let coeficiente60x = +INSSValues.find(
      (v: any) => v.key === "coeficiente_60x"
    )?.value;
    let coeficiente48x = +INSSValues.find(
      (v: any) => v.key === "coeficiente_48x"
    )?.value;
    let coeficiente36x = +INSSValues.find(
      (v: any) => v.key === "coeficiente_36x"
    )?.value;
    let coeficiente24x = +INSSValues.find(
      (v: any) => v.key === "coeficiente_24x"
    )?.value;

    const x84 = +values[0].value * coeficiente84x;
    const x72 = +values[0].value * coeficiente72x;
    const x60 = +values[0].value * coeficiente60x;
    const x48 = +values[0].value * coeficiente48x;
    const x36 = +values[0].value * coeficiente36x;
    const x24 = +values[0].value * coeficiente24x;

    return [
      //[0]
      "TOTAL: R$ " + formatNumber(+values[0].value),
      //[1]
      " PARCELA R$ " + formatNumber(x84),
      //[2]
      " 84x",
      //[3]
      "TOTAL: R$ " + formatNumber(+values[0].value),
      //[4]
      " PARCELA R$ " + formatNumber(x72),
      //[5]
      " 72x",
      //[6]
      "TOTAL: R$ " + formatNumber(+values[0].value),
      //[7]
      " PARCELA R$ " + formatNumber(x60),
      //[8]
      " 60x",
      //[9]
      "TOTAL: R$ " + formatNumber(+values[0].value),
      //[10]
      " PARCELA R$ " + formatNumber(x48),
      //[11]
      " 48x",
      //[12]
      "TOTAL: R$ " + formatNumber(+values[0].value),
      //[13]
      " PARCELA R$ " + formatNumber(x36),
      //[14]
      " 36x",
      //[15]
      "TOTAL: R$ " + formatNumber(+values[0].value),
      //[16]
      " PARCELA R$ " + formatNumber(x24),
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

    const INSSValues =
      params?.INSS?.["Cálculo Salário Cliente Sem Cartões"]?.values || [];

    let coeficienteEmprestimo = +INSSValues.find(
      (v: any) => v.key === "coeficiente_emprestimo"
    )?.value;
    let coeficienteReducaoJuros = +INSSValues.find(
      (v: any) => v.key === "coeficiente_reducao_de_juros"
    )?.value;
    let porcentagemMargemEmprestimo = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_emprestimo"
    )?.value;
    let porcentagemSaldoDevedor = +INSSValues.find(
      (v: any) => v.key === "porcentagem_saldo_devedor"
    )?.value;
    let porcentagemMaximaMargemEmprestimo = +INSSValues.find(
      (v: any) => v.key === "porcentagem_maxima_margem_emprestimo"
    )?.value;

    const emprestimoT =
      (+values[0].value * porcentagemMaximaMargemEmprestimo) /
      coeficienteEmprestimo;
    const total = emprestimoT;
    const emprestimoP = +values[0].value * porcentagemMargemEmprestimo;

    const saldo = total * porcentagemSaldoDevedor;
    const parcela = emprestimoP;
    const reducao = parcela / coeficienteReducaoJuros - saldo;
    const valorLiberado = reducao;
    const totalExtra = total + valorLiberado;
    const parcelaComExtra = emprestimoP;

    return [
      //[0]
      "VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
      //[1]
      "VALOR MARGEM EMPRÉSTIMO: R$ " + formatNumber(emprestimoP),
      //[2]
      "TOTAL: R$ " + formatNumber(total),
      //[3]
      " PARCELA R$ " + formatNumber(emprestimoP),
      //[4]
      " 84x ",
      //[5]
      "SALDO DEVEDOR (APROXIMADO): R$ " + formatNumber(saldo),
      //[6]
      "PARCELA: R$ " + formatNumber(parcela),
      //[7]
      "VALOR REDUÇÃO DE JUROS (VALOR LÍQUIDO APROXIMADO): R$ " +
        formatNumber(reducao),
      //[8]
      "LIBERA + O VALOR (APROXIMADO) DE: R$ " + formatNumber(valorLiberado),
      // [9]
      "TOTAL: R$ " + formatNumber(totalExtra),
      // [10]
      " PARCELA R$ " + formatNumber(parcelaComExtra),
      " 84x ",
    ];
  } else if (menu == "INSS" && submenu == "Cálculo Salário Cliente") {
    if (!(values[0].label == "SALÁRIO: ")) {
      return "no valid labels";
    }
    const INSSValues = params?.INSS?.["Cálculo Salário Cliente"]?.values || [];

    let coeficienteCartaoINSS = +INSSValues.find(
      (v: any) => v.key === "coeficiente_cartao_inss"
    )?.value;
    let coeficienteEmprestimo = +INSSValues.find(
      (v: any) => v.key === "coeficiente_emprestimo"
    )?.value;
    let coeficienteReducaoJuros = +INSSValues.find(
      (v: any) => v.key === "coeficiente_reducao_de_juros"
    )?.value;
    let porcentagemCartaoEnviado = +INSSValues.find(
      (v: any) => v.key === "porcentagem_cartao_enviado"
    )?.value;
    let porcentagemMargemCartaoINSS = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_inss"
    )?.value;
    let porcentagemMargemEmprestimo = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_emprestimo"
    )?.value;
    let porcentagemSaldoDevedor = +INSSValues.find(
      (v: any) => v.key === "porcentagem_saldo_devedor"
    )?.value;
    let porcentagemMargemTotal = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_total"
    )?.value;
    let coeficienteMultiplicadorCartao = +INSSValues.find(
      (v: any) => v.key === "coeficiente_multiplicador_cartao"
    )?.value;
    console.log(
      "coeficienteMultiplicadorCartao => ",
      coeficienteMultiplicadorCartao
    );

    const emprestimoT =
      (+values[0].value * porcentagemMargemEmprestimo) / coeficienteEmprestimo;
    const emprestimoP = +values[0].value * porcentagemMargemEmprestimo;
    const cartaoP = +values[0].value * porcentagemMargemCartaoINSS;
    const cartaoT = cartaoP * coeficienteCartaoINSS;
    const enviadoT =
      cartaoT * porcentagemCartaoEnviado * coeficienteMultiplicadorCartao;
    const enviadoP =
      cartaoP * porcentagemCartaoEnviado * coeficienteMultiplicadorCartao;
    const total =
      emprestimoT + cartaoT * coeficienteMultiplicadorCartao + enviadoT;
    const totalP =
      emprestimoP +
      cartaoP * porcentagemMargemTotal * coeficienteMultiplicadorCartao +
      enviadoP;

    const saldo = emprestimoT * porcentagemSaldoDevedor;
    const parcela = emprestimoP;
    const reducao = parcela / coeficienteReducaoJuros - saldo;
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
      " PARCELA R$ " + formatNumber(totalP),
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
      "LIBERA + O VALOR (APROXIMADO) DE: R$ " + formatNumber(valorLiberado),
      //[15]
      " APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.",
      //[16]
      "TOTAL: R$ " + formatNumber(totalExtra),
      //[17]
      " PARCELA R$ " + formatNumber(parcelaComExtra),
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
      !(values[2].label == "VALOR MARGEM CARTÃO BENEFÍCIO: ")
    ) {
      return "no valid labels";
    }

    const INSSValues = params?.INSS?.["Possibilidades Gerais"]?.values || [];

    let coeficienteEmprestimo = +INSSValues.find(
      (v: any) => v.key === "coeficiente_emprestimo"
    )?.value;
    let coeficienteCartaoINSS = +INSSValues.find(
      (v: any) => v.key === "coeficiente_cartao_inss"
    )?.value;
    let coeficienteCartaoBeneficio = +INSSValues.find(
      (v: any) => v.key === "coeficiente_cartao_beneficio"
    )?.value;
    let porcentagemCompras = +INSSValues.find(
      (v: any) => v.key === "porcentagem_compras"
    )?.value;
    let porcentagemMargemCartaoINSS = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_inss"
    )?.value;
    let porcentagemMargemCartaoBeneficio = +INSSValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_beneficio"
    )?.value;

    const emprestimo = +values[0].value / coeficienteEmprestimo;
    const parcelaEmprestimo = +values[0].value;
    const inss = +values[1].value * coeficienteCartaoINSS;
    const parcelainss = +values[0].value * porcentagemMargemCartaoINSS;
    const comprasinss = inss * porcentagemCompras;
    const parcelacomprasinss = +values[1].value * porcentagemCompras;
    const beneficios = +values[2].value * coeficienteCartaoBeneficio;
    const parcelabeneficios =
      +values[2].value * porcentagemMargemCartaoBeneficio;
    const comprasbeneficios = beneficios * porcentagemCompras;
    const parcelacomprasbeneficios = +values[2].value * porcentagemCompras;
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

    console.log("total cartão => ", formatNumber(inss + beneficios));
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
      " PARCELA R$ " + formatNumber(parcela),
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
  } else if (
    menu == "LOAS REP LEGAL" &&
    submenu == "Cálculo Salário LOAS/BPC"
  ) {
    if (!(values[0].label == "SALÁRIO: ")) {
      return "no valid labels";
    }
    console.log("params at LOAS => ", params?.["LOAS REP LEGAL"]);
    const loasValues =
      params?.["LOAS REP LEGAL"]?.["Cálculo Salário LOAS/BPC"]?.values || [];
    console.log("loasValues => ", loasValues);
    //!arrumar no banco os valores
    let porcentagemMargemEmprestimo = +loasValues.find(
      (v: any) => v.key === "porcentagem_margem_emprestimo"
    )?.value;
    let porcentagemMargemCartaoINSS = +loasValues.find(
      (v: any) => v.key === "porcentagem_margem_cartao_inss"
    )?.value;
    let coeficienteEmprestimo = +loasValues.find(
      (v: any) => v.key === "coeficiente_emprestimo"
    )?.value;
    let coeficienteCartaoINSS = +loasValues.find(
      (v: any) => v.key === "coeficiente_cartao_inss"
    )?.value;
    let porcentagemCartaoEnviado = +loasValues.find(
      (v: any) => v.key === "porcentagem_cartao_enviado"
    )?.value;
    let porcentagemParcelaCartaoINSS = +loasValues.find(
      (v: any) => v.key === "porcentagem_parcela_cartao_inss"
    )?.value;
    let porcentagemParcelaCartaoEnviado = +loasValues.find(
      (v: any) => v.key === "porcentagem_parcela_cartao_enviado"
    )?.value;
    let valorLiberado = +loasValues.find((v: any) => v.key === "valor_liberado")
      ?.value;

    const margemEmprestimo = +values[0].value * porcentagemMargemEmprestimo;
    const margemCartaoINSS = +values[0].value * porcentagemMargemCartaoINSS;
    const emprestimo = margemEmprestimo / coeficienteEmprestimo;
    const cartaoINSS = margemCartaoINSS * coeficienteCartaoINSS;
    const cartaoEnviado = cartaoINSS * porcentagemCartaoEnviado;
    const parcelaCartaoINSS = margemCartaoINSS * porcentagemParcelaCartaoINSS;
    const parcelaCartaoEnviado =
      margemCartaoINSS * porcentagemParcelaCartaoEnviado;
    const total = emprestimo + cartaoINSS + cartaoEnviado;
    const parcela = margemEmprestimo + parcelaCartaoINSS + parcelaCartaoEnviado;
    const totalComReducaoJuros = total + valorLiberado;

    return [
      //[0]
      "VALOR MARGEM EMPRÉSTIMO: R$ " + formatNumber(margemEmprestimo),
      //[1]
      "VALOR MARGEM CARTÃO INSS: R$ " + formatNumber(margemCartaoINSS),
      //[2]
      "VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimo),
      //[3]
      "CARTÃO INSS: R$ " + formatNumber(cartaoINSS),
      //[4]
      "VALOR CARTÃO ENVIADO: R$ " + formatNumber(cartaoEnviado),
      //[5]
      "PARCELA CARTÃO INSS: R$ " + formatNumber(parcelaCartaoINSS),
      //[6]
      "PARCELA MARGEM CARTÃO ENVIADO: R$ " + formatNumber(parcelaCartaoEnviado),
      //[7]
      "LIBERA + O VALOR (APROXIMADO) DE: R$ " + formatNumber(valorLiberado),
      //[8]
      "TOTAL: R$ " + formatNumber(total),
      //[9]
      "PARCELA: R$ " + formatNumber(parcela),
      //[10]
      "84x",
      //[11]
      "TOTAL: R$ " + formatNumber(totalComReducaoJuros),
      //[12]
      "(com redução de juros)",
      //[13]
      "PARCELA: R$ " + formatNumber(parcela),
      //[14]
      "84x",
    ];
  } else if (menu == "Exército" && submenu == "Cálculo por Margem Disponível") {
    if (!(values[0].label == "VALOR MARGEM EMPRÉSTIMO: ")) {
      return "no valid labels";
    }

    const exercitoValues =
      params?.EXERCITO?.["Cálculo por Margem Disponível"]?.values || [];
    let coeficienteEmprestimo = +exercitoValues.find(
      (v: any) => v.key === "coeficiente_emprestimo"
    )?.value;
    let porcentagemMargemEmprestimo = +exercitoValues.find(
      (v: any) => v.key === "porcentagem_margem_emprestimo"
    )?.value;

    const emprestimoT = +values[0].value / coeficienteEmprestimo;
    const emprestimoP = +values[0].value * porcentagemMargemEmprestimo;

    const totalT = emprestimoT;
    const totalP = emprestimoP;
    console.log("emprestimoT", emprestimoT);
    console.log("emprestimoP", emprestimoP);

    return [
      "VALOR EMPRÉSTIMO: R$ " + formatNumber(emprestimoT),
      "PARCELA: R$ " + formatNumber(emprestimoP),
      "TOTAL: R$ " + formatNumber(totalT),
      "PARCELA: R$ " + formatNumber(totalP),
      "72x",
    ];
  } else if (menu == "Exército" && submenu == "Possibilidades Gerais") {
    //!Cálculo Possibilidades Gerais Exército é feito direto no componente
  } else if (menu == "Prefeitura") {
    //!Cálculo Prefeitura é feito direto no componente
  }
}
