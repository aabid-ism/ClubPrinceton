import { useState } from "react";
import Post from "./Post";
import './Posts.css'
import axios from 'axios'
import { useSelector } from "react-redux";

const url = "http://localhost:5050/posts";

export default function Posts({ props }){
    const clubData = useSelector(state => state.clubData);
    const [posts, updatePosts] = useState([])
    const club = {name: "Test"}
    const fillPosts = async (event) => {
        // axios.get(`${url}/${club.name}`).then(() => {
        //     console.log("Clicked");
        // })
        console.log(clubData)
        // console.log(event.target.value);
        updatePosts([
            ...posts, 
            1
        ]);
    }
    return (
        <div>
            <div className="test-button">
                <button className="post-button" onClick={fillPosts}>Hello</button>
            </div>
            
            <div className="posts">
                {posts.map((post) => {
                    console.log(post);
                    return(<Post props={post}/>);
                })}
            </div>
        </div>
    );
}