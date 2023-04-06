require("./loadEnvironment.js");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const cors = require("cors");
const clubs = require("./routes/clubs.js");
const posts = require("./routes/posts.js");
const comments = require("./routes/comments.js")
const bodyParser = require("body-parser");
const conn = require('./db/conn.js');

// middleware
let corsOptions = {
  origin: "http://localhost:5050"
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// delcaring initial route-string, and connecting clubs router: localhost:5050/clubs...
app.use("/clubs", clubs);
app.use("/posts", posts);
app.use("/comments", comments)
// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
  })


const socialPath = __dirname.replace('server', 'social');
const path = socialPath + '/build/';
app.use(express.static(path));

app.get('/', function (req, res) {
  res.sendFile(path + "index.html");
});

// Defining global routes: localhost:5050/
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


// app.get('/users', (req, res) => {
//   res.send('List of users');
// });

// app.get('/users/:id', (req, res) => {
//   res.send(`User with ID ${req.params.id}`);
// });

// Start the server
app.listen(PORT, async () => {
  await conn.connectToServer();
  console.log(`Server listening on port ${PORT}`);
});
