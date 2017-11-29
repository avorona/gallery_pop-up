

export default class Slider {

  constructor(name, settings) {

    this.config=settings;
    this.wrap=name;

  }



  init() {
    console.log('hey');

    this._shpottle();
    // this._throttle();
    // this._fetchData();

  }

  _shpottle() {

    let content = document.createElement('div');
    content.classList.add('js-content');
    content.setAttribute('data-content', 'zatoichi');
    let wrap = document.querySelector('.js-content-wrap');

    wrap.appendChild(content);
    console.log(wrap);

    this._throttle();




  }




}
