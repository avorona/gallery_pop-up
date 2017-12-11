import sliderContent from './knights.json';

export default class Slider {

  constructor(name, settings) {

    this.config=settings;
    this.wrap=name;
    this.content={
      base: sliderContent
    };
    this.slider={
      currentSlide: 1
    };

  }



  init() {
    // console.log('hey');

    //  *************** fetch Data with AJAX request
    this._buildSlider();
 
  }


  _buildSlider() {

    let self=this;
    let wrap = document.querySelector(this.wrap);
    let sliderBase=this.content.base;

    // console.log(sliderBase);

    sliderBase.forEach(el => {
      
      let slidesData = el.slides;
      // console.log(slidesData);

      let slider = document.createElement('div');
      slider.setAttribute('class','c-slider js-content');
      slider.classList.add(`c-slider_${el.name}`);
      slider.setAttribute('data-content', el.name);

      let list = document.createElement('ul');
      list.classList.add('c-slider__list');

      slidesData.forEach((dataSet,dataIndex) => {
        
        let item = document.createElement('li');
        item.setAttribute('class', ' c-slider__item js-c-slideItem');
        item.setAttribute('data-slide-index', `${dataSet.id}`);  
        list.appendChild(item);

        slider.appendChild(list);

        wrap.appendChild(slider);

        let itemTemplate = document.querySelector('#slideItemTemplate').innerHTML;
        let thisItemData = slidesData[dataIndex];

        let itemInner = self._getHTMLFromMicroTemplate(itemTemplate, thisItemData);
        item.innerHTML = itemInner;

          
      });

      self._addNavigation(slider);
      // init visibility on first c-slide item
      self._changeVisibleSlide();

    });

  }

  // micro templating, sort-of
  _getHTMLFromMicroTemplate(src, data) {
    // replace {{tags}} in source
    return src.replace(/\{\{([\w\-_\.]+)\}\}/gi, function(match, key) {
      // walk through objects to get value
      var value = data;
      key.split('.').forEach(function(part) {
        // console.log(value);
        value = value[part];
      });
      return value;
    }); 
  }


  _addNavigation(wrap) {

    let self=this;
    let prevBtn=document.createElement('button');
    prevBtn.setAttribute('class', 'c-slide__controll c-slide__controll_prev js-prev-slide');

    let nextBtn = document.createElement('button');
    nextBtn.setAttribute('class', 'c-slide__controll c-slide__controll_next js-next-slide');

    prevBtn.addEventListener('click', function(e) {
      self.slider.currentSlide-=1;
      self._changeVisibleSlide();
    });

    nextBtn.addEventListener('click', function(e) {
      self.slider.currentSlide += 1;
      self._changeVisibleSlide();
    });

  }

  _changeVisibleSlide() {

    let currentSlideIndex=''+this.slider.currentSlide;

    
    let slides = [].slice.call(document.querySelectorAll('.js-c-slideItem'));
    
    let currentSlide=slides.find(el => {
      if (el.getAttribute('data-slide-index') === currentSlideIndex) return el;
    });

    
    currentSlide.classList.add('is-current');
    
   


  }


}
