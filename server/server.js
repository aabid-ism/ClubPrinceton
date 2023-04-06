import("./loadEnvironment.js");
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5050;
import cors from "cors";
import clubs from "./routes/clubs.js";
import posts from "./routes/posts.js";
import image_pipeline from "./routes/image_pipeline.js";
import bodyParser from "body-parser";
import conn from './db/conn.js';

// middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// delcaring initial route-string, and connecting clubs router: localhost:5050/clubs...
app.use("/clubs", clubs);
app.use("/posts", posts);
app.use("/image_pipeline", image_pipeline);
// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// Defining global routes: localhost:5050/
app.get('/', (req, res) => {
  res.send('Hello World!');
});


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
