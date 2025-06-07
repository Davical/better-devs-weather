import React from "react";
import dayjs from "dayjs";
import { DailyData } from "@/app/lib/weather";
import { openWeatherWMOToEmoji } from "@akaguny/open-meteo-wmo-to-emoji";

interface Props {
  daily: DailyData;
}

export default function DailyForecastGrid({ daily }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
      {daily.time.map((day, index) => {
        if (index === 0) {
          return;
        }
        const dateStr = dayjs(day).format("ddd, DD MMM");
        const code = daily.weathercode[index];
        const maxT = Math.round(daily.temperature_2m_max[index]);
        const minT = Math.round(daily.temperature_2m_min[index]);
        const precipProb = daily.precipitation_probability_max[index];
        const precipSum  = daily.precipitation_sum[index];
        const windMax    = daily.wind_speed_10m_max[index];
        const windDir    = daily.wind_direction_10m_dominant[index];

        return (
          <div
            key={day}
            className="bg-white/10 backdrop-blur rounded-xl p-4 flex flex-col items-center text-center shadow-md"
          >
            <p className="text-xl font-medium mb-1">{dateStr}</p>

            <p className="text-3xl mb-2">
              {openWeatherWMOToEmoji(code).value}
            </p>

            <p className="text-2xl font-bold mb-2">
              {maxT}° / {minT}°
            </p>

            <div className="w-full space-y-2 text-sm">
              <p>Chance: {precipProb}%</p>
              <p>Total mm: {precipSum} mm</p>
              <p>Wind: {windMax} km/h</p>

              {/* Rotating arrow for wind direction */}
              <div className="flex flex-col items-center">
                <span
                  className="text-2xl inline-block"
                  style={{ transform: `rotate(${windDir}deg)` }}
                >
                  ↑
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}