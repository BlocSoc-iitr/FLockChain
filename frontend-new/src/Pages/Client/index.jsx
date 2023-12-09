import React, { useState } from "react";
import styles from "./index.module.css";
import Navbar from "../../Components/Navbar";
import ClientTable from "../../Components/ClientTable";
import ClientTableCompleted from "../../Components/ClientTableCompleted";



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
                <h1>User Dashboard</h1>
                <div className={styles.tabs}>
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
        </>
    );
};

export default UserDashboard;
