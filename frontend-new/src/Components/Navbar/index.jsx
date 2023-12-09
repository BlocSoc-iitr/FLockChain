import React from "react";
import styles from "./index.module.css";
// import wallet from "./../../Assets/wallet.svg";
// import WalletModal from "../WalletModal";

import { Link } from "react-router-dom";
import BlockiesSvg from "blockies-react-svg";

const Navbar = () => {
  const [visible, setVisible] = React.useState(false);

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
            address="0x1234...ABCD"
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 8,
            }}
          />
          <div className={styles.details}>
            <div className={styles.walletAddress}>0x1234...ABCD</div>
            <div className={styles.walletRole}>User</div>
          </div>
        </div>
      </div>
      {/* <WalletModal visible={visible} setVisible={setVisible} /> */}
    </div>
  );
};

export default Navbar;
