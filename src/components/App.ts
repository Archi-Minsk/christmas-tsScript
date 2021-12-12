import StartPage from "./StartPage/StartPage";

class App {
  private rootEl: Element;

  constructor(rootEl: Element) {
    this.rootEl = rootEl;
  }

  render() {
    // const div: Element = document.createElement("div");
    const startPage = new StartPage();

    // div.innerHTML = `<div></div>`;

    // this.rootEl.appendChild(div);
    this.rootEl.appendChild(startPage.render());
  }
}

export default App;
