import React from "react";
import styles from "./index.module.css";
// import wallet from "./../../Assets/wallet.svg";
// import WalletModal from "../WalletModal";

import { Link } from "react-router-dom";

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
        <div onClick={() => setVisible(true)}>
          {/* <img src="" alt="wallet" /> */}
        </div>
        {/* <WalletSelector /> */}
      </div>
      {/* <WalletModal visible={visible} setVisible={setVisible} /> */}
    </div>
  );
};

export default Navbar;
