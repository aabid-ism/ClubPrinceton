import React, { useEffect, useState } from "react";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./Modal";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import "./admin.css";

const Rightbar = ({ state }) => {
  // set initial state
  const [officers, setOfficers] = useState([]);
  const [isOfficersModal, setOfficersModal] = useState(false);

  const [officerFormValues, setOfficerFormValues] = useState({
    netid: "",
    title: "",
  });

  const [announcement, setAnnouncement] = useState("");
  const [isAnnouncementModal, setAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  const [description, setDescription] = useState("");
  const [isDescriptionModal, setDescriptionModal] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const handleAnnouncementChange = (event) => {
    const announcementFromForm = event.target.value;
    setNewAnnouncement(announcementFromForm);
  };

  const handleDescriptionChange = (event) => {
    const descriptionFromForm = event.target.value;
    setNewDescription(descriptionFromForm);
  };

  const handleOfficerInputChange = (event) => {
    const { name, value } = event.target;
    setOfficerFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemoveOfficer = (index) => {
    // get a reference to the officer from Officers
    const removingOfficer = officers[index];
    console.log(removingOfficer);

    // create a new array with the updated officers
    const updatedOfficers = officers.filter(
      (officer, i) => i !== index
    );
    console.log(updatedOfficers);

    // update the state with the new array
    setOfficers(updatedOfficers);

    // remove officer from the database
    api
      .post(
        `clubs/club/officers/update/${state.activeClub}`,
        updatedOfficers
      )
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

    // Check for duplicate officers in the new officer
    const officerNetidValues = newOfficersList.map(obj => obj["netid"]);
    const hasDuplicate = new Set(officerNetidValues).size !== officerNetidValues.length;
    if (hasDuplicate) {
      alert("There is already a officer title given to this netid."
        + "Please delete that position before assigning a new title.")
      return;
    }
    // if netid is not in users database, send alert and return
    api
      .get(`users/verify/${officerFormValues.netid}`)
      .then((res) => {
        // push to the database
        api
          .post(
            `clubs/club/officers/update/${state.activeClub}`,
            newOfficersList
          )
          .then(() => {
            setOfficerFormValues({
              netid: "",
              title: "",
            });
            alert("New officer successfully added.");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err.response.status == 400) {
          alert("please insert a netid registered in ClubPrinceton.");
        }
      });

    // alert submitted & clear inputs
  }

  function onSubmitAnnouncementForm(e) {
    e.preventDefault();
    const announcementToSubmit = {
      announcement: newAnnouncement,
    };
    console.log(announcementToSubmit);
    api
      .post(
        `announcement/change/${state.activeClub}`,
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
      });
  }

  function onSubmitDescriptionForm(e) {
    e.preventDefault();
    const descriptionToSubmit = {
      description: newDescription,
    };

    api
      .post(`clubs/club/description/update/${state.activeClub}`, descriptionToSubmit)
      .then((res) => {
        alert("description submitted!");
        setDescription(newDescription);
        setNewDescription("");
      })
      .catch((err) => {
        alert(err);
      });
  }


  useEffect(() => {
    console.log(state.activeClub);

    // Get club info object from axios
    if (state.activeClub != "") {
      api
        .get(`clubs/club/officers/${state.activeClub}`)
        .then(async (res) => {
          // Extract the officers
          setOfficers(res.data.officers);
          console.log(res.data.officers);
        })
        .catch((err) => {
          if (err.response.data == "TokenExpiredError") {
            navigate("/signup");
          }
          console.log(err.response.data);
          // console.log("hi");
        });

      // get announcement
      api
        .get("announcement/get", {
          params: {
            clubName: state.activeClub,
          },
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
        });
      api
        .get(`clubs/club/description/${state.activeClub}`)
        .then(async (res) => {
          // extract the description
          setDescription(res.data.description);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
    // Put the officer info to the Officers Object
  }, [state.activeClub]);
  // looks like Modal is already responsive -> not going to touch that
  return (
    <>
      {/* for editing the club description modal */}
      {isDescriptionModal && (
        <ModalComponent
          isModal={isDescriptionModal}
          setModal={setDescriptionModal}
          title={<h3> Edit Club Description</h3>}
          children={
            <div className="mb-5 align-items-center justify-content-center">
              <form
                className="mb-2"
                style={{ textAlign: "left" }}
                onSubmit={onSubmitDescriptionForm}
              >
                <div className="mb-3">
                  <textarea
                    type="text"
                    className="form-control"
                    name="title"
                    value={newDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Insert New Description..."
                    aria-describedby="text"
                  />
                </div>
                <button
                  type="submit"
                  // disabled={(Object.keys(officerFormValues).length === 0) ? true : false}
                  // change to orange button if you can
                  className="btn btn-success float-end"
                // disabled={state.activeClub ? false : true}
                >
                  Submit
                </button>
              </form>
            </div>
          }
        />
      )}

      {/* this is for editing the officers modal */}
      {isOfficersModal && (
        <ModalComponent
          isModal={isOfficersModal}
          setModal={setOfficersModal}
          title={<h3> Add an Officer</h3>}
          children={
            <div className="mb-5 align-items-center justify-content-center">
              <form
                className="mb-2"
                style={{ textAlign: "left" }}
                onSubmit={onSubmitOfficerForm}
              >
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
                  disabled={
                    Object.keys(officerFormValues).length === 0
                      ? true
                      : false
                  }
                  className="btn btn-success float-end"
                // disabled={state.activeClub ? false : true}
                >
                  Submit
                </button>
              </form>
            </div>
          }
        />
      )}
      {/* this is for editing the announcment modal */}
      {isAnnouncementModal && (
        <ModalComponent
          isModal={isAnnouncementModal}
          setModal={setAnnouncementModal}
          title={<h3> Set a New Announcement</h3>}
          children={
            <div className="mb-5 align-items-center justify-content-center">
              <form
                className="mb-2"
                style={{ textAlign: "left" }}
                onSubmit={onSubmitAnnouncementForm}
              >
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
        />
      )}
{/*----------------------------------------------------------------------------------------------- */}
      {/* Here is the beginning of the right bar */}
      {/* rightbar is removed -> netids in admin section no longer stacked */}
      {/* announcement section announcement announcement title announcement title announcement edit */}
      <div>
        <Row className="right-sidebar-info">
          {officers.length !== 0 && (
            <div>
              <div>
                <h3> Club Description </h3>
              </div>
              <div>
                <p class="fw-bold fs-6">{description}</p>
                {/* <p>The sun was shining on the sea, shining with all its might: it did its very best to make the billows smooth and bright. And this was odd, because it was the middle of the night. The moon was shining sulkily, because she thought the sun had got no business to be there after the day was done.</p> */}
              </div>
              <div>
                {
                  <Button className="orange-button"
                    onClick={() => {
                      setDescriptionModal(true);
                    }}
                  >
                    Edit Description
                  </Button>
                }
              </div>
              <br></br>
            </div>
          )}
        </Row>
        {/* announcements section */}
        <Row className="right-sidebar-announce">
          {officers.length !== 0 && (
            <div>
              <div>
                <h3> Club Announcement </h3>
              </div>
              <div>
                <p class="fw-bold fs-6">{announcement}</p>
                {/* <p>The sun was shining on the sea, shining with all its might: it did its very best to make the billows smooth and bright. And this was odd, because it was the middle of the night. The moon was shining sulkily, because she thought the sun had got no business to be there after the day was done.</p> */}
              </div>
              <div>
                {
                  <Button className="orange-button"
                    onClick={() => {
                      setAnnouncementModal(true);
                    }}
                  >
                    Edit Announcement
                  </Button>
                }
              </div>
              <br></br>
            </div>
          )}
        </Row>
        {/* Officers Section */}
        <Row className="right-sidebar-admin">
            {officers.length !== 0 && (
              <div>
                <h3> Club Admin </h3>
              </div>
            )}
            {/* removing listrow */}
            {/* we have a key props thing going on */}
            <div className="admin-members-collection">
                {officers &&
                officers.map((officer, index) => (
                  <div key={index} class="mb-3">
                    <div> {officer.netid}</div>
                    <div> {officer.title}</div>
                    {officers.length > 1 &&
                    <button className="orange-oval-text"onClick={() => handleRemoveOfficer(index)}>
                      <strong>Remove</strong>
                    </button>
                    }
                  </div>
                ))}
            </div>
            <div>
                {state.activeClub && (
                  <Button className="orange-button" onClick={() => {setOfficersModal(true);}}>
                    Add Officer
                  </Button>
                )}
            </div>
        </Row>
      </div>
    </>
  );
};

export default Rightbar;
