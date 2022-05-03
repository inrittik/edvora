import React, { useState } from "react";
import RideCard from "../../components/RideCard";
import styles from "./styles.module.css";

const Dashboard = () => {
  const [active, setActive] = useState(0);
  return (
    <>
      <header className={styles.header}>
        <span className={styles.title}>Edvora</span>
        <div className={styles.profile}>
          <span>Dhruv Singh</span>
          <img src="/Nrittik.jpg" alt="" />
        </div>
      </header>
      <div className={styles.body}>
        <div className={styles.toggler}>
          <ul>
            <li
              className={active === 0 ? styles.active : ""}
              onClick={() => setActive(0)}
            >
              Nearest Rides
            </li>
            <li
              className={active === 1 ? styles.active : ""}
              onClick={() => setActive(1)}
            >
              Upcoming Rides
            </li>
            <li
              className={active === 2 ? styles.active : ""}
              onClick={() => setActive(2)}
            >
              Past Rides
            </li>
          </ul>

          <span className={styles.filter}>
            <span>Filters</span>
          </span>
        </div>
        <RideCard />
        <RideCard />
        <RideCard />
      </div>
    </>
  );
};

export default Dashboard;
