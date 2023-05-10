# Full Stack Bicycle stations/trips app

This repository is used as part of Solita's pre-assignment for dev Academy position

You can run this project via docker-compose

you will need to have docker and docker compose installed in your machine.

To run this app first clone this repo to your local machine

`git clone https://github.com/abdicodes/bicycles-app.git`

Then navigate to the folder bicycles-app
`cd bicycles-app`

then run command
`docker-compose up`

all the 3 docker images should run; backend, frontend and postgres

Alternatively you can run the app by using Node, however you will need to setup a postgres database either on your machine or on the web
once you have configured a postgres database and have the link in form
postgres://userpassword@link:port/postgres

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

If you wish to build your docker images
