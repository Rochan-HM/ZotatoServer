# Zotato Server

This application is a `NodeJS`	server written for the Zotato mobile application.

The server uses the Yelp API to fetch information about restaurants. 


# Installation and Running

This server is built using `Express` and `Mongoose`. Hence, it requires a MongoDB database to function properly.

In addition, a Yelp API key is required.

## Steps
1. First, install the required dependencies using `npm install` or `yarn`.
2. Create an instance of MongoDB either locally or on the cloud. The official [Mongo Docker image](https://hub.docker.com/_/mongo) can be used for local development. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  can be used for deployment.
3. Register for a free Yelp Account and sign up for [Yelp Fusion](https://www.yelp.com/fusion) to get the API Keys.
4. A `.env.sample` file is provided as a reference. Please set environment variables for MongoDB URI, a secret key for signing JWTs, and the Yelp API key accordingly. Optionally, a port environment variable can also be set, which sets the port the server listens on. Port `3000` is used by default. A `.env` file can also be created with key-value pairs of the environment variables as the NPM package `dotenv` is installed and configured. 
5. Start the server from the root directory using `node src/index.js`. If everything goes well, the server should be up and should be able to communicate with Mongo DB (visible in the logs).
6. A `Procfile` is also given for deployment to Heroku. The server can be deployed on Heroku by following the [official docs](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

**Note:** If using the free M0 cluster on MongoDB Atlas with the Hobby plan on Heroku, it might be necessary to whitelist all IP addresses on Atlas.