"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalError = exports.notFound = void 0;
function notFound(req, res, next) {
    res.status(404).json({ message: 'This route does not exist' });
}
exports.notFound = notFound;
function internalError(err, req, res, next) {
    console.error('ERROR', req.method, req.path, err);
    if (!res.headersSent) {
        res.status(500).json({ message: 'Internal server error. Check the server console' });
    }
}
exports.internalError = internalError;
//# sourceMappingURL=index.js.map