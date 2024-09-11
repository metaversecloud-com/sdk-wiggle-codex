"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _addNewRowToGoogleSheets = require("./addNewRowToGoogleSheets");
Object.keys(_addNewRowToGoogleSheets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _addNewRowToGoogleSheets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _addNewRowToGoogleSheets[key];
    }
  });
});
var _errorHandler = require("./errorHandler");
Object.keys(_errorHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _errorHandler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errorHandler[key];
    }
  });
});
var _getVersion = require("./getVersion");
Object.keys(_getVersion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getVersion[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getVersion[key];
    }
  });
});
//# sourceMappingURL=index.js.map