import React from "react";
// need to make constant?
import './clubrating.css';
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import api from "../auth/api";
import { useSelector, useDispatch } from "react-redux";


function OvrRtgBubble(props){
    console.log("this is my props: " + props.redColor);
    let cssProperties = {
        // forget about rgb
        // see if you can pass in red
        backgroundColor: "rgb(" + props.redColor + "," + props.greenColor +
        "," + props.blueColor +  ")"
    };
    return (
        <div className="ovr-rtg-bubble" style={cssProperties}>
            {props.children}
        </div>

    );
}

// write this in a more javascript fashion?
function roundHundreth(value) {
    return Math.round(value * 100) / 100;
}

function getRGBColors(clubRating) {
    const MAX_RTG = 5;
    const MIN_RTG = 1;
    const DIFF_RTG = MAX_RTG - MIN_RTG;
    console.log("OzvrRating: Club Rating breakdown: " + JSON.stringify(clubRating));

    const clubClout = roundHundreth(clubRating.rating.Clout);
    const clubVibes = roundHundreth(clubRating.rating.Vibes);
    const clubIntensity = roundHundreth(clubRating.rating.Intensity);
    const clubInclusivity = roundHundreth(clubRating.rating.Inclusivity);

    const clubRoundedRtg = `${roundHundreth((clubClout + clubVibes + clubIntensity + clubInclusivity) / 4)}`;

    console.log("club roundedz rating: " + clubRoundedRtg);
    console.log("type of value for club rounded rating: " + typeof(clubRoundedRtg));

    const red = Math.round(255 * (MAX_RTG - clubRoundedRtg)) / DIFF_RTG;
    console.log("Red color generated: " + red);
    const green = Math.round(255 * (clubRoundedRtg - MIN_RTG)) / DIFF_RTG;
    const blue = 0;

    console.log("redz coloring: " + red);

    console.log("new ratz" + JSON.stringify({clubRoundedRtg: clubRoundedRtg, red: red, green: green, blue: blue}));
    console.log("please accept: " + clubRoundedRtg);
    return {clubRoundedRtg: clubRoundedRtg, red: red, green: green, blue: blue};
}

// use useRef

export function OvrRating() {
    // THE INITIAL VALUE IN USE STATE IS POINTLESS IN CONDITIONAL RENDERING
    // EDIT: DEBUG LATER IN SEMESTER of why the initial state wasn't being rendered properly
    // LATER: BETTER REACT CODE -> UPDATE to USEEFFECT -> do the same for announcements
    // LATER: More refinde coloring system
    const clubData = useSelector(state => state.clubData);
    // const hasOneUserRtg = useSelector((state) => state.hasOneUserRtg);
    const clubRating = useSelector(state => state.globalRatings);
    console.log("clubrating for " + clubData.name + " " + JSON.stringify(clubRating));
    // const [hasClubRating, sethasClubRating] = useState(false);
    // updates color/number without rerendering component
    const [overallRating, setOverallRating] = useState({clubRoundedRtg: "INITIAL", red: 173, green: 216, blue: 230});
    // const clubRoundedRtg = useRef("NEW");
    // const hasClubRating = useRef(false);
    const dispatch = useDispatch();
    const [testBoolean, setTestBoolean] = useState(0);
    // console.log("state rating: " + JSON.stringify(clubRating));
    // made it N/A so we can differentiate what is being seen!
    // in case there is a massive error
    // something wrong in the axios request
    // const [ovrRating, setOvrRating] = useState("N/A");

    // runs on only the first render of the component
    // useEffect(() => {setclubRoundRtg(clubRoundRtg)}, []);

    // use state causes application to rerender -> that's why useffect gets run again
    // with true value set

    // let hasClubRating = false;


    const checkUserRtgUrl = `${process.env.REACT_APP_SERVER_URL}/clubRating/check`;
    // NONE RATING -> GRAY BACKGROUND
    // BREAKDOWN NONE -> INDIVIDUAL NONE -> GRAY TEXT BACKGROUND

    // to the backend -> we are sending back the club
    // link we are currently on
    // async await? necessary?
    useEffect(() => {
        console.log("first");
        console.log("I'm in the useEffect for overallRating");
        api
            .get(checkUserRtgUrl, {
                params: {clubName: clubData.name}
            })
            .then((response) => {
                const hasUserRating= response.data.hasUserRating;
                console.log("Type of parameter given from endpoint: " + typeof(hasUserRating));
                console.log("Club has a user rating (1 or 0): " + clubData.name + " " + JSON.stringify(hasUserRating));
                // setOvrRating(ovrRatingData);
                // if (hasUserRating) {
                    // console.log("I have a 0 rating docs yet I'm still getting overall rating")
                    // this gets set for all of the clubs -? for this component
                    if (hasUserRating === 1) {
                        setTestBoolean(1);
                        // setOverallRating({clubRoundedRtg: "test club 2", red: 173, green: 216, blue: 230});
                        // setOverallRating(getRGBColors(clubRating))
                        console.log("I'm in has user rating and I'm checking club rating" + JSON.stringify(clubRating));
                        const newClubRating = getRGBColors(clubRating);
                        setOverallRating(newClubRating);
                        console.log("OVzzzerall rating: " + newClubRating.clubRoundedRtg);
                    }
                    else {
                        setTestBoolean(0);
                        setOverallRating({clubRoundedRtg: "NEW", red: 173, green: 216, blue: 230});
                    }
                    // setOverallRating({clubRoundedRtg: testBoolean, red: 173, green: 216, blue: 230});

                    // sethasClubRating(true);90
                    // hasClubRating.current = true;
                    // dispatch({
                    //     type: "SET_HAS_USER_RATING",
                    //     payload: { hasOneUserRtg: true },
                    // });
                    // console.log("WE have a club rating elephant: " + hasUserRating);
                    // const ovrRating = getRGBColors(clubRating);
                    // setOverallRating(ovrRating);
                    // write the create club rounded rating in here!
                // };
            })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });

    }, [clubData]);
    // if (clubData.name !== undefined) {
        // console.log("first");
        // console.log("I'm in the useEffect for overallRating");
        // api
        //     .get(checkUserRtgUrl, {
        //         params: {clubName: clubData.name}
        //     })
        //     .then((response) => {
        //         const hasUserRating= response.data.hasUserRating;
        //         console.log("Type of parameter given from endpoint: " + typeof(hasUserRating));
        //         console.log("Club has a user rating (1 or 0): " + clubData.name + " " + JSON.stringify(hasUserRating));
        //         // setOvrRating(ovrRatingData);
        //         // if (hasUserRating) {
        //             // console.log("I have a 0 rating docs yet I'm still getting overall rating")
        //             // this gets set for all of the clubs -? for this component
        //             setTestBoolean(hasUserRating);
        //             // sethasClubRating(true);90
        //             // hasClubRating.current = true;
        //             // dispatch({
        //             //     type: "SET_HAS_USER_RATING",
        //             //     payload: { hasOneUserRtg: true },
        //             // });
        //             // console.log("WE have a club rating elephant: " + hasUserRating);
        //             // const ovrRating = getRGBColors(clubRating);
        //             // setOverallRating(ovrRating);
        //             // write the create club rounded rating in here!
        //         // };
        //     })
        //     .catch((error) => {
        //         console.log("Error occurred: ", error);
        //     });
    // }
        // run again if the clubRating from state is updated? Does this work?

    // useEffect(() => {
    //     console.log("second");

    //     console.log("Do we have a club rating: " + hasClubRating);

    //     if (hasClubRating.current) {
    //         const MAX_RTG = 5;
    //         const MIN_RTG = 1;
    //         const DIFF_RTG = MAX_RTG - MIN_RTG;
    //         console.log("OvrRating: Club Rating breakdown: " + JSON.stringify(clubRating));

    //         const clubClout = roundHundreth(3);
    //         const clubVibes = roundHundreth(2.78);
    //         const clubIntensity = roundHundreth(3.24);
    //         const clubInclusivity = roundHundreth(1.8);

    //         clubRoundedRtg.current = `${roundHundreth((clubClout + clubVibes + clubIntensity + clubInclusivity) / 4)}`;

    //         console.log("club rounded rating: " + clubRoundedRtg);
    //         console.log("type of value for club rounded rating: " + typeof(clubRoundedRtg));

    //         const red = Math.round(255 * (MAX_RTG - clubRoundedRtg)) / DIFF_RTG;
    //         console.log("Red color generated: " + red);
    //         const green = Math.round(255 * (clubRoundedRtg - MIN_RTG)) / DIFF_RTG;
    //         const blue = 0;

    //         clubRtgColor.current = {red: red, green: green, blue: blue};
    //     }

    // }, [clubRating]);

    // // make an axios request using clubData.name to get the overall rating
    // // Reduce one API call by Final version
    // // if (clubData.name !== undefined) {
    // //     api
    // //         .get(checkUserRtgUrl, {
    // //             params: {clubName: clubData.name}
    // //         })
    // //         .then((response) => {
    // //             const hasUserRating= response.data.hasUserRating;
    // //             console.log("Club has a user rating (1 or 0): " + JSON.stringify(hasUserRating));
    // //             // setOvrRating(ovrRatingData);
    // //             if (hasUserRating) {
    // //                 sethasClubRating(true);
    // //                 dispatch({
    // //                     type: "SET_HAS_USER_RATING",
    // //                     payload: { hasOneUserRtg: hasClubRating },
    // //                 });
    // //                 console.log("WE have a club rating: " + hasClubRating);
    // //                 // write the create club rounded rating in here!
    // //             };
    // //         })
    // //         .catch((error) => {
    // //             console.log("Error occurred: ", error);
    // //         });
    // // }

    // // colors for lightblue background using rgb function
    // let red = 173;
    // let green = 216;
    // let blue = 230;
    // // allow us to tell whether if it entered if/else blocks or not
    // let clubRoundedRtg = "NEW";
        
    // const MAX_RTG = 5;
    // // MIN rating 1 or 0? -> EDGE CASE
    // const MIN_RTG = 1;
    // const DIFF_RTG = 4;
    // // no need to use redux here -> because calling the endpoint in this function
    // console.log("Do we have a club rating? " + hasClubRating);
    //     if (hasClubRating) {
    //         console.log("Club Rating breakdown: " + JSON.stringify(clubRating));
    
    //         // individual factor breakdown rounded to nearest hundreth
    //         // while the following method propogates error -> users will be able to do
    //         // the math and verify its correct on the frontend -> they won't see the discrepancies
    //         const clubClout = roundHundreth(clubRating.Clout);
    //         const clubVibes = roundHundreth(clubRating.Vibes);
    //         const clubIntensity = roundHundreth(clubRating.Intensity);
    //         const clubInclusivity = roundHundreth(clubRating.Inclusivity);
            
    //         // 4 = the number of factors in the rating
    //         clubRoundedRtg = roundHundreth((clubClout + clubVibes + clubIntensity + clubInclusivity) / 4);
    //         console.log("club rounded rating: " + clubRoundedRtg);
    //         console.log("type of value for club rounded rating: " + typeof(clubRoundedRtg));
    //         // setclubRoundRtg("clubRoundRtg");
    //         // clubRoundedRtg = clubRoundedRtg;
    
    //         red = Math.round(255 * (MAX_RTG - clubRoundedRtg)) / DIFF_RTG;
    //         green = Math.round(255 * (clubRoundedRtg - MIN_RTG)) / DIFF_RTG;
    //         blue = 0;
    //     }
    // // else {

    // //     // setclubRoundRtg("NEW");
    // // }
    // console.log("Club rounded rating after conditions: " + clubRoundedRtg);
    // console.log("new red: " + red);

    // getRGBColors(clubRating);

    // do we capitalize?
    return (
        <OvrRtgBubble redColor={overallRating.red} greenColor={overallRating.green} blueColor={overallRating.blue}>
            <div>{`${overallRating.clubRoundedRtg}`}</div>
        </OvrRtgBubble>
    );
}
