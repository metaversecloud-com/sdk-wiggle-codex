"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visitor = exports.DroppedAsset = exports.Asset = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var _require = require("@rtsdk/topia/dist/index.cjs"),
  AssetFactory = _require.AssetFactory,
  DroppedAssetFactory = _require.DroppedAssetFactory,
  Topia = _require.Topia,
  VisitorFactory = _require.VisitorFactory;
var config = {
  apiDomain: process.env.INSTANCE_DOMAIN || "api.topia.io",
  apiProtocol: process.env.INSTANCE_PROTOCOL || "https",
  interactiveKey: process.env.INTERACTIVE_KEY,
  interactiveSecret: process.env.INTERACTIVE_SECRET
};
var myTopiaInstance = new Topia(config);
var Asset = new AssetFactory(myTopiaInstance);
exports.Asset = Asset;
var DroppedAsset = new DroppedAssetFactory(myTopiaInstance);
exports.DroppedAsset = DroppedAsset;
var Visitor = new VisitorFactory(myTopiaInstance);
exports.Visitor = Visitor;
//# sourceMappingURL=topiaInit.js.map