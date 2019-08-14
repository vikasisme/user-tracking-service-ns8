/**User Model
 * @param  {number} id - unique id for the user 
 * @param  {string} email - unique email for each user
 * @param  {string} password - user password 
 * @param  {string} phone - format: ###-###-####; optional
 */
export class User {
    public id: number
    public email: string
    public password: string
    public phone?: string
    public constructor(id: number, email: string, password: string, phone?: string){
        this.id = id;
        this.email = email;
        this.password = password;
        if (phone) {
            this.phone = phone
        }
    }
};