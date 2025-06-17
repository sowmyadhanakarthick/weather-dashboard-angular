# Angular Weather Dashboard

A responsive and accessible weather dashboard built with **Angular 20**, **RxJS**, and the **OpenWeatherMap API**. This application provides real-time weather data with city-based search, unit toggle (°C/°F), weather icons, and clean error handling.

---

## Screenshots

### Weather in Bangalore
![forecast-1](https://github.com/user-attachments/assets/1da48f8f-c4dc-4a54-9e9e-8e3231f5cd29)


### Weather in Chennai
![forecast-2](https://github.com/user-attachments/assets/517cc0df-2dfc-42b0-ae1c-580b29fe4034)


### Invalid City Handling
![error-screenshot](https://github.com/user-attachments/assets/b3536799-de1e-4f49-bdd0-23ab69e52933)


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
