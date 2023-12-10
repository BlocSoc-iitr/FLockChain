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
            <div className={styles.header}>{record.session_name}</div>
            <div className={styles.subHeader}>{record.time}</div>
            <div>Desired Accuracy: {record.Desired_Accuracy}%</div>
            <div className={styles.status}>
              <div className={styles.dot}></div>
              Active
            </div>
          </div>
          <div>
            <div>Layers: {record.no_of_layers}</div>
            <div>Activation Function: {record.activation_function}</div>
            <div>{`Time Elapsed:${record.timeElapsed} `}</div>
          </div>
          <div>
            <div className={styles.nodeNumber}>{record.no_of_clients}</div>
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
  const [data, setData] = useState([]);
  const baseURL = "http://192.168.206.90/api/v1";

  useEffect(() => {
    axios
      .get(`${baseURL}/form/fetch`)
      .then((res) => {
        const updatedData = res.data.filter((item) => item.display === 0);
        updatedData.reverse();
        setData(updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

export default UserTable;
