import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Timestamp",
    dataIndex: "time",
    render: (text, record) => {
      return (
        <div className={styles.tableContent}>
          <div>
            <div className={styles.header}>Paid {record.paid} ETH</div>
            <div className={styles.subHeader}>Block {record.block}</div>
            <div>Model Trained</div>
            <div>Epoch: {record.epoch}</div>
            <div>Date: {record.date}</div>
          </div>
          <div></div>
        </div>
      );
    },
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const UserTxHistory = () => {
  const startTime = new Date("2023-12-09 05:00:00");
  const [currentTime, setCurrentTime] = useState(new Date());
  const subGraphUrl =
    "https://api.studio.thegraph.com/query/56280/flockchain_sub3/v0.0.42";

  //   useEffect(() => {
  //     (async () => {
  //       const fetchGraphData = async () => {
  //         const query = `
  //                   {
  //                     newUserInstances(first: 5) {
  //                       id
  //                       instanceId
  //                       numberOfEpochs
  //                       blockNumber
  //                     }
  //                   }
  //                 `;
  //         const { data } = await axiosGraph(subGraphUrl, query);
  //         console.log(data);
  //       };
  //     })();
  //   }, []);

  const data = [
    {
      key: "1",
      epoch: 2,
      block: 18752814,
      date: "2023-12-10",
      paid: 0.07,
    },
  ];

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

  return (
    <>
      {data.length > 0 ? (
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          className={styles.table}
          pagination={false}
        />
      ) : (
        <div className={styles.noData}>No Data Available</div>
      )}
    </>
  );
};

export default UserTxHistory;
