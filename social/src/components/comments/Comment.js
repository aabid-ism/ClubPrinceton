import './Comment.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from "axios"

const url = "http://localhost:5050/likes";

// TODO: integrate with redux store to get user-specific
function Like({ id, priorLikes}){
    const [isLiked, toggleLike] = useState(false);
    return (
        <div>
            <button onClick={((e) => {
                 toggleLike(!isLiked);
            })}>
                {isLiked ? <FaHeart/> :<FaRegHeart/> }
            </button>
            <p>
                {isLiked ? priorLikes + 1: priorLikes}
            </p>
        </div>
    );
}

// TODO: Make a request for whether the post was liked by a certain user
export default function Comment({ props }){
    let likes = 0;
    const user_netId = "cspeed";    
    const commentId = props._id;
    axios
        .get(`${url}/${commentId}?user=${user_netId}`)
        .then((response) => {
            const data = response.data;
            likes = data.numLikes;
            console.log(likes)
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });
    
    return (
        <div className='comment'>
            <div>
                {props.commenter_netId}:
                <div className="commentText">
                {props.data}
                </div>
            </div>
        
            <Like id={commentId} priorLikes={likes}/>
        </div>
    );
}