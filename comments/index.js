const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // Importing necessary modules
const cors = require("cors");
const axios = require("axios");

const commentsByPostId = {}; // Object to store comments by post ID

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex"); // Generate a random ID for the comment
  const { content } = req.body; // Extract content from the request body

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
});


app.listen(4001, () => {
  console.log("Listening on port 4001");
}); // Start the server on port 4001
