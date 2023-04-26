import Comment from "./Comment";
import './Comment.css'
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../auth/api";

const url = `${process.env.REACT_APP_SERVER_URL}/comments`;

export default function CommentList({ props }){
    // this state array should be modifiable via context or passing down when PersonalComment edits
    const [commentListData, setCommentListData] = useState([])
    // console.log(props)
    useEffect(() => {
        if (props.comments !== undefined){
            setCommentListData(props.comments);
        }
    }, [setCommentListData, props])
    //console.log(commentListData)

    const loadCommentList = async (event) => {
        // console.log("Attempting to Load Comments!");
        // console.log(`Request made: ${url}/load/${props.postId}`)
        let oldest;
        if (commentListData[commentListData.length - 1] !== undefined){
            oldest = commentListData[commentListData.length - 1].created_at;
        }
        else {
            oldest = '';
        }
        api
        .get(`${url}/load/${props.postId}?oldestTime=${oldest}`)
        .then((response) => {
            const data = response.data;
            setCommentListData([...commentListData, ...data]);
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });
    }
       
    return (
        <div>
            <div className="comments">
                {
                commentListData.map((commentData) => {
                        // return (<pre key={commentData._id}>{JSON.stringify(commentData, null, 2)}</pre>)
                        console.log(commentData)
                        return (<Comment postId={props.postId }props={commentData} key={commentData._id}/>)
                    })
                }
                <button onClick={loadCommentList}>See Comments!</button>
                
            </div>
            <PersonalComment postId={props.postId} list={[commentListData, setCommentListData]}/>
        </div>
    );
}

function PersonalComment({LOGO, postId, list}) {
    const [listData, updateListData] = list;
    function handleKeyDown(event){
        if (event.key === 'Enter'){
            if (event.target.value !== ''){
                
                const commentData = {
                    data: event.target.value,
                    postId: postId
                }
                console.log(event.target.value);
                api
                .post(`${url}/create`, commentData)
                .then((response) => {
                    const data = response.data;
                    console.log(data) // the returned comment
                    // could refactor to be slightly more sus
                    updateListData([data, ...listData])
                })
                .catch((error) => {
                    console.log("Error occurred: ", error);
                });
            }
        }
    }
    return (
        <div className="your-comment">
            <div className="your-icon">
                <img src={LOGO} alt=""></img>
            </div>
            <div>
                <input 
                    type="text" 
                    className="your-comment-text" 
                    placeholder="Add a Comment..." 
                    onKeyDown={handleKeyDown}
                ></input>
            </div>
        </div>);
}