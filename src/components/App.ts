import Footer from "./Footer";


class App {
  private rootEl: Element;

  constructor(rootEl: Element) {
    this.rootEl = rootEl;
  }

  render() {
    const div = document.createElement("div");
    const footer = new Footer();
    
    div.innerHTML = `
         <div>
            
         </div>
       `;

    this.rootEl.appendChild(div);
    this.rootEl.appendChild(footer.render());
  }
}

export default App;
