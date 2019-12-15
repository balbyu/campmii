# Campmii   <img src="https://www.shareicon.net/data/128x128/2016/04/24/754751_nature_512x512.png" width="30"> 
Campmii is a website to share and comment on your favorite campgrounds. It's the final code-along project in the Udemy Web Developer Bootcamp (called YelpCamp), and as such is lacking many features that I think could make this actually useful. Therefore I decided to continue developing this into something that I was proud of enough to share.

Enjoy!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. There will be no access to the DB, so you will have to figure out how to actually store the data. See deployment for notes on how to deploy the project on a live system.

### Installing

Clone this git repo, install NPM and run: 

```
npm install
```

## Deployment

Campmii is currently being hosted on Heroku and MongoAtlas, but you can still clone and modify it in your local environment. There will be errors when you run because the `.env` file is not included in this public repo. Create your own local MongoDB and make the change to the connection string.

Then run the following in the root folder:

```
node app.js
```

## Built With

* [Node.js](https://nodejs.org/en/) - Backend runtime environment
* [Express.js](https://expressjs.com/) - Web application framework running on Node.js
* [Passport.js](http://www.passportjs.org/) - Authentication middleware for Node.js
* [Bootstrap](https://getbootstrap.com/) - Front-end toolkit for styling 
* [EJS](https://ejs.co/) - The outdated HTML javascript templating 
* [MongoDB](https://www.mongodb.com/) - Database
* [Heroku](https://www.heroku.com/) - Cloud application service used to host CampMii

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/balbyu/campmii/tags). 

## Authors

* **Russell Boone** - *Initial work, Maintainer, Developer, Loser* 

## License

This project is not licensed.

