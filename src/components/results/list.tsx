import React, { useState } from "react";
import "../../styles/results/list.css";
import { ResultsType } from "../../types/results";
import moment from "moment";
import { ResultsTrafficInfo } from "./traffic-info";

interface ResultsListProps {
  results: ResultsType[];
  area_selected: string;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  results,
  area_selected,
}) => {
  let result_list = [];

  if (area_selected) {
    result_list = results.filter((each) => each.area_name === area_selected);
  } else {
    result_list = [...results];
  }

  const [show_traffic_area, setShowTrafficArea] = useState<string[]>([]);

  const handleShowTraffic = (area: string) => {
    if (show_traffic_area.includes(area)) {
      setShowTrafficArea(show_traffic_area.filter((each) => each !== area));
    } else {
      setShowTrafficArea((prev) => [...prev, area]);
    }
  };

  return (
    <div className="result-list">
      {result_list.map((area, index) => (
        <div key={index} className="result-list-wrapper result-list-box ">
          <div className="result-list-box-title">{area.area_name}</div>

          <div className="result-list-wrapper">
            <div className="result-list-box-subtitle">
              Weather conditions from{" "}
              {moment(area.forecast_valid_period.start).format("HH:mm")}-
              {moment(area.forecast_valid_period.end).format("HH:mm")}, with{" "}
              <span>{area.forecast}.</span>
            </div>
            <button
              className="result-list-button"
              onClick={() => handleShowTraffic(area.area_name)}
            >
              Check Traffic
            </button>

            {show_traffic_area.includes(area.area_name) && (
              <ResultsTrafficInfo area={area} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
