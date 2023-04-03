import { useState } from "react";
import Post from "./Post";
import './Posts.css'
import axios from 'axios'
import { useSelector } from "react-redux";

const url = "http://localhost:5050/posts";

export default function Posts({ props }){
    const clubData = useSelector(state => state.clubData);
    const [postsData, updatePostsData] = useState([])
    if (clubData.name !== undefined && postsData === []){
        updatePostsData(clubData.posts);
    }
    
    const loadPosts = async (event) => {
        console.log("Attempting to Load Posts!")
        if (clubData.name !== undefined){
            axios
            .get(`${url}/${clubData.name}`)
            .then((response) => {
                const data = response.data;
                updatePostsData(data);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
        } else {
            axios
            .get(`${url}/`)
            .then((response) => {
                const data = response.data;
                updatePostsData(data);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
        }
        }
    // TODO: Pass down the comments array also
    return (
        <div>
            <div className="posts">
                <div>
                    {clubData.posts !== undefined ? clubData.posts.map((postData) => {
                        const postProps = {
                            caption: postData.caption,
                            creator: postData.netId,
                            content: postData.content,
                            id: postData._id,
                            subset_comments: postData.comments
                        }
                        return (<Post props={postProps} key={postData._id}/>)
                    }) : postsData.map((postData) => {
                        const postProps = {
                            caption: postData.caption,
                            creator: postData.netId,
                            content: postData.content,
                            id: postData._id,
                            subset_comments: postData.comments
                        }
                        return (<Post props={postProps} key={postData._id}/>)
                    })}
                    <button onClick={loadPosts}>See More Posts</button>
                </div>
            </div>
        </div>
    );
}