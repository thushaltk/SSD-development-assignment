import { Button, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

import "./workerstaffmain.css";

const Workerstaffmain = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/126/126477.png"
  );

  const selectImageChangeHandler = (data) => {
    setSelectedImage(data.target.files[0]);
  };

  return (
    <div id="workermain">
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
            aria-label="enter message"
            maxRows={10}
            minRows={10}
            placeholder="Enter message to save"
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <Button variant="contained" color="primary" endIcon={<SendIcon />}>
            SEND
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Workerstaffmain;
