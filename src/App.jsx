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
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=946dbc3e4923415a90312216250703&q=${encodeURIComponent(city)}&aqi=no`);
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
        <h1>WeatherNow</h1>
      </nav>
      <form onSubmit={fetchWeather}>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <img src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text} />
          <p>{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
          <p>Humidity: {weather.current.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;