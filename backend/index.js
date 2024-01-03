// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authroute');

app.get('/api/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to my MERN App!');
});

mongoose
  .connect(process.env.mongoDBURL, {writeConcern: {w: 'majority', wtimeout: 0}})
  .then(() => {
    console.log('App is connected to the MongoDB database');
  })
  .catch((error) => {
    console.error(error);
  });

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/', authRoute);

app.listen(3001, () => {
  console.log(`App is listening on port: ${process.env.PORT}`);
});
