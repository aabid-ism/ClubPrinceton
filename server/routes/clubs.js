import conn from "../db/conn.js";
import verifyToken from "../jwt.js";
import express from "express";

const router = express.Router();

// Get a list of all clubs
router.get("/", verifyToken, async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

// get club information of a single club
router.get("/a/:name", verifyToken, async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const query = req.params.name;
  // console.log(query);
  // search for a club by name and return the first result with all attributes

  const agg = [
    { $search: { autocomplete: { query: query, path: "name" } } },
  ];

  // run pipeline
  // const result = await collection.aggregate(agg).toArray();
  // print results
  // const result = await collection.find({}).limit(50).toArray();
  const result = await collection.findOne(
    { name: "IgniteSTEM" }
  );
  res.send(result).status(200);
});



// get club information of a single club
router.get("/club/officers/:name", verifyToken, async (req, res) => {
  const db = conn.getDb();
  const clubCollection = await db.collection("clubs");
  const clubName = req.params.name;
  if (clubName == "" || undefined) {
    return res.send("").status(200);
  }

  // console.log(query);
  // search for a club by name and return the first result with all attributes

  // const agg = [
  //   { name: clubName },
  //   { $limit: 1 },
  //   { $project: { _id: 0, officers: 1 } },
  // ];

  // run pipeline
  // const result = await clubCollection.aggregate(agg).toArray();
  const result = await clubCollection.findOne(
    { name: clubName },
    { _id: 0 }
  )
  // print results

  // console.log(result);
  res.send(result).status(200);
});

router.get("/club/description/:name", verifyToken, async (req, res) => {
  const db = conn.getDb();
  const clubCollection = await db.collection("clubs");
  const clubName = req.params.name;
  if (clubName == "" || undefined) {
    return res.send("").status(200);
  }

  // search for a club by name and return only description
  const result = await clubCollection.findOne(
    { name: clubName },
    { _id: 0, description: 1 }
  )

  // console.log(result);
  res.send(result).status(200);
});

router.post(`/club/description/update/:name`, verifyToken, async (req, res) => {
  const db = conn.getDb();
  const clubCollection = await db.collection("clubs");
  const clubName = req.params.name;

  // search for club by name and update the description
  const result = await clubCollection.updateOne(
    { name: clubName },
    { $set: { description: req.body.description } }
  )

  // console.log(result);
  res.send(result).status(200);
});

// Get a single club
router.get("/:name", verifyToken, async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const query = req.params.name;
  // console.log(query);
  // const result = await collection.findOne(query);

  // const agg = [
  //   { $search: { autocomplete: { query: query, path: "name" } } },
  //   { $limit: 20 },
  //   { $project: { _id: 0, name: 1 } },
  // ];
  // run pipeline
  // const result = await collection.aggregate(agg).toArray();
  // const results = await collection.find(query);
  const results = await collection.find({}).toArray();
  // print results
  // await result.forEach((doc) => console.log(doc));
  const result = results.map(obj => obj.name);
  res.send(result).status(200);
});

// Get the existence of a  single club
router.get("/check/:name", verifyToken, async (req, res) => {
  const collection = await db.collection("clubs");
  const query = { name: req.params.name };
  const result = await collection.findOne(query);

  if (result)
    res.send("A club with that name already exists").status(200);
});

// Update club officers
router.post("/club/officers/update/:club", verifyToken, async (req, res) => {

  // If club is empty, return with nothing
  if (req.params.club == "" || undefined) {
    return res.send("").status(200);
  }

  // make connection and get collections
  const db = conn.getDb();
  const clubName = req.params.club;
  const club_collection = await db.collection("clubs");
  const users_collection = await db.collection("users");

  const club = await club_collection.findOne({ name: clubName })
  const prior_officers = club.officers;
  const new_officers = req.body;

  if (prior_officers.length < new_officers.length) {
    const officer = new_officers[new_officers.length - 1];
    await users_collection.updateOne(
      { netid: officer.netid },
      { $push: { admin_clubs: clubName } }
    )
  } else {
    let officer_to_drop;
    prior_officers.map((officer, index) => {
      if (officer !== new_officers[index]) {
        officer_to_drop = officer;
      }
    });
    // console.log(officer_to_drop);
    await users_collection.updateOne(
      { netid: officer_to_drop.netid },
      { $pull: { admin_clubs: clubName } }
    )
  }

  // update the officers field of the club in the club connection
  club_collection.updateOne(
    { name: clubName },
    // [{ $set: { posts: { $concatArrays: ["$posts", [post_document_to_insert]] } } }]
    [{ $set: { officers: new_officers } }]
  )

  res.send().status(200);

})


// Post a club
router.post("/create", verifyToken, async (req, res) => {
  // checking for a club with this name needs to be done
  //before accessing this endpoint

  // reference for database and collection in mongodb
  const db = conn.getDb();
  const collection = db.collection("clubs");

  // TODO: validation of data

  // destructuring form data submitted by admin page
  const { name, categories, email, description, announcement } =
    req.body;

  // starting rating and stats for clubs is a zero.
  const rating = {
    "Good vibes": 0,
    Diversity: 0,
    Intensity: 0,
    Selectivity: 0,
  };

  const stats = {
    Followers: 0,
    Likes: 0,
    Posts: 0,
  };

  const document = {
    name,
    categories,
    email,
    description,
    announcement,
    rating,
    stats,
  };
  // _id property is automatically assigned by mongodb.
  const result = await collection.insertOne(document);

  // console.log(result);
  res.send("Club Added").status(200);
});


router.get("/admin/:netid", verifyToken, async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("users");
  const query = { netid: req.params.netid };
  const userResult = await collection.findOne(query);

  const response = userResult.admin_clubs;

  res.send(response).status(200);
});

export default router;
