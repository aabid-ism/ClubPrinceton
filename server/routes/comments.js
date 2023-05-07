import conn from '../db/conn.js';
import { ObjectId } from 'mongodb';
import verifyToken from "../jwt.js";
import express from 'express';
import cleanComment from './comment_filter.js'
const router = express.Router();

// load the name of a user
router.get('/getname/:id', async (req, res) => {
  try {
    const netId = req.params.id;
    console.log(`My NetID is here: ${netId}`);
    const db = conn.getDb();
    const users_collection = await db.collection("users");
    const user = await users_collection.findOne({ netid: { $eq: netId } });
    // console.log(user)
    res.send(user.name).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error!');
  }
});

router.post('/create', cleanComment, async (req, res) => {

  const db = conn.getDb();
  const comment_collection = await db.collection("comments");
  const post_collection = await db.collection("posts");
  // TODO: include user as info
  const { data, postId, netid } = req.body;

  // If there has been 50 comments in the last 10 minutes, send a 429 Error

  // Take the comments of that netid sorted by created_at
  const query = { commenter_netId: netid };
  const options = {
    // sort returned documents in the order of recent comment to oldest comment
    sort: { created_at: -1 },
  };
  const comments_of_that_netid = await comment_collection.find(query, options).toArray();
  // If there is no more than 20 comments, do nothing.
  // If the 1st comment's created_at and 20th comment's created_at is within 10 minutes, send 404 Error

  const amount_of_comments_to_check_for = 50;
  const time_period_to_check_comments_in_mins = 10;
  if (comments_of_that_netid.length > amount_of_comments_to_check_for) {
    const currentTime = new Date();
    const twentieth_comment_time = new Date(comments_of_that_netid[amount_of_comments_to_check_for - 1].created_at);
    const diffInMinutes = (currentTime.getTime() - twentieth_comment_time.getTime()) / 60000;
    console.log("-------20 or MORE COMMENTS ---")
    if (diffInMinutes <= time_period_to_check_comments_in_mins) {
      console.log("-------20 or MORE COMMENTS WITHIN 10 MINUTES!!! ---")
      // should be 429 status
      return res.send("Too many comments within a short span of time!").status(429);
    }
  }

  const formattedPostId = new ObjectId(postId);
  const post_comment_to_insert = {
    postId: formattedPostId,
    data,
    likes: 0,
    commenter_netId: netid,
    created_at: new Date()
  };

  console.log(post_comment_to_insert);


  const result = await comment_collection.insertOne(post_comment_to_insert);
  console.log(formattedPostId)

  const post = await post_collection.findOne({ _id: { $eq: formattedPostId } });
  const post_comments = post.comments !== undefined ? post.comments : [];
  //console.log(post_comments);
  // does this need to sort again?
  if (post_comments.length >= 5) {
    post_comments.pop();
  }

  post_comments.unshift(post_comment_to_insert);
  post_collection.updateOne(
    { _id: formattedPostId },
    [{ $set: { comments: post_comments } }]
  );

  // update the duplicate within the subset comments in the post
  const club_collection = await db.collection("clubs")
  const club = await club_collection.findOne({
    posts: { $elemMatch: { _id: formattedPostId } }
  });
  // console.log("This is the subset version")
  const target_post = club.posts.find(post => post._id.toString() === formattedPostId.toString())
  // console.log("Line break")
  // console.log(target_post)
  const target_post_comments = target_post.comments !== undefined ? target_post.comments : [];
  // console.log(target_post_comments);
  // console.log("Test")
  if (target_post_comments.length >= 5) {
    target_post_comments.pop();
  }

  target_post_comments.unshift(post_comment_to_insert);
  // console.log("Comments updated")
  // console.log(club.posts)

  club_collection.updateOne(
    { posts: { $elemMatch: { _id: formattedPostId } } },
    [{ $set: { posts: club.posts } }]
  );
  res.send(post_comment_to_insert).status(200);
});

// Get more NEW comments for a post
router.get("/load/:post", async (req, res) => {
  console.log("Received Request for more comments");
  const post = new ObjectId(req.params.post);
  console.log(post);
  const floorTime = new Date(req.query.oldestTime);
  console.log(floorTime)
  const db = conn.getDb();
  const collection = await db.collection("comments");
  const result = await collection.aggregate([
    {
      $match: {
        postId: post,
        created_at: { $lt: floorTime }
      }
    },
    {
      $sort: { created_at: -1 }
    },
    {
      $limit: 5
    }
  ]).toArray();
  // const result = await collection.find({ postId: { $eq: post } }).toArray();
  //console.log(result);
  res.send(result).status(200);
});

// Liking functionality

// get the number of likes and whether the provided user has liked a comment
router.get('/like/:id', async (req, res) => {
  console.log('Like Request for Comment Received!');
  console.log(req.params.id);
  const commentId = req.params.id;

  const commentLikeData = {
    number_of_likes: 10,
    user_has_liked: true
  }
  res.send(commentLikeData).status(200);
});

router.post('/like/', async (req, res) => {
  console.log('Like Posting for Comment Received!');
  const { netId, commentId, postId, likeAmount } = req.body;
  const db = conn.getDb();
  const comment_collection = await db.collection("comments");
  const likes_collection = await db.collection("likes");
  const club_collection = await db.collection("clubs");
  const formattedCommentId = new ObjectId(commentId);
  const formattedPostId = new ObjectId(postId);

  // update subset for post as well
  const club = await club_collection.findOne({
    posts: { $elemMatch: { _id: formattedPostId } }
  });
  // console.log("This is the subset version")
  const target_post_comments = club.posts.find(post => post._id.toString() === formattedPostId.toString()).comments;
  console.log(target_post_comments)
  const target_post_comment = target_post_comments.find(comment =>
    comment._id.toString() === formattedCommentId.toString()
  )
  console.log("Found the subset comment!")
  console.log(target_post_comment.likes)
  target_post_comment.likes += likeAmount; // a little buggy
  let likes = target_post_comment.likes;
  // console.log(target_post_comment.likes)
  console.log(target_post_comments)
  // target_post_comment.likes += likeAmount;
  await club_collection.updateOne(
    { posts: { $elemMatch: { _id: formattedPostId } } },
    [{ $set: { posts: club.posts } }]
  );
  // increase or decrease the comment's likes field -> separate doc
  await comment_collection.updateOne(
    { _id: formattedCommentId },
    { $set: { likes: likes } }
  );
  const comment = await comment_collection.findOne({ _id: formattedCommentId })

  // create a new like document
  const like_document_to_add = {
    liker_netId: netId,
    commentId: commentId
  }

  const new_comment = await likes_collection.insertOne(
    like_document_to_add
  );

  // TODO: fix duplicate comment creation -> setup DELETE endpoint and be more sophisticated on frontend
  // TODO: ensure parity between like documents and the subset likes
  // TODO: 


  console.log(comment);
  res.send("Liked/Unliked!").status(200);
});

export default router;