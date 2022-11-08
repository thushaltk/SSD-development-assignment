import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Lottie from "react-lottie";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as animationData from "../../assets/images/staff.json";

const Workeradd = (props) => {
  const [open, setOpen] = useState(props.open);
  const [isLoading, setIsLoading] = useState(false);

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
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <h1 style={{ textAlign: "center", margin: "30px" }}>Add New Worker</h1>
        <DialogContent>
          <Lottie
            options={defaultOptions}
            height={300}
            width={300}
            isStopped={false}
            isPaused={false}
          />
          <TextField
            autoFocus
            style={{ width: "550px" }}
            margin="dense"
            id="name"
            label="Username"
            type="text"
            variant="standard"
          />
          <TextField
            autoFocus
            style={{ width: "550px" }}
            margin="dense"
            id="pwd"
            label="Password"
            type="password"
            variant="standard"
          />
          <TextField
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
          <div style={{width: "100px", textAlign: 'center'}}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: "green", width: "100px"}}
                onClick={register}
              >
                ADD
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Workeradd;
