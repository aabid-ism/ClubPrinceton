import './Comment.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import api from '../auth/api';

const url = `${process.env.REACT_APP_SERVER_URL}/comments`;
// TODO: needs to actually update database with likes
function Like({ commentId, postId, netId, priorLikes, priorLikeStatus }){
    const [isLiked, toggleLike] = useState(priorLikeStatus);
    function handleLike(event){
        toggleLike(!isLiked);
        const likeData = {
            netId: netId,
            commentId: commentId,
            postId: postId,
            likeAmount: isLiked ? -1 : 1
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
export default function Comment ({ postId, props }){
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
    }
    const [commentInfo, setCommentInfo] = useState("Loading")
    const getName = async () => {
        await api
        .get(`${url}/getname/${props.commenter_netId}`)
        .then((response) => {
            setCommentInfo(response.data);
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });
    }
    
    useEffect(() => {
        getName(); 
    });
    // liking functionality tba
    return (
        <div className='comment'>
            <div>
                {`${commentInfo} (${props.commenter_netId})`}:
                <div className="commentText">
                    {props.data}
                </div>
            </div>

            {/* <Like commentId={props._id} postId={postId }netId={localStorage.getItem("netid")} priorLikes={props.likes} priorLikeStatus={false}/> */}
        </div>
    );
}