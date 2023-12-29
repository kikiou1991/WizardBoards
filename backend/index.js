// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authroute");


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to my MERN App!');
});

app.get('/users', (request, response) => {
    console.log(request);
    return response.status(200).send('Here are all the users');
});

mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('App is connected to the MongoDB database');

    })
    .catch((error) => {
        console.error(error);
    });


app.use(
    cors({
        origin: ["http://localhost:3001"],
        mehtods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is listening on port: ${process.env.PORT}`);
});

app.use(express.json())

app.use(cookieParser());

app.use("/", authRoute);