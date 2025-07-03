const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const posts = {};

// Get all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Post a new post
// Generates a random ID for the post and adds it to the posts object
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };
    res.status(201).send(posts[id]);
});

// listen on port 4000
// This is where the server starts listening for incoming requests
app.listen(4000, () => {
    console.log('Listening on port 4000');
});