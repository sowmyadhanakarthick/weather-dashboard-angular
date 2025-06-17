# Angular Weather Dashboard

A responsive and accessible weather dashboard built with **Angular 20**, **RxJS**, and the **OpenWeatherMap API**. This application provides real-time weather data with city-based search, unit toggle (°C/°F), weather icons, and clean error handling.

---

## Screenshots

### Weather in Chennai
![Weather Chennai](./screenshots/weather-chennai.png)

### Weather in California
![Weather California](./screenshots/weather-california.png)

### Invalid City Handling
![City Not Found](./screenshots/city-not-found.png)

---

## Features

- Search weather by city name with debounce
- Toggle between Celsius and Fahrenheit
- Weather icons and live data via OpenWeatherMap API
- Clear error handling when city is not found
- Fully reactive using Angular standalone APIs and RxJS
- Accessible (aria attributes, legend/fieldset)
- SCSS styling and responsive layout

---

## Tech Stack

- Angular 20
- RxJS
- SCSS
- OpenWeatherMap API

---

## API Key Setup

The `environment.ts` file should contain OpenWeatherMap API key:

```ts
export const environment = {
  production: false,
  openWeatherApiKey: 'YOUR_API_KEY'
};
