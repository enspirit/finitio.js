ArgumentError = require("../errors").TypeError;
DressHelper   = require("./dress_helper")

var $cs = {};

$cs.DateTime = {

  /**
   * Check if `d` is a valid date object.
   */
  isValidDate: function(d) {
    var toString = Object.prototype.toString;
    return (toString.call(d) === "[object Date]") && !isNaN(d.getTime());
  },

  /**
   * Information contract for Date/Time objects <-> ISO8601 String.
   *
   * See http://www.w3.org/TR/NOTE-datetime
   */
  iso8601: {

    /**
     * Dress a String `s` conforming to ISO8601 to a Date object. Raises
     * an ArgumentError if anything goes wrong.
     */
    dress: function(s) {
      var d = new Date(s);
      if ($cs.DateTime.isValidDate(d)) {
        return d;
      } else {
        throw new ArgumentError("Invalid Date string `" + s + "`");
      }
    },

    /**
     * Undress a Date object `d` to an IS08601 String. Raises an ArgumentError
     * unless `d` is a valid date.
     */
    undress: function(d) {
      if ($cs.DateTime.isValidDate(d)) {
        return d.toISOString();
      } else {
        throw new ArgumentError("Invalid Date `" + s + "`");
      }
    }

  }
}

module.exports = {Contracts: $cs}
