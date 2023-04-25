import("./loadEnvironment.js");
import express from "express";
import cors from "cors";
import clubs from "./routes/clubs.js";
import ratings from "./routes/ratings.js";
import comments from "./routes/comments.js";
import auth from "./routes/auth.js";
import posts from "./routes/posts.js";
import image_pipeline from "./routes/image_pipeline.js";
import bodyParser from "body-parser";
import conn from "./db/conn.js";
import path from "path";
import clubCreation from "./routes/clubCreation.js";
import announcement from "./routes/announcement.js";
import users from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5050;
import clubrequest from "./routes/clubrequest.js";
import clubRating from "./routes/clubRating.js";

// // middleware
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// retrieving reactjs build files
app.use(express.static(path.join("./", "build")));

// defining routes
app.use("/clubs", clubs);
app.use("/posts", posts);
app.use("/ratings", ratings);
app.use("/announcement", announcement);
app.use("/image_pipeline", image_pipeline);
app.use("/comments", comments);
app.use("/auth", auth);
app.use("/clubCreation", clubCreation);
app.use("/clubRating", clubRating);
app.use("/users", users);
app.use("/clubrequest", clubrequest);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// routing all routes to index.html because client does all the routing!
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join("./", "build/") });
});

// Start the server
app.listen(PORT, "0.0.0.0", async () => {
  await conn.connectToServer();
  console.log(`Server listening on port ${PORT}`);
});

// const socialPath = __dirname.replace('server', 'social');
// const path = socialPath + '/build/';
// app.use(express.static(path));

// app.get('/', function (req, res) {
//   res.sendFile(path + "index.html");
// });

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
