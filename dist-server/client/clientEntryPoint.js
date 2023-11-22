"use strict";

var _queryString = _interopRequireDefault(require("query-string"));
var _lanceTopia = require("@rtsdk/lance-topia");
var _WiggleClientEngine = _interopRequireDefault(require("../client/WiggleClientEngine"));
var _WiggleGameEngine = _interopRequireDefault(require("../common/WiggleGameEngine"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var qsOptions = _queryString["default"].parse(location.search);

// default options, overwritten by query-string options
// is sent to both game engine and client engine
var defaults = {
  traceLevel: _lanceTopia.Lib.Trace.TRACE_NONE,
  delayInputCount: 5,
  scheduler: "render-schedule",
  // Using interpolate because sending fullSyncRate every 5 steps on server.  Extrapolate would try to predict and then undo.
  // Interpolate waits for the server instead of predicting, so there's less teleporting.
  // If increase fullSyncRate, might want to use extrapolate so has some prediction between server updates.
  // However, if have lots of collision in game and need that to be snappy, need to have low fullSyncRate as server controls collision.
  // Higher bending means it'll teleport to the server's truthiness.  Higher bending value: With a higher bending value, the client state will adjust more quickly to match the server state. This can make the game feel more responsive, as the client will closely mirror the server state. However, if there are irregularities in the network (like jitter or packet loss), this can also lead to more noticeable jumps or "teleportation" of game entities, as the client state rapidly adjusts to the server state.
  syncOptions: {
    sync: qsOptions.sync || "interpolate",
    bendingIncrements: 5
  }
};
var options = Object.assign(defaults, qsOptions);

// create a client engine and a game engine
var gameEngine = new _WiggleGameEngine["default"](options);
var clientEngine = new _WiggleClientEngine["default"](gameEngine, options);
document.addEventListener("DOMContentLoaded", function (e) {
  clientEngine.start();
});
//# sourceMappingURL=clientEntryPoint.js.map