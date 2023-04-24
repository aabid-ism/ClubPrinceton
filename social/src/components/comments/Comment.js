import './Comment.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../auth/api';

const url = `${process.env.REACT_APP_SERVER_URL}/comments`;
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
export default function Comment ({ props }){
    let commentLikeData = {
        number_of_likes: 0,
        user_has_liked: false
      }
    async function getData(){
        let netId = localStorage.getItem("netid"); // could be moved up the chain
        const commentId = props._id;
        const like_info_string = `${url}/like/${commentId}`;
        
        await api
        .get(like_info_string)
        .then((response) => {
            console.log(response.data)
            commentLikeData = response.data;
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });
    }
    getData();
    
    return (
        <div className='comment'>
            <div>
                {props.commenter_netId}:
                <div className="commentText">
                {props.data}
                </div>
            </div>
        
            <Like priorLikes={commentLikeData.number_of_likes} priorLikeStatus={commentLikeData.user_has_liked}/>
        </div>
    );
}