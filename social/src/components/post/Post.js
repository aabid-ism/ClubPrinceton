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
import {
  PostComments,
  PostMetrics,
  PersonalComment,
} from "./PostInteractions";


function PostContent({ content }) {
  return <div className="postContent">{content}</div>;
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
  const defaultPostProps = {
    headerProps: {
      creator: "Chris Speed",
      creatorIcon: LOGO,
      title: "Come to our event!",
      createdTime: "03/14/23",
      modTime: "03/15/23",
    },
    contentProps: {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla est ullamcorper eget nulla facilisi etiam. Morbi blandit cursus risus at ultrices mi. Curabitur gravida arcu ac tortor. Vestibulum lectus mauris ultrices eros in. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Sed cras ornare arcu dui vivamus arcu felis. Convallis posuere morbi leo urna molestie at. Massa eget egestas purus viverra accumsan in nisl. Et netus et malesuada fames ac. Amet est placerat in egestas erat imperdiet. Ultrices dui sapien eget mi proin sed. Iaculis nunc sed augue lacus viverra vitae congue eu. Urna duis convallis convallis tellus id. Nibh tortor id aliquet lectus proin nibh. Eu feugiat pretium nibh ipsum consequat nisl vel. Aliquam nulla facilisi cras fermentum odio. Tortor id aliquet lectus proin nibh. Ornare lectus sit amet est placerat. Viverra suspendisse potenti nullam ac tortor vitae. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Feugiat pretium nibh ipsum consequat nisl vel. Accumsan sit amet nulla facilisi morbi tempus iaculis urna id. Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Faucibus turpis in eu mi bibendum neque egestas.",
    },
    commentsProps: {
      postMetrics: {
        numberOfPostLikes: 34, // TODO: This needs to match the length of the comments array. Will need to be formatted by the server?
        numberOfPostComments: 7,
      },
      commentsData: {
        comments: [
          {
            commentText: "I love whatever this is!",
            priorLikes: 12,
            priorLikeStatus: true,
          },
          {
            commentText: "Not a fan",
            priorLikes: 42,
            priorLikeStatus: false,
          },
          {
            commentText: "Elephant",
            priorLikes: 7,
            priorLikeStatus: true,
          },
          {
            commentText: "Oscar the Grouch",
            priorLikes: 12,
            priorLikeStatus: false,
          },
          {
            commentText: "Hello",
            priorLikes: 34,
            priorLikeStatus: false,
          },
          {
            commentText: "Meme",
            priorLikes: 80,
            priorLikeStatus: true,
          },
          {
            commentText: "Comment Again more",
            priorLikes: 40,
            priorLikeStatus: true,
          },
        ],
      },
    },
  };
  const headerProps = {
    creator: props.creator,
    creatorIcon: LOGO,
    title: props.caption,
    createdTime: props.createdTime,
    modTime: "Edits: None!",
  };
  const contentProps = {
    content: props.content,
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

  // TODO: Add a state array for the comments, and pass down the state update callback to
  // the PersonalComment
  // TODO: The post should be keeping track of how many total comments have been made
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
