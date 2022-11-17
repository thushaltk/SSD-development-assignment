import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Manageradd from "../manager_staff/manageradd";
import Workeradd from "../worker_staff/workeradd";

import "./adminmain.css";

const Adminmain = () => {
  const [openAddManager, setOpenAddManager] = useState(false);
  const [openAddWorker, setOpenAddWorker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //setOpenAlert(false);
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
      navigate('/', { replace: true });
    }
  }, []);

  const openAddManagerDialog = () => {
    setOpenAddManager(true);
  };

  const openAddWorkerDialog = () => {
    setOpenAddWorker(true);
  };

  const onClose = () => {
    setOpenAddManager(false);
    setOpenAddWorker(false);
  };

  const onLogout = () => {
    localStorage.removeItem("isManagerLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("isWorkerLoggedIn");
    navigate('/', { replace: true });
  };
  

  return (
    <div id="adminmain">
      <Button
        variant="text"
        color="primary"
        endIcon={<Logout />}
        onClick={onLogout}
      >
        Logout
      </Button>
      <h1>Select Function</h1>
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div id="managerBtn" onClick={openAddManagerDialog}>
          <h1 style={{ color: "black" }} onClick={openAddManagerDialog}>
            Add New <br /> Manager
          </h1>
        </div>
        <div id="workerBtn" onClick={openAddWorkerDialog}>
          <h1 style={{ color: "black" }} onClick={openAddWorkerDialog}>
            Add New <br /> Worker
          </h1>
        </div>
      </div>
      {openAddManager ? (
        <Manageradd open={openAddManager} close={onClose} />
      ) : (
        ""
      )}

      {openAddWorker ? (
        <Workeradd open={openAddWorker} close={onClose} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Adminmain;
