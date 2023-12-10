import React from "react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { ForceGraph2D } from "react-force-graph";
import { useRef } from "react";
import { Modal } from "antd";
import close from "../../Assets/close.svg";
import { handleFetchGasData } from "../UserDashboard/getGasData";
import { IoWarningOutline } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import { stakeAbi } from "./abi";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TaskModal = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const [gasData, setGasData] = useState();
  const [loading, setLoading] = useState(false);

  const handleStaking = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sendAddress = "0xc1490E0489f487477A9B4e52Da19416d21fC09E0";

    try {
      const tx = await signer.sendTransaction({
        to: sendAddress,
        value: ethers.utils.parseEther("0.1"),
        gasPrice: ethers.utils.parseUnits(
          gasData.high.suggestedMaxFeePerGas.slice(0, 5),
          "gwei"
        ),
        gasLimit: 45000,
      });
      await tx.wait();
      toast.success("Deposit successful", {
        style: {
          borderRadius: "8px",
          background: "#16182E",
          color: "#fff",
          padding: "20px 24px",
        },
      });
      navigate("/client");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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
        <div className={styles.modalTitle}>Staking</div>
        <div className={styles.modalContent}>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemLabel}>
              <IoWarningOutline size={40} />
              <div>
                In order to participate in the network, you need to stake 0.1
                ETH into the network to ensure it's economic security. Any
                malicious activity will result in slashing of your stake.
              </div>
            </div>
          </div>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemValue}>
              Staking Amount: 0.1 ETH
            </div>
          </div>
          <div className={styles.gasHeader}>Gas Data</div>
          <div className={styles.gasHeader}>Sepolia Testnet</div>
          <div className={styles.modalContentItem}>
            <div className={styles.gasContainer}>
              <div className={styles.modalContentItemLabel}>
                <div>Fastest</div>
                <div>
                  {(gasData &&
                    Math.floor(
                      Number(gasData.high.suggestedMaxFeePerGas.slice(0, 5)) *
                        21592
                    ).toString() + " Gwei") ||
                    0.0 + " Gwei"}
                </div>
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Average</div>
              <div>
                {(gasData &&
                  Math.floor(
                    Number(gasData.medium.suggestedMaxFeePerGas.slice(0, 5)) *
                      21592
                  ).toString() + " Gwei") ||
                  0.0 + " Gwei"}
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Slow</div>
              <div>
                {(gasData &&
                  Math.floor(
                    Number(gasData.low.suggestedMaxFeePerGas.slice(0, 5)) *
                      21592
                  ).toString() + " Gwei") ||
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
            onClick={() => handleStaking()}
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

const Option = () => {
  const [visible, setVisible] = useState(false);
  const fgRef = useRef();
  return (
    <div className={styles.container}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div id="chartdiv" className={styles.canvas}>
        <ForceGraph2D
          ref={fgRef}
          linkColor={() => "rgba(255,255,255,0.3)"}
          nodeColor={() => "#8a46ff"}
          nodeRelSize={7}
          backgroundColor="#191b35"
          linkDirectionalParticles={1}
          graphData={{
            nodes: [
              { id: "1" },
              { id: "2" },
              { id: "3" },
              { id: "4" },
              { id: "5" },
              { id: "6" },
              { id: "7" },
              { id: "8" },
              { id: "9" },
              { id: "10" },
              { id: "11" },
              { id: "12" },
              { id: "13" },
              { id: "14" },
              { id: "15" },
              { id: "16" },
              { id: "17" },
              { id: "18" },
              { id: "19" },
              { id: "20" },
              { id: "21" },
              { id: "22" },
              { id: "23" },
              { id: "24" },
              { id: "25" },
              { id: "26" },
              { id: "27" },
            ],
            links: [
              { source: "1", target: "2" },
              { source: "1", target: "3" },
              { source: "1", target: "4" },
              { source: "1", target: "6" },
              { source: "5", target: "7" },
              { source: "5", target: "8" },
              { source: "5", target: "9" },
              { source: "11", target: "10" },
              { source: "11", target: "12" },
              { source: "11", target: "13" },
              { source: "11", target: "14" },
              { source: "16", target: "15" },
              { source: "16", target: "17" },
              { source: "16", target: "18" },
              { source: "16", target: "19" },
              { source: "16", target: "20" },
              { source: "21", target: "22" },
              { source: "21", target: "23" },
              { source: "21", target: "25" },
              { source: "24", target: "26" },
              { source: "24", target: "27" },
            ],
          }}
        />
      </div>
      <div className={styles.title}>
        <div className={styles.titleDiv}>
          <h1>Who are You?</h1>
          <a href="/users">
            <button className={styles.actionButton}>Login as an User</button>
          </a>
          <button
            className={styles.actionButton}
            onClick={() => setVisible(true)}
          >
            Login as a Client
          </button>
        </div>
        <TaskModal visible={visible} setVisible={setVisible} />
      </div>
    </div>
  );
};

export default Option;
