import { NextResponse } from "next/server";
import { DailyData, WeatherResponse } from "@/app/lib/weather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat") || "56.1518";
  const lon = searchParams.get("lon") || "10.2064";
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,precipitation_sum,precipitation_probability_max` +
      `&timezone=Europe/Copenhagen`
  );
  if (!res.ok) return NextResponse.error();
  const json = await res.json();
  const daily: DailyData = json.daily;
  return NextResponse.json({ daily });
}
