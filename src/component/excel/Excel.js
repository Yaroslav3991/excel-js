import { $ } from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.element = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const root = $.create("div", "excel");

    this.components.forEach((Component) => {
      const element = $.create("div", Component.className);

      const component = new Component(element);
      element.html(component.toHTML());

      root.append(element);
    });

    return root;
  }

  render() {
    this.element.append(this.getRoot());
  }
}
