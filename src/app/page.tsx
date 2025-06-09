import React from "react";
import CurrentWeatherClient from "../../components/CurrentWeatherClient";
import HourlyForecastClient from "../../components/HourlyForecastClient";
import TopBar from "../../components/TopBar";
import DailyForecastClient from "../../components/DailyForecastClient";

/**
 * Keep the page simple - primary requirement is to have it as a dashboard, which is displayed at the ofice. 
 * Dashboard will not be interacted with, therefore, doesn't contain any functionality other than showing
 * current weather. Current and next day weather is updated every 10 minutes and daily is updated every 6 hours. 
 * @returns dashboard
 */
export default async function HomePage() {
  const lat = 56.1518;
  const lon = 10.2064;

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
          <DailyForecastClient lat={lat} lon={lon} />
        </section>
      </div>
    </main>
  );
}
