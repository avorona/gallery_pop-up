import Tabizator from './_tabizator';
import Slider from './_slider';
import Popup from './_popup';
import sliderContent from './knights.json';



class App {

  constructor(settings) {

    this.config = settings;
    // this.sliders=[];
    this.popup={
      trigger:[],
      object:[]
    };
  }

  run() {

    // ******************replace this with promises


    this._initSlider();
  
    this._initTabs();
  
    // this._initPopup();
    
    this._bindEvents();

  }


  _initSlider() {

    let self=this;

    sliderContent.forEach(data => {
      let slider = new Slider(this.config.slider, {
        dataItem: data,
        keyname: data['name']

      });
      slider.init();
    
    });

   

  }

  _initTabs() {

    let taba = new Tabizator(this.config.tabs, {

      tab: '.js-tab',
      content: '.js-content',
      animate: false

    });
    taba.init();
  }

  _bindEvents() {

    let self=this;
    let closeTrigger = document.querySelectorAll('.js-close-popup');
    self.popup.trigger = document.querySelectorAll('.js-open-popup');

    self.popup.trigger.forEach(btn => {

      

      // remove delegated event listener from onWrapper
      
      ['mousedown', 'touchstart', 'mouseup', 'touchend', 'mousemove', 'touchmove'].forEach(event => {
        btn.addEventListener(event, self._stopPropagation.bind(self));
      });

      btn.addEventListener('click', function(e) {
        let configId = e.currentTarget.getAttribute('data-popup-config');
        let configName = e.currentTarget.getAttribute('data-keyname');
        self._generatePopup(configId, configName);
      });



    });

    closeTrigger.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        self.popup.object.kill();
      });
    });

  
  }


  _stopPropagation(event) {
    event.stopPropagation();
  }

  _generatePopup(Id, name) {

    console.log(Id, name);
    let popup = new Popup( {
      onItem: Id,
      onWrapper: name
    });
    popup.init();
    this.popup.object = popup;
 
  }



}


let app = new App({

  slider: '.js-content-wrap',
  tabs: '.js-tabs',

});

app.run();
