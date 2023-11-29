"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lanceTopia = require("@rtsdk/lance-topia");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Wiggle = /*#__PURE__*/function (_DynamicObject) {
  _inherits(Wiggle, _DynamicObject);
  var _super = _createSuper(Wiggle);
  function Wiggle(gameEngine, options, props) {
    var _this;
    _classCallCheck(this, Wiggle);
    _this = _super.call(this, gameEngine, options, props);
    _this["class"] = Wiggle;
    _this.bodyParts = [];
    _this.score = 0;
    _this.stat_XP = "";
    _this.stat_level = "";
    _this.stat_blocks = "";
    _this.stat_blocksPerGame = "";
    _this.stat_foodPerGame = "";
    return _this;
  }
  _createClass(Wiggle, [{
    key: "syncTo",
    value: function syncTo(other) {
      _get(_getPrototypeOf(Wiggle.prototype), "syncTo", this).call(this, other);
      this.direction = other.direction;
      this.bodyLength = other.bodyLength;
      this.name = other.name;
      this.score = other.score;
      this.stat_XP = other.stat_XP;
      this.stat_level = other.stat_level;
      this.stat_blocks = other.stat_blocks;
      this.stat_blocksPerGame = other.stat_blocksPerGame;
      this.stat_foodPerGame = other.stat_foodPerGame;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Wiggle::".concat(_get(_getPrototypeOf(Wiggle.prototype), "toString", this).call(this), " direction=").concat(this.direction, " length=").concat(this.bodyLength, " name=").concat(this.name, " score=").concat(this.score);
    }
  }], [{
    key: "netScheme",
    get: function get() {
      return Object.assign({
        direction: {
          type: _lanceTopia.BaseTypes.TYPES.FLOAT32
        },
        bodyLength: {
          type: _lanceTopia.BaseTypes.TYPES.INT16
        },
        score: {
          type: _lanceTopia.BaseTypes.TYPES.INT16
        },
        name: {
          type: _lanceTopia.BaseTypes.TYPES.STRING
        },
        stat_XP: {
          type: _lanceTopia.BaseTypes.TYPES.STRING
        },
        stat_level: {
          type: _lanceTopia.BaseTypes.TYPES.STRING
        },
        stat_blocks: {
          type: _lanceTopia.BaseTypes.TYPES.STRING
        },
        stat_blocksPerGame: {
          type: _lanceTopia.BaseTypes.TYPES.STRING
        },
        stat_foodPerGame: {
          type: _lanceTopia.BaseTypes.TYPES.STRING
        }
      }, _get(_getPrototypeOf(Wiggle), "netScheme", this));
    }
  }]);
  return Wiggle;
}(_lanceTopia.DynamicObject);
exports["default"] = Wiggle;
//# sourceMappingURL=Wiggle.js.map