import React, { useState, useEffect } from "react";
import RideCard from "../../components/RideCard";
import styles from "./styles.module.css";

// Arbitrarily taken a date as the present date
let timeTo = new Date(2022, 3, 25, 0, 0, 0, 0);
let timeLimit = Math.floor(timeTo / 1000);

// main functional component
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
  const [activeCity, setActiveCity] = useState(null);
  const [activeState, setActiveState] = useState(null);
  const [activeFilter, setActiveFilter] = useState(false);
  const [stateToggle, setStateToggle] = useState(false);
  const [cityToggle, setCityToggle] = useState(false);
  const [activeArray, setActiveArray] = useState([...rides]);

  // filters
  // filter for state list
  let states = [];
  rides.forEach((ride) => {
    states.push(ride.state);
  });
  const uniqueStates = [...new Set(states)];
  uniqueStates.sort();

  // list of cities from a particular state
  let cities = [];
  const filterCities = (state) => {
    let ridesFromState = rides.filter((ride) => {
      return ride.state === state;
    });
    ridesFromState.forEach((ride) => {
      cities.push(ride.city);
    });
    cities.sort();
    const removeDuplicates = (arr) => {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    };
    removeDuplicates(cities);
  };

  // filtering of array of rides based on state abd city
  useEffect(() => {
    if (activeState === null && activeCity === null) {
      setActiveArray(rides);
      return;
    }
    const filteredArray = rides.filter((ride) => {
      if (activeCity === null) {
        return ride.state === activeState;
      } else {
        return ride.state === activeState && ride.city === activeCity;
      }
    });
    setActiveArray(filteredArray);
  }, [activeState, activeCity]);
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

          <span className={styles.filter}>
            <span onClick={() => setActiveFilter(!activeFilter)}>Filters</span>
            <form
              className={
                activeFilter ? styles.filterActive : styles.filterInactive
              }
            >
              <div className={styles.label}>Filter</div>
              <div
                className={styles.label}
                onClick={() => setStateToggle(!stateToggle)}
              >
                State
              </div>
              <div
                className={
                  stateToggle ? styles.listActive : styles.listInactive
                }
              >
                {uniqueStates.map((state, index) => {
                  return (
                    <div
                      onClick={() => {
                        setActiveState(state);
                        setActiveCity(null);
                        setStateToggle(false);
                      }}
                      key={index}
                      className={styles.listItem}
                    >
                      {state}
                    </div>
                  );
                })}
              </div>
              {activeState !== null ? filterCities(activeState) : null}
              <div
                className={styles.label}
                onClick={() => setCityToggle(!cityToggle)}
              >
                City
              </div>
              <div
                className={cityToggle ? styles.listActive : styles.listInactive}
              >
                {activeState !== null
                  ? cities.map((city, index) => {
                      return (
                        <div
                          onClick={() => {
                            setActiveCity(city);
                            setCityToggle(false);
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
        </div>
        {/* mapping for the active array */}
        {activeArray.map((ride, index) => {
          return <RideCard props={ride} key={index} />;
        })}
      </div>
    </>
  );
};

export default Dashboard;
