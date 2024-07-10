"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generatePNGResult;
var fs_1 = require("fs");
var xmldom_1 = require("xmldom");
function generatePNGResult(menu, submenu, values, filePath) {
    // Ler o arquivo SVG
    var svgData = (0, fs_1.readFileSync)(filePath, "utf-8");
    // Parsear o conteúdo SVG
    var parser = new xmldom_1.DOMParser();
    var doc = parser.parseFromString(svgData, "image/svg+xml");
    if (menu === "menu1" && submenu === "submenu1" && values[1] === "value1") {
        // Editar as informações dinâmicas
        Object.keys(values).forEach(function (id) {
            var element = doc.getElementById(id);
            if (element) {
                element.textContent = values[id];
            }
        });
    }
    // Serializar o conteúdo SVG de volta para uma string
    var serializer = new xmldom_1.XMLSerializer();
    var newSvgData = serializer.serializeToString(doc);
    // Escrever o novo conteúdo de volta no arquivo
    (0, fs_1.writeFileSync)(filePath, newSvgData, "utf-8");
    console.log("SVG generated and saved to ".concat(filePath));
    return filePath;
}
// Exemplo de uso
var filePath = "../TESTE.svg";
var edits = {
    dynamicText: "Novo Texto 1",
    dynamicResultText1: "Novo Texto 2",
    dynamicResultText2: "Novo Texto 3",
};
generatePNGResult("menu1", "submenu1", edits, filePath);
