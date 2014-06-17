// Solder ======================================================================
function Solder () {
  if (!(this instanceof Solder)) { return new Solder(); }
  this._constructors = {};
}

Solder.prototype = {
  setMixin: function (name, constructor) { this._constructors[name] = constructor; },

  injectMixins: function (names, ctrl) {
    if (typeof names === 'string') { names = [names]; }
    for (var i = 0, len = names.length; i < len; i += 1) {
      var ctrlName = ctrl[names[i]] = new this._constructors[names[i]](ctrl);
      if (ctrlName._onInjection) ctrlName._onInjection();
    }
  }
};