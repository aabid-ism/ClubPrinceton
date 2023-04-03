import Comment from "./Comment";
import './Comment.css'
import { useState } from "react";
import axios from "axios";

const url = "http://localhost:5050/comments";

export default function Comments({ props }){
    const [commentListData, updateCommentListData] = useState([])
    const loadCommentList = async (event) => {
        console.log("Attempting to Load Comments!")
        console.log(props.comments)
        if (props.comments !== undefined){
            axios
            .get(`${url}/${props.id}`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                updateCommentListData(data);
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
        }
        }
    // loadCommentList();
    console.log("Comment List Data")
    console.log(commentListData)
    return (
        <div className="comments">
            {commentListData.map((commentData) => {
                    return (<Comment props={commentData} key={commentData._id}/>)
                })
            }
            <button onClick={loadCommentList}>See More Comments!</button>
        </div>
        
    );
}

// export default function Comments({ props }){
//     const [commentListData, updateCommentListData] = useState([])
//     const loadCommentList = async (event) => {
//         console.log("Attempting to Load Comments!")
//         console.log(props.preloaded_comments)
//         if (props.preloaded_comments !== undefined){
//             axios
//             .get(`${url}/${props.id}`)
//             .then((response) => {
//                 const data = response.data;
//                 console.log(data);
//                 updateCommentListData(data);
//             })
//             .catch((error) => {
//                 console.log("Error occurred: ", error);
//             });
//         }
//         }
//     loadCommentList();
//     return (
//         <div className="comments">
//             {commentListData !== undefined ? commentListData.map((postData) => {
//                     const postProps = {
//                         id: props.postId,
//                         preloaded_comments: props.comments
//                     }
//                     return (<Comment props={postProps} key={postData._id}/>)
//                 }) : commentListData.map((postData) => {
//                     const postProps = {
//                         id: props.postId,
//                         preloaded_comments: props.comments
//                     }
//                 return (<Comment props={postProps} key={postData._id}/>)
//             })}
//             <button onClick={loadCommentList}>See More!</button>
//         </div>
        
//     );
// }