import "./uiSlider.css";
import noUiSlider from "nouislider";

class UiSlider {
  public element: Element;
  public slider1: any;

  constructor(element: Element) {
    this.element = element;
    this.slider1;
  }
  sliderRender1(): void {
    this.slider1 = this.element.querySelector("#slider-1");
    if (this.slider1) {
      noUiSlider.create(this.slider1, {
        start: [0, 12],
        connect: true,
        step: 1,
        range: {
          min: 0,
          max: 12,
        },
      });
    }
  }
  sliderRender2(): void {
    const slider: any = this.element.querySelector("#slider-2");
    if (slider) {
      noUiSlider.create(slider, {
        start: [1940, 2020],
        connect: true,
        step: 10,
        range: {
          min: 1940,
          max: 2020,
        },
      });
    }
  }
}

export default UiSlider;
