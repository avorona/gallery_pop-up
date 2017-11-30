import Tabizator from './_tabizator';
import Slider from './_slider';
import Popup from './_popup';




class App {

  constructor(settings) {

    this.config = settings;

  }

  run() {

    // ******************replace this with promises


    this._initSlider();

    this._initTabs();

    this._initPopup();

  }


  _initSlider() {

    let slider = new Slider(this.config.slider, {


    });
    slider.init();
  }

  _initTabs() {

    let taba = new Tabizator(this.config.tabs, {

      tab: '.js-tab',
      content: '.js-content',
      animate: false

    });
    taba.init();
  }

  _initPopup() {

    let popup = new Popup();
    popup.init();

  }

  kill() {

  }

}


let app = new App({

  slider: '.js-content-wrap',
  tabs: '.js-tabs',

});

app.run();
