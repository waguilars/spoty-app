var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/qs/lib/utils.js
var require_utils = __commonJS((exports, module2) => {
  "use strict";
  var has = Object.prototype.hasOwnProperty;
  var hexTable = function() {
    var array = [];
    for (var i = 0; i < 256; ++i) {
      array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
    }
    return array;
  }();
  var compactQueue = function compactQueue2(queue) {
    var obj;
    while (queue.length) {
      var item = queue.pop();
      obj = item.obj[item.prop];
      if (Array.isArray(obj)) {
        var compacted = [];
        for (var j = 0; j < obj.length; ++j) {
          if (typeof obj[j] !== "undefined") {
            compacted.push(obj[j]);
          }
        }
        item.obj[item.prop] = compacted;
      }
    }
    return obj;
  };
  var arrayToObject = function arrayToObject2(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
      if (typeof source[i] !== "undefined") {
        obj[i] = source[i];
      }
    }
    return obj;
  };
  var merge = function merge2(target, source, options) {
    if (!source) {
      return target;
    }
    if (typeof source !== "object") {
      if (Array.isArray(target)) {
        target.push(source);
      } else if (typeof target === "object") {
        if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
          target[source] = true;
        }
      } else {
        return [target, source];
      }
      return target;
    }
    if (typeof target !== "object") {
      return [target].concat(source);
    }
    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
      mergeTarget = arrayToObject(target, options);
    }
    if (Array.isArray(target) && Array.isArray(source)) {
      source.forEach(function(item, i) {
        if (has.call(target, i)) {
          if (target[i] && typeof target[i] === "object") {
            target[i] = merge2(target[i], item, options);
          } else {
            target.push(item);
          }
        } else {
          target[i] = item;
        }
      });
      return target;
    }
    return Object.keys(source).reduce(function(acc, key) {
      var value = source[key];
      if (has.call(acc, key)) {
        acc[key] = merge2(acc[key], value, options);
      } else {
        acc[key] = value;
      }
      return acc;
    }, mergeTarget);
  };
  var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function(acc, key) {
      acc[key] = source[key];
      return acc;
    }, target);
  };
  var decode = function(str) {
    try {
      return decodeURIComponent(str.replace(/\+/g, " "));
    } catch (e) {
      return str;
    }
  };
  var encode = function encode2(str) {
    if (str.length === 0) {
      return str;
    }
    var string = typeof str === "string" ? str : String(str);
    var out = "";
    for (var i = 0; i < string.length; ++i) {
      var c = string.charCodeAt(i);
      if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122) {
        out += string.charAt(i);
        continue;
      }
      if (c < 128) {
        out = out + hexTable[c];
        continue;
      }
      if (c < 2048) {
        out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
        continue;
      }
      if (c < 55296 || c >= 57344) {
        out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
        continue;
      }
      i += 1;
      c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
      out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
    }
    return out;
  };
  var compact = function compact2(value) {
    var queue = [{obj: {o: value}, prop: "o"}];
    var refs = [];
    for (var i = 0; i < queue.length; ++i) {
      var item = queue[i];
      var obj = item.obj[item.prop];
      var keys = Object.keys(obj);
      for (var j = 0; j < keys.length; ++j) {
        var key = keys[j];
        var val = obj[key];
        if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
          queue.push({obj, prop: key});
          refs.push(val);
        }
      }
    }
    return compactQueue(queue);
  };
  var isRegExp = function isRegExp2(obj) {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
  };
  var isBuffer = function isBuffer2(obj) {
    if (obj === null || typeof obj === "undefined") {
      return false;
    }
    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };
  module2.exports = {
    arrayToObject,
    assign,
    compact,
    decode,
    encode,
    isBuffer,
    isRegExp,
    merge
  };
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS((exports, module2) => {
  "use strict";
  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;
  module2.exports = {
    default: "RFC3986",
    formatters: {
      RFC1738: function(value) {
        return replace.call(value, percentTwenties, "+");
      },
      RFC3986: function(value) {
        return value;
      }
    },
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils();
  var formats = require_formats();
  var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
      return prefix + "[]";
    },
    indices: function indices(prefix, key) {
      return prefix + "[" + key + "]";
    },
    repeat: function repeat(prefix) {
      return prefix;
    }
  };
  var toISO = Date.prototype.toISOString;
  var defaults = {
    delimiter: "&",
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) {
      return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
  };
  var stringify2 = function stringify3(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly) {
    var obj = object;
    if (typeof filter === "function") {
      obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
      obj = serializeDate(obj);
    } else if (obj === null) {
      if (strictNullHandling) {
        return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
      }
      obj = "";
    }
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean" || utils.isBuffer(obj)) {
      if (encoder) {
        var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
        return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder))];
      }
      return [formatter(prefix) + "=" + formatter(String(obj))];
    }
    var values = [];
    if (typeof obj === "undefined") {
      return values;
    }
    var objKeys;
    if (Array.isArray(filter)) {
      objKeys = filter;
    } else {
      var keys = Object.keys(obj);
      objKeys = sort ? keys.sort(sort) : keys;
    }
    for (var i = 0; i < objKeys.length; ++i) {
      var key = objKeys[i];
      if (skipNulls && obj[key] === null) {
        continue;
      }
      if (Array.isArray(obj)) {
        values = values.concat(stringify3(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
      } else {
        values = values.concat(stringify3(obj[key], prefix + (allowDots ? "." + key : "[" + key + "]"), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
      }
    }
    return values;
  };
  module2.exports = function(object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};
    if (options.encoder !== null && options.encoder !== void 0 && typeof options.encoder !== "function") {
      throw new TypeError("Encoder has to be a function.");
    }
    var delimiter = typeof options.delimiter === "undefined" ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === "boolean" ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === "boolean" ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === "boolean" ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === "function" ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === "function" ? options.sort : null;
    var allowDots = typeof options.allowDots === "undefined" ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === "function" ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === "boolean" ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === "undefined") {
      options.format = formats["default"];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;
    if (typeof options.filter === "function") {
      filter = options.filter;
      obj = filter("", obj);
    } else if (Array.isArray(options.filter)) {
      filter = options.filter;
      objKeys = filter;
    }
    var keys = [];
    if (typeof obj !== "object" || obj === null) {
      return "";
    }
    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
      arrayFormat = options.arrayFormat;
    } else if ("indices" in options) {
      arrayFormat = options.indices ? "indices" : "repeat";
    } else {
      arrayFormat = "indices";
    }
    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (!objKeys) {
      objKeys = Object.keys(obj);
    }
    if (sort) {
      objKeys.sort(sort);
    }
    for (var i = 0; i < objKeys.length; ++i) {
      var key = objKeys[i];
      if (skipNulls && obj[key] === null) {
        continue;
      }
      keys = keys.concat(stringify2(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode ? encoder : null, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
    }
    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? "?" : "";
    return joined.length > 0 ? prefix + joined : "";
  };
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils();
  var has = Object.prototype.hasOwnProperty;
  var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: "&",
    depth: 5,
    parameterLimit: 1e3,
    plainObjects: false,
    strictNullHandling: false
  };
  var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
    var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    for (var i = 0; i < parts.length; ++i) {
      var part = parts[i];
      var bracketEqualsPos = part.indexOf("]=");
      var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
      var key, val;
      if (pos === -1) {
        key = options.decoder(part, defaults.decoder);
        val = options.strictNullHandling ? null : "";
      } else {
        key = options.decoder(part.slice(0, pos), defaults.decoder);
        val = options.decoder(part.slice(pos + 1), defaults.decoder);
      }
      if (has.call(obj, key)) {
        obj[key] = [].concat(obj[key]).concat(val);
      } else {
        obj[key] = val;
      }
    }
    return obj;
  };
  var parseObject = function(chain, val, options) {
    var leaf = val;
    for (var i = chain.length - 1; i >= 0; --i) {
      var obj;
      var root = chain[i];
      if (root === "[]") {
        obj = [];
        obj = obj.concat(leaf);
      } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
          obj = [];
          obj[index] = leaf;
        } else {
          obj[cleanRoot] = leaf;
        }
      }
      leaf = obj;
    }
    return leaf;
  };
  var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
      return;
    }
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;
    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;
    var keys = [];
    if (parent) {
      if (!options.plainObjects && has.call(Object.prototype, parent)) {
        if (!options.allowPrototypes) {
          return;
        }
      }
      keys.push(parent);
    }
    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
      i += 1;
      if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
        if (!options.allowPrototypes) {
          return;
        }
      }
      keys.push(segment[1]);
    }
    if (segment) {
      keys.push("[" + key.slice(segment.index) + "]");
    }
    return parseObject(keys, val, options);
  };
  module2.exports = function(str, opts) {
    var options = opts ? utils.assign({}, opts) : {};
    if (options.decoder !== null && options.decoder !== void 0 && typeof options.decoder !== "function") {
      throw new TypeError("Decoder has to be a function.");
    }
    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === "string" || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === "number" ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === "number" ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === "function" ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === "boolean" ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === "boolean" ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === "boolean" ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === "number" ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === "boolean" ? options.strictNullHandling : defaults.strictNullHandling;
    if (str === "" || str === null || typeof str === "undefined") {
      return options.plainObjects ? Object.create(null) : {};
    }
    var tempObj = typeof str === "string" ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};
    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      var newObj = parseKeys(key, tempObj[key], options);
      obj = utils.merge(obj, newObj, options);
    }
    return utils.compact(obj);
  };
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS((exports, module2) => {
  "use strict";
  var stringify2 = require_stringify();
  var parse = require_parse();
  var formats = require_formats();
  module2.exports = {
    formats,
    parse,
    stringify: stringify2
  };
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
});

// node_modules/axios/lib/utils.js
var require_utils2 = __commonJS((exports, module2) => {
  "use strict";
  var bind = require_bind();
  var toString = Object.prototype.toString;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
  }
  function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
  }
  function isFormData(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
  }
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
  }
  function isString(val) {
    return typeof val === "string";
  }
  function isNumber(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isFile(val) {
    return toString.call(val) === "[object File]";
  }
  function isBlob(val) {
    return toString.call(val) === "[object Blob]";
  }
  function isFunction(val) {
    return toString.call(val) === "[object Function]";
  }
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function trim(str) {
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
  }
  function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function merge() {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === "function") {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }
  module2.exports = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    extend,
    trim,
    stripBOM
  };
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  module2.exports = function buildURL(url, params, paramsSerializer) {
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (utils.isArray(val)) {
          key = key + "[]";
        } else {
          val = [val];
        }
        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + "=" + encode(v));
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  };
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  module2.exports = InterceptorManager;
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  module2.exports = function transformData(data, headers, fns) {
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });
    return data;
  };
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  module2.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: this.config,
        code: this.code
      };
    };
    return error;
  };
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS((exports, module2) => {
  "use strict";
  var enhanceError = require_enhanceError();
  module2.exports = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS((exports, module2) => {
  "use strict";
  var createError = require_createError();
  module2.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
    }
  };
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove() {
      }
    };
  }();
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = function isAbsoluteURL(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS((exports, module2) => {
  "use strict";
  var isAbsoluteURL = require_isAbsoluteURL();
  var combineURLs = require_combineURLs();
  module2.exports = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  module2.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin(requestURL) {
      var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }();
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  var settle = require_settle();
  var cookies = require_cookies();
  var buildURL = require_buildURL();
  var buildFullPath = require_buildFullPath();
  var parseHeaders = require_parseHeaders();
  var isURLSameOrigin = require_isURLSameOrigin();
  var createError = require_createError();
  module2.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      if (utils.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      var request = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(resolve, reject, response);
        request = null;
      };
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(createError("Request aborted", config, "ECONNABORTED", request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(createError("Network Error", config, null, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));
        request = null;
      };
      if (utils.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request.setRequestHeader(key, val);
          }
        });
      }
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          if (config.responseType !== "json") {
            throw e;
          }
        }
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }
          request.abort();
          reject(cancel);
          request = null;
        });
      }
      if (!requestData) {
        requestData = null;
      }
      request.send(requestData);
    });
  };
});

// node_modules/ms/index.js
var require_ms = __commonJS((exports, module2) => {
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  module2.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  }
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS((exports, module2) => {
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.instances = [];
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self = debug;
        const curr = Number(new Date());
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return match;
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = createDebug.enabled(namespace);
      debug.useColors = createDebug.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      debug.extend = extend;
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      createDebug.instances.push(debug);
      return debug;
    }
    function destroy() {
      const index = createDebug.instances.indexOf(this);
      if (index !== -1) {
        createDebug.instances.splice(index, 1);
        return true;
      }
      return false;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < createDebug.instances.length; i++) {
        const instance = createDebug.instances[i];
        instance.enabled = createDebug.enabled(instance.namespace);
      }
    }
    function disable() {
      const namespaces = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  module2.exports = setup;
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS((exports, module2) => {
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  function log(...args) {
    return typeof console === "object" && console.log && console.log(...args);
  }
  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error) {
    }
  }
  function load() {
    let r;
    try {
      r = exports.storage.getItem("debug");
    } catch (error) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {
    }
  }
  module2.exports = require_common()(exports);
  var {formatters} = module2.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = (flag, argv) => {
    argv = argv || process.argv;
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const pos = argv.indexOf(prefix + flag);
    const terminatorPos = argv.indexOf("--");
    return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS((exports, module2) => {
  "use strict";
  var os = require("os");
  var hasFlag = require_has_flag();
  var env = process.env;
  var forceColor;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
    forceColor = false;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = true;
  }
  if ("FORCE_COLOR" in env) {
    forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function supportsColor(stream) {
    if (forceColor === false) {
      return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
    if (stream && !stream.isTTY && forceColor !== true) {
      return 0;
    }
    const min = forceColor ? 1 : 0;
    if (process.platform === "win32") {
      const osRelease = os.release().split(".");
      if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === "truecolor") {
      return 3;
    }
    if ("TERM_PROGRAM" in env) {
      const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env.TERM_PROGRAM) {
        case "iTerm.app":
          return version >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env) {
      return 1;
    }
    if (env.TERM === "dumb") {
      return min;
    }
    return min;
  }
  function getSupportLevel(stream) {
    const level = supportsColor(stream);
    return translateLevel(level);
  }
  module2.exports = {
    supportsColor: getSupportLevel,
    stdout: getSupportLevel(process.stdout),
    stderr: getSupportLevel(process.stderr)
  };
});

// node_modules/debug/src/node.js
var require_node = __commonJS((exports, module2) => {
  var tty = require("tty");
  var util = require("util");
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.colors = [6, 2, 3, 4, 5, 1];
  try {
    const supportsColor = require_supports_color();
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (error) {
  }
  exports.inspectOpts = Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase();
    });
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === "null") {
      val = null;
    } else {
      val = Number(val);
    }
    obj[prop] = val;
    return obj;
  }, {});
  function useColors() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  }
  function formatArgs(args) {
    const {namespace: name, useColors: useColors2} = this;
    if (useColors2) {
      const c = this.color;
      const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
      const prefix = `  ${colorCode};1m${name} [0m`;
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  }
  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return "";
    }
    return new Date().toISOString() + " ";
  }
  function log(...args) {
    return process.stderr.write(util.format(...args) + "\n");
  }
  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      delete process.env.DEBUG;
    }
  }
  function load() {
    return process.env.DEBUG;
  }
  function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for (let i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }
  module2.exports = require_common()(exports);
  var {formatters} = module2.exports;
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, " ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
});

// node_modules/debug/src/index.js
var require_src = __commonJS((exports, module2) => {
  if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
    module2.exports = require_browser();
  } else {
    module2.exports = require_node();
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS((exports, module2) => {
  var debug;
  try {
    debug = require_src()("follow-redirects");
  } catch (error) {
    debug = function() {
    };
  }
  module2.exports = debug;
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS((exports, module2) => {
  var url = require("url");
  var URL = url.URL;
  var http = require("http");
  var https = require("https");
  var Writable = require("stream").Writable;
  var assert = require("assert");
  var debug = require_debug();
  var eventHandlers = Object.create(null);
  ["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function(event) {
    eventHandlers[event] = function(arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3);
    };
  });
  var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "");
  var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
  var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
  var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
  function RedirectableRequest(options, responseCallback) {
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];
    if (responseCallback) {
      this.on("response", responseCallback);
    }
    var self = this;
    this._onNativeResponse = function(response) {
      self._processResponse(response);
    };
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);
  RedirectableRequest.prototype.write = function(data, encoding, callback) {
    if (this._ending) {
      throw new WriteAfterEndError();
    }
    if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({data, encoding});
      this._currentRequest.write(data, encoding, callback);
    } else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
  };
  RedirectableRequest.prototype.end = function(data, encoding, callback) {
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    } else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    } else {
      var self = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function() {
        self._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };
  RedirectableRequest.prototype.setHeader = function(name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };
  RedirectableRequest.prototype.removeHeader = function(name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };
  RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
    if (callback) {
      this.once("timeout", callback);
    }
    if (this.socket) {
      startTimer(this, msecs);
    } else {
      var self = this;
      this._currentRequest.once("socket", function() {
        startTimer(self, msecs);
      });
    }
    this.once("response", clearTimer);
    this.once("error", clearTimer);
    return this;
  };
  function startTimer(request, msecs) {
    clearTimeout(request._timeout);
    request._timeout = setTimeout(function() {
      request.emit("timeout");
    }, msecs);
  }
  function clearTimer() {
    clearTimeout(this._timeout);
  }
  [
    "abort",
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive"
  ].forEach(function(method) {
    RedirectableRequest.prototype[method] = function(a, b) {
      return this._currentRequest[method](a, b);
    };
  });
  ["aborted", "connection", "socket"].forEach(function(property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function() {
        return this._currentRequest[property];
      }
    });
  });
  RedirectableRequest.prototype._sanitizeOptions = function(options) {
    if (!options.headers) {
      options.headers = {};
    }
    if (options.host) {
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      } else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
  };
  RedirectableRequest.prototype._performRequest = function() {
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new TypeError("Unsupported protocol " + protocol));
      return;
    }
    if (this._options.agents) {
      var scheme = protocol.substr(0, protocol.length - 1);
      this._options.agent = this._options.agents[scheme];
    }
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    this._currentUrl = url.format(this._options);
    request._redirectable = this;
    for (var event in eventHandlers) {
      if (event) {
        request.on(event, eventHandlers[event]);
      }
    }
    if (this._isRedirect) {
      var i = 0;
      var self = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        if (request === self._currentRequest) {
          if (error) {
            self.emit("error", error);
          } else if (i < buffers.length) {
            var buffer = buffers[i++];
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          } else if (self._ended) {
            request.end();
          }
        }
      })();
    }
  };
  RedirectableRequest.prototype._processResponse = function(response) {
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode
      });
    }
    var location = response.headers.location;
    if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
      this._currentRequest.removeAllListeners();
      this._currentRequest.on("error", noop);
      this._currentRequest.abort();
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) || url.parse(this._currentUrl).hostname;
      var redirectUrl = url.resolve(this._currentUrl, location);
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.hostname !== previousHostName) {
        removeMatchingHeaders(/^authorization$/i, this._options.headers);
      }
      if (typeof this._options.beforeRedirect === "function") {
        try {
          this._options.beforeRedirect.call(null, this._options);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        var error = new RedirectionError("Redirected request failed: " + cause.message);
        error.cause = cause;
        this.emit("error", error);
      }
    } else {
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);
      this._requestBodyBuffers = [];
    }
  };
  function wrap(protocols) {
    var exports2 = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024
    };
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function(scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
      wrappedProtocol.request = function(input, options, callback) {
        if (typeof input === "string") {
          var urlStr = input;
          try {
            input = urlToOptions(new URL(urlStr));
          } catch (err) {
            input = url.parse(urlStr);
          }
        } else if (URL && input instanceof URL) {
          input = urlToOptions(input);
        } else {
          callback = options;
          options = input;
          input = {protocol};
        }
        if (typeof options === "function") {
          callback = options;
          options = null;
        }
        options = Object.assign({
          maxRedirects: exports2.maxRedirects,
          maxBodyLength: exports2.maxBodyLength
        }, input, options);
        options.nativeProtocols = nativeProtocols;
        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug("options", options);
        return new RedirectableRequest(options, callback);
      };
      wrappedProtocol.get = function(input, options, callback) {
        var request = wrappedProtocol.request(input, options, callback);
        request.end();
        return request;
      };
    });
    return exports2;
  }
  function noop() {
  }
  function urlToOptions(urlObject) {
    var options = {
      protocol: urlObject.protocol,
      hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
      hash: urlObject.hash,
      search: urlObject.search,
      pathname: urlObject.pathname,
      path: urlObject.pathname + urlObject.search,
      href: urlObject.href
    };
    if (urlObject.port !== "") {
      options.port = Number(urlObject.port);
    }
    return options;
  }
  function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for (var header in headers) {
      if (regex.test(header)) {
        lastValue = headers[header];
        delete headers[header];
      }
    }
    return lastValue;
  }
  function createErrorType(code, defaultMessage) {
    function CustomError(message) {
      Error.captureStackTrace(this, this.constructor);
      this.message = message || defaultMessage;
    }
    CustomError.prototype = new Error();
    CustomError.prototype.constructor = CustomError;
    CustomError.prototype.name = "Error [" + code + "]";
    CustomError.prototype.code = code;
    return CustomError;
  }
  module2.exports = wrap({http, https});
  module2.exports.wrap = wrap;
});

// node_modules/axios/package.json
var require_package = __commonJS((exports, module2) => {
  module2.exports = {
    name: "axios",
    version: "0.21.1",
    description: "Promise based HTTP client for the browser and node.js",
    main: "index.js",
    scripts: {
      test: "grunt test && bundlesize",
      start: "node ./sandbox/server.js",
      build: "NODE_ENV=production grunt build",
      preversion: "npm test",
      version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
      postversion: "git push && git push --tags",
      examples: "node ./examples/server.js",
      coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
      fix: "eslint --fix lib/**/*.js"
    },
    repository: {
      type: "git",
      url: "https://github.com/axios/axios.git"
    },
    keywords: [
      "xhr",
      "http",
      "ajax",
      "promise",
      "node"
    ],
    author: "Matt Zabriskie",
    license: "MIT",
    bugs: {
      url: "https://github.com/axios/axios/issues"
    },
    homepage: "https://github.com/axios/axios",
    devDependencies: {
      bundlesize: "^0.17.0",
      coveralls: "^3.0.0",
      "es6-promise": "^4.2.4",
      grunt: "^1.0.2",
      "grunt-banner": "^0.6.0",
      "grunt-cli": "^1.2.0",
      "grunt-contrib-clean": "^1.1.0",
      "grunt-contrib-watch": "^1.0.0",
      "grunt-eslint": "^20.1.0",
      "grunt-karma": "^2.0.0",
      "grunt-mocha-test": "^0.13.3",
      "grunt-ts": "^6.0.0-beta.19",
      "grunt-webpack": "^1.0.18",
      "istanbul-instrumenter-loader": "^1.0.0",
      "jasmine-core": "^2.4.1",
      karma: "^1.3.0",
      "karma-chrome-launcher": "^2.2.0",
      "karma-coverage": "^1.1.1",
      "karma-firefox-launcher": "^1.1.0",
      "karma-jasmine": "^1.1.1",
      "karma-jasmine-ajax": "^0.1.13",
      "karma-opera-launcher": "^1.0.0",
      "karma-safari-launcher": "^1.0.0",
      "karma-sauce-launcher": "^1.2.0",
      "karma-sinon": "^1.0.5",
      "karma-sourcemap-loader": "^0.3.7",
      "karma-webpack": "^1.7.0",
      "load-grunt-tasks": "^3.5.2",
      minimist: "^1.2.0",
      mocha: "^5.2.0",
      sinon: "^4.5.0",
      typescript: "^2.8.1",
      "url-search-params": "^0.10.0",
      webpack: "^1.13.1",
      "webpack-dev-server": "^1.14.1"
    },
    browser: {
      "./lib/adapters/http.js": "./lib/adapters/xhr.js"
    },
    jsdelivr: "dist/axios.min.js",
    unpkg: "dist/axios.min.js",
    typings: "./index.d.ts",
    dependencies: {
      "follow-redirects": "^1.10.0"
    },
    bundlesize: [
      {
        path: "./dist/axios.min.js",
        threshold: "5kB"
      }
    ]
  };
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  var settle = require_settle();
  var buildFullPath = require_buildFullPath();
  var buildURL = require_buildURL();
  var http = require("http");
  var https = require("https");
  var httpFollow = require_follow_redirects().http;
  var httpsFollow = require_follow_redirects().https;
  var url = require("url");
  var zlib = require("zlib");
  var pkg = require_package();
  var createError = require_createError();
  var enhanceError = require_enhanceError();
  var isHttps = /https:?/;
  function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;
    if (proxy.auth) {
      var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
      options.headers["Proxy-Authorization"] = "Basic " + base64;
    }
    options.beforeRedirect = function beforeRedirect(redirection) {
      redirection.headers.host = redirection.host;
      setProxy(redirection, proxy, redirection.href);
    };
  }
  module2.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
      var resolve = function resolve2(value) {
        resolvePromise(value);
      };
      var reject = function reject2(value) {
        rejectPromise(value);
      };
      var data = config.data;
      var headers = config.headers;
      if (!headers["User-Agent"] && !headers["user-agent"]) {
        headers["User-Agent"] = "axios/" + pkg.version;
      }
      if (data && !utils.isStream(data)) {
        if (Buffer.isBuffer(data)) {
        } else if (utils.isArrayBuffer(data)) {
          data = Buffer.from(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = Buffer.from(data, "utf-8");
        } else {
          return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
        }
        headers["Content-Length"] = data.length;
      }
      var auth = void 0;
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password || "";
        auth = username + ":" + password;
      }
      var fullPath = buildFullPath(config.baseURL, config.url);
      var parsed = url.parse(fullPath);
      var protocol = parsed.protocol || "http:";
      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(":");
        var urlUsername = urlAuth[0] || "";
        var urlPassword = urlAuth[1] || "";
        auth = urlUsername + ":" + urlPassword;
      }
      if (auth) {
        delete headers.Authorization;
      }
      var isHttpsRequest = isHttps.test(protocol);
      var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
      var options = {
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
        method: config.method.toUpperCase(),
        headers,
        agent,
        agents: {http: config.httpAgent, https: config.httpsAgent},
        auth
      };
      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }
      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + "_proxy";
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url.parse(proxyUrl);
          var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
          var shouldProxy = true;
          if (noProxyEnv) {
            var noProxy = noProxyEnv.split(",").map(function trim(s) {
              return s.trim();
            });
            shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
              if (!proxyElement) {
                return false;
              }
              if (proxyElement === "*") {
                return true;
              }
              if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                return true;
              }
              return parsed.hostname === proxyElement;
            });
          }
          if (shouldProxy) {
            proxy = {
              host: parsedProxyUrl.hostname,
              port: parsedProxyUrl.port,
              protocol: parsedProxyUrl.protocol
            };
            if (parsedProxyUrl.auth) {
              var proxyUrlAuth = parsedProxyUrl.auth.split(":");
              proxy.auth = {
                username: proxyUrlAuth[0],
                password: proxyUrlAuth[1]
              };
            }
          }
        }
      }
      if (proxy) {
        options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
        setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
      }
      var transport;
      var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsProxy ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttpsProxy ? httpsFollow : httpFollow;
      }
      if (config.maxBodyLength > -1) {
        options.maxBodyLength = config.maxBodyLength;
      }
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted)
          return;
        var stream = res;
        var lastRequest = res.req || req;
        if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
          switch (res.headers["content-encoding"]) {
            case "gzip":
            case "compress":
            case "deflate":
              stream = stream.pipe(zlib.createUnzip());
              delete res.headers["content-encoding"];
              break;
          }
        }
        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config,
          request: lastRequest
        };
        if (config.responseType === "stream") {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on("data", function handleStreamData(chunk) {
            responseBuffer.push(chunk);
            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
              stream.destroy();
              reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
            }
          });
          stream.on("error", function handleStreamError(err) {
            if (req.aborted)
              return;
            reject(enhanceError(err, config, null, lastRequest));
          });
          stream.on("end", function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== "arraybuffer") {
              responseData = responseData.toString(config.responseEncoding);
              if (!config.responseEncoding || config.responseEncoding === "utf8") {
                responseData = utils.stripBOM(responseData);
              }
            }
            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });
      req.on("error", function handleRequestError(err) {
        if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
          return;
        reject(enhanceError(err, config, null, req));
      });
      if (config.timeout) {
        req.setTimeout(config.timeout, function handleRequestTimeout() {
          req.abort();
          reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", req));
        });
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted)
            return;
          req.abort();
          reject(cancel);
        });
      }
      if (utils.isStream(data)) {
        data.on("error", function handleStreamError(err) {
          reject(enhanceError(err, config, null, req));
        }).pipe(req);
      } else {
        req.end(data);
      }
    });
  };
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  var normalizeHeaderName = require_normalizeHeaderName();
  var DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
      headers["Content-Type"] = value;
    }
  }
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== "undefined") {
      adapter = require_xhr();
    } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
      adapter = require_http();
    }
    return adapter;
  }
  var defaults = {
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, "Accept");
      normalizeHeaderName(headers, "Content-Type");
      if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, "application/json;charset=utf-8");
        return JSON.stringify(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
        }
      }
      return data;
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  defaults.headers = {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  };
  utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  module2.exports = defaults;
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  var transformData = require_transformData();
  var isCancel = require_isCancel();
  var defaults = require_defaults();
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }
  module2.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = config.headers || {};
    config.data = transformData(config.data, config.headers, config.transformRequest);
    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData(response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
        }
      }
      return Promise.reject(reason);
    });
  };
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  module2.exports = function mergeConfig(config1, config2) {
    config2 = config2 || {};
    var config = {};
    var valueFromConfig2Keys = ["url", "method", "data"];
    var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
    var defaultToConfig2Keys = [
      "baseURL",
      "transformRequest",
      "transformResponse",
      "paramsSerializer",
      "timeout",
      "timeoutMessage",
      "withCredentials",
      "adapter",
      "responseType",
      "xsrfCookieName",
      "xsrfHeaderName",
      "onUploadProgress",
      "onDownloadProgress",
      "decompress",
      "maxContentLength",
      "maxBodyLength",
      "maxRedirects",
      "transport",
      "httpAgent",
      "httpsAgent",
      "cancelToken",
      "socketPath",
      "responseEncoding"
    ];
    var directMergeKeys = ["validateStatus"];
    function getMergedValue(target, source) {
      if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
        return utils.merge(target, source);
      } else if (utils.isPlainObject(source)) {
        return utils.merge({}, source);
      } else if (utils.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(void 0, config1[prop]);
      }
    }
    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(void 0, config2[prop]);
      }
    });
    utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(void 0, config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(void 0, config1[prop]);
      }
    });
    utils.forEach(directMergeKeys, function merge(prop) {
      if (prop in config2) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        config[prop] = getMergedValue(void 0, config1[prop]);
      }
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
    var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
    utils.forEach(otherKeys, mergeDeepProperties);
    return config;
  };
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  var buildURL = require_buildURL();
  var InterceptorManager = require_InterceptorManager();
  var dispatchRequest = require_dispatchRequest();
  var mergeConfig = require_mergeConfig();
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  Axios.prototype.request = function request(config) {
    if (typeof config === "string") {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }
    config = mergeConfig(this.defaults, config);
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = "get";
    }
    var chain = [dispatchRequest, void 0];
    var promise = Promise.resolve(config);
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  };
  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
  };
  utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    Axios.prototype[method] = function(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data
      }));
    };
  });
  module2.exports = Axios;
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS((exports, module2) => {
  "use strict";
  function Cancel(message) {
    this.message = message;
  }
  Cancel.prototype.toString = function toString() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Cancel.prototype.__CANCEL__ = true;
  module2.exports = Cancel;
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS((exports, module2) => {
  "use strict";
  var Cancel = require_Cancel();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  };
  module2.exports = CancelToken;
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = function isAxiosError(payload) {
    return typeof payload === "object" && payload.isAxiosError === true;
  };
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS((exports, module2) => {
  "use strict";
  var utils = require_utils2();
  var bind = require_bind();
  var Axios = require_Axios();
  var mergeConfig = require_mergeConfig();
  var defaults = require_defaults();
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    utils.extend(instance, Axios.prototype, context);
    utils.extend(instance, context);
    return instance;
  }
  var axios2 = createInstance(defaults);
  axios2.Axios = Axios;
  axios2.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios2.defaults, instanceConfig));
  };
  axios2.Cancel = require_Cancel();
  axios2.CancelToken = require_CancelToken();
  axios2.isCancel = require_isCancel();
  axios2.all = function all(promises) {
    return Promise.all(promises);
  };
  axios2.spread = require_spread();
  axios2.isAxiosError = require_isAxiosError();
  module2.exports = axios2;
  module2.exports.default = axios2;
});

// node_modules/axios/index.js
var require_axios2 = __commonJS((exports, module2) => {
  module2.exports = require_axios();
});

// netlify/functions/spotify.ts
__markAsModule(exports);
__export(exports, {
  handler: () => handler
});
var qs = __toModule(require_lib());
var import_axios = __toModule(require_axios2());
var handler = async (event, context) => {
  const url = `https://accounts.spotify.com/api/token`;
  const client_id = process.env["client-id"] || "CLIENT-ID";
  const client_secret = process.env["secret"] || "CLIENT-SECRET";
  const data = {grant_type: "client_credentials"};
  try {
    const resp = await import_axios.default.post(url, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
      }
    });
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        ok: false,
        data: resp.data
      })
    };
  } catch (error) {
    return {
      statusCode: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        ok: false,
        msg: "Verifique credenciales"
      })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=spotify.js.map
