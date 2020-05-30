# Campmii   <img src="https://www.shareicon.net/data/128x128/2016/04/24/754751_nature_512x512.png" width="30"> 
Campmii is an application to share and explore campgrounds around the world. It's based off of the final code-along project in the Udemy Web Developer Bootcamp called YelpCamp. There were only so many features Colt could cram into a cheap bootcamp, so I decided to take over where he left off with YelpCamp and make it something of my own. 

In hindsight, this project is poorly structured, prone to bugs, and utilizes outdated technologies. But only so much can be expected from bootcamps that must develop ever-changing content.

Enjoy!

## Getting Started

You should only bother cloning and setting up this project if you have a MongoDB installed locally. I should have probably just put this in a docker image, but I didn't know about doing that when I first completed the project in 2019. 

### Installing

Clone this git repo and install all dependencies:

```
npm install
```

### Running

Run the local node process. Since there are no default environment variables included in this repo, it should look for a local MongoDB database. This should already be running on `mongodb://localhost/camp-mii` prior to executing the following:

```
node app.js
```

## Deployment

Campmii is currently being hosted on Heroku with a custom domain name and the database is using MongoAtlas, a cloud-based database service. but you can still clone and modify it in your local environment.


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

