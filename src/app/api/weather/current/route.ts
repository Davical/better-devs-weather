import { NextResponse } from "next/server";
import { CurrentWeather } from "@/app/lib/weather";

/**
 * Called by the client component to fetch forecast at Open-Meteo. This is not sufficient as it is now, as each client will make a 
 * direct call to the source. 
 * 
 * The more ideal solution is to have the server hold the weather state and keep it updated, and clients
 * will get data from the server. Caching should be used as well. 
 * @returns current weather data
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") || "56.1518";
    const lon = searchParams.get("lon") || "10.2064";

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
