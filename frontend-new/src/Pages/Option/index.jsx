import React from "react";
import styles from "./index.module.css";
import { ForceGraph2D } from "react-force-graph";
import { useRef } from "react";
import { Modal } from "antd";
import { useState } from "react";
import close from "../../Assets/close.svg";

const TaskModal = ({ visible, setVisible }) => {
  return (
    <Modal
      visible={visible}
      onOk={() => { }}
      onCancel={() => setVisible(false)}
      footer={null}
      closeIcon={<img src={close} alt="" />}
    >
      <div className={styles.modalContainer}>
        <button className={styles.modalDepositButton}>Stake Amount</button>
      </div>
    </Modal>
  );
};

const Option = () => {
  const [visible, setVisible] = useState(false);
  const fgRef = useRef();
  return (
    <div className={styles.container}>
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
          <button className={styles.actionButton} onClick={() => setVisible(true)}>Login as a Client</button>
        </div>
        <TaskModal visible={visible} setVisible={setVisible} />
      </div>
    </div>
  );
};

export default Option;
