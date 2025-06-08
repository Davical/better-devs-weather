import React from "react";
import { DailyData } from "./lib/weather";
import CurrentWeatherClient from "../../components/CurrentWeatherClient";
import DailyForecastGrid from "../../components/DailyForecastGrid";
import HourlyForecastClient from "../../components/HourlyForecastClient";
import dayjs from "dayjs";
import TopBar from "../../components/TopBar";

export const revalidate = 600;

export default async function HomePage() {
  const lat = 56.1518;
  const lon = 10.2064;

  // server‐fetch daily with ISR
  const dailyRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&daily=weathercode,temperature_2m_max,temperature_2m_min,` +
      `wind_speed_10m_max,wind_direction_10m_dominant,` +
      `precipitation_sum,precipitation_probability_max` +
      `&timezone=Europe/Copenhagen`,
    { next: { revalidate: 600 } }
  );
  const dailyJson = await dailyRes.json();
  // drop today
  dailyJson.daily.time.shift();
  [
    "temperature_2m_max",
    "temperature_2m_min",
    "weathercode",
    "wind_speed_10m_max",
    "wind_direction_10m_dominant",
    "precipitation_sum",
    "precipitation_probability_max",
  ].forEach((f) => (dailyJson.daily as any)[f].shift());
  const daily: DailyData = dailyJson.daily;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <TopBar lat={lat} lon={lon} />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <CurrentWeatherClient lat={lat} lon={lon} />
          </div>
          <div className="md:w-2/3">
            <HourlyForecastClient lat={lat} lon={lon} />
          </div>
        </div>
        <section>
          <DailyForecastGrid daily={daily} />
        </section>
      </div>
    </main>
  );
}
