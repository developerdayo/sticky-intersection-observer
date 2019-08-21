const sectionObserver
class section {
    constructor($target, callback, settings) {
      this._$target = $target;
      this._callback = callback;
      this._settings = settings;
      if (arguments.length === 0) {
          console.log('Missing a parameter. Requires $target, callback, and settings');
          
          return;
      }
    }
    sectionObserver() {
        const observer = new IntersectionObserver(this._callback, this._settings);
    }
    init($target) {
        sectionObserver.observe($target);
    }
}