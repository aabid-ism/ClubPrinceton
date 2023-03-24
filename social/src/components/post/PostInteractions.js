import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";

function PostComments({ children }){
    return (
        <div>
            {children}
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

function PersonalComment({LOGO}) {
    function handleKeyDown(event){
        if (event.key === 'Enter'){
            console.log(event.target.value);
            // TODO: Actually send this text to the server and create a comment
            alert("Hello! You just typed: " + event.target.value)
        }
    }
    return (
        <div className="your-comment">
            <div className="your-icon">
                <img src={LOGO} alt=""></img>
            </div>
            <div>
                <input 
                    type="text" 
                    className="your-comment-text" 
                    placeholder="Add a Comment..." 
                    onKeyDown={handleKeyDown}
                ></input>
            </div>
        </div>);
}

export {PersonalComment, PostComments, PostMetrics}