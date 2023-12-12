import React, { useState } from "react";
import moment from "moment";
import classes from "../App.module.css";

const Period = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  return (
    <div>
      <button
        className={classes.button}
        onClick={() => setCurrentDate(moment())}
      >
        {currentDate.format("YYYY-MM-DD")}
      </button>
    </div>
  );
};

export default Period;
