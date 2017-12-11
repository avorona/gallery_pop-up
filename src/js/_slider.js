import sliderContent from './knights.json';

export default class Slider {

  constructor(name, settings) {

    this.config=settings;
    this.wrap=name;
    this.content={
      base: sliderContent
    };

  }



  init() {
    console.log('hey');

    //  *************** fetch Data with AJAX request
    this._buildSlider();
 
  }


  _buildSlider() {

    let wrap = document.querySelector(this.wrap);
    let sliderBase=this.content.base;

    // console.log(sliderBase);

    sliderBase.forEach(el => {
      
      let slidesData = el.slides;
      // console.log(slidesData);

      let slider = document.createElement('div');
      slider.classList.add('c-slider', `c-slider_${el.name}`, 'js-content');
      slider.setAttribute('data-content', el.name);
      let list = document.createElement('ul');
      list.classList.add('c-slider-list');

      slidesData.forEach(e => {
        
        let item = document.createElement('li');
        item.classList.add('c-slider-item');

        list.appendChild(item);

        slider.appendChild(list);

        wrap.appendChild(slider);

      });




    });


  }




}
