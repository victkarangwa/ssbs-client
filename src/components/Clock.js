import React, { useEffect, useState } from "react";
import Clock from "react-clock";

import "./style.css";

const ClockComponent = () => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className='custom-clock'>
        <Clock
          size={300}
          hourMarksWidth={7}
          minuteMarksLength={5}
          secondHandWidth={2}
          minuteHandWidth={3}
          hourHandWidth={4}
          value={value}
        />
      </div>
    </div>
  );
};

export default ClockComponent;
