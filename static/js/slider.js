/**
 * slider.js - Create interactive slider on a webpage.
 *
 * Version: 0.1.0
 *
 * Quickstart:
 *   1. Prepare html - create slider container and slider items:
 *   ```html
 *   <slider id="my-slider">
 *   </slider>
 *   <nav id="my-slider-nav"></nav>
 *   ```
 *   2. In the script tag initialize slider like this:
 *   ```js
 *   const slider = new Slider(
 *     document.querySelector("#my-slider"),
 *     document.querySelector("#my-slider-nav"),
 *   );
 *   slider.addItems([
 *     { img: "url-to-img", caption: "some-caption" },
 *     { img: "url-to-img", caption: "some-caption" },
 *     { img: "url-to-img", caption: "some-caption" },
 *   ]);
 *   ```
 */

// TODO: Handle when sliderContainerEl or navContainerEl are null
class Slider {
  items = [];
  currentIndex = 0;
  itemClassName = "slider-item";
  
  constructor(sliderContainerEl, navContainerEl) {
    this.sliderContainerEl = sliderContainerEl;
    this.navContainerEl = navContainerEl;
  }

  addItems(items) {
    this.items = this.items.concat(items);
    this.redraw();
  }

  redraw() {
    this.sliderContainerEl.innerHTML = "";
    this.sliderContainerEl.classList.add("slider");
    this.navContainerEl.innerHTML = "";
    this.navContainerEl.classList.add("slider-nav");

    for (let i = 0; i < this.items.length; i++) {
      const si = this.newSliderItemEl(this.items[i]);
      const ni = this.newNavItemEl();
      ni.onclick = () => {this.move(i)};

      if (this.currentIndex != i)
        si.classList.add("slider-hidden");
      else
        ni.classList.add("slider-navitem-active");
      
      this.sliderContainerEl.appendChild(si);
      this.navContainerEl.appendChild(ni);
    }
    
    this.sliderContainerEl.appendChild(this.newControlsEl());
  }

  move(toIndex) {
    console.log("TRACE:", toIndex);
    this.currentIndex = (toIndex < 0) ? this.items.length + (toIndex % this.items.length) : toIndex % this.items.length;
    this.redraw();
  }

  prev() {
    this.move(this.currentIndex - 1);
  }

  next() {
    this.move(this.currentIndex + 1);
  }

  /* HTMLElement generators */
  /* NOTE: Re-assign these functions with custom ones, if you need custom
           rendering of elements.
   */
  newSliderItemEl(item) {
    const img = document.createElement("img");
    img.src = item.img;
    img.className = "slider-img";
    const itemContainer = document.createElement("div");
    itemContainer.className = this.itemClassName;
    itemContainer.appendChild(img);
    
    return itemContainer;
  }

  newControlsEl() {
    const prevBtn = document.createElement("span");
    prevBtn.innerHTML = "&#10094;";
    prevBtn.onclick = () => this.prev();
    prevBtn.classList.add("swipe-btn");
    
    const nextBtn = document.createElement("span");
    nextBtn.innerHTML = "&#10095;";
    nextBtn.onclick = () => this.next();
    nextBtn.classList.add("swipe-btn");

    const controlsContainer = document.createElement("div");
    controlsContainer.appendChild(prevBtn);
    controlsContainer.appendChild(nextBtn);
    controlsContainer.classList.add("slider-controls");
    
    return controlsContainer;
  }

  newNavItemEl() {
    const dot = document.createElement("div");
    dot.classList.add("slider-navitem");
    
    return dot;
    
  }
}
