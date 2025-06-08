import React from "react";
import CurrentWeatherClient from "../../components/CurrentWeatherClient";
import HourlyForecastClient from "../../components/HourlyForecastClient";
import TopBar from "../../components/TopBar";
import DailyForecastClient from "../../components/DailyForecastClient";

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
