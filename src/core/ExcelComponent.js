import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return "";
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  $on(eventName, callback) {
    const unsub = this.emitter.subscribe(eventName, callback);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  init() {
    this.initDOMListeners();
  }

  unMount() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
