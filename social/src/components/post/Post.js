import React from "react";
import './Post.css'
import LOGO from './shrek.png'
import { FaEllipsisH, FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import Comments from "../comments/Comments";

// this should be a separate component for usage in other places maybe?
function Icon({ image }){
    return (
        <div className="postIcon">
            <img src={image} alt=""/>
        </div>
    );
}

function HeaderInfo({ props }){
    return (
        <div className="headerContent">
            <p>Content</p>
        </div>
    );
}

function OptionButton({ props }){
    return (
        <div className="postOption">
            <button onClick={() => {
                alert("Button Clicked!");
            }}>{<FaEllipsisH/>}</button>
        </div>
    );
}

function PostHeader({ props }){
    return (
        <div className="postHeader">
            <Icon image={LOGO}/>
            <HeaderInfo/>
            <OptionButton/>
        </div>
    );
}

function PostContent({ props }){
    return (
        <div>
            <div className="postContent">
                {props.content}
            </div>
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
                    {props.numberOfPostLikes}
                </div>
                <div>
                    {<FaCommentAlt />}
                </div>
                <div>
                    {props.numberOfPostComments}
                </div>
            </div>
        </div>
    );
}

// TODO: Create a "Comments" component that takes in and handles all the comment logic
function PostComments({ props }){
    return (
        <div>
            <PostMetrics props={props.postMetrics}/>
            <Comments props={{commentsData: props.commentsData}}/>
            <div className="your-comment">
                
            </div>
        </div>
    );
}

function Post({ props }){
    const defaultPostProps = {
        headerProps: {
            
        },
        contentProps: {

        },
        commentsProps:{
            postMetrics:{
                numberOfPostLikes: 120,
                numberOfPostComments: 8,
            },
            commentsData: {
                comments: [
                    {commentText: "I love whatever this is!"},
                    {commentText: "Comment 2"},
                    {commentText: "Comment 3"},
                    {commentText: "Comment 4"},
                    {commentText: "Zoo-Wee-Mama"},
                    {commentText: "Comment moment"}
                ]
            }
        }
    }
    return (
        <div className='bubble'>
            <div className='post'>
                <PostHeader/>
                <PostContent props={{content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla est ullamcorper eget nulla facilisi etiam. Morbi blandit cursus risus at ultrices mi. Curabitur gravida arcu ac tortor. Vestibulum lectus mauris ultrices eros in. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Sed cras ornare arcu dui vivamus arcu felis. Convallis posuere morbi leo urna molestie at. Massa eget egestas purus viverra accumsan in nisl. Et netus et malesuada fames ac. Amet est placerat in egestas erat imperdiet. Ultrices dui sapien eget mi proin sed. Iaculis nunc sed augue lacus viverra vitae congue eu. Urna duis convallis convallis tellus id. Nibh tortor id aliquet lectus proin nibh. Eu feugiat pretium nibh ipsum consequat nisl vel. Aliquam nulla facilisi cras fermentum odio. Tortor id aliquet lectus proin nibh. Ornare lectus sit amet est placerat. Viverra suspendisse potenti nullam ac tortor vitae. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Feugiat pretium nibh ipsum consequat nisl vel. Accumsan sit amet nulla facilisi morbi tempus iaculis urna id. Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Faucibus turpis in eu mi bibendum neque egestas."}}/>
                <PostComments props={defaultPostProps.commentsProps}/>
            </div>            
        </div>
    );
}


  export default Post;