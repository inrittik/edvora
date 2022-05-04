import React, { useState, useEffect } from "react";
import RideCard from "../../components/RideCard";
import styles from "./styles.module.css";

const Dashboard = ({ rides, user }) => {
  rides.sort((a, b) => {
    return a.distance > b.distance ? 1 : -1;
  });
  const [active, setActive] = useState(0);
  return (
    <>
      <header className={styles.header}>
        <span className={styles.title}>Edvora</span>
        <div className={styles.profile}>
          <span>{user.name}</span>
          <img src={user.url} alt="" />
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
        {rides.map((ride, index) => {
          return <RideCard props={ride} key={index} />;
        })}
        {/* <RideCard />
        <RideCard />
        <RideCard /> */}
      </div>
    </>
  );
};

export default Dashboard;
