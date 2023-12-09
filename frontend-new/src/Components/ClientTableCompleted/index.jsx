import React from "react";
import styles from "./index.module.css";
import { Table } from "antd";
import {
  BITCOIN_LOGO,
  ETHEREUM_LOGO,
  TETHER_LOGO,
} from "../../constants/constants";

const columns = [
  {
    title: "Timestamp",
    dataIndex: "time",
    render: (text, record) => {
      return (
        <div className={styles.tableContent}>
          <div>
            <div className={styles.header}>{record.name}</div>
            <div className={styles.subHeader}>{record.time}</div>
            <div>Desired Accuracy: 95.6%</div>
            <div>Achieved Accuracy: 95.6%</div>
            <div className={styles.status}>
              <div className={styles.dot}></div>
              Completed
            </div>
          </div>
          <div>
            <div>Layers: 2</div>
            <div>Activation Function: RELU</div>
            <div>Total Loss: 0.15</div>
            <div>{`Time Taken: ${record.timeElapsed} `}</div>
          </div>
          <div>
            <div className={styles.nodeNumber}>23</div>
            <div>Epoches</div>
          </div>
        </div>
      );
    },
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const UserTableCompleted = () => {
  const data = [
    {
      key: "1",
      time: "2021-04-01 12:00:00",
      logo: BITCOIN_LOGO,
      name: "CNN Model Training 20231209",
      price: "2058.8",
      type: "MARKET",
      side: "LONG",
      change_24h: "+3.27%",
      high_24h: "2059.0",
      low_24h: "2058.8",
      volume_24h: "$1.80M",
      openInterest: "$179.0M",
      timeElapsed: "1hr 36min",
    },
    {
      key: "2",
      time: "2021-04-01 12:00:00",
      logo: ETHEREUM_LOGO,
      name: "RNN Model Training 20231209",
      price: "2058.8",
      type: "MARKET",
      side: "LONG",
      change_24h: "-3.27%",
      high_24h: "2059.0",
      low_24h: "2058.8",
      volume_24h: "$1.80M",
      openInterest: "$179.0M",
      timeElapsed: "1hr 36min",
    },
    {
      key: "3",
      time: "2021-04-01 12:00:00",
      logo: TETHER_LOGO,
      name: "MLP Model Training 20231209",
      price: "2058.8",
      type: "MARKET",
      side: "LONG",
      change_24h: "+3.27%",
      high_24h: "2059.0",
      low_24h: "2058.8",
      volume_24h: "$1.80M",
      openInterest: "$179.0M",
      timeElapsed: "1hr 36min",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      className={styles.table}
      pagination={false}
    />
  );
};

export default UserTableCompleted;
