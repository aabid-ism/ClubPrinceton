import { useEffect, useState } from "react";
import Post from "./Post";
import "./Posts.css";
import axios from "axios";
import api from "../auth/api";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

const url = `${process.env.REACT_APP_SERVER_URL}/posts`;

export default function PostList({props}) {
  const clubData = useSelector((state) => state.clubData);
  const [postListData, setPostListData] = useState([]);

  // load subset posts
  useEffect(() => {
    if (clubData.name !== undefined) {
      setPostListData(clubData.posts);
    }
  }, [setPostListData, clubData]);

  // dynamic post loading
  // possible TODO: pass id and do additional request, rather than time
  const loadPosts = async (event) => {
    console.log("Attempting to Load Posts!");
    console.log(postListData[postListData.length - 1]);
    // TODO: this might be fixed? See if this can be refactored
    if (clubData.name !== undefined) {
      let oldest;
      if (postListData[postListData.length - 1] !== undefined) {
        oldest = postListData[postListData.length - 1].created_at;
      } else {
        oldest = "";
      }
      api
        .get(`${url}/${clubData.name}?oldestTime=${oldest}`)
        .then((response) => {
          const data = response.data;
          setPostListData([...postListData, ...data]);
        })
        .catch((error) => {
          console.log("Error occurred: ", error);
        });
    }
  };

  // if a club is defined, render postsData array's values
  // otherwise render nothing
  return (
    <div className="posts">
        {
        postListData.length !== 0 ?
        postListData.map((postData) => {
          const postProps = {
            caption: postData.caption,
            creator: postData.netId,
            content: postData.title,
            id: postData._id,
            subset_comments: postData.comments,
            createdTime: new Date(
              postData.created_at
            ).toLocaleDateString(),
            image_url: postData.image_url,
          };
          return (
            <Post
              props={postProps}
              key={postData._id}
            />
          );
          
        }) 
        :
        <center><h3>No Posts Yet!</h3></center>
        }
        {postListData.length > 4 ?
          <center><button onClick={loadPosts}>See More Posts</button></center>
          :
          <></>
          }
    </div>
  );
}
