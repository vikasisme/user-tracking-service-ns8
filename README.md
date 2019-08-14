# user-tracking-service-ns8
 RESTful API to support NS8 user tracking.

## Install application dependencies
 `npm i`

## Build the app and run it
 `tsc`
 `node dist\start`

# API-Specification
___
## POST /user
**creates a new user**

### Sample request data
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
___
## GET /users
**returns all users**
## GET /user/:id
**return user by id**
## POST /user/:id/events
**create an event for the user id**
## GET /user/:id/events
**returns events for the user id** 
## GET /events
**returns all events of all users**
## GET /events/last-day
**returns all events of all users in the last day**

