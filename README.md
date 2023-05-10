# Full Stack Bicycle stations/trips app

### [Click here for live preview](https://solita-flying-bikes.fly.dev/)

**note that due to hosting DB separately in different server you may experience slowness in running queries**

** This repository is used as part of Solita's pre-assignment for dev Academy position **

### Prerequisites

- you will need to have docker and docker compose installed in your machine.

### How to run Docker compose cluster

- To run this app first clone this repo to your local machine `git clone https://github.com/abdicodes/bicycles-app.git`

- Then navigate to the folder bicycles-app `cd bicycles-app`

- then run command `docker-compose up`

all the 3 docker images should run; backend, frontend and postgres

- then you can navigate from your browser to http://localhost:8080

Alternatively you can run the app by using Node, however you will need to setup a postgres database either on your machine or on the web.

once you have configured a postgres database and have the link in form
postgres://user:password@link:port/postgres

Do the following :

-Run the backend with following command
`DATABASE_URL=your_data_base_url npm start`

move to frontend folder
`cd frontned`

start frontend
`npm start`

then you can navigate from your browser to http://localhost:3000

the home page will display stations list
you can use the appbar tabs to navigate to different tabs

such as trips or add trip or add station

# Technical details

## Data importing and validation

The data was initially explored using a Jyputer notebook _see /data-importing.ipynb_
Some rows were drops that did not meet the required criteria and some rows in Kaupinki, Stad
columns were fixed.

The Database was created using a migration file.

In my Database tables and relation designing process I have used stations as a table idenftied with a unique id as the primary key. Name in all 3 languages, city in both Finnish and Swedish geo locationa and capacity were also imported to the table.

For the trips table, only departing, returning dates, Ids of departing and returning stations that are foreign keys, duration and distance were imported.

## Stations list view

Stations list is the home page and entry point for UI. it displays all the required and the additional specifications, including search, pagination. clicking on a Station will navigate user to single station view.

Search functionality, pagination and rows per page selection are all handled on the server side.

Search is carried to the name in all languages, address in both languages.
pages and rows can be changed by clicking on the left and right arrows and selecting row number from the available options 5, 10, 20

## Single Station view

Once a user clicks on any given station it displays all required and additional tasks

Filtering by month, and an Openstreet map showing the location.

Similar to Stations lists all handling of queries or filter is done via the backend directly from the database.

## Trips

This View shows stations name of departure and return stations, covered distance in Km _( rounded to 2 decimal places)_ and duration in minutes.

All durations less than a minute will display less than a minute and in all case the number will be rounded to an integer minute.

columns can be sorted by clicking on each column. Search can also be carried away

Filters can be applied to City, duration and distance field.

Same as Stations list Pagination, row per page selection is available.

**please note that due to size of the dataset searching with all filters left unselected may result in querying time of 5-10 seconds for best result filter City, duration and distance first especially if you're using the live version**

## Add trip or Station

The last two componenets will allow user to fill a form that will add a new station or trip.

## Testing

couple of UI unit testing are performed and also E2E testing that tests the life cycle of the app from viewing each component, testing searching functionality and checking if user can add new stations and trips.

## Shortcomings and retrospective

I have ran into some problems with this app mainly related to node framework. I intially used a boilerplate that combines both React and express in one package.json which I thought is easier to ship on the cloud however that backfired and at some point I had to install a spearate React server.

I was not able to ship this project to AWS ECS for some technical reasons but luckily I was able to upload it on fly.io manually for demonestration purposes.

## How can I have improve or optimise this application

In this application I challenged myself to use new database type to me which is Postgres. I have used mySQL and MongoDB in the past but I have decided to use this project to learn about Postgres and to implement a an app that runs all the logic in the server side.

The downsize of this is that I did not analyse the data structure and the impact of it on time and space complexity
specially when I was designing the queries. so I could really work more on simplifiying the queries, making multiple queries
and filtering queries in the backend rather than in database level.

I would have written this application in TypeScript for added validation for a secure code.

I could have improved the UI styling, perhaps used Figma for prototyping and designing components.
and be more consistent with styling. I wanted to use styled components but I lacked time to learn about a new way to do styling.
