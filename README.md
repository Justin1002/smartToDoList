# Smart To Do List - Midterm Project

A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list. This project was built by Justin Ly, Kaylin Dennis, and Mitchell Gonzalez from FEB21 Cohort of Lighthouse Labs.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- bcrypt 5.0.1
- body-parser 1.19.0,
- chalk 2.4.2,
- cookie-session 1.4.0,
- dotenv 2.0.0,
- ejs 2.6.2,
- express 4.17.1,
- method-override 3.0.0,
- morgan 1.9.1,
- node-sass-middleware 0.11.0,
- pg 6.4.2,
- pg-native 3.0.0,
- request 2.88.2,
- request-promise 4.2.6,
- xml-js 1.6.11,
- yelp-fusion 3.0.0


## Future Development

- Drag-and-Drop functionality
- Clean up animations
- Location of tasks
- Access to a product API when one is avail.
- Sub-tasks
- Media Requests
- Pop-up than checks with the user if they do want to do delete the app.
- Deadline date for to do list 
- CSS colour to button make it more obvious what Tab is being viewed.


## Pictures of App
!['Login Page'](login Pic);

!['Front Page'](pic URL);

!['Picture of category of Task'](ANy cat pic);

!['Completed Tasks'](Pic of completed category);
____________________________
# Requirements

## Functional Requirements

Each todo created should be categorized as one of:

1. Film / Series (To watch)
2. Restaurants, cafes, etc. (To eat)
3. Books (To read)
4. Products (To buy)

- Users should be able to change a category of an item in case it was mis-categorized or could not be categorized at all.
- Users should be able to register, log in, log out and update their profile.

## Goal of This Project

- Build a web app from start to finish using the tech and approaches learned to date
- Turn requirements into a working product
- Practice architecting an app in terms of UI/UX, Routes/API and Database
- Manage a multi-developer project with git
- Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
- Practice demoing an app to help prepare for the final project and employer interviews

## Stack Requirements

- ES6 for server-side (NodeJS) code
- NodeJS
- Express
- RESTful routes
- One or more CSS or UI "framework"s:
  - jQuery
  - A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
- PostgreSQL and pg (with promises) for DBMS
- git for version control

## Project Management

- A trello board was created to compartmentalize our projects into manageable tasks.
- Balsimiq to create Wireframes
- Diagram.io to create ERD diagrams
- Slack and DIscord for communication

