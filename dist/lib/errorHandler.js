"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../models/response");
exports.urlNotFound = (req, res, next) => {
    const err = new response_1.NotFound();
    res.status(err.statusCode).json(err);
};
exports.routerErrorHandler = (err, req, res, next) => {
    let errorResponse;
    if (err.message == ('user not found' || 'events not found')) {
        errorResponse = new response_1.NotFound(err.message);
    }
    else if (err.message.includes('Request Error')) {
        errorResponse = new response_1.BadRequest({ message: err.message });
    }
    else {
        errorResponse = new response_1.InternalServerError(err.message);
    }
    res.status(errorResponse.statusCode).json(errorResponse);
};
//# sourceMappingURL=errorHandler.js.map