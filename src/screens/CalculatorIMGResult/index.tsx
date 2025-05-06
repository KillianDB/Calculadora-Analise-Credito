import React, { useMemo } from "react";
// import { CalculatorIMGResultProps } from "./types";

interface CalculatorIMGResultProps {
  menu: string;
  //   submenu: string;
  values: string[];
  clientName?: string;
  //   isChecked: boolean;
  parcelas: string;
  isPartner: boolean;
  hasSubtotal: boolean;
  phone?: string;
  logo?: string;
  containerWidth?: number; //Largura do container pai
  containerHeight?: number; //Altura do container pai
}

export const CalculatorIMGResult: React.FC<CalculatorIMGResultProps> = ({
  menu,
  values,
  clientName = "Cliente CR",
  parcelas,
  isPartner,
  hasSubtotal = false,
  phone = "08006080181",
  logo = "https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814",
  containerWidth = 890,
  containerHeight = 1644,
}) => {
  console.log("values ", values);
  let valuesToUse = hasSubtotal
    ? values.slice(0, values.length - 5)
    : values.slice(0, values.length - 2);
  const totalValue = values[values.length - 2].split(" R$ ")[1];
  let totalParcelas = values[values.length - 1].split(" R$ ")[1];
  const baseWidth = 890;
  const baseHeight = 1644;

  const widthScale = containerWidth / baseWidth;
  const heightScale = containerHeight / baseHeight;
  const scale = Math.max(Math.min(widthScale, heightScale), 0.48); // Define 0.5 como valor mínimo
  // const scale = 1;

  //valuesToUse = [] com 8 infos, se tem parcelas filtra, ficando apenas a primeira info e totalParcelas = parcela selecionada

  if (parcelas) {
    console.log("parcelas ", parcelas);
    valuesToUse = [values[0]];
    totalParcelas = values
      .filter((i) => i.includes(parcelas + "x"))[0]
      .split(" R$ ")[1];
  }
  console.log("parcelas ", parcelas);
  console.log("valuesToUse after parcelas ", valuesToUse);

  const scaled = (value: number) => value * scale;

  // const scale = containerWidth / 890;
  console.log("Container Width:", containerWidth);
  console.log("Container Height:", containerHeight);
  console.log("wiidth Scale:", widthScale);
  console.log("height Scale:", heightScale);
  console.log("Scale:", scale);
  console.log("hasSubtotal: ", hasSubtotal);
  console.log("valuesToUse: ", valuesToUse);

  const styles = useMemo(
    () => ({
      container: {
        width: `${scaled(891)}px`,
        minHeight: `${scaled(1644)}px`,
        background: "#FFFFFF",
        padding: `${scaled(40)}px ${scaled(20)}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${scale})`,
        transformOrigin: "top center",
      },
      overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        background: "rgba(255, 255, 255, 0.05)",
        zIndex: 0,
        border: "1px solid black",
      },
      content: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      titleSection: {
        width: "100%",
        height: `${scaled(355)}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: `${scaled(20)}px`,
      },
      title1: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: `${scaled(70)}px`,
        lineHeight: `${scaled(82)}px`,
        color: `${isPartner?"#001E2D":"#265064"}`,
        marginBottom: `${scaled(10)}px`,
      },
      title2: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(111.55)}px`,
        lineHeight: `${scaled(131)}px`,
        color: `${isPartner?"#000D00":"#F99401"}`,
        marginBottom: `${scaled(10)}px`,
      },
      title3: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: `${scaled(77.52)}px`,
        lineHeight: `${scaled(91)}px`,
        color: `${isPartner?"#001E2D":"#265064"}`,
      },
      introSection: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: `${scaled(30)}px 0`,
      },
      introLeft: {
        width: `${scaled(542)}px`,
        height: `${scaled(123)}px`,
        background:`${isPartner? "radial-gradient(50% 50% at 50% 50%, rgba(38, 80, 100, 0.7) 0%, rgba(38, 80, 100, 0.35) 70%, rgba(38, 80, 100, 0.35) 100%), #2E2E2E":
          "radial-gradient(50% 50% at 50% 50%, rgba(38, 80, 100, 0.7) 0%, rgba(38, 80, 100, 0.35) 70%, rgba(38, 80, 100, 0.35) 100%), #265064"}`,
        borderRadius: `${scaled(50)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `${scaled(4)}px ${scaled(21)}px ${scaled(
          62
        )}px rgba(0, 0, 0, 0.3), inset -${scaled(3)}px -${scaled(4)}px ${scaled(
          7
        )}px #265064`,
        zIndex: 2,
      },
      introLeftText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: `${scaled(40)}px`,
        lineHeight: `${scaled(59)}px`,
        color: "#FFFFFF",
        textAlign: "center",
      },
      introRight: {
        width: `${scaled(529)}px`,
        height: `${scaled(123)}px`,
        background: "rgba(133, 130, 130, 0.5)",
        borderRadius: `${scaled(10)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: `-${scaled(51)}px`,
        paddingLeft: `${scaled(60)}px`,
      },
      introRightText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: `${scaled(27)}px`,
        lineHeight: `${scaled(35)}px`,
        color: "#FFFFFF",
        textAlign: "center",
        padding: `${scaled(16)}px`,
      },
      valuesContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: `${scaled(40)}px 0`,
      },
      valuesTitleBox: {
        background:
          "linear-gradient(0deg, #2E2E2E 0%, #625D5D 50%, #625D5D 100%)",
        borderRadius: `${scaled(10)}px`,
        padding: `${scaled(16)}px`,
        marginBottom: `${scaled(-40)}px`,
        zIndex: 1,
      },
      valuesTitleText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: `${scaled(53.617)}px`,
        lineHeight: `${scaled(63)}px`,
        color: "#FFFFFF",
        textAlign: "center",
      },
      valuesGrid: {
        width: `${scaled(799)}px`,
        background:
          "linear-gradient(90deg, rgba(133, 130, 130, 0.57) 0%, rgba(133, 130, 130, 0.57) 50%, #949494 100%)",
        borderRadius: `${scaled(40.7303)}px`,
        padding: `${scaled(40)}px ${scaled(20)}px`,
        display: "grid",
        gridTemplateColumns: `repeat(${valuesToUse.length > 1 ? 2 : 1}, 1fr)`,
        gap: `${scaled(20)}px`,
      },
      valueItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: `${valuesToUse.length > 1 ? 0 : scaled(20)}px`,
      },
      valueLabel: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(35.0192)}px`,
        lineHeight: `${scaled(41)}px`,
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: `${scaled(10)}px`,
      },
      valueButton: {
        width: `${scaled(244.51)}px`,
        height: `${scaled(53.37)}px`,
        background: 
        `${isPartner? "#001E2D":"#F99401"}`,
        borderRadius: `${scaled(39.5202)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      valueText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: `${scaled(29.1087)}px`,
        lineHeight: `${scaled(34)}px`,
        color: "#FFFFFF",
      },
      contratacaoText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(40)}px`,
        lineHeight: `${scaled(47)}px`,
        textAlign: "center",
        color: "#000000",
        textShadow: `0px ${scaled(2.08721)}px ${scaled(26.0901)}px #FFFFFF`,
        margin: `${scaled(40)}px 0`,
      },
      enderecosSection: {
        width: `${scaled(792)}px`,
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(38, 80, 100, 0.7) 0%, rgba(38, 80, 100, 0.35) 70%, rgba(38, 80, 100, 0.175) 100%), linear-gradient(180deg, #4DA2CA 0%, #397997 50%, #265064 100%)",
        borderRadius: `${scaled(30)}px`,
        padding: `${scaled(30)}px`,
        display: "flex",
        justifyContent: "space-between",
        margin: `${scaled(20)}px 0`,
        boxShadow: `inset -${scaled(3.49583)}px -${scaled(4.6611)}px ${scaled(
          8.15693
        )}px rgba(38, 80, 100, 0.5)`,
      },
      enderecosColuna: {
        width: "48%",
      },
      enderecoItem: {
        display: "flex",
        alignItems: "center",
        marginBottom: `${scaled(15)}px`,
      },
      enderecoIcon: {
        width: `${scaled(33)}px`,
        height: `${scaled(25)}px`,
        marginRight: `${scaled(10)}px`,
        borderRadius: `${scaled(65.6933)}px`,
      },
      enderecoText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(30)}px`,
        lineHeight: `${scaled(35)}px`,
        color: "#FFFFFF",
      },
      subtotalSection: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: `${scaled(20)}px`,
        margin: `${scaled(30)}px 0`,
      },
      subtotalBox: {
        width: `${scaled(328)}px`,
        height: `${scaled(140)}px`,
        background:
          `${isPartner? "#001E2D":"linear-gradient(180deg, rgba(249, 169, 52, 0.8) 0%, rgba(249, 158, 26, 0.9) 50%, #F99401 100%)"}`,
        borderRadius: `${scaled(25.1148)}px`,
        padding: `${scaled(15)}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0px ${scaled(2.46645)}px ${scaled(
          24.6645
        )}px rgba(0, 0, 0, 0.5)`,
      },
      subtotalTitle: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(27.092)}px`,
        lineHeight: `${scaled(32)}px`,
        color: "#FFFFFF",
        marginBottom: `${scaled(5)}px`,
      },
      subtotalValue: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(33.6672)}px`,
        lineHeight: `${scaled(39)}px`,
        color: "#FFFFFF",
        // border: `${scaled(1.03591)}px solid #FFFFFF`,
        padding: `${scaled(5)}px ${scaled(10)}px`,
      },
      infoText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(21)}px`,
        lineHeight: `${scaled(25)}px`,
        color: "#000000",
        textAlign: "center",
        margin: `${scaled(5)}px 0`,
      },
      highlightBox: {
        width: `${scaled(145)}px`,
        height: `${scaled(33)}px`,
        background: 
          `${isPartner? "#001E2D":"#F99401"}`,
        borderRadius: `${scaled(17.0327)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: `${scaled(10)}px auto`,
      },
      highlightText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: `${scaled(20)}px`,
        lineHeight: `${scaled(23)}px`,
        color: "#FFFFFF",
      },
      totaisSection: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        margin: `${scaled(40)}px 0`,
      },
      totalBox: {
        width: `${scaled(419)}px`,
        height: `${scaled(161)}px`,
        background:
          `${isPartner? "#001E2D":"linear-gradient(180deg, rgba(249, 169, 52, 0.8) 0%, rgba(249, 158, 26, 0.9) 50%, #F99401 100%)"}`,
        borderRadius: `${scaled(39.2571)}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0px ${scaled(3.85532)}px ${scaled(
          38.5532
        )}px rgba(0, 0, 0, 0.5)`,
      },
      totalTitle: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: `${scaled(42.3477)}px`,
        lineHeight: `${scaled(50)}px`,
        color: "#FFFFFF",
        marginBottom: `${scaled(15)}px`,
      },
      totalValue: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: `${scaled(52.6254)}px`,
        lineHeight: `${scaled(62)}px`,
        color: "#FFFFFF",
        // border: `${scaled(1.61924)}px solid #FFFFFF`,
        padding: `${scaled(5)}px ${scaled(15)}px`,
      },
      contactSection: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "auto",
      },
      telephone: {
        width: `${scaled(560.25)}px`,
        height: `${scaled(83)}px`,
        background: "linear-gradient(0deg, #2E2E2E 0%, #949494 100%)",
        borderRadius: `${scaled(42.1781)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0px ${scaled(4.14218)}px ${scaled(
          41.4218
        )}px rgba(0, 0, 0, 0.5)`,
      },
      phoneIcon: {
        width: `${scaled(50)}px`,
        height: `${scaled(50)}px`,
        marginRight: `${scaled(20)}px`,
        borderRadius: `${scaled(174)}px`,
        background: "#ffffff",
      },
      phoneText: {
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: `${scaled(55.3333)}px`,
        lineHeight: `${scaled(65)}px`,
        color: "#FFFFFF",
        // border: `${scaled(1.86663)}px solid #FFFFFF`,
        padding: `${scaled(5)}px ${scaled(15)}px`,
      },
      logo: {
        width: `${scaled(139.02)}px`,
        height: `${scaled(190)}px`,
      },
    }),
    [scale, isPartner]
  );

  return (
    <div
      style={styles.container as React.CSSProperties}
      id="calculatorIMGResult"
    >
      <div style={styles.overlay as React.CSSProperties}></div>
      <div style={styles.content as React.CSSProperties}>
        {/* Seção de Título */}
        <div style={styles.titleSection as React.CSSProperties}>
          <h1 style={styles.title1}>Proposta de</h1>
          <h1 style={styles.title2}>CRÉDITO</h1>
          <h1 style={styles.title3}>Consignado</h1>
        </div>

        {/* Seção de Introdução */}
        <div style={styles.introSection}>
          <div style={styles.introLeft}>
            <div style={styles.introLeftText as React.CSSProperties}>
              Bem vindo(a), {clientName}
            </div>
          </div>
          <div style={styles.introRight}>
            <div style={styles.introRightText as React.CSSProperties}>
              Segue abaixo a{" "}
              {<span style={{ color: `${isPartner? "001E2D":"#FF9940"}` }}>simulação prévia</span>} de
              valores disponíveis no seu benefício{" "}
              {<span style={{ color: `${isPartner? "001E2D":"#FF9940"}` }}>{menu}</span>}
            </div>
          </div>
        </div>

        {/* Seção de Valores */}
        <div style={styles.valuesContainer as React.CSSProperties}>
          <div style={styles.valuesTitleBox}>
            <div style={styles.valuesTitleText as React.CSSProperties}>
              Valores
            </div>
          </div>

          <div style={styles.valuesGrid}>
            {valuesToUse.map((value: string, index: number) => {
              const [label, ...rest] = value.split(" R$ ");
              const valueText = rest.join("R$");
              console.log("label ", label);
              console.log("valueText ", valueText);

              return (
                <div
                  key={index}
                  style={styles.valueItem as React.CSSProperties}
                >
                  <div style={styles.valueLabel as React.CSSProperties}>
                    {label}
                  </div>
                  <div style={styles.valueButton}>
                    <div style={styles.valueText}>R$ {valueText}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seção de Contratação */}
        {!isPartner && (
          <div style={styles.contratacaoText as React.CSSProperties}>
            Faça sua contratação presencial em uma de nossas lojas
          </div>
        )}

        {/* Seção de Endereços */}
        {!isPartner && (
          <div style={styles.enderecosSection}>
            <div style={styles.enderecosColuna}>
              <div style={styles.enderecoItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99"
                  style={styles.enderecoIcon}
                  alt="Ícone localização"
                />
                <div style={styles.enderecoText}>Bom Retiro do Sul - RS</div>
              </div>
              <div style={styles.enderecoItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99"
                  style={styles.enderecoIcon}
                  alt="Ícone localização"
                />
                <div style={styles.enderecoText}>Lajeado - RS</div>
              </div>
              <div style={styles.enderecoItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99"
                  style={styles.enderecoIcon}
                  alt="Ícone localização"
                />
                <div style={styles.enderecoText}>Venâncio Aires - RS</div>
              </div>
              <div style={styles.enderecoItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99"
                  style={styles.enderecoIcon}
                  alt="Ícone localização"
                />
                <div style={styles.enderecoText}>Holambra - SP</div>
              </div>
              {/* Adicione mais endereços conforme necessário */}
            </div>
            <div style={styles.enderecosColuna}>
              <div style={styles.enderecoItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99"
                  style={styles.enderecoIcon}
                  alt="Ícone localização"
                />
                <div style={styles.enderecoText}>Sapucaia do Sul - RS</div>
              </div>
              <div style={styles.enderecoItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99"
                  style={styles.enderecoIcon}
                  alt="Ícone localização"
                />
                <div style={styles.enderecoText}>Estância Velha - RS</div>
              </div>
              <div style={styles.enderecoItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/location-icon.jpeg?alt=media&token=c519c2b6-df3a-4784-b66b-089eed28ed99"
                  style={styles.enderecoIcon}
                  alt="Ícone localização"
                />
                <div style={styles.enderecoText}>Teutônia - RS</div>
              </div>
              {/* Adicione mais endereços conforme necessário */}
            </div>
          </div>
        )}

        {/* Seção de Subtotal */}
        {hasSubtotal && (
          <div style={styles.subtotalSection}>
            <div style={styles.subtotalBox as React.CSSProperties}>
              <div style={styles.subtotalTitle}>PARCELA</div>
              <div style={styles.subtotalValue}>
                R$ {values[values.length - 1].split(" R$ ")[1]}
              </div>
            </div>
            <div style={styles.subtotalBox as React.CSSProperties}>
              <div style={styles.subtotalTitle}>SUBTOTAL</div>
              <div style={styles.subtotalValue}>
                R$ {values[values.length - 5].split(" R$ ")[1]}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={styles.infoText as React.CSSProperties}>
                Após 03 parcelas libera o valor aproximado de
              </div>
              <div style={styles.highlightBox}>
                <div style={styles.highlightText}>
                  {values[values.length - 3]}
                </div>
              </div>
              <div style={styles.infoText as React.CSSProperties}>
                sem alterar o valor da parcela!
              </div>
            </div>
          </div>
        )}

        {/* Informação adicional
        {hasSubtotal && (
        )} */}

        {/* Seção de Totais */}
        <div style={styles.totaisSection}>
          <div style={styles.totalBox as React.CSSProperties}>
            <div style={styles.totalTitle}>VALOR TOTAL</div>
            <div style={styles.totalValue}>R$ {totalValue}</div>
          </div>
          <div style={styles.totalBox as React.CSSProperties}>
            <div style={styles.totalTitle}>PARCELA TOTAL</div>
            <div style={styles.totalValue}>R$ {totalParcelas}</div>
          </div>
        </div>

        {/* Seção de Contato */}
        <div style={styles.contactSection}>
          <div style={styles.telephone}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/phone.png?alt=media&token=bf099d75-3044-4115-850a-d31c70c974b6"
              style={styles.phoneIcon}
              alt="Ícone telefone"
            />
            <div style={styles.phoneText}>
              {isPartner ? phone : "08006080181"}
            </div>
          </div>
          <img src={logo} style={styles.logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};
