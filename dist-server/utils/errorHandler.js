"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;
var errorHandler = function errorHandler(_ref) {
  var credentials = _ref.credentials,
    error = _ref.error,
    functionName = _ref.functionName,
    message = _ref.message;
  try {
    if (credentials !== null && credentials !== void 0 && credentials.interactiveNonce) delete credentials.interactiveNonce;
    console.error(JSON.stringify({
      errorContext: {
        message: message,
        functionName: functionName
      },
      requestContext: {
        credentials: credentials
      },
      error: JSON.stringify(error)
    }));
    return {
      error: error
    };
  } catch (e) {
    console.error("❌ Error printing the logs", e);
    return {
      e: e
    };
  }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map