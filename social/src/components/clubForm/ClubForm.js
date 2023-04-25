import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClubForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      clubName: "",
      clubInfo: "",
      clubEmail: "",
      clubPosition: "",
      clubCert: "",
      clubAddInfo: "",
    },
    onSubmit: async (values) => {
      const shouldSubmit = window.confirm(
        "Are you sure you want to submit your club application?"
      );

      if (shouldSubmit) {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const { netid, user } = localStorage;

        try {
          await axios.post(`${serverUrl}/clubrequest/submit`, {
            ...values,
            applicantNetid: netid,
            applicantName: user,
          });

          alert("Form submitted successfully");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    },
    validate: (values) => {
      const errors = {};

      if (!values.clubName) {
        errors.clubName = "Required";
      }

      if (!values.clubInfo) {
        errors.clubInfo = "Required";
      }

      if (!values.clubEmail) {
        errors.clubEmail = "Required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.clubEmail)) {
        errors.clubEmail = "Invalid email address";
      }

      if (!values.clubPosition) {
        errors.clubPosition = "Required";
      }
      return errors;
    },
  });

  const handleCloseClick = () => {
    const shouldClose = window.confirm(
      "Are you sure you want to leave without saving? Changes will not be saved!"
    );

    if (shouldClose) {
      navigate("/");
    }
  };
  return (
    <div className="club-form">
      <span className="form-close" onClick={handleCloseClick}>
        &times;
      </span>
      <form onSubmit={formik.handleSubmit}>
        <center>
          <h3>
            Submit An Application to Run Your Own Club Page on
            ClubPrinceton!
          </h3>
          <p>
            Note: To have your club application be approved, you must be
            an office of your club.
          </p>
        </center>
        <br></br>
        <br></br>
        <center>
          <h5>Name of Your Club:</h5>
          <input
            name="clubName"
            type="text"
            size="30"
            maxLength="50"
            value={formik.values.clubName}
            onChange={formik.handleChange}
          />
          {formik.touched.clubName && formik.errors.clubName ? (
            <div className="form-error">{formik.errors.clubName}</div>
          ) : null}
          <br></br>
          <br></br>
          <h5>Club Description:</h5>
          <input
            name="clubInfo"
            type="text"
            size="100"
            maxLength="150"
            value={formik.values.clubInfo}
            onChange={formik.handleChange}
          />
          {formik.touched.clubInfo && formik.errors.clubInfo ? (
            <div className="form-error">{formik.errors.clubInfo}</div>
          ) : null}
          <br></br>
          <br></br>
          <h5>Your Club's Princeton Email Address:</h5>
          <input
            name="clubEmail"
            type="email"
            size="30"
            maxLength="40"
            pattern="[a-z0-9._%+-]+@princeton.edu$"
            value={formik.values.clubEmail}
            onChange={formik.handleChange}
          />
          {formik.touched.clubEmail && formik.errors.clubEmail ? (
            <div className="form-error">{formik.errors.clubEmail}</div>
          ) : null}
          <br></br>
          <br></br>
          <h5>Position Within the Club:</h5>
          <input
            name="clubPosition"
            type="text"
            size="30"
            maxLength="40"
            value={formik.values.clubPosition}
            onChange={formik.handleChange}
          />
          {formik.touched.clubPosition && formik.errors.clubPosition ? (
            <div className="form-error">
              {formik.errors.clubPosition}
            </div>
          ) : null}
          <br></br>
          <br></br>
          <h5>
            Link to ODUS (Office of the Dean of Undergraduate Students)
            Recognition of Your Club:
          </h5>
          <div>
            Note: This is optional; however, it will speed up your
            application approval.
            <br></br>
            The link can be a website that has your club listed as being
            ODUS-recognized.
          </div>
          <br></br>
          <input
            name="clubCert"
            type="text"
            size="100"
            maxLength="100"
            value={formik.values.clubCert}
            onChange={formik.handleChange}
          />
          <br></br>
          <br></br>
          <h5>Additional Info:</h5>
          <div>Note: This is optional</div>
          <input
            name="clubAddInfo"
            type="text"
            size="100"
            maxLength="300"
            value={formik.values.clubAddInfo}
            onChange={formik.handleChange}
          />
          <br></br>
          <br></br>
          <button className="popup-btn" type="submit">
            <strong>Click Here to Submit!</strong>
          </button>
        </center>
      </form>
    </div>
  );
};

export default ClubForm;
