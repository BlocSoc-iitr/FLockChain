import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import BlockiesSvg from "blockies-react-svg";
import { useSDK } from "@metamask/sdk-react";

const Navbar = () => {
  const { account } = useSDK();
  const pathName = window.location.pathname;
  const role = pathName === "/users" ? "User" : "Client"


  return (
    <div className={styles.navbar}>
      <div className={styles.navListLeft}>
        <div className={styles.navItem}>
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className={styles.navListRight}>
        <div className={styles.wallet}>
          <BlockiesSvg
            address={account || "0x000000"}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 8,
            }}
          />
          <div className={styles.details}>
            <div className={styles.walletAddress}>
              {account && `${account.slice(0, 6)}...${account.slice(-5, -1)}`}
            </div> 
              <div className={styles.walletRole}>{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
