const fs = require("fs");
const path = require("path");

const cards = [];
const generateColumNums = (index, min, max, star = false) => {
	const column = [];

	while (column.length < 5) {
		if (star && column.length == 2) {
			column.push(`Serie \n N° ${index + 1}`);
			continue;
		}

		const num = Math.round(Math.random() * (max - min) + min);

		if (!column.includes(num)) column.push(num);
	}

	return column;
};

const createACard = (index) => {
	// generar columnas

	const matriz = [
		generateColumNums(index, 1, 15),
		generateColumNums(index, 16, 30),
		generateColumNums(index, 31, 45, true),
		generateColumNums(index, 46, 60),
		generateColumNums(index, 61, 75),
	];

	return matriz;
};

const verifyUnic = (matriz) => {
	let existOne = false;
	// verificar que no exista otro igual

	existOne = cards.some((card) => {
		const eqFive = [];

		card.forEach((col, colIndex) => {
			const colEq = [];

			col.forEach((row, rowIndex) => {
				if (row == matriz[colIndex][rowIndex]) {
					// console.log("coincide numero");
					colEq.push(true);
				}
			});

			if (colEq.length == 5) {
				console.log("coincide columna");
				eqFive.push(true);
			}
		});

		if (eqFive.length == 5) console.log("coincide toda la carta");
		return eqFive.length == 5;
	});

	return !existOne;
};

const generateCards = (number) => {
	while (cards.length < number) {
		const card = createACard(cards.length, 1, 15);

		if (verifyUnic(card)) {
			console.log("generado unico", card);
			cards.push(card);
		}
	}
};

const generateCardData = (count = 12) => {
	generateCards(count);

	fs.writeFileSync("./out/card_data.json", JSON.stringify(cards));
};

module.exports = { generateCardData };
