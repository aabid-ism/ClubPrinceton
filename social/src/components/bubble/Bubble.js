import React from "react";

function Events({props}){
    return (
        <div className="flex flex-col divide-y-2 divide-amber-700 p-3">
            <div className="flex text-black text-l font-medium mx-auto">
                <p>Upcoming Events</p>
            </div>
            <div>
                <NotificationList props={props}/>
            </div>
        </div>
    );
}

function NotificationList({props}){
    // TODO: Add in the links support 
    const mainEvent = {notificationLabel: "Main Show: ", notificationText: props.mainEventText};
    const recruitEvent = {notificationLabel: "Recruiting Event: ", notificationText: props.recruitingText};
    const socialEvent = {notificationLabel: "Social Event: ", notificationText: props.socialText};
    const memberEvent = {notificationLabel: "Members Event: ", notificationText: props.memberText};
    return (
        <div className="flex flex-col">
            <div>
                <Notification props={mainEvent}/>
            </div>
            <div>
            <Notification props={recruitEvent}/>
            </div>
            <div>
                <Notification props={socialEvent}/>
            </div>
            <div>
                <Notification props={memberEvent}/>
            </div>
        </div>
    );
}

function Notification({props}){
    return (
        <div className="grid grid-cols-2 mx-auto">
            <div className="text-black text-l font-medium">
                <p>{props.notificationLabel}</p>
            </div>
            <div className="text-gray-700 text-0.5 font-medium">
                <href src={props.eventLink}>{props.notificationText}</href>
            </div>
        </div>
    );
}

function Bubble({props}){
    const eventsProps = props.eventsProps;
    return (
        <div className={
            `flex w-${props.width} h-${props.height} bg-${props.color} mx-auto rounded-lg`
        }>
            <div>
                <Events props={eventsProps}></Events>
            </div>
        </div>
    );
}

export default Bubble;