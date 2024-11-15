import './App.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { FaRegClock } from 'react-icons/fa';

function App() {
  const [time, setTime] = useState(null);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    // Get all available timezones using moment-timezone
    const allTimezones = moment.tz.names();
    setTimezones(allTimezones);

    const fetchTime = async () => {
      try {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
        const timeData = await response.json();
        setTime(timeData);
      } catch (error) {
        console.error("Error fetching time data:", error);
        setTime(null);
      }
    };

    fetchTime();
  }, [timezone]);

  return (
    <div className="App">
      <div className="time-container bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 text-center">
        <FaRegClock className="text-blue-600 text-5xl mb-4" />
        <h2 className="text-3xl font-semibold mb-4">Current Time in {timezone}</h2>
        <p className="text-xl text-gray-700 mb-6">
          {time ? moment(time.datetime).format('DD MMM YYYY, HH:mm:ss') : 'Loading...'}
        </p>

        <select
          className="timezone-select bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTimezone(e.target.value)}
          value={timezone}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
