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
  hourly: HourlyData;
}

export interface CurrentUnits {
  time: string;                 
  interval: string;             
  temperature_2m: string;       
  relative_humidity_2m: string; 
  precipitation: number;                 
  wind_speed_10m: string;       
  wind_direction_10m: string;   
}

export interface CurrentWeather {
  time: string;                 
  interval: number;             
  temperature_2m: number;       
  relative_humidity_2m: number; 
  precipitation: number;                 
  wind_speed_10m: number;       
  wind_direction_10m: number;   
  weather_code: number
}

export interface DailyUnits {
  time: string;                       
  temperature_2m_max: string;         
  temperature_2m_min: string;         
  wind_speed_10m_max: string;         
  wind_direction_10m_dominant: string;
  precipitation_sum: string;          
  precipitation_probability_max: string;
}

export interface DailyData {
  time: string[];                          
  temperature_2m_max: number[];            
  temperature_2m_min: number[];            
  wind_speed_10m_max: number[];            
  wind_direction_10m_dominant: number[];   
  precipitation_sum: number[];             
  precipitation_probability_max: number[]; 
  weather_code: number[]
}

export interface HourlyData {
  time: string[];                
  temperature_2m: number[];      
  wind_speed_10m: number[];      
  wind_direction_10m: number[];  
  relative_humidity_2m: number[];
  precipitation_probability: number[]; 
  precipitation: number[];
  weather_code: number[];
}