import React, { useState } from "react";
import styles from "./index.module.css";
import Navbar from "../../Components/Navbar";
import UserTable from "../../Components/UserTable";
import UserTableCompleted from "../../Components/UserTableCompleted";
import close from "./../../Assets/close.svg";
import { Dropdown, Modal, Space } from "antd";
import { CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const TaskModal = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [modelType, setModelType] = useState("");
  const [value, setValue] = useState("");
  const [clientNumber, setClientNumber] = useState(3);
  const [layerNumber, setLayerNumber] = useState(2);
  const [activationFn, setActivationFn] = useState("");
  const [optimiser, setOptimiser] = useState("");

  const handleClickDeposit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000);
  };
  return (
    <Modal
      visible={visible}
      onOk={() => {}}
      onCancel={() => setVisible(false)}
      footer={null}
      closeIcon={<img src={close} alt="" />}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>Create a new session</div>
        <div className={styles.modalContent}>
          <div className={styles.modalContentItem}>
            Session Name
            <input
              className={styles.modalContentItemInput}
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <img src={UsdcLogo} alt="" /> */}
          </div>
          <div className={styles.modalContentItem}>
            Model Type
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                sx={{
                  color: "#fff",
                  fontFamily: "Inter-Tight",
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                <MenuItem value={"CNN"}>CNN</MenuItem>
                <MenuItem value={"RNN"}>RNN</MenuItem>
                <MenuItem value={"MLP"}>MLP</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.modalContentItem}>
            No. of Clients
            <input
              className={styles.modalContentItemInput}
              placeholder=""
              value={clientNumber}
              onChange={(e) => setClientNumber(Number(e.target.value))}
            />
            {/* <img src={UsdcLogo} alt="" /> */}
          </div>
          <div className={styles.modalContentItem}>
            No. of Layers
            <input
              className={styles.modalContentItemInput}
              placeholder=""
              value={layerNumber}
              onChange={(e) => setLayerNumber(Number(e.target.value))}
            />
            {/* <img src={UsdcLogo} alt="" /> */}
          </div>
          <div className={styles.modalContentItem}>
            Activation Function
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={activationFn}
                onChange={(e) => setActivationFn(e.target.value)}
                sx={{
                  color: "#fff",
                  fontFamily: "Inter-Tight",
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                <MenuItem value={"Sigmoid"}>Sigmoid</MenuItem>
                <MenuItem value={"ReLU"}>ReLU</MenuItem>
                <MenuItem value={"Softmax"}>Softmax</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.modalContentItem}>
            Optimizer
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optimiser}
                onChange={(e) => setOptimiser(e.target.value)}
                sx={{
                  color: "#fff",
                  fontFamily: "Inter-Tight",
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                <MenuItem value={"SGD"}>SGD</MenuItem>
                <MenuItem value={"Adam"}>Adam</MenuItem>
                <MenuItem value={"Adagrad"}>Adagrad</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.modalContentItem}>
            Desired Accuracy
            <input
              className={styles.modalContentItemInput}
              placeholder="in %"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            {/* <img src={UsdcLogo} alt="" /> */}
          </div>
        </div>
        <div className={styles.modalButtonGroup}>
          <button
            className={styles.modalDepositButton}
            onClick={() => handleClickDeposit()}
          >
            {loading ? <CircularProgress size={20} sx={{
              color:"#fff"
            }} /> : "Start Session"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>User Dashboard</h1>
        <div className={styles.tabs}>
          <button className={styles.button} onClick={() => setVisible(true)}>
            Create New Task
          </button>
          <div
            className={activeTab === 0 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(0)}
          >
            Ongoing
          </div>
          <div
            className={activeTab === 1 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(1)}
          >
            Completed
          </div>
        </div>
        {activeTab === 0 ? <UserTable /> : <UserTableCompleted />}
      </div>
      <TaskModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default UserDashboard;
