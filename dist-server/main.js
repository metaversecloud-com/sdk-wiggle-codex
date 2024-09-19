"use strict";

var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _socket = _interopRequireDefault(require("socket.io"));
var _lanceTopia = require("@rtsdk/lance-topia");
var _WiggleServerEngine = _interopRequireDefault(require("./server/WiggleServerEngine"));
var _WiggleGameEngine = _interopRequireDefault(require("./common/WiggleGameEngine"));
var _index = require("./utils/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = process.env.PORT || 3000;
var INDEX = _path["default"].join(__dirname, "../dist/index.html");

// define routes and socket
var server = (0, _express["default"])();
server.get("/", function (req, res) {
  res.sendFile(INDEX);
});
var SERVER_START_DATE = new Date();
server.get("/system/health", function (req, res) {
  return res.json({
    appVersion: (0, _index.getVersion)(),
    status: "OK",
    serverStartDate: SERVER_START_DATE,
    envs: {
      API_KEY: process.env.API_KEY ? "SET" : "NOT SET",
      INSTANCE_DOMAIN: process.env.INSTANCE_DOMAIN,
      INTERACTIVE_KEY: process.env.INTERACTIVE_KEY,
      GOOGLESHEETS_CLIENT_EMAIL: process.env.GOOGLESHEETS_CLIENT_EMAIL ? "SET" : "NOT SET",
      GOOGLESHEETS_SHEET_ID: process.env.GOOGLESHEETS_SHEET_ID ? "SET" : "NOT SET",
      GOOGLESHEETS_PRIVATE_KEY: process.env.GOOGLESHEETS_PRIVATE_KEY ? "SET" : "NOT SET",
      NODE_ENV: process.env.NODE_ENV
    }
  });
});
server.use("/", _express["default"]["static"](_path["default"].join(__dirname, "../dist/")));
var requestHandler = server.listen(PORT, function () {
  return console.log("Listening on ".concat(PORT));
});
var io = (0, _socket["default"])(requestHandler);

// Game Instances
var gameEngine = new _WiggleGameEngine["default"]({
  traceLevel: _lanceTopia.Lib.Trace.TRACE_ALL
});
var serverEngine = new _WiggleServerEngine["default"](io, gameEngine, {
  debug: {},
  updateRate: 2,
  fullSyncRate: 12,
  timeoutInterval: 600
});

// start the game
serverEngine.start();
//# sourceMappingURL=main.js.map