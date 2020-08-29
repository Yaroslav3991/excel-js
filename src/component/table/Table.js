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
import * as actions from "@/redux/actions";
import { defaultStyles } from "../../constans";
import { parse } from "@core/parse";

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
    return createTable(35, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.root.find('[data-id="0:0"]'));

    this.$on("formula:input", (value) => {
      this.selection.current.attr("data-value", value).text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on("formula:done", () => {
      this.selection.current.focus();
    });

    this.$on("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      );
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.$emit("table:select", cell);

    const styles = cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn("Resize error", e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const target = $(event.target);

      if (event.shiftKey) {
        const selectedCells = matrix(target, this.selection.current).map((id) =>
          this.root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup(selectedCells);
      } else {
        this.selectCell(target);
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

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
