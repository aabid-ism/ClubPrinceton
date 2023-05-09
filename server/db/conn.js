import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
let db;

const uri = process.env.ATLAS_URI || "";

// connect to the database
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
