"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param  {string} msg - response status message
 * @param  {number} code - response status code
 * @param  {responseData} data? - responseData; optional
 */
class APIResponse {
    constructor(msg, code, data) {
        this.message = msg;
        this.statusCode = code;
        if (data) {
            this.data = data;
        }
    }
}
exports.APIResponse = APIResponse;
;
/**
 * Success Response
 */
class SuccessOK {
    constructor(data) {
        this.statusCode = 200;
        this.message = 'Success: OK';
        if (data) {
            this.data = data;
        }
    }
}
exports.SuccessOK = SuccessOK;
class SuccessCreated {
    constructor(data) {
        this.statusCode = 201;
        this.message = 'Success: Created!';
        if (data) {
            this.data = data;
        }
    }
}
exports.SuccessCreated = SuccessCreated;
/**
 * Error Response
 */
class InternalServerError {
    constructor(msg) {
        this.statusCode = 500;
        this.message = 'Error: Internal Server error';
        if (msg) {
            this.message = msg;
        }
    }
}
exports.InternalServerError = InternalServerError;
class NotFound {
    constructor(msg) {
        this.statusCode = 404;
        this.message = 'Error: Not found';
        if (msg) {
            this.message = msg;
        }
    }
}
exports.NotFound = NotFound;
class BadRequest {
    constructor(data) {
        this.statusCode = 400;
        this.message = 'Error: Bad Request';
        if (data) {
            this.data = data;
        }
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=response.js.map