import React, { useState } from "react";
import moment from "moment";
import classes from "../App.module.css";

const Period = () => {
  const [selectedDate, setSelectedDate] = useState(moment("2023-11"));
  const [displayedOption, setDisplayedOption] = useState("Period");

  const handlePeriodChange = (value) => {
    setSelectedDate(moment(value));
    setDisplayedOption(value);
    // Additional actions if needed
  };

  return (
    <div>
      <select
        className={classes.button}
        value={selectedDate.format("YYYY-MM")}
        onChange={(e) => handlePeriodChange(e.target.value)}
      >
        <option value="Period">Period</option>
        <option value="2023-1">January 2023</option>
        <option value="2023-2">February 2023</option>
        <option value="2023-3">March 2023</option>
        <option value="2023-4">April 2023</option>
        <option value="2023-5">May 2023</option>
        <option value="2023-6">June 2023</option>
        <option value="2023-7">July 2023</option>
        <option value="2023-8">August 2023</option>
        <option value="2023-9">September 2023</option>
        <option value="2023-10">October 2023</option>
        <option value="2023-11">November 2023</option>
        <option value="2023-22">December 2023</option>
      </select>

      <div>
        <p>: {displayedOption}</p>
      </div>
    </div>
  );
};

export default Period;
