# Angular Weather Dashboard

A responsive and accessible weather dashboard built with **Angular 20**, **RxJS**, and the **OpenWeatherMap API**. This application provides real-time weather data with city-based search, unit toggle (°C/°F), weather icons, and clean error handling.

---

## Screenshots

### Weather in Bangalore
![updated-forecast-1](https://github.com/user-attachments/assets/b36ffb25-752a-47dd-b2f5-b309ae76f216)


### Weather in Chennai
![updated-forecast-2](https://github.com/user-attachments/assets/f750dd7b-55c6-42b6-9317-6a6c6ed1e3cc)


### Invalid City Handling
![invalid-input](https://github.com/user-attachments/assets/63aba28a-0a2e-43b3-b7b1-f6cc420ef58f)


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
