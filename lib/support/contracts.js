TypeError = require("../errors").TypeError;

var $cs = {};

$cs.Date = {
  iso8601: {
    dress: function(s) {
      var d = new Date(s);
      if ( Object.prototype.toString.call(d) === "[object Date]" ) {
        if ( isNaN( d.getTime() ) ) {
          throw new TypeError("Invalid value `" + s + "` for Date");
        }
        else {
          return d;
        }
      }
      else {
        throw new TypeError("Invalid value `" + s + "` for Date");
      }
    },
    undress: function(d) {
      return d.toISOString();
    }
  }
}

module.exports = {Contracts: $cs}