(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Finitio = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = require('./lib/finitio').default;

},{"./lib/finitio":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AdType", {
  enumerable: true,
  get: function get() {
    return _ad_type["default"];
  }
});
Object.defineProperty(exports, "AnyType", {
  enumerable: true,
  get: function get() {
    return _any_type["default"];
  }
});
Object.defineProperty(exports, "Attribute", {
  enumerable: true,
  get: function get() {
    return _attribute["default"];
  }
});
Object.defineProperty(exports, "BuiltinType", {
  enumerable: true,
  get: function get() {
    return _builtin_type["default"];
  }
});
Object.defineProperty(exports, "Bundler", {
  enumerable: true,
  get: function get() {
    return _bundler["default"];
  }
});
Object.defineProperty(exports, "Constraint", {
  enumerable: true,
  get: function get() {
    return _constraint["default"];
  }
});
Object.defineProperty(exports, "Contract", {
  enumerable: true,
  get: function get() {
    return _contract["default"];
  }
});
Object.defineProperty(exports, "Contracts", {
  enumerable: true,
  get: function get() {
    return _contracts["default"];
  }
});
Object.defineProperty(exports, "Heading", {
  enumerable: true,
  get: function get() {
    return _heading["default"];
  }
});
Object.defineProperty(exports, "Meta", {
  enumerable: true,
  get: function get() {
    return _meta["default"];
  }
});
Object.defineProperty(exports, "Parser", {
  enumerable: true,
  get: function get() {
    return _parser["default"];
  }
});
Object.defineProperty(exports, "RelationType", {
  enumerable: true,
  get: function get() {
    return _relation_type["default"];
  }
});
Object.defineProperty(exports, "SeqType", {
  enumerable: true,
  get: function get() {
    return _seq_type["default"];
  }
});
Object.defineProperty(exports, "SetType", {
  enumerable: true,
  get: function get() {
    return _set_type["default"];
  }
});
Object.defineProperty(exports, "StructType", {
  enumerable: true,
  get: function get() {
    return _struct_type["default"];
  }
});
Object.defineProperty(exports, "SubType", {
  enumerable: true,
  get: function get() {
    return _sub_type["default"];
  }
});
Object.defineProperty(exports, "System", {
  enumerable: true,
  get: function get() {
    return _system["default"];
  }
});
Object.defineProperty(exports, "TupleType", {
  enumerable: true,
  get: function get() {
    return _tuple_type["default"];
  }
});
Object.defineProperty(exports, "Type", {
  enumerable: true,
  get: function get() {
    return _type["default"];
  }
});
Object.defineProperty(exports, "TypeDef", {
  enumerable: true,
  get: function get() {
    return _type_def["default"];
  }
});
Object.defineProperty(exports, "TypeError", {
  enumerable: true,
  get: function get() {
    return _errors["default"];
  }
});
Object.defineProperty(exports, "TypeRef", {
  enumerable: true,
  get: function get() {
    return _type_ref["default"];
  }
});
Object.defineProperty(exports, "UnionType", {
  enumerable: true,
  get: function get() {
    return _union_type["default"];
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _utils["default"];
  }
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./finitio/support/utils"));

var _package = require("../package.json");

var _resolver = _interopRequireDefault(require("./finitio/resolver"));

var _errors = _interopRequireDefault(require("./finitio/errors"));

var _parser = _interopRequireDefault(require("./finitio/parser"));

var _contracts = _interopRequireDefault(require("./finitio/contracts"));

var _attribute = _interopRequireDefault(require("./finitio/support/attribute"));

var _contract = _interopRequireDefault(require("./finitio/support/contract"));

var _heading = _interopRequireDefault(require("./finitio/support/heading"));

var _constraint = _interopRequireDefault(require("./finitio/support/constraint"));

var _system = _interopRequireDefault(require("./finitio/system"));

var _bundler = _interopRequireDefault(require("./finitio/bundler"));

var _type = _interopRequireDefault(require("./finitio/type"));

var _type_def = _interopRequireDefault(require("./finitio/type/type_def"));

var _type_ref = _interopRequireDefault(require("./finitio/type/type_ref"));

var _ad_type = _interopRequireDefault(require("./finitio/type/ad_type"));

var _any_type = _interopRequireDefault(require("./finitio/type/any_type"));

var _builtin_type = _interopRequireDefault(require("./finitio/type/builtin_type"));

var _relation_type = _interopRequireDefault(require("./finitio/type/relation_type"));

var _seq_type = _interopRequireDefault(require("./finitio/type/seq_type"));

var _set_type = _interopRequireDefault(require("./finitio/type/set_type"));

var _struct_type = _interopRequireDefault(require("./finitio/type/struct_type"));

var _sub_type = _interopRequireDefault(require("./finitio/type/sub_type"));

var _tuple_type = _interopRequireDefault(require("./finitio/type/tuple_type"));

var _union_type = _interopRequireDefault(require("./finitio/type/union_type"));

var _meta = _interopRequireDefault(require("./finitio/support/meta"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Finitio = /*#__PURE__*/function () {
  function Finitio() {
    _classCallCheck(this, Finitio);
  }

  _createClass(Finitio, null, [{
    key: "world",
    value: function world() {
      var world = _utils["default"].clone(Finitio.World);

      for (var _i = 0, _arr = Array.prototype.slice.call(arguments); _i < _arr.length; _i++) {
        var arg = _arr[_i];

        if (arg) {
          extendWorld(world, arg);
        }
      }

      return world;
    }
  }, {
    key: "parse",
    value: function parse(source, options) {
      return _parser["default"].parse(source, options || {});
    }
  }, {
    key: "system",
    value: function system(source, world) {
      if (typeof source === 'string') {
        source = this.parse(source);
      }

      return _meta["default"].System.dress(source, this.world(world));
    }
  }, {
    key: "bundleFile",
    value: function bundleFile(path, world) {
      return new this.Bundler(this.world(world)).addFile(path).flush();
    }
  }, {
    key: "bundleSource",
    value: function bundleSource(source, world) {
      return new this.Bundler(this.world(world)).addSource(source).flush();
    }
  }]);

  return Finitio;
}();

_defineProperty(Finitio, "VERSION", _package.version);

_defineProperty(Finitio, "CONFORMANCE", '0.4');

_defineProperty(Finitio, "World", {
  'Finitio': Finitio,
  'JsTypes': {
    'Finitio': Finitio,
    'Number': Number,
    'String': String,
    'Boolean': Boolean,
    'Date': Date,
    'Function': Function,
    'RegExp': RegExp
  },
  'importResolver': _resolver["default"]
});

var extendWorld = function extendWorld(world, ext) {
  var result = [];

  for (var k in ext) {
    var v = ext[k];

    if (k === 'JsTypes') {
      result.push(world[k] = _utils["default"].extend(world[k], v));
    } else {
      result.push(world[k] = v);
    }
  }

  return result;
};

Finitio.TypeError = _errors["default"];
Finitio.Utils = _utils["default"];
Finitio.Parser = _parser["default"];
Finitio.Contracts = _contracts["default"];
Finitio.Attribute = _attribute["default"];
Finitio.Contract = _contract["default"];
Finitio.Heading = _heading["default"];
Finitio.Constraint = _constraint["default"];
Finitio.System = _system["default"];
Finitio.Bundler = _bundler["default"];
Finitio.Type = _type["default"];
Finitio.TypeDef = _type_def["default"];
Finitio.TypeRef = _type_ref["default"];
Finitio.AdType = _ad_type["default"];
Finitio.AnyType = _any_type["default"];
Finitio.BuiltinType = _builtin_type["default"];
Finitio.RelationType = _relation_type["default"];
Finitio.SeqType = _seq_type["default"];
Finitio.SetType = _set_type["default"];
Finitio.StructType = _struct_type["default"];
Finitio.SubType = _sub_type["default"];
Finitio.TupleType = _tuple_type["default"];
Finitio.UnionType = _union_type["default"];
Finitio.Meta = _meta["default"]; //#

var _default = Finitio;
exports["default"] = _default;


},{"../package.json":40,"./finitio/bundler":3,"./finitio/contracts":4,"./finitio/errors":10,"./finitio/parser":11,"./finitio/resolver":12,"./finitio/support/attribute":14,"./finitio/support/constraint":16,"./finitio/support/contract":17,"./finitio/support/heading":20,"./finitio/support/meta":23,"./finitio/support/utils":24,"./finitio/system":25,"./finitio/type":26,"./finitio/type/ad_type":27,"./finitio/type/any_type":28,"./finitio/type/builtin_type":29,"./finitio/type/relation_type":30,"./finitio/type/seq_type":31,"./finitio/type/set_type":32,"./finitio/type/struct_type":33,"./finitio/type/sub_type":34,"./finitio/type/tuple_type":35,"./finitio/type/type_def":36,"./finitio/type/type_ref":37,"./finitio/type/union_type":38}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bundler = /*#__PURE__*/function () {
  function Bundler(world) {
    _classCallCheck(this, Bundler);

    this.world = world;
    this.systems = {};
  }

  _createClass(Bundler, [{
    key: "flush",
    value: function flush() {
      return Bundler.TEMPLATE.replace(/^[ ]{4}/, '').replace(/JSONDATA/, JSON.stringify(this.systems)).replace(/URL/, this.world.sourceUrl);
    }
  }, {
    key: "addDirectory",
    value: function addDirectory(path) {
      throw new Error('Bundling directories is not supported');
    }
  }, {
    key: "addFile",
    value: function addFile(path) {
      if (_fs["default"].lstatSync(path).isDirectory()) {
        this.addDirectory(path);
      } else {
        var src = _fs["default"].readFileSync(path).toString();

        this.addSource(src);
      }

      return this;
    }
  }, {
    key: "addSource",
    value: function addSource(source) {
      // recursively resolve every import
      this._bundle(this.world.Finitio.parse(source), this.world);

      return this;
    }
  }, {
    key: "_bundle",
    value: function _bundle(system, world) {
      var _this = this;

      // dress the system to catch any error immediately
      if (world.check) {
        world.Finitio.system(system, world);
      } // save it under url in systems


      this.systems[world.sourceUrl] = system;

      if (!system.imports) {
        return;
      } // recursively resolve imports


      return function () {
        var result = [];

        for (var _i = 0, _arr = _toConsumableArray(system.imports); _i < _arr.length; _i++) {
          var imp = _arr[_i];
          // resolve in raw mode
          var pair = world.importResolver(imp.from, world, {
            raw: true
          }); // set the resolved URL, dress the system for catching errors

          imp.from = pair[0]; // recurse on sub-imports

          var newWorld = world.Finitio.world(world, {
            sourceUrl: pair[0]
          });
          result.push(_this._bundle(pair[1], newWorld));
        }

        return result;
      }();
    }
  }]);

  return Bundler;
}();

_defineProperty(Bundler, "TEMPLATE", "\n  /* eslint-disable */\n  module.exports = (() => {\n    const ss = JSONDATA;\n    const r = (fallback) => {\n      return function(path, w, options){\n        const s = ss[path];\n        if (s) {\n          if (options && options.raw){\n            return [ path, s ];\n          } else {\n            return w.Finitio.system(s, w);\n          }\n        } else if (fallback) {\n          return fallback(path, w, options);\n        } else {\n          throw new Error('Unable to resolve: `' + path + '`');\n        }\n      };\n    };\n    return function(w, options){\n      if (!w) { w = require('finit' + 'io').World; }\n      w = w.Finitio.world(w, {\n        importResolver: r(w.importResolver)\n      });\n      return w.importResolver('URL', w, options);\n    };\n  })();\n  ");

var _default = Bundler;
exports["default"] = _default;


},{"fs":39}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _date = _interopRequireDefault(require("./contracts/date"));

var _time = _interopRequireDefault(require("./contracts/time"));

var _expression = _interopRequireDefault(require("./contracts/expression"));

var _function = _interopRequireDefault(require("./contracts/function"));

var _js_type = _interopRequireDefault(require("./contracts/js_type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Date: _date["default"],
  Time: _time["default"],
  Expression: _expression["default"],
  Function: _function["default"],
  JsType: _js_type["default"]
};
exports["default"] = _default;


},{"./contracts/date":5,"./contracts/expression":6,"./contracts/function":7,"./contracts/js_type":8,"./contracts/time":9}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var isValidDate = function isValidDate(d) {
  var toString = Object.prototype.toString;
  return toString.call(d) === '[object Date]' && !isNaN(d.getTime());
};

var _default = {
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
    dress: function dress(s) {
      var d = new Date(s);

      if (isValidDate(d)) {
        return d;
      } else {
        throw new Error("Invalid Date string `".concat(s, "`"));
      }
    },

    /**
     * Undress a Date object `d` to an IS08601 String. Raises an ArgumentError
     * unless `d` is a valid date.
     */
    undress: function undress(d) {
      if (isValidDate(d)) {
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString();
        var dd = d.getDate().toString();
        return "".concat(yyyy, "-").concat(mm[1] ? mm : "0".concat(mm[0]), "-").concat(dd[1] ? dd : "0".concat(dd[0]));
      } else {
        throw new Error("Invalid Date `".concat(d, "`"));
      }
    }
  },
  milliseconds: {
    dress: function dress(ms) {
      var d = new Date(ms);

      if (isValidDate(d)) {
        return d;
      } else {
        throw new Error("Invalid Date milliseconds `".concat(ms, "`"));
      }
    },
    undress: function undress(d) {
      if (isValidDate(d)) {
        return d.getTime();
      } else {
        throw new Error("Invalid Date `".concat(d, "`"));
      }
    }
  }
};
exports["default"] = _default;


},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  defn: {
    dress: function dress(args) {
      if (!/^return/.test(args[args.length - 1])) {
        args[args.length - 1] = "return ".concat(args[args.length - 1]);
      }

      var fn = Function.apply(Function, args);
      fn.defn = args;
      return fn;
    },
    undress: function undress(fn) {
      if (!fn.defn) {
        throw new Error("No defn found: ".concat(fn.toString()));
      }

      return fn.defn;
    }
  }
};
exports["default"] = _default;


},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("../support/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  /**
   * Information contract for javascript function references.
   *
   * Those references are qualified names that will be resolved
   * on the world at dressing time. E.g.,
   *
   * ```
   *   var world = { _: { isEven: function(i){...} } };
   *   var func = Function.reference("_.isEven")
   * ```
   *
   * There is not guarantee that the returned function is exactly
   * the one the world. In practice, it is wrapped in a decorator
   * to keep track of how the function was obtained; this is done
   * for undressing purposes.
   */
  reference: {
    /*
      * Resolves `source` using the `world` to initiate the
      * qualified name resolution.
      *
      * Return (a wrapper over) the function found. Raises an error
      * if the function cannot be found or is not a function.
      */
    dress: function dress(source, world) {
      // resolve the function
      var identifiers = source.split('.');

      var original = _utils["default"].reduce(identifiers, world, function (acc, id, idx) {
        if (acc[id] === undefined || acc[id] === null) {
          throw new Error("".concat(source, " is undefined"));
        }

        return acc[id];
      });

      if (typeof original !== 'function') {
        throw new Error("".concat(source, " must resolve to a Function"));
      } // Decorate, keep track of reference and return it


      var func = function func() {
        return original.apply(this, arguments);
      };

      func.nativeToString = function () {
        return source;
      };

      return func;
    },

    /**
     * Undresses function `fn` to a function reference.
     *
     * This method only works if `fn` has been previously obtained
     * through `dress`. It raises an error otherwise.
     */
    undress: function undress(fn) {
      if (fn.nativeToString) {
        return fn.nativeToString();
      }

      throw new Error('Unimplemented');
    }
  }
};
exports["default"] = _default;


},{"../support/utils":24}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: {
    dress: function dress(name, world) {
      var resolved = null;

      if (world) {
        resolved = new Function('world', "return world.".concat(name, ";"))(world);
      } else {
        resolved = new Function("return ".concat(name, ";"))();
      }

      if (resolved) {
        return resolved;
      } else {
        var msg = "Unknown javascript type: `".concat(name, "` (");
        msg += Object.keys(world).toString();
        msg += ')';
        throw new Error(msg);
      }
    },
    undress: function undress(fn) {
      throw new Error('Unimplemented');
    }
  }
};
exports["default"] = _default;


},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var isValidDate = function isValidDate(d) {
  var toString = Object.prototype.toString;
  return toString.call(d) === '[object Date]' && !isNaN(d.getTime());
};

var _default = {
  /**
     * Information contract for Time objects <-> ISO8601 String.
     *
     * See http://www.w3.org/TR/NOTE-datetime
     */
  iso8601: {
    /**
       * Dress a String `s` conforming to ISO8601 to a Date object. Raises
       * an ArgumentError if anything goes wrong.
       */
    dress: function dress(s) {
      var d = new Date(s);

      if (isValidDate(d)) {
        return d;
      } else {
        throw new Error("Invalid Date string `".concat(s, "`"));
      }
    },

    /**
       * Undress a Date object `d` to an IS08601 String. Raises an ArgumentError
       * unless `d` is a valid date.
       */
    undress: function undress(d) {
      if (isValidDate(d)) {
        return d.toISOString();
      } else {
        throw new Error("Invalid Date '".concat(d, "'"));
      }
    }
  },
  milliseconds: {
    dress: function dress(ms) {
      var d = new Date(ms);

      if (isValidDate(d)) {
        return d;
      } else {
        throw new Error("Invalid Date milliseconds `".concat(ms, "`"));
      }
    },
    undress: function undress(d) {
      if (isValidDate(d)) {
        return d.getTime();
      } else {
        throw new Error("Invalid Date `".concat(d, "`"));
      }
    }
  }
};
exports["default"] = _default;


},{}],10:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./support/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _TypeError = /*#__PURE__*/function (_Error) {
  _inherits(TypeError, _Error);

  var _super = _createSuper(TypeError);

  function TypeError(info) {
    var _this;

    _classCallCheck(this, TypeError);

    _this = _super.call(this);

    _utils["default"].extend(_assertThisInitialized(_this), info);

    _this.message = computeMessage(info);
    return _this;
  }

  _createClass(TypeError, [{
    key: "locatedMessage",
    get: function get() {
      if (this.location != null) {
        return "[".concat(this.location, "] ").concat(this.message);
      } else {
        return this.message;
      }
    }
  }, {
    key: "causes",
    get: function get() {
      return this.causesCache != null ? this.causesCache : this.causesCache = this.children && computeCauses(this);
    }
  }, {
    key: "cause",
    get: function get() {
      return this.causes && this.causes[0];
    }
  }, {
    key: "rootCauses",
    get: function get() {
      return this.rootCausesCache != null ? this.rootCausesCache : this.rootCausesCache = computeRootCauses(this, []);
    }
  }, {
    key: "rootCause",
    get: function get() {
      return this.rootCauses[this.rootCauses.length - 1];
    }
  }, {
    key: "explain",
    value: function explain() {
      var str = "".concat(this.locatedMessage, "\n");

      if (this.rootCauses) {
        var _iterator = _createForOfIteratorHelper(this.rootCauses),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var c = _step.value;
            str += "  ".concat(c.locatedMessage, "\n");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return str;
    }
  }, {
    key: "explainTree",
    value: function explainTree(depth) {
      var str = '';

      if (depth == null) {
        depth = 0;
      }

      for (var i = 0, end = depth, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        str += '  ';
      }

      str += "".concat(this.locatedMessage, "\n");

      if (this.causes != null) {
        var _iterator2 = _createForOfIteratorHelper(this.causes),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var c = _step2.value;
            str += c.explainTree(depth + 1);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return str;
    }
  }]);

  return TypeError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var computeMessage = function computeMessage(info) {
  var msg = info.error;

  if (msg instanceof Array) {
    var data;
    var _msg = msg;

    var _msg2 = _slicedToArray(_msg, 2);

    msg = _msg2[0];
    data = _msg2[1];
    var i = -1;
    return msg.replace(/\$\{([a-zA-Z]+)\}/g, function (match) {
      i += 1;
      var param = match.slice(2, match.length - 1);
      return _utils["default"].toString(info[param] || data[i]);
    });
  } else if (typeof msg === 'string') {
    return msg;
  } else {
    return info.toString();
  }
};

var computeCauses = function computeCauses(error) {
  return _utils["default"].map(error.children, function (c) {
    c.location = appendPath(error.location, c.location);

    if (c instanceof _TypeError) {
      return c;
    } else if (c instanceof Error) {
      return new _TypeError({
        error: c.message,
        location: c.location
      });
    } else {
      return new _TypeError(c);
    }
  });
};

var computeRootCauses = function computeRootCauses(error, cache) {
  if (error.causes) {
    _utils["default"].each(error.causes, function (cause) {
      return computeRootCauses(cause, cache);
    });
  } else {
    cache.push(error);
  }

  return cache;
};

var appendPath = function appendPath(parent, child) {
  if (child == null) {
    return parent;
  }

  if (parent == null) {
    return child;
  }

  return "".concat(parent, "/").concat(child);
};

var _default = _TypeError;
exports["default"] = _default;


},{"./support/utils":24}],11:[function(require,module,exports){
"use strict";

module.exports = function () {
  "use strict";
  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser = this,
        peg$FAILED = {},
        peg$startRuleFunctions = {
      system: peg$parsesystem,
      type: peg$parsetype,
      heading: peg$parseheading,
      attribute: peg$parseattribute,
      contract: peg$parsecontract,
      constraint: peg$parseconstraint,
      literal: peg$parseliteral,
      metadata: peg$parsemetadata,
      lambda_expr: peg$parselambda_expr,
      type_def: peg$parsetype_def,
      import_def: peg$parseimport_def
    },
        peg$startRuleFunction = peg$parsesystem,
        peg$c0 = function peg$c0(is, ds, meta, main) {
      var system = {
        types: ds
      };

      if (is && is.length > 0) {
        system.imports = is;
      }

      if (main) {
        main = {
          name: 'Main',
          type: main
        };

        if (meta) {
          main.metadata = meta;
        }

        system.types.push(main);
      }

      return system;
    },
        peg$c1 = function peg$c1(head, tail) {
      return headTailToArray(head, tail);
    },
        peg$c2 = "@import",
        peg$c3 = {
      type: "literal",
      value: "@import",
      description: "\"@import\""
    },
        peg$c4 = "as",
        peg$c5 = {
      type: "literal",
      value: "as",
      description: "\"as\""
    },
        peg$c6 = function peg$c6(s, q) {
      return {
        qualifier: q,
        from: s
      };
    },
        peg$c7 = function peg$c7(s) {
      return {
        from: s
      };
    },
        peg$c8 = "=",
        peg$c9 = {
      type: "literal",
      value: "=",
      description: "\"=\""
    },
        peg$c10 = function peg$c10(m, n, t) {
      return metadatize({
        name: n,
        type: t
      }, m);
    },
        peg$c11 = function peg$c11(m, head, tail) {
      var cs = headTailToArray(head, tail);
      return {
        union: metadatize({
          candidates: cs
        })
      };
    },
        peg$c12 = function peg$c12(m, t, cs) {
      return {
        sub: metadatize({
          superType: t,
          constraints: cs
        }, m)
      };
    },
        peg$c13 = "(",
        peg$c14 = {
      type: "literal",
      value: "(",
      description: "\"(\""
    },
        peg$c15 = ")",
        peg$c16 = {
      type: "literal",
      value: ")",
      description: "\")\""
    },
        peg$c17 = function peg$c17(n, cs) {
      for (var i = 0; i < cs.length; i++) {
        cs[i]["native"] = [n, cs[i]["native"]];
      }

      return cs;
    },
        peg$c18 = "::",
        peg$c19 = {
      type: "literal",
      value: "::",
      description: "\"::\""
    },
        peg$c20 = function peg$c20(fn) {
      return [{
        "native": fn
      }];
    },
        peg$c21 = function peg$c21(rx) {
      return [{
        regexp: rx
      }];
    },
        peg$c22 = function peg$c22(rx) {
      return [{
        range: rx
      }];
    },
        peg$c23 = function peg$c23(set) {
      return [{
        set: set
      }];
    },
        peg$c24 = function peg$c24(c) {
      return [c];
    },
        peg$c25 = ":",
        peg$c26 = {
      type: "literal",
      value: ":",
      description: "\":\""
    },
        peg$c27 = function peg$c27(m, n, e) {
      return metadatize({
        name: n,
        "native": e.trim()
      }, m);
    },
        peg$c28 = function peg$c28(e) {
      return {
        "native": e.trim()
      };
    },
        peg$c29 = "{",
        peg$c30 = {
      type: "literal",
      value: "{",
      description: "\"{\""
    },
        peg$c31 = "}",
        peg$c32 = {
      type: "literal",
      value: "}",
      description: "\"}\""
    },
        peg$c33 = function peg$c33(m, h) {
      return {
        tuple: metadatize({
          heading: h
        }, m)
      };
    },
        peg$c34 = "{{",
        peg$c35 = {
      type: "literal",
      value: "{{",
      description: "\"{{\""
    },
        peg$c36 = "}}",
        peg$c37 = {
      type: "literal",
      value: "}}",
      description: "\"}}\""
    },
        peg$c38 = function peg$c38(m, h) {
      return {
        relation: metadatize({
          heading: h
        }, m)
      };
    },
        peg$c39 = function peg$c39(head, tail, d, t) {
      var attributes = headTailToArray(head, tail);
      var info = {
        attributes: attributes
      };
      info.options = {
        allowExtra: t
      };
      return info;
    },
        peg$c40 = function peg$c40(head, tail, d) {
      var attributes = headTailToArray(head, tail);
      var info = {
        attributes: attributes
      };

      if (d) {
        info.options = {
          allowExtra: {
            any: {}
          }
        };
      }

      return info;
    },
        peg$c41 = "?",
        peg$c42 = {
      type: "literal",
      value: "?",
      description: "\"?\""
    },
        peg$c43 = function peg$c43(m, n, optional, t) {
      var info = {
        name: n,
        type: t
      };

      if (optional) {
        info.required = false;
      }

      return metadatize(info, m);
    },
        peg$c44 = function peg$c44(m, t) {
      return {
        set: metadatize({
          elmType: t
        }, m)
      };
    },
        peg$c45 = "[",
        peg$c46 = {
      type: "literal",
      value: "[",
      description: "\"[\""
    },
        peg$c47 = "]",
        peg$c48 = {
      type: "literal",
      value: "]",
      description: "\"]\""
    },
        peg$c49 = function peg$c49(m, t) {
      return {
        seq: metadatize({
          elmType: t
        }, m)
      };
    },
        peg$c50 = "<",
        peg$c51 = {
      type: "literal",
      value: "<",
      description: "\"<\""
    },
        peg$c52 = ">",
        peg$c53 = {
      type: "literal",
      value: ">",
      description: "\">\""
    },
        peg$c54 = function peg$c54(m, head, tail) {
      var ts = headTailToArray(head, tail);
      return {
        struct: metadatize({
          componentTypes: ts
        }, m)
      };
    },
        peg$c55 = function peg$c55(p, cs) {
      if (!p) {
        p = {};
      }

      var contracts = [],
          contract;

      for (var i = 0; i < cs.length; i++) {
        contract = cs[i];

        if (!contract.external && !contract.explicit) {
          if (p.jsType) {
            contract.internal = p.jsType;
          } else {
            contract.identity = {};
          }
        }

        contracts[i] = contract;
      }

      p.contracts = contracts;
      return {
        adt: p
      };
    },
        peg$c56 = ".",
        peg$c57 = {
      type: "literal",
      value: ".",
      description: "\".\""
    },
        peg$c58 = function peg$c58(m, t) {
      var r = {};

      if (t) {
        r.jsType = t[1];
      }

      return metadatize(r, m);
    },
        peg$c59 = "\\",
        peg$c60 = {
      type: "literal",
      value: "\\",
      description: "\"\\\\\""
    },
        peg$c61 = function peg$c61(b, up, down) {
      b.explicit = {
        dress: up,
        undress: down
      };
      return b;
    },
        peg$c62 = function peg$c62(b, t) {
      b.external = t;
      return b;
    },
        peg$c63 = function peg$c63(m, n, t) {
      return metadatize({
        name: n,
        infoType: t
      }, m);
    },
        peg$c64 = function peg$c64(m) {
      return {
        any: metadatize({}, m)
      };
    },
        peg$c65 = function peg$c65(m, name) {
      return {
        builtin: metadatize({
          jsType: name
        }, m)
      };
    },
        peg$c66 = function peg$c66(p) {
      return {
        ref: {
          typeName: p
        }
      };
    },
        peg$c67 = "|",
        peg$c68 = {
      type: "literal",
      value: "|",
      description: "\"|\""
    },
        peg$c69 = function peg$c69(n, e) {
      return [n.trim(), e.trim()];
    },
        peg$c70 = "()",
        peg$c71 = {
      type: "literal",
      value: "()",
      description: "\"()\""
    },
        peg$c72 = /^[(,)]/,
        peg$c73 = {
      type: "class",
      value: "[(,)]",
      description: "[(,)]"
    },
        peg$c74 = {
      type: "any",
      description: "any character"
    },
        peg$c75 = "/-",
        peg$c76 = {
      type: "literal",
      value: "/-",
      description: "\"/-\""
    },
        peg$c77 = "-/",
        peg$c78 = {
      type: "literal",
      value: "-/",
      description: "\"-/\""
    },
        peg$c79 = function peg$c79(head, tail) {
      var attrs = headTailToArray(head, tail);
      var metadata = {};

      for (var i = 0; i < attrs.length; i++) {
        metadata[attrs[i][0]] = attrs[i][1];
      }

      return metadata;
    },
        peg$c80 = function peg$c80(t) {
      return {
        description: t.toString().trim()
      };
    },
        peg$c81 = function peg$c81(n, v) {
      return [n, v];
    },
        peg$c82 = /^["]/,
        peg$c83 = {
      type: "class",
      value: "[\"]",
      description: "[\"]"
    },
        peg$c84 = /^[\\]/,
        peg$c85 = {
      type: "class",
      value: "[\\\\]",
      description: "[\\\\]"
    },
        peg$c86 = function peg$c86(s) {
      return s.substring(1, s.length - 1).replace(/\\"/, '"');
    },
        peg$c87 = "..",
        peg$c88 = {
      type: "literal",
      value: "..",
      description: "\"..\""
    },
        peg$c89 = function peg$c89(min, max) {
      return {
        min: min,
        min_inclusive: true,
        max: max,
        max_inclusive: true
      };
    },
        peg$c90 = "...",
        peg$c91 = {
      type: "literal",
      value: "...",
      description: "\"...\""
    },
        peg$c92 = function peg$c92(min, max) {
      return {
        min: min,
        min_inclusive: true,
        max: max,
        max_inclusive: false
      };
    },
        peg$c93 = function peg$c93(min) {
      return {
        min: min,
        min_inclusive: true
      };
    },
        peg$c94 = "&",
        peg$c95 = {
      type: "literal",
      value: "&",
      description: "\"&\""
    },
        peg$c96 = function peg$c96(fct) {
      return fct;
    },
        peg$c97 = /^[a-zA-Z_$]/,
        peg$c98 = {
      type: "class",
      value: "[a-zA-Z_$]",
      description: "[a-zA-Z_$]"
    },
        peg$c99 = /^[a-zA-Z0-9_$]/,
        peg$c100 = {
      type: "class",
      value: "[a-zA-Z0-9_$]",
      description: "[a-zA-Z0-9_$]"
    },
        peg$c101 = function peg$c101(id) {
      return id;
    },
        peg$c102 = /^[1-9]/,
        peg$c103 = {
      type: "class",
      value: "[1-9]",
      description: "[1-9]"
    },
        peg$c104 = /^[0-9]/,
        peg$c105 = {
      type: "class",
      value: "[0-9]",
      description: "[0-9]"
    },
        peg$c106 = /^[0]/,
        peg$c107 = {
      type: "class",
      value: "[0]",
      description: "[0]"
    },
        peg$c108 = /^[\-]/,
        peg$c109 = {
      type: "class",
      value: "[-]",
      description: "[-]"
    },
        peg$c110 = function peg$c110(s) {
      return parseInt(s);
    },
        peg$c111 = function peg$c111(s) {
      return parseFloat(s);
    },
        peg$c112 = "true",
        peg$c113 = {
      type: "literal",
      value: "true",
      description: "\"true\""
    },
        peg$c114 = function peg$c114() {
      return true;
    },
        peg$c115 = "false",
        peg$c116 = {
      type: "literal",
      value: "false",
      description: "\"false\""
    },
        peg$c117 = function peg$c117() {
      return false;
    },
        peg$c118 = function peg$c118() {
      return [];
    },
        peg$c119 = "/",
        peg$c120 = {
      type: "literal",
      value: "/",
      description: "\"/\""
    },
        peg$c121 = /^[^\/]/,
        peg$c122 = {
      type: "class",
      value: "[^/]",
      description: "[^/]"
    },
        peg$c123 = function peg$c123(s) {
      return s;
    },
        peg$c124 = /^[a-z]/,
        peg$c125 = {
      type: "class",
      value: "[a-z]",
      description: "[a-z]"
    },
        peg$c126 = /^[a-z0-9]/,
        peg$c127 = {
      type: "class",
      value: "[a-z0-9]",
      description: "[a-z0-9]"
    },
        peg$c128 = /^[a-zA-Z_]/,
        peg$c129 = {
      type: "class",
      value: "[a-zA-Z_]",
      description: "[a-zA-Z_]"
    },
        peg$c130 = /^[a-z$_]/,
        peg$c131 = {
      type: "class",
      value: "[a-z$_]",
      description: "[a-z$_]"
    },
        peg$c132 = /^[a-zA-Z0-9_]/,
        peg$c133 = {
      type: "class",
      value: "[a-zA-Z0-9_]",
      description: "[a-zA-Z0-9_]"
    },
        peg$c134 = /^[A-Z]/,
        peg$c135 = {
      type: "class",
      value: "[A-Z]",
      description: "[A-Z]"
    },
        peg$c136 = /^[a-zA-Z]/,
        peg$c137 = {
      type: "class",
      value: "[a-zA-Z]",
      description: "[a-zA-Z]"
    },
        peg$c138 = /^[a-zA-Z0-9:.]/,
        peg$c139 = {
      type: "class",
      value: "[a-zA-Z0-9:.]",
      description: "[a-zA-Z0-9:.]"
    },
        peg$c140 = /^[ \n\t]/,
        peg$c141 = {
      type: "class",
      value: "[ \\n\\t]",
      description: "[ \\n\\t]"
    },
        peg$c142 = ",",
        peg$c143 = {
      type: "literal",
      value: ",",
      description: "\",\""
    },
        peg$c144 = "#",
        peg$c145 = {
      type: "literal",
      value: "#",
      description: "\"#\""
    },
        peg$c146 = /^[\n]/,
        peg$c147 = {
      type: "class",
      value: "[\\n]",
      description: "[\\n]"
    },
        peg$c148 = /^[ \t\n]/,
        peg$c149 = {
      type: "class",
      value: "[ \\t\\n]",
      description: "[ \\t\\n]"
    },
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$posDetailsCache = [{
      line: 1,
      column: 1,
      seenCR: false
    }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$resultsCache = {},
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(null, [{
        type: "other",
        description: description
      }], input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
    }

    function error(message) {
      throw peg$buildException(message, null, input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p,
          ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;

        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);

          if (ch === "\n") {
            if (!details.seenCR) {
              details.line++;
            }

            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails = peg$computePosDetails(endPos);
      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;
        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return '\\x' + hex(ch);
          }).replace(/[\u0100-\u0FFF]/g, function (ch) {
            return "\\u0" + hex(ch);
          }).replace(/[\u1000-\uFFFF]/g, function (ch) {
            return "\\u" + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
    }

    function peg$parsesystem() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
      var key = peg$currPos * 65 + 0,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsespacing();

      if (s1 !== peg$FAILED) {
        s2 = peg$parseimports();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();

          if (s3 !== peg$FAILED) {
            s4 = peg$parsedefinitions();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsemetadata();

                if (s6 === peg$FAILED) {
                  s6 = null;
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parsespacing();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseunion_type();

                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }

                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsespacing();

                      if (s9 !== peg$FAILED) {
                        s10 = peg$parseeof();

                        if (s10 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c0(s2, s4, s6, s8);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseimports() {
      var s0, s1, s2, s3, s4, s5;
      var key = peg$currPos * 65 + 1,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseimport_def();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();

        if (s4 !== peg$FAILED) {
          s5 = peg$parseimport_def();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();

          if (s4 !== peg$FAILED) {
            s5 = peg$parseimport_def();

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseimport_def() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 2,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.substr(peg$currPos, 7) === peg$c2) {
        s1 = peg$c2;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c3);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespaces();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsesystem_from();

          if (s3 !== peg$FAILED) {
            s4 = peg$parsespaces();

            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c4) {
                s5 = peg$c4;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c5);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parsespaces();

                if (s6 !== peg$FAILED) {
                  s7 = peg$parsetype_qualifier();

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c6(s3, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 7) === peg$c2) {
          s1 = peg$c2;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parsespaces();

          if (s2 !== peg$FAILED) {
            s3 = peg$parsesystem_from();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c7(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsedefinitions() {
      var s0, s1, s2, s3, s4, s5;
      var key = peg$currPos * 65 + 3,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsetype_def();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();

        if (s4 !== peg$FAILED) {
          s5 = peg$parsetype_def();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();

          if (s4 !== peg$FAILED) {
            s5 = peg$parsetype_def();

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetype_def() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 4,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsetype_name();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c8;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c9);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                s6 = peg$parseunion_type();

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c10(s1, s2, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetype() {
      var s0;
      var key = peg$currPos * 65 + 5,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseunion_type();
      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseunion_type() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 6,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsesub_type();

        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parsepipe();

          if (s5 !== peg$FAILED) {
            s6 = peg$parsesub_type();

            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }

          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$parsepipe();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsesub_type();

                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            }
          } else {
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c11(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parsesub_type();
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsesub_type() {
      var s0, s1, s2, s3;
      var key = peg$currPos * 65 + 7,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parserel_type();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseconstraint();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c12(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parserel_type();
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseconstraint() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 8,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c13;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c14);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsevar_name();

          if (s3 !== peg$FAILED) {
            s4 = peg$parsepipe();

            if (s4 !== peg$FAILED) {
              s5 = peg$parseconstraints();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();

                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c15;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c16);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c17(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsespacing();

        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c18) {
            s2 = peg$c18;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c19);
            }
          }

          if (s2 !== peg$FAILED) {
            s3 = peg$parsespacing();

            if (s3 !== peg$FAILED) {
              s4 = peg$parsefuncref_literal();

              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c20(s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsespacing();

          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c18) {
              s2 = peg$c18;
              peg$currPos += 2;
            } else {
              s2 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c19);
              }
            }

            if (s2 !== peg$FAILED) {
              s3 = peg$parsespacing();

              if (s3 !== peg$FAILED) {
                s4 = peg$parseregexp_literal();

                if (s4 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsespacing();

            if (s1 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c18) {
                s2 = peg$c18;
                peg$currPos += 2;
              } else {
                s2 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c19);
                }
              }

              if (s2 !== peg$FAILED) {
                s3 = peg$parsespacing();

                if (s3 !== peg$FAILED) {
                  s4 = peg$parserange_literal();

                  if (s4 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c22(s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parsespacing();

              if (s1 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c18) {
                  s2 = peg$c18;
                  peg$currPos += 2;
                } else {
                  s2 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c19);
                  }
                }

                if (s2 !== peg$FAILED) {
                  s3 = peg$parsespacing();

                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseset_literal();

                    if (s4 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c23(s4);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            }
          }
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseconstraints() {
      var s0, s1, s2, s3, s4, s5;
      var key = peg$currPos * 65 + 9,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsenamed_constraint();

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseopt_comma();

        if (s4 !== peg$FAILED) {
          s5 = peg$parsenamed_constraint();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseopt_comma();

          if (s4 !== peg$FAILED) {
            s5 = peg$parsenamed_constraint();

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseopt_comma();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseunnamed_constraint();

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c24(s1);
        }

        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsenamed_constraint() {
      var s0, s1, s2, s3, s4, s5;
      var key = peg$currPos * 65 + 10,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseconstraint_name();

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c25;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c26);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();

            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpression();

              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c27(s1, s2, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseunnamed_constraint() {
      var s0, s1;
      var key = peg$currPos * 65 + 11,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseexpression();

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c28(s1);
      }

      s0 = s1;
      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parserel_type() {
      var s0;
      var key = peg$currPos * 65 + 12,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parserelation_type();

      if (s0 === peg$FAILED) {
        s0 = peg$parsetuple_type();

        if (s0 === peg$FAILED) {
          s0 = peg$parsecollection_type();
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetuple_type() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 13,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c29;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c30);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();

          if (s3 !== peg$FAILED) {
            s4 = peg$parseheading();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s6 = peg$c31;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c32);
                  }
                }

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c33(s1, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parserelation_type() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 14,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c34) {
          s2 = peg$c34;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();

          if (s3 !== peg$FAILED) {
            s4 = peg$parseheading();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c36) {
                  s6 = peg$c36;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c37);
                  }
                }

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c38(s1, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseheading() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 15,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseattribute();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseopt_comma();

        if (s4 !== peg$FAILED) {
          s5 = peg$parseattribute();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseopt_comma();

          if (s4 !== peg$FAILED) {
            s5 = peg$parseattribute();

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseopt_comma();

          if (s3 !== peg$FAILED) {
            s4 = peg$parsedots();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s5 = peg$c25;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c26);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();

                if (s6 !== peg$FAILED) {
                  s7 = peg$parseunion_type();

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c39(s1, s2, s4, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseattribute();

        if (s1 === peg$FAILED) {
          s1 = null;
        }

        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parseopt_comma();

          if (s4 !== peg$FAILED) {
            s5 = peg$parseattribute();

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parseopt_comma();

            if (s4 !== peg$FAILED) {
              s5 = peg$parseattribute();

              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }

          if (s2 !== peg$FAILED) {
            s3 = peg$parseopt_comma();

            if (s3 !== peg$FAILED) {
              s4 = peg$parsedots();

              if (s4 === peg$FAILED) {
                s4 = null;
              }

              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c40(s1, s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseattribute() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 16,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseattribute_name();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c25;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c26);
              }
            }

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 63) {
                s5 = peg$c41;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c42);
                }
              }

              if (s5 === peg$FAILED) {
                s5 = null;
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();

                if (s6 !== peg$FAILED) {
                  s7 = peg$parseunion_type();

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c43(s1, s2, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsecollection_type() {
      var s0;
      var key = peg$currPos * 65 + 17,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseset_type();

      if (s0 === peg$FAILED) {
        s0 = peg$parseseq_type();

        if (s0 === peg$FAILED) {
          s0 = peg$parsestruct_type();

          if (s0 === peg$FAILED) {
            s0 = peg$parseterm_type();
          }
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseset_type() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 18,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c29;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c30);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();

          if (s3 !== peg$FAILED) {
            s4 = peg$parseunion_type();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s6 = peg$c31;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c32);
                  }
                }

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c44(s1, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseseq_type() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 19,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s2 = peg$c45;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();

          if (s3 !== peg$FAILED) {
            s4 = peg$parseunion_type();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s6 = peg$c47;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c48);
                  }
                }

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c49(s1, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsestruct_type() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 20,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c50;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c51);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseopt_comma();

            if (s6 !== peg$FAILED) {
              s7 = peg$parseunion_type();

              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseopt_comma();

              if (s6 !== peg$FAILED) {
                s7 = peg$parseunion_type();

                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parseopt_comma();

              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                  s6 = peg$c52;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c53);
                  }
                }

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c54(s1, s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseterm_type() {
      var s0;
      var key = peg$currPos * 65 + 21,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsead_type();

      if (s0 === peg$FAILED) {
        s0 = peg$parsebuiltin_type();

        if (s0 === peg$FAILED) {
          s0 = peg$parseany_type();

          if (s0 === peg$FAILED) {
            s0 = peg$parsetype_ref();
          }
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsead_type() {
      var s0, s1, s2, s3;
      var key = peg$currPos * 65 + 22,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsead_type_preamble();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsecontracts();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c55(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsead_type_preamble() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 23,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c56;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c57);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parsebuiltin_type_name();

          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c58(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsecontracts() {
      var s0, s1, s2, s3, s4, s5;
      var key = peg$currPos * 65 + 24,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsecontract();

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseopt_comma();

        if (s4 !== peg$FAILED) {
          s5 = peg$parsecontract();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseopt_comma();

          if (s4 !== peg$FAILED) {
            s5 = peg$parsecontract();

            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseopt_comma();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsecontract() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 25,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsecontract_base();

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s3 = peg$c59;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c60);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = peg$parselambda_expr();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 92) {
                  s6 = peg$c59;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parselambda_expr();

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c61(s1, s4, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecontract_base();

        if (s1 !== peg$FAILED) {
          s2 = peg$parsespacing();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s3 = peg$c56;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c57);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parsebuiltin_type_name();

              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c62(s1, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$parsecontract_base();
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsecontract_base() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 26,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c50;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c51);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsecontract_name();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 62) {
              s4 = peg$c52;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c53);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                s6 = peg$parseunion_type();

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c63(s1, s3, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseany_type() {
      var s0, s1, s2;
      var key = peg$currPos * 65 + 27,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c56;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c57);
          }
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c64(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsebuiltin_type() {
      var s0, s1, s2, s3;
      var key = peg$currPos * 65 + 28,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c56;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c57);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsebuiltin_type_name();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c65(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetype_ref() {
      var s0, s1;
      var key = peg$currPos * 65 + 29,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsetype_path();

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c66(s1);
      }

      s0 = s1;
      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parselambda_expr() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
      var key = peg$currPos * 65 + 30,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c13;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c14);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsevar_name();

          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 124) {
                s5 = peg$c67;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c68);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();

                if (s6 !== peg$FAILED) {
                  s7 = peg$parseexpression();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsespacing();

                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s9 = peg$c15;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c16);
                        }
                      }

                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c69(s3, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseexpression() {
      var s0, s1, s2;
      var key = peg$currPos * 65 + 31,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseparen_expression();

      if (s2 === peg$FAILED) {
        s2 = peg$parseany_expression();
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseparen_expression();

          if (s2 === peg$FAILED) {
            s2 = peg$parseany_expression();
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseparen_expression() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 32,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c70) {
        s1 = peg$c70;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c71);
        }
      }

      if (s1 === peg$FAILED) {
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c13;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c14);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c15;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c16);
              }
            }

            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseany_expression() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 33,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;

      if (peg$c72.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c73);
        }
      }

      peg$silentFails--;

      if (s4 === peg$FAILED) {
        s3 = void 0;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c74);
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;

          if (peg$c72.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c73);
            }
          }

          peg$silentFails--;

          if (s4 === peg$FAILED) {
            s3 = void 0;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsemetadata() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 34,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c75) {
        s1 = peg$c75;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c76);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsemetaattr();

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseopt_comma();

            if (s6 !== peg$FAILED) {
              s7 = peg$parsemetaattr();

              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseopt_comma();

              if (s6 !== peg$FAILED) {
                s7 = peg$parsemetaattr();

                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c77) {
                  s6 = peg$c77;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c78);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parsespacing();

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c79(s3, s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 2) === peg$c75) {
          s1 = peg$c75;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c76);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;

          if (input.substr(peg$currPos, 2) === peg$c77) {
            s6 = peg$c77;
            peg$currPos += 2;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c78);
            }
          }

          peg$silentFails--;

          if (s6 === peg$FAILED) {
            s5 = void 0;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }

          if (s5 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }

            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }

          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$currPos;
              peg$silentFails++;

              if (input.substr(peg$currPos, 2) === peg$c77) {
                s6 = peg$c77;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c78);
                }
              }

              peg$silentFails--;

              if (s6 === peg$FAILED) {
                s5 = void 0;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }

              if (s5 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c74);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            }
          } else {
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            s2 = input.substring(s2, peg$currPos);
          } else {
            s2 = s3;
          }

          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c77) {
              s3 = peg$c77;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c78);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parsespacing();

              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c80(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsemetaattr() {
      var s0, s1, s2, s3, s4, s5;
      var key = peg$currPos * 65 + 35,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseattribute_name();

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespaces();

        if (s2 === peg$FAILED) {
          s2 = null;
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c25;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c26);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = peg$parsespaces();

            if (s4 === peg$FAILED) {
              s4 = null;
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parseliteral();

              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c81(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseliteral() {
      var s0;
      var key = peg$currPos * 65 + 36,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsestring_literal();

      if (s0 === peg$FAILED) {
        s0 = peg$parserange_literal();

        if (s0 === peg$FAILED) {
          s0 = peg$parsereal_literal();

          if (s0 === peg$FAILED) {
            s0 = peg$parseinteger_literal();

            if (s0 === peg$FAILED) {
              s0 = peg$parseboolean_literal();

              if (s0 === peg$FAILED) {
                s0 = peg$parsearray_literal();

                if (s0 === peg$FAILED) {
                  s0 = peg$parseset_literal();

                  if (s0 === peg$FAILED) {
                    s0 = peg$parseregexp_literal();

                    if (s0 === peg$FAILED) {
                      s0 = peg$parsefuncref_literal();
                    }
                  }
                }
              }
            }
          }
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsestring_literal() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 37,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;

      if (peg$c82.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c83);
        }
      }

      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$currPos;

        if (peg$c84.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c85);
          }
        }

        if (s6 !== peg$FAILED) {
          if (peg$c82.test(input.charAt(peg$currPos))) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c83);
            }
          }

          if (s7 !== peg$FAILED) {
            s6 = [s6, s7];
            s5 = s6;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }

        if (s5 === peg$FAILED) {
          s5 = peg$currPos;
          s6 = peg$currPos;
          peg$silentFails++;

          if (peg$c82.test(input.charAt(peg$currPos))) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c83);
            }
          }

          peg$silentFails--;

          if (s7 === peg$FAILED) {
            s6 = void 0;
          } else {
            peg$currPos = s6;
            s6 = peg$FAILED;
          }

          if (s6 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }

            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        }

        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$currPos;

          if (peg$c84.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c85);
            }
          }

          if (s6 !== peg$FAILED) {
            if (peg$c82.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c83);
              }
            }

            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }

          if (s5 === peg$FAILED) {
            s5 = peg$currPos;
            s6 = peg$currPos;
            peg$silentFails++;

            if (peg$c82.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c83);
              }
            }

            peg$silentFails--;

            if (s7 === peg$FAILED) {
              s6 = void 0;
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }

            if (s6 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c74);
                }
              }

              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
        }

        if (s4 !== peg$FAILED) {
          if (peg$c82.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c83);
            }
          }

          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = input.substring(s1, peg$currPos);
      } else {
        s1 = s2;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c86(s1);
      }

      s0 = s1;
      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parserange_literal() {
      var s0, s1, s2, s3;
      var key = peg$currPos * 65 + 38,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseinteger_literal();

      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c87) {
          s2 = peg$c87;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c88);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseinteger_literal();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c89(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseinteger_literal();

        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c90) {
            s2 = peg$c90;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c91);
            }
          }

          if (s2 !== peg$FAILED) {
            s3 = peg$parseinteger_literal();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c92(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseinteger_literal();

          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c87) {
              s2 = peg$c87;
              peg$currPos += 2;
            } else {
              s2 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c88);
              }
            }

            if (s2 !== peg$FAILED) {
              s3 = peg$parsespacing();

              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c93(s1);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsefuncref_literal() {
      var s0, s1, s2, s3;
      var key = peg$currPos * 65 + 39,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 38) {
        s1 = peg$c94;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c95);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsejs_identifier();

        if (s3 !== peg$FAILED) {
          s2 = input.substring(s2, peg$currPos);
        } else {
          s2 = s3;
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c96(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsejs_identifier() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      var key = peg$currPos * 65 + 40,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;

      if (peg$c97.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c98);
        }
      }

      if (s3 !== peg$FAILED) {
        s4 = [];

        if (peg$c99.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c100);
          }
        }

        while (s5 !== peg$FAILED) {
          s4.push(s5);

          if (peg$c99.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c100);
            }
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = [];
          s6 = peg$currPos;

          if (input.charCodeAt(peg$currPos) === 46) {
            s7 = peg$c56;
            peg$currPos++;
          } else {
            s7 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c57);
            }
          }

          if (s7 !== peg$FAILED) {
            s8 = peg$parsejs_identifier();

            if (s8 !== peg$FAILED) {
              s7 = [s7, s8];
              s6 = s7;
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
          } else {
            peg$currPos = s6;
            s6 = peg$FAILED;
          }

          while (s6 !== peg$FAILED) {
            s5.push(s6);
            s6 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 46) {
              s7 = peg$c56;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c57);
              }
            }

            if (s7 !== peg$FAILED) {
              s8 = peg$parsejs_identifier();

              if (s8 !== peg$FAILED) {
                s7 = [s7, s8];
                s6 = s7;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
          }

          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = input.substring(s1, peg$currPos);
      } else {
        s1 = s2;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c101(s1);
      }

      s0 = s1;
      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseinteger_literal() {
      var s0, s1, s2, s3, s4, s5;
      var key = peg$currPos * 65 + 41,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;

      if (peg$c102.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c103);
        }
      }

      if (s3 !== peg$FAILED) {
        s4 = [];

        if (peg$c104.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c105);
          }
        }

        while (s5 !== peg$FAILED) {
          s4.push(s5);

          if (peg$c104.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c105);
            }
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 === peg$FAILED) {
        if (peg$c106.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c107);
          }
        }

        if (s2 === peg$FAILED) {
          s2 = peg$currPos;

          if (peg$c108.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c109);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = peg$parseinteger_literal();

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      }

      if (s2 !== peg$FAILED) {
        s1 = input.substring(s1, peg$currPos);
      } else {
        s1 = s2;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c110(s1);
      }

      s0 = s1;
      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsereal_literal() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 42,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      s3 = peg$parseinteger_literal();

      if (s3 === peg$FAILED) {
        s3 = null;
      }

      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s4 = peg$c56;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c57);
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = [];

          if (peg$c104.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c105);
            }
          }

          if (s6 !== peg$FAILED) {
            while (s6 !== peg$FAILED) {
              s5.push(s6);

              if (peg$c104.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c105);
                }
              }
            }
          } else {
            s5 = peg$FAILED;
          }

          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = input.substring(s1, peg$currPos);
      } else {
        s1 = s2;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c111(s1);
      }

      s0 = s1;
      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseboolean_literal() {
      var s0, s1;
      var key = peg$currPos * 65 + 43,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.substr(peg$currPos, 4) === peg$c112) {
        s1 = peg$c112;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c113);
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c114();
      }

      s0 = s1;

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 5) === peg$c115) {
          s1 = peg$c115;
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c116);
          }
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c117();
        }

        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsearray_literal() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 44,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c45;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c46);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseliteral();

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseopt_comma();

            if (s6 !== peg$FAILED) {
              s7 = peg$parseliteral();

              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseopt_comma();

              if (s6 !== peg$FAILED) {
                s7 = peg$parseliteral();

                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s6 = peg$c47;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c48);
                  }
                }

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c1(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c45;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parsespacing();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s3 = peg$c47;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c48);
              }
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c118();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseset_literal() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 45,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c29;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c30);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseliteral();

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseopt_comma();

            if (s6 !== peg$FAILED) {
              s7 = peg$parseliteral();

              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseopt_comma();

              if (s6 !== peg$FAILED) {
                s7 = peg$parseliteral();

                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();

              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s6 = peg$c31;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c32);
                  }
                }

                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c1(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c29;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c30);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parsespacing();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s3 = peg$c31;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c32);
              }
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c118();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseregexp_literal() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 46,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c119;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c120);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];

        if (peg$c121.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c122);
          }
        }

        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);

            if (peg$c121.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c122);
              }
            }
          }
        } else {
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          s2 = input.substring(s2, peg$currPos);
        } else {
          s2 = s3;
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s3 = peg$c119;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c120);
            }
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c123(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsevar_name() {
      var s0, s1, s2;
      var key = peg$currPos * 65 + 47,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];

      if (peg$c124.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c125);
        }
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);

          if (peg$c124.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c125);
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsecontract_name() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 48,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c124.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c125);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];

        if (peg$c126.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c127);
          }
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);

          if (peg$c126.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c127);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseconstraint_name() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 49,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c124.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c125);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];

        if (peg$c128.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c129);
          }
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);

          if (peg$c128.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c129);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseattribute_name() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 50,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c130.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c131);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];

        if (peg$c132.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c133);
          }
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);

          if (peg$c132.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c133);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetype_name() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 51,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      s3 = peg$parsetype_qualifier();

      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s4 = peg$c56;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c57);
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parsetype_part();

        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;

          if (input.charCodeAt(peg$currPos) === 46) {
            s6 = peg$c56;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c57);
            }
          }

          if (s6 !== peg$FAILED) {
            s7 = peg$parsetype_part();

            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }

          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 46) {
              s6 = peg$c56;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c57);
              }
            }

            if (s6 !== peg$FAILED) {
              s7 = peg$parsetype_part();

              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetype_part() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 52,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c134.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c135);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];

        if (peg$c136.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c137);
          }
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);

          if (peg$c136.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c137);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetype_qualifier() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 53,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c124.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c125);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];

        if (peg$c126.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c127);
          }
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);

          if (peg$c126.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c127);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsetype_path() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      var key = peg$currPos * 65 + 54,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsetype_name();

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 47) {
          s5 = peg$c119;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c120);
          }
        }

        if (s5 !== peg$FAILED) {
          s6 = [];

          if (peg$c132.test(input.charAt(peg$currPos))) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c133);
            }
          }

          if (s7 !== peg$FAILED) {
            while (s7 !== peg$FAILED) {
              s6.push(s7);

              if (peg$c132.test(input.charAt(peg$currPos))) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c133);
                }
              }
            }
          } else {
            s6 = peg$FAILED;
          }

          if (s6 !== peg$FAILED) {
            s5 = [s5, s6];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$currPos;

          if (input.charCodeAt(peg$currPos) === 47) {
            s5 = peg$c119;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c120);
            }
          }

          if (s5 !== peg$FAILED) {
            s6 = [];

            if (peg$c132.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c133);
              }
            }

            if (s7 !== peg$FAILED) {
              while (s7 !== peg$FAILED) {
                s6.push(s7);

                if (peg$c132.test(input.charAt(peg$currPos))) {
                  s7 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c133);
                  }
                }
              }
            } else {
              s6 = peg$FAILED;
            }

            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsebuiltin_type_name() {
      var s0, s1, s2;
      var key = peg$currPos * 65 + 55,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];

      if (peg$c138.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c139);
        }
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);

          if (peg$c138.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c139);
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsesystem_from() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 56,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;

      if (peg$c140.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c141);
        }
      }

      peg$silentFails--;

      if (s4 === peg$FAILED) {
        s3 = void 0;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c74);
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;

          if (peg$c140.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c141);
            }
          }

          peg$silentFails--;

          if (s4 === peg$FAILED) {
            s3 = void 0;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsedots() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 57,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsespacing();

      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c90) {
          s3 = peg$c90;
          peg$currPos += 3;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c91);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parsespacing();

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsepipe() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 58,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsespacing();

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 124) {
          s3 = peg$c67;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c68);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parsespacing();

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsecomma() {
      var s0, s1, s2, s3, s4;
      var key = peg$currPos * 65 + 59,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsespacing();

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s3 = peg$c142;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c143);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parsespacing();

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseopt_comma() {
      var s0, s1;
      var key = peg$currPos * 65 + 60,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsecomma();

      if (s1 === peg$FAILED) {
        s1 = peg$parsespacing();
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsespacing() {
      var s0, s1, s2;
      var key = peg$currPos * 65 + 61,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsespaces();

      if (s2 === peg$FAILED) {
        s2 = peg$parsecomment();
      }

      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsespaces();

        if (s2 === peg$FAILED) {
          s2 = peg$parsecomment();
        }
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4, s5, s6;
      var key = peg$currPos * 65 + 62,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 35) {
        s2 = peg$c144;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c145);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;
        s5 = peg$currPos;
        peg$silentFails++;

        if (peg$c146.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c147);
          }
        }

        peg$silentFails--;

        if (s6 === peg$FAILED) {
          s5 = void 0;
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }

        if (s5 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c74);
            }
          }

          if (s6 !== peg$FAILED) {
            s5 = [s5, s6];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;

          if (peg$c146.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c147);
            }
          }

          peg$silentFails--;

          if (s6 === peg$FAILED) {
            s5 = void 0;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }

          if (s5 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }

            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        }

        if (s3 !== peg$FAILED) {
          if (peg$c146.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c147);
            }
          }

          if (s4 === peg$FAILED) {
            s4 = null;
          }

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parsespaces() {
      var s0, s1, s2;
      var key = peg$currPos * 65 + 63,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];

      if (peg$c148.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c149);
        }
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);

          if (peg$c148.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c149);
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    }

    function peg$parseeof() {
      var s0, s1, s2;
      var key = peg$currPos * 65 + 64,
          cached = peg$resultsCache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;

      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }

      peg$silentFails--;

      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$resultsCache[key] = {
        nextPos: peg$currPos,
        result: s0
      };
      return s0;
    } // Converts head:X tail(... X)* to an array of Xs


    function headTailToArray(head, tail) {
      var result = head ? [head] : [];

      for (var i = 0; i < tail.length; i++) {
        result[i + 1] = tail[i][tail[i].length - 1];
      }

      return result;
    } // Sets metadata on arg if defined


    function metadatize(arg, metadata) {
      if (metadata) {
        arg.metadata = metadata;
      }

      return arg;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({
          type: "end",
          description: "end of input"
        });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
}();


},{}],12:[function(require,module,exports){
(function (__dirname){(function (){
"use strict";

module.exports = function () {
  var data = require('./stdlib/data'); // Builds a resolver instance with preconditions and base function `r`


  var resolver = function resolver(pres, r) {
    return function (path, world) {
      for (var i = 0; i < pres.length; i++) {
        if (!pres[i](path, world)) {
          return null;
        }
      }

      return r(path, world);
    };
  }; // ----------------------------------------------------------- File resolver


  var findFile = function findFile(origin, extension, candidates) {
    try {
      var extended = origin + (extension || '');
      fs.statSync(extended);
      return [extended, extension || extended.match(/(\.[a-z]{3,4})$/)[1]];
    } catch (e) {
      if (candidates.length === 0) {
        throw new Error("No such file: `".concat(origin, "`"));
      } else {
        return findFile(origin, candidates[0], candidates.slice(1));
      }
    }
  }; // Matches file:// and resolve it through `fs`, therefore working under
  // node.js environment only


  var fs = require('fs');

  var file = resolver([function (path) {
    return !!fs;
  }], function (path, world) {
    var match = path.match(/^file:\/\/(.*?)$/);

    if (!match) {
      return null;
    } // check that it's an existing file


    var pair = findFile(match[1], null, ['.fio', '.json']);
    var file = pair[0],
        extension = pair[1];
    var src = fs.readFileSync(file).toString();
    var system = null; // load according to the extension

    switch (extension) {
      case '.fio':
        system = world.Finitio.parse(src);
        break;

      case '.json':
        system = JSON.parse(src);
        break;

      default:
        throw new Error("Unrecognized extension: `".concat(extension, "`"));
    } // return the pair now


    return [path, system];
  }); // ------------------------------------------------------- Relative resolver
  // Matches ./ and ../ imports and resolve them recursively after making
  // them absolute

  var relative = resolver([], function (path, world) {
    var match = path.match(/^(\.\/)|^(\.\.\/)/);

    if (!match) {
      return null;
    }

    var url = world.sourceUrl;

    if (!url) {
      throw new Error("Unable to resolve relative path: `".concat(path, "`"));
    } // relative -> absolute


    url = url.replace(/\/[^/]+$/, '');

    if (match[2]) {
      // ../ -> parent folder
      url = url.replace(/\/[^/]+$/, '');
    }

    url = "".concat(url, "/").concat(path.slice(match[0].length)); // delegate the job

    return world.importResolver(url, world, {
      raw: true
    });
  }); // --------------------------------------------------- Standard lib resolver
  // Matches finitio/... and resolve it through the standard library either
  // on disk (if fs is available), or through the web

  var stdlib = resolver([function (path) {
    return !!__dirname;
  }], function (path, world) {
    var match = path.match(/^finitio\/(.*)$/);

    if (!match) {
      return null;
    } // establish the paths


    var name = match[1];

    try {
      return require("./stdlib/".concat(name))(world, {
        raw: true
      });
    } catch (e) {
      throw new Error("No such stdlib system: `".concat(path, "`"), e);
    }
  }); // ------------------------------------------------- Chain of responsibility

  var main = function main(path, world, options) {
    var keys = Object.keys(main);
    var k, strategy, pair;

    for (var i = 0; i < keys.length; i++) {
      strategy = main[keys[i]];
      pair = strategy(path, world);

      if (pair) {
        if (options && options.raw) {
          return pair;
        } else {
          var newWorld = world.Finitio.world(world, {
            sourceUrl: pair[0]
          });
          return world.Finitio.system(pair[1], newWorld);
        }
      }
    }

    throw new Error("Unable to resolve: `".concat(path, "`"));
  };

  main.File = file;
  main.StdLib = stdlib;
  main.Relative = relative;
  return main;
}();


}).call(this)}).call(this,"/lib/finitio")
},{"./stdlib/data":13,"fs":39}],13:[function(require,module,exports){
"use strict";

/* eslint-disable */
module.exports = function () {
  var ss = {
    "http://finitio.io/0.4/stdlib/data": {
      "types": [{
        "name": "Any",
        "type": {
          "any": {}
        },
        "metadata": {
          "description": "Recognizes everything"
        }
      }, {
        "name": "Nil",
        "type": {
          "sub": {
            "superType": {
              "any": {}
            },
            "constraints": [{
              "native": ["v", "v === null"]
            }]
          }
        },
        "metadata": {
          "description": "Recognizes JavaScript's null"
        }
      }, {
        "name": "Boolean",
        "type": {
          "builtin": {
            "jsType": "Boolean"
          }
        },
        "metadata": {
          "description": "Recognizes true and false"
        }
      }, {
        "name": "True",
        "type": {
          "sub": {
            "superType": {
              "builtin": {
                "jsType": "Boolean"
              }
            },
            "constraints": [{
              "native": ["b", "b === true"]
            }]
          }
        },
        "metadata": {
          "description": "Only true"
        }
      }, {
        "name": "False",
        "type": {
          "sub": {
            "superType": {
              "builtin": {
                "jsType": "Boolean"
              }
            },
            "constraints": [{
              "native": ["b", "b === false"]
            }]
          }
        },
        "metadata": {
          "description": "Only false"
        }
      }, {
        "name": "Numeric",
        "type": {
          "builtin": {
            "jsType": "Number"
          }
        },
        "metadata": {
          "description": "Recognizes any number"
        }
      }, {
        "name": "Real",
        "type": {
          "sub": {
            "superType": {
              "builtin": {
                "jsType": "Number"
              }
            },
            "constraints": [{
              "native": ["n", "(n===0.0) || !(n % 1 === 0)"]
            }]
          }
        },
        "metadata": {
          "description": "Recognizes only real numbers"
        }
      }, {
        "name": "Integer",
        "type": {
          "sub": {
            "superType": {
              "builtin": {
                "jsType": "Number"
              }
            },
            "constraints": [{
              "native": ["n", "n % 1 === 0"]
            }]
          }
        },
        "metadata": {
          "description": "Recognizes only integer numbers"
        }
      }, {
        "name": "String",
        "type": {
          "builtin": {
            "jsType": "String"
          }
        },
        "metadata": {
          "description": "Recognizes every string"
        }
      }, {
        "name": "Date",
        "type": {
          "adt": {
            "jsType": "Date",
            "contracts": [{
              "name": "iso8601",
              "infoType": {
                "builtin": {
                  "jsType": "String"
                }
              },
              "external": "Finitio.Contracts.Date.iso8601"
            }, {
              "name": "milliseconds",
              "infoType": {
                "builtin": {
                  "jsType": "Number"
                }
              },
              "external": "Finitio.Contracts.Date.milliseconds"
            }]
          }
        },
        "metadata": {
          "description": "Recognizes valid dates"
        }
      }, {
        "name": "Time",
        "type": {
          "adt": {
            "jsType": "Date",
            "contracts": [{
              "name": "iso8601",
              "infoType": {
                "builtin": {
                  "jsType": "String"
                }
              },
              "external": "Finitio.Contracts.Time.iso8601"
            }, {
              "name": "milliseconds",
              "infoType": {
                "builtin": {
                  "jsType": "Number"
                }
              },
              "external": "Finitio.Contracts.Time.milliseconds"
            }]
          }
        },
        "metadata": {
          "description": "Recognizes valid times"
        }
      }]
    }
  };

  var r = function r(fallback) {
    return function (path, w, options) {
      var s = ss[path];

      if (s) {
        if (options && options.raw) {
          return [path, s];
        } else {
          return w.Finitio.system(s, w);
        }
      } else if (fallback) {
        return fallback(path, w, options);
      } else {
        throw new Error('Unable to resolve: `' + path + '`');
      }
    };
  };

  return function (w, options) {
    if (!w) {
      w = require('finit' + 'io').World;
    }

    w = w.Finitio.world(w, {
      importResolver: r(w.importResolver)
    });
    return w.importResolver('http://finitio.io/0.4/stdlib/data', w, options);
  };
}();


},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _ic = require("./ic");

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//
// Helper class for tuple and relation attributes.
//
// An attribute is simply a `(name: AttrName, type: Type)` pair, where the
// type is a Finitio type.
//
var Attribute = /*#__PURE__*/function () {
  function Attribute(name, type, required, metadata) {
    _classCallCheck(this, Attribute);

    this.name = name;
    this.type = type;
    this.required = required;
    this.metadata = metadata;

    if (typeof this.name !== 'string') {
      _utils["default"].argumentError('String expected for attribute name, got:', this.name);
    }

    if (!(this.type instanceof _type["default"])) {
      _utils["default"].argumentError('Type expected for attribute domain, got:', this.type);
    }

    if (this.required == null) {
      this.required = true;
    }

    if (typeof this.required !== 'boolean') {
      _utils["default"].argumentError('Boolean expected for required, got:', this.required);
    }
  }

  _createClass(Attribute, [{
    key: "fetchType",
    value: function fetchType() {
      return this.type;
    }
  }, {
    key: "fetchOn",
    value: function fetchOn(arg, callback) {
      if (_typeof(arg) !== 'object') {
        _utils["default"].argumentError('Object expected, got:', arg);
      }

      if (arg[this.name] == null) {
        if (callback != null) {
          return callback();
        } else {
          throw new Error("Key `".concat(this.name, "` not found"));
        }
      }

      return arg[this.name];
    }
  }, {
    key: "isSuperAttributeOf",
    value: function isSuperAttributeOf(other) {
      return this === other || this.name === other.name && (!this.required || other.required) && this.type.isSuperTypeOf(other.type);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this === other || other instanceof Attribute && this.name === other.name && this.required === other.required && this.type.equals(other.type);
    }
  }, {
    key: "low",
    value: function low() {
      return new Attribute(this.name, this.type.low(), this.required);
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.type.resolveProxies(system);
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.required) {
        return "".concat(this.name, " : ").concat(this.type);
      } else {
        return "".concat(this.name, " :? ").concat(this.type);
      }
    }
  }]);

  return Attribute;
}();

(0, _ic.ObjectType)(Attribute, ['name', 'type', 'required', 'metadata']); //

var _default = Attribute;
exports["default"] = _default;


},{"../type":26,"./ic":21,"./utils":24}],15:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// mixin
var CollectionType = /*#__PURE__*/function (_Type) {
  _inherits(CollectionType, _Type);

  var _super = _createSuper(CollectionType);

  function CollectionType(elmType, name, metadata) {
    var _this;

    _classCallCheck(this, CollectionType);

    _this = _super.call(this, name, metadata);
    _this.name = name;
    _this.elmType = elmType;

    if (!(_this.elmType instanceof _type["default"])) {
      _utils["default"].argumentError('Finitio.Type expected, got:', _this.elmType);
    }

    return _this;
  }

  _createClass(CollectionType, [{
    key: "_equals",
    value: function _equals(other) {
      return this === other || other instanceof this.constructor && this.elmType.equals(other.elmType) || _get(_getPrototypeOf(CollectionType.prototype), "_equals", this).apply(this, arguments);
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(other) {
      return this === other || other instanceof this.constructor && this.elmType.isSuperTypeOf(other.elmType) || _get(_getPrototypeOf(CollectionType.prototype), "_isSuperTypeOf", this).apply(this, arguments);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      var from = this.elmType;
      var to = as.elmType;

      if (to.isSuperTypeOf(from)) {
        return value;
      }

      return _utils["default"].map(value, function (v) {
        return from.undress(v, to);
      });
    }
  }]);

  return CollectionType;
}(_type["default"]); //


var _default = CollectionType;
exports["default"] = _default;


},{"../type":26,"./utils":24}],16:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SetConstraint = exports.RegexpConstraint = exports.RangeConstraint = exports.NativeConstraint = exports.Constraint = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _ic = require("./ic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//
// Helper class for constraints.
//
var Constraint = /*#__PURE__*/function () {
  function Constraint(name, native1, metadata) {
    _classCallCheck(this, Constraint);

    this.name = name;
    this["native"] = native1;
    this.metadata = metadata;

    if (this.name != null && typeof this.name !== 'string') {
      _utils["default"].argumentError('String expected for constraint name, got: ', this.name);
    }
  }

  _createClass(Constraint, [{
    key: "isAnonymous",
    value: function isAnonymous() {
      return this.name == null;
    }
  }, {
    key: "accept",
    value: function accept(arg) {
      throw new Error('Constraint is an abstract class');
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this === other || other instanceof Constraint && this["native"] === other["native"];
    }
  }, {
    key: "toString",
    value: function toString() {
      var str = this.nativeToString();

      if (!this.isAnonymous()) {
        str = "".concat(this.name, ": ").concat(str);
      }

      return str;
    }
  }, {
    key: "nativeToString",
    value: function nativeToString() {
      return this["native"].toString();
    }
  }]);

  return Constraint;
}();

exports.Constraint = Constraint;

var NativeConstraint = /*#__PURE__*/function (_Constraint) {
  _inherits(NativeConstraint, _Constraint);

  var _super = _createSuper(NativeConstraint);

  function NativeConstraint() {
    _classCallCheck(this, NativeConstraint);

    return _super.apply(this, arguments);
  }

  _createClass(NativeConstraint, [{
    key: "kind",
    get: function get() {
      return 'native';
    }
  }, {
    key: "accept",
    value: function accept(arg) {
      return this["native"](arg);
    }
  }, {
    key: "nativeToString",
    value: function nativeToString() {
      return this["native"].finitioSourceCode || '...';
    }
  }]);

  return NativeConstraint;
}(Constraint);

exports.NativeConstraint = NativeConstraint;

var RegexpConstraint = /*#__PURE__*/function (_Constraint2) {
  _inherits(RegexpConstraint, _Constraint2);

  var _super2 = _createSuper(RegexpConstraint);

  function RegexpConstraint() {
    _classCallCheck(this, RegexpConstraint);

    return _super2.apply(this, arguments);
  }

  _createClass(RegexpConstraint, [{
    key: "kind",
    get: function get() {
      return 'regexp';
    }
  }, {
    key: "accept",
    value: function accept(arg) {
      return this["native"].test(arg);
    }
  }]);

  return RegexpConstraint;
}(Constraint);

exports.RegexpConstraint = RegexpConstraint;

var RangeConstraint = /*#__PURE__*/function (_Constraint3) {
  _inherits(RangeConstraint, _Constraint3);

  var _super3 = _createSuper(RangeConstraint);

  function RangeConstraint() {
    _classCallCheck(this, RangeConstraint);

    return _super3.apply(this, arguments);
  }

  _createClass(RangeConstraint, [{
    key: "kind",
    get: function get() {
      return 'range';
    }
  }, {
    key: "accept",
    value: function accept(arg) {
      return (this["native"].min_inclusive ? arg >= this["native"].min : arg > this["native"].min) && (this["native"].max === undefined || (this["native"].max_inclusive ? arg <= this["native"].max : arg < this["native"].max));
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (this === other) {
        return true;
      }

      if (!(other instanceof Constraint.Range)) {
        return false;
      }

      return this["native"].min === other["native"].min && this["native"].min_inclusive === other["native"].min_inclusive && (this["native"].max === undefined && other["native"].max === undefined || this["native"].max === other["native"].max && this["native"].max_inclusive === other["native"].max_inclusive);
    }
  }, {
    key: "nativeToString",
    value: function nativeToString() {
      if (!this["native"].max) {
        return "".concat(this["native"].min, "..");
      }

      if (!this["native"].max_inclusive) {
        return "".concat(this["native"].min, "...").concat(this["native"].max);
      }

      return "".concat(this["native"].min, "..").concat(this["native"].max);
    }
  }]);

  return RangeConstraint;
}(Constraint);

exports.RangeConstraint = RangeConstraint;

var SetConstraint = /*#__PURE__*/function (_Constraint4) {
  _inherits(SetConstraint, _Constraint4);

  var _super4 = _createSuper(SetConstraint);

  function SetConstraint() {
    _classCallCheck(this, SetConstraint);

    return _super4.apply(this, arguments);
  }

  _createClass(SetConstraint, [{
    key: "kind",
    get: function get() {
      return 'set';
    }
  }, {
    key: "accept",
    value: function accept(arg) {
      return _utils["default"].contains(this["native"], arg);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (this === other) {
        return true;
      }

      if (!(other instanceof Constraint.Set)) {
        return false;
      }

      if (this["native"].length !== other["native"].length) {
        return false;
      }

      return _utils["default"].difference(this["native"], other["native"]).length === 0;
    }
  }, {
    key: "nativeToString",
    value: function nativeToString() {
      return "{ ".concat(this["native"].join(' '), " }");
    }
  }]);

  return SetConstraint;
}(Constraint);

exports.SetConstraint = SetConstraint;
(0, _ic.AbstractType)(Constraint, [NativeConstraint, RegexpConstraint, RangeConstraint, SetConstraint], ['name', 'native', 'metadata'], 1); //

Constraint.Native = NativeConstraint;
Constraint.Regexp = RegexpConstraint;
Constraint.Range = RangeConstraint;
Constraint.Set = SetConstraint;
var _default = Constraint;
exports["default"] = _default;


},{"./ic":21,"./utils":24}],17:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("./ic");

var _utils = _interopRequireDefault(require("./utils"));

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Contract = /*#__PURE__*/function () {
  function Contract(name, infoType, native1, metadata) {
    _classCallCheck(this, Contract);

    this.name = name;
    this.infoType = infoType;
    this["native"] = native1;
    this.metadata = metadata;

    if (!_utils["default"].isString(this.name)) {
      _utils["default"].argumentError('String expected, got:', this.name);
    }

    if (!(this.infoType instanceof _type["default"])) {
      _utils["default"].argumentError('Finitio.Type expected, got:', this.infoType);
    }
  }

  _createClass(Contract, [{
    key: "fetchType",
    value: function fetchType() {
      return this.infoType;
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.infoType.resolveProxies(system);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "<".concat(this.name, "> ").concat(this.infoType.toString());
    }
  }]);

  return Contract;
}();

var ExplicitContract = /*#__PURE__*/function (_Contract) {
  _inherits(ExplicitContract, _Contract);

  var _super = _createSuper(ExplicitContract);

  function ExplicitContract() {
    _classCallCheck(this, ExplicitContract);

    return _super.apply(this, arguments);
  }

  _createClass(ExplicitContract, [{
    key: "kind",
    get: function get() {
      return 'explicit';
    }
  }, {
    key: "dress",
    value: function dress(value, world) {
      return this["native"].dress(value, world);
    }
  }, {
    key: "undress",
    value: function undress(value, to) {
      return this["native"].undress(value);
    }
  }]);

  return ExplicitContract;
}(Contract);

var ExternalContract = /*#__PURE__*/function (_Contract2) {
  _inherits(ExternalContract, _Contract2);

  var _super2 = _createSuper(ExternalContract);

  function ExternalContract() {
    _classCallCheck(this, ExternalContract);

    return _super2.apply(this, arguments);
  }

  _createClass(ExternalContract, [{
    key: "kind",
    get: function get() {
      return 'external';
    }
  }, {
    key: "dress",
    value: function dress(value, world) {
      return this["native"].dress(value, world);
    }
  }, {
    key: "undress",
    value: function undress(value, to) {
      return this["native"].undress(value);
    }
  }]);

  return ExternalContract;
}(Contract);

var InternalContract = /*#__PURE__*/function (_Contract3) {
  _inherits(InternalContract, _Contract3);

  var _super3 = _createSuper(InternalContract);

  function InternalContract() {
    _classCallCheck(this, InternalContract);

    return _super3.apply(this, arguments);
  }

  _createClass(InternalContract, [{
    key: "kind",
    get: function get() {
      return 'internal';
    }
  }, {
    key: "dress",
    value: function dress(value, world) {
      return this["native"][this.name](value, world);
    }
  }, {
    key: "undress",
    value: function undress(value, to) {
      return value["to".concat(_utils["default"].capitalize(this.name))]();
    }
  }]);

  return InternalContract;
}(Contract);

var IdentityContract = /*#__PURE__*/function (_Contract4) {
  _inherits(IdentityContract, _Contract4);

  var _super4 = _createSuper(IdentityContract);

  function IdentityContract() {
    _classCallCheck(this, IdentityContract);

    return _super4.apply(this, arguments);
  }

  _createClass(IdentityContract, [{
    key: "kind",
    get: function get() {
      return 'identity';
    }
  }, {
    key: "dress",
    value: function dress(value, world) {
      return value;
    }
  }, {
    key: "undress",
    value: function undress(value, to) {
      return value;
    }
  }]);

  return IdentityContract;
}(Contract);

(0, _ic.AbstractType)(Contract, [ExplicitContract, ExternalContract, InternalContract, IdentityContract], ['name', 'infoType', 'native', 'metadata'], 2);
Contract.Explicit = ExplicitContract;
Contract.External = ExternalContract;
Contract.Internal = InternalContract;
Contract.Identity = IdentityContract;
var _default = Contract;
exports["default"] = _default;


},{"../type":26,"./ic":21,"./utils":24}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DressMonad = /*#__PURE__*/function () {
  function DressMonad(world, result, error) {
    _classCallCheck(this, DressMonad);

    this.world = world;
    this.result = result;
    this.error = error;
  }

  _createClass(DressMonad, [{
    key: "success",
    value: function success(result) {
      return new DressMonad(this.world, result, undefined);
    }
  }, {
    key: "failure",
    value: function failure(context, error, causes) {
      error = {
        error: error
      };

      if (causes != null) {
        error.children = causes;
      }

      return new DressMonad(this.world, undefined, error);
    }
  }, {
    key: "find",
    value: function find(collection, callback, onFailure) {
      var causes = [];

      var _iterator = _createForOfIteratorHelper(collection.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              i = _step$value[0],
              element = _step$value[1];

          var m = callback(element, i);

          if (m.isSuccess()) {
            return m;
          } else {
            if (m.error.location == null) {
              setErrorLocation(m.error, element, i);
            }

            causes.push(m.error);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return onFailure(causes);
    }
  }, {
    key: "refine",
    value: function refine(base, collection, callback, onFailure) {
      if (base.isSuccess()) {
        var causes = [];

        var _iterator2 = _createForOfIteratorHelper(collection.entries()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                i = _step2$value[0],
                element = _step2$value[1];

            var m = callback(base, element, i);

            if (m.isFailure()) {
              if (m.error.location == null) {
                setErrorLocation(m.error, element, i);
              }

              causes.push(m.error);

              if (this.isFailfast()) {
                break;
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (causes.length === 0) {
          return base;
        }

        return onFailure(causes);
      } else {
        return onFailure([base.error]);
      }
    }
  }, {
    key: "map",
    value: function map(collection, mapper, onFailure) {
      var result = [];
      var success = this.success(result);

      var callback = function callback(_, elm, index) {
        var m = mapper(elm, index);
        return m.onSuccess(function (elmResult) {
          result.push(elmResult);
          return m;
        });
      };

      return this.refine(success, collection, callback, onFailure);
    }
  }, {
    key: "isFailfast",
    value: function isFailfast() {
      return this.world && this.world.failfast;
    }
  }, {
    key: "isSuccess",
    value: function isSuccess() {
      return this.error === undefined;
    }
  }, {
    key: "isFailure",
    value: function isFailure() {
      return !this.isSuccess();
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(callback) {
      if (!this.isSuccess()) {
        return this;
      }

      return callback(this.result);
    }
  }, {
    key: "onFailure",
    value: function onFailure(callback) {
      if (this.isSuccess()) {
        return this;
      }

      return callback(this.error);
    }
  }]);

  return DressMonad;
}();

var setErrorLocation = function setErrorLocation(error, element, index) {
  var loc = element.name;

  if (loc == null) {
    loc = index;
  }

  return error.location = loc;
};

var _default = DressMonad;
exports["default"] = _default;


},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(clazz, plural, singular, extractor) {
  if (singular == null) {
    singular = plural.slice(0, plural.length - 1);
  }

  if (extractor == null) {
    extractor = function extractor(name) {
      return _this[plural][name];
    };
  }

  clazz.prototype.fetch = function (name, callback) {
    var extracted = extractor.bind(this)(name);

    if (extracted != null) {
      return extracted;
    } else if (callback != null) {
      return callback(this, name);
    } else {
      throw new Error("No such ".concat(singular, " `").concat(name, "`"));
    }
  };

  return clazz.prototype.fetchPath = function (path, callback) {
    var f = _utils["default"].inject(path.split('/'), this, function (memo, name) {
      return memo && memo.fetch && memo.fetch(name, function () {
        return null;
      });
    });

    if (f != null) {
      return f;
    } else if (callback != null) {
      return callback();
    } else {
      throw new Error("No such ".concat(singular, " `").concat(path, "`"));
    }
  };
};

exports["default"] = _default;


},{"./utils":24}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("./ic");

var _utils = _interopRequireDefault(require("./utils"));

var _fetchable = _interopRequireDefault(require("./fetchable"));

var _attribute = _interopRequireDefault(require("./attribute"));

var _any_type = _interopRequireDefault(require("../type/any_type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// Helper class for tuple and relation types.
//
// A heading is a set of attributes, with the constraint that no two
// attributes have the same name.
//
var Heading = /*#__PURE__*/function () {
  function Heading(attributes, options) {
    _classCallCheck(this, Heading);

    // Check the attributes
    this.attributes = attributes;
    this.options = options;

    if (!_utils["default"].isArray(this.attributes) || !_utils["default"].every(this.attributes, function (a) {
      return a instanceof _attribute["default"];
    })) {
      _utils["default"].argumentError('Array of Attribute expected');
    } // Check unique names


    var names = {};

    _utils["default"].each(this.attributes, function (attr) {
      if (names[attr.name] != null) {
        _utils["default"].argumentError('Attribute names must be unique');
      }

      return names[attr.name] = attr;
    }); // Check the options


    if (this.options == null) {
      this.options = {};
    }

    if (!_utils["default"].isObject(this.options)) {
      _utils["default"].argumentError('Hash of options expected');
    }

    this.options = _utils["default"].extend({}, Heading.DEFAULT_OPTIONS, this.options);
  }

  _createClass(Heading, [{
    key: "getAttr",
    value: function getAttr(name) {
      return _utils["default"].find(this.attributes, function (a) {
        return a.name === name;
      });
    }
  }, {
    key: "size",
    value: function size() {
      return this.attributes.length;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.size() === 0;
    }
  }, {
    key: "allowExtra",
    value: function allowExtra(type) {
      if (!this.options.allowExtra) {
        return false;
      }

      if (type == null) {
        return true;
      }

      return this.getExtraType()._isSuperTypeOf(type);
    }
  }, {
    key: "allowExtraValue",
    value: function allowExtraValue(value) {
      if (!this.allowExtra()) {
        return false;
      }

      if (value == null) {
        return true;
      }

      return this.getExtraType().include(value);
    }
  }, {
    key: "getExtraType",
    value: function getExtraType() {
      return this.options.allowExtra;
    }
  }, {
    key: "multi",
    value: function multi() {
      return this.allowExtra() || _utils["default"].any(this.attributes, function (a) {
        return !a.required;
      });
    }
  }, {
    key: "each",
    value: function each(callback) {
      return _utils["default"].each(this.attributes, callback);
    }
  }, {
    key: "toString",
    value: function toString() {
      var str = _utils["default"].map(this.attributes, function (a) {
        return a.toString();
      }).join(', ');

      if (this.allowExtra()) {
        var extraType = this.options.allowExtra;

        if (!this.isEmpty()) {
          str += ', ';
        }

        str += '...';

        if (!(extraType instanceof _any_type["default"])) {
          str += ": ".concat(extraType.toString());
        }
      }

      return str;
    }
  }, {
    key: "names",
    value: function names() {
      return _utils["default"].map(this.attributes, function (a) {
        return a.name;
      });
    }
  }, {
    key: "isSuperHeadingOf",
    value: function isSuperHeadingOf(other) {
      // Recognises with itself
      if (this === other) {
        return true;
      }

      if (!(other instanceof Heading)) {
        return false;
      } //


      var _$u$triSplit = _utils["default"].triSplit(Heading._attributesByName(this), Heading._attributesByName(other)),
          _$u$triSplit2 = _slicedToArray(_$u$triSplit, 3),
          s = _$u$triSplit2[0],
          l = _$u$triSplit2[1],
          r = _$u$triSplit2[2]; // Each field must be of same type or be parent


      if (!_utils["default"].every(s, function (pair) {
        return pair[0].isSuperAttributeOf(pair[1]);
      })) {
        return false;
      } // Each missing field must be optional


      if (!_utils["default"].every(l, function (a) {
        return !a.required;
      })) {
        return false;
      } // If the other type allows extra attribute
      // this type must too and must allow the other's extra type


      if (other.allowExtra()) {
        if (!this.allowExtra() || !this.allowExtra(other.options.allowExtra)) {
          return false;
        }
      } // We allow extra, or there are no extra fields


      return this.allowExtra() || _utils["default"].isEmpty(r);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this === other || other instanceof Heading && this.attributesEquals(other) && this.optionsEquals(other);
    }
  }, {
    key: "attributesEquals",
    value: function attributesEquals(other) {
      return this.attributes.length === other.attributes.length && _utils["default"].every(this.attributes, function (attr) {
        return attr.equals(other.getAttr(attr.name));
      });
    }
  }, {
    key: "optionsEquals",
    value: function optionsEquals(other) {
      return _utils["default"].size(this.options) === _utils["default"].size(other.options) && _utils["default"].every(this.options, function (opt, name) {
        return opt === other.options[name];
      });
    }
  }, {
    key: "low",
    value: function low() {
      var reattrs = _utils["default"].map(this.attributes, function (a) {
        return a.low();
      });

      var reopts = this.options;
      return new Heading(reattrs, reopts);
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      _utils["default"].each(this.attributes, function (a) {
        return a.resolveProxies(system);
      });

      if (this.options.allowExtra) {
        return this.options.allowExtra.resolveProxies(system);
      }
    }
  }]);

  return Heading;
}();

_defineProperty(Heading, "_attributesByName", function (self) {
  var h = {};

  _utils["default"].each(self.attributes, function (a) {
    return h[a.name] = a;
  });

  return h;
});

_defineProperty(Heading, "DEFAULT_OPTIONS", {
  allowExtra: false
});

(0, _ic.ObjectType)(Heading, ['attributes', 'options']);
(0, _fetchable["default"])(Heading, 'attributes', 'attribute', function (name) {
  return this.getAttr(name);
}); //

var _default = Heading;
exports["default"] = _default;


},{"../type/any_type":28,"./attribute":14,"./fetchable":19,"./ic":21,"./utils":24}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeType = exports.ObjectType = exports.AbstractType = void 0;

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var invokeConstructor = function invokeConstructor(c, args) {
  // create a fake constructor
  var T = function T() {};

  T.prototype = c.prototype; // create an instance

  var inst = new T(); // call the real constructor now

  var ret = c.apply(inst, args); // return the instance

  return Object(ret) === ret ? ret : inst;
};

var AbstractType = function AbstractType(base, subs, properties, rawindex) {
  base.info = function (from) {
    var sub = _utils["default"].find(subs, function (s) {
      return !!from[s.prototype.kind];
    });

    if (sub) {
      var args = [];

      for (var i = 0; i < properties.length; i++) {
        var propname = i === rawindex ? sub.prototype.kind : properties[i];
        var propval = from[propname];

        if (propval) {
          args[i] = propval;
        }
      }

      return invokeConstructor(sub, args);
    } else {
      var dump = JSON.stringify(from);

      _utils["default"].argumentError("Unrecognized ".concat(base.name, " info: "), dump);
    }
  };

  base.prototype.toInfo = function () {
    var to = {};

    for (var i = 0; i < properties.length; i++) {
      var name = i === rawindex ? this.kind : properties[i];
      var value = this[properties[i]];

      if (value !== undefined) {
        to[name] = value;
      }
    }

    return to;
  };
};

exports.AbstractType = AbstractType;

var ObjectType = function ObjectType(base, properties, onDressed) {
  base.info = function (from, world) {
    var args = [];

    for (var i = 0; i < properties.length; i++) {
      var propval = from[properties[i]];

      if (propval !== undefined) {
        args[i] = propval;
      }
    }

    var inst = invokeConstructor(base, args);

    if (onDressed) {
      onDressed(inst, world);
    }

    return inst;
  };

  base.prototype.toInfo = function () {
    var to = {};

    for (var i = 0; i < properties.length; i++) {
      var name = properties[i];
      var value = this[name];

      if (value !== undefined) {
        to[name] = value;
      }
    }

    return to;
  };
};

exports.ObjectType = ObjectType;

var TypeType = function TypeType(base, generator, properties) {
  base.prototype.generator = generator;
  ObjectType(base, properties);
};

exports.TypeType = TypeType;


},{"./utils":24}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Import = function Import(from, qualifier) {
  _classCallCheck(this, Import);

  this.from = from;
  this.qualifier = qualifier;
};

(0, _ic.ObjectType)(Import, ['from', 'qualifier'], function (imp, world) {
  return imp.system = world.importResolver(imp.from, world);
});
var _default = Import;
exports["default"] = _default;


},{"../support/ic":21}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _attribute = _interopRequireDefault(require("../support/attribute"));

var _heading = _interopRequireDefault(require("../support/heading"));

var _contract = _interopRequireDefault(require("../support/contract"));

var _constraint = _interopRequireDefault(require("../support/constraint"));

var _import = _interopRequireDefault(require("../support/import"));

var _contracts = _interopRequireDefault(require("../contracts"));

var _type = _interopRequireDefault(require("../type"));

var _ad_type = _interopRequireDefault(require("../type/ad_type"));

var _builtin_type = _interopRequireDefault(require("../type/builtin_type"));

var _tuple_type = _interopRequireDefault(require("../type/tuple_type"));

var _relation_type = _interopRequireDefault(require("../type/relation_type"));

var _union_type = _interopRequireDefault(require("../type/union_type"));

var _seq_type = _interopRequireDefault(require("../type/seq_type"));

var _set_type = _interopRequireDefault(require("../type/set_type"));

var _any_type = _interopRequireDefault(require("../type/any_type"));

var _struct_type = _interopRequireDefault(require("../type/struct_type"));

var _sub_type = _interopRequireDefault(require("../type/sub_type"));

var _type_ref = _interopRequireDefault(require("../type/type_ref"));

var _type_def = _interopRequireDefault(require("../type/type_def"));

var _system = _interopRequireDefault(require("../system"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Js = {};
var Meta = {
  Js: Js
}; // -------------------------------------------------------------- Javascript

Js.Object = _builtin_type["default"].info({
  jsType: Object
});
Js.String = _builtin_type["default"].info({
  jsType: String
});
Js.Boolean = _builtin_type["default"].info({
  jsType: Boolean
});
Js.Number = _builtin_type["default"].info({
  jsType: Number
});
Js.Array = _builtin_type["default"].info({
  jsType: Array
});
Js.Type = _ad_type["default"].info({
  jsType: Function,
  contracts: [_contract["default"].info({
    name: 'jsTypeName',
    infoType: Js.String,
    explicit: {
      dress: function dress(name, world) {
        return _contracts["default"].JsType.name.dress(name, world.JsTypes);
      },
      undress: _contracts["default"].JsType.name.undress
    }
  })]
});
Js.Empty = _sub_type["default"].info({
  superType: _any_type["default"].info({}),
  constraints: [_constraint["default"].info({
    name: 'default',
    "native": function native(v) {
      if (v === null || v === undefined) {
        return false;
      }

      for (var k in v) {
        return false;
      }

      return true;
    }
  })]
}); // --------------------------------------------------------------- Functions

Js.FunctionDefn = _seq_type["default"].info({
  elmType: Js.String
});
Js.Function = _ad_type["default"].info({
  jsType: Function,
  contracts: [_contract["default"].info({
    name: 'defn',
    infoType: Js.FunctionDefn,
    external: _contracts["default"].Expression.defn
  }), _contract["default"].info({
    name: 'reference',
    infoType: Js.String,
    external: _contracts["default"].Function.reference
  })]
}); // ----------------------------------------------------------------- RegExps

Js.RegExp = _ad_type["default"].info({
  jsType: RegExp,
  contracts: [_contract["default"].info({
    name: 'src',
    infoType: Js.String,
    explicit: {
      dress: function dress(src) {
        return new RegExp(src);
      },
      undress: function undress(rx) {
        return rx.source;
      }
    }
  })]
}); // ------------------------------------------------------------------ Shared

var metadataAttr = _attribute["default"].info({
  name: 'metadata',
  type: Js.Object,
  required: false
}); // ------------------------------------------------------------------- Tools


var levelUp = function levelUp(name, jsType, infoType, contractName) {
  return _ad_type["default"].info({
    jsType: jsType,
    contracts: [_contract["default"].info({
      name: contractName,
      infoType: infoType,
      internal: jsType
    })]
  });
};

var object = function object(name, jsType, attributes) {
  attributes.push(metadataAttr);

  var infoType = _tuple_type["default"].info({
    heading: _heading["default"].info({
      attributes: attributes
    })
  });

  var adType = levelUp(name, jsType, infoType, 'info');
  return adType;
}; // -------------------------------------------------------------------- Type


var typeCandidates = [_builtin_type["default"].info({
  jsType: _type["default"]
})];
Meta.Type = levelUp('Type', _type["default"], _union_type["default"].info({
  candidates: typeCandidates
}), 'factor');
Meta.Types = _seq_type["default"].info({
  elmType: Meta.Type
});

var type = function type(name, jsType, attributes) {
  // information type
  var infoType = _tuple_type["default"].info({
    heading: _heading["default"].info({
      attributes: attributes.concat([metadataAttr])
    })
  }); // corresponding ADT


  var adType = levelUp(name, jsType, infoType, 'info'); // corresponding factory

  var factorType = _tuple_type["default"].info({
    heading: _heading["default"].info({
      attributes: [_attribute["default"].info({
        name: name.toLowerCase(),
        type: adType
      })]
    })
  });

  typeCandidates.push(factorType);
  return adType;
}; // --------------------------------------------------------------- Attribute


Meta.Attribute = object('Attribute', _attribute["default"], [_attribute["default"].info({
  name: 'name',
  type: Js.String
}), _attribute["default"].info({
  name: 'type',
  type: Meta.Type
}), _attribute["default"].info({
  name: 'required',
  type: Js.Boolean,
  required: false
})]);
Meta.Attributes = _seq_type["default"].info({
  elmType: Meta.Attribute
}); // ----------------------------------------------------------------- Heading

Meta.AllowExtraOption = _ad_type["default"].info({
  jsType: _type["default"],
  contracts: [_contract["default"].info({
    name: 'any',
    infoType: Js.Boolean,
    explicit: {
      dress: function dress(bool, world) {
        if (bool === true) {
          return new _any_type["default"]();
        } else {
          return false;
        }
      },
      undress: function undress(allowExtra, world) {
        // TODO
        throw new Error('`undress` not implemented');
      }
    }
  }), _contract["default"].info({
    name: 'static',
    infoType: _union_type["default"].info({
      candidates: typeCandidates
    }),
    explicit: {
      dress: function dress(value, world) {
        return Meta.Type.dress(value, world);
      },
      undress: function undress(allowExtra, world) {
        // TODO
        throw new Error('`undress` not implemented');
      }
    }
  })]
});
Meta.BackwardCompatibleAllowExtraOption = _union_type["default"].info({
  candidates: [Meta.Type, Js.Boolean],
  name: 'BackwardCompatibleAllowExtraOption'
});
Meta.HeadingOptions = _tuple_type["default"].info({
  heading: _heading["default"].info({
    attributes: [_attribute["default"].info({
      name: 'allowExtra',
      type: Meta.AllowExtraOption
    })]
  })
});
Meta.Heading = object('Heading', _heading["default"], [_attribute["default"].info({
  name: 'attributes',
  type: Meta.Attributes
}), _attribute["default"].info({
  name: 'options',
  type: Meta.HeadingOptions,
  required: false
})]); // ---------------------------------------------------------------- Contract

Meta.Contract = _union_type["default"].info({
  candidates: [],
  name: 'Contract'
});
Meta.Contracts = _seq_type["default"].info({
  elmType: Meta.Contract
});

var contract = function contract(name, jsType, attributes) {
  var c = object(name, _contract["default"], attributes.concat([_attribute["default"].info({
    name: 'name',
    type: Js.String
  }), _attribute["default"].info({
    name: 'infoType',
    type: Meta.Type
  })]));
  Meta.Contract.candidates.push(c);
  return c;
};

Meta.Contract.Explicit = contract('Explicit', _contract["default"].Explicit, [_attribute["default"].info({
  name: 'explicit',
  type: _tuple_type["default"].info({
    heading: _heading["default"].info({
      attributes: [_attribute["default"].info({
        name: 'dress',
        type: Js.Function
      }), _attribute["default"].info({
        name: 'undress',
        type: Js.Function
      })]
    })
  })
})]);
Meta.Contract.Internal = contract('Internal', _contract["default"].Internal, [_attribute["default"].info({
  name: 'internal',
  type: Js.Type
})]);
Meta.Contract.External = contract('External', _contract["default"].External, [_attribute["default"].info({
  name: 'external',
  type: Js.Type
})]);
Meta.Contract.Identity = contract('Identity', _contract["default"].Identity, [_attribute["default"].info({
  name: 'identity',
  type: Js.Empty
})]); // -------------------------------------------------------------- Constraint

Meta.Constraint = _union_type["default"].info({
  candidates: [],
  name: 'Constraint'
});
Meta.Constraints = _seq_type["default"].info({
  elmType: Meta.Constraint
});

var constraint = function constraint(name, jsType, attributes) {
  var c = object(name, _constraint["default"], attributes.concat([_attribute["default"].info({
    name: 'name',
    type: Js.String,
    required: false
  })]));
  Meta.Constraint.candidates.push(c);
  return c;
};

Meta.Constraint.Native = constraint('Native', _constraint["default"].Native, [_attribute["default"].info({
  name: 'native',
  type: Js.Function
})]);
Meta.Constraint.Regexp = constraint('RegExp', _constraint["default"].Regexp, [_attribute["default"].info({
  name: 'regexp',
  type: Js.RegExp
})]);
Meta.Range = _union_type["default"].info({
  candidates: [_tuple_type["default"].info({
    heading: _heading["default"].info({
      attributes: [_attribute["default"].info({
        name: 'min',
        type: Js.Number
      }), _attribute["default"].info({
        name: 'min_inclusive',
        type: Js.Boolean
      }), _attribute["default"].info({
        name: 'max',
        type: Js.Number
      }), _attribute["default"].info({
        name: 'max_inclusive',
        type: Js.Boolean
      })]
    })
  }), _tuple_type["default"].info({
    heading: _heading["default"].info({
      attributes: [_attribute["default"].info({
        name: 'min',
        type: Js.Number
      }), _attribute["default"].info({
        name: 'min_inclusive',
        type: Js.Boolean
      })]
    })
  })],
  name: 'Range'
});
Meta.Constraint.Range = constraint('Range', _constraint["default"].Range, [_attribute["default"].info({
  name: 'range',
  type: Meta.Range
})]);
Meta.Constraint.Set = constraint('Set', _constraint["default"].Set, [_attribute["default"].info({
  name: 'set',
  type: Js.Array
})]); // ------------------------------------------------------------------- Types

Meta.AnyType = type('Any', _any_type["default"], []);
Meta.AdType = type('Adt', _ad_type["default"], [_attribute["default"].info({
  name: 'jsType',
  type: Js.Type,
  required: false
}), _attribute["default"].info({
  name: 'contracts',
  type: Meta.Contracts
})]);
Meta.BuiltinType = type('Builtin', _builtin_type["default"], [_attribute["default"].info({
  name: 'jsType',
  type: Js.Type
})]);
Meta.SubType = type('Sub', _sub_type["default"], [_attribute["default"].info({
  name: 'superType',
  type: Meta.Type
}), _attribute["default"].info({
  name: 'constraints',
  type: Meta.Constraints
})]);
Meta.RelationType = type('Relation', _relation_type["default"], [_attribute["default"].info({
  name: 'heading',
  type: Meta.Heading
})]);
Meta.TupleType = type('Tuple', _tuple_type["default"], [_attribute["default"].info({
  name: 'heading',
  type: Meta.Heading
})]);
Meta.SeqType = type('Seq', _seq_type["default"], [_attribute["default"].info({
  name: 'elmType',
  type: Meta.Type
})]);
Meta.SetType = type('Set', _set_type["default"], [_attribute["default"].info({
  name: 'elmType',
  type: Meta.Type
})]);
Meta.StructType = type('Struct', _struct_type["default"], [_attribute["default"].info({
  name: 'componentTypes',
  type: Meta.Types
})]);
Meta.UnionType = type('Union', _union_type["default"], [_attribute["default"].info({
  name: 'candidates',
  type: Meta.Types
})]);
Meta.TypeRef = type('Ref', _type_ref["default"], [_attribute["default"].info({
  name: 'typeName',
  type: Js.String
})]); // ------------------------------------------------------------------ System

Meta.TypeDef = object('TypeDef', _type_def["default"], [_attribute["default"].info({
  name: 'name',
  type: Js.String
}), _attribute["default"].info({
  name: 'type',
  type: Meta.Type
})]);
Meta.TypeDefs = _seq_type["default"].info({
  elmType: Meta.TypeDef
});
var systemAttrs = [_attribute["default"].info({
  name: 'types',
  type: Meta.TypeDefs
})];
Meta.System = object('System', _system["default"], systemAttrs);
Meta.Systems = _seq_type["default"].info({
  elmType: Meta.System
});
Meta.Import = object('Import', _import["default"], [_attribute["default"].info({
  name: 'qualifier',
  type: Js.String,
  required: false
}), _attribute["default"].info({
  name: 'from',
  type: Js.String
})]);
Meta.Imports = _seq_type["default"].info({
  elmType: Meta.Import
});
systemAttrs.push(_attribute["default"].info({
  name: 'imports',
  type: Meta.Imports,
  required: false
}));
var _default = Meta;
exports["default"] = _default;


},{"../contracts":4,"../support/attribute":14,"../support/constraint":16,"../support/contract":17,"../support/heading":20,"../support/import":22,"../system":25,"../type":26,"../type/ad_type":27,"../type/any_type":28,"../type/builtin_type":29,"../type/relation_type":30,"../type/seq_type":31,"../type/set_type":32,"../type/struct_type":33,"../type/sub_type":34,"../type/tuple_type":35,"../type/type_def":36,"../type/type_ref":37,"../type/union_type":38}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $u = {}; //******* Utilities

/**
  * Returns whether or not the parameter is an array
  *
  * Uses native `isArray` if present
  */

$u.isArray = function (obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return toString.call(obj) === '[object Array]';
  }
};
/**
  * Detects whether the javascript environment is a browser or not (node)
  * (naive approach)
  */


$u.isBrowser = function () {
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';
};
/**
  * Returns wheter or not the parameter is an object
  */


$u.isObject = function (obj) {
  return Object(obj) === obj;
};
/**
  * Returns wheter or not the parameter is a string
  */


$u.isString = function (arg) {
  return Object.prototype.toString.call(arg) === '[object String]';
};
/**
  * Returns wheter or not the parameter is a function
  */


$u.isFunction = function (arg) {
  return Object.prototype.toString.call(arg) === '[object Function]';
};
/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a deep copy
  */


$u.deepClone = function (obj) {
  if (obj === null || obj === undefined) {
    $u.argumentError('Object expected, got', obj);
  }

  if (!$u.isObject(obj)) {
    return obj;
  } else if (obj instanceof Function) {
    return obj;
  } else if ($u.isArray(obj)) {
    return obj.slice();
  } else {
    var copy = {};
    $u.each(obj, function (v, k) {
      copy[k] = $u.deepClone(v);
    });
    return copy;
  }
};
/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a shallow copy
  */


$u.clone = function (obj) {
  if (obj === null || obj === undefined) {
    $u.argumentError('Object expected, got', obj);
  }

  if (!$u.isObject(obj)) {
    return obj;
  }

  return $u.isArray(obj) ? obj.slice() : $u.extend({}, obj);
};
/**
  * Extends the given object with all the properties of the passsed-in obejct(s)
  */


$u.extend = function (obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  $u.each(args, function (source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

$u.triSplit = function (x, y) {
  var attrs = null;
  var cur = null;
  var shared = {},
      left = {},
      right = {}; // start with x

  attrs = $u.keys(x);

  for (var i = 0; i < attrs.length; i++) {
    cur = attrs[i];

    if (y[cur] === undefined) {
      left[cur] = x[cur];
    } else {
      shared[cur] = [x[cur], y[cur]];
    }
  } // continue with y


  attrs = $u.keys(y);

  for (var _i = 0; _i < attrs.length; _i++) {
    cur = attrs[_i];

    if (shared[cur] === undefined) {
      right[cur] = y[cur];
    }
  }

  return [shared, left, right];
}; //******* ARRAY


$u.zip = function (dest) {
  if (!$u.isArray(dest)) {
    $u.argumentError('Array expected, got', dest);
  } //


  var sources = Array.prototype.slice.call(arguments, 1); // Check validity first

  $u.each(sources, function (source) {
    if (!$u.isArray(source)) {
      $u.argumentError('Array expected, got', source);
    }

    if ($u.size(source) !== $u.size(dest)) {
      $u.argumentError('Source(s) and destination Arrays must have same size');
    }
  }); // Zip!

  var result = $u.map(dest, function (v, i) {
    var array = [];
    array.push(v);
    $u.each(sources, function (source) {
      array.push(source[i]);
    });
    return array;
  });
  return result;
};

$u.difference = function (objA, objB) {
  if (!$u.isArray(objA)) {
    $u.argumentError('Array expected, got', objA);
  }

  if (!$u.isArray(objB)) {
    $u.argumentError('Array expected, got', objB);
  }

  return $u.filter(objA, function (v) {
    return !$u.contains(objB, v);
  });
};

$u.uniq = function (array, isSorted) {
  if (!$u.isArray(array)) {
    $u.argumentError('Array expected, got', array);
  }

  if (typeof isSorted === 'undefined') {
    isSorted = false;
  }

  var result = [];
  var seen = [];

  for (var i = 0, length = array.length; i < length; i++) {
    var value = array[i];

    if (isSorted ? !i || seen !== value : !$u.contains(seen, value)) {
      if (isSorted) {
        seen = value;
      } else {
        seen.push(value);
      }

      result.push(array[i]);
    }
  }

  return result;
};

$u.inject = function (obj, start, callback) {
  // no date, regexp, undefined or null please
  if (!(obj instanceof Array)) {
    $u.argumentError('Array expected, got', obj);
  }

  var res = start;

  for (var i = 0; i < obj.length; i++) {
    res = callback(res, obj[i]);
  }

  return res;
}; //******* ENUMERABLE

/**
  * Returns whether or not a given object is enumerable
  */


$u.isEnumerable = function (obj) {
  if (obj === undefined || obj === null || obj instanceof RegExp || obj instanceof Date || typeof obj === 'boolean') {
    return false;
  }

  return true;
};
/**
  * Iterates over an Enumerable (String, Array, Object)
  * ! warning: Doesn't iterates RegExp, Date, Boolean, undefined, null
  *
  * On String:  callback(character, position)
  * On Array:   callback(value, position)
  * On Objects: callback(value, key)
  *
  * TODO: use *forEach* if present
  */


$u.each = function (obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null) {
    throw new Error('Function expected, got null');
  }

  if (callback === undefined) {
    callback = function callback() {};
  } // no date, regexp, undefined or null please


  if (!$u.isEnumerable(obj)) {
    throw new Error("Enumerable (Array, Object, String) expected, got ".concat(obj));
  } // Strings


  if (typeof obj === 'string') {
    return $u.each(obj.split(''), callback);
  } // Arrays


  if (obj instanceof Array) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i);
    }

    return;
  } // Objects


  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      callback(obj[key], key);
    }
  }
};
/**
  * Returns true if all of the iteration over the enumerable pass the predicate truth test
  *
  * Uses #each to iterate
  * TODO: delegate to *every* if present
  */


$u.every = function (obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    $u.argumentError('Function expected, got', callback);
  } // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)


  try {
    $u.each(obj, function (v, k) {
      var pass = callback(v, k);

      if (pass !== true) {
        throw 'fail';
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (e !== 'fail') {
      throw e;
    }

    return false;
  }

  return true;
};
/**
  * Returns the first element that apsses a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */


$u.find = function (obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    $u.argumentError('Function expected, got', callback);
  } // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)


  try {
    $u.each(obj, function (v, k) {
      var pass = callback(v, k);

      if (pass) {
        throw {
          found: v
        };
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (typeof e.found === 'undefined') {
      throw e;
    }

    return e.found;
  }

  return null;
};
/**
  * Returns true if any of the iteration over the enumerable pass the predicate truth test
  *
  * Uses #each to iterate
  */


$u.any = function (obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    $u.argumentError('Function expected, got', callback);
  } // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)


  try {
    $u.each(obj, function (v, k) {
      var pass = callback(v, k);

      if (pass === true) {
        throw 'gotcha';
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (e !== 'gotcha') {
      throw e;
    }

    return true;
  }

  return false;
};
/**
  * Returns the values of an enumerable that pass a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */


$u.filter = function (obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    $u.argumentError('Function expected, got', callback);
  }

  var values = [];
  $u.each(obj, function (v) {
    if (callback(v)) {
      values.push(v);
    }
  });
  return values;
};
/**
  * Returns the values of an enumerable that don't pass the truth test
  * (the exact opposite as $u.filter)
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */


$u.reject = function (obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    $u.argumentError('Function expected, got', callback);
  }

  var values = [];
  $u.each(obj, function (v) {
    if (!callback(v)) {
      values.push(v);
    }
  });
  return values;
};
/**
  * Produces a new array of values by mapping each value in list through a
  * transformation function
  *
  * Uses #each to iterate
  * TODO: use *map* if present
  */


$u.map = function (obj, callback) {
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined) {
    $u.argumentError('Function expected, got', callback);
  }

  var values = [];
  $u.each(obj, function (v, k) {
    values.push(callback(v, k));
  });
  return values;
};
/**
  * Reduces collection to a value which is the accumulated result of running each element in collection through callback
  * where each successive invocation is supplied the return value of the previous
  * The iteratee is invoked with four arguments: (accumulator, value, index|key, collection).
  */


$u.reduce = function (collection, accumulator, callback) {
  if (callback === null || callback === undefined) {
    $u.argumentError('Function expected, got', callback);
  }

  $u.each(collection, function (v, k) {
    accumulator = callback(accumulator, v, k, collection);
  });
  return accumulator;
};
/**
  * Returns the values of an Enumerable (Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-enumerable
  *
  * Uses #each to iterate
  */


$u.values = function (obj) {
  if (obj instanceof Array) {
    return obj;
  }

  var values = [];
  $u.each(obj, function (v) {
    values.push(v);
  });
  return values;
};
/**
  * Returns the keys of an Enumerable (Enumerable (String, Array, Object)
  *
  * String: array of character positions
  * Array: array of indices
  * Objects: array of keys
  *
  * ! warning: throws error if called for a non-enumerable
  * ! warning: all keys will be strings, whatever is the enumerable
  *
  * Uses #each to iterate
  */


$u.keys = function (obj) {
  var keys = [];
  $u.each(obj, function (v, k) {
    keys.push(k);
  });
  return keys;
};
/**
  * Returns the number of values of an Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-object (even Array)
  *
  * Uses #each to iterate
  */


$u.size = function (obj) {
  var values = $u.values(obj);
  return values.length;
};
/**
  * Returns whether or not an enumerable is empty
  */


$u.isEmpty = function (obj) {
  return $u.size(obj) === 0;
}; // Determine if the array or object contains a given value (using `===`).
// Aliased as `include`.


$u.contains = $u.include = function (obj, target) {
  if (!$u.isEnumerable(obj)) {
    $u.argumentError('Enumerable (Array, Object, String) expected, got', obj);
  }

  var nativeIndexOf = Array.prototype.indexOf;

  if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
    return obj.indexOf(target) !== -1;
  }

  var found = $u.find(obj, function (v) {
    return v === target;
  });
  return found !== null;
}; //******* STRINGS

/**
  * Capitalizes a string
  *
  * foo => Foo
  * fooBar => FooBar
  * foo bar => FooBar
  * foo_bar => FooBar
  **/


$u.capitalize = function (obj) {
  if (typeof obj !== 'string') {
    $u.argumentError('String expected, got', obj);
  }

  if (obj.trim() === '') {
    return obj;
  }

  var string = obj,
      tokens = null,
      i = null; // Remove underscores

  if (string.indexOf('_') !== -1) {
    tokens = string.split('_');

    for (i = 0; i < tokens.length; i++) {
      tokens[i] = $u.capitalize(tokens[i]);
    }

    string = tokens.join('');
  } // Remove spaces


  if (string.indexOf(' ') !== -1) {
    tokens = string.split(' ');

    for (i = 0; i < tokens.length; i++) {
      tokens[i] = $u.capitalize(tokens[i]);
    }

    string = tokens.join('');
  } // Capitalize first letter


  string = string[0].toUpperCase() + string.slice(1);
  return string;
};

$u.toString = function (value) {
  if (value === undefined) {
    return 'undefined';
  } else if (value === null) {
    return 'null';
  } else {
    var s = value.toString();

    if (s === '[object Object]') {
      s = JSON.stringify(value);
    }

    if (s.length > 30) {
      s = "".concat(s.substring(0, 30), "...");
    }

    if (value instanceof Array) {
      s = "[".concat(s, "]");
    }

    return s;
  }
}; // ---------------------------------------------------------- Error Management


$u.argumentError = function () {
  var msg = '';

  var toString = function toString(arg) {
    if (arg === null) {
      return 'null';
    } else if (arg === undefined) {
      return 'undefined';
    } else {
      return arg.toString();
    }
  };

  $u.each(arguments, function (arg) {
    if (msg.length !== 0) {
      msg += ' ';
    }

    msg += toString(arg);
  });
  throw new Error(msg);
};

$u.notImplemented = function (obj, meth) {
  throw new Error("".concat(obj.constructor.name, "#").concat(meth));
};

$u.dressError = function (failure) {
  var E = require('../errors')["default"];

  var e = new E(failure);
  console.log(JSON.stringify(e.children, null, 2));
  throw e;
};

$u.undressError = function (msg, cause, location) {
  throw new Error(msg, cause, location);
}; //


var _default = $u;
exports["default"] = _default;


},{"../errors":10}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("./support/ic");

var _utils = _interopRequireDefault(require("./support/utils"));

var _fetchable = _interopRequireDefault(require("./support/fetchable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// A System is a collection of named Finitio types.
//
var System = /*#__PURE__*/function () {
  function System(imports, types) {
    var _this = this;

    _classCallCheck(this, System);

    this.imports = imports;
    this.types = types;

    if (this.imports == null) {
      this.imports = [];
    }

    if (this.types == null) {
      this.types = [];
    }

    _utils["default"].each(this.types, function (t) {
      return _this[t.name] = t.trueOne();
    });
  }

  _createClass(System, [{
    key: "resolve",
    value: function resolve(ref, callback) {
      var match = ref.match(System.REF_RGX);

      if (match[1]) {
        return this._resolveQualified(match, callback);
      } else {
        var relevant = _utils["default"].filter(this.imports, function (i) {
          return !i.qualifier;
        });

        return this._resolveImported([{
          system: this
        }].concat(relevant), ref, callback);
      }
    }
  }, {
    key: "dress",
    value: function dress(value, world) {
      if (!this.Main) {
        throw new Error('No main on System');
      }

      return this.Main.dress(value, world);
    }
  }, {
    key: "undress",
    value: function undress(value, world) {
      if (!this.Main) {
        throw new Error('No main on System');
      }

      return this.Main.undress(value, this.Main.low());
    }
  }, {
    key: "clone",
    value: function clone() {
      return new System(_utils["default"].clone(this.imports), _utils["default"].clone(this.types));
    }
  }, {
    key: "subsystem",
    value: function subsystem(source, world) {
      var Finitio = require('../finitio')["default"];

      if (typeof source === 'string') {
        source = Finitio.parse(source);
      }

      var newsource = {
        types: [].concat(this.types, source.types).filter(Boolean),
        imports: [].concat(this.imports, source.imports).filter(Boolean)
      };
      return Finitio.Meta.System.dress(newsource, Finitio.world(world));
    } // Private

  }, {
    key: "_resolveQualified",
    value: function _resolveQualified(match, callback) {
      var sub;

      if (callback == null) {
        callback = this._onResolveFailure(match[0]);
      }

      var imp = _utils["default"].find(this.imports, function (u) {
        return u.qualifier === match[1];
      });

      if (sub = imp && imp.system) {
        return this._resolveSingle(sub, match[2], callback);
      } else {
        return this._onResolveFailure(match[0])();
      }
    }
  }, {
    key: "_resolveImported",
    value: function _resolveImported(chain, ref, callback) {
      var _this2 = this;

      if (callback == null) {
        callback = this._onResolveFailure(ref);
      }

      return chain[0].system.fetchPath(ref, function () {
        if (chain.length > 1) {
          return _this2._resolveImported(chain.slice(1), ref, callback);
        } else {
          return callback();
        }
      });
    }
  }, {
    key: "_resolveSingle",
    value: function _resolveSingle(system, ref, callback) {
      return system.fetchPath(ref, callback);
    }
  }, {
    key: "_onResolveFailure",
    value: function _onResolveFailure(ref) {
      return function () {
        throw new Error("No such type `".concat(ref, "`"));
      };
    }
  }]);

  return System;
}();

_defineProperty(System, "REF_RGX", /^(?:([a-z][a-z0-9]*)\.)?(.*?)$/);

(0, _ic.ObjectType)(System, ['imports', 'types'], function (s) {
  return _utils["default"].each(s.types, function (t) {
    return t.resolveProxies(s);
  });
});
(0, _fetchable["default"])(System, 'types', 'type', function (name) {
  return _utils["default"].find(this.types, function (t) {
    return t.name === name;
  });
}); //

var _default = System;
exports["default"] = _default;


},{"../finitio":2,"./support/fetchable":19,"./support/ic":21,"./support/utils":24}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./support/utils"));

var _dress_monad = _interopRequireDefault(require("./support/dress_monad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//
// 'Abstract' class for Finitio types
//
var Type = /*#__PURE__*/function () {
  function Type(metadata) {
    _classCallCheck(this, Type);

    this.metadata = metadata;
  }

  _createClass(Type, [{
    key: "toFactor",
    value: function toFactor() {
      var to = {};
      to[this.generator] = this;
      return to;
    } //
    // Returns true if `value` is valid member of this type, false otherwise.
    //

  }, {
    key: "include",
    value: function include(value) {
      return this._include(value);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return _utils["default"].notImplemented(this, 'include');
    } //
    // Dress `value` with this information type and returns the result.
    //
    // @return the dressing result
    // @pre    true
    // @post   this.include(output)
    // @throws `TypeError` if the dressing fails
    //

  }, {
    key: "dress",
    value: function dress(value, world) {
      var monad = this.mDress(value, new _dress_monad["default"](world));

      if (monad.isSuccess()) {
        return monad.result;
      } else {
        return _utils["default"].dressError(monad.error);
      }
    }
  }, {
    key: "mDress",
    value: function mDress(value, Monad) {
      return this._mDress(value, Monad);
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      return _utils["default"].notImplemented(this, '_mDress');
    } //
    // Undress `value` as a member of `as` type.
    //
    // @param  `as` another Type instance
    // @return the undressed result
    // @pre    this.include(value)
    // @post   as.include(output)
    // @throw  `TypeError` if undressing fails
    //

  }, {
    key: "undress",
    value: function undress(value, as) {
      return this._undress(value, as.trueOne());
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      // if `as` is a supertype of myself, then
      //   pre                 => post
      //   this.include(value) => as.include(value)
      if (as.isSuperTypeOf(this)) {
        return value;
      } // Fall back to checking post condition explicitely


      if (as.include(value)) {
        return value;
      } // otherwise, just fail


      return _utils["default"].undressError("Unable to undress `".concat(value, "` from ").concat(this, " to `").concat(as, "`"));
    } //
    // Returns true of `this` is a super type of `other`, false otherwise.
    //

  }, {
    key: "isSuperTypeOf",
    value: function isSuperTypeOf(other) {
      return this._isSuperTypeOf(other.trueOne());
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(other) {
      return this.equals(other) || other._isSubTypeOf(this);
    } //
    // Returns true if `this` is known to be a subtype of `other`, false
    // otherwise.
    //
    // This method is private and should not be called directly. It is a fallback
    // strategy for isSuperTypeOf.
    //
    // The implementation MAY NOT call `isSuperTypeOf` to meet the contract. So
    // if you wonder whether `x.isSubTypeOf(y)`, use `y.isSuperTypeOf(x)`
    // instead.
    //

  }, {
    key: "_isSubTypeOf",
    value: function _isSubTypeOf(other) {
      return false;
    } //
    // Returns this
    //

  }, {
    key: "fetchType",
    value: function fetchType() {
      return this;
    } //
    // Returns true for fake types, false otherwise.
    //
    // Fake types are Alias and Proxy.
    //

  }, {
    key: "isFake",
    value: function isFake() {
      return false;
    } //
    // Returns the true type to be used in comparisons and hierachy queries
    //

  }, {
    key: "trueOne",
    value: function trueOne() {
      return this;
    } //
    // Returns true if `other` is structurally equivalent to this type, false
    // otherwise.
    //

  }, {
    key: "equals",
    value: function equals(other) {
      return other instanceof Type && this._equals(other.trueOne());
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this === other;
    }
  }], [{
    key: "factor",
    value: function factor(from) {
      return from[Object.keys(from)[0]];
    }
  }]);

  return Type;
}();

var _default = Type;
exports["default"] = _default;


},{"./support/dress_monad":18,"./support/utils":24}],27:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _fetchable = _interopRequireDefault(require("../support/fetchable"));

var _contract = _interopRequireDefault(require("../support/contract"));

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AdType = /*#__PURE__*/function (_Type) {
  _inherits(AdType, _Type);

  var _super = _createSuper(AdType);

  function AdType(jsType, contracts, metadata) {
    var _this;

    _classCallCheck(this, AdType);

    _this = _super.call(this, metadata);
    _this.jsType = jsType;
    _this.contracts = contracts;

    if (_this.jsType && !(_this.jsType instanceof Function)) {
      _utils["default"].argumentError('Constructor (function) expected, got:', _this.jsType);
    }

    if (!_utils["default"].isArray(_this.contracts)) {
      _utils["default"].argumentError('[Contract] expected, got:', _this.contracts);
    }

    if (!_utils["default"].every(_this.contracts, function (c) {
      return c instanceof _contract["default"];
    })) {
      _utils["default"].argumentError('[Contract] expected, got:', _this.contracts);
    }

    return _this;
  }

  _createClass(AdType, [{
    key: "contractNames",
    value: function contractNames() {
      return _utils["default"].map(this.contracts, function (c) {
        return c.name;
      });
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return value.constructor === this.jsType;
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this3 = this;

      if (this.jsType && value instanceof this.jsType) {
        return Monad.success(value);
      }

      var callback = function callback(contract) {
        var _this2 = this;

        var m = contract.infoType.mDress(value, Monad);
        return m.onSuccess(function (result) {
          try {
            return Monad.success(contract.dress(result, Monad.world));
          } catch (e) {
            return Monad.failure(_this2, "Dresser failed: ".concat(e.message), [e]);
          }
        });
      };

      var onFailure = function onFailure(causes) {
        var params = [_this3.jsType && _this3.jsType.name || 'value', value];
        return Monad.failure(_this3, ['Invalid ${typeName}: `${value}`', params], causes);
      };

      return Monad.find(this.contracts, callback, onFailure);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      if (!this.jsType) {
        return value;
      }

      var candidate = null;

      if (_utils["default"].size(this.contracts) === 1) {
        // if only one contract let it do its job
        candidate = this.contracts[0];
      } else {
        // otherwise, find the good one
        candidate = _utils["default"].find(this.contracts, function (c) {
          return c.infoType.isSuperTypeOf(as);
        });
      }

      if (candidate != null) {
        return candidate.infoType.undress(candidate.undress(value), as);
      } else {
        return _get(_getPrototypeOf(AdType.prototype), "_undress", this).apply(this, arguments);
      }
    }
  }, {
    key: "low",
    value: function low() {
      return this.contracts[0].infoType.low();
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return _utils["default"].each(this.contracts, function (c) {
        return c.resolveProxies(system);
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      return _utils["default"].map(this.contracts, function (c) {
        return c.toString();
      }).join(', ');
    }
  }]);

  return AdType;
}(_type["default"]);

(0, _ic.TypeType)(AdType, 'adt', ['jsType', 'contracts', 'metadata']);
(0, _fetchable["default"])(AdType, 'contracts', 'contract', function (name) {
  return _utils["default"].find(this.contracts, function (c) {
    return c.name === name;
  });
}); //

var _default = AdType;
exports["default"] = _default;


},{"../support/contract":17,"../support/fetchable":19,"../support/ic":21,"../support/utils":24,"../type":26}],28:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//
var AnyType = /*#__PURE__*/function (_Type) {
  _inherits(AnyType, _Type);

  var _super = _createSuper(AnyType);

  function AnyType(metadata) {
    _classCallCheck(this, AnyType);

    return _super.call(this, metadata);
  }

  _createClass(AnyType, [{
    key: "_mDress",
    value: function _mDress(value, Monad) {
      return Monad.success(value);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return true;
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(other) {
      return true;
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return other instanceof AnyType || _get(_getPrototypeOf(AnyType.prototype), "_equals", this).apply(this, arguments);
    }
  }, {
    key: "low",
    value: function low() {
      return this;
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {}
  }, {
    key: "toString",
    value: function toString() {
      return '.';
    }
  }]);

  return AnyType;
}(_type["default"]);

(0, _ic.TypeType)(AnyType, 'any', ['metadata']);
var _default = AnyType;
exports["default"] = _default;


},{"../support/ic":21,"../type":26}],29:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//
var BuiltinType = /*#__PURE__*/function (_Type) {
  _inherits(BuiltinType, _Type);

  var _super = _createSuper(BuiltinType);

  function BuiltinType(jsType, metadata) {
    var _this;

    _classCallCheck(this, BuiltinType);

    _this = _super.call(this, metadata);
    _this.jsType = jsType;
    return _this;
  }

  _createClass(BuiltinType, [{
    key: "_equals",
    value: function _equals(other) {
      return this === other || other instanceof BuiltinType && other.jsType === this.jsType || _get(_getPrototypeOf(BuiltinType.prototype), "_equals", this).call(this, other);
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      if (this.include(value)) {
        return Monad.success(value);
      } else {
        var params = [this.jsType.name, value];
        return Monad.failure(this, ['Invalid ${typeName}: `${value}`', params]);
      }
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return value instanceof this.jsType || value != null && value.constructor === this.jsType;
    }
  }, {
    key: "low",
    value: function low() {
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return ".".concat(this.jsType.name.toString());
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {}
  }]);

  return BuiltinType;
}(_type["default"]);

(0, _ic.TypeType)(BuiltinType, 'builtin', ['jsType', 'metadata']);
var _default = BuiltinType;
exports["default"] = _default;


},{"../support/ic":21,"../type":26}],30:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _type = _interopRequireDefault(require("../type"));

var _collection_type = _interopRequireDefault(require("../support/collection_type"));

var _tuple_type = _interopRequireDefault(require("../type/tuple_type"));

var _heading = _interopRequireDefault(require("../support/heading"));

var _utils = _interopRequireDefault(require("../support/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RelationType = /*#__PURE__*/function (_Type) {
  _inherits(RelationType, _Type);

  var _super = _createSuper(RelationType);

  function RelationType(heading, metadata) {
    var _this;

    _classCallCheck(this, RelationType);

    _this = _super.call(this, metadata);
    _this.heading = heading;

    if (!(_this.heading instanceof _heading["default"])) {
      _utils["default"].argumentError('Heading expected, got:', _this.heading);
    }

    return _this;
  }

  _createClass(RelationType, [{
    key: "fetch",
    value: function fetch() {
      return this.heading.fetch.apply(this.heading, arguments);
    }
  }, {
    key: "tupleType",
    value: function tupleType() {
      return this.tupleTypeCache != null ? this.tupleTypeCache : this.tupleTypeCache = new _tuple_type["default"](this.heading);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      var _this2 = this;

      return value instanceof Array && _utils["default"].every(value, function (tuple) {
        return _this2.tupleType().include(tuple);
      });
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      if (!(value instanceof Array)) {
        return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
      }

      var tupleType = this.tupleType();
      var index = {};

      var mapper = function mapper(elm) {
        var m = tupleType.mDress(elm, Monad);
        return m.onSuccess(function (tuple) {
          var h = JSON.stringify(tuple);

          if (index[h]) {
            return Monad.failure(this, ['Duplicate Tuple: `${value}`', [tuple]]);
          } else {
            index[h] = tuple;
            return m;
          }
        });
      };

      var onFailure = function onFailure(causes) {
        return Monad.failure(this, ['Invalid ${typeName}', ['Relation']], causes);
      };

      return Monad.map(value, mapper, onFailure);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      if (!(as instanceof RelationType) && !(as instanceof _collection_type["default"])) {
        _utils["default"].undressError("Unable to undress `".concat(value, "` to `").concat(as, "`"));
      }

      var from = this.tupleType();
      var to = as instanceof RelationType ? as.tupleType() : as.elmType;
      return _utils["default"].map(value, function (val) {
        return from.undress(val, to);
      });
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(other) {
      return this === other || other instanceof RelationType && this.heading.isSuperHeadingOf(other.heading);
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this === other || other instanceof RelationType && this.heading.equals(other.heading) || _get(_getPrototypeOf(RelationType.prototype), "_equals", this).apply(this, arguments);
    }
  }, {
    key: "low",
    value: function low() {
      return new RelationType(this.heading.low());
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.heading.resolveProxies(system);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "{{ ".concat(this.heading.toString(), " }}");
    }
  }]);

  return RelationType;
}(_type["default"]);

(0, _ic.TypeType)(RelationType, 'relation', ['heading', 'metadata']); //

var _default = RelationType;
exports["default"] = _default;


},{"../support/collection_type":15,"../support/heading":20,"../support/ic":21,"../support/utils":24,"../type":26,"../type/tuple_type":35}],31:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _collection_type = _interopRequireDefault(require("../support/collection_type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SeqType = /*#__PURE__*/function (_CollectionType) {
  _inherits(SeqType, _CollectionType);

  var _super = _createSuper(SeqType);

  function SeqType() {
    _classCallCheck(this, SeqType);

    return _super.apply(this, arguments);
  }

  _createClass(SeqType, [{
    key: "_include",
    value: function _include(value) {
      var _this = this;

      return value instanceof Array && _utils["default"].every(value, function (v) {
        return _this.elmType.include(v);
      });
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this2 = this;

      if (!(value instanceof Array)) {
        return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
      }

      var mapper = function mapper(elm) {
        return _this2.elmType.mDress(elm, Monad);
      };

      var onFailure = function onFailure(causes) {
        return Monad.failure(_this2, ['Invalid ${typeName}', ['Sequence']], causes);
      };

      return Monad.map(value, mapper, onFailure);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      if (!(as instanceof SeqType)) {
        _utils["default"].undressError("Unable to undress `".concat(value, "` to `").concat(as, "`"));
      }

      return _get(_getPrototypeOf(SeqType.prototype), "_undress", this).apply(this, arguments);
    }
  }, {
    key: "low",
    value: function low() {
      return new SeqType(this.elmType.low());
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.elmType.resolveProxies(system);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[".concat(this.elmType.toString(), "]");
    }
  }]);

  return SeqType;
}(_collection_type["default"]);

(0, _ic.TypeType)(SeqType, 'seq', ['elmType', 'metadata']); //

var _default = SeqType;
exports["default"] = _default;


},{"../support/collection_type":15,"../support/ic":21,"../support/utils":24}],32:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _collection_type = _interopRequireDefault(require("../support/collection_type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SetType = /*#__PURE__*/function (_CollectionType) {
  _inherits(SetType, _CollectionType);

  var _super = _createSuper(SetType);

  function SetType() {
    _classCallCheck(this, SetType);

    return _super.apply(this, arguments);
  }

  _createClass(SetType, [{
    key: "_include",
    value: function _include(value) {
      var _this = this;

      if (!(value instanceof Array)) {
        return false;
      }

      if (!_utils["default"].every(value, function (v) {
        return _this.elmType.include(v);
      })) {
        return false;
      }

      return _utils["default"].uniq(value).length === value.length;
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this2 = this;

      if (!(value instanceof Array)) {
        return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
      }

      var mapper = function mapper(elm) {
        return _this2.elmType.mDress(elm, Monad);
      };

      var onFailure = function onFailure(causes) {
        return Monad.failure(_this2, ['Invalid ${typeName}', ['Set']], causes);
      };

      var m = Monad.map(value, mapper, onFailure);

      var findDuplicate = function findDuplicate(set) {
        return _utils["default"].find(set, function (elm, i) {
          return set.indexOf(elm) !== i;
        });
      };

      return m.onSuccess(function (set) {
        var d;

        if (!(d = findDuplicate(set))) {
          return m;
        }

        var err = Monad.failure(_this2, ['Duplicate value: `${value}`', [d]]);
        return err.onFailure(function (cause) {
          return Monad.failure(_this2, 'Invalid Set', [cause]);
        });
      });
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      if (!(as instanceof _collection_type["default"])) {
        _utils["default"].undressError("Unable to undress `".concat(value, "` to `").concat(as, "`"));
      }

      return _get(_getPrototypeOf(SetType.prototype), "_undress", this).apply(this, arguments);
    }
  }, {
    key: "low",
    value: function low() {
      return new SetType(this.elmType.low());
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.elmType.resolveProxies(system);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "{".concat(this.elmType.toString(), "}");
    }
  }]);

  return SetType;
}(_collection_type["default"]);

(0, _ic.TypeType)(SetType, 'set', ['elmType', 'metadata']); //

var _default = SetType;
exports["default"] = _default;


},{"../support/collection_type":15,"../support/ic":21,"../support/utils":24}],33:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var StructType = /*#__PURE__*/function (_Type) {
  _inherits(StructType, _Type);

  var _super = _createSuper(StructType);

  function StructType(componentTypes, metadata) {
    var _this;

    _classCallCheck(this, StructType);

    _this = _super.call(this, metadata);
    _this.componentTypes = componentTypes;

    if (!_utils["default"].isArray(_this.componentTypes)) {
      _utils["default"].argumentError('[Finitio::Type] expected, got:', _this.componentTypes);
    }

    var wrongType = _utils["default"].find(_this.componentTypes, function (t) {
      return !(t instanceof _type["default"]);
    });

    if (wrongType != null) {
      _utils["default"].argumentError('[Finitio::Type] expected, got:', wrongType);
    }

    return _this;
  }

  _createClass(StructType, [{
    key: "size",
    value: function size() {
      return _utils["default"].size(this.componentTypes);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return _utils["default"].isArray(value) && _utils["default"].size(value) === _utils["default"].size(this.componentTypes) && _utils["default"].every(_utils["default"].zip(value, this.componentTypes), function (valueAndKey) {
        var type;

        var _valueAndKey = _slicedToArray(valueAndKey, 2);

        value = _valueAndKey[0];
        type = _valueAndKey[1];
        return type.include(value);
      });
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this2 = this;

      if (!(value instanceof Array)) {
        return Monad.failure(this, ['Array expected, got: `${value}`', [value]]);
      }

      if (value.length !== this.size()) {
        return Monad.failure(this, ['Struct size mismatch: ${a} for ${b}', [value.length, this.size()]]);
      }

      var mapper = function mapper(type, index) {
        return type.mDress(value[index], Monad);
      };

      var onFailure = function onFailure(causes) {
        var params = ['Struct', value];
        return Monad.failure(_this2, ['Invalid ${typeName}: `${value}`', params], causes);
      };

      return Monad.map(this.componentTypes, mapper, onFailure);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      if (!(as instanceof StructType)) {
        _utils["default"].undressError("Unable to undress `".concat(value, "` to `").concat(as, "`"));
      }

      if (as.size() !== this.size()) {
        _utils["default"].undressError("Unable to undress `".concat(value, "` to `").concat(as, "`"));
      }

      var from = this.componentTypes;
      var to = as.componentTypes;
      return _utils["default"].map(value, function (v, i) {
        return from[i].undress(v, to[i]);
      });
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(other) {
      return this === other || other instanceof StructType && _utils["default"].size(this.componentTypes) === _utils["default"].size(other.componentTypes) && _utils["default"].every(_utils["default"].zip(this.componentTypes, other.componentTypes), function (cs) {
        return cs[0].isSuperTypeOf(cs[1]);
      });
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this === other || other instanceof StructType && this.headingEquals(other) || _get(_getPrototypeOf(StructType.prototype), "_equals", this).apply(this, arguments);
    }
  }, {
    key: "headingEquals",
    value: function headingEquals(other) {
      return _utils["default"].size(this.componentTypes) === _utils["default"].size(other.componentTypes) && _utils["default"].every(this.componentTypes, function (t, i) {
        return other.componentTypes[i].equals(t);
      });
    }
  }, {
    key: "low",
    value: function low() {
      var remapped = _utils["default"].map(this.componentTypes, function (t) {
        return t.low();
      });

      return new StructType(remapped);
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return _utils["default"].each(this.componentTypes, function (c) {
        return c.resolveProxies(system);
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      return "<".concat(_utils["default"].map(this.componentTypes, function (t) {
        return t.toString();
      }).join(','), ">");
    }
  }]);

  return StructType;
}(_type["default"]);

(0, _ic.TypeType)(StructType, 'struct', ['componentTypes', 'metadata']);
var _default = StructType;
exports["default"] = _default;


},{"../support/ic":21,"../support/utils":24,"../type":26}],34:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _fetchable = _interopRequireDefault(require("../support/fetchable"));

var _type = _interopRequireDefault(require("../type"));

var _constraint = _interopRequireDefault(require("../support/constraint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SubType = /*#__PURE__*/function (_Type) {
  _inherits(SubType, _Type);

  var _super = _createSuper(SubType);

  function SubType(superType, constraints, metadata) {
    var _this;

    _classCallCheck(this, SubType);

    _this = _super.call(this, metadata);
    _this.superType = superType;
    _this.constraints = constraints;

    if (!(_this.superType instanceof _type["default"])) {
      _utils["default"].argumentError('Finitio.Type expected, got', _this.superType);
    }

    if (_this.constraints.constructor !== Array) {
      _utils["default"].argumentError('Array expected for constraints, got', _this.constraints);
    }

    if (!(_this.constraints.length > 0)) {
      _utils["default"].argumentError('Empty constraints not allowed on SubType');
    }

    if (!_utils["default"].every(_this.constraints, function (c) {
      return c instanceof _constraint["default"];
    })) {
      _utils["default"].argumentError('Array of constraints expected, got', _this.constraints);
    }

    return _this;
  }

  _createClass(SubType, [{
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this2 = this;

      var success = this.superType.mDress(value, Monad);

      var callback = function callback(_, constraint) {
        if (constraint.accept(success.result)) {
          return success;
        } else {
          var msg, params;

          if (constraint.name != null) {
            msg = 'Invalid ${typeName} (not ${cName}): `${value}`';
            params = ['value', constraint.name, value];
          } else {
            msg = 'Invalid ${typeName}: `${value}`';
            params = ['value', value];
          }

          return Monad.failure(constraint, [msg, params]);
        }
      };

      var onFailure = function onFailure(causes) {
        return Monad.failure(_this2, causes[0].error);
      };

      return Monad.refine(success, this.constraints, callback, onFailure);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return this.superType.include(value) && _utils["default"].every(this.constraints, function (c) {
        return c.accept(value);
      });
    }
  }, {
    key: "_isSubTypeOf",
    value: function _isSubTypeOf(other) {
      // if my supertype is itself a subtype of other, then its ok
      // otherwise, we just know nothing unless the constraint can be analyzed.
      return other.isSuperTypeOf(this.superType);
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this === other || other instanceof SubType && this.superTypeEquals(other) && this.constraintsEquals(other) || _get(_getPrototypeOf(SubType.prototype), "_equals", this).call(this, other);
    }
  }, {
    key: "low",
    value: function low() {
      return this.superType.low();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.superType.toString(), "( x | ... )");
    } // private

  }, {
    key: "superTypeEquals",
    value: function superTypeEquals(other) {
      return this.superType.equals(other.superType);
    }
  }, {
    key: "constraintsEquals",
    value: function constraintsEquals(other) {
      return this.constraints.length === other.constraints.length && _utils["default"].every(_utils["default"].zip(this.constraints, other.constraints), function (pair) {
        return pair[0].equals(pair[1]);
      });
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.superType.resolveProxies(system);
    }
  }]);

  return SubType;
}(_type["default"]);

(0, _ic.TypeType)(SubType, 'sub', ['superType', 'constraints', 'metadata']);
(0, _fetchable["default"])(SubType, 'constraints', 'constraint', function (name) {
  return _utils["default"].find(this.constraints, function (c) {
    return c.name === name;
  });
});
var _default = SubType;
exports["default"] = _default;


},{"../support/constraint":16,"../support/fetchable":19,"../support/ic":21,"../support/utils":24,"../type":26}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _type = _interopRequireDefault(require("../type"));

var _heading = _interopRequireDefault(require("../support/heading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _attributesHash = function _attributesHash(heading) {
  var h = {};
  heading.each(function (a) {
    return h[a.name] = a;
  });
  return h;
};

var TupleType = /*#__PURE__*/function (_Type) {
  _inherits(TupleType, _Type);

  var _super = _createSuper(TupleType);

  function TupleType(heading, metadata) {
    var _this;

    _classCallCheck(this, TupleType);

    _this = _super.call(this, metadata);
    _this.heading = heading;

    if (!(_this.heading instanceof _heading["default"])) {
      _utils["default"].argumentError('Heading expected, got:', _this.heading);
    }

    return _this;
  }

  _createClass(TupleType, [{
    key: "fetch",
    value: function fetch() {
      return this.heading.fetch.apply(this.heading, arguments);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      if (_typeof(value) !== 'object') {
        return false;
      }

      if (!this.areAttributesValid(value)) {
        return false;
      }

      return _utils["default"].every(this.heading.attributes, function (attribute) {
        if (value[attribute.name] != null) {
          var attr_val = value[attribute.name];
          return attribute.type.include(attr_val);
        } else {
          return true;
        }
      });
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this2 = this;

      if (!(value instanceof Object)) {
        return Monad.failure(this, ['Invalid Tuple: `${value}`', [value]]);
      }

      var result = {};
      var success = Monad.success(result);

      var callback = function callback(_, attrName) {
        var m, subm;
        var attr = _this2.heading.getAttr(attrName) || null;
        var attrValue = value[attrName]; // Missing required attribute, for instance
        // { name: String, age: Integer }
        // { "name": "Finitio" }

        if (attrValue === undefined && attr != null && attr.required) {
          m = Monad.failure(attrName, ['Missing attribute `${attrName}`', [attrName]]);
          return m.onFailure(function (f) {
            f.location = attrName;
            return m;
          }); // Extra attribute on a heading that doesn't allow extra, for instance
          // { name: String }
          // { "name": "Finitio", "age": 42 }
        } else if (attr == null && !_this2.heading.allowExtra()) {
          m = Monad.failure(attrName, ['Unrecognized attribute `${attrName}`', [attrName]]);
          return m.onFailure(function (f) {
            f.location = attrName;
            return m;
          }); // Extra attribute on a heading that allows extra, for instance
          // { name: String, ...: Integer }
          // { "name": "Finitio", "age": 42 }
        } else if (attr == null && _this2.heading.allowExtra()) {
          var extraType = _this2.heading.getExtraType();

          subm = extraType.mDress(attrValue, Monad);
          subm.onFailure(function (error) {
            error.location = attrName;
            return subm;
          });
          return subm.onSuccess(function (val) {
            result[attrName] = val;
            return success;
          }); // Required attributes, for instance
          // { name: String }
          // { "name": "Finitio" }
        } else if (attr != null && attrValue !== undefined) {
          subm = attr.type.mDress(attrValue, Monad);
          subm.onFailure(function (error) {
            error.location = attrName;
            return subm;
          });
          return subm.onSuccess(function (val) {
            result[attrName] = val;
            return success;
          }); //
        } else {
          return success;
        }
      };

      var onFailure = function onFailure(causes) {
        var params = ['Tuple', value];
        return Monad.failure(this, ['Invalid ${typeName}', params], causes);
      }; // build all attributes


      var attributes = _attributesHash(this.heading);

      _utils["default"].extend(attributes, value);

      attributes = Object.keys(attributes);
      return Monad.refine(success, attributes, callback, onFailure);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      if (!(as instanceof TupleType)) {
        _utils["default"].undressError("Tuple cannot undress to `".concat(as, "` (").concat(as.constructor, ")."));
      } // Check heading compatibility


      var _$u$triSplit = _utils["default"].triSplit(_attributesHash(this.heading), _attributesHash(as.heading)),
          _$u$triSplit2 = _slicedToArray(_$u$triSplit, 3),
          s = _$u$triSplit2[0],
          l = _$u$triSplit2[1],
          r = _$u$triSplit2[2]; // left non empty? do we allow projection undressings?


      if (_utils["default"].find(l, function (a) {
        return a.required;
      })) {
        _utils["default"].undressError("Tuple undress does not allow projecting ".concat(l));
      } // right non empty? do we allow missing attributes?


      if (!_utils["default"].isEmpty(r)) {
        _utils["default"].undressError("Tuple undress does not support missing ".concat(r));
      } // Do we allow disagreements on required?


      if (!_utils["default"].every(s, function (pair) {
        return pair[0].required === pair[1].required;
      })) {
        _utils["default"].undressError('Tuple undress requires optional attributes to agree');
      } // let undress each attribute in turn


      var undressed = {};
      this.heading.each(function (attribute) {
        var attrName = attribute.name;
        var attrType = attribute.type;
        var attrValue = value[attrName];

        if (attrValue !== undefined) {
          var targType = as.heading.getAttr(attrName).type;
          return undressed[attribute.name] = attrType.undress(attrValue, targType);
        }
      });
      return undressed;
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(other) {
      return this === other || other instanceof TupleType && this.heading.isSuperHeadingOf(other.heading);
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this === other || other instanceof TupleType && this.heading.equals(other.heading) || _get(_getPrototypeOf(TupleType.prototype), "_equals", this).apply(this, arguments);
    }
  }, {
    key: "low",
    value: function low() {
      return new TupleType(this.heading.low());
    }
  }, {
    key: "toString",
    value: function toString() {
      return "{ ".concat(this.heading.toString(), " }");
    }
  }, {
    key: "attributeNames",
    value: function attributeNames() {
      return _utils["default"].map(this.heading.attributes, function (a) {
        return a.name;
      });
    }
  }, {
    key: "requiredAttributeNames",
    value: function requiredAttributeNames() {
      return _utils["default"].map(_utils["default"].values(_utils["default"].filter(this.heading.attributes, function (a) {
        return a.required;
      })), function (a) {
        return a.name;
      });
    }
  }, {
    key: "extraAttributes",
    value: function extraAttributes(value) {
      return _utils["default"].difference(_utils["default"].keys(value), this.attributeNames());
    }
  }, {
    key: "missingAttributes",
    value: function missingAttributes(value) {
      return _utils["default"].difference(this.requiredAttributeNames(), _utils["default"].keys(value));
    }
  }, {
    key: "areAttributesValid",
    value: function areAttributesValid(value) {
      return (this.heading.allowExtra() || _utils["default"].isEmpty(this.extraAttributes(value))) && _utils["default"].isEmpty(this.missingAttributes(value));
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.heading.resolveProxies(system);
    }
  }]);

  return TupleType;
}(_type["default"]);

exports["default"] = TupleType;
(0, _ic.TypeType)(TupleType, 'tuple', ['heading', 'metadata']);


},{"../support/heading":20,"../support/ic":21,"../support/utils":24,"../type":26}],36:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _type = _interopRequireDefault(require("../type"));

var _utils = _interopRequireDefault(require("../support/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TypeDef = /*#__PURE__*/function (_Type) {
  _inherits(TypeDef, _Type);

  var _super = _createSuper(TypeDef);

  function TypeDef(type, name, metadata) {
    var _this;

    _classCallCheck(this, TypeDef);

    _this = _super.call(this, metadata);
    _this.type = type;
    _this.name = name;

    if (!_this.name) {
      _utils["default"].argumentError('Name cannot be null on TypeDef');
    }

    _this.generator = _this.type.generator;
    return _this;
  }

  _createClass(TypeDef, [{
    key: "fetch",
    value: function fetch() {
      return this.type.fetch.apply(this.type, arguments);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return this.type.include(value);
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this2 = this;

      var m = this.type.mDress(value, Monad);
      return m.onFailure(function (cause) {
        if (_this2.name === 'Main') {
          cause.typeName = 'Data';
        } else {
          cause.typeName = _this2.name;
        }

        return m;
      });
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      return this.type.undress(value, as);
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(child) {
      return this.type.isSuperTypeOf(child);
    }
  }, {
    key: "_isSubTypeOf",
    value: function _isSubTypeOf(sup) {
      return this.type._isSubTypeOf(sup);
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this.type.equals(other);
    }
  }, {
    key: "isFake",
    value: function isFake() {
      return true;
    }
  }, {
    key: "trueOne",
    value: function trueOne() {
      return this.type;
    }
  }, {
    key: "low",
    value: function low() {
      return this.type.low();
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.type.resolveProxies(system);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.name;
    }
  }]);

  return TypeDef;
}(_type["default"]);

(0, _ic.ObjectType)(TypeDef, ['type', 'name', 'metadata']); //

var _default = TypeDef;
exports["default"] = _default;


},{"../support/ic":21,"../support/utils":24,"../type":26}],37:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TypeRef = /*#__PURE__*/function (_Type) {
  _inherits(TypeRef, _Type);

  var _super = _createSuper(TypeRef);

  function TypeRef(typeName, metadata, target) {
    var _this;

    _classCallCheck(this, TypeRef);

    _this = _super.call(this, metadata);
    _this.typeName = typeName;
    _this.target = target;

    if (!_this.typeName) {
      _utils["default"].argumentError('Proxied ref cannot be null on TypeRef');
    }

    return _this;
  }

  _createClass(TypeRef, [{
    key: "fetch",
    value: function fetch() {
      var r = this.resolved();
      return r.fetch.apply(r, arguments);
    }
  }, {
    key: "_include",
    value: function _include(value) {
      return this.resolved().include(value);
    }
  }, {
    key: "_mDress",
    value: function _mDress(value, Monad) {
      return this.resolved().mDress(value, Monad);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      return this.resolved().undress(value, as);
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(child) {
      return this.resolved().isSuperTypeOf(child);
    }
  }, {
    key: "_isSubTypeOf",
    value: function _isSubTypeOf(sup) {
      return this.resolved()._isSubTypeOf(sup);
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this.resolved().equals(other);
    } // private API

  }, {
    key: "isFake",
    value: function isFake() {
      return true;
    }
  }, {
    key: "trueOne",
    value: function trueOne() {
      return this.resolved().trueOne();
    }
  }, {
    key: "low",
    value: function low() {
      return this.resolved().low();
    }
  }, {
    key: "resolve",
    value: function resolve(system) {
      return this.target != null ? this.target : this.target = system.resolve(this.typeName).fetchType();
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return this.resolve(system);
    }
  }, {
    key: "resolved",
    value: function resolved() {
      if (!this.target) {
        throw new Error('Proxy is not resolved');
      }

      return this.target;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.typeName;
    }
  }]);

  return TypeRef;
}(_type["default"]);

(0, _ic.TypeType)(TypeRef, 'ref', ['typeName', 'metadata']); //

var _default = TypeRef;
exports["default"] = _default;


},{"../support/ic":21,"../support/utils":24,"../type":26}],38:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ic = require("../support/ic");

var _utils = _interopRequireDefault(require("../support/utils"));

var _type = _interopRequireDefault(require("../type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UnionType = /*#__PURE__*/function (_Type) {
  _inherits(UnionType, _Type);

  var _super = _createSuper(UnionType);

  function UnionType(candidates, metadata) {
    var _this;

    _classCallCheck(this, UnionType);

    _this = _super.call(this, metadata);
    _this.candidates = candidates;

    _utils["default"].each(_this.candidates, function (c) {
      if (!(c instanceof _type["default"])) {
        return _utils["default"].argumentError('Finitio.Type expected, got:', c);
      }
    });

    return _this;
  }

  _createClass(UnionType, [{
    key: "_mDress",
    value: function _mDress(value, Monad) {
      var _this2 = this;

      var callback = function callback(candidate) {
        return candidate.mDress(value, Monad);
      };

      var onFailure = function onFailure(causes) {
        var params = ['value', value];
        return Monad.failure(_this2, ['Invalid ${typeName}: `${value}`', params], causes);
      };

      return Monad.find(this.candidates, callback, onFailure);
    }
  }, {
    key: "_undress",
    value: function _undress(value, as) {
      var using;

      if (this === as) {
        return value;
      } // find a candidate which is a subtype of as


      using = _utils["default"].find(this.candidates, function (c) {
        return as.isSuperTypeOf(c);
      });

      if (using) {
        return using.undress(value, as);
      } // find candidate that includes value


      using = _utils["default"].find(this.candidates, function (c) {
        return c.include(value);
      });

      if (using) {
        return using.undress(value, as);
      }

      return _utils["default"].undressError("Unable to undress `".concat(value, "` to `").concat(as, "`"));
    }
  }, {
    key: "_include",
    value: function _include(value) {
      var found = _utils["default"].find(this.candidates, function (c) {
        return c.include(value);
      });

      return found != null;
    }
  }, {
    key: "_isSuperTypeOf",
    value: function _isSuperTypeOf(other) {
      var _this3 = this;

      return this === other || _utils["default"].any(this.candidates, function (c) {
        return c.isSuperTypeOf(other);
      }) || other instanceof UnionType && _utils["default"].every(other.candidates, function (d) {
        return _utils["default"].any(_this3.candidates, function (c) {
          return c.isSuperTypeOf(d);
        });
      }) || _get(_getPrototypeOf(UnionType.prototype), "_isSuperTypeOf", this).apply(this, arguments);
    }
  }, {
    key: "_equals",
    value: function _equals(other) {
      return this === other || other instanceof UnionType && this.candidatesEquals(other, true) || _get(_getPrototypeOf(UnionType.prototype), "_equals", this).apply(this, arguments);
    }
  }, {
    key: "candidatesEquals",
    value: function candidatesEquals(other, andback) {
      var ok = _utils["default"].every(this.candidates, function (c) {
        return _utils["default"].any(other.candidates, function (c2) {
          return c.equals(c2);
        });
      });

      return ok && (!andback || other.candidatesEquals(this, false));
    }
  }, {
    key: "low",
    value: function low() {
      throw 'UnionType#low is not defined yet, sorry!';
    }
  }, {
    key: "resolveProxies",
    value: function resolveProxies(system) {
      return _utils["default"].each(this.candidates, function (c) {
        return c.resolveProxies(system);
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      return _utils["default"].map(this.candidates, function (c) {
        return c.toString();
      }).join('|');
    }
  }]);

  return UnionType;
}(_type["default"]);

(0, _ic.TypeType)(UnionType, 'union', ['candidates', 'metadata']);
var _default = UnionType;
exports["default"] = _default;


},{"../support/ic":21,"../support/utils":24,"../type":26}],39:[function(require,module,exports){

},{}],40:[function(require,module,exports){
module.exports={
  "name": "finitio",
  "version": "1.3.4",
  "description": "Finitio is a language for capturing information structure.",
  "main": "index.js",
  "author": "Louis Lambeau <louislambeau@gmail.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/llambeau/finitio.js"
  },
  "keywords": [
    "finitio",
    "typing",
    "system",
    "json",
    "serialization",
    "validation"
  ],
  "analyze": true,
  "bin": {
    "finitio-js": "./bin/finitio-js"
  },
  "scripts": {
    "build": "grunt build",
    "test": "grunt test",
    "test:unit": "grunt test:unit",
    "test:integration": "grunt test:integration",
    "test:acceptance": "grunt test:acceptance",
    "browserify": "grunt browserify",
    "lint": "eslint src specs *.js .eslintrc.js",
    "lint:fix": "eslint --fix src specs *.js .eslintrc.js"
  },
  "dependencies": {
    "commander": "~2.9.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.8",
    "@babel/node": "^7.15.8",
    "@babel/plugin-proposal-class-properties": "^7.14.5",
    "@babel/preset-env": "^7.15.8",
    "@babel/register": "^7.15.3",
    "@enspirit/eslint-config-node": "0.1.2",
    "babel-loader": "^8.2.3",
    "browserify": "~17.0.0",
    "cucumber": "~0.9.4",
    "eslint": "^7.21.0",
    "grunt": "~1.4.1",
    "grunt-babel": "^8.0.0",
    "grunt-browserify": "~6.0.0",
    "grunt-cli": "^1.4.3",
    "grunt-contrib-clean": "~2.0.0",
    "grunt-contrib-jshint": "~3.1.1",
    "grunt-contrib-uglify": "~5.0.1",
    "grunt-contrib-watch": "~1.1.0",
    "grunt-cucumber": "git://github.com/llambeau/grunt-cucumber-js.git#master",
    "grunt-fixtures2js": "~0.1.3",
    "grunt-mocha-test": "~0.13.3",
    "grunt-peg": "~2.0.1",
    "grunt-shell": "~3.0.1",
    "mocha": "^9.1.3",
    "mocha-junit-reporter": "^2.0.2",
    "pegjs": "~0.10.0",
    "shelljs": "~0.8.4",
    "should": "~13.2.3",
    "underscore": "~1.13.1"
  }
}

},{}]},{},[1])(1)
});
