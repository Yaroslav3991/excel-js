export class TableSelection {
  static className = "selected";

  constructor() {
    this.group = [];
    this.current = null;
  }

  select(element) {
    this.clear();
    element.focus().addClass(TableSelection.className);
    this.group.push(element);
    this.current = element;

    element.addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach((cell) => cell.removeClass(TableSelection.className));
    this.group = [];
  }

  get selectedIds() {
    return this.group.map((el) => el.id());
  }

  selectGroup(group) {
    this.clear();

    this.group = group;
    this.group.forEach((cell) => cell.addClass(TableSelection.className));
  }

  applyStyle(style) {
    this.group.forEach((cell) => cell.css(style));
  }
}
