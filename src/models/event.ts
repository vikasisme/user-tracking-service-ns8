/**Event model
 * @param  {number} id - unique id for the event
 * @param  {number} userId - user id to which the event belongs
 * @param  {string} type - event type definition
 * @param  {Date} created? - event created timestamp; defaulted to model created timestamp if not provided
 */
export class Event {
    public id: number
    public userId: number
    public type: string
    public created: Date
    public constructor(id: number, userId: number, type: string, created?: Date) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        if (created) {
            this.created = created;
        } else {
            this.created = new Date();
        }
    }
}