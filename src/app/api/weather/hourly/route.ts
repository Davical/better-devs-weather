import { NextResponse } from 'next/server'
import { HourlyData } from '@/app/lib/weather'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')   || '56.1518'
  const lon = searchParams.get('lon')   || '10.2064'

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,` +
      `relative_humidity_2m,precipitation_probability,precipitation,weather_code` +
      `&forecast_days=2` +
      `&timezone=Europe/Copenhagen`
  )
  if (!res.ok) return NextResponse.error()

  const json = await res.json()
  const raw = json.hourly as Record<string, any[]>

  // 1) figure out tomorrow’s date string
  const now       = new Date()
  const tomorrow  = new Date(now)
  tomorrow.setDate(now.getDate() + 1) // Dangerous at the end of month
  const td        = tomorrow.toISOString().split('T')[0]  // e.g. "2025-06-08"

  // 2) build a mask for entries whose time starts with that date
  const times     = raw.time as string[]
  const mask      = times.map(t => t.startsWith(td))

  // 3) filter each parallel array by that mask
  const hourly: Partial<HourlyData> = {}
  for (const key of Object.keys(raw) as (keyof HourlyData)[]) {
    hourly[key] = raw[key].filter((_, i) => mask[i])  
  }

  return NextResponse.json({ hourly: hourly as HourlyData })
}