"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**User Model
 * @param  {number} id - unique id for the user
 * @param  {string} email - unique email for each user
 * @param  {string} password - user password
 * @param  {string} phone - format: ###-###-####; optional
 */
class User {
    constructor(id, email, password, phone) {
        this.id = id;
        this.email = email;
        this.password = password;
        if (phone) {
            this.phone = phone;
        }
    }
}
exports.User = User;
;
//# sourceMappingURL=user.js.map