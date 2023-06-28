import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { getLocationDetails } from "./api/get-location-details";
import { ResultsType } from "./types/results";
import moment from "moment";
import { Form } from "./components/form";
import { ResultsFilter } from "./components/results/filter";
import { ResultsList } from "./components/results/list";

function App() {
  const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState<string>(moment().format("HH:mm"));
  const [results, setReults] = useState<ResultsType[] | null | undefined>();
  const [area_selected, setAreaSelected] = useState<string>("");

  useEffect(() => {
    searchResult();
  }, []);

  const searchResult = async () => {
    if (date && time) {
      const { data } = await getLocationDetails({ date, time });
      setReults(data);
    }
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleFilterByArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const area = e.target.value;
    if (area !== area_selected) setAreaSelected(area);
  };

  return (
    <div className="background">
      <div className="container">
        <Form
          date={date}
          time={time}
          handleDate={handleDate}
          handleTime={handleTime}
          searchResult={searchResult}
        />

        {results && (
          <>
            <ResultsFilter
              results={results}
              area_selected={area_selected}
              handleFilterByArea={handleFilterByArea}
            />

            <ResultsList results={results} area_selected={area_selected} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
