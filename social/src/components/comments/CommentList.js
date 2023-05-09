import Comment from "./Comment";
import './Comment.css'
import { useEffect, useState, useRef } from "react";
import api from "../auth/api";
import PLACEHOLDER_IMAGE from './placeholder_personal_image.jpg'

const url = `${process.env.REACT_APP_SERVER_URL}/comments`;

export default function CommentList({ props }){
    // this state array should be modifiable via context or passing down when PersonalComment edits
    const [commentListData, setCommentListData] = useState([])

    // const listDiv = useRef(null)

    // useEffect(() => {
    //     // scroll to the top on re-rendering -> adapted from chatgpt    
    //     if (listDiv.current) {
    //       listDiv.current.scrollTop = 0;
    //     }
    //   });

    useEffect(() => {
        if (props.comments !== undefined){
            setCommentListData(props.comments);
        }
    }, [setCommentListData, props])

    const loadCommentList = async (event) => {
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
        <>
            <div className="comments" >
                <div>
                    {
                    commentListData.length !== 0 ?
                    commentListData.map((commentData) => {
                            // console.log(commentData)
                            return (<Comment postId={props.postId }props={commentData} key={commentData._id}/>)
                        }) :
                    <center><h5>No Comments Yet!</h5></center>
                    }
                </div>
                
                {commentListData.length > 4 ?
                    <button onClick={loadCommentList}>See Comments!</button>:
                    <></>}
            </div>
            <PersonalComment postId={props.postId} list={[commentListData, setCommentListData]}/>
        </>
    );
}

function PersonalComment({ postId, list}) {
    const [listData, updateListData] = list;
    function handleKeyDown(event){
        if (event.key === 'Enter'){
            if (event.target.value !== ''){
                console.log("Attempting to comment")
                const commentData = {
                    data: event.target.value,
                    postId: postId,
                    netid: localStorage.getItem("netid")
                }
                console.log(event.target.value);
                api
                .post(`${url}/create`, commentData)
                .then((response) => {
                    const data = response.data;
                    updateListData([data, ...listData])
                })
                .catch((error) => {
                    console.log("Error occurred: ", error);
                });
                // clear out the comment
                event.target.value = '';
            }
        }
    }
    // console.log(localStorage.getItem("profilepic"))

    let profile_photo;
    try {
        const profile_pic = localStorage.getItem("profilepic");
        profile_photo = profile_pic;
    } catch (e) {
        profile_photo = PLACEHOLDER_IMAGE;
    }
    return (
        <div className="your-comment">
            <div className="your-icon">
                <img src={profile_photo} alt="Profile"></img>
            </div>
            <input 
                type="text" 
                className="your-comment-text" 
                placeholder='Type Comment! (Press "Enter" to Send)'
                onKeyDown={handleKeyDown}
                maxLength={40}
            ></input>

        </div>);
}