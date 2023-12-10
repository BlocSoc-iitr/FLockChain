import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Navbar from "../../Components/Navbar";
import ClientTable from "../../Components/ClientTable";
import ClientTableCompleted from "../../Components/ClientTableCompleted";
import close from "./../../Assets/close.svg";
import { Modal } from "antd";
import axios from "axios";
import { Table } from "antd";


const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
};

const TaskModal = ({ visible, setVisible }) => {
    const baseURL = "http://192.168.206.90/api/v1";
    const [data, setData] = useState([]);

    const columns = [
        {
            title: "Timestamp",
            dataIndex: "time",
            render: (text, record) => {
                return (
                    <div className={styles.tableContent}>
                        <div>
                            <div className={styles.header}>{record.session_name}</div>
                            <div>Desired Accuracy: {record.Desired_Accuracy}%</div>
                        </div>
                        <div>
                            <div>Layers: {record.no_of_layers}</div>
                            <div>Activation Function: {record.activation_function}</div>
                            <div>Model Type: {record.model_type}</div>
                        </div>
                        <button onClick={() => handleWorkClick(record._id)}>Work on it!</button>
                    </div>
                );
            },
        },
    ];

    const handleWorkClick = (id) => {
        const baseURL = "http://192.168.206.90/api/v1";
        axios.post(`${baseURL}/update`, {
            _id: id,
        }).then((res) => {
            console.log(res.data);
        });
    };

    useEffect(() => {
        axios.get(`${baseURL}/form/fetch`).then((res) => {
            const updatedData = res.data.filter((item) => item.display === 0);
            setData(updatedData);
            console.log(updatedData);
        });
    }, []);
    return (
        <Modal
            visible={visible}
            onOk={() => { }}
            onCancel={() => setVisible(false)}
            footer={null}
            closeIcon={<img src={close} alt="" />}
        >
            <div className={styles.tableContainer}>
                <Table
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    className={styles.table}
                    pagination={false}
                />
            </div>
        </Modal>
    );
};


const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [visible, setVisible] = useState(false);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1>Client Dashboard</h1>
                <div className={styles.tabs}>
                    <button
                        className={styles.button}
                        onClick={() => setVisible(true)}
                    >
                        Pending Orders
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
                {activeTab === 0 ? <ClientTable /> : <ClientTableCompleted />}
            </div>
            <TaskModal
                visible={visible}
                setVisible={setVisible}
            />
        </>
    );
};

export default UserDashboard;
