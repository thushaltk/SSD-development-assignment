import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import Lottie from "react-lottie";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import * as animationData from "../../assets/images/adminlogin.json";
import managerService from "../../services/manager-service";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../slices/accessTokenSlice";
import { Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import adminService from "../../services/admin-service";
import workerService from "../../services/worker-service";

const Logincard = () => {
  const dispatch = useDispatch();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const from = location.state?.from?.pathname || "/manager";
  const accessToken = useSelector((state) => state.accessToken.value);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  const onChangeUsername = (event) => {
    setEnteredUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setEnteredPassword(event.target.value);
  };

  const onSubmit = () => {
    setIsLoading(true);
    if (selectedRole == "manager") {
      managerService
        .managerLogin({
          username: enteredUsername,
          password: enteredPassword,
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          if (
            res.data.message !== "password mismatch" &&
            res.data.message !== "User not found" &&
            res.data.message !== "Username and password is empty"
          ) {
            dispatch(setAccessToken(res.data.accessToken));
            setAuth({
              user: enteredUsername,
              roles: ["manager"],
              accessToken: res.data.accessToken,
            });
            setOpenSuccessAlert(true);
            setAlertMessage("Login Success!");
            setTimeout(() => {
              localStorage.setItem("isManagerLoggedIn", "true");
              navigate(from, { replace: true });
            }, 1000);
          } else {
            setOpenAlert(true);
            setAlertMessage("Incorrect username or password");
            setTimeout(() => {
              setOpenAlert(false);
            }, 3000);
          }
        });
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("isWorkerLoggedIn");
    } else if (selectedRole === "admin") {
      if (enteredUsername === "admin" && enteredPassword === "admin") {
        adminService.adminLogin({ username: enteredUsername }).then((res) => {
          setIsLoading(false);
          if (
            res.data.message !== "password mismatch" &&
            res.data.message !== "User not found" &&
            res.data.message !== "Username and password is empty"
          ) {
            dispatch(setAccessToken(res.data.accessToken));
            setAuth({
              user: enteredUsername,
              roles: ["admin"],
              accessToken: "",
            });
            setOpenSuccessAlert(true);
            setAlertMessage("Login Success!");
            setTimeout(() => {
              localStorage.setItem("isAdminLoggedIn", "true");
              navigate("/admin", { replace: true });
            }, 1000);
          }
        });
      } else {
        setIsLoading(false);
      }
      localStorage.removeItem("isManagerLoggedIn");
      localStorage.removeItem("isWorkerLoggedIn");
    } else if (selectedRole === "worker") {
      workerService
        .workerLogin({
          username: enteredUsername,
          password: enteredPassword,
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          if (
            res.data.message !== "password mismatch" &&
            res.data.message !== "User not found"
          ) {
            dispatch(setAccessToken(res.data.accessToken));
            setAuth({
              user: enteredUsername,
              roles: ["worker"],
              accessToken: res.data.accessToken,
            });
            setOpenSuccessAlert(true);
            setAlertMessage("Login Success!");
            setTimeout(() => {
              localStorage.setItem("isWorkerLoggedIn", "true");
              navigate(from, { replace: true });
            }, 1000);
          } else {
            setOpenAlert(true);
            setAlertMessage("Incorrect username or password");
            setTimeout(() => {
              setOpenAlert(false);
            }, 3000);
          }
        });
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("isManagerLoggedIn");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Card style={{ width: "fit-content", height: "fit-content" }}>
        <CardContent>
          <br />
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            isStopped={false}
            isPaused={false}
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select Role
            </FormLabel>
            <br />
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={onChangeRole}
              value={selectedRole}
            >
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                value="manager"
                control={<Radio />}
                label="Manager"
              />
              <FormControlLabel
                value="worker"
                control={<Radio />}
                label="Worker"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          <TextField
            id="username"
            label="Username"
            variant="standard"
            style={{ width: "100%" }}
            onChange={onChangeUsername}
          />
          <br />
          <br />
          <TextField
            id="pwd"
            label="Password"
            variant="standard"
            type="password"
            style={{ width: "100%" }}
            onChange={onChangePassword}
          />
          <br />
          <br />
          <br />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              style={{ width: "100px" }}
              onClick={onSubmit}
            >
              Login
            </Button>
          )}
        </CardContent>
      </Card>
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

export default Logincard;
