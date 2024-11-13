import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';  // Import moment-timezone

function App() {
  const [time, setTime] = useState(null);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    // Get all available timezones using moment-timezone
    const allTimezones = moment.tz.names();
    setTimezones(allTimezones);

    const fetchTime = async () => {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
      const timeData = await response.json();
      setTime(timeData);
    };

    fetchTime();
  }, [timezone]);

  return (
    <div className="App">
      <h1>World Clock</h1>
      <p>Current Time in {timezone}: {time ? time.datetime : 'Loading...'}</p>

      {/* Dropdown dynamically showing all timezones */}
      <select onChange={(e) => setTimezone(e.target.value)} value={timezone}>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
