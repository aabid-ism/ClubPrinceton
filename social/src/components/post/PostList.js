import { useEffect, useState, useMemo } from "react";
import Post from "./Post";
import './Posts.css'
import axios from 'axios'
import { useSelector } from "react-redux";

const url = `${process.env.REACT_APP_SERVER_URL}/posts`;


export default function Posts({ props }) {
    const clubData = useSelector(state => state.clubData);
    const [postListData, setPostListData] = useState([])

    // load subset posts
    useEffect(() => {
        if (clubData.name !== undefined) {
            setPostListData(clubData.posts);
            // console.log(clubData.posts);
        }
    }, [setPostListData, clubData]);

    // dynamic post loading
    // possible TODO: pass id and do additional request, rather than time
    const loadPosts = async (event) => {
        console.log("Attempting to Load Posts!")
        console.log(postListData[postListData.length - 1]);
        // TODO: this might be fixed? See if this can be refactored
        if (clubData.name !== undefined) {
            let oldest;
            if (postListData[postListData.length - 1] !== undefined) {
                oldest = postListData[postListData.length - 1].created_at;
            }
            else {
                oldest = '';
            }
            axios
                .get(`${url}/${clubData.name}?oldestTime=${oldest}`)
                .then((response) => {
                    const data = response.data;
                    setPostListData([...postListData, ...data]);
                })
                .catch((error) => {
                    console.log("Error occurred: ", error);
                });
        }
        console.log(postListData);
    }
    // TODO: Pass down the comments array also
    // if a club is defined, render postsData array's values
    // otherwise render nothing
    return (
        <div className="posts">
            <div>
                {postListData.map((postData) => {
                    const postProps = {
                        caption: postData.caption,
                        creator: postData.netId,
                        content: postData.title,
                        id: postData._id,
                        subset_comments: postData.comments,
                        createdTime: new Date(postData.created_at).toLocaleDateString()
                    }
                    return (<Post props={postProps} key={postData._id} />)
                    // return (<pre key={postData._id}>{JSON.stringify(postData, null, 2)}</pre>)
                })}

                <button onClick={loadPosts}>See More Posts</button>
            </div>
        </div>
    );
}