import Comment from "./Comment";
import './Comment.css'

export default function Comments({ props }){
    // const commentInputs = props.commentsData.comments;
    const commentInputText = props.commentsData.comments;
    
    return (
        <div className="comments">
            {commentInputText.map(text => (
                <Comment key={{commentText:text}} props={{commentText:text}}></Comment>
            ))}
        </div>
    );
}