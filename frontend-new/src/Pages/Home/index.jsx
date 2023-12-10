import React, { useState, useRef } from "react";
import { useSDK } from "@metamask/sdk-react";
import styles from "./index.module.css";
import { ForceGraph2D } from "react-force-graph";
import metamask from "./../../Assets/metamask-icon.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const fgRef = useRef();
  const navigate = useNavigate();
  const { sdk, connected, chainId, account } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      console.log(`connected`, accounts);
      navigate("/option");
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle((b) => !b);
  };

  const forceUpdate = useForceUpdate();

  return (
    <div className="App">
      <div id="chartdiv" className={styles.canvas}>
        <ForceGraph2D
          ref={fgRef}
          linkColor={() => "rgba(255,255,255,0.3)"}
          nodeColor={() => "#8a46ff"}
          backgroundColor="#191b35"
          linkDirectionalParticles={1}
          linkDirectionalParticleColor={() => "#8a46ff"}
          nodeRelSize={5}
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
              { source: "5", target: "6" },
              { source: "5", target: "7" },
              { source: "5", target: "8" },
              { source: "5", target: "9" },
              { source: "5", target: "10" },
              { source: "11", target: "12" },
              { source: "11", target: "13" },
              { source: "11", target: "14" },
              { source: "11", target: "15" },
              { source: "16", target: "17" },
              { source: "16", target: "18" },
              { source: "16", target: "19" },
              { source: "16", target: "20" },
              { source: "21", target: "22" },
              { source: "21", target: "23" },
              { source: "24", target: "25" },
              { source: "24", target: "26" },
              { source: "24", target: "27" },
            ],
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>FLockChain</div>
        <div className={styles.subtitle}>
          A Federated Learning network built on Proof of Stake and micro-rollups.
        </div>
        <button className={styles.button} onClick={connect}>
          {connected && account
            ? `Connected to ${account.slice(0, 6)}...${account.slice(-5, -1)}`
            : "Connect Wallet"}
          <img src={metamask} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Home;
