import React from "react";
import { ResultsType } from "../../types/results";
import "../../styles/results/filter.css";

interface ResultsFilterProps {
  results: ResultsType[];
  area_selected: string;
  handleFilterByArea: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ResultsFilter: React.FC<ResultsFilterProps> = ({
  results,
  area_selected,
  handleFilterByArea,
}) => {
  const area_options = results.map(
    (each: { area_name: string }) => each.area_name
  );

  return (
    <div className="results-wrapper">
      <div className="results-text">2-Hour Forecast and Traffic Images </div>

      {area_options && (
        <select
          className="results-filter"
          value={area_selected}
          onChange={handleFilterByArea}
        >
          <option value="">All Locations</option>

          {area_options.map((each, index) => (
            <option key={index} id={each}>
              {each}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
