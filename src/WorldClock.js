import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorldClock = () => {
  const [timezones, setTimezones] = useState([]);
  const [times, setTimes] = useState({});

  useEffect(() => {
    // Fetch timezones data from a free API (example: worldtimeapi.org)
    axios.get('https://worldtimeapi.org/api/timezone')
      .then(response => {
        setTimezones(response.data);
      })
      .catch(error => {
        console.error('Error fetching timezones:', error);
      });
  }, []);

  useEffect(() => {
    if (timezones.length > 0) {
      const intervalId = setInterval(() => {
        timezones.forEach(timezone => {
          axios.get(`https://worldtimeapi.org/api/timezone/${timezone}`)
            .then(response => {
              setTimes(prevTimes => ({
                ...prevTimes,
                [timezone]: response.data.datetime,
              }));
            })
            .catch(error => {
              console.error(`Error fetching time for ${timezone}:`, error);
            });
        });
      }, 1000); // Update every second

      return () => clearInterval(intervalId); // Clean up on unmount
    }
  }, [timezones]);

  return (
    <div>
      <h1>World Clock</h1>
      <div>
        {timezones.length === 0 ? (
          <p>Loading timezones...</p>
        ) : (
          timezones.map((timezone) => (
            <div key={timezone}>
              <h2>{timezone}</h2>
              <p>{times[timezone] ? new Date(times[timezone]).toLocaleString() : 'Loading time...'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorldClock;
