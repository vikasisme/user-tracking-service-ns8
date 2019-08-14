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
const event_1 = require("../models/event");
const user_1 = require("../models/user");
/**
 * DataStore - service layer for in-memory storage
 */
class DataStore {
}
DataStore.userId = 0; // sequence user ids
DataStore.eventId = 0; // sequence event ids
DataStore.users = []; // users in-memory store
DataStore.events = []; // events in-memory store
/**
 * Creates a new user
 * resolves - a new user id
 * rejects - any runtime error
 */
DataStore.postUser = (email, password, phone) => new Promise((resolve, reject) => {
    try {
        const user = new user_1.User(++DataStore.userId, email, password, phone);
        DataStore.users.push(user);
        resolve(user.id);
    }
    catch (e) {
        reject(e);
    }
});
/**
 * Returns all users
 * resolves - array of users
 * rejects - any runtime error
 */
DataStore.getUsers = () => new Promise((resolve, reject) => {
    try {
        resolve(DataStore.users);
    }
    catch (e) {
        reject(e);
    }
});
/**
 * Returns user by id
 * resolves - user retrieved by id
 * rejects - user not found or any runtime error
 */
DataStore.getUserById = (id) => new Promise((resolve, reject) => {
    try {
        const user = DataStore.users.find(user => user.id == id);
        if (user) {
            resolve(user);
        }
        else {
            reject(new Error('user not found'));
        }
    }
    catch (e) {
        reject(e);
    }
});
/**
 * Creates a new Event
 * resolves - new event id
 * rejects - user not found or any runtime error
 */
DataStore.postEvent = (userId, eventType, eventDate) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield DataStore.getUserById(userId);
        const event = new event_1.Event(++DataStore.eventId, user.id, eventType, eventDate);
        DataStore.events.push(event);
        resolve(event.id);
    }
    catch (e) {
        reject(e);
    }
}));
/**
 * Returns all events for all users
 * resolves - array of all events of all users
 * rejects - any runtime error
 */
DataStore.getEvents = () => new Promise((resolve, reject) => {
    try {
        resolve(DataStore.events);
    }
    catch (e) {
        reject(e);
    }
});
/**
 * Returns all events of a user-id
 * resolves - array of events
 * rejects - events not found or any run time error
 */
DataStore.getEventsByUserId = (userId) => new Promise((resolve, reject) => {
    try {
        const events = DataStore.events.filter(event => event.userId == userId);
        if (events && events.length) {
            resolve(events);
        }
        else {
            reject(new Error('events not found'));
        }
    }
    catch (e) {
        reject(e);
    }
});
/**
 * Returns all events for all users for the last day(all events greater than yesterday)
 * resolves - array of events
 * rejects - events not found or any run time error
 */
DataStore.getEventsByLastDay = () => new Promise((resolve, reject) => {
    try {
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        const event = DataStore.events.filter(event => event.created > lastDay);
        if (event && event.length) {
            resolve(event);
        }
        else {
            reject(new Error('events not found'));
        }
    }
    catch (e) {
        reject(e);
    }
});
/**
 * Returns result for email exist check;
 * resolves - true if email exist
 * rejects - false if email doesn't exist
 */
DataStore.emailExist = (email) => new Promise((resolve, reject) => {
    try {
        const emailFound = DataStore.users.find(user => user.email == email);
        if (emailFound) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    }
    catch (e) {
        reject(e);
    }
});
exports.DataStore = DataStore;
//# sourceMappingURL=dataStore.js.map