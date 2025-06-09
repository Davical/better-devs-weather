import React from "react";
import dayjs from "dayjs";
import { HourlyData } from "@/app/lib/weather";
import { openWeatherWMOToEmoji } from "@akaguny/open-meteo-wmo-to-emoji";

const RELEVANT_HOURS = [8, 12, 16, 20];

export default function HourlyForecastList({ hourly }: { hourly: HourlyData }) {
    const filtered = hourly.time
        .map((t, i) => ({ time: t, idx: i }))
        .filter(({ time }) => RELEVANT_HOURS.includes(dayjs(time).hour()));

    return (
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 flex flex-col h-full items-center shadow-xl">
            <p className="text-2xl font-medium mb-2">
                {dayjs(hourly.time[0]).format("DD MMMM")}
            </p>
            <div className="w-full flex justify-between p-4 rounded-xl">
                {filtered.map(({ time, idx }) => (
                    <div key={time} className="flex-1 text-center">
                        <p className="text-xl font-medium mb-1">
                            {dayjs(time).format("HH:mm")}
                        </p>
                        <p className="text-5xl mb-4">
                            {
                                openWeatherWMOToEmoji(hourly.weather_code[idx])
                                    .value
                            }
                        </p>
                        <p className="text-xl font-semibold">
                            {Math.round(hourly.temperature_2m[idx])}°C
                        </p>
                        <div className="w-full space-y-2 text-sm">
                            <p>
                                Chance: {hourly.precipitation_probability[idx]}%
                            </p>
                            <p>Total mm: {hourly.precipitation[idx]} mm</p>
                            <p>Wind: {hourly.wind_speed_10m[idx]} km/h</p>

                            <div className="flex flex-col items-center">
                                <span
                                    className="text-2xl inline-block"
                                    style={{
                                        transform: `rotate(${hourly.wind_direction_10m[idx]}deg)`,
                                    }}
                                >
                                    ↑
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
