import { useState } from "react";
import Post from "./Post";
import './Posts.css'
import axios from 'axios'
import { useSelector } from "react-redux";

const url = "http://localhost:5050/posts";

export default function Posts({ props }){
    const clubData = useSelector(state => state.clubData);
    const [postsData, updatePostsData] = useState([])
    const loadPosts = async (event) => {
        console.log("Attempting to Load Posts!")
        if (clubData.name !== undefined){
            axios
            .get(`${url}/${clubData.name}`)
            .then((response) => {
                const data = response.data;
                // console.log("Data received")
                // console.log(data);
                // console.log(response.status);
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
                // console.log("Data received")
                // console.log(data);
                // console.log(response.status);
                updatePostsData(data);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
        }
        }
    return (
        <div>
            <div className="posts">
                <div>
                    {clubData.posts !== undefined ? clubData.posts.map((postData) => {
                        const postProps = {
                            caption: postData.caption,
                            creator: postData.netId,
                            content: postData.content
                        }
                        return (<Post props={postProps}/>)
                    }) : postsData.map((postData) => {
                        const postProps = {
                            caption: postData.caption,
                            creator: postData.netId,
                            content: postData.content,
                        }
                        return (<Post props={postProps} key={postData._id}/>)
                    })}
                    <button onClick={loadPosts}>Get More Posts!</button>
                    {/* <pre>
                    {JSON.stringify(postsData, null, 2)}
                    </pre> */}
                </div>
            </div>
        </div>
    );
}