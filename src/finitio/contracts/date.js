module.exports = (function(){
  var isValidDate = function(d) {
    var toString = Object.prototype.toString;
    return (toString.call(d) === "[object Date]") && !isNaN(d.getTime());
  };
  return {

    /**
     * Information contract for Date objects <-> ISO8601 String.
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
        if (isValidDate(d)) {
          return d;
        } else {
          throw new Error("Invalid Date string `" + s + "`");
        }
      },

      /**
       * Undress a Date object `d` to an IS08601 String. Raises an ArgumentError
       * unless `d` is a valid date.
       */
      undress: function(d) {
        if (isValidDate(d)) {
          var yyyy = d.getFullYear().toString();
          var mm = (d.getMonth()+1).toString();
          var dd  = d.getDate().toString();
          return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]);
        } else {
          throw new Error("Invalid Date `" + d + "`");
        }
      }

    }

  };
})();

