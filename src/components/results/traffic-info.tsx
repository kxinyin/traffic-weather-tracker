import React from "react";
import { ResultsType } from "../../types/results";
import "../../styles/results/traffic-info.css";

interface ResultsTrafficInfo {
  area: ResultsType;
}

export const ResultsTrafficInfo: React.FC<ResultsTrafficInfo> = ({ area }) => {
  if (area.traffic.length <= 0) {
    return (
      <div className="result-no-traffic-wrapper">
        No traffic image in this area currently.
      </div>
    );
  }

  return (
    <div className="result-traffic-wrapper">
      {area.traffic.map((traffic, index) => (
        <img
          key={index}
          src={traffic.image}
          style={{ width: "100%", height: "auto" }}
        />
      ))}
    </div>
  );
};
