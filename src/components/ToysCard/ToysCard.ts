import "./toysCard.css";
import { Data } from "../service/interface/interface";
import { data } from "../../db/data";

class ToysCard {
  private card: Element;
  public element: Element;
  private parent: Element | null;
  private color: Element | null;
  private filterData: Array<Data> = [];
  constructor(element: Element) {
    this.card;
    this.element = element;
    this.parent;
    this.filterData;
    this.color = this.element.querySelector(".filter-color");
    this.filterColor();
  }

  structureCard(bd: Array<Data>): void {
    bd.forEach((e) => {
      this.card = document.createElement("div");
      this.card.classList.add("card-toys-wrapper");
      this.card.innerHTML = `
            <h2 class="card-toys-title">${e.name}</h2>
            <div class="card-toys-info-wrapper">
                <img class="card-toys-img" src="./assets/toys/${+e.num}.png" alt="svg">
                <div class="card-toys-info">
                    <p class="info-toys">Количество : ${e.count}</p>
                    <p class="info-toys">Год покупки : ${e.year}</p>
                    <p class="info-toys">Форма : ${e.shape}</p>
                    <p class="info-toys">Цвет : ${e.color}</p>
                    <p class="info-toys">Размер : ${e.size}</p>
                    <p class="info-toys">Любимая : ${e.favorite}</p>
                </div>
                <div class="flag"></div>
            </div>
        `;
      if (this.parent) {
        this.parent.appendChild(this.card);
      }
    });
  }

  render(): void {
    this.parent = this.element.querySelector(".security-container-toys");

    if (this.filterData.length === 0) {
      this.structureCard(data);
    } else {
      this.structureCard(this.filterData);
    }
  }

  removeToys(): void {
    this.card.remove();
  }
  filterColor(): void {
    this.color?.addEventListener("click", (e) => {
      console.log(e.target);
    });
  }
}

export default ToysCard;
