import React from "react";
import dayjs from "dayjs";
import { openWeatherWMOToEmoji } from "@akaguny/open-meteo-wmo-to-emoji";
import { DailyData } from "@/app/lib/weather";

interface Props {
  daily: DailyData;
}

export default function DailyForecastGrid({ daily }: Props) {
  const todayStr    = dayjs().format("YYYY-MM-DD");
  const tomorrowStr = dayjs().add(1, "day").format("YYYY-MM-DD");

  const entries = daily.time
    .map((date, idx) => ({ date, idx }))
    .filter(({ date }) => date !== todayStr && date !== tomorrowStr)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
      {entries.map(({ date, idx }) => {
        const dateStr = dayjs(date).format("ddd, DD MMM");
        const code       = daily.weather_code[idx];
        const maxT       = Math.round(daily.temperature_2m_max[idx]);
        const minT       = Math.round(daily.temperature_2m_min[idx]);
        const precipProb = daily.precipitation_probability_max[idx];
        const precipSum  = daily.precipitation_sum[idx];
        const windMax    = daily.wind_speed_10m_max[idx];
        const windDir    = daily.wind_direction_10m_dominant[idx];

        return (
          <div
            key={date}
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