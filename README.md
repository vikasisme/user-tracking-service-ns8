# user-tracking-service-ns8
 RESTful API to support NS8 user tracking.

## Install application dependencies
 `npm i`

## Build the app and run it
 `tsc`
 `node dist\start`

# API-Specification
## POST /user
**creates a new user**

### Sample request 
```json
{
  "email": "test@ns8.com",
  "password": "passwordIsPizza",
  "phone": "333-222-1111"
}
```
### Data Definition
- email
  - string
  - This field is required to create a new user
  - The system must only allow 1 user per unique email address
- password
  - string
  - This field is required to create a new user
- phone number 
  - string
  - This field is optional
  - When provided, the phone number must follow this pattern ###-###-####
### Sample response 
```json
{
    "statusCode": 201,
    "message": "Success: Created!",
    "data": {
        "userId": 136
    }
}
```
___
## GET /users
**returns all users**
### Sample response
```json
{
    "statusCode": 200,
    "message": "Success: OK",
    "data": [
        {
            "id": 1,
            "email": "xy@xx.com",
            "password": "zxczxczxczxc"
        },
        {
            "id": 2,
            "email": "xx@xx.com",
            "password": "zxczxczxczxc",
            "phone": "954-397-1744"
        }
    ]
}
```
___
## GET /user/:id
**return user by id**
### Sample response
```json
{
    "statusCode": 200,
    "message": "Success: OK",
    "data": {
        "id": 1,
        "email": "xx@xx.com",
        "password": "zxczxczxczxc",
        "phone": "954-397-1744"
    }
}
```
___
## POST /user/:id/events
**create an event for the user id**
###Sample request 
```json
{	
	"type": "login",
	"created": "2019-13-31"
}
```
### Data definition
- type
  - This field is required to create a new event
  - The value can be any non-empty string
- created
  - This field is optional
  - When provided date format should be YYYY-MM-DD
  - When not provided - created timestamp is defaulted to timestamp when event data was   received by the application
### Sample response
```json
{
    "statusCode": 201,
    "message": "Success: Created!",
    "data": {
        "eventId": 1
    }
}
```
___
## GET /user/:id/events
**returns events for the user id**
### Sample response
```json
{
    "statusCode": 200,
    "message": "Success: OK",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "type": "login",
            "created": "2019-12-31T00:00:00.000Z"
        },
        {
            "id": 2,
            "userId": 1,
            "type": "login",
            "created": "2019-12-31T00:00:00.000Z"
        }
    ]
}
```
___ 
## GET /events
**returns all events of all users**
### Sample response
```json
{
    "statusCode": 200,
    "message": "Success: OK",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "type": "login",
            "created": "2019-12-31T00:00:00.000Z"
        },
        {
            "id": 2,
            "userId": 1,
            "type": "login",
            "created": "2019-12-31T00:00:00.000Z"
        },
        {
            "id": 3,
            "userId": 2,
            "type": "created",
            "created": "2019-12-31T00:00:00.000Z"
        },
        {
            "id": 4,
            "userId": 2,
            "type": "login",
            "created": "2019-12-31T00:00:00.000Z"
        },
        {
            "id": 5,
            "userId": 3,
            "type": "deleted",
            "created": "2019-12-31T00:00:00.000Z"
        }
    ]
}
```
___
## GET /events/last-day
**returns all events of all users in the last day**
### Sample response
```json
{
    "statusCode": 200,
    "message": "Success: OK",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "type": "login",
            "created": "2019-12-31T00:00:00.000Z"
        },
        {
            "id": 2,
            "userId": 2,
            "type": "login",
            "created": "2019-12-31T00:00:00.000Z"
        },
        {
            "id": 3,
            "userId": 2,
            "type": "created",
            "created": "2019-12-31T00:00:00.000Z"
        }
    ]
}
```
___
## Error Responses
```json
{
    "statusCode": 400,
    "message": "Error: Bad Request",
    "data": {
        "message": "Request Error - phone format: ###-###-####"
    }
}

{
    "statusCode": 404,
    "message": "user not found"
}

{
    "statusCode": 500,
    "message": "Internal Server error"
}
```
___

#Technical Specification
1. node
2. express
3. typescript

#Future Enhancements
- Add swagger open API spec document and use the same schema for request validation and replace express-validator
- Add unit test cases
- Add logging 
- Build a better way to map errors and error responses in error handler
- Add more security factors to the server(X-XSS-Protection, Strict transport security, authentication etc.,) 


