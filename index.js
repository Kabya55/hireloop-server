const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const uri = process.env.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Connect to the "hireloop" database and access its "jobs" collection
    const database = client.db("hireloop");
    const jobCollection = database.collection("jobs");
    const companyCollection = database.collection("companies");
    const applicationCollection = database.collection("applications");
    const planCollection = database.collection("plans");
    const subscriptionCollection = database.collection("subscription");
    const usersCollection = database.collection("user");
    const sessionCollection = database.collection("session");

    // verify token
    const veryfyToken = async (req, res, next) => {
      // console.log("header", req.headers);
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const token = authHeader.split(" ")[1];
      // console.log(token);

      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const query = { token: token };
      const session = await sessionCollection.findOne(query);

      // console.log("session of the user", session);

      const userId = session?.userId;
      // console.log("user id of the session", userId);

      const userQuery = {
        _id: new ObjectId(userId),
      };

      const user = await usersCollection.findOne(userQuery);
      // console.log("user of the session", user);

      // set data in the req object
      req.user = user;

      next();
    };

