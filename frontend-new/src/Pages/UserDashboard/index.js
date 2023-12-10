import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Navbar from "../../Components/Navbar";
import UserTable from "../../Components/UserTable";
import UserTableCompleted from "../../Components/UserTableCompleted";
import close from "./../../Assets/close.svg";
import { Modal } from "antd";
import { CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoWarningOutline } from "react-icons/io5";
import { handleFetchGasData } from "./getGasData";
import { ethers } from "ethers";
import { abi } from "./abi";
import axios from "axios";
import { useSDK } from "@metamask/sdk-react";
import toast, { Toaster } from "react-hot-toast";
import UserTxHistory from "../../Components/UserTxHistory";

const baseURL = "http://192.168.206.90/api/v1";

const TxModal = ({
  visible,
  setVisible,
  setCreateVisible,
  name,
  modelType,
  clientNumber,
  layerNumber,
  activationFn,
  optimiser,
  value,
}) => {
  const [loading, setLoading] = useState(false);
  const [gasData, setGasData] = useState();
  const { account } = useSDK();

  const handleClickDeposit = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x6a1b1d831d2e1605e25ad83ef0e852c6c4f1c2e8",
      abi,
      signer
    );
    const tx = await contract.payBaseFee({
      value: ethers.utils.parseEther("0.05"),
    });
    await tx.wait();
    await axios
      .post(`${baseURL}/form/add`, {
        User_Address: account,
        session_name: name,
        model_type: modelType,
        no_of_clients: clientNumber,
        no_of_layers: layerNumber,
        activation_function: activationFn,
        Optimizer: optimiser,
        Desired_Accuracy: value,
        display: "0",
      })
      .then((response) => {
        toast.success("Session created successfully", {
          style: {
            borderRadius: "8px",
            background: "#16182E",
            color: "#fff",
            padding: "20px 24px",
          },
        });
        console.log(response);
      });
    setLoading(false);
    setVisible(false);
    setCreateVisible(false);
  };

  useEffect(() => {
    (async () => {
      const gasData = await handleFetchGasData();
      setGasData(gasData);
    })();
  }, []);

  return (
    <Modal
      visible={visible}
      onOk={() => {}}
      onCancel={() => setVisible(false)}
      footer={null}
      closeIcon={<img src={close} alt="" />}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>Payment</div>
        <div className={styles.modalContent}>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemLabel}>
              <IoWarningOutline size={40} />
              <div>
                You need to pay a base fees for training your model. You will be
                charged an additional fees of 0.01ETH per epoch. You will be
                charged a gas fee for the transaction.
              </div>
            </div>
          </div>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemValue}>
              Base Fees: 0.05 ETH
            </div>
            <div>Protocol Fees: 0.0002ETH</div>
          </div>
          <div className={styles.gasHeader}>Gas Data</div>
          <div className={styles.gasHeader}>Sepolia Testnet</div>
          <div className={styles.modalContentItem}>
            <div className={styles.gasContainer}>
              <div className={styles.modalContentItemLabel}>
                <div>Fastest</div>
                <div>
                  {(gasData &&
                    gasData.high.suggestedMaxFeePerGas.slice(0, 5) + " Gwei") ||
                    0.0 + " Gwei"}
                </div>
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Average</div>
              <div>
                {(gasData &&
                  gasData.medium.suggestedMaxFeePerGas.slice(0, 5) + " Gwei") ||
                  0.0 + " Gwei"}
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Slow</div>
              <div>
                {(gasData &&
                  gasData.low.suggestedMaxFeePerGas.slice(0, 5) + " Gwei") ||
                  0.0 + " Gwei"}
              </div>
            </div>
            <div></div>
          </div>
          <div className={styles.congestion}>
            Network Congestion: {gasData && gasData.networkCongestion}
          </div>
        </div>
        <div className={styles.modalButtonGroup}>
          <button
            className={styles.modalDepositButton}
            onClick={() => handleClickDeposit()}
          >
            {loading ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const TaskModal = ({
  visible,
  name,
  modelType,
  value,
  clientNumber,
  layerNumber,
  activationFn,
  optimiser,
  setVisible,
  setPayVisible,
  setName,
  setModelType,
  setValue,
  setClientNumber,
  setLayerNumber,
  setActivationFn,
  setOptimiser,
}) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { account } = useSDK();

  const handleClickDeposit = async () => {
    setLoading(true);
    setPayVisible(true);
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
          <input className={styles.modalInputFile} type="file" />
        </div>
        <div className={styles.modalButtonGroup}>
          <button
            className={styles.modalDepositButton}
            onClick={() => handleClickDeposit()}
          >
            {loading ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Start Session"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [createVisible, setCreateVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = useState("");
  const [modelType, setModelType] = useState("");
  const [value, setValue] = useState("");
  const [clientNumber, setClientNumber] = useState(3);
  const [layerNumber, setLayerNumber] = useState(2);
  const [activationFn, setActivationFn] = useState("");
  const [optimiser, setOptimiser] = useState("");

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className={styles.container}>
        <h1>User Dashboard</h1>
        <div className={styles.tabs}>
          <button
            className={styles.button}
            onClick={() => setCreateVisible(true)}
          >
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
          <div
            className={activeTab === 1 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(2)}
          >
            Payment History
          </div>
        </div>
        {activeTab === 0 ? (
          <UserTable />
        ) : activeTab === 1 ? (
          <UserTableCompleted />
        ) : (
          <UserTxHistory />
        )}
      </div>
      <TaskModal
        visible={createVisible}
        name={name}
        modelType={modelType}
        value={value}
        clientNumber={clientNumber}
        layerNumber={layerNumber}
        activationFn={activationFn}
        optimiser={optimiser}
        setVisible={setCreateVisible}
        setPayVisible={setVisible}
        setName={setName}
        setModelType={setModelType}
        setValue={setValue}
        setClientNumber={setClientNumber}
        setLayerNumber={setLayerNumber}
        setActivationFn={setActivationFn}
        setOptimiser={setOptimiser}
      />
      <TxModal
        visible={visible}
        name={name}
        modelType={modelType}
        value={value}
        clientNumber={clientNumber}
        layerNumber={layerNumber}
        activationFn={activationFn}
        optimiser={optimiser}
        setVisible={setVisible}
        setCreateVisible={setCreateVisible}
      />
    </>
  );
};

export default UserDashboard;
