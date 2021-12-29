import "./treePage.css";
import ToysCard from "../../ToysCard/ToysCard";
import { Data } from "components/service/interface/interface";
import { data } from "../../../db/data";

class TreePage {
  public element: Element | null;
  private mainTree: Element | null;
  private background: Element | null;
  private drag: Element | null;
  private garland: HTMLInputElement | null;
  private containerToys: Array<Data>;
  private toysImg: Element;
  toys: ToysCard;
  public data: Data[];
  constructor() {
    this.element;
    this.mainTree;
    this.background;
    this.drag;
    this.data;
  }

  render() {
    this.element = document.createElement("div");
    this.element.innerHTML = `
        <div class = "container-tree-page">
        <div class="left-container">
        <div class="container-setting">
            <audio src="./assets/audio/audio.mp3"></audio>
            <div class="btn-setting volume"></div>
            <div class="btn-setting snow"></div>
        </div>
        <div class="container-choice-tree">
            <p class="tittle-tree">Выберете Елку</p>
            <div class="wrapper-tree">
                <div class="tree tree-1"></div>
                <div class="tree tree-2"></div>
                <div class="tree tree-3""></div>
                <div class="tree tree-4""></div>
                <div class="tree tree-5""></div>
                <div class="tree tree-6""></div>
            </div>
        </div>
        <div class="container-choice-background">
            <p class="tittle-tree">Выберите Фон</p>
            <div class="wrapper-background">
                <div class="background background-1"></div>
                <div class="background background-2"></div>
                <div class="background background-3"></div>
                <div class="background background-4"></div>
                <div class="background background-5"></div>
                <div class="background background-6"></div>
                <div class="background background-7"></div>
                <div class="background background-8"></div>
                <div class="background background-9"></div>
                <div class="background background-10"></div>
            </div>
        </div>
    </div>

            
            <div class="centre-container background-3">
                <div class="container-snow"></div>
                <div class="main-tree tree-2"></div>
                <div class="blink blink-1 "></div>
                <div class="blink blink-2 "></div>
                <div class="blink blink-3 "></div>
                <div class="blink blink-4 "></div>
                <div class="blink blink-5 "></div>
                <div class="blink blink-6 "></div>
                <div class="blink blink-7 "></div>
                <div class="blink blink-8 "></div>
                <div class="blink blink-9 "></div>
                <div class="blink blink-10 "></div>
                <div class="blink blink-11 "></div>
                <div class="blink blink-12 "></div>
                <div class="blink blink-13 "></div>
                <div class="blink blink-14 "></div>
                <div class="blink blink-15 "></div>
                <div class="blink blink-16 "></div>
                <div class="blink blink-17 "></div>
                <div class="blink blink-18 "></div>
                <div class="blink blink-19 "></div>
                <div class="blink blink-20 "></div>
            </div>
            
        <div class="right-container">
        <div class="toys-wrapper-tree">
          <p class="tittle-tree">Игрушки</p>
          <div class="toys-tree-block" >
            
          </div>
        </div>
        <div class="wrapper-garland">
            <p class="tittle-tree">Гирлянда</p>
            <div class="choice-garland-wrapper">
                <div class="garland-block">
                    <div class="color-garland multicolored"></div>
                    <div class="color-garland red-g"></div>
                    <div class="color-garland blue-g"></div>
                    <div class="color-garland yellow-g"></div>
                    <div class="color-garland pink-g"></div>
                </div>
                <div class="btn-garland">
                    <input class="inputSet" type="checkbox" id="player">
                    <label class="lanLeb" for="player" data-on-label = "выкл " data-off-label = "вкл"></label>
                </div>
            </div>
            
        </div>
        
    </div>
        </div>
      `;

    if (localStorage.getItem("toys")) {
      const local = localStorage.getItem("toys");
      if (typeof local === "string") {
        this.containerToys = JSON.parse(local);
        const count = document.querySelector(".number-toys");
        if (count) {
          count.innerHTML = this.containerToys.length + "";
        }
      }
    }
    const activeClass = document.querySelector(".btn-tree");
    activeClass?.classList.add("activePage");
    this.mainTree = this.element?.querySelector(".main-tree");
    this.background = this.element?.querySelector(".centre-container");
    this.garland = this.element?.querySelector(".inputSet");
    this.choiceTree();
    this.changeBackground();
    this.remove();
    this.includeGarland();
    this.choiceGarland();
    this.snowAdd();
    this.playMusic();
    this.addToys();
    this.dragDrop();

    return this.element;
  }
  remove() {
    const prev = document.querySelector(".header-btn-prev");
    const toys = document.querySelector(".btn-toys");
    prev?.addEventListener("click", () => {
      if (this.element) {
        const activeClass = document.querySelector(".btn-tree");
        activeClass?.classList.remove("activePage");
        this.element.remove();
      }
    });
    toys?.addEventListener("click", () => {
      if (this.element) {
        const activeClass = document.querySelector(".btn-tree");
        activeClass?.classList.remove("activePage");
        this.element.remove();
      }
    });
  }

  addToys() {
    const parent = this.element?.querySelector(".toys-tree-block");
    if (this.containerToys) {
      this.containerToys.forEach((e) => {
        this.toysImg = document.createElement("div");
        this.toysImg.classList.add("add-toys");
        this.toysImg.innerHTML = `
        <img class="img-toys-tree" draggable = true src="./assets/toys/${+e.num}.png" alt="svg">
        <div class="count-toys-tree">${+e.count}</div>
        `;
        if (parent) {
          parent.appendChild(this.toysImg);
        }
      });
    } else {
      for (let i = 0; i < 20; i++) {
        this.toysImg = document.createElement("div");
        this.toysImg.classList.add("add-toys");
        this.toysImg.innerHTML = `
        <img class="img-toys-tree" draggable = true src="./assets/toys/${+data[
          i
        ].num}.png" alt="svg">
        <div class="count-toys-tree">${+data[i].count}</div>
        `;
        if (parent) {
          parent.appendChild(this.toysImg);
        }
      }
    }
  }

  dragDrop() {
    let coordX: number;
    let coordY: number;
    let startX: number;
    let startY: number;

    let toys: HTMLElement;
    const drag = this.element?.querySelectorAll(".img-toys-tree");
    const zone = this.element?.querySelector(".main-tree");
    const backZone = this.element?.querySelectorAll(".add-toys");
    if (drag)
      drag.forEach((el) => {
        el.addEventListener("dragstart", (e: DragEvent) => {
          e.dataTransfer?.setData("text/html", "dragstart");
          // if (e.dataTransfer) {
          //   e.dataTransfer.effectAllowed = "copy";

          //   console.log(e.dataTransfer);
          // }

          startX = e.pageX;
          startY = e.pageY;
          coordX = 0;
          coordY = 0;

          if (e.target instanceof HTMLElement) {
            toys = e.target;
          }
        });
      });
    zone?.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    zone?.addEventListener("drop", (e: DragEvent) => {
      const target = e.target;

      if (target instanceof HTMLElement) {
        toys.style.position = "absolute";
        toys.style.zIndex = 1000 + "";
        toys.style.left = e.pageX - startX + coordX + "px";
        toys.style.top = e.pageY - startY - coordY + "px";
      }
    });
    backZone?.forEach((el) => {
      el.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
    });
    backZone?.forEach((el) => {
      el.addEventListener("drop", (e: DragEvent) => {
        const target = e.target;

        if (target instanceof HTMLElement) {
          toys.style.position = "absolute";
          toys.style.zIndex = 1000 + "";
          toys.style.left = e.pageX - startX + coordX + "px";
          toys.style.top = e.pageY - startY - coordY + "px";
        }
      });
    });
  }

  choiceTree(): void {
    const treeBtn = this.element?.querySelector(".wrapper-tree");

    treeBtn?.addEventListener("click", (e: DragEvent) => {
      const target = e.target;

      if (target instanceof Element) {
        if (target.classList.contains("tree-1")) {
          this.addClassTree("tree-1");
        } else if (target.classList.contains("tree-2")) {
          this.addClassTree("tree-2");
        } else if (target.classList.contains("tree-3")) {
          this.addClassTree("tree-3");
        } else if (target.classList.contains("tree-4")) {
          this.addClassTree("tree-4");
        } else if (target.classList.contains("tree-5")) {
          this.addClassTree("tree-5");
        } else {
          this.addClassTree("tree-6");
        }
      }
    });
  }
  addClassTree(trigger: string) {
    this.mainTree?.classList.remove("tree-1");
    this.mainTree?.classList.remove("tree-2");
    this.mainTree?.classList.remove("tree-3");
    this.mainTree?.classList.remove("tree-4");
    this.mainTree?.classList.remove("tree-5");
    this.mainTree?.classList.remove("tree-6");
    this.mainTree?.classList.add(trigger);
  }
  changeBackground() {
    const BtnBackground = this.element?.querySelector(".wrapper-background");

    BtnBackground?.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.classList.contains("background-1")) {
          this.addBackgroundTree("background-1");
        } else if (target.classList.contains("background-2")) {
          this.addBackgroundTree("background-2");
        } else if (target.classList.contains("background-3")) {
          this.addBackgroundTree("background-3");
        } else if (target.classList.contains("background-4")) {
          this.addBackgroundTree("background-4");
        } else if (target.classList.contains("background-5")) {
          this.addBackgroundTree("background-5");
        } else if (target.classList.contains("background-6")) {
          this.addBackgroundTree("background-6");
        } else if (target.classList.contains("background-7")) {
          this.addBackgroundTree("background-7");
        } else if (target.classList.contains("background-8")) {
          this.addBackgroundTree("background-8");
        } else if (target.classList.contains("background-9")) {
          this.addBackgroundTree("background-9");
        } else {
          this.addBackgroundTree("background-10");
        }
      }
    });
  }
  addBackgroundTree(trigger: string) {
    this.background?.classList.remove("background-1");
    this.background?.classList.remove("background-2");
    this.background?.classList.remove("background-3");
    this.background?.classList.remove("background-4");
    this.background?.classList.remove("background-5");
    this.background?.classList.remove("background-6");
    this.background?.classList.remove("background-7");
    this.background?.classList.remove("background-8");
    this.background?.classList.remove("background-9");
    this.background?.classList.remove("background-10");
    this.background?.classList.add(trigger);
  }
  includeGarland() {
    const blockGarland = this.element?.querySelectorAll(".color-garland");
    this.garland?.addEventListener("click", () => {
      if (this.garland) {
        blockGarland?.forEach((e) => {
          e.classList.toggle("active-garland");
        });
        if (this.garland.checked == false) {
          const garland = this.element?.querySelectorAll(".blink");
          garland?.forEach((e) => {
            e.classList.remove("red-garland");
            e.classList.remove("blue-garland");
            e.classList.remove("yellow-garland");
            e.classList.remove("pink-garland");
            e.classList.remove("multicolored-garland");
          });
        }
      }
    });
  }
  choiceGarland() {
    const garland = this.element?.querySelectorAll(".blink");
    const blockGarland = this.element?.querySelector(".garland-block");
    blockGarland?.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.classList.contains("active-garland")) {
          if (target.classList.contains("red-g")) {
            garland?.forEach((e) => {
              e.classList.add("red-garland");
              e.classList.remove("blue-garland");
              e.classList.remove("yellow-garland");
              e.classList.remove("pink-garland");
              e.classList.remove("multicolored-garland");
            });
          } else if (target.classList.contains("blue-g")) {
            garland?.forEach((e) => {
              e.classList.remove("red-garland");
              e.classList.add("blue-garland");
              e.classList.remove("yellow-garland");
              e.classList.remove("pink-garland");
              e.classList.remove("multicolored-garland");
            });
          } else if (target.classList.contains("yellow-g")) {
            garland?.forEach((e) => {
              e.classList.remove("red-garland");
              e.classList.remove("blue-garland");
              e.classList.add("yellow-garland");
              e.classList.remove("pink-garland");
              e.classList.remove("multicolored-garland");
            });
          } else if (target.classList.contains("pink-g")) {
            garland?.forEach((e) => {
              e.classList.remove("red-garland");
              e.classList.remove("blue-garland");
              e.classList.remove("yellow-garland");
              e.classList.remove("multicolored-garland");
              e.classList.add("pink-garland");
            });
          } else {
            garland?.forEach((e) => {
              e.classList.remove("red-garland");
              e.classList.remove("blue-garland");
              e.classList.remove("yellow-garland");
              e.classList.remove("pink-garland");
              e.classList.add("multicolored-garland");
            });
          }
        }
      }
    });
  }

  playMusic() {
    const btnPlay = this.element?.querySelector(".volume");
    const player = this.element?.querySelector("audio");
    let music = false;

    btnPlay?.addEventListener("click", () => {
      btnPlay.classList.toggle("snow-active");
      if (music == false) {
        player?.play();
        music = true;
      } else {
        player?.pause();
        music = false;
      }
    });
  }

  snowAdd() {
    const snow = this.element?.querySelector(".snow");
    const containerSnow = this.element?.querySelector(".container-snow");
    snow?.addEventListener("click", () => {
      containerSnow?.classList.toggle("play-snow");
      snow.classList.toggle("snow-active");
    });
  }
}

export default TreePage;
