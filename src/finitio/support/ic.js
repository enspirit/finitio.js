module.exports = (function(){
  var $u = require('./utils');
  var ic = {};

  function invokeConstructor(c, args){
    // create a fake constructor
    var T = function(){};
    T.prototype = c.prototype;

    // create an instance
    var inst = new T();

    // call the real constructor now
    var ret = c.apply(inst, args);

    // return the instance
    return Object(ret) === ret ? ret : inst;
  };

  ic.AbstractType = function(base, subs, properties, rawindex){

    base.info = function(from){
      var sub = $u.find(subs, function(s){ return !!from[s.prototype.kind]; });
      if (sub){
        var args = [], arg;
        for (var i=0; i<properties.length; i++){
          var propname = (i==rawindex ? sub.prototype.kind : properties[i]);
          var propval  = from[propname];
          if (propval){
            args[i] = propval;
          }
        }
        return invokeConstructor(sub, args);
      } else {
        dump = JSON.stringify(from)
        $u.argumentError("Unrecognized " + base.name + " info: ", dump);
      }
    };

    base.prototype.toInfo = function(){
      var to = {};
      for (var i=0; i<properties.length; i++){
        var name  = (i == rawindex ? this.kind : properties[i]);
        var value = this[properties[i]];
        if (value != undefined) { to[name] = value; }
      }
      return to;
    };

  };

  ic.ObjectType = function(base, properties){

    base.info = function(from){
      var args = [];
      for (var i=0; i<properties.length; i++){
        var propval = from[properties[i]];
        if (propval != undefined){
          args[i] = propval;
        }
      };
      return invokeConstructor(base, args);
    };

    base.prototype.toInfo = function(){
      var to = {};
      for (var i=0; i<properties.length; i++){
        var name  = properties[i];
        var value = this[name];
        if (value != undefined) {
          to[name] = value;
        }
      }
      return to;
    };

  };

  ic.TypeType = function(base, generator, properties){
    base.prototype.generator = generator;
    ic.ObjectType(base, properties);
  };

  return ic;
})();