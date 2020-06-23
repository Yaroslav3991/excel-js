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

  selectGroup(group) {
    this.clear();

    this.group = group;
    this.group.forEach((cell) => cell.addClass(TableSelection.className));
  }
}
