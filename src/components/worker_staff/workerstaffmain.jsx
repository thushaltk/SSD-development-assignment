import React, { useState } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";

import "./workerstaffmain.css";
import { useEffect } from "react";
import workerService from "../../services/worker-service";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

import "./workerstaffmain.css";
import { Logout } from "@mui/icons-material";

const Workerstaffmain = () => {
  const accessToken = useSelector((state) => state.accessToken.value);
  const { auth, setAuth } = useAuth();
  const [enteredMessage, setEnteredMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const from = "/";
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/126/126477.png"
  );

  useEffect(() => {
    setOpenAlert(false);
    setOpenSuccessAlert(false);
    if (localStorage.getItem("isWorkerLoggedIn") !== "true") {
      navigate(from, { replace: true });
    }
  }, []);

  const onChangeMessageHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const onLogout = () => {
    localStorage.removeItem("isManagerLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("isWorkerLoggedIn");
    navigate(from, { replace: true });
  };

  const onSubmit = () => {
    if (!enteredMessage) {
      setOpenAlert(true);
      setAlertMessage("Cannot send empty messages");
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
      workerService
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
          } else {
            setOpenSuccessAlert(true);
            setAlertMessage("Message Saved Successfully!");
            setTimeout(() => {
              setOpenSuccessAlert(false);
            }, 2000);
          }
        });
    }
  };

  return (
    <div id="workermain">
      <Button
        variant="text"
        color="primary"
        endIcon={<Logout />}
        onClick={onLogout}
      >
        Logout
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Save messages</h1>
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
            id="workermsgs"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
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
      <div>
        {openSuccessAlert ? (
          <Alert variant="filled" severity="success">
            {alertMessage}
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Workerstaffmain;
