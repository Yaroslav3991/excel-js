import { $ } from "@core/dom";
import { Emitter } from "../../core/Emitter";

export class Excel {
  constructor(selector, options) {
    this.$element = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const root = $.create("div", "excel");

    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const element = $.create("div", Component.className);
      const component = new Component(element, componentOptions);

      element.html(component.toHTML());
      root.append(element);

      return component;
    });

    return root;
  }

  render() {
    this.$element.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }

  unMount() {
    this.components.forEach((component) => component.unMount());
  }
}
