import { Event } from '../models/event';
import { User } from '../models/user';

/**
 * DataStore - service layer for in-memory storage
 */
export class DataStore {
    private static userId: number = 0 // sequence user ids
    private static eventId: number = 0 // sequence event ids
    private static users: User[] = []; // users in-memory store
    private static events: Event[] = []; // events in-memory store
    
    /**  
     * Creates a new user
     * resolves - a new user id
     * rejects - any runtime error 
     */
    public static postUser = (email: string, password: string, phone?: string): Promise<number> => new Promise((resolve, reject) => {
        try{
            const user = new User(++DataStore.userId, email, password, phone);
            DataStore.users.push(user);
            resolve(user.id);
        } catch(e){
            reject(e);
        }
    });

    /**
     * Returns all users
     * resolves - array of users
     * rejects - any runtime error
     */
    public static getUsers = () : Promise<User[]> => new Promise((resolve, reject) => {
        try{
            resolve(DataStore.users);
        } catch(e){
            reject(e);
        }
    });

    
    /**
     * Returns user by id
     * resolves - user retrieved by id
     * rejects - user not found or any runtime error
     */
    public static getUserById = (id: number): Promise<User> => new Promise((resolve, reject) => {
        try{
            const user = DataStore.users.find(user => user.id == id);
            if(user){
                resolve(user);
            } else {
                reject(new Error('user not found'));
            }
        } catch(e){
            reject(e)
        }
    });

    /**
     * Creates a new Event
     * resolves - new event id
     * rejects - user not found or any runtime error 
     */
    public static postEvent = (userId: number, eventType: string, eventDate?: Date): Promise<number> => new Promise(async(resolve, reject) => {
        try{
            const user = await DataStore.getUserById(userId);
            const event = new Event(++DataStore.eventId, user.id, eventType, eventDate);
            DataStore.events.push(event);
            resolve(event.id);
        } catch(e){
            reject(e);
        }
    });

    /**
     * Returns all events for all users
     * resolves - array of all events of all users
     * rejects - any runtime error
     */
    public static getEvents = (): Promise<Event[]> => new Promise((resolve, reject) => {
        try{
            resolve(DataStore.events);
        } catch(e){
            reject(e);
        }
    });

    /**
     * Returns all events of a user-id
     * resolves - array of events
     * rejects - events not found or any run time error
     */
    public static getEventsByUserId = (userId: number): Promise<Event[]> => new Promise((resolve, reject) => {
        try{
            const events: Event[] = DataStore.events.filter(event => event.userId == userId);
            
            if(events && events.length){
                resolve(events);
            } else {
                reject(new Error('events not found'));
            }
        } catch(e){
            reject(e)
        }
    });

    /**
     * Returns all events for all users for the last day(all events greater than yesterday)
     * resolves - array of events 
     * rejects - events not found or any run time error
     */
    public static getEventsByLastDay = () : Promise<Event[]> => new Promise((resolve, reject) => {
        try{
            const lastDay = new Date();
            lastDay.setDate(lastDay.getDate() - 1);

            const event: Event[] = DataStore.events.filter(event => event.created > lastDay);

            if(event && event.length){
                resolve(event);
            } else {
                reject(new Error('events not found'));
            }
        } catch(e){
            reject(e);
        }
    });
    
    /**
     * Returns result for email exist check;
     * resolves - true if email exist
     * rejects - false if email doesn't exist
     */
    public static emailExist = (email: string): Promise<boolean> => new Promise((resolve, reject) => {
        try{
            const emailFound: User | undefined = DataStore.users.find(user => user.email == email);
            
            if(emailFound){
                resolve(true);
            } else {
                resolve(false);
            }
        } catch(e){
            reject(e);
        }
    });

}