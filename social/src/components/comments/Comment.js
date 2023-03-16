import './Comment.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

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

export default function Comment({ props }){
    return (
        <div className='comment'>
            <div className="commentText">
                {props.commentText}
            </div>
            <Like priorLikes={props.priorLikes} priorLikeStatus={props.priorLikeStatus}/>
        </div>
    );
}