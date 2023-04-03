import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";

import axios from "axios";

const url = "http://localhost:5050/comments";

function PostComments({ children }){
    return (
        <div>
            {children}
        </div>
    );
}    

function PostMetrics({props}) {
    return (
        <div className="postMetricBar">
            <div className="postMetric">
                <div>
                    {<FaThumbsUp />} 
                </div>
                <div>
                    {props.numPostLikes}
                </div>
                <div>
                    {<FaCommentAlt />}
                </div>
                <div>
                    {props.numPostComments}
                </div>
            </div>
        </div>
    );
}

function PersonalComment({LOGO, postId}) {
    function handleKeyDown(event){
        if (event.key === 'Enter'){
            if (event.target.value !== ''){
                const commentData = {
                    data: event.target.value,
                    postId: postId
                }
                console.log(event.target.value);
                axios
                .post(`${url}/create`, commentData)
                .then((response) => {
                    const data = response.data;
                    console.log(data)
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

export {PersonalComment, PostComments, PostMetrics}