const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});
const port = 3002;
require("dotenv").config();
const uri = process.env.mongoDBURL;

let db;
app.use(cors());
app.use(express.json());

app.get("/api/v2", (req, res) => {
  res.send({ message: "Hello! Welcome to the Wizardboards API v2!" });
});
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Internal Server Error");
});
const mongoClient = new MongoClient(uri);
const excludedPaths = ["/api/v2/login", "/api/v2/register"];

const checkTokenMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  const path = req.baseUrl;
  // Check if the path is in the excluded paths list
  if (excludedPaths.includes(path)) {
    return next(); // Skip token verification for excluded paths
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res
          .status(401)
          .json({ status: false, message: "Token verification failed" });
      } else {
        try {
          if (data?.id) {
            const { ObjectId } = require("mongodb");

            db.collection("users")
              .findOne({ _id: new ObjectId(data.id) })
              .then((data) => {
                if (data) {
                  req.user = data;
                  next();
                } else {
                  return res.status(404).json({
                    status: false,
                    message: "User not found anywhere",
                  });
                }
              });
          }
        } catch (error) {
          console.error("User retrieval error:", error);
          return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
        }
      }
    });
  }
};
app.use(
  "/api/v2/*",
  (req, res, next) => {
    next();
  },
  checkTokenMiddleware
);
startServer();

async function startServer() {
  await mongoClient.connect();
  console.log("Connected successfully to server");
  db = mongoClient.db("test");
  const auth = require("./routes/auth")(app, db);
  const boards = require("./routes/boards")(app, db, io);
  const lists = require("./routes/lists")(app, db, io);
  const cards = require("./routes/cards")(app, db, io);
  const users = require("./routes/users")(app, db, io);
  const workspaces = require("./routes/workspaces")(app, db, io);
}

server.listen(3002, () => {});
