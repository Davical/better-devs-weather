# Better Devs Weather Dashboard

A real-time weather dashboard built with Next.js, React/TypeScript, and Tailwind CSS. Designed for a single office display, it shows:

- **Current Conditions**: Temperature, wind speed & direction, humidity, and precipitation.
- **Hourly Forecast**: Focused on key commute times (08:00, 12:00, 16:00, 20:00).
- **7-Day Forecast**: Covering the five days after tomorrow.

Data is fetched from the Open-Meteo API and refreshed automatically:
- **Current & Hourly**: Client-side polling via SWR every 10 minutes.
- **Daily**: Client-side polling via SWR every 6 hours.

---

## 🛠️ Prerequisites

- **Node.js** v18 or higher  
- **npm** v8 or higher (or **yarn**)

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Davical/better-devs-weather.git
   cd better-devs-weather

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install

3. **Run in development**
    ```bash
    npm run dev
    # or
    yarn dev
    
## ⚙️ Configuration
No API keys is required as it uses Open-Meteo’s free public API.

## 💡 How It Works
1. App Router (app/page.tsx) handles server-rendered layout and ensures fast first paint.
2. Client Components (marked with 'use client') use SWR for data fetching and caching:
   - Current & Hourly: Polled every minute.
   - Daily: Polled every 6 hours.
3. Loading Skeletons provide visual placeholders while data is fetching.
4. Tailwind CSS delivers a clean, responsive design suitable for large-screen displays.