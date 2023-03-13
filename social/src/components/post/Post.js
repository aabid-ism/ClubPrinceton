import React from "react";
import './Post.css'
// import LOGO from './terry benedict profile pic.png'
import LOGO from './shrek.png'

// this should be a separate component for usage in other places maybe?
function Icon({ image }){
    return (
        <div className="postIcon">
            <img src={image} alt=""/>
        </div>
    );
}

function PostHeader({ props }){
    return (
        <div className="postHeader">
            <Icon image={LOGO}/>
            <Icon image={LOGO}/>
            <Icon image={LOGO}/>
        </div>
    );
}

function PostContent({ props }){
    return (
        <div className="postContent">
            <p>Content</p>
        </div>
    );
}

// TODO: Current Idea is put all the rating/interaction into this component/sub-components
function PostComments({ props }){
    return (
        <div className="postComments">
            <p>Comments</p>
        </div>
    );
}

function Post({ props }){
    return (
        <div className='bubble'>
            <div className='post'>
                <PostHeader/>
                <PostContent/>
                <PostComments/>
            </div>            
        </div>
    );
}

export default Post;