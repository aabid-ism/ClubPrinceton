import React from "react";

import "./Post.css";
import LOGO from "./blue_man.jpg";
import {
  PostHeader,
  PostCreationInfo,
  PostTitle,
  Icon,
  HeaderInfo,
  OptionButton,
} from "./PostHeader.js";
import CommentList from "../comments/CommentList";
import { PostComments } from "./PostInteractions";


function PostContent({ props }) {
  const img_url = `https://${process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/images/${props.image_url}`;
  console.log(img_url)
  return (<div className="postContent">
    <div className="postImage">
      <img src={img_url} alt=""/>
    </div>
    {props.content}
    </div>);
}

function PostBubble({ children, width, height }) {
  return (
    <div
      className="bubble"
      style={{
        width: width,
        height: height,
        maxHeight: height,
        maxWidth: width,
      }}
    >
      {children}
    </div>
  );
}

function Post({ props, width, height }) {
  const headerProps = {
    creator: props.creator,
    creatorIcon: LOGO,
    title: props.caption,
    createdTime: props.createdTime,
    modTime: "Edits: None!",
  };
  const contentProps = {
    content: props.content,
    image_url: props.image_url
  };

  const commentProps = {
    postId: props.id,
    comments: props.subset_comments,
    commenterLogo: LOGO,
  };

  const numPostComments =
    commentProps.comments !== undefined
      ? commentProps.comments.length
      : 0;
  return (
      <PostBubble width={width} height={height}>
        <PostHeader>
          <HeaderInfo>
            <PostTitle props={headerProps} />
            <PostCreationInfo props={headerProps} />
          </HeaderInfo>
          <OptionButton />
        </PostHeader>
      <PostContent props={contentProps}/>

        <PostComments>
          <CommentList props={commentProps} />
        </PostComments>
      </PostBubble>
  );
}

export default Post;
