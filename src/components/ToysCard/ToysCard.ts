import "./toysCard.css";
import { Data } from "../service/interface/interface";
import { data } from "../../db/data";

class ToysCard {
  private card: Element;
  public element: Element;
  private parent: Element | null;
  private color: Element | null;
  private form: Element | null;
  private size: Element | null;
  private filterData: Array<Data> = [];
  private arrColor: Array<Data> = [];
  private arrForm: Array<Data> = [];
  private arrSize: Array<Data> = [];
  private arrFavorite: Array<Data> = [];
  private loveToys: HTMLInputElement | null;

  constructor(element: Element) {
    this.card;
    this.element = element;
    this.parent;
    this.filterData;
    this.arrColor;
    this.arrForm;
    this.arrSize;
    this.arrFavorite;
    this.form = this.element.querySelector(".filter-form");
    this.color = this.element.querySelector(".filter-color");
    this.size = this.element.querySelector(".filter-size");
    this.loveToys = this.element.querySelector(".love-toys");

    this.filterValue();
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
                    <p class="info-toys">Любимая : ${
                      e.favorite ? "да" : "нет"
                    }</p>
                </div>
                <div class="flag ${e.num}"></div>
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

  removeToys = (): void => {
    const cards = this.element.querySelectorAll(".card-toys-wrapper");
    cards.forEach((i) => i.remove());
  };

  methodFilterColor = (
    btn: Element | null,
    value: string,
    trigger: string,
    search: string
  ): void => {
    btn?.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.classList.contains(trigger)) {
          target.classList.toggle("active");
          if (target.classList.contains("active")) {
            if (
              this.arrForm.length ||
              this.arrSize.length ||
              this.arrFavorite.length
            ) {
              this.filterData = this.filterData.filter(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (i) => i[value] === search
              );
            } else {
              data.forEach((i) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (i[value] === search) {
                  this.arrColor.push(i);
                }
                this.filterData = [
                  ...this.arrColor,
                  // ...this.arrForm,
                  // ...this.arrSize,
                ];
              });
            }

            console.log(this.filterData.length);
          } else {
            this.filterData = this.filterData.filter(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (i) => i[value] !== search
            );
            this.arrColor = this.arrColor.filter(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (i) => i[value] !== search
            );
            this.filterData = [
              ...this.arrSize,
              ...this.arrColor,
              ...this.arrForm,
              ...this.arrFavorite,
            ];
            console.log(this.filterData.length);
            console.log(this.arrSize.length);
            // this.filterData = this.arrColor.length
            //   ? [...this.arrColor]
            //   : [...this.arrForm];
            // console.log(this.arrColor);
          }

          this.removeToys();
          this.render();
        }
      }
    });
  };

  methodFilterForm = (
    btn: Element | null,
    value: string,
    trigger: string,
    search: string
  ): void => {
    btn?.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.classList.contains(trigger)) {
          target.classList.toggle("active");
          if (target.classList.contains("active")) {
            if (
              this.arrColor.length ||
              this.arrSize.length ||
              this.arrFavorite.length
            ) {
              this.filterData = this.filterData.filter(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (i) => i[value] === search
              );
            } else {
              data.forEach((i) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (i[value] === search) {
                  this.arrForm.push(i);
                }
              });
              this.filterData = [
                // ...this.arrSize,
                // ...this.arrColor,
                ...this.arrForm,
              ];
            }
          } else {
            // this.filterData = this.filterData.filter(
            //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   // @ts-ignore
            //   (i) => i[value] !== search
            // );

            this.arrForm = this.arrForm.filter(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (i) => i[value] !== search
            );
            this.filterData = [
              ...this.arrSize,
              ...this.arrColor,
              ...this.arrForm,
              ...this.arrFavorite,
            ];
            // this.filterData = this.arrForm.length
            //   ? [...this.arrForm]
            //   : [...this.arrColor];
            // console.log(this.arrForm);
          }

          this.removeToys();
          this.render();
        }
      }
    });
  };

  methodFilterSize = (
    btn: Element | null,
    value: string,
    trigger: string,
    search: string
  ): void => {
    btn?.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.classList.contains(trigger)) {
          target.classList.toggle("active");
          if (target.classList.contains("active")) {
            if (
              this.arrColor.length ||
              this.arrForm.length ||
              this.arrFavorite.length
            ) {
              this.filterData = this.filterData.filter(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (i) => i[value] === search
              );
            } else {
              data.forEach((i) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (i[value] === search) {
                  this.arrSize.push(i);
                }
              });
            }
            this.filterData = [
              ...this.arrSize,
              // ...this.arrColor,
              // ...this.arrForm,
            ];
          } else {
            // this.filterData = this.filterData.filter(
            //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   // @ts-ignore
            //   (i) => i[value] !== search
            // );
            this.arrSize = this.arrSize.filter(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (i) => i[value] !== search
            );
            this.filterData = [
              ...this.arrSize,
              ...this.arrColor,
              ...this.arrForm,
              ...this.arrFavorite,
            ];
          }
          this.removeToys();
          this.render();
        }
      }
    });
  };

  love(): void {
    this.loveToys?.addEventListener("click", () => {
      if (this.loveToys?.checked) {
        if (
          this.arrForm.length ||
          this.arrSize.length ||
          this.arrColor.length
        ) {
          this.filterData = this.filterData.filter((i) => i.favorite === true);
        } else {
          this.arrFavorite = data.filter((i) => i.favorite === true);
          this.filterData.push(...this.arrFavorite);
        }
      } else {
        this.arrFavorite = this.arrFavorite.filter((i) => i.favorite !== true);

        this.filterData = [
          ...this.arrSize,
          ...this.arrColor,
          ...this.arrForm,
          ...this.arrFavorite,
        ];
      }
      this.removeToys();
      this.render();
    });
  }
  filterSort(): void {
    const select = this.element.querySelector(`select`);
    select?.addEventListener("change", () => {
      if (select.value === "sort-name-max") {
        if (this.filterData.length) {
          this.filterData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        } else {
          data.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
      } else if (select.value === "sort-name-min") {
        if (this.filterData.length) {
          this.filterData.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
        } else {
          data.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
        }
      } else if (select.value === "sort-count-max") {
        if (this.filterData.length) {
          this.filterData.sort((a, b) => {
            if (+a.count < +b.count) {
              return -1;
            }
            if (+a.count > +b.count) {
              return 1;
            }
            return 0;
          });
        } else {
          data.sort((a, b) => {
            if (+a.count < +b.count) {
              return -1;
            }
            if (+a.count > +b.count) {
              return 1;
            }
            return 0;
          });
        }
      } else {
        if (this.filterData.length) {
          this.filterData.sort((a, b) => {
            if (+a.count > +b.count) {
              return -1;
            }
            if (+a.count < +b.count) {
              return 1;
            }
            return 0;
          });
        } else {
          data.sort((a, b) => {
            if (+a.count > +b.count) {
              return -1;
            }
            if (+a.count < +b.count) {
              return 1;
            }
            return 0;
          });
        }
      }
      this.removeToys();
      this.render();
    });
  }

  btnReset(): void {
    const btn = this.element.querySelector(".btn-reset");

    if (btn) {
      btn.addEventListener("click", () => {
        this.arrSize = [];
        this.arrColor = [];
        this.arrForm = [];
        this.arrFavorite = [];
        this.filterData = [];
        // if (this.loveToys?.checked) {
        //   this.loveToys?.checked = false
        // }

        const block = this.element.querySelectorAll("span");
        block.forEach((i) => {
          if (i.classList.contains("active")) {
            i.classList.toggle("active");
          }
        });

        this.removeToys();
        this.render();
      });
    }
  }

  filterFlag(): void {
    const containerCard = this.element.querySelector(
      ".security-container-toys"
    );
    containerCard?.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.classList.contains("flag")) {
          target.classList.toggle("flag-active");
        }
      }
    });
  }

  filterValue(): void {
    this.methodFilterColor(this.color, "color", "white", "белый");
    this.methodFilterColor(this.color, "color", "yellow", "желтый");
    this.methodFilterColor(this.color, "color", "red", "красный");
    this.methodFilterColor(this.color, "color", "blue", "синий");
    this.methodFilterColor(this.color, "color", "green", "зелёный");

    this.methodFilterForm(this.form, "shape", "ball", "шар");
    this.methodFilterForm(this.form, "shape", "bell", "колокольчик");
    this.methodFilterForm(this.form, "shape", "cone", "шишка");
    this.methodFilterForm(this.form, "shape", "snowflake", "снежинка");
    this.methodFilterForm(this.form, "shape", "toy", "фигурка");

    this.methodFilterSize(this.size, "size", "small", "малый");
    this.methodFilterSize(this.size, "size", "medium", "средний");
    this.methodFilterSize(this.size, "size", "big", "большой");

    this.love();
    this.filterSort();
    this.btnReset();
    this.filterFlag();
  }
}

export default ToysCard;
