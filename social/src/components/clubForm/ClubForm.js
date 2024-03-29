import React from "react";
import { useFormik } from "formik";
import "./clubform.css";
import api from "../auth/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row } from "react-bootstrap";

/* Form for submitting a club application
    @param - none
    @return - form for submitting a club application
*/
const ClubForm = () => {
  const navigate = useNavigate();
  // prevents users from accessing club application page without proper google authentication
  useEffect(() => {
    api.get("/auth/verify");
  }, [localStorage.getItem("ACCESS_TOKEN")]);

  // formik is a library that helps with form validation
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
      const { netid, user } = localStorage;

      const shouldSubmit = window.confirm(
        "Are you sure you want to submit your club application?"
      );

      if (shouldSubmit) {
        if (!netid) {
          alert(
            "Unauthorized. Please login to continue with submission"
          );
          return;
        }

        try {
          const serverUrl = process.env.REACT_APP_SERVER_URL;
          await api.post(`${serverUrl}/clubrequest/submit`, {
            ...values,
            applicantNetid: netid,
            applicantName: user,
          });

          alert("Form submitted successfully");
          navigate("/");
        } catch (error) {
          if (error.response) {
            alert(error.response.data.message);
          }
          else {
            alert(error);
          }
        }
      }
    },
    validate: async (values) => {
      const errors = {};

      if (!values.clubName) {
        errors.clubName = "Required";
      }

      if (values.clubName !== values.clubName.trim()) {
        errors.clubName =
          "Remove leading and/or trailing whitespace in club name";
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
  /* Button for closing the form
      @param - none
      @return - button for closing the form
  */
  const handleCloseClick = () => {
    const shouldClose = window.confirm(
      "Are you sure you want to leave without saving? Changes will not be saved!"
    );

    if (shouldClose) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        flexDirection: "column",  

      }}
    >
      <div className="club-form justify-content-center flex-column d-flex align-items-center">
        <span
          className="form-close"
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={handleCloseClick}
        >
          &times;
        </span>
        <Form onSubmit={formik.handleSubmit}>
          <Container className="" style={{ minHeight: "100vh" }}>
            <h3 className="form-title">
              Submit An Application to Run Your Own Club Page on
              ClubPrinceton!
            </h3>
            <p className="form-notes">
              To have your club application be approved, you must be an
              officer of your club. On approval of your club, you will
              be able to edit your club page via the admin link on
              ClubPrinceton's homepage.
            </p>

            <Form.Group controlId="clubName">
              <Form.Label>Name of Your Club:</Form.Label>
              <Form.Control
                type="text"
                size="30"
                maxLength="50"
                value={formik.values.clubName}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.clubName && !!formik.errors.clubName
                }
              />
              {formik.touched.clubName && formik.errors.clubName ? (
                <div className="form-error">
                  {formik.errors.clubName}
                </div>
              ) : null}
              <Form.Text className="form-input-notes">
                <strong>
                  Note: After submission of this application, your club
                  name can only be changed by contacting a system
                  administrator.
                </strong>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="clubInfo">
              <Form.Label>Club Description:</Form.Label>
              <Form.Control
                type="text"
                size="100"
                maxLength="150"
                value={formik.values.clubInfo}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.clubInfo && !!formik.errors.clubInfo
                }
              />
              {formik.touched.clubInfo && formik.errors.clubInfo ? (
                <div className="form-error">
                  {formik.errors.clubInfo}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group controlId="clubEmail">
              <Form.Label>
                Your Club's Princeton Email Address:
              </Form.Label>
              <Form.Control
                type="email"
                size="30"
                maxLength="40"
                pattern="[a-zA-Z0-9._%+-]+@princeton.edu$"
                value={formik.values.clubEmail}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.clubEmail && !!formik.errors.clubEmail
                }
              />
              {formik.touched.clubEmail && formik.errors.clubEmail ? (
                <div className="form-error">
                  {formik.errors.clubEmail}
                </div>
              ) : null}
              <Form.Text className="form-input-notes">
                Note: If you do not have a club email address, please
                provide your student email address.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="clubPosition">
              <Form.Label>Position Within the Club:</Form.Label>
              <Form.Control
                type="text"
                size="30"
                maxLength="40"
                value={formik.values.clubPosition}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.clubPosition &&
                  !!formik.errors.clubPosition
                }
              />
              {formik.touched.clubPosition &&
              formik.errors.clubPosition ? (
                <div className="form-error">
                  {formik.errors.clubPosition}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group controlId="clubCert">
              <Form.Label>
                Link to ODUS Recognition of Your Club:
              </Form.Label>
              <Form.Control
                type="text"
                size="100"
                maxLength="100"
                value={formik.values.clubCert}
                onChange={formik.handleChange}
              />
              <Form.Text className="form-input-notes">
                Note: This is optional; however, it will speed up your
                application approval. The link can be a website that has
                your club listed as being ODUS-recognized.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="clubAddInfo">
              <Form.Label>Additional Info:</Form.Label>
              <Form.Control
                type="text"
                size="100"
                maxLength="300"
                value={formik.values.clubAddInfo}
                onChange={formik.handleChange}
              />
              <Form.Text className="form-input-notes">
                Note: This is optional
              </Form.Text>
            </Form.Group>

            <Row className="justify-content-center">
              <Button
                className="popup-btn form-btn submit"
                type="submit"
              >
                <strong>Click Here to Submit!</strong>
              </Button>
            </Row>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default ClubForm;
