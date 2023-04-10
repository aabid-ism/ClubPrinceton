import Comment from "./Comment";
import './Comment.css'
import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://clubprinceton.azurewebsites.net/comments";

export default function Comments({ props }){
    const [commentListData, setCommentListData] = useState([])
    console.log(props.comments)
    useEffect(() => {
        if (props.comments !== undefined){
            setCommentListData(props.comments);
        }
    }, [setCommentListData, props])

    const loadCommentList = async (event) => {
        console.log("Attempting to Load Comments!");
        console.log(`Request made: ${url}/load/${props.postId}`)
        let oldest;
        if (commentListData[commentListData.length - 1] !== undefined){
            oldest = commentListData[commentListData.length - 1].created_at;
        }
        else {
            oldest = '';
        }
        axios
        .get(`${url}/load/${props.postId}?oldestTime=${oldest}`)
        .then((response) => {
            const data = response.data;
            setCommentListData([...commentListData, ...data]);
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });
    }
        // if (commentListData !== undefined){
        //     axios
        //     .get(`${url}/load/${props.postId}`)
        //     .then((response) => {
        //         const data = response.data;
        //         console.log("Data Retrieved!");
        //         console.log(data);
        //         setCommentListData(data); // later, do spread
        //         console.log(commentListData);
        //     })
        //     .catch((error) => {
        //         console.log("Error occurred: ", error);
        //     });
        // } else {
        //     axios
        //     .get(`${url}/load/${props.postId}`)
        //     .then((response) => {
        //         const data = response.data;
        //         console.log("Data Retrieved!");
        //         console.log(data);
        //         setCommentListData(data);
        //         console.log(commentListData);
        //     })
        //     .catch((error) => {
        //         console.log("Error occurred: ", error);
        //     });
        // }
        
        // }
    // loadCommentList();
    // console.log("Comment List Data at Start")
    // console.log(commentListData)
    return (
        <div className="comments">
            {commentListData.map((commentData) => {
                    // return (<pre key={commentData._id}>{JSON.stringify(commentData, null, 2)}</pre>)
                    return (<Comment props={commentData} key={commentData._id}/>)
                })
            }
            <button onClick={loadCommentList}>See Comments!</button>
        </div>
        
    );
}

// import Comment from "./Comment";
// import './Comment.css'
// import { useState } from "react";
// import axios from "axios";

// const url = "http://localhost:5050/comments";

// export default function Comments({ props }){
//     const [commentListData, updateCommentListData] = useState([])

//     const loadCommentList = async (event) => {
//         console.log("Attempting to Load Comments!");
//         // if (props.comments !== undefined){
//         //     axios
//         //     .get(`${url}/${props.id}`)
//         //     .then((response) => {
//         //         const data = response.data;
//         //         console.log(data);
//         //         updateCommentListData(data);
//         //     })
//         //     .catch((error) => {
//         //         console.log("Error occurred: ", error);
//         //     });
//         // }
//         console.log(`Request made: ${url}/load/${props.postId}`)
//         if (commentListData !== undefined){
//             axios
//             .get(`${url}/load/${props.postId}`)
//             .then((response) => {
//                 const data = response.data;
//                 console.log("Data Retrieved!");
//                 console.log(data);
//                 updateCommentListData(data); // later, do spread
//                 console.log(commentListData);
//             })
//             .catch((error) => {
//                 console.log("Error occurred: ", error);
//             });
//         } else {
//             axios
//             .get(`${url}/load/${props.postId}`)
//             .then((response) => {
//                 const data = response.data;
//                 console.log("Data Retrieved!");
//                 console.log(data);
//                 updateCommentListData(data);
//                 console.log(commentListData);
//             })
//             .catch((error) => {
//                 console.log("Error occurred: ", error);
//             });
//         }
        
//         }
//     // loadCommentList();
//     // console.log("Comment List Data at Start")
//     // console.log(commentListData)
//     return (
//         <div className="comments">
//             {commentListData.map((commentData) => {
//                     return (<Comment props={commentData} key={commentData._id}/>)
//                 })
//             }
//             <button onClick={loadCommentList}>See Comments!</button>
//         </div>
        
//     );
// }

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