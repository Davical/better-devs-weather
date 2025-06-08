import React from "react";
import dayjs from "dayjs";
import { CurrentWeather, WeatherResponse } from "@/app/lib/weather";
import { openWeatherWMOToEmoji } from "@akaguny/open-meteo-wmo-to-emoji";

interface CurrentWeatherCardProps {
  current: CurrentWeather;
}

export default function CurrentWeatherCard({ current }: CurrentWeatherCardProps) {
  const localTime = dayjs(current.time).format("HH:mm");

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center shadow-xl">
      <p className="text-2xl font-medium mb-2">Today at {localTime}</p>

      <p className="text-6xl font-bold">{Math.round(current.temperature_2m)}°C</p>

      <p className="text-6xl capitalize mb-4">{openWeatherWMOToEmoji(current.weather_code).value}</p>

      <div className="grid grid-cols-2 gap-6 mt-6 w-full max-w-md text-center">
        <div>
          <p className="text-xl font-semibold">{current.wind_speed_10m} km/h</p>
          <p className="text-sm">Wind Speed</p>
        </div>
        <div>
          <p className="text-xl font-semibold">
            {current.relative_humidity_2m}%
          </p>
          <p className="text-sm">Humidity</p>
        </div>
        <div className="flex flex-col items-center">
          <span
            className="text-4xl inline-block mb-1"
            style={{ transform: `rotate(${current.wind_direction_10m}deg)` }}
          >
            ↑
          </span>
        </div>
        <div>
          <p className="text-xl font-semibold">{current.precipitation} mm</p>
          <p className="text-sm">Rain</p>
        </div>
      </div>
    </div>
  );
}