import React, { useState, useEffect } from "react";
import RideCard from "../../components/RideCard";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";

// Arbitrarily taken a date as the present date
let timeTo = new Date(2022, 3, 25, 0, 0, 0, 0);
let timeLimit = Math.floor(timeTo / 1000);

// main functional component
const Dashboard = ({ rides, user }) => {
  // sorts the array of rides based on distance from the user's location(`distance` property has been added in index page(getServerSideProps))
  rides.sort((a, b) => {
    if (a.distance > b.distance) {
      return 1;
    } else if (a.distance === b.distance) {
      if (a.origin_station_code > b.origin_station_code) {
        return 1;
      } else if (a.origin_station_code == b.origin_station_code) {
        if (a.id > b.id) return 1;
        else return -1;
      } else return -1;
    } else return -1;
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
  // categorization of rides ends

  const [activeSection, setActiveSection] = useState(0); // state to manage active section i.e nearest(0)/upcoming(1)/past(2)
  const [activeCity, setActiveCity] = useState(""); // state to handle filtered city
  const [activeState, setActiveState] = useState(""); // state to handle filtered state
  const [activeFilter, setActiveFilter] = useState(false); // state for filter component toggler
  const [stateToggle, setStateToggle] = useState(false); // state for state(filter) toggler
  const [cityToggle, setCityToggle] = useState(false); // state for city(filter) toggler
  const [activeArray, setActiveArray] = useState([...rides]); // state for dtoring active/valid list of rides

  // get state list for all valid states present in the data
  let states = [];
  rides.forEach((ride) => {
    states.push(ride.state);
  });
  const uniqueStates = [...new Set(states)]; // get rid of duplicates
  uniqueStates.sort(); // array sorted

  // get list of cities from a particular state(activeState)
  let cities = [];
  const getCityList = (state) => {
    let ridesFromState = rides.filter((ride) => {
      return ride.state === state;
    });
    ridesFromState.forEach((ride) => {
      cities.push(ride.city);
    });
    cities.sort(); // array sorted
    // function to remove duplicates inplace
    const removeDuplicates = (arr) => {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    };
    removeDuplicates(cities); // function call for removing duplicates
  };

  // filtering of array of rides based on state abd city(runs when filtering is applied)
  useEffect(() => {
    if (activeState === "" && activeCity === "") {
      // filtering not yet applied
      setActiveArray(rides);
      return;
    }
    const filteredArray = rides.filter((ride) => {
      if (activeCity === "") {
        // get valid rides when only state filter is applied
        return ride.state === activeState;
      } else {
        // get valid rides when both state and city filters are applied
        return ride.state === activeState && ride.city === activeCity;
      }
    });
    setActiveArray(filteredArray); // update state of active array to filtered rides
  }, [activeState, activeCity]);

  return (
    <>
      {/* Header starts */}
      <header className={styles.header}>
        <span className={styles.title}>Edvora</span>
        <div className={styles.profile}>
          <span>{user.name}</span>
          <img src={user.url} alt="" />
        </div>
      </header>
      {/* Header ends */}

      {/* Main body starts */}
      <div className={styles.body}>
        <div className={styles.toggler}>
          <ul>
            <li
              className={activeSection === 0 ? styles.active : ""}
              onClick={() => {
                setActiveSection(0);
                setActiveArray(rides);
              }}
            >
              Nearest Rides
            </li>
            <li
              className={activeSection === 1 ? styles.active : ""}
              onClick={() => {
                setActiveSection(1);
                setActiveArray(upcomingRides);
              }}
            >
              Upcoming Rides({upcomingRides.length})
            </li>
            <li
              className={activeSection === 2 ? styles.active : ""}
              onClick={() => {
                setActiveSection(2);
                setActiveArray(pastRides);
              }}
            >
              Past Rides({pastRides.length})
            </li>
          </ul>

          {/* Filter Component starts -> Due to lack of time, couldn't implement it as a seperate component*/}
          <span className={styles.filter}>
            {/* Filter toggler */}
            <div className={styles.icon}>&nbsp;</div>
            <span onClick={() => setActiveFilter(!activeFilter)}>Filter</span>
            <form
              className={
                activeFilter ? styles.filterActive : styles.filterInactive
              }
            >
              <div className={styles.headLabel}>Filters</div>
              <div
                className={styles.label}
                onClick={() => setStateToggle(!stateToggle)}
              >
                State{" "}
                <div
                  className={`${stateToggle ? styles.up : ""} ${styles.down}`}
                >
                  &nbsp;
                </div>
              </div>
              <div
                className={
                  stateToggle ? styles.listActive : styles.listInactive
                }
              >
                {/* mapping list of valid states coming from the API */}
                {uniqueStates.map((state, index) => {
                  return (
                    <div
                      onClick={() => {
                        setActiveState(state); // state is selected
                        setActiveCity(""); // active city is reset
                        setStateToggle(false); // state toggle off
                      }}
                      key={index}
                      className={styles.listItem}
                    >
                      {state}
                    </div>
                  );
                })}
                {/* mapping ends */}
              </div>
              {/* call function to get list of cities in selected state */}
              {activeState !== "" ? getCityList(activeState) : ""}
              <div
                className={styles.label}
                onClick={() => setCityToggle(!cityToggle)}
              >
                City{" "}
                <div
                  className={`${cityToggle ? styles.up : ""} ${styles.down}`}
                >
                  &nbsp;
                </div>
              </div>
              <div
                className={cityToggle ? styles.listActive : styles.listInactive}
              >
                {activeState !== ""
                  ? cities.map((city, index) => {
                      return (
                        <div
                          onClick={() => {
                            setActiveCity(city); //selct city
                            setCityToggle(false); // city toggle off
                          }}
                          key={index}
                          className={styles.listItem}
                        >
                          {city}
                        </div>
                      );
                    })
                  : null}
              </div>
            </form>
          </span>
          {/* Filter component ends */}
        </div>

        {/* mapping for the active array */}
        <motion.div layout>
          <AnimatePresence>
            {activeArray.map((ride, index) => {
              return <RideCard props={ride} key={index} />;
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Main body ends */}
    </>
  );
};

export default Dashboard;
