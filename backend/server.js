// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 5000;

// Enable CORS for requests from React (localhost:3000)
app.use(cors({
  origin: '*', // Allow requests from the frontend
  methods: ['GET', 'POST'],  // Allow only GET and POST methods
  allowedHeaders: ['Content-Type'],  // Allow specific headers
}));

// API Key (from .env)
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Endpoint to fetch weather data based on latitude and longitude
app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  // Construct URL for OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    // Request weather data from OpenWeatherMap API
    const response = await axios.get(url);
    res.json(response.data);  // Return the weather data to frontend
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data from OpenWeatherMap' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
