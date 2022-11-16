import React, { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import Lottie from "react-lottie";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as animationData from "../../assets/images/manager.json";
import managerService from "../../services/manager-service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Manageradd = (props) => {
  const [open, setOpen] = useState(props.open);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accessToken.value);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfPassword, setEnteredConfPassword] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  const register = () => {
    setIsLoading(true);
    if (enteredPassword !== enteredConfPassword) {
      setIsLoading(false);
      setOpenAlert(true);
      setAlertMessage("Password Mismatched. Check spellings again.");
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
      const formData = {
        username: enteredUsername,
        password: enteredPassword,
      };
      managerService.addNewManager(accessToken, formData).then((res) => {
        console.log(res);
        if (res.data.message === "Failed to authenticate token") {
          setIsLoading(false);
          setOpenAlert(true);
          setAlertMessage("Session Expired. Login again");
          setTimeout(() => {
            localStorage.removeItem("isAdminLoggedIn");
            navigate("/", { replace: true });
          }, 1000);
        } else {
          setIsLoading(false);
          setOpenSuccessAlert(true);
          setAlertMessage("Manager Added Successfully!");
          setTimeout(() => {
            props.close();
          }, 2000);
        }
      });
    }
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const confPasswordChangeHandler = (event) => {
    setEnteredConfPassword(event.target.value);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <h1 style={{ textAlign: "center", margin: "30px" }}>Add New Manager</h1>
        <DialogContent>
          <Lottie
            options={defaultOptions}
            height={300}
            width={300}
            isStopped={false}
            isPaused={false}
          />
          <TextField
            onChange={usernameChangeHandler}
            autoFocus
            style={{ width: "550px" }}
            margin="dense"
            id="name"
            label="Username"
            type="text"
            variant="standard"
          />
          <TextField
            onChange={passwordChangeHandler}
            autoFocus
            style={{ width: "550px" }}
            margin="dense"
            id="pwd"
            label="Password"
            type="password"
            variant="standard"
          />
          <TextField
            onChange={confPasswordChangeHandler}
            autoFocus
            style={{ width: "550px" }}
            margin="dense"
            id="confpwd"
            label="Re-enter Password"
            type="password"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <div>
            <Button
              variant="outlined"
              style={{ borderColor: "red", color: "red" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
          <div style={{ width: "100px", textAlign: "center" }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: "green", width: "100px" }}
                onClick={register}
              >
                ADD
              </Button>
            )}
          </div>
        </DialogActions>
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
      </Dialog>
    </>
  );
};

export default Manageradd;
