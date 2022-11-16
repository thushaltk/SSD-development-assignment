import React, { useState } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";

import "./managerstaffmain.css";
import { useEffect } from "react";
import managerService from "../../services/manager-service";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Managerstaffmain = () => {
  const accessToken = useSelector((state) => state.accessToken.value);
  const { auth, setAuth } = useAuth();
  const [enteredMessage, setEnteredMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const from = "/";
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/126/126477.png"
  );

  useEffect(() => {
    setOpenAlert(false);
    if (localStorage.getItem("isManagerLoggedIn") !== "true") {
      navigate(from, { replace: true });
    }
  }, []);

  const selectImageChangeHandler = (data) => {
    setSelectedImage(data.target.files[0]);
  };

  const onChangeMessageHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const onSubmit = () => {
    managerService
      .saveMsgs(accessToken, { username: auth.user, message: enteredMessage })
      .then((res) => {
        console.log(res);
        if (res.data.message == "Failed to authenticate token") {
          setOpenAlert(true);
          setAlertMessage("Session expired. Login again");
          setTimeout(() => {
            localStorage.removeItem("isManagerLoggedIn");
            localStorage.removeItem("isAdminLoggedIn");
            localStorage.removeItem("isWorkerLoggedIn");
            navigate(from, { replace: true });
          }, 1000);
        }
      });
  };

  return (
    <div id="managermain">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Save messages or Upload files</h1>
        <br />
        <br />
        <br />
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            id="managermsgs"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: "100px",
            }}
          >
            <TextareaAutosize
              onChange={onChangeMessageHandler}
              aria-label="enter message"
              maxRows={10}
              minRows={10}
              placeholder="Enter message to save"
              style={{ width: "400px" }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={onSubmit}
            >
              SEND
            </Button>
          </div>
          <div
            id="managerfiles"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={
                typeof selectedImage == "object"
                  ? URL.createObjectURL(selectedImage)
                  : selectedImage
              }
              style={{ width: "100px", height: "100px" }}
            />
            <br />
            <br />
            <input
              accept="image/*"
              type="file"
              onChange={selectImageChangeHandler}
            />
            <br />
            <br />
            <Button variant="contained" component="label">
              Upload image
            </Button>
          </div>
        </div>
      </div>
      <div>
        {openAlert ? (
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Managerstaffmain;
