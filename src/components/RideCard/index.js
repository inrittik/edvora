import React from "react";
import styles from "./styles.module.css";

const index = ({ props }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={props.map_url} alt="" />
      </div>
      <div className={styles.details}>
        <ul>
          <li>
            Ride Id: <span>{props.id}</span>
          </li>
          <li>
            Origin Station: <span>{props.origin_station_code}</span>
          </li>
          <li>
            station_path: <span>{`[${props.station_path}]`}</span>
          </li>
          <li>
            Date: <span>{props.date}</span>
          </li>
          <li>
            Distance: <span>{props.distance}</span>
          </li>
        </ul>
      </div>
      <div className={styles.place}>{props.city}</div>
      <div className={styles.place}>{props.state}</div>
    </div>
  );
};

index.defaultProps = {
  map_url: "https://picsum.photos/200",
  id: 1,
  origin_station_code: 20,
  station_path: [20, 22, 30, 40, 50, 61, 72],
  date: "22",
  destination_station_code: 80,
  city: "Guwahati",
  state: "Assam",
};

export default index;
