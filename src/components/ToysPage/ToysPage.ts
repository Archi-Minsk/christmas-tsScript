import "./toysPage.css";
import UiSlider from "../service/uiSlider/UiSlider";
import ToysCard from "../ToysCard/ToysCard";

class ToysPage {
  private element: Element;
  constructor() {
    this.element;
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
                          <div class="slider-value">0</div>
                          <div class="uiSlider1" id="slider-1"></div>
                          <div class="slider-value">12</div>
                        </div>
                        
                        <p class="filter-value">Год приобретения :</p>
                        <div class="uiSlider-wrapper">
                          <div class="slider-value">1940</div>
                          <div class="uiSlider2" id="slider-2"></div>
                          <div class="slider-value">2020</div>
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
                        <button class="btn-reset">Сброс фильтров</button>
                    </div>
                </div>
                <div class="block-toys-wrapper">
                  <div class="security-container-toys">
                    
                  </div>
                </div>
            </div>
        `;
    const uiSlider1 = new UiSlider(this.element);
    const uiSlider2 = new UiSlider(this.element);
    this.addToys();
    uiSlider1.sliderRender1();
    uiSlider2.sliderRender2();
    return this.element;
  }
  addToys(): void {
    const card = new ToysCard(this.element);
    card.render();
  }
}

export default ToysPage;
