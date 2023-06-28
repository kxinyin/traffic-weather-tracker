import React from "react";
import "../../styles/form/index.css";

interface FormProps {
  date: string;
  time: string;
  handleDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResult: () => void;
}

export const Form: React.FC<FormProps> = ({
  date,
  time,
  handleDate,
  handleTime,
  searchResult,
}) => {
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchResult();
  };

  return (
    <div>
      <form onSubmit={handleSubmission} className="form-wrapper">
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDate}
          className="form-input"
        />
        <input
          type="time"
          id="time"
          value={time}
          onChange={handleTime}
          className="form-input"
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};
