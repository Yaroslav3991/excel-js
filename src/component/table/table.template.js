const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, index) {
  return `
        <div class="cell" contenteditable data-col="${index}"></div>
    `;
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount).fill("").map(toCell).join("");

    rows.push(createRow(i + 1, cells));
  }

  return rows.join("");
}
