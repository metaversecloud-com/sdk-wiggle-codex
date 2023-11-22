"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lanceTopia = require("@rtsdk/lance-topia");
var _Wiggle = _interopRequireDefault(require("../common/Wiggle"));
var _Food = _interopRequireDefault(require("../common/Food"));
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
var ctx = null;
var canvas = null;
var game = null;
var WiggleRenderer = /*#__PURE__*/function (_Renderer) {
  _inherits(WiggleRenderer, _Renderer);
  var _super = _createSuper(WiggleRenderer);
  function WiggleRenderer(gameEngine, clientEngine) {
    var _this;
    _classCallCheck(this, WiggleRenderer);
    _this = _super.call(this, gameEngine, clientEngine);
    game = gameEngine;
    canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.insertBefore(canvas, document.getElementById("logo"));
    game.w = canvas.width;
    game.h = canvas.height;
    clientEngine.zoom = game.h / game.spaceHeight;
    if (game.w / game.spaceWidth < clientEngine.zoom) clientEngine.zoom = game.w / game.spaceWidth;
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2 / clientEngine.zoom;
    ctx.strokeStyle = ctx.fillStyle = "white";
    return _this;
  }
  _createClass(WiggleRenderer, [{
    key: "draw",
    value: function draw(t, dt) {
      var _this2 = this;
      _get(_getPrototypeOf(WiggleRenderer.prototype), "draw", this).call(this, t, dt);

      // Clear the canvas
      ctx.clearRect(0, 0, game.w, game.h);

      // Transform the canvas
      // Note that we need to flip the y axis since Canvas pixel coordinates
      // goes from top to bottom, while physics does the opposite.
      ctx.save();
      ctx.translate(game.w / 2, game.h / 2); // Translate to the center
      ctx.scale(this.clientEngine.zoom, this.clientEngine.zoom); // Zoom in and flip y axis

      // Draw all things
      game.world.forEachObject(function (id, obj) {
        if (obj instanceof _Wiggle["default"]) _this2.drawWiggle(obj, t);else if (obj instanceof _Food["default"]) _this2.drawFood(obj);
      });
      ctx.restore();
    }
  }, {
    key: "drawWiggle",
    value: function drawWiggle(w, time) {
      var playerColor = "#39FF14";
      var nonPlayerColor = "#2121DE";

      // draw head and body
      var isPlayer = w.playerId === this.gameEngine.playerId;
      var x = w.position.x;
      var y = w.position.y;
      if (isPlayer) ctx.fillStyle = playerColor;else ctx.fillStyle = nonPlayerColor;
      this.drawCircle(x, y, game.headRadius, true);
      for (var i = 0; i < w.bodyParts.length; i++) {
        var nextPos = w.bodyParts[i];
        if (isPlayer) ctx.fillStyle = playerColor;else ctx.fillStyle = nonPlayerColor;
        this.drawCircle(nextPos.x, nextPos.y, game.bodyRadius, true);
      }

      // draw eyes
      var angle = +w.direction;
      if (w.direction === game.directionStop) {
        angle = -Math.PI / 2;
      }
      var eye1 = new _lanceTopia.TwoVector(Math.cos(angle + game.eyeAngle), Math.sin(angle + game.eyeAngle));
      var eye2 = new _lanceTopia.TwoVector(Math.cos(angle - game.eyeAngle), Math.sin(angle - game.eyeAngle));
      eye1.multiplyScalar(game.eyeDist).add(w.position);
      eye2.multiplyScalar(game.eyeDist).add(w.position);
      ctx.fillStyle = "black";
      this.drawCircle(eye1.x, eye1.y, game.eyeRadius, true);
      this.drawCircle(eye2.x, eye2.y, game.eyeRadius, true);
      ctx.fillStyle = "white";
      var fontSize = 0.4;
      ctx.font = "".concat(fontSize, "px Arial");
      var textToFill = w.stat_level ? w.name + " - lvl " + w.stat_level : w.name;
      ctx.fillText(textToFill, x - textToFill.length / (4 / fontSize), y - 0.2);
      ctx.fillStyle = "white";

      // update status
      var timeInt = parseInt(time);
      // Only update DOM on every 18th or so draw
      if (isPlayer && timeInt % 18 === 0) {
        var xp = w.stat_XP ? w.stat_XP : "";
        var level = w.stat_level ? w.stat_level : "";
        var blocks = w.stat_blocks ? w.stat_blocks : "";
        var blocksPerGame = w.stat_blocksPerGame ? w.stat_blocksPerGame : "";
        document.getElementById("wiggle-length").innerHTML = "Your Length: " + w.bodyParts.length;
        document.getElementById("score").innerHTML = "Your Score: " + w.score;
        document.getElementById("xp").innerHTML = "XP: " + xp;
        document.getElementById("level").innerHTML = "Level: " + level;
        document.getElementById("blocks").innerHTML = "Blocks: " + blocks;
        document.getElementById("blocksPerGame").innerHTML = "Per Game: " + blocksPerGame;
      }
    }
  }, {
    key: "drawFood",
    value: function drawFood(f) {
      ctx.strokeStyle = ctx.fillStyle = "#FD0000";
      this.drawCircle(f.position.x, f.position.y, game.foodRadius, true);
      ctx.strokeStyle = ctx.fillStyle = "White";
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y, radius, fill) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      fill ? ctx.fill() : ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawBounds",
    value: function drawBounds() {
      ctx.beginPath();
      ctx.moveTo(-game.spaceWidth / 2, -game.spaceHeight / 2);
      ctx.lineTo(-game.spaceWidth / 2, game.spaceHeight / 2);
      ctx.lineTo(game.spaceWidth / 2, game.spaceHeight / 2);
      ctx.lineTo(game.spaceWidth / 2, -game.spaceHeight / 2);
      ctx.lineTo(-game.spaceWidth / 2, -game.spaceHeight / 2);
      ctx.closePath();
      ctx.stroke();
    }
  }]);
  return WiggleRenderer;
}(_lanceTopia.Renderer);
exports["default"] = WiggleRenderer;
//# sourceMappingURL=WiggleRenderer.js.map