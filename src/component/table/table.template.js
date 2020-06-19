const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
        <div class="cell"></div>
    `;
}

function toColumn(columnName) {
  return `
      <div class="column">${columnName}</div>
    `;
}

function createRow(index, content) {
  return `
        <div class="row">
            <div class="row-info">${index ? index : ""}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
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
