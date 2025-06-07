'use client';
import React from 'react';
import useSWR from 'swr';
import HourlyForecastList from './HourlyForecastList';
import { HourlyData } from '@/app/lib/weather';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HourlyForecastClient({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const { data, error } = useSWR<{ hourly: HourlyData }>(
    `/api/weather/hourly?lat=${lat}&lon=${lon}`,
    fetcher,
    { refreshInterval: 600_000 }
  );

  if (error) return <div>Error loading hourly forecast</div>;
  if (!data) return <div>Loading hourly…</div>;
  return <HourlyForecastList hourly={data.hourly} />;
}