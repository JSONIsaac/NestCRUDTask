"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleLogger = simpleLogger;
function simpleLogger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
//# sourceMappingURL=simple-logger.middleware.js.map