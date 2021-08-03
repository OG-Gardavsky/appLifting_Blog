# cat_blog
This is simple blogging system that receives input in Markdown format and displays it as is expected from MD
- life demo ***<a href="https://gardavsky-catblog.herokuapp.com/">catblog on Heroku</a>*** 
  - takes a while to load (heroku free hosting) 


## Technologies
- NPM for managing packages
- Backend
    - Node.js as main run-time enviroment
    - Express for APIs and serving FE
    - MongoDB as database
- Frontend
    - Vue.js as front-end framework

- Hosting
    - anywhere you can run Node.js and MongoDB
    - I used:
        - ***<a href="https://www.heroku.com/">Heroku</a>*** for running application logic
        - ***<a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>*** for hosting of MongoDB database (free version)

## start using
### modify code
First of all clone this repo
```
git clone https://github.com/OG-Gardavsky/appLifting_Blog
```

Open cloned repo
```
cd appLifting_Blog
```

configure project constats - in server/src/config/constants.js

```
const constants = {
    dbAdrres: '',
    bcryptSaltRounds: 10,
    jwtKey: '',
    minPassLength: ,
}
```
#### dbAdrres
- this is the address of the database, with which the app will work with


#### bcryptSaltRounds
- this determines how many rounds of hashing password Bcrypt must perform

#### jwtKey
- this represents JWT secret that will be used for signing JWT tokens on server side

#### minPassLength
- this represents minimal required length of password


install npm dependencies
```
cd client 
npm install
cd ../server
npm install
```

if you want to start the app for dev purposes - use two terminals
```
npm run devServer

npm run devClient
```

Now you can modify the code as you wish. If you perform some modification on client side, you need to build the code to work properly on the server
```
cd client 
npm run build
```
---
### just deploy
- switch to deploy branch
- save your filled config file
- deploy your code
