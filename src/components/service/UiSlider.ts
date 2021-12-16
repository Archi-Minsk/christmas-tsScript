import "./uiSlider.css";
import noUiSlider from "nouislider";

class UiSlider {
  public element: Element;
  constructor(element: Element) {
    this.element = element;
  }
  sliderRender1(): void {
    const slider: any = this.element.querySelector("#slider-1");
    if (slider) {
      noUiSlider.create(slider, {
        start: [0, 100],
        connect: true,
        range: {
          min: 0,
          max: 100,
        },
      });
    }
  }
  sliderRender2(): void {
    const slider: any = this.element.querySelector("#slider-2");
    if (slider) {
      noUiSlider.create(slider, {
        start: [0, 100],
        connect: true,
        range: {
          min: 0,
          max: 100,
        },
      });
    }
  }
}

export default UiSlider;
