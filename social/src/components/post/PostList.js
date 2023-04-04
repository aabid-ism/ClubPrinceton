import { useEffect, useState } from "react";
import Post from "./Post";
import './Posts.css'
import axios from 'axios'
import { useSelector } from "react-redux";

const url = "http://localhost:5050/posts";

export default function Posts({ props }){
    const clubData = useSelector(state => state.clubData);
    const [postListData, setPostListData] = useState([])
    
    // load subset posts
    useEffect(() => {
        if (clubData.name !== undefined){
            setPostListData(clubData.posts);
        }
    }, [setPostListData, clubData]);

    const loadPosts = async (event) => {
        console.log("Attempting to Load Posts!")
        if (clubData.name !== undefined){
            axios
            .get(`${url}/${clubData.name}`)
            .then((response) => {
                const data = response.data;
                setPostListData([...postListData, ...data]);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
        }
        }
    // TODO: Pass down the comments array also
    // if a club is defined, render postsData array's values
    // otherwise render nothing
    return (
        <div>
            <div className="posts">
                <div>
                    {(clubData !== undefined) ? postListData.map((postData) => {
                        const postProps = {
                            caption: postData.caption,
                            creator: postData.netId,
                            content: postData.content,
                            id: postData._id,
                            subset_comments: postData.comments
                        }
                        return (<Post props={postProps} key={postData._id}/>)
                        // return (<pre key={postData._id}>{JSON.stringify(postData, null, 2)}</pre>)
                    }) : <div></div>}
                    <button onClick={loadPosts}>See More Posts</button>
                </div>
            </div>
        </div>
    );
    // return (
    //     <div>
    //         <div className="posts">
    //             <div>
    //                 {clubData.posts !== undefined ? clubData.posts.map((postData) => {
    //                     const postProps = {
    //                         caption: postData.caption,
    //                         creator: postData.netId,
    //                         content: postData.content,
    //                         id: postData._id,
    //                         subset_comments: postData.comments
    //                     }
    //                     return (<Post props={postProps} key={postData._id}/>)
    //                 }) : postsData.map((postData) => {
    //                     const postProps = {
    //                         caption: postData.caption,
    //                         creator: postData.netId,
    //                         content: postData.content,
    //                         id: postData._id,
    //                         subset_comments: postData.comments
    //                     }
    //                     return (<Post props={postProps} key={postData._id}/>)
    //                 })}
    //                 <button onClick={loadPosts}>See More Posts</button>
    //             </div>
    //         </div>
    //     </div>
    // );
}