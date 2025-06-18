# Angular Weather Dashboard

A responsive and accessible weather dashboard built with **Angular 20**, **RxJS**, and the **OpenWeatherMap API**. This application provides real-time weather data with city-based search, unit toggling (°C/°F), dynamic icons, and clear error handling.

---

## Features

- Search for weather by city name
- Live data via OpenWeatherMap API
- Toggle between Celsius (°C) and Fahrenheit (°F)
- Clear error handling when city is not found
- Keyboard-accessible and screen-reader friendly
- SCSS styling and responsive layout
- Uses Font Awesome for weather detail icons
- Built with Angular standalone components and modern RxJS patterns

---

## Tech Stack

| Tech        | Description                    |
|-------------|--------------------------------|
| Angular 20  | Frontend framework             |
| RxJS        | Reactive state and streams     |
| SCSS        | Component-based styling        |
| OpenWeatherMap API | Weather data source     |
| Font Awesome| Icons                          |
| Jasmine & Karma | Unit testing framework     |

---

## Screenshots

### Weather in Bangalore
![updated-forecast-1](https://github.com/user-attachments/assets/b36ffb25-752a-47dd-b2f5-b309ae76f216)


### Weather in Chennai
![updated-forecast-2](https://github.com/user-attachments/assets/f750dd7b-55c6-42b6-9317-6a6c6ed1e3cc)


### Invalid City Handling
![image](https://github.com/user-attachments/assets/e4da41ee-f07a-4176-b416-1679ff5bb07d)


---

## Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/sowmyadhanakarthick/weather-dashboard-angular.git
cd weather-dashboard-angular
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your OpenWeatherMap API key

```ts
// src/environments/environment.ts
export const environment = {
  openWeatherApiKey: 'YOUR_API_KEY'
};
```

### 4. Start the development server

```bash
ng serve
```

### 5. Open the app in your browser

Visit:
http://localhost:4200

### 6. Running Unit Tests

```bash
ng test
```
