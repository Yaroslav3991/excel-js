import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";
import { createTable } from "@/component/table/table.template";
import { resizeHandler } from "@/component/table/table.resize";
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector,
} from "@/component/table/table.functions";
import { TableSelection } from "@/component/table/TableSelection";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor(root, options) {
    super(root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.root.find('[data-id="0:0"]'));

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.$on("formula:done", () => {
      this.selection.current.focus();
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.$emit("table:select", cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.root, event);
    } else if (isCell(event)) {
      const target = $(event.target);

      if (event.shiftKey) {
        const selectedCells = matrix(target, this.selection.current).map((id) =>
          this.root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup(selectedCells);
      } else {
        this.selection.select(target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const nextCellAfterKeyDown = this.root.find(nextSelector(key, id));
      this.selectCell(nextCellAfterKeyDown);
    }
  }

  onInput(event) {
    this.$emit("table:input", $(event.target));
  }
}
