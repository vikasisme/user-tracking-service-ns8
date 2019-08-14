"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const dataStore_1 = require("../lib/dataStore");
const response_1 = require("../models/response");
const router = express_1.Router();
/**
 * user routes
 */
// :post new user
router.post('/user', [
    express_validator_1.check('email').exists().withMessage('email is required')
        .isEmail().withMessage('enter valid email')
        .custom((value) => __awaiter(this, void 0, void 0, function* () {
        const emailFound = yield dataStore_1.DataStore.emailExist(value);
        if (emailFound) {
            throw new Error("user already exists");
        }
    })),
    express_validator_1.check('password').exists().withMessage('password is required'),
    express_validator_1.check('phone').optional().matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('phone format: ###-###-####')
], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const errors = yield express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(`Request Error - ${errors['errors'][0].msg}`);
        }
        const { email, password, phone } = req.body;
        const userId = yield dataStore_1.DataStore.postUser(email, password, phone);
        const response = new response_1.SuccessCreated({ userId });
        res.status(response.statusCode).json(response);
    }
    catch (e) {
        next(e);
    }
}));
// :get all users
router.get('/users', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield dataStore_1.DataStore.getUsers();
        const response = new response_1.SuccessOK(users);
        res.status(response.statusCode).send(response);
    }
    catch (e) {
        next(e);
    }
}));
// :get user by id
router.get('/user/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield dataStore_1.DataStore.getUserById(userId);
        const response = new response_1.SuccessOK(user);
        res.status(response.statusCode).send(response);
    }
    catch (e) {
        next(e);
    }
}));
// :post events to a user id
router.post('/user/:id/events', [
    express_validator_1.check('type').exists().withMessage('type is required'),
    express_validator_1.check('created').optional().matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).withMessage('date format: YYYY-MM-DD')
], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const errors = yield express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(`Request Error - ${errors['errors'][0].msg}`);
        }
        const userId = req.params.id;
        const { type, created } = req.body;
        const eventId = yield dataStore_1.DataStore.postEvent(userId, type, created ? new Date(created) : created);
        const response = new response_1.SuccessCreated({ eventId });
        res.status(response.statusCode).json(response);
    }
    catch (e) {
        next(e);
    }
}));
// :get events by user id
router.get('/user/:id/events', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const events = yield dataStore_1.DataStore.getEventsByUserId(userId);
        const response = new response_1.SuccessOK(events);
        res.status(response.statusCode).json(response);
    }
    catch (e) {
        next(e);
    }
}));
/**
 * event routes
 */
// :get all events for all users
router.get('/events', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const events = yield dataStore_1.DataStore.getEvents();
        const response = new response_1.SuccessOK(events);
        res.status(response.statusCode).send(response);
    }
    catch (e) {
        next(e);
    }
}));
// :get all events for all users in the last day 
router.get('/events/last-day', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const events = yield dataStore_1.DataStore.getEventsByLastDay();
        const response = new response_1.SuccessOK(events);
        res.status(response.statusCode).send(response);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map