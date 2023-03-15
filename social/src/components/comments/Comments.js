import Comment from "./Comment";
import './Comment.css'

export default function Comments({ props }){
    const commentInputText = props.commentsData.comments;
    
    return (
        <div className="comments">
            {commentInputText.map(textObj => (
                <Comment key={{commentText:textObj.commentText}} props={{commentText:textObj.commentText}}></Comment>
            ))}
        </div>
    );
}