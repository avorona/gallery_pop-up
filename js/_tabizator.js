
export default class Tabizator {

  constructor(target,settings) {

    this.config=settings;
    this.tabParent = target;
    this.tabs={
      all: [].slice.call(document.querySelectorAll(settings.tab)),
      current: [],
      data: []
    };
    this.content={
      all: [].slice.call(document.querySelectorAll(settings.content)),

    };
    // this.init();

  }

  init() {
    console.log('hey, i am tabs');
    this._bindEvents();
    this._onPageLoad();

  }

  _bindEvents() {

    this._tabClick();
    this._hashChanged();

  }

  _onPageLoad() {

    let self=this;

    self._toggleState();
    self._showContent();


  }
  
  /// EVENTS  START


  _tabClick() {

    let self=this;
    let tabs = self.tabs.all;

    tabs.forEach(el => {

      el.addEventListener('click', function(e) {

        let t = e.currentTarget;
        let data = t.getAttribute('data-href');

        self.tabs.current=t;
        self.tabs.data =data;

        
        self._changeHash();
        self._toggleState(); 

      });
    });

  }


  _hashChanged() {

    let self=this;

    window.addEventListener('hashchange', function(e) {

      self._showContent();
      self._toggleState();

    });

    
  }

  /// EVENTS END
  

  _toggleState() {

    let self=this;
    let hash = window.location.hash.replace('#', '');
    let all = self.tabs.all;

    let target = all.find(el => {
    
      if (el.getAttribute('data-href') === hash) return el;

    });
    
    if (target) {
      self.tabs.current = target;
      all.forEach(el => {
        el.classList.remove('is-active');
      });
      target.classList.add('is-active');

    } else {
     
      return false;
    }
   
  }


  _changeHash() {
    let self=this;
    let newHash = self.tabs.data;

   
    let location=window.location.href;


    let hash = window.location.hash;

    // console.log(hash);
    if (hash.length===0) {
 
      let newLoc = location + '#' + newHash;
      
      window.location.href = newLoc;

    } else {

      let hashIndex = location.indexOf('#', 0);
      let newLoc = location.slice(0, hashIndex)+'#' + newHash;
      // console.log(newLoc);
      window.location.href = newLoc;

    }

  }



  _showContent() {

    let self=this;
    let content=self.content.all;
    let hash =window.location.hash.replace('#','');
    

    content.forEach(e => {
      e.classList.remove('is-active');
    });

   

    if (hash) {

      let current = content.find(el => {
        // console.log(el);
        if (el.getAttribute('data-content') === hash) return el;
      });

      current.classList.add('is-active');

    } else {

      let ph = content.find(el => {
        // console.log(el);
        if (el.getAttribute('data-content') === 'ph') return el;
      });

      ph.classList.add('is-active');

    }
    
  }

}
