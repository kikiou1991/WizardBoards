// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authroute');
const {Server} = require('socket.io');

const io = new Server(server, {
  cors: {
        origin: true,
        credentials: true
    },
});
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

const namespace = io.of('/test');
namespace.on('connection', (socket) => {
  console.log('a user connected');
  
    socket.emit('hello', {
      message: 'csááá'
  });
   

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/', (req, res, next) => {
  req.io = io;
  next();
}, authRoute);
server.listen(3001, () => {
  console.log(`App is listening on port: ${process.env.PORT}`);
});
