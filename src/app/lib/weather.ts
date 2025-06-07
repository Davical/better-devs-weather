export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeather;
  daily_units: DailyUnits;
  daily: DailyData;
}

export interface CurrentUnits {
  time: string;                 // "iso8601"
  interval: string;             // "seconds"
  temperature_2m: string;       // "°C"
  relative_humidity_2m: string; // "%"
  rain: string;                 // "mm"
  wind_speed_10m: string;       // "km/h"
  wind_direction_10m: string;   // "°"
}

export interface CurrentWeather {
  time: string;                 // e.g. "2025-06-07T10:15"
  interval: number;             // e.g. 900
  temperature_2m: number;       // e.g. 20.8
  relative_humidity_2m: number; // e.g. 56
  rain: number;                 // e.g. 0.00
  wind_speed_10m: number;       // e.g. 12.6
  wind_direction_10m: number;   // e.g. 233
  weather_code: number
}

export interface DailyUnits {
  time: string;                       // "iso8601"
  temperature_2m_max: string;         // "°C"
  temperature_2m_min: string;         // "°C"
  wind_speed_10m_max: string;         // "km/h"
  wind_direction_10m_dominant: string;// "°"
  precipitation_sum: string;          // "mm"
  precipitation_probability_max: string; // "%"
}

export interface DailyData {
  time: string[];                          // ["2025-06-07", …]
  temperature_2m_max: number[];            // [21.1, …]
  temperature_2m_min: number[];            // [14.3, …]
  wind_speed_10m_max: number[];            // [15.4, …]
  wind_direction_10m_dominant: number[];   // [232, …]
  precipitation_sum: number[];             // [2.80, …]
  precipitation_probability_max: number[]; // [75, …]
  weather_code: number[]
}

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "rain",
      "wind_speed_10m",
      "wind_direction_10m",
      "weather_code"
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "wind_speed_10m_max",
      "wind_direction_10m_dominant",
      "precipitation_sum",
      "precipitation_probability_max",
      "weather_code"
    ].join(","),
    timezone: "Europe/Copenhagen",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Open-Meteo fetch failed: ${res.status} ${res.statusText}`);
  }

  // Here we simply assert that the JSON we got back
  // matches our WeatherResponse interface.
  const data = (await res.json()) as WeatherResponse;
  console.log(data)
  return data;
}