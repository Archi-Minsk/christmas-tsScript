import "./startPage.css";
import Footer from "../Footer/Footer";

class StartPage {
  private element: Element;
  private btn: Element | null;
  constructor() {
    this.element;
    this.btn;
  }
  render(): Element {
    this.element = document.createElement("div");
    this.element.innerHTML = `
      <div class="title-page-wrapper">
        <div class="title-page-wrapper-toys">
          <div class="title-toys toys-1"></div>
          <div class="title-toys toys-2"></div>
        </div>
        <div class="title-text-block">
          <p class="title-text">Помогите бабушке нарядить елку</p>
        </div>
        <button class="title-btn-start">Помочь</button>
        <div class="footer">
          <a class="developer" href="https://github.com/Archi-Minsk" target="_blank">©2021 Archi-Minsk</a>
          <a class="logo" href="https://rs.school" target="_blank"></a>
        </div>
      </div>
    `;
    this.startBtn();

    return this.element;
  }
  startBtn(): void {
    this.btn = this.element.querySelector(".title-btn-start");
    const rootEl = document.querySelector("#root");
    const footer = new Footer();
    if (this.btn) {
      this.btn.addEventListener("click", () => {
        if (rootEl) {
          this.element.remove();
          rootEl.appendChild(footer.render());
        }
      });
    }
  }
}

export default StartPage;
