import { NextResponse } from 'next/server';
import { CurrentWeather } from '@/app/lib/weather';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '56.1518';
  const lon = searchParams.get('lon') || '10.2064';

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&current=weather_code,temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m` +
      `&timezone=Europe/Copenhagen`
  );
  if (!res.ok) return NextResponse.error();
  const json = await res.json();
  const current: CurrentWeather = json.current;
  return NextResponse.json({ current });
}