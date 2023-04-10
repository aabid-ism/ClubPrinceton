import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
let db;

const uri = "mongodb+srv://9projectideas:EfhEWYlNTIYAb8gr@clubprincetoncluster.8gzl1pl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  });

export default {
  connectToServer: async (callback) => {
    await client.connect();
    console.log("connected to mongodb!")
    db = await client.db("clubPrinceton")
    console.log("connected to database!")
  },

  getDb: function () {
    return db;
  }
}


// async function run() {

//   const uri = process.env.ATLAS_URI || "";
//   const client = new MongoClient(uri,
//     { useNewUrlParser: true, useUnifiedTopology: true,
//       serverApi: ServerApiVersion.v1 });

//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     // console.log("trying to connect to mongodb...");
//     // await client.connect();
//     // console.log("connected!");
//     // Establish and verify connection
//     conn = await client.connect();
//     db = conn.db("clubPrinceton");
//     console.log("loaded database!");
//     console.log("Connected successfully to server");
//     client.connect()
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);

// module.exports = db;