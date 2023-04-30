import React, { useEffect, useState } from 'react';
import api from '../auth/api';
import { useNavigate } from 'react-router-dom';
import ModalComponent from './Modal';


const Rightbar = ({ state }) => {

    const [officers, setOfficers] = useState([]);
    const [isOfficersModal, setOfficersModal] = useState(false);

    const [officerFormValues, setOfficerFormValues] = useState({
        netid: '',
        title: '',
    });

    const [announcement, setAnnouncement] = useState("");
    const [isAnnouncementModal, setAnnouncementModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const handleAnnouncementChange = (event) => {
        const announcementFromForm = event.target.value;
        setNewAnnouncement(announcementFromForm);
    }
    const handleOfficerInputChange = (event) => {
        const { name, value } = event.target;
        setOfficerFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleRemoveOfficer = (index) => {
        // get a reference to the officer from Officers
        const removingOfficer = officers[index];
        console.log(removingOfficer);

        // create a new array with the updated officers
        const updatedOfficers = officers.filter((officer, i) => i !== index);
        console.log(updatedOfficers);

        // update the state with the new array
        setOfficers(updatedOfficers);

        // remove officer from the database
        api.post(`clubs/club/officers/update/${state.activeClub}`, updatedOfficers)
            .then(() => {
                alert("Successfully Removed Officer!");
            })
            .catch((err) => console.log(err));
    };

    const navigate = useNavigate();

    function onSubmitOfficerForm(e) {

        // prevent refresh
        e.preventDefault();
        // Take the inputs from form
        const newOfficersList = [...officers, officerFormValues];
        // console.log(newOfficersList);

        // if netid is not in users database, send alert and return
        api.get(`users/verify/${officerFormValues.netid}`).then((res) => {
            // push to the database
            api.post(`clubs/club/officers/update/${state.activeClub}`, newOfficersList
            )
                .then(() => {
                    setOfficerFormValues({
                        netid: '',
                        title: '',
                    });
                    alert("New officer successfully added.")
                })
                .catch((err) => console.log(err));
        }).catch((err) => {
            if (err.response.status == 401) {
                alert("please insert a netid registered in ClubPrinceton.")
            }
        })

        // alert submitted & clear inputs
    }

    function onSubmitAnnouncementForm(e) {
        e.preventDefault();
        const announcementToSubmit = {
            announcement: newAnnouncement
        }
        console.log(announcementToSubmit);
        api.post(`announcement/change/${state.activeClub}`,
            announcementToSubmit
        )
            // push to the database
            .then((res) => {
                alert("announcement submitted!");
                setAnnouncement(newAnnouncement);
                setNewAnnouncement("");
            })
            .catch((err) => {
                alert(err);
            })

    }

    useEffect(() => {
        console.log(state.activeClub);

        // Get club info object from axios
        if (state.activeClub != "") {
            api.get(`clubs/club/officers/${state.activeClub}`)
                .then(async (res) => {
                    // Extract the officers
                    setOfficers(res.data.officers);
                    console.log(res.data.officers);
                })
                .catch((err) => {
                    if (err.response.data == 'TokenExpiredError') {
                        navigate('/signup');
                    }
                    console.log(err.response.data);
                    // console.log("hi");
                })

            // get announcement
            api
                .get("announcement/get", {
                    params: {
                        clubName: state.activeClub
                    }
                })
                .then(async (res) => {
                    // Extract the officers
                    setAnnouncement(res.data);
                })
                .catch((err) => {
                    // if (err.response.data == 'TokenExpiredError') {
                    //     navigate('/signup');
                    // }
                    console.log(err.response.data);
                    // console.log("hi");
                })

        }
        // Put the officer info to the Officers Object
    }, [state.activeClub])
    return (
        <>
            {isOfficersModal && <ModalComponent
                isModal={isOfficersModal}
                setModal={setOfficersModal}
                title={<h3> Add an Officer</h3>}
                children={
                    <div className="mb-5 align-items-center justify-content-center">
                        <form className="mb-2" style={{ textAlign: "left" }} onSubmit={onSubmitOfficerForm}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={officerFormValues.title}
                                    onChange={handleOfficerInputChange}
                                    placeholder="Insert Officer Title..."
                                    aria-describedby="text"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="netid"
                                    value={officerFormValues.netid}
                                    onChange={handleOfficerInputChange}
                                    placeholder="Insert Officer netid..."
                                    aria-describedby="text"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={(Object.keys(officerFormValues).length === 0) ? true : false}
                                className="btn btn-success float-end"
                            // disabled={state.activeClub ? false : true}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                }
            />}
            {isAnnouncementModal && <ModalComponent
                isModal={isAnnouncementModal}
                setModal={setAnnouncementModal}
                title={<h3> Set a New Announcement</h3>}
                children={
                    <div className="mb-5 align-items-center justify-content-center">
                        <form className="mb-2" style={{ textAlign: "left" }} onSubmit={onSubmitAnnouncementForm}>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={newAnnouncement}
                                    onChange={handleAnnouncementChange}
                                    placeholder="Insert New Announcement..."
                                    aria-describedby="text"
                                />
                            </div>
                            <button
                                type="submit"
                                // disabled={(Object.keys(officerFormValues).length === 0) ? true : false}
                                className="btn btn-success float-end"
                            // disabled={state.activeClub ? false : true}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                }
            />}
            <div className='rightbar'>

                <div className='announcement'>
                    {officers.length != 0 &&
                        <div>
                            <div className="announcement-title">
                                <h3> Club Announcement </h3>
                            </div>
                            <div className="announcement-text">
                                <p>{announcement}</p>
                            </div>
                            <div className="announcement-edit">
                                {<button onClick={() => { setAnnouncementModal(true) }}> Change Announcement</button>}
                            </div>
                        </div>
                    }
                    {/* Officers List */}
                    {officers &&

                        officers.map((officer, index) => (
                            < div key={index} className='listrow' >
                                <p> {officer.title}</p>
                                <p> {officer.netid}</p>
                                <button onClick={() => handleRemoveOfficer(index)}>Remove</button>
                            </div>
                        ))


                    }

                    {/* Add Button */}
                    {state.activeClub && <button onClick={() => { setOfficersModal(true) }}> ADD OFFICER</button>}
                </div >
            </div >
        </>
    )
}

export default Rightbar