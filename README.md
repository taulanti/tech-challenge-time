### Tech stack used
###### This project was done using NestJs a progressive Node.js framework for building efficient, reliable and scalable server-side applications.It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).
#### Some of the advantages of this framework:
1. Gives you true flexibility by allowing use of any other libraries thanks to modular architecture.
2. An adaptable ecosystem that is a fully-fledged backbone for all kinds of server-side applications.
3. Takes advantage of latest JavaScript features, bringing design patterns and mature solutions to node.js world.
4. It is becoming a tech-agnostic platform.


#### Back-end Application structure
##### Entity models
   ######  **user** and **task**, with one - to many - relationship.
##### Overall structure
```
  - common
     - contains authentication configuration and passport strategies, also decorators
  - config
     - contains all configuration used accross the application including dynamically loading environment variables
  - task
     - contains the task entity, controller and the service.
  - user
     - contains the user entity, controller and the service.
- 
```
#### More detaild structure

##### Internal component structure (task and user)
  1. ###### model folder contains the entity definition of the actor (user or task)
  2. ###### repository contains the implementation of communication with database.
  3. ###### "entity".service.ts is a middle layer between repository and controller.
  4. ###### "entity".controller.ts is the file with defined api routes.
  5. ###### dto contains the dto-s used for requests.
  6. ###### "entity".module.ts, where dependency injection takes place.


#### Libraries and frameworks
##### Database
  1. ###### Type of database used is PostgreSQL. It is deployed on Heroku.
  2. ###### I have used typorm, a typescript ORM that comes built-in with NestJs. It offers an interface with all kind of databases                   (sql, nosql and grap) and covers top vendors. It is a single sourceo of truth, it is easy to change between types by just               changing the "type" field at configs to ex: mysql, mongodb etc.
##### Server
 1. ###### Express
##### Authentication
 1. ###### Passport, Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively              dropped in to any Express-based web application, it offers authentication with twitter, facebook, google and many more.                  NestJs has the Passport integrated as its module.
 2. ###### JWT
 ##### Tests
  1. ###### Jest, offered as NestJs module.
  
 ##### Other libraries
  1. ###### Bcrypt, for securing the passwords.
  2. ###### hapi/joi, for validating the config data

#### Front-end Application
 1. ###### Built with ReactJs, react-redux, reactstrap, axios.
 2. ###### Easytimer.js, a timer library build with all necessary operations such as start, stop, reset, pause. My previous alternative             was to update the time component once every 1000 milliseconds using setInterval(), using the library is cleaner and more                 compact. 
 ---
#### How to start the app
 1. ##### Start the back-end server -> npm start
 2. ##### Start the front-end server -> npm start
 
#### User flow
1. ##### Top right are the register and login buttons. To use the app you should be registered and authenticated.
 ![alt text](https://github.com/taulanti/tech-challenge-time/tree/master/picture/1.PNG "Logo Title Text 1")
 
2. ##### On the left side, at the timer, press "Start" to start the timer, and immediately a form will appear to fill accordingly.
![alt text](https://github.com/taulanti/tech-challenge-time/tree/master/picture/2.PNG "Logo Title Text 2")

3. ##### After you are done with the task press "Finish" and the task will be saved and displayed on the right side.
![alt text](https://github.com/taulanti/tech-challenge-time/tree/master/picture/3.PNG "Logo Title Text 3")
 
 #### Testing
  1. ##### Start the backend server => npm start
  2. ##### Start the tests => npm run test:e2e, currently supports only integration tests.
  
 
 ### Future improvements
   1. #### Create a Base entity and service for more general components.
   2. #### Write unit tests
   3. #### Add support for production.
   4. #### Polish the front-end
 


---
# Pento tech challenge

Thanks for taking the time to do our tech challenge. 

The challenge is to build a small full stack web app, that can help a freelancer track their time.

It should satisfy these user stories:

- As a user, I want to be able to start a time tracking session
- As a user, I want to be able to stop a time tracking session
- As a user, I want to be able to name my time tracking session
- As a user, I want to be able to save my time tracking session when I am done with it
- As a user, I want an overview of my sessions for the day, week and month
- As a user, I want to be able to close my browser and shut down my computer and still have my sessions visible to me when I power it up again.

## Getting started

You can fork this repo and use the fork as a basis for your project. We don't have any requirements on what stack you use to solve the task, so there is nothing set up beforehand.

## Timing

- Don't spend more than a days work on this challenge. We're not looking for perfection, rather try to show us something special and have reasons for your decisions.
- Get back to us when you have a timeline for when you are done.

## Notes

 - This is technically possible to implement only on the frontend, but please take the opportunity to show your skills on the entire stack 
 - Please focus more on code quality, building a robust service and such, than on the UI.
