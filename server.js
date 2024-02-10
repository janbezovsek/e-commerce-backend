const express = require('express');
const bcrypt = require("bcrypt");
const helmet = require("helmet")
const userRouter = require('./routers/userRouter')
const port = process.env.PORT || 5000;
const router = express.Router();

const app = express();

// For parsing application/json
app.use(express.json())

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enabling the Helmet middleware,///////new line of code added for security
app.use(helmet())


// require database connection 
const dbConnect = require("./db/dbConnect");


// products schema
const Product = require("./db/productModel");

// execute database connection 
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });


//routes for user
app.use(userRouter);


app.listen(port, () => {
    console.log("Server started on port 5000")
})