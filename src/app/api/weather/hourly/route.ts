import { NextResponse } from "next/server";
import { HourlyData } from "@/app/lib/weather";

/**
 * Called by the client component to fetch forecast at Open-Meteo. This is not sufficient as it is now, as each client will make a 
 * direct call to the source. 
 * 
 * The more ideal solution is to have the server hold the weather state and keep it updated, and clients
 * will get data from the server. Caching should be used as well. 
 * @returns hourly weather data
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") || "56.1518";
    const lon = searchParams.get("lon") || "10.2064";

    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${lat}&longitude=${lon}` +
            `&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,` +
            `relative_humidity_2m,precipitation_probability,precipitation,weather_code` +
            `&forecast_days=2` +
            `&timezone=Europe/Copenhagen`
    );
    if (!res.ok) return NextResponse.error();

    const json = await res.json();
    const raw = json.hourly as Record<string, any[]>;

    //REMOVE TODAY'S HOURS
    // 1) Get "YYYY-MM-DD" for today:
    const todayCph = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Europe/Copenhagen",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date()); // Ex: "2025-06-10"

    // 2) Build a Date from that and add one day:
    const tomorrowDate = new Date(todayCph);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1); //Dangerous?

    const td = tomorrowDate.toISOString().split("T")[0]; // "2025-06-11"

    // 3) Mask out only tomorrow’s entries:
    const times = raw.time as string[];
    const mask = times.map((t) => t.startsWith(td));

    // 4) Filter each parallel array:
    const hourly: Partial<HourlyData> = {};
    for (const key of Object.keys(raw) as (keyof HourlyData)[]) {
        hourly[key] = raw[key].filter((_, i) => mask[i]);
    }

    return NextResponse.json({ hourly: hourly as HourlyData });
}
