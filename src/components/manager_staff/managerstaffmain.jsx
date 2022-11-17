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
import { storage } from "../../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Logout } from "@mui/icons-material";

const Managerstaffmain = () => {
  const accessToken = useSelector((state) => state.accessToken.value);
  const { auth, setAuth } = useAuth();
  const [enteredMessage, setEnteredMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const from = "/";
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setOpenAlert(false);
    setOpenSuccessAlert(false);
    if (localStorage.getItem("isManagerLoggedIn") !== "true") {
      navigate(from, { replace: true });
    }
  }, []);

  const selectFileChangeHandler = (data) => {
    setSelectedFile(data.target.files[0]);
  };

  const onChangeMessageHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const onSubmit = () => {
    if (!enteredMessage) {
      setOpenAlert(true);
      setAlertMessage("Cannot send empty messages");
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
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

  const onLogout = () => {
    localStorage.removeItem("isManagerLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("isWorkerLoggedIn");
    navigate(from, { replace: true });
  };

  const uploadFile = () => {
    if (selectedFile === null) {
      setOpenAlert(true);
      setAlertMessage("Please choose a file");
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
      const fileRef = ref(storage, `files/${selectedFile.name + v4()}`);
      uploadBytes(fileRef, selectedFile).then(() => {
        setOpenSuccessAlert(true);
        setAlertMessage("Uploaded file Successfully!");
        setTimeout(() => {
          setOpenSuccessAlert(false);
          localStorage.removeItem("isManagerLoggedIn");
          localStorage.removeItem("isAdminLoggedIn");
          localStorage.removeItem("isWorkerLoggedIn");
          navigate(from, { replace: true });
        }, 2000);
      });
    }
  };

  return (
    <div id="managermain">
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
            <br />
            <br />
            <input
              accept="application/pdf"
              type="file"
              onChange={selectFileChangeHandler}
            />
            <br />
            <br />
            <Button onClick={uploadFile} variant="contained" component="label">
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

export default Managerstaffmain;
