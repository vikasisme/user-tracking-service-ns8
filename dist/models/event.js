"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**Event model
 * @param  {number} id - unique id for the event
 * @param  {number} userId - user id to which the event belongs
 * @param  {string} type - event type definition
 * @param  {Date} created? - event created timestamp; defaulted to model created timestamp if not provided
 */
class Event {
    constructor(id, userId, type, created) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        if (created) {
            this.created = created;
        }
        else {
            this.created = new Date();
        }
    }
}
exports.Event = Event;
//# sourceMappingURL=event.js.map