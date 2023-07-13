# hungryHeroic
Hungryheroic is a website that tracks user supplies and purchases to provide the user with a listing of all foods by group and location, a display of how long which foods will last, and recipe ideas for the foods provided by the user.

## Clone the project
In order to use our website you need to clone the repository in an IDE of your choice
> Link: https://github.com/saraHoeferer/hungryHeroic

## Start the project

### Install all modules
Before you can host the webserver you need to install all required modules. Do this by simply issuing `npm install` in the project directory

### Mysql Database
In order to use the Database Server you need to have a SQL Database. Simply use the structure provided in the `DBStructure` folder. Import this into your Database and change the credentials in `DBServer/app/config/db.config.js`

### Start the DBServer
In order to connect to your Database you need to start the DBServer. Simply navigate into the `DBServer` directory and issue the `node server.js` command

### Start the Webserver
In order to host the website navigate into the project directory and issue the `ng serve`command

#### Host PWA Server
In order to host the website that it is accessible via a mobile device simply issue the `ng server --port=4200 --host=[yourIPAddress]`. 
You also need to include your IP Address in the cors option of the DBServer in `DBServer/server.js` 
> `cors({
>     credentials: true,
>     origin: ["http://localhost:4200", "http://[yourIPAddress]:4200"],
>   })`

and change the path in the `src/app/services` files.
> `const baseUrl = 'http://[yourIPAddress]:8080/api/auth/'`

## Enjoy
