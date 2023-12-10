import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Table } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const columns = [
  {
    title: "Timestamp",
    dataIndex: "time",
    render: (text, record) => {
      return (
        <Link to="/session-details" className={styles.link}>
          <div className={styles.tableContent}>
            <div>
              <div className={styles.header}>{record.session_name}</div>
              <div className={styles.subHeader}>{record.time}</div>
              <div>Desired Accuracy: {record.Desired_Accuracy}%</div>
              <div>Achieved Accuracy: !!!!!!!!!%</div>
              <div className={styles.status}>
                <div className={styles.dot}></div>
                Completed
              </div>
            </div>
            <div>
              <div>Layers: {record.no_of_layers}</div>
              <div>Activation Function: {record.activation_function}</div>
              <div>Total Loss: 0.15</div>
              <div>{`Time Taken: ${record.timeElapsed} `}</div>
            </div>
            <div>
              <div>Trained Through</div>
              <div className={styles.nodeNumber}>{record.no_of_clients}</div>
              <div>Nodes</div>
            </div>
          </div>
        </Link>
      );
    },
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const UserTableCompleted = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseURL = "http://192.168.206.90/api/v1";
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/form/fetch`)
      .then((res) => {
        const updatedData = res.data.filter((item) => item.display === 2);
        updatedData.reverse();
        setData(updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : data.length > 0 ? (
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

export default UserTableCompleted;
