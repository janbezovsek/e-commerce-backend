# E-commerce app BACKEND

This is the backend logic of the MERN stack application. Here we have all of the functionality
that the user's do not see, including API endpoints and  MongoDB database design. We have to 
create an account and setup our cluster. Then we aquire the connection string used for connecting 
the app to the database. 

It should be similar to: mongodb+srv://plenty:<password>@cluster0.z3yuu.mongodb.net/<dbname>?retryWrites=true&w=majority

We save the string in the .env file like so:

DB_URL = mongodb+srv://plenty:<password>@cluster0.z3yuu.mongodb.net/<dbname>?retryWrites=true&w=majority

We also need to set the port number for hosting our server : PORT = 5000


We run the server with the following command: npm run devStart or npm start

For testing our API endpoints we have used a tool called Postman.

We pushed our Docker image to Docker hub : https://hub.docker.com/repository/docker/bezovsekjan/server/general 