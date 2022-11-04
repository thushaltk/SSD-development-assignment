import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Lottie from "react-lottie";
import * as animationData from "../../assets/images/managerlogin.json";

const ManagerStaffCard = () => {
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
          <Typography
            variant="h4"
            style={{ fontFamily: "Tenorite", fontWeight: "700" }}
          >
            Manager Login
          </Typography>
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            isStopped={false}
            isPaused={false}
          />
          <TextField
            id="manager-email"
            label="Email"
            variant="standard"
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <TextField
            id="manager-pwd"
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

export default ManagerStaffCard;
