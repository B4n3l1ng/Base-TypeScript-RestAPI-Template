"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const error_handling_1 = require("./error-handling");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
require('dotenv').config();
require('./db');
const app = (0, express_1.default)();
const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:5173';
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: [FRONTEND_URL],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/ping', (_req, res) => {
    return res.json('pong 🏓');
});
//Routes here
app.use('/auth', auth_routes_1.default);
//Error handling
app.use(error_handling_1.notFound);
app.use(error_handling_1.internalError);
exports.default = app;
//# sourceMappingURL=app.js.map