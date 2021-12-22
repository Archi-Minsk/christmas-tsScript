import "./toysPage.css";
import UiSlider from "../service/uiSlider/UiSlider";
import ToysCard from "../ToysCard/ToysCard";

class ToysPage {
  private element: Element;
  public count: [number, number];
  public uiSlider1: UiSlider;
  public uiSlider2: UiSlider;
  public valueLeft: Element;
  public valueRight: Element | null;
  public valueLeftYear: Element | null;
  public valueRightYear: Element | null;
  public left: number;
  public right: number;

  constructor() {
    this.element;
    this.count;
    this.uiSlider1;
    this.uiSlider2;
    this.valueLeft;
    this.valueRight;
    this.valueLeftYear;
    this.valueRightYear;
  }
  render(): Element {
    this.element = document.createElement("div");
    this.element.innerHTML = `
            <div class="toys-page-wrapper">
                <div class="toys-filter-wrapper">
                    <div class="filter-style filter-value-wrapper">
                        <h2 class="filter-title-block">Фильтры по значению</h2><br>
                        <div class="filter-forma-wrapper filter-margin filter-form">
                          <p class="filter-value">Форма :</p><span class="ball toys-filter filter-toys-ball"></span><span class="bell toys-filter filter-toys-bell"></span><span class="cone toys-filter filter-toys-cone"></span><span class="snowflake toys-filter filter-toys-snowflake"></span><span class="toy toys-filter filter-toys-toy"></span>
                        </div>
                        <div class="filter-forma-wrapper filter-color">
                          <p class="filter-value">Цвет :</p><span class="white toys-filter filter-color-white"></span><span class="yellow toys-filter filter-color-yellow"></span><span class="red toys-filter filter-color-red"></span><span class="blue toys-filter filter-color-blue"></span><span class="green toys-filter filter-color-green"></span>
                        </div>
                        <div class="filter-forma-wrapper filter-size">
                          <p class="filter-value">Размер :</p><span class="small toys-filter filter-size-small"></span><span class="medium toys-filter filter-size-medium"></span><span class="big toys-filter filter-size-big"></span>
                        </div>
                        <div class="filter-forma-wrapper">
                          <p class="filter-value">Только любимые :</p>
                          <input type="checkbox" class="love-toys" id="1"><label for="1"></label>
                        </div>
                    </div>
                    <div class="filter-style filter-range-wrapper">
                        <h2 class="filter-title-block">Фильтры по диапазону</h2>
                        <p class="filter-value">Количечтво игрушек :</p>
                        <div class="uiSlider-wrapper">
                          <div class="slider-value value-left"></div>
                          <div class="uiSlider1" id="slider-1"></div>
                          <div class="slider-value value-right"></div>
                        </div>
                        
                        <p class="filter-value">Год приобретения :</p>
                        <div class="uiSlider-wrapper">
                          <div class="slider-value value-left-year"></div>
                          <div class="uiSlider2" id="slider-2"></div>
                          <div class="slider-value value-right-year"></div>
                        </div>
                    </div>
                    <div class="filter-style filter-sort-wrapper">
                        <h2 class="sort-title">Сортировка</h2>
                        <select class="sort-select">
                          <option selected value="sort-name-max" >По названию от «А» до «Я»</option>
                          <option value="sort-name-min">По названию от «Я» до «А»</option>
                          <option value="sort-count-max">По количеству по возрастанию</option>
                          <option value="sort-count-min">По количеству по убыванию</option>
                        </select>
                        <button class="btn-reset button-res">Сброс фильтров</button>
                    </div>
                </div>
                <div class="block-toys-wrapper">
                  <div class="security-container-toys">
                    
                  </div>
                </div>
            </div>
        `;

    this.uiSlider1 = new UiSlider(this.element);
    this.uiSlider2 = new UiSlider(this.element);

    this.uiSlider1.sliderRender1();
    this.uiSlider2.sliderRender2();
    this.renderValueSlider();
    this.renderValueYear();
    this.addToys();
    this.btnReset();
    return this.element;
  }
  renderValueSlider(): void {
    this.uiSlider1.slider1.noUiSlider.on("update.one", () => {
      const count = this.uiSlider1.slider1.noUiSlider.get();
      this.removeValue();
      this.left = Math.floor(count[0]);
      this.right = Math.floor(count[1]);

      this.valueLeft = document.createElement("div");
      this.valueLeft.classList.add("value-count-left");

      this.valueRight = document.createElement("div");
      this.valueRight.classList.add("value-count-right");

      this.valueLeft.innerHTML = `${this.left}`;
      this.valueRight.innerHTML = `${this.right}`;
      const parentLeft = this.element.querySelector(".value-left");
      const parentRight = this.element.querySelector(".value-right");
      parentLeft?.appendChild(this.valueLeft);
      parentRight?.appendChild(this.valueRight);

      const sliderCount = new ToysCard(this.element);
      sliderCount.filterSliderCount();
    });
  }

  renderValueYear(): void {
    this.uiSlider2.slider.noUiSlider.on("update.one", () => {
      const count = this.uiSlider2.slider.noUiSlider.get();
      this.removeValueYears();

      const left = Math.floor(count[0]);
      const right = Math.floor(count[1]);

      this.valueLeftYear = document.createElement("div");
      this.valueLeftYear.classList.add("year-left");

      this.valueRightYear = document.createElement("div");
      this.valueRightYear.classList.add("year-right");

      this.valueLeftYear.innerHTML = `${left}`;
      this.valueRightYear.innerHTML = `${right}`;

      const parentLeft = this.element.querySelector(".value-left-year");
      const parentRight = this.element.querySelector(".value-right-year");

      parentLeft?.appendChild(this.valueLeftYear);
      parentRight?.appendChild(this.valueRightYear);
      const sliderYear = new ToysCard(this.element);
      sliderYear.filterSliderYear();
    });
  }

  removeValue(): void {
    this.valueLeft?.remove();
    this.valueRight?.remove();
  }
  removeValueYears(): void {
    this.valueLeftYear?.remove();
    this.valueRightYear?.remove();
  }
  btnReset(): void {
    const btn = this.element.querySelector(".button-res");
    btn?.addEventListener("click", () => {
      this.uiSlider1.slider1.noUiSlider.reset();
      this.uiSlider2.slider.noUiSlider.reset();
    });
  }

  addToys(): void {
    const card = new ToysCard(this.element);
    card.render();
  }
}

export default ToysPage;
