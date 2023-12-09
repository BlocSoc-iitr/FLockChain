import React from "react";
import styles from "./index.module.css";
import Navbar from "../../Components/Navbar";
import UserTable from "../../Components/UserTable";
import UserTableCompleted from "../../Components/UserTableCompleted";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);

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
        {activeTab === 0 ? <UserTable /> : <UserTableCompleted />}
      </div>
    </>
  );
};

export default UserDashboard;
