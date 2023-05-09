import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import "./Post.css";
import LOGO from "./blue_man.jpg";
import {
  PostHeader,
  PostCreationInfo,
  PostTitle,
  HeaderInfo,
  OptionButton,
} from "./PostHeader.js";
import CommentList from "../comments/CommentList";
import { PostComments } from "./PostInteractions";

/* 
    The post content component.
    @param props: the props passed to the component with the content and image_url
    @return the PostContent component with the content and image_url
*/
function PostContent({ props }) {
  const img_url = `https://${process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/images/${props.image_url}`;
  return (<div className="postContent">
      {props.image_url !== '' ? 
      <div className="post-image-wrapper">
          <img className="post-image" src={img_url} alt=""/>
      </div> 
      : 
      <></>}
      <div className="post-caption-text">
        {props.content}
      </div>
    </div>);
}


function PostBubble({ children }) {
  return <Container className="post-bubble">{children}</Container>;
}
/* 
    The post component.
    @param props: the props passed to the component with the post data
    @return the Post component with the post data
*/
function Post({ props }) {
  const headerProps = {
    creator: props.creator,
    creatorIcon: LOGO,
    title: props.content,
    createdTime: props.createdTime,
  };
  const contentProps = {
    content: props.caption,
    image_url: props.image_url,
  };

  const commentProps = {
    postId: props.id,
    comments: props.subset_comments,
  };

  return (
    <PostBubble>
      <PostHeader>
        <HeaderInfo>
          <PostTitle props={headerProps} />
          <PostCreationInfo props={headerProps} />
        </HeaderInfo>
      </PostHeader>
      <PostContent props={contentProps} />

      <PostComments>
        <CommentList props={commentProps} />
      </PostComments>
    </PostBubble>
  );
}

export default Post;
