import $ from 'jquery';

export default class Slider {

  constructor(name, settings) {

    this.config=settings;
    this.wrap = document.querySelector(name);
    this.slider={
      base: [],
      baseWidth: 620,
      wrap: [],
      list:[],
      items: [],
      itemWidth:0,
      gap:0,
      itemVisible:2,

      listWidth:0,
      currentSlide: 0,
      sliding: 0,
      startClientX: 0,
      startPixelOffset: 0,
      pixelOffset: 0,
      
    };
    this.dataItem=this.config.dataItem;

  }


  get _slideCount() {
  
    return this.slider.items.length;
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
    slider.style.width = `${self.slider.baseWidth}px`;
    self.slider.base=slider;
   

    let sliderWrap=document.createElement('div');
    sliderWrap.classList.add('c-slider__wrap');
    slider.appendChild(sliderWrap);
    self.slider.wrap=sliderWrap;


    let list = document.createElement('ul');
    list.classList.add('c-slider__list');
    self.slider.list=list; 
    


    slidesData.forEach((dataSet,dataIndex) => {
        
      let item = document.createElement('li');
      item.setAttribute('class', ' c-slider__item js-c-slideItem');
      self.slider.itemWidth =250;

      item.style.width = `${self.slider.itemWidth}px`;


     
      item.setAttribute('data-slide-index', dataIndex);  
      list.appendChild(item);

      self.slider.items.push(item);

      sliderWrap.appendChild(list);
    



      self.wrap.appendChild(slider);
      // using mico-templating technic to generate slider item
      let itemTemplate = document.querySelector('#slideItemTemplate').innerHTML;
      let thisItemData = slidesData[dataIndex];

      let itemInner = self._getHTMLFromMicroTemplate(itemTemplate, thisItemData);
      item.innerHTML = itemInner;
      
    });

    self.slider.gap = 30;


    let gap = 30;
    let length = self.slider.items.length;
    let width = self.slider.itemWidth;
    let listAbsoluteWidth = length * (+width) + (gap * 2 * length);


    list.style.width = listAbsoluteWidth + 'px';
    self.slider.listWidth = listAbsoluteWidth;

    self.slider.width = self.slider.baseWidth;
  

    self._addNavigation();
    // init visibility on first c-slide item
    // self._changeVisibleSlide();

   

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
      self._slide(e);
      // self._changeVisibleSlide();
    });

    nextBtn.addEventListener('click', function(e) {
  
      self.slider.currentSlide += 1;
      self._slide(e);
      // self._changeVisibleSlide();
    });
    self._sliding();
  }

  _sliding() {

    let self=this;
   
    let dragTarget = self.slider.wrap;
    
    ['mousedown', 'touchstart'].forEach(event => {
      dragTarget.addEventListener(event, self._slideStart.bind(self));
    });
    ['mouseup', 'touchend'].forEach(event => {
      dragTarget.addEventListener(event, self._slideEnd.bind(self));
    });
    ['mousemove','touchmove'].forEach(event => {
      dragTarget.addEventListener(event, self._slide.bind(self));
    });
    


  }

  /**
      / Triggers when slide event started
      */
  _slideStart(event) {
    
    let self=this;
    
    // If it is mobile device redefine event to first touch point
    if (event.touches)
      event = event.touches[0];
    // If sliding not started yet store current touch position to calculate distance in future.
    if (self.slider.sliding === 0) {
      self.slider.sliding = 1; // Status 1 = slide started.
      self.slider.startClientX = event.clientX;
    }
  }
  /** Occurs when image is being slide. **/
  _slide(event) {
   
    let self=this;
    // console.log(self._slideCount );
    event.preventDefault();
    if (event.touches)
      event = event.touches[0];
    

    // Distance of slide.
    let deltaSlide;
    if (event.type === 'click') {
      self.slider.sliding = 1; // Status 1 = slide started.
      self.slider.startClientX = event.clientX;
      
      if (event.clientX > self.slider.baseWidth) {
        
        deltaSlide = -self.slider.baseWidth ;
      } else if (event.clientX < self.slider.baseWidth) {
        deltaSlide = self.slider.baseWidth;
      }
    
    } else {
      deltaSlide = event.clientX - self.slider.startClientX;
    }


    console.log(event.clientX, self.slider.baseWidth,deltaSlide);
    // console.log(deltaSlide);
    // If sliding started first time and there was a distance.
    if (self.slider.sliding === 1 && deltaSlide !== 0) {
      self.slider.sliding = 2; // Set status to 'actually moving'
      self.slider.startPixelOffset = self.slider.pixelOffset; // Store current offset

    }

    //  When user move image
    if (self.slider.sliding === 2) {
      // Means that user slide 1 pixel for every 1 pixel of mouse movement.
      let touchPixelRatio = 1;
      // Check for user doesn't slide out of boundaries
      if ((self.slider.currentSlide === 0 && event.clientX > self.slider.startClientX) ||
        (self.slider.currentSlide === self._slideCount - 1 && event.clientX < self.slider.startClientX))
        // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
        touchPixelRatio = 3;
      // Calculate move distance.
      self.slider.pixelOffset = self.slider.startPixelOffset + deltaSlide / touchPixelRatio;
      // Apply moving and remove animation class
      // console.log(event.clientX, self.slider.startClientX,self.slider.pixelOffset);


      // slide to last positions when user slide out of boundries
      let visible = self.slider.itemVisible;
      let absoluteWidth = self.slider.listWidth;
      let gap = self.slider.gap;
      let itemWidth = self.slider.itemWidth;

      // handle slide out to left

      if (self.slider.pixelOffset > gap) {
        self.slider.pixelOffset = 0;

        // handle slide out to right
      } else if ((Math.abs(self.slider.pixelOffset)) >= (self.slider.listWidth)) {

        self.slider.pixelOffset = -absoluteWidth + visible * itemWidth + (gap * 4);

      }
      self.slider.list.style.transform = `translateX(${self.slider.pixelOffset}px)`;



    }
  }

  /** When user release pointer finish slide moving.
      */
  _slideEnd(event) {
    let self=this;
    
    if (self.slider.sliding === 2) {
      // Reset sliding.
      self.slider.sliding = 0;
      // Calculate which slide need to be in view.
      self.slider.currentSlide = self.slider.pixelOffset < self.slider.startPixelOffset ? self.slider.currentSlide + 1 : self.slider.currentSlide - 1;
      
      // Make sure that unexisting slides weren't selected.
      // console.log(self.slider.currentSlide, self._slideCount);
      self.slider.currentSlide = Math.min(Math.max(self.slider.currentSlide, 0), self._slideCount - 1);
      self.slider.pixelOffset = self.slider.currentSlide * -$('.c-slider').width();
  
      // Remove style from DOM (look below)
      $('#temp').remove();  
      // Add a translate rule dynamically and asign id to it
      $('<style id="temp">.c-slider__list.animate{transform:translateX(' + self.slider.pixelOffset + 'px)}</style>').appendTo('head');
      // Add animate class to slider and reset transform prop of this class.
      self.slider.list.classList.add('animate');

      if (Math.abs(self.slider.pixelOffset) < self.slider.listWidth) { 
      

        self.slider.list.style.transform = `translateX(${self.slider.pixelOffset}px)`;

      }


    }
  }

    
   


  


}
