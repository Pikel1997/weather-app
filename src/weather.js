// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          if (!latitude || !longitude) {
            setError('Unable to retrieve geolocation.');
            setLoading(false);
            return;
          }

          console.log('Fetching weather for lat:', latitude, 'lon:', longitude);  // Log for debugging

          try {
            // Make the request to the backend (localhost:5000)
            const response = await axios.get(`http://localhost:5000/weather?lat=${latitude}&lon=${longitude}`);
            setWeather(response.data);  // Set weather data
            setLoading(false);
          } catch (err) {
            setError('Failed to fetch weather data.');
            setLoading(false);
            console.error('Weather Fetch Error:', err);  // Log for debugging
          }
        },
        (err) => {
          setError('Geolocation error: ' + err.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchWeather}>Get Weather</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
