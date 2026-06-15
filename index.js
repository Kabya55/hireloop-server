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

