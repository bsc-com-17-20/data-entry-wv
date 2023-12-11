import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Period = () => {
  // How state will manage the current date
  const [currentDate, setCurrentDate] = useState(moment());

  // The Effect to log the current date whenever it has changed by the user
  useEffect(() => {
    console.log(currentDate.format('YYYY-MM-DD'));
  }, [currentDate]);

  // render comp
  return (
    <div>
      <p>Current Date: {currentDate.format('YYYY-MM-DD')}</p>
      <button onClick={() => setCurrentDate(moment())}>
        Update Date
      </button>
    </div>
  );
};

export default Period;
