import Comment from "./Comment";
import './Comment.css'

export default function Comments({ props }){
    const comments = props.comments;
    
    return (
        <div className="comments">
            {comments.map(comment => (
                <Comment key={{commentText:comment.commentText}} value={comment.commentText} props={
                    comment}></Comment>
            ))}
        </div>
    );
}