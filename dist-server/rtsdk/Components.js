"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitorInfo = exports.StatsBoard = exports.Stats = exports.Leaderboard = void 0;
var _index = require("./index.js");
var _index2 = require("@rtsdk/topiacomponents/dist/index.cjs");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Pull in TopiaComponents and instantiate with topiaInit so use correct developer key
var Leaderboard = {
  // Not used in wiggle anymore but worth keeping in case we want to use in the future
  // This originally displayed in world as it's own component
  show: function show(props) {
    return (0, _index2.showLeaderboard)(_objectSpread(_objectSpread({}, props), {}, {
      InteractiveAsset: _index.InteractiveAsset,
      getAssetAndDataObject: _index.getAssetAndDataObject
    }));
  },
  hide: function hide(props) {
    return (0, _index2.hideLeaderboard)(_objectSpread(_objectSpread({}, props), {}, {
      World: _index.World
    }));
  },
  update: function update(props) {
    return (0, _index2.updateLeaderboard)(_objectSpread(_objectSpread({}, props), {}, {
      World: _index.World,
      getAssetAndDataObject: _index.getAssetAndDataObject
    }));
  }
};
exports.Leaderboard = Leaderboard;
var VisitorInfo = {
  // Payload: { isAdmin, roomName, username }
  // Used to determine if admin and move users to correct roomName based on assetId.  Also pulls their username
  getRoomAndUsername: function getRoomAndUsername(props) {
    return (0, _index2.getRoomAndUsername)(_objectSpread(_objectSpread({}, props), {}, {
      Visitor: _index.Visitor
    }));
  },
  // Used to specify how we are calculating the room so that query params can be properly matched on front end and backend.
  roomBasedOn: _index2.roomBasedOn,
  updateLastVisited: function updateLastVisited(props) {
    return _updateLastVisited(_objectSpread(_objectSpread({}, props), {}, {
      Visitor: _index.Visitor
    }));
  }
};
exports.VisitorInfo = VisitorInfo;
var Stats = {
  saveStat: function saveStat(props) {
    return _saveStat(_objectSpread(_objectSpread({}, props), {}, {
      User: _index.User
    }));
  },
  incrementStat: function incrementStat(props) {
    return _incrementStat(_objectSpread(_objectSpread({}, props), {}, {
      User: _index.User
    }));
  },
  getStats: function getStats(props) {
    return _getStats(_objectSpread(_objectSpread({}, props), {}, {
      User: _index.User
    }));
  }
};
exports.Stats = Stats;
var namePrefix = "multiplayer_statsboard";
var statKeys = ["name", "level", "XP", "blocks", {
  blocksPerGame: "Blocks / Game"
}, {
  foodEaten: "Food Eaten"
}, {
  foodPerGame: "Food / Game"
}];
var StatsBoard = {
  // Not used in wiggle anymore but worth keeping in case we want to use in the future
  // This originally displayed in world as it's own component
  show: function show(props) {
    return (0, _index2.showBoard)(_objectSpread(_objectSpread({}, props), {}, {
      contentWidth: 475,
      distBetweenRows: 25,
      frameId: "ydAK6dqB3w9Q7qqVmSrS",
      keysArray: statKeys,
      namePrefix: namePrefix,
      InteractiveAsset: _index.InteractiveAsset,
      getAssetAndDataObject: _index.getAssetAndDataObject,
      // yOffset: -375,
      xOffset: 550
    }));
  },
  hide: function hide(props) {
    return (0, _index2.hideBoard)(_objectSpread(_objectSpread({}, props), {}, {
      namePrefix: namePrefix,
      World: _index.World
    }));
  },
  update: function update(props) {
    return (0, _index2.updateBoard)(_objectSpread(_objectSpread({}, props), {}, {
      World: _index.World,
      getAssetAndDataObject: _index.getAssetAndDataObject,
      keysArray: statKeys,
      namePrefix: namePrefix
    }));
  }
};

// TO MOVE TO RTSDK COMPONENTS
// VISITOR
// const getVisitorAndDataObject = async ({ Visitor, query }) => {
//   const { assetId, interactivePublicKey, interactiveNonce, urlSlug, visitorId } = query;
//   try {
//     const visitor = await Visitor.get(visitorId, urlSlug, {
//       credentials: {
//         assetId,
//         interactiveNonce,
//         interactivePublicKey,
//         visitorId,
//       },
//     });
//     if (!visitor || !visitor.username) throw "Not in world";
//     await visitor.fetchVisitorDataObject();
//     return visitor;
//   } catch (e) {
//     // Not actually in the world.  Should prevent from seeing game.
//     if (e && e.data && e.data.errors) console.log("Error getting visitor", e?.data?.errors);
//     else if (e) console.log("Error getting visitor", e);
//   }
// };
exports.StatsBoard = StatsBoard;
var _updateLastVisited = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var Visitor, query, assetId, interactivePublicKey, interactiveNonce, urlSlug, visitorId, visitor, _e$data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          Visitor = _ref.Visitor, query = _ref.query;
          assetId = query.assetId, interactivePublicKey = query.interactivePublicKey, interactiveNonce = query.interactiveNonce, urlSlug = query.urlSlug, visitorId = query.visitorId;
          _context.prev = 2;
          _context.next = 5;
          return Visitor.get(visitorId, urlSlug, {
            credentials: {
              assetId: assetId,
              interactiveNonce: interactiveNonce,
              interactivePublicKey: interactivePublicKey,
              visitorId: visitorId
            }
          });
        case 5:
          visitor = _context.sent;
          if (!(!visitor || !visitor.username)) {
            _context.next = 8;
            break;
          }
          throw "Not in world";
        case 8:
          _context.next = 10;
          return visitor.updateDataObject({
            lastVisited: Date.now()
          });
        case 10:
          return _context.abrupt("return", visitor);
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          // Not actually in the world.  Should prevent from seeing game.
          if (_context.t0 && _context.t0.data && _context.t0.data.errors) console.log("Error updating last visited", _context.t0 === null || _context.t0 === void 0 ? void 0 : (_e$data = _context.t0.data) === null || _e$data === void 0 ? void 0 : _e$data.errors);else if (_context.t0) console.log("Error updating last visited", _context.t0);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 13]]);
  }));
  return function _updateLastVisited(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// USER
var _saveStat = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
    var User, profileId, stat, user, dataObject, stats;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          User = _ref3.User, profileId = _ref3.profileId, stat = _ref3.stat;
          _context2.prev = 1;
          _context2.next = 4;
          return User.create({
            profileId: profileId
          });
        case 4:
          user = _context2.sent;
          _context2.next = 7;
          return user.fetchDataObject();
        case 7:
          dataObject = user.dataObject;
          stats = dataObject.stats || {};
          _context2.next = 11;
          return user.updateDataObject({
            stats: _objectSpread(_objectSpread({}, stats), {}, {
              stat: stat
            })
          });
        case 11:
          return _context2.abrupt("return", user);
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          console.log("Error saving stat", _context2.t0);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 14]]);
  }));
  return function _saveStat(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var _incrementStat = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref5) {
    var User, profileId, statKey, incrementAmount, user, dataObject, stats, quantity;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          User = _ref5.User, profileId = _ref5.profileId, statKey = _ref5.statKey, incrementAmount = _ref5.incrementAmount;
          _context3.prev = 1;
          _context3.next = 4;
          return User.create({
            profileId: profileId
          });
        case 4:
          user = _context3.sent;
          _context3.next = 7;
          return user.fetchDataObject();
        case 7:
          dataObject = user.dataObject;
          stats = dataObject.stats || {};
          quantity = stats[statKey] || 0;
          quantity += incrementAmount;
          stats[statKey] = quantity;
          _context3.next = 14;
          return user.updateDataObject({
            stats: stats
          });
        case 14:
          return _context3.abrupt("return", stats);
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](1);
          console.log("Error incrementing stat", _context3.t0);
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 17]]);
  }));
  return function _incrementStat(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
var _getStats = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref7) {
    var User, profileId, user, dataObject;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          User = _ref7.User, profileId = _ref7.profileId;
          _context4.prev = 1;
          _context4.next = 4;
          return User.create({
            profileId: profileId
          });
        case 4:
          user = _context4.sent;
          _context4.next = 7;
          return user.fetchDataObject();
        case 7:
          dataObject = user.dataObject;
          return _context4.abrupt("return", dataObject.stats);
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          console.log("Error getting stats", _context4.t0);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 11]]);
  }));
  return function _getStats(_x4) {
    return _ref8.apply(this, arguments);
  };
}();
//# sourceMappingURL=Components.js.map