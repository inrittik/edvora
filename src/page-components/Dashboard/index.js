import React, { useState } from "react";
import RideCard from "../../components/RideCard";
import styles from "./styles.module.css";

// Arbitrarily taken a date as the present date
let timeTo = new Date(2022, 3, 25, 0, 0, 0, 0);
let timeLimit = Math.floor(timeTo / 1000);

const Dashboard = ({ rides, user }) => {
  // sorts the array of rides based on distance from the user's location
  rides.sort((a, b) => {
    return a.distance > b.distance ? 1 : -1;
  });

  // seperate arrays to store upcoming and past rides seperately
  let upcomingRides = [],
    pastRides = [];

  // calculating time diff of each ride to categorize as past/upcoming
  rides.forEach((ride) => {
    const mm = ride.date.slice(0, 2);
    const dd = ride.date.slice(3, 5);
    const yy = ride.date.slice(6, 10);
    const hr = ride.date.slice(11, 13);
    const mn = ride.date.slice(14, 16);

    let rideDate = new Date(yy, mm, dd, hr, mn, 0, 0);
    let timeDiff = timeLimit - Math.floor(rideDate / 1000); // time diff of ride to present date(arbitrarily chosen as 25th May)

    // categorization of rides
    if (timeDiff < 0) upcomingRides.push(ride);
    else pastRides.push(ride);
  });

  // state to manage active section i.e nearest(0)/upcoming(1)/past(2)
  const [activeSection, setActiveSection] = useState(0);
  // const [activeCity, setActiveCity] = useState(null);
  // const [activeState, setActiveState] = useState(null);
  const [activeFilter, setActiveFilter] = useState(false);

  let array = rides;
  if (activeSection === 0) {
    array = rides;
  } else if (activeSection === 1) {
    array = upcomingRides;
  } else if (activeSection === 2) {
    array = pastRides;
  }
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
              className={activeSection === 0 ? styles.active : ""}
              onClick={() => setActiveSection(0)}
            >
              Nearest Rides
            </li>
            <li
              className={activeSection === 1 ? styles.active : ""}
              onClick={() => setActiveSection(1)}
            >
              Upcoming Rides({upcomingRides.length})
            </li>
            <li
              className={activeSection === 2 ? styles.active : ""}
              onClick={() => setActiveSection(2)}
            >
              Past Rides({pastRides.length})
            </li>
          </ul>

          <span className={styles.filter} onClick={() => setActiveFilter(true)}>
            <span>Filters</span>
            <form className={styles.filterActive}>
              <label htmlFor="city">City</label>
              <input type="radio" />
            </form>
          </span>
        </div>
        {/* mapping for the active array */}
        {array.map((ride, index) => {
          return <RideCard props={ride} key={index} />;
        })}
      </div>
    </>
  );
};

export default Dashboard;
