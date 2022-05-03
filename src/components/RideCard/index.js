import React from "react";
import styles from "./styles.module.css";

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src="https://picsum.photos/200" alt="" />
      </div>
      <div className={styles.details}>
        <ul>
          <li>
            Ride Id: <span>002</span>
          </li>
          <li>
            Origin Station: <span>20</span>
          </li>
          <li>
            station_path: <span>[20, 39, 40, 42, 54, 63, 72, 88, 98]</span>
          </li>
          <li>
            Date: <span>15th Feb 2022 16:33</span>
          </li>
          <li>
            Distance: <span>0</span>
          </li>
        </ul>
      </div>
      <div className={styles.place}>City Name</div>
      <div className={styles.place}>State Name</div>
    </div>
  );
};

export default index;
