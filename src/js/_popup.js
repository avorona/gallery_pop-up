
import sliderContent from './knights.json';
import { microTemplating } from './_helpers';
import { BODY } from './_constants';

export default class Popup {

  constructor(config) {

    this.slider={
      name: config.onWrapper,
      currentItem: +config.onItem,
      items:[]      
    };
    this.popupWindow;
    this.popupContent;
    
  
  }

  init() {
    // console.log(sliderContent);
    this._generate();
  }

  _generate() {

    
    this._generatePopup();
    this._generateSlider();

    // setTimeout(() => {
    //   this.kill();
    // }, 1000);

  }

  _generatePopup() {

    let popup=document.createElement('div');
    popup.setAttribute('class', 'c-popup js-close-popup');

    let content = document.createElement('div');
    content.setAttribute('class', 'c-popup__content js-stop-propagation');

    popup.appendChild(content);
    BODY.appendChild(popup);

    setTimeout(() => {
      this.popupContent.classList.add('is-active');
    }, 100);
   
    

    this.popupWindow=popup;
    this.popupContent = content;

  }

  _generateSlider() {

    const content = this.slider.name;
    const self=this;
    const slideData = sliderContent.find(dataSet => {
    
      if (dataSet['name'] === content) {
        return dataSet;
      }

    });

    let slider = document.createElement('div');
    slider.setAttribute('class', 'popup-slider');
    slider.classList.add(`popup-slider_${slideData.name}`);
    slider.setAttribute('data-content', slideData.name);
    self.slider.base = slider;

    let sliderWrap = document.createElement('div');
    sliderWrap.classList.add('popup-slider__wrap');
    slider.appendChild(sliderWrap);
    self.slider.wrap = sliderWrap;

    let list = document.createElement('ul');
    list.classList.add('popup-slider__list');
    self.slider.list = list;


    slideData.slides.forEach((dataSet, dataIndex) => {

      let item = document.createElement('li');
      item.setAttribute('class', ' popup-slider__item ');
      item.setAttribute('data-slide-index', dataIndex);
      self.slider.items.push(item);
     
      // using mico-templating technic to generate slider item
      let itemTemplate = document.querySelector('#popupSliderTemplate').innerHTML;
      let thisItemData = dataSet;

      let itemInner = microTemplating(itemTemplate, thisItemData);
      item.innerHTML = itemInner; 
      list.appendChild(item);
     

    });


    self._showCurrentItem();
    sliderWrap.appendChild(list);
    self.popupContent.appendChild(slider);

    self._generateNav();
    self._generateClose();
    setTimeout(() => {
      self._generateCounter();
    }, 500);
    

  }


  _showCurrentItem() {

    const itemLength = this.slider.items.length;
    this.slider.items.forEach(item => {
      item.classList.remove('is-active');
    });

    if (this.slider.currentItem<0) {  
      
      this.slider.currentItem = itemLength - 1;
    } else if (this.slider.currentItem >= itemLength) { 
      this.slider.currentItem=0;    
    }
 
    this.slider.items[ this.slider.currentItem].classList.add('is-active');

  }

  
  _generateNav() {

    let self = this;

    let prevBtn = document.createElement('button');
    prevBtn.setAttribute('class', 'c-popup__controll c-popup__controll_prev js-stop-propagation js-prev-detailed-slide');
    self.popupWindow.appendChild(prevBtn);

    let nextBtn = document.createElement('button');
    nextBtn.setAttribute('class', 'c-popup__controll c-popup__controll_next js-stop-propagation js-next-detailed-slide');
    self.popupWindow.appendChild(nextBtn);

    this._clickToNextSlide(nextBtn);
    this._clickToPrevSlide(prevBtn);

  }

  _generateClose() {
    let self=this;
    let wrapper=self.popupContent;
    
    let closeBtn=document.createElement('div');
    closeBtn.setAttribute('class', 'popup-slider__close close-btn js-close-popup');
    closeBtn.innerHTML ='🎅';
    wrapper.appendChild(closeBtn);

    self.__stopPropagation();
    self.__bindCloseOnClick();
    

  }

  __bindCloseOnClick() {

    let self=this;
    let closeBtn =[].slice.call(document.querySelectorAll('.js-close-popup'));

    closeBtn.forEach(btn => {
      btn.addEventListener('click', function() {
        self.kill();
      });
    });

  }

  __stopPropagation() {

    let stop = [].slice.call(document.querySelectorAll('.js-stop-propagation'));
    stop.forEach(stop => {
      stop.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });

  }

  
  _generateCounter() {

    const counterWrapper = document.querySelectorAll('.js-slide-counter');
    let self=this;
    
    let total=this.slider.items.length;

    
    counterWrapper.forEach(counter => {
      let current = +counter.getAttribute('data-counter-id')+1;
      counter.innerHTML = `<span>${current}</span> / <span> ${total} </span>`;
    });

    
    

  }



  _clickToNextSlide(nextSlideTrigger) {
    let self = this;

    nextSlideTrigger.addEventListener('click', function(e) {
      
      // console.log(e.currentTarget);
      self.slider.currentItem += 1;
      self._showCurrentItem();

    });

  }

  _clickToPrevSlide(prevSlideTrigger) {
    let self = this;
    prevSlideTrigger.addEventListener('click', function(e) {
   
      // console.log(e.currentTarget);
      self.slider.currentItem -= 1;
      self._showCurrentItem();

    }); 
  }


  kill() {
    this.popupWindow.remove();
    console.log('K:They kill Kenny');
    console.log('M:You bastards!');
  }

}
