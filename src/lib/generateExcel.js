// Require library
const path = require("path");
const xl = require("excel4node");

const card_data = require("../../out/card_data.json");

const constructCard = (wb, ws, data, index) => {
	const styleTitle = wb.createStyle({
		font: {
			// color: "#FF0800",
			bold: true,
			size: 20,
		},
		alignment: {
			// wrapText: true,
			horizontal: "center",
			vertical: "center",
		},
		fill: {
			type: "pattern",
			patternType: "solid",
			bgColor: "#FF3300",
			fgColor: "#FF3300",
		},
		border: {
			// §18.8.4 border (Border)
			left: {
				style: "medium", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
				color: "black", // HTML style hex value
			},
			right: {
				style: "medium",
				color: "black",
			},
			top: {
				style: "medium",
				color: "black",
			},
			bottom: {
				style: "medium",
				color: "black",
			},
			// diagonal: {
			// 	style: "medium",
			// 	color: "#000",
			// },
			// diagonalDown: boolean,
			// diagonalUp: boolean,
			// outline: boolean
		},
		// numberFormat: "$#,##0.00; ($#,##0.00); -",
	});

	const styleCenter = wb.createStyle({
		font: {
			size: 12,
			bold: true,
		},
		alignment: {
			wrapText: true,
			horizontal: "center",
			vertical: "center",
		},
		border: {
			left: {
				style: "medium",
				color: "black",
			},
			right: {
				style: "medium",
				color: "black",
			},
			top: {
				style: "medium",
				color: "black",
			},
			bottom: {
				style: "medium",
				color: "black",
			},
		},
	});

	const styleCommon = wb.createStyle({
		font: {
			// color: "#FF0800",
			size: 20,
		},
		alignment: {
			// wrapText: true,
			horizontal: "center",
			vertical: "center",
		},
		border: {
			// §18.8.4 border (Border)
			left: {
				style: "medium", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
				color: "black", // HTML style hex value
			},
			right: {
				style: "medium",
				color: "black",
			},
			top: {
				style: "medium",
				color: "black",
			},
			bottom: {
				style: "medium",
				color: "black",
			},
			// diagonal: {
			// 	style: "medium",
			// 	color: "#000",
			// },
			// diagonalDown: boolean,
			// diagonalUp: boolean,
			// outline: boolean
		},
		// numberFormat: "$#,##0.00; ($#,##0.00); -",
	});

	const par = !!(index % 2);
	const rowOffset = Math.round(
		(par ? Math.max(0, index - 1) * 7 : index * 7) / 2
	);
	const colOffset = par ? 6 : 0;

	ws.cell(1 + rowOffset, 1 + colOffset)

		.string("B")
		.style(styleTitle);
	ws.cell(1 + rowOffset, 2 + colOffset)
		.string("I")
		.style(styleTitle);
	ws.cell(1 + rowOffset, 3 + colOffset)
		.string("N")
		.style(styleTitle);
	ws.cell(1 + rowOffset, 4 + colOffset)
		.string("G")
		.style(styleTitle);
	ws.cell(1 + rowOffset, 5 + colOffset)
		.string("O")
		.style(styleTitle);

	ws.addImage({
		path: "./src/assets/background.png",
		type: "picture",
		position: {
			type: "twoCellAnchor",
			from: {
				col: 1 + colOffset,
				row: 2 + rowOffset,
			},
			to: {
				col: 6 + colOffset,
				row: 7 + rowOffset,
			},
		},
	});

	data.forEach((col, colIndex) => {
		col.forEach((row, rowIndex) => {
			if (typeof row === "string")
				ws.cell(rowIndex + 2 + rowOffset, colIndex + 1 + colOffset)
					.string(row)
					.style(styleCenter);
			else
				ws.cell(rowIndex + 2 + rowOffset, colIndex + 1 + colOffset)
					.number(row)
					.style(styleCommon);
		});
	});

	// // Set value of cell A1 to 100 as a number type styled with paramaters of style
	// ws.cell(1, 1).number(1222200).style(style);

	// // Set value of cell A2 to 'string' styled with paramaters of style
	// ws.cell(2, 1).string("string").style(style);
};

const generateExcel = (fileName = "Excel.xlsx") => {
	// Create a new instance of a Workbook class
	const wb = new xl.Workbook();

	// Add Worksheets to the workbook
	const ws = wb.addWorksheet("Sheet 1");

	const width = 8;

	for (let i = 1; i <= 11; i++) {
		ws.column(i).setWidth(i == 6 ? 2 : width);
	}

	for (let i = 1; i <= 1049; i++) {
		ws.row(i).setHeight(width * 4);
	}

	for (let index = 0; index < card_data.length; index++) {
		const data = card_data[index];

		constructCard(wb, ws, data, index);
	}

	wb.write(`./out/${fileName}`);

	console.log("Excel Generado");
};

// generateExcel("CardsFormat.xlsx");

module.exports = { generateExcel };
