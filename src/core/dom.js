class Dom {
  constructor() {}
}

export function $() {
  return new Dom();
}

$.create = (tagName, classes = "") => {
  const element = document.createElement(tagName);

  if (classes) {
    element.classList.add(classes);
  }

  return element;
};
