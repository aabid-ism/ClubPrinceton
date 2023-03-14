import Comment from "./Comment";

export default function Comments({ props }){

    return (
    <div className="comments">        
        <Comment props={props.commentsData}/>
        <Comment props={props.commentsData}/>
        <Comment props={props.commentsData}/>
        <Comment props={props.commentsData}/>
        <Comment props={props.commentsData}/>
        <Comment props={props.commentsData}/>
        <Comment props={props.commentsData}/>
        <Comment props={props.commentsData}/>
    </div>
    );
}