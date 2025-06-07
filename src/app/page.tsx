import React from 'react';
import { fetchWeather, WeatherResponse } from './lib/weather';
import CurrentWeatherCard from '../../components/CurrentWeatherCard';
import DailyForecastGrid from '../../components/DailyForecastGrid';

export const revalidate = 600;

export default async function HomePage() {
  let weather: WeatherResponse | null = null;

  try {
    weather = await fetchWeather(56.1518, 10.2064);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-900 text-white">
        <p className="text-2xl">Unable to load weather data. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <CurrentWeatherCard current={weather.current}/>
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-center">7-Day Forecast</h2>
          <DailyForecastGrid daily={weather.daily} />
        </section>
      </div>
    </main>
  );
}