import "./toysCard.css";
import { Data } from "../service/interface/interface";
import { data } from "../../db/data";

class ToysCard {
  private card: Element;
  public element: Element;
  private parent: Element | null;
  private parentModal: Element | null;
  private color: Element | null;
  private form: Element | null;
  private size: Element | null;
  private filterData: Array<Data> = [];
  private arrColor: Array<Data> = [];
  private arrForm: Array<Data> = [];
  private arrSize: Array<Data> = [];
  private arrFavorite: Array<Data> = [];
  private loveToys: HTMLInputElement | null;
  private search: any;
  private valueLeft: Element | null;
  private valueRight: Element | null;
  private valueLeftYear: Element | null;
  private valueRightYear: Element | null;
  public container: Data[];
  private countToys: Element;

  constructor(element: Element) {
    this.card;
    this.element = element;
    this.parent;
    this.parentModal;
    this.filterData;
    this.arrColor;
    this.arrForm;
    this.arrSize;
    this.arrFavorite;
    this.form = this.element.querySelector(".filter-form");
    this.color = this.element.querySelector(".filter-color");
    this.size = this.element.querySelector(".filter-size");
    this.loveToys = this.element.querySelector(".love-toys");
    this.search;
    this.valueLeft = this.element.querySelector(".value-count-left");
    this.valueRight = this.element.querySelector(".value-count-right");
    this.valueLeftYear = this.element.querySelector(".year-left");
    this.valueRightYear = this.element.querySelector(".year-right");
    this.container = [];
    this.countToys;

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
                <div data-flag = "${e.num}" class="flag "></div>
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
                (i) => i.color === search
              );
            } else {
              data.forEach((i) => {
                if (i.color === search) {
                  this.arrColor.push(i);
                }
                this.filterData = [...this.arrColor];
              });
            }
          } else {
            this.filterData = this.filterData.filter((i) => i.color !== search);
            this.arrColor = this.arrColor.filter((i) => i.color !== search);
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

  methodFilterForm = (
    btn: Element | null,
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
                (i) => i.shape === search
              );
            } else {
              data.forEach((i) => {
                if (i.shape === search) {
                  this.arrForm.push(i);
                }
              });
              this.filterData = [...this.arrForm];
            }
          } else {
            this.arrForm = this.arrForm.filter((i) => i.shape !== search);
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

  methodFilterSize = (
    btn: Element | null,
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
                (i) => i.size === search
              );
            } else {
              data.forEach((i) => {
                if (i.size === search) {
                  this.arrSize.push(i);
                }
              });
            }
            this.filterData = [...this.arrSize];
          } else {
            this.arrSize = this.arrSize.filter((i) => i.size !== search);
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
        // this.loveToys?.checked = false;
        this.search.value = "";
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

    const count: any = document.querySelector(".number-toys");

    containerCard?.addEventListener("click", (e) => {
      count.innerHTML = "0";
      const target = e.target;
      const arr: Data[] = [];

      if (target instanceof Element) {
        if (target.classList.contains("flag")) {
          target.classList.toggle("flag-active");
          // if (target.classList.contains("flag-active")) {
          const flag: any = this.element.querySelectorAll(".flag-active");

          for (let i = 0; i < flag.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (flag[i].dataset.flag === data[j].num) {
                arr.push(data[j]);
                // }
              }
            }
          }
        }

        this.container = [...arr];
        if (this.container.length > 20) {
          this.container = this.container.slice(0, 20);
          target.classList.toggle("flag-active");
          //       const div = document.createElement("div");
          //       div.classList.add("modal");
          //       div.innerHTML = `
          //    <h2>Бабушка сказала больше 20 не брать</h2>

          // `;

          //       this.parentModal = this.element.querySelector(
          //         ".filter-range-wrapper"
          //       );
          //       if (this.parentModal) {
          //         this.parentModal?.appendChild(div);
          //       }
        }

        count.innerHTML = this.container.length;
      }
    });
  }

  searchFilter() {
    this.search = document.querySelector(".header-search");

    this.search?.addEventListener("input", () => {
      const dataSearch: Data[] = [];
      this.filterData = [];
      if (this.search) {
        const value = this.search.value.trim().toLowerCase();

        data.forEach((i) => {
          if (i.name.toLowerCase().includes(value)) {
            dataSearch.push(i);
          }
        });
        this.filterData = [...dataSearch];

        this.removeToys();
        this.render();
      }
    });
  }

  filterSliderCount() {
    const countLeft: any = this.valueLeft?.innerHTML;
    const countRight: any = this.valueRight?.innerHTML;
    const arr: Data[] = [];
    if (countLeft >= 0) {
      if (this.filterData.length) {
        this.filterData = this.filterData.filter(
          (i) => +i.count >= +countLeft && +i.count <= +countRight
        );
      } else {
        data.forEach((i) => {
          if (+i.count >= +countLeft && +i.count <= +countRight) {
            arr.push(i);
          }
          this.filterData = [...arr];
        });
      }
    }
    this.removeToys();
    this.render();
  }
  filterSliderYear() {
    const countLeft: any = this.valueLeftYear?.innerHTML;
    const countRight: any = this.valueRightYear?.innerHTML;

    const arr: Data[] = [];
    if (countLeft >= 0) {
      if (this.filterData.length) {
        this.filterData = this.filterData.filter(
          (i) => +i.year >= +countLeft && +i.year <= +countRight
        );
      } else {
        data.forEach((i) => {
          if (+i.year >= +countLeft && +i.year <= +countRight) {
            arr.push(i);
          }
          this.filterData = [...arr];
        });
      }
    }

    this.removeToys();
    this.render();
  }

  filterValue(): void {
    this.methodFilterColor(this.color, "white", "белый");
    this.methodFilterColor(this.color, "yellow", "желтый");
    this.methodFilterColor(this.color, "red", "красный");
    this.methodFilterColor(this.color, "blue", "синий");
    this.methodFilterColor(this.color, "green", "зелёный");

    this.methodFilterForm(this.form, "ball", "шар");
    this.methodFilterForm(this.form, "bell", "колокольчик");
    this.methodFilterForm(this.form, "cone", "шишка");
    this.methodFilterForm(this.form, "snowflake", "снежинка");
    this.methodFilterForm(this.form, "toy", "фигурка");

    this.methodFilterSize(this.size, "small", "малый");
    this.methodFilterSize(this.size, "medium", "средний");
    this.methodFilterSize(this.size, "big", "большой");

    this.searchFilter();
    this.love();
    this.filterSort();
    this.btnReset();
    this.filterFlag();
  }
}

export default ToysCard;
