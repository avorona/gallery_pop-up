

export default class Slider {

  constructor(name, settings) {

    this.config=settings;
    this.wrap = document.querySelector(name);
    this.slider={
      base: [],
      list:[],
      items: [],
      currentSlide: 0
    };
    this.dataItem=this.config.dataItem;

  }



  init() {
    // console.log('hey');

    //  *************** fetch Data with AJAX request
    this._buildSlider();
 
  }


  _buildSlider() {

    let self=this;
    let dataForSliderItem=this.dataItem;
    

 
      
    let slidesData = dataForSliderItem.slides;
    // console.log(slidesData);

    let slider = document.createElement('div');
    slider.setAttribute('class','c-slider js-content');
    slider.classList.add(`c-slider_${dataForSliderItem.name}`);
    slider.setAttribute('data-content', dataForSliderItem.name);

    self.slider.base=slider; 

    let sliderWrap=document.createElement('div');
    sliderWrap.classList.add('c-slider__wrap');
    slider.appendChild(sliderWrap);


    let list = document.createElement('ul');
    list.classList.add('c-slider__list');
    self.slider.list=list; 

    slidesData.forEach((dataSet,dataIndex) => {
        
      let item = document.createElement('li');
      item.setAttribute('class', ' c-slider__item js-c-slideItem');
      item.setAttribute('data-slide-index', dataIndex);  
      list.appendChild(item);

      self.slider.items.push(item);

      sliderWrap.appendChild(list);

      self.wrap.appendChild(slider);

      let itemTemplate = document.querySelector('#slideItemTemplate').innerHTML;
      let thisItemData = slidesData[dataIndex];

      let itemInner = self._getHTMLFromMicroTemplate(itemTemplate, thisItemData);
      item.innerHTML = itemInner;
      
    });

    self._addNavigation();
    // init visibility on first c-slide item
    self._changeVisibleSlide();

   

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


  _addNavigation() {

    let self=this;
    let prevBtn=document.createElement('button');
    prevBtn.setAttribute('class', 'c-slide__controll c-slide__controll_prev js-prev-slide');
    self.slider.base.appendChild(prevBtn);

    let nextBtn = document.createElement('button');
    nextBtn.setAttribute('class', 'c-slide__controll c-slide__controll_next js-next-slide');
    self.slider.base.appendChild(nextBtn);

        
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


    let slides = this.slider.items;
    // console.log(this.slider.items, this.slider.currentSlide);
    slides.forEach(btn => {btn.classList.remove('is-current');});
    
    if (currentSlideIndex >= slides.length) {
      this.slider.currentSlide=0;
      currentSlideIndex='0';
    } else if (currentSlideIndex < 0) {
      
      this.slider.currentSlide = slides.length - 1;
      currentSlideIndex = '' + this.slider.currentSlide;

    }

    let currentSlide=slides.find(el => {

      if (el.getAttribute('data-slide-index') === currentSlideIndex) return el;
    });


    
    currentSlide.classList.add('is-current');
    
   


  }


}
