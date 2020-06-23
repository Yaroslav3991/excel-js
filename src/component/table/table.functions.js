import { range } from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === "cell";
}

export function matrix(target, current) {
  const targetId = target.id(true);
  const currentId = current.id(true);

  const columnsRange = range(currentId.col, targetId.col);
  const rowsRange = range(currentId.row, targetId.row);

  return columnsRange.reduce((acc, column) => {
    rowsRange.forEach((row) => acc.push(`${row}:${column}`));
    return acc;
  }, []);
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;

  switch (key) {
    case "Enter":
    case "ArrowDown":
      row++;
      break;
    case "Tab":
    case "ArrowRight":
      col++;
      break;
    case "ArrowUp":
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
    case "ArrowLeft":
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
