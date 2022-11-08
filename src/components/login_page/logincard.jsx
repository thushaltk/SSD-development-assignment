import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Lottie from "react-lottie";
import * as animationData from "../../assets/images/adminlogin.json";

const Logincard = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Card style={{ width: "300px", height: "fit-content" }}>
        <CardContent>
          <br />
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            isStopped={false}
            isPaused={false}
          />
          <TextField
            id="admin-email"
            label="Email"
            variant="standard"
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <TextField
            id="admin-pwd"
            label="Password"
            variant="standard"
            type="password"
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <br />
          <Button variant="contained" style={{ width: "100px" }}>
            Login
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default Logincard;
