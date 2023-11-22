"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lanceTopia = require("@rtsdk/lance-topia");
var _Wiggle = _interopRequireDefault(require("./Wiggle"));
var _Food = _interopRequireDefault(require("./Food"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var WiggleGameEngine = /*#__PURE__*/function (_GameEngine) {
  _inherits(WiggleGameEngine, _GameEngine);
  var _super = _createSuper(WiggleGameEngine);
  function WiggleGameEngine(options) {
    var _this;
    _classCallCheck(this, WiggleGameEngine);
    _this = _super.call(this, options);
    _this.physicsEngine = new _lanceTopia.SimplePhysicsEngine({
      gameEngine: _assertThisInitialized(_this),
      collisions: {
        autoResolve: false
      }
    });
    _this.on("preStep", _this.moveAll.bind(_assertThisInitialized(_this)));

    // game variables
    Object.assign(_assertThisInitialized(_this), {
      foodRadius: 0.13,
      headRadius: 0.1,
      bodyRadius: 0.2,
      eyeDist: 0.12,
      eyeRadius: 0.05,
      eyeAngle: 0.8,
      spaceWidth: 8,
      spaceHeight: 20,
      moveDist: 0.035,
      foodCount: 25,
      eatDistance: 0.3,
      collideDistance: 0.2,
      startBodyLength: 15,
      aiCount: 1,
      directionStop: 100,
      hungerTick: 0.01,
      xpPerBlock: 100,
      xpPerFood: 1,
      xpLevelConstant: 0.04,
      error: ""
    });
    return _this;
  }
  _createClass(WiggleGameEngine, [{
    key: "registerClasses",
    value: function registerClasses(serializer) {
      serializer.registerClass(_Wiggle["default"]);
      serializer.registerClass(_Food["default"]);
    }
  }, {
    key: "start",
    value: function start() {
      _get(_getPrototypeOf(WiggleGameEngine.prototype), "start", this).call(this);
    }
  }, {
    key: "randPos",
    value: function randPos() {
      var x = (Math.random() - 0.5) * this.spaceWidth;
      var y = (Math.random() - 0.5) * this.spaceHeight;
      return new _lanceTopia.TwoVector(x, y);
    }
  }, {
    key: "moveAll",
    value: function moveAll(stepInfo) {
      var _this2 = this;
      if (stepInfo.isReenact) return;
      this.world.forEachObject(function (id, obj) {
        if (obj instanceof _Wiggle["default"]) {
          // if the position changed, add a body part and trim the length
          var pos = obj.position.clone();
          if (obj.bodyParts.length === 0 || pos.subtract(obj.bodyParts[obj.bodyParts.length - 1]).length() > 0.05) {
            obj.bodyParts.push(obj.position.clone());
            while (obj.bodyLength < obj.bodyParts.length) obj.bodyParts.shift();
          }

          // if not stopped, move along
          if (obj.direction === _this2.directionStop) return;
          var move = new _lanceTopia.TwoVector(Math.cos(obj.direction), Math.sin(obj.direction));
          move.multiplyScalar(_this2.moveDist);
          obj.position.add(move);
          obj.position.y = Math.min(obj.position.y, _this2.spaceHeight / 2);
          obj.position.y = Math.max(obj.position.y, -_this2.spaceHeight / 2);
          obj.position.x = Math.min(obj.position.x, _this2.spaceWidth / 2);
          obj.position.x = Math.max(obj.position.x, -_this2.spaceWidth / 2);
        }
      });
    }
  }, {
    key: "processInput",
    value: function processInput(inputData, playerId) {
      _get(_getPrototypeOf(WiggleGameEngine.prototype), "processInput", this).call(this, inputData, playerId);

      // get the player's primary object
      var player = this.world.queryObject({
        playerId: playerId
      });
      if (player) {
        player.direction = inputData.input;
      }
    }
  }]);
  return WiggleGameEngine;
}(_lanceTopia.GameEngine);
exports["default"] = WiggleGameEngine;
//# sourceMappingURL=WiggleGameEngine.js.map