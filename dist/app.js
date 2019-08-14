"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./lib/errorHandler");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/', routes_1.default);
app.use(errorHandler_1.urlNotFound);
app.use(errorHandler_1.routerErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map