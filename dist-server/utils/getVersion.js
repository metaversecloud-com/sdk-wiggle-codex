"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersion = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var getVersion = function getVersion() {
  try {
    var packageJsonContent = _fs["default"].readFileSync("./package.json", "utf8");
    var packageJson = JSON.parse(packageJsonContent);
    var version = packageJson.version;
    return version;
  } catch (error) {
    console.error("Error reading or parsing package.json:", error);
    return error;
  }
};
exports.getVersion = getVersion;
//# sourceMappingURL=getVersion.js.map