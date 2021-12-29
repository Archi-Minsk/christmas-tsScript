import "./header.css";
import StartPage from "../StartPage/StartPage";
import ToysPage from "../ToysPage/ToysPage";
import TreePage from "../Tree/TreePage/TreePage";

class Header {
  public element: Element;
  private rootEl: Element | null;
  private btnPrev: Element | null;
  private btnToys: Element | null;
  private btnTree: Element | null;
  constructor() {
    this.element;
    this.rootEl = document.querySelector("#root");
    this.btnPrev;
    this.btnToys;
    this.btnTree;
  }
  render(): Element {
    this.element = document.createElement("div");
    this.element.innerHTML = `
       <div class="header-wrapper">
         <div class="header-nav-wrapper">
           <div class="header-btn-prev"></div>
           <h2 class="header-btn btn-toys">Игрушки</h2>
           <h2 class="header-btn btn-tree">Ёлка</h2>
         </div>
         <div class="header-search-wrapper">
           <div class="search-footer">
            <span class="search-svg"></span>
            <input type="search" class="header-search" name="toys" placeholder="поиск в чулане">
           </div>
           <div class="number-toys-wrapper">
            <span class="number-toys-top"></span>
            <div class="number-toys">0</div>
           </div>
         </div>
       </div>
      `;
    this.clickPrev();
    this.clickToys();
    this.clickTree();
    return this.element;
  }
  clickPrev(): void {
    this.btnPrev = this.element.querySelector(".header-btn-prev");
    const startPage = new StartPage();

    if (this.btnPrev) {
      this.btnPrev.addEventListener("click", () => {
        this.element.remove();

        if (this.rootEl) {
          this.rootEl.appendChild(startPage.render());
        }
      });
    }
  }
  clickToys() {
    this.btnToys = this.element.querySelector(".btn-toys");

    this.rootEl = document.querySelector("#root");
    const toysPage = new ToysPage();
    this.btnToys?.addEventListener("click", () => {
      if (this.rootEl) {
        const toysPages = this.element.querySelector(".btn-toys");
        toysPages?.classList.add("active-btn");
        this.rootEl.appendChild(toysPage.render());
      }
    });
  }
  clickTree() {
    this.btnToys = this.element.querySelector(".btn-tree");
    const treePage = new TreePage();
    if (this.btnToys) {
      this.btnToys?.addEventListener("click", () => {
        if (this.rootEl) {
          this.rootEl.appendChild(treePage.render());
        }
      });
    }
  }
}

export default Header;
