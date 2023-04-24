import './Comment.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../auth/api';

const url = `${process.env.REACT_APP_SERVER_URL}/likes`;
// TODO: needs to actually update database with likes
function Like({ priorLikes, priorLikeStatus }){
    const [isLiked, toggleLike] = useState(priorLikeStatus);

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
    // TODO 1: How many likes did this comment get?
    // Send a get request with the comment's id
    // passdown the initial number of likes
    // for now
    const net_id = 'cspeed'
    let commentLikesData;
    api
    .get(`${url}/?netId=${net_id}`)
    .then((response) => {
        const data = response.data;
        console.log(data)
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
        
            <Like priorLikes={props.likes} priorLikeStatus={props.priorLikeStatus}/>
        </div>
    );
}