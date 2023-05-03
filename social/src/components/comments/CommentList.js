import Comment from "./Comment";
import './Comment.css'
import { useEffect, useState, useRef } from "react";
import api from "../auth/api";

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
            <div className="comments" >
                <div>
                    {
                    commentListData.map((commentData) => {
                            // return (<pre key={commentData._id}>{JSON.stringify(commentData, null, 2)}</pre>)
                            console.log(commentData)
                            return (<Comment postId={props.postId }props={commentData} key={commentData._id}/>)
                        })
                    }
                </div>
                
                <button onClick={loadCommentList}>See Comments!</button>
            </div>
            <PersonalComment postId={props.postId} list={[commentListData, setCommentListData]}/>
        </div>
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
                    console.log(data) // the returned comment
                    // could refactor to be slightly more sus
                    updateListData([data, ...listData])
                })
                .catch((error) => {
                    console.log("Error occurred: ", error);
                });
                // empty the comment field for typing
                // alert('Comment Submitted!')
                event.target.value = '';
                // if (listDiv.current) {
                //     listDiv.current.scrollTop = 0;
                // }
            }
        }
    }
    return (
        <div className="your-comment">
            <div className="your-icon">
                <img src={localStorage.getItem("profilepic")} alt=""></img>
            </div>
            <div>
                <input 
                    type="text" 
                    className="your-comment-text" 
                    placeholder='Add a Comment... (Press "Enter" to Send)'
                    onKeyDown={handleKeyDown}
                ></input>
            </div>
        </div>);
}