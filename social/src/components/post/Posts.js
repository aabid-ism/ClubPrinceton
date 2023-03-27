import { useState } from "react";
import Post from "./Post";
import './Posts.css'
import axios from 'axios'
import { useSelector } from "react-redux";

const url = "http://localhost:5050/posts";

export default function Posts({ props }){
    const clubData = useSelector(state => state.clubData);
    console.log(clubData);
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
    fillPosts();
    return (
        <div>
            <div className="posts">
                {posts.map((post) => {
                    return(<Post props={{caption: post.caption}}/>);
                })}
            </div>
        </div>
    );
}