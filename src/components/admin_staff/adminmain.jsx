import React, { useState } from "react";
import { useEffect } from "react";
import Manageradd from "../manager_staff/manageradd";
import Workeradd from "../worker_staff/workeradd";

import "./adminmain.css";

const Adminmain = () => {
  const [openAddManager, setOpenAddManager] = useState(false);
  const [openAddWorker, setOpenAddWorker] = useState(false);

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

  return (
    <div id="adminmain">
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
