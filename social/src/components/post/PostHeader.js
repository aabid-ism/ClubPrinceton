import { FaEllipsisH } from "react-icons/fa";

function Icon({ image }){
    return (
        <div className="headerIcon">
            <img src={image} alt=""/>
        </div>
    );
}

function HeaderInfo({ children }){
    return (
        <div className="headerContent">
            {children}
        </div>
    );
}

// TODO: change the button to actually do something useful
function OptionButton({ props }){
    return (
        <div className="headerOption">
            <button onClick={() => {
                alert("Button Clicked!");
            }}>{<FaEllipsisH/>}</button>
        </div>
    );
}

function PostHeader({ children }){
    return (
        <div className="postHeader">
            {children}
        </div>
    );
}

function PostTitle({ props }){
    return (
        <div className="postTitle">
            {props.title}
        </div>
    );
}

function PostCreationInfo({ props }){
    return (
        <div className="postTimelineInfo">
            <p>{props.creator}</p>
            <p>{props.createdTime}</p>
            <p>{props.modTime}</p>
        </div>
    );
}

export {PostHeader, PostCreationInfo, PostTitle, Icon, HeaderInfo, OptionButton}
