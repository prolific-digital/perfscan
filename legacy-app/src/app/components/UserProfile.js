import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import SectionHeader from "./SectionHeader";
import DefaultUserPic from "../../assets/team-male.jpg";
import { Button, Col, Form, Row, Container } from "reactstrap";
import {
  getSecurityQuestion,
  updateUserProfile,
} from "../../services/apiService";
import { useSelector, useDispatch } from "react-redux";
import { getParametersFromLocalStorage } from "../../../src/helpers/commonHelper";
import {
  fetchUserProfileById,
  getUserProfile,
} from "../../../src/store/slices/UserProfile/UserProfile";
import _ from "lodash";
import { deleteTemporaryReport } from "../../store/slices/reports/SaveNewReport/SaveNewReport";


function UserProfile() {
  const userId = getParametersFromLocalStorage("userID");
  const [state, setState] = useState({
    username: "John Doe",
    firstName: "",
    lastName: "",
    email: "pickaxe@greymine.com",
    profileImage: "",
    msg: "",
    uploadedFile: null,
    userId: userId,
    questionId: "",
    answer: "",
  });
  const uniqueId = getParametersFromLocalStorage("uniqueid");
  const [securityQuestion, setSecurityQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const profileData = useSelector(getUserProfile);

  const changeProfileImage = (event) => {
    setState({...state ,uploadedFile: event.target.files[0] });
  };

  useEffect(() => {
    (async () => {
      let questions = await getSecurityQuestion();
      setSecurityQuestion(questions);
    })();
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfileById(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    if (profileData) {
      if (!_.isEmpty(profileData.data)) {
        const gotData = profileData.data.data[0];
        setState({
          username: gotData.name,
          firstName:gotData.firstname,
          lastName:gotData.lastname,
          email: gotData.email,
          profileImage: gotData.userprofile,
          msg: "",
          uploadedFile: null,
          userId: gotData.id,
          questionId: gotData.questionId,
          answer: gotData.answer,
        });
      }
    }
  }, [profileData]);

  const updateProfileData = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const newQuesAns = { [name]: value };
    if (name === "questionId") {
      const question =
        profileData?.data?.data?.find((ele)=>( ele.questionId === +value))
          ? profileData?.data?.data[0]
          : {};
      newQuesAns.answer = question.answer || "";
    }
    setState({ ...state, ...newQuesAns });
  };

  const updateProfileHandler = async () => {
    if (!state.questionId) {
      showToast("error", "Please select the security question");
      return;
    }
    if (!state.answer) {
      showToast("error", "Please write the security answer");
      return;
    }
    try {
      setLoading(true);
      const updateData = {
        questionId: state.questionId,
        userId: state.userId,
        answer: state.answer,
        firstname:state.firstName,
        lastname:state.lastName,
      };
      const response = await updateUserProfile(updateData);
      if (response.status === 200) {
        showToast("success", "Profile updated successfully");
        dispatch(fetchUserProfileById(userId));
        let questions = await getSecurityQuestion();
      setSecurityQuestion(questions);
      }
    } catch (error) {
      showToast("error", "Something went wrong!! please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "",
      life: 3000,
    });
  };

  // useEffect(()=>{
  //   if(uniqueId?.data?.uniqueid){
  //     dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
  //    }
  // },[]) 

  return (
    <>
      <SectionHeader title={"User Profile Details"} subTitle="Profile" />
      {/* <Container> */}
        <Row>
          <Col>
            <img src={DefaultUserPic} alt="profile pic" />
          </Col>
          <Col>
            <h1>User Profile</h1>
            <Form className="form">
              <p>{state.msg}</p>

              <div className="form-group">
                <label className="label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter your username"
                  value={state.username}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="label">First name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={state.firstName}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="label">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter your last name"
                  value={state.lastName}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={state.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="label">Security Question</label>
                <select
                  className="form-control"
                  name="questionId"
                  value={state.questionId}
                  onChange={(e) => updateProfileData(e)}
                >
                  <option value="">Please select question</option>
                  {securityQuestion?.data?.data.map((val) => (
                    <option value={val.id}>{val.question}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="label">Security Answer</label>
                <input
                  type="text"
                  name="answer"
                  className="form-control"
                  placeholder="Enter your answer"
                  value={state.answer}
                  onChange={(e) => updateProfileData(e)}
                />
              </div>

              <div className="form-group">
                <label className="label">Profile Image</label>
                <input
                  className="form-control"
                  type="file"
                  name="profileImage"
                  onChange={changeProfileImage}
                />
              </div>
              <Button
                className="btn btn-primary mt-3"
                onClick={updateProfileHandler}
              >
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
        <Toast ref={toast} position="top-right"></Toast>
      {/* </Container> */}
    </>
  );
}

export default UserProfile;
