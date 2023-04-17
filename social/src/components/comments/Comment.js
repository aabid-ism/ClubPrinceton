import './Comment.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from "axios"

const url = "http://localhost:5050/likes";

// TODO: integrate with redux store to get user-specific
function Like({ id }){
    const user_netId = "cspeed";
    const [priorLikes, setPriorLikes] = useState(0)
    const [isLiked, toggleLike] = useState(false);

    useEffect(() => {
        axios
        .get(`${url}/${id}?user=${user_netId}`)
        .then((response) => {
            const data = response.data;
            console.log(data)
            setPriorLikes(data.numLikes);
            toggleLike(data.user_has_liked);
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });
    })
    
    
    // useEffect(() => {
    //     getLikes();
    // }, [isLiked, toggleLike]);

    // const getLikes = () => {

    // };
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
    const commentId = props._id;
    return (
        <div className='comment'>
            <div>
                {props.commenter_netId}:
                <div className="commentText">
                {props.data}
                </div>
            </div>
        
            <Like id={commentId}/>
        </div>
    );
}