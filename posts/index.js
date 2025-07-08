const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Get all posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Post a new post
// Generates a random ID for the post and adds it to the posts object
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post('http://localhost:4005/events', {
    type:'PostCreated',
    data: {
        id, title
    }
  }).catch((err) => {
    console.log(err.message);
  });;


  res.status(201).send(posts[id]);
});


app.post("/events", (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
});


// listen on port 4000
// This is where the server starts listening for incoming requests
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
