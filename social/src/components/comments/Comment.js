import './Comment.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../auth/api';

const url = `${process.env.REACT_APP_SERVER_URL}/comments`;
// TODO: needs to actually update database with likes
function Like({ commentId, netId, priorLikes, priorLikeStatus }){
    const [isLiked, toggleLike] = useState(priorLikeStatus);
    function handleLike(event){
        toggleLike(!isLiked);
        const likeData = {
            netId: netId,
            commentId: commentId
        }
        api
        .post(`${url}/like/`, likeData)
        .then((response) => {
            const data = response.data;
            console.log(data) 
        })// the returned comment
        .catch((error) => {
            console.log("Error occurred: ", error);
        });    
    }
    return (
        <div>
            <button onClick={handleLike}>
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
    async function getData(){
        let netId = localStorage.getItem("netid"); // could be moved up the chain
        const commentId = props._id;
        const like_info_string = `${url}/like/${commentId}`;
        
        await api
        .get(like_info_string)
        .then((response) => {
            // console.log(response.data)
            return response.data;
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });

        // try {
        //     let response = await api.get(like_info_string);
        //     return response.data;
        // } catch (error) {
            //     console.log("Error occurred: ", error);
            // }
    }
        // useEffect(() => {
    const commentLikeData = getData();
        
    // })
    console.log(commentLikeData)
    
    return (
        <div className='comment'>
            <div>
                {props.commenter_netId}:
                <div className="commentText">
                {props.data}
                </div>
            </div>
        
            <Like commentId={props._id} netId={localStorage.getItem("netid")} priorLikes={commentLikeData.number_of_likes} priorLikeStatus={commentLikeData.user_has_liked}/>
        </div>
    );
}