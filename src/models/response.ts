
export type responseData = object[] | object
/**
 * @param  {string} msg - response status message
 * @param  {number} code - response status code
 * @param  {responseData} data? - responseData; optional
 */
export class APIResponse {
    public statusCode: number
    public message: string
    public data? : responseData 
    public constructor(msg: string, code: number, data?: responseData ) {
        this.message = msg;
        this.statusCode = code;
        if(data){
            this.data = data;
        }
    }
};

/**
 * Success Response
 */

export class SuccessOK implements APIResponse {
    public statusCode: number = 200
    public message: string =  'Success: OK'
    public data?: responseData
    public constructor(data?: responseData){
        if(data){
            this.data = data;
        }
    }
}

export class SuccessCreated implements APIResponse {
    public statusCode: number = 201
    public message: string = 'Success: Created!'
    public data?: responseData
    public constructor(data?: responseData) {
        if(data){
            this.data = data;
        }
    }
}

/**
 * Error Response
 */

export class InternalServerError implements APIResponse {
    public statusCode: number = 500
    public message: string = 'Error: Internal Server error'
    public constructor(msg?: string) {
        if (msg) {
            this.message = msg;
        }
    }
}

export class NotFound implements APIResponse {
    public statusCode: number = 404
    public message: string = 'Error: Not found'
    public constructor(msg? : string){
        if(msg){
            this.message = msg;
        }
    }
}

export class BadRequest implements APIResponse {
    public statusCode: number = 400
    public message: string = 'Error: Bad Request'
    public data? : responseData;
    public constructor(data? : responseData){
        if(data){
            this.data = data;
        }
    }
}


