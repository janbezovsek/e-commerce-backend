const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../controller/auth");
const User = require('../db/userModel')//require userModel schema
const registerInputValidator = require('../controller/registerInputValidator')
const loginInputValidator = require('../controller/loginInputValidator')
const { validationResult } = require('express-validator');
const router = new express.Router()



//server running
router.get("/", (request, response) => {
  response.json({ message : "Server is running"})
})



//register endpoint
router.post("/register", registerInputValidator, (request, response) => {


  //express-validator for data validation
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    // in case request params don't meet the validation criteria
    return response.status(422).json({errors: errors.array()})
}


  //catch error if no password is entered
if(request.body.password === ''){
  return response.status(500).send({
    message: "No password",
    error,
  });
}

// hash the password
bcrypt
.hash(request.body.password, 10)
.then((hashedPassword) => {
  // create a new user instance and collect the data
  const user = new User({
    email: request.body.email,
    password: hashedPassword,
  });
  

  // save the new user
  user
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating user",
        error,
      });
    });
})
// catch error if the password hash isn't successful
.catch((e) => {
  response.status(500).send({
    message: "Password was not hashed successfully",
    e,
  });
});
});







//login endpoint
router.post("/login",(request, response) => {


  //express-validator for data validation
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    // in case request params don't meet the validation criteria
    return response.status(422).json({errors: errors.array()})
}




   // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {

      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        error,
      });
    });
})



// authentication endpoint
router.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});






module.exports = router