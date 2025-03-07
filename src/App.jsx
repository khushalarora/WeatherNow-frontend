
import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`http://localhost:5000/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <nav>
        <h1>Weather App</h1>
      </nav>
      <form onSubmit={fetchWeather}>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.location}</h2>
          <img src={weather.icon} alt={weather.condition} />
          <p>{weather.temperature}</p>
          <p>{weather.condition}</p>
          <p>Wind: {weather.wind}</p>
          <p>Humidity: {weather.humidity}</p>
        </div>
      )}
    </div>
  );
}

export default App;