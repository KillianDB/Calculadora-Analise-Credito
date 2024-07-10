import { readFileSync, writeFileSync } from "fs";
import { DOMParser, XMLSerializer } from "xmldom";

interface EditOptions {
	[key: string]: string;
}

export default function generatePNGResult(
	menu: string,
	submenu: string,
	values: EditOptions,
	filePath: string
) {
	// Ler o arquivo SVG
	const svgData = readFileSync(filePath, "utf-8");

	// Parsear o conteúdo SVG
	const parser = new DOMParser();
	const doc = parser.parseFromString(svgData, "image/svg+xml");
	if (menu === "menu1" && submenu === "submenu1" && values[1] === "value1") {
		// Editar as informações dinâmicas
		Object.keys(values).forEach((id) => {
			const element = doc.getElementById(id);
			if (element) {
				element.textContent = values[id];
			}
		});
	}

	// Serializar o conteúdo SVG de volta para uma string
	const serializer = new XMLSerializer();
	const newSvgData = serializer.serializeToString(doc);

	// Escrever o novo conteúdo de volta no arquivo
	writeFileSync(filePath, newSvgData, "utf-8");

	console.log(`SVG generated and saved to ${filePath}`);

	return filePath;
}

// Exemplo de uso
const filePath = "../TESTE.svg";
const edits = {
	dynamicText: "Novo Texto 1",
	dynamicResultText1: "Novo Texto 2",
	dynamicResultText2: "Novo Texto 3",
};

generatePNGResult("menu1", "submenu1", edits, filePath);
