import { useState } from "react";
import Post from "./Post";
import './Posts.css'
import axios from 'axios'
import { useSelector } from "react-redux";

const url = "http://localhost:5050/posts";

export default function Posts({ props }){
    const clubData = useSelector(state => state.clubData);
    // console.log(clubData);
    let posts = []
    const fillPosts = async (event) => {
        if (clubData.name !== undefined){
            axios
            .get(`${url}/${clubData.name}`)
            .then((response) => {
            const data = response.data;
            posts = [
                ...posts, 
                data
            ]
            })
            .catch((error) => {
            console.log("Error occurred: ", error);
        });
        } else {
            axios
            .get(`${url}/`)
            .then((response) => {
            const data = response.data;
            posts = [
                ...posts, 
                data
            ]
            })
            .catch((error) => {
            console.log("Error occurred: ", error);
        })
        
        }
    }
    // fillPosts();
    console.log(clubData)
    return (
        <div>
            {/* <div className='posts-info'>
                    <pre>
                    {JSON.stringify(clubData.posts, null, 2)}
                    </pre>
                </div> */}
            <div className="posts">
                <div>
                    {clubData.posts !== undefined ? clubData.posts.map((postData) => {
                        const postProps = {
                            caption: postData.caption,
                            creator: postData.netId,
                            content: postData.content
                        }
                        return (<Post props={postProps}/>)
                    }) : <span></span>}
                </div>
                
                {/* {clubData.posts.map((post) => {
                    return(<Post props={{caption: post.caption}}/>);
                })} */}
            </div>
        </div>
    );
}