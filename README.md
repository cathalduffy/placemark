## The Placemark App
The Placemark app allows users to be able to store different places that they have visited or might wish to visit.
They also have the ability to be able to sort these different placemarks into different category types that they wish
, like for example beaches, mountains, etc.

With their placemarks, a user will be able to store the Name, Description, Latitude and Longitude of the place that 
they have visited. Once the user inputs a valid latitude and longitude, then they will then also be able to see those
coordindates rendered on a map, through the use of Leaflet.

## Built Using
The Placemark app is built by using a node js backend, specifically Hapi.js. The frontend is then built using the 
Handlebars framework, along with Bulma for CSS.

## Packages that were installed in the creation of the application

npm install @hapi/hapi - Install Hapi for server

npm install @hapi/vision

npm install handlebars - Frontend

npm install uuid - Install package to allow unique ids to be generated

npm install @hapi/cookie - Install package to allow sessions

npm install dotenv - Install package to allow for .env file

npm install joi - Install package to allow for form validation rules

npm install lowdb - Install package to allow for Json data store

Install packages to allow for unit testing
npm install -D mocha
npm install -D chai

Install Mongoose library to interact with Mongo
npm install mongoose

Install module to make retiring HHTP code easier
npm install @hapi/boom

Allow HTTP client library
npm install -D axios

Relaunches app upon changes being made
npm install -D nodemon

Support images
npm install @hapi/inert

Allow for swagger docs
npm install hapi-swagger

npm install leaflet

Allow for db seeding
npm install mais-mongoose-seeder

Allow for json web tokens
npm install hapi-auth-jwt2
npm install jsonwebtoken







