"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getVisitor = require("./getVisitor.js");
Object.keys(_getVisitor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getVisitor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getVisitor[key];
    }
  });
});
var _topiaInit = require("./topiaInit.js");
Object.keys(_topiaInit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _topiaInit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _topiaInit[key];
    }
  });
});
//# sourceMappingURL=index.js.map