import "./module";
import "./scss/index.scss";
import { Excel } from "./component/excel/Excel";
import { Header } from "./component/header/Header";
import { Toolbar } from "./component/toolbar/Toolbar";
import { Formula } from "./component/formula/Formula";
import { Table } from "./component/table/Table";

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
