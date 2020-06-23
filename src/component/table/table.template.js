const CODES = {
  A: 65,
  Z: 90,
};

function toCell(indexRow) {
  return function(_, indexColumn) {
    return `
          <div 
            class="cell" 
            contenteditable 
            data-col="${indexColumn}"
            data-type="cell"
            data-id="${indexRow}:${indexColumn}"
          ></div>
      `;
  };
}

function toColumn(columnName, index) {
  return `
      <div class="column" data-type="resizable" data-col="${index}">
        ${columnName}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `;
}

function createRow(index, content) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : ``;

  return `
        <div class="row" data-type="resizable" data-row="${index}">
            <div class="row-info">
              ${index ? index : ""}
                ${resize}
              </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 40) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
    .fill("")
    .map(toChar)
    .map(toColumn)
    .join("");

  rows.push(createRow(null, columns));

  for (let rowNumber = 0; rowNumber < rowsCount; rowNumber++) {
    const cells = new Array(columnsCount)
      .fill("")
      .map(toCell(rowNumber))
      .join("");

    rows.push(createRow(rowNumber + 1, cells));
  }

  return rows.join("");
}
