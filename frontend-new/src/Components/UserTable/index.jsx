import React, { useState, useEffect } from "react";
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
            <div className={styles.status}>
              <div className={styles.dot}></div>
              Active
            </div>
          </div>
          <div>
            <div>Layers: 2</div>
            <div>Activation Function: RELU</div>
            <div>{`Time Elapsed:${record.timeElapsed} `}</div>
          </div>
          <div>
            <div className={styles.nodeNumber}>23</div>
            <div>Nodes in Operation</div>
          </div>
        </div>
      );
    },
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const UserTable = () => {
  //sample date
  const startTime = new Date("2023-12-09 05:00:00");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the component state with the current time
      setCurrentTime(new Date());
    }, 1000); // Update every second (1000 milliseconds)

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [currentTime]); // Run this effect only once on initial mount

  // Function to calculate elapsed time
  const calculateElapsedTime = () => {
    const timeDifference = currentTime - startTime;
    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    return ` ${hours}:${minutes}:${seconds} hours `;
  };

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
      timeElapsed: calculateElapsedTime(),
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
      timeElapsed: calculateElapsedTime(),
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
      timeElapsed: calculateElapsedTime(),
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

export default UserTable;
