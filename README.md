# Full Stack Bicycle stations/trips app

### [Click here for live preview:lite-version](https://solita-flying-bikes.fly.dev/)


** This repository is used as part of Solita's pre-assignment for dev  position **

# Prerequisites

- you will need to have docker and docker compose installed in your machine.

At the time of writing this Docker version 20.10.24 and Docker Compose version v2.17.2 were used

### How to run Docker compose cluster

- To run this app first clone this repo to your local machine from this repo `git clone https://github.com/abdicodes/bicycles-app.git`

- Then navigate to the folder bicycles-app `cd bicycles-app`

- then run command `docker-compose up`

all the 3 docker images should run; backend, frontend and postgres

please note that due to the large data being used the initial migration setup and importing data to database will take some minutes.

if the migration fails, kindly use a small dataset you can for example use online tools or even local editors
to copy small portion ~ (in 1000s) and put it in `./data` folder with the same naming patterns df1, df2 and df3

the migration files are located in `migrations` folder. There two files one to initilize the stations tables
and the other to initilise trips table.

once the setup is done and backend server is running you can verify this from the shell log once you see the text*Server running on port 5000* it means the server is ready.

- You can navigate from your browser to http://localhost:8080

### how to run using Node

if you face problems setting up the docker files you can setup the project in a different way
for this you will still need Docker installed on your machine and also Node

- setup a Postgres database in a docker by running this command

  `docker run --name postgres -e POSTGRES_PASSWORD=postgres -d  -p 5432:5432 postgres`

once the docker is setup and running Do the following :

- open the command shell from the root folder of the prokect

- init backend and frontend
  `npm install` once it is done do the same for the frontend `cd frontend` then `npm install` or yarn instead of npm

- run the backend with the following command
  `PORT=5000 DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres npm start`

- move to frontend folder
  `cd frontned`

- start frontend with backend URL
  `REACT_APP_BACKEND_URL=http://localhost:5000/api npm start`

then you can navigate from your browser to http://localhost:3000

the home page will display stations list

you can use the appbar tabs to navigate to different tabs

such as trips or add trip or add station

###

# Description of the project

## Data importing and validation

The data was initially explored using a Jyputer notebook _see /data-importing.ipynb_
Some rows were drops that did not meet the required criteria and some rows in Kaupinki, Stad
columns were fixed.

The Database was created using a migration file.

In my Database tables and relation designing process I have used stations as a table idenftied with a unique id as the primary key. Name in all 3 languages, city in both Finnish and Swedish geo locationa and capacity were also imported to the table.

For the trips table, only departing, returning dates, Ids of departing and returning stations that are foreign keys referenced to Stations table, duration and distance were imported.

## Stations list view

Stations list is the home page and entry point for UI. it displays all the required and the additional specifications, including search, pagination. clicking on a Station will navigate user to single station view.

Search functionality, pagination and rows per page selection are all handled on the server side.

Search is carried to the name in all languages, address in both languages.
pages and rows can be changed by clicking on the left and right arrows and selecting row number from the available options 5, 10, 20

## Single Station view

Once a user clicks on any given station from _Stations list view_ it navigates to a single station view and displays all required and additional tasks.

Filtering by month, and an Openstreet map showing the location.

Similar to Stations lists all handling of queries or filter is done via the backend directly from the database.

## Trips

This View shows stations name of departure and return stations, covered distance in Km _( rounded to 2 decimal places)_ and duration in minutes.

All durations less than a minute will display less than a minute and in all case the number will be rounded to an integer minute.

columns can be sorted by clicking on each column. Search can also be carried away

Filters can be applied to City, duration and distance field.

Same as Stations list Pagination, row per page selection is available.

**please note that due to size of the dataset searching with all filters left unselected may result in querying time of 5-10 seconds for best result filter City, duration and distance first especially if you're using the live version provided above**

## Add trip or Station

The last two componenets will allow user to fill a form that will add a new station or trip.

Form validation is implemented using _yup_ library also the _Submit_ and _Reset_ buttons are dynamic and
only work when conditions are met. for Submit it will only work once the form is validated and for Reset once the form has some inputs.

# Testing

**_ Before running tests you will need to to install node modules in your machine _**
you can achinve this by running root dir in your shell and run the command `npm install`

then also install React node modules by going to dir "frontend" and running the same command

`cd frontend` then `npm install`

UI unit testing are performed testing the Trips and Stations container components.
the test folder located in frontend folder under name `__test__`

the tests can be run from the frontend dir by running the command `npm run test`

Backend testing is also implemented located in root directory folder name `__test__`
the tests checks if all endpoints work as should and also failing tests are included to see if relevant HTTP error statuses are returned.
the tests can be run from the root dir by running the command `npm run test`

E2E testing is also implemented that tests the life cycle of the app from viewing each component, testing searching functionality and checking if user can add new stations and trips and tests if an existing station is attempted to be added. the tests are located in `cypress/e2e/spec.cy.js` file
the tests can be run from the frontend dir by running the command `npm run cypress:run`

# Technology choices

In this Project I have used PERN stack Postgres, Express, React and Node and also Docker and Docker compose

I have chosen this stack because I have only recently started experimenting with Postgres and Docker
and wanted to put my learning to test by applying what I learned.
and that's also the reason I decided to implement most of the logics such as paginations, rows per page, filtering, searching and sorting using Postgres.

I have been learning fullstack development with React and Node for a while and I believe I can
best show my problem solving skills using this stack.

I have used Cypress for E2E testing rather than selenium to be consistent in the language I picked.

## Shortcomings and retrospective

I have ran into some problems with this app mainly related to node framework. I intially used a boilerplate that combines both React and express in one package.json which I thought is easier to ship on the cloud however that backfired and at some point I had to install a spearate React server and overhaul the app.

I was not able to ship this project to AWS ECS for some technical reasons but luckily I was able to upload it on fly.io manually for demonestration purposes. Nevertheless the application works smoothly in local docker-compose cluster.

In the future I would configure the cloud an early stage of the project and setup a CI/CD pipeline to automate the process of shipping.

Update: I was able to deploy the application on AWS EC2 in a docker-compose cluster connected to AWS RDS database
link available above

## How can I improve or optimise this application

In this application I challenged myself to use new database type to me which is Postgres that I have never used before. I have used mySQL and MongoDB in the past but I have decided to use this project to learn about Postgres and to implement a an app that runs all the logic in the server side.

The downsize of this is that I did not analyse the data structure and the impact of it on time and space complexity
specially when I was designing the queries. so I could really work more on simplifiying the queries, making multiple queries
and filtering queries in the backend rather than in database level.

I was able to optimise it to a certain point by excluding some attributes from the queries.

I would have written this application in TypeScript for added validation for a secure code.

I could have improved the UI styling, perhaps used Figma for prototyping and designing components.
and be more consistent with styling. I wanted to use styled components but I lacked time to learn about a new way to do styling.
